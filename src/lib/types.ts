export interface Vocab {
  en: string;
  ipa: string;
  vi: string;
  example?: string;
  exampleVi?: string;
}

export interface ChoiceQuestion {
  type: "choice";
  question: string;
  options: string[];
  answer: number;
  explain?: string;
}

export interface FillQuestion {
  type: "fill";
  question: string;
  answer: string;
  explain?: string;
}

export interface ListenQuestion {
  type: "listen";
  prompt: string;
  word: string;
  options: string[];
  answer: number;
  explain?: string;
}

export type QuizQuestion = ChoiceQuestion | FillQuestion | ListenQuestion;

export interface Lesson {
  slug: string;
  stage: number;
  order: number;
  title: string;
  goal: string;
  minutes: number;
  intro: string;
  notes: string[];
  vocab: Vocab[];
  quiz: QuizQuestion[];
}

export interface Stage {
  id: number;
  icon: string;
  title: string;
  desc: string;
}
