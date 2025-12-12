/**
 * @deprecated This file is kept for backward compatibility.
 * Please import types from '@/types' instead.
 *
 * Example:
 * import { WordData, TestQuestion, getMasteryColor } from '@/types';
 */

// Re-export everything from the new centralized types location
export type {
  LearningStatus,
  ContentType,
  BaseContent,
  WordData,
  PhrasalVerbData,
  IdiomData,
  QuestionType,
  TestType,
  TestQuestion,
  TestAttempt,
  TestSession,
  TestResult,
  MasteryLevel,
  UserProgress,
  StreakData,
  LearningStats,
} from '@/types';

export type { default as vocabulary } from '@/types/content.types';
export { getMasteryColor, getMasteryLabel } from '@/types';
