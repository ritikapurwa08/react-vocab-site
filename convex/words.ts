import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
// Force sync

// --- Queries ---

// Get words with pagination or by batch
// For now, we'll just fetch a range or all of them.
// Let's optimize for the learning flow: fetch words > X step.
export const getWords = query({
  args: {
    startStep: v.optional(v.number()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const start = args.startStep ?? 1;
    const limit = args.limit ?? 100;

    // We want words where step >= start
    // Using the 'by_step' index
    const words = await ctx.db
      .query("words")
      .withIndex("by_step", (q) => q.gte("step", start))
      .take(limit);

    return words;
  },
});

// Get a single word by step
export const getWordByStep = query({
  args: { step: v.number() },
  handler: async (ctx, args) => {
    const word = await ctx.db
      .query("words")
      .withIndex("by_step", (q) => q.eq("step", args.step))
      .first();
    return word;
  },
});

// --- Mutations ---

// Seed words: Bulk insert
export const seedWords = mutation({
  args: {
    words: v.array(
      v.object({
        word: v.string(),
        meaning: v.string(),
        hindiMeanings: v.array(v.string()),
        synonyms: v.array(v.string()),
        sentence: v.string(),
        step: v.number(),
        level: v.string(),
        type: v.string(),
        isFavorite: v.optional(v.boolean()),
      })
    ),
  },
  handler: async (ctx, args) => {
    let count = 0;
    for (const wordData of args.words) {
      // Check if word already exists to prevent duplicates (by step is safest)
      const existing = await ctx.db
        .query("words")
        .withIndex("by_step", (q) => q.eq("step", wordData.step))
        .first();

      if (!existing) {
        await ctx.db.insert("words", {
            word: wordData.word,
            meaning: wordData.meaning,
            hindiMeanings: wordData.hindiMeanings,
            synonyms: wordData.synonyms,
            sentence: wordData.sentence,
            step: wordData.step,
            level: wordData.level,
            type: wordData.type,
            isFavorite: wordData.isFavorite ?? false,
        });
        count++;
      }
    }
    return `Seeded ${count} new words.`;
  },
});
