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
import { quiz as mtxAddQuiz } from "../lessons/mtx-add/quiz";
import { quiz as mtxMulQuiz } from "../lessons/mtx-mul/quiz";
import { quiz as mtx3varQuiz } from "../lessons/mtx-3var/quiz";
import { quiz as mtxDetQuiz } from "../lessons/mtx-det/quiz";
import { quiz as mtxInvQuiz } from "../lessons/mtx-inv/quiz";
import { quiz as mtxCramerQuiz } from "../lessons/mtx-cramer/quiz";
import { quiz as mtxTxQuiz } from "../lessons/mtx-tx/quiz";
import { quiz as conicsClassQuiz } from "../lessons/conics-class/quiz";
import { quiz as conicsModelQuiz } from "../lessons/conics-model/quiz";
import { quiz as sigmaQuiz } from "../lessons/sigma/quiz";
import { quiz as arithSeriesQuiz } from "../lessons/arith-series/quiz";
import { quiz as finiteGeoQuiz } from "../lessons/finite-geo/quiz";
import { quiz as infiniteGeoQuiz } from "../lessons/infinite-geo/quiz";
import { quiz as binomialQuiz } from "../lessons/binomial/quiz";
import { quiz as inductionQuiz } from "../lessons/induction/quiz";
import { quiz as dqQuiz } from "../lessons/dq/quiz";

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
  "mtx-add": mtxAddQuiz,
  "mtx-mul": mtxMulQuiz,
  "mtx-det": mtxDetQuiz,
  "mtx-inv": mtxInvQuiz,
  "mtx-3var": mtx3varQuiz,
  "mtx-cramer": mtxCramerQuiz,
  "mtx-tx": mtxTxQuiz,
  "conics-class": conicsClassQuiz,
  "conics-model": conicsModelQuiz,
  "sigma": sigmaQuiz,
  "arith-series": arithSeriesQuiz,
  "finite-geo": finiteGeoQuiz,
  "infinite-geo": infiniteGeoQuiz,
  "binomial": binomialQuiz,
  "induction": inductionQuiz,
  "dq": dqQuiz,
};

export function journeyQuiz(id: string): LessonQuiz | undefined {
  return journeyQuizzes[id];
}

export function hasQuiz(id: string): boolean {
  return Boolean(journeyQuizzes[id]);
}
