import type { Slide } from "../types";

export const slides: Slide[] = [
  {
    id: "ranges",
    title: "Why inverse trig needs a range",
    mode: "ranges",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Here is the problem an inverse has to solve. The equation $\\sin\\theta = \\tfrac12$ has infinitely many answers: $30^\\circ$, $150^\\circ$, and every one of those plus a full turn. A function is only allowed **one** output, so $\\arcsin$ cannot return all of them.",
      },
      {
        text: "The fix is to agree on a single band of angles ahead of time, called the **principal-value range**, and always answer from there. For $\\arcsin$ that band is $\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$, the right half of the circle (quadrants IV and I), where sine hits every value from $-1$ to $1$ exactly once.",
      },
      {
        text: "Cosine cannot use that band: on the right half, cosine is positive the whole time, so it could never return a negative answer. $\\arccos$ instead uses the top half, $[0, \\pi]$ (quadrants I and II).",
        add: { s1: true },
      },
      {
        text: "$\\arctan$ uses $\\left(-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right)$, the same right half as arcsine but with the endpoints left open, since tangent is undefined at $\\pm\\tfrac{\\pi}{2}$. Memorize these three bands: every evaluation depends on them.",
        add: { s2: true },
      },
    ],
    practice: "Pick the answer that lands inside the function's principal-value range.",
    questions: [
      {
        kind: "choice",
        prompt: "What is the principal-value range of $\\arccos$?",
        options: ["$[0, \\pi]$", "$\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$", "$[0, 2\\pi]$", "$(-\\pi, \\pi)$"],
        answer: 0,
        hint: "Cosine needs a band where it runs from $1$ down to $-1$ once; that is the top half.",
        success: "$\\arccos$ returns angles in $[0, \\pi]$.",
      },
      {
        kind: "choice",
        prompt: "Why can $\\arcsin$ not simply return every angle with the right sine?",
        options: [
          "a function may return only one output for each input",
          "sine is never negative",
          "angles larger than $90^\\circ$ do not exist",
          "the calculator rounds them off",
        ],
        answer: 0,
        hint: "Think about the definition of a function.",
        success: "A function gives one output, so we fix one band and always answer from it.",
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
        text: "Now apply the range. $150^\\circ$ sits in quadrant II, outside $\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$, so we cross it out. This is the step people skip, so make sure to check the range every time.",
        add: { s3: true },
      },
      {
        text: "That leaves $30^\\circ$, which is $\\dfrac{\\pi}{6}$. So $\\arcsin\\tfrac12 = \\dfrac{\\pi}{6}$, the single angle inside the band.",
        add: { s4: true },
      },
    ],
    practice: "Find the angle with the given sine, then keep only the one inside the arcsine range.",
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
        text: "Negatives are where ranges really matter. Evaluate $\\arccos\\!\\left(-\\tfrac12\\right)$: which angle in $[0, \\pi]$ has cosine $-\\tfrac12$?",
        add: { s1: true },
      },
      {
        text: "Cosine is the $x$-coordinate, and it is negative in quadrant II. Inside $[0, \\pi]$, the angle with $\\cos\\theta = -\\tfrac12$ is $120^\\circ$.",
        add: { s2: true },
      },
      {
        text: "In radians that is $\\dfrac{2\\pi}{3}$, so $\\arccos\\!\\left(-\\tfrac12\\right) = \\dfrac{2\\pi}{3}$. Notice the answer is obtuse: arccosine of a negative always lands in quadrant II, never quadrant III.",
        add: { s3: true },
      },
    ],
    practice: "A negative cosine pushes the arccosine answer into quadrant II, still within $[0, \\pi]$.",
    questions: [
      {
        kind: "choice",
        prompt: "$\\arccos\\!\\left(-\\tfrac{\\sqrt2}{2}\\right) =$",
        options: ["$\\dfrac{3\\pi}{4}$", "$\\dfrac{\\pi}{4}$", "$\\dfrac{5\\pi}{4}$", "$-\\dfrac{\\pi}{4}$"],
        answer: 0,
        hint: "The reference angle is $\\tfrac{\\pi}{4}$; a negative cosine puts it in quadrant II, so $\\pi - \\tfrac{\\pi}{4}$.",
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
];
