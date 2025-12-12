import { MOCK_WORD_LIST } from "../src/data/vocabulary";
import { api } from "../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function main() {
  console.log("Initializing seed script...");
  if (!process.env.VITE_CONVEX_URL) {
    console.error("FATAL: VITE_CONVEX_URL is not defined in .env.local");
    return;
  }
  console.log("Convex URL found:", process.env.VITE_CONVEX_URL.substring(0, 20) + "...");

  const client = new ConvexHttpClient(process.env.VITE_CONVEX_URL);

  console.log(`Seeding ${MOCK_WORD_LIST.length} words...`);

  // Try a small batch first
  const BATCH_SIZE = 50;

  for (let i = 0; i < MOCK_WORD_LIST.length; i += BATCH_SIZE) {
    const batch = MOCK_WORD_LIST.slice(i, i + BATCH_SIZE);
    console.log(`Seeding batch ${i / BATCH_SIZE + 1} of ${Math.ceil(MOCK_WORD_LIST.length/BATCH_SIZE)} (${i} to ${i + batch.length})...`);

    const cleanBatch = batch.map(w => ({
        word: w.word,
        meaning: w.meaning,
        hindiMeanings: w.hindiMeanings || [], // Ensure array
        synonyms: w.synonyms || [],         // Ensure array
        sentence: w.sentence || "",         // Ensure string
        step: w.step,
        level: w.level || "B2",             // Default if missing
        type: w.type || "word"
    }));

    try {
        await client.mutation(api.words.seedWords, { words: cleanBatch });
        console.log(`Batch ${i / BATCH_SIZE + 1} Success`);
    } catch (error: any) {
        console.error(`Error seeding batch ${i}:`, error.message || error);
        if (error.data) {
             console.error("Error data:", JSON.stringify(error.data, null, 2));
        }
        // Break on error to avoid spamming
        break;
    }
  }

  console.log("Seeding process finished.");
}

main().catch(console.error);
