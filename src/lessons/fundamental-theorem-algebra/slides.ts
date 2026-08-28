import type { ParamSpec, Slide } from "../types";

// The roots are fixed points, so no slider drives this figure. A token param
// keeps the engine happy; every slide hides the slider row.
const token: ParamSpec = {
  key: "n",
  label: "n",
  min: 0,
  max: 1,
  start: 0,
  format: () => "roots",
};

export const slides: Slide[] = [
  {
    id: "count-the-roots",
    title: "How many roots?",
    mode: "fta",
    params: [token],
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "The **Fundamental Theorem of Algebra**: a polynomial of degree $n\\ge 1$ has exactly $n$ roots in the complex numbers, counting multiplicity.",
      },
      {
        text: "Take $p(x)=x^3-x^2+4x-4$. Its degree is $3$, so it has exactly three roots. Factoring gives $(x-1)(x^2+4)$.",
        add: { readout: true },
      },
      {
        text: "The factor $x-1$ gives the real root $x=1$, sitting on the real axis.",
        add: { real: true },
      },
    ],
    practice: "Three roots are promised. One is real; the next slide finds the other two.",
    questions: [
      {
        kind: "choice",
        prompt: "How many roots (counting multiplicity) does a degree $5$ polynomial have?",
        options: ["$5$", "It depends on the graph", "At most $5$, sometimes fewer"],
        answer: 0,
        hint: "The theorem is exact, and it counts complex roots with multiplicity.",
        success: "Exactly $5$, once you allow complex roots and multiplicity.",
      },
      {
        kind: "choice",
        prompt: "How many **real** roots does $p(x)=(x-1)(x^2+4)$ have?",
        options: ["$1$", "$2$", "$3$"],
        answer: 0,
        hint: "Can $x^2+4=0$ be solved with a real number?",
        success: "Only $x=1$: the factor $x^2+4$ has no real zero, so the graph crosses once.",
      },
    ],
  },
  {
    id: "conjugate-pairs",
    title: "Non-real roots travel in pairs",
    mode: "fta",
    params: [token],
    hideSliders: true,
    baseReveal: { readout: true, real: true },
    beats: [
      {
        text: "Now $x^2+4=0$ gives $x^2=-4$, so $x=2i$. That root sits up on the imaginary axis.",
        add: { pairsTop: true },
      },
      {
        text: "With real coefficients, non-real roots always come in **conjugate pairs**. So $-2i$ is a root as well, the mirror image across the real axis.",
        add: { pairsBottom: true, mirror: true },
      },
      {
        text: "Three roots in all: $1$, $2i$, and $-2i$. One real root plus one conjugate pair.",
      },
    ],
    practice: "Real coefficients force complex roots to appear as mirror-image pairs.",
    questions: [
      {
        kind: "choice",
        prompt: "The complex conjugate of $2i$ is:",
        options: ["$-2i$", "$2$", "$2+i$"],
        answer: 0,
        hint: "Conjugating flips the sign of the imaginary part.",
        success: "Right: $\\overline{2i}=-2i$, its mirror across the real axis.",
      },
      {
        kind: "choice",
        prompt: "A degree $4$ polynomial with real coefficients has $2$ real roots. How many non-real roots?",
        options: ["$2$, one conjugate pair", "$1$", "$4$"],
        answer: 0,
        hint: "Total is $4$; non-real roots come in pairs.",
        success: "Two non-real roots, forming a single conjugate pair.",
      },
    ],
  },
  {
    id: "use-the-mirror",
    title: "Use the mirror",
    mode: "fta",
    params: [token],
    hideSliders: true,
    baseReveal: { readout: true, real: true, pairsTop: true },
    beats: [
      {
        text: "Non-real roots mirror across the real axis. Here $2i$ is a root of $p$.",
      },
      {
        text: "Its conjugate partner sits directly below it, the same distance under the real axis.",
      },
    ],
    practice: "Click the point where the conjugate root must be.",
    questions: [
      {
        kind: "plot",
        prompt: "Click the conjugate of the root $2i$.",
        target: { x: 0, y: -2 },
        tolerance: 0.6,
        label: "-2i",
        hint: "Same spot on the real axis, mirrored to below it.",
        success: "Yes: the conjugate of $2i$ is $-2i$, directly across the real axis.",
      },
      {
        kind: "choice",
        prompt: "Every odd-degree polynomial with real coefficients has at least how many real roots?",
        options: ["At least $1$", "Exactly $0$", "At least $2$"],
        answer: 0,
        hint: "Non-real roots pair up, so an odd count cannot be all paired.",
        success: "At least one: an odd degree cannot be covered by conjugate pairs alone.",
      },
    ],
  },
];
