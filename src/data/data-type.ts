export default interface vocabulary {
  mainWord: string;
  hindimeanings: string[];
  englishmeanings: string[];
  examples: [string, string][];
  mnemonics?: string;
  audio?: string;
  isImportant?: boolean;

}
