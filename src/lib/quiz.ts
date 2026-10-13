import type { FillQuestion } from "./types";
export function normaliseAnswer(value: string) {
  return value.trim().toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, " ");
}
export function countWords(value: string) {
  return value.trim() ? value.trim().split(/\s+/).length : 0;
}
export function matchesFill(question: FillQuestion, value: string) {
  if (question.maxWords && countWords(value) > question.maxWords) return false;
  const given = normaliseAnswer(value);
  return [question.answer, ...(question.acceptedAnswers ?? [])].some(answer => normaliseAnswer(answer) === given);
}
