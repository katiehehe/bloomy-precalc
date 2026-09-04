import type { ParamSpec, Slide } from "../types";

const rParam: ParamSpec = {
  key: "r",
  label: "Modulus r",
  min: 1,
  max: 5,
  start: 3,
  step: 1,
  format: (v) => `r = ${Math.round(v)}`,
};

const thetaParam: ParamSpec = {
  key: "theta",
  label: "Argument \u03b8 (degrees)",
  min: 0,
  max: 330,
  start: 0,
  step: 30,
  format: (v) => `\u03b8 = ${Math.round(v)}\u00b0`,
};

/** Watch-slide starts: r = 2 with theta parked on a special angle. */
const rWatch: ParamSpec = { ...rParam, start: 2 };
const theta30: ParamSpec = { ...thetaParam, start: 30 };
const theta60: ParamSpec = { ...thetaParam, start: 60 };

export const slides: Slide[] = [
  {
    id: "what-is-trig-form",
    title: "What is trigonometric form?",
    mode: "trig-form",
    params: [rWatch, theta60],
    hideSliders: true,
    baseReveal: { z: true, dock: true },
    beats: [
      {
        text: "**Trigonometric form** (also called polar form) writes a complex number by a length and an angle: $$z = r(\\cos\\theta + i\\sin\\theta)$$ The factor $r$ is the **modulus**, the length of the arrow from the origin to the point, and $\\theta$ is the **argument**, the angle of that arrow from the positive real axis.",
      },
      {
        text: "The trigonometric form writes that same point as $$z = r(\\cos\\theta + i\\sin\\theta)$$ The factor $r$ in front is the modulus, the length of the arrow from the origin to the point. In this example that arrow has length $r = 2$.",
        add: { modulus: true },
      },
      {
        text: "The angle $\\theta$ is the argument, measured counterclockwise from the positive real axis. Our example is turned to $\\theta = 60^\\circ$.",
        add: { arg: true },
      },
      {
        text: "The same right triangle reads off the coordinates. The horizontal leg $r\\cos\\theta$ is the real part $a$, and the vertical leg $r\\sin\\theta$ is the imaginary part $b$. The point therefore is at $(r\\cos\\theta,\\ r\\sin\\theta)$, with $r$ multiplying both.",
        add: { legs: true },
      },
      {
        text: "Make sure the $i$ multiplies the sine term **only**. The form is $r(\\cos\\theta + i\\sin\\theta)$, never $r(\\cos\\theta + \\sin\\theta)$ and never $r(\\sin\\theta + i\\cos\\theta)$. Cosine comes first with the real part, and $i$ multiplies the sine.",
      },
    ],
    practice: "Click the point that matches the given trig-form number.",
    questions: [
      {
        kind: "plot",
        prompt: "A trig-form number with $\\theta = 0^\\circ$ points straight along the positive real axis. Click where $2(\\cos 0^\\circ + i\\sin 0^\\circ)$ lands.",
        target: { x: 2, y: 0 },
        tolerance: 0.6,
        label: "2",
        hint: "$\\cos 0^\\circ = 1$ and $\\sin 0^\\circ = 0$, so $z = 2(1 + i\\cdot 0) = 2$: two units right along the real axis.",
        success: "Yes: with $\\theta = 0^\\circ$ the number is just the real value $r$, here $2$ at $(2, 0)$.",
      },
      {
        kind: "choice",
        prompt: "Which expression is the correct **trigonometric form** of a complex number?",
        options: [
          "$r(\\cos\\theta + i\\sin\\theta)$",
          "$r(\\cos\\theta + \\sin\\theta)$",
          "$r(\\sin\\theta + i\\cos\\theta)$",
          "$\\cos\\theta + i\\sin\\theta$",
        ],
        answer: 0,
        hint: "The modulus $r$ multiplies both terms, and the $i$ is on the sine term only.",
        success: "Right: $z = r(\\cos\\theta + i\\sin\\theta)$, with $r$ multiplying both and $i$ on the sine.",
      },
    ],
  },
  {
    id: "rectangular-to-trig",
    title: "How to convert rectangular to trigonometric form",
    mode: "trig-form",
    params: [rWatch, theta30],
    hideSliders: true,
    baseReveal: { z: true, legs: true, modulus: true, arg: true, dock: true },
    beats: [
      {
        text: "To go from rectangular $a + bi$ to trig form you need two numbers: the modulus $r$ and the argument $\\theta$. The figure shows $z = \\sqrt{3} + i$, so $a = \\sqrt{3}$ and $b = 1$.",
      },
      {
        text: "First the modulus. It is the distance from the origin, so $r = \\sqrt{a^2 + b^2}$. Here $r = \\sqrt{(\\sqrt{3})^2 + 1^2} = \\sqrt{3 + 1} = \\sqrt{4} = 2$.",
      },
      {
        text: "Next find the argument. The legs give $\\tan\\theta = \\dfrac{b}{a} = \\dfrac{1}{\\sqrt{3}}$, and because the point is in quadrant I that angle is $\\theta = 30^\\circ$.",
      },
      {
        text: "Combining the two gives $z = \\sqrt{3} + i = 2(\\cos 30^\\circ + i\\sin 30^\\circ)$, the same point written two ways.",
      },
      {
        text: "For a second example take $z = 1 + i$, where both legs are $1$, so $r = \\sqrt{1^2 + 1^2} = \\sqrt{2}$ and $\\tan\\theta = \\dfrac{1}{1} = 1$ gives $\\theta = 45^\\circ$. In trig form that is $z = \\sqrt{2}(\\cos 45^\\circ + i\\sin 45^\\circ)$.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "For $z = 1 + i$, what is the modulus $r$?",
        options: [
          "$2$",
          "$1$",
          "$\\sqrt{2}\\,i$",
          "$\\sqrt{2}$",
        ],
        answer: 3,
        hint: "$r = \\sqrt{a^2 + b^2} = \\sqrt{1^2 + 1^2}$.",
        success: "Yes: $\\sqrt{1 + 1} = \\sqrt{2}$. The modulus is a real length, never an $i$ times something.",
      },
      {
        kind: "choice",
        prompt: "For $z = \\sqrt{3} + i$, what is the argument $\\theta$?",
        options: [
          "$60^\\circ$",
          "$30^\\circ$",
          "$45^\\circ$",
          "$90^\\circ$",
        ],
        answer: 1,
        hint: "Use $\\tan\\theta = \\dfrac{b}{a} = \\dfrac{1}{\\sqrt{3}}$ in quadrant I.",
        success: "Right: $\\tan\\theta = \\dfrac{1}{\\sqrt{3}}$ gives $\\theta = 30^\\circ$. Swapping the legs would wrongly give $60^\\circ$.",
      },
    ],
  },
  {
    id: "trig-to-rectangular",
    title: "How to convert trigonometric form to rectangular",
    mode: "trig-form",
    params: [rWatch, theta60],
    hideSliders: true,
    baseReveal: { z: true, legs: true, modulus: true, arg: true, dock: true },
    beats: [
      {
        text: "Given $z = r(\\cos\\theta + i\\sin\\theta)$, the real part is $a = r\\cos\\theta$ and the imaginary part is $b = r\\sin\\theta$: evaluate cosine and sine, then multiply each by $r$.",
      },
      {
        text: "The figure shows $z = 2(\\cos 60^\\circ + i\\sin 60^\\circ)$. Start with the exact values: $\\cos 60^\\circ = \\dfrac{1}{2}$ and $\\sin 60^\\circ = \\dfrac{\\sqrt{3}}{2}$.",
      },
      {
        text: "Multiply by $r = 2$: $a = 2\\cdot\\dfrac{1}{2} = 1$ and $b = 2\\cdot\\dfrac{\\sqrt{3}}{2} = \\sqrt{3}$. So $z = 1 + \\sqrt{3}\\,i$.",
      },
      {
        text: "The quarter turns are the quickest. $4(\\cos 90^\\circ + i\\sin 90^\\circ) = 4(0 + i\\cdot 1) = 4i$, and $3(\\cos 180^\\circ + i\\sin 180^\\circ) = 3(-1 + i\\cdot 0) = -3$. Make sure to keep the $i$ on the sine value the whole way through.",
      },
    ],
    practice: "Click the point that matches the given rectangular value.",
    questions: [
      {
        kind: "choice",
        prompt: "Evaluate $2(\\cos 60^\\circ + i\\sin 60^\\circ)$ in rectangular form.",
        options: [
          "$\\sqrt{3} + i$",
          "$1 + \\sqrt{3}$",
          "$1 + \\sqrt{3}\\,i$",
          "$2 + 2i$",
        ],
        answer: 2,
        hint: "$a = 2\\cos 60^\\circ = 2\\cdot\\dfrac{1}{2}$ and $b = 2\\sin 60^\\circ = 2\\cdot\\dfrac{\\sqrt{3}}{2}$.",
        success: "Yes: $a = 1$ and $b = \\sqrt{3}$, so $z = 1 + \\sqrt{3}\\,i$.",
      },
      {
        kind: "plot",
        prompt: "Where does $3(\\cos 180^\\circ + i\\sin 180^\\circ)$ land? Click the point.",
        target: { x: -3, y: 0 },
        tolerance: 0.6,
        label: "-3",
        hint: "$\\cos 180^\\circ = -1$ and $\\sin 180^\\circ = 0$, so $z = 3(-1 + i\\cdot 0) = -3$.",
        success: "Right: $3(\\cos 180^\\circ + i\\sin 180^\\circ) = -3$, three units left at $(-3, 0)$.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn: write a number in trigonometric form",
    mode: "trig-form",
    params: [rParam, thetaParam],
    baseReveal: { z: true, legs: true, modulus: true, arg: true, dock: true },
    beats: [
      {
        text: "The modulus $r$ sets the arrow's length and the argument $\\theta$ sets its direction. The rectangular and trig forms stay in step as the point moves.",
        to: { r: 4, theta: 30 },
        ms: 2200,
      },
      {
        text: "At every setting the point is at $(r\\cos\\theta,\\ r\\sin\\theta)$. Once $\\theta$ passes $90^\\circ$ the real part $r\\cos\\theta$ turns negative, so the point crosses into the left half of the plane.",
        to: { r: 4, theta: 120 },
        ms: 2200,
      },
      {
        text: "It comes to rest at $r = 3$ and $\\theta = 0^\\circ$, which is the real number $3$ on the positive real axis.",
        to: { r: 3, theta: 0 },
        ms: 2000,
      },
    ],
    practice: "Drag the point, or use the $r$ and $\\theta$ sliders, to build each target.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Set $z$ to $2(\\cos 60^\\circ + i\\sin 60^\\circ)$: bring the modulus to $r = 2$ and the argument to $\\theta = 60^\\circ$.",
        hint: "Move the $r$ slider to $2$ and the $\\theta$ slider to $60^\\circ$. The readout should show $2(\\cos 60^\\circ + i\\sin 60^\\circ)$.",
        success: "Yes: $2(\\cos 60^\\circ + i\\sin 60^\\circ) = 1 + \\sqrt{3}\\,i$, up and to the right in quadrant I.",
        check: (_value, values) =>
          Math.round(values.r ?? 0) === 2 && Math.round(values.theta ?? 0) === 60,
      },
      {
        kind: "plot",
        prompt: "Predict where $2(\\cos 90^\\circ + i\\sin 90^\\circ)$ lands, then click it.",
        target: { x: 0, y: 2 },
        tolerance: 0.6,
        label: "2i",
        hint: "$\\cos 90^\\circ = 0$ and $\\sin 90^\\circ = 1$, so $z = 2(0 + i\\cdot 1) = 2i$: two units straight up.",
        success: "Right: $2(\\cos 90^\\circ + i\\sin 90^\\circ) = 2i$ at $(0, 2)$.",
      },
      {
        kind: "choice",
        prompt: "A classmate converts $5(\\cos 30^\\circ + i\\sin 30^\\circ)$ and writes $5\\cos 30^\\circ + 5\\sin 30^\\circ$. What went wrong?",
        options: [
          "Nothing, that expression is already correct.",
          "They dropped the $i$: the imaginary part is $5\\sin 30^\\circ$ times $i$, so $z = \\dfrac{5\\sqrt{3}}{2} + \\dfrac{5}{2}i$.",
          "They should have multiplied only the cosine by $5$.",
          "They should have swapped it to $5\\sin 30^\\circ + i\\,5\\cos 30^\\circ$.",
        ],
        answer: 1,
        hint: "In $r(\\cos\\theta + i\\sin\\theta)$ the $i$ stays on the sine term through the whole conversion.",
        success: "Right: keep the $i$, so $z = 5\\cos 30^\\circ + (5\\sin 30^\\circ)i = \\dfrac{5\\sqrt{3}}{2} + \\dfrac{5}{2}i$.",
      },
    ],
  },
];
