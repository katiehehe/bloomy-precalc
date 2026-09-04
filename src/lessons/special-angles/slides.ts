import type { ParamSpec, Slide } from "../types";
import { AXIS, FAM30, FAM45, FAM60, PAIR3060 } from "./values";

function kParam(angles: readonly number[], start: number): ParamSpec {
  return {
    key: "k",
    label: "Angle",
    min: 0,
    max: angles.length - 1,
    start,
    step: 1,
    format: (v) => {
      const i = Math.max(0, Math.min(angles.length - 1, Math.round(v)));
      return `${angles[i]}\u00b0`;
    },
  };
}

export const slides: Slide[] = [
  {
    id: "axis-points",
    title: "Sine and cosine on the axes",
    mode: "axis",
    params: [kParam(AXIS, 0)],
    baseReveal: { arc: true },
    beats: [
      {
        text: "On the unit circle, $\\cos\\theta$ is the $x$-coordinate and $\\sin\\theta$ is the $y$-coordinate. The first exact values to read off are at the **axis angles**, where the circle meets the axes.",
        add: { readout: true, coords: true },
      },
      {
        text: "The four **axis angles** are where the circle meets the axes. At $0^\\circ$ the terminal side lies on the positive $x$-axis, so the point is $(1, 0)$. Therefore $\\cos 0^\\circ = 1$ and $\\sin 0^\\circ = 0$.",
        to: { k: 0 },
        ms: 900,
        add: { legs: true },
      },
      {
        text: "At $90^\\circ$ the terminal side points straight up the positive $y$-axis, so the point is $(0, 1)$. Therefore $\\cos 90^\\circ = 0$ and $\\sin 90^\\circ = 1$.",
        to: { k: 1 },
        ms: 1400,
      },
      {
        text: "At $180^\\circ$ the point is $(-1, 0)$, so cosine is $-1$ and sine is $0$. At $270^\\circ$ the point is $(0, -1)$, so cosine is $0$ and sine is $-1$.",
        to: { k: 3 },
        ms: 1800,
      },
      {
        text: "A full turn of $360^\\circ$ returns the terminal side to the positive $x$-axis. The point is again $(1, 0)$, which is why $360^\\circ$ and $0^\\circ$ are two names for the same position.",
        to: { k: 4 },
        ms: 1600,
      },
    ],
    practice: "Move the terminal side to $180^\\circ$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Place the terminal side at $180^\\circ$.",
        hint: "That is the negative $x$-axis, halfway around from $0^\\circ$.",
        success: "At $180^\\circ$ the point is $(-1, 0)$, so $\\cos 180^\\circ = -1$ and $\\sin 180^\\circ = 0$.",
        check: (value) => Math.round(value) === 2,
      },
      {
        kind: "choice",
        prompt: "What is $\\sin 270^\\circ$?",
        options: ["$0$", "$1$", "$-1$"],
        answer: 2,
        hint: "At $270^\\circ$ the point is at the bottom of the circle. Sine is the $y$-coordinate.",
        success: "The point is $(0, -1)$, so $\\sin 270^\\circ = -1$.",
      },
      {
        kind: "choice",
        prompt: "Why do $360^\\circ$ and $0^\\circ$ give the same sine and cosine?",
        options: [
          "they name the same point $(1, 0)$ on the circle",
          "every angle has the same sine and cosine",
          "a full turn changes the radius",
        ],
        answer: 0,
        hint: "A full turn brings the terminal side back to the positive $x$-axis.",
        success: "Both angles land at $(1, 0)$, so both have cosine $1$ and sine $0$.",
      },
    ],
  },
  {
    id: "reciprocals",
    title: "The other four trigonometric functions",
    mode: "recip",
    params: [kParam(AXIS, 0)],
    baseReveal: { arc: true, readout: true, coords: true, legs: true },
    beats: [
      {
        text: "By definition, $$\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}, \\qquad \\cot\\theta = \\dfrac{\\cos\\theta}{\\sin\\theta}.$$ A ratio is undefined when its denominator equals $0$.",
        add: { allSix: true },
      },
      {
        text: "The **reciprocal** of a number is $1$ divided by that number. By definition, $$\\sec\\theta = \\dfrac{1}{\\cos\\theta}, \\qquad \\csc\\theta = \\dfrac{1}{\\sin\\theta}.$$ Secant is undefined wherever cosine is $0$, and cosecant is undefined wherever sine is $0$.",
      },
      {
        text: "At $0^\\circ$, sine is $0$ and cosine is $1$, so $\\tan 0^\\circ = 0/1 = 0$ and $\\sec 0^\\circ = 1/1 = 1$. Both $\\csc 0^\\circ$ and $\\cot 0^\\circ$ divide by $\\sin 0^\\circ = 0$, so both are undefined.",
        to: { k: 0 },
        ms: 900,
      },
      {
        text: "At $90^\\circ$, cosine is $0$ and sine is $1$, so $\\csc 90^\\circ = 1$ and $\\cot 90^\\circ = 0$. Both $\\tan 90^\\circ$ and $\\sec 90^\\circ$ divide by $\\cos 90^\\circ = 0$, so both are undefined.",
        to: { k: 1 },
        ms: 1500,
      },
      {
        text: "At $180^\\circ$ the pattern matches $0^\\circ$ except cosine is $-1$: $\\tan 180^\\circ = 0$ and $\\sec 180^\\circ = -1$, while $\\csc$ and $\\cot$ stay undefined. At $270^\\circ$, $\\tan$ and $\\sec$ are undefined, $\\csc 270^\\circ = -1$, and $\\cot 270^\\circ = 0$.",
        to: { k: 2 },
        ms: 1600,
      },
    ],
    practice: "Move the terminal side to $270^\\circ$, where $\\csc\\theta = -1$.",
    questions: [
      {
        kind: "choice",
        prompt: "Which two functions are undefined at $90^\\circ$?",
        options: ["$\\tan\\theta$ and $\\sec\\theta$", "$\\sin\\theta$ and $\\cos\\theta$", "$\\csc\\theta$ and $\\cot\\theta$"],
        answer: 0,
        hint: "Look at which definitions divide by $\\cos\\theta$. At $90^\\circ$, cosine is $0$.",
        success: "$\\tan\\theta = \\sin\\theta/\\cos\\theta$ and $\\sec\\theta = 1/\\cos\\theta$ both divide by $0$ at $90^\\circ$.",
      },
      {
        kind: "choice",
        prompt: "What is $\\tan 180^\\circ$?",
        options: ["undefined", "$0$", "$-1$"],
        answer: 1,
        hint: "$\\tan\\theta = \\sin\\theta/\\cos\\theta$. At $180^\\circ$ those values are $0$ and $-1$.",
        success: "$\\tan 180^\\circ = 0/(-1) = 0$. Cosecant and cotangent are the ones undefined here.",
      },
      {
        kind: "manipulate",
        prompt: "Place the terminal side at $270^\\circ$, where $\\csc\\theta = -1$.",
        hint: "That is the negative $y$-axis, straight down from the origin.",
        success: "At $270^\\circ$ the point is $(0, -1)$, so $\\csc 270^\\circ = 1/(-1) = -1$.",
        check: (value) => Math.round(value) === 3,
      },
      {
        kind: "choice",
        prompt: "Why is $\\csc 0^\\circ$ undefined?",
        options: [
          "its definition divides by $\\sin 0^\\circ = 0$",
          "cosine is $0$ at $0^\\circ$",
          "the radius is $0$ at $0^\\circ$",
        ],
        answer: 0,
        hint: "$\\csc\\theta = 1/\\sin\\theta$. Check the $y$-coordinate at $0^\\circ$.",
        success: "$\\sin 0^\\circ = 0$, so $1/\\sin 0^\\circ$ is division by zero.",
      },
    ],
  },
  {
    id: "scale-45",
    title: "How to scale a $45$-$45$-$90$ triangle to hypotenuse $1$",
    mode: "scale45",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "An **isosceles right triangle** has two equal legs and two $45^\\circ$ angles, so if each leg has length $1$, Pythagoras gives the hypotenuse $\\sqrt{1^2 + 1^2} = \\sqrt{2}$. Scale the triangle so that hypotenuse equals the unit-circle radius $1$.",
        add: { s1: true },
      },
      {
        text: "On the unit circle the hypotenuse must equal the radius $1$. Dividing every side by $\\sqrt{2}$ is allowed because it scales the triangle without changing the angles, and it makes the hypotenuse $\\sqrt{2}/\\sqrt{2} = 1$.",
        add: { s2: true },
      },
      {
        text: "Each leg is then $1/\\sqrt{2}$. Rationalize the denominator by multiplying the top and the bottom by $\\sqrt{2}$: $$\\dfrac{1}{\\sqrt{2}}\\cdot\\dfrac{\\sqrt{2}}{\\sqrt{2}} = \\dfrac{\\sqrt{2}}{2}.$$",
        add: { s3: true },
      },
      {
        text: "At $45^\\circ$ the adjacent leg and the opposite leg are those equal lengths, so $\\cos 45^\\circ = \\sin 45^\\circ = \\tfrac{\\sqrt{2}}{2}$. The point is $\\left(\\tfrac{\\sqrt{2}}{2}, \\tfrac{\\sqrt{2}}{2}\\right)$.",
        add: { s4: true },
      },
      {
        text: "The other four values follow from the definitions. $\\tan 45^\\circ = (\\sqrt{2}/2)/(\\sqrt{2}/2) = 1$, $\\sec 45^\\circ = 1/(\\sqrt{2}/2) = 2/\\sqrt{2} = \\sqrt{2}$, $\\csc 45^\\circ = \\sqrt{2}$, and $\\cot 45^\\circ = 1$.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "After the hypotenuse is scaled to $1$, each leg of the $45^\\circ$-$45^\\circ$-$90^\\circ$ triangle equals",
        options: ["$\\tfrac{\\sqrt{2}}{2}$", "$\\tfrac{1}{2}$", "$\\sqrt{2}$"],
        answer: 0,
        hint: "Start with legs $1$ and hypotenuse $\\sqrt{2}$, then divide by $\\sqrt{2}$ and rationalize.",
        success: "$1/\\sqrt{2} = \\sqrt{2}/2$ after multiplying the top and the bottom by $\\sqrt{2}$.",
      },
      {
        kind: "choice",
        prompt: "Why are $\\sin 45^\\circ$ and $\\cos 45^\\circ$ equal?",
        options: [
          "the two legs of the $45^\\circ$-$45^\\circ$-$90^\\circ$ triangle are equal",
          "sine and cosine are equal at every angle",
          "the hypotenuse is $\\sqrt{2}$ after scaling",
        ],
        answer: 0,
        hint: "On the unit circle, cosine is the adjacent leg and sine is the opposite leg.",
        success: "Equal legs give $\\cos 45^\\circ = \\sin 45^\\circ = \\tfrac{\\sqrt{2}}{2}$.",
      },
      {
        kind: "choice",
        prompt: "What is $\\tan 45^\\circ$?",
        options: ["$1$", "$\\tfrac{\\sqrt{2}}{2}$", "undefined"],
        answer: 0,
        hint: "$\\tan\\theta = \\sin\\theta/\\cos\\theta$, and the two values are equal at $45^\\circ$.",
        success: "$(\\sqrt{2}/2)/(\\sqrt{2}/2) = 1$.",
      },
    ],
  },
  {
    id: "family-45",
    title: "The $45^\\circ$ family around the circle",
    mode: "fam45",
    params: [kParam(FAM45, 0)],
    baseReveal: { arc: true, readout: true, coords: true, legs: true, allSix: true },
    beats: [
      {
        text: "The quadrant sets the signs: cosine takes the sign of $x$, and sine takes the sign of $y$. Make sure to attach those signs before you form the four ratios.",
        to: { k: 0 },
        ms: 900,
      },
      {
        text: "At $135^\\circ$ the terminal side is in Quadrant II, where $x$ is negative and $y$ is positive. The point is $\\left(-\\tfrac{\\sqrt{2}}{2}, \\tfrac{\\sqrt{2}}{2}\\right)$. Then $\\tan 135^\\circ = (\\sqrt{2}/2)/(-\\sqrt{2}/2) = -1$.",
        to: { k: 1 },
        ms: 1600,
      },
      {
        text: "At $225^\\circ$ both coordinates are negative, so the point is $\\left(-\\tfrac{\\sqrt{2}}{2}, -\\tfrac{\\sqrt{2}}{2}\\right)$. The two minuses cancel in the tangent ratio: $\\tan 225^\\circ = (-\\sqrt{2}/2)/(-\\sqrt{2}/2) = 1$.",
        to: { k: 2 },
        ms: 1600,
      },
      {
        text: "At $315^\\circ$ the point is in Quadrant IV: $\\left(\\tfrac{\\sqrt{2}}{2}, -\\tfrac{\\sqrt{2}}{2}\\right)$. Then $\\tan 315^\\circ = -1$, $\\sec 315^\\circ = \\sqrt{2}$, and $\\csc 315^\\circ = -\\sqrt{2}$.",
        to: { k: 3 },
        ms: 1600,
      },
    ],
    practice: "Move the terminal side to $135^\\circ$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Place the terminal side at $135^\\circ$.",
        hint: "That is $45^\\circ$ past the positive $y$-axis, in Quadrant II.",
        success: "The point is $\\left(-\\tfrac{\\sqrt{2}}{2}, \\tfrac{\\sqrt{2}}{2}\\right)$.",
        check: (value) => Math.round(value) === 1,
      },
      {
        kind: "choice",
        prompt: "The point on the unit circle at $225^\\circ$ is",
        options: [
          "$\\left(-\\tfrac{\\sqrt{2}}{2}, -\\tfrac{\\sqrt{2}}{2}\\right)$",
          "$\\left(-\\tfrac{\\sqrt{2}}{2}, \\tfrac{\\sqrt{2}}{2}\\right)$",
          "$\\left(\\tfrac{\\sqrt{2}}{2}, -\\tfrac{\\sqrt{2}}{2}\\right)$",
        ],
        answer: 0,
        hint: "Quadrant III makes both cosine and sine negative. The lengths stay $\\sqrt{2}/2$.",
        success: "Both signs are negative in Quadrant III, so both coordinates are $-\\sqrt{2}/2$.",
      },
      {
        kind: "choice",
        prompt: "A terminal side meets the unit circle at $\\left(-\\tfrac{\\sqrt{2}}{2}, \\tfrac{\\sqrt{2}}{2}\\right)$. The angle is",
        options: ["$135^\\circ$", "$45^\\circ$", "$225^\\circ$", "$315^\\circ$"],
        answer: 0,
        hint: "Equal lengths $\\sqrt{2}/2$ with negative $x$ and positive $y$ are in Quadrant II.",
        success: "Negative cosine and positive sine put the point at $135^\\circ$.",
      },
      {
        kind: "choice",
        prompt: "What is $\\tan 315^\\circ$?",
        options: ["$-1$", "$1$", "$\\tfrac{\\sqrt{2}}{2}$"],
        answer: 0,
        hint: "$\\tan\\theta = \\sin\\theta/\\cos\\theta$. At $315^\\circ$ sine is negative and cosine is positive.",
        success: "$(-\\sqrt{2}/2)/(\\sqrt{2}/2) = -1$.",
      },
    ],
  },
  {
    id: "scale-30",
    title: "How to scale a $30$-$60$-$90$ triangle to hypotenuse $1$",
    mode: "scale30",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "A $30^\\circ$-$60^\\circ$-$90^\\circ$ triangle has unequal legs. It is half of an equilateral triangle of side $2$: the short leg is $1$, the hypotenuse is $2$, and Pythagoras gives the long leg $\\sqrt{2^2 - 1^2} = \\sqrt{3}$. Scale it to the same hypotenuse $1$.",
        add: { s1: true },
      },
      {
        text: "The sides therefore run in the ratio $1 : \\sqrt{3} : 2$. On the unit circle the hypotenuse must be $1$, so divide every side by $2$. The short leg becomes $\\tfrac12$ and the long leg becomes $\\tfrac{\\sqrt{3}}{2}$.",
        add: { s2: true },
      },
      {
        text: "The short leg always faces the smaller angle. At $30^\\circ$ the opposite side is the short leg, so $\\sin 30^\\circ = \\tfrac12$. The adjacent side is the long leg, so $\\cos 30^\\circ = \\tfrac{\\sqrt{3}}{2}$.",
        add: { s3: true },
      },
      {
        text: "The point is therefore $\\left(\\tfrac{\\sqrt{3}}{2}, \\tfrac12\\right)$. Then $\\tan 30^\\circ = (1/2)/(\\sqrt{3}/2) = 1/\\sqrt{3} = \\tfrac{\\sqrt{3}}{3}$ after rationalizing, $\\csc 30^\\circ = 2$, $\\sec 30^\\circ = 2/\\sqrt{3} = \\tfrac{2\\sqrt{3}}{3}$, and $\\cot 30^\\circ = \\sqrt{3}$.",
        add: { s4: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "What is $\\sin 30^\\circ$?",
        options: ["$\\tfrac12$", "$\\tfrac{\\sqrt{3}}{2}$", "$\\tfrac{\\sqrt{2}}{2}$"],
        answer: 0,
        hint: "At $30^\\circ$ the opposite side is the short leg of the scaled $30^\\circ$-$60^\\circ$-$90^\\circ$ triangle.",
        success: "The short leg is $\\tfrac12$, and that is the height, so $\\sin 30^\\circ = \\tfrac12$.",
      },
      {
        kind: "choice",
        prompt: "The point on the unit circle at $30^\\circ$ is",
        options: [
          "$\\left(\\tfrac{\\sqrt{3}}{2}, \\tfrac12\\right)$",
          "$\\left(\\tfrac12, \\tfrac{\\sqrt{3}}{2}\\right)$",
          "$\\left(\\tfrac{\\sqrt{2}}{2}, \\tfrac{\\sqrt{2}}{2}\\right)$",
        ],
        answer: 0,
        hint: "Cosine is the long adjacent leg. Sine is the short opposite leg.",
        success: "The base is $\\cos 30^\\circ = \\tfrac{\\sqrt{3}}{2}$ and the height is $\\sin 30^\\circ = \\tfrac12$.",
      },
      {
        kind: "choice",
        prompt: "Why divide every side of the $1 : \\sqrt{3} : 2$ triangle by $2$?",
        options: [
          "the unit-circle hypotenuse must equal $1$",
          "the short leg must equal $1$",
          "division by $2$ changes the angles to $15^\\circ$",
        ],
        answer: 0,
        hint: "The radius of the unit circle is $1$, and that radius is the hypotenuse.",
        success: "Dividing by $2$ makes the hypotenuse $1$ and leaves the angles unchanged.",
      },
      {
        kind: "choice",
        prompt: "What is $\\tan 30^\\circ$?",
        options: ["$\\tfrac{\\sqrt{3}}{3}$", "$\\sqrt{3}$", "$\\tfrac12$"],
        answer: 0,
        hint: "$\\tan 30^\\circ = (1/2)/(\\sqrt{3}/2) = 1/\\sqrt{3}$. Rationalize the denominator.",
        success: "$1/\\sqrt{3} \\cdot \\sqrt{3}/\\sqrt{3} = \\sqrt{3}/3$.",
      },
    ],
  },
  {
    id: "swap-60",
    title: "Why $60^\\circ$ uses the same two side lengths as $30^\\circ$",
    mode: "swap60",
    params: [kParam(PAIR3060, 0)],
    baseReveal: { arc: true, readout: true, coords: true, legs: true, allSix: true },
    beats: [
      {
        text: "At $60^\\circ$ the same scaled $30^\\circ$-$60^\\circ$-$90^\\circ$ triangle is placed with the $60^\\circ$ angle at the origin. The short leg now faces the $x$-axis, so it is adjacent, and the long leg is vertical, so it is opposite.",
        to: { k: 0 },
        ms: 1000,
      },
      {
        text: "The coordinates therefore swap. At $60^\\circ$ the point is $\\left(\\tfrac12, \\tfrac{\\sqrt{3}}{2}\\right)$: cosine is the short length $\\tfrac12$ and sine is the long length $\\tfrac{\\sqrt{3}}{2}$.",
        to: { k: 1 },
        ms: 1600,
      },
      {
        text: "The four ratios follow. $\\tan 60^\\circ = (\\sqrt{3}/2)/(1/2) = \\sqrt{3}$, $\\sec 60^\\circ = 1/(1/2) = 2$, $\\csc 60^\\circ = 2/\\sqrt{3} = \\tfrac{2\\sqrt{3}}{3}$, and $\\cot 60^\\circ = 1/\\sqrt{3} = \\tfrac{\\sqrt{3}}{3}$.",
      },
      {
        text: "The short leg always faces the smaller angle. That single rule is why $30^\\circ$ and $60^\\circ$ reuse the same two lengths with the roles of base and height traded.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "What is $\\cos 60^\\circ$?",
        options: ["$\\tfrac12$", "$\\tfrac{\\sqrt{3}}{2}$", "$\\tfrac{\\sqrt{2}}{2}$"],
        answer: 0,
        hint: "At $60^\\circ$ the adjacent leg is the short one.",
        success: "The short adjacent leg is $\\tfrac12$, so $\\cos 60^\\circ = \\tfrac12$.",
      },
      {
        kind: "choice",
        prompt: "Compared with $30^\\circ$, the point at $60^\\circ$ has",
        options: [
          "the same two lengths, swapped",
          "two new lengths that do not appear at $30^\\circ$",
          "equal coordinates",
        ],
        answer: 0,
        hint: "The short and long legs of the same triangle trade places when the angle at the origin changes from $30^\\circ$ to $60^\\circ$.",
        success: "The values $\\tfrac12$ and $\\tfrac{\\sqrt{3}}{2}$ swap from cosine to sine.",
      },
      {
        kind: "choice",
        prompt: "Why do the coordinates at $30^\\circ$ and $60^\\circ$ swap, giving $\\left(\\tfrac{\\sqrt{3}}{2}, \\tfrac12\\right)$ and $\\left(\\tfrac12, \\tfrac{\\sqrt{3}}{2}\\right)$?",
        options: [
          "the short leg always faces the smaller angle, so the roles of base and height trade",
          "sine and cosine are always equal",
          "the radius changes between them",
          "the angles are coterminal",
        ],
        answer: 0,
        hint: "The $30^\\circ$ and $60^\\circ$ triangles are the same shape with the acute angles swapped at the origin.",
        success: "The short leg $\\tfrac12$ is the height at $30^\\circ$ and the base at $60^\\circ$.",
      },
    ],
  },
  {
    id: "family-30",
    title: "The $30^\\circ$ family around the circle",
    mode: "fam30",
    params: [kParam(FAM30, 0)],
    baseReveal: { arc: true, readout: true, coords: true, legs: true, allSix: true },
    beats: [
      {
        text: "A **reference angle** is the acute angle from the terminal side to the nearest $x$-axis. Every angle whose reference angle is $30^\\circ$ reuses the lengths $\\tfrac{\\sqrt{3}}{2}$ and $\\tfrac12$, and the quadrant sets the signs.",
        to: { k: 0 },
        ms: 900,
      },
      {
        text: "At $150^\\circ$ the reference angle is $180^\\circ - 150^\\circ = 30^\\circ$. Quadrant II makes cosine negative and sine positive, so the point is $\\left(-\\tfrac{\\sqrt{3}}{2}, \\tfrac12\\right)$.",
        to: { k: 1 },
        ms: 1600,
      },
      {
        text: "At $210^\\circ$ the reference angle is $210^\\circ - 180^\\circ = 30^\\circ$. Quadrant III makes both signs negative, so the point is $\\left(-\\tfrac{\\sqrt{3}}{2}, -\\tfrac12\\right)$.",
        to: { k: 2 },
        ms: 1600,
      },
      {
        text: "At $330^\\circ$ the reference angle is $360^\\circ - 330^\\circ = 30^\\circ$. Quadrant IV makes cosine positive and sine negative, so the point is $\\left(\\tfrac{\\sqrt{3}}{2}, -\\tfrac12\\right)$. Then $\\tan 330^\\circ = -\\tfrac{\\sqrt{3}}{3}$.",
        to: { k: 3 },
        ms: 1600,
      },
    ],
    practice: "Move the terminal side to $210^\\circ$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Place the terminal side at $210^\\circ$.",
        hint: "That is $30^\\circ$ past the negative $x$-axis, in Quadrant III.",
        success: "The point is $\\left(-\\tfrac{\\sqrt{3}}{2}, -\\tfrac12\\right)$.",
        check: (value) => Math.round(value) === 2,
      },
      {
        kind: "choice",
        prompt: "The point on the unit circle at $150^\\circ$ is",
        options: [
          "$\\left(-\\tfrac{\\sqrt{3}}{2}, \\tfrac12\\right)$",
          "$\\left(-\\tfrac12, \\tfrac{\\sqrt{3}}{2}\\right)$",
          "$\\left(\\tfrac{\\sqrt{3}}{2}, \\tfrac12\\right)$",
        ],
        answer: 0,
        hint: "The reference angle is $30^\\circ$, and Quadrant II makes only cosine negative.",
        success: "Same lengths as $30^\\circ$, with a minus on the $x$-coordinate.",
      },
      {
        kind: "choice",
        prompt: "The reference angle of $210^\\circ$ is",
        options: ["$30^\\circ$", "$60^\\circ$", "$150^\\circ$"],
        answer: 0,
        hint: "Measure the acute angle from the terminal side back to the nearest $x$-axis.",
        success: "$210^\\circ - 180^\\circ = 30^\\circ$, so the lengths match $30^\\circ$.",
      },
    ],
  },
  {
    id: "family-60",
    title: "The $60^\\circ$ family around the circle",
    mode: "fam60",
    params: [kParam(FAM60, 0)],
    baseReveal: { arc: true, readout: true, coords: true, legs: true, allSix: true },
    beats: [
      {
        text: "The $60^\\circ$ family reuses the lengths $\\tfrac12$ and $\\tfrac{\\sqrt{3}}{2}$. At $60^\\circ$ itself the point is $\\left(\\tfrac12, \\tfrac{\\sqrt{3}}{2}\\right)$, already found by swapping the $30^\\circ$ legs.",
        to: { k: 0 },
        ms: 900,
      },
      {
        text: "At $120^\\circ$ the reference angle is $180^\\circ - 120^\\circ = 60^\\circ$. Quadrant II makes cosine negative and sine positive, so the point is $\\left(-\\tfrac12, \\tfrac{\\sqrt{3}}{2}\\right)$.",
        to: { k: 1 },
        ms: 1600,
      },
      {
        text: "At $240^\\circ$ the reference angle is $240^\\circ - 180^\\circ = 60^\\circ$. Quadrant III makes both signs negative, so the point is $\\left(-\\tfrac12, -\\tfrac{\\sqrt{3}}{2}\\right)$. Then $\\tan 240^\\circ = \\sqrt{3}$.",
        to: { k: 2 },
        ms: 1600,
      },
      {
        text: "At $300^\\circ$ the reference angle is $360^\\circ - 300^\\circ = 60^\\circ$. Quadrant IV makes cosine positive and sine negative, so the point is $\\left(\\tfrac12, -\\tfrac{\\sqrt{3}}{2}\\right)$. Make sure to find the reference-angle lengths first, then attach the quadrant signs.",
        to: { k: 3 },
        ms: 1600,
      },
    ],
    practice: "Move the terminal side to $120^\\circ$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Place the terminal side at $120^\\circ$.",
        hint: "That is $60^\\circ$ past the positive $y$-axis, in Quadrant II.",
        success: "The point is $\\left(-\\tfrac12, \\tfrac{\\sqrt{3}}{2}\\right)$.",
        check: (value) => Math.round(value) === 1,
      },
      {
        kind: "choice",
        prompt: "The point on the unit circle at $120^\\circ$ is",
        options: [
          "$\\left(-\\tfrac12, \\tfrac{\\sqrt{3}}{2}\\right)$",
          "$\\left(-\\tfrac{\\sqrt{3}}{2}, \\tfrac12\\right)$",
          "$\\left(\\tfrac12, \\tfrac{\\sqrt{3}}{2}\\right)$",
        ],
        answer: 0,
        hint: "The reference angle is $60^\\circ$, so the lengths match $60^\\circ$, and Quadrant II flips the sign of cosine.",
        success: "Same lengths as $60^\\circ$, with a minus on the $x$-coordinate.",
      },
      {
        kind: "choice",
        prompt: "What is $\\sec 240^\\circ$?",
        options: ["$-2$", "$2$", "undefined"],
        answer: 0,
        hint: "$\\sec\\theta = 1/\\cos\\theta$. At $240^\\circ$, cosine is $-1/2$.",
        success: "$1/(-1/2) = -2$. Cosine is not zero, so secant is defined.",
      },
    ],
  },
];
