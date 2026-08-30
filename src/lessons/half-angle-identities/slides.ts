import type { ParamSpec, Slide } from "../types";

const thetaParam: ParamSpec = {
  key: "theta",
  label: "Angle \u03b8",
  min: 20,
  max: 160,
  start: 140,
  step: 10,
  format: (v) => `\u03b8 = ${Math.round(v)}\u00b0`,
};

export const slides: Slide[] = [
  {
    id: "derive",
    title: "Solving for the half angle",
    mode: "derive",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Half-angle formulas are not memorized from nowhere. They are the double-angle formulas solved backwards. Start from a face of $\\cos 2\\alpha$ you already know: $\\cos 2\\alpha = 1 - 2\\sin^2\\alpha$.",
      },
      {
        text: "Let the inside angle be a half: set $\\alpha = \\dfrac{\\theta}{2}$. Then $2\\alpha = \\theta$, so the left side becomes $\\cos\\theta$ and the right side keeps the half-angle.",
        add: { s1: true },
      },
      {
        text: "Now treat it as an equation and isolate the sine term. Add $2\\sin^2\\tfrac{\\theta}{2}$ to both sides and subtract $\\cos\\theta$: $2\\sin^2\\tfrac{\\theta}{2} = 1 - \\cos\\theta$.",
        add: { s2: true },
      },
      {
        text: "Divide both sides by $2$ to get $\\sin^2\\tfrac{\\theta}{2}$ alone.",
        add: { s3: true },
      },
      {
        text: "Finally take the square root of both sides. The root brings a $\\pm$, because squaring hides the sign: $$\\sin\\tfrac{\\theta}{2} = \\pm\\sqrt{\\dfrac{1 - \\cos\\theta}{2}}$$",
        add: { s4: true },
      },
    ],
    practice: "The whole formula is a double-angle identity solved for the half angle.",
    questions: [
      {
        kind: "choice",
        prompt: "The half-angle formula for sine is $\\sin\\dfrac{\\theta}{2} =$",
        options: [
          "$\\pm\\sqrt{\\dfrac{1 - \\cos\\theta}{2}}$",
          "$\\pm\\sqrt{\\dfrac{1 + \\cos\\theta}{2}}$",
          "$\\dfrac{1 - \\cos\\theta}{2}$",
          "$2\\sin\\theta\\cos\\theta$",
        ],
        answer: 0,
        hint: "It came from $\\cos 2\\alpha = 1 - 2\\sin^2\\alpha$, so the numerator is $1 - \\cos\\theta$.",
        success: "$\\sin\\dfrac{\\theta}{2} = \\pm\\sqrt{\\dfrac{1 - \\cos\\theta}{2}}$.",
      },
      {
        kind: "choice",
        prompt: "Which identity did we solve to build it?",
        options: [
          "$\\cos 2\\alpha = 1 - 2\\sin^2\\alpha$",
          "$\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha$",
          "$\\cos 2\\alpha = 2\\cos^2\\alpha - 1$",
          "$\\sin^2\\alpha + \\cos^2\\alpha = 1$",
        ],
        answer: 0,
        hint: "We needed the form that already had $\\sin^2$ in it.",
        success: "Solving $\\cos 2\\alpha = 1 - 2\\sin^2\\alpha$ for the sine term gives the half-angle formula.",
      },
    ],
  },
  {
    id: "cosine",
    title: "Cosine half angle and the sign",
    mode: "cosine",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "For cosine, start from the other face, $\\cos 2\\alpha = 2\\cos^2\\alpha - 1$, and set $\\alpha = \\dfrac{\\theta}{2}$ again.",
        add: { s1: true },
      },
      {
        text: "Isolate the cosine-squared term: add $1$ to both sides to get $2\\cos^2\\tfrac{\\theta}{2} = 1 + \\cos\\theta$. Notice the numerator is now a **plus**.",
        add: { s2: true },
      },
      {
        text: "Divide by $2$ and take the square root: $$\\cos\\tfrac{\\theta}{2} = \\pm\\sqrt{\\dfrac{1 + \\cos\\theta}{2}}$$ Sine had a minus on top and cosine has a plus. That is the only difference.",
        add: { s3: true },
      },
      {
        text: "About that $\\pm$: you pick one sign, not both. The correct sign is whatever matches the quadrant of the **half** angle $\\tfrac{\\theta}{2}$, not of $\\theta$. Always halve first, then check the quadrant.",
      },
    ],
    practice: "Make sure to choose the sign from the quadrant of the half angle, not the original angle.",
    questions: [
      {
        kind: "choice",
        prompt: "The half-angle formula for cosine is $\\cos\\dfrac{\\theta}{2} =$",
        options: [
          "$\\pm\\sqrt{\\dfrac{1 + \\cos\\theta}{2}}$",
          "$\\pm\\sqrt{\\dfrac{1 - \\cos\\theta}{2}}$",
          "$\\dfrac{1 + \\cos\\theta}{2}$",
          "$1 - 2\\sin^2\\theta$",
        ],
        answer: 0,
        hint: "Cosine keeps a plus in the numerator.",
        success: "$\\cos\\dfrac{\\theta}{2} = \\pm\\sqrt{\\dfrac{1 + \\cos\\theta}{2}}$.",
      },
      {
        kind: "choice",
        prompt: "The $\\pm$ sign is decided by the quadrant of:",
        options: ["$\\dfrac{\\theta}{2}$", "$\\theta$", "$2\\theta$", "it is always $+$"],
        answer: 0,
        hint: "You are finding a function of the half angle, so its quadrant is what matters.",
        success: "Choose the sign from the quadrant of $\\dfrac{\\theta}{2}$.",
      },
    ],
  },
  {
    id: "worked",
    title: "Exact value of sin 22.5 degrees",
    mode: "worked",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Half-angle formulas unlock angles the sum formulas cannot, like $22.5^\\circ$. It is half of $45^\\circ$, so it is a half-angle problem.",
      },
      {
        text: "Apply the sine half-angle formula with $\\theta = 45^\\circ$. Since $22.5^\\circ$ sits in quadrant I, sine is positive there, so we keep the $+$ root.",
        add: { s1: true },
      },
      {
        text: "Substitute the value you know: $\\cos 45^\\circ = \\dfrac{\\sqrt2}{2}$.",
        add: { s2: true },
      },
      {
        text: "Clean up the top. Write $1 - \\dfrac{\\sqrt2}{2}$ as $\\dfrac{2 - \\sqrt2}{2}$ so the numerator is a single fraction.",
        add: { s3: true },
      },
      {
        text: "Dividing that by the outer $2$ multiplies the denominator to $4$: $\\sqrt{\\dfrac{2 - \\sqrt2}{4}}$.",
        add: { s4: true },
      },
      {
        text: "The bottom is a perfect square, $\\sqrt4 = 2$, so it comes out of the root: $$\\sin 22.5^\\circ = \\dfrac{\\sqrt{2 - \\sqrt2}}{2} \\approx 0.3827$$",
        add: { s5: true },
      },
    ],
    practice: "Halve a known angle, pick the sign from its quadrant, then simplify the nested roots.",
    questions: [
      {
        kind: "choice",
        prompt: "$\\sin 22.5^\\circ = \\sqrt{\\dfrac{1 - \\cos 45^\\circ}{2}}$ simplifies to:",
        options: [
          "$\\dfrac{\\sqrt{2 - \\sqrt2}}{2}$",
          "$\\dfrac{\\sqrt{2 + \\sqrt2}}{2}$",
          "$\\dfrac{\\sqrt2 - 1}{2}$",
          "$\\dfrac{\\sqrt3}{2}$",
        ],
        answer: 0,
        hint: "Substitute $\\cos 45^\\circ = \\tfrac{\\sqrt2}{2}$ and simplify the nested fraction.",
        success: "$\\sin 22.5^\\circ = \\dfrac{\\sqrt{2 - \\sqrt2}}{2}$.",
      },
      {
        kind: "choice",
        prompt: "Why is the sign a $+$ for $\\sin 22.5^\\circ$?",
        options: [
          "$22.5^\\circ$ is in quadrant I, where sine is positive",
          "$45^\\circ$ is acute",
          "sine is positive for every angle",
          "the square root forces a plus",
        ],
        answer: 0,
        hint: "Check the quadrant of the half angle itself.",
        success: "$22.5^\\circ$ lands in quadrant I, so its sine is positive.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn: watch the half angle track theta",
    mode: "practice",
    params: [thetaParam],
    baseReveal: {},
    beats: [
      {
        text: "Time to see the half-angle relationship move. The long ray is $\\theta$ and the shorter ray is its half, $\\tfrac{\\theta}{2}$. Below, the direct sine of the half angle and the half-angle formula are computed side by side.",
        add: { s1: true, s2: true, s3: true },
      },
      {
        text: "They land on the same number at every angle, which is exactly what makes the formula an identity rather than a lucky coincidence. The angle rests at $\\theta = 140^\\circ$ for now.",
      },
    ],
    practice: "Drag $\\theta$ until the half angle $\\tfrac{\\theta}{2}$ reads $30^\\circ$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Drag $\\theta$ so the half angle $\\tfrac{\\theta}{2}$ lands on $30^\\circ$.",
        hint: "If $\\tfrac{\\theta}{2} = 30^\\circ$, then $\\theta = 60^\\circ$.",
        success: "$\\theta = 60^\\circ$ gives $\\tfrac{\\theta}{2} = 30^\\circ$, and both the direct sine and the half-angle formula land on $\\tfrac12$.",
        check: (value) => Math.abs(value - 60) < 5,
      },
      {
        kind: "choice",
        prompt: "At $\\theta = 60^\\circ$ the direct sine and the formula both give $\\tfrac12$. What does that agreement show?",
        options: [
          "the half-angle formula holds for every $\\theta$, so it is an identity",
          "$60^\\circ$ is the only angle where it works",
          "the formula only works for special angles",
          "sine and cosine are equal at $30^\\circ$",
        ],
        answer: 0,
        hint: "The two sides matched at $140^\\circ$ too, and at every angle in between.",
        success: "Matching at every angle is what makes $\\sin\\tfrac{\\theta}{2} = \\sqrt{\\tfrac{1 - \\cos\\theta}{2}}$ an identity.",
      },
    ],
  },
];
