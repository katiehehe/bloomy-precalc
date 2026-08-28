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
];

export function journeyLesson(id: string): JourneyLesson | undefined {
  return journeyLessons.find((l) => l.id === id);
}

/** Map an original-list skill id to the Journey lesson that teaches it. */
export const journeySkillToLesson = new Map<string, string>(
  journeyLessons.flatMap((l) => l.skills.map((s) => [s, l.id] as const)),
);
