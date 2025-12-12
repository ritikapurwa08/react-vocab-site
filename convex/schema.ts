import { defineSchema, defineTable } from "convex/server";
// Force sync
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

  // Global words table (migrated from local JSON)
  words: defineTable({
    word: v.string(),
    meaning: v.string(), // English definition
    hindiMeanings: v.array(v.string()),
    synonyms: v.array(v.string()),
    sentence: v.string(),
    step: v.number(), // The unique number/index of the word (1 to 600+)
    level: v.string(), // e.g. "B2", "C1"
    type: v.string(),  // usually "word"
    isFavorite: v.optional(v.boolean()), // defaults to false in app logic
  })
    .index("by_step", ["step"]) // To fetch sequential batches
    .index("by_word", ["word"]), // To check existence

  // New table to track test results for scoring/leaderboards
  user_test_stats: defineTable({
    userId: v.id("users"),
    testType: v.union(v.literal("phrasal"), v.literal("idiom"), v.literal("grammar"), v.literal("vocabulary")),
    score: v.number(), // Percentage correct (0-100)
    totalQuestions: v.number(),
    correctAnswers: v.number(),
    date: v.number(), // Timestamp
    testSessionId: v.optional(v.string()), // Groups questions from same test session
  })
    .index("by_user_date", ["userId", "date"])
    .index("by_user_session", ["userId", "testSessionId"]),

  // NEW: Track individual question attempts to prevent showing same questions
  user_test_attempts: defineTable({
    userId: v.id("users"),
    questionId: v.string(), // Unique ID of the question
    testType: v.union(v.literal("phrasal"), v.literal("idiom"), v.literal("grammar"), v.literal("vocabulary")),
    selectedAnswer: v.string(), // User's chosen answer
    isCorrect: v.boolean(), // Whether the answer was correct
    attemptDate: v.number(), // Timestamp
    testSessionId: v.string(), // Groups questions from same test session
  })
    .index("by_user_question", ["userId", "questionId"]) // Check if question already attempted
    .index("by_user_test_type", ["userId", "testType"]) // Get all attempts for a test type
    .index("by_session", ["testSessionId"]), // Get all attempts in a session

  // Track user streaks and daily activity
  user_streaks: defineTable({
    userId: v.id("users"),
    streak: v.number(),
    lastLoginDate: v.number(), // Timestamp of last activity
  })
    .index("by_user", ["userId"]),
});
