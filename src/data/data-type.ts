export default interface vocabulary {
  mainWord: string;
  hindimeanings: string[];// at least 5 or maximum 10 
  englishmeanings: string[];
  examples: [string, string][];
  mnemonics?: string;
  audio?: string;
  isImportant?: boolean;

}
