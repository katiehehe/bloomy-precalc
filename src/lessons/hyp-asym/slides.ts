import type { ParamSpec, Slide } from "../types";

/**
 * Asymptotes of hyperbolas, centered at the origin.
 *   x^2/a^2 - y^2/b^2 = 1  ->  asymptotes y = +/- (b/a) x, box corners (+/- a, +/- b)
 *   y^2/a^2 - x^2/b^2 = 1  ->  asymptotes y = +/- (a/b) x, box corners (+/- b, +/- a)
 * The central box has half-widths a and b, and its diagonals extended are the
 * asymptotes. The branches approach the asymptotes but never touch them.
 *
 * Reveal flags read literally in Stage.tsx:
 *   box:       dock, curve, box, verts
 *   diagonals: dock, curve, box, asym
 *   orient:    dock, curve, box, asym
 *   sketch:    dock, curve, box, asym, verts
 *   yourturn:  dock, box, asym (the curve always draws and reshapes with b)
 */

const bParam: ParamSpec = {
  key: "b",
  label: "semi-axis b (a fixed at 3)",
  min: 1,
  max: 6,
  start: 2,
  step: 1,
  format: (v) => `b = ${Math.round(v)}`,
};

export const slides: Slide[] = [
  {
    id: "asym-box",
    title: "The central box",
    mode: "box",
    hideSliders: true,
    baseReveal: { dock: true, curve: true },
    beats: [
      {
        text: "The fastest way to draw a hyperbola by hand starts with a helper rectangle called the **central box**. For $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$, the box reaches out a distance $a$ in the $x$ direction and $b$ in the $y$ direction, so its four corners land at $(\\pm a, \\pm b)$.",
        add: { box: true },
      },
      {
        text: "Take $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$, so $a = 3$ and $b = 4$. The box runs from $-3$ to $3$ across and from $-4$ to $4$ up, with a corner at $(3, 4)$. The **vertices** $(\\pm 3, 0)$ sit at the midpoints of the left and right sides of the box.",
        add: { verts: true },
      },
      {
        text: "So the two half-widths of the box are exactly $a$ and $b$, the square roots of the denominators. Draw that box lightly and the whole hyperbola hangs off it.",
      },
    ],
    practice:
      "For $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$, draw the central box with half-width $a$ in $x$ and $b$ in $y$, corners at $(\\pm a, \\pm b)$.",
    questions: [
      {
        kind: "choice",
        prompt: "For $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$, one corner of the central box is at:",
        options: ["$(3, 4)$", "$(9, 16)$", "$(4, 3)$", "$(3, 0)$"],
        answer: 0,
        hint: "The box half-widths are $a = \\sqrt{9}$ across and $b = \\sqrt{16}$ up.",
        success: "Right: $a = 3$ and $b = 4$, so a corner sits at $(3, 4)$.",
      },
      {
        kind: "choice",
        prompt: "The half-widths of the central box for $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ are:",
        options: ["$a$ in $x$ and $b$ in $y$", "$a^2$ in $x$ and $b^2$ in $y$", "$b$ in $x$ and $a$ in $y$", "$1$ in each direction"],
        answer: 0,
        hint: "The box reaches to the vertices in $x$ and to $\\pm b$ in $y$.",
        success: "Yes: the box is $a$ wide (each way) and $b$ tall (each way).",
      },
    ],
  },
  {
    id: "asym-diagonals",
    title: "The diagonals are the asymptotes",
    mode: "diagonals",
    hideSliders: true,
    baseReveal: { dock: true, curve: true, box: true },
    beats: [
      {
        text: "An **asymptote** is a straight guide line that the branches keep getting closer to, without ever touching. For a hyperbola, the asymptotes are simply the **diagonals of the central box, extended** out through the corners.",
        add: { asym: true },
      },
      {
        text: "A line through the origin and the corner $(a, b)$ has slope $\\frac{b}{a}$, and the other diagonal has slope $-\\frac{b}{a}$. So for $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ the asymptotes are $$y = \\pm \\frac{b}{a}\\,x$$ With $a = 3$ and $b = 4$ that is $y = \\pm \\frac{4}{3}x$.",
      },
      {
        text: "Far from the center each branch runs almost exactly along one of these lines, hugging it more and more closely but never crossing it. From two square roots, the box has produced the two guide lines the branches follow.",
      },
    ],
    practice:
      "For $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$, the asymptotes are the box diagonals, $y = \\pm \\frac{b}{a}x$.",
    questions: [
      {
        kind: "choice",
        prompt: "For $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$, the asymptotes are:",
        options: ["$y = \\pm \\frac{4}{3}x$", "$y = \\pm \\frac{3}{4}x$", "$y = \\pm \\frac{16}{9}x$", "$y = \\pm 12x$"],
        answer: 0,
        hint: "The slope is $\\frac{b}{a}$ with $a = 3$ and $b = 4$.",
        success: "Right: $\\frac{b}{a} = \\frac{4}{3}$, so $y = \\pm \\frac{4}{3}x$.",
      },
      {
        kind: "choice",
        prompt: "The asymptotes of a hyperbola are the:",
        options: ["extended diagonals of the central box", "sides of the central box", "vertices joined by a segment", "axes of the plane"],
        answer: 0,
        hint: "They pass through the box corners and the center.",
        success: "Yes: extend the box's diagonals through its corners to get the asymptotes.",
      },
    ],
  },
  {
    id: "asym-orient",
    title: "The up-and-down case flips the slope",
    mode: "orient",
    hideSliders: true,
    baseReveal: { dock: true, curve: true, box: true, asym: true },
    beats: [
      {
        text: "When the hyperbola opens up and down, its form becomes $\\frac{y^2}{a^2} - \\frac{x^2}{b^2} = 1$. The asymptote slopes then flip to $$y = \\pm \\frac{a}{b}\\,x$$ where the slope is $\\frac{a}{b}$ rather than $\\frac{b}{a}$, since $a$ still sits under the positive term, now $y^2$.",
      },
      {
        text: "Take $\\frac{y^2}{9} - \\frac{x^2}{16} = 1$, so $a = 3$ and $b = 4$. The slopes are $\\pm \\frac{3}{4}$, giving $y = \\pm \\frac{3}{4}x$. The box is now wider than tall, with corners at $(\\pm 4, \\pm 3)$, and the vertices $(0, \\pm 3)$ are the midpoints of its top and bottom.",
      },
      {
        text: "So make sure to check the form before you write the slope. A horizontal hyperbola uses $\\frac{b}{a}$, a vertical one uses $\\frac{a}{b}$. Reading the box corner off the picture, rise over run, gets it right every time.",
      },
    ],
    practice:
      "Check the form first: $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ uses slope $\\frac{b}{a}$, while $\\frac{y^2}{a^2} - \\frac{x^2}{b^2} = 1$ uses slope $\\frac{a}{b}$.",
    questions: [
      {
        kind: "choice",
        prompt: "For $\\frac{y^2}{9} - \\frac{x^2}{16} = 1$, the asymptotes are:",
        options: ["$y = \\pm \\frac{3}{4}x$", "$y = \\pm \\frac{4}{3}x$", "$y = \\pm \\frac{9}{16}x$", "$y = \\pm \\frac{16}{9}x$"],
        answer: 0,
        hint: "For the up-down form the slope is $\\frac{a}{b}$, with $a = 3$ under the positive $y^2$.",
        success: "Right: $\\frac{a}{b} = \\frac{3}{4}$, so $y = \\pm \\frac{3}{4}x$.",
      },
      {
        kind: "choice",
        prompt: "Which slope does the up-and-down form $\\frac{y^2}{a^2} - \\frac{x^2}{b^2} = 1$ use?",
        options: ["$\\frac{a}{b}$", "$\\frac{b}{a}$", "$\\frac{a^2}{b^2}$", "$ab$"],
        answer: 0,
        hint: "The positive term is $y^2$, and $a$ sits under it.",
        success: "Yes: the up-down form uses slope $\\frac{a}{b}$.",
      },
    ],
  },
  {
    id: "asym-sketch",
    title: "Sketching a hyperbola with the box",
    mode: "sketch",
    hideSliders: true,
    baseReveal: { dock: true, curve: true, box: true, asym: true, verts: true },
    beats: [
      {
        text: "Here is the full pencil procedure on $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$. **Step one**: draw the central box, half-width $a = 3$ across and $b = 4$ up, corners at $(\\pm 3, \\pm 4)$.",
      },
      {
        text: "**Step two**: draw the two diagonals of the box and extend them past the corners. Those are the asymptotes $y = \\pm \\frac{4}{3}x$, the guide rails for the branches.",
      },
      {
        text: "**Step three**: mark the vertices $(\\pm 3, 0)$ at the midpoints of the box's sides, then draw each branch from a vertex, curving outward until it hugs the asymptotes. The order is box, diagonals, vertices, and finally the branches.",
      },
    ],
    practice:
      "Sketch in order: draw the box, extend the diagonals as asymptotes, plot the vertices, then curve each branch out toward the asymptotes.",
    questions: [
      {
        kind: "choice",
        prompt: "The recommended first step when sketching a hyperbola is to:",
        options: ["draw the central box", "draw the branches freehand", "plot the foci", "shade the inside"],
        answer: 0,
        hint: "Everything else hangs off one helper rectangle.",
        success: "Right: draw the box first, then its diagonals, vertices, and branches.",
      },
      {
        kind: "choice",
        prompt: "As each branch moves far from the center, it:",
        options: ["gets closer and closer to an asymptote", "crosses an asymptote and keeps going", "returns to the vertex", "becomes a straight line at the box edge"],
        answer: 0,
        hint: "An asymptote is a guide line the curve approaches but never meets.",
        success: "Yes: the branch approaches the asymptote without ever touching it.",
      },
    ],
  },
  {
    id: "asym-your-turn",
    title: "Your turn",
    mode: "yourturn",
    params: [bParam],
    baseReveal: { dock: true, box: true, asym: true },
    beats: [
      {
        text: "Your hyperbola is $\\frac{x^2}{9} - \\frac{y^2}{b^2} = 1$, so $a = 3$ is fixed and the $b$ slider sets the height of the box. Right now $b = 2$, so the box corner is at $(3, 2)$ and the asymptote slope is $\\frac{b}{a} = \\frac{2}{3}$, fairly shallow.",
      },
      {
        text: "As $b$ rises to $6$, the box grows taller, its corner climbs to $(3, 6)$, and the asymptotes steepen to slope $\\frac{6}{3} = 2$. The branches tip up to follow them.",
        to: { b: 6 },
        ms: 2200,
      },
      {
        text: "Bringing $b$ back to $2$ shrinks the box and flattens the asymptotes again. The corner of the box always sits at $(3, b)$, so its height is exactly $b$.",
        to: { b: 2 },
        ms: 2000,
      },
    ],
    practice:
      "Drag the $b$ slider and watch the box corner rise and the asymptotes steepen. Set the box corner where the question asks.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Drag $b$ until the corner of the central box reaches $(3, 4)$.",
        hint: "The corner sits at $(3, b)$, so you want $b = 4$. That makes the asymptote slope $\\frac{4}{3}$.",
        success: "With $b = 4$ the corner is $(3, 4)$ and the asymptotes are $y = \\pm \\frac{4}{3}x$.",
        check: (value) => Math.round(value ?? 0) === 4,
      },
      {
        kind: "choice",
        prompt: "When $b = 4$ (with $a = 3$), the asymptote slope $\\frac{b}{a}$ is:",
        options: ["$\\frac{4}{3}$", "$\\frac{3}{4}$", "$\\frac{4}{9}$", "$12$"],
        answer: 0,
        hint: "Slope is $\\frac{b}{a}$ for this left-right form.",
        success: "Right: $\\frac{b}{a} = \\frac{4}{3}$.",
      },
      {
        kind: "choice",
        prompt: "If this equation were the up-down form $\\frac{y^2}{9} - \\frac{x^2}{b^2} = 1$ with $b = 4$, the slope would instead be:",
        options: ["$\\frac{3}{4}$, using $\\frac{a}{b}$", "$\\frac{4}{3}$, using $\\frac{b}{a}$", "$\\frac{9}{16}$", "the same as before"],
        answer: 0,
        hint: "The up-down form flips the fraction to $\\frac{a}{b}$.",
        success: "Yes: the up-down form uses $\\frac{a}{b} = \\frac{3}{4}$.",
      },
    ],
  },
];
