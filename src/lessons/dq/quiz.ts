import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for the difference quotient. Grounded in
 * the lesson: average rate of change on [a, b] is the secant slope
 * (f(b) - f(a))/(b - a). With b = a + h it is the difference quotient
 * (f(a+h) - f(a))/h. For f(x) = x^2 it simplifies to 2a + h (so 2 + h at a = 1),
 * and letting h -> 0 gives the tangent slope 2a (the derivative 2x).
 * Distractors are the standard traps: run/rise inverted, forgetting to divide by
 * h, plugging h = 0 before simplifying (0/0), averaging the outputs instead of
 * taking a slope, sign/cross-term errors expanding (a+h)^2, and confusing the
 * secant with the tangent. Every computation below is verified by hand.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-arc-def",
      prompt: "The average rate of change of $f$ on the interval $[a, b]$ is:",
      choices: [
        { text: "$\\dfrac{f(b) - f(a)}{b - a}$", correct: true, explain: "It is the secant slope: the rise $f(b) - f(a)$ over the run $b - a$." },
        { text: "$\\dfrac{b - a}{f(b) - f(a)}$", explain: "This is run over rise, the reciprocal of the slope." },
        { text: "$f(b) - f(a)$", explain: "That is only the rise. You must divide by the run $b - a$." },
        { text: "$\\dfrac{f(a) + f(b)}{2}$", explain: "That averages the two outputs. The rate of change is a slope, not an average height." },
      ],
    },
    {
      id: "c-slope-of",
      prompt: "Geometrically, the average rate of change of $f$ on $[a, b]$ is the slope of:",
      choices: [
        { text: "the secant line through $(a, f(a))$ and $(b, f(b))$", correct: true, explain: "A secant joins two points of the curve. Its slope is the average rate of change." },
        { text: "the tangent line at $x = a$", explain: "The tangent gives the instantaneous rate. The average rate is the secant." },
        { text: "the $x$-axis", explain: "The $x$-axis has slope $0$ and is unrelated to $f$'s rate of change." },
        { text: "the vertical line $x = a$", explain: "A vertical line has undefined slope. The secant is not vertical here." },
      ],
    },
    {
      id: "c-x2-13",
      prompt: "For $f(x) = x^2$, the average rate of change from $x = 1$ to $x = 3$ is:",
      choices: [
        { text: "$4$", correct: true, explain: "$\\dfrac{f(3) - f(1)}{3 - 1} = \\dfrac{9 - 1}{2} = \\dfrac{8}{2} = 4$." },
        { text: "$8$", explain: "That is the rise $9 - 1$. Still divide by the run $3 - 1 = 2$." },
        { text: "$2$", explain: "That is the run. The rate is rise over run $= 8/2 = 4$." },
        { text: "$5$", explain: "$5$ is the average of $f(1)=1$ and $f(3)=9$, not the slope." },
      ],
    },
    {
      id: "c-dq-def",
      prompt: "The difference quotient of $f$ at $a$ with step $h$ is:",
      choices: [
        { text: "$\\dfrac{f(a + h) - f(a)}{h}$", correct: true, explain: "Writing $b = a + h$, the secant slope becomes rise $f(a+h) - f(a)$ over run $h$." },
        { text: "$\\dfrac{f(a + h) - f(a)}{a}$", explain: "The run is the step $h$, not $a$." },
        { text: "$\\dfrac{f(a) - f(a + h)}{h}$ with no simplification", explain: "This flips the rise's sign. The standard form subtracts $f(a)$ from $f(a+h)$." },
        { text: "$f(a + h) - f(a)$", explain: "That is only the rise. Divide by the run $h$." },
      ],
    },
    {
      id: "c-run",
      prompt: "In $\\dfrac{f(a + h) - f(a)}{h}$, the denominator $h$ is:",
      choices: [
        { text: "the run: the change in the input from $a$ to $a + h$", correct: true, explain: "$h = (a + h) - a$ is the horizontal step, the run." },
        { text: "the rise: the change in the output", explain: "The rise is the numerator $f(a+h) - f(a)$, not $h$." },
        { text: "the slope itself", explain: "The slope is the whole quotient, not the denominator." },
        { text: "the starting output $f(a)$", explain: "$h$ is a change in input, not an output value." },
      ],
    },
    {
      id: "c-simplify1",
      prompt: "Simplify $\\dfrac{(1 + h)^2 - 1}{h}$ for $h \\neq 0$.",
      choices: [
        { text: "$2 + h$", correct: true, explain: "$(1+h)^2 - 1 = 2h + h^2$, and dividing by $h$ gives $2 + h$." },
        { text: "$h$", explain: "This drops the cross term: $(1+h)^2 = 1 + 2h + h^2$, not $1 + h^2$." },
        { text: "$1 + h$", explain: "After canceling the $1$s the numerator is $2h + h^2$, giving $2 + h$, not $1 + h$." },
        { text: "$2 + h^2$", explain: "Dividing $2h + h^2$ by $h$ gives $2 + h$, not $2 + h^2$." },
      ],
    },
    {
      id: "c-dq-eval",
      prompt: "Using the simplified form $2 + h$, the difference quotient at $h = 0.5$ is:",
      choices: [
        { text: "$2.5$", correct: true, explain: "$2 + 0.5 = 2.5$." },
        { text: "$2$", explain: "$2$ is the limit as $h \\to 0$. At $h = 0.5$ it is $2.5$." },
        { text: "$0.5$", explain: "Do not drop the $2$: the value is $2 + 0.5 = 2.5$." },
        { text: "$4.5$", explain: "That is $4 + 0.5$. The simplified slope is $2 + h$, giving $2.5$." },
      ],
    },
    {
      id: "c-limit",
      prompt: "As $h \\to 0$, the difference quotient $2 + h$ approaches:",
      choices: [
        { text: "$2$", correct: true, explain: "$2 + h \\to 2 + 0 = 2$, the tangent slope at $x = 1$." },
        { text: "$0$", explain: "The $2$ does not vanish. Only the $h$ term goes to $0$." },
        { text: "$\\infty$", explain: "$2 + h$ stays near $2$ as $h$ shrinks. It does not blow up." },
        { text: "It is undefined", explain: "After simplifying, $2 + h$ is perfectly defined at $h = 0$: it is $2$." },
      ],
    },
    {
      id: "c-tangent",
      prompt: "The instantaneous rate of change of $f$ at a point is the slope of:",
      choices: [
        { text: "the tangent line at that point", correct: true, explain: "The instantaneous rate is the limiting slope: the tangent line." },
        { text: "any secant line near that point", explain: "A secant gives an average rate. The tangent is the limit as the step $\\to 0$." },
        { text: "the horizontal line through the point", explain: "That always has slope $0$, regardless of $f$." },
        { text: "the line from the origin to the point", explain: "That is a secant from $(0,0)$, not the tangent." },
      ],
    },
    {
      id: "c-cannot-h0",
      prompt: "Why can we not just set $h = 0$ in $\\dfrac{(1+h)^2 - 1}{h}$ before simplifying?",
      choices: [
        { text: "It gives $\\tfrac{0}{0}$, which is undefined. Simplify to $2 + h$ first", correct: true, explain: "At $h = 0$ the raw fraction is $0/0$. Canceling the $h$ first makes the limit clear." },
        { text: "Because $h$ must be negative", explain: "$h$ can be positive or negative. The issue is division by $0$." },
        { text: "Because $(1+h)^2$ is undefined at $h = 0$", explain: "$(1+0)^2 = 1$ is fine. The problem is the denominator $h = 0$." },
        { text: "We can: it gives $2$ directly", explain: "Setting $h = 0$ in the raw fraction gives $0/0$, not $2$. You must simplify first." },
      ],
    },
    {
      id: "c-inverted",
      prompt: "Slope, and hence average rate of change, is:",
      choices: [
        { text: "rise over run", correct: true, explain: "Slope $= \\dfrac{\\text{rise}}{\\text{run}} = \\dfrac{f(b) - f(a)}{b - a}$." },
        { text: "run over rise", explain: "That is the reciprocal. Slope puts the rise on top." },
        { text: "rise times run", explain: "Slope is a ratio, not a product." },
        { text: "rise plus run", explain: "Slope divides the rise by the run. It does not add them." },
      ],
    },
    {
      id: "c-x2-24",
      prompt: "For $f(x) = x^2$, the average rate of change from $x = 2$ to $x = 4$ is:",
      choices: [
        { text: "$6$", correct: true, explain: "$\\dfrac{f(4) - f(2)}{4 - 2} = \\dfrac{16 - 4}{2} = \\dfrac{12}{2} = 6$." },
        { text: "$12$", explain: "That is the rise $16 - 4$. Divide by the run $2$." },
        { text: "$4$", explain: "$4$ is $f(2)$, not the rate of change." },
        { text: "$10$", explain: "$10$ is the average of $f(2)=4$ and $f(4)=16$, not the slope." },
      ],
    },
    {
      id: "c-linear",
      prompt: "For the line $f(x) = 3x + 2$, the average rate of change on any interval is:",
      choices: [
        { text: "$3$", correct: true, explain: "A line has constant slope $3$, so every secant slope is $3$." },
        { text: "$2$", explain: "$2$ is the $y$-intercept, not the slope." },
        { text: "It depends on the interval", explain: "For a line the rate is the same everywhere: the slope $3$." },
        { text: "$5$", explain: "That is $f(1) = 3(1)+2$, a single value, not the rate." },
      ],
    },
    {
      id: "c-secant-vs-tan",
      prompt: "How do a secant line and a tangent line differ?",
      choices: [
        { text: "A secant crosses the curve at two points. A tangent touches at one", correct: true, explain: "The secant is the average-rate line. The tangent is its limit, grazing one point." },
        { text: "A secant touches one point. A tangent crosses two", explain: "It is the reverse: the secant uses two points." },
        { text: "They are the same line", explain: "The tangent is the limit of secants as the two points merge. Before that they differ." },
        { text: "A tangent is always horizontal", explain: "A tangent has the curve's instantaneous slope, which is usually not $0$." },
      ],
    },
    {
      id: "c-rise",
      prompt: "In the difference quotient, the numerator $f(a + h) - f(a)$ is:",
      choices: [
        { text: "the rise: the change in output as $x$ goes from $a$ to $a + h$", correct: true, explain: "It measures how much the output climbs over the step." },
        { text: "the run", explain: "The run is the denominator $h$, the change in input." },
        { text: "the slope", explain: "The slope is the whole quotient, not just the numerator." },
        { text: "always equal to $h$", explain: "The rise depends on $f$. It equals $h$ only for the line $f(x) = x + c$." },
      ],
    },
  ],
  summit: [
    {
      id: "s-general-dq",
      prompt: "Simplify the difference quotient of $f(x) = x^2$ at a general $a$: $\\dfrac{(a + h)^2 - a^2}{h}$.",
      choices: [
        { text: "$2a + h$", correct: true, explain: "$(a+h)^2 - a^2 = 2ah + h^2$, and dividing by $h$ gives $2a + h$." },
        { text: "$2a$", explain: "$2a$ is the limit as $h \\to 0$. Before that the quotient is $2a + h$." },
        { text: "$a + h$", explain: "The cross term is $2ah$, so dividing by $h$ leaves $2a + h$, not $a + h$." },
        { text: "$2a + h^2$", explain: "Dividing $2ah + h^2$ by $h$ gives $2a + h$, not $2a + h^2$." },
      ],
    },
    {
      id: "s-deriv-x2",
      prompt: "Letting $h \\to 0$ in $2a + h$, the instantaneous rate of change of $x^2$ at $x = a$ is:",
      choices: [
        { text: "$2a$", correct: true, explain: "$2a + h \\to 2a$, so the derivative of $x^2$ is $2x$." },
        { text: "$a^2$", explain: "$a^2$ is the height $f(a)$, not the slope." },
        { text: "$2a + h$", explain: "That is the average rate for a finite step. The instantaneous rate takes $h \\to 0$, giving $2a$." },
        { text: "$2$", explain: "$2$ is the slope only at $a = 1$. In general it is $2a$." },
      ],
    },
    {
      id: "s-at3",
      prompt: "Simplify $\\dfrac{(3 + h)^2 - 9}{h}$ for $h \\neq 0$.",
      choices: [
        { text: "$6 + h$", correct: true, explain: "$(3+h)^2 - 9 = 9 + 6h + h^2 - 9 = 6h + h^2$, so the quotient is $6 + h$." },
        { text: "$3 + h$", explain: "The cross term is $2\\cdot 3\\cdot h = 6h$, so it is $6 + h$." },
        { text: "$6 + h^2$", explain: "Dividing $6h + h^2$ by $h$ gives $6 + h$." },
        { text: "$9 + h$", explain: "The $9$ cancels with $-9$. The leftover is $6h + h^2$, giving $6 + h$." },
      ],
    },
    {
      id: "s-tangent-slope3",
      prompt: "The tangent slope of $f(x) = x^2$ at $x = 3$ is:",
      choices: [
        { text: "$6$", correct: true, explain: "The derivative is $2x$, so at $x = 3$ it is $2(3) = 6$ (the limit of $6 + h$)." },
        { text: "$9$", explain: "$9 = f(3)$, the height, not the slope." },
        { text: "$3$", explain: "The slope is $2x = 6$ at $x = 3$, not $3$." },
        { text: "$2$", explain: "$2$ is the slope at $x = 1$. At $x = 3$ it is $2(3) = 6$." },
      ],
    },
    {
      id: "s-x2-neg",
      prompt: "For $f(x) = x^2$, the average rate of change from $x = -2$ to $x = 1$ is:",
      choices: [
        { text: "$-1$", correct: true, explain: "$\\dfrac{f(1) - f(-2)}{1 - (-2)} = \\dfrac{1 - 4}{3} = \\dfrac{-3}{3} = -1$." },
        { text: "$1$", explain: "The rise is negative, $1 - 4 = -3$, so the rate is $-1$." },
        { text: "$-3$", explain: "That is the rise. Divide by the run $1 - (-2) = 3$." },
        { text: "$3$", explain: "$3$ is the run. The rate is $-3/3 = -1$." },
      ],
    },
    {
      id: "s-avg-vs-mean",
      prompt: "Which expression is the average rate of change of $f$ on $[a, b]$ (not the average of the outputs)?",
      choices: [
        { text: "$\\dfrac{f(b) - f(a)}{b - a}$", correct: true, explain: "Average rate of change is a slope: difference of outputs over difference of inputs." },
        { text: "$\\dfrac{f(a) + f(b)}{2}$", explain: "That is the mean of the two output values, not a rate." },
        { text: "$\\dfrac{a + b}{2}$", explain: "That is the midpoint of the interval, an input, not a rate." },
        { text: "$f\\left(\\dfrac{a + b}{2}\\right)$", explain: "That is the output at the midpoint, not the average rate." },
      ],
    },
    {
      id: "s-cube",
      prompt: "For $f(x) = x^3$, simplify $\\dfrac{(1 + h)^3 - 1}{h}$ for $h \\neq 0$.",
      choices: [
        { text: "$3 + 3h + h^2$", correct: true, explain: "$(1+h)^3 = 1 + 3h + 3h^2 + h^3$. Subtract $1$ and divide by $h$ to get $3 + 3h + h^2$." },
        { text: "$3$", explain: "$3$ is the limit as $h \\to 0$. The full quotient is $3 + 3h + h^2$." },
        { text: "$1 + 3h + h^2$", explain: "After canceling the $1$s the constant term is $3$ (from $3h/h$), not $1$." },
        { text: "$3 + h$", explain: "$(1+h)^3$ has two extra terms $3h^2$ and $h^3$. Dividing gives $3 + 3h + h^2$." },
      ],
    },
    {
      id: "s-velocity",
      prompt: "A ball's height is $s(t) = t^2$ (feet, seconds). Its average velocity on $[1, 3]$ is:",
      choices: [
        { text: "$4$ ft/s", correct: true, explain: "Average velocity is the average rate of change: $\\dfrac{s(3) - s(1)}{3 - 1} = \\dfrac{9 - 1}{2} = 4$." },
        { text: "$9$ ft/s", explain: "$9 = s(3)$, a position, not a velocity." },
        { text: "$8$ ft/s", explain: "That is the rise $s(3) - s(1)$. Divide by the $2$ seconds elapsed." },
        { text: "$6$ ft/s", explain: "$6$ is the instantaneous velocity at $t = 3$ (the derivative $2t$), not the average on $[1,3]$." },
      ],
    },
    {
      id: "s-expand-trap",
      prompt: "A student simplifies $\\dfrac{(2 + h)^2 - 4}{h}$ and gets $h$. What did they miss?",
      choices: [
        { text: "The cross term: $(2+h)^2 = 4 + 4h + h^2$, so the quotient is $4 + h$, not $h$", correct: true, explain: "They wrote $(2+h)^2 = 4 + h^2$, dropping $4h$. The correct answer is $4 + h$." },
        { text: "Nothing, $h$ is correct", explain: "It is not: the numerator is $4h + h^2$, so dividing by $h$ gives $4 + h$." },
        { text: "They should not cancel the $h$", explain: "Canceling $h$ is valid for $h \\neq 0$. The error was in expanding the square." },
        { text: "The answer should be $2 + h$", explain: "At $a = 2$ the quotient is $2a + h = 4 + h$, not $2 + h$." },
      ],
    },
    {
      id: "s-forgot-divide",
      prompt: "Which quantity is the actual average rate of change, not just the rise?",
      choices: [
        { text: "$\\dfrac{f(a + h) - f(a)}{h}$", correct: true, explain: "The rate divides the rise by the run $h$. The rise alone is $f(a+h) - f(a)$." },
        { text: "$f(a + h) - f(a)$", explain: "That is the rise only. A rate must be per unit of input." },
        { text: "$f(a + h) + f(a)$", explain: "Adding the outputs gives neither a rise nor a rate." },
        { text: "$f(a + h)$", explain: "That is a single output value, not a change or a rate." },
      ],
    },
    {
      id: "s-linear-dq",
      prompt: "For $f(x) = mx + b$, the difference quotient $\\dfrac{f(a + h) - f(a)}{h}$ simplifies to:",
      choices: [
        { text: "$m$", correct: true, explain: "$f(a+h) - f(a) = m(a+h) + b - (ma + b) = mh$, so the quotient is $m$." },
        { text: "$m + b$", explain: "The $b$ cancels: $(ma + mh + b) - (ma + b) = mh$." },
        { text: "$mh$", explain: "That is the rise. Dividing by the run $h$ leaves $m$." },
        { text: "$ma + b$", explain: "That is $f(a)$, an output, not the rate. The rate is the slope $m$." },
      ],
    },
    {
      id: "s-which-h",
      prompt: "As $h$ shrinks toward $0$, the secant slope $\\dfrac{f(a+h) - f(a)}{h}$:",
      choices: [
        { text: "approaches the tangent slope (the instantaneous rate) at $x = a$", correct: true, explain: "The secant tilts toward the tangent as the second point slides in." },
        { text: "grows without bound", explain: "It settles toward the finite tangent slope, not infinity (for a smooth $f$)." },
        { text: "approaches $0$ for every function", explain: "It approaches the tangent slope, which is usually not $0$." },
        { text: "stays exactly equal to the average on $[a, b]$", explain: "The average changes as the interval shrinks. The limit is the instantaneous rate." },
      ],
    },
    {
      id: "s-shift-invariant",
      prompt: "For $g(x) = x^2 + 3$, simplify $\\dfrac{g(1 + h) - g(1)}{h}$.",
      choices: [
        { text: "$2 + h$", correct: true, explain: "The $+3$ cancels: $g(1+h) - g(1) = (1+h)^2 + 3 - (1 + 3) = (1+h)^2 - 1 = 2h + h^2$, so $2 + h$." },
        { text: "$2 + h + 3$", explain: "The constant $3$ appears in both $g(1+h)$ and $g(1)$, so it cancels." },
        { text: "$5 + h$", explain: "Adding a constant shifts the graph up but does not change the slope. It stays $2 + h$." },
        { text: "$h$", explain: "The cross term $2h$ survives: the quotient is $2 + h$, not $h$." },
      ],
    },
    {
      id: "s-interpret",
      prompt: "The derivative $f'(a)$ is best described as:",
      choices: [
        { text: "the instantaneous rate of change of $f$ at $x = a$ (the tangent slope)", correct: true, explain: "It is the limit of the difference quotient as $h \\to 0$: the tangent slope." },
        { text: "the value $f(a)$", explain: "$f(a)$ is the height. $f'(a)$ is the slope there." },
        { text: "the average rate of change on a fixed interval", explain: "That is a secant slope. The derivative is the limiting (instantaneous) rate." },
        { text: "the area under the curve at $x = a$", explain: "Area is a different idea (integration). The derivative is a slope." },
      ],
    },
    {
      id: "s-zero-slope",
      prompt: "For $f(x) = x^2$, at which $x$ is the instantaneous rate of change $0$?",
      choices: [
        { text: "$x = 0$", correct: true, explain: "The derivative is $2x$, which is $0$ exactly at $x = 0$ (the vertex, where the tangent is horizontal)." },
        { text: "$x = 1$", explain: "At $x = 1$ the slope is $2(1) = 2$, not $0$." },
        { text: "$x = 2$", explain: "At $x = 2$ the slope is $2(2) = 4$, not $0$." },
        { text: "nowhere", explain: "$2x = 0$ has the solution $x = 0$, so the slope is $0$ at the vertex." },
      ],
    },
  ],
};
