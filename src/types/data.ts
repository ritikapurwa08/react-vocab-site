export type LearningStatus = 'known' | 'review' | 'unknown';

export interface WordData {
  id: number;
  word: string;
  meaning: string;        // The English definition (Webster's)
  hindiMeaning?: string;  // Optional: For the Hindi translation shown in UI
  synonyms?: string[];    // Optional: List of synonym chips
  sentence?: string;      // Example sentence
  status: LearningStatus; // 'known' | 'review' | 'unknown'
  setId: number;          // To organize words into sets of 20
  dateAdded: string;      // ISO Date string
}

// Helper to calculate progress
export const getStatusColor = (status: LearningStatus) => {
  switch (status) {
    case 'known': return 'bg-primary/20 text-primary';
    case 'review': return 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400';
    case 'unknown': return 'bg-red-500/20 text-red-600 dark:text-red-400';
    default: return 'bg-gray-200 text-gray-500';
  }
};
