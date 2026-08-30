import type { ParamSpec, Slide } from "../types";

/** One integer slider, value 0..100, mapped to real t = (value/100) * pi in [0, pi]. */
const tParamElim = (start: number): ParamSpec => ({
  key: "t",
  label: "Parameter t",
  min: 0,
  max: 100,
  start,
  step: 5,
  format: (v) => `t = ${((v / 100) * Math.PI).toFixed(2)}`,
});

export const slides: Slide[] = [
  {
    id: "substitution",
    title: "Substitution method",
    mode: "derive-sub",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "**Eliminating the parameter** means removing $t$ to get a single Cartesian equation in $x$ and $y$. The **substitution method** has two steps: solve one equation for $t$, then substitute that expression into the other. The pair here is $x = t + 1$ and $y = t^2$.",
      },
      {
        text: "Begin by solving the **simpler** equation for $t$. The linear equation $x = t + 1$ is easiest, since subtracting $1$ from both sides gives $t = x - 1$.",
        add: { s1: true },
      },
      {
        text: "Substituting $t = x - 1$ into $y = t^2$ gives $$y = (x - 1)^2$$ The parameter is gone, leaving a parabola with vertex $(1, 0)$.",
        add: { s2: true },
      },
      {
        text: "One caution concerns the **domain**. Because $t$ can be any real number here, $x = t + 1$ ranges over all real numbers too, so the whole parabola is kept. If the range of $t$ were limited, $x$ would be limited as well, and only a piece of the parabola would remain.",
      },
    ],
    practice: "Answer how to remove the parameter $t$ by substitution.",
    questions: [
      {
        kind: "choice",
        prompt: "In the substitution method, which equation do you solve for $t$ first?",
        options: [
          "The simpler one, usually the linear equation",
          "The one with the highest power of $t$",
          "You must solve both equations for $t$ at once",
        ],
        answer: 0,
        hint: "You want the solve-for-$t$ step to be easy.",
        success: "Right: solve the simpler (here linear) equation for $t$, then substitute into the other.",
      },
      {
        kind: "choice",
        prompt: "Substituting $t = x - 1$ into $y = t^2$ gives which equation?",
        options: ["$y = (x - 1)^2$", "$y = x^2 - 1$", "$y = x^2 + 1$"],
        answer: 0,
        hint: "Replace every $t$ with $x - 1$.",
        success: "Right: $y = (x - 1)^2$. Note $(x - 1)^2 = x^2 - 2x + 1$, not $x^2 - 1$, so keep the whole square.",
      },
    ],
  },
  {
    id: "trig-circle",
    title: "Trig method: the circle",
    mode: "derive-circle",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "When $x = \\cos t$ and $y = \\sin t$, solving for $t$ requires inverse trig functions and becomes awkward. A cleaner route uses the **Pythagorean identity** $\\cos^2 t + \\sin^2 t = 1$, starting from $x = \\cos t$ and $y = \\sin t$.",
      },
      {
        text: "First **isolate** the trig functions. They already stand alone here, as $\\cos t = x$ and $\\sin t = y$.",
        add: { s1: true },
      },
      {
        text: "**Square** both equations so they match the identity: $\\cos^2 t = x^2$ and $\\sin^2 t = y^2$.",
        add: { s2: true },
      },
      {
        text: "**Add** the two equations and replace $\\cos^2 t + \\sin^2 t$ with $1$: $$x^2 + y^2 = 1$$ the unit circle, obtained with no inverse trig at all.",
        add: { s3: true },
      },
    ],
    practice: "Answer how the Pythagorean identity removes the parameter.",
    questions: [
      {
        kind: "choice",
        prompt: "Which identity eliminates $t$ from $x = \\cos t$, $y = \\sin t$?",
        options: [
          "$\\cos^2 t + \\sin^2 t = 1$",
          "$\\sin 2t = 2\\sin t \\cos t$",
          "$1 + \\tan^2 t = \\sec^2 t$",
        ],
        answer: 0,
        hint: "You have $\\cos t$ and $\\sin t$, so square and add them.",
        success: "Right: $\\cos^2 t + \\sin^2 t = 1$ turns the squared coordinates into $x^2 + y^2 = 1$.",
      },
      {
        kind: "choice",
        prompt: "Eliminating $t$ from $x = \\cos t$, $y = \\sin t$ gives which equation?",
        options: ["$x^2 + y^2 = 1$", "$x + y = 1$", "$x^2 - y^2 = 1$"],
        answer: 0,
        hint: "Square each coordinate, then add.",
        success: "Right: $x^2 + y^2 = 1$, the unit circle. Squaring is what the identity needs, so $x + y = 1$ is not it.",
      },
    ],
  },
  {
    id: "trig-ellipse",
    title: "Trig method: the ellipse",
    mode: "derive-ellipse",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "The radii need not be equal. For $x = 3\\cos t$ and $y = 2\\sin t$, the same identity works once $\\cos t$ and $\\sin t$ are standing alone.",
      },
      {
        text: "**Divide** each equation by the number in front: $\\cos t = \\dfrac{x}{3}$ and $\\sin t = \\dfrac{y}{2}$. Make sure to divide before you square.",
        add: { s1: true },
      },
      {
        text: "**Square** both: $\\cos^2 t = \\dfrac{x^2}{9}$ and $\\sin^2 t = \\dfrac{y^2}{4}$. Squaring the $3$ and the $2$ is what produces the $9$ and the $4$.",
        add: { s2: true },
      },
      {
        text: "**Add** the two and apply the identity: $$\\dfrac{x^2}{9} + \\dfrac{y^2}{4} = 1$$ an **ellipse** wider than it is tall. Writing $x^2 + y^2 = 1$ here would be wrong, because that form holds only for equal radii.",
        add: { s3: true },
      },
    ],
    practice: "Answer how to eliminate $t$ when the two radii differ.",
    questions: [
      {
        kind: "choice",
        prompt: "Eliminating $t$ from $x = 3\\cos t$, $y = 2\\sin t$ gives which equation?",
        options: [
          "$\\dfrac{x^2}{9} + \\dfrac{y^2}{4} = 1$",
          "$x^2 + y^2 = 1$",
          "$\\dfrac{x^2}{3} + \\dfrac{y^2}{2} = 1$",
        ],
        answer: 0,
        hint: "Divide by $3$ and $2$, then square both.",
        success: "Right: $\\dfrac{x^2}{9} + \\dfrac{y^2}{4} = 1$. The $9$ and $4$ come from squaring the $3$ and the $2$.",
      },
      {
        kind: "choice",
        prompt: "Before squaring $x = 3\\cos t$, the correct first step is to",
        options: [
          "divide by $3$, giving $\\cos t = \\dfrac{x}{3}$",
          "square right away, giving $x^2 = 3\\cos^2 t$",
          "take $\\arccos$ of both sides",
        ],
        answer: 0,
        hint: "You need $\\cos t$ alone so the identity applies.",
        success: "Right: divide first. Squaring $3\\cos t$ gives $9\\cos^2 t$, not $3\\cos^2 t$, so dividing avoids that slip.",
      },
    ],
  },
  {
    id: "range-restriction",
    title: "The range restricts the curve",
    mode: "restrict",
    params: [tParamElim(0)],
    baseReveal: { dock: true, full: true },
    beats: [
      {
        text: "Eliminating $t$ from $x = \\cos t$, $y = \\sin t$ gave $x^2 + y^2 = 1$, but that Cartesian equation describes the **whole** circle. The parametric equations may trace only part of it, depending on the range of $t$.",
      },
      {
        text: "Suppose $0 \\le t \\le \\pi$. At $t = 0$ the point is $(1, 0)$, at $t = \\tfrac{\\pi}{2}$ it is $(0, 1)$, and at $t = \\pi$ it is $(-1, 0)$. The point sweeps only the **upper** half.",
        to: 100,
        ms: 2800,
        add: { arc: true, point: true, ends: true },
      },
      {
        text: "So this parametric curve is the **upper semicircle**, a piece of $x^2 + y^2 = 1$ with $y \\ge 0$. Make sure to carry the range: after eliminating $t$, restrict the Cartesian graph to the part the parameter actually reaches.",
      },
    ],
    practice: "Answer which piece of the full circle the restricted parameter traces.",
    questions: [
      {
        kind: "choice",
        prompt: "With $0 \\le t \\le \\pi$, which part of $x^2 + y^2 = 1$ does $x = \\cos t$, $y = \\sin t$ actually cover?",
        options: [
          "The upper half, where $y \\ge 0$",
          "The whole circle",
          "The right half, where $x \\ge 0$",
        ],
        answer: 0,
        hint: "Check the heights $y = \\sin t$ for $t$ between $0$ and $\\pi$.",
        success: "Right: for $0 \\le t \\le \\pi$, $\\sin t \\ge 0$, so the point stays on the upper half of the circle.",
      },
      {
        kind: "choice",
        prompt: "The eliminated equation $x^2 + y^2 = 1$ is the whole circle, yet the curve is only an arc. Why?",
        options: [
          "The range $0 \\le t \\le \\pi$ restricts it to a piece",
          "Eliminating $t$ changed the equation",
          "The identity only holds on the top half",
        ],
        answer: 0,
        hint: "Nothing was lost in the algebra. Think about which $t$-values are allowed.",
        success: "Right: eliminating $t$ is exact, but the limited range of $t$ keeps only the arc it can reach.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn",
    mode: "practice",
    params: [tParamElim(0)],
    baseReveal: { dock: true, full: true, arc: true, point: true, components: true },
    beats: [
      {
        text: "Now it is your turn. As $t$ runs from $0$ to $\\pi$, the point moves along the upper arc while the dashed segments and the readout show its position $(x, y) = (\\cos t, \\sin t)$.",
        to: 100,
        ms: 2600,
      },
      {
        text: "The point now rests in the upper left, partway along the arc. Move the parameter to each target below.",
        to: 75,
        ms: 1800,
      },
    ],
    practice: "Slide $t$ to move the point along the arc, or click where a value of $t$ lands, then answer.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Slide $t$ until the point reaches the top of the arc, $(0, 1)$.",
        hint: "The top is at $t = \\tfrac{\\pi}{2}$, halfway along the arc. Move the slider until it reads about $t = 1.57$.",
        success: "At $t = \\tfrac{\\pi}{2}$, $(\\cos t, \\sin t) = (0, 1)$, the top of the semicircle.",
        check: (value) => Math.abs((value / 100) * Math.PI - Math.PI / 2) < 0.08,
      },
      {
        kind: "plot",
        prompt: "The arc ends at $t = \\pi$. Compute $x = \\cos\\pi = -1$ and $y = \\sin\\pi = 0$, then click that point.",
        hint: "$\\cos\\pi = -1$ and $\\sin\\pi = 0$, so aim for $(-1, 0)$.",
        success: "At $t = \\pi$ the arc ends at $(-1, 0)$, the left side of the circle.",
        target: { x: -1, y: 0 },
        tolerance: 0.3,
        label: "t = \u03c0",
      },
      {
        kind: "choice",
        prompt: "Does this curve ever pass through $(0, -1)$, the bottom of the circle?",
        options: [
          "No, that point needs $t = \\tfrac{3\\pi}{2}$, which is outside $0 \\le t \\le \\pi$",
          "Yes, at $t = \\pi$",
          "Yes, at $t = \\tfrac{\\pi}{2}$",
        ],
        answer: 0,
        hint: "Which $t$ would give $\\sin t = -1$, and is it inside the allowed range?",
        success: "Right: $(0, -1)$ needs $t = \\tfrac{3\\pi}{2}$, outside $0 \\le t \\le \\pi$, so the lower half is missing.",
      },
    ],
  },
];
