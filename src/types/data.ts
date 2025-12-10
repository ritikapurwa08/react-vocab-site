// src/types/data.ts

export type LearningStatus = 'known' | 'review' | 'unknown';

export interface WordData {
  dateAdded: string | number | Date;
  id: number;
  word: string;
  meaning: string;       // Simple manual meaning
  sentence?: string;     // Optional manual sentence
  status: LearningStatus;
  setId: number;         // Explicitly belongs to Set 1, Set 2, etc.
}

// Helper to chunk words into sets of 20 if they don't have an ID yet
export const WORDS_PER_SET = 20;

export const initialVocabulary: WordData[] = [
  { id: 1, word: "Ubiquitous", meaning: "Present, appearing, or found everywhere.", status: "unknown", setId: 1,dateAdded: new Date().toISOString() },

  // ... (Imagine 17 more for Set 1)
];
