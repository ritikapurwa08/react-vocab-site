import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const schema = defineSchema({
  ...authTables,
  user_word_progress: defineTable({
    userId: v.id("users"),
    word: v.string(),
    status: v.union(v.literal("known"), v.literal("unknown")),
    lastReviewed: v.number(),
  })
    .index("by_user_word", ["userId", "word"])
    .index("by_user", ["userId"]),
});

export default schema;
