import type { ParamSpec, Slide } from "../types";

/** Slider units per world unit (kept in sync with Figure.SCALE). */
const S = 20;

const magParam = (start: number): ParamSpec => ({
  key: "mag",
  label: "Magnitude |v|",
  min: 20,
  max: 100,
  start,
  step: 5,
  format: (v) => `|v| = ${(v / S).toFixed(1)}`,
});

const dirParam = (start: number): ParamSpec => ({
  key: "dir",
  label: "Direction \u03b8",
  min: 0,
  max: 360,
  start,
  step: 5,
  format: (v) => `\u03b8 = ${Math.round(v)}\u00b0`,
});

const compParam = (key: string, label: string, start: number): ParamSpec => ({
  key,
  label,
  min: -100,
  max: 100,
  start,
  step: 5,
  format: (v) => `${label} = ${(v / S).toFixed(1)}`,
});

export const slides: Slide[] = [
  {
    id: "magnitude-direction",
    title: "What two facts describe a vector?",
    mode: "single",
    params: [magParam(60), dirParam(25)],
    baseReveal: { readout: false, angle: true },
    beats: [
      {
        text: "A **vector** is an arrow. It has two independent facts: a **magnitude** (how long it is) and a **direction** (which way it points).",
      },
      {
        text: "As the **magnitude** increases, only the length grows while the direction stays fixed.",
        to: { mag: 100 },
        ms: 1500,
        add: { readout: true },
      },
      {
        text: "As the magnitude decreases, the arrow shortens while keeping the same direction.",
        to: { mag: 45 },
        ms: 1400,
      },
      {
        text: "Now the **direction** changes instead, and the arrow rotates while its length holds steady.",
        to: { dir: 130 },
        ms: 2000,
      },
      {
        text: "Rotating further into the third quadrant changes the heading, yet the magnitude stays exactly the same.",
        to: { dir: 235 },
        ms: 2000,
      },
    ],
    practice: "Point the vector straight up, to $\\theta = 90^\\circ$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Point the vector straight up, direction $\\theta = 90^\\circ$, where the horizontal part is zero.",
        hint: "Straight up means all of the length is vertical.",
        success: "At $\\theta = 90^\\circ$ the arrow lies along $+y$, so $v_x = |v|\\cos 90^\\circ = 0$.",
        check: (_value, values) => {
          const a = ((values.dir ?? 0) * Math.PI) / 180;
          return Math.abs(Math.cos(a)) < 0.06 && Math.sin(a) > 0;
        },
      },
      {
        kind: "choice",
        prompt: "A vector with components $(v_x, v_y)$ has magnitude",
        options: ["$v_x + v_y$", "$\\sqrt{v_x^2 + v_y^2}$", "$v_x \\cdot v_y$"],
        answer: 1,
        hint: "The components are the legs of a right triangle. The magnitude is its hypotenuse.",
        success: "Magnitude is the hypotenuse of the component triangle: $|v| = \\sqrt{v_x^2 + v_y^2}$.",
      },
    ],
  },
  {
    id: "components",
    title: "How to split a vector into components",
    mode: "components",
    params: [compParam("vx", "v\u2093", 60), compParam("vy", "v\u1d67", 40)],
    baseReveal: { components: false, magnitude: false },
    beats: [
      {
        text: "A vector on the grid has two **components**: its horizontal part $v_x$ and its vertical part $v_y$.",
      },
      {
        text: "Each component reads straight off the axes, where $v_x$ is the run across and $v_y$ is the rise up. Together they fix the position of the tip.",
        add: { components: true },
      },
      {
        text: "The two components are the legs of a right triangle, and the vector is the hypotenuse: $|v| = \\sqrt{v_x^2 + v_y^2}$.",
        add: { magnitude: true },
      },
      {
        text: "As the tip moves to the left, $v_x$ turns **negative**, yet the length $|v|$ stays positive.",
        to: { vx: -70 },
        ms: 1800,
      },
      {
        text: "Moving back into the first quadrant makes both components positive again.",
        to: { vx: 60 },
        ms: 1400,
      },
    ],
    practice: "Place the tip in the second quadrant, with $v_x < 0$ and $v_y > 0$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Put the tip in the **second quadrant**: make $v_x$ negative while $v_y$ stays positive.",
        hint: "Left of the $y$-axis and above the $x$-axis.",
        success: "With $v_x < 0$ and $v_y > 0$ the vector points up and to the left, into the second quadrant.",
        check: (_value, values) => (values.vx ?? 0) < -10 && (values.vy ?? 0) > 10,
      },
      {
        kind: "choice",
        prompt: "If $v_x = 3$ and $v_y = 4$, then $|v|$ equals",
        options: ["$7$", "$5$", "$12$"],
        answer: 1,
        hint: "Use $\\sqrt{3^2 + 4^2}$.",
        success: "$\\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$: the classic 3-4-5 right triangle.",
      },
    ],
  },
  {
    id: "adding-tip-to-tail",
    title: "How to add two vectors",
    mode: "add",
    params: [compParam("bx", "b\u2093", 20), compParam("by", "b\u1d67", 40)],
    baseReveal: { drawA: false, drawB: false, drawSum: false },
    beats: [
      {
        text: "To add $a = (3, 1)$ and $b = (1, 2)$, place them **tip to tail**. First $a$ is drawn from the origin.",
        draw: true,
        ms: 1000,
        add: { drawA: true },
      },
      {
        text: "Now $b$ is drawn starting exactly where $a$ ends: its tail is on the **tip of** $a$.",
        draw: true,
        ms: 1000,
        add: { drawB: true },
      },
      {
        text: "The **resultant** $a + b$ is the single arrow from the tail of $a$ straight to the tip of $b$.",
        draw: true,
        ms: 1100,
        add: { drawSum: true },
      },
      {
        text: "Componentwise, addition adds the matching parts: $a + b = (3 + 1,\\ 1 + 2) = (4, 3)$. As $b$ moves, the resultant follows.",
        to: { bx: -40, by: 60 },
        ms: 2000,
      },
      {
        text: "Returning $b$ to $(1, 2)$ sends the sum back to $a + b = (4, 3)$.",
        to: { bx: 20, by: 40 },
        ms: 1600,
      },
      {
        text: "Now $b$ rests at $(2, 1)$, off to one side, so the sum is at $(5, 2)$.",
        to: { bx: 40, by: 20 },
        ms: 1500,
      },
    ],
    practice: "Set $b = (1, 2)$ so that $a + b = (4, 3)$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Set $b = (1, 2)$ so that $a + b = (4, 3)$.",
        hint: "With $a = (3, 1)$ fixed, you need $b_x = 1$ and $b_y = 2$.",
        success: "With $b = (1, 2)$ the tip-to-tail chain lands at $(4, 3)$, the resultant $a + b$.",
        check: (_value, values) => Math.abs((values.bx ?? 0) - 20) < 6 && Math.abs((values.by ?? 0) - 40) < 6,
      },
      {
        kind: "choice",
        prompt: "Placed tip to tail, the resultant runs from",
        options: ["the tip of $a$ to the tip of $b$", "the tail of the first to the tip of the last", "the origin to the tail of $a$"],
        answer: 1,
        hint: "It is the direct shortcut spanning the whole chain.",
        success: "The resultant spans the chain: from the tail of the first vector to the tip of the last.",
      },
    ],
  },
  {
    id: "subtracting-vectors",
    title: "How to subtract one vector from another",
    mode: "subtract",
    params: [compParam("bx", "b\u2093", 40), compParam("by", "b\u1d67", 60)],
    baseReveal: { drawA: false, showB: false, drawNegB: false, drawDiff: false },
    beats: [
      {
        text: "Subtraction is addition of the opposite: $a - b = a + (-b)$. Again $a = (3, 1)$ is drawn first from the origin.",
        draw: true,
        ms: 1000,
        add: { drawA: true },
      },
      {
        text: "The faint arrow shows $b = (2, 3)$ from the tip of $a$. To subtract it, we **reverse** it.",
        add: { showB: true },
      },
      {
        text: "Reversing $b$ gives $-b = (-2, -3)$, the same length in the opposite direction, drawn tip to tail from the end of $a$.",
        draw: true,
        ms: 1100,
        add: { drawNegB: true },
      },
      {
        text: "The difference $a - b$ runs from the tail of $a$ to the tip of $-b$: $a - b = (3 - 2,\\ 1 - 3) = (1, -2)$.",
        draw: true,
        ms: 1100,
        add: { drawDiff: true },
      },
      {
        text: "So $a - b$ is $a$ plus the reverse of $b$, which is the whole rule for vector subtraction.",
      },
    ],
    practice: "Set $b = a = (3, 1)$ so that $a - b = (0, 0)$.",
    questions: [
      {
        kind: "choice",
        prompt: "Subtracting vectors, $a - b$ is the same as",
        options: ["$a + (-b)$", "$b - a$", "$a + b$"],
        answer: 0,
        hint: "Subtracting a vector means adding its reverse.",
        success: "$a - b = a + (-b)$: reverse $b$, then add it tip to tail.",
      },
      {
        kind: "manipulate",
        prompt: "Make $a - b = (0, 0)$ by choosing $b = a = (3, 1)$.",
        hint: "The difference is zero exactly when $b$ equals $a$.",
        success: "With $b = a$, the reverse of $b$ cancels $a$, so $a - b = (0, 0)$.",
        check: (_value, values) => Math.abs((values.bx ?? 0) - 60) < 8 && Math.abs((values.by ?? 0) - 20) < 8,
      },
    ],
  },
  {
    id: "resultant-magnitude",
    title: "How long is the resultant, and where does it point?",
    mode: "resultant",
    params: [compParam("rx", "v\u2093", 80), compParam("ry", "v\u1d67", 60)],
    baseReveal: { triangle: false, magnitude: false, angle: false },
    beats: [
      {
        text: "A resultant is a vector too, so it also has a **magnitude** and a **direction**. Consider the sum $v = (4, 3)$.",
        add: { triangle: true },
      },
      {
        text: "Its components are the legs of a right triangle: $v_x = 4$ across and $v_y = 3$ up.",
      },
      {
        text: "The length is the hypotenuse: $|v| = \\sqrt{4^2 + 3^2} = \\sqrt{25} = 5$.",
        add: { magnitude: true },
      },
      {
        text: "The direction is $\\theta = \\tan^{-1}(v_y / v_x) = \\tan^{-1}(3/4) \\approx 36.9^\\circ$, measured from the $x$-axis.",
        add: { angle: true },
      },
      {
        text: "The tip now rests at $(2, 4)$, a different resultant whose magnitude is $\\sqrt{20} \\approx 4.47$.",
        to: { rx: 40, ry: 80 },
        ms: 1500,
      },
    ],
    practice: "Drag the tip to $(4, 3)$, where the magnitude is $5$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Drag the tip to $(4, 3)$, the resultant whose magnitude is exactly $5$.",
        hint: "Four units across, three units up.",
        success: "At $(4, 3)$ the magnitude is $\\sqrt{4^2 + 3^2} = 5$, a 3-4-5 right triangle.",
        check: (_value, values) => Math.abs((values.rx ?? 0) - 80) < 8 && Math.abs((values.ry ?? 0) - 60) < 8,
      },
      {
        kind: "choice",
        prompt: "The magnitude of $(4, 3)$ is $\\sqrt{4^2 + 3^2}$, which equals",
        options: ["$5$", "$7$", "$25$"],
        answer: 0,
        hint: "$\\sqrt{16 + 9} = \\sqrt{25}$.",
        success: "$\\sqrt{16 + 9} = \\sqrt{25} = 5$.",
      },
    ],
  },
];
