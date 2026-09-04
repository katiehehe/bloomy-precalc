import type { ParamSpec, Slide } from "../types";

/**
 * Classifying a conic from the general form A x^2 + C y^2 + D x + E y + F = 0.
 * The type comes entirely from A and C (the squared-term coefficients):
 *   AC = 0 -> parabola;  AC > 0 -> ellipse (circle if A = C);  AC < 0 -> hyperbola.
 * Reveal flags are read literally in Stage.tsx:
 *   general/hyperbola/parabola: ac, verdict, curve, dock
 *   complete: e1, e2, e3, e4 (AlgebraFlow steps) + dock
 *   yourturn: dock (the curve always shows and morphs with C)
 */

const cParam: ParamSpec = {
  key: "c",
  label: "coefficient C on y\u00b2 (with A = 1)",
  min: -3,
  max: 5,
  start: 4,
  step: 1,
  format: (v) => `C = ${Math.round(v)}`,
};

export const slides: Slide[] = [
  {
    id: "read-a-and-c",
    title: "Squared terms and the type of conic",
    mode: "general",
    hideSliders: true,
    baseReveal: { dock: true },
    beats: [
      {
        text: "The four conics appear together in the **general form** $$A x^2 + C y^2 + D x + E y + F = 0$$ The product $AC$ of the squared-term coefficients shows which type the equation is.",
      },
      {
        text: "The rule has four cases. If exactly **one** of $A$ and $C$ is zero, only one variable is squared and the conic is a **parabola**. If both are nonzero with the **same sign**, equal coefficients ($A = C$) give a **circle** and unequal ones give an **ellipse**.",
      },
      {
        text: "If instead $A$ and $C$ have **opposite signs**, the conic is a **hyperbola**. The product $AC$ sums it up: $AC = 0$ is a parabola, $AC > 0$ an ellipse (a circle when $A = C$), and $AC < 0$ a hyperbola.",
      },
      {
        text: "Apply it to $4x^2 + 9y^2 - 36 = 0$: the squared terms give $A = 4$ and $C = 9$. Both are positive, so $AC = 36 > 0$ and the signs match. Because $4 \\ne 9$ the coefficients are unequal, so this is an **ellipse** rather than a circle.",
        add: { ac: true, verdict: true },
      },
      {
        text: "The graph is an ellipse. Because the coefficient on $x^2$ is smaller, the curve reaches farther along $x$. Dividing through by $36$ gives $$\\frac{x^2}{9} + \\frac{y^2}{4} = 1$$ with semi-axes $3$ across and $2$ up.",
        add: { curve: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "In $A x^2 + C y^2 + D x + E y + F = 0$, which coefficients determine the **type** of conic?",
        options: ["$A$ and $C$, on the squared terms", "$D$ and $E$, on the linear terms", "$F$, the constant", "all six equally"],
        answer: 0,
        hint: "The squared terms set the shape. The linear terms only shift it and $F$ only sizes it.",
        success: "Right: only $A$ and $C$ (the squared-term coefficients) determine the type.",
      },
      {
        kind: "choice",
        prompt: "For $4x^2 + 9y^2 - 36 = 0$, the values $A = 4$, $C = 9$ mean it is:",
        options: ["a circle", "an ellipse", "a parabola", "a hyperbola"],
        answer: 1,
        hint: "Both nonzero, same sign, but $A \\ne C$.",
        success: "Yes: same sign and unequal, so $AC > 0$ with $A \\ne C$ gives an ellipse.",
      },
    ],
  },
  {
    id: "complete-the-square",
    title: "Why $A = C$ gives a circle",
    mode: "complete",
    hideSliders: true,
    baseReveal: { dock: true },
    beats: [
      {
        text: "When $A$ and $C$ are equal (and nonzero), the conic is a **circle**. Take $x^2 + y^2 - 4x - 6y + 9 = 0$: here $A = 1$ and $C = 1$, so $A = C$ and we expect a circle. To find its center and radius, **complete the square** in $x$ and in $y$, one variable at a time.",
      },
      {
        text: "Group the $x$ terms and the $y$ terms: $(x^2 - 4x) + (y^2 - 6y) + 9 = 0$. Completing the square means adding the square of half each linear coefficient. Half of $-4$ is $-2$, and half of $-6$ is $-3$.",
        add: { e1: true },
      },
      {
        text: "So $x^2 - 4x$ becomes $(x - 2)^2 - 4$ (we added $4$, so we subtract it back), and $y^2 - 6y$ becomes $(y - 3)^2 - 9$. Substitute both: $(x - 2)^2 - 4 + (y - 3)^2 - 9 + 9 = 0$.",
        add: { e2: true },
      },
      {
        text: "Combine the loose numbers, $-4 - 9 + 9 = -4$, and move them across: $$(x - 2)^2 + (y - 3)^2 = 4$$",
        add: { e3: true },
      },
      {
        text: "That is a circle in standard form: center $(2, 3)$ and radius $r = \\sqrt{4} = 2$. The equal coefficients $A = C = 1$ guaranteed a circle. Completing the square just located it.",
        add: { e4: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Two nonzero squared terms with **equal** coefficients, like $x^2 + y^2 - 4x - 6y + 9 = 0$, give:",
        options: ["a circle", "an ellipse", "a parabola", "a hyperbola"],
        answer: 0,
        hint: "$A = C$ (both $1$ here) is the special same-sign case.",
        success: "Right: $A = C$ makes it a circle.",
      },
      {
        kind: "choice",
        prompt: "Completing the square turns $x^2 + y^2 - 4x - 6y + 9 = 0$ into $(x-2)^2 + (y-3)^2 = 4$. Its center and radius are:",
        options: ["center $(2, 3)$, $r = 2$", "center $(-2, -3)$, $r = 2$", "center $(2, 3)$, $r = 4$", "center $(4, 9)$, $r = 3$"],
        answer: 0,
        hint: "Standard form is $(x - h)^2 + (y - k)^2 = r^2$. Read $h, k$ and take the square root of the right side.",
        success: "Yes: $(h, k) = (2, 3)$ and $r = \\sqrt{4} = 2$.",
      },
    ],
  },
  {
    id: "opposite-signs",
    title: "Why opposite signs give a hyperbola",
    mode: "hyperbola",
    hideSliders: true,
    baseReveal: { dock: true },
    beats: [
      {
        text: "In $x^2 - y^2 - 4 = 0$ the squared terms are $+x^2$ and $-y^2$, so $A = 1$ and $C = -1$. They have **opposite signs**, which means $AC = -1 < 0$.",
        add: { ac: true },
      },
      {
        text: "Opposite signs always mean a **hyperbola**. A plus and a minus on the squared terms can never make an ellipse, no matter how large the coefficients are.",
        add: { verdict: true },
      },
      {
        text: "The graph is two branches opening left and right, approaching the dashed **asymptotes**. Rewriting gives $$\\frac{x^2}{4} - \\frac{y^2}{4} = 1$$ The branches cross the $x$-axis at $\\pm 2$, and the asymptotes are the lines $y = \\pm x$.",
        add: { curve: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "$x^2 - y^2 - 4 = 0$ has $A = 1$ and $C = -1$. What conic is it?",
        options: ["an ellipse", "a hyperbola", "a circle", "a parabola"],
        answer: 1,
        hint: "The squared terms have opposite signs, so $AC < 0$.",
        success: "Right: opposite signs ($AC < 0$) make a hyperbola.",
      },
      {
        kind: "choice",
        prompt: "Which sign pattern on the squared terms guarantees a hyperbola?",
        options: ["same sign, equal", "same sign, unequal", "opposite signs", "one coefficient is zero"],
        answer: 2,
        hint: "Think about the product $AC$.",
        success: "Yes: opposite signs give $AC < 0$, a hyperbola.",
      },
    ],
  },
  {
    id: "missing-square",
    title: "Why a missing square gives a parabola",
    mode: "parabola",
    hideSliders: true,
    baseReveal: { dock: true },
    beats: [
      {
        text: "In $x^2 - 4x - y + 4 = 0$ there is an $x^2$ term but **no $y^2$ term**, so $A = 1$ and $C = 0$. When exactly one variable is squared, the conic is a **parabola**.",
        add: { ac: true },
      },
      {
        text: "Because $y$ appears only to the first power, we can solve for it: $$y = x^2 - 4x + 4 = (x - 2)^2$$ That is a parabola with vertex $(2, 0)$, opening up.",
        add: { verdict: true },
      },
      {
        text: "The graph is a single U-shaped branch, neither a closed oval nor two separate pieces, because one squared term produces exactly one branch.",
        add: { curve: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "$x^2 - 4x - y + 4 = 0$ has an $x^2$ term but no $y^2$ term ($A = 1$, $C = 0$). It is:",
        options: ["a parabola", "a circle", "an ellipse", "a hyperbola"],
        answer: 0,
        hint: "Only one variable is squared.",
        success: "Right: exactly one squared term means a parabola.",
      },
      {
        kind: "choice",
        prompt: "A conic has $AC = 0$ (one squared-term coefficient is zero). It must be:",
        options: ["a parabola", "a hyperbola", "a circle", "impossible"],
        answer: 0,
        hint: "$AC = 0$ means one variable is missing its square.",
        success: "Yes: $AC = 0$ is exactly the parabola case.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn: classify a conic from $A$ and $C$",
    mode: "yourturn",
    params: [cParam],
    baseReveal: { dock: true },
    beats: [
      {
        text: "The equation is $x^2 + C\\,y^2 = 4$, so $A = 1$ stays fixed while $C$ varies. At the start $C = 4$ gives two positive but unequal coefficients, so $AC > 0$ with $A \\ne C$ marks an **ellipse**.",
      },
      {
        text: "As $C$ falls to $1$, the coefficients match ($A = C = 1$) and the ellipse rounds into a **circle** of radius $2$, namely $x^2 + y^2 = 4$.",
        to: { c: 1 },
        ms: 2000,
      },
      {
        text: "When $C$ falls below zero the sign of $y^2$ flips. At $C = -1$ the equation becomes $x^2 - y^2 = 4$, whose opposite signs open the closed curve into a **hyperbola** with two branches. The type changes the instant $C$ turns negative.",
        to: { c: -1 },
        ms: 2200,
      },
    ],
    practice: "Slide $C$ until $x^2 + C y^2 = 4$ becomes a circle.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Slide $C$ until the conic $x^2 + C y^2 = 4$ becomes a **circle**.",
        hint: "A circle needs $A = C$. Here $A = 1$, so set $C = 1$.",
        success: "Yes: at $C = 1$ the equation is $x^2 + y^2 = 4$, a circle of radius $2$.",
        check: (_value, values) => Math.round(values.c ?? 4) === 1,
      },
      {
        kind: "choice",
        prompt: "For which values of $C$ is $x^2 + C y^2 = 4$ a **hyperbola**?",
        options: ["$C < 0$", "$C = 1$", "$C > 1$", "$C = 0$"],
        answer: 0,
        hint: "A hyperbola needs opposite signs on the squared terms.",
        success: "Right: $C < 0$ puts a minus on $y^2$, giving opposite signs and a hyperbola.",
      },
      {
        kind: "choice",
        prompt: "As you cross $C = 0$, the equation $x^2 + C y^2 = 4$ momentarily becomes $x^2 = 4$. That is:",
        options: [
          "a degenerate case: the pair of lines $x = \\pm 2$",
          "still an ellipse",
          "a parabola",
          "a circle of radius $4$",
        ],
        answer: 0,
        hint: "With no $y^2$ term and no $y$ term at all, solve $x^2 = 4$ for $x$.",
        success: "Yes: $x^2 = 4$ gives $x = \\pm 2$, two vertical lines, the degenerate boundary between ellipse and hyperbola.",
      },
    ],
  },
];
