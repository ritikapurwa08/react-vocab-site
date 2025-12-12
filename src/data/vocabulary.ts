// Re-import the updated interface for WordData
import {type WordData } from "./data-type";
import type { IdiomData, PhrasalVerbData, TestQuestion } from "./data-type";
import { IMPORTED_WORDS } from "./imported-words";
import { grammarQuestions, idiomQuestions, phrasalVerbQuestions } from "./mock-test-question";

// --- Mock Word Data ---
export const MOCK_WORD_LIST: WordData[] = [
  // --- CLEANLINESS / APOLOGY (1-10) ---
  {
    id: "1",
    step: 1,
    type: "word",
    word: "Immaculate",
    meaning: "Perfectly clean, neat, or tidy.",
    hindiMeanings: ["निर्मल (Nirmal)", "स्वच्छ", "बेदाग", "पवित्र", "त्रुटिहीन", "निष्कलंक", "विमल", "साफ-सुथरा"],
    synonyms: ["Spotless", "Pristine", "Flawless"],
    sentence: "His white shirt was immaculate.",
    masteryLevel: 0,
    level: "B2",
  },
  {
    id: "contrite",
    step: 2,
    type: "word",
    word: "Contrite",
    meaning: "Feeling or expressing remorse or penitence.",
    hindiMeanings: ["पश्चातापी (Paschataapi)", "पछतावा", "लज्जित", "खिन्न", "अनुतप्त", "खेदयुक्त", "तौबा करने वाला"],
    synonyms: ["Remorseful", "Regretful", "Penitent"],
    sentence: "He looked contrite after breaking the vase.",
    masteryLevel: 0,
    level: "C1",
  },
  {
    id: "repented",
    step: 3,
    type: "word",
    word: "Repent",
    meaning: "To feel sincere regret or remorse about one's wrongdoing.",
    hindiMeanings: ["पछताना (Pachhtana)", "प्रायश्चित करना", "तौबा करना", "अफ़सोस करना", "खेद प्रकट करना", "ग्लानि अनुभव करना"],
    synonyms: ["Atone", "Regret", "Apologize"],
    sentence: "He repented for his harsh words.",
    masteryLevel: 0,
    level: "B1",
  },
  {
    id: "remorse",
    step: 4,
    type: "word",
    word: "Remorse",
    meaning: "Deep regret or guilt for a wrong committed.",
    hindiMeanings: ["आत्मग्लानि (Aatmaglani)", "पछतावा", "अनुताप", "खेद", "मलाल", "ग्लानि", "परिताप"],
    synonyms: ["Guilt", "Contrition", "Shame"],
    sentence: "She felt no remorse for her actions.",
    masteryLevel: 0,
    level: "C1",
  },
  // Add 1 more word for test options
  {
    id: "ephemeral",
    step: 5,
    type: "word",
    word: "Ephemeral",
    meaning: "Lasting for a very short time.",
    hindiMeanings: ["क्षणिक (Kshanik)", "अल्पकालिक", "नश्वर", "भंगुर", "अस्थायी"],
    synonyms: ["Fleeting", "Transitory", "Short-lived"],
    sentence: "Fame in the digital age is often ephemeral.",
    masteryLevel: 0,
    level: "C2",
  },
  ...IMPORTED_WORDS,
];

// --- Mock Phrasal Verb Data ---
export const MOCK_PHRASAL_VERBS: PhrasalVerbData[] = [
  { id: 'run_into', type: 'phrasal', level: 'B2', verb: 'Run into', definition: 'To meet someone unexpectedly.', example: 'I **ran into** my old math teacher at the grocery store yesterday.', category: 'Social' },
  { id: 'look_up', type: 'phrasal', level: 'B1', verb: 'Look up', definition: 'To find information about something in a book, directory, or website.', example: 'I need to **look up** the word in the dictionary.', category: 'Study' },
  { id: 'turn_down', type: 'phrasal', level: 'B2', verb: 'Turn down', definition: 'To refuse or reject an offer or request.', example: 'He **turned down** the job offer because of the low salary.', category: 'Business' },
  { id: 'break_down', type: 'phrasal', level: 'A2', verb: 'Break down', definition: 'To stop functioning (for a machine or vehicle).', example: 'The car **broke down** on the highway.', category: 'General' },
];

// --- Mock Idiom Data (reusing IdiomsPage data with minimal changes) ---
export const MOCK_IDIOMS: IdiomData[] = [
  { id: 'bite_the_bullet', type: 'idiom', phrase: 'Bite the bullet', definition: 'To force yourself to perform a difficult or unpleasant task that is inevitable.', example: '"I hate going to the dentist, but I\'ll just have to **bite the bullet**."', level: 'B2', category: 'General', icon: 'bolt' },
  { id: 'break_the_ice', type: 'idiom', phrase: 'Break the ice', definition: 'To say or do something that makes people feel more relaxed and comfortable in a new social situation.', example: '"He told a joke to **break the ice** at the meeting."', level: 'A2', category: 'Social', icon: 'ac_unit' },
  { id: 'hit_the_sack', type: 'idiom', phrase: 'Hit the sack', definition: 'A casual way to say you are going to bed to sleep.', example: '"I\'m exhausted, I\'m going to **hit the sack**."', level: 'B1', category: 'Daily Life', icon: 'bedtime' },
];

// --- Mock Test Questions (New) ---
export const MOCK_TEST_QUESTIONS: TestQuestion[] = [
  // Vocabulary Question (Synonym for Ephemeral) - Matches the image example

  // Phrasal Verb Question (Fill-in-the-blank)
 ...phrasalVerbQuestions,
  // Idiom Question (Meaning Match)
...idiomQuestions,
  // Grammar Question (Correction - Subject-Verb Agreement)
 ...grammarQuestions
];
