import ConicStage from "./conics/Stage";
import { slides as conicSlides } from "./conics/slides";
import ParametricStage from "./parametrics/Stage";
import { slides as parametricSlides } from "./parametrics/slides";
import PolarStage from "./polar/Stage";
import { slides as polarSlides } from "./polar/slides";
import type { LessonEntry, ReadyLesson } from "./types";
import VectorStage from "./vectors/Stage";
import { slides as vectorSlides } from "./vectors/slides";
import { slides as unitCircleSlides } from "./unit-circle/slides";
import UnitCircleStage from "./unit-circle/Stage";

export type { LessonEntry, LessonFigureProps, ReadyLesson, UpcomingLesson } from "./types";

export const lessons: LessonEntry[] = [
  {
    id: "unit-circle",
    title: "What the unit circle is",
    kicker: "Base Camp",
    summary: "Read sine and cosine from a point you can move, then watch those values become graphs.",
    status: "ready",
    slides: unitCircleSlides,
    Figure: UnitCircleStage,
    watchHint: "Watch the unit circle.",
    tryHint: "Move the point on the unit circle.",
  },
  {
    id: "vectors",
    title: "What a vector is",
    kicker: "Base Camp",
    summary: "Read a vector's magnitude and direction, split it into components, then add and subtract vectors tip to tail.",
    status: "ready",
    slides: vectorSlides,
    Figure: VectorStage,
    watchHint: "Watch the vector and its parts.",
    tryHint: "Drag the vector tip.",
  },
  {
    id: "polar-graphs",
    title: "How polar graphs work",
    kicker: "Base Camp",
    summary: "Locate points by radius and angle, then watch r = cos 2θ draw a four-petaled rose.",
    status: "ready",
    slides: polarSlides,
    Figure: PolarStage,
    watchHint: "Watch the rose take shape.",
    tryHint: "Drag the ray around the origin.",
  },
  {
    id: "conics",
    title: "What the conic sections are",
    kicker: "Base Camp",
    summary: "One eccentricity slider turns a circle into an ellipse, a parabola, and a hyperbola.",
    status: "ready",
    slides: conicSlides,
    Figure: ConicStage,
    watchHint: "Watch the conic change shape.",
    tryHint: "Slide the eccentricity.",
  },
  {
    id: "parametrics",
    title: "What parametric equations are",
    kicker: "Base Camp",
    summary: "Two equations, one curve: watch a point move through the plane as the parameter advances.",
    status: "ready",
    slides: parametricSlides,
    Figure: ParametricStage,
    watchHint: "Watch the point trace the curve.",
    tryHint: "Scrub the parameter t.",
  },
];

export function readyLesson(id: string | null): ReadyLesson | undefined {
  if (!id) return undefined;
  return lessons.find((lesson): lesson is ReadyLesson => lesson.status === "ready" && lesson.id === id);
}
