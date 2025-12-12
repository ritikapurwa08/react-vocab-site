import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
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

// Smart Resume: Get next batch of words based on user progress
export const getNextWords = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    let startStep = 1;

    if (userId) {
       const lastProgress = await ctx.db
           .query("user_word_progress")
           .withIndex("by_user_type_number", (q) => q.eq("userId", userId).eq("contentType", "word"))
           .order("desc")
           .first();

       if (lastProgress) {
           startStep = lastProgress.contentNumber + 1;
       }
    }

    const words = await ctx.db
      .query("words")
      .withIndex("by_step", (q) => q.gte("step", startStep))
      .take(10); // Batch size 10 as requested

    return words;
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

// Add Hindi meanings or synonyms to a word
export const addWordContributions = mutation({
  args: {
    wordId: v.id("words"),
    type: v.union(v.literal("hindi"), v.literal("synonym")),
    items: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const word = await ctx.db.get(args.wordId);
    if (!word) {
      throw new Error("Word not found");
    }

    if (args.type === "hindi") {
      // Add new Hindi meanings (avoid duplicates)
      const existingMeanings = new Set(word.hindiMeanings);
      const newMeanings = args.items.filter(item => !existingMeanings.has(item));

      await ctx.db.patch(args.wordId, {
        hindiMeanings: [...word.hindiMeanings, ...newMeanings],
      });

      return { added: newMeanings.length, type: "Hindi meanings" };
    } else {
      // Add new synonyms (avoid duplicates)
      const existingSynonyms = new Set(word.synonyms);
      const newSynonyms = args.items.filter(item => !existingSynonyms.has(item));

      await ctx.db.patch(args.wordId, {
        synonyms: [...word.synonyms, ...newSynonyms],
      });

      return { added: newSynonyms.length, type: "synonyms" };
    }
  },
});
