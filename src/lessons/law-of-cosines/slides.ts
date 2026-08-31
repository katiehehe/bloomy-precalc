import type { ParamSpec, Slide } from "../types";

const angleC = (start: number): ParamSpec => ({
  key: "C",
  label: "Angle C",
  min: 20,
  max: 150,
  start,
  step: 5,
  format: (v) => `C = ${Math.round(v)}\u00b0`,
});

export const slides: Slide[] = [
  {
    id: "setup",
    title: "When the law of sines cannot start",
    mode: "setup",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Many triangles give you two sides with the angle between them, or all three sides, and no side is paired with a known opposite angle. The law of sines has no complete ratio to begin from, so a different relationship is needed.",
      },
      {
        text: "The law of cosines ties the three sides together through a single angle: $$c^2 = a^2 + b^2 - 2ab\\cos C.$$ The angle $C$ is the included angle between sides $a$ and $b$, and the side $c$ it controls is the one opposite it.",
        add: { law: true },
        draw: true,
        ms: 1400,
      },
      {
        text: "Read it as the Pythagorean theorem with a correction term. If $C$ were $90^\\circ$ then $\\cos C = 0$ and the last term would vanish, leaving $c^2 = a^2 + b^2$. The term $-2ab\\cos C$ is exactly what adjusts for an angle that is not a right angle.",
      },
    ],
    practice: "The law of cosines is $c^2 = a^2 + b^2 - 2ab\\cos C$, with $C$ the angle between $a$ and $b$.",
    questions: [
      {
        kind: "choice",
        prompt: "In $c^2 = a^2 + b^2 - 2ab\\cos C$, the angle $C$ is:",
        options: [
          "the angle between sides $a$ and $b$",
          "the angle opposite side $a$",
          "any angle of the triangle",
        ],
        answer: 0,
        hint: "The side $c$ that the formula finds is opposite $C$, so $C$ sits between the other two sides.",
        success: "$C$ is the included angle between $a$ and $b$, and $c$ is the side across from it.",
      },
      {
        kind: "choice",
        prompt: "The law of cosines becomes the Pythagorean theorem when:",
        options: ["$C = 90^\\circ$", "$C = 0^\\circ$", "$a = b$"],
        answer: 0,
        hint: "The correction term drops out when its cosine is zero.",
        success: "At $C = 90^\\circ$, $\\cos C = 0$, so $c^2 = a^2 + b^2$.",
      },
    ],
  },
  {
    id: "derive",
    title: "Where the law of cosines comes from",
    mode: "derive",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Place the triangle in coordinates. Put vertex $C$ at the origin, lay side $a$ along the x-axis so that $B = (a, 0)$, and set $A$ at angle $C$ so that $A = (b\\cos C, b\\sin C)$. Side $c$ is the distance from $A$ to $B$.",
      },
      {
        text: "Write $c^2$ as that squared distance between $A$ and $B$.",
        add: { d1: true },
        draw: true,
        ms: 1300,
      },
      {
        text: "Expand both squares.",
        add: { d2: true },
        draw: true,
        ms: 1300,
      },
      {
        text: "Group the two $b^2$ terms, since they share the common factor $b^2$.",
        add: { d3: true },
        draw: true,
        ms: 1300,
      },
      {
        text: "Because $\\cos^2 C + \\sin^2 C = 1$, that grouped factor is simply $b^2$, and what remains is the law of cosines.",
        add: { d4: true },
        draw: true,
        ms: 1300,
      },
    ],
    practice: "Set $C$ at the origin, write $c^2$ as a squared distance, expand, and collapse $b^2(\\cos^2 C + \\sin^2 C)$ to $b^2$.",
    questions: [
      {
        kind: "choice",
        prompt: "Which identity collapses $b^2\\cos^2 C + b^2\\sin^2 C$ into $b^2$?",
        options: [
          "$\\cos^2 C + \\sin^2 C = 1$",
          "$\\sin 2C = 2\\sin C\\cos C$",
          "$\\cos 2C = 1 - 2\\sin^2 C$",
        ],
        answer: 0,
        hint: "Factor out $b^2$ first, then read the parenthesis.",
        success: "The Pythagorean identity makes the parenthesis equal $1$, leaving $b^2$.",
      },
    ],
  },
  {
    id: "sas",
    title: "Finding a side from SAS",
    goal: "Find side $c$ when $a = 8$, $b = 5$, and $C = 60^\\circ$",
    mode: "sas",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Use the law of cosines for SAS, two sides with the included angle, to find the third side. Here $a = 8$, $b = 5$, and the included angle is $C = 60^\\circ$.",
      },
      {
        text: "Substitute the three values directly into $c^2 = a^2 + b^2 - 2ab\\cos C$.",
        add: { w1: true },
        draw: true,
        ms: 1300,
      },
      {
        text: "Evaluate $\\cos 60^\\circ = \\tfrac12$.",
        add: { w2: true },
        draw: true,
        ms: 1300,
      },
      {
        text: "Combine the numbers, since $64 + 25 = 89$ and $80 \\cdot \\tfrac12 = 40$.",
        add: { w3: true },
        draw: true,
        ms: 1300,
      },
      {
        text: "Take the positive square root of $49$, so $c = 7$.",
        add: { w4: true },
        draw: true,
        ms: 1300,
      },
    ],
    practice: "Substitute $a$, $b$, and $C$ into $c^2 = a^2 + b^2 - 2ab\\cos C$, simplify, and take the square root.",
    questions: [
      {
        kind: "choice",
        prompt: "Which substitution is correct for $a = 8$, $b = 5$, $C = 60^\\circ$?",
        options: [
          "$c^2 = 8^2 + 5^2 - 2(8)(5)\\cos 60^\\circ$",
          "$c^2 = 8^2 + 5^2 + 2(8)(5)\\cos 60^\\circ$",
          "$c^2 = 8^2 + 5^2 - 2(8)(5)\\sin 60^\\circ$",
        ],
        answer: 0,
        hint: "The formula subtracts $2ab\\cos C$, using cosine of the included angle.",
        success: "$c^2 = 64 + 25 - 80\\cos 60^\\circ$, which leads to $c = 7$.",
      },
      {
        kind: "choice",
        prompt: "After simplifying, $c^2 = 49$. So $c$ equals:",
        options: ["$7$", "$49$", "$24.5$"],
        answer: 0,
        hint: "Take the positive square root of $49$.",
        success: "$c = \\sqrt{49} = 7$.",
      },
    ],
  },
  {
    id: "sss",
    title: "Finding an angle from SSS",
    goal: "Find angle $C$ when $a = 8$, $b = 5$, and $c = 7$",
    mode: "sss",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "For SSS, all three sides known, rearrange the law of cosines to solve for the cosine of an angle: $$\\cos C = \\dfrac{a^2 + b^2 - c^2}{2ab}.$$",
      },
      {
        text: "Substitute $a = 8$, $b = 5$, and $c = 7$.",
        add: { u1: true },
        draw: true,
        ms: 1300,
      },
      {
        text: "Simplify: the numerator is $64 + 25 - 49 = 40$ and the denominator is $80$, so $\\cos C = \\tfrac12$.",
        add: { u2: true },
        draw: true,
        ms: 1300,
      },
      {
        text: "Take the inverse cosine, giving $C = 60^\\circ$. Because the inverse cosine of any value from $-1$ to $1$ returns a single angle between $0^\\circ$ and $180^\\circ$, there is no supplement to check, unlike the law of sines.",
        add: { u3: true },
        draw: true,
        ms: 1300,
      },
    ],
    practice: "Solve $\\cos C = \\dfrac{a^2 + b^2 - c^2}{2ab}$, then take the inverse cosine for a single angle.",
    questions: [
      {
        kind: "choice",
        prompt: "Rearranged for the angle, the law of cosines gives:",
        options: [
          "$\\cos C = \\dfrac{a^2 + b^2 - c^2}{2ab}$",
          "$\\cos C = \\dfrac{c^2 - a^2 - b^2}{2ab}$",
          "$\\cos C = \\dfrac{a^2 + b^2 - c^2}{ab}$",
        ],
        answer: 0,
        hint: "Isolate the $-2ab\\cos C$ term, then divide.",
        success: "Solving $c^2 = a^2 + b^2 - 2ab\\cos C$ for $\\cos C$ gives $\\dfrac{a^2 + b^2 - c^2}{2ab}$.",
      },
      {
        kind: "choice",
        prompt: "Why does finding an angle by the law of cosines avoid the two-answer ambiguity of the law of sines?",
        options: [
          "the inverse cosine gives one angle in $0^\\circ$ to $180^\\circ$, and a negative cosine already signals an obtuse angle",
          "cosine is only ever positive",
          "angles from the law of cosines are always acute",
        ],
        answer: 0,
        hint: "Think about the sign of the cosine across the range of triangle angles.",
        success: "Cosine is one-to-one on $0^\\circ$ to $180^\\circ$, so its inverse returns exactly one angle, with obtuse angles marked by a negative cosine.",
      },
    ],
  },
  {
    id: "explore",
    title: "Opening the included angle",
    goal: "Turn the included angle and watch side $c$ respond",
    mode: "explore",
    params: [angleC(50)],
    baseReveal: {},
    beats: [
      {
        text: "Sides $a = 4$ and $b = 3$ stay fixed while the slider turns the included angle $C$. Side $c$ is the one opposite $C$, and it lengthens as the angle opens wider.",
        to: { C: 120 },
        ms: 1600,
      },
      {
        text: "With these sides the law of cosines reads $c^2 = 25 - 24\\cos C$, because $4^2 + 3^2 = 25$ and $2\\cdot 4\\cdot 3 = 24$.",
        to: { C: 60 },
        ms: 1400,
        add: { e1: true },
      },
      {
        text: "As $C$ grows past $90^\\circ$ the cosine turns negative, so $-24\\cos C$ becomes a positive addition and $c$ stretches beyond $5$.",
        to: { C: 120 },
        ms: 1400,
      },
      {
        text: "At exactly $C = 90^\\circ$ the cosine is $0$, so $c^2 = 4^2 + 3^2 = 25$ and $c = 5$, the familiar 3-4-5 right triangle. The law of cosines holds the Pythagorean theorem inside it.",
        to: { C: 90 },
        ms: 1400,
        add: { e2: true },
      },
      {
        text: "Below $90^\\circ$ the angle is acute and $c$ is shorter than $5$, while above $90^\\circ$ the angle is obtuse and $c$ is longer than $5$.",
        to: { C: 50 },
        ms: 1400,
      },
    ],
    practice: "Turn the angle to the right-angle case and read side $c$ off the figure.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Set the included angle $C$ to $90^\\circ$, the right-triangle case.",
        hint: "At $90^\\circ$ the correction term vanishes and $c^2 = 4^2 + 3^2$.",
        success: "At $C = 90^\\circ$, $c^2 = 25$ and $c = 5$, the 3-4-5 right triangle.",
        check: (value) => Math.abs(value - 90) < 3,
      },
      {
        kind: "choice",
        prompt: "As the included angle $C$ increases from $60^\\circ$ toward $120^\\circ$, side $c$:",
        options: [
          "gets longer, since $-2ab\\cos C$ grows as $\\cos C$ falls",
          "gets shorter",
          "stays the same length",
        ],
        answer: 0,
        hint: "A wider angle pushes the opposite vertices farther apart.",
        success: "As $C$ opens, $\\cos C$ decreases, so $-2ab\\cos C$ increases and $c$ grows.",
      },
    ],
  },
];
