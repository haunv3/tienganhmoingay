export type LearningLevel = "foundation" | "A1" | "A2" | "B1" | "B2" | "TOEIC" | "IELTS";

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
  audio?: string;
  acceptedAnswers?: string[];
  maxWords?: number;
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

export interface QuizMistake { question: string; given: string; expected: string; explain: string; }

export type QuizQuestion = ChoiceQuestion | FillQuestion | ListenQuestion;

export interface Lesson {
  slug: string;
  stage: number;
  level?: LearningLevel;
  order: number;
  title: string;
  goal: string;
  minutes: number;
  intro: string;
  notes: string[];
  vocab: Vocab[];
  quiz: QuizQuestion[];
  sections?: { title: string; body: string; formula?: string; examples: { en: string; vi: string }[] }[];
  passMark?: number;
  checkpoint?: boolean;
  reading?: { title: string; en: string; vi: string };
  quizContext?: boolean;
  visual?: { src: string; alt: string; caption: string };
  table?: { caption: string; headers: string[]; rows: string[][] };
  practice?: { speaking: string; writing: string; model: string; checklist: string[]; minWords?: number; writingMinutes?: number };
  references?: { href: string; label: string }[];
}

export interface Stage {
  id: number;
  icon: string;
  title: string;
  desc: string;
}
