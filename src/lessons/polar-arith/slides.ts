import type { ParamSpec, Slide } from "../types";

const t1Param = (start: number): ParamSpec => ({
  key: "t1",
  label: "Angle \u03b8\u2081 of z\u2081",
  min: 0,
  max: 180,
  start,
  step: 15,
  format: (v) => `\u03b8\u2081 = ${Math.round(v)}\u00b0`,
});

const t2Param = (start: number): ParamSpec => ({
  key: "t2",
  label: "Angle \u03b8\u2082 of z\u2082",
  min: 0,
  max: 180,
  start,
  step: 15,
  format: (v) => `\u03b8\u2082 = ${Math.round(v)}\u00b0`,
});

export const slides: Slide[] = [
  {
    id: "multiply",
    title: "Multiply: multiply lengths, add angles",
    mode: "geo",
    params: [t1Param(30), t2Param(0)],
    hideSliders: true,
    baseReveal: { z1: true, z2: true },
    beats: [
      {
        text: "Here are two complex numbers drawn as arrows from the origin. The arrow $z_1$ has length $2$ at angle $30^\\circ$, and $z_2$ has length $1$ at angle $0^\\circ$. The length of an arrow is its **modulus**, and the angle it makes with the positive real axis is its **argument**.",
      },
      {
        text: "To multiply them, there are only two moves. First move: **multiply the moduli** (the lengths). Here $2 \\times 1 = 2$, so the product arrow also has length $2$.",
        add: { result: true, dock: true },
      },
      {
        text: "Second move: **add the arguments** (the angles). As $z_2$ turns up to $40^\\circ$, the product arrow swings around to $\\theta_1 + \\theta_2 = 30^\\circ + 40^\\circ = 70^\\circ$. The product always sits at the sum of the two angles.",
        to: { t2: 40 },
        ms: 2400,
        add: { resultArc: true },
      },
      {
        text: "So $z_1 z_2$ has modulus $2 \\cdot 1 = 2$ and argument $30^\\circ + 40^\\circ = 70^\\circ$. The shorthand $\\text{cis}\\,\\theta$ means $\\cos\\theta + i\\sin\\theta$ (cosine plus $i$ sine). To see the angle rule cleanly, take both lengths to be $1$: $(\\cos 20^\\circ + i\\sin 20^\\circ)(\\cos 40^\\circ + i\\sin 40^\\circ) = \\cos 60^\\circ + i\\sin 60^\\circ$. The lengths stay $1$, and the angles add to $60^\\circ$.",
      },
    ],
    practice: "The two moves for a product: multiply the lengths, add the angles.",
    questions: [
      {
        kind: "choice",
        prompt: "To multiply two complex numbers in polar form, you:",
        options: [
          "multiply the moduli and add the arguments",
          "add the moduli and multiply the arguments",
          "add both the moduli and the arguments",
          "multiply both the moduli and the arguments",
        ],
        answer: 0,
        hint: "One move is about lengths, the other is about angles.",
        success: "Right: the lengths multiply and the angles add.",
      },
      {
        kind: "choice",
        prompt: "$z_1$ has modulus $2$ and argument $30^\\circ$. $z_2$ has modulus $1$ and argument $40^\\circ$. What are the modulus and argument of $z_1 z_2$?",
        options: [
          "modulus $2$, argument $70^\\circ$",
          "modulus $3$, argument $70^\\circ$",
          "modulus $2$, argument $1200^\\circ$",
          "modulus $2$, argument $10^\\circ$",
        ],
        answer: 0,
        hint: "Multiply the moduli ($2 \\times 1$) and add the arguments ($30^\\circ + 40^\\circ$).",
        success: "Yes: $2 \\times 1 = 2$ and $30^\\circ + 40^\\circ = 70^\\circ$.",
      },
    ],
  },
  {
    id: "derivation",
    title: "Why the angles add",
    mode: "derive",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Why should the angles add? Expand the product the long way and watch it collapse into a sum. Start with both moduli equal to $1$, so the whole idea is just $(\\cos\\theta_1 + i\\sin\\theta_1)(\\cos\\theta_2 + i\\sin\\theta_2)$.",
      },
      {
        text: "**Expand** with FOIL: multiply every term in the first bracket by every term in the second. The very last piece carries $i^2$, from the two imaginary parts multiplying.",
        add: { s1: true },
      },
      {
        text: "Now the step everyone forgets: $i^2 = -1$. That flips the last term from $+\\sin\\theta_1\\sin\\theta_2$ to $-\\sin\\theta_1\\sin\\theta_2$. Make sure to apply $i^2 = -1$. Skipping it is the most common mistake in this whole topic.",
        add: { s2: true },
      },
      {
        text: "**Group** the terms: put the two real terms together, and the two terms carrying $i$ together. Nothing has changed yet, we are just sorting.",
        add: { s3: true },
      },
      {
        text: "Now look closely. The real group $\\cos\\theta_1\\cos\\theta_2 - \\sin\\theta_1\\sin\\theta_2$ is exactly $\\cos(\\theta_1 + \\theta_2)$, and the imaginary group $\\sin\\theta_1\\cos\\theta_2 + \\cos\\theta_1\\sin\\theta_2$ is exactly $\\sin(\\theta_1 + \\theta_2)$. Those are the **sum identities**, so the product is $\\cos(\\theta_1 + \\theta_2) + i\\sin(\\theta_1 + \\theta_2)$: the angle became a sum.",
        add: { s4: true },
      },
      {
        text: "Finally put the lengths back. Each number carried a modulus, so the full rule is $z_1 z_2 = r_1 r_2\\left[\\cos(\\theta_1 + \\theta_2) + i\\sin(\\theta_1 + \\theta_2)\\right]$. The moduli multiply and the arguments add, which is exactly what the picture showed.",
        add: { s5: true },
      },
    ],
    practice: "The angle rule is not magic: it is the sum identities, once you use $i^2 = -1$.",
    questions: [
      {
        kind: "choice",
        prompt: "When you expand $(\\cos\\theta_1 + i\\sin\\theta_1)(\\cos\\theta_2 + i\\sin\\theta_2)$, the term $i^2\\sin\\theta_1\\sin\\theta_2$ becomes:",
        options: [
          "$-\\sin\\theta_1\\sin\\theta_2$",
          "$+\\sin\\theta_1\\sin\\theta_2$",
          "$i\\sin\\theta_1\\sin\\theta_2$",
          "$-i\\sin\\theta_1\\sin\\theta_2$",
        ],
        answer: 0,
        hint: "Replace $i^2$ with $-1$.",
        success: "Yes: $i^2 = -1$, so the term becomes $-\\sin\\theta_1\\sin\\theta_2$.",
      },
      {
        kind: "choice",
        prompt: "After using $i^2 = -1$ and grouping, the real part $\\cos\\theta_1\\cos\\theta_2 - \\sin\\theta_1\\sin\\theta_2$ equals:",
        options: [
          "$\\cos(\\theta_1 + \\theta_2)$",
          "$\\cos(\\theta_1 - \\theta_2)$",
          "$\\sin(\\theta_1 + \\theta_2)$",
          "$\\cos\\theta_1 - \\cos\\theta_2$",
        ],
        answer: 0,
        hint: "This is the cosine sum identity read backward.",
        success: "Right: $\\cos\\theta_1\\cos\\theta_2 - \\sin\\theta_1\\sin\\theta_2 = \\cos(\\theta_1 + \\theta_2)$.",
      },
    ],
  },
  {
    id: "divide",
    title: "Divide: divide lengths, subtract angles",
    mode: "geo-div",
    params: [t1Param(90), t2Param(0)],
    hideSliders: true,
    baseReveal: { z1: true, z2: true },
    beats: [
      {
        text: "Division follows the mirror-image rule. Here is $z_1$ with length $2$ at angle $90^\\circ$, and $z_2$ with length $1$ at angle $0^\\circ$. We want the arrow for the quotient $z_1 / z_2$.",
      },
      {
        text: "First move: **divide the moduli** (the lengths). Here $2 \\div 1 = 2$, so the quotient arrow has length $2$.",
        add: { result: true, dock: true },
      },
      {
        text: "Second move: **subtract the arguments**. As $z_2$ turns up to $30^\\circ$, the quotient angle drops to $\\theta_1 - \\theta_2 = 90^\\circ - 30^\\circ = 60^\\circ$. Where multiplying added the angles, dividing takes them away.",
        to: { t2: 30 },
        ms: 2400,
        add: { resultArc: true },
      },
      {
        text: "So $z_1 / z_2$ has modulus $2 \\div 1 = 2$ and argument $90^\\circ - 30^\\circ = 60^\\circ$. In general, $\\dfrac{r_1(\\cos\\theta_1 + i\\sin\\theta_1)}{r_2(\\cos\\theta_2 + i\\sin\\theta_2)} = \\dfrac{r_1}{r_2}\\left[\\cos(\\theta_1 - \\theta_2) + i\\sin(\\theta_1 - \\theta_2)\\right]$.",
      },
      {
        text: "Make sure to subtract in the right order: it is $\\theta_1 - \\theta_2$, top minus bottom, not $\\theta_2 - \\theta_1$. For example, $z_1 = 2(\\cos 30^\\circ + i\\sin 30^\\circ)$ divided by $z_2 = 3(\\cos 40^\\circ + i\\sin 40^\\circ)$ has modulus $\\tfrac{2}{3}$ and argument $30^\\circ - 40^\\circ = -10^\\circ$.",
      },
    ],
    practice: "The two moves for a quotient: divide the lengths, subtract the angles (top minus bottom).",
    questions: [
      {
        kind: "choice",
        prompt: "To divide $z_1$ by $z_2$ in polar form, you:",
        options: [
          "divide the moduli and subtract the arguments",
          "subtract the moduli and divide the arguments",
          "divide both the moduli and the arguments",
          "subtract both the moduli and the arguments",
        ],
        answer: 0,
        hint: "It is the mirror image of the product rule.",
        success: "Right: the lengths divide and the angles subtract.",
      },
      {
        kind: "choice",
        prompt: "For $z_1 / z_2$ with $\\arg z_1 = 30^\\circ$ and $\\arg z_2 = 40^\\circ$, the argument of the quotient is:",
        options: ["$-10^\\circ$", "$10^\\circ$", "$70^\\circ$", "$0.75^\\circ$"],
        answer: 0,
        hint: "Subtract top minus bottom: $30^\\circ - 40^\\circ$.",
        success: "Yes: $30^\\circ - 40^\\circ = -10^\\circ$, so the quotient points just below the real axis.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn",
    mode: "geo",
    params: [t1Param(30), t2Param(15)],
    baseReveal: { z1: true, z2: true, result: true, resultArc: true, dock: true },
    beats: [
      {
        text: "These two arrows are $z_1$ and $z_2$, and the third arrow is their product $z_1 z_2$. It always lands at modulus $2$ and argument $\\theta_1 + \\theta_2$, so steering the two inputs steers the product.",
        to: { t1: 45, t2: 30 },
        ms: 2400,
      },
      {
        text: "Because the product angle is the running total $\\theta_1 + \\theta_2$, you can aim the product anywhere by choosing angles that add up to the direction you want.",
        to: { t1: 60, t2: 15 },
        ms: 2400,
      },
    ],
    practice: "Drag the $\\theta_1$ and $\\theta_2$ sliders (or drag on the plane) to aim the product. The readout shows $\\theta_1 + \\theta_2$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Steer the product straight up: set the angles so $\\theta_1 + \\theta_2 = 90^\\circ$ (the product then points along the positive imaginary axis).",
        hint: "Any pair that adds to $90^\\circ$ works, for example $\\theta_1 = 45^\\circ$ and $\\theta_2 = 45^\\circ$, or $\\theta_1 = 60^\\circ$ and $\\theta_2 = 30^\\circ$.",
        success: "At $\\theta_1 + \\theta_2 = 90^\\circ$ the product is $2(\\cos 90^\\circ + i\\sin 90^\\circ) = 2i$, pointing straight up.",
        check: (_value, values) =>
          Math.abs(Math.round(values.t1 ?? 0) + Math.round(values.t2 ?? 0) - 90) < 1,
      },
      {
        kind: "choice",
        prompt: "Switching to division: for $z_1 / z_2$ with $\\theta_1 = 80^\\circ$ and $\\theta_2 = 30^\\circ$, the quotient's argument is:",
        options: ["$50^\\circ$", "$110^\\circ$", "$-50^\\circ$", "$\\tfrac{8}{3}^\\circ$"],
        answer: 0,
        hint: "Divide subtracts the angles, top minus bottom: $80^\\circ - 30^\\circ$.",
        success: "Yes: $80^\\circ - 30^\\circ = 50^\\circ$.",
      },
    ],
  },
];
