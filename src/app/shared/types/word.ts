export type Word = {
  word: string;
  results: Result[];
  syllables: Syllables;
};

export type Result = {
  definition?: string;
  examples?: string[];
  partOfSpeech?: string;
  synonyms?: string[];
  hasCategories?: string[];
  typeOf?: string[];
}

export type Syllables = {
  count: number;
  list: string[];
}


export type Levels = 'Easy' | 'Medium' | 'Hard';
