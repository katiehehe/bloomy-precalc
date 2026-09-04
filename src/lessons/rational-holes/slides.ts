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
    title: "A hole versus a vertical asymptote",
    mode: "holes",
    params: [tracer()],
    baseReveal: {},
    beats: [
      {
        text: "Dividing one polynomial by another can cancel a common factor or leave a zero in the denominator. A cancelled factor leaves a hole, while a leftover denominator zero builds a vertical asymptote. This example is already factored: $$f(x)=\\dfrac{(x+2)(x-1)}{(x-1)(x-3)}.$$",
        add: { curve: true, readout: true },
      },
      {
        text: "The numerator and denominator share the factor $(x-1)$. Cancelling it simplifies $f$ to $\\dfrac{x+2}{x-3}$, yet $x=1$ stays out of the domain because it makes the original denominator zero.",
      },
      {
        text: "The graph therefore has a **hole** at $(1,-1.5)$, a single missing point. A cancelled factor removes exactly one point and changes nothing else about the curve.",
        add: { hole: true },
      },
      {
        text: "The factor $(x-3)$ has no match in the numerator, so it never cancels. At $x=3$ the denominator is zero while the numerator is not, which forces a **vertical asymptote**, a vertical line the graph approaches but never touches.",
        add: { va: true },
      },
      {
        text: "Near $x=3$ the value $|f(x)|$ grows without bound, while at $x=1$ the curve is missing only that one point.",
        add: { tracer: true },
      },
    ],
    practice: "Drag the tracer just left of the wall at $x=3$.",
    questions: [
      {
        kind: "choice",
        prompt: "Cancelling the shared factor $(x-1)$ produces which feature at $x=1$?",
        options: ["A hole", "A vertical asymptote", "An x-intercept"],
        answer: 0,
        hint: "A factor that cancels leaves a single missing point, not a wall.",
        success: "Correct: a cancelled factor leaves a removable hole at $(1,-1.5)$.",
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
    title: "Why a leftover zero builds a wall",
    mode: "why",
    params: [tracer(400)],
    baseReveal: { curve: true, va: true, readout: true, parts: true },
    beats: [
      {
        text: "To understand why the graph grows without bound at $x=3$, track the numerator and denominator of $\\dfrac{x+2}{x-3}$ separately as $x$ approaches $3$ from the right.",
        add: { tracer: true },
      },
      {
        text: "At $x=3.5$ the denominator $x-3$ equals $0.5$ and the numerator is about $5.5$, so $f\\approx 11$. The value is large but still finite.",
        to: { x: 350 },
        ms: 1600,
      },
      {
        text: "At $x=3.05$ the denominator is only $0.05$, a tiny **positive** number, while the numerator stays near $5$. Dividing $5$ by $0.05$ gives about $100$, and as the denominator keeps shrinking $f\\to +\\infty$.",
        to: { x: 305 },
        ms: 2200,
      },
      {
        text: "Approaching from the **left** reverses the sign. Just below $3$, at $x=2.9$, the denominator is a tiny **negative** number, so a positive numerator divided by it makes $f\\to -\\infty$.",
        to: { x: 290 },
        ms: 1800,
      },
      {
        text: "Every vertical asymptote works this way: a nonzero numerator divided by a denominator shrinking to zero. The sign of the denominator determines whether the graph rises to $+\\infty$ or falls to $-\\infty$.",
      },
    ],
    practice: "Drag the tracer just right of the wall at $x=3$.",
    questions: [
      {
        kind: "choice",
        prompt: "As $x\\to 3$ from the **left**, the denominator $x-3$ is a tiny negative number, so $f(x)$ approaches:",
        options: ["$+\\infty$", "$-\\infty$", "$0$"],
        answer: 1,
        hint: "A positive numerator divided by a tiny negative denominator is a large negative number.",
        success: "Correct: a tiny negative denominator sends $f$ to $-\\infty$.",
      },
      {
        kind: "manipulate",
        prompt: "Drag the tracer just right of the wall, into $3 < x < 3.4$, and watch $f$ grow toward $+\\infty$.",
        hint: "Approach $x=3$ from the right side.",
        success: "The denominator is a shrinking positive number, so $f\\to +\\infty$.",
        check: (value) => {
          const x = value / 100;
          return x > 3.02 && x < 3.4;
        },
      },
    ],
  },
];
