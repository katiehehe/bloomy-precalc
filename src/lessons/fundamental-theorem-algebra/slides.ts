import type { ParamSpec, Slide } from "../types";

// The roots are fixed points, so no slider drives this figure. A token param
// keeps the engine happy. Every slide hides the slider row.
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
        text: "Take $p(x)=x^3-x^2+4x-4$. Its degree is $3$, so it has exactly three roots. Factoring gives $$(x-1)(x^2+4).$$",
        add: { readout: true },
      },
      {
        text: "The factor $x-1$ gives the real root $x=1$, sitting on the real axis.",
        add: { real: true },
      },
    ],
    practice: "The theorem promises three roots, and one of them is real. The next slide locates the other two.",
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
    title: "What a conjugate pair is",
    mode: "fta",
    params: [token],
    hideSliders: true,
    baseReveal: { readout: true, real: true },
    beats: [
      {
        text: "The other factor gives $x^2+4=0$, so $x^2=-4$ and $x=2i$. That root lies on the imaginary axis.",
        add: { pairsTop: true },
      },
      {
        text: "The **complex conjugate** of a number $a+bi$ is $a-bi$, which keeps the real part and flips the sign of the imaginary part. So the conjugate of $2i$, which equals $0+2i$, is $-2i$.",
      },
      {
        text: "Conjugates matter because multiplying a number by its conjugate cancels the imaginary parts: $$(a+bi)(a-bi)=a^2-(bi)^2=a^2+b^2.$$ The result is always a **real** number. For our root, $(2i)(-2i)=-4i^2=4$.",
      },
      {
        text: "So a conjugate pair multiplies into a **real quadratic**: $$(x-2i)(x+2i)=x^2+4.$$ That is exactly the factor we began with, so $-2i$ must be a root as well, mirrored from $2i$ across the real axis.",
        add: { pairsBottom: true, mirror: true },
      },
      {
        text: "A polynomial with **real coefficients** is built only from real linear factors and these real quadratics, so every non-real root occurs together with its conjugate. The three roots are $1$, $2i$, and $-2i$.",
      },
    ],
    practice: "A number times its conjugate is real, so conjugates pair up in real polynomials.",
    questions: [
      {
        kind: "choice",
        prompt: "The complex conjugate of $3-5i$ is:",
        options: ["$3+5i$", "$-3+5i$", "$-3-5i$"],
        answer: 0,
        hint: "Keep the real part. Flip only the sign of the imaginary part.",
        success: "Correct: change the sign in front of $i$, so $\\overline{3-5i}=3+5i$.",
      },
      {
        kind: "choice",
        prompt: "Multiplying a number by its conjugate, $(a+bi)(a-bi)$, gives:",
        options: ["$a^2+b^2$, a real number", "$a^2-b^2$", "$2abi$"],
        answer: 0,
        hint: "The cross terms $+abi$ and $-abi$ cancel, and $-(bi)^2=+b^2$.",
        success: "Correct: the imaginary parts cancel, leaving the real number $a^2+b^2$.",
      },
    ],
  },
  {
    id: "use-the-mirror",
    title: "Using the conjugate pair",
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
        hint: "The conjugate has the same real part and lies the same distance below the real axis.",
        success: "Correct: the conjugate of $2i$ is $-2i$, directly across the real axis.",
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
