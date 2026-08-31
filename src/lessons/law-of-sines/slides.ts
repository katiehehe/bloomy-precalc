import type { ParamSpec, Slide } from "../types";

const angleB = (start: number): ParamSpec => ({
  key: "B",
  label: "Angle B",
  min: 20,
  max: 120,
  start,
  step: 5,
  format: (v) => `B = ${Math.round(v)}\u00b0`,
});

export const slides: Slide[] = [
  {
    id: "setup",
    title: "Labeling a triangle",
    mode: "setup",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "An oblique triangle has no right angle, so the plain right-triangle ratios no longer apply directly. To solve any triangle we first fix a naming convention that ties each side to an angle.",
      },
      {
        text: "Label the three angles $A$, $B$, and $C$, and give each side the lowercase letter of the angle it faces. Side $a$ lies opposite angle $A$, side $b$ opposite angle $B$, and side $c$ opposite angle $C$.",
      },
      {
        text: "This opposite pairing is the heart of the law of sines, because the law relates every side to the sine of the angle standing directly across from it.",
      },
    ],
    practice: "Each side is named for the angle across from it: $a$ faces $A$, $b$ faces $B$, and $c$ faces $C$.",
    questions: [
      {
        kind: "choice",
        prompt: "In triangle $ABC$, which side is opposite angle $B$?",
        options: ["side $b$", "side $a$", "side $c$"],
        answer: 0,
        hint: "Each side takes the lowercase letter of the angle it faces.",
        success: "Side $b$ sits directly across from angle $B$.",
      },
      {
        kind: "choice",
        prompt: "The side opposite the largest angle of a triangle is:",
        options: ["the longest side", "the shortest side", "always side $c$"],
        answer: 0,
        hint: "A wider opening at a vertex forces a longer side across from it.",
        success: "The largest angle always faces the longest side, which is why the opposite pairing matters.",
      },
    ],
  },
  {
    id: "derive",
    title: "Where the law of sines comes from",
    mode: "derive",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Drop a perpendicular from vertex $C$ straight down to side $c$, and call its length $h$. This altitude splits the triangle into two right triangles that share the same height $h$.",
      },
      {
        text: "In the left right triangle, angle $A$ has opposite side $h$ and hypotenuse $b$, so $\\sin A = \\tfrac{h}{b}$, which rearranges to $h = b\\sin A$.",
        add: { h1: true },
        ms: 1400,
      },
      {
        text: "In the right right triangle, angle $B$ has opposite side $h$ and hypotenuse $a$, so $\\sin B = \\tfrac{h}{a}$, which gives $h = a\\sin B$.",
        add: { h2: true },
        ms: 1400,
      },
      {
        text: "Both expressions equal the same height, so $b\\sin A = a\\sin B$. Dividing both sides by $\\sin A\\sin B$ separates the pairs into $\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B}$.",
      },
    ],
    practice: "The shared altitude gives $h = b\\sin A$ and $h = a\\sin B$, and setting them equal produces the law of sines.",
    questions: [
      {
        kind: "choice",
        prompt: "The altitude from $C$ can be written two ways. They are:",
        options: [
          "$h = b\\sin A$ and $h = a\\sin B$",
          "$h = a\\sin A$ and $h = b\\sin B$",
          "$h = b\\cos A$ and $h = a\\cos B$",
        ],
        answer: 0,
        hint: "In each small right triangle, $h$ is the side opposite the base angle, over the hypotenuse.",
        success: "Both equal $h$, so $b\\sin A = a\\sin B$, the seed of the law of sines.",
      },
    ],
  },
  {
    id: "ratio",
    title: "The law of sines",
    mode: "ratio",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Read the result as a proportion in which each side sits over the sine of its opposite angle, and the ratios are equal.",
      },
      {
        text: "Setting the two altitude expressions equal gives $b\\sin A = a\\sin B$.",
        add: { s1: true },
        ms: 1200,
      },
      {
        text: "Dividing both sides by $\\sin A\\sin B$ leaves each side paired with its own opposite angle.",
        add: { s2: true },
        ms: 1200,
      },
      {
        text: "Dropping an altitude to a different side brings in $c$ the same way, so all three ratios agree.",
        add: { s3: true },
        ms: 1200,
      },
    ],
    practice: "The law of sines: $\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}$.",
    questions: [
      {
        kind: "choice",
        prompt: "The law of sines pairs each side with:",
        options: [
          "the sine of the angle opposite that side",
          "the sine of an adjacent angle",
          "the cosine of its opposite angle",
        ],
        answer: 0,
        hint: "Look at which angle sits under each side in the ratio.",
        success: "Every ratio is a side over the sine of the angle across from it.",
      },
    ],
  },
  {
    id: "worked",
    title: "Finding a side from AAS",
    goal: "Find side $b$ when $A = 40^\\circ$, $B = 75^\\circ$, and $a = 10$",
    mode: "worked",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Reach for the law of sines whenever you know a side together with the angle opposite it. Here $A = 40^\\circ$ with $a = 10$ form that opposite pair, and $B = 75^\\circ$ is the extra angle, a case named AAS for two angles and a non-included side.",
      },
      {
        text: "Keep only the two ratios you need and solve for the unknown side $b$.",
        add: { s1: true },
        ms: 1200,
      },
      {
        text: "Substitute $A = 40^\\circ$, $B = 75^\\circ$, and $a = 10$.",
        add: { s2: true },
        ms: 1200,
      },
      {
        text: "Evaluate the sines, using $\\sin 75^\\circ \\approx 0.966$ and $\\sin 40^\\circ \\approx 0.643$.",
        add: { s3: true },
        ms: 1200,
      },
      {
        text: "Dividing gives $b \\approx 15.0$. The side opposite the larger angle came out longer than $a$, exactly as the opposite pairing predicts.",
        add: { s4: true },
        ms: 1200,
      },
    ],
    practice: "Pick the ratio holding your known opposite pair, solve for the unknown side, then substitute and divide.",
    questions: [
      {
        kind: "choice",
        prompt: "To find $b$, which proportion is set up correctly?",
        options: [
          "$\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B}$",
          "$\\dfrac{a}{\\sin B} = \\dfrac{b}{\\sin A}$",
          "$\\dfrac{\\sin A}{\\sin B} = \\dfrac{b}{a}$",
        ],
        answer: 0,
        hint: "Each side stays over the sine of its own opposite angle.",
        success: "$\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B}$ keeps each side with its opposite angle, so $b = \\dfrac{a\\sin B}{\\sin A}$.",
      },
      {
        kind: "choice",
        prompt: "With $a = 10$, $\\sin B \\approx 0.966$, and $\\sin A \\approx 0.643$, the value of $b$ is closest to:",
        options: ["$15.0$", "$6.7$", "$9.7$"],
        answer: 0,
        hint: "Compute $\\dfrac{10 \\times 0.966}{0.643}$.",
        success: "$\\dfrac{9.66}{0.643} \\approx 15.0$.",
      },
    ],
  },
  {
    id: "explore",
    title: "Every side over its sine",
    goal: "Vary angle $B$ and watch both ratios stay equal",
    mode: "explore",
    params: [angleB(30)],
    baseReveal: {},
    beats: [
      {
        text: "Here side $a = 6$ and angle $A = 40^\\circ$ stay fixed, and the third angle follows as $C = 180^\\circ - 40^\\circ - B$. As angle $B$ turns, the triangle reshapes while the opposite pairings hold.",
        to: { B: 75 },
        ms: 1600,
      },
      {
        text: "The ratio for the fixed pair is $\\dfrac{a}{\\sin A} = \\dfrac{6}{\\sin 40^\\circ} \\approx 9.33$.",
        add: { s1: true },
        ms: 1200,
      },
      {
        text: "Side $b$ grows or shrinks with angle $B$, yet $\\dfrac{b}{\\sin B}$ lands on the same value.",
        to: { B: 95 },
        ms: 1400,
        add: { s2: true },
      },
      {
        text: "That shared value is the law of sines at work: every side divided by the sine of its opposite angle gives one common ratio for the whole triangle.",
        to: { B: 30 },
        ms: 1400,
        add: { s3: true },
      },
    ],
    practice: "Turn angle $B$ and confirm the two ratios stay equal, then set the triangle to a requested third angle.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Set angle $B$ so that the third angle is $C = 80^\\circ$.",
        hint: "Since $C = 180^\\circ - 40^\\circ - B$, you need $B = 60^\\circ$.",
        success: "With $B = 60^\\circ$, the angles sum to $40 + 60 + 80 = 180^\\circ$.",
        check: (value) => Math.abs(140 - value - 80) < 2,
      },
      {
        kind: "choice",
        prompt: "As angle $B$ changes, the ratio $\\dfrac{b}{\\sin B}$:",
        options: [
          "stays equal to $\\dfrac{a}{\\sin A}$",
          "grows without bound",
          "depends on which side is longest",
        ],
        answer: 0,
        hint: "The law of sines says all three side-over-sine ratios agree.",
        success: "Every side over its opposite sine gives the same ratio, so $\\dfrac{b}{\\sin B} = \\dfrac{a}{\\sin A}$.",
      },
    ],
  },
];
