/**
 * Progress Types
 * Types for tracking user learning progress and mastery
 */

export type MasteryLevel = 0 | 1 | 2 | 3 | 4 | 5;

export interface UserProgress {
  contentId: string;
  contentType: 'word' | 'phrasal' | 'idiom';
  masteryLevel: MasteryLevel;
  lastReviewed: number;
  contentNumber: number;
}

export interface StreakData {
  streak: number;
  lastLoginDate: number;
}

export interface LearningStats {
  totalWords: number;
  wordsKnown: number;
  wordsInProgress: number;
  wordsToReview: number;
  phrasalKnown: number;
  idiomsKnown: number;
  currentStreak: number;
  totalTestsCovered: number;
  averageAccuracy: number;
  totalQuestionsAttempted: number;
}

// Helper to get mastery color based on level
export const getMasteryColor = (masteryLevel: number): string => {
  if (masteryLevel >= 4) return 'bg-primary/20 text-primary';
  if (masteryLevel >= 2) return 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400';
  if (masteryLevel >= 1) return 'bg-red-500/20 text-red-600 dark:text-red-400';
  return 'bg-gray-200 text-gray-500';
};

// Helper to get mastery label
export const getMasteryLabel = (masteryLevel: number): string => {
  if (masteryLevel >= 5) return 'Mastered';
  if (masteryLevel >= 3) return 'Known';
  if (masteryLevel >= 1) return 'Learning';
  return 'New';
};
