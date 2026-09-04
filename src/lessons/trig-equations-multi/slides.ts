import type { ParamSpec, Slide } from "../types";

const xParam: ParamSpec = {
  key: "theta",
  label: "Angle x",
  min: 0,
  max: 360,
  start: 90,
  step: 5,
  format: (v) => `x = ${Math.round(v)}\u00b0`,
};

export const slides: Slide[] = [
  {
    id: "factor",
    title: "How to solve a trig equation that factors",
    mode: "factor",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "When a trig equation looks quadratic, factor first. In $$2\\sin^2 x + \\sin x - 1 = 0$$ the unknown appears both squared and to the first power, matching $2u^2 + u - 1$.",
      },
      {
        text: "Make the substitution explicit by letting $u = \\sin x$. The equation becomes $2u^2 + u - 1 = 0$, a quadratic in $u$.",
        add: { s1: true },
      },
      {
        text: "Factor it: $(2u - 1)(u + 1) = 0$.",
        add: { s2: true },
      },
      {
        text: "Apply the zero-product rule: a product is zero only when a factor is zero, so $u = \\tfrac12$ or $u = -1$.",
        add: { s3: true },
      },
      {
        text: "Now undo the substitution, $u = \\sin x$, so $\\sin x = \\tfrac12$ or $\\sin x = -1$. Each is a basic sine equation of the kind already solved.",
        add: { s4: true },
      },
      {
        text: "Solve them on $[0, 2\\pi)$: $\\sin x = \\tfrac12$ gives $\\dfrac{\\pi}{6}$ and $\\dfrac{5\\pi}{6}$, and $\\sin x = -1$ gives the single angle $\\dfrac{3\\pi}{2}$. Three solutions in all.",
        add: { s5: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "After letting $u = \\sin x$, what does $2\\sin^2 x + \\sin x - 1 = 0$ factor into?",
        options: ["$(2u - 1)(u + 1)$", "$(2u + 1)(u - 1)$", "$(u - 1)(u + 1)$", "$(2u - 1)(u - 1)$"],
        answer: 0,
        hint: "You need factors that multiply to $-2$ and add to $+1$ in the cross terms.",
        success: "$(2u - 1)(u + 1) = 0$, giving $u = \\tfrac12$ or $u = -1$.",
      },
      {
        kind: "choice",
        prompt: "Why does $\\sin x = -1$ contribute only one solution on $[0, 2\\pi)$?",
        options: [
          "sine reaches its minimum $-1$ at just one angle, $\\dfrac{3\\pi}{2}$",
          "$-1$ is not a valid sine value",
          "sine is never negative",
          "it actually contributes two",
        ],
        answer: 0,
        hint: "The extreme values $\\pm 1$ are each touched once per turn.",
        success: "Sine equals $-1$ only at $\\dfrac{3\\pi}{2}$.",
      },
    ],
  },
  {
    id: "identity",
    title: "How to reduce a trig equation with an identity first",
    mode: "identity",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Solve $\\sin 2x = \\sin x$ by rewriting the double angle so every term is in the single angle $x$.",
      },
      {
        text: "Replace $\\sin 2x$ with its identity $2\\sin x\\cos x$. Now every term is in the single angle $x$.",
        add: { s1: true },
      },
      {
        text: "Do **not** divide both sides by $\\sin x$. That would delete the solutions where $\\sin x = 0$. Move every term to one side instead.",
        add: { s2: true },
      },
      {
        text: "Factor out the common $\\sin x$: $$\\sin x\\,(2\\cos x - 1) = 0$$ Factoring keeps the $\\sin x = 0$ case that dividing would have lost.",
        add: { s3: true },
      },
      {
        text: "Zero-product rule again: $\\sin x = 0$ or $\\cos x = \\tfrac12$.",
        add: { s4: true },
      },
      {
        text: "Solve each on $[0, 2\\pi)$: $\\sin x = 0$ gives $0$ and $\\pi$, while $\\cos x = \\tfrac12$ gives $\\dfrac{\\pi}{3}$ and $\\dfrac{5\\pi}{3}$. That yields four solutions, none of them lost.",
        add: { s5: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Why should you factor rather than divide by $\\sin x$?",
        options: [
          "dividing by $\\sin x$ discards the solutions where $\\sin x = 0$",
          "dividing is against the rules of algebra",
          "factoring is faster to write",
          "there is no difference",
        ],
        answer: 0,
        hint: "You may only divide by something you are sure is nonzero.",
        success: "Dividing throws away $\\sin x = 0$. Factoring keeps every case.",
      },
      {
        kind: "choice",
        prompt: "$\\sin x\\,(2\\cos x - 1) = 0$ leads to which pair of basic equations?",
        options: [
          "$\\sin x = 0$ or $\\cos x = \\tfrac12$",
          "$\\sin x = 0$ or $\\cos x = 2$",
          "$\\sin x = 1$ or $\\cos x = \\tfrac12$",
          "$\\sin x = \\tfrac12$ or $\\cos x = 0$",
        ],
        answer: 0,
        hint: "Set each factor to zero and solve the second for $\\cos x$.",
        success: "$\\sin x = 0$ or $2\\cos x - 1 = 0 \\Rightarrow \\cos x = \\tfrac12$.",
      },
    ],
  },
  {
    id: "multiangle",
    title: "Why a multiple angle multiplies the solutions",
    mode: "multi",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Solve $\\cos 2x = \\tfrac12$ on $[0, 2\\pi)$. The doubled angle $2x$ means a full turn in $x$ is two full turns in $2x$, so the search is wider.",
      },
      {
        text: "Let $u = 2x$. As $x$ runs over $[0, 2\\pi)$, the doubled angle $u$ runs over $[0, 4\\pi)$, a span of **two** full turns. Make sure to widen the interval to those two turns before solving.",
        add: { s1: true },
      },
      {
        text: "On two turns, $\\cos u = \\tfrac12$ happens four times: $u = \\dfrac{\\pi}{3}, \\dfrac{5\\pi}{3}$ in the first turn, then the same plus $2\\pi$: $\\dfrac{7\\pi}{3}, \\dfrac{11\\pi}{3}$.",
        add: { s2: true },
      },
      {
        text: "Finally undo $u = 2x$ by dividing every answer by $2$: $$x = \\dfrac{\\pi}{6}, \\dfrac{5\\pi}{6}, \\dfrac{7\\pi}{6}, \\dfrac{11\\pi}{6}$$",
        add: { s3: true },
      },
      {
        text: "That is four solutions, twice as many as a single-angle equation would give. Searching only one turn for $u$ would have found half of them, which is exactly why a multiple-angle equation needs the wider interval.",
        add: { s4: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "For $\\cos 2x = \\tfrac12$ with $x \\in [0, 2\\pi)$, what interval must $u = 2x$ cover?",
        options: ["$[0, 4\\pi)$", "$[0, 2\\pi)$", "$[0, \\pi)$", "$[0, 8\\pi)$"],
        answer: 0,
        hint: "Doubling the angle doubles the length of the interval it sweeps.",
        success: "$u = 2x$ runs over $[0, 4\\pi)$, two full turns.",
      },
      {
        kind: "choice",
        prompt: "How many solutions does $\\cos 2x = \\tfrac12$ have on $[0, 2\\pi)$?",
        options: ["four", "two", "one", "eight"],
        answer: 0,
        hint: "Two per turn over two turns.",
        success: "Four: $\\dfrac{\\pi}{6}, \\dfrac{5\\pi}{6}, \\dfrac{7\\pi}{6}, \\dfrac{11\\pi}{6}$.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn: find all four solutions",
    mode: "practice",
    params: [xParam],
    baseReveal: {},
    beats: [
      {
        text: "The inner ray is $x$ and the faster ray is $2x$. As $x$ moves, $2x$ turns twice as fast while the readout tracks $\\cos 2x$.",
        add: { s1: true, s2: true, s3: true },
      },
      {
        text: "You are solving $\\cos 2x = \\tfrac12$ on $[0, 2\\pi)$. The ray rests at $x = 90^\\circ$, where $\\cos 2x = \\cos 180^\\circ = -1$, nowhere near $\\tfrac12$.",
      },
    ],
    practice: "Drag $x$ until $\\cos 2x$ reads $\\tfrac12$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Drag $x$ to any solution of $\\cos 2x = \\tfrac12$ on $[0, 2\\pi)$.",
        hint: "Slide until the readout $\\cos 2x$ shows $\\tfrac12$. There are four such spots because $2x$ goes around twice.",
        success: "Landing where $\\cos 2x = \\tfrac12$ hits one of $30^\\circ, 150^\\circ, 210^\\circ, 330^\\circ$. Because $2x$ sweeps twice, there are four.",
        check: (value) => [30, 150, 210, 330].some((a) => Math.abs(value - a) < 6),
      },
      {
        kind: "choice",
        prompt: "Why does $\\cos 2x = \\tfrac12$ give four solutions while $\\cos x = \\tfrac12$ gives only two?",
        options: [
          "as $x$ covers $[0, 2\\pi)$, the angle $2x$ covers $[0, 4\\pi)$, meeting $\\tfrac12$ twice as often",
          "cosine is larger when the angle is doubled",
          "the equation was multiplied by two",
          "$\\tfrac12$ is counted twice by mistake",
        ],
        answer: 0,
        hint: "How far does $2x$ travel while $x$ makes one trip around?",
        success: "$2x$ runs through two full turns, so it passes $\\cos = \\tfrac12$ four times.",
      },
    ],
  },
];
