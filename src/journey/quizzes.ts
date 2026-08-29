import type { LessonQuiz } from "../quiz/types";
import { quiz as rationalHolesQuiz } from "../lessons/rational-holes/quiz";
import { quiz as rationalAsymptotesQuiz } from "../lessons/rational-asymptotes/quiz";
import { quiz as rationalGraphingQuiz } from "../lessons/rational-graphing/quiz";
import { quiz as polyInequalitiesQuiz } from "../lessons/poly-inequalities/quiz";
import { quiz as rationalInequalitiesQuiz } from "../lessons/rational-inequalities/quiz";
import { quiz as ftaQuiz } from "../lessons/fundamental-theorem-algebra/quiz";

/**
 * Climb + Summit assessments, one entry per Journey lesson id. Each lesson's
 * questions live in `src/lessons/<folder>/quiz.ts` (import-safe data, like
 * slides.ts) and are collected here for the app. Entries are added as lessons
 * ship their assessments.
 */
export const journeyQuizzes: Record<string, LessonQuiz> = {
  "rational-holes": rationalHolesQuiz,
  "rational-asymptotes": rationalAsymptotesQuiz,
  "rational-graphing": rationalGraphingQuiz,
  "poly-inequalities": polyInequalitiesQuiz,
  "rational-inequalities": rationalInequalitiesQuiz,
  fta: ftaQuiz,
};

export function journeyQuiz(id: string): LessonQuiz | undefined {
  return journeyQuizzes[id];
}

export function hasQuiz(id: string): boolean {
  return Boolean(journeyQuizzes[id]);
}
