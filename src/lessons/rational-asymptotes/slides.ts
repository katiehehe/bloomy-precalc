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
    title: "The horizontal asymptote",
    mode: "horizontal",
    params: [tracer(0)],
    baseReveal: {},
    beats: [
      {
        text: "When the numerator and denominator have the **same degree**, the two ends of the graph level off toward a fixed height. One example is $$f(x)=\\dfrac{2x^2+1}{x^2+1}.$$",
        add: { curve: true, readout: true },
      },
      {
        text: "As $|x|$ grows large, the constant $+1$ in the numerator and the $+1$ in the denominator become negligible beside the $x^2$ terms, so the ratio depends almost entirely on those leading terms.",
      },
      {
        text: "The ends approach $y=2$, the ratio of the **leading coefficients** $\\tfrac{2}{1}$. This flat line $y=2$ is the **horizontal asymptote**, the height the graph approaches as $x\\to\\pm\\infty$.",
        add: { ha: true },
      },
      {
        text: "Far to the left or right, $f(x)$ approaches $2$ from below, coming ever closer without reaching it.",
        add: { tracer: true },
      },
    ],
    practice: "Drag the tracer toward the left and right edges and watch $f(x)$ approach $2$.",
    questions: [
      {
        kind: "choice",
        prompt: "With equal degrees, the horizontal asymptote is:",
        options: ["$y=0$", "the ratio of the leading coefficients", "there is none"],
        answer: 1,
        hint: "Compare the leading terms $2x^2$ and $x^2$.",
        success: "The asymptote is $y=2$, the ratio $\\tfrac{2}{1}$ of the leading coefficients.",
      },
      {
        kind: "plot",
        prompt: "Click a point on the line the graph approaches, near the right edge.",
        target: { x: 4, y: 2 },
        tolerance: 0.6,
        label: "y = 2",
        hint: "The graph approaches the height $2$.",
        success: "The horizontal asymptote is $y=2$.",
      },
      {
        kind: "manipulate",
        prompt: "Drag the tracer out past $x=4$ to see the end behavior.",
        hint: "Slide all the way to the right.",
        success: "Far to the right, $f(x)\\approx 2$.",
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
        text: "The value of $\\dfrac{2x^2+1}{x^2+1}$ approaches $y=2$ because of how the numerator and denominator compare once $x$ is large.",
        add: { tracer: true },
      },
      {
        text: "At $x=1$ the numerator is $3$ and the denominator is $2$, so $f=1.5$. The value is still well below $2$.",
        to: { x: 100 },
        ms: 1500,
      },
      {
        text: "At $x=5$ the numerator is $51$ and the denominator is $26$, so $f\\approx 1.96$. The $+1$ in each part now contributes very little.",
        to: { x: 500 },
        ms: 2000,
      },
      {
        text: "For very large $x$ the $x^2$ terms dominate, so $2x^2+1\\approx 2x^2$ and $x^2+1\\approx x^2$. The ratio then settles at $$\\dfrac{2x^2}{x^2}=2.$$ This limiting value is the horizontal asymptote.",
      },
      {
        text: "Nearer the middle the value is smaller: at $x=1$, $f=1.5$, and it rises toward $2$ only as $x$ moves farther out.",
        to: { x: 100 },
        ms: 1600,
      },
    ],
    practice: "Drag the tracer far to the right and watch the ratio of numerator to denominator settle near $2$.",
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
        hint: "Which terms grow fastest as $x$ becomes large?",
        success: "Correct: the leading $x^2$ terms dominate, so the ratio approaches $2$.",
      },
      {
        kind: "manipulate",
        prompt: "Drag the tracer out past $x=4$ and read the ratio settling near $2$.",
        hint: "Slide to the right edge.",
        success: "The numerator over the denominator lands near $2$.",
        check: (value) => value / 100 >= 4,
      },
    ],
  },
  {
    id: "slant",
    title: "The slant asymptote",
    mode: "slant",
    params: [tracer(200)],
    baseReveal: {},
    beats: [
      {
        text: "When the numerator's degree is exactly **one more** than the denominator's, the graph follows a slanted line. One example is $g(x)=\\dfrac{x^2+1}{x}$.",
        add: { curve: true, readout: true },
      },
      {
        text: "Dividing gives $$g(x)=x+\\dfrac{1}{x}.$$ The term $\\tfrac{1}{x}$ shrinks toward zero as $|x|$ grows, which leaves the **slant asymptote** $y=x$, the line each branch approaches for large $|x|$.",
        add: { slant: true },
      },
      {
        text: "At $x=0$ the denominator is zero, so the function is undefined and a **vertical asymptote** splits the graph into two branches.",
        add: { va: true },
      },
      {
        text: "Far from the origin each branch approaches the line $y=x$, moving closer to it as $|x|$ increases.",
        add: { tracer: true },
      },
    ],
    practice: "Drag the tracer far from the origin and watch $g(x)$ approach the line $y=x$.",
    questions: [
      {
        kind: "choice",
        prompt: "A numerator degree exactly one more than the denominator gives a:",
        options: ["horizontal asymptote", "slant asymptote", "hole"],
        answer: 1,
        hint: "Long division leaves a linear quotient plus a vanishing remainder.",
        success: "A slant asymptote, here $y=x$.",
      },
      {
        kind: "manipulate",
        prompt: "Drag the tracer past $x=4$ and watch $g(x)$ approach the line $y=x$.",
        hint: "Slide far to the right, away from the wall at $x=0$.",
        success: "Since $g(x)=x+\\tfrac{1}{x}$, it approaches $y=x$.",
        check: (value) => value / 100 >= 4,
      },
    ],
  },
];
