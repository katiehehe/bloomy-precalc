import type { ParamSpec, Slide } from "../types";

/** Slider units per world unit (kept in sync with Stage.SCALE). */
const S = 20;

/** The 3-4-5 direction angle, about 36.87 degrees (cos = 4/5, sin = 3/5). */
const DIR_345 = (Math.atan2(3, 4) * 180) / Math.PI;
/** The 4-3-5 direction angle, about 53.13 degrees (cos = 3/5, sin = 4/5). */
const DIR_435 = (Math.atan2(4, 3) * 180) / Math.PI;

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

const compParam = (key: string, label: string, start: number): ParamSpec => ({
  key,
  label,
  min: -100,
  max: 100,
  start,
  step: 5,
  format: (v) => `${label} = ${(v / S).toFixed(2)}`,
});

export const slides: Slide[] = [
  {
    id: "two-facts",
    title: "The two facts a vector carries",
    mode: "single",
    params: [magParam(60), dirParam(35)],
    hideSliders: true,
    baseReveal: { dock: true },
    beats: [
      {
        text: "A **vector** is an arrow. It packs two independent facts: its **magnitude** $|v|$, the length of the arrow, and its **direction** $\\theta$, the angle the arrow makes with the positive $x$-axis, measured counterclockwise. The readout on the right tracks both as the arrow moves.",
      },
      {
        text: "Watch the **magnitude** stretch. Only the length grows here. The heading $\\theta$ does not move, so the arrow points the same way, just farther.",
        to: { mag: 100 },
        ms: 1800,
      },
      {
        text: "Now shrink it back down. Same direction, shorter arrow. Magnitude is one dial you can turn on its own.",
        to: { mag: 55 },
        ms: 1500,
      },
      {
        text: "Next the **direction**. As $\\theta$ swings, the arrow rotates while its length holds steady. The little arc marks $\\theta$ opening up from the positive $x$-axis.",
        to: { dir: 130 },
        ms: 2000,
        add: { angle: true },
      },
      {
        text: "Point it back toward the first quadrant. Length and heading really are two separate dials: you can change either one without touching the other.",
        to: { dir: 40 },
        ms: 1800,
      },
    ],
    practice: "A vector is set by two numbers: how long it is (its magnitude) and which way it points (its direction).",
    questions: [
      {
        kind: "choice",
        prompt: "Which two numbers together describe a vector completely?",
        options: [
          "Its magnitude (length) and its direction (heading)",
          "Its color and its length",
          "Only its length",
          "Its starting point and its color",
        ],
        answer: 0,
        hint: "One number is how long the arrow is. The other is which way it points.",
        success: "Right: a vector is fixed by its magnitude and its direction, two independent facts.",
      },
      {
        kind: "choice",
        prompt: "You increase the direction angle $\\theta$ but leave the magnitude alone. What happens to the arrow?",
        options: [
          "It rotates but keeps the same length",
          "It gets longer but points the same way",
          "It gets shorter",
          "Nothing changes",
        ],
        answer: 0,
        hint: "The magnitude sets the length, the direction sets the heading.",
        success: "Yes: changing only $\\theta$ swings the heading while the length stays fixed.",
      },
    ],
  },
  {
    id: "components-magnitude",
    title: "From components to magnitude",
    mode: "comp",
    params: [compParam("vx", "v\u2093", 60), compParam("vy", "v\u1d67", 80)],
    hideSliders: true,
    baseReveal: { dock: true },
    beats: [
      {
        text: "Drop the vector onto the grid. Its **components** are its two parts: the horizontal part $v_x$ (the run across) and the vertical part $v_y$ (the rise up). Together they place the tip at $(v_x, v_y)$.",
        add: { legs: true },
      },
      {
        text: "Here is the key picture. The two components are the **legs of a right triangle**, and the vector itself is the **hypotenuse**. By the Pythagorean theorem the length is $|v| = \\sqrt{v_x^2 + v_y^2}$.",
        add: { hyp: true },
      },
      {
        text: "Put in numbers with $v = (3, 4)$. Then $|v| = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$. This is the classic 3-4-5 right triangle, worth memorizing.",
      },
      {
        text: "Slide the tip to the left so $v = (-4, 3)$. The horizontal part $v_x$ is now **negative**, yet $|v| = \\sqrt{(-4)^2 + 3^2} = \\sqrt{16 + 9} = \\sqrt{25} = 5$ is still positive. Squaring erases the sign, so a length is never negative.",
        to: { vx: -80, vy: 60 },
        ms: 2000,
      },
      {
        text: "Bring it home to $v = (3, 4)$, back in the first quadrant. Whatever the signs of the parts, the magnitude is the same square root of the sum of the squares.",
        to: { vx: 60, vy: 80 },
        ms: 1600,
      },
    ],
    practice: "The components are the legs of a right triangle, so the length is the hypotenuse: $|v| = \\sqrt{v_x^2 + v_y^2}$.",
    questions: [
      {
        kind: "choice",
        prompt: "For $v = (3, 4)$, what is the magnitude $|v|$?",
        options: ["$7$", "$5$", "$25$", "$12$"],
        answer: 1,
        hint: "Use $|v| = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16}$.",
        success: "Yes: $\\sqrt{9 + 16} = \\sqrt{25} = 5$, the 3-4-5 triangle.",
      },
      {
        kind: "choice",
        prompt: "For $v = (5, 12)$, what is the magnitude $|v|$?",
        options: ["$17$", "$13$", "$60$", "$\\sqrt{17}$"],
        answer: 1,
        hint: "Use $\\sqrt{5^2 + 12^2} = \\sqrt{25 + 144}$.",
        success: "Yes: $\\sqrt{25 + 144} = \\sqrt{169} = 13$, the 5-12-13 triangle.",
      },
      {
        kind: "plot",
        prompt: "Click the point that is the tip of the vector $v = (-3, 4)$.",
        target: { x: -3, y: 4 },
        tolerance: 0.6,
        label: "(-3, 4)",
        hint: "Three units left of the origin, four units up.",
        success: "Yes: the tip sits at $(-3, 4)$, and $|v| = \\sqrt{9 + 16} = 5$.",
      },
    ],
  },
  {
    id: "direction-quadrant",
    title: "The direction angle, and the quadrant fix",
    mode: "comp",
    params: [compParam("vx", "v\u2093", 80), compParam("vy", "v\u1d67", 60)],
    hideSliders: true,
    baseReveal: { dock: true, legs: true, angle: true },
    beats: [
      {
        text: "The **direction angle** $\\theta$ is the angle the vector makes with the positive $x$-axis, opening counterclockwise. In the component triangle, the side opposite $\\theta$ is $v_y$ and the side adjacent is $v_x$, so $\\tan\\theta = \\dfrac{v_y}{v_x}$.",
      },
      {
        text: "Solving for the angle gives: $$\\theta = \\tan^{-1}\\!\\left(\\dfrac{v_y}{v_x}\\right)$$ Here is the catch you must watch for. A calculator's $\\tan^{-1}$ only ever returns an angle between $-90^\\circ$ and $90^\\circ$, so it always answers in the first or fourth quadrant.",
      },
      {
        text: "When the vector really is in the first quadrant, no fix is needed. For $v = (4, 3)$, the calculator gives $\\theta = \\tan^{-1}\\!\\left(\\dfrac{3}{4}\\right) \\approx 36.87^\\circ$, and the arrow does point up and to the right, so that is the answer.",
      },
      {
        text: "Now swing to $v = (-4, 3)$, which points up and to the **left**, into the second quadrant. The calculator computes $\\tan^{-1}\\!\\left(\\dfrac{3}{-4}\\right) = \\tan^{-1}(-0.75) \\approx -36.87^\\circ$, an arrow pointing down and to the right. That is the wrong direction.",
        to: { vx: -80, vy: 60 },
        ms: 2200,
      },
      {
        text: "So make sure to **add $180^\\circ$** whenever the vector sits in quadrant II or III. Here $\\theta = -36.87^\\circ + 180^\\circ = 143.13^\\circ$, which correctly points up and to the left. The readout already shows this corrected angle.",
      },
    ],
    practice: "Direction is $\\theta = \\tan^{-1}(v_y / v_x)$, but add $180^\\circ$ when the vector is in quadrant II or III, because the calculator only returns angles from $-90^\\circ$ to $90^\\circ$.",
    questions: [
      {
        kind: "choice",
        prompt: "A calculator's $\\tan^{-1}$ (inverse tangent) always returns an angle in which range?",
        options: [
          "Between $-90^\\circ$ and $90^\\circ$",
          "Between $0^\\circ$ and $180^\\circ$",
          "Between $0^\\circ$ and $360^\\circ$",
          "Between $-180^\\circ$ and $180^\\circ$",
        ],
        answer: 0,
        hint: "It covers only the first and fourth quadrants, half a turn's worth.",
        success: "Right: $\\tan^{-1}$ returns values from $-90^\\circ$ to $90^\\circ$, quadrants I and IV only.",
      },
      {
        kind: "choice",
        prompt: "For $v = (-3, -4)$ (quadrant III), the calculator gives $\\tan^{-1}\\!\\left(\\dfrac{-4}{-3}\\right) \\approx 53.13^\\circ$. What is the correct direction angle?",
        options: ["$53.13^\\circ$", "$233.13^\\circ$", "$126.87^\\circ$", "$-53.13^\\circ$"],
        answer: 1,
        hint: "The vector is in quadrant III, so add $180^\\circ$ to the calculator's value.",
        success: "Yes: $53.13^\\circ + 180^\\circ = 233.13^\\circ$, pointing down and to the left as it should.",
      },
      {
        kind: "choice",
        prompt: "For which quadrants must you add $180^\\circ$ to the calculator's $\\tan^{-1}$ answer?",
        options: [
          "Quadrants II and III",
          "Quadrants I and IV",
          "Quadrants III and IV",
          "All four quadrants",
        ],
        answer: 0,
        hint: "The fix is needed exactly where $v_x$ is negative.",
        success: "Right: add $180^\\circ$ in quadrants II and III, where the arrow points to the left ($v_x < 0$).",
      },
    ],
  },
  {
    id: "build-components",
    title: "From magnitude and direction back to components",
    mode: "single",
    params: [magParam(100), dirParam(DIR_345)],
    hideSliders: true,
    baseReveal: { dock: true },
    beats: [
      {
        text: "Going the other way is just as useful: given the magnitude and direction, recover the components. Drop the same right triangle. The horizontal leg $v_x$ is adjacent to $\\theta$ and the vertical leg $v_y$ is opposite it.",
        add: { legs: true, angle: true },
      },
      {
        text: "From the triangle, $\\cos\\theta = \\dfrac{v_x}{|v|}$ and $\\sin\\theta = \\dfrac{v_y}{|v|}$. Multiplying each equation by $|v|$ isolates a component, which gives the two conversion formulas: $$v_x = |v|\\cos\\theta, \\qquad v_y = |v|\\sin\\theta$$",
      },
      {
        text: "Try $|v| = 5$ pointing at $\\theta = 36.87^\\circ$, a direction where $\\cos\\theta = 0.8$ and $\\sin\\theta = 0.6$. Then $v_x = 5(0.8) = 4$ and $v_y = 5(0.6) = 3$, so $v = (4, 3)$.",
      },
      {
        text: "Keep the length at $5$ but swing to $\\theta = 53.13^\\circ$, where $\\cos\\theta = 0.6$ and $\\sin\\theta = 0.8$. Now $v_x = 5(0.6) = 3$ and $v_y = 5(0.8) = 4$, so $v = (3, 4)$. Same length, new split.",
        to: { dir: DIR_435 },
        ms: 2000,
      },
      {
        text: "Point it straight up at $\\theta = 90^\\circ$. There $\\cos 90^\\circ = 0$ and $\\sin 90^\\circ = 1$, so $v_x = 5(0) = 0$ and $v_y = 5(1) = 5$, giving $v = (0, 5)$. The whole length went vertical.",
        to: { dir: 90 },
        ms: 2000,
      },
    ],
    practice: "To split a magnitude and direction into parts, use $v_x = |v|\\cos\\theta$ (adjacent, cosine) and $v_y = |v|\\sin\\theta$ (opposite, sine).",
    questions: [
      {
        kind: "choice",
        prompt: "A vector has $|v| = 10$ and $\\theta = 30^\\circ$. Find the horizontal component $v_x = |v|\\cos\\theta$.",
        options: ["$5\\sqrt{3} \\approx 8.66$", "$5$", "$10$", "$\\dfrac{\\sqrt{3}}{2}$"],
        answer: 0,
        hint: "Use $\\cos 30^\\circ = \\dfrac{\\sqrt{3}}{2}$, so $v_x = 10 \\cdot \\dfrac{\\sqrt{3}}{2}$.",
        success: "Yes: $10 \\cdot \\dfrac{\\sqrt{3}}{2} = 5\\sqrt{3} \\approx 8.66$.",
      },
      {
        kind: "choice",
        prompt: "The same vector has $|v| = 10$ and $\\theta = 30^\\circ$. Find the vertical component $v_y = |v|\\sin\\theta$.",
        options: ["$5\\sqrt{3} \\approx 8.66$", "$5$", "$10$", "$\\dfrac{1}{2}$"],
        answer: 1,
        hint: "Use $\\sin 30^\\circ = \\dfrac{1}{2}$, so $v_y = 10 \\cdot \\dfrac{1}{2}$.",
        success: "Yes: $10 \\cdot \\dfrac{1}{2} = 5$. Note the vertical part is smaller here because $30^\\circ$ is a shallow angle.",
      },
      {
        kind: "choice",
        prompt: "Which pair of formulas correctly turns a magnitude and direction into components?",
        options: [
          "$v_x = |v|\\cos\\theta, \\; v_y = |v|\\sin\\theta$",
          "$v_x = |v|\\sin\\theta, \\; v_y = |v|\\cos\\theta$",
          "$v_x = |v|\\tan\\theta, \\; v_y = |v|\\cos\\theta$",
          "$v_x = \\dfrac{\\cos\\theta}{|v|}, \\; v_y = \\dfrac{\\sin\\theta}{|v|}$",
        ],
        answer: 0,
        hint: "The horizontal part is adjacent to $\\theta$, so it pairs with cosine.",
        success: "Right: $v_x = |v|\\cos\\theta$ and $v_y = |v|\\sin\\theta$. Swapping sine and cosine is the classic slip.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn: steer the vector",
    mode: "single",
    params: [magParam(60), dirParam(200)],
    baseReveal: { dock: true, angle: true },
    beats: [
      {
        text: "Now you drive. Both dials are live: the magnitude slider stretches $|v|$ and the direction slider swings $\\theta$, while the readout keeps computing $v_x = |v|\\cos\\theta$ and $v_y = |v|\\sin\\theta$.",
      },
      {
        text: "A fixed length can point anywhere. Watch $\\theta$ sweep up toward the second quadrant while the length holds.",
        to: { dir: 150 },
        ms: 2000,
      },
      {
        text: "And the magnitude alone restretches the same heading, longer or shorter, without turning it.",
        to: { mag: 100 },
        ms: 1800,
      },
      {
        text: "It comes to rest at $|v| = 3$ pointing at $\\theta = 150^\\circ$, up and to the left. Your job is to move it from here to each target below.",
        to: { mag: 60, dir: 150 },
        ms: 1600,
      },
    ],
    practice: "Drag the tip, or use the magnitude and direction sliders, until the readout shows the target vector.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Point the vector **straight up**, to $\\theta = 90^\\circ$, so all of its length is vertical and $v_x = 0$.",
        hint: "Straight up along the positive $y$-axis means the horizontal part vanishes.",
        success: "Yes: at $\\theta = 90^\\circ$, $v_x = |v|\\cos 90^\\circ = 0$ and the arrow lies along $+y$.",
        check: (_value, values) => {
          const a = ((values.dir ?? 0) * Math.PI) / 180;
          return Math.abs(Math.cos(a)) < 0.08 && Math.sin(a) > 0.3;
        },
      },
      {
        kind: "manipulate",
        prompt: "Build the exact vector $v = (0, 4)$: keep it pointing straight up and stretch the magnitude to $|v| = 4$.",
        hint: "You need $\\theta = 90^\\circ$ and $|v| = 4$. The magnitude readout should show $|v| = 4.00$.",
        success: "Perfect: $|v| = 4$ at $\\theta = 90^\\circ$ gives $v = (4\\cos 90^\\circ, 4\\sin 90^\\circ) = (0, 4)$.",
        check: (_value, values) => {
          const a = ((values.dir ?? 0) * Math.PI) / 180;
          return Math.abs((values.mag ?? 0) - 80) < 6 && Math.abs(Math.cos(a)) < 0.08 && Math.sin(a) > 0.3;
        },
      },
      {
        kind: "choice",
        prompt: "A vector has magnitude $|v| = 13$ and a whole-number horizontal part $v_x = 5$. What is $v_y$ (taking it positive)?",
        options: ["$8$", "$12$", "$12.5$", "$18$"],
        answer: 1,
        hint: "You need $5^2 + v_y^2 = 13^2$, so $v_y^2 = 169 - 25$.",
        success: "Yes: $v_y = \\sqrt{169 - 25} = \\sqrt{144} = 12$, the 5-12-13 triangle.",
      },
    ],
  },
];
