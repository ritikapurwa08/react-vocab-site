import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,

  // Table to track user's learning status for individual content items
  user_word_progress: defineTable({
    userId: v.id("users"),
    // Identifier for the content (e.g., "Immaculate", "Bite the bullet")
    contentId: v.string(),
    // Type of content: word, phrasal verb, idiom
    contentType: v.union(v.literal("word"), v.literal("phrasal"), v.literal("idiom")),
    // Mastery level (0=new, 1=unknown, 5=mastered). This replaces simple 'status'.
    masteryLevel: v.number(),
    // This tracks the word's original index/number in its list (e.g., 1, 2, 3...)
    contentNumber: v.number(),
    lastReviewed: v.number(), // Timestamp
  })
    .index("by_user_content", ["userId", "contentId", "contentType"]) // Primary lookup for specific item
    .index("by_user_type_number", ["userId", "contentType", "contentNumber"]) // For tracking next item to learn
    .index("by_user", ["userId"]), // For general user stats

  // New table to track test results for scoring/leaderboards
  user_test_stats: defineTable({
    userId: v.id("users"),
    testType: v.union(v.literal("phrasal"), v.literal("idiom"), v.literal("grammar"), v.literal("vocabulary")),
    score: v.number(), // Percentage correct (0-100)
    totalQuestions: v.number(),
    correctAnswers: v.number(),
    date: v.number(), // Timestamp
  })
    .index("by_user_date", ["userId", "date"]),
});
