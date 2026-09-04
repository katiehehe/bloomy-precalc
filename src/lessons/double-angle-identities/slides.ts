import type { ParamSpec, Slide } from "../types";

const thetaParam = (start: number): ParamSpec => ({
  key: "theta",
  label: "Angle \u03b8",
  min: 5,
  max: 85,
  start,
  step: 5,
  format: (v) => `\u03b8 = ${Math.round(v)}\u00b0`,
});

export const slides: Slide[] = [
  {
    id: "sin2",
    title: "A double angle is an angle plus itself",
    mode: "sin2",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "A **double angle** $2\\theta$ is the angle $\\theta$ added to itself. Substituting $A = B = \\theta$ into the sum formulas produces the double-angle identities.",
      },
      {
        text: "Rewrite $\\sin 2\\theta$ as $\\sin(\\theta + \\theta)$, which is now a sine of a sum ready to expand.",
        add: { s1: true },
      },
      {
        text: "Apply the sine sum formula with both angles equal to $\\theta$, giving $\\sin\\theta\\cos\\theta + \\cos\\theta\\sin\\theta$.",
        add: { s2: true },
      },
      {
        text: "Those two products are identical, so they add to a single doubled term: $$\\sin 2\\theta = 2\\sin\\theta\\cos\\theta$$ The factor of $2$ comes from adding two equal terms, not from doubling the angle.",
        add: { s3: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "$\\sin 2\\theta =$",
        options: ["$2\\sin\\theta\\cos\\theta$", "$\\sin^2\\theta - \\cos^2\\theta$", "$2\\sin\\theta$", "$\\sin\\theta\\cos\\theta$"],
        answer: 0,
        hint: "Expand $\\sin(\\theta+\\theta)$ and add the two equal terms.",
        success: "$\\sin 2\\theta = 2\\sin\\theta\\cos\\theta$.",
      },
      {
        kind: "choice",
        prompt: "Where does the $2$ in $2\\sin\\theta\\cos\\theta$ come from?",
        options: [
          "the two identical terms $\\sin\\theta\\cos\\theta$ add together",
          "doubling the angle doubles the answer",
          "the identity $\\sin^2\\theta + \\cos^2\\theta = 1$",
          "it is just memorized, no reason",
        ],
        answer: 0,
        hint: "Look at the expanded line: $\\sin\\theta\\cos\\theta + \\cos\\theta\\sin\\theta$.",
        success: "Two copies of $\\sin\\theta\\cos\\theta$ add to $2\\sin\\theta\\cos\\theta$.",
      },
    ],
  },
  {
    id: "cos2",
    title: "Three forms of $\\cos 2\\theta$",
    mode: "cos2",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "The cosine sum formula gives $\\cos\\theta\\cos\\theta - \\sin\\theta\\sin\\theta$, which collects to the first form $\\cos^2\\theta - \\sin^2\\theta$.",
        add: { s1: true, s2: true },
      },
      {
        text: "The other two forms come from the Pythagorean identity $\\sin^2\\theta = 1 - \\cos^2\\theta$. Substitute that in place of $\\sin^2\\theta$.",
        add: { s3: true },
      },
      {
        text: "Distribute the minus and combine: $\\cos^2\\theta - 1 + \\cos^2\\theta = 2\\cos^2\\theta - 1$. This second form uses cosine only.",
        add: { s4: true },
      },
      {
        text: "Substituting the other way with $\\cos^2\\theta = 1 - \\sin^2\\theta$ produces the third form $1 - 2\\sin^2\\theta$, which uses sine only. All three expressions are equal, giving one identity in three convenient forms.",
        add: { s5: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Which expression is NOT a form of $\\cos 2\\theta$?",
        options: ["$2\\sin\\theta\\cos\\theta$", "$\\cos^2\\theta - \\sin^2\\theta$", "$2\\cos^2\\theta - 1$", "$1 - 2\\sin^2\\theta$"],
        answer: 0,
        hint: "One of these is actually $\\sin 2\\theta$.",
        success: "$2\\sin\\theta\\cos\\theta$ is $\\sin 2\\theta$. The other three are all $\\cos 2\\theta$.",
      },
      {
        kind: "choice",
        prompt: "Starting from $\\cos^2\\theta - \\sin^2\\theta$, replacing $\\sin^2\\theta$ with $1 - \\cos^2\\theta$ gives:",
        options: ["$2\\cos^2\\theta - 1$", "$1 - 2\\cos^2\\theta$", "$2\\sin^2\\theta - 1$", "$\\cos^2\\theta - 1$"],
        answer: 0,
        hint: "You get $\\cos^2\\theta - (1 - \\cos^2\\theta)$. Distribute the minus and add.",
        success: "$\\cos^2\\theta - 1 + \\cos^2\\theta = 2\\cos^2\\theta - 1$.",
      },
    ],
  },
  {
    id: "given",
    title: "How to verify and apply a double-angle identity",
    mode: "given",
    params: [thetaParam(20)],
    baseReveal: {},
    beats: [
      {
        text: "An identity must hold for **every** angle, not only the familiar special ones. Watch $\\sin 2\\theta = 2\\sin\\theta\\cos\\theta$ hold against a decimal check as the angle changes.",
        to: { theta: 30 },
        ms: 1400,
      },
      {
        text: "On the left side, evaluate sine at the doubled angle $2\\theta$ directly.",
        add: { s1: true },
      },
      {
        text: "On the right side, compute $2\\sin\\theta\\cos\\theta$ from the single angle. The two values come out equal.",
        add: { s2: true },
      },
      {
        text: "They agree at every angle, so the equation is an identity rather than a condition that holds only at isolated roots. Once $\\sin\\theta$ and $\\cos\\theta$ are known, the identity gives $\\sin 2\\theta$ in one multiplication.",
        add: { s3: true },
      },
    ],
    practice: "Drag $\\theta$ until $2\\theta$ is a right angle.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Set $\\theta$ so the doubled angle $2\\theta$ is a right angle.",
        hint: "A right angle is $90^\\circ$, and $2\\theta = 90^\\circ$ means $\\theta = 45^\\circ$.",
        success: "$2(45^\\circ) = 90^\\circ$, and $\\sin 90^\\circ = 1 = 2\\sin45^\\circ\\cos45^\\circ$.",
        check: (value) => Math.abs(value - 45) < 3,
      },
      {
        kind: "choice",
        prompt: "If $\\sin\\theta = \\dfrac35$ and $\\cos\\theta = \\dfrac45$, then $\\sin 2\\theta = 2\\sin\\theta\\cos\\theta =$",
        options: ["$\\dfrac{24}{25}$", "$\\dfrac{7}{25}$", "$\\dfrac{12}{25}$", "$\\dfrac{6}{5}$"],
        answer: 0,
        hint: "Multiply $2 \\cdot \\dfrac35 \\cdot \\dfrac45$.",
        success: "$2 \\cdot \\dfrac35 \\cdot \\dfrac45 = \\dfrac{24}{25}$.",
      },
    ],
  },
];
