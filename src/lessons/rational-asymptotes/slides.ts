import type { ParamSpec, Slide } from "../types";

const tracer = (start: number): ParamSpec => ({
  key: "x",
  label: "Tracer x",
  min: -500,
  max: 500,
  start,
  step: 10,
  format: (v) => `x = ${(v / 100).toFixed(2)}`,
});

export const slides: Slide[] = [
  {
    id: "equal-degree",
    title: "A horizontal ceiling",
    mode: "horizontal",
    params: [tracer(0)],
    baseReveal: {},
    beats: [
      {
        text: "When the top and bottom have the **same degree**, the ends of the graph level off. An example is $$f(x)=\\dfrac{2x^2+1}{x^2+1}.$$",
        add: { curve: true, readout: true },
      },
      {
        text: "As $x$ grows huge, the $+1$ on each part stops mattering. What value do you think $f$ settles toward?",
      },
      {
        text: "The ends approach $y=2$, the ratio of the **leading coefficients** $\\tfrac{2}{1}$. That flat line is the **horizontal asymptote**.",
        add: { ha: true },
      },
      {
        text: "Far to the left or right, $f(x)$ eases toward 2 without ever leaving the screen.",
        add: { tracer: true },
      },
    ],
    practice: "Drag the tracer toward the edges and watch $f(x)$ approach 2.",
    questions: [
      {
        kind: "choice",
        prompt: "With equal degrees, the horizontal asymptote is:",
        options: ["$y=0$", "the ratio of the leading coefficients", "there is none"],
        answer: 1,
        hint: "Compare the leading terms $2x^2$ and $x^2$.",
        success: "It is $y=2$, from $\\tfrac{2}{1}$.",
      },
      {
        kind: "plot",
        prompt: "Click a point on the line the graph approaches, near the right edge.",
        target: { x: 4, y: 2 },
        tolerance: 0.6,
        label: "y = 2",
        hint: "The ceiling sits at height 2.",
        success: "The horizontal asymptote is $y=2$.",
      },
      {
        kind: "manipulate",
        prompt: "Drag the tracer out past $x=4$ to see the end behavior.",
        hint: "Slide all the way to the right.",
        success: "Far out, $f(x)\\approx 2$.",
        check: (value) => value / 100 >= 4,
      },
    ],
  },
  {
    id: "why-level",
    title: "Why the ends level off",
    mode: "horizontal",
    params: [tracer(50)],
    baseReveal: { curve: true, ha: true, readout: true, parts: true },
    beats: [
      {
        text: "Why does $\\dfrac{2x^2+1}{x^2+1}$ flatten toward $y=2$? Compare the top and bottom as $x$ grows.",
        add: { tracer: true },
      },
      {
        text: "At $x=1$: the top is $3$, the bottom is $2$, so $f=1.5$. Still climbing.",
        to: { x: 100 },
        ms: 1500,
      },
      {
        text: "At $x=5$: the top is $51$, the bottom is $26$, so $f\\approx 1.96$. The $+1$ on each part barely matters now.",
        to: { x: 500 },
        ms: 2000,
      },
      {
        text: "For huge $x$, the $x^2$ terms dominate: $2x^2+1\\approx 2x^2$ and $x^2+1\\approx x^2$, so the ratio settles at $$\\dfrac{2x^2}{x^2}=2.$$ That is the horizontal asymptote.",
      },
      {
        text: "Back near the middle the climb restarts: at $x=1$, $f=1.5$, and it eases up toward the ceiling the farther out it runs.",
        to: { x: 100 },
        ms: 1600,
      },
    ],
    practice: "Drag the tracer far out and watch the top-over-bottom ratio settle near 2.",
    questions: [
      {
        kind: "choice",
        prompt: "For very large $x$, why does $\\dfrac{2x^2+1}{x^2+1}$ approach 2?",
        options: [
          "The $+1$ terms take over",
          "The $x^2$ terms dominate, leaving $2x^2/x^2$",
          "It approaches the line $y=x$",
        ],
        answer: 1,
        hint: "Which terms grow fastest as $x$ gets huge?",
        success: "Right: the leading $x^2$ terms dominate, so the ratio is $2$.",
      },
      {
        kind: "manipulate",
        prompt: "Drag the tracer out past $x=4$ and read the ratio settling near 2.",
        hint: "Slide to the right edge.",
        success: "Top over bottom lands near 2.",
        check: (value) => value / 100 >= 4,
      },
    ],
  },
  {
    id: "slant",
    title: "A slanted guide",
    mode: "slant",
    params: [tracer(200)],
    baseReveal: {},
    beats: [
      {
        text: "When the top degree is exactly **one more** than the bottom, the graph follows a slanted line. Take $g(x)=\\dfrac{x^2+1}{x}$.",
        add: { curve: true, readout: true },
      },
      {
        text: "Divide: $$g(x)=x+\\dfrac{1}{x}.$$ The $\\tfrac{1}{x}$ piece fades as $x$ grows, leaving the **slant asymptote** $y=x$.",
        add: { slant: true },
      },
      {
        text: "At $x=0$ the function is undefined, so a **vertical asymptote** splits the graph into two branches.",
        add: { va: true },
      },
      {
        text: "Far from the origin, each branch hugs the line $y=x$.",
        add: { tracer: true },
      },
    ],
    practice: "Drag the tracer far from the origin and watch it ride the line $y=x$.",
    questions: [
      {
        kind: "choice",
        prompt: "A top degree exactly one more than the bottom gives a:",
        options: ["horizontal asymptote", "slant asymptote", "hole"],
        answer: 1,
        hint: "Long division leaves a linear quotient plus a vanishing remainder.",
        success: "A slant asymptote, here $y=x$.",
      },
      {
        kind: "manipulate",
        prompt: "Drag the tracer past $x=4$ and watch $g(x)$ close in on $y=x$.",
        hint: "Slide far to the right, away from the wall at $x=0$.",
        success: "Since $g(x)=x+\\tfrac{1}{x}$, it approaches $y=x$.",
        check: (value) => value / 100 >= 4,
      },
    ],
  },
];
