export default interface vocabulary {
  mainWord: string;
  hindimeanings: string[];// at least 5 or maximum 10
  englishmeanings: string[];
  examples: [string, string][];
  mnemonics?: string;
  audio?: string;
  isImportant?: boolean;

}
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

// --- Test Question Data ---
export type QuestionType = 'mcq_synonym' | 'mcq_fill_blank' | 'mcq_correction';

export interface TestQuestion {
    id: string;
    testType: 'phrasal' | 'idiom' | 'grammar' | 'vocabulary';
    questionText: string;
    questionType: QuestionType; // e.g., 'mcq_synonym'
    options: string[]; // Options for MCQ
    correctAnswer: string; // The correct option/word
    contextWord?: string; // The word being asked about (for vocab/idioms)
}

// Helper to calculate progress (based on mastery level from Convex)
export const getMasteryColor = (masteryLevel: number) => {
  if (masteryLevel >= 4) return 'bg-primary/20 text-primary';
  if (masteryLevel >= 2) return 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400';
  if (masteryLevel >= 1) return 'bg-red-500/20 text-red-600 dark:text-red-400';
  return 'bg-gray-200 text-gray-500';
};
