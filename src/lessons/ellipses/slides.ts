import type { ParamSpec, Slide } from "../types";

/**
 * Ellipses in standard form centered at the origin: x^2/a^2 + y^2/b^2 = 1.
 * a is the semi-axis along x, b the semi-axis along y (both read as the square
 * roots of the denominators). The major (longer) axis lies along the larger
 * denominator. Vertices are the ends of the major axis, co-vertices the ends of
 * the minor axis.
 *
 * Reveal flags read literally in Stage.tsx:
 *   standard: dock, curve, axes
 *   vertices: dock, curve, verts
 *   vertical: dock, curve, verts
 *   read:     dock, curve, verts
 *   yourturn: dock (the curve and its vertices always draw and move with b)
 */

const bParam: ParamSpec = {
  key: "b",
  label: "semi-axis b along y (a fixed at 3)",
  min: 1,
  max: 5,
  start: 2,
  step: 1,
  format: (v) => `b = ${Math.round(v)}`,
};

export const slides: Slide[] = [
  {
    id: "ellipse-standard",
    title: "What is the standard form of an ellipse?",
    mode: "standard",
    hideSliders: true,
    baseReveal: { dock: true, curve: true },
    beats: [
      {
        text: "A circle $x^2 + y^2 = r^2$ stretches the same amount in every direction. Stretching different amounts along the two axes produces an **ellipse**. When the center is at the origin, its standard form is $$\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$$ The numbers $a$ and $b$ are the **semi-axis** lengths, each the distance from the center out to the curve.",
      },
      {
        text: "Match $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$ to the template. Under $x^2$ the denominator is $25 = 5^2$, so $a = 5$, and under $y^2$ it is $9 = 3^2$, so $b = 3$. Because each denominator is $a^2$ or $b^2$, not $a$ or $b$, $a$ and $b$ are the **square roots** of those denominators.",
        add: { axes: true },
      },
      {
        text: "So this ellipse reaches $5$ units left and right and $3$ units up and down. The blue segment has length $a = 5$ along the $x$-axis, and the red segment has length $b = 3$ along the $y$-axis. Those two semi-axes set the whole shape.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "For $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$, the semi-axis lengths are:",
        options: ["$a = 5$ and $b = 3$", "$a = 25$ and $b = 9$", "$a = 3$ and $b = 5$", "$a = 50$ and $b = 18$"],
        answer: 0,
        hint: "The denominators are $a^2$ and $b^2$, so take the square root of each.",
        success: "Right: $\\sqrt{25} = 5$ and $\\sqrt{9} = 3$, so $a = 5$ and $b = 3$.",
      },
      {
        kind: "choice",
        prompt: "In $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$, the number under $x^2$ equals:",
        options: ["$a^2$, so the semi-axis is its square root", "$a$, the semi-axis itself", "$2a$, the full axis", "the area of the ellipse"],
        answer: 0,
        hint: "Compare the equation to the template letter by letter.",
        success: "Yes: the denominator is $a^2$, so the semi-axis $a$ is the square root of it.",
      },
    ],
  },
  {
    id: "ellipse-vertices",
    title: "Vertices and co-vertices",
    mode: "vertices",
    hideSliders: true,
    baseReveal: { dock: true, curve: true },
    beats: [
      {
        text: "Follow the same ellipse, $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$, out to where it crosses the axes. Along the $x$-axis it reaches $(\\pm 5, 0)$, and along the $y$-axis it reaches $(0, \\pm 3)$. Those are the four points where the ellipse meets the axes.",
        add: { verts: true },
      },
      {
        text: "The two points at the ends of the **longer** axis are the **vertices**. Here the longer semi-axis is $a = 5$, so the vertices are $(\\pm 5, 0)$, drawn as the dark dots. The two points at the ends of the **shorter** axis are the **co-vertices**, here $(0, \\pm 3)$, drawn as the blue dots.",
      },
      {
        text: "So a vertex is a distance equal to the **larger** semi-axis from the center, and a co-vertex is a distance equal to the smaller one. The names mark which axis is longer and which is shorter.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "For $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$, the vertices are:",
        options: ["$(\\pm 5, 0)$", "$(0, \\pm 3)$", "$(\\pm 3, 0)$", "$(0, \\pm 5)$"],
        answer: 0,
        hint: "Vertices are at the ends of the longer axis, a distance of the larger semi-axis from the center.",
        success: "Right: the larger semi-axis is $a = 5$ along $x$, so the vertices are $(\\pm 5, 0)$.",
      },
      {
        kind: "choice",
        prompt: "For that same ellipse, the co-vertices are:",
        options: ["$(0, \\pm 3)$", "$(\\pm 5, 0)$", "$(\\pm 3, 0)$", "$(0, \\pm 9)$"],
        answer: 0,
        hint: "Co-vertices are at the ends of the shorter axis.",
        success: "Yes: the shorter semi-axis is $b = 3$ along $y$, so the co-vertices are $(0, \\pm 3)$.",
      },
    ],
  },
  {
    id: "ellipse-orientation",
    title: "How to name the major and minor axes",
    mode: "vertical",
    hideSliders: true,
    baseReveal: { dock: true, curve: true },
    beats: [
      {
        text: "The longer axis through the two vertices is the **major axis**, and the shorter axis through the co-vertices is the **minor axis**. Which direction is major follows one rule: the major axis lies along the variable over the **larger denominator**.",
      },
      {
        text: "Swapping the denominators gives $\\frac{x^2}{9} + \\frac{y^2}{25} = 1$. Now the larger denominator $25$ is under $y^2$, so the major axis is **vertical** and the ellipse stands tall.",
        add: { verts: true },
      },
      {
        text: "Read the semi-axes as before: $\\sqrt{25} = 5$ up and down, and $\\sqrt{9} = 3$ left and right. The vertices are the far points $(0, \\pm 5)$ and the co-vertices are $(\\pm 3, 0)$. These are the same two numbers as the wide ellipse, now swapped, so the long axis tips from across to up.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "The major axis of an ellipse lies along the variable with the:",
        options: ["larger denominator", "smaller denominator", "larger numerator", "constant term"],
        answer: 0,
        hint: "The bigger denominator is the bigger $a^2$ or $b^2$, so its axis is the longer one.",
        success: "Right: the larger denominator marks the longer, major axis.",
      },
      {
        kind: "choice",
        prompt: "For $\\frac{x^2}{9} + \\frac{y^2}{25} = 1$, the major axis is vertical and the vertices are:",
        options: ["$(0, \\pm 5)$", "$(\\pm 5, 0)$", "$(\\pm 3, 0)$", "$(0, \\pm 3)$"],
        answer: 0,
        hint: "The larger denominator $25$ is under $y^2$, so the long axis runs up and down.",
        success: "Yes: a vertical major axis with $\\sqrt{25} = 5$ puts the vertices at $(0, \\pm 5)$.",
      },
    ],
  },
  {
    id: "ellipse-read",
    title: "How to read an ellipse start to finish",
    mode: "read",
    hideSliders: true,
    baseReveal: { dock: true, curve: true, verts: true },
    beats: [
      {
        text: "Read $\\frac{x^2}{16} + \\frac{y^2}{4} = 1$ from start to finish. **Step one**, find the semi-axes by taking the square root of each denominator: $\\sqrt{16} = 4$ across and $\\sqrt{4} = 2$ up. So $a = 4$ and $b = 2$.",
      },
      {
        text: "**Step two**, find the orientation by comparing denominators. The larger denominator is $16$, and it is under $x^2$, so the major axis is horizontal. The vertices are the far points $(\\pm 4, 0)$ and the co-vertices are $(0, \\pm 2)$.",
      },
      {
        text: "Make sure to compare the **denominators**, not the raw look of the equation, and remember the vertices always land on the major (longer) axis. Two square roots and one comparison give you the entire shape.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "For $\\frac{x^2}{16} + \\frac{y^2}{4} = 1$, the semi-axes are:",
        options: ["$a = 4$, $b = 2$", "$a = 16$, $b = 4$", "$a = 8$, $b = 2$", "$a = 2$, $b = 4$"],
        answer: 0,
        hint: "Take the square root of each denominator.",
        success: "Right: $\\sqrt{16} = 4$ and $\\sqrt{4} = 2$.",
      },
      {
        kind: "choice",
        prompt: "That ellipse has its major axis horizontal, so its vertices are:",
        options: ["$(\\pm 4, 0)$", "$(0, \\pm 2)$", "$(\\pm 2, 0)$", "$(0, \\pm 4)$"],
        answer: 0,
        hint: "The larger denominator $16$ is under $x^2$, so the long axis is horizontal with $\\sqrt{16} = 4$.",
        success: "Yes: horizontal major axis of semi-length $4$ gives vertices $(\\pm 4, 0)$.",
      },
    ],
  },
  {
    id: "ellipse-your-turn",
    title: "Your turn: read an ellipse",
    mode: "yourturn",
    params: [bParam],
    baseReveal: { dock: true },
    beats: [
      {
        text: "The $x$ semi-axis stays fixed at $a = 3$ while $b$ sets the $y$ semi-axis. At the start $b = 2$ is smaller than $a$, so the larger denominator is under $x^2$ and the major axis is horizontal.",
      },
      {
        text: "As $b$ rises past $a$ to $b = 5 > 3$, the larger denominator moves under $y^2$, so the ellipse stands tall and the vertices move to $(0, \\pm 5)$.",
        to: { b: 5 },
        ms: 2200,
      },
      {
        text: "Bringing $b$ back to $3$ makes $a = b$, so the two semi-axes match and the ellipse rounds into a **circle** with no long axis at all.",
        to: { b: 3 },
        ms: 2000,
      },
    ],
    practice: "Drag $b$ until the ellipse is taller than it is wide.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Drag $b$ until the ellipse is taller than it is wide, giving it a **vertical** major axis.",
        hint: "A vertical major axis needs the larger denominator under $y^2$, so you need $b > a$. Since $a = 3$, slide $b$ to $4$ or more.",
        success: "With $b > 3$ the larger denominator is under $y^2$, so the major axis is vertical.",
        check: (value) => (value ?? 0) >= 4,
      },
      {
        kind: "choice",
        prompt: "With $a = 3$ fixed, the ellipse becomes a circle when:",
        options: ["$b = 3$, so $a = b$", "$b = 0$", "$b = 6$, twice $a$", "$b = 1$"],
        answer: 0,
        hint: "A circle has equal semi-axes in both directions.",
        success: "Right: at $b = 3 = a$ both denominators match, so it is a circle.",
      },
      {
        kind: "choice",
        prompt: "With $a = 3$ and $b = 5$, the vertices are at:",
        options: ["$(0, \\pm 5)$", "$(\\pm 5, 0)$", "$(\\pm 3, 0)$", "$(0, \\pm 3)$"],
        answer: 0,
        hint: "The larger semi-axis is $b = 5$ along $y$, and vertices are the far points.",
        success: "Yes: the long axis is vertical with semi-length $5$, so the vertices are $(0, \\pm 5)$.",
      },
    ],
  },
];
