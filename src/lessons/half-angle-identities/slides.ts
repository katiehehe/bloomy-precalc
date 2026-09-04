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
    title: "How to solve for a half-angle sine",
    mode: "derive",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "A **half-angle identity** solves a double-angle formula backward for $\\sin(\\theta/2)$ or $\\cos(\\theta/2)$. Start from $\\cos 2\\alpha = 1 - 2\\sin^2\\alpha$.",
      },
      {
        text: "Set the inside angle to a half by letting $\\alpha = \\dfrac{\\theta}{2}$. Then $2\\alpha = \\theta$, so the left side becomes $\\cos\\theta$ while the right side keeps the half-angle.",
        add: { s1: true },
      },
      {
        text: "Now treat this as an equation and isolate the sine term. Adding $2\\sin^2\\tfrac{\\theta}{2}$ to both sides and subtracting $\\cos\\theta$ gives $2\\sin^2\\tfrac{\\theta}{2} = 1 - \\cos\\theta$.",
        add: { s2: true },
      },
      {
        text: "Divide both sides by $2$ to leave $\\sin^2\\tfrac{\\theta}{2}$ alone.",
        add: { s3: true },
      },
      {
        text: "Finally take the square root of both sides. The root has a $\\pm$ because squaring erases the original sign: $$\\sin\\tfrac{\\theta}{2} = \\pm\\sqrt{\\dfrac{1 - \\cos\\theta}{2}}$$",
        add: { s4: true },
      },
    ],
    practice: "",
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
    title: "How to find a half-angle cosine and its sign",
    mode: "cosine",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "For cosine, start from the other form $\\cos 2\\alpha = 2\\cos^2\\alpha - 1$ and set $\\alpha = \\dfrac{\\theta}{2}$ again.",
        add: { s1: true },
      },
      {
        text: "Isolate the cosine-squared term by adding $1$ to both sides, giving $2\\cos^2\\tfrac{\\theta}{2} = 1 + \\cos\\theta$. The numerator is now a **plus**, unlike the minus in the sine version.",
        add: { s2: true },
      },
      {
        text: "Divide by $2$ and take the square root: $$\\cos\\tfrac{\\theta}{2} = \\pm\\sqrt{\\dfrac{1 + \\cos\\theta}{2}}$$ The only difference from the sine formula is the sign on top, since sine keeps a minus while cosine keeps a plus.",
        add: { s3: true },
      },
      {
        text: "The $\\pm$ means you choose one sign, not both. The correct sign matches the quadrant of the **half** angle $\\tfrac{\\theta}{2}$, not the quadrant of $\\theta$. Make sure to halve first, then check the quadrant.",
      },
    ],
    practice: "",
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
    title: "How to find $\\sin 22.5^\\circ$ exactly",
    mode: "worked",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Half-angle formulas reach angles the sum formulas cannot, such as $22.5^\\circ$. Since $22.5^\\circ$ is half of $45^\\circ$, it is a half-angle problem.",
      },
      {
        text: "Apply the sine half-angle formula with $\\theta = 45^\\circ$. Because $22.5^\\circ$ lies in quadrant I where sine is positive, keep the $+$ root.",
        add: { s1: true },
      },
      {
        text: "Substitute the known value $\\cos 45^\\circ = \\dfrac{\\sqrt2}{2}$.",
        add: { s2: true },
      },
      {
        text: "Combine the numerator into one fraction, writing $1 - \\dfrac{\\sqrt2}{2}$ as $\\dfrac{2 - \\sqrt2}{2}$.",
        add: { s3: true },
      },
      {
        text: "Dividing that by the outer $2$ multiplies the denominator to $4$, giving $\\sqrt{\\dfrac{2 - \\sqrt2}{4}}$.",
        add: { s4: true },
      },
      {
        text: "The denominator is a perfect square with $\\sqrt4 = 2$, so it leaves the radical: $$\\sin 22.5^\\circ = \\dfrac{\\sqrt{2 - \\sqrt2}}{2} \\approx 0.3827$$",
        add: { s5: true },
      },
    ],
    practice: "",
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
    title: "Your turn: watch a half angle track $\\theta$",
    mode: "practice",
    params: [thetaParam],
    baseReveal: {},
    beats: [
      {
        text: "This figure shows the half-angle relationship in motion, with the long ray at $\\theta$ and the shorter ray at its half $\\tfrac{\\theta}{2}$. Below the rays, the direct sine of the half angle and the half-angle formula are computed side by side.",
        add: { s1: true, s2: true, s3: true },
      },
      {
        text: "The two results agree at every angle, so the formula is an identity rather than a coincidence. The angle currently rests at $\\theta = 140^\\circ$.",
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
