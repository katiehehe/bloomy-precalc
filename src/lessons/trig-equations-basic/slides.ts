import type { ParamSpec, Slide } from "../types";

const angleParam = (start: number): ParamSpec => ({
  key: "x",
  label: "Angle x",
  min: 0,
  max: 345,
  start,
  step: 15,
  format: (v) => `x = ${Math.round(v)}\u00b0`,
});

export const slides: Slide[] = [
  {
    id: "two-solutions",
    title: "One equation, two solutions",
    mode: "twosol",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Solve $\\sin x = \\tfrac12$ on one full turn, $[0, 2\\pi)$. A trig equation is different from an algebra equation: because the circle comes back around, most values are hit **twice** per turn, so expect more than one answer.",
      },
      {
        text: "Step one is the **reference angle**: ignore signs and ask which acute angle has this sine. Here $\\sin^{-1}\\tfrac12 = \\dfrac{\\pi}{6}$, or $30^\\circ$.",
        add: { s1: true },
      },
      {
        text: "Step two places it. Sine is the height, and the height is positive in quadrants I and II, so there are two solutions: the reference angle itself, and its mirror $\\pi - \\dfrac{\\pi}{6}$ across the $y$-axis.",
        add: { s2: true },
      },
      {
        text: "That gives the two solutions: $$x = \\dfrac{\\pi}{6} \\quad \\text{and} \\quad x = \\dfrac{5\\pi}{6}.$$ Make sure to find every solution in the interval, not just the first one the calculator reports.",
        add: { s3: true },
      },
    ],
    practice: "Find the reference angle, then use the sign to place every solution in the interval.",
    questions: [
      {
        kind: "choice",
        prompt: "On $[0, 2\\pi)$, how many solutions does $\\sin x = \\tfrac12$ have?",
        options: ["two", "one", "three", "infinitely many"],
        answer: 0,
        hint: "Sine is positive in two quadrants, and each contributes one angle in a single turn.",
        success: "Two: $\\dfrac{\\pi}{6}$ and $\\dfrac{5\\pi}{6}$.",
      },
      {
        kind: "choice",
        prompt: "Solve $\\cos x = -\\dfrac{\\sqrt2}{2}$ on $[0, 2\\pi)$.",
        options: [
          "$\\dfrac{3\\pi}{4}, \\ \\dfrac{5\\pi}{4}$",
          "$\\dfrac{\\pi}{4}, \\ \\dfrac{7\\pi}{4}$",
          "$\\dfrac{3\\pi}{4}$ only",
          "$\\dfrac{\\pi}{4}, \\ \\dfrac{3\\pi}{4}$",
        ],
        answer: 0,
        hint: "Reference angle $\\tfrac{\\pi}{4}$. Cosine is negative in quadrants II and III.",
        success: "Cosine is negative in II and III: $x = \\dfrac{3\\pi}{4}, \\dfrac{5\\pi}{4}$.",
      },
    ],
  },
  {
    id: "general",
    title: "Every turn, all over again",
    mode: "general",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Those two answers are only the solutions inside one turn. But $\\sin x = \\tfrac12$ is still true if you add a full revolution, because sine repeats every $2\\pi$.",
        add: { s1: true },
      },
      {
        text: "To capture all of them at once, add $2\\pi k$, where $k$ is any integer. Positive values of $k$ add whole turns and negative values remove them, while $k = 0$ recovers the original pair. This family is the **general solution**, the complete answer whenever a problem states no interval.",
        add: { s2: true },
      },
      {
        text: "So make sure to read the problem: if it asks for solutions on $[0, 2\\pi)$, give the two. If it asks for all solutions, give the family with $+\\,2\\pi k$.",
      },
    ],
    practice: "Add $2\\pi k$ to each base solution to describe every co-terminal answer.",
    questions: [
      {
        kind: "choice",
        prompt: "The general solution of $\\sin x = \\tfrac12$ is:",
        options: [
          "$x = \\dfrac{\\pi}{6} + 2\\pi k, \\ \\dfrac{5\\pi}{6} + 2\\pi k$",
          "$x = \\dfrac{\\pi}{6} + \\pi k$",
          "$x = \\dfrac{\\pi}{6}, \\ \\dfrac{5\\pi}{6}$ only",
          "$x = \\dfrac{\\pi}{6} + 2\\pi k$ only",
        ],
        answer: 0,
        hint: "Both base angles repeat, and the period of sine is $2\\pi$.",
        success: "Both solutions carry a $+\\,2\\pi k$: $x = \\dfrac{\\pi}{6} + 2\\pi k, \\ \\dfrac{5\\pi}{6} + 2\\pi k$.",
      },
      {
        kind: "choice",
        prompt: "Why is the added term $2\\pi k$ rather than $\\pi k$?",
        options: [
          "$2\\pi$ is the period of sine, so it returns to the same value",
          "$\\pi k$ would be simpler",
          "$k$ must be even",
          "sine has no period",
        ],
        answer: 0,
        hint: "Adding the period leaves every trig value unchanged.",
        success: "Sine repeats every $2\\pi$, so a full period is what preserves the value.",
      },
    ],
  },
  {
    id: "find",
    title: "Find a solution yourself",
    mode: "find",
    params: [angleParam(0)],
    baseReveal: {},
    beats: [
      {
        text: "As the angle turns, the terminal point rises and falls, and its height above the axis is exactly $\\sin x$. A solution of $\\sin x = \\tfrac12$ is any angle whose point lands on the dashed line at height $\\tfrac12$.",
        to: { x: 90 },
        ms: 1500,
      },
      {
        text: "There are two spots where the point touches that line, one on the way up and one on the way down: the pair $\\dfrac{\\pi}{6}$ and $\\dfrac{5\\pi}{6}$ you just solved for.",
        to: { x: 30 },
        ms: 1400,
      },
      {
        text: "Away from those two spots the height misses $\\tfrac12$. By $210^\\circ$ the point has dropped below the axis to height $-\\tfrac12$.",
        to: { x: 210 },
        ms: 1500,
      },
    ],
    practice: "Drag the angle until the terminal point rests on the dashed line $y = \\tfrac12$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Turn the angle to a solution of $\\sin x = \\tfrac12$.",
        hint: "The point must sit on the dashed line. The first solution is $30^\\circ$, the second is $150^\\circ$.",
        success: "The height is $\\tfrac12$, so this angle solves $\\sin x = \\tfrac12$.",
        check: (value) => Math.abs(Math.sin((value * Math.PI) / 180) - 0.5) < 0.03,
      },
      {
        kind: "choice",
        prompt: "Both solutions share the same:",
        options: ["height (sine value)", "$x$-coordinate", "quadrant", "reference line for cosine"],
        answer: 0,
        hint: "They both land on the same dashed horizontal line.",
        success: "Both land at the same height $\\tfrac12$, which is why both satisfy $\\sin x = \\tfrac12$.",
      },
    ],
  },
];
