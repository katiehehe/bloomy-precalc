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
    id: "types",
    title: "When is a triangle determined?",
    mode: "types",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Most ways of describing a triangle determine exactly one shape. Knowing all three sides (SSS), two sides and the included angle (SAS), or two angles and any one side (ASA or AAS) each fixes a single triangle.",
      },
      {
        text: "Side-side-angle is the exception: two sides and an angle that is **not** between them. That set can produce no triangle, one triangle, or two. Before we build the triangle, the next slides will show why those three outcomes happen, by comparing the free side to the height from the known vertex down to the base.",
        add: { ssa: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "What does SSA give you?",
        options: [
          "two sides and an angle that is not between them",
          "two sides and the angle between them",
          "two angles and a side",
          "three sides",
        ],
        answer: 0,
        hint: "The first letter is the angle. The two sides come after, so the angle is not the included one.",
        success: "SSA is two sides and a non-included angle. SAS is the included-angle case, which determines one triangle.",
      },
      {
        kind: "choice",
        prompt: "SSS, SAS, ASA, and AAS each determine how many triangles?",
        options: ["exactly one", "always two", "none", "it depends on the side"],
        answer: 0,
        hint: "The opening beat listed those four as the cases that fix a single triangle.",
        success: "Each of those four sets determines exactly one triangle. SSA is the case we still have to explain.",
      },
    ],
  },
  {
    id: "build",
    title: "Building the SSA triangle",
    mode: "build",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Build this triangle one piece at a time. Start by laying its base along a horizontal line, with the known vertex $A$ at the left end.",
      },
      {
        text: "Next fix the known angle at $A$. This angle stays put for the rest of the construction and sets the direction the first side will travel.",
        add: { ang: true },
      },
      {
        text: "Grow the first known side $b$ out from $A$ along that direction until it reaches vertex $C$. The perpendicular drop from $C$ to the base has length $h = b\\sin A$, the shortest distance from $C$ down to the base.",
        add: { sideB: true, hgt: true },
      },
      {
        text: "Finally hinge the second known side $a$ at $C$ and let it pivot toward the base. Its length is fixed, but its landing point is not. Right now $a$ is shorter than $h$, so it cannot reach the base and no triangle closes.",
        add: { sideA: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "In this SSA construction, which part pivots?",
        options: ["side $a$, hinged at $C$", "side $b$", "angle $A$", "the base line"],
        answer: 0,
        hint: "Angle $A$ and side $b$ were fixed first, so the last side is the free one.",
        success: "Side $a$ is hinged at $C$ and swings toward the base, so its landing point can vary.",
      },
      {
        kind: "choice",
        prompt: "The shortest distance from $C$ straight down to the base is:",
        options: ["$h = b\\sin A$", "$h = b\\cos A$", "$h = a\\sin A$", "$h = a + b$"],
        answer: 0,
        hint: "It is the vertical leg of the right triangle formed by side $b$ and the base.",
        success: "$h = b\\sin A$ is the height, the threshold the pivoting side must reach.",
      },
    ],
  },
  {
    id: "cases",
    title: "No triangle, one, or two",
    mode: "cases",
    params: [sideParam(12)],
    hideSliders: true,
    baseReveal: { ang: true, sideB: true, hgt: true, sideA: true },
    beats: [
      {
        text: "With the setup fixed, the triangle count changes as the pivoting side $a$ grows. While $a$ stays shorter than the height $h$, it never reaches the base and no triangle forms.",
      },
      {
        text: "When $a$ grows to exactly $h$, it touches the base at the one point directly below $C$, forming a single right triangle.",
        to: { a: 15 },
        ms: 1500,
      },
      {
        text: "When $a$ lands between $h$ and $b$, it meets the base at two points, one on each side of the foot of the height. Two genuine triangles fit the same data, which is the ambiguous case.",
        to: { a: 22 },
        ms: 1500,
      },
      {
        text: "Once $a$ reaches at least $b$, the second landing point falls behind $A$ and off the ray, leaving one triangle. Always compare $a$ against both $h$ and $b$ before deciding.",
        to: { a: 33 },
        ms: 1500,
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "With angle $A$ and sides $a$, $b$ given (SSA), two triangles are possible when:",
        options: ["$h < a < b$, where $h = b\\sin A$", "$a < h$", "$a > b$ always", "$a = b$"],
        answer: 0,
        hint: "The side $a$ must be long enough to reach the base twice but short enough that both landing points stay on the ray.",
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
        text: "The algebra mirrors the geometry. The law of sines links each side to the sine of its opposite angle: $$\\dfrac{\\sin A}{a} = \\dfrac{\\sin B}{b}$$",
      },
      {
        text: "Solve this for the unknown angle $B$: $\\sin B = \\dfrac{b\\sin A}{a}$.",
        add: { s1: true },
      },
      {
        text: "Substitute the given values $A = 30^\\circ$, $a = 2.5$, and $b = 3$.",
        add: { s2: true },
      },
      {
        text: "That gives $\\sin B = \\dfrac{1.5}{2.5} = 0.6$. If this ratio ever exceeded $1$, no angle would have that sine and no triangle would exist, which is the algebraic signal that $a < h$.",
        add: { s3: true },
      },
      {
        text: "Now the ambiguity appears. Sine is positive in both quadrant I and quadrant II, so $\\sin B = 0.6$ has two answers: $B \\approx 36.9^\\circ$ and its supplement $180^\\circ - 36.9^\\circ = 143.1^\\circ$. Make sure to check the supplement every time.",
        add: { s4: true },
      },
      {
        text: "Keep only the solutions that leave room for a positive third angle. Both do here: $180 - 30 - 36.9 = 113.1^\\circ$ and $180 - 30 - 143.1 = 6.9^\\circ$ are each positive, so both triangles are real.",
        add: { s5: true },
      },
    ],
    practice: "",
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
    title: "Your turn: vary the unknown side",
    mode: "explore",
    params: [sideParam(12)],
    baseReveal: { ang: true, sideB: true, hgt: true, sideA: true },
    beats: [
      {
        text: "Angle $A = 30^\\circ$ and side $b = 3$ stay fixed, so the height is $h = 3\\sin 30^\\circ = 1.5$. As $a$ lengthens, the triangle count at the top changes between none, one, and two.",
        to: { a: 22 },
        ms: 1600,
      },
      {
        text: "The two-triangle window is exactly $1.5 < a < 3$, meaning $a$ lies between the height and the fixed side $b$. Outside that window there is a single triangle or none.",
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
