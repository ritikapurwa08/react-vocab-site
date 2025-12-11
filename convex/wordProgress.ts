import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const updateProgress = mutation({
  args: {
    word: v.string(),
    status: v.union(v.literal("known"), v.literal("unknown")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const existing = await ctx.db
      .query("user_word_progress")
      .withIndex("by_user_word", (q) =>
        q.eq("userId", userId).eq("word", args.word)
      )
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        status: args.status,
        lastReviewed: Date.now(),
      });
    } else {
      await ctx.db.insert("user_word_progress", {
        userId,
        word: args.word,
        status: args.status,
        lastReviewed: Date.now(),
      });
    }
  },
});

export const getProgress = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("user_word_progress")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
  },
});
