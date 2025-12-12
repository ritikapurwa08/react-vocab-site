/**
 * Test Types
 * Types for test questions and test sessions
 */

export type QuestionType = 'mcq_synonym' | 'mcq_fill_blank' | 'mcq_correction';
export type TestType = 'phrasal' | 'idiom' | 'grammar' | 'vocabulary';

export interface TestQuestion {
    id: string;
    testType: TestType;
    questionText: string;
    questionType: QuestionType; // e.g., 'mcq_synonym'
    options: string[]; // Options for MCQ
    correctAnswer: string; // The correct option/word
    contextWord?: string; // The word being asked about (for vocab/idioms)
}

export interface TestAttempt {
    questionId: string;
    selectedAnswer: string;
    isCorrect: boolean;
    attemptDate: number;
}

export interface TestSession {
    testSessionId: string;
    testType: TestType;
    totalQuestions: number;
    correctAnswers: number;
    score: number;
    startTime: number;
    endTime?: number;
    attempts: TestAttempt[];
}

export interface TestResult {
    score: number;
    total: number;
    testType: TestType;
    correctAnswers: number;
    incorrectAnswers: number;
    percentage: number;
}
