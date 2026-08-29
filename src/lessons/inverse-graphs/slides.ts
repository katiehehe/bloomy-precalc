import type { ParamSpec, Slide } from "../types";

const inputParam = (start: number): ParamSpec => ({
  key: "x",
  label: "Input",
  min: -10,
  max: 10,
  start,
  step: 1,
  format: (v) => `x = ${(v / 10).toFixed(1)}`,
});

export const slides: Slide[] = [
  {
    id: "restrict",
    title: "Why we restrict the domain",
    mode: "restrict",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Sine is a perfectly good function, but it fails the test for having an inverse. The dashed curve shows the full sine: it rises and falls forever, so it is **many-to-one**, lots of different inputs share the same output.",
      },
      {
        text: "The horizontal line test makes the failure visible. A single horizontal line crosses the full sine again and again, so an inverse would not know which angle to send back. An inverse needs exactly one input per output.",
        add: { line: true },
      },
      {
        text: "The fix is to keep only one rising piece, the solid arc from $-\\dfrac{\\pi}{2}$ to $\\dfrac{\\pi}{2}$. On that restricted domain sine climbs steadily from $-1$ to $1$, hitting every value once, so the horizontal line now meets it a single time.",
      },
      {
        text: "That one-to-one piece is the only part we invert. Make sure to remember it: arcsine is the inverse of sine **restricted** to $\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right]$, which is exactly why its outputs live in that range.",
      },
    ],
    practice: "An inverse exists only where the original is one-to-one (passes the horizontal line test).",
    questions: [
      {
        kind: "choice",
        prompt: "Why must we restrict sine before inverting it?",
        options: [
          "the full sine is many-to-one and fails the horizontal line test",
          "sine is undefined at some angles",
          "sine grows without bound",
          "sine is negative half the time",
        ],
        answer: 0,
        hint: "Count how many times a horizontal line meets the full curve.",
        success: "Only a one-to-one piece can be inverted, so we keep $\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$.",
      },
      {
        kind: "choice",
        prompt: "On the restricted domain $\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right]$, sine is:",
        options: ["one-to-one and increasing", "still many-to-one", "constant", "undefined"],
        answer: 0,
        hint: "It climbs once from $-1$ to $1$ with no repeats.",
        success: "It rises steadily and passes the horizontal line test.",
      },
    ],
  },
  {
    id: "reflect",
    title: "Reflect to build arcsine",
    mode: "reflect",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Start from the one-to-one piece of sine (the orange arc). An inverse undoes the function, and geometrically that means swapping the roles of input and output.",
      },
      {
        text: "Swapping $x$ and $y$ is a reflection across the line $y = x$. Draw that mirror line first.",
        add: { axis: true },
      },
      {
        text: "Now flip the sine arc across it. Every point $(a, b)$ on sine becomes $(b, a)$ on the new curve. Watch it fold over.",
        draw: true,
        add: { reflected: true },
      },
      {
        text: "The blue reflection is $y = \\arcsin x$. Notice the swap in numbers: sine took $\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right]$ to $[-1, 1]$, so arcsine takes $[-1, 1]$ back to $\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right]$. Domain and range trade places.",
      },
    ],
    practice: "An inverse is the reflection of the original across $y = x$. Domain and range swap.",
    questions: [
      {
        kind: "choice",
        prompt: "The graph of an inverse function is the original reflected across:",
        options: ["$y = x$", "the $x$-axis", "the $y$-axis", "the origin"],
        answer: 0,
        hint: "Inverting swaps input and output coordinates.",
        success: "Reflecting across $y = x$ swaps $x$ and $y$.",
      },
      {
        kind: "choice",
        prompt: "The domain of $\\arcsin x$ is:",
        options: ["$[-1, 1]$", "$\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right]$", "all real numbers", "$[0, \\pi]$"],
        answer: 0,
        hint: "It is the range of the restricted sine, now used as inputs.",
        success: "Arcsine accepts $[-1, 1]$ and returns $\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right]$.",
      },
    ],
  },
  {
    id: "evaluate",
    title: "Read a value off the graph",
    mode: "evaluate",
    params: [inputParam(0)],
    baseReveal: {},
    beats: [
      {
        text: "The arcsine graph is a lookup table. Pick an input on the horizontal axis between $-1$ and $1$, go up to the curve, and read the angle across on the vertical axis.",
        to: { x: 5 },
        ms: 1400,
      },
      {
        text: "At input $0.5$, the curve sits at height $\\dfrac{\\pi}{6} \\approx 0.52$, matching $\\arcsin\\tfrac12 = \\dfrac{\\pi}{6}$ from before. The output never leaves $\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right]$, the dashed ceiling and floor.",
        to: { x: 5 },
        ms: 1000,
      },
      {
        text: "Slide the input elsewhere and the curve reports a different angle: at $x=-0.6$ it dips to about $-0.64$ radians, still between that floor and ceiling.",
        to: { x: -6 },
        ms: 1400,
      },
    ],
    practice: "Drag the input and read the angle the curve returns.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Move the input so the output is $\\dfrac{\\pi}{6}$.",
        hint: "$\\arcsin x = \\dfrac{\\pi}{6}$ when $x = \\sin\\dfrac{\\pi}{6} = 0.5$.",
        success: "At $x = 0.5$ the curve returns $\\dfrac{\\pi}{6}$, exactly $\\arcsin\\tfrac12$.",
        check: (value) => Math.abs(Math.asin(Math.max(-1, Math.min(1, value / 10)) ) - Math.PI / 6) < 0.03,
      },
      {
        kind: "choice",
        prompt: "As the input runs from $-1$ to $1$, the arcsine output runs from:",
        options: [
          "$-\\dfrac{\\pi}{2}$ up to $\\dfrac{\\pi}{2}$",
          "$0$ up to $\\pi$",
          "$-1$ up to $1$",
          "$-\\pi$ up to $\\pi$",
        ],
        answer: 0,
        hint: "The output range is the restricted domain of sine.",
        success: "Arcsine spans $\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right]$.",
      },
    ],
  },
];
