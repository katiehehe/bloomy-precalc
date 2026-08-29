import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for evaluating limits algebraically.
 * Grounded in the lesson: try direct substitution; when it gives the
 * indeterminate form 0/0, simplify (factor and cancel, conjugate, or clear a
 * compound fraction) and then substitute. Nonzero over zero is a vertical
 * asymptote, not 0/0.
 *
 * Distractors are the standard traps: reporting 0/0 as the answer, canceling
 * before factoring, forgetting to substitute after canceling, sign slips in the
 * compound fraction (-1/9 vs 1/9), dropping the conjugate's cross terms or the
 * (a+h)^2 style cross term, and treating nonzero/0 as 0/0. Every value below is
 * verified by hand; the correct option index varies across questions.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-when-sub",
      prompt: "For which limit is direct substitution valid right away (no algebra needed)?",
      choices: [
        { text: "$\\lim_{x \\to 3}(x^2 + 1)$", correct: true, explain: "A polynomial is defined and continuous everywhere, so substitute: $3^2 + 1 = 10$." },
        { text: "$\\lim_{x \\to 2}\\dfrac{x^2 - 4}{x - 2}$", explain: "Substituting gives $\\tfrac{0}{0}$, an indeterminate form; you must factor and cancel first." },
        { text: "$\\lim_{x \\to 2}\\dfrac{1}{x - 2}$", explain: "Substituting gives $\\tfrac{1}{0}$, nonzero over zero: a vertical asymptote, not a substitutable value." },
        { text: "$\\lim_{x \\to 0}\\dfrac{\\sqrt{x + 4} - 2}{x}$", explain: "Substituting gives $\\tfrac{0}{0}$; you need the conjugate before you can substitute." },
      ],
    },
    {
      id: "c-eval-poly",
      prompt: "Evaluate $\\lim_{x \\to 3}(x^2 + 1)$.",
      choices: [
        { text: "$1$", explain: "That is the constant term; substitute the whole polynomial: $3^2 + 1$." },
        { text: "$6$", explain: "That would be $2 \\cdot 3$; instead compute $3^2 + 1 = 10$." },
        { text: "$10$", correct: true, explain: "It is a polynomial, so substitute: $3^2 + 1 = 9 + 1 = 10$." },
        { text: "$9$", explain: "That is $3^2$ alone; do not forget to add the $1$." },
      ],
    },
    {
      id: "c-00-means",
      prompt: "You substitute and get $\\tfrac{0}{0}$. What does that mean?",
      choices: [
        { text: "The limit equals $0$", explain: "$\\tfrac{0}{0}$ is not $0$; it is indeterminate, so simplify before deciding." },
        { text: "The form is indeterminate: simplify, then substitute", correct: true, explain: "$\\tfrac{0}{0}$ carries no value on its own; it signals that algebra (factor, conjugate, or combine) is needed." },
        { text: "The limit is exactly $\\tfrac{0}{0}$", explain: "$\\tfrac{0}{0}$ is not a number, so it can never be the final answer." },
        { text: "The limit cannot exist", explain: "Many $\\tfrac{0}{0}$ limits do exist (for example this lesson's all equal finite numbers) once you simplify." },
      ],
    },
    {
      id: "c-factor-diff2",
      prompt: "Factor $x^2 - 4$.",
      choices: [
        { text: "$(x - 2)^2$", explain: "That expands to $x^2 - 4x + 4$, not $x^2 - 4$." },
        { text: "$(x + 2)^2$", explain: "That expands to $x^2 + 4x + 4$, not $x^2 - 4$." },
        { text: "$(x - 4)(x + 1)$", explain: "That expands to $x^2 - 3x - 4$, not $x^2 - 4$." },
        { text: "$(x - 2)(x + 2)$", correct: true, explain: "Difference of squares: $x^2 - 2^2 = (x - 2)(x + 2)$." },
      ],
    },
    {
      id: "c-factor-val",
      prompt: "Evaluate $\\lim_{x \\to 2}\\dfrac{x^2 - 4}{x - 2}$.",
      choices: [
        { text: "$4$", correct: true, explain: "$\\dfrac{(x - 2)(x + 2)}{x - 2} = x + 2$, and substituting $x = 2$ gives $4$." },
        { text: "$0$", explain: "The numerator is $0$ at $x = 2$, but so is the denominator; after canceling you get $x + 2 = 4$." },
        { text: "$\\dfrac{0}{0}$", explain: "$\\tfrac{0}{0}$ is the starting signal, not the answer; cancel $(x - 2)$ first." },
        { text: "$2$", explain: "That is the value of $a$, not the limit; the simplified form $x + 2$ gives $4$." },
      ],
    },
    {
      id: "c-why-cancel",
      prompt: "Why is canceling $(x - 2)$ legal while finding $\\lim_{x \\to 2}\\dfrac{(x - 2)(x + 2)}{x - 2}$?",
      choices: [
        { text: "Because $2 - 2 = 0$", explain: "That is exactly the value we avoid; the point $x = 2$ is never used." },
        { text: "Because canceling is always allowed", explain: "Canceling needs a nonzero factor; the reason it works here is that $x \\neq 2$ near the limit." },
        { text: "Because $x \\to 2$ means $x \\neq 2$, so $x - 2 \\neq 0$", correct: true, explain: "A limit looks at $x$ near $2$ but never at $2$ itself, so $x - 2$ is nonzero and may be divided out." },
        { text: "Because the numerator is larger than the denominator", explain: "Size is irrelevant; canceling is valid because the shared factor is nonzero as $x \\to 2$." },
      ],
    },
    {
      id: "c-conj-of",
      prompt: "The conjugate of $\\sqrt{x + 4} - 2$ is:",
      choices: [
        { text: "$\\sqrt{x + 4} - 2$", explain: "The conjugate must flip the middle sign; this is the same expression." },
        { text: "$\\sqrt{x + 4} + 2$", correct: true, explain: "Keep the terms, flip the middle sign; multiplying by it makes a difference of squares." },
        { text: "$2 - \\sqrt{x + 4}$", explain: "That is the negative of the original, not the conjugate." },
        { text: "$\\sqrt{x - 4} + 2$", explain: "The radicand must stay $x + 4$; only the sign between the terms changes." },
      ],
    },
    {
      id: "c-conj-val",
      prompt: "Evaluate $\\lim_{x \\to 0}\\dfrac{\\sqrt{x + 4} - 2}{x}$.",
      choices: [
        { text: "$0$", explain: "After the conjugate you get $\\dfrac{1}{\\sqrt{x + 4} + 2}$, which is $\\tfrac14$ at $x = 0$, not $0$." },
        { text: "$\\dfrac{1}{2}$", explain: "That would be $\\dfrac{1}{\\sqrt{4}}$; the denominator is $\\sqrt{4} + 2 = 4$, giving $\\tfrac14$." },
        { text: "$\\dfrac{0}{0}$", explain: "That is the starting form; multiply by the conjugate and it resolves to $\\tfrac14$." },
        { text: "$\\dfrac{1}{4}$", correct: true, explain: "The top becomes $x$, cancels the bottom $x$, leaving $\\dfrac{1}{\\sqrt{x + 4} + 2} \\to \\dfrac{1}{4}$." },
      ],
    },
    {
      id: "c-diff-squares",
      prompt: "Multiply out $(\\sqrt{x + 4} - 2)(\\sqrt{x + 4} + 2)$.",
      choices: [
        { text: "$x$", correct: true, explain: "$(A - B)(A + B) = A^2 - B^2 = (x + 4) - 4 = x$." },
        { text: "$x + 4$", explain: "That is only $A^2$; you must subtract $B^2 = 4$, leaving $x$." },
        { text: "$x - 4$", explain: "$A^2 - B^2 = (x + 4) - 4 = x$, not $x - 4$; the $+4$ and $-4$ cancel." },
        { text: "$x + 8$", explain: "There is no $+8$; the product is $(x + 4) - 4 = x$." },
      ],
    },
    {
      id: "c-cfrac-num",
      prompt: "Combining $\\dfrac{1}{x + 3} - \\dfrac{1}{3}$ over $3(x + 3)$, the numerator $3 - (x + 3)$ simplifies to:",
      choices: [
        { text: "$x$", explain: "Watch the sign: $3 - (x + 3) = 3 - x - 3 = -x$, not $x$." },
        { text: "$x + 6$", explain: "Distribute the minus: $3 - x - 3 = -x$; nothing adds to $6$." },
        { text: "$-x$", correct: true, explain: "$3 - (x + 3) = 3 - x - 3 = -x$." },
        { text: "$-x - 6$", explain: "The two $3$s cancel; $3 - x - 3 = -x$, not $-x - 6$." },
      ],
    },
    {
      id: "c-cfrac-val",
      prompt: "Evaluate $\\lim_{x \\to 0}\\dfrac{\\frac{1}{x + 3} - \\frac{1}{3}}{x}$.",
      choices: [
        { text: "$\\dfrac{1}{9}$", explain: "Sign slip: the numerator is $-x$, so the result is $-\\tfrac19$, not $+\\tfrac19$." },
        { text: "$-\\dfrac{1}{9}$", correct: true, explain: "You reach $\\dfrac{-1}{3(x + 3)}$; at $x = 0$ that is $\\dfrac{-1}{9}$." },
        { text: "$-\\dfrac{1}{3}$", explain: "Do not forget the $3$ in $3(x + 3)$: at $x = 0$ the denominator is $3 \\cdot 3 = 9$." },
        { text: "$0$", explain: "The $x$ cancels rather than making the limit $0$; the value is $-\\tfrac19$." },
      ],
    },
    {
      id: "c-nonzero-zero",
      prompt: "For $\\lim_{x \\to 2}\\dfrac{1}{x - 2}$, substituting gives $\\tfrac{1}{0}$ (nonzero over zero). This limit:",
      choices: [
        { text: "Equals $0$", explain: "A number over a shrinking denominator grows without bound; it does not go to $0$." },
        { text: "Is the indeterminate form $\\tfrac{0}{0}$, so cancel a factor", explain: "The top is $1$, not $0$, so this is not $\\tfrac{0}{0}$ and there is nothing to cancel." },
        { text: "Equals $1$", explain: "The value blows up near $x = 2$; it does not settle to $1$." },
        { text: "Does not exist; the graph has a vertical asymptote", correct: true, explain: "Nonzero over zero is a vertical asymptote: the two-sided limit is unbounded, not a finite number." },
      ],
    },
    {
      id: "c-which-00",
      prompt: "Which limit is a genuine $\\tfrac{0}{0}$ form (so you should simplify)?",
      choices: [
        { text: "$\\lim_{x \\to 3}\\dfrac{x^2 - 9}{x - 3}$", correct: true, explain: "At $x = 3$ both top ($9 - 9$) and bottom ($3 - 3$) are $0$: a true $\\tfrac{0}{0}$ that simplifies to $x + 3$." },
        { text: "$\\lim_{x \\to 2}\\dfrac{1}{x - 2}$", explain: "The top is $1$, not $0$: this is nonzero over zero, an asymptote, not $\\tfrac{0}{0}$." },
        { text: "$\\lim_{x \\to 0}(x^2 + 5)$", explain: "This is a polynomial; substitute to get $5$. No indeterminate form." },
        { text: "$\\lim_{x \\to 1}\\dfrac{x + 1}{x + 2}$", explain: "At $x = 1$ this is $\\tfrac{2}{3}$, defined; substitute directly." },
      ],
    },
    {
      id: "c-yourturn-val",
      prompt: "Evaluate $\\lim_{x \\to 1}\\dfrac{x^2 - 1}{x - 1}$.",
      choices: [
        { text: "$0$", explain: "The top is $0$ at $x = 1$, but so is the bottom; after canceling, $x + 1 = 2$." },
        { text: "$1$", explain: "That is the value of $a$, not the limit; the simplified form $x + 1$ gives $2$." },
        { text: "$2$", correct: true, explain: "$\\dfrac{(x - 1)(x + 1)}{x - 1} = x + 1$, and at $x = 1$ that is $2$." },
        { text: "$\\dfrac{0}{0}$", explain: "$\\tfrac{0}{0}$ is the signal to simplify, not the answer; you get $2$." },
      ],
    },
    {
      id: "c-after-cancel",
      prompt: "After you cancel the common factor, the very next step is to:",
      choices: [
        { text: "Report $\\tfrac{0}{0}$ as the answer", explain: "$\\tfrac{0}{0}$ is gone once you cancel; it was never the answer." },
        { text: "Stop; the simplified expression is the limit as written", explain: "The simplified expression is a function of $x$; you still must substitute the value of $x$." },
        { text: "Conclude the limit does not exist", explain: "The whole point of simplifying was to reveal the finite value; do not quit early." },
        { text: "Substitute the value into the simplified expression", correct: true, explain: "The simplified expression is continuous at $a$, so substituting finishes the job." },
      ],
    },
  ],
  summit: [
    {
      id: "s-x2-9",
      prompt: "Evaluate $\\lim_{x \\to 3}\\dfrac{x^2 - 9}{x - 3}$.",
      choices: [
        { text: "$6$", correct: true, explain: "$\\dfrac{(x - 3)(x + 3)}{x - 3} = x + 3$, and at $x = 3$ that is $6$." },
        { text: "$0$", explain: "Both parts are $0$ at $x = 3$; cancel $(x - 3)$ first to get $x + 3 = 6$." },
        { text: "$\\dfrac{0}{0}$", explain: "That is the signal to factor and cancel, not the answer." },
        { text: "$3$", explain: "That is $a$, not the limit; the simplified form $x + 3$ gives $6$." },
      ],
    },
    {
      id: "s-x2-4-neg",
      prompt: "Evaluate $\\lim_{x \\to -2}\\dfrac{x^2 - 4}{x + 2}$.",
      choices: [
        { text: "$4$", explain: "Sign slip: $\\dfrac{(x - 2)(x + 2)}{x + 2} = x - 2$, and at $x = -2$ that is $-4$." },
        { text: "$-4$", correct: true, explain: "Cancel $(x + 2)$ to get $x - 2$; at $x = -2$ that is $-2 - 2 = -4$." },
        { text: "$0$", explain: "Both parts vanish at $x = -2$; after canceling, $x - 2 = -4$." },
        { text: "$\\dfrac{0}{0}$", explain: "That is the starting form; factor $x^2 - 4 = (x - 2)(x + 2)$ and cancel." },
      ],
    },
    {
      id: "s-conj-9",
      prompt: "Evaluate $\\lim_{x \\to 0}\\dfrac{\\sqrt{x + 9} - 3}{x}$.",
      choices: [
        { text: "$\\dfrac{1}{3}$", explain: "The denominator after the conjugate is $\\sqrt{9} + 3 = 6$, so the value is $\\tfrac16$." },
        { text: "$6$", explain: "That is the denominator $\\sqrt{9} + 3$, not its reciprocal; the limit is $\\tfrac16$." },
        { text: "$\\dfrac{1}{6}$", correct: true, explain: "Conjugate: top becomes $(x + 9) - 9 = x$, cancels, leaving $\\dfrac{1}{\\sqrt{x + 9} + 3} \\to \\tfrac16$." },
        { text: "$\\dfrac{1}{9}$", explain: "The denominator is $\\sqrt{9} + 3 = 6$, not $9$; the limit is $\\tfrac16$." },
      ],
    },
    {
      id: "s-cfrac-5",
      prompt: "Evaluate $\\lim_{x \\to 0}\\dfrac{\\frac{1}{x + 5} - \\frac{1}{5}}{x}$.",
      choices: [
        { text: "$\\dfrac{1}{25}$", explain: "Sign slip: the combined numerator is $-x$, so the result is $-\\tfrac{1}{25}$." },
        { text: "$-\\dfrac{1}{5}$", explain: "The denominator is $5(x + 5)$; at $x = 0$ that is $25$, giving $-\\tfrac{1}{25}$." },
        { text: "$0$", explain: "The $x$ cancels rather than zeroing the limit; the value is $-\\tfrac{1}{25}$." },
        { text: "$-\\dfrac{1}{25}$", correct: true, explain: "Combine over $5(x + 5)$: top is $-x$, cancel $x$, get $\\dfrac{-1}{5(x + 5)} \\to -\\tfrac{1}{25}$." },
      ],
    },
    {
      id: "s-report-00",
      prompt: "A student writes $\\lim_{x \\to 2}\\dfrac{x^2 - 4}{x - 2} = \\tfrac{0}{0}$. The best correction is:",
      choices: [
        { text: "$\\tfrac{0}{0}$ is indeterminate, not a value; factor and cancel to get $4$", correct: true, explain: "$\\tfrac{0}{0}$ only signals more work; simplifying to $x + 2$ gives the true limit $4$." },
        { text: "$\\tfrac{0}{0} = 1$, so the limit is $1$", explain: "$\\tfrac{0}{0}$ is not $1$; it is indeterminate and must be resolved by algebra." },
        { text: "$\\tfrac{0}{0} = 0$, so the limit is $0$", explain: "$\\tfrac{0}{0}$ is not $0$; here the limit is $4$ after canceling." },
        { text: "The limit does not exist", explain: "It does exist: $\\dfrac{(x - 2)(x + 2)}{x - 2} = x + 2 \\to 4$." },
      ],
    },
    {
      id: "s-cancel-before-factor",
      prompt: "Why can you not cancel the $x^2$ against the $x$ directly in $\\dfrac{x^2 - 4}{x - 2}$?",
      choices: [
        { text: "You can; it gives $x - 4$", explain: "You cannot cancel across a subtraction; $\\dfrac{x^2 - 4}{x - 2}$ is not $\\dfrac{x^2}{x} - \\dfrac{4}{2}$." },
        { text: "You may only cancel common factors, and $x^2 - 4$ must be factored first", correct: true, explain: "Canceling requires a shared factor; factor $x^2 - 4 = (x - 2)(x + 2)$, then cancel $(x - 2)$." },
        { text: "Because $x^2$ and $x$ are like terms", explain: "They are not like terms, and even so, canceling needs factors, not terms of a sum." },
        { text: "Because the $-4$ is even", explain: "Parity is irrelevant; the issue is that you can only cancel factors, so factor first." },
      ],
    },
    {
      id: "s-conj-sqrtx",
      prompt: "Evaluate $\\lim_{x \\to 4}\\dfrac{\\sqrt{x} - 2}{x - 4}$.",
      choices: [
        { text: "$\\dfrac{1}{2}$", explain: "The denominator after the conjugate is $\\sqrt{4} + 2 = 4$, so the limit is $\\tfrac14$." },
        { text: "$\\dfrac{0}{0}$", explain: "That is the starting form; multiply by $\\sqrt{x} + 2$ to resolve it." },
        { text: "$\\dfrac{1}{4}$", correct: true, explain: "$(\\sqrt{x} - 2)(\\sqrt{x} + 2) = x - 4$, which cancels, leaving $\\dfrac{1}{\\sqrt{x} + 2} \\to \\tfrac14$." },
        { text: "$4$", explain: "That is $\\sqrt{x} + 2$ at $x = 4$; the limit is its reciprocal, $\\tfrac14$." },
      ],
    },
    {
      id: "s-nonzero",
      prompt: "$\\lim_{x \\to 2}\\dfrac{1}{x - 2}$ is best described as:",
      choices: [
        { text: "$0$", explain: "A fixed numerator over a vanishing denominator grows without bound; it is not $0$." },
        { text: "$\\tfrac{0}{0}$, so simplify by canceling", explain: "The numerator is $1$, not $0$: there is no shared factor to cancel." },
        { text: "$1$", explain: "The value explodes near $x = 2$; it does not approach $1$." },
        { text: "Unbounded (no finite value): a vertical asymptote, not a $\\tfrac{0}{0}$ form", correct: true, explain: "Nonzero over zero gives a vertical asymptote; the two-sided limit does not exist as a finite number." },
      ],
    },
    {
      id: "s-cube",
      prompt: "Evaluate $\\lim_{x \\to 1}\\dfrac{x^3 - 1}{x - 1}$.",
      choices: [
        { text: "$3$", correct: true, explain: "$x^3 - 1 = (x - 1)(x^2 + x + 1)$; cancel $(x - 1)$, then $1 + 1 + 1 = 3$." },
        { text: "$1$", explain: "That is $a$; the simplified form $x^2 + x + 1$ at $x = 1$ is $3$." },
        { text: "$2$", explain: "That would be $x + 1$; the cubic factors as $(x - 1)(x^2 + x + 1)$, giving $3$." },
        { text: "$\\dfrac{0}{0}$", explain: "That is the signal to factor; the cube factors and the limit is $3$." },
      ],
    },
    {
      id: "s-expand",
      prompt: "Evaluate $\\lim_{x \\to 0}\\dfrac{(x + 2)^2 - 4}{x}$.",
      choices: [
        { text: "$0$", explain: "Dropping the cross term: $(x + 2)^2 = x^2 + 4x + 4$, not $x^2 + 4$; keep the $4x$." },
        { text: "$4$", correct: true, explain: "$(x + 2)^2 - 4 = x^2 + 4x = x(x + 4)$; cancel $x$, leaving $x + 4 \\to 4$." },
        { text: "$8$", explain: "That is $2 \\cdot 4$; expanding correctly gives $x + 4 \\to 4$." },
        { text: "$\\dfrac{0}{0}$", explain: "That is the starting form; expand the square and cancel $x$ to get $4$." },
      ],
    },
    {
      id: "s-sign-flip",
      prompt: "Evaluate $\\lim_{x \\to 0}\\dfrac{\\frac{1}{3} - \\frac{1}{x + 3}}{x}$.",
      choices: [
        { text: "$-\\dfrac{1}{9}$", explain: "This is the reversed subtraction: the numerator here is $+x$, so the result is $+\\tfrac19$." },
        { text: "$\\dfrac{1}{3}$", explain: "The denominator is $3(x + 3)$; at $x = 0$ that is $9$, giving $\\tfrac19$." },
        { text: "$\\dfrac{1}{9}$", correct: true, explain: "$\\dfrac13 - \\dfrac{1}{x + 3} = \\dfrac{x}{3(x + 3)}$; cancel $x$, get $\\dfrac{1}{3(x + 3)} \\to \\tfrac19$." },
        { text: "$0$", explain: "The $x$ cancels rather than zeroing the limit; the value is $\\tfrac19$." },
      ],
    },
    {
      id: "s-cancel-reason",
      prompt: "In $\\lim_{x \\to a}$, dividing out a factor $(x - a)$ is justified because:",
      choices: [
        { text: "$a - a = 0$", explain: "That is the one point we exclude; the limit never evaluates at $x = a$." },
        { text: "Limits ignore denominators", explain: "They do not; the reason is specifically that $x - a \\neq 0$ near the limit." },
        { text: "$x - a$ is always positive", explain: "It can be negative (for $x < a$); what matters is only that it is nonzero." },
        { text: "$x$ approaches $a$ but never equals it, so $x - a \\neq 0$", correct: true, explain: "A limit examines $x$ near $a$, never at $a$, so the factor is nonzero and can be divided out." },
      ],
    },
    {
      id: "s-reciprocal",
      prompt: "Evaluate $\\lim_{x \\to 3}\\dfrac{x - 3}{x^2 - 9}$.",
      choices: [
        { text: "$\\dfrac{1}{6}$", correct: true, explain: "$\\dfrac{x - 3}{(x - 3)(x + 3)} = \\dfrac{1}{x + 3} \\to \\dfrac{1}{6}$." },
        { text: "$6$", explain: "That is $x + 3$ at $x = 3$; the limit is its reciprocal, $\\tfrac16$." },
        { text: "$0$", explain: "After canceling $(x - 3)$ you get $\\dfrac{1}{x + 3}$, which is $\\tfrac16$, not $0$." },
        { text: "$\\dfrac{0}{0}$", explain: "That is the signal; cancel $(x - 3)$ to reach $\\dfrac{1}{x + 3}$." },
      ],
    },
    {
      id: "s-method",
      prompt: "The reliable method for a rational limit that gives $\\tfrac{0}{0}$ is:",
      choices: [
        { text: "Substitute immediately and report $\\tfrac{0}{0}$", explain: "$\\tfrac{0}{0}$ is not an answer; it is the reason you must do algebra." },
        { text: "Factor top and bottom, cancel the common factor, then substitute", correct: true, explain: "Factoring exposes the shared factor causing the $\\tfrac{0}{0}$; cancel it, then substitute." },
        { text: "Declare the limit does not exist", explain: "$\\tfrac{0}{0}$ limits often exist once simplified; do not quit early." },
        { text: "Plug in a nearby value like $x = a + 1$", explain: "A nearby value is only an estimate; simplify and substitute the exact value $a$." },
      ],
    },
    {
      id: "s-rationalize-den",
      prompt: "Evaluate $\\lim_{x \\to 0}\\dfrac{x}{\\sqrt{x + 1} - 1}$.",
      choices: [
        { text: "$1$", explain: "After the conjugate the denominator becomes $x$, canceling to $\\sqrt{x + 1} + 1 \\to 2$, not $1$." },
        { text: "$0$", explain: "The $x$ cancels; the limit is $\\sqrt{x + 1} + 1 \\to 2$." },
        { text: "$\\dfrac{1}{2}$", explain: "That inverts the answer; multiplying by the conjugate gives $\\sqrt{x + 1} + 1 = 2$." },
        { text: "$2$", correct: true, explain: "Multiply by $\\sqrt{x + 1} + 1$: the bottom becomes $x$, cancels the top $x$, leaving $\\sqrt{x + 1} + 1 \\to 2$." },
      ],
    },
  ],
};
