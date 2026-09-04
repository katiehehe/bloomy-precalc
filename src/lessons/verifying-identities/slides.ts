import type { ParamSpec, Slide } from "../types";

const thetaParam: ParamSpec = {
  key: "theta",
  label: "Angle \u03b8",
  min: 10,
  max: 70,
  start: 20,
  step: 5,
  format: (v) => `\u03b8 = ${Math.round(v)}\u00b0`,
};

export const slides: Slide[] = [
  {
    id: "rules",
    title: "How to verify an identity",
    mode: "rules",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "To **verify** an identity is to prove that two expressions have the same value at every angle, which on the graph means the two plots coincide.",
      },
      {
        text: "You may rewrite the left side, the right side, or both sides separately, until the two expressions become the same. What you must not do is treat the identity like an equation. Adding, subtracting, or cross-multiplying across the equals sign assumes the two sides are already equal, which is circular.",
      },
      {
        text: "Starting with the more complicated side is often less work, because it has more to simplify. Another useful move is to rewrite tangent, secant, and the rest in **sines and cosines**, since the Pythagorean and reciprocal identities are written in those two functions. Neither is required. You can start on either side, or rewrite both sides toward a common expression.",
      },
      {
        text: "Then look for a Pythagorean identity ($\\sin^2 + \\cos^2 = 1$), a common denominator, or a fraction you can split. Make sure every line rewrites an expression using a known identity, and that you never operate across the original equals sign as if solving.",
      },
      {
        text: "Keep all three Pythagorean forms handy. Dividing $\\sin^2\\theta + \\cos^2\\theta = 1$ by $\\cos^2\\theta$ gives: $$1 + \\tan^2\\theta = \\sec^2\\theta$$ and dividing by $\\sin^2\\theta$ gives $1 + \\cot^2\\theta = \\csc^2\\theta$. A verification often needs the tangent or cotangent version, not just the first one.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "When verifying an identity, which approach is valid?",
        options: [
          "rewrite either side, or both sides separately, until they become the same expression",
          "move terms across the equals sign as if solving",
          "plug in a single angle and stop",
          "add the same term to both sides",
        ],
        answer: 0,
        hint: "You may rewrite each side on its own. You may not operate across the equals sign as if the identity were already known.",
        success: "Either side is allowed, and so is rewriting both sides separately until they match. Treating the identity like an equation is not.",
      },
      {
        kind: "choice",
        prompt: "A useful first rewrite is often to:",
        options: [
          "write tangent, secant, and the rest in terms of sine and cosine",
          "take a derivative",
          "graph both sides and judge by eye",
          "add the same term to both sides",
        ],
        answer: 0,
        hint: "Pythagorean and reciprocal identities are written in sine and cosine.",
        success: "Writing everything in sine and cosine often exposes a Pythagorean identity or a common denominator. It is useful, not required.",
      },
    ],
  },
  {
    id: "worked",
    title: "How to verify an identity, step by step",
    mode: "worked",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Prove this identity: $$\\sec\\theta - \\cos\\theta = \\sin\\theta\\tan\\theta$$ The right side looks simpler to build up, so start there and transform it into the left.",
      },
      {
        text: "First, convert to sine and cosine by rewriting $\\tan\\theta$ as $\\dfrac{\\sin\\theta}{\\cos\\theta}$.",
        add: { s1: true },
      },
      {
        text: "Multiply the two factors, since $\\sin\\theta \\cdot \\dfrac{\\sin\\theta}{\\cos\\theta} = \\dfrac{\\sin^2\\theta}{\\cos\\theta}$.",
        add: { s2: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "The first move rewrites $\\tan\\theta$ as:",
        options: ["$\\dfrac{\\sin\\theta}{\\cos\\theta}$", "$\\dfrac{\\cos\\theta}{\\sin\\theta}$", "$\\dfrac{1}{\\cos\\theta}$", "$\\dfrac{1}{\\sin\\theta}$"],
        answer: 0,
        hint: "Tangent is the ratio of the opposite pair.",
        success: "$\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}$.",
      },
    ],
  },
  {
    id: "worked-finish",
    title: "How to finish verifying the identity",
    mode: "worked",
    hideSliders: true,
    baseReveal: { s1: true, s2: true },
    beats: [
      {
        text: "Now apply the Pythagorean identity, replacing $\\sin^2\\theta$ with $1 - \\cos^2\\theta$ so the numerator can break apart.",
        add: { s3: true },
      },
      {
        text: "Split the single fraction into two: $\\dfrac{1}{\\cos\\theta} - \\dfrac{\\cos^2\\theta}{\\cos\\theta}$.",
        add: { s4: true },
      },
      {
        text: "The second fraction cancels one $\\cos\\theta$, leaving $\\dfrac{1}{\\cos\\theta} - \\cos\\theta$.",
        add: { s5: true },
      },
      {
        text: "Finally $\\dfrac{1}{\\cos\\theta} = \\sec\\theta$, so the expression becomes $\\sec\\theta - \\cos\\theta$, exactly the left side. The identity is verified.",
        add: { s6: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Which identity turns $\\sin^2\\theta$ into $1 - \\cos^2\\theta$?",
        options: [
          "the Pythagorean identity $\\sin^2\\theta + \\cos^2\\theta = 1$",
          "a double-angle identity",
          "the quotient identity",
          "a reciprocal identity",
        ],
        answer: 0,
        hint: "It is the one relating $\\sin^2$ and $\\cos^2$.",
        success: "$\\sin^2\\theta = 1 - \\cos^2\\theta$ comes straight from $\\sin^2\\theta + \\cos^2\\theta = 1$.",
      },
    ],
  },
  {
    id: "practice2",
    title: "How to verify an identity that uses a product",
    mode: "practice2",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "This second verification is shorter. Prove the identity $$(1 - \\cos x)(1 + \\cos x) = \\sin^2 x$$ by multiplying the product on the left side out first.",
      },
      {
        text: "The left side is a difference of squares $(a - b)(a + b) = a^2 - b^2$ with $a = 1$ and $b = \\cos x$, so the product becomes $1 - \\cos^2 x$.",
        add: { s1: true },
      },
      {
        text: "By the Pythagorean identity, $1 - \\cos^2 x$ equals $\\sin^2 x$, which is exactly the right side. The two graphs coincide, matching the algebra.",
        add: { s2: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "$(1 - \\cos x)(1 + \\cos x)$ multiplies out to:",
        options: ["$1 - \\cos^2 x$", "$1 + \\cos^2 x$", "$1 - 2\\cos x$", "$\\cos^2 x - 1$"],
        answer: 0,
        hint: "Difference of squares: $(a-b)(a+b) = a^2 - b^2$.",
        success: "$(1 - \\cos x)(1 + \\cos x) = 1 - \\cos^2 x$.",
      },
      {
        kind: "choice",
        prompt: "And $1 - \\cos^2 x$ equals:",
        options: ["$\\sin^2 x$", "$\\cos^2 x$", "$\\tan^2 x$", "$1$"],
        answer: 0,
        hint: "Rearrange $\\sin^2 x + \\cos^2 x = 1$.",
        success: "$1 - \\cos^2 x = \\sin^2 x$, so the identity holds.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn: evaluate both sides at one angle",
    mode: "practice",
    params: [thetaParam],
    baseReveal: {},
    beats: [
      {
        text: "The identity $\\sec\\theta - \\cos\\theta = \\sin\\theta\\tan\\theta$ can be checked at a chosen angle. The solid marker is the left-hand value and the dashed marker is the right-hand value at the current $\\theta$. Those two numbers appear below the graph.",
        add: { s1: true, s2: true, s3: true },
      },
      {
        text: "At every angle the two markers have the same height, because the two expressions are equal. At $\\theta = 20^\\circ$ both sides equal about $0.12$.",
      },
    ],
    practice: "Drag $\\theta$ to $60^\\circ$ and read both sides.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Drag $\\theta$ to $60^\\circ$ and confirm both sides of $\\sec\\theta - \\cos\\theta = \\sin\\theta\\tan\\theta$.",
        hint: "At $60^\\circ$, $\\sec 60^\\circ = 2$ and $\\cos 60^\\circ = \\tfrac12$.",
        success: "At $60^\\circ$, $\\sec 60^\\circ - \\cos 60^\\circ = 2 - \\tfrac12 = \\tfrac32$, and $\\sin 60^\\circ\\tan 60^\\circ = \\tfrac{\\sqrt3}{2}\\cdot\\sqrt3 = \\tfrac32$. Both read $1.5$ and the dots coincide.",
        check: (value) => Math.abs(value - 60) < 3,
      },
      {
        kind: "choice",
        prompt: "Both sides equal $1.5$ at $60^\\circ$. Does that single check prove the identity?",
        options: [
          "no, a proof must hold for every $\\theta$, which the algebra showed",
          "yes, one matching angle proves it",
          "only because $60^\\circ$ is a special angle",
          "no, you also have to check $60^\\circ$ in radians",
        ],
        answer: 0,
        hint: "An identity is a claim about all angles, not one.",
        success: "Right: a single matching angle is only evidence. The step-by-step transformation is what proves it for every $\\theta$.",
      },
    ],
  },
];
