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
    title: "The standard form of an ellipse",
    mode: "standard",
    hideSliders: true,
    baseReveal: { dock: true, curve: true },
    beats: [
      {
        text: "An **ellipse** is a circle that has been stretched by different amounts in two directions, an oval with a center. When its center sits at the origin, we write it in **standard form**: $$\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$$ The two numbers $a$ and $b$ are the **semi-axis** lengths. A semi-axis is the distance from the center out to the curve, so $a$ reaches out along the $x$-axis and $b$ reaches out along the $y$-axis.",
      },
      {
        text: "Take a concrete one, $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$, and match it to the template. Under $x^2$ the denominator is $25$, and $25 = 5^2$, so $a = 5$. Under $y^2$ the denominator is $9$, and $9 = 3^2$, so $b = 3$. The key move is to take the **square root** of each denominator. The denominator is $a^2$, not $a$.",
        add: { axes: true },
      },
      {
        text: "So this ellipse reaches $5$ units left and right and $3$ units up and down. The blue segment has length $a = 5$ along the $x$-axis, and the red segment has length $b = 3$ along the $y$-axis. Those two semi-axes set the whole shape.",
      },
    ],
    practice:
      "Read the semi-axes off an ellipse by square-rooting each denominator: $a = \\sqrt{\\text{(denominator under } x^2)}$ and $b = \\sqrt{\\text{(denominator under } y^2)}$.",
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
        text: "Follow the same ellipse, $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$, out to where it crosses the axes. Along the $x$-axis it reaches $(\\pm 5, 0)$, and along the $y$-axis it reaches $(0, \\pm 3)$. Those four points are the corners of the shape.",
        add: { verts: true },
      },
      {
        text: "The two points at the ends of the **longer** axis are the **vertices**. Here the longer semi-axis is $a = 5$, so the vertices are $(\\pm 5, 0)$, drawn as the dark dots. The two points at the ends of the **shorter** axis are the **co-vertices**, here $(0, \\pm 3)$, drawn as the blue dots.",
      },
      {
        text: "So a vertex sits a distance equal to the **larger** semi-axis from the center, and a co-vertex sits a distance equal to the smaller one. Naming them keeps the long direction and the short direction straight.",
      },
    ],
    practice:
      "Vertices are the endpoints of the longer axis (the far points), and co-vertices are the endpoints of the shorter axis (the near points).",
    questions: [
      {
        kind: "choice",
        prompt: "For $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$, the vertices are:",
        options: ["$(\\pm 5, 0)$", "$(0, \\pm 3)$", "$(\\pm 3, 0)$", "$(0, \\pm 5)$"],
        answer: 0,
        hint: "Vertices sit at the ends of the longer axis, a distance of the larger semi-axis from the center.",
        success: "Right: the larger semi-axis is $a = 5$ along $x$, so the vertices are $(\\pm 5, 0)$.",
      },
      {
        kind: "choice",
        prompt: "For that same ellipse, the co-vertices are:",
        options: ["$(0, \\pm 3)$", "$(\\pm 5, 0)$", "$(\\pm 3, 0)$", "$(0, \\pm 9)$"],
        answer: 0,
        hint: "Co-vertices sit at the ends of the shorter axis.",
        success: "Yes: the shorter semi-axis is $b = 3$ along $y$, so the co-vertices are $(0, \\pm 3)$.",
      },
    ],
  },
  {
    id: "ellipse-orientation",
    title: "Major axis, minor axis, and which way it points",
    mode: "vertical",
    hideSliders: true,
    baseReveal: { dock: true, curve: true },
    beats: [
      {
        text: "The longer axis, running through the two vertices, is the **major axis**. The shorter axis, through the co-vertices, is the **minor axis**. The one question left is which direction is major. The rule: the major axis lies along the variable that sits over the **larger denominator**.",
      },
      {
        text: "Watch what happens when we swap the denominators to get $\\frac{x^2}{9} + \\frac{y^2}{25} = 1$. Now the larger denominator, $25$, sits under $y^2$, so the major axis is **vertical** and the ellipse stands tall.",
        add: { verts: true },
      },
      {
        text: "Read the semi-axes as before: $\\sqrt{25} = 5$ up and down, and $\\sqrt{9} = 3$ left and right. The vertices are the far points $(0, \\pm 5)$ and the co-vertices are $(\\pm 3, 0)$. Same two numbers as the wide ellipse, just swapped, which tipped the long axis from across to up.",
      },
    ],
    practice:
      "To find the orientation, compare the two denominators. The larger one sits under the variable of the major axis, horizontal for $x^2$ and vertical for $y^2$.",
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
    title: "Reading a new ellipse start to finish",
    mode: "read",
    hideSliders: true,
    baseReveal: { dock: true, curve: true, verts: true },
    beats: [
      {
        text: "Put every step together on a fresh ellipse, $\\frac{x^2}{16} + \\frac{y^2}{4} = 1$. **Step one**, read the semi-axes by square-rooting each denominator: $\\sqrt{16} = 4$ across and $\\sqrt{4} = 2$ up. So $a = 4$ and $b = 2$.",
      },
      {
        text: "**Step two**, find the orientation by comparing denominators. The larger denominator is $16$, and it sits under $x^2$, so the major axis is horizontal. The vertices are the far points $(\\pm 4, 0)$ and the co-vertices are $(0, \\pm 2)$.",
      },
      {
        text: "Make sure to compare the **denominators**, not the raw look of the equation, and remember the vertices always land on the major (longer) axis. Two square roots and one comparison give you the entire shape.",
      },
    ],
    practice:
      "Every ellipse reads the same way: square-root the denominators for $a$ and $b$, then compare the denominators to place the major axis and its vertices.",
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
    title: "Your turn",
    mode: "yourturn",
    params: [bParam],
    baseReveal: { dock: true },
    beats: [
      {
        text: "Now you drive it. The $x$ semi-axis is fixed at $a = 3$, and the $b$ slider sets the $y$ semi-axis. Right now $b = 2$, smaller than $a$, so the larger denominator is under $x^2$ and the major axis is horizontal.",
      },
      {
        text: "Push $b$ up past $a$. With $b = 5 > 3$, the larger denominator is now under $y^2$, so the ellipse stands tall and the vertices jump up to $(0, \\pm 5)$.",
        to: { b: 5 },
        ms: 2200,
      },
      {
        text: "Ease $b$ back to $3$. Now $a = b$, the two semi-axes match, and the ellipse rounds out into a **circle**, with no long axis at all.",
        to: { b: 3 },
        ms: 2000,
      },
    ],
    practice:
      "Drag the $b$ slider and watch the top and bottom vertices slide. Make the ellipse taller than it is wide.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Drag $b$ until the ellipse is taller than it is wide, giving it a **vertical** major axis.",
        hint: "A vertical major axis needs the larger denominator under $y^2$, so you need $b > a$. Since $a = 3$, slide $b$ to $4$ or more.",
        success: "With $b > 3$ the larger denominator sits under $y^2$, so the major axis is vertical.",
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
        prompt: "With $a = 3$ and $b = 5$, the vertices sit at:",
        options: ["$(0, \\pm 5)$", "$(\\pm 5, 0)$", "$(\\pm 3, 0)$", "$(0, \\pm 3)$"],
        answer: 0,
        hint: "The larger semi-axis is $b = 5$ along $y$, and vertices are the far points.",
        success: "Yes: the long axis is vertical with semi-length $5$, so the vertices are $(0, \\pm 5)$.",
      },
    ],
  },
];
