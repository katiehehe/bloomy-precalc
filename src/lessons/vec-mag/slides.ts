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
        text: "A **vector** is a quantity with both a size and a direction, drawn as an arrow. Its **magnitude** $|v|$ is the length of the arrow, and its **direction** $\\theta$ is the angle measured counterclockwise from the positive $x$-axis.",
      },
      {
        text: "As the **magnitude** increases, the arrow grows longer while the direction angle $\\theta$ stays fixed, so it points the same way at a greater length.",
        to: { mag: 100 },
        ms: 1800,
      },
      {
        text: "Decreasing the magnitude shortens the arrow with $\\theta$ still fixed, so changing $|v|$ alone never changes the direction.",
        to: { mag: 55 },
        ms: 1500,
      },
      {
        text: "Now the **direction** changes instead. As $\\theta$ increases the arrow rotates about the origin while its length $|v|$ stays fixed, and the arc from the positive $x$-axis measures $\\theta$.",
        to: { dir: 130 },
        ms: 2000,
        add: { angle: true },
      },
      {
        text: "Rotating back toward the first quadrant lowers $\\theta$ while $|v|$ stays fixed. Magnitude and direction are independent: either can change while the other stays the same.",
        to: { dir: 40 },
        ms: 1800,
      },
    ],
    practice: "",
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
        text: "On the grid, the vector's **components** are its horizontal part $v_x$ and its vertical part $v_y$, and the tip of the arrow sits at the point $(v_x, v_y)$.",
        add: { legs: true },
      },
      {
        text: "These components are the **legs** of a right triangle whose **hypotenuse** is the vector, so the Pythagorean theorem gives $|v| = \\sqrt{v_x^2 + v_y^2}$.",
        add: { hyp: true },
      },
      {
        text: "For $v = (3, 4)$: $|v| = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$, the 3-4-5 right triangle worth memorizing.",
      },
      {
        text: "When the tip moves to $v = (-4, 3)$, the component $v_x$ turns **negative**. Squaring gives $(-4)^2 = 16$, so $|v| = \\sqrt{16 + 9} = 5$ is unchanged and still positive.",
        to: { vx: -80, vy: 60 },
        ms: 2000,
      },
      {
        text: "Back at $v = (3, 4)$, the magnitude is again $\\sqrt{3^2 + 4^2} = 5$. Because the formula squares each component, the signs of $v_x$ and $v_y$ never affect $|v|$.",
        to: { vx: 60, vy: 80 },
        ms: 1600,
      },
    ],
    practice: "Click the tip of the vector asked.",
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
        text: "The **direction angle** $\\theta$ is measured counterclockwise from the positive $x$-axis. In the component triangle $v_y$ is opposite $\\theta$ and $v_x$ is adjacent, and since tangent is opposite over adjacent, $\\tan\\theta = \\dfrac{v_y}{v_x}$.",
      },
      {
        text: "Taking the inverse tangent solves for the angle: $$\\theta = \\tan^{-1}\\!\\left(\\dfrac{v_y}{v_x}\\right)$$ A calculator's $\\tan^{-1}$ returns only angles from $-90^\\circ$ to $90^\\circ$, which lie in quadrants I and IV, so its answer is wrong for a vector in quadrant II or III.",
      },
      {
        text: "For $v = (4, 3)$ in quadrant I, the calculator gives $\\theta = \\tan^{-1}\\!\\left(\\dfrac{3}{4}\\right) \\approx 36.87^\\circ$, which already points up and to the right, so no correction is needed.",
      },
      {
        text: "For $v = (-4, 3)$ in quadrant II, the calculator gives $\\tan^{-1}\\!\\left(\\dfrac{3}{-4}\\right) \\approx -36.87^\\circ$. That angle points down and to the right, the exact opposite of the true direction.",
        to: { vx: -80, vy: 60 },
        ms: 2200,
      },
      {
        text: "**Add $180^\\circ$** whenever the vector lies in quadrant II or III. Here $\\theta = -36.87^\\circ + 180^\\circ = 143.13^\\circ$, which points up and to the left, matching the arrow.",
      },
    ],
    practice: "",
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
        hint: "Add $180^\\circ$ exactly where $v_x$ is negative.",
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
        text: "The same triangle also runs in reverse, turning a magnitude and direction into components, with $v_x$ adjacent to $\\theta$ and $v_y$ opposite $\\theta$.",
        add: { legs: true, angle: true },
      },
      {
        text: "By the definitions of cosine and sine, $\\cos\\theta = \\dfrac{v_x}{|v|}$ and $\\sin\\theta = \\dfrac{v_y}{|v|}$. Multiplying each by $|v|$ gives the conversion formulas $$v_x = |v|\\cos\\theta, \\qquad v_y = |v|\\sin\\theta$$",
      },
      {
        text: "With $|v| = 5$ and $\\theta = 36.87^\\circ$, $\\cos\\theta = 0.8$ and $\\sin\\theta = 0.6$, so $v_x = 5 \\times 0.8 = 4$ and $v_y = 5 \\times 0.6 = 3$, giving $v = (4, 3)$.",
      },
      {
        text: "At $\\theta = 53.13^\\circ$ with the same length, $\\cos\\theta = 0.6$ and $\\sin\\theta = 0.8$, so $v_x = 3$ and $v_y = 4$, giving $v = (3, 4)$. The length is unchanged, but $v_x$ and $v_y$ have swapped.",
        to: { dir: DIR_435 },
        ms: 2000,
      },
      {
        text: "At $\\theta = 90^\\circ$, $\\cos 90^\\circ = 0$ and $\\sin 90^\\circ = 1$, so $v_x = 0$ and $v_y = 5$, giving $v = (0, 5)$. The arrow points straight up, with all of its length vertical.",
        to: { dir: 90 },
        ms: 2000,
      },
    ],
    practice: "",
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
    title: "Your turn: set magnitude and direction",
    mode: "single",
    params: [magParam(60), dirParam(200)],
    baseReveal: { dock: true, angle: true },
    beats: [
      {
        text: "Now it is your turn. The magnitude slider changes $|v|$ and the direction slider changes $\\theta$, and the readout recomputes $v_x = |v|\\cos\\theta$ and $v_y = |v|\\sin\\theta$.",
      },
      {
        text: "A fixed length can point any way: here $|v|$ stays constant while $\\theta$ increases toward the second quadrant, so the arrow rotates without changing length.",
        to: { dir: 150 },
        ms: 2000,
      },
      {
        text: "Now $\\theta$ stays constant while $|v|$ increases, so the arrow keeps its direction and only grows longer.",
        to: { mag: 100 },
        ms: 1800,
      },
      {
        text: "The arrow rests at $|v| = 3$ and $\\theta = 150^\\circ$, up and to the left. Move it from here to each target below.",
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
