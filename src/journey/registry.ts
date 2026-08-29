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
import { slides as modulusArgumentSlides } from "../lessons/modulus-argument/slides";
import ModulusArgumentStage from "../lessons/modulus-argument/Stage";
import { slides as trigFormSlides } from "../lessons/trig-form/slides";
import TrigFormStage from "../lessons/trig-form/Stage";
import { slides as polarArithSlides } from "../lessons/polar-arith/slides";
import PolarArithStage from "../lessons/polar-arith/Stage";
import { slides as deMoivreSlides } from "../lessons/de-moivre/slides";
import DeMoivreStage from "../lessons/de-moivre/Stage";
import { slides as paramMotionSlides } from "../lessons/param-motion/slides";
import ParamMotionStage from "../lessons/param-motion/Stage";
import { slides as vecDotSlides } from "../lessons/vec-dot/slides";
import VecDotStage from "../lessons/vec-dot/Stage";
import { slides as vecModelsSlides } from "../lessons/vec-models/slides";
import VecModelsStage from "../lessons/vec-models/Stage";
import { slides as vecInclineSlides } from "../lessons/vec-incline/slides";
import VecInclineStage from "../lessons/vec-incline/Stage";
import { slides as mtxMulSlides } from "../lessons/mtx-mul/slides";
import MtxMulStage from "../lessons/mtx-mul/Stage";

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
  {
    id: "modulus-argument",
    title: "Modulus and argument",
    kicker: "Polar and complex",
    summary: "Read a complex number's length (modulus) and direction (argument) off the Argand plane.",
    status: "ready",
    slides: modulusArgumentSlides,
    Figure: ModulusArgumentStage,
    watchHint: "Modulus is the distance from the origin; the argument is the angle from the positive real axis.",
    tryHint: "Drag the point and watch the modulus and angle update.",
    skills: ["modulus"],
  },
  {
    id: "trig-form",
    title: "Trig form",
    kicker: "Polar and complex",
    summary: "Rewrite a complex number by its length and angle, z = r(cos theta + i sin theta), and convert to and from a + bi.",
    status: "ready",
    slides: trigFormSlides,
    Figure: TrigFormStage,
    watchHint: "Trig form is r(cos theta + i sin theta): r multiplies both terms and i rides on the sine only.",
    tryHint: "Set the r and theta sliders, or drag the point, and watch both forms update.",
    skills: ["trig-form"],
  },
  {
    id: "polar-arith",
    title: "Multiply and divide in polar form",
    kicker: "Polar and complex",
    summary: "Multiply by multiplying the lengths and adding the angles; divide by dividing the lengths and subtracting them.",
    status: "ready",
    slides: polarArithSlides,
    Figure: PolarArithStage,
    watchHint: "To multiply, multiply the moduli and add the arguments; to divide, divide the moduli and subtract them.",
    tryHint: "Turn the two angle sliders and watch the product arrow track their sum.",
    skills: ["polar-arith"],
  },
  {
    id: "de-moivre",
    title: "De Moivre and roots of unity",
    kicker: "Polar and complex",
    summary: "Raise complex numbers to powers with De Moivre, then find the n equally spaced roots of unity.",
    status: "ready",
    slides: deMoivreSlides,
    Figure: DeMoivreStage,
    watchHint: "A power raises the modulus to the n and multiplies the argument by n; the roots of unity ring the unit circle.",
    tryHint: "Drag n to change how many roots ring the circle, then answer.",
    skills: ["de-moivre"],
  },
  {
    id: "param-motion",
    title: "Parametric motion models",
    kicker: "Parametrics",
    summary:
      "Model a projectile over time: read its position (x(t), y(t)), see why a steady x and a gravity-bent y trace a parabola, and find the landing time, maximum height, and range.",
    status: "ready",
    slides: paramMotionSlides,
    Figure: ParamMotionStage,
    watchHint:
      "Position at time t is the pair (x(t), y(t)); x is linear (steady) while y is quadratic because gravity bends it.",
    tryHint: "Slide the time to ride the ball along the arc, then read the landing, peak, and range.",
    skills: ["param-motion"],
  },
  {
    id: "vec-dot",
    title: "Dot product and angle between",
    kicker: "Vectors",
    summary:
      "Combine two vectors into a single number, then read its sign and size to get the angle between them and the projection of one onto the other.",
    status: "ready",
    slides: vecDotSlides,
    Figure: VecDotStage,
    watchHint:
      "The dot product multiplies matching components and adds; its sign is positive for acute, zero for a right angle, negative for obtuse.",
    tryHint: "Drag the tip of b, or use the sliders, until the readout shows the dot product is zero.",
    skills: ["vec-dot"],
  },
  {
    id: "vec-models",
    title: "Force, velocity, and navigation",
    kicker: "Vectors",
    summary:
      "Model forces and velocities as vectors: add them tip to tail into a resultant, read its magnitude and direction, convert to a compass bearing, and balance a load to equilibrium.",
    status: "ready",
    slides: vecModelsSlides,
    Figure: VecModelsStage,
    watchHint:
      "A resultant is the vector sum: add the east parts and the north parts, then its magnitude is the hypotenuse and its bearing is 90 degrees minus the angle from east.",
    tryHint: "Drag the resultant's tip, or use the F2 sliders, to steer or cancel the net force.",
    skills: ["vec-models"],
  },
  {
    id: "vec-incline",
    title: "Decomposition on inclines",
    kicker: "Vectors",
    summary:
      "Resolve a block's weight on a ramp into the along-incline pull W sin(alpha) and the into-surface push W cos(alpha), then watch the two recombine to the full weight.",
    status: "ready",
    slides: vecInclineSlides,
    Figure: VecInclineStage,
    watchHint:
      "Gravity stays straight down; the ramp angle alpha splits the weight into W sin(alpha) along the slope and W cos(alpha) into the surface (the normal force N).",
    tryHint: "Tilt the ramp and change the weight, then read W sin(alpha), W cos(alpha), and N off the dock.",
    skills: ["vec-incline"],
  },
  {
    id: "mtx-mul",
    title: "Multiply matrices",
    kicker: "Matrices",
    summary:
      "Multiply two matrices by dotting a row of the left with a column of the right, place each entry at its row and column, and learn why order matters and the shapes must line up.",
    status: "ready",
    slides: mtxMulSlides,
    Figure: MtxMulStage,
    watchHint:
      "The (i, j) entry of AB is row i of A dotted with column j of B; the inner dimensions must match, and AB is usually not equal to BA.",
    tryHint: "Slide k (B's top-left entry) and watch only the product's first column change.",
    skills: ["mtx-mul"],
  },
];

export function journeyLesson(id: string): JourneyLesson | undefined {
  return journeyLessons.find((l) => l.id === id);
}

/** Map an original-list skill id to the Journey lesson that teaches it. */
export const journeySkillToLesson = new Map<string, string>(
  journeyLessons.flatMap((l) => l.skills.map((s) => [s, l.id] as const)),
);
