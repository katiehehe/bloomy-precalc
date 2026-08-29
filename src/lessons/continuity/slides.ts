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
    title: "What continuity means",
    mode: "three",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Continuity is the idea of an unbroken graph. A function $f$ is **continuous at $x = a$** when you can trace the curve straight through the point above $x = a$ without lifting your pencil: no hole, no sudden jump, and no place where the graph shoots off to infinity. Here is a smooth curve, $f(x) = \\tfrac{1}{2}x^2$, and we will test continuity at $x = 2$.",
        add: { curve: true },
        draw: true,
      },
      {
        text: "There are exactly **three conditions**, and all three must hold. **Condition 1: $f(a)$ is defined.** The function actually has an output at $x = a$, so there is a real point on the graph and not a gap. At $x = 2$ we get $f(2) = \\tfrac{1}{2}(2)^2 = 2$, so the point $(2, 2)$ sits right on the curve. Condition 1 holds.",
        add: { dot: true },
      },
      {
        text: "**Condition 2: the limit $\\lim_{x \\to 2} f(x)$ exists.** A **limit** is the single height the curve heads toward as $x$ creeps in from both sides. Coming from the left (inputs just below $2$) the curve rises toward height $2$, and coming from the right (inputs just above $2$) it settles toward height $2$ as well. The two sides agree, so the limit exists and equals $2$.",
        add: { approach: true },
      },
      {
        text: "**Condition 3: the limit equals the value**, $\\lim_{x \\to 2} f(x) = f(2)$. The height the curve approaches ($2$) is exactly the height of the plotted point ($2$), so $2 = 2$. All three conditions hold, so $f$ is continuous at $x = 2$: the dashed guides meet right on the curve, and the pencil never lifts.",
        add: { level: true },
      },
    ],
    practice:
      "For continuity at $x = a$, check all three: (1) $f(a)$ is defined, (2) $\\lim_{x \\to a} f(x)$ exists (left and right agree), and (3) $\\lim_{x \\to a} f(x) = f(a)$.",
    questions: [
      {
        kind: "choice",
        prompt: "Which list gives ALL of the requirements for $f$ to be continuous at $x = a$?",
        options: [
          "$f(a)$ is defined; $\\lim_{x \\to a} f(x)$ exists; and $\\lim_{x \\to a} f(x) = f(a)$",
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
    title: "Removable discontinuity: a hole",
    mode: "removable",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Now a broken graph. Consider $g(x) = \\dfrac{x^2 - 4}{x - 2}$. Look at $x = 2$: the denominator becomes $2 - 2 = 0$, and the numerator becomes $2^2 - 4 = 0$ too, so $g(2) = \\tfrac{0}{0}$, which is undefined. Condition 1 already fails, so $g$ is not continuous at $x = 2$. Everywhere else, though, the graph is just this straight line.",
        add: { curve: true },
        draw: true,
      },
      {
        text: "Why a line? **Factor** the numerator using the difference of squares, $x^2 - 4 = (x - 2)(x + 2)$. Now **cancel** the common factor $x - 2$, which is allowed for every $x \\ne 2$ (only at $x = 2$ is $x - 2$ zero, and we are not there). That leaves $g(x) = x + 2$ for all $x \\ne 2$: so $g$ agrees with the line $y = x + 2$ at every point except $x = 2$.",
        add: { fact: true, canc: true },
      },
      {
        text: "What happens at $x = 2$ itself? The **limit** still exists: as $x$ approaches $2$, $g(x) = x + 2$ approaches $2 + 2 = 4$, from both sides. But nothing is plotted at $(2, 4)$, because $g(2)$ is undefined. That single missing point is a **hole**: an open circle marks the spot the curve approaches but never actually reaches.",
        add: { hole: true },
      },
      {
        text: "Here is the key. The limit exists and equals $4$, so we can **patch** the function by defining $g(2) = 4$, dropping a filled point straight into the hole. That one repair makes all three conditions hold at $x = 2$. Because a single redefinition fixes it, this is called a **removable discontinuity**: the limit already tells you exactly which value to plug in.",
        add: { patch: true },
      },
    ],
    practice:
      "A **removable discontinuity** (a hole) is when $\\lim_{x \\to a} f(x)$ exists but $f(a)$ is undefined or unequal to it. Remove it by defining $f(a)$ to equal the limit.",
    questions: [
      {
        kind: "choice",
        prompt: "For $g(x) = \\dfrac{x^2 - 4}{x - 2}$, why is $x = 2$ a hole rather than a wall?",
        options: [
          "The factor $x - 2$ cancels, so the limit exists ($4$); only the single value $g(2)$ is missing",
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
        hint: "The two-sided limit is $4$; set the value equal to the limit.",
        success: "Yes: defining $g(2) = 4$ fills the hole and restores continuity.",
      },
    ],
  },
  {
    id: "jump",
    title: "Jump discontinuity",
    mode: "jump",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Some breaks cannot be patched at all. A **piecewise function** uses different formulas on different pieces of the input. Take $f(x) = x + 1$ when $x < 1$, and $f(x) = x + 3$ when $x \\ge 1$. The graph is two separate line segments, and all the action is at the seam $x = 1$.",
        add: { curve: true },
        draw: true,
      },
      {
        text: "Approach $x = 1$ from the **left**, using inputs just below $1$. There the rule is $f(x) = x + 1$, which heads toward $1 + 1 = 2$. This is the **left-hand limit**, written $\\lim_{x \\to 1^-} f(x) = 2$. The open circle at $(1, 2)$ means the curve rises up to that height but the point itself is not included, because at $x = 1$ the left rule no longer applies.",
        add: { openDot: true },
      },
      {
        text: "Now approach from the **right**, using inputs just above $1$. There the rule is $f(x) = x + 3$, heading toward $1 + 3 = 4$: the **right-hand limit** is $\\lim_{x \\to 1^+} f(x) = 4$. And $x = 1$ itself uses $x + 3$, so the actual value is $f(1) = 4$, a filled point at $(1, 4)$. Condition 1 is fine here, the value exists.",
        add: { closedDot: true },
      },
      {
        text: "But compare the two one-sided limits: the left gives $2$ and the right gives $4$. Since $2 \\ne 4$, the curve approaches two different heights, so the two-sided limit **does not exist** and condition 2 fails. This is a **jump discontinuity**: the graph steps from $2$ up to $4$, a jump of $4 - 2 = 2$. No single point can bridge a gap between two disagreeing sides, so a jump is not removable.",
        add: { gap: true },
      },
    ],
    practice:
      "A **jump discontinuity** is when the left and right limits both exist but differ, so the two-sided limit does not exist. The jump size is the gap between the two one-sided limits.",
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
    title: "Infinite discontinuity: a wall",
    mode: "infinite",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "The third kind of break sends the graph to infinity. Consider $f(x) = \\dfrac{1}{x - 2}$. At $x = 2$ the denominator is $2 - 2 = 0$, so $f(2) = \\tfrac{1}{0}$ is undefined and condition 1 fails again. But this time the graph does something dramatic near $x = 2$ instead of leaving a tidy hole.",
        add: { curve: true },
        draw: true,
      },
      {
        text: "Mark a dashed vertical line at $x = 2$. This is a **vertical asymptote**, a wall the graph races alongside but never crosses. Here is **why** it blows up: near $x = 2$ the numerator stays a normal size ($1$), while the denominator $x - 2$ shrinks to a tiny number close to $0$. Dividing $1$ by something tiny gives something enormous, so $|f(x)|$ grows without bound as $x$ nears $2$.",
        add: { wall: true },
      },
      {
        text: "The sign depends on the side. Just to the **right** of $2$, $x - 2$ is a tiny **positive** number, so $\\dfrac{1}{x - 2}$ is huge and positive: $f(x) \\to +\\infty$. Just to the **left**, $x - 2$ is a tiny **negative** number, so $f(x) \\to -\\infty$. The curve races to $+\\infty$ on one side and $-\\infty$ on the other, so the limit is not a finite number: it **does not exist**, and condition 2 fails. This is an **infinite discontinuity**.",
        add: { signs: true },
      },
      {
        text: "Compare this with the hole from before. A hole had a finite limit ($4$), a single missing point we could drop in. Here there is no finite height to fill, because the graph escapes to $+\\infty$ and $-\\infty$. So an infinite discontinuity **cannot** be removed, no matter what value you assign at $x = 2$. Removable holes are fixable; walls are not.",
      },
    ],
    practice:
      "An **infinite discontinuity** is a vertical asymptote: near $x = a$ the denominator goes to $0$ while the numerator does not, so $f$ blows up to $\\pm\\infty$ and the limit does not exist. It cannot be patched.",
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
    title: "Your turn: fill the hole",
    mode: "yourturn",
    params: [heightParam],
    baseReveal: { curve: true },
    beats: [
      {
        text: "Back to the removable case: $g(x) = x + 2$ with a hole at $(2, 4)$, where the limit is $4$ but the value is missing. A filled point now sits at $x = 2$, and right now its height reads $f(2) = 1.0$, well below the curve. With the value ($1$) not equal to the limit ($4$), condition 3 fails, so $g$ is still discontinuous at $x = 2$.",
      },
      {
        text: "To make $g$ continuous at $x = 2$, every one of the three conditions must hold. Conditions 1 and 2 are ready: once a point is placed, $g(2)$ is defined, and the limit already exists and equals $4$. The only piece left is condition 3, matching the value to the limit. The point has to land at height $4$, exactly filling the hole; anywhere else leaves a stray point off the curve while the hole stays open.",
      },
      {
        text: "When the height reads $4.0$, the filled point drops into the hole and the pencil can pass straight through, so $g$ is continuous at $x = 2$. That is exactly what it means to remove a removable discontinuity: set the value equal to the limit.",
      },
    ],
    practice:
      "Slide the value of $f(2)$ up until the filled point drops into the hole. Continuity needs the value to equal the limit, so aim for $f(2) = 4$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Slide the point until $g$ is continuous at $x = 2$: make the value $f(2)$ equal the limit, which is $4$.",
        hint: "The limit is $4$, so set the height to $4.0$; the point lands right in the hole.",
        success: "Perfect: with $f(2) = 4$ the value equals the limit, the hole is filled, and $g$ is continuous.",
        check: (_value, values) => Math.round(values.v ?? 10) === 40,
      },
      {
        kind: "choice",
        prompt: "Setting $f(2) = 4$ made $g$ continuous, yet a jump could not be fixed by redefining one point. Why the difference?",
        options: [
          "It worked only by luck; any height would have done",
          "Here the two-sided limit exists ($4$), so matching the value to it removes the hole; a jump has no two-sided limit to match",
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
