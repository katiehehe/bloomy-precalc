import type { ReadyLesson } from "../lessons/types";
import { slides as holesSlides } from "../lessons/rational-holes/slides";
import RationalHolesStage from "../lessons/rational-holes/Stage";
import { slides as asymptotesSlides } from "../lessons/rational-asymptotes/slides";
import RationalAsymptotesStage from "../lessons/rational-asymptotes/Stage";
import { slides as graphingSlides } from "../lessons/rational-graphing/slides";
import RationalGraphingStage from "../lessons/rational-graphing/Stage";
import { slides as polyIneqSlides } from "../lessons/poly-inequalities/slides";
import PolyInequalitiesStage from "../lessons/poly-inequalities/Stage";
import { slides as rationalIneqSlides } from "../lessons/rational-inequalities/slides";
import RationalInequalitiesStage from "../lessons/rational-inequalities/Stage";
import { slides as ftaSlides } from "../lessons/fundamental-theorem-algebra/slides";
import FtaStage from "../lessons/fundamental-theorem-algebra/Stage";
import { slides as degRadSlides } from "../lessons/degrees-radians/slides";
import DegRadStage from "../lessons/degrees-radians/Stage";
import { slides as angularVelocitySlides } from "../lessons/angular-velocity/slides";
import AngularVelocityStage from "../lessons/angular-velocity/Stage";
import { slides as inverseEvalSlides } from "../lessons/inverse-eval/slides";
import InverseEvalStage from "../lessons/inverse-eval/Stage";
import { slides as inverseGraphSlides } from "../lessons/inverse-graphs/slides";
import InverseGraphStage from "../lessons/inverse-graphs/Stage";
import { slides as trigEqBasicSlides } from "../lessons/trig-equations-basic/slides";
import TrigEqBasicStage from "../lessons/trig-equations-basic/Stage";
import { slides as sumDiffSlides } from "../lessons/sum-difference-identities/slides";
import SumDiffStage from "../lessons/sum-difference-identities/Stage";
import { slides as doubleAngleSlides } from "../lessons/double-angle-identities/slides";
import DoubleAngleStage from "../lessons/double-angle-identities/Stage";
import { slides as halfAngleSlides } from "../lessons/half-angle-identities/slides";
import HalfAngleStage from "../lessons/half-angle-identities/Stage";
import { slides as verifySlides } from "../lessons/verifying-identities/slides";
import VerifyStage from "../lessons/verifying-identities/Stage";
import { slides as trigEqMultiSlides } from "../lessons/trig-equations-multi/slides";
import TrigEqMultiStage from "../lessons/trig-equations-multi/Stage";
import { slides as ssaSlides } from "../lessons/ssa-ambiguous/slides";
import SsaStage from "../lessons/ssa-ambiguous/Stage";
import { slides as sinRegressionSlides } from "../lessons/sinusoidal-regression/slides";
import SinRegressionStage from "../lessons/sinusoidal-regression/Stage";

/** A Journey lesson is a ready lesson plus the original-list skills it covers. */
export type JourneyLesson = ReadyLesson & { skills: string[] };

/**
 * Lessons authored for the Journey tab. These are additive: they reuse the
 * shared player and never touch the hand-built Base Camp lessons.
 */
