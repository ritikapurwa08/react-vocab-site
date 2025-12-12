export default interface vocabulary {
  mainWord: string;
  hindimeanings: string[]; // at least 5 or maximum 10
  englishmeanings: string[];
  examples: [string, string][];
  mnemonics?: string;
  audio?: string;
  isImportant?: boolean;
}

export const vocabularyListPart1: vocabulary[] = [
  // --- CLEANLINESS / APOLOGY (1-10) ---
  {
    mainWord: "Immaculate",
    hindimeanings: ["निर्मल", "स्वच्छ", "बेदाग", "पवित्र", "त्रुटिहीन", "निष्कलंक", "विमल", "साफ-सुथरा"],
    englishmeanings: ["Perfectly clean, neat, or tidy", "Free from flaws or mistakes"],
    examples: [
      ["His white shirt was immaculate.", "उसकी सफेद कमीज बिल्कुल बेदाग थी।"],
      ["She has an immaculate record of service.", "उसका सेवा रिकॉर्ड त्रुटिहीन है।"]
    ],
    mnemonics: "Amma keeps the house immaculate (Clean).",
    audio: "",
    isImportant: true
  },
  {
    mainWord: "Contrite",
    hindimeanings: ["पश्चातापी", "पछतावा", "लज्जित", "खिन्न", "अनुतप्त", "खेदयुक्त", "तौबा करने वाला"],
    englishmeanings: ["Feeling or expressing remorse or penitence", "Affected by guilt"],
    examples: [
      ["He looked contrite after breaking the vase.", "फूलदान तोड़ने के बाद वह पश्चातापी लग रहा था।"]
    ],
    mnemonics: "Contract lost - He felt contrite after the contract was lost due to his error.",
    audio: "",
    isImportant: true
  },
  {
    mainWord: "Repent",
    hindimeanings: ["पछताना", "प्रायश्चित करना", "तौबा करना", "अफ़सोस करना", "खेद प्रकट करना", "ग्लानि अनुभव करना"],
    englishmeanings: ["To feel sincere regret or remorse about one's wrongdoing"],
    examples: [
      ["He repented for his harsh words.", "उसने अपने कठोर शब्दों के लिए पश्चाताप किया।"]
    ],
    mnemonics: "Re-paint - To repent for drawing on the wall, you must re-paint it.",
    audio: "",
    isImportant: false
  },
  {
    mainWord: "Remorse",
    hindimeanings: ["आत्मग्लानि", "पछतावा", "अनुताप", "खेद", "मलाल", "ग्लानि", "परिताप"],
    englishmeanings: ["Deep regret or guilt for a wrong committed"],
    examples: [
      ["She felt no remorse for her actions.", "उसे अपने कार्यों के लिए कोई पछतावा नहीं था।"]
    ],
    mnemonics: "Morose/Rose - He was morose (sad) and felt remorse after crushing the rose.",
    audio: "",
    isImportant: true
  },
  {
    mainWord: "Penitent",
    hindimeanings: ["प्रायश्चित्त करनेवाला", "लज्जित", "पश्चातापी", "तौबा करने वाला", "गुनाहगार (feeling like one)", "अनुतप्त"],
    englishmeanings: ["Feeling or showing sorrow and regret for having done wrong"],
    examples: [
      ["The penitent sinner asked for forgiveness.", "प्रायश्चित करने वाले पापी ने क्षमा मांगी।"]
    ],
    mnemonics: "Pen/Paint - The student was penitent after spilling paint on his pen.",
    audio: "",
    isImportant: false
  },
  {
    mainWord: "Atonement",
    hindimeanings: ["प्रायश्चित", "हरजाना", "क्षतिपूर्ति", "निस्तार", "शुद्धि", "पाप-मुक्ति", "प्रतिफल"],
    englishmeanings: ["Reparation for a wrong or injury"],
    examples: [
      ["He sent flowers as an atonement for being late.", "उसने देर से आने के प्रायश्चित के रूप में फूल भेजे।"]
    ],
    mnemonics: "At-one-ment - Becoming 'at one' with God again by fixing your mistakes.",
    audio: "",
    isImportant: true
  },
  {
    mainWord: "Compunction",
    hindimeanings: ["मलाल", "खेद", "आत्मग्लानि", "संकोच", "हिचकिचाहट", "पछतावा", "मन की चुभन"],
    englishmeanings: ["A feeling of guilt or moral scruple that prevents or follows the doing of something bad"],
    examples: [
      ["He stole the money without any compunction.", "उसने बिना किसी मलाल के पैसे चुरा लिए।"]
    ],
    mnemonics: "Computer punch - He felt compunction after he punched the computer screen in anger.", // Also Punctual
    audio: "",
    isImportant: true
  },
  {
    mainWord: "Expiate",
    hindimeanings: ["प्रायश्चित करना", "भरपाई करना", "पाप काटना", "शुद्ध करना", "क्षतिपूर्ति करना", "मुक्त करना"],
    englishmeanings: ["To atone for (guilt or sin)"],
    examples: [
      ["He tried to expiate his crimes by doing charity.", "उसने दान देकर अपने अपराधों का प्रायश्चित करने की कोशिश की।"]
    ],
    mnemonics: "Ex/Piya - He tried to expiate his mistake to get his Ex Piya back.",
    audio: "",
    isImportant: true
  },
  {
    mainWord: "Impenitent",
    hindimeanings: ["ढेठ", "अपश्चातापी", "हठी", "कठोर", "निष्ठुर", "बिना पछतावे के", "शर्महीन"],
    englishmeanings: ["Not feeling shame or regret about one's actions or attitudes"],
    examples: [
      ["The criminal remained impenitent till the end.", "अपराधी अंत तक अपश्चातापी रहा।"]
    ],
    mnemonics: "Im-penitent (Not penitent) - Like someone who refuses to pick up the pen they dropped.",
    audio: "",
    isImportant: false
  },
  {
    mainWord: "Shameless",
    hindimeanings: ["बेशरम", "लज्जाहीन", "निर्लज्ज", "बेहया", "धृष्ट", "ढीठ", "असभ्य"],
    englishmeanings: ["Characterized by a lack of shame"],
    examples: [
      ["It was a shameless attempt to cheat.", "यह धोखा देने का एक शर्मनाक प्रयास था।"]
    ],
    mnemonics: "Simple: Without shame.",
    audio: "",
    isImportant: false
  },

  // --- RELEVANCE / NECESSITY (11-22) ---
  {
    mainWord: "Extraneous",
    hindimeanings: ["अनावश्यक", "बाहरी", "असंबद्ध", "भिन्न", "फालतू", "पराया", "अलग", "बेमतलब"],
    englishmeanings: ["Irrelevant or unrelated to the subject being dealt with"],
    examples: [
      ["Remove all extraneous information from the report.", "रिपोर्ट से सभी अनावश्यक जानकारी हटा दें।"]
    ],
    mnemonics: "Extra - Information that is extra and not needed.",
    audio: "",
    isImportant: true
  },
  {
    mainWord: "Irrelevant",
    hindimeanings: ["अप्रासंगिक", "बेमतलब", "असंबद्ध", "व्यर्थ", "अनुपयुक्त", "बेतुका", "विषयबाह्य"],
    englishmeanings: ["Not connected with or relevant to something"],
    examples: [
      ["His comment was irrelevant to the discussion.", "उसकी टिप्पणी चर्चा के लिए अप्रासंगिक थी।"]
    ],
    mnemonics: "Not relevant.",
    audio: "",
    isImportant: false
  },
  {
    mainWord: "Superfluous",
    hindimeanings: ["फालतू", "जरूरत से ज्यादा", "अतिरिक्त", "अनावश्यक", "अधिक", "बाहुल्य", "व्यर्थ"],
    englishmeanings: ["Unnecessary, especially through being more than enough"],
    examples: [
      ["Please avoid using superfluous words.", "कृपया फालतू शब्दों का प्रयोग करने से बचें।"]
    ],
    mnemonics: "Super flow - Water flowing over the limit (super) is extra/unnecessary.",
    audio: "",
    isImportant: true
  },
  {
    mainWord: "Redundant",
    hindimeanings: ["निरर्थक", "अनावश्यक", "फालतू", "अधिक", "व्यर्थ", "दोहराया हुआ", "प्रतिशायी"],
    englishmeanings: ["Not or no longer needed or useful; superfluous"],
    examples: [
      ["The old system has become redundant.", "पुरानी प्रणाली निरर्थक हो गई है।"]
    ],
    mnemonics: "Re-done - If work is done again (re-done), the second time is redundant.",
    audio: "",
    isImportant: true
  },
  {
    mainWord: "Pertinent",
    hindimeanings: ["प्रासंगिक", "उचित", "ठीक", "उपयुक्त", "मुनासिब", "योग्य", "संगत", "विषय से सम्बद्ध"],
    englishmeanings: ["Relevant or applicable to a particular matter"],
    examples: [
      ["Please ask questions pertinent to the topic.", "कृपया विषय से प्रासंगिक प्रश्न पूछें।"]
    ],
    mnemonics: "Party-tenant - The tenant is pertinent (important/relevant) to the landlord.",
    audio: "",
    isImportant: true
  },
  {
    mainWord: "Germane",
    hindimeanings: ["सार्थक", "उपयुक्त", "संगत", "संबद्ध", "उचित", "मिलता-जुलता", "सगोत्र"],
    englishmeanings: ["Relevant to a subject under consideration"],
    examples: [
      ["That is not germane to our theme.", "वह हमारे विषय के लिए सार्थक नहीं है।"]
    ],
    mnemonics: "German - Speaking German is germane (relevant) if you are in Germany.",
    audio: "",
    isImportant: true
  },
  {
    mainWord: "Apropos",
    hindimeanings: ["उचित", "सटीक", "प्रसंगवश", "समयानुकूल", "प्रासंगिक", "उपयुक्त", "विषय के अनुसार"],
    englishmeanings: ["Very appropriate to a particular situation"],
    examples: [
      ["His speech was apropos to the occasion.", "उनका भाषण इस अवसर के लिए बिल्कुल सटीक था।"]
    ],
    mnemonics: "Propose - A proposal should be made at an apropos (appropriate) time.",
    audio: "",
    isImportant: true
  },
  {
    mainWord: "Apposite",
    hindimeanings: ["उचित", "यथायोग्य", "ठीक", "उपयुक्त", "संगत", "मौजूँ", "मुनासिब"],
    englishmeanings: ["Apt in the circumstances or in relation to something"],
    examples: [
      ["He used an apposite quotation.", "उसने एक यथायोग्य उद्धरण का प्रयोग किया।"]
    ],
    mnemonics: "Opposite - Not opposite, but apposite (suitable).",
    audio: "",
    isImportant: true
  },
  {
    mainWord: "Tantamount",
    hindimeanings: ["समान", "बराबर", "तुल्य", "एक समान", "जैसा", "समतुल्य", "बराबरी का"],
    englishmeanings: ["Equivalent in seriousness to; virtually the same as"],
    examples: [
      ["His silence is tantamount to admission of guilt.", "उसकी चुप्पी अपराध स्वीकार करने के बराबर है।"]
    ],
    mnemonics: "Tent-amount - The amount of space in the tent is tantamount (equal) to the room.",
    audio: "",
    isImportant: true
  },
  {
    mainWord: "Integral",
    hindimeanings: ["अभिन्न", "अनिवार्य", "पूर्ण", "समूचा", "अखंड", "अविभाज्य", "आवश्यक"],
    englishmeanings: ["Necessary to make a whole complete; essential or fundamental"],
    examples: [
      ["Teamwork is integral to success.", "सफलता के लिए टीम वर्क अनिवार्य है।"]
    ],
    mnemonics: "Integer - Like an integer is a whole number, this part is needed to make it whole.",
    audio: "",
    isImportant: true
  },
  {
    mainWord: "Essential",
    hindimeanings: ["आवश्यक", "महत्वपूर्ण", "अनिवार्य", "बुनियादी", "मौलिक", "तात्विक", "जरूरी"],
    englishmeanings: ["Absolutely necessary; extremely important"],
    examples: [
      ["Water is essential for life.", "जीवन के लिए जल आवश्यक है।"]
    ],
    mnemonics: "",
    audio: "",
    isImportant: false
  },
  {
    mainWord: "Substantial",
    hindimeanings: ["संतोषजनक", "ठोस", "काफी", "मजबूत", "वास्तविक", "सारवान", "पर्याप्त", "बड़ा"],
    englishmeanings: ["Of considerable importance, size, or worth"],
    examples: [
      ["He made a substantial donation.", "उसने काफी बड़ा दान दिया।"]
    ],
    mnemonics: "Substance - Something with a lot of substance is substantial.",
    audio: "",
    isImportant: true
  },

  // --- BREVITY (23-25) ---
  {
    mainWord: "Brevity",
    hindimeanings: ["संक्षिप्तता", "लघुता", "अल्पता", "संक्षेप", "थोड़े में", "कम शब्दों में", "शीघ्रता"],
    englishmeanings: ["Concise and exact use of words in writing or speech"],
    examples: [
      ["I admire the brevity of his speech.", "मैं उनके भाषण की संक्षिप्तता की प्रशंसा करता हूं।"]
    ],
    mnemonics: "Brief - Brevity comes from brief.",
    audio: "",
    isImportant: true
  },
  {
    mainWord: "Concise",
    hindimeanings: ["संक्षिप्त", "लघु", "छोटा", "सारगर्भित", "गठा हुआ", "कम लफ्ज़ों वाला", "मुख़्तसर"],
    englishmeanings: ["Giving a lot of information clearly and in a few words"],
    examples: [
      ["Make your answers clear and concise.", "अपने उत्तर स्पष्ट और संक्षिप्त रखें।"]
    ],
    mnemonics: "Cut-size - Cut the size of the text to make it concise.",
    audio: "",
    isImportant: true
  },
  {
    mainWord: "Terse",
    hindimeanings: ["रूखा", "संक्षिप्त", "छोटा", "कड़ा", "स्पष्ट", "बिना लाग-लपेट के", "संक्षेप"],
    englishmeanings: ["Sparing in the use of words; abrupt"],
    examples: [
      ["He gave a terse reply.", "उसने रूखा जवाब दिया।"]
    ],
    mnemonics: "Purse/Tars - She became terse (abrupt) when someone stole her purse.",
    audio: "",
    isImportant: true
  }
];
// Re-import the updated interface for WordData
import {type WordData } from "./data-type";
import type { IdiomData, PhrasalVerbData, TestQuestion } from "./data-type";
import { IMPORTED_WORDS } from "./imported-words";

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
  {
      id: "q_vocab_1",
      testType: "vocabulary",
      questionType: "mcq_synonym",
      questionText: "Which word is the most appropriate synonym for **ephemeral**?",
      options: ["Enduring", "Transitory", "Eternal", "Tangible"],
      correctAnswer: "Transitory",
      contextWord: "ephemeral",
  },
  // Phrasal Verb Question (Fill-in-the-blank)
  {
      id: "q_phrasal_1",
      testType: "phrasal",
      questionType: "mcq_fill_blank",
      questionText: "The manager decided to ________ the proposal because it was too risky.",
      options: ["Turn down", "Turn up", "Take off", "Break in"],
      correctAnswer: "Turn down",
      contextWord: "Turn down (to reject)",
  },
  // Idiom Question (Meaning Match)
  {
      id: "q_idiom_1",
      testType: "idiom",
      questionType: "mcq_synonym",
      questionText: "What does the idiom **'Cost an arm and a leg'** mean?",
      options: ["To save money carefully", "To be very expensive", "To pay in cash", "To barter for a good price"],
      correctAnswer: "To be very expensive",
      contextWord: "Cost an arm and a leg",
  },
  // Grammar Question (Correction - Subject-Verb Agreement)
  {
      id: "q_grammar_1",
      testType: "grammar",
      questionType: "mcq_correction",
      questionText: "Select the correct sentence:",
      options: [
          "Neither of the statements are true.",
          "Neither of the statements is true.",
          "Neither of the statement is true.",
          "Neither of the statements are correct.",
      ],
      correctAnswer: "Neither of the statements is true.",
      contextWord: "Subject-Verb Agreement (Singular subject with 'Neither of')",
  },
  // Grammar Question (Correction - Tense)
  {
      id: "q_grammar_2",
      testType: "grammar",
      questionType: "mcq_correction",
      questionText: "Choose the sentence with the correct tense usage:",
      options: [
          "She is living here since 2010.",
          "She lives here since 2010.",
          "She has been living here since 2010.",
          "She had lived here since 2010.",
      ],
      correctAnswer: "She has been living here since 2010.",
      contextWord: "Present Perfect Continuous Tense",
  },
];
