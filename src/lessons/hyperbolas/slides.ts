import type { ParamSpec, Slide } from "../types";

/**
 * Hyperbolas in standard form centered at the origin. Two forms:
 *   x^2/a^2 - y^2/b^2 = 1  opens left and right, vertices (+/- a, 0)
 *   y^2/a^2 - x^2/b^2 = 1  opens up and down,   vertices (0, +/- a)
 * a is always under the POSITIVE term (the semi-transverse axis). The sign of
 * the terms, not the size of the denominators, decides which way it opens.
 * Asymptotes are intentionally left for their own lesson.
 *
 * Reveal flags read literally in Stage.tsx:
 *   standardh:  dock, curve, verts
 *   sign:       dock, curve, verts
 *   vertexrule: dock, curve, verts
 *   read:       dock, curve, verts
 *   yourturn:   dock (the curve and vertices always draw and move with a)
 */

const aParam: ParamSpec = {
  key: "a",
  label: "semi-axis a (vertex distance, b fixed at 4)",
  min: 1,
  max: 5,
  start: 1,
  step: 1,
  format: (v) => `a = ${Math.round(v)}`,
};

export const slides: Slide[] = [
  {
    id: "hyperbola-standard",
    title: "The standard form of a hyperbola",
    mode: "standardh",
    hideSliders: true,
    baseReveal: { dock: true, curve: true },
    beats: [
      {
        text: "A **hyperbola** looks like two curves facing away from each other. Centered at the origin, one standard form is $$\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$$ The two separate curves are the **branches**. The **minus** sign is the whole difference: an ellipse adds its two terms while a hyperbola subtracts them, and that subtraction opens the closed oval into two separate pieces.",
      },
      {
        text: "Because the $x^2$ term is the **positive** one, these branches open left and right. In $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$, setting $y = 0$ gives $x^2 = 9$, so $x = \\pm 3$. Those turning points $(\\pm 3, 0)$ are the **vertices**, and the segment joining them along the $x$-axis is the **transverse axis**.",
        add: { verts: true },
      },
      {
        text: "So $a = \\sqrt{9} = 3$ is the distance from the center out to each vertex. The branches curve away from the vertices and never come back together. There is no top or bottom point the way an ellipse has, because a hyperbola is open.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "For $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$, the value of $a$ (center to vertex) is:",
        options: ["$3$, from $\\sqrt{9}$", "$9$, the denominator", "$4$, from $\\sqrt{16}$", "$16$, the other denominator"],
        answer: 0,
        hint: "$a$ is under the positive term, and you take the square root of the denominator.",
        success: "Right: $a = \\sqrt{9} = 3$.",
      },
      {
        kind: "choice",
        prompt: "The vertices of $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$ are:",
        options: ["$(\\pm 3, 0)$", "$(0, \\pm 4)$", "$(\\pm 4, 0)$", "$(0, \\pm 3)$"],
        answer: 0,
        hint: "Set $y = 0$ and solve for $x$.",
        success: "Yes: $x^2 = 9$ gives $x = \\pm 3$, so the vertices are $(\\pm 3, 0)$.",
      },
    ],
  },
  {
    id: "hyperbola-sign",
    title: "The sign decides which way it opens",
    mode: "sign",
    hideSliders: true,
    baseReveal: { dock: true, curve: true },
    beats: [
      {
        text: "Which way a hyperbola opens is set entirely by **which squared term is positive**. If $x^2$ is the positive term the branches open left and right, and if $y^2$ is positive they open up and down. The variable with the plus sign points the way.",
      },
      {
        text: "Swap the signs to get $\\frac{y^2}{9} - \\frac{x^2}{16} = 1$. Now $y^2$ is positive, so the branches open **up and down**. Setting $x = 0$ gives $y^2 = 9$, so the vertices are $(0, \\pm 3)$ and the transverse axis is vertical.",
        add: { verts: true },
      },
      {
        text: "Make sure to read the sign, not the size of the numbers. Both equations here use a $9$ and a $16$, but the plus moved from $x^2$ to $y^2$, and that alone tipped the opening from sideways to up and down.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "$\\frac{y^2}{9} - \\frac{x^2}{16} = 1$ opens:",
        options: ["up and down", "left and right", "in all four directions", "it does not open, it is closed"],
        answer: 0,
        hint: "The positive term is $y^2$, so the branches follow the $y$ direction.",
        success: "Right: positive $y^2$ opens the branches up and down.",
      },
      {
        kind: "choice",
        prompt: "The vertices of $\\frac{y^2}{9} - \\frac{x^2}{16} = 1$ are:",
        options: ["$(0, \\pm 3)$", "$(\\pm 3, 0)$", "$(\\pm 4, 0)$", "$(0, \\pm 4)$"],
        answer: 0,
        hint: "Set $x = 0$ and solve for $y$.",
        success: "Yes: $y^2 = 9$ gives $y = \\pm 3$, so the vertices are $(0, \\pm 3)$.",
      },
    ],
  },
  {
    id: "hyperbola-vertexrule",
    title: "a sits under the positive term",
    mode: "vertexrule",
    hideSliders: true,
    baseReveal: { dock: true, curve: true, verts: true },
    beats: [
      {
        text: "One habit from ellipses causes trouble here. With an ellipse you found $a$ under the **larger** denominator, but with a hyperbola $a$ is the number under the **positive** term, whether or not it is larger.",
      },
      {
        text: "Look again at $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$. The positive term is $x^2$ with denominator $9$, so $a = \\sqrt{9} = 3$ and the vertices are $(\\pm 3, 0)$, even though $16$ is bigger. The $16$ under $y^2$ is $b^2$, which gives no vertex at all.",
      },
      {
        text: "This hyperbola never even touches the $y$-axis: setting $x = 0$ gives $-\\frac{y^2}{16} = 1$, which has no real solution. So take $a$ from under the plus sign, then plot the two vertices on the transverse axis.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "For $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$, which number gives $a$?",
        options: ["$9$, under the positive $x^2$", "$16$, the larger denominator", "$16$, under $y^2$", "the average of $9$ and $16$"],
        answer: 0,
        hint: "$a^2$ is the denominator of the positive term, not the bigger denominator.",
        success: "Right: $a^2 = 9$ comes from the positive term, so $a = 3$ even though $16$ is larger.",
      },
      {
        kind: "choice",
        prompt: "Where does $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$ cross the $y$-axis?",
        options: ["nowhere, it never touches the $y$-axis", "at $(0, \\pm 4)$", "at $(0, \\pm 3)$", "at the origin"],
        answer: 0,
        hint: "Set $x = 0$ and see whether a real $y$ can work.",
        success: "Yes: $x = 0$ gives $-y^2/16 = 1$, impossible, so there is no $y$-intercept.",
      },
    ],
  },
  {
    id: "hyperbola-read",
    title: "Reading a vertical hyperbola",
    mode: "read",
    hideSliders: true,
    baseReveal: { dock: true, curve: true, verts: true },
    beats: [
      {
        text: "Read $\\frac{y^2}{4} - \\frac{x^2}{9} = 1$. **Step one**, find the positive term. It is $y^2$, so the branches open up and down and the transverse axis is vertical.",
      },
      {
        text: "**Step two**, read $a$ from under that positive term: $a = \\sqrt{4} = 2$. The vertices sit on the vertical transverse axis at $(0, \\pm 2)$. The $9$ under $x^2$ is $b^2$ and shapes the branches, but it gives no vertex.",
      },
      {
        text: "The read-off is two steps. Find the plus sign to get the direction, then take the square root of its denominator to get the vertex distance $a$. Everything else is the second denominator $b^2$.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "$\\frac{y^2}{4} - \\frac{x^2}{9} = 1$ opens up and down. Its vertices are:",
        options: ["$(0, \\pm 2)$", "$(\\pm 3, 0)$", "$(0, \\pm 4)$", "$(\\pm 2, 0)$"],
        answer: 0,
        hint: "The positive term is $y^2/4$, so $a = \\sqrt{4} = 2$ along the $y$-axis.",
        success: "Right: $a = 2$ on the vertical axis gives vertices $(0, \\pm 2)$.",
      },
      {
        kind: "choice",
        prompt: "In $\\frac{y^2}{4} - \\frac{x^2}{9} = 1$, the number $9$ is:",
        options: ["$b^2$, from the negative term (no vertex)", "$a^2$, giving the vertices", "the vertex distance itself", "the center"],
        answer: 0,
        hint: "$a$ comes from the positive term. The other denominator is $b^2$.",
        success: "Yes: $9 = b^2$ sits under the negative term and does not produce a vertex.",
      },
    ],
  },
  {
    id: "hyperbola-your-turn",
    title: "Your turn",
    mode: "yourturn",
    params: [aParam],
    baseReveal: { dock: true },
    beats: [
      {
        text: "The hyperbola is $\\frac{x^2}{a^2} - \\frac{y^2}{16} = 1$, so it opens left and right with $b = 4$ fixed. The value of $a$ is the distance from the center to each vertex. At the start $a = 1$, so the vertices sit at $(\\pm 1, 0)$.",
      },
      {
        text: "As $a$ grows to $5$, the vertices move out to $(\\pm 5, 0)$ and the branches spread apart with them. The vertex distance is exactly $a$.",
        to: { a: 5 },
        ms: 2200,
      },
      {
        text: "Bringing $a$ back to $2$ returns the vertices to $(\\pm 2, 0)$. Wherever $a$ is set, the vertices land at $(\\pm a, 0)$ on the transverse axis.",
        to: { a: 2 },
        ms: 2000,
      },
    ],
    practice: "Drag $a$ until the vertices sit at $(\\pm 3, 0)$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Drag $a$ until the vertices sit at $(\\pm 3, 0)$.",
        hint: "The vertices are at $(\\pm a, 0)$, so you want $a = 3$.",
        success: "With $a = 3$ the vertices are $(\\pm 3, 0)$, matching $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$.",
        check: (value) => Math.round(value ?? 0) === 3,
      },
      {
        kind: "choice",
        prompt: "If the equation changed to $\\frac{y^2}{a^2} - \\frac{x^2}{16} = 1$, the branches would open:",
        options: ["up and down", "left and right", "the same way as before", "not at all"],
        answer: 0,
        hint: "The positive term would become $y^2$.",
        success: "Right: a positive $y^2$ term opens the branches up and down.",
      },
      {
        kind: "choice",
        prompt: "In $\\frac{x^2}{a^2} - \\frac{y^2}{16} = 1$, the vertices always lie at:",
        options: ["$(\\pm a, 0)$", "$(0, \\pm a)$", "$(\\pm 4, 0)$", "$(0, \\pm 4)$"],
        answer: 0,
        hint: "The positive term is $x^2$, and vertices sit at distance $a$ along that axis.",
        success: "Yes: the vertices are $(\\pm a, 0)$, set by the positive $x^2$ term.",
      },
    ],
  },
];
