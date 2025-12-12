/**
 * Test Attempts & History
 * Convex functions for managing test attempts, filtering questions, and viewing history
 */

import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

/**
 * Save individual question attempt
 */
export const saveQuestionAttempt = mutation({
  args: {
    questionId: v.string(),
    testType: v.union(v.literal("phrasal"), v.literal("idiom"), v.literal("grammar"), v.literal("vocabulary")),
    selectedAnswer: v.string(),
    correctAnswer: v.string(),
    testSessionId: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const isCorrect = args.selectedAnswer === args.correctAnswer;

    await ctx.db.insert("user_test_attempts", {
      userId,
      questionId: args.questionId,
      testType: args.testType,
      selectedAnswer: args.selectedAnswer,
      isCorrect,
      attemptDate: Date.now(),
      testSessionId: args.testSessionId,
    });

    return { isCorrect };
  },
});

/**
 * Get attempted question IDs for a test type (to filter them out)
 */
export const getAttemptedQuestions = query({
  args: {
    testType: v.union(v.literal("phrasal"), v.literal("idiom"), v.literal("grammar"), v.literal("vocabulary")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    const attempts = await ctx.db
      .query("user_test_attempts")
      .withIndex("by_user_test_type", (q) =>
        q.eq("userId", userId).eq("testType", args.testType)
      )
      .collect();

    // Return unique question IDs
    return [...new Set(attempts.map(a => a.questionId))];
  },
});

/**
 * Get test history (all completed sessions)
 */
export const getTestHistory = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    const limit = args.limit || 20;

    const testStats = await ctx.db
      .query("user_test_stats")
      .withIndex("by_user_date", (q) => q.eq("userId", userId))
      .order("desc")
      .take(limit);

    return testStats;
  },
});

/**
 * Get detailed results for a specific test session
 */
export const getTestSessionDetails = query({
  args: {
    testSessionId: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }

    // Get session summary
    const sessionStats = await ctx.db
      .query("user_test_stats")
      .withIndex("by_user_session", (q) =>
        q.eq("userId", userId).eq("testSessionId", args.testSessionId)
      )
      .first();

    if (!sessionStats) {
      return null;
    }

    // Get all question attempts for this session
    const attempts = await ctx.db
      .query("user_test_attempts")
      .withIndex("by_session", (q) => q.eq("testSessionId", args.testSessionId))
      .collect();

    return {
      ...sessionStats,
      attempts,
    };
  },
});

/**
 * Reset test progress (clear all attempts for a test type)
 */
export const resetTestProgress = mutation({
  args: {
    testType: v.union(v.literal("phrasal"), v.literal("idiom"), v.literal("grammar"), v.literal("vocabulary")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Delete all attempts for this test type
    const attempts = await ctx.db
      .query("user_test_attempts")
      .withIndex("by_user_test_type", (q) =>
        q.eq("userId", userId).eq("testType", args.testType)
      )
      .collect();

    for (const attempt of attempts) {
      await ctx.db.delete(attempt._id);
    }

    return { deleted: attempts.length };
  },
});

/**
 * Get test statistics grouped by type
 */
export const getTestStatsByType = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    const allAttempts = await ctx.db
      .query("user_test_attempts")
      .withIndex("by_user_test_type", (q) => q.eq("userId", userId))
      .collect();

    // Group by test type
    const statsByType = {
      vocabulary: { attempted: 0, correct: 0, accuracy: 0 },
      phrasal: { attempted: 0, correct: 0, accuracy: 0 },
      idiom: { attempted: 0, correct: 0, accuracy: 0 },
      grammar: { attempted: 0, correct: 0, accuracy: 0 },
    };

    allAttempts.forEach(attempt => {
      const stats = statsByType[attempt.testType];
      stats.attempted++;
      if (attempt.isCorrect) stats.correct++;
    });

    // Calculate accuracy
    Object.values(statsByType).forEach(stats => {
      stats.accuracy = stats.attempted > 0
        ? Math.round((stats.correct / stats.attempted) * 100)
        : 0;
    });

    return statsByType;
  },
});
