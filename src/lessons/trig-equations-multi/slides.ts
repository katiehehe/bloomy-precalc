import type { Slide } from "../types";

export const slides: Slide[] = [
  {
    id: "factor",
    title: "Trig equations that factor",
    mode: "factor",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Some trig equations are secretly quadratics. Take $2\\sin^2 x + \\sin x - 1 = 0$. The unknown appears squared and to the first power, exactly the shape of $2u^2 + u - 1$.",
      },
      {
        text: "So make the disguise obvious: let $u = \\sin x$. The equation becomes $2u^2 + u - 1 = 0$, a plain quadratic you already know how to factor.",
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
        text: "Now undo the substitution, $u = \\sin x$, so $\\sin x = \\tfrac12$ or $\\sin x = -1$. Each is a basic equation from the last lesson.",
        add: { s4: true },
      },
      {
        text: "Solve them on $[0, 2\\pi)$: $\\sin x = \\tfrac12$ gives $\\dfrac{\\pi}{6}$ and $\\dfrac{5\\pi}{6}$, and $\\sin x = -1$ gives the single angle $\\dfrac{3\\pi}{2}$. Three solutions in all.",
        add: { s5: true },
      },
    ],
    practice: "Substitute to expose the quadratic, factor, then solve each basic equation.",
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
    title: "Reduce with an identity first",
    mode: "identity",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "When two different angles appear, like $\\sin 2x$ and $\\sin x$ together, first make the angles match. Solve $\\sin 2x = \\sin x$ by rewriting the double angle.",
      },
      {
        text: "Replace $\\sin 2x$ with its identity $2\\sin x\\cos x$. Now every term is in the single angle $x$.",
        add: { s1: true },
      },
      {
        text: "Here is the tempting mistake: do **not** divide both sides by $\\sin x$. That would delete the solutions where $\\sin x = 0$. Instead move everything to one side.",
        add: { s2: true },
      },
      {
        text: "Factor out the common $\\sin x$: $\\sin x\\,(2\\cos x - 1) = 0$. Factoring keeps the $\\sin x = 0$ case that dividing would have lost.",
        add: { s3: true },
      },
      {
        text: "Zero-product rule again: $\\sin x = 0$ or $\\cos x = \\tfrac12$.",
        add: { s4: true },
      },
      {
        text: "Solve each on $[0, 2\\pi)$: $\\sin x = 0$ gives $0$ and $\\pi$; $\\cos x = \\tfrac12$ gives $\\dfrac{\\pi}{3}$ and $\\dfrac{5\\pi}{3}$. Four solutions, none lost.",
        add: { s5: true },
      },
    ],
    practice: "Rewrite to a single angle, move everything to one side, and factor instead of dividing.",
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
        success: "Dividing throws away $\\sin x = 0$; factoring keeps every case.",
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
    title: "Multiple angles need a wider net",
    mode: "multi",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Now a subtle one: solve $\\cos 2x = \\tfrac12$ on $[0, 2\\pi)$. The angle inside is $2x$, and that changes how wide we have to look.",
      },
      {
        text: "Let $u = 2x$. As $x$ runs over $[0, 2\\pi)$, the doubled angle $u$ runs over $[0, 4\\pi)$, that is **two** full turns. So make sure to widen the interval before solving.",
        add: { s1: true },
      },
      {
        text: "On two turns, $\\cos u = \\tfrac12$ happens four times: $u = \\dfrac{\\pi}{3}, \\dfrac{5\\pi}{3}$ in the first turn, then the same plus $2\\pi$: $\\dfrac{7\\pi}{3}, \\dfrac{11\\pi}{3}$.",
        add: { s2: true },
      },
      {
        text: "Finally undo $u = 2x$ by dividing every answer by $2$: $x = \\dfrac{\\pi}{6}, \\dfrac{5\\pi}{6}, \\dfrac{7\\pi}{6}, \\dfrac{11\\pi}{6}$.",
        add: { s3: true },
      },
      {
        text: "Four solutions, twice as many as a single-angle equation. If you had only looked at one turn for $u$, you would have found half of them. That is the whole trap of multiple-angle equations.",
        add: { s4: true },
      },
    ],
    practice: "Widen the interval for the inside angle, solve there, then divide the answers back down.",
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
];
