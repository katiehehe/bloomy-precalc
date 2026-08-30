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
    title: "The dot product from components",
    mode: "component",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "A vector points somewhere, so it carries a direction. The **dot product** of two vectors is different: it combines them into a single **number** (called a **scalar**), with no direction at all. The first vector is $a = (2, 3)$.",
        add: { showA: true },
      },
      {
        text: "The second vector is $b = (4, 1)$. The dot product $a \\cdot b$ combines the two, matching part with matching part.",
        add: { showB: true },
      },
      {
        text: "In words, the rule multiplies the two $x$-parts, multiplies the two $y$-parts, then **adds** those two products. In symbols, $a \\cdot b = a_1 b_1 + a_2 b_2$. Make sure to pair $a_1$ with $b_1$ and $a_2$ with $b_2$, and to add only at the very end.",
      },
      {
        text: "Now substitute our numbers. The $x$-parts give $(2)(4) = 8$, the $y$-parts give $(3)(1) = 3$, and adding them gives $a \\cdot b = 8 + 3 = 11$. The answer $11$ is just a number, not another arrow.",
        add: { dock: true },
      },
      {
        text: "One common slip is to add the components right away, as in $2 + 4$. Instead, **multiply** each matching pair first, $(2)(4)$ and $(3)(1)$, and only then add the two results. That is why the answer is $11$, not $2 + 3 + 4 + 1$.",
      },
    ],
    practice: "The dot product multiplies matching components, then adds: $a \\cdot b = a_1 b_1 + a_2 b_2$, and the result is a single number.",
    questions: [
      {
        kind: "choice",
        prompt: "Compute the dot product $u \\cdot v$ for $u = (5, 2)$ and $v = (3, 4)$.",
        options: [
          "$14$",
          "$(15, 8)$",
          "$23$",
          "$22$",
        ],
        answer: 2,
        hint: "Multiply the matching parts, $(5)(3)$ and $(2)(4)$, then add the two products.",
        success: "Yes: $(5)(3) + (2)(4) = 15 + 8 = 23$, a single number.",
      },
      {
        kind: "choice",
        prompt: "Which expression gives the dot product of $a = (a_1, a_2)$ and $b = (b_1, b_2)$?",
        options: [
          "$a_1 b_2 + a_2 b_1$",
          "$a_1 b_1 + a_2 b_2$",
          "$a_1 + b_1 + a_2 + b_2$",
          "$(a_1 b_1,\\ a_2 b_2)$",
        ],
        answer: 1,
        hint: "Pair each component with the matching one: $x$ with $x$, $y$ with $y$, then add.",
        success: "Right: $a \\cdot b = a_1 b_1 + a_2 b_2$, matching parts multiplied and then added into one number.",
      },
    ],
  },
  {
    id: "geometric-form-and-sign",
    title: "Geometric form and the sign",
    mode: "geometric",
    hideSliders: true,
    baseReveal: { showA: true, showB: true, dock: true },
    beats: [
      {
        text: "Consider a new pair, $a = (4, 2)$ and $b = (1, 3)$. From components, $a \\cdot b = (4)(1) + (2)(3) = 4 + 6 = 10$.",
      },
      {
        text: "That same number has a geometric meaning. If $\\theta$ is the angle **between** the two arrows, then $a \\cdot b = |a|\\,|b|\\cos\\theta$. The little arc marks that angle $\\theta$ between $a$ and $b$.",
        add: { angle: true },
      },
      {
        text: "The sign of the dot product carries geometric information. Lengths $|a|$ and $|b|$ are always positive, so the **sign** of $a \\cdot b$ comes entirely from $\\cos\\theta$. A positive dot product means $\\cos\\theta > 0$, which is an **acute** angle (less than $90^\\circ$).",
      },
      {
        text: "The other cases follow the same logic. If $a \\cdot b = 0$, then $\\cos\\theta = 0$, a **right angle**, so the vectors are **perpendicular**. If $a \\cdot b < 0$, then $\\cos\\theta < 0$, an **obtuse** angle (more than $90^\\circ$).",
      },
      {
        text: "For our pair, $a \\cdot b = 10$, which is positive, so the angle between $a$ and $b$ is acute. That matches the small $\\theta$ marked between the arrows.",
      },
    ],
    practice: "The sign of $a \\cdot b$ reads the angle: positive is acute, zero is perpendicular, negative is obtuse, because only $\\cos\\theta$ can change the sign.",
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
        prompt: "Two nonzero vectors satisfy $a \\cdot b = 0$. This tells you they are:",
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
    title: "The angle between, and projection",
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
    practice: "Use $\\cos\\theta = \\dfrac{a \\cdot b}{|a|\\,|b|}$ for the angle, and $\\dfrac{a \\cdot b}{|a|^2}\\,a$ for the vector projection of $b$ onto $a$.",
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
        text: "Now put the sign to work. The vector $a = (4, 2)$ stays fixed, and the readout tracks $a \\cdot b = 4b_x + 2b_y$ as $b$ turns. Zero is the target value, because zero means a right angle.",
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
    practice: "Drag the tip of $b$, or use the $b_x$ and $b_y$ sliders, until the readout shows $a \\cdot b = 0$. That is the perpendicular test.",
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
        label: "a\\cdot b = 0",
        hint: "You need $4b_x + 2b_y = 0$. Points like $(2, -4)$ or $(-2, 4)$ work, since $4(2) + 2(-4) = 0$.",
        success: "Yes: that tip gives $a \\cdot b = 0$. Every point along that perpendicular line works too.",
      },
    ],
  },
];
