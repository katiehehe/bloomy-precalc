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
    title: "Double angle is angle plus itself",
    mode: "sin2",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "A **double angle** like $2\\theta$ is not a new mystery. It is just $\\theta$ added to itself, so every sum formula you learned already applies.",
      },
      {
        text: "Rewrite $\\sin 2\\theta$ as $\\sin(\\theta + \\theta)$. Now it is a sine of a sum, which we know how to expand.",
        add: { s1: true },
      },
      {
        text: "Apply the sine sum formula with both angles equal to $\\theta$: $\\sin\\theta\\cos\\theta + \\cos\\theta\\sin\\theta$.",
        add: { s2: true },
      },
      {
        text: "Those two pieces are the same product written twice, so they add to one doubled term. That gives the identity $\\sin 2\\theta = 2\\sin\\theta\\cos\\theta$. The $2$ is not from doubling the angle, it is from adding two equal terms.",
        add: { s3: true },
      },
    ],
    practice: "Remember: rewrite the double angle as a sum, expand, then collect like terms.",
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
    title: "The three faces of cos 2 theta",
    mode: "cos2",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Do the same to $\\cos 2\\theta = \\cos(\\theta + \\theta)$. The cosine sum formula gives $\\cos\\theta\\cos\\theta - \\sin\\theta\\sin\\theta$, which collects to $\\cos^2\\theta - \\sin^2\\theta$. That is the first face.",
        add: { s1: true, s2: true },
      },
      {
        text: "Here is the trick that makes the other two faces. The Pythagorean identity says $\\sin^2\\theta = 1 - \\cos^2\\theta$. Swap that into the expression.",
        add: { s3: true },
      },
      {
        text: "Distribute the minus and combine: $\\cos^2\\theta - 1 + \\cos^2\\theta = 2\\cos^2\\theta - 1$. That is the second face, written with cosine only.",
        add: { s4: true },
      },
      {
        text: "Go back and swap the other way, $\\cos^2\\theta = 1 - \\sin^2\\theta$, and you land on $1 - 2\\sin^2\\theta$, the third face, written with sine only. Same identity, three useful disguises.",
        add: { s5: true },
      },
    ],
    practice: "All three are equal: $\\cos^2\\theta - \\sin^2\\theta = 2\\cos^2\\theta - 1 = 1 - 2\\sin^2\\theta$.",
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
    title: "Check it, then use it",
    mode: "given",
    params: [thetaParam(20)],
    baseReveal: {},
    beats: [
      {
        text: "An identity has to hold for **every** angle, not just the pretty ones. Let us test $\\sin 2\\theta = 2\\sin\\theta\\cos\\theta$ against a decimal check as the angle changes.",
        to: { theta: 30 },
        ms: 1400,
      },
      {
        text: "Left side: feed the doubled angle straight into sine.",
        add: { s1: true },
      },
      {
        text: "Right side: compute $2\\sin\\theta\\cos\\theta$ with the single angle. The two numbers land on top of each other.",
        add: { s2: true },
      },
      {
        text: "They agree at every angle, which is what makes it an identity rather than an equation to solve. Now use it: when you know $\\sin\\theta$ and $\\cos\\theta$, you get $\\sin 2\\theta$ instantly.",
        add: { s3: true },
      },
    ],
    practice: "Drag $\\theta$ and watch both sides stay equal, then answer.",
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
