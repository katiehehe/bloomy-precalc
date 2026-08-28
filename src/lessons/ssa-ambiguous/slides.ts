import type { ParamSpec, Slide } from "../types";

const sideParam = (start: number): ParamSpec => ({
  key: "a",
  label: "Side a",
  min: 10,
  max: 40,
  start,
  step: 1,
  format: (v) => `a = ${(v / 10).toFixed(1)}`,
});

export const slides: Slide[] = [
  {
    id: "height",
    title: "Why SSA is ambiguous",
    mode: "height",
    params: [sideParam(12)],
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Give a triangle two sides and an angle **not** between them (side-side-angle) and something strange happens: the third side can swing to more than one landing spot. Here angle $A$ and side $b$ are fixed, and the side $a$ hangs from $C$, free to swing down to the base.",
      },
      {
        text: "The deciding length is the **height** $h = b\\sin A$, the shortest drop from $C$ straight to the base. Right now $a$ is shorter than $h$, so it cannot even reach the base line: **no triangle** exists.",
      },
      {
        text: "Lengthen $a$ until it just equals $h$. It touches the base at exactly one point, straight down, forming a single right triangle.",
        to: { a: 15 },
        ms: 1500,
      },
      {
        text: "Grow it a little more, so $h < a < b$. Now the swinging side reaches the base at **two** different points, one to each side of the foot of the height. Two genuine triangles fit the same given data: this is the ambiguous case.",
        to: { a: 22 },
        ms: 1500,
      },
      {
        text: "Push past $b$, so $a \\ge b$. One of the two landing points falls behind vertex $A$, off the ray, so only **one** triangle survives. Make sure to compare $a$ against both $h$ and $b$ before deciding how many triangles there are.",
        to: { a: 33 },
        ms: 1500,
      },
    ],
    practice: "Compare $a$ to $h = b\\sin A$ and to $b$: shorter than $h$ gives none, between gives two, at least $b$ gives one.",
    questions: [
      {
        kind: "choice",
        prompt: "With angle $A$ and sides $a$, $b$ given (SSA), two triangles are possible when:",
        options: [
          "$h < a < b$, where $h = b\\sin A$",
          "$a < h$",
          "$a > b$ always",
          "$a = b$",
        ],
        answer: 0,
        hint: "The swinging side must be long enough to reach the base twice but short enough that both landings stay on the ray.",
        success: "Between the height and the other side, $h < a < b$, gives the two-triangle (ambiguous) case.",
      },
      {
        kind: "choice",
        prompt: "The height that sets the threshold is:",
        options: ["$h = b\\sin A$", "$h = b\\cos A$", "$h = a\\sin A$", "$h = a + b$"],
        answer: 0,
        hint: "It is the vertical drop from $C$ to the base, opposite angle $A$ in the right triangle.",
        success: "$h = b\\sin A$ is the shortest distance from $C$ to the base.",
      },
    ],
  },
  {
    id: "law",
    title: "Solving with the law of sines",
    mode: "law",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "The algebra mirrors the picture. The law of sines links each side to the sine of its opposite angle: $\\dfrac{\\sin A}{a} = \\dfrac{\\sin B}{b}$.",
      },
      {
        text: "Solve it for the unknown angle: $\\sin B = \\dfrac{b\\sin A}{a}$.",
        add: { s1: true },
      },
      {
        text: "Drop in the numbers $A = 30^\\circ$, $a = 2.5$, $b = 3$.",
        add: { s2: true },
      },
      {
        text: "That gives $\\sin B = \\dfrac{1.5}{2.5} = 0.6$. If this ever came out greater than $1$, no angle would work and there would be no triangle, the algebra's way of saying $a < h$.",
        add: { s3: true },
      },
      {
        text: "Now the ambiguity appears. Sine is positive in both quadrant I and quadrant II, so $\\sin B = 0.6$ has two answers: $B \\approx 36.9^\\circ$ and its supplement $180^\\circ - 36.9^\\circ = 143.1^\\circ$. Make sure to check the supplement every time.",
        add: { s4: true },
      },
      {
        text: "Keep only the ones that leave room for a third angle. Both do here: $180 - 30 - 36.9 = 113.1^\\circ$ and $180 - 30 - 143.1 = 6.9^\\circ$ are each positive, so both triangles are real.",
        add: { s5: true },
      },
    ],
    practice: "Solve for $\\sin B$, take both the angle and its supplement, and keep those with a positive third angle.",
    questions: [
      {
        kind: "choice",
        prompt: "After finding $\\sin B = 0.6$, why consider $143.1^\\circ$ as well as $36.9^\\circ$?",
        options: [
          "sine is positive in quadrants I and II, so the supplement also has sine $0.6$",
          "the calculator is unreliable",
          "angles must be obtuse",
          "$143.1^\\circ$ is the reference angle",
        ],
        answer: 0,
        hint: "$\\sin(180^\\circ - B) = \\sin B$.",
        success: "Both an angle and its supplement share the same sine, so both must be tested.",
      },
      {
        kind: "choice",
        prompt: "If the law of sines gives $\\sin B = 1.4$, the number of triangles is:",
        options: ["zero", "one", "two", "infinitely many"],
        answer: 0,
        hint: "A sine can never exceed $1$.",
        success: "No angle has sine $1.4$, so no triangle exists (that is the $a < h$ case).",
      },
    ],
  },
  {
    id: "explore",
    title: "Swing the side yourself",
    mode: "explore",
    params: [sideParam(12)],
    baseReveal: {},
    beats: [
      {
        text: "Take the controls. Angle $A = 30^\\circ$ and side $b = 3$ stay fixed, so the height is $h = 3\\sin 30^\\circ = 1.5$. As you lengthen $a$, watch the count at the top flip between none, one, and two.",
        to: { a: 22 },
        ms: 1600,
      },
      {
        text: "The two-triangle window is exactly $1.5 < a < 3$, that is, between the height and the fixed side $b$. Outside it you get a single triangle or none at all.",
        to: { a: 12 },
        ms: 1200,
      },
    ],
    practice: "Drag $a$ into the window $h < a < b$ to force the ambiguous, two-triangle case.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Set $a$ so that two triangles form.",
        hint: "You need $a$ strictly between the height $h = 1.5$ and the side $b = 3$.",
        success: "With $1.5 < a < 3$, the side reaches the base twice: two triangles.",
        check: (value) => value / 10 > 1.5 && value / 10 < 3,
      },
      {
        kind: "choice",
        prompt: "At $a = 3.3$ (longer than $b = 3$), how many triangles are there?",
        options: ["one", "zero", "two", "three"],
        answer: 0,
        hint: "Once $a \\ge b$, one landing point slips behind vertex $A$.",
        success: "Only one triangle survives when $a \\ge b$.",
      },
    ],
  },
];
