import type { ParamSpec, Slide } from "../types";

const SHAPES = ["Circle", "Ellipse", "Parabola", "Hyperbola"];

const viewParam = (start: number): ParamSpec => ({
  key: "view",
  label: "Highlight",
  min: 0,
  max: 3,
  start,
  step: 1,
  format: (v) => SHAPES[Math.min(3, Math.max(0, Math.round(v)))],
});

export const slides: Slide[] = [
  {
    id: "one-family",
    title: "What the conic sections are",
    mode: "summary",
    hideSliders: true,
    params: [viewParam(0)],
    baseReveal: {},
    beats: [
      {
        text: "A **conic section** is the curve a plane leaves when it cuts a cone. Changing the tilt of that cutting plane produces four different curves, so the four shapes are one family rather than four unrelated graphs.",
      },
      {
        text: "A cut parallel to the base leaves a **circle**. Tilt the plane a little and the slice is still closed, but stretched: that closed oval is an **ellipse**.",
        to: { view: 1 },
        ms: 1600,
      },
      {
        text: "Tip the plane until it is parallel to a side of the cone and the slice no longer closes. The curve is a **parabola**, a single open branch.",
        to: { view: 2 },
        ms: 1600,
      },
      {
        text: "A still steeper cut meets both **nappes** of the cone, the two opposing halves that join at the tip. That slice is a **hyperbola**: two separate branches.",
        to: { view: 3 },
        ms: 1600,
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "A conic section is",
        options: [
          "the curve a plane leaves when it cuts a cone",
          "any graph that opens upward",
          "a line with two intercepts",
        ],
        answer: 0,
        hint: "The name comes from slicing a cone with a plane.",
        success: "Right: each conic is a plane slice of a cone, which is why the four curves are one family.",
      },
      {
        kind: "choice",
        prompt: "Which cut of the cone produces a hyperbola?",
        options: [
          "a steeper cut that meets both nappes",
          "a cut parallel to the base",
          "a cut parallel to a side of the cone",
        ],
        answer: 0,
        hint: "A hyperbola has two branches, so the plane must meet both halves of the cone.",
        success: "Yes: a cut through both nappes, the two opposing halves that join at the tip, leaves two branches.",
      },
    ],
  },
  {
    id: "eccentricity-sorts",
    title: "How eccentricity sorts the family",
    mode: "summary",
    hideSliders: true,
    params: [viewParam(0)],
    baseReveal: {},
    beats: [
      {
        text: "A single number, the **eccentricity** $e$, sorts the family. Eccentricity measures how far a conic is from being a circle: $e = 0$ is a circle, and a larger $e$ means a more stretched or more open curve.",
      },
      {
        text: "An **ellipse** occupies the open interval $0 < e < 1$. The curve stays closed. As $e$ approaches $1$, the oval becomes longer and thinner.",
        to: { view: 1 },
        ms: 1600,
      },
      {
        text: "Exactly $e = 1$ is a **parabola**, the boundary between closed and open. When $e > 1$ the curve is a **hyperbola**, open into two branches.",
        to: { view: 3 },
        ms: 1800,
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Which conic has eccentricity $e = 1$?",
        options: ["parabola", "circle", "hyperbola"],
        answer: 0,
        hint: "It is the boundary case between closed ovals and open two-branch curves.",
        success: "A parabola is exactly $e = 1$, the crossover between ellipse and hyperbola.",
      },
      {
        kind: "choice",
        prompt: "An ellipse has eccentricity in which range?",
        options: ["$0 < e < 1$", "$e = 0$", "$e > 1$"],
        answer: 0,
        hint: "An ellipse is closed but not a circle, so $e$ is between $0$ and $1$.",
        success: "Right: $0 < e < 1$ keeps the curve closed and stretched. A circle is the special case $e = 0$.",
      },
    ],
  },
  {
    id: "four-equations",
    title: "The four equations at a glance",
    mode: "summary",
    hideSliders: true,
    params: [viewParam(0)],
    baseReveal: {},
    beats: [
      {
        text: "Each member also has a standard equation in the $xy$-plane. The circle is $x^2 + y^2 = r^2$: every point is the same distance $r$ from the center.",
      },
      {
        text: "Stretch the two axes by different amounts and keep the plus sign: $$\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$$ That is an **ellipse**.",
        to: { view: 1 },
        ms: 1600,
      },
      {
        text: "Replace that plus with a minus and the curve splits: $$\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$$ That is a **hyperbola**. A **parabola** has only one squared variable, as in $y = a x^2$.",
        to: { view: 3 },
        ms: 1800,
      },
      {
        text: "Later lessons read each equation in detail. For now, match the name, the eccentricity range, and the shape on the plane.",
        to: { view: 0 },
        ms: 1400,
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Which equation is a hyperbola?",
        options: [
          "$\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1$",
          "$\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1$",
          "$x^2 + y^2 = r^2$",
        ],
        answer: 0,
        hint: "A minus between the squared terms splits the curve into two branches.",
        success: "Right: the minus sign is the hyperbola. The plus sign is an ellipse, and $x^2 + y^2 = r^2$ is a circle.",
      },
      {
        kind: "choice",
        prompt: "What makes the parabola equation $y = a x^2$ different from the other three?",
        options: [
          "only one variable is squared",
          "both variables are squared and added",
          "both variables are squared and subtracted",
        ],
        answer: 0,
        hint: "Look at which letters appear with an exponent $2$.",
        success: "Yes: a parabola squares only one variable. The ellipse and hyperbola square both $x$ and $y$.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn: compare the four",
    mode: "summary",
    hideSliders: true,
    params: [viewParam(0)],
    baseReveal: {},
    beats: [
      {
        text: "The table under the figure lists each name, its equation, and its eccentricity range. The highlighted curve matches the highlighted row.",
      },
      {
        text: "The four members are one family: each is a plane slice of a cone, and a single number $e$ sorts the shapes from circle to hyperbola.",
      },
      {
        text: "The highlight now rests on the circle, with $e = 0$.",
        to: { view: 0 },
        ms: 900,
      },
    ],
    practice: "Click through the four conics and finish on the hyperbola.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Click through the shapes and finish on the **hyperbola** to highlight it.",
        hint: "Click the outer two-branch curve, or the hyperbola row in the table. Clicking empty space steps to the next shape.",
        success: "That is the hyperbola, the $e > 1$ member of the conic family.",
        check: (value) => Math.round(value) === 3,
      },
      {
        kind: "choice",
        prompt: "Which conic has eccentricity $e = 1$?",
        options: ["circle", "parabola", "hyperbola"],
        answer: 1,
        hint: "It is the boundary case between closed and open curves.",
        success: "A parabola is exactly $e = 1$, the crossover between ellipse and hyperbola.",
      },
      {
        kind: "choice",
        prompt: "The four conics are one family because they are all",
        options: ["graphs of lines", "cross-sections of a cone", "kinds of parabola"],
        answer: 1,
        hint: "Think about slicing a cone at different angles.",
        success: "Each conic is a plane slice of a cone, which is why they share one framework.",
      },
    ],
  },
];
