import type { ParamSpec, Slide } from "../types";

const tracer = (start = 0): ParamSpec => ({
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
    id: "holes-vs-walls",
    title: "Holes and walls",
    mode: "holes",
    params: [tracer()],
    baseReveal: {},
    beats: [
      {
        text: "Here is a **rational function**, one polynomial over another: $f(x)=\\dfrac{(x+2)(x-1)}{(x-1)(x-3)}$.",
        add: { curve: true, readout: true },
      },
      {
        text: "Top and bottom share the factor $(x-1)$. Cancel it and $f$ simplifies to $\\dfrac{x+2}{x-3}$, but $x=1$ is still banned from the domain. What happens there?",
      },
      {
        text: "You get a **hole**: one missing point at $(1,-1.5)$. A cancelled factor removes a single spot, nothing more.",
        add: { hole: true },
      },
      {
        text: "The leftover factor $(x-3)$ has no partner. At $x=3$ the denominator is zero, so the graph races off to a **vertical asymptote**.",
        add: { va: true },
      },
      {
        text: "Near $x=3$ the value $|f(x)|$ explodes, while at $x=1$ the curve simply skips a single point.",
        add: { tracer: true },
      },
    ],
    practice: "Drag the tracer along the curve. Watch $f(x)$ as you near $x=3$.",
    questions: [
      {
        kind: "choice",
        prompt: "Cancelling the shared factor $(x-1)$ creates what at $x=1$?",
        options: ["A hole", "A vertical asymptote", "An x-intercept"],
        answer: 0,
        hint: "A factor that cancels leaves a single missing point, not a wall.",
        success: "Right: a cancelled factor makes a removable hole at $(1,-1.5)$.",
      },
      {
        kind: "plot",
        prompt: "Click the point where the graph crosses the x-axis.",
        target: { x: -2, y: 0 },
        tolerance: 0.6,
        label: "(-2, 0)",
        hint: "The numerator factor $x+2$ is zero there.",
        success: "Yes: the x-intercept is $(-2,0)$.",
      },
      {
        kind: "manipulate",
        prompt: "Drag the tracer just left of the wall, into $2.5 < x < 3$.",
        hint: "Slide toward $x=3$ from the left side.",
        success: "As $x\\to 3^-$, $f(x)\\to -\\infty$: that is the vertical asymptote.",
        check: (value) => {
          const x = value / 100;
          return x > 2.5 && x < 2.98;
        },
      },
    ],
  },
  {
    id: "why-the-wall",
    title: "Why the wall happens",
    mode: "why",
    params: [tracer(400)],
    baseReveal: { curve: true, va: true, readout: true, parts: true },
    beats: [
      {
        text: "Why does the graph explode at $x=3$? Watch the top and bottom of $\\dfrac{x+2}{x-3}$ separately as $x$ slides in from the right.",
        add: { tracer: true },
      },
      {
        text: "At $x=3.5$ the bottom $x-3=0.5$, and the top is about $5.5$. Dividing gives $f\\approx 11$. Not dramatic yet.",
        to: { x: 350 },
        ms: 1600,
      },
      {
        text: "Closer, at $x=3.05$, the bottom is only $0.05$: tiny and **positive**. About $5$ divided by $0.05$ is $100$, so the point rockets up. $f\\to +\\infty$.",
        to: { x: 305 },
        ms: 2200,
      },
      {
        text: "From the **left** it flips. Just below 3, at $x=2.9$, the bottom is a tiny **negative** number, so $f$ dives to $-\\infty$.",
        to: { x: 290 },
        ms: 1800,
      },
      {
        text: "That is every vertical asymptote: a nonzero top divided by a bottom that is collapsing to zero. The sign of the bottom decides up or down.",
      },
    ],
    practice: "Drag the tracer across $x=3$. Watch the bottom shrink and $f$ explode.",
    questions: [
      {
        kind: "choice",
        prompt: "As $x\\to 3$ from the **left**, the bottom $x-3$ is a tiny negative number. So $f(x)$ heads to:",
        options: ["$+\\infty$", "$-\\infty$", "$0$"],
        answer: 1,
        hint: "A positive top divided by a tiny negative bottom is a big negative number.",
        success: "Right: a tiny negative bottom sends $f$ to $-\\infty$.",
      },
      {
        kind: "manipulate",
        prompt: "Drag the tracer just right of the wall, into $3 < x < 3.4$, and watch $f$ shoot up.",
        hint: "Approach $x=3$ from the right side.",
        success: "The bottom is a shrinking positive number, so $f\\to +\\infty$.",
        check: (value) => {
          const x = value / 100;
          return x > 3.02 && x < 3.4;
        },
      },
    ],
  },
];
