/**
 * Content Types
 * Types for learning content: words, idioms, phrasal verbs
 */

export type LearningStatus = 'known' | 'review' | 'unknown';
export type ContentType = 'word' | 'phrasal' | 'idiom' | 'grammar';

export interface BaseContent {
  id: string;             // Unique identifier (word/phrase itself)
  type: ContentType;      // Type of content
  level: string;          // A1, B2, etc.
}

// --- Word Content ---
export interface WordData extends BaseContent {
  type: 'word';
  word: string;           // The actual word string
  meaning: string;        // The English definition (Webster's)
  hindiMeanings: string[];   // Hindi translations (array)
  synonyms: string[];    // List of synonym chips
  sentence: string;       // Example sentence
  masteryLevel: number;   // 0-5 for tracking progress
  step: number;           // Word's original index/number in its list
  isFavorite?: boolean;   // Optional favorite flag
}

// --- Phrasal Verb Content ---
export interface PhrasalVerbData extends BaseContent {
  type: 'phrasal';
  verb: string;           // The phrasal verb itself (e.g., "turn down")
  definition: string;
  example: string;
  category: string;
}

// --- Idiom Content ---
export interface IdiomData extends BaseContent {
  type: 'idiom';
  phrase: string;
  definition: string;
  example: string;
  category: string;
  icon: string;
}

// Legacy vocabulary interface (for backward compatibility)
export default interface vocabulary {
  mainWord: string;
  hindimeanings: string[];// at least 5 or maximum 10
  englishmeanings: string[];
  examples: [string, string][];
  mnemonics?: string;
  audio?: string;
  isImportant?: boolean;
}
