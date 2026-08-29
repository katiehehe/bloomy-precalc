import type { ParamSpec, Slide } from "../types";

/** The 3-4-5 ramp angle: sin = 3/5, cos = 4/5, about 36.87 degrees. Kept exact. */
const ALPHA_345 = (Math.atan2(3, 4) * 180) / Math.PI;

const alphaTry: ParamSpec = {
  key: "alpha",
  label: "Ramp angle \u03b1 (degrees)",
  min: 15,
  max: 90,
  start: 60,
  step: 5,
  format: (v) => `\u03b1 = ${Math.round(v)}\u00b0`,
};

const wParam: ParamSpec = {
  key: "w",
  label: "Weight W",
  min: 4,
  max: 12,
  start: 10,
  step: 2,
  format: (v) => `W = ${Math.round(v)}`,
};

/** Watch slides park alpha on the 3-4-5 ramp with the sliders hidden. */
const alphaWatch: ParamSpec = { ...alphaTry, start: ALPHA_345 };

export const slides: Slide[] = [
  {
    id: "setup",
    title: "The setup",
    mode: "incline",
    params: [alphaWatch, wParam],
    hideSliders: true,
    baseReveal: { ramp: true, dock: true },
    beats: [
      {
        text: "Here is a block sitting on a **ramp** that tilts up at an angle we call $\\alpha$. The slanted top edge is the surface the block rests on, and $\\alpha$ is the angle from the flat ground up to that surface.",
        add: { angleBase: true },
      },
      {
        text: "Gravity pulls the block straight down. The strength of that pull is the **weight** $W$, and we draw it as an arrow from the block pointing straight down. On this block $W = 10$.",
        add: { weight: true },
      },
      {
        text: "Here is the key idea. Gravity always points straight down toward the ground, so $W$ stays vertical no matter how the ramp is tilted. As the ramp steepens, $W$ does not turn with it.",
        to: { alpha: 60 },
        ms: 2200,
      },
      {
        text: "The same holds as the ramp flattens: $W$ still points straight down. The angle $\\alpha$ can be anything, but the weight keeps its downward direction and its length.",
        to: { alpha: 20 },
        ms: 2200,
      },
      {
        text: "We will use one friendly ramp throughout, the **3-4-5 ramp**: for every $5$ units along the surface it rises $3$ and runs $4$. That makes $\\sin\\alpha = \\tfrac{3}{5}$ and $\\cos\\alpha = \\tfrac{4}{5}$, clean fractions we will use next.",
        to: { alpha: ALPHA_345 },
        ms: 1800,
      },
    ],
    practice: "Keep in mind: the weight $W$ always points straight down, and $\\alpha$ is the ramp's tilt up from the ground.",
    questions: [
      {
        kind: "choice",
        prompt: "The ramp is tilted at angle $\\alpha$. In which direction does the weight $W$ point?",
        options: [
          "Straight down toward the ground.",
          "Down along the ramp surface.",
          "Perpendicular to the ramp surface.",
          "Whichever way the ramp is tilted.",
        ],
        answer: 0,
        hint: "Gravity pulls everything straight down, regardless of the ramp.",
        success: "Right: $W$ is always straight down, the vector $(0, -W)$, whatever $\\alpha$ is.",
      },
      {
        kind: "choice",
        prompt: "What does the angle $\\alpha$ measure here?",
        options: [
          "The angle of the weight arrow below the ramp.",
          "The tilt of the ramp, from the flat ground up to the surface.",
          "The length of the ramp surface.",
          "The size of the push from the surface.",
        ],
        answer: 1,
        hint: "It is the ramp's steepness, measured at the base where the surface meets the ground.",
        success: "Yes: $\\alpha$ is the ramp's tilt. A bigger $\\alpha$ means a steeper ramp.",
      },
    ],
  },
  {
    id: "rotate-axes",
    title: "The ramp's own directions",
    mode: "incline",
    params: [alphaWatch, wParam],
    hideSliders: true,
    baseReveal: { ramp: true, weight: true, dock: true, angleBase: true },
    beats: [
      {
        text: "To see how the block behaves, split $W$ into two pieces lined up with the ramp. The first points **along the incline**, straight down the slope. A **component** is the part of a vector pointing in a chosen direction, and this one is the part of $W$ that tries to slide the block down.",
        add: { along: true },
      },
      {
        text: "The second piece points **perpendicular to the surface**, straight into the ramp. This component is the part of $W$ that presses the block against the ramp. The two directions sit at a right angle to each other.",
        add: { normal: true },
      },
      {
        text: "Together the two components are the sides of a rectangle, and the original weight $W$ is its diagonal. That is what splitting a vector means: the two pieces add tip to tail to rebuild $W$ exactly.",
        add: { rect: true },
      },
      {
        text: "Notice the lengths of the two components change as the ramp tilts, yet they always add up to the same weight $W$. Nothing about gravity changed. We only described $W$ using the ramp's two directions.",
        to: { alpha: 55 },
        ms: 2000,
      },
      {
        text: "Back to the 3-4-5 ramp. Next we measure exactly how long each of these two components is.",
        to: { alpha: ALPHA_345 },
        ms: 1600,
      },
    ],
    practice: "Remember: the two components are perpendicular, and they add tip to tail to give back the whole weight $W$.",
    questions: [
      {
        kind: "choice",
        prompt: "The weight is split into the along-incline component and the into-surface component. How are those two directions related?",
        options: [
          "They are perpendicular, at a right angle to each other.",
          "They are parallel, pointing the same way.",
          "They both point in the direction of $W$.",
          "They are both horizontal.",
        ],
        answer: 0,
        hint: "One runs along the surface. The other runs straight into it.",
        success: "Right: along the surface and into the surface meet at a right angle.",
      },
      {
        kind: "choice",
        prompt: "Add the along-incline component and the into-surface component tip to tail. What do you get?",
        options: [
          "A vector twice as long as $W$.",
          "Zero.",
          "Exactly the original weight $W$.",
          "The push from the surface only.",
        ],
        answer: 2,
        hint: "Splitting a vector never changes it. The pieces must rebuild the whole.",
        success: "Yes: the two components are just $W$ rewritten, so tip to tail they sum back to $W$.",
      },
    ],
  },
  {
    id: "formulas",
    title: "Sine and cosine",
    mode: "incline",
    params: [alphaWatch, wParam],
    hideSliders: true,
    baseReveal: { ramp: true, weight: true, along: true, normal: true, rect: true, dock: true, angleBase: true },
    beats: [
      {
        text: "Here is the trick that gives the formulas. The ramp's angle $\\alpha$ appears again right at the block, in the corner between the weight $W$ and the into-surface component.",
        add: { angleBlock: true },
      },
      {
        text: "Why is that corner also $\\alpha$? The into-surface direction is perpendicular to the ramp, and $W$ is perpendicular to the ground. Two directions turned by the same right angle keep the same angle between them, so this corner equals the ramp's tilt $\\alpha$.",
      },
      {
        text: "Now read the right triangle. $W$ is the hypotenuse. The into-surface component sits next to $\\alpha$ (adjacent), so $\\cos\\alpha = \\dfrac{\\text{adjacent}}{\\text{hypotenuse}} = \\dfrac{\\text{into-surface}}{W}$. Multiplying by $W$ gives an into-surface component of $W\\cos\\alpha$. The surface pushes back just as hard, so the **normal force** is $N = W\\cos\\alpha$.",
      },
      {
        text: "The along-incline component sits across from $\\alpha$ (opposite), so $\\sin\\alpha = \\dfrac{\\text{opposite}}{\\text{hypotenuse}} = \\dfrac{\\text{along-incline}}{W}$, which gives an along-incline component of $W\\sin\\alpha$. This is the part that tries to slide the block down the slope.",
      },
      {
        text: "Put in our numbers. The 3-4-5 ramp has $\\sin\\alpha = \\tfrac{3}{5} = 0.6$ and $\\cos\\alpha = \\tfrac{4}{5} = 0.8$, with $W = 10$. So the along-incline component is $W\\sin\\alpha = 10(0.6) = 6$ and the into-surface component is $W\\cos\\alpha = 10(0.8) = 8$.",
      },
      {
        text: "Do they rebuild $W$? The two components are perpendicular legs, so together they reach $\\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$, exactly the weight. Make sure to use $\\sin\\alpha$ for the along-incline part and $\\cos\\alpha$ for the into-surface part, never the reverse.",
      },
    ],
    practice: "The method: the into-surface part is $W\\cos\\alpha$ (adjacent, so cosine) and the along-incline part is $W\\sin\\alpha$ (opposite, so sine).",
    questions: [
      {
        kind: "choice",
        prompt: "Which component of the weight uses **sine**?",
        options: [
          "The into-surface (normal) component.",
          "The along-incline component, $W\\sin\\alpha$.",
          "Both components use sine.",
          "Neither, both use cosine.",
        ],
        answer: 1,
        hint: "Sine pairs with the side opposite $\\alpha$, which is the part running down the slope.",
        success: "Right: the along-incline component is opposite $\\alpha$, so it is $W\\sin\\alpha$.",
      },
      {
        kind: "choice",
        prompt: "For a block on a ramp at angle $\\alpha$ with weight $W$, the normal force is:",
        options: [
          "$N = W$",
          "$N = W\\sin\\alpha$",
          "$N = W\\cos\\alpha$",
          "$N = W\\tan\\alpha$",
        ],
        answer: 2,
        hint: "The into-surface component is adjacent to $\\alpha$, so it uses cosine, and $N$ balances it.",
        success: "Right: $N = W\\cos\\alpha$. It equals the full weight $W$ only when $\\alpha = 0$.",
      },
      {
        kind: "choice",
        prompt: "On the 3-4-5 ramp ($\\sin\\alpha = 0.6$, $\\cos\\alpha = 0.8$) with $W = 10$, the along-incline component is:",
        options: [
          "$6$",
          "$8$",
          "$10$",
          "$0.6$",
        ],
        answer: 0,
        hint: "Along-incline $= W\\sin\\alpha = 10(0.6)$.",
        success: "Yes: $10(0.6) = 6$. The into-surface part is $10(0.8) = 8$.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn",
    mode: "incline",
    params: [alphaTry, wParam],
    baseReveal: { ramp: true, weight: true, along: true, normal: true, dock: true, angleBase: true },
    beats: [
      {
        text: "Both dials are live now. As $\\alpha$ grows toward $90^\\circ$, the along-incline component $W\\sin\\alpha$ stretches while the into-surface component $W\\cos\\alpha$ shrinks, so almost all the weight ends up trying to slide the block.",
        to: { alpha: 75 },
        ms: 2200,
      },
      {
        text: "As $\\alpha$ shrinks toward $0^\\circ$ it flips: the into-surface component grows back toward the full weight and the along-incline part nearly vanishes, so the surface carries almost everything.",
        to: { alpha: 25 },
        ms: 2200,
      },
      {
        text: "Making the block heavier scales the whole picture. A larger $W$ grows every arrow together, and both components grow in the same proportion.",
        to: { w: 12 },
        ms: 1800,
      },
      {
        text: "It comes to rest at $\\alpha = 60^\\circ$ with $W = 10$.",
        to: { alpha: 60, w: 10 },
        ms: 1600,
      },
    ],
    practice: "Drag the ramp surface to tilt it, or use the $\\alpha$ and $W$ sliders. The readout shows $W\\sin\\alpha$, $W\\cos\\alpha$, and $N$ as you go.",
    questions: [
      {
        kind: "manipulate",
        prompt: "With the weight held at $W = 10$, tilt the ramp until the along-incline pull $W\\sin\\alpha$ is exactly $5$.",
        hint: "You need $\\sin\\alpha = 0.5$. Which special angle has $\\sin\\alpha = \\tfrac{1}{2}$?",
        success: "Yes: $\\sin 30^\\circ = 0.5$, so $W\\sin\\alpha = 10(0.5) = 5$.",
        check: (_value, values) =>
          Math.round(values.w ?? 0) === 10 &&
          Math.abs((values.w ?? 0) * Math.sin(((values.alpha ?? 0) * Math.PI) / 180) - 5) < 0.15,
      },
      {
        kind: "manipulate",
        prompt: "Set the ramp to $\\alpha = 60^\\circ$, then make the block heavier until the normal force $N = W\\cos\\alpha$ reaches $6$. Watch every arrow grow as $W$ increases.",
        hint: "At $\\alpha = 60^\\circ$, $\\cos\\alpha = 0.5$, so $N = 0.5\\,W$. What $W$ makes $N = 6$?",
        success: "Right: $N = W\\cos 60^\\circ = 12(0.5) = 6$.",
        check: (_value, values) =>
          Math.round(values.alpha ?? 0) === 60 &&
          Math.abs((values.w ?? 0) * Math.cos(((values.alpha ?? 0) * Math.PI) / 180) - 6) < 0.15,
      },
      {
        kind: "choice",
        prompt: "As you steepen the ramp (increase $\\alpha$ toward $90^\\circ$), which is true?",
        options: [
          "$W\\sin\\alpha$ grows and $W\\cos\\alpha$ shrinks, so more weight goes along the slope.",
          "$W\\sin\\alpha$ shrinks and $W\\cos\\alpha$ grows.",
          "Both components grow without bound.",
          "Both stay the same. Only $W$ matters.",
        ],
        answer: 0,
        hint: "From $0^\\circ$ to $90^\\circ$, sine increases while cosine decreases.",
        success: "Right: a steeper ramp means a larger $W\\sin\\alpha$ (more sliding) and a smaller $W\\cos\\alpha$ (less pressing in).",
      },
    ],
  },
];
