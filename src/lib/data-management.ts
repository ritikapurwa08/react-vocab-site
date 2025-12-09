import { type WordData, initialVocabulary, LOCAL_STORAGE_KEY } from '@/types/data';

/**
 * Loads vocabulary data from localStorage or returns the initial list.
 * @returns {WordData[]} The list of words.
 */
export const getInitialWords = (): WordData[] => {
  if (typeof window === 'undefined') return initialVocabulary;

  const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (localData) {
    try {
      // We assert the type is WordData[] after parsing, assuming valid data.
      return JSON.parse(localData) as WordData[];
    } catch (e) {
      console.error("Error parsing localStorage data:", e);
      return initialVocabulary;
    }
  }
  return initialVocabulary;
};

/**
 * Saves the vocabulary data to localStorage.
 * @param {WordData[]} words - The array of words to save.
 */
export const saveWordsToLocalStorage = (words: WordData[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(words));
  }
};

/**
 * Generates and downloads a JSON file of the requested word list status.
 * @param {WordData[]} words - The full list of words.
 * @param {'learned' | 'have to learn'} status - The status to filter by.
 */
export const downloadWordsAsJson = (words: WordData[], status: 'learned' | 'have to learn'): void => {
  const filteredWords = words
    .filter(word => word.status === status)
    // Include the new 'mnemonic' field in the export
    .map(({ id, word, websterMeaning, hindiMeaning, sentence, mnemonic, level }) => ({
      id,
      word,
      websterMeaning,
      hindiMeaning,
      sentence,
      mnemonic, // Include mnemonic
      level
    }));

  const statusLabel = status === 'learned' ? 'learned' : 'to-learn';
  const filename = `vocabulary_${statusLabel}_${new Date().toISOString().split('T')[0]}.json`;

  const jsonString = JSON.stringify(filteredWords, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const href = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = href;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};
