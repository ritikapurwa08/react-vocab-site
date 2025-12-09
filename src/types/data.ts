/**
 * Defines the strict structure for a single vocabulary word object.
 */
export interface WordData {
  id: number;
  word: string;
  websterMeaning: string;
  hindiMeaning: string;
  sentence: string;
  level: string;
  // Status is strictly typed to one of these three strings.
  status: 'learned' | 'revised' | 'have to learn';
}

/**
 * Defines the structure for the visual/logic configuration of a status option.
 */
export interface StatusOption {
  key: WordData['status'];
  label: string;
  group: string;
  variant: 'success' | 'warning' | 'destructive';
}

// Key for localStorage (Centralized)
export const LOCAL_STORAGE_KEY: string = 'vocabularyProgress';

// Status options mapping (Centralized)
export const STATUS_OPTIONS: StatusOption[] = [
  { key: 'learned', label: 'Learned', group: 'Learned', variant: 'success' },
  { key: 'revised', label: 'Learned & Reviewing', group: 'Revised', variant: 'warning' },
  { key: 'have to learn', label: 'Need to Learn', group: 'New', variant: 'destructive' },
];

/**
 * Default starter vocabulary list.
 */
export const initialVocabulary: WordData[] = [
  { id: 1, word: "Ubiquitous", websterMeaning: "Existing or being everywhere at the same time; constantly encountered.", hindiMeaning: "सर्वव्यापी (Sarvavyaapi)", sentence: "Smartphones have become ubiquitous in modern society.", level: "C1", status: "have to learn" },
  { id: 2, word: "Ephemeral", websterMeaning: "Lasting for a very short time.", hindiMeaning: "क्षणभंगुर (Kshanbhangur)", sentence: "The beauty of a sunset is ephemeral.", level: "B2", status: "have to learn" },
  { id: 3, word: "Mellifluous", websterMeaning: "Having a smooth, flowing sound.", hindiMeaning: "मधुर (Madhur)", sentence: "The singer's mellifluous voice captivated the audience.", level: "C2", status: "have to learn" },
  { id: 4, word: "Serendipity", websterMeaning: "The occurrence and development of events by chance in a happy or beneficial way.", hindiMeaning: "संयोगवश सुखद खोज (Sanyogavash Sukhad Khoj)", sentence: "Finding the lost key was a stroke of serendipity.", level: "B1", status: "have to learn" },
  { id: 5, word: "Pernicious", websterMeaning: "Having a harmful effect, especially in a gradual or subtle way.", hindiMeaning: "हानिकारक (Haanikarak)", sentence: "The pernicious effects of social media can be hard to spot.", level: "C1", status: "have to learn" },
  { id: 6, word: "Alacrity", websterMeaning: "Brisk and cheerful readiness.", hindiMeaning: "तत्परता (Tatparta)", sentence: "She accepted the promotion with alacrity.", level: "B2", status: "have to learn" },
];
