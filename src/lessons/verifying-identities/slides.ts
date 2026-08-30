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
        text: "Verifying an identity is different from solving an equation, because you are not finding an unknown value. Instead you are **proving** that two expressions are equal for every angle, which the graph shows as the two sides tracing a single curve.",
      },
      {
        text: "Because the two sides are already equal, you must not move terms across the equals sign as if solving. That would assume the very thing you are trying to prove. Instead, choose **one** side and rewrite it step by step until it becomes the other side.",
      },
      {
        text: "Choose the messier side, since it has more to simplify. The reliable first move is to rewrite everything in **sines and cosines**, the common language that every trig function converts into.",
      },
      {
        text: "Then look for the usual tools: a Pythagorean identity ($\\sin^2 + \\cos^2 = 1$), a common denominator, or a fraction you can split. Make sure to change only one side and to justify every line.",
      },
      {
        text: "Keep all three Pythagorean forms handy. Dividing $\\sin^2\\theta + \\cos^2\\theta = 1$ by $\\cos^2\\theta$ gives: $$1 + \\tan^2\\theta = \\sec^2\\theta$$ and dividing by $\\sin^2\\theta$ gives $1 + \\cot^2\\theta = \\csc^2\\theta$. A verification often needs the tangent or cotangent version, not just the first one.",
      },
    ],
    practice: "Work one side only, convert to sine and cosine, and justify each step.",
    questions: [
      {
        kind: "choice",
        prompt: "When verifying an identity, you should:",
        options: [
          "transform one side until it matches the other",
          "move terms across the equals sign like solving",
          "plug in a single angle and stop",
          "cross-multiply both sides at once",
        ],
        answer: 0,
        hint: "The two sides are already equal, so you cannot assume it by rearranging across the equals sign.",
        success: "Transform one side (usually the messier one) into the other.",
      },
      {
        kind: "choice",
        prompt: "A dependable first step is usually to:",
        options: [
          "rewrite everything in sines and cosines",
          "take a derivative",
          "graph both sides and eyeball it",
          "add the same term to both sides",
        ],
        answer: 0,
        hint: "Every trig function converts into this common language.",
        success: "Convert to sine and cosine, then hunt for a Pythagorean or common-denominator move.",
      },
    ],
  },
  {
    id: "worked",
    title: "A worked verification",
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
    practice: "Start from the messier side and convert every function to sine and cosine.",
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
    title: "A worked verification, continued",
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
    practice: "Swap with the Pythagorean identity, split the fraction, cancel, then rewrite as secant.",
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
    title: "Verify with a product",
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
    practice: "Multiply the product out, then recognize the Pythagorean form.",
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
    title: "Your turn: trace both sides",
    mode: "practice",
    params: [thetaParam],
    baseReveal: {},
    beats: [
      {
        text: "This slide lets you test the identity $\\sec\\theta - \\cos\\theta = \\sin\\theta\\tan\\theta$ directly. The $\\theta$ slider marks a dot on each curve, the solid one for the left side and the dashed one for the right, while both sides are evaluated as numbers below.",
        add: { s1: true, s2: true, s3: true },
      },
      {
        text: "The two dots stay on the same curve at every angle, which is exactly what the step-by-step transformation proved. The tracer currently rests at $\\theta = 20^\\circ$, where both sides read about $0.12$.",
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
