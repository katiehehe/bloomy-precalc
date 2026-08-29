import type { ParamSpec, Slide } from "../types";

/**
 * Difference quotient and the secant-to-tangent idea. Running example
 * f(x) = x^2 at a = 1, where (f(1+h) - f(1))/h = 2 + h and the tangent slope is
 * 2. Reveal flags are read literally in Stage.tsx:
 *   secant:  curve, pts, sec, slope
 *   formula: curve, pts, sec, hlabels
 *   shrink:  curve, e1, e2, e3, e4, tan   (secants h=1,0.5,0.25 track e2,e3,e4)
 *   tangent: curve, tan, slope
 *   yourturn: curve (secant + readout follow the h slider)
 */

const hParam: ParamSpec = {
  key: "h",
  label: "run h",
  min: 1,
  max: 15,
  start: 15,
  step: 1,
  // Slider value v in [1, 15] stands for h = v / 10, so h runs 0.1 to 1.5.
  format: (v) => `h = ${(Math.round(v) / 10).toFixed(1)}`,
};

export const slides: Slide[] = [
  {
    id: "secant",
    title: "Average rate of change is a slope",
    mode: "secant",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Speed is a rate of change: miles per hour is how much distance changes for each hour of time. For any function $f$, the **average rate of change** between two inputs answers the same kind of question: as $x$ moves from one value to another, how much does $f(x)$ change per unit of $x$? Let us make that precise with the curve $f(x) = x^2$.",
        add: { curve: true },
        draw: true,
      },
      {
        text: "Mark two points on the curve. At $x = 1$ the height is $f(1) = 1^2 = 1$, giving the point $(1, 1)$. At $x = 2$ the height is $f(2) = 2^2 = 4$, giving $(2, 4)$. The straight line through two points of a curve has a name: the **secant line**.",
        add: { pts: true },
      },
      {
        text: "The average rate of change is exactly the **slope** of that secant, and slope is rise over run. The **rise** is how much the output climbs, $f(2) - f(1) = 4 - 1 = 3$. The **run** is how much the input moves, $2 - 1 = 1$.",
        add: { sec: true },
      },
      {
        text: "Divide rise by run: $\\dfrac{f(2) - f(1)}{2 - 1} = \\dfrac{3}{1} = 3$. So over the interval from $x = 1$ to $x = 2$, the function $x^2$ rises $3$ units of output for each $1$ unit of input. Make sure the rise goes on top and the run on the bottom: slope is rise over run, never the other way around.",
        add: { slope: true },
      },
    ],
    practice:
      "Average rate of change on $[a, b]$ is the secant slope $\\dfrac{f(b) - f(a)}{b - a}$: the rise $f(b) - f(a)$ over the run $b - a$.",
    questions: [
      {
        kind: "choice",
        prompt: "The average rate of change of $f$ on $[a, b]$ equals:",
        options: [
          "$\\dfrac{f(b) - f(a)}{b - a}$",
          "$\\dfrac{b - a}{f(b) - f(a)}$",
          "$f(b) - f(a)$",
          "$\\dfrac{f(b) + f(a)}{2}$",
        ],
        answer: 0,
        hint: "It is a slope: rise over run.",
        success: "Right: rise $f(b) - f(a)$ over run $b - a$.",
      },
      {
        kind: "choice",
        prompt: "For $f(x) = x^2$, the average rate of change from $x = 1$ to $x = 3$ is:",
        options: ["$4$", "$3$", "$8$", "$2$"],
        answer: 0,
        hint: "Compute $\\dfrac{f(3) - f(1)}{3 - 1} = \\dfrac{9 - 1}{2}$.",
        success: "Yes: $\\dfrac{9 - 1}{3 - 1} = \\dfrac{8}{2} = 4$.",
      },
    ],
  },
  {
    id: "formula",
    title: "The difference quotient",
    mode: "formula",
    hideSliders: true,
    baseReveal: { curve: true, pts: true, sec: true },
    beats: [
      {
        text: "We want a formula that works for any spacing between the two points, so instead of naming the second input separately, we measure it as a step away from the first. Call the starting input $a$ and let $h$ be the size of the step, so the second input is $a + h$. Here $a = 1$ and the step to $x = 2$ is $h = 1$.",
        add: { hlabels: true },
      },
      {
        text: "Now rewrite the secant slope with this notation. The **run** is the horizontal step, which is simply $h$ (from $a$ to $a + h$). The **rise** is the change in height, $f(a + h) - f(a)$. Dividing rise by run gives the **difference quotient**: $\\dfrac{f(a + h) - f(a)}{h}$.",
      },
      {
        text: "This is the same average rate of change as before, just written so we can control the gap with one number $h$. Check it here: with $a = 1$ and $h = 1$, the difference quotient is $\\dfrac{f(1 + 1) - f(1)}{1} = \\dfrac{f(2) - f(1)}{1} = \\dfrac{4 - 1}{1} = 3$, exactly the slope we found. The whole point of $h$ is that we can now shrink it.",
      },
    ],
    practice:
      "Writing the second input as $a + h$, the secant slope becomes the difference quotient $\\dfrac{f(a + h) - f(a)}{h}$: the rise $f(a+h) - f(a)$ over the run $h$.",
    questions: [
      {
        kind: "choice",
        prompt: "The difference quotient of $f$ at $a$ with step $h$ is:",
        options: [
          "$\\dfrac{f(a + h) - f(a)}{h}$",
          "$\\dfrac{f(a + h) - f(a)}{a}$",
          "$\\dfrac{f(a) - f(a + h)}{h}$ with the run left out",
          "$f(a + h) - f(a)$",
        ],
        answer: 0,
        hint: "Rise over run, where the run is the step $h$.",
        success: "Right: rise $f(a+h) - f(a)$ over run $h$.",
      },
      {
        kind: "choice",
        prompt: "In the difference quotient $\\dfrac{f(a + h) - f(a)}{h}$, the denominator $h$ represents:",
        options: [
          "the run: the horizontal step from $a$ to $a + h$",
          "the rise: the change in height",
          "the starting input $a$",
          "the slope itself",
        ],
        answer: 0,
        hint: "It is the change in the input, from $a$ to $a + h$.",
        success: "Yes: $h$ is the run, the horizontal step in the input.",
      },
    ],
  },
  {
    id: "shrink",
    title: "Shrinking the step",
    mode: "shrink",
    hideSliders: true,
    baseReveal: { curve: true },
    beats: [
      {
        text: "Let us simplify the difference quotient for $f(x) = x^2$ at $a = 1$ before we shrink $h$, because the raw fraction looks stuck: at $h = 0$ it would be $\\tfrac{0}{0}$. Start by substituting $f(1 + h) = (1 + h)^2$ and $f(1) = 1$, so the quotient is $\\dfrac{(1 + h)^2 - 1}{h}$.",
        add: { e1: true },
      },
      {
        text: "Expand the square in the numerator: $(1 + h)^2 = 1 + 2h + h^2$. Subtracting the $1$ from $f(1)$ gives $1 + 2h + h^2 - 1$, and the two $1$s cancel, leaving $2h + h^2$. So the quotient is $\\dfrac{2h + h^2}{h}$.",
        add: { e2: true },
      },
      {
        text: "Every term on top has a factor of $h$, and $h \\neq 0$ (the two points are still distinct), so we may divide top and bottom by $h$: $\\dfrac{2h + h^2}{h} = 2 + h$. This is the clean form of the difference quotient. Watch a secant appear for $h = 1$, giving slope $2 + 1 = 3$.",
        add: { e3: true },
      },
      {
        text: "Now shrink the step. At $h = 0.5$ the slope is $2 + 0.5 = 2.5$, and at $h = 0.25$ it is $2 + 0.25 = 2.25$. Each smaller step tilts the secant closer to just touching the curve at $(1, 1)$. The slopes $3, 2.5, 2.25$ are marching toward $2$.",
        add: { e4: true },
      },
    ],
    practice:
      "Simplify first, then shrink: $\\dfrac{(1+h)^2 - 1}{h} = \\dfrac{2h + h^2}{h} = 2 + h$ for $h \\neq 0$, and $2 + h \\to 2$ as $h \\to 0$.",
    questions: [
      {
        kind: "choice",
        prompt: "Simplify $\\dfrac{(1 + h)^2 - 1}{h}$ for $h \\neq 0$.",
        options: ["$2 + h$", "$h$", "$2 + h^2$", "$1 + h$"],
        answer: 0,
        hint: "Expand $(1+h)^2 = 1 + 2h + h^2$, cancel the $1$s, then divide by $h$.",
        success: "Right: $\\dfrac{2h + h^2}{h} = 2 + h$.",
      },
      {
        kind: "choice",
        prompt: "Using $2 + h$, the difference quotient at $h = 0.25$ is:",
        options: ["$2.25$", "$2$", "$4$", "$0.25$"],
        answer: 0,
        hint: "Substitute $h = 0.25$ into $2 + h$.",
        success: "Yes: $2 + 0.25 = 2.25$.",
      },
    ],
  },
  {
    id: "tangent",
    title: "From secant to tangent",
    mode: "tangent",
    hideSliders: true,
    baseReveal: { curve: true },
    beats: [
      {
        text: "Here is the payoff. As $h \\to 0$ the second point slides down the curve toward $(1, 1)$, and the secant stops cutting across the curve and instead just grazes it at that one point. The line it settles into is the **tangent line** at $(1, 1)$.",
        add: { tan: true },
      },
      {
        text: "Its slope is the limit of $2 + h$ as $h \\to 0$, which is $2 + 0 = 2$. We could not get this by setting $h = 0$ in the original fraction (that was $\\tfrac{0}{0}$), but after simplifying to $2 + h$ the value at $h = 0$ is clear.",
        add: { slope: true },
      },
      {
        text: "This limiting slope, $2$, is the **instantaneous rate of change** of $f$ at $x = 1$: how fast $x^2$ is changing at that exact instant, not averaged over an interval. It is also called the **derivative** of $f$ at $x = 1$. The difference quotient is the whole bridge from average rate (a secant) to instantaneous rate (a tangent).",
      },
    ],
    practice:
      "As $h \\to 0$ the secant approaches the tangent line; its slope, the limit of $2 + h$, is $2$. That instantaneous rate of change is the derivative at $x = 1$.",
    questions: [
      {
        kind: "choice",
        prompt: "As $h \\to 0$, the difference quotient $2 + h$ approaches:",
        options: ["$2$", "$0$", "$2 + h$", "It is undefined"],
        answer: 0,
        hint: "Substitute $h = 0$ into the simplified form $2 + h$.",
        success: "Right: $2 + 0 = 2$, the tangent slope at $(1, 1)$.",
      },
      {
        kind: "choice",
        prompt: "The instantaneous rate of change of $f$ at $x = 1$ is the slope of:",
        options: [
          "the tangent line at $(1, 1)$",
          "the secant line from $(1,1)$ to $(2,4)$",
          "the $x$-axis",
          "the line $y = x$",
        ],
        answer: 0,
        hint: "Instantaneous means the limiting line that grazes the curve at one point.",
        success: "Yes: it is the slope of the tangent line at that point.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn",
    mode: "yourturn",
    params: [hParam],
    baseReveal: { curve: true },
    beats: [
      {
        text: "The secant runs from the fixed point $(1, 1)$ to the moving point $(1 + h,\\ (1 + h)^2)$, and its slope is the difference quotient $2 + h$. Right now $h = 1.5$, so the slope is $2 + 1.5 = 3.5$ and the second point sits well up the curve.",
      },
      {
        text: "As you make $h$ smaller, the moving point slides toward $(1, 1)$ and the secant flattens toward the tangent, whose slope is $2$. The slope readout is always $2 + h$, so it never quite reaches $2$ for a positive step, but it gets as close as you like.",
      },
    ],
    practice:
      "Drag $h$: the moving point is $(1 + h,\\ (1 + h)^2)$ and the live slope is $2 + h$. Shrinking $h$ tilts the secant toward the tangent slope $2$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Set the step so the secant slope is $2.5$. Use slope $= 2 + h$.",
        hint: "Solve $2 + h = 2.5$, so $h = 0.5$. Slide $h$ to $0.5$.",
        success: "Yes: at $h = 0.5$ the slope is $2 + 0.5 = 2.5$.",
        check: (_value, values) => Math.round(values.h ?? 15) === 5,
      },
      {
        kind: "choice",
        prompt: "With the slope reading $2 + h$, what value can it never quite reach for $h > 0$, yet approaches as $h \\to 0$?",
        options: ["$2$", "$2.5$", "$3$", "$0$"],
        answer: 0,
        hint: "That target is the tangent slope, the limit as $h \\to 0$.",
        success: "Right: it approaches the tangent slope $2$ without reaching it for $h > 0$.",
      },
    ],
  },
];
