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
        text: "A **hyperbola** looks like two curves facing away from each other. Centered at the origin, one standard form is $$\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$$ The two separate curves are the **branches**. Notice the **minus** sign: an ellipse adds its two terms, a hyperbola subtracts them, and that one change splits the closed oval into two open pieces.",
      },
      {
        text: "Because the $x^2$ term is the **positive** one, these branches open left and right. Take $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$. Setting $y = 0$ gives $x^2 = 9$, so $x = \\pm 3$. Those two turning points $(\\pm 3, 0)$ are the **vertices**, and the segment joining them, along the $x$-axis here, is the **transverse axis**.",
        add: { verts: true },
      },
      {
        text: "So $a = \\sqrt{9} = 3$ is the distance from the center out to each vertex. The branches curve away from the vertices and never come back together. There is no top or bottom point the way an ellipse has, because a hyperbola is open.",
      },
    ],
    practice:
      "Read a hyperbola like this: the minus sign means two branches, the positive term's variable is the opening direction, and the vertices sit at distance $a$ along that axis.",
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
        text: "Which way a hyperbola opens is set entirely by **which squared term is positive**. If $x^2$ is the positive term, the branches open left and right. If $y^2$ is the positive term, they open up and down. The variable with the plus sign points the way.",
      },
      {
        text: "Swap the signs to get $\\frac{y^2}{9} - \\frac{x^2}{16} = 1$. Now $y^2$ is positive, so the branches open **up and down**. Setting $x = 0$ gives $y^2 = 9$, so the vertices are $(0, \\pm 3)$ and the transverse axis is vertical.",
        add: { verts: true },
      },
      {
        text: "Make sure to read the sign, not the size of the numbers. Both equations here use a $9$ and a $16$, but the plus moved from $x^2$ to $y^2$, and that alone tipped the opening from sideways to up and down.",
      },
    ],
    practice:
      "To find the opening direction, look for the positive squared term. Positive $x^2$ opens left-right, positive $y^2$ opens up-down.",
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
    title: "a lives under the plus sign",
    mode: "vertexrule",
    hideSliders: true,
    baseReveal: { dock: true, curve: true, verts: true },
    beats: [
      {
        text: "Here is the trap to avoid. With an ellipse you found $a$ under the **larger** denominator. With a hyperbola, $a$ is the number under the **positive** term, whether or not it is the larger one.",
      },
      {
        text: "Look again at $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$. The positive term is $x^2$ with denominator $9$, so $a = \\sqrt{9} = 3$, even though $16$ is bigger. The vertices are $(\\pm 3, 0)$. The $16$ under $y^2$ is $b^2$, and it does not give a vertex at all.",
      },
      {
        text: "In fact this hyperbola never touches the $y$-axis. Set $x = 0$ and you get $-\\frac{y^2}{16} = 1$, which has no real solution. So make sure to grab $a$ from under the plus sign, then plot the two vertices on the transverse axis.",
      },
    ],
    practice:
      "For a hyperbola, take $a$ from the positive term (not the larger denominator), and remember only the transverse axis has vertices.",
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
    title: "Reading an up-and-down hyperbola",
    mode: "read",
    hideSliders: true,
    baseReveal: { dock: true, curve: true, verts: true },
    beats: [
      {
        text: "Try a fresh one, $\\frac{y^2}{4} - \\frac{x^2}{9} = 1$. **Step one**, find the positive term. It is $y^2$, so the branches open up and down and the transverse axis is vertical.",
      },
      {
        text: "**Step two**, read $a$ from under that positive term: $a = \\sqrt{4} = 2$. The vertices sit on the vertical transverse axis at $(0, \\pm 2)$. The $9$ under $x^2$ is $b^2$ and steers the branch shape, but it gives no vertex.",
      },
      {
        text: "So the whole read-off is two steps. Find the plus sign to get the direction, then square-root its denominator to get the vertex distance $a$. Everything else is the second denominator $b^2$.",
      },
    ],
    practice:
      "Two steps every time: the positive term gives the opening direction, and the square root of its denominator gives $a$ and the vertices.",
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
        text: "Your hyperbola is $\\frac{x^2}{a^2} - \\frac{y^2}{16} = 1$, so it opens left and right with $b = 4$ fixed. The $a$ slider sets how far the vertices sit from the center. Right now $a = 1$, so the vertices are tucked in at $(\\pm 1, 0)$.",
      },
      {
        text: "Slide $a$ out to $5$. The vertices march out to $(\\pm 5, 0)$ and the branches move apart with them. The vertex distance is exactly $a$.",
        to: { a: 5 },
        ms: 2200,
      },
      {
        text: "Pull $a$ back to $2$. The vertices return to $(\\pm 2, 0)$. Wherever you set $a$, the vertices land at $(\\pm a, 0)$ on the transverse axis.",
        to: { a: 2 },
        ms: 2000,
      },
    ],
    practice:
      "Drag the $a$ slider and watch the two vertices slide along the $x$-axis. Set the vertices exactly where the question asks.",
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
