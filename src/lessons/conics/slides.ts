import type { ParamSpec, Slide } from "../types";

const axis = (key: "a" | "b", label: string, start: number): ParamSpec => ({
  key,
  label,
  min: 60,
  max: 450,
  start,
  step: 10,
  format: (v) => `${key} = ${(v / 100).toFixed(2)}`,
});

const SHAPES = ["Circle", "Ellipse", "Parabola", "Hyperbola"];

export const slides: Slide[] = [
  {
    id: "conic-circle",
    title: "Circle",
    mode: "circle",
    params: [
      { key: "r", label: "Radius r", min: 100, max: 400, start: 250, step: 20, format: (v) => `r = ${(v / 100).toFixed(2)}` },
    ],
    baseReveal: {},
    beats: [
      {
        text: "A **circle** is every point the same distance from a center. That defining distance is the radius $r$, and here are two of them, drawn in color to different points on the curve: same length every time.",
        add: { radius: true, dock: true, defDist: true },
      },
      {
        text: "Written out, that rule becomes $x^2 + y^2 = r^2$. Grow $r$ and the circle grows, while every point stays exactly $r$ from the center.",
        to: { r: 380 },
        ms: 2200,
        add: { defDist: false },
      },
      {
        text: "Shrink $r$ and the circle tightens. Same equation, one knob.",
        to: { r: 150 },
        ms: 2000,
      },
    ],
    practice: "Drag outward, or use the $r$ slider, to resize the circle.",
    questions: [
      {
        kind: "choice",
        prompt: "The equation $x^2 + y^2 = r^2$ describes",
        options: ["a straight line", "a circle of radius $r$", "a parabola"],
        answer: 1,
        hint: "Every point is a fixed distance $r$ from the origin.",
        success: "It is the set of points at distance $r$ from the center: a circle.",
      },
      {
        kind: "manipulate",
        prompt: "Set the radius to $r = 3$.",
        hint: "Move the slider until it reads $r = 3.00$.",
        success: "At $r = 3$ the circle passes through $(3, 0)$, $(0, 3)$, and so on.",
        check: (value) => Math.abs(value / 100 - 3) < 0.08,
      },
    ],
  },
  {
    id: "conic-ellipse",
    title: "Ellipse",
    mode: "ellipse",
    params: [axis("a", "Semi-axis a", 350), axis("b", "Semi-axis b", 200)],
    baseReveal: { dock: true },
    beats: [
      {
        text: "Stretch a circle by different amounts along each axis and you get an **ellipse**: $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$.",
      },
      {
        text: "Formally, an ellipse is every point whose two distances to a pair of fixed **foci** always add to the same total, $d_1 + d_2 = 2a$. The colored segments show one such pair.",
        add: { foci: true, defDist: true },
      },
      {
        text: "Here $a$ is the horizontal semi-axis and $b$ the vertical one. With $a > b$ the ellipse is **wide**, and the foci sit on the longer axis.",
        to: { a: 430, b: 150 },
        ms: 2200,
        add: { defDist: false },
      },
      {
        text: "If $a = b$ the two semi-axes match and the ellipse collapses back to a **circle**, with the foci meeting at the center.",
        to: { a: 250, b: 250 },
        ms: 2000,
      },
      {
        text: "Let $b$ exceed $a$ and the ellipse stands **tall**, its foci now stacked on the vertical axis.",
        to: { a: 150, b: 430 },
        ms: 2200,
      },
    ],
    practice: "Use the $a$ and $b$ sliders, or drag, to reshape the ellipse. Try making $a = b$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Turn the ellipse into a circle by setting $a = b$.",
        hint: "Match the two semi-axes so $a = b$.",
        success: "With $a = b$ both denominators are equal, so $x^2 + y^2 = a^2$: a circle.",
        check: (_value, values) => Math.abs((values.a ?? 0) - (values.b ?? 0)) < 12,
      },
      {
        kind: "choice",
        prompt: "In $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$, the foci sit on",
        options: ["the shorter axis", "the longer axis", "neither axis"],
        answer: 1,
        hint: "The foci always lie along the major (longer) axis.",
        success: "Foci sit on the longer, major axis, pulled apart as the ellipse stretches.",
      },
    ],
  },
  {
    id: "conic-parabola",
    title: "Parabola",
    mode: "parabola",
    params: [
      { key: "a", label: "Opening a", min: 10, max: 120, start: 30, step: 5, format: (v) => `a = ${(v / 100).toFixed(2)}` },
    ],
    baseReveal: { dock: true },
    beats: [
      {
        text: "A **parabola** is the graph of $y = a x^2$: a single curved branch with its vertex at the origin.",
        add: { focus: true },
      },
      {
        text: "Its definition balances two distances: every point is **equally far** from a fixed point, the **focus**, and a fixed line, the **directrix**. The colored segments $d_1$ and $d_2$ are always the same length.",
        add: { defDist: true },
      },
      {
        text: "The parameter $a$ controls the opening. A large $a$ makes it **narrow** and steep.",
        to: { a: 110 },
        ms: 2200,
        add: { defDist: false },
      },
      {
        text: "A small $a$ makes it **wide** and shallow. The **focus** sits at $\\left(0, \\tfrac{1}{4a}\\right)$, with the directrix mirrored below the vertex.",
        to: { a: 15 },
        ms: 2200,
      },
    ],
    practice: "Slide $a$, or drag a point on the curve, to open and close the parabola.",
    questions: [
      {
        kind: "choice",
        prompt: "In $y = a x^2$, a larger value of $a$ makes the parabola",
        options: ["wider", "narrower", "upside down"],
        answer: 1,
        hint: "A bigger $a$ makes $y$ climb faster for the same $x$.",
        success: "Larger $a$ means steeper sides, so the parabola looks narrower.",
      },
      {
        kind: "manipulate",
        prompt: "Open it wide: bring $a$ down to about $0.2$.",
        hint: "Slide $a$ toward its smallest values.",
        success: "A small $a$ near $0.2$ gives a broad, shallow parabola.",
        check: (value) => Math.abs(value / 100 - 0.2) < 0.05,
      },
    ],
  },
  {
    id: "conic-hyperbola",
    title: "Hyperbola",
    mode: "hyperbola",
    params: [axis("a", "Semi-axis a", 150), axis("b", "Semi-axis b", 150)],
    baseReveal: { dock: true },
    beats: [
      {
        text: "Change the plus to a minus and you get a **hyperbola**: $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$, two branches opening left and right.",
        add: { asymptotes: true },
      },
      {
        text: "Where the ellipse **added** its two focal distances, the hyperbola takes their **difference**: every point keeps $|d_1 - d_2| = 2a$ to the two **foci**. The colored segments show that pair.",
        add: { foci: true, defDist: true },
      },
      {
        text: "Far from the center the branches hug straight lines called **asymptotes**, $y = \\pm\\frac{b}{a}x$.",
        to: { a: 110, b: 230 },
        ms: 2200,
        add: { defDist: false, foci: false },
      },
      {
        text: "Adjusting $a$ and $b$ tilts those asymptotes and sets how tightly the branches curve.",
        to: { a: 240, b: 120 },
        ms: 2200,
      },
    ],
    practice: "Use the $a$ and $b$ sliders and watch the asymptotes steer the two branches.",
    questions: [
      {
        kind: "choice",
        prompt: "The straight lines a hyperbola approaches far out are its",
        options: ["foci", "asymptotes", "directrices"],
        answer: 1,
        hint: "They guide the branches but the curve never touches them.",
        success: "Those guide lines are the asymptotes, $y = \\pm\\frac{b}{a}x$.",
      },
      {
        kind: "manipulate",
        prompt: "Make the asymptotes have slope $1$ by setting $a = b$.",
        hint: "The slope is $b/a$, so equal values give slope $1$.",
        success: "With $a = b$ the asymptotes are $y = \\pm x$, slope $1$.",
        check: (_value, values) => Math.abs((values.a ?? 0) - (values.b ?? 0)) < 12,
      },
    ],
  },
  {
    id: "conic-summary",
    title: "One family",
    mode: "summary",
    hideSliders: true,
    params: [
      {
        key: "view",
        label: "Highlight",
        min: 0,
        max: 3,
        start: 0,
        step: 1,
        format: (v) => SHAPES[Math.min(3, Math.max(0, Math.round(v)))],
      },
    ],
    baseReveal: {},
    beats: [
      {
        text: "Step back: these four shapes are **one family**, the conic sections, each a different slice through a cone.",
      },
      {
        text: "One number, the **eccentricity** $e$, sorts them: a circle has $e = 0$, an ellipse $0 < e < 1$, a parabola $e = 1$, and a hyperbola $e > 1$.",
      },
      {
        text: "Same idea, four shapes, one framework. In a moment you can pick any of them to compare their equations side by side.",
      },
    ],
    practice: "Take your time: click each conic in the figure, or a row in the table, to highlight it and compare its equation with the rest. Every click anywhere on the figure steps to the next shape.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Explore all four. Click through the shapes and finish on the **hyperbola** to highlight it.",
        hint: "Click the outer, two-branch curve, or the hyperbola row in the table. Clicking empty space steps to the next shape.",
        success: "That is the hyperbola, the wide-open $e > 1$ member of the conic family.",
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
        prompt: "The four conics are unified because they are all",
        options: ["graphs of lines", "cross-sections of a cone", "kinds of parabola"],
        answer: 1,
        hint: "Think about slicing a cone at different angles.",
        success: "Each conic is a plane slice of a cone, which is why they share one framework.",
      },
    ],
  },
];
