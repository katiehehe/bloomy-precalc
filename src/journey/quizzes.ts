import type { LessonQuiz } from "../quiz/types";
import { quiz as rationalHolesQuiz } from "../lessons/rational-holes/quiz";

/**
 * Climb + Summit assessments, one entry per Journey lesson id. Each lesson's
 * questions live in `src/lessons/<folder>/quiz.ts` (import-safe data, like
 * slides.ts) and are collected here for the app. Entries are added as lessons
 * ship their assessments.
 */
export const journeyQuizzes: Record<string, LessonQuiz> = {
  "rational-holes": rationalHolesQuiz,
};

export function journeyQuiz(id: string): LessonQuiz | undefined {
  return journeyQuizzes[id];
}

export function hasQuiz(id: string): boolean {
  return Boolean(journeyQuizzes[id]);
}
