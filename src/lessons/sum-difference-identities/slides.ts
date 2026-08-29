import type { Slide } from "../types";

export const slides: Slide[] = [
  {
    id: "signs",
    title: "Sum formulas: watch the sign",
    mode: "signs",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Here is the trap first: $\\cos(A+B)$ is **not** $\\cos A + \\cos B$. Cosine does not split across a sum. There is a real formula, and its sign is the surprising part.",
      },
      {
        text: "Expanding, $\\cos(A+B) = \\cos A\\cos B - \\sin A\\sin B$. It pairs cosine with cosine and sine with sine, and the operation sign **flips** to a minus. That flip is the thing students forget, so say it out loud: cosine of a sum, minus in the middle.",
        add: { s1: true },
      },
      {
        text: "Sine behaves differently. $\\sin(A+B) = \\sin A\\cos B + \\cos A\\sin B$. It mixes sine with cosine, and it **keeps** the sign: a sum stays a plus.",
        add: { s2: true, s3: true },
      },
      {
        text: "For the difference versions, just flip every middle sign: $\\cos(A-B) = \\cos A\\cos B + \\sin A\\sin B$ and $\\sin(A-B) = \\sin A\\cos B - \\cos A\\sin B$. Cosine flips to plus, sine flips to minus.",
      },
    ],
    practice: "Match the pattern: cosine pairs like with like and flips the sign. Sine mixes and keeps it.",
    questions: [
      {
        kind: "choice",
        prompt: "Expand $\\cos(A+B)$.",
        options: [
          "$\\cos A\\cos B - \\sin A\\sin B$",
          "$\\cos A\\cos B + \\sin A\\sin B$",
          "$\\sin A\\cos B + \\cos A\\sin B$",
          "$\\cos A + \\cos B$",
        ],
        answer: 0,
        hint: "Cosine of a sum pairs cosine-cosine and sine-sine, and the middle sign flips to minus.",
        success: "$\\cos(A+B) = \\cos A\\cos B - \\sin A\\sin B$.",
      },
      {
        kind: "choice",
        prompt: "Expand $\\sin(A-B)$.",
        options: [
          "$\\sin A\\cos B - \\cos A\\sin B$",
          "$\\sin A\\cos B + \\cos A\\sin B$",
          "$\\cos A\\cos B + \\sin A\\sin B$",
          "$\\sin A\\sin B - \\cos A\\cos B$",
        ],
        answer: 0,
        hint: "Sine mixes sine-cosine and cosine-sine, and it keeps the operation sign: a difference stays a minus.",
        success: "$\\sin(A-B) = \\sin A\\cos B - \\cos A\\sin B$.",
      },
    ],
  },
  {
    id: "cos75",
    title: "Exact value of cos 75 degrees",
    mode: "cos75",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "The formulas turn a strange angle into two friendly ones. Your calculator gives $\\cos 75^\\circ \\approx 0.2588$, but we can get the exact value by hand.",
      },
      {
        text: "The move: write $75^\\circ$ as a sum of angles you know from the unit circle, $75 = 45 + 30$.",
        add: { s1: true },
      },
      {
        text: "Apply the cosine sum formula. Because it is cosine of a sum, the middle sign is a minus.",
        add: { s2: true },
      },
      {
        text: "Now substitute the exact values: $\\cos45^\\circ = \\sin45^\\circ = \\dfrac{\\sqrt2}{2}$, $\\cos30^\\circ = \\dfrac{\\sqrt3}{2}$, and $\\sin30^\\circ = \\dfrac12$.",
        add: { s3: true },
      },
      {
        text: "Multiply each product across the top: $\\dfrac{\\sqrt2}{2}\\cdot\\dfrac{\\sqrt3}{2} = \\dfrac{\\sqrt6}{4}$ and $\\dfrac{\\sqrt2}{2}\\cdot\\dfrac12 = \\dfrac{\\sqrt2}{4}$.",
        add: { s4: true },
      },
      {
        text: "They already share the denominator $4$, so combine over one bar: $\\cos 75^\\circ = \\dfrac{\\sqrt6 - \\sqrt2}{4} \\approx 0.2588$. Exact, and it matches the calculator.",
        add: { s5: true },
      },
    ],
    practice: "Split the angle into two known angles, expand, then substitute exact values.",
    questions: [
      {
        kind: "choice",
        prompt: "$\\cos 75^\\circ = \\cos45^\\circ\\cos30^\\circ - \\sin45^\\circ\\sin30^\\circ$ works out to:",
        options: [
          "$\\dfrac{\\sqrt6 - \\sqrt2}{4}$",
          "$\\dfrac{\\sqrt6 + \\sqrt2}{4}$",
          "$\\dfrac{\\sqrt2 - \\sqrt6}{4}$",
          "$\\dfrac{\\sqrt3 - 1}{4}$",
        ],
        answer: 0,
        hint: "Each product is $\\tfrac{\\sqrt6}{4}$ and $\\tfrac{\\sqrt2}{4}$. Subtract them over the shared denominator.",
        success: "$\\cos 75^\\circ = \\dfrac{\\sqrt6 - \\sqrt2}{4}$.",
      },
      {
        kind: "choice",
        prompt: "To find $\\sin 75^\\circ$ the same way, expand $\\sin(45^\\circ + 30^\\circ)$ as:",
        options: [
          "$\\sin45^\\circ\\cos30^\\circ + \\cos45^\\circ\\sin30^\\circ$",
          "$\\sin45^\\circ\\cos30^\\circ - \\cos45^\\circ\\sin30^\\circ$",
          "$\\cos45^\\circ\\cos30^\\circ - \\sin45^\\circ\\sin30^\\circ$",
          "$\\sin45^\\circ\\sin30^\\circ + \\cos45^\\circ\\cos30^\\circ$",
        ],
        answer: 0,
        hint: "Sine mixes sine-cosine and cosine-sine, and a sum keeps the plus.",
        success: "$\\sin 75^\\circ = \\sin45^\\circ\\cos30^\\circ + \\cos45^\\circ\\sin30^\\circ = \\dfrac{\\sqrt6 + \\sqrt2}{4}$.",
      },
    ],
  },
  {
    id: "cofunction",
    title: "Proving a cofunction identity",
    mode: "cofunction",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "The same formulas prove the identities you have been using on faith. Take the cofunction rule $\\cos\\!\\left(\\dfrac{\\pi}{2}-\\theta\\right) = \\sin\\theta$, the fact that cosine of the complement is sine.",
      },
      {
        text: "Expand with the cosine difference formula (a difference, so the middle sign is a plus).",
        add: { s1: true },
      },
      {
        text: "Now use two values you know cold: $\\cos\\dfrac{\\pi}{2} = 0$ and $\\sin\\dfrac{\\pi}{2} = 1$. Substitute them in.",
        add: { s2: true },
      },
      {
        text: "The first term is multiplied by $0$, so it vanishes. The second is multiplied by $1$, so it stays. What is left is exactly $\\sin\\theta$. The identity is proved, not just asserted.",
        add: { s3: true },
      },
    ],
    practice: "Expand with a sum or difference formula, then substitute the values at the quarter turn.",
    questions: [
      {
        kind: "choice",
        prompt: "By the same method, $\\sin\\!\\left(\\dfrac{\\pi}{2}-\\theta\\right) =$",
        options: ["$\\cos\\theta$", "$\\sin\\theta$", "$-\\cos\\theta$", "$\\csc\\theta$"],
        answer: 0,
        hint: "Sine of the complement is cosine. Expanding $\\sin(\\tfrac{\\pi}{2}-\\theta)$ leaves only the cosine term.",
        success: "$\\sin\\!\\left(\\dfrac{\\pi}{2}-\\theta\\right) = \\cos\\theta$.",
      },
      {
        kind: "choice",
        prompt: "In the proof, why does the term $\\cos\\dfrac{\\pi}{2}\\cos\\theta$ disappear?",
        options: [
          "$\\cos\\dfrac{\\pi}{2} = 0$, so the whole term is $0$",
          "$\\cos\\theta = 0$",
          "$\\sin\\dfrac{\\pi}{2} = 0$",
          "it does not disappear",
        ],
        answer: 0,
        hint: "Look at what each factor equals at a quarter turn.",
        success: "$\\cos\\dfrac{\\pi}{2} = 0$, and zero times anything is zero.",
      },
    ],
  },
];
