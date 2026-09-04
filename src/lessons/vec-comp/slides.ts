import type { ParamSpec, Slide } from "../types";

/** Slider units per world unit (kept in sync with Stage.SCALE). */
const S = 20;

/** The 3-4-5 direction angle, about 36.87 degrees (cos = 4/5, sin = 3/5). */
const DIR_345 = (Math.atan2(3, 4) * 180) / Math.PI;
/** The 4-3-5 direction angle, about 53.13 degrees (cos = 3/5, sin = 4/5). */
const DIR_435 = (Math.atan2(4, 3) * 180) / Math.PI;

const compParam = (key: string, label: string, start: number): ParamSpec => ({
  key,
  label,
  min: -100,
  max: 100,
  start,
  step: 5,
  format: (v) => `${label} = ${(v / S).toFixed(2)}`,
});

const magParam = (start: number): ParamSpec => ({
  key: "mag",
  label: "Magnitude |v|",
  min: 20,
  max: 100,
  start,
  step: 5,
  format: (v) => `|v| = ${(v / S).toFixed(2)}`,
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

export const slides: Slide[] = [
  {
    id: "component-form",
    title: "Component form",
    mode: "comp",
    params: [compParam("vx", "v\u2093", 80), compParam("vy", "v\u1d67", 60)],
    hideSliders: true,
    baseReveal: { dock: true, legs: true },
    beats: [
      {
        text: "Every vector splits into two parts: a **horizontal component** $v_x$ and a **vertical component** $v_y$. They place the tip of the arrow at the point $(v_x, v_y)$. Here $v = (4, 3)$, so $v_x = 4$ across and $v_y = 3$ up.",
      },
      {
        text: "You will also see this written with angle brackets as $v = \\langle 4, 3 \\rangle$. The brackets are a reminder that this is a **vector**, an arrow with length and direction, not just a point sitting on the grid.",
      },
      {
        text: "The order is fixed, because the first number is always the horizontal part and the second is always the vertical part. Swapping them produces a different arrow, since $(3, 4)$ points more steeply up than $(4, 3)$.",
        to: { vx: 60, vy: 80 },
        ms: 2000,
      },
      {
        text: "Returning to $v = (4, 3)$, the components read directly off the grid, so component form names one arrow with exactly two numbers.",
        to: { vx: 80, vy: 60 },
        ms: 1600,
      },
    ],
    practice: "Click the tip of the vector asked.",
    questions: [
      {
        kind: "choice",
        prompt: "In the vector $v = (4, 3)$, which number is the vertical component $v_y$?",
        options: ["$3$", "$4$", "$7$", "$(4, 3)$"],
        answer: 0,
        hint: "The second entry is the vertical part, the rise up.",
        success: "Right: $v_y = 3$ is the vertical component. The first entry, $4$, is the horizontal one.",
      },
      {
        kind: "choice",
        prompt: "What does $v = \\langle -2, 5 \\rangle$ describe?",
        options: [
          "An arrow whose tip is $2$ units left and $5$ units up from its tail",
          "An arrow $2$ units right and $5$ units up",
          "An arrow $5$ units left and $2$ units up",
          "The single point where $x = -2$ and nothing else",
        ],
        answer: 0,
        hint: "First entry is horizontal (negative means left), second entry is vertical.",
        success: "Yes: $v_x = -2$ means $2$ units left, and $v_y = 5$ means $5$ units up.",
      },
      {
        kind: "plot",
        prompt: "Click the point that is the tip of the vector $v = (-2, 3)$.",
        target: { x: -2, y: 3 },
        tolerance: 0.6,
        label: "(-2, 3)",
        hint: "Two units left of the origin, three units up.",
        success: "Yes: the tip of $(-2, 3)$ sits two left and three up.",
      },
    ],
  },
  {
    id: "unit-vectors-ij",
    title: "The unit vectors i and j",
    mode: "ij",
    baseReveal: { dock: true },
    beats: [
      {
        text: "Two special vectors organize the whole plane. The **horizontal unit vector** $\\mathbf{i} = (1, 0)$ is one step to the right, and the **vertical unit vector** $\\mathbf{j} = (0, 1)$ is one step up. Each has length exactly $1$, which is why they are called unit vectors.",
        add: { basis: true },
      },
      {
        text: "Any vector can be built out of these two. To reach $v = (4, 3)$, walk **$4$ steps along $\\mathbf{i}$** and then **$3$ steps along $\\mathbf{j}$**. Written as a sum, that is $v = 4\\mathbf{i} + 3\\mathbf{j}$.",
        add: { combo: true },
      },
      {
        text: "In general $v = v_x\\mathbf{i} + v_y\\mathbf{j}$. This is called a **linear combination** of $\\mathbf{i}$ and $\\mathbf{j}$: the components $v_x$ and $v_y$ are just how many of each unit vector you add. Component form $(v_x, v_y)$ and $\\mathbf{i}, \\mathbf{j}$ form say exactly the same thing.",
      },
      {
        text: "So switching between the two forms is only a change of notation. The pair $(4, 3)$, the bracket $\\langle 4, 3 \\rangle$, and the sum $4\\mathbf{i} + 3\\mathbf{j}$ are three names for one arrow.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Write $v = (5, -2)$ in terms of $\\mathbf{i}$ and $\\mathbf{j}$.",
        options: ["$5\\mathbf{i} - 2\\mathbf{j}$", "$5\\mathbf{i} + 2\\mathbf{j}$", "$-2\\mathbf{i} + 5\\mathbf{j}$", "$5\\mathbf{j} - 2\\mathbf{i}$"],
        answer: 0,
        hint: "The horizontal component multiplies $\\mathbf{i}$, the vertical multiplies $\\mathbf{j}$, keeping the signs.",
        success: "Right: $v_x = 5$ and $v_y = -2$, so $v = 5\\mathbf{i} - 2\\mathbf{j}$.",
      },
      {
        kind: "choice",
        prompt: "What is the unit vector $\\mathbf{i}$?",
        options: ["$(1, 0)$", "$(0, 1)$", "$(1, 1)$", "A vector of length $0$"],
        answer: 0,
        hint: "It is one step along the positive horizontal axis.",
        success: "Yes: $\\mathbf{i} = (1, 0)$, pointing right with length $1$.",
      },
      {
        kind: "choice",
        prompt: "In $v = v_x\\mathbf{i} + v_y\\mathbf{j}$, what are $v_x$ and $v_y$?",
        options: [
          "The components: scalars saying how many $\\mathbf{i}$ and $\\mathbf{j}$ to add",
          "Two more vectors added on",
          "The magnitude and the direction angle",
          "The coordinates of the tail",
        ],
        answer: 0,
        hint: "They are plain numbers that scale the unit vectors.",
        success: "Right: $v_x$ and $v_y$ are scalar components, the amounts of $\\mathbf{i}$ and $\\mathbf{j}$.",
      },
    ],
  },
  {
    id: "unit-vector-direction",
    title: "The unit vector in v's direction",
    mode: "unit",
    baseReveal: { dock: true },
    beats: [
      {
        text: "Sometimes only the **direction** of a vector matters, with its length set aside. A **unit vector** serves this purpose, since it has length exactly $1$ and points the same way. We write the unit vector in $v$'s direction as $\\hat v$ (read '$v$ hat'), also often called $u$.",
        add: { showV: true },
      },
      {
        text: "To build it, divide the vector by its own length: $$\\hat v = \\frac{v}{|v|}$$ Dividing by $|v|$ shrinks (or grows) the arrow to length $1$ without turning it, because dividing every component by the same positive number keeps the direction.",
        add: { unit: true },
      },
      {
        text: "For $v = (3, 4)$, first find the length $|v| = \\sqrt{3^2 + 4^2} = 5$. Then divide each component by $5$: $\\hat v = \\dfrac{1}{5}(3, 4) = \\left(\\dfrac{3}{5}, \\dfrac{4}{5}\\right) = (0.6, 0.8)$.",
      },
      {
        text: "The result has length $1$, as a check confirms: $|\\hat v| = \\sqrt{0.6^2 + 0.8^2} = \\sqrt{0.36 + 0.64} = \\sqrt{1} = 1$. Make sure to divide by $|v|$, not by $|v|^2$, since dividing by the length once is exactly what rescales the arrow to $1$.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "How do you find the unit vector in the direction of a nonzero vector $v$?",
        options: [
          "Divide $v$ by its magnitude $|v|$",
          "Multiply $v$ by its magnitude $|v|$",
          "Subtract $|v|$ from $v$",
          "Divide $|v|$ by $v$",
        ],
        answer: 0,
        hint: "You want to rescale the length to $1$ while keeping the direction.",
        success: "Right: $\\hat v = v/|v|$, which sets the length to $1$.",
      },
      {
        kind: "choice",
        prompt: "For $v = (6, 8)$, with $|v| = 10$, the unit vector $\\hat v$ is:",
        options: ["$(0.6, 0.8)$", "$(6, 8)$", "$(0.8, 0.6)$", "$(3, 4)$"],
        answer: 0,
        hint: "Divide each component by $|v| = 10$.",
        success: "Yes: $\\dfrac{1}{10}(6, 8) = (0.6, 0.8)$, and it has length $1$.",
      },
      {
        kind: "choice",
        prompt: "What is the length of any unit vector?",
        options: ["$1$", "$0$", "It depends on the vector", "$|v|$"],
        answer: 0,
        hint: "The word unit is the clue.",
        success: "Right: every unit vector has length exactly $1$ by definition.",
      },
    ],
  },
  {
    id: "build-from-mag-dir",
    title: "Building a vector from a magnitude and a direction",
    mode: "build",
    params: [magParam(100), dirParam(DIR_345)],
    hideSliders: true,
    baseReveal: { dock: true },
    beats: [
      {
        text: "Now run the process in reverse: given a length and a heading, write the components. The unit vector in a direction $\\theta$ is $(\\cos\\theta, \\sin\\theta)$, a length-$1$ arrow at that angle. To reach any length, multiply that unit vector by the length.",
        add: { legs: true, angle: true },
      },
      {
        text: "So a vector of magnitude $|v|$ at angle $\\theta$ is: $$v = |v|(\\cos\\theta\\,\\mathbf{i} + \\sin\\theta\\,\\mathbf{j})$$ which is the same as scaling the unit direction vector up to length $|v|$. Its components are $v_x = |v|\\cos\\theta$ and $v_y = |v|\\sin\\theta$.",
      },
      {
        text: "Take $|v| = 5$ at $\\theta = 36.87^\\circ$, where $\\cos\\theta = 0.8$ and $\\sin\\theta = 0.6$. Then $v = 5(0.8\\,\\mathbf{i} + 0.6\\,\\mathbf{j}) = 4\\mathbf{i} + 3\\mathbf{j}$, so $v = (4, 3)$.",
      },
      {
        text: "Keep the length $5$ but rotate to $\\theta = 53.13^\\circ$, where $\\cos\\theta = 0.6$ and $\\sin\\theta = 0.8$. Now $v = 5(0.6\\,\\mathbf{i} + 0.8\\,\\mathbf{j}) = 3\\mathbf{i} + 4\\mathbf{j}$, so $v = (3, 4)$. The length is still $5$, but the direction has changed.",
        to: { dir: DIR_435 },
        ms: 2000,
      },
      {
        text: "Rotating to $\\theta = 90^\\circ$ points it straight up: since $\\cos 90^\\circ = 0$ and $\\sin 90^\\circ = 1$, $v = 5(0\\,\\mathbf{i} + 1\\,\\mathbf{j}) = 5\\mathbf{j}$, so $v = (0, 5)$. Scaling a unit direction this way builds a vector of any magnitude and heading.",
        to: { dir: 90 },
        ms: 2000,
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "How do you build a vector of magnitude $10$ pointing at $\\theta = 30^\\circ$?",
        options: [
          "$10(\\cos 30^\\circ\\,\\mathbf{i} + \\sin 30^\\circ\\,\\mathbf{j})$",
          "$10(\\sin 30^\\circ\\,\\mathbf{i} + \\cos 30^\\circ\\,\\mathbf{j})$",
          "$\\dfrac{\\cos 30^\\circ\\,\\mathbf{i} + \\sin 30^\\circ\\,\\mathbf{j}}{10}$",
          "$10 + \\cos 30^\\circ\\,\\mathbf{i} + \\sin 30^\\circ\\,\\mathbf{j}$",
        ],
        answer: 0,
        hint: "Scale the unit direction $(\\cos\\theta, \\sin\\theta)$ by the magnitude.",
        success: "Right: multiply the unit direction by $|v| = 10$, giving $10(\\cos 30^\\circ\\,\\mathbf{i} + \\sin 30^\\circ\\,\\mathbf{j})$.",
      },
      {
        kind: "choice",
        prompt: "A vector of magnitude $5$ points in the direction of the unit vector $(0.6, 0.8)$. What is the vector?",
        options: ["$(3, 4)$", "$(0.6, 0.8)$", "$(5, 5)$", "$(0.12, 0.16)$"],
        answer: 0,
        hint: "Scale the unit vector by $5$: multiply each component by $5$.",
        success: "Yes: $5(0.6, 0.8) = (3, 4)$, a length-$5$ vector in that direction.",
      },
      {
        kind: "choice",
        prompt: "Build a vector of magnitude $2$ at $\\theta = 135^\\circ$, where $\\cos 135^\\circ = -\\dfrac{\\sqrt{2}}{2}$ and $\\sin 135^\\circ = \\dfrac{\\sqrt{2}}{2}$.",
        options: ["$(-\\sqrt{2}, \\sqrt{2})$", "$(\\sqrt{2}, \\sqrt{2})$", "$(-\\sqrt{2}, -\\sqrt{2})$", "$(\\sqrt{2}, -\\sqrt{2})$"],
        answer: 0,
        hint: "Multiply each of $\\cos 135^\\circ$ and $\\sin 135^\\circ$ by $2$.",
        success: "Right: $2\\left(-\\dfrac{\\sqrt{2}}{2}, \\dfrac{\\sqrt{2}}{2}\\right) = (-\\sqrt{2}, \\sqrt{2})$, pointing up and to the left.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn: build and aim a vector",
    mode: "comp",
    params: [compParam("vx", "v\u2093", -60), compParam("vy", "v\u1d67", 40)],
    baseReveal: { dock: true, legs: true },
    beats: [
      {
        text: "Now you build the vectors. The sliders set the components $v_x$ and $v_y$, and the readout rewrites your vector three ways at once: as a pair $(v_x, v_y)$, as $v_x\\mathbf{i} + v_y\\mathbf{j}$, and as its unit vector $\\hat v = v/|v|$.",
      },
      {
        text: "The unit vector holds its direction while the arrow changes length. Here the vector stretches out along the same heading.",
        to: { vx: -80, vy: 60 },
        ms: 2000,
      },
      {
        text: "It comes to rest at $v = (-3, 2)$, up and to the left.",
        to: { vx: -60, vy: 40 },
        ms: 1600,
      },
    ],
    practice: "Drag the tip, or use the $v_x$ and $v_y$ sliders, until the readout shows the target.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Build the vector $v = 4\\mathbf{i} + 3\\mathbf{j}$: set $v_x = 4$ and $v_y = 3$.",
        hint: "The coefficient of $\\mathbf{i}$ is the horizontal component, the coefficient of $\\mathbf{j}$ is the vertical one.",
        success: "Yes: $v_x = 4$ and $v_y = 3$ give $v = 4\\mathbf{i} + 3\\mathbf{j} = (4, 3)$.",
        check: (_value, values) =>
          Math.abs((values.vx ?? 0) - 80) < 6 && Math.abs((values.vy ?? 0) - 60) < 6,
      },
      {
        kind: "manipulate",
        prompt: "Aim $v$ in the direction of the unit vector $(0.6, 0.8)$, at any length you like (up and to the right).",
        hint: "Any positive multiple of $(0.6, 0.8)$ works, for example $(3, 4)$ or $(1.5, 2)$. Keep both components positive.",
        success: "Perfect: your $v$ points along $(0.6, 0.8)$, so its unit vector is $\\hat v = (0.6, 0.8)$.",
        check: (_value, values) => {
          const cx = (values.vx ?? 0) / S;
          const cy = (values.vy ?? 0) / S;
          const m = Math.hypot(cx, cy);
          return m > 0.5 && Math.abs(cx / m - 0.6) < 0.06 && Math.abs(cy / m - 0.8) < 0.06;
        },
      },
      {
        kind: "choice",
        prompt: "Find the unit vector in the direction of $v = (5, 12)$, where $|v| = 13$.",
        options: [
          "$\\left(\\dfrac{5}{13}, \\dfrac{12}{13}\\right)$",
          "$(5, 12)$",
          "$\\left(\\dfrac{12}{13}, \\dfrac{5}{13}\\right)$",
          "$\\left(\\dfrac{5}{12}, 1\\right)$",
        ],
        answer: 0,
        hint: "Divide each component by $|v| = 13$.",
        success: "Yes: $\\dfrac{1}{13}(5, 12) = \\left(\\dfrac{5}{13}, \\dfrac{12}{13}\\right)$, a length-$1$ vector.",
      },
    ],
  },
];
