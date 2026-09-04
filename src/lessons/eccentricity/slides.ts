import type { ParamSpec, Slide } from "../types";

/**
 * Foci and eccentricity for ellipses and hyperbolas, centered at the origin.
 *   Ellipse:   c^2 = a^2 - b^2 (minus), foci inside on the major axis, e = c/a in [0, 1).
 *   Hyperbola: c^2 = a^2 + b^2 (plus),  foci beyond the vertices,       e = c/a > 1.
 * Classify by e: circle 0, ellipse (0, 1), parabola 1, hyperbola > 1.
 *
 * Reveal flags read literally in Stage.tsx:
 *   ellipsefoci:   dock, curve, foci
 *   ellipseecc:    dock, curve, foci, ecc
 *   hyperbolafoci: dock, curve, foci, ecc
 *   classify:      dock, curve, foci, ecc
 *   yourturn:      dock, foci (the curve and foci always draw and move with b)
 */

const bParam: ParamSpec = {
  key: "b",
  label: "semi-minor axis b (a fixed at 5)",
  min: 1,
  max: 5,
  start: 2,
  step: 1,
  format: (v) => `b = ${Math.round(v)}`,
};

export const slides: Slide[] = [
  {
    id: "ellipse-foci",
    title: "What are the foci of an ellipse?",
    mode: "ellipsefoci",
    hideSliders: true,
    baseReveal: { dock: true, curve: true },
    beats: [
      {
        text: "An ellipse $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ has its vertices on the longer axis, the major axis. The two **foci** (the plural of **focus**) lie on that same axis at distance $c$ from the center.",
      },
      {
        text: "The distance $c$ from the center out to each focus comes from $$c^2 = a^2 - b^2$$ The **minus** sign is the ellipse's signature. Because we subtract, $c$ is smaller than $a$, so the foci land **inside** the curve, never past the vertices.",
        add: { foci: true },
      },
      {
        text: "On $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$, where $a = 5$ and $b = 3$, $c^2 = 25 - 9 = 16$, so $c = 4$. The foci are at $(\\pm 4, 0)$ on the major axis, just inside the vertices $(\\pm 5, 0)$.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "For an ellipse, the distance $c$ from center to focus satisfies:",
        options: ["$c^2 = a^2 - b^2$", "$c^2 = a^2 + b^2$", "$c = a - b$", "$c = a + b$"],
        answer: 0,
        hint: "An ellipse subtracts, and you must square first.",
        success: "Right: an ellipse uses $c^2 = a^2 - b^2$.",
      },
      {
        kind: "choice",
        prompt: "For $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$ ($a = 5$, $b = 3$), the foci are at:",
        options: ["$(\\pm 4, 0)$", "$(\\pm 8, 0)$", "$(0, \\pm 4)$", "$(\\pm \\sqrt{34}, 0)$"],
        answer: 0,
        hint: "Compute $c^2 = 25 - 9$, take the root, and place the foci on the major (horizontal) axis.",
        success: "Yes: $c^2 = 16$, so $c = 4$ and the foci are $(\\pm 4, 0)$.",
      },
    ],
  },
  {
    id: "ellipse-ecc",
    title: "What does eccentricity measure?",
    mode: "ellipseecc",
    hideSliders: true,
    baseReveal: { dock: true, curve: true, foci: true },
    beats: [
      {
        text: "**Eccentricity** is a single number that measures how stretched a conic is. It is the ratio of the focus distance to the vertex distance: $$e = \\frac{c}{a}$$ The ratio measures how far out the foci are compared with the vertices.",
      },
      {
        text: "For our ellipse, $c = 4$ and $a = 5$, so $e = \\frac{4}{5} = 0.8$. Because the foci $(c = 4)$ are almost as far out as the vertices $(a = 5)$, the ratio is close to $1$ and the ellipse is noticeably stretched.",
        add: { ecc: true },
      },
      {
        text: "An eccentricity near $0$ means the foci are near the center and the ellipse is nearly a **circle**. An eccentricity close to $1$ means the foci are near the vertices and the ellipse is long and thin. For any ellipse, $e$ stays between $0$ and $1$.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "For the ellipse with $c = 4$ and $a = 5$, the eccentricity is:",
        options: ["$e = 0.8$", "$e = 1.25$", "$e = 0.2$", "$e = 4$"],
        answer: 0,
        hint: "Divide the focus distance by the vertex distance, $c/a$.",
        success: "Right: $e = c/a = 4/5 = 0.8$.",
      },
      {
        kind: "choice",
        prompt: "An ellipse with eccentricity very close to $0$ looks:",
        options: ["almost like a perfect circle", "long and thin", "like two branches", "like a straight line"],
        answer: 0,
        hint: "Small $e$ means the foci are near the center.",
        success: "Yes: $e$ near $0$ means the foci gather at the center, so the ellipse is nearly circular.",
      },
    ],
  },
  {
    id: "hyperbola-foci",
    title: "The foci of a hyperbola",
    mode: "hyperbolafoci",
    hideSliders: true,
    baseReveal: { dock: true, curve: true },
    beats: [
      {
        text: "A hyperbola also has two **foci**, one inside each branch. The distance rule flips its sign: $$c^2 = a^2 + b^2$$ This time we **add**. Because we add, $c$ is larger than $a$, so the foci are **outside** the vertices, farther from the center than the turning points.",
        add: { foci: true },
      },
      {
        text: "Take $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$, where $a = 3$ and $b = 4$. Then $c^2 = 9 + 16 = 25$, so $c = 5$. The foci are at $(\\pm 5, 0)$, just beyond the vertices $(\\pm 3, 0)$.",
      },
      {
        text: "Now the eccentricity: $e = \\frac{c}{a} = \\frac{5}{3} \\approx 1.67$. Since $c > a$ for every hyperbola, the ratio is always greater than $1$. The same $3, 4, 5$ numbers reappear from the ellipse, and the only change is the plus sign, which pushes the foci outside instead of inside.",
        add: { ecc: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "For a hyperbola, the distance $c$ from center to focus satisfies:",
        options: ["$c^2 = a^2 + b^2$", "$c^2 = a^2 - b^2$", "$c = a + b$", "$c = b - a$"],
        answer: 0,
        hint: "A hyperbola adds, and you must square first.",
        success: "Right: a hyperbola uses $c^2 = a^2 + b^2$, the plus version.",
      },
      {
        kind: "choice",
        prompt: "For $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$ ($a = 3$, $b = 4$), the eccentricity is:",
        options: ["$e = \\frac{5}{3} \\approx 1.67$", "$e = \\frac{3}{5} = 0.6$", "$e = \\frac{4}{3} \\approx 1.33$", "$e = 5$"],
        answer: 0,
        hint: "First $c = \\sqrt{9 + 16} = 5$, then $e = c/a$.",
        success: "Yes: $c = 5$ and $a = 3$, so $e = 5/3 \\approx 1.67$, which is greater than $1$.",
      },
    ],
  },
  {
    id: "classify-by-e",
    title: "Eccentricity sorts the conics",
    mode: "classify",
    hideSliders: true,
    baseReveal: { dock: true, curve: true, foci: true, ecc: true },
    beats: [
      {
        text: "Eccentricity does more than describe one curve. It **classifies the whole family** of conics by a single number. As $e$ increases from $0$, the curve becomes more stretched and then more open.",
      },
      {
        text: "In order of $e$: a **circle** has $e = 0$ with its foci at the center, and an **ellipse** has $0 < e < 1$ while staying closed. A **parabola** is exactly at $e = 1$, and a **hyperbola** has $e > 1$, open into two branches.",
      },
      {
        text: "So a bigger $e$ always means a more stretched or more open curve. The value $e = 1$ is the crossover: below it the curve closes into an oval, at it the curve is a parabola, and above it the curve breaks open into a hyperbola.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "A conic has eccentricity $e = 0.4$. It is:",
        options: ["an ellipse", "a circle", "a parabola", "a hyperbola"],
        answer: 0,
        hint: "Which range holds $0.4$?",
        success: "Right: $0 < 0.4 < 1$, so it is an ellipse.",
      },
      {
        kind: "choice",
        prompt: "The eccentricity value that marks the boundary between closed and open conics is:",
        options: ["$e = 1$ (a parabola)", "$e = 0$ (a circle)", "$e = 0.5$", "$e = 2$"],
        answer: 0,
        hint: "It is the crossover between an ellipse and a hyperbola.",
        success: "Yes: $e = 1$ is exactly a parabola, the boundary case.",
      },
    ],
  },
  {
    id: "eccentricity-your-turn",
    title: "Your turn: read an eccentricity",
    mode: "yourturn",
    params: [bParam],
    baseReveal: { dock: true, foci: true },
    beats: [
      {
        text: "This ellipse has longer semi-axis fixed at $a = 5$, while $b$ sets the shorter semi-axis. Then $c = \\sqrt{25 - b^2}$ and $e = c/5$. At the start $b = 2$, so $c = \\sqrt{21} \\approx 4.58$ and $e \\approx 0.92$, a stretched ellipse.",
      },
      {
        text: "As $b$ rises to $5$, it equals $a$, so $c = \\sqrt{25 - 25} = 0$ and $e = 0$. The two foci meet at the center and the ellipse becomes a perfect **circle**.",
        to: { b: 5 },
        ms: 2200,
      },
      {
        text: "Bringing $b$ back to $3$ gives $c = \\sqrt{25 - 9} = 4$ and $e = 4/5 = 0.8$, the stretched ellipse from before. The two foci slide apart along the $x$-axis as $b$ shrinks.",
        to: { b: 3 },
        ms: 2000,
      },
    ],
    practice: "Drag $b$ until the eccentricity is $e = 0.6$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Drag $b$ until the ellipse has eccentricity $e = 0.6$.",
        hint: "You need $c = e \\cdot a = 0.6 \\times 5 = 3$. Since $c^2 = 25 - b^2$, that means $b^2 = 25 - 9 = 16$, so $b = 4$.",
        success: "With $b = 4$, $c = \\sqrt{25 - 16} = 3$ and $e = 3/5 = 0.6$.",
        check: (value) => Math.round(value ?? 0) === 4,
      },
      {
        kind: "choice",
        prompt: "With $a = 5$ fixed, setting $b = 5$ makes the eccentricity:",
        options: ["$e = 0$, a circle", "$e = 1$, a parabola", "$e = 0.5$", "$e > 1$, a hyperbola"],
        answer: 0,
        hint: "When $b = a$, $c = \\sqrt{a^2 - b^2} = 0$.",
        success: "Right: $b = 5 = a$ gives $c = 0$, so $e = 0$ and the ellipse is a circle.",
      },
      {
        kind: "choice",
        prompt: "As you slide $b$ up toward $a = 5$, the ellipse's eccentricity:",
        options: ["decreases toward $0$", "increases toward $1$", "stays the same", "jumps above $1$"],
        answer: 0,
        hint: "Bigger $b$ makes $c = \\sqrt{25 - b^2}$ smaller, so $c/a$ shrinks.",
        success: "Yes: a larger $b$ shrinks $c$, so $e = c/a$ falls toward $0$ and the ellipse rounds out.",
      },
    ],
  },
];
