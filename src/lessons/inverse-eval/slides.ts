import type { ParamSpec, Slide } from "../types";

const thetaParam: ParamSpec = {
  key: "theta",
  label: "Angle \u03b8",
  min: -90,
  max: 180,
  start: 150,
  step: 5,
  format: (v) => `\u03b8 = ${Math.round(v)}\u00b0`,
};

export const slides: Slide[] = [
  {
    id: "ranges",
    title: "Why inverse trig needs a range",
    mode: "ranges",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "The equation $\\sin\\theta = \\tfrac12$ has infinitely many solutions: $30^\\circ$, $150^\\circ$, and every angle coterminal with either of those. An inverse function returns exactly one output for each input, so $\\arcsin\\tfrac12$ is defined to be one of those angles, not the whole list.",
      },
      {
        text: "To choose that one angle, we restrict sine to an interval on which it is one-to-one. The outputs on that interval are the **principal values**. For $\\arcsin$, the interval is $\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$, the angles in quadrants IV and I. There sine takes every value from $-1$ to $1$ exactly once.",
      },
      {
        text: "The same interval does not work for cosine. On $\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$ cosine is never negative, so $\\arccos$ could not return a negative value. Instead $\\arccos$ uses $[0, \\pi]$, the angles in quadrants I and II, where cosine runs from $1$ down to $-1$ exactly once.",
        add: { s1: true },
      },
      {
        text: "$\\arctan$ uses $\\left(-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right)$, the same right-hand quadrants as arcsine, but open at the endpoints because tangent is undefined at $\\pm\\tfrac{\\pi}{2}$. These three intervals are the principal-value ranges. Every evaluation in this lesson uses them.",
        add: { s2: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "What is the principal-value range of $\\arccos$?",
        options: ["$[0, \\pi]$", "$\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$", "$[0, 2\\pi]$", "$(-\\pi, \\pi)$"],
        answer: 0,
        hint: "Cosine needs an interval on which it runs from $1$ down to $-1$ exactly once. That is $[0, \\pi]$.",
        success: "$\\arccos$ returns angles in $[0, \\pi]$.",
      },
      {
        kind: "choice",
        prompt: "Why does $\\arcsin$ return only one of the angles whose sine is the given number?",
        options: [
          "a function returns only one output for each input",
          "sine is never negative",
          "angles larger than $90^\\circ$ do not exist",
          "the calculator rounds them off",
        ],
        answer: 0,
        hint: "A function returns only one output for each input.",
        success: "A function returns one output, so $\\arcsin$ is defined using one interval, the principal-value range.",
      },
    ],
  },
  {
    id: "arcsin",
    title: "Evaluating an arcsine",
    mode: "arcsin",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Read $\\arcsin\\tfrac12$ as a question: which angle has a sine of $\\tfrac12$, chosen from the range $\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$?",
        add: { s1: true },
      },
      {
        text: "From the unit circle, two familiar angles have $\\sin\\theta = \\tfrac12$: namely $30^\\circ$ and $150^\\circ$.",
        add: { s2: true },
      },
      {
        text: "Now apply the range. $150^\\circ$ lies in quadrant II, outside $\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$, so it is discarded. This is the step people skip, so make sure to check the range every time.",
        add: { s3: true },
      },
      {
        text: "The remaining candidate is $30^\\circ$, or $\\dfrac{\\pi}{6}$, the unique angle in the principal-value range. The evaluation is therefore: $$\\arcsin\\tfrac12 = \\dfrac{\\pi}{6}.$$",
        add: { s4: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "$\\arcsin\\!\\left(-\\tfrac12\\right) =$",
        options: ["$-\\dfrac{\\pi}{6}$", "$\\dfrac{7\\pi}{6}$", "$\\dfrac{11\\pi}{6}$", "$\\dfrac{5\\pi}{6}$"],
        answer: 0,
        hint: "A negative sine sends the answer into quadrant IV, and $-\\tfrac{\\pi}{6}$ is inside $\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$.",
        success: "$\\arcsin\\!\\left(-\\tfrac12\\right) = -\\dfrac{\\pi}{6}$.",
      },
      {
        kind: "choice",
        prompt: "Why is $\\arcsin\\tfrac12 \\ne \\dfrac{5\\pi}{6}$?",
        options: [
          "$\\dfrac{5\\pi}{6}$ is outside $\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$",
          "$\\sin\\dfrac{5\\pi}{6} \\ne \\tfrac12$",
          "$\\dfrac{5\\pi}{6}$ is negative",
          "arcsine only returns degrees",
        ],
        answer: 0,
        hint: "Its sine is right, but check whether it lies in the principal-value range.",
        success: "$\\dfrac{5\\pi}{6} = 150^\\circ$ is in quadrant II, outside the arcsine range.",
      },
    ],
  },
  {
    id: "arccos",
    title: "Arccosine of a negative",
    mode: "arccos",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "The range is easiest to get wrong when the input is negative. Evaluate $\\arccos\\!\\left(-\\tfrac12\\right)$: which angle in $[0, \\pi]$ has cosine $-\\tfrac12$?",
        add: { s1: true },
      },
      {
        text: "Cosine is the $x$-coordinate, and it is negative in quadrant II. Inside $[0, \\pi]$, the angle with $\\cos\\theta = -\\tfrac12$ is $120^\\circ$.",
        add: { s2: true },
      },
      {
        text: "In radians that is $\\dfrac{2\\pi}{3}$, so the evaluation gives: $$\\arccos\\!\\left(-\\tfrac12\\right) = \\dfrac{2\\pi}{3}.$$ The answer is obtuse, because arccosine of a negative always lands in quadrant II, never quadrant III.",
        add: { s3: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "$\\arccos\\!\\left(-\\tfrac{\\sqrt2}{2}\\right) =$",
        options: ["$\\dfrac{3\\pi}{4}$", "$\\dfrac{\\pi}{4}$", "$\\dfrac{5\\pi}{4}$", "$-\\dfrac{\\pi}{4}$"],
        answer: 0,
        hint: "The reference angle is $\\tfrac{\\pi}{4}$. A negative cosine puts it in quadrant II, so $\\pi - \\tfrac{\\pi}{4}$.",
        success: "$\\arccos\\!\\left(-\\tfrac{\\sqrt2}{2}\\right) = \\dfrac{3\\pi}{4}$.",
      },
      {
        kind: "choice",
        prompt: "The output of $\\arccos$ applied to any negative number is:",
        options: [
          "an obtuse angle in quadrant II",
          "a negative angle in quadrant IV",
          "an angle in quadrant III",
          "always $\\pi$",
        ],
        answer: 0,
        hint: "Stay inside $[0, \\pi]$ and remember cosine is negative only in the second quadrant there.",
        success: "It is obtuse, between $\\tfrac{\\pi}{2}$ and $\\pi$ (quadrant II).",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn: read an arcsine off the circle",
    mode: "practice",
    params: [thetaParam],
    baseReveal: {},
    beats: [
      {
        text: "The shaded region is the principal-value range of arcsine, $\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$. The ray marks the current angle $\\theta$, and the sine of that angle is listed below.",
        add: { s1: true },
      },
      {
        text: "The ray starts at $150^\\circ$. Its sine is $\\tfrac12$, which is the input we want, but $150^\\circ$ lies outside the shaded range, so it is not $\\arcsin\\tfrac12$.",
        add: { s2: true },
      },
    ],
    practice: "Drag $\\theta$ into the principal-value range, to the angle whose sine is still $\\tfrac12$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Drag $\\theta$ to $\\arcsin\\tfrac12$: the angle in $\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$ whose sine is $\\tfrac12$.",
        hint: "$\\sin\\theta = \\tfrac12$ at $30^\\circ$ and $150^\\circ$, but only $30^\\circ$ lies in the principal-value range.",
        success: "$30^\\circ = \\tfrac{\\pi}{6}$ has sine $\\tfrac12$ and lies in the range, so $\\arcsin\\tfrac12 = \\tfrac{\\pi}{6}$.",
        check: (value) => Math.abs(value - 30) < 3,
      },
      {
        kind: "choice",
        prompt: "You pass $\\theta = 150^\\circ$, where $\\sin\\theta = \\tfrac12$. Why is that not $\\arcsin\\tfrac12$?",
        options: [
          "$150^\\circ$ is outside the range $\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$",
          "$\\sin 150^\\circ \\ne \\tfrac12$",
          "$150^\\circ$ is a negative angle",
          "arcsine has no value at $\\tfrac12$",
        ],
        answer: 0,
        hint: "The sine is correct. Check whether the angle lies in the principal-value range.",
        success: "Right: $150^\\circ$ has the correct sine but lies outside the arcsine range, so the answer is $30^\\circ$.",
      },
    ],
  },
];
