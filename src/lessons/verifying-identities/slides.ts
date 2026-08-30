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
        text: "Verifying an identity is different from solving an equation. You are not finding an unknown. You are **proving** two expressions are the same for every angle. The graph shows it: the two sides trace one curve.",
      },
      {
        text: "Because they are already equal, you must not move terms across the equals sign as if solving. That would assume the very thing you are trying to prove. Instead, pick **one** side and rewrite it, step by step, until it turns into the other side.",
      },
      {
        text: "Which side? Usually the messier one, since it has more to simplify. And the reliable first move is to rewrite everything in **sines and cosines**, the common language every trig function converts to.",
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
        text: "Prove this identity: $$\\sec\\theta - \\cos\\theta = \\sin\\theta\\tan\\theta$$ The right side looks simpler to build up, so we start there and transform it into the left.",
      },
      {
        text: "First, convert to sine and cosine: rewrite $\\tan\\theta$ as $\\dfrac{\\sin\\theta}{\\cos\\theta}$.",
        add: { s1: true },
      },
      {
        text: "Multiply the two factors. $\\sin\\theta \\cdot \\dfrac{\\sin\\theta}{\\cos\\theta} = \\dfrac{\\sin^2\\theta}{\\cos\\theta}$.",
        add: { s2: true },
      },
      {
        text: "Now the Pythagorean move: replace $\\sin^2\\theta$ with $1 - \\cos^2\\theta$. This is the step that opens everything up.",
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
        text: "Finally $\\dfrac{1}{\\cos\\theta} = \\sec\\theta$, so we reach $\\sec\\theta - \\cos\\theta$, exactly the left side. The identity is verified.",
        add: { s6: true },
      },
    ],
    practice: "Convert to sine and cosine, apply a Pythagorean swap, then split and simplify.",
    questions: [
      {
        kind: "choice",
        prompt: "The first move rewrites $\\tan\\theta$ as:",
        options: ["$\\dfrac{\\sin\\theta}{\\cos\\theta}$", "$\\dfrac{\\cos\\theta}{\\sin\\theta}$", "$\\dfrac{1}{\\cos\\theta}$", "$\\dfrac{1}{\\sin\\theta}$"],
        answer: 0,
        hint: "Tangent is the ratio of the opposite pair.",
        success: "$\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}$.",
      },
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
        text: "One more, shorter this time. Verify this identity: $$(1 - \\cos x)(1 + \\cos x) = \\sin^2 x$$ The left side is a product, so multiply it out first.",
      },
      {
        text: "It is a difference of squares, $(a - b)(a + b) = a^2 - b^2$, with $a = 1$ and $b = \\cos x$: the product becomes $1 - \\cos^2 x$.",
        add: { s1: true },
      },
      {
        text: "And $1 - \\cos^2 x$ is exactly $\\sin^2 x$ by the Pythagorean identity. Left side equals right side, so it is verified, and the two curves confirm it.",
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
        text: "Now test the identity $\\sec\\theta - \\cos\\theta = \\sin\\theta\\tan\\theta$ yourself. As you drag $\\theta$, the graph marks a dot on each side: the solid curve is the left side and the dashed curve is the right. Below, both sides are evaluated as numbers.",
        add: { s1: true, s2: true, s3: true },
      },
      {
        text: "The two dots ride the same curve at every angle, which is exactly what the step-by-step transformation proved. The tracer rests at $\\theta = 20^\\circ$ for now, where both sides read about $0.12$.",
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
