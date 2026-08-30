import type { ParamSpec, Slide } from "../types";

/** One integer slider, value -100..100, mapped to real t = value / 50 in [-2, 2]. */
const tParam = (start: number): ParamSpec => ({
  key: "t",
  label: "Parameter t",
  min: -100,
  max: 100,
  start,
  step: 5,
  format: (v) => `t = ${(v / 50).toFixed(2)}`,
});

export const slides: Slide[] = [
  {
    id: "read-into-a-table",
    title: "One parameter, a point",
    mode: "table",
    params: [tParam(0)],
    hideSliders: true,
    baseReveal: { dock: true },
    beats: [
      {
        text: "Until now a graph gave $y$ as a **function of** $x$: one input, one output. A **parametric** curve works differently. A third variable, the **parameter** $t$, feeds **both** coordinates at once: $$x = x(t), \\quad y = y(t)$$ Choose a value of $t$, put it into both formulas, and out comes a single point $(x, y)$.",
      },
      {
        text: "Our running example is $x(t) = t^2 - 1$ and $y(t) = t$. Build a **table** with three columns, $t$, $x$, and $y$, and pick $t$ in increasing order. At $t = -1$: $x = (-1)^2 - 1 = 0$ and $y = -1$, giving $(0, -1)$. At $t = 0$: $x = 0^2 - 1 = -1$ and $y = 0$, giving $(-1, 0)$, the leftmost point.",
        add: { samples: true },
      },
      {
        text: "Every row is the same move: choose $t$, compute $x$, compute $y$, then plot the pair $(x, y)$. The parameter $t$ is not one of the axes, it is the input you feed in to get each point.",
      },
    ],
    practice: "Read $x(t) = t^2 - 1$ and $y(t) = t$ at the value asked, then click where the point lands.",
    questions: [
      {
        kind: "plot",
        prompt:
          "Add the next row yourself. At $t = 1$: compute $x = 1^2 - 1$ and $y = 1$, then click the point $(x, y)$.",
        hint: "$x = 1 - 1 = 0$ and $y = 1$, so aim for $(0, 1)$.",
        success: "At $t = 1$ the point is $(0, 1)$, one step above the vertex.",
        target: { x: 0, y: 1 },
        tolerance: 0.6,
        label: "t = 1",
      },
      {
        kind: "choice",
        prompt: "To find the point for a value of $t$, what do you do?",
        options: [
          "Plug $t$ into both $x(t)$ and $y(t)$, then plot the pair $(x, y)$",
          "Plug $t$ into $x(t)$ only, then plot $(t, x)$",
          "Average $x(t)$ and $y(t)$ to get one number",
        ],
        answer: 0,
        hint: "Both coordinates depend on the same $t$.",
        success:
          "Right: substitute $t$ into both formulas, then plot $(x, y)$. The value of $t$ itself is never plotted on an axis.",
      },
    ],
  },
  {
    id: "connect-in-order",
    title: "Connect in order of t",
    mode: "connect",
    params: [tParam(-100)],
    baseReveal: { dock: true, table: true, samples: true },
    beats: [
      {
        text: "Finish the table. At $t = -2$: $x = (-2)^2 - 1 = 3$ and $y = -2$, giving $(3, -2)$. At $t = 2$: $x = 3$ and $y = 2$, giving $(3, 2)$. That is five points in all: $(3, -2)$, $(0, -1)$, $(-1, 0)$, $(0, 1)$, $(3, 2)$.",
      },
      {
        text: "Here is the key step. **Connect the points in order of increasing $t$**, not left to right across the page. Start at the smallest $t$ and move up the table: $t = -2$, then $-1$, then $0$, then $1$, then $2$.",
        add: { curve: true },
      },
      {
        text: "Watch a single point travel that order and it sweeps out the whole curve, from the bottom row to the top.",
        to: 100,
        ms: 2600,
        add: { point: true, trace: true },
      },
      {
        text: "The result is a **parabola opening to the right**, with its vertex at $(-1, 0)$. It is **not** the graph of a function of $x$: the vertical line $x = 3$ meets it at both $(3, -2)$ and $(3, 2)$.",
      },
    ],
    practice: "Answer how the plotted points join into a single curve.",
    questions: [
      {
        kind: "choice",
        prompt: "In what order do you connect the plotted points?",
        options: [
          "Left to right, smallest $x$ first",
          "In order of increasing $t$",
          "Top to bottom, largest $y$ first",
        ],
        answer: 1,
        hint: "The table was built with $t$ increasing. Follow that same order.",
        success:
          "Right: join the points in order of increasing $t$. Connecting by $x$ or $y$ instead would draw the wrong path.",
      },
      {
        kind: "choice",
        prompt: "Why is this curve not the graph of a function of $x$?",
        options: [
          "The vertical line $x = 3$ meets it twice, at $(3, -2)$ and $(3, 2)$",
          "Because it has a vertex",
          "Because the parameter $t$ is sometimes negative",
        ],
        answer: 0,
        hint: "A function of $x$ passes the vertical line test: one $y$ for each $x$.",
        success:
          "Right: one $x$ (like $x = 3$) comes from two different $t$-values, so a vertical line hits the curve twice. Parametric curves can do this.",
      },
    ],
  },
  {
    id: "orientation",
    title: "Orientation is direction",
    mode: "orient",
    params: [tParam(-100)],
    baseReveal: { dock: true, table: true, samples: true, curve: true, point: true },
    beats: [
      {
        text: "A parametric curve carries something a plain graph does not: an **orientation**, the direction the point travels as $t$ **increases**. We mark it with small **arrows** along the curve.",
        add: { orient: true },
      },
      {
        text: "For our curve $y = t$, so as $t$ climbs from $-2$ up to $2$ the point moves **upward**, from $(3, -2)$ at the bottom to $(3, 2)$ at the top. The arrows point the same way.",
        to: 100,
        ms: 2800,
        add: { trace: true },
      },
      {
        text: "Because $t$ often stands for **time**, orientation reads as the direction of motion. Swap in $y = -t$ and you would trace the very **same parabola** the opposite way, top to bottom. Same picture, reversed orientation.",
      },
    ],
    practice: "Answer what the orientation arrows tell you about the curve.",
    questions: [
      {
        kind: "choice",
        prompt: "As $t$ increases from $-2$ to $2$, which way does the point on $x = t^2 - 1$, $y = t$ travel?",
        options: [
          "Upward, because $y = t$ increases with $t$",
          "Downward, because the parabola opens right",
          "It stays in one place",
        ],
        answer: 0,
        hint: "Track $y = t$ as $t$ grows.",
        success: "Right: $y = t$ rises with $t$, so the point climbs from the bottom of the curve to the top.",
      },
      {
        kind: "choice",
        prompt: "What do the orientation arrows on a parametric curve show?",
        options: [
          "The direction of travel as $t$ increases",
          "Where the curve is steepest",
          "The $x$-intercepts of the curve",
        ],
        answer: 0,
        hint: "Orientation is about motion, not slope.",
        success: "Right: the arrows record the direction the point moves as $t$ increases, the curve's orientation.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn",
    mode: "practice",
    params: [tParam(25)],
    baseReveal: { dock: true, curve: true, point: true, components: true, orient: true, trace: true },
    beats: [
      {
        text: "Now it is your turn. Think of $t$ as a clock. As $t$ advances, the point rides along the curve while the dashed drops read its position: $x$ down to the horizontal axis and $y$ across to the vertical axis.",
        to: 100,
        ms: 2400,
      },
      {
        text: "Here the point rests partway along, near $t = 0.5$. Steer the parameter to each target below.",
        to: 25,
        ms: 1800,
      },
    ],
    practice: "Slide $t$ to ride the point along the curve, or click where a value of $t$ lands, then answer.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Slide $t$ until the point reaches the top of the curve, $(3, 2)$.",
        hint: "The top is at $t = 2$, since $y = t$. Move the slider until it reads $t = 2.00$.",
        success: "At $t = 2$, $x = 2^2 - 1 = 3$ and $y = 2$, exactly the top point $(3, 2)$.",
        check: (value) => Math.abs(value / 50 - 2) < 0.08,
      },
      {
        kind: "plot",
        prompt:
          "Click the point at $t = -2$, the bottom of the curve. Check: $x = (-2)^2 - 1 = 3$ and $y = -2$.",
        hint: "$x = 4 - 1 = 3$ and $y = -2$, so aim for $(3, -2)$.",
        success: "At $t = -2$ the point is $(3, -2)$, the start of the curve at the bottom.",
        target: { x: 3, y: -2 },
        tolerance: 0.6,
        label: "t = -2",
      },
      {
        kind: "choice",
        prompt: "A classmate connects the five points left to right and gets a different shape. What did they skip?",
        options: [
          "Connecting the points in order of increasing $t$",
          "Plugging $t$ into both equations",
          "Writing the vertex first",
        ],
        answer: 0,
        hint: "The order the points join in comes from the parameter, not the $x$-values.",
        success:
          "Right: the points must be joined in order of increasing $t$. Left-to-right ignores the orientation and draws the wrong curve.",
      },
    ],
  },
];
