import type { ParamSpec, Slide } from "../types";

const TAU = Math.PI * 2;
const LINE_TMAX = 1.3;

const tParamRad = (step: number): ParamSpec => ({
  key: "t",
  label: "Parameter t",
  min: 0,
  max: 100,
  start: 0,
  step,
  format: (v) => `t = ${((v / 100) * TAU).toFixed(2)}`,
});

const tParamLine: ParamSpec = {
  key: "t",
  label: "Parameter t",
  min: -100,
  max: 100,
  start: 0,
  step: 3,
  format: (v) => `t = ${((v / 100) * LINE_TMAX).toFixed(2)}`,
};

export const slides: Slide[] = [
  {
    id: "parametric-line",
    title: "What is a parametric line?",
    mode: "line",
    params: [tParamLine],
    baseReveal: {},
    beats: [
      {
        text: "A **parametric** curve gives both coordinates as functions of a third variable, the **parameter** $t$, rather than writing $y$ as a function of $x$.",
      },
      {
        text: "The **simplest case** is $x = 2t$ and $y = 3t$. Substituting a value of $t$ gives a point, so $t = 1$ produces $(2, 3)$ and $t = -1$ produces $(-2, -3)$ in the opposite direction.",
        add: { path: true, components: true, dock: true, samples: true },
      },
      {
        text: "As $t$ increases, the point moves outward along the line, one point for every value of $t$.",
        to: 100,
        ms: 2400,
      },
      {
        text: "As $t$ becomes **negative**, the point moves the other way. Together the two directions fill an entire **line**, not just a segment.",
        to: -100,
        ms: 2800,
      },
      {
        text: "Eliminating $t$ removes the parameter: from $x = 2t$ we get $t = x/2$, so $y = 3(x/2) = \\tfrac{3}{2}x$. This is the same line, now written purely in $x$ and $y$.",
        to: 0,
        ms: 1400,
        add: { eliminate: true },
      },
    ],
    practice: "Slide $t$ to reach $(2, 3)$.",
    questions: [
      {
        kind: "plot",
        prompt: "Where is the point when $t = 0$? Substitute: $x = 2(0) = 0$ and $y = 3(0) = 0$.",
        hint: "Both coordinates are zero at $t = 0$.",
        success: "At $t = 0$, $(x, y) = (0, 0)$, so this line passes through the origin.",
        target: { x: 0, y: 0 },
        tolerance: 0.5,
        label: "t = 0",
      },
      {
        kind: "choice",
        prompt: "Eliminating the parameter from $x = 2t$, $y = 3t$ gives which equation?",
        options: ["$y = 2x$", "$y = \\tfrac{3}{2}x$", "$y = 6t$"],
        answer: 1,
        hint: "Solve $x = 2t$ for $t$, then substitute into $y = 3t$.",
        success: "$t = x/2$, so $y = 3(x/2) = \\tfrac{3}{2}x$. The parameter is gone and a familiar line remains.",
      },
      {
        kind: "manipulate",
        prompt: "Set $t$ so the point is at $(2, 3)$.",
        hint: "$x = 2t = 2$ means $t = 1$.",
        success: "At $t = 1$, $x = 2$ and $y = 3$, exactly the point $(2, 3)$ on the line.",
        check: (value) => Math.abs((value / 100) * LINE_TMAX - 1) < 0.06,
      },
    ],
  },
  {
    id: "parametric-circle",
    title: "The unit circle as $x = \\cos t$, $y = \\sin t$",
    mode: "circle",
    params: [tParamRad(3)],
    baseReveal: {},
    beats: [
      {
        text: "Next, both coordinates follow **trigonometric functions**, with $x = \\cos t$ and $y = \\sin t$.",
      },
      {
        text: "Two points show the pattern. At $t = \\tfrac{\\pi}{2}$ the point is $(0, 1)$, the top of the circle. At $t = \\pi$ it is $(-1, 0)$, the left side.",
        add: { path: true, samples: true, radius: true, components: true, dock: true },
      },
      {
        text: "For any $t$, the pair $(\\cos t, \\sin t)$ is the point on the **unit circle** at angle $t$. As $t$ increases through a full turn, the point travels once around the circle.",
        to: 100,
        ms: 2900,
        add: { trace: true },
      },
      {
        text: "Because $\\cos^2 t + \\sin^2 t = 1$, every point satisfies $x^2 + y^2 = 1$. Eliminating $t$ therefore leaves the **unit circle**.",
        to: 76,
        ms: 900,
        add: { eliminate: true },
      },
    ],
    practice: "Evaluate $x = \\cos t$ and $y = \\sin t$ at the given $t$, then click the point.",
    questions: [
      {
        kind: "plot",
        prompt: "Where is the point when $t = 0$? Read $x = \\cos 0 = 1$ and $y = \\sin 0 = 0$.",
        hint: "Angle zero points straight along the positive $x$-axis.",
        success: "At $t = 0$, $(\\cos 0, \\sin 0) = (1, 0)$, the rightmost point of the circle.",
        target: { x: 1, y: 0 },
        tolerance: 0.3,
        label: "t = 0",
      },
      {
        kind: "plot",
        prompt: "Now click the point at $t = \\tfrac{3\\pi}{2}$, three-quarters of the way around.",
        hint: "$\\cos\\tfrac{3\\pi}{2} = 0$ and $\\sin\\tfrac{3\\pi}{2} = -1$.",
        success: "At $t = \\tfrac{3\\pi}{2}$ the point is $(0, -1)$, the bottom of the circle.",
        target: { x: 0, y: -1 },
        tolerance: 0.3,
        label: "t = 3\u03c0/2",
      },
      {
        kind: "choice",
        prompt: "Eliminating $t$ from $x = \\cos t$, $y = \\sin t$ gives which equation?",
        options: ["$x + y = 1$", "$x^2 + y^2 = 1$", "$y = \\tan t$"],
        answer: 1,
        hint: "Use the identity $\\cos^2 t + \\sin^2 t = 1$.",
        success: "Squaring and adding gives $x^2 + y^2 = 1$, the unit circle.",
      },
    ],
  },
  {
    id: "parametric-free",
    title: "Why two free parameters are just coordinates",
    mode: "free",
    params: [
      {
        key: "x",
        label: "x",
        min: -300,
        max: 300,
        start: -200,
        step: 20,
        format: (v) => `x = ${(v / 100).toFixed(2)}`,
      },
      {
        key: "y",
        label: "y",
        min: -300,
        max: 300,
        start: 150,
        step: 20,
        format: (v) => `y = ${(v / 100).toFixed(2)}`,
      },
    ],
    baseReveal: { components: true, dock: true },
    beats: [
      {
        text: "Suppose $x$ and $y$ each move on **their own slider**, with no shared $t$ linking them.",
      },
      {
        text: "Then the point can reach **anywhere** in the plane. That freedom is exactly what ordinary **rectangular coordinates** provide.",
        to: { x: 240, y: -130 },
        ms: 2200,
      },
      {
        text: "Tying both coordinates to a single parameter $t$ removes one degree of freedom. That restriction produces a **curve** instead of the whole plane.",
        to: { x: -160, y: -190 },
        ms: 2200,
      },
      {
        text: "One parameter produces a single path, while two free numbers produce the entire plane. This distinction is what defines a parametric curve.",
      },
    ],
    practice: "Place the point at $(2, -1)$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Place the point at $(2, -1)$.",
        hint: "Right two units, down one unit.",
        success: "That is the rectangular point $(2, -1)$, fixed by two independent numbers.",
        check: (_value, values) =>
          Math.abs((values.x ?? 0) / 100 - 2) < 0.18 && Math.abs((values.y ?? 0) / 100 + 1) < 0.18,
      },
      {
        kind: "choice",
        prompt: "A single parameter $t$ produces a curve rather than the whole plane because it",
        options: ["adds a third axis", "removes one degree of freedom", "forces x = y"],
        answer: 1,
        hint: "With one parameter instead of two independent numbers, how many directions can the point move?",
        success: "One parameter leaves one degree of freedom, so the point is confined to a one-dimensional path.",
      },
    ],
  },
  {
    id: "parametric-lissajous",
    title: "A more intricate parametric curve",
    mode: "lissajous",
    params: [tParamRad(2)],
    baseReveal: {},
    beats: [
      {
        text: "The final example combines two sine waves: $x = \\sin 2t$ and $y = \\sin 3t$.",
      },
      {
        text: "Two sample points show where the curve begins. At $t = 0$ both sines equal $0$, so it starts at the origin. At $t = \\tfrac{\\pi}{4}$, $x = \\sin\\tfrac{\\pi}{2} = 1$ and $y = \\sin\\tfrac{3\\pi}{4} \\approx 0.71$.",
        add: { path: true, samples: true, dock: true },
      },
      {
        text: "Two waves oscillating at speeds $2$ and $3$ combine into a **Lissajous curve**. A single point traces the whole figure as $t$ advances, with the dashed segments tracking each coordinate.",
        to: 60,
        ms: 2800,
        add: { trace: true, components: true },
      },
      {
        text: "At $t = 2\\pi$ the pattern closes. Two simple equations produce one intricate closed path, and it is never the graph of a function of $x$.",
        to: 100,
        ms: 2900,
      },
      {
        text: "The parameter now rests partway along, near $t = \\tfrac{4\\pi}{5}$, with the loop left incomplete.",
        to: 40,
        ms: 1600,
      },
    ],
    practice: "Advance $t$ to $2\\pi$ to close the curve.",
    questions: [
      {
        kind: "plot",
        prompt: "Click the point at $t = \\tfrac{\\pi}{2}$. Compute $x = \\sin\\pi = 0$ and $y = \\sin\\tfrac{3\\pi}{2} = -1$.",
        hint: "$\\sin\\pi = 0$ lands it on the $y$-axis. $\\sin\\tfrac{3\\pi}{2} = -1$ takes it to the bottom.",
        success: "At $t = \\tfrac{\\pi}{2}$, $(x, y) = (0, -1)$, found by reading each equation separately.",
        target: { x: 0, y: -1 },
        tolerance: 0.3,
        label: "t = \u03c0/2",
      },
      {
        kind: "manipulate",
        prompt: "Advance $t$ to the end, $2\\pi$, so the full curve is drawn.",
        hint: "Slide the parameter all the way to the right.",
        success: "At $t = 2\\pi$ both $\\sin 2t$ and $\\sin 3t$ return to $0$, so the point is back at the origin and the loop is complete.",
        check: (value) => value >= 98,
      },
      {
        kind: "choice",
        prompt: "The Lissajous curve fails the vertical line test because",
        options: ["it is not continuous", "one $x$-value occurs at several values of $t$", "$t$ must be negative"],
        answer: 1,
        hint: "Different values of $t$ can share the same $x$.",
        success: "Different values of $t$ can share the same $x$, so a vertical line meets the curve more than once.",
      },
    ],
  },
];
