import type { Slide } from "../types";

/**
 * Limits algebraically. Try direct substitution first. When it gives the
 * indeterminate form 0/0, simplify (factor and cancel, rationalize with a
 * conjugate, or clear a compound fraction) and then substitute.
 *
 * Reveal flags are read literally in Stage.tsx (kept in sync here):
 *   direct:    curve, pt, guides
 *   factor:    e1, e2, e3, e4   (AlgebraFlow steps. First flow line always shown)
 *   conjugate: e1, e2, e3, e4
 *   cfrac:     e1, e2, e3, e4
 *   yourturn:  line, hole, approach   (plot markers are driven by the question)
 *
 * Every worked value is verified by hand:
 *   lim_{x->3}(x^2+1) = 10
 *   lim_{x->2}(x^2-4)/(x-2) = 4
 *   lim_{x->0}(sqrt(x+4)-2)/x = 1/4
 *   lim_{x->0}(1/(x+3) - 1/3)/x = -1/9
 *   lim_{x->1}(x^2-1)/(x-1) = 2
 */
export const slides: Slide[] = [
  {
    id: "direct",
    title: "When you can just plug in",
    mode: "direct",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "A **limit** $\\lim_{x \\to a} f(x)$ asks one question: as $x$ gets closer and closer to the number $a$, what value does the output $f(x)$ head toward? For friendly functions the honest shortcut is **direct substitution**, putting $x = a$ straight into the formula. The function $f(x) = x^2 + 1$ shows how it works.",
        add: { curve: true },
        draw: true,
      },
      {
        text: "Direct substitution is allowed when $f$ is built from polynomials and roots and is actually **defined and continuous** at $a$, meaning the graph has no break, hole, or wall there. Our $f(x) = x^2 + 1$ is a polynomial, so it is defined and continuous at every input, including $x = 3$. That is our green light to substitute.",
      },
      {
        text: "So substitute $x = 3$ straight into the formula: $f(3) = 3^2 + 1 = 9 + 1 = 10$. Because the function is continuous there, the value it heads toward as $x \\to 3$ is exactly the value it takes at $x = 3$. Mark the point $(3, 10)$, a solid dot because the function truly reaches it.",
        add: { pt: true },
      },
      {
        text: "Reading it off the picture: travel up from $x = 3$ to the curve, then across to the height $10$. That gives $$\\lim_{x \\to 3}(x^2 + 1) = 10$$ This is the easy case. The rest of the lesson is about what to do when plugging in does not give a clean number.",
        add: { guides: true },
      },
    ],
    practice:
      "Direct substitution: when $f$ is a polynomial or root defined at $a$, $\\lim_{x \\to a} f(x) = f(a)$. Answer the two checks below.",
    questions: [
      {
        kind: "choice",
        prompt: "When may you evaluate $\\lim_{x \\to a} f(x)$ by direct substitution (just plugging in $a$)?",
        options: [
          "When $f$ is defined and continuous at $a$, such as a polynomial",
          "Only when $a = 0$",
          "Never. Substitution is always wrong for limits",
          "Only when $f(a)$ turns out to be $0$",
        ],
        answer: 0,
        hint: "Substitution reads the value the graph reaches, which works when there is no break or hole at $a$.",
        success: "Right: if $f$ is defined and continuous at $a$ (like a polynomial), then $\\lim_{x \\to a} f(x) = f(a)$.",
      },
      {
        kind: "choice",
        prompt: "Evaluate $\\lim_{x \\to 3}(x^2 + 1)$.",
        options: ["$10$", "$9$", "$6$", "$1$"],
        answer: 0,
        hint: "It is a polynomial, so substitute $x = 3$: compute $3^2 + 1$.",
        success: "Yes: $3^2 + 1 = 9 + 1 = 10$.",
      },
    ],
  },
  {
    id: "factor",
    title: "The 0/0 signal: factor and cancel",
    mode: "factor",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Now try $\\lim_{x \\to 2} \\dfrac{x^2 - 4}{x - 2}$. Substituting $x = 2$ gives $\\dfrac{2^2 - 4}{2 - 2} = \\dfrac{0}{0}$, the **indeterminate form** $\\tfrac{0}{0}$, which is not an answer but a signal to simplify first.",
        add: { e1: true },
      },
      {
        text: "This differs from a nonzero number over zero, like $\\dfrac{1}{x - 2}$ at $x = 2$, which is not indeterminate but blows up to infinity as a vertical asymptote. Only $\\tfrac{0}{0}$ can be repaired by algebra.",
      },
      {
        text: "To simplify, **factor** the numerator. Here $x^2 - 4$ is a difference of two squares, $x^2 - 2^2$, which factors as $(x - 2)(x + 2)$. Now the fraction is $\\dfrac{(x - 2)(x + 2)}{x - 2}$, and top and bottom share the exact same factor $(x - 2)$.",
        add: { e2: true },
      },
      {
        text: "**Cancel** the shared factor $(x - 2)$. This is legal because $x \\to 2$ means $x$ slides toward $2$ without ever equaling $2$, so $x - 2$ is nonzero and dividing top and bottom by it is allowed, leaving $x + 2$.",
        add: { e3: true },
      },
      {
        text: "The hard part is over: $x + 2$ is a polynomial, so finish with direct substitution. Put $x = 2$: $2 + 2 = 4$. So the limit is $$\\lim_{x \\to 2} \\dfrac{x^2 - 4}{x - 2} = 4$$ The graph is the line $y = x + 2$ with a single missing point, an open **hole** at $(2, 4)$: the function was never defined at $x = 2$, yet it still heads toward height $4$.",
        add: { e4: true },
      },
    ],
    practice:
      "Method for $\\tfrac{0}{0}$: factor, cancel the common factor (legal because $x \\neq a$), then substitute. Answer below.",
    questions: [
      {
        kind: "choice",
        prompt: "Substituting into $\\dfrac{x^2 - 4}{x - 2}$ at $x = 2$ gives $\\dfrac{0}{0}$. What does that tell you?",
        options: [
          "It is indeterminate: simplify first, then substitute",
          "The limit equals $0$",
          "The limit is exactly $\\dfrac{0}{0}$",
          "The limit cannot exist",
        ],
        answer: 0,
        hint: "$\\tfrac{0}{0}$ is not a number. It is a prompt to do algebra.",
        success: "Right: $\\tfrac{0}{0}$ is indeterminate, a signal to factor and cancel before substituting.",
      },
      {
        kind: "choice",
        prompt: "After factoring and canceling, $\\lim_{x \\to 2} \\dfrac{x^2 - 4}{x - 2}$ equals:",
        options: ["$4$", "$0$", "$\\dfrac{0}{0}$", "$2$"],
        answer: 0,
        hint: "$\\dfrac{(x-2)(x+2)}{x-2} = x + 2$. Now put $x = 2$.",
        success: "Yes: $\\dfrac{(x-2)(x+2)}{x-2} = x + 2$, and $2 + 2 = 4$.",
      },
    ],
  },
  {
    id: "conjugate",
    title: "Roots: multiply by the conjugate",
    mode: "conjugate",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Square roots call for a different technique, as in $\\lim_{x \\to 0} \\dfrac{\\sqrt{x + 4} - 2}{x}$. Substituting $x = 0$ makes the top $\\sqrt{4} - 2 = 2 - 2 = 0$ and the bottom $0$, so again this is the indeterminate form $\\dfrac{0}{0}$. Factoring fails here, but a root can be cleared another way.",
        add: { e1: true },
      },
      {
        text: "Multiply the top and bottom by the **conjugate** of the numerator. The conjugate of a two-term expression keeps the same terms with the middle sign flipped, so the conjugate of $\\sqrt{x + 4} - 2$ is $\\sqrt{x + 4} + 2$. Multiplying by $\\dfrac{\\sqrt{x + 4} + 2}{\\sqrt{x + 4} + 2}$ is multiplying by $1$, which changes its look but not its value.",
        add: { e2: true },
      },
      {
        text: "The top is now $(\\sqrt{x + 4} - 2)(\\sqrt{x + 4} + 2)$, a difference of squares $(A - B)(A + B) = A^2 - B^2$. Here $A^2 = (\\sqrt{x + 4})^2 = x + 4$ and $B^2 = 2^2 = 4$, so the top collapses to $(x + 4) - 4 = x$. That top $x$ cancels the bottom $x$ (legal since $x \\neq 0$ as $x \\to 0$), leaving $\\dfrac{1}{\\sqrt{x + 4} + 2}$.",
        add: { e3: true },
      },
      {
        text: "With the root cleared, substitute $x = 0$: $\\dfrac{1}{\\sqrt{0 + 4} + 2} = \\dfrac{1}{\\sqrt{4} + 2} = \\dfrac{1}{2 + 2} = \\dfrac{1}{4}$. So the limit is $$\\lim_{x \\to 0} \\dfrac{\\sqrt{x + 4} - 2}{x} = \\dfrac{1}{4}$$ the height of the open hole at $\\left(0, \\tfrac{1}{4}\\right)$.",
        add: { e4: true },
      },
    ],
    practice:
      "For a root over $x$, multiply by the conjugate and use $(A-B)(A+B) = A^2 - B^2$ to simplify, then cancel and substitute. Answer below.",
    questions: [
      {
        kind: "choice",
        prompt: "To clear the root in $\\dfrac{\\sqrt{x + 4} - 2}{x}$, multiply top and bottom by:",
        options: [
          "$\\sqrt{x + 4} + 2$",
          "$\\sqrt{x + 4} - 2$",
          "$x$",
          "$\\sqrt{x + 4}$",
        ],
        answer: 0,
        hint: "The conjugate keeps the same terms but flips the middle sign.",
        success: "Right: the conjugate of $\\sqrt{x + 4} - 2$ is $\\sqrt{x + 4} + 2$, which sets up a difference of squares.",
      },
      {
        kind: "choice",
        prompt: "Evaluate $\\lim_{x \\to 0} \\dfrac{\\sqrt{x + 4} - 2}{x}$.",
        options: ["$\\dfrac{1}{4}$", "$\\dfrac{1}{2}$", "$0$", "$\\dfrac{0}{0}$"],
        answer: 0,
        hint: "After canceling you get $\\dfrac{1}{\\sqrt{x + 4} + 2}$. Now put $x = 0$.",
        success: "Yes: $\\dfrac{1}{\\sqrt{4} + 2} = \\dfrac{1}{4}$.",
      },
    ],
  },
  {
    id: "cfrac",
    title: "Fractions inside fractions",
    mode: "cfrac",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Sometimes the $\\tfrac{0}{0}$ hides inside a **compound fraction**, a fraction that has fractions in its top. Take $\\lim_{x \\to 0} \\dfrac{\\frac{1}{x + 3} - \\frac{1}{3}}{x}$. Substitute $x = 0$: the top is $\\dfrac{1}{3} - \\dfrac{1}{3} = 0$ and the bottom is $0$, so once more we have $\\dfrac{0}{0}$.",
        add: { e1: true },
      },
      {
        text: "Clear the little fractions first by combining the top over a **common denominator**. The two small denominators are $x + 3$ and $3$, and their common denominator is their product $3(x + 3)$. Rewriting each piece over $3(x + 3)$: $\\dfrac{1}{x + 3} - \\dfrac{1}{3} = \\dfrac{3 - (x + 3)}{3(x + 3)}$.",
        add: { e2: true },
      },
      {
        text: "Simplify that top: $3 - (x + 3) = 3 - x - 3 = -x$. Now the whole expression is $\\dfrac{-x}{3(x + 3)}$ divided by $x$, and dividing by $x$ puts another $x$ on the bottom: $\\dfrac{-x}{3(x + 3)\\,x}$. The $x$ on top cancels an $x$ on the bottom (legal since $x \\neq 0$), leaving $\\dfrac{-1}{3(x + 3)}$.",
        add: { e3: true },
      },
      {
        text: "Finish with direct substitution at $x = 0$: $\\dfrac{-1}{3(0 + 3)} = \\dfrac{-1}{3 \\cdot 3} = \\dfrac{-1}{9}$. So the limit is $$\\lim_{x \\to 0} \\dfrac{\\frac{1}{x + 3} - \\frac{1}{3}}{x} = -\\dfrac{1}{9}$$ Because the numerator became $-x$, the answer is negative, the open hole at $\\left(0, -\\tfrac{1}{9}\\right)$.",
        add: { e4: true },
      },
    ],
    practice:
      "Compound fraction: combine the top over a common denominator, simplify, cancel the $x$, then substitute. Mind the sign. Answer below.",
    questions: [
      {
        kind: "choice",
        prompt: "Combining $\\dfrac{1}{x + 3} - \\dfrac{1}{3}$ over the common denominator $3(x + 3)$, the numerator $3 - (x + 3)$ simplifies to:",
        options: ["$-x$", "$x$", "$x + 6$", "$-x - 6$"],
        answer: 0,
        hint: "Distribute the minus sign: $3 - (x + 3) = 3 - x - 3$.",
        success: "Right: $3 - x - 3 = -x$.",
      },
      {
        kind: "choice",
        prompt: "Evaluate $\\lim_{x \\to 0} \\dfrac{\\frac{1}{x + 3} - \\frac{1}{3}}{x}$.",
        options: ["$-\\dfrac{1}{9}$", "$\\dfrac{1}{9}$", "$-\\dfrac{1}{3}$", "$0$"],
        answer: 0,
        hint: "You reach $\\dfrac{-1}{3(x + 3)}$. Now put $x = 0$.",
        success: "Yes: $\\dfrac{-1}{3(0 + 3)} = -\\dfrac{1}{9}$.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn",
    mode: "yourturn",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Now run the whole method on a fresh limit: $\\lim_{x \\to 1} \\dfrac{x^2 - 1}{x - 1}$. Substitute $x = 1$ and you get $\\dfrac{1 - 1}{1 - 1} = \\dfrac{0}{0}$, the indeterminate form, so it is time to simplify rather than stop.",
      },
      {
        text: "Factor the top: $x^2 - 1$ is a difference of squares, $(x - 1)(x + 1)$. The fraction becomes $\\dfrac{(x - 1)(x + 1)}{x - 1}$, and the shared factor $(x - 1)$ cancels because $x \\neq 1$ as $x \\to 1$, leaving the line $y = x + 1$.",
        add: { line: true },
      },
      {
        text: "Because the original was never defined at $x = 1$, the line $y = x + 1$ is missing exactly one point there: an open **hole**. Everywhere else the graph is the ordinary line, so the limit is decided entirely by the height the line reaches at $x = 1$.",
        add: { hole: true },
      },
      {
        text: "Substitute into the simplified form $x + 1$ at $x = 1$: $1 + 1 = 2$. So the graph approaches height $2$ at $x = 1$, and the limit is $$\\lim_{x \\to 1} \\dfrac{x^2 - 1}{x - 1} = 2$$ The hole sits at $(1, 2)$.",
        add: { approach: true },
      },
    ],
    practice:
      "Click the open hole that the line $y = x + 1$ heads toward at $x = 1$. Its height is the limit. Then answer the check.",
    questions: [
      {
        kind: "plot",
        prompt: "Click the hole the graph approaches at $x = 1$ (the height the simplified line $x + 1$ reaches there).",
        target: { x: 1, y: 2 },
        tolerance: 0.6,
        label: "(1, 2)",
        hint: "Put $x = 1$ into the simplified form $x + 1$: that height, $2$, is where the hole sits.",
        success: "Yes: the hole is at $(1, 2)$, so $\\lim_{x \\to 1} \\dfrac{x^2 - 1}{x - 1} = 2$.",
      },
      {
        kind: "choice",
        prompt: "So $\\lim_{x \\to 1} \\dfrac{x^2 - 1}{x - 1}$ equals:",
        options: ["$2$", "$0$", "$\\dfrac{0}{0}$", "$1$"],
        answer: 0,
        hint: "The simplified form is $x + 1$. Substitute $x = 1$.",
        success: "Right: $x + 1$ at $x = 1$ is $2$.",
      },
    ],
  },
];
