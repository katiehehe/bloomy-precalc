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
    title: "Each value of $t$ determines a point",
    mode: "table",
    params: [tParam(0)],
    hideSliders: true,
    baseReveal: { dock: true },
    beats: [
      {
        text: "A graph of $y$ as a function of $x$ has one input and one output. A **parametric** curve is different: both coordinates are functions of a third variable, the **parameter** $t$. The same value of $t$ feeds both formulas at once, $$x = x(t), \\quad y = y(t)$$ so substituting one number for $t$ produces one point $(x, y)$.",
      },
      {
        text: "The running example is $x(t) = t^2 - 1$ and $y(t) = t$. At $t = 0$, both formulas run on that same input: $x = 0^2 - 1 = -1$ and $y = 0$, so the point is $(-1, 0)$. At $t = -1$, $x = (-1)^2 - 1 = 0$ and $y = -1$, giving $(0, -1)$.",
        add: { samples: true },
      },
      {
        text: "Those pairs fill a **table** of $t$, $x$, and $y$. Every later row repeats the same move: choose $t$, substitute into both formulas, and plot $(x, y)$. The parameter $t$ is the input that generates each point, not a coordinate on an axis.",
      },
    ],
    practice: "Read $x(t) = t^2 - 1$ and $y(t) = t$ at the value asked, then click where the point lands.",
    questions: [
      {
        kind: "plot",
        prompt:
          "Add the next row. At $t = 1$, compute $x = 1^2 - 1$ and $y = 1$, then click the point $(x, y)$.",
        hint: "$x = 1 - 1 = 0$ and $y = 1$, so aim for $(0, 1)$.",
        success: "At $t = 1$ the point is $(0, 1)$, one step above the vertex.",
        target: { x: 0, y: 1 },
        tolerance: 0.6,
        label: "t = 1",
      },
      {
        kind: "choice",
        prompt: "To find the point for a given value of $t$, what do you do?",
        options: [
          "Substitute $t$ into both $x(t)$ and $y(t)$, then plot the pair $(x, y)$",
          "Substitute $t$ into $x(t)$ only, then plot $(t, x)$",
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
    title: "The points connect in order of $t$",
    mode: "connect",
    params: [tParam(-100)],
    baseReveal: { dock: true, table: true, samples: true },
    beats: [
      {
        text: "At $t = -2$, $x = (-2)^2 - 1 = 3$ and $y = -2$, giving $(3, -2)$. At $t = 2$, $x = 3$ and $y = 2$, giving $(3, 2)$, so the table now holds five points.",
      },
      {
        text: "The points must be **connected in order of increasing $t$**, not left to right across the page. The path begins at the smallest value $t = -2$ and moves up the table through $t = -1$, $0$, $1$, and finally $2$.",
        add: { curve: true },
      },
      {
        text: "A single point moving through that order sweeps out the whole curve, from the bottom row to the top.",
        to: 100,
        ms: 2600,
        add: { point: true, trace: true },
      },
      {
        text: "The result is a **parabola opening to the right**, with its vertex at $(-1, 0)$. It is **not** the graph of a function of $x$, because the vertical line $x = 3$ meets it at both $(3, -2)$ and $(3, 2)$.",
      },
    ],
    practice: "",
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
          "Right: one $x$ (like $x = 3$) comes from two different $t$-values, so a vertical line hits the curve twice. Parametric curves can behave this way.",
      },
    ],
  },
  {
    id: "x-y-relationship",
    title: "How to write a parametric curve as one equation in $x$ and $y$",
    mode: "connect",
    params: [tParam(25)],
    hideSliders: true,
    baseReveal: { dock: true, table: true, samples: true, curve: true },
    beats: [
      {
        text: "The two formulas can be combined into a single equation that relates $x$ and $y$ with no parameter left. On this curve the second formula is just $y = t$, so the parameter and the $y$-coordinate are the same number.",
      },
      {
        text: "Because $t = y$, replace every $t$ in $x = t^2 - 1$ with $y$. Removing the parameter this way leaves one Cartesian equation for the same curve: $$x = y^2 - 1$$",
      },
      {
        text: "The equation $x = y^2 - 1$ is a parabola opening to the right, because it writes $x$ from $y$. By contrast $y = x^2$ writes $y$ from $x$ and opens upward. The vertex here is shifted to $(-1, 0)$.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Eliminating $t$ from $x = t^2 - 1$ and $y = t$ gives which single equation?",
        options: [
          "$x = y^2 - 1$",
          "$y = x^2 - 1$",
          "It cannot be done, because $t$ has no fixed value",
        ],
        answer: 0,
        hint: "Use $y = t$ to replace $t$ in the first formula.",
        success:
          "Right: since $y = t$, substituting $t = y$ into $x = t^2 - 1$ gives $x = y^2 - 1$.",
      },
      {
        kind: "choice",
        prompt: "Which way does $x = y^2 - 1$ open, and where is its vertex?",
        options: [
          "To the right, with vertex $(-1, 0)$",
          "Upward, with vertex $(0, -1)$",
          "To the left, with vertex $(1, 0)$",
        ],
        answer: 0,
        hint: "The value of $x$ is smallest when $y = 0$.",
        success:
          "Right: $x = y^2 - 1$ is smallest at $y = 0$, where $x = -1$, and $x$ grows as $|y|$ increases, so it opens to the right from the vertex $(-1, 0)$.",
      },
    ],
  },
  {
    id: "orientation",
    title: "What is orientation?",
    mode: "orient",
    params: [tParam(-100)],
    baseReveal: { dock: true, table: true, samples: true, curve: true, point: true },
    beats: [
      {
        text: "A parametric curve has something a plain graph does not: an **orientation**, the direction the point travels as $t$ **increases**. Small **arrows** along the curve mark that direction.",
        add: { orient: true },
      },
      {
        text: "Because $y = t$ on this curve, the point moves **upward** as $t$ increases from $-2$ to $2$, traveling from $(3, -2)$ at the bottom to $(3, 2)$ at the top. The arrows point the same way.",
        to: 100,
        ms: 2800,
        add: { trace: true },
      },
      {
        text: "Because $t$ often represents **time**, the orientation reads as the direction of motion. Replacing $y = t$ with $y = -t$ traces the very **same parabola** in the opposite direction, from top to bottom, so the picture is identical while the orientation reverses.",
      },
    ],
    practice: "",
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
    title: "Your turn: plot a parametric point",
    mode: "practice",
    params: [tParam(25)],
    baseReveal: { dock: true, curve: true, point: true, components: true, orient: true, trace: true },
    beats: [
      {
        text: "Now it is your turn. As $t$ advances, the point moves along the curve while the dashed segments read $x$ down to the horizontal axis and $y$ across to the vertical axis.",
        to: 100,
        ms: 2400,
      },
      {
        text: "The point now rests partway along the curve, near $t = 0.5$.",
        to: 25,
        ms: 1800,
      },
    ],
    practice: "Slide $t$ to move the point along the curve.",
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
          "Substituting $t$ into both equations",
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
