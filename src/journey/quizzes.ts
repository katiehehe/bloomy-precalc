import type { LessonQuiz } from "../quiz/types";
import { quiz as rationalHolesQuiz } from "../lessons/rational-holes/quiz";
import { quiz as rationalAsymptotesQuiz } from "../lessons/rational-asymptotes/quiz";
import { quiz as rationalGraphingQuiz } from "../lessons/rational-graphing/quiz";
import { quiz as polyInequalitiesQuiz } from "../lessons/poly-inequalities/quiz";
import { quiz as rationalInequalitiesQuiz } from "../lessons/rational-inequalities/quiz";
import { quiz as ftaQuiz } from "../lessons/fundamental-theorem-algebra/quiz";
import { quiz as degRadQuiz } from "../lessons/degrees-radians/quiz";
import { quiz as angularVelocityQuiz } from "../lessons/angular-velocity/quiz";
import { quiz as trigEqBasicQuiz } from "../lessons/trig-equations-basic/quiz";
import { quiz as doubleAngleQuiz } from "../lessons/double-angle-identities/quiz";
import { quiz as inverseGraphsQuiz } from "../lessons/inverse-graphs/quiz";
import { quiz as ssaQuiz } from "../lessons/ssa-ambiguous/quiz";
import { quiz as sinRegressionQuiz } from "../lessons/sinusoidal-regression/quiz";
import { quiz as inverseEvalQuiz } from "../lessons/inverse-eval/quiz";
import { quiz as sumDiffQuiz } from "../lessons/sum-difference-identities/quiz";
import { quiz as verifyQuiz } from "../lessons/verifying-identities/quiz";
import { quiz as halfAngleQuiz } from "../lessons/half-angle-identities/quiz";
import { quiz as trigEqMultiQuiz } from "../lessons/trig-equations-multi/quiz";
import { quiz as modulusArgumentQuiz } from "../lessons/modulus-argument/quiz";
import { quiz as trigFormQuiz } from "../lessons/trig-form/quiz";
import { quiz as polarArithQuiz } from "../lessons/polar-arith/quiz";
import { quiz as deMoivreQuiz } from "../lessons/de-moivre/quiz";
import { quiz as paramMotionQuiz } from "../lessons/param-motion/quiz";
import { quiz as vecDotQuiz } from "../lessons/vec-dot/quiz";
import { quiz as vecModelsQuiz } from "../lessons/vec-models/quiz";
import { quiz as vecInclineQuiz } from "../lessons/vec-incline/quiz";
import { quiz as mtxMulQuiz } from "../lessons/mtx-mul/quiz";

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
  "degrees-radians": degRadQuiz,
  "angular-velocity": angularVelocityQuiz,
  "trig-equations-basic": trigEqBasicQuiz,
  "double-angle-identities": doubleAngleQuiz,
  "inverse-graphs": inverseGraphsQuiz,
  "ssa-ambiguous": ssaQuiz,
  "sinusoidal-regression": sinRegressionQuiz,
  "inverse-eval": inverseEvalQuiz,
  "sum-difference-identities": sumDiffQuiz,
  "verifying-identities": verifyQuiz,
  "half-angle-identities": halfAngleQuiz,
  "trig-equations-multi": trigEqMultiQuiz,
  "modulus-argument": modulusArgumentQuiz,
  "trig-form": trigFormQuiz,
  "polar-arith": polarArithQuiz,
  "de-moivre": deMoivreQuiz,
  "param-motion": paramMotionQuiz,
  "vec-dot": vecDotQuiz,
  "vec-models": vecModelsQuiz,
  "vec-incline": vecInclineQuiz,
  "mtx-mul": mtxMulQuiz,
};

export function journeyQuiz(id: string): LessonQuiz | undefined {
  return journeyQuizzes[id];
}

export function hasQuiz(id: string): boolean {
  return Boolean(journeyQuizzes[id]);
}
