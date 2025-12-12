import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import type { Doc } from "./_generated/dataModel"; // Import Doc and DataModel

// Type for the content passed to mutations
const ContentArgs = {
  contentId: v.string(),
  contentType: v.union(v.literal("word"), v.literal("phrasal"), v.literal("idiom")),
  contentNumber: v.number(),
  action: v.union(v.literal("known"), v.literal("unknown")),
} as const;

/**
 * Updates or inserts a user's progress on a piece of content.
 * 'known' increments mastery; 'unknown' sets to 1 (needs review).
 */
export const updateProgress = mutation({
  args: ContentArgs,
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const existing = await ctx.db
      .query("user_word_progress")
      .withIndex("by_user_content", (q) =>
        q.eq("userId", userId).eq("contentId", args.contentId).eq("contentType", args.contentType)
      )
      .unique();

    let newMasteryLevel: number;
    const currentMastery = existing?.masteryLevel || 0;

    if (args.action === "known") {
        // Mastery level increases, capped at 5
        newMasteryLevel = Math.min(5, currentMastery + 1);
    } else {
        // 'Unknown' resets mastery to 1 (needs initial review) or keeps it 0 if new.
        newMasteryLevel = currentMastery > 0 ? 1 : 0;
    }

    const updateData = {
        userId,
        contentId: args.contentId,
        contentType: args.contentType,
        contentNumber: args.contentNumber,
        masteryLevel: newMasteryLevel,
        lastReviewed: Date.now(),
    };

    if (existing) {
      await ctx.db.patch(existing._id, updateData);
    } else {
      await ctx.db.insert("user_word_progress", updateData);
    }
  },
});

/**
 * Gets all word progress for a user (used by frontend for filtering learned words).
 */
export const getProgress = query({
  args: {
    contentType: v.optional(v.union(v.literal("word"), v.literal("phrasal"), v.literal("idiom"))),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    let q = ctx.db
      .query("user_word_progress")
      .withIndex("by_user", (q) => q.eq("userId", userId));

    if (args.contentType) {
       q = q.filter((q) => q.eq(q.field("contentType"), args.contentType));
    }

    return await q.collect();
  },
});

/**
 * Saves a new test result.
 */
export const saveTestResult = mutation({
  args: {
    testType: v.union(v.literal("phrasal"), v.literal("idiom"), v.literal("grammar"), v.literal("vocabulary")),
    totalQuestions: v.number(),
    correctAnswers: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const score = Math.round((args.correctAnswers / args.totalQuestions) * 100);

    await ctx.db.insert("user_test_stats", {
      userId,
      testType: args.testType,
      score,
      totalQuestions: args.totalQuestions,
      correctAnswers: args.correctAnswers,
      date: Date.now(),
    });
  },
});


// Public query for the frontend to fetch profile stats
export const getUserProfileStats = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) {
            return null;
        }

        const user = await ctx.db.get(userId) as Doc<"users"> | undefined;
        if (!user) {
            return null;
        }

        // 1. Total Tests Covered
        const tests = await ctx.db
            .query("user_test_stats")
            .withIndex("by_user_date", (q) => q.eq("userId", userId))
            .collect();

        const totalTestsCovered = tests.length;

        // 2. Mastery Counts & Next Word Number
        const allProgress = await ctx.db
            .query("user_word_progress")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .collect();

        let wordsKnown = 0;
        let phrasalKnown = 0;
        let idiomsKnown = 0;
        let nextWordNumber = 1;

        // Find the maximum contentNumber for words
        const wordProgress = allProgress.filter(p => p.contentType === 'word');
        if (wordProgress.length > 0) {
            const maxContentNumber = Math.max(...wordProgress.map(p => p.contentNumber));
            // Next word starts after the last one reviewed
            nextWordNumber = maxContentNumber + 1;
        }

        allProgress.forEach(p => {
            if (p.masteryLevel >= 3) {
                if (p.contentType === 'word') wordsKnown++;
                if (p.contentType === 'phrasal') phrasalKnown++;
                if (p.contentType === 'idiom') idiomsKnown++;
            }
        });

        // 3. Weekly Activity (Mock Data or implement real date logic)
        // For simplicity and quick implementation, we will mock the weekly activity on the front end,
        // but this framework shows where real weekly data from `user_test_stats` would be processed.

        // 4. Accuracy Rate (Average of all test scores)
        const totalScoreSum = tests.reduce((sum, t) => sum + t.score, 0);
        const averageAccuracy = tests.length > 0 ? Math.round(totalScoreSum / tests.length) : 0;

        // 5. Total Questions Attempted
        const totalQuestionsAttempted = tests.reduce((sum, t) => sum + t.totalQuestions, 0);

        return {
            name: user.name,
            email: user.email,
            image: user.image,
            totalTestsCovered,
            wordsKnown,
            phrasalKnown,
            idiomsKnown,
            averageAccuracy,
            totalQuestionsAttempted,
            nextWordNumber,
            // Example of a derived stat for needs review
            needsReviewCount: allProgress.filter(p => p.masteryLevel > 0 && p.masteryLevel < 3).length,
        };
    },
});
