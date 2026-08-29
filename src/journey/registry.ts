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
import { slides as mtxAddSlides } from "../lessons/mtx-add/slides";
import MtxAddStage from "../lessons/mtx-add/Stage";
import { slides as mtxMulSlides } from "../lessons/mtx-mul/slides";
import MtxMulStage from "../lessons/mtx-mul/Stage";
import { slides as mtx3varSlides } from "../lessons/mtx-3var/slides";
import Mtx3varStage from "../lessons/mtx-3var/Stage";
import { slides as mtxDetSlides } from "../lessons/mtx-det/slides";
import MtxDetStage from "../lessons/mtx-det/Stage";
import { slides as mtxInvSlides } from "../lessons/mtx-inv/slides";
import MtxInvStage from "../lessons/mtx-inv/Stage";
import { slides as mtxCramerSlides } from "../lessons/mtx-cramer/slides";
import MtxCramerStage from "../lessons/mtx-cramer/Stage";
import { slides as mtxTxSlides } from "../lessons/mtx-tx/slides";
import MtxTxStage from "../lessons/mtx-tx/Stage";
import { slides as conicsClassSlides } from "../lessons/conics-class/slides";
import ConicsClassStage from "../lessons/conics-class/Stage";
import { slides as conicsModelSlides } from "../lessons/conics-model/slides";
import ConicsModelStage from "../lessons/conics-model/Stage";
import { slides as sigmaSlides } from "../lessons/sigma/slides";
import SigmaStage from "../lessons/sigma/Stage";
import { slides as arithSeriesSlides } from "../lessons/arith-series/slides";
import ArithSeriesStage from "../lessons/arith-series/Stage";
import { slides as finiteGeoSlides } from "../lessons/finite-geo/slides";
import FiniteGeoStage from "../lessons/finite-geo/Stage";
import { slides as infiniteGeoSlides } from "../lessons/infinite-geo/slides";
import InfiniteGeoStage from "../lessons/infinite-geo/Stage";
import { slides as binomialSlides } from "../lessons/binomial/slides";
import BinomialStage from "../lessons/binomial/Stage";
import { slides as inductionSlides } from "../lessons/induction/slides";
import InductionStage from "../lessons/induction/Stage";
import { slides as dqSlides } from "../lessons/dq/slides";
import DqStage from "../lessons/dq/Stage";
import { slides as concavitySlides } from "../lessons/concavity/slides";
import ConcavityStage from "../lessons/concavity/Stage";
import { slides as limitsGraphSlides } from "../lessons/limits-graph/slides";
import LimitsGraphStage from "../lessons/limits-graph/Stage";
import { slides as limitsAlgSlides } from "../lessons/limits-alg/slides";
import LimitsAlgStage from "../lessons/limits-alg/Stage";
import { slides as continuitySlides } from "../lessons/continuity/slides";
import ContinuityStage from "../lessons/continuity/Stage";

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
    watchHint: "A cancelled factor leaves a hole. A leftover zero builds a vertical asymptote.",
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
    watchHint: "The sign can flip at a zero or at a wall. The wall is always excluded.",
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
    watchHint: "Degree n means exactly n complex roots. Non-real ones pair up.",
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
    watchHint: "Arc length is s = r theta. Dividing by time gives v = r omega.",
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
    watchHint: "An inverse exists only on a one-to-one piece. Its graph is the reflection across y = x.",
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
    watchHint: "Most values are hit twice per turn. Find the reference angle, then place both.",
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
    watchHint: "Cosine pairs like with like and flips the sign. Sine mixes and keeps it.",
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
    watchHint: "Modulus is the distance from the origin. The argument is the angle from the positive real axis.",
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
    summary: "Multiply by multiplying the lengths and adding the angles. Divide by dividing the lengths and subtracting them.",
    status: "ready",
    slides: polarArithSlides,
    Figure: PolarArithStage,
    watchHint: "To multiply, multiply the moduli and add the arguments. To divide, divide the moduli and subtract them.",
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
    watchHint: "A power raises the modulus to the n and multiplies the argument by n. The roots of unity ring the unit circle.",
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
      "Position at time t is the pair (x(t), y(t)), where x is linear (steady) while y is quadratic because gravity bends it.",
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
      "The dot product multiplies matching components and adds. Its sign is positive for acute, zero for a right angle, negative for obtuse.",
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
      "Gravity stays straight down. The ramp angle alpha splits the weight into W sin(alpha) along the slope and W cos(alpha) into the surface (the normal force N).",
    tryHint: "Tilt the ramp and change the weight, then read W sin(alpha), W cos(alpha), and N off the dock.",
    skills: ["vec-incline"],
  },
  {
    id: "mtx-add",
    title: "Add and scale matrices",
    kicker: "Matrices",
    summary:
      "Add and subtract matrices entry by entry when the shapes match, scale every entry by a number, and use the commutative and distributive properties.",
    status: "ready",
    slides: mtxAddSlides,
    Figure: MtxAddStage,
    watchHint:
      "Addition and subtraction work entry by entry, and only when the shapes match. A scalar multiplies every entry at once.",
    tryHint: "Slide k and watch all four entries of kA scale together.",
    skills: ["mtx-add"],
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
      "The (i, j) entry of AB is row i of A dotted with column j of B. The inner dimensions must match, and AB is usually not equal to BA.",
    tryHint: "Slide k (B's top-left entry) and watch only the product's first column change.",
    skills: ["mtx-mul"],
  },
  {
    id: "mtx-det",
    title: "Determinants",
    kicker: "Matrices",
    summary:
      "Compute a 2 by 2 determinant as ad - bc, expand a 3 by 3 by cofactors, and read a determinant of zero as the mark of a singular matrix with no inverse.",
    status: "ready",
    slides: mtxDetSlides,
    Figure: MtxDetStage,
    watchHint:
      "A 2 by 2 determinant is the main-diagonal product minus the anti-diagonal product. A 3 by 3 expands along a row with + - + signs, and det = 0 means singular.",
    tryHint: "Slide d and watch det = 2d - 4 move, then stop where it reaches 0.",
    skills: ["mtx-det"],
  },
  {
    id: "mtx-inv",
    title: "Matrix inverses",
    kicker: "Matrices",
    summary:
      "Build the inverse of a 2 by 2 by swapping the diagonal, negating the off-diagonal, and dividing by the determinant, and see why a zero determinant leaves no inverse.",
    status: "ready",
    slides: mtxInvSlides,
    Figure: MtxInvStage,
    watchHint:
      "The 2 by 2 inverse is (1/det) times [[d, -b], [-c, a]]: swap, negate, divide. It exists only when det is not zero.",
    tryHint: "Slide a and watch det = 2a - 6, then stop where it hits 0 and the inverse disappears.",
    skills: ["mtx-inv"],
  },
  {
    id: "mtx-3var",
    title: "Three-variable systems",
    kicker: "Matrices",
    summary:
      "Turn a three-equation system into an augmented matrix, clear the first column with row operations, and back-substitute to read (x, y, z).",
    status: "ready",
    slides: mtx3varSlides,
    Figure: Mtx3varStage,
    watchHint:
      "Strip the system into [A | b], make zeros below the pivot with legal row operations, then read the variables from the bottom row up.",
    tryHint: "Pick the legal row operation, read the solution, and tell a no-solution row from an all-zero one.",
    skills: ["mtx-3var"],
  },
  {
    id: "mtx-cramer",
    title: "Cramer's rule",
    kicker: "Matrices",
    summary:
      "Solve a square system with determinants: each variable is det(A_i) over det(A), where A_i replaces one column of the coefficient matrix with the constants.",
    status: "ready",
    slides: mtxCramerSlides,
    Figure: MtxCramerStage,
    watchHint:
      "For each variable, x_i = det(A_i) / det(A); A_i swaps column i for the constant column, and the shared denominator det(A) must be nonzero.",
    tryHint: "Slide the top constant and watch the first column, det(A_x), and x move together.",
    skills: ["mtx-cramer"],
  },
  {
    id: "mtx-tx",
    title: "Matrices as transformations",
    kicker: "Matrices",
    summary:
      "See a 2 by 2 matrix as a transformation of the plane: its columns are the images of the basis vectors, the unit square maps to their parallelogram, and the determinant is the area scale factor.",
    status: "ready",
    slides: mtxTxSlides,
    Figure: MtxTxStage,
    watchHint:
      "The columns of M are where the basis vectors land, so the unit square maps to the parallelogram of the columns, and det = ad - bc is the area factor, zero collapses it and a negative det flips orientation.",
    tryHint: "Drag the a, b, c, d sliders and watch the two image arrows and the parallelogram move, with det updating live.",
    skills: ["mtx-tx"],
  },
  {
    id: "conics-class",
    title: "Classifying from general form",
    kicker: "Conics",
    summary:
      "Name a conic straight from A x^2 + C y^2 + D x + E y + F = 0: AC = 0 is a parabola, AC > 0 an ellipse (circle when A = C), and AC < 0 a hyperbola.",
    status: "ready",
    slides: conicsClassSlides,
    Figure: ConicsClassStage,
    watchHint:
      "Only the squared-term coefficients A and C decide the type: AC = 0 is a parabola, AC > 0 an ellipse (circle if A = C), and AC < 0 a hyperbola; D, E, F only move and size the curve.",
    tryHint: "Slide C and watch x^2 + C y^2 = 4 morph: an ellipse, then a circle at C = 1, then a hyperbola for C < 0.",
    skills: ["conics-class"],
  },
  {
    id: "conics-model",
    title: "Conic modeling",
    kicker: "Conics",
    summary:
      "Model real designs with conics: a parabolic dish or flashlight concentrates at its focus (0, p), a whispering-gallery ellipse reflects focus to focus with c^2 = a^2 - b^2, and hyperbolic navigation fixes a difference of distances with c^2 = a^2 + b^2.",
    status: "ready",
    slides: conicsModelSlides,
    Figure: ConicsModelStage,
    watchHint:
      "A parabola sends axis-parallel rays through its focus (0, p), found from a rim point in x^2 = 4py. An ellipse reflects focus to focus (c^2 = a^2 - b^2, sum 2a). A hyperbola fixes a difference of distances (c^2 = a^2 + b^2, difference 2a).",
    tryHint: "Slide the dish depth and watch the focus move along the axis. For this 4 ft wide dish, p = 1/d.",
    skills: ["conics-model"],
  },
  {
    id: "sigma",
    title: "Sigma notation",
    kicker: "Series",
    summary:
      "Read and expand summation notation: the sum from k = m to n of a_k adds the summand for each integer k, with n - m + 1 terms, plus the constant, factor, and split rules.",
    status: "ready",
    slides: sigmaSlides,
    Figure: SigmaStage,
    watchHint:
      "The sum from k = m to n of a_k adds a_k for every integer k from the lower limit m to the upper limit n. The term count is n - m + 1, and a constant summed is n times the constant.",
    tryHint: "Slide the upper limit n and watch a bar appear and the running total climb toward the target line.",
    skills: ["sigma"],
  },
  {
    id: "arith-series",
    title: "Arithmetic series sums",
    kicker: "Series",
    summary:
      "Add the terms of an arithmetic sequence with S_n = (n/2)(a_1 + a_n): pair the first term with the last, count n/2 equal pairs, and apply it to real sums.",
    status: "ready",
    slides: arithSeriesSlides,
    Figure: ArithSeriesStage,
    watchHint:
      "Pair the first term with the last: n terms make n/2 pairs, each worth a_1 + a_n, so S_n = (n/2)(a_1 + a_n).",
    tryHint: "Slide n and watch each odd-number bar appear while the running total climbs toward the target line at 25.",
    skills: ["arith-series"],
  },
  {
    id: "finite-geo",
    title: "Finite geometric series",
    kicker: "Series",
    summary:
      "Add a geometric sequence with S_n = a_1 (1 - r^n) / (1 - r): find the common ratio r, read off a_1 and n, then substitute.",
    status: "ready",
    slides: finiteGeoSlides,
    Figure: FiniteGeoStage,
    watchHint:
      "A geometric sequence multiplies by a fixed ratio r. The finite sum collapses to S_n = a_1 (1 - r^n) / (1 - r) by shifting the sum by r and subtracting.",
    tryHint: "Slide n and watch a doubling bar appear while the running total climbs toward the target line at 31.",
    skills: ["finite-geo"],
  },
  {
    id: "infinite-geo",
    title: "Infinite geometric series and convergence",
    kicker: "Series",
    summary:
      "Decide when an infinite geometric series converges (exactly when |r| < 1) and find its sum with S = a_1 / (1 - r).",
    status: "ready",
    slides: infiniteGeoSlides,
    Figure: InfiniteGeoStage,
    watchHint:
      "An infinite geometric series converges only when |r| < 1. Then the partial sums close in on S = a_1 / (1 - r), and if |r| >= 1 it diverges with no sum.",
    tryHint: "Slide the r ratio and watch the bars shrink while the dashed S = 1/(1 - r) line moves to the target.",
    skills: ["infinite-geo"],
  },
  {
    id: "binomial",
    title: "Binomial theorem",
    kicker: "Series",
    summary:
      "Expand (a+b)^n with binomial coefficients from Pascal's triangle: row n gives the coefficients, the power of a falls while b rises, and any single term is C(n,k) a^(n-k) b^k.",
    status: "ready",
    slides: binomialSlides,
    Figure: BinomialStage,
    watchHint:
      "Row n of Pascal's triangle gives the coefficients of (a+b)^n. The power of a falls from n to 0 while b rises from 0 to n, and row n has n+1 terms.",
    tryHint: "Slide n and watch the highlighted row move. Its numbers are the coefficients of (a+b)^n.",
    skills: ["binomial"],
  },
  {
    id: "induction",
    title: "Mathematical induction",
    kicker: "Series",
    summary:
      "Prove a statement P(n) for all integers n >= 1 with two parts: a base case (show P(1)) and an inductive step (if P(k) then P(k+1)), like knocking over an endless line of dominoes.",
    status: "ready",
    slides: inductionSlides,
    Figure: InductionStage,
    watchHint:
      "Induction has two parts: a base case that shows P(1) (the first domino falls) and an inductive step that shows P(k) implies P(k+1) (each domino knocks the next). Both are required.",
    tryHint: "Slide n and watch dominoes 1 through n topple while 1 + ... + n = n(n+1)/2 stays balanced.",
    skills: ["induction"],
  },
  {
    id: "dq",
    title: "Difference quotient",
    kicker: "Calculus readiness",
    summary:
      "Average rate of change is the slope of a secant, (f(a+h) - f(a))/h. As the step h shrinks toward 0 the secant tilts into the tangent, whose slope is the instantaneous rate of change.",
    status: "ready",
    slides: dqSlides,
    Figure: DqStage,
    watchHint:
      "The difference quotient (f(a+h) - f(a))/h is the secant slope. For f(x) = x^2 at a = 1 it simplifies to 2 + h, which approaches the tangent slope 2 as h -> 0.",
    tryHint: "Slide the step h and watch the secant from (1,1) tilt toward the tangent while the slope readout 2 + h approaches 2.",
    skills: ["dq"],
  },
  {
    id: "concavity",
    title: "Concavity and inflection",
    kicker: "Calculus readiness",
    summary:
      "Concavity is which way a curve bends: concave up is a cup (tangent lines below, slope increasing), concave down is a cap (tangent lines above, slope decreasing), and an inflection point is where the two switch.",
    status: "ready",
    slides: concavitySlides,
    Figure: ConcavityStage,
    watchHint:
      "Concave up bends like a cup with tangents below and slopes increasing. Concave down bends like a cap with tangents above. An inflection point is where the concavity switches, as x^3 does at the origin.",
    tryHint: "Slide the point along y = x^3 until the readout reaches the inflection point at x = 0.",
    skills: ["concavity"],
  },
  {
    id: "limits-graph",
    title: "Limits from graphs and tables",
    kicker: "Calculus readiness",
    summary:
      "Read a limit as the height a graph heads toward from both sides, tell it apart from the value f(a), and see how a jump makes the two-sided limit not exist.",
    status: "ready",
    slides: limitsGraphSlides,
    Figure: LimitsGraphStage,
    watchHint:
      "A limit is the height both branches approach near x = a, even when the point itself is a hole. A jump (left limit not equal to right) has no two-sided limit.",
    tryHint: "Click the height both branches head toward as x approaches 2.",
    skills: ["limits-graph"],
  },
  {
    id: "limits-alg",
    title: "Limits algebraically",
    kicker: "Calculus readiness",
    summary:
      "Evaluate limits by hand: try direct substitution, and when it gives the indeterminate form 0/0, simplify by factoring and canceling, multiplying by a conjugate, or clearing a compound fraction, then substitute.",
    status: "ready",
    slides: limitsAlgSlides,
    Figure: LimitsAlgStage,
    watchHint:
      "Direct substitution works when f is defined there; 0/0 is not an answer but a signal to simplify (factor and cancel, conjugate, or compound fraction), then substitute.",
    tryHint: "Click the hole the simplified line reaches at x = 1. Its height is the limit.",
    skills: ["limits-alg"],
  },
  {
    id: "continuity",
    title: "Continuity and discontinuity types",
    kicker: "Calculus readiness",
    summary:
      "Continuity at a point needs three things at once: f(a) defined, the two-sided limit to exist, and the two to be equal. It fails as a removable hole, a jump, or an infinite discontinuity (a vertical asymptote).",
    status: "ready",
    slides: continuitySlides,
    Figure: ContinuityStage,
    watchHint:
      "Continuous at x = a means f(a) is defined, the two-sided limit exists, and they are equal. A hole, a jump, and a wall are the three ways one of those fails.",
    tryHint: "Slide the value f(2) until the filled point drops into the hole at height 4, making g continuous.",
    skills: ["continuity"],
  },
];

export function journeyLesson(id: string): JourneyLesson | undefined {
  return journeyLessons.find((l) => l.id === id);
}

/** Map an original-list skill id to the Journey lesson that teaches it. */
export const journeySkillToLesson = new Map<string, string>(
  journeyLessons.flatMap((l) => l.skills.map((s) => [s, l.id] as const)),
);
