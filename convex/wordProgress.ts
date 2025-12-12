import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import type { Doc } from "./_generated/dataModel"; // Import Doc and DataModel

// Type for the content passed to mutations
const ContentArgs = {
  contentId: v.string(),
  contentType: v.union(v.literal("word"), v.literal("phrasal"), v.literal("idiom")),
  contentNumber: v.number(),
  action: v.union(v.literal("known"), v.literal("unknown"), v.literal("master")),
} as const;

/**
 * Updates or inserts a user's progress on a piece of content.
 * 'known' increments mastery; 'unknown' sets to 1 (needs review); 'master' sets to 5.
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
    } else if (args.action === "master") {
        // Instantly mark as mastered
        newMasteryLevel = 5;
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

    // --- Streak Logic ---
    const now = Date.now();
    const streakDoc = await ctx.db
        .query("user_streaks")
        .withIndex("by_user", (q) => q.eq("userId", userId))
        .first();

    if (!streakDoc) {
        // First ever activity
        await ctx.db.insert("user_streaks", {
            userId,
            streak: 1,
            lastLoginDate: now,
        });
    } else {
        const lastDate = new Date(streakDoc.lastLoginDate);
        const currentDate = new Date(now);

        // Reset hours to compare calendar days
        lastDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);

        const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            // Consecutive day: Increment
            await ctx.db.patch(streakDoc._id, {
                streak: streakDoc.streak + 1,
                lastLoginDate: now,
            });
        } else if (diffDays > 1) {
            // Missed a day: Reset
            await ctx.db.patch(streakDoc._id, {
                streak: 1,
                lastLoginDate: now,
            });
        } else {
            // Same day: Just update timestamp to now
             await ctx.db.patch(streakDoc._id, {
                lastLoginDate: now,
            });
        }
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
    testSessionId: v.optional(v.string()), // NEW: Group questions from same session
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
      testSessionId: args.testSessionId,
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

        // 3. Weekly Activity (Real Data)
        const ONE_DAY = 24 * 60 * 60 * 1000;
        const now = Date.now();
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(now - (6 - i) * ONE_DAY);
            return {
                dayName: date.toLocaleDateString('en-US', { weekday: 'short' }), // Mon, Tue...
                startTime: new Date(date.setHours(0, 0, 0, 0)).getTime(),
                endTime: new Date(date.setHours(23, 59, 59, 999)).getTime()
            };
        });

        // Get all tests for the user (we already have 'tests' fetched above)
        // Aggregate score/activity per day
        const weeklyActivity = last7Days.map(day => {
            const dayTests = tests.filter(t => t.date >= day.startTime && t.date <= day.endTime);
            // define "activity" as total points (score * count) or just sum of scores?
            // Let's use sum of correct answers as "points" for now, or just sum of scores.
            // Let's use sum of scores to match the "Activity Score" label.
            const dayScore = dayTests.reduce((sum, t) => sum + (t.score || 0), 0);
            return {
                name: day.dayName,
                value: dayScore
            };
        });


        // 4. Accuracy Rate (Average of all test scores)
        const totalScoreSum = tests.reduce((sum, t) => sum + t.score, 0);
        const averageAccuracy = tests.length > 0 ? Math.round(totalScoreSum / tests.length) : 0;

        // 5. Total Questions Attempted
        const totalQuestionsAttempted = tests.reduce((sum, t) => sum + t.totalQuestions, 0);

        // 6. Streak Data
        const streakData = await ctx.db
            .query("user_streaks")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .first();

        const currentStreak = streakData ? streakData.streak : 0;

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
            weeklyActivity,
            currentStreak, // New field
            needsReviewCount: allProgress.filter(p => p.masteryLevel > 0 && p.masteryLevel < 3).length,
        };
    },
});
