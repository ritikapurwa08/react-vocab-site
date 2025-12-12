/**
 * Centralized Type Exports
 * Re-export all types from a single location for easier imports
 */

// Content Types
export type {
  LearningStatus,
  ContentType,
  BaseContent,
  WordData,
  PhrasalVerbData,
  IdiomData,
} from './content.types';

export type { default as vocabulary } from './content.types';

// Test Types
export type {
  QuestionType,
  TestType,
  TestQuestion,
  TestAttempt,
  TestSession,
  TestResult,
} from './test.types';

// Progress Types
export type {
  MasteryLevel,
  UserProgress,
  StreakData,
  LearningStats,
} from './progress.types';

export { getMasteryColor, getMasteryLabel } from './progress.types';
