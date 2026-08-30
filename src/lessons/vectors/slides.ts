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
    title: "What information does a vector carry?",
    mode: "single",
    params: [magParam(60), dirParam(25)],
    baseReveal: { readout: false, angle: true },
    beats: [
      {
        text: "A **vector** is an arrow. It carries two independent facts: a **magnitude** (how long it is) and a **direction** (which way it points).",
      },
      {
        text: "Stretch the **magnitude** and only the length grows. The direction stays fixed.",
        to: { mag: 100 },
        ms: 1500,
        add: { readout: true },
      },
      {
        text: "Shrink it back down. Same direction, shorter arrow.",
        to: { mag: 45 },
        ms: 1400,
      },
      {
        text: "Now swing the **direction**. The arrow rotates while its length holds steady.",
        to: { dir: 130 },
        ms: 2000,
      },
      {
        text: "Point it into the third quadrant. The heading changed, but the magnitude is exactly the same.",
        to: { dir: 235 },
        ms: 2000,
      },
    ],
    practice: "Drag the tip, or use the sliders, to change the magnitude and direction on their own.",
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
    title: "How do we split a vector into parts?",
    mode: "components",
    params: [compParam("vx", "v\u2093", 60), compParam("vy", "v\u1d67", 40)],
    baseReveal: { components: false, magnitude: false },
    beats: [
      {
        text: "Drop a vector on the grid. Its **components** are its horizontal part $v_x$ and its vertical part $v_y$.",
      },
      {
        text: "Read them straight off the axes: $v_x$ is the run across, $v_y$ is the rise up. Together they pin down the tip.",
        add: { components: true },
      },
      {
        text: "The two components are the legs of a right triangle, and the vector is the hypotenuse: $|v| = \\sqrt{v_x^2 + v_y^2}$.",
        add: { magnitude: true },
      },
      {
        text: "Slide the tip to the left and $v_x$ turns **negative**, yet the length $|v|$ stays positive.",
        to: { vx: -70 },
        ms: 1800,
      },
      {
        text: "Bring it back to the first quadrant, where both components are positive again.",
        to: { vx: 60 },
        ms: 1400,
      },
    ],
    practice: "Drag the tip and watch $v_x$, $v_y$, and $|v|$ update together.",
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
    title: "How do we add two vectors?",
    mode: "add",
    params: [compParam("bx", "b\u2093", 20), compParam("by", "b\u1d67", 40)],
    baseReveal: { drawA: false, drawB: false, drawSum: false },
    beats: [
      {
        text: "To add $a = (3, 1)$ and $b = (1, 2)$, place them **tip to tail**. Watch $a$ get drawn first, from the origin.",
        draw: true,
        ms: 1000,
        add: { drawA: true },
      },
      {
        text: "Now $b$ is drawn starting exactly where $a$ ends: its tail sits on the **tip of** $a$.",
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
        text: "Componentwise you just add the parts: $a + b = (3 + 1,\\ 1 + 2) = (4, 3)$. Move $b$ and the resultant follows.",
        to: { bx: -40, by: 60 },
        ms: 2000,
      },
      {
        text: "Back to $b = (1, 2)$, so the sum returns to $a + b = (4, 3)$.",
        to: { bx: 20, by: 40 },
        ms: 1600,
      },
      {
        text: "Now $b$ rests at $(2, 1)$, off to one side, so the sum sits at $(5, 2)$.",
        to: { bx: 40, by: 20 },
        ms: 1500,
      },
    ],
    practice: "Drag the tip of $b$ (or use the sliders) and watch $a + b$ swing and stretch.",
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
    title: "How do we subtract one vector from another?",
    mode: "subtract",
    params: [compParam("bx", "b\u2093", 40), compParam("by", "b\u1d67", 60)],
    baseReveal: { drawA: false, showB: false, drawNegB: false, drawDiff: false },
    beats: [
      {
        text: "Subtracting is just adding the opposite: $a - b = a + (-b)$. Start again by drawing $a = (3, 1)$.",
        draw: true,
        ms: 1000,
        add: { drawA: true },
      },
      {
        text: "Here is $b = (2, 3)$, shown faint from the tip of $a$. To subtract it, we **reverse** it.",
        add: { showB: true },
      },
      {
        text: "Flip $b$ into $-b = (-2, -3)$: same length, opposite direction, drawn tip to tail from the end of $a$.",
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
        text: "So $a - b$ is just $a$ plus the reverse of $b$. Drag the tip of the difference to explore.",
      },
    ],
    practice: "Drag the tip of the difference (or use the sliders) and watch $-b$ and $a - b$ update together.",
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
        text: "A resultant is a vector too, so it also has a **magnitude** and a **direction**. Take the sum $v = (4, 3)$.",
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
    practice: "Drag the tip and watch the magnitude $\\sqrt{v_x^2 + v_y^2}$ and angle change.",
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