export const journeyLessons: JourneyLesson[] = [
  {
    id: "rational-holes",
    title: "Vertical asymptotes and holes",
    kicker: "Rational analysis",
    summary: "Tell a hole from a wall by watching which factors cancel.",
    status: "ready",
    slides: holesSlides,
    Figure: RationalHolesStage,
    watchHint: "A cancelled factor leaves a hole; a leftover zero builds a vertical asymptote.",
    tryHint: "Drag the tracer, then answer.",
    skills: ["va-holes"],
  },
  {
    id: "rational-asymptotes",
    title: "Horizontal and slant asymptotes",
    kicker: "Rational analysis",
    summary: "Read end behavior from the degrees: a level ceiling or a slanted guide.",
    status: "ready",
    slides: asymptotesSlides,
    Figure: RationalAsymptotesStage,
    watchHint: "Compare the degrees of top and bottom to predict the ends.",
    tryHint: "Slide the tracer toward the edges.",
    skills: ["ha-slant"],
  },
  {
    id: "rational-graphing",
    title: "Complete rational graphing",
    kicker: "Rational analysis",
    summary: "Assemble intercepts, asymptotes, and branches into a full graph.",
    status: "ready",
    slides: graphingSlides,
    Figure: RationalGraphingStage,
    watchHint: "Build the graph one feature at a time.",
    tryHint: "Drag across each region.",
    skills: ["rational-graph"],
  },
  {
    id: "poly-inequalities",
    title: "Polynomial inequalities",
    kicker: "Rational analysis",
    summary: "Find the zeros, test each interval, and read the sign chart.",
    status: "ready",
    slides: polyIneqSlides,
    Figure: PolyInequalitiesStage,
    watchHint: "A polynomial only changes sign at a real zero.",
    tryHint: "Drag the tracer to test each interval.",
    skills: ["poly-ineq"],
  },
  {
    id: "rational-inequalities",
    title: "Rational inequalities",
    kicker: "Rational analysis",
    summary: "Sign-analyze across both numerator zeros and forbidden walls.",
    status: "ready",
    slides: rationalIneqSlides,
    Figure: RationalInequalitiesStage,
    watchHint: "The sign can flip at a zero or at a wall; the wall is always excluded.",
    tryHint: "Drag the tracer across each boundary.",
    skills: ["rational-ineq"],
  },
  {
    id: "fta",
    title: "FTA and conjugate root pairs",
    kicker: "Rational analysis",
    summary: "Count all n roots and mirror non-real ones across the real axis.",
    status: "ready",
    slides: ftaSlides,
    Figure: FtaStage,
    watchHint: "Degree n means exactly n complex roots; non-real ones pair up.",
    tryHint: "Use the mirror to place the conjugate.",
    skills: ["fta"],
  },
  {
    id: "degrees-radians",
    title: "Degree-radian conversion",
    kicker: "Trig completion",
    summary: "Cross the bridge 180 degrees = pi, then convert either way by cancelling units.",
    status: "ready",
    slides: degRadSlides,
    Figure: DegRadStage,
    watchHint: "Multiply by pi/180 to reach radians, or 180/pi to reach degrees.",
    tryHint: "Turn the dial and watch the fraction reduce.",
    skills: ["deg-rad"],
  },
  {
    id: "angular-velocity",
    title: "Angular and linear velocity",
    kicker: "Trig completion",
    summary: "Turn arc length s = r theta into rim speed v = r omega, and see why the edge moves faster.",
    status: "ready",
    slides: angularVelocitySlides,
    Figure: AngularVelocityStage,
    watchHint: "Arc length is s = r theta; dividing by time gives v = r omega.",
    tryHint: "Set the spin and read the rim speed.",
    skills: ["angular-velocity"],
  },
  {
    id: "inverse-eval",
    title: "Evaluating inverse trig",
    kicker: "Trig completion",
    summary: "Answer arcsin, arccos, and arctan from the one principal-value range each is allowed.",
    status: "ready",
    slides: inverseEvalSlides,
    Figure: InverseEvalStage,
    watchHint: "Every inverse returns one angle, from its fixed principal-value range.",
    tryHint: "Pick the answer that lands inside the range.",
    skills: ["inverse-eval"],
  },
  {
    id: "inverse-graphs",
    title: "Graphing inverse trig",
    kicker: "Trig completion",
    summary: "Restrict sine to make it one-to-one, then reflect across y = x to build arcsine.",
    status: "ready",
    slides: inverseGraphSlides,
    Figure: InverseGraphStage,
    watchHint: "An inverse exists only on a one-to-one piece; its graph is the reflection across y = x.",
    tryHint: "Drag the input and read the angle off the curve.",
    skills: ["inverse-graphs"],
  },
  {
    id: "trig-equations-basic",
    title: "Solving basic trig equations",
    kicker: "Trig completion",
    summary: "Use a reference angle and the sign to find every solution, then add 2 pi k for all of them.",
    status: "ready",
    slides: trigEqBasicSlides,
    Figure: TrigEqBasicStage,
    watchHint: "Most values are hit twice per turn; find the reference angle, then place both.",
    tryHint: "Turn the angle onto the target height.",
    skills: ["trig-eq-basic"],
  },
  {
    id: "sum-difference-identities",
    title: "Sum and difference identities",
    kicker: "Trig completion",
    summary: "Expand cos and sin of A plus or minus B, minding the sign, to reach exact values.",
    status: "ready",
    slides: sumDiffSlides,
    Figure: SumDiffStage,
    watchHint: "Cosine pairs like with like and flips the sign; sine mixes and keeps it.",
    tryHint: "Match the pattern and pick the right expansion.",
    skills: ["sum-diff"],
  },
  {
    id: "double-angle-identities",
    title: "Double-angle identities",
    kicker: "Trig completion",
    summary: "Build the double-angle formulas from a plus itself, then check and use them.",
    status: "ready",
    slides: doubleAngleSlides,
    Figure: DoubleAngleStage,
    watchHint: "A double angle is just the angle added to itself, so sum formulas apply.",
    tryHint: "Drag theta and watch both sides stay equal.",
    skills: ["double-angle"],
  },
  {
    id: "half-angle-identities",
    title: "Half-angle identities",
    kicker: "Trig completion",
    summary: "Solve a double-angle formula backward to reach the half-angle roots.",
    status: "ready",
    slides: halfAngleSlides,
    Figure: HalfAngleStage,
    watchHint: "Half-angle formulas are double-angle formulas solved for the half angle.",
    tryHint: "Pick the sign from the quadrant of the half angle.",
    skills: ["half-angle"],
  },
  {
    id: "verifying-identities",
    title: "Verifying identities",
    kicker: "Trig completion",
    summary: "Transform one side into the other using sine, cosine, and Pythagorean moves.",
    status: "ready",
    slides: verifySlides,
    Figure: VerifyStage,
    watchHint: "Work one side only, convert to sine and cosine, and justify each line.",
    tryHint: "Follow the transformation and name each identity used.",
    skills: ["verify"],
  },
  {
    id: "trig-equations-multi",
    title: "Multi-angle and factorable trig equations",
    kicker: "Trig completion",
    summary: "Factor like a quadratic, reduce with an identity, and widen the interval for a doubled angle.",
    status: "ready",
    slides: trigEqMultiSlides,
    Figure: TrigEqMultiStage,
    watchHint: "Substitute to expose a quadratic, or use an identity to reach one angle, then factor.",
    tryHint: "Pick the factoring and count all solutions.",
    skills: ["trig-eq-multi"],
  },
  {
    id: "ssa-ambiguous",
    title: "The ambiguous SSA case",
    kicker: "Trig completion",
    summary: "Compare the swinging side to the height and to b to get zero, one, or two triangles.",
    status: "ready",
    slides: ssaSlides,
    Figure: SsaStage,
    watchHint: "Compare a to h = b sin A and to b: none, one, or two triangles.",
    tryHint: "Swing the side into the two-triangle window.",
    skills: ["ssa"],
  },
  {
    id: "sinusoidal-regression",
    title: "Sinusoidal regression",
    kicker: "Trig completion",
    summary: "Read amplitude and midline from the extremes, then set B from the period and C from the peak.",
    status: "ready",
    slides: sinRegressionSlides,
    Figure: SinRegressionStage,
    watchHint: "A and D come from max and min; B comes from the period, C from the peak.",
    tryHint: "Slide the midline onto the data.",
    skills: ["sin-regression"],
  },
];

export function journeyLesson(id: string): JourneyLesson | undefined {
  return journeyLessons.find((l) => l.id === id);
}

/** Map an original-list skill id to the Journey lesson that teaches it. */
export const journeySkillToLesson = new Map<string, string>(
  journeyLessons.flatMap((l) => l.skills.map((s) => [s, l.id] as const)),
);
