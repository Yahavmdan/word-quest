export type Phonetics = {
  text: string;
  audio: string;
  sourceUrl: string;
  license: {
    name: string;
    url: string;
  };
};

export type Definition = {
  definition: string;
  synonyms: string[];
  antonyms: string[];
};

export type Meaning = {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[];
  antonyms: string[];
};

export type License = {
  name: string;
  url: string;
};

export type Word = {
  word: string;
  phonetic: string;
  phonetics: Phonetics[];
  meanings: Meaning[];
  license: License;
  sourceUrls: string[];
};

export type Levels = 'Easy' | 'Medium' | 'Hard';
