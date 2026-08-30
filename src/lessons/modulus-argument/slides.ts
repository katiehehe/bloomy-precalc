import type { ParamSpec, Slide } from "../types";

const reParam: ParamSpec = {
  key: "re",
  label: "Real part a",
  min: -5,
  max: 5,
  start: 3,
  step: 1,
  format: (v) => `a = ${Math.round(v)}`,
};

const imParam: ParamSpec = {
  key: "im",
  label: "Imaginary part b",
  min: -5,
  max: 5,
  start: 4,
  step: 1,
  format: (v) => `b = ${Math.round(v)}`,
};

/** Same two sliders, but resting away from any answer for the try stage. */
const reTry: ParamSpec = { ...reParam, start: 2 };
const imTry: ParamSpec = { ...imParam, start: 1 };

export const slides: Slide[] = [
  {
    id: "point",
    title: "A complex number is a point",
    mode: "modulus",
    params: [reParam, imParam],
    hideSliders: true,
    baseReveal: { z: true },
    beats: [
      {
        text: "A **complex number** $z = a + bi$ is a point on the **complex plane**, also called the Argand plane. The **real part** $a$ gives the horizontal coordinate, and the **imaginary part** $b$ gives the vertical coordinate.",
      },
      {
        text: "The real axis runs left and right, and the imaginary axis runs up and down. Our example $z = 3 + 4i$ has $a = 3$ and $b = 4$, so it sits at the point $(3, 4)$.",
      },
      {
        text: "The arrow drawn from the origin to that point represents $z$. Its length and its direction are the two measurements this lesson develops.",
      },
    ],
    practice: "To place $2 + 3i$, go right $2$ on the real axis, then up $3$ on the imaginary axis.",
    questions: [
      {
        kind: "plot",
        prompt: "Click the point for $z = 2 + 3i$.",
        target: { x: 2, y: 3 },
        tolerance: 0.6,
        label: "2+3i",
        hint: "Go right to real part $2$, then up to imaginary part $3$.",
        success: "Yes: $2 + 3i$ sits at $(2, 3)$, two right and three up.",
      },
      {
        kind: "choice",
        prompt: "In $z = 3 + 4i$, which number is the **imaginary part**?",
        options: ["$4$", "$3$", "$4i$", "$3 + 4i$"],
        answer: 0,
        hint: "The imaginary part is the real coefficient multiplying $i$, without the $i$.",
        success: "Right: the imaginary part is $4$ (the coefficient of $i$), and it is plotted vertically.",
      },
    ],
  },
  {
    id: "modulus",
    title: "Modulus is distance",
    mode: "modulus",
    params: [reParam, imParam],
    hideSliders: true,
    baseReveal: { z: true, dock: true },
    beats: [
      {
        text: "The **modulus** of $z$, written $|z|$, is the straight-line distance from the origin to the point. That distance is the length of the arrow representing $z$.",
      },
      {
        text: "The real and imaginary parts form the two legs of a right triangle, a horizontal leg of length $a = 3$ and a vertical leg of length $b = 4$. The arrow itself is the hypotenuse.",
        add: { legs: true },
      },
      {
        text: "By the **Pythagorean theorem**, the hypotenuse is $\\sqrt{a^2 + b^2}$. That is the formula for the modulus: $$|z| = \\sqrt{a^2 + b^2}$$",
        add: { modulus: true },
      },
      {
        text: "For $z = 3 + 4i$: $|z| = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$. Because it is a length, the modulus is never negative.",
      },
    ],
    practice: "Compute the modulus as the hypotenuse of the right triangle with legs $a$ and $b$: $|z| = \\sqrt{a^2 + b^2}$.",
    questions: [
      {
        kind: "choice",
        prompt: "What is the modulus of $z = 3 + 4i$?",
        options: ["$5$", "$7$", "$\\sqrt{7}$", "$25$"],
        answer: 0,
        hint: "Compute $\\sqrt{3^2 + 4^2}$.",
        success: "Right: $\\sqrt{9 + 16} = \\sqrt{25} = 5$.",
      },
      {
        kind: "choice",
        prompt: "Find $|z|$ for $z = 5 + 12i$.",
        options: ["$13$", "$17$", "$\\sqrt{17}$", "$169$"],
        answer: 0,
        hint: "$\\sqrt{5^2 + 12^2} = \\sqrt{25 + 144}$.",
        success: "Yes: $\\sqrt{25 + 144} = \\sqrt{169} = 13$ (a 5-12-13 triangle).",
      },
    ],
  },
  {
    id: "argument",
    title: "Argument is direction",
    mode: "modulus",
    params: [reParam, imParam],
    hideSliders: true,
    baseReveal: { z: true, legs: true, dock: true },
    beats: [
      {
        text: "The **argument** of $z$, written $\\arg z = \\theta$, is the angle the arrow makes with the positive real axis, measured counterclockwise.",
        add: { arg: true },
      },
      {
        text: "In that right triangle the side opposite $\\theta$ is $b$ and the side adjacent is $a$, so $\\tan\\theta = \\dfrac{b}{a}$. The ratio is the imaginary part over the real part, not the reverse.",
      },
      {
        text: "For $z = 3 + 4i$: $\\tan\\theta = \\dfrac{4}{3}$, so $\\theta = \\arctan\\dfrac{4}{3} \\approx 53.1^\\circ$. Since $a > 0$ and $b > 0$, the point is in quadrant I and this angle is already correct.",
      },
      {
        text: "Make sure to check the quadrant. When $a < 0$, the bare $\\arctan\\dfrac{b}{a}$ is off by a half turn, so add $180^\\circ$. For $z = -3 + 4i$ (quadrant II), $\\theta \\approx 180^\\circ - 53.1^\\circ = 126.9^\\circ$.",
      },
    ],
    practice: "Read the direction as $\\tan\\theta = \\dfrac{b}{a}$, then fix the quadrant if $a < 0$.",
    questions: [
      {
        kind: "choice",
        prompt: "For $z = 3 + 4i$, which ratio gives $\\tan\\theta$?",
        options: ["$\\dfrac{4}{3}$", "$\\dfrac{3}{4}$", "$\\dfrac{3}{5}$", "$\\dfrac{5}{4}$"],
        answer: 0,
        hint: "Argument uses opposite over adjacent: imaginary part over real part.",
        success: "Right: $\\tan\\theta = \\dfrac{b}{a} = \\dfrac{4}{3}$.",
      },
      {
        kind: "choice",
        prompt: "The number $z = -2 + 2i$ lies in which quadrant, so how is its argument found?",
        options: [
          "Quadrant II, so add $180^\\circ$ to $\\arctan\\dfrac{2}{-2}$ to get $135^\\circ$",
          "Quadrant I, so $\\theta = 45^\\circ$",
          "Quadrant IV, so $\\theta = -45^\\circ$",
          "Quadrant II, so $\\theta = \\arctan\\dfrac{2}{-2} = -45^\\circ$",
        ],
        answer: 0,
        hint: "$a = -2 < 0$ and $b = 2 > 0$ puts the arrow up and to the left.",
        success: "Yes: $a<0$ means add $180^\\circ$, so $\\theta = -45^\\circ + 180^\\circ = 135^\\circ$.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn",
    mode: "modulus",
    params: [reTry, imTry],
    baseReveal: { z: true, legs: true, modulus: true, arg: true, dock: true },
    beats: [
      {
        text: "Now the point is yours to move. The sliders set the real part $a$ and the imaginary part $b$, while the modulus $r$ and the argument $\\theta$ update from them.",
        to: { re: 3, im: 4 },
        ms: 2200,
      },
      {
        text: "When the arrow points straight up at $z = 5i$, the modulus is still $5$ but the argument is now $\\theta = 90^\\circ$, a quarter turn. Distance and direction are two independent facts about $z$.",
        to: { re: 0, im: 5 },
        ms: 2200,
      },
      {
        text: "The point comes to rest at $a = 2$ and $b = 1$, a modulus of only $\\sqrt{5} \\approx 2.24$ that falls short of every target below.",
        to: { re: 2, im: 1 },
        ms: 1400,
      },
    ],
    practice: "Drag the point, or use the $a$ and $b$ sliders, to reach each target. The readout shows $|z|$ as you move.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Move $z$ so that its modulus is exactly $5$: $|z| = 5$.",
        hint: "Any point on the circle of radius $5$ works, for example $a = 4$, $b = 3$ or $a = 0$, $b = 5$.",
        success: "Yes: every point with $a^2 + b^2 = 25$ sits a distance $5$ from the origin.",
        check: (_value, values) => {
          const re = Math.round(values.re ?? 0);
          const im = Math.round(values.im ?? 0);
          return Math.abs(re * re + im * im - 25) < 0.5;
        },
      },
      {
        kind: "manipulate",
        prompt: "Now put $z$ in **quadrant II** (real part negative, imaginary part positive) while keeping $|z| = 5$.",
        hint: "Quadrant II means $a < 0$ and $b > 0$. Try $a = -3$, $b = 4$.",
        success: "Yes: $-3 + 4i$ has modulus $5$ and points up and to the left, into quadrant II.",
        check: (_value, values) => {
          const re = Math.round(values.re ?? 0);
          const im = Math.round(values.im ?? 0);
          return re < 0 && im > 0 && Math.abs(re * re + im * im - 25) < 0.5;
        },
      },
    ],
  },
];
