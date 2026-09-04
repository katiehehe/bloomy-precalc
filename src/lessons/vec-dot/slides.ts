import type { ParamSpec, Slide } from "../types";

/** Slider units per world unit (kept in sync with Stage.SCALE). */
const S = 20;

/** One interactive component of b, an integer slider mapped to world units. */
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
    id: "dot-from-components",
    title: "What is a dot product?",
    mode: "component",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "The **dot product** combines two vectors into a single number, a scalar with no direction. Write $a = \\langle 2, 3, 1 \\rangle$ as a row and stack $b = \\langle 4, 1, 2 \\rangle$ beneath it, so matching entries line up in columns.",
      },
      {
        text: "The highlighter boxes the first column, pairing $a_1 = 2$ with $b_1 = 4$. These two belong together, so multiply them: $(2)(4) = 8$, the first term of the sum.",
        add: { p1: true },
      },
      {
        text: "The highlighter moves to the second column, pairing $a_2 = 3$ with $b_2 = 1$, so the next term is $(3)(1) = 3$.",
        add: { p2: true },
      },
      {
        text: "It moves once more to the third column, pairing $a_3 = 1$ with $b_3 = 2$, giving $(1)(2) = 2$.",
        add: { p3: true },
      },
      {
        text: "Add the three terms into one number: $a \\cdot b = 8 + 3 + 2 = 13$. In symbols $a \\cdot b = a_1 b_1 + a_2 b_2 + a_3 b_3$, and the same pattern works in any dimension. Just multiply each paired column before adding, never add too early.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Compute the dot product $u \\cdot v$ for $u = (2, 1, 3)$ and $v = (4, 5, 2)$.",
        options: [
          "$19$",
          "$(8, 5, 6)$",
          "$17$",
          "$13$",
        ],
        answer: 0,
        hint: "Multiply the matching parts $(2)(4)$, $(1)(5)$, $(3)(2)$, then add the three products.",
        success: "Yes: $(2)(4) + (1)(5) + (3)(2) = 8 + 5 + 6 = 19$, a single number.",
      },
      {
        kind: "choice",
        prompt: "Which expression gives the dot product of $a = (a_1, a_2, a_3)$ and $b = (b_1, b_2, b_3)$?",
        options: [
          "$a_1 b_1 + a_2 b_2 + a_3 b_3$",
          "$a_1 b_2 + a_2 b_3 + a_3 b_1$",
          "$a_1 + b_1 + a_2 + b_2 + a_3 + b_3$",
          "$(a_1 b_1,\\ a_2 b_2,\\ a_3 b_3)$",
        ],
        answer: 0,
        hint: "Pair each component with the matching one in the other vector, then add the products.",
        success: "Right: $a \\cdot b = a_1 b_1 + a_2 b_2 + a_3 b_3$, matching parts multiplied and then added into one number.",
      },
    ],
  },
  {
    id: "geometric-form-and-sign",
    title: "What does the angle have to do with the dot product?",
    mode: "geometric",
    hideSliders: true,
    baseReveal: { showA: true, showB: true, dock: true },
    beats: [
      {
        text: "The same number also equals $|a|\\,|b|\\cos\\theta$, which is why the sign of the dot product tracks the angle. Consider a new pair, $a = (4, 2)$ and $b = (1, 3)$. From components, $a \\cdot b = (4)(1) + (2)(3) = 4 + 6 = 10$.",
      },
      {
        text: "That same number has a geometric meaning. If $\\theta$ is the angle **between** the two arrows, then $a \\cdot b = |a|\\,|b|\\cos\\theta$. The little arc marks that angle $\\theta$ between $a$ and $b$.",
        add: { angle: true },
      },
      {
        text: "The sign of the dot product has geometric meaning. Lengths $|a|$ and $|b|$ are always positive, so the **sign** of $a \\cdot b$ comes entirely from $\\cos\\theta$. A positive dot product means $\\cos\\theta > 0$, which is an **acute** angle (less than $90^\\circ$).",
      },
      {
        text: "The other cases follow the same logic. If $a \\cdot b = 0$, then $\\cos\\theta = 0$, a **right angle**, so the vectors are **perpendicular**. If $a \\cdot b < 0$, then $\\cos\\theta < 0$, an **obtuse** angle (more than $90^\\circ$).",
      },
      {
        text: "For our pair, $a \\cdot b = 10$, which is positive, so the angle between $a$ and $b$ is acute. That matches the small $\\theta$ marked between the arrows.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Two vectors have $u \\cdot v = -7$. What kind of angle is between them?",
        options: [
          "Acute (less than $90^\\circ$)",
          "A right angle (exactly $90^\\circ$)",
          "They are parallel",
          "Obtuse (more than $90^\\circ$)",
        ],
        answer: 3,
        hint: "A negative dot product forces $\\cos\\theta < 0$. Where is cosine negative?",
        success: "Right: $u \\cdot v < 0$ means $\\cos\\theta < 0$, so the angle is obtuse.",
      },
      {
        kind: "choice",
        prompt: "Two nonzero vectors satisfy $a \\cdot b = 0$. This means they are:",
        options: [
          "Perpendicular (a right angle)",
          "Parallel and pointing the same way",
          "At an acute angle",
          "Equal vectors",
        ],
        answer: 0,
        hint: "If the product $|a|\\,|b|\\cos\\theta$ is zero and neither length is zero, then $\\cos\\theta = 0$.",
        success: "Yes: $a \\cdot b = 0$ forces $\\cos\\theta = 0$, so $\\theta = 90^\\circ$ and the vectors are perpendicular.",
      },
    ],
  },
  {
    id: "angle-between-and-projection",
    title: "The angle and the projection",
    mode: "angle",
    hideSliders: true,
    baseReveal: { showA: true, showB: true, angle: true, dock: true },
    beats: [
      {
        text: "To get the angle itself, solve the geometric form for the cosine. Starting from $a \\cdot b = |a|\\,|b|\\cos\\theta$, divide both sides by $|a|\\,|b|$ to isolate it: $$\\cos\\theta = \\dfrac{a \\cdot b}{|a|\\,|b|}$$",
      },
      {
        text: "We already have $a \\cdot b = 10$. Now the lengths: $|a| = \\sqrt{4^2 + 2^2} = \\sqrt{20}$ and $|b| = \\sqrt{1^2 + 3^2} = \\sqrt{10}$, so $|a|\\,|b| = \\sqrt{20}\\,\\sqrt{10} = \\sqrt{200} = 10\\sqrt{2}$.",
      },
      {
        text: "Substitute: $\\cos\\theta = \\dfrac{10}{10\\sqrt{2}} = \\dfrac{1}{\\sqrt{2}}$. The angle whose cosine is $\\dfrac{1}{\\sqrt{2}}$ is $\\theta = 45^\\circ$, which is exactly the angle marked between the arrows.",
      },
      {
        text: "A closely related idea is the **projection** of $b$ onto $a$, the shadow $b$ casts on the line of $a$. The highlighted segment along $a$ is that shadow, and the dashed line meets $a$ at a right angle where $b$ projects onto it.",
        add: { projection: true },
      },
      {
        text: "The length of the shadow is the **scalar projection** $\\dfrac{a \\cdot b}{|a|} = \\dfrac{10}{\\sqrt{20}} = \\sqrt{5}$. Written as a vector it is the **vector projection**: $$\\dfrac{a \\cdot b}{|a|^2}\\,a = \\dfrac{10}{20}(4, 2) = (2, 1)$$ Make sure to divide by $|a|$ for the length, but by $|a|^2$ for the vector.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Find the angle between $u = (1, 1)$ and $v = (1, 0)$. Use $\\cos\\theta = \\dfrac{u \\cdot v}{|u|\\,|v|}$.",
        options: [
          "$30^\\circ$",
          "$60^\\circ$",
          "$45^\\circ$",
          "$90^\\circ$",
        ],
        answer: 2,
        hint: "Here $u \\cdot v = 1$, $|u| = \\sqrt{2}$, and $|v| = 1$, so $\\cos\\theta = \\dfrac{1}{\\sqrt{2}}$.",
        success: "Yes: $\\cos\\theta = \\dfrac{1}{\\sqrt{2}}$ gives $\\theta = 45^\\circ$.",
      },
      {
        kind: "choice",
        prompt: "For our pair, the vector projection of $b$ onto $a$ is $\\dfrac{a \\cdot b}{|a|^2}\\,a = \\dfrac{10}{20}(4, 2)$. What is it?",
        options: [
          "$(4, 2)$",
          "$(2, 1)$",
          "$(1, 3)$",
          "$(2, -1)$",
        ],
        answer: 1,
        hint: "The scalar out front is $\\dfrac{10}{20} = \\dfrac{1}{2}$, so halve each component of $a = (4, 2)$.",
        success: "Right: $\\dfrac{1}{2}(4, 2) = (2, 1)$. Note it lies along $a$, not along $b$.",
      },
    ],
  },
  {
    id: "your-turn-perpendicular",
    title: "Your turn: the perpendicular test",
    mode: "perp",
    params: [compParam("bx", "b\u2093", 60), compParam("by", "b\u1d67", 60)],
    baseReveal: { showA: true, showB: true, dock: true },
    beats: [
      {
        text: "The sign of the dot product is the perpendicular test. The vector $a = (4, 2)$ stays fixed, and $a \\cdot b = 4b_x + 2b_y$ updates as $b$ turns. Zero is the target value, because zero means a right angle.",
      },
      {
        text: "As $b$ rotates across $a$, the readout falls all the way to $a \\cdot b = 0$. At that instant the two arrows meet at a right angle, so $b$ is **perpendicular** to $a$.",
        to: { bx: -20, by: 40 },
        ms: 2200,
      },
      {
        text: "As $b$ rotates back toward $a$, $a \\cdot b$ rises above zero again, marking an acute angle.",
        to: { bx: 80, by: 20 },
        ms: 2200,
      },
      {
        text: "It comes to rest at $b = (3, 3)$, where $a \\cdot b = 4(3) + 2(3) = 18$, well above zero and far from perpendicular.",
        to: { bx: 60, by: 60 },
        ms: 1800,
      },
    ],
    practice: "Drag the tip of $b$, or use the $b_x$ and $b_y$ sliders, until the readout shows $a \\cdot b = 0$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Move $b$ so that it is **perpendicular** to $a = (4, 2)$, that is, until the readout shows $a \\cdot b = 0$.",
        hint: "Perpendicular means $a \\cdot b = 4b_x + 2b_y = 0$. One easy target is $b = (1, -2)$, since $4(1) + 2(-2) = 4 - 4 = 0$.",
        success: "Perfect: with $a \\cdot b = 0$ the arrows meet at a right angle, so $b$ is perpendicular to $a$.",
        check: (_value, values) => {
          const bx = (values.bx ?? 0) / S;
          const by = (values.by ?? 0) / S;
          const dot = 4 * bx + 2 * by;
          const magB = Math.hypot(bx, by);
          return Math.abs(dot) < 0.6 && magB > 0.5;
        },
      },
      {
        kind: "choice",
        prompt: "Which of these vectors is perpendicular to $a = (4, 2)$?",
        options: [
          "$(2, 1)$",
          "$(-1, -2)$",
          "$(2, 4)$",
          "$(1, -2)$",
        ],
        answer: 3,
        hint: "Test each with $a \\cdot b = 4b_x + 2b_y$. Perpendicular is the one that gives $0$.",
        success: "Right: $4(1) + 2(-2) = 4 - 4 = 0$, so $(1, -2)$ is perpendicular to $a$.",
      },
      {
        kind: "plot",
        prompt: "Click a point where placing the tip of $b$ makes $b$ perpendicular to $a = (4, 2)$.",
        target: { x: 2, y: -4 },
        targets: [
          { x: 2, y: -4 },
          { x: -2, y: 4 },
        ],
        tolerance: 0.6,
        label: "a \u00b7 b = 0",
        hint: "You need $4b_x + 2b_y = 0$. Points like $(2, -4)$ or $(-2, 4)$ work, since $4(2) + 2(-4) = 0$.",
        success: "Yes: that tip gives $a \\cdot b = 0$. Every point along that perpendicular line works too.",
      },
    ],
  },
];
