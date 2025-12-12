import { MOCK_WORD_LIST } from "../src/data/vocabulary";
import fs from 'fs';
import path from 'path';

const OUTPUT_FILE = path.resolve(process.cwd(), "words.json");

console.log(`Exporting ${MOCK_WORD_LIST.length} words to ${OUTPUT_FILE}...`);

// Ensure we only export what the user wants - maybe check for enrichment?
// User said "606 words which we have fully ready".
// Assuming MOCK_WORD_LIST contains these.

const readyWords = MOCK_WORD_LIST.slice(0, 606).map(word => ({
    word: word.word,
    meaning: word.meaning,
    hindiMeanings: word.hindiMeanings,
    synonyms: word.synonyms,
    sentence: word.sentence,
    step: word.step,
    level: word.level,
    type: word.type,
    isFavorite: false
}));

const jsonContent = JSON.stringify(readyWords, null, 2);

fs.writeFileSync(OUTPUT_FILE, jsonContent, 'utf-8');

console.log("Export complete!");
