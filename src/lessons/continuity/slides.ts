import type { ParamSpec, Slide } from "../types";

/**
 * Continuity at a point and the three types of discontinuity. The running thread
 * is the three-part definition (value defined, limit exists, they are equal),
 * then the three ways it fails: a removable hole, a jump, and an infinite
 * discontinuity (a vertical asymptote). Holes and walls are the discontinuity
 * pictures that connect back to rational functions.
 *
 * Reveal flags are read literally in Stage.tsx (kept in sync, zero dead flags):
 *   three:     curve, dot, approach, level
 *   removable: curve, fact, canc, hole, patch
 *   jump:      curve, openDot, closedDot, gap
 *   infinite:  curve, wall, signs
 *   yourturn:  curve   (the hole and the movable point follow the v slider)
 */

const heightParam: ParamSpec = {
  key: "v",
  label: "value f(2)",
  min: 0,
  max: 50,
  start: 10,
  step: 1,
  // Slider value v in [0, 50] stands for the height f(2) = v / 10, so 0.0 to 5.0.
  format: (v) => `f(2) = ${(Math.round(v) / 10).toFixed(1)}`,
};

export const slides: Slide[] = [
  {
    id: "three",
    title: "What is continuity?",
    mode: "three",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "A function is **continuous** at $x = a$ when three things hold at once: $f(a)$ is defined, the two-sided limit exists, and those two values are equal. On the graph that means you can trace through the point without lifting the pencil.",
        add: { curve: true },
        draw: true,
      },
      {
        text: "There are exactly **three conditions**, and all three must hold. **Condition 1: $f(a)$ is defined**, meaning the function has a real output at $x = a$ rather than a gap. At $x = 2$, $f(2) = \\tfrac{1}{2}(2)^2 = 2$, so the point $(2, 2)$ is right on the curve and condition 1 holds.",
        add: { dot: true },
      },
      {
        text: "**Condition 2: the limit $\\lim_{x \\to 2} f(x)$ exists**, where a **limit** is the single height the curve heads toward as $x$ creeps in from both sides. From the left (inputs just below $2$) the curve rises toward height $2$, and from the right (inputs just above $2$) it settles toward $2$ as well. The two sides agree, so the limit exists and equals $2$.",
        add: { approach: true },
      },
      {
        text: "**Condition 3: the limit equals the value**: $$\\lim_{x \\to 2} f(x) = f(2)$$ The height the curve approaches ($2$) is exactly the height of the plotted point ($2$), so $2 = 2$. All three conditions hold, so $f$ is continuous at $x = 2$, and the pencil never lifts.",
        add: { level: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Which list gives ALL of the requirements for $f$ to be continuous at $x = a$?",
        options: [
          "$f(a)$ is defined, $\\lim_{x \\to a} f(x)$ exists, and $\\lim_{x \\to a} f(x) = f(a)$",
          "$f(a)$ is defined, and that is enough",
          "$\\lim_{x \\to a} f(x)$ exists, and that is enough",
          "$f(a)$ is defined and $f$ is increasing at $a$",
        ],
        answer: 0,
        hint: "Count three separate things: a value, a two-sided limit, and the two being equal.",
        success: "Right: a defined value, an existing two-sided limit, and the two matching.",
      },
      {
        kind: "choice",
        prompt: "For $f(x) = \\tfrac{1}{2}x^2$ we found $f(2) = 2$ and $\\lim_{x \\to 2} f(x) = 2$. Is $f$ continuous at $x = 2$?",
        options: [
          "Yes: the value and the limit both equal $2$, so all three conditions hold",
          "No: a parabola can never be continuous",
          "No: the limit would have to be $0$ for continuity",
          "There is not enough information to decide",
        ],
        answer: 0,
        hint: "Value defined, limit exists, and value equals limit?",
        success: "Yes: defined, the limit exists, and the value equals the limit.",
      },
    ],
  },
  {
    id: "removable",
    title: "What is a removable discontinuity?",
    mode: "removable",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "A **removable hole** is a break where the limit exists but $g(a)$ does not. For $$g(x) = \\dfrac{x^2 - 4}{x - 2}$$ substituting $x = 2$ gives $\\tfrac{0}{0}$, so $g(2)$ is undefined and condition 1 already fails.",
        add: { curve: true },
        draw: true,
      },
      {
        text: "Why a line? **Factor** the numerator by the difference of squares, $x^2 - 4 = (x - 2)(x + 2)$, then **cancel** the common factor $x - 2$, which is allowed because $x \\ne 2$ keeps $x - 2$ nonzero. That leaves $g(x) = x + 2$ for all $x \\ne 2$, so $g$ matches the line $y = x + 2$ except at $x = 2$.",
        add: { fact: true, canc: true },
      },
      {
        text: "What happens at $x = 2$ itself? The **limit** still exists, because as $x$ approaches $2$ from both sides, $g(x) = x + 2$ approaches $2 + 2 = 4$. Yet nothing is plotted at $(2, 4)$ since $g(2)$ is undefined, so that single missing point is a **hole**, an open circle marking the spot the curve approaches but never reaches.",
        add: { hole: true },
      },
      {
        text: "Because the limit exists and equals $4$, the function can be **patched** by defining $g(2) = 4$, dropping a filled point into the hole so that all three conditions hold at $x = 2$. Since a single redefinition fixes it, this is a **removable discontinuity**, and the limit already gives the value to plug in.",
        add: { patch: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "For $g(x) = \\dfrac{x^2 - 4}{x - 2}$, why is $x = 2$ a hole rather than a wall?",
        options: [
          "The factor $x - 2$ cancels, so the limit exists ($4$). Only the single value $g(2)$ is missing",
          "The graph shoots off to infinity at $x = 2$",
          "The numerator is never zero near $x = 2$",
          "$g$ is a polynomial, so it cannot be discontinuous",
        ],
        answer: 0,
        hint: "Factor top and bottom and see which factor cancels.",
        success: "Right: $x - 2$ cancels, the limit is $4$, and only the point $g(2)$ is missing.",
      },
      {
        kind: "choice",
        prompt: "How do you remove the discontinuity of $g$ at $x = 2$?",
        options: [
          "You cannot, because the limit does not exist",
          "Define $g(2) = 4$, the value of the limit",
          "Define $g(2) = 0$",
          "Draw a vertical asymptote at $x = 2$",
        ],
        answer: 1,
        hint: "The two-sided limit is $4$. Set the value equal to the limit.",
        success: "Yes: defining $g(2) = 4$ fills the hole and restores continuity.",
      },
    ],
  },
  {
    id: "jump",
    title: "What is a jump discontinuity?",
    mode: "jump",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "A **jump** is a break where the two one-sided limits disagree, so the break cannot be patched. The piecewise function $f(x) = x + 1$ when $x < 1$ and $f(x) = x + 3$ when $x \\ge 1$ is two line segments meeting at the seam $x = 1$.",
        add: { curve: true },
        draw: true,
      },
      {
        text: "Approach $x = 1$ from the **left**, using inputs just below $1$, where the rule $f(x) = x + 1$ heads toward $1 + 1 = 2$. This is the **left-hand limit**, written $\\lim_{x \\to 1^-} f(x) = 2$. The open circle at $(1, 2)$ means the curve rises to that height without including the point itself, because at $x = 1$ the left rule no longer applies.",
        add: { openDot: true },
      },
      {
        text: "Now approach from the **right**, using inputs just above $1$. The rule $f(x) = x + 3$ heads toward $1 + 3 = 4$, so the **right-hand limit** is $\\lim_{x \\to 1^+} f(x) = 4$. At $x = 1$ itself the rule $x + 3$ gives $f(1) = 4$, a filled point at $(1, 4)$, so condition 1 holds since the value exists.",
        add: { closedDot: true },
      },
      {
        text: "The left gives $2$ and the right gives $4$, and since $2 \\ne 4$ the curve approaches two different heights, so the two-sided limit **does not exist** and condition 2 fails. This is a **jump discontinuity**, where the graph steps from $2$ up to $4$, a jump of $4 - 2 = 2$. No single point can bridge two disagreeing sides, so a jump is not removable.",
        add: { gap: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "For this piecewise $f$, $\\lim_{x \\to 1^-} f(x) = 2$ and $\\lim_{x \\to 1^+} f(x) = 4$. What holds at $x = 1$?",
        options: [
          "The two-sided limit is $3$, the average of $2$ and $4$",
          "The two-sided limit does not exist, because the left and right limits differ",
          "The two-sided limit is $2$",
          "$f$ is continuous, since both one-sided limits exist",
        ],
        answer: 1,
        hint: "A two-sided limit exists only when the left and right limits agree.",
        success: "Right: $2 \\ne 4$, so the two-sided limit does not exist.",
      },
      {
        kind: "choice",
        prompt: "Can the jump at $x = 1$ be removed by redefining $f(1)$?",
        options: [
          "Yes: set $f(1) = 3$ to land between the sides",
          "Yes: any jump is removable",
          "No: the left and right limits disagree, so no single value makes it continuous",
          "Yes: set $f(1) = 2$",
        ],
        answer: 2,
        hint: "Removable requires the two-sided limit to exist first.",
        success: "Right: a jump has no two-sided limit, so redefining one point cannot fix it.",
      },
    ],
  },
  {
    id: "infinite",
    title: "What is an infinite discontinuity?",
    mode: "infinite",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "An **infinite discontinuity** is a vertical wall where the graph grows without bound. For $$f(x) = \\dfrac{1}{x - 2}$$ the input $x = 2$ makes the denominator $0$, so $f(2)$ is undefined and the graph grows without bound rather than leaving a hole.",
        add: { curve: true },
        draw: true,
      },
      {
        text: "A dashed **vertical asymptote** now marks $x = 2$, a wall the graph races alongside but never crosses. Near $x = 2$ the numerator stays a normal size ($1$) while the denominator $x - 2$ shrinks toward $0$. Dividing $1$ by something tiny gives something enormous, so $|f(x)|$ grows without bound as $x$ nears $2$.",
        add: { wall: true },
      },
      {
        text: "The sign depends on the side. Just to the **right** of $2$, $x - 2$ is a tiny **positive** number, so $f(x) \\to +\\infty$. Just to the **left** of $2$, it is a tiny **negative** number, so $f(x) \\to -\\infty$.",
        add: { signs: true },
      },
      {
        text: "The curve runs to $+\\infty$ on one side and $-\\infty$ on the other, so the limit is not finite and **does not exist**, and condition 2 fails. Unlike the hole, which had a finite limit to fill, there is no finite height here, so an **infinite discontinuity cannot** be removed by any value at $x = 2$.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Why does $f(x) = \\dfrac{1}{x - 2}$ have a vertical asymptote at $x = 2$?",
        options: [
          "The numerator and denominator both go to $0$, leaving a hole",
          "The numerator goes to $0$ while the denominator stays nonzero",
          "The denominator goes to $0$ while the numerator stays $1$, so $|f|$ grows without bound",
          "The function equals $0$ at $x = 2$",
        ],
        answer: 2,
        hint: "Compare the sizes of the top and the bottom as $x$ nears $2$.",
        success: "Right: $1$ over a tiny number is enormous, so the graph blows up.",
      },
      {
        kind: "choice",
        prompt: "Can the infinite discontinuity of $f(x) = \\dfrac{1}{x - 2}$ at $x = 2$ be patched by defining a value there?",
        options: [
          "No: the limit is infinite (not a finite number), so there is nothing to fill",
          "Yes: define $f(2) = 0$",
          "Yes: define $f(2)$ equal to the limit",
          "Yes: every discontinuity is removable",
        ],
        answer: 0,
        hint: "Patching needs a finite two-sided limit to copy.",
        success: "Right: with no finite limit, an infinite discontinuity is not removable.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn: fill a removable hole",
    mode: "yourturn",
    params: [heightParam],
    baseReveal: { curve: true },
    beats: [
      {
        text: "Return to the removable case: $g(x) = x + 2$ with a hole at $(2, 4)$, where the limit is $4$ but the value is missing. A filled point now is at $x = 2$, and right now its height reads $f(2) = 1.0$, well below the curve. With the value ($1$) not equal to the limit ($4$), condition 3 fails, so $g$ is still discontinuous at $x = 2$.",
      },
      {
        text: "To make $g$ continuous at $x = 2$, all three conditions must hold. Conditions 1 and 2 are ready, since placing a point defines $g(2)$ and the limit already equals $4$. Condition 3 is the only piece left, so the point must land at height $4$ to fill the hole, and anywhere else leaves a stray point off the curve.",
      },
      {
        text: "When the height reads $4.0$, the filled point drops into the hole and the pencil can pass straight through, so $g$ is continuous at $x = 2$. That is exactly what it means to remove a removable discontinuity: set the value equal to the limit.",
      },
    ],
    practice: "Slide $f(2)$ until the filled point is in the hole at height $4$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Slide the point until $g$ is continuous at $x = 2$: make the value $f(2)$ equal the limit, which is $4$.",
        hint: "The limit is $4$, so set the height to $4.0$. The point lands right in the hole.",
        success: "Perfect: with $f(2) = 4$ the value equals the limit, the hole is filled, and $g$ is continuous.",
        check: (_value, values) => Math.round(values.v ?? 10) === 40,
      },
      {
        kind: "choice",
        prompt: "Setting $f(2) = 4$ made $g$ continuous, yet a jump could not be fixed by redefining one point. Why the difference?",
        options: [
          "It worked only by luck. Any height would have done",
          "Here the two-sided limit exists ($4$), so matching the value to it removes the hole. A jump has no two-sided limit to match",
          "A jump can be fixed the same way",
          "Because $g$ is a polynomial with no discontinuity",
        ],
        answer: 1,
        hint: "Removable means the two-sided limit already exists before you patch.",
        success: "Right: a finite two-sided limit is exactly what makes a discontinuity removable.",
      },
    ],
  },
];
