import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Multi-angle and factorable trig
 * equations". Grounded in the lesson: expose a hidden quadratic with a
 * substitution, factor and apply the zero-product rule, reduce mixed angles
 * with an identity, factor (never divide) so no solutions are lost, and widen
 * the interval for a doubled or tripled angle before dividing back down.
 * Distractors are the classic traps: dividing away a factor, too-narrow
 * intervals, sign slips, forgetting to halve, and extraneous roots.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-substitute",
      prompt: "The equation $2\\sin^2 x - \\sin x - 1 = 0$ is a quadratic in disguise. Letting $u = \\sin x$, what does it become?",
      choices: [
        { text: "$2u^2 - u - 1 = 0$", correct: true, explain: "Since $\\sin^2 x = (\\sin x)^2 = u^2$, every $\\sin x$ becomes $u$ and the shape is a plain quadratic." },
        { text: "$2u - 1 = 0$", explain: "This treats $\\sin^2 x$ as a single power of $\\sin x$. But $\\sin^2 x = (\\sin x)^2 = u^2$, so the squared term stays." },
        { text: "$2u^2 - u + 1 = 0$", explain: "Sign slip: the constant term is $-1$, not $+1$." },
        { text: "$u^2 - u - 1 = 0$", explain: "The leading coefficient $2$ multiplies $\\sin^2 x$, so it must stay: $2u^2$." },
      ],
    },
    {
      id: "c-sinsq",
      prompt: "In $2\\sin^2 x - \\sin x - 1 = 0$, what does $\\sin^2 x$ mean?",
      choices: [
        { text: "$\\sin(x^2)$, squaring the input $x$ first", explain: "A classic trap. $\\sin^2 x$ squares the output $\\sin x$, not the input, so it is not $\\sin(x^2)$." },
        { text: "$2\\sin x$, doubling the sine", explain: "The small $2$ is an exponent, not a multiplier: $\\sin^2 x = (\\sin x)^2$." },
        { text: "$(\\sin x)^2$, the value $\\sin x$ squared", correct: true, explain: "Correct: $\\sin^2 x$ is shorthand for $(\\sin x)^2$, so $u = \\sin x$ turns it into $u^2$." },
        { text: "$\\sin x \\cdot x$, sine times $x$", explain: "The exponent squares $\\sin x$. It does not multiply by $x$." },
      ],
    },
    {
      id: "c-factor",
      prompt: "Factor the quadratic $2u^2 - u - 1$ (where $u = \\sin x$).",
      choices: [
        { text: "$(2u - 1)(u + 1)$", explain: "Expand: $2u^2 + 2u - u - 1 = 2u^2 + u - 1$. The middle term is $+u$, not $-u$." },
        { text: "$(2u + 1)(u - 1)$", correct: true, explain: "Expand: $2u^2 - 2u + u - 1 = 2u^2 - u - 1$. This matches." },
        { text: "$(u - 1)(u + 1)$", explain: "That is $u^2 - 1$: it drops the leading coefficient $2$ and has no middle term." },
        { text: "$(2u + 1)(u + 1)$", explain: "Expand: $2u^2 + 3u + 1$, so both the middle term and the constant are wrong." },
      ],
    },
    {
      id: "c-zpp",
      prompt: "Apply the zero-product rule to $(2\\sin x + 1)(\\sin x - 1) = 0$. Which two basic equations result?",
      choices: [
        { text: "$\\sin x = \\tfrac12$ or $\\sin x = 1$", explain: "Sign slip: $2\\sin x + 1 = 0$ gives $\\sin x = -\\tfrac12$, not $+\\tfrac12$." },
        { text: "$\\sin x = -\\tfrac12$ or $\\sin x = -1$", explain: "The factor $\\sin x - 1 = 0$ gives $\\sin x = 1$, not $-1$." },
        { text: "$\\sin x = -2$ or $\\sin x = 1$", explain: "From $2\\sin x = -1$, divide by $2$ to get $\\sin x = -\\tfrac12$, not $-2$." },
        { text: "$\\sin x = -\\tfrac12$ or $\\sin x = 1$", correct: true, explain: "Set each factor to zero: $2\\sin x + 1 = 0 \\Rightarrow \\sin x = -\\tfrac12$, and $\\sin x - 1 = 0 \\Rightarrow \\sin x = 1$." },
      ],
    },
    {
      id: "c-solve-neg-half",
      prompt: "Solve $\\sin x = -\\tfrac12$ on $[0, 2\\pi)$.",
      choices: [
        { text: "$x = \\dfrac{7\\pi}{6}, \\dfrac{11\\pi}{6}$", correct: true, explain: "Sine is negative in quadrants III and IV. With reference angle $\\tfrac{\\pi}{6}$ that gives $\\pi + \\tfrac{\\pi}{6}$ and $2\\pi - \\tfrac{\\pi}{6}$." },
        { text: "$x = \\dfrac{\\pi}{6}, \\dfrac{5\\pi}{6}$", explain: "Those solve $\\sin x = +\\tfrac12$ (quadrants I and II), where sine is positive." },
        { text: "$x = \\dfrac{5\\pi}{6}, \\dfrac{7\\pi}{6}$", explain: "Only $\\tfrac{7\\pi}{6}$ works. $\\tfrac{5\\pi}{6}$ has a positive sine." },
        { text: "$x = \\dfrac{7\\pi}{6}$", explain: "There are two angles with $\\sin x = -\\tfrac12$. You also need $\\tfrac{11\\pi}{6}$ in quadrant IV." },
      ],
    },
    {
      id: "c-sin-max",
      prompt: "How many solutions does $\\sin x = 1$ contribute on $[0, 2\\pi)$?",
      choices: [
        { text: "two, at $\\dfrac{\\pi}{2}$ and $\\dfrac{3\\pi}{2}$", explain: "$\\tfrac{3\\pi}{2}$ gives $\\sin x = -1$, the minimum, not $+1$." },
        { text: "none, $\\sin x = 1$ has no solution", explain: "Sine does reach $1$. That value is its maximum." },
        { text: "one, at $x = \\dfrac{\\pi}{2}$", correct: true, explain: "Sine hits its maximum $1$ exactly once per turn, at $\\tfrac{\\pi}{2}$." },
        { text: "one, at $x = 0$", explain: "$\\sin 0 = 0$, not $1$. The peak sits at $\\tfrac{\\pi}{2}$." },
      ],
    },
    {
      id: "c-count-3",
      prompt: "The equation $2\\sin^2 x - \\sin x - 1 = 0$ reduces to $\\sin x = -\\tfrac12$ or $\\sin x = 1$. How many solutions does it have on $[0, 2\\pi)$?",
      choices: [
        { text: "four", explain: "$\\sin x = 1$ contributes only one solution, not two, so the total is three." },
        { text: "three", correct: true, explain: "$\\sin x = -\\tfrac12$ gives $\\tfrac{7\\pi}{6}, \\tfrac{11\\pi}{6}$ (two) and $\\sin x = 1$ gives $\\tfrac{\\pi}{2}$ (one): $2 + 1 = 3$." },
        { text: "two", explain: "$\\sin x = -\\tfrac12$ already gives two. The $\\sin x = 1$ branch adds one more." },
        { text: "one", explain: "Each branch has solutions: two plus one makes three." },
      ],
    },
    {
      id: "c-no-divide",
      prompt: "To solve $\\sin 2x = \\sin x$, why move everything to one side and factor instead of dividing both sides by $\\sin x$?",
      choices: [
        { text: "dividing gives a sign error", explain: "The real issue is lost solutions, not a sign flip." },
        { text: "you may never divide in a trig equation", explain: "You can divide by a quantity you know is nonzero. The trouble here is that $\\sin x$ can be zero." },
        { text: "factoring is simply quicker to write", explain: "It is about correctness: dividing by $\\sin x$ deletes the solutions where $\\sin x = 0$." },
        { text: "dividing by $\\sin x$ discards every solution where $\\sin x = 0$", correct: true, explain: "You may only divide by something guaranteed nonzero. Factoring keeps the $\\sin x = 0$ case that dividing would throw away." },
      ],
    },
    {
      id: "c-double-id",
      prompt: "Which identity rewrites $\\sin 2x$ so that $\\sin 2x = \\sin x$ is stated in the single angle $x$?",
      choices: [
        { text: "$\\sin 2x = 2\\sin x \\cos x$", correct: true, explain: "The double-angle identity for sine turns $\\sin 2x$ into terms in the single angle $x$." },
        { text: "$\\sin 2x = 2\\sin x$", explain: "Doubling the angle is not doubling the sine. The correct form is $2\\sin x \\cos x$." },
        { text: "$\\sin 2x = \\cos^2 x - \\sin^2 x$", explain: "That right side is $\\cos 2x$, a cosine double angle, not $\\sin 2x$." },
        { text: "$\\sin 2x = 1 - 2\\sin^2 x$", explain: "That is another form of $\\cos 2x$, not $\\sin 2x$." },
      ],
    },
    {
      id: "c-factor-common",
      prompt: "After rewriting, $2\\sin x \\cos x - \\sin x = 0$. Factor out the common factor.",
      choices: [
        { text: "$\\cos x\\,(2\\sin x - 1) = 0$", explain: "The shared factor is $\\sin x$, not $\\cos x$. Only the first term contains $\\cos x$." },
        { text: "$\\sin x\\,(2\\cos x) = 0$", explain: "You dropped the $-\\sin x$ term. Factoring it leaves a $-1$ inside, giving $2\\cos x - 1$." },
        { text: "$\\sin x\\,(2\\cos x - 1) = 0$", correct: true, explain: "Both terms share $\\sin x$. Pulling it out leaves $2\\cos x - 1$ inside." },
        { text: "$2\\sin x\\,(\\cos x - 1) = 0$", explain: "Factoring $2\\sin x$ out of $-\\sin x$ would need $-\\tfrac12$ inside, not $-1$. Use the clean common factor $\\sin x$." },
      ],
    },
    {
      id: "c-branches",
      prompt: "From $\\sin x\\,(2\\cos x - 1) = 0$, what are the two basic equations?",
      choices: [
        { text: "$\\sin x = 0$ or $\\cos x = 2$", explain: "Solve $2\\cos x - 1 = 0$: add $1$, divide by $2$ to get $\\cos x = \\tfrac12$, not $2$." },
        { text: "$\\sin x = 0$ or $\\cos x = \\tfrac12$", correct: true, explain: "Set each factor to zero: $\\sin x = 0$, and $2\\cos x - 1 = 0 \\Rightarrow \\cos x = \\tfrac12$." },
        { text: "$\\sin x = 1$ or $\\cos x = \\tfrac12$", explain: "The first factor is $\\sin x$ itself, so it gives $\\sin x = 0$, not $1$." },
        { text: "$\\cos x = 0$ or $\\sin x = \\tfrac12$", explain: "The factors are $\\sin x$ and $2\\cos x - 1$, so the equations are $\\sin x = 0$ and $\\cos x = \\tfrac12$." },
      ],
    },
    {
      id: "c-solve-sin0",
      prompt: "Solve $\\sin x = 0$ on $[0, 2\\pi)$.",
      choices: [
        { text: "$x = 0, \\pi, 2\\pi$", explain: "The interval $[0, 2\\pi)$ excludes $2\\pi$, so keep only $0$ and $\\pi$." },
        { text: "$x = \\dfrac{\\pi}{2}, \\dfrac{3\\pi}{2}$", explain: "Those are where $\\cos x = 0$. Sine is zero at $0$ and $\\pi$." },
        { text: "$x = \\pi$", explain: "There are two solutions on $[0, 2\\pi)$: $x = 0$ and $x = \\pi$." },
        { text: "$x = 0, \\pi$", correct: true, explain: "Sine is zero at $0$ and $\\pi$ on $[0, 2\\pi)$. The endpoint $2\\pi$ is excluded." },
      ],
    },
    {
      id: "c-widen",
      prompt: "For $\\cos 2x = \\tfrac12$ with $x \\in [0, 2\\pi)$, over what interval does the inside angle $2x$ range?",
      choices: [
        { text: "$[0, 4\\pi)$", correct: true, explain: "If $x$ runs over $[0, 2\\pi)$, then $2x$ runs over $[0, 4\\pi)$: two full turns, so widen before solving." },
        { text: "$[0, 2\\pi)$", explain: "Multiply the bounds by $2$: $2x$ reaches up to $4\\pi$, not $2\\pi$." },
        { text: "$[0, \\pi)$", explain: "Doubling the angle widens the interval. It does not halve it." },
        { text: "$[0, 8\\pi)$", explain: "Twice $2\\pi$ is $4\\pi$, not $8\\pi$." },
      ],
    },
    {
      id: "c-halve",
      prompt: "Solving $\\cos 2x = \\tfrac12$, you find $2x = \\dfrac{\\pi}{3}, \\dfrac{5\\pi}{3}, \\dfrac{7\\pi}{3}, \\dfrac{11\\pi}{3}$. What is the final step to get $x$?",
      choices: [
        { text: "multiply every value by $2$", explain: "That would undo an inside angle of $\\tfrac{x}{2}$. Here the inside is $2x$, so divide." },
        { text: "subtract $2\\pi$ from each", explain: "Converting $2x$ back to $x$ means dividing by $2$, not shifting by a full turn." },
        { text: "divide every value by $2$", correct: true, explain: "The inside angle is $2x$, so divide each solution by $2$: $x = \\tfrac{\\pi}{6}, \\tfrac{5\\pi}{6}, \\tfrac{7\\pi}{6}, \\tfrac{11\\pi}{6}$." },
        { text: "keep them as the answers for $x$", explain: "These are values of $2x$. You still must divide by $2$ to get $x$." },
      ],
    },
    {
      id: "c-count-4",
      prompt: "How many solutions does $\\cos 2x = \\tfrac12$ have on $[0, 2\\pi)$?",
      choices: [
        { text: "two", explain: "That counts only one turn of $2x$. The doubled angle sweeps two turns, giving four." },
        { text: "four", correct: true, explain: "Over the two turns of $2x$, $\\cos = \\tfrac12$ twice per turn: $x = \\tfrac{\\pi}{6}, \\tfrac{5\\pi}{6}, \\tfrac{7\\pi}{6}, \\tfrac{11\\pi}{6}$." },
        { text: "one", explain: "$\\cos 2x = \\tfrac12$ has four solutions here, not one." },
        { text: "eight", explain: "Two per turn over two turns is four, not eight." },
      ],
    },
  ],
  summit: [
    {
      id: "s-full-sin",
      prompt: "Solve $2\\sin^2 x + \\sin x - 1 = 0$ on $[0, 2\\pi)$.",
      choices: [
        { text: "$x = \\dfrac{\\pi}{6}, \\dfrac{5\\pi}{6}, \\dfrac{3\\pi}{2}$", correct: true, explain: "Factor $(2\\sin x - 1)(\\sin x + 1) = 0$: $\\sin x = \\tfrac12$ gives $\\tfrac{\\pi}{6}, \\tfrac{5\\pi}{6}$, and $\\sin x = -1$ gives $\\tfrac{3\\pi}{2}$." },
        { text: "$x = \\dfrac{\\pi}{6}, \\dfrac{5\\pi}{6}, \\dfrac{\\pi}{2}, \\dfrac{3\\pi}{2}$", explain: "$\\sin x = -1$ gives only $\\tfrac{3\\pi}{2}$. $\\tfrac{\\pi}{2}$ has $\\sin x = +1$, which is not a root here." },
        { text: "$x = \\dfrac{\\pi}{6}, \\dfrac{5\\pi}{6}$", explain: "You solved $\\sin x = \\tfrac12$ but dropped the $\\sin x = -1$ branch, which adds $\\tfrac{3\\pi}{2}$." },
        { text: "$x = \\dfrac{7\\pi}{6}, \\dfrac{11\\pi}{6}, \\dfrac{3\\pi}{2}$", explain: "Sign slip: $\\sin x = \\tfrac12$ is positive, so it gives $\\tfrac{\\pi}{6}, \\tfrac{5\\pi}{6}$, not the quadrant III and IV angles." },
      ],
    },
    {
      id: "s-full-cos",
      prompt: "Solve $2\\cos^2 x - \\cos x - 1 = 0$ on $[0, 2\\pi)$.",
      choices: [
        { text: "$x = \\dfrac{2\\pi}{3}, \\dfrac{4\\pi}{3}$", explain: "You dropped $\\cos x = 1$, which contributes $x = 0$." },
        { text: "$x = 0, \\dfrac{\\pi}{3}, \\dfrac{5\\pi}{3}$", explain: "$\\cos x = -\\tfrac12$ gives $\\tfrac{2\\pi}{3}, \\tfrac{4\\pi}{3}$. The angles $\\tfrac{\\pi}{3}, \\tfrac{5\\pi}{3}$ solve $\\cos x = +\\tfrac12$." },
        { text: "$x = 0, \\dfrac{2\\pi}{3}, \\dfrac{4\\pi}{3}$", correct: true, explain: "Factor $(2\\cos x + 1)(\\cos x - 1) = 0$: $\\cos x = -\\tfrac12$ gives $\\tfrac{2\\pi}{3}, \\tfrac{4\\pi}{3}$, and $\\cos x = 1$ gives $0$." },
        { text: "$x = 0, \\pi, \\dfrac{2\\pi}{3}, \\dfrac{4\\pi}{3}$", explain: "$\\cos x = 1$ gives only $x = 0$. $x = \\pi$ has $\\cos x = -1$, not a root here." },
      ],
    },
    {
      id: "s-divide-trap",
      prompt: "A student solves $\\sin 2x = \\sin x$ by dividing both sides by $\\sin x$, reaching $2\\cos x = 1$ and $x = \\dfrac{\\pi}{3}, \\dfrac{5\\pi}{3}$. What is the mistake?",
      choices: [
        { text: "nothing, $x = \\dfrac{\\pi}{3}, \\dfrac{5\\pi}{3}$ is the complete set", explain: "Two solutions were lost: dividing by $\\sin x$ discards $x = 0$ and $x = \\pi$." },
        { text: "dividing by $\\sin x$ dropped the solutions $x = 0, \\pi$ where $\\sin x = 0$", correct: true, explain: "Factor $\\sin x\\,(2\\cos x - 1) = 0$ instead. The full set is $0, \\tfrac{\\pi}{3}, \\pi, \\tfrac{5\\pi}{3}$." },
        { text: "the identity $\\sin 2x = 2\\sin x \\cos x$ was applied wrongly", explain: "That identity is correct. The error is dividing by a factor that can be zero." },
        { text: "$2\\cos x = 1$ should give $\\cos x = 2$", explain: "$2\\cos x = 1$ correctly gives $\\cos x = \\tfrac12$. The real loss is the $\\sin x = 0$ solutions." },
      ],
    },
    {
      id: "s-count-identity",
      prompt: "How many solutions does $\\sin 2x = \\sin x$ have on $[0, 2\\pi)$?",
      choices: [
        { text: "two", explain: "That is what dividing by $\\sin x$ leaves. Factoring recovers $x = 0, \\pi$ for four total." },
        { text: "three", explain: "Both branches give two solutions each and none coincide, so the total is four." },
        { text: "six", explain: "$\\sin x = 0$ and $\\cos x = \\tfrac12$ give two each: four, not six." },
        { text: "four", correct: true, explain: "$\\sin x = 0$ gives $0, \\pi$ and $\\cos x = \\tfrac12$ gives $\\tfrac{\\pi}{3}, \\tfrac{5\\pi}{3}$: $2 + 2 = 4$." },
      ],
    },
    {
      id: "s-multi-sin2x",
      prompt: "Solve $\\sin 2x = \\dfrac{\\sqrt{3}}{2}$ on $[0, 2\\pi)$.",
      choices: [
        { text: "$x = \\dfrac{\\pi}{6}, \\dfrac{\\pi}{3}, \\dfrac{7\\pi}{6}, \\dfrac{4\\pi}{3}$", correct: true, explain: "With $2x \\in [0, 4\\pi)$, $2x = \\tfrac{\\pi}{3}, \\tfrac{2\\pi}{3}, \\tfrac{7\\pi}{3}, \\tfrac{8\\pi}{3}$. Halve each to get $x$." },
        { text: "$x = \\dfrac{\\pi}{6}, \\dfrac{\\pi}{3}$", explain: "You used only one turn of $2x$. The interval $[0, 4\\pi)$ adds $\\tfrac{7\\pi}{3}, \\tfrac{8\\pi}{3}$, giving two more values." },
        { text: "$x = \\dfrac{\\pi}{3}, \\dfrac{2\\pi}{3}, \\dfrac{7\\pi}{3}, \\dfrac{8\\pi}{3}$", explain: "These are the values of $2x$. You must divide each by $2$ to get $x$." },
        { text: "$x = \\dfrac{\\pi}{6}, \\dfrac{\\pi}{3}, \\dfrac{13\\pi}{6}, \\dfrac{7\\pi}{3}$", explain: "This adds $2\\pi$ to $x$ instead of to $2x$. Those extra angles fall outside $[0, 2\\pi)$. Add the turn to the doubled angle, then halve." },
      ],
    },
    {
      id: "s-count-3x",
      prompt: "How many solutions does $\\sin 3x = \\tfrac12$ have on $[0, 2\\pi)$?",
      choices: [
        { text: "two", explain: "That counts one turn. Tripling the angle sweeps three turns, giving six." },
        { text: "three", explain: "Each turn contributes two solutions, and there are three turns: $6$, not $3$." },
        { text: "six", correct: true, explain: "With $3x \\in [0, 6\\pi)$ (three turns), $\\sin = \\tfrac12$ twice per turn: $3 \\times 2 = 6$." },
        { text: "twelve", explain: "Two per turn over three turns is six, not twelve." },
      ],
    },
    {
      id: "s-reduce",
      prompt: "To solve $2\\cos^2 x + \\sin x - 1 = 0$, first replace $\\cos^2 x$ with $1 - \\sin^2 x$. What equation in $\\sin x$ results?",
      choices: [
        { text: "$2\\sin^2 x + \\sin x - 1 = 0$", explain: "The signs matter here: $2(1 - \\sin^2 x) = -2\\sin^2 x + 2$, so after multiplying by $-1$ the middle term is $-\\sin x$." },
        { text: "$2\\sin^2 x - \\sin x - 1 = 0$", correct: true, explain: "Substitute: $2(1 - \\sin^2 x) + \\sin x - 1 = -2\\sin^2 x + \\sin x + 1$. Multiply by $-1$ to get this." },
        { text: "$-2\\sin^2 x + \\sin x - 1 = 0$", explain: "Combine constants: $2 - 1 = +1$, so before scaling it is $-2\\sin^2 x + \\sin x + 1$." },
        { text: "$2\\cos^2 x - \\sin x - 1 = 0$", explain: "The aim is to remove $\\cos^2 x$ using $1 - \\sin^2 x$ so only $\\sin x$ remains." },
      ],
    },
    {
      id: "s-reduce-solve",
      prompt: "Continuing, $2\\sin^2 x - \\sin x - 1 = 0$ factors as $(2\\sin x + 1)(\\sin x - 1) = 0$. Solve on $[0, 2\\pi)$.",
      choices: [
        { text: "$x = \\dfrac{\\pi}{6}, \\dfrac{5\\pi}{6}, \\dfrac{\\pi}{2}$", explain: "Sign slip: $\\sin x = -\\tfrac12$ is negative, so it gives $\\tfrac{7\\pi}{6}, \\tfrac{11\\pi}{6}$, not $\\tfrac{\\pi}{6}, \\tfrac{5\\pi}{6}$." },
        { text: "$x = \\dfrac{7\\pi}{6}, \\dfrac{11\\pi}{6}$", explain: "You dropped $\\sin x = 1$, which adds $x = \\tfrac{\\pi}{2}$." },
        { text: "$x = \\dfrac{\\pi}{2}, \\dfrac{3\\pi}{2}, \\dfrac{7\\pi}{6}, \\dfrac{11\\pi}{6}$", explain: "$\\sin x = 1$ gives only $\\tfrac{\\pi}{2}$. $\\tfrac{3\\pi}{2}$ has $\\sin x = -1$." },
        { text: "$x = \\dfrac{\\pi}{2}, \\dfrac{7\\pi}{6}, \\dfrac{11\\pi}{6}$", correct: true, explain: "$\\sin x = 1$ gives $\\tfrac{\\pi}{2}$, and $\\sin x = -\\tfrac12$ gives $\\tfrac{7\\pi}{6}, \\tfrac{11\\pi}{6}$." },
      ],
    },
    {
      id: "s-extraneous",
      prompt: "Solving $\\sin x = \\cos x - 1$ by squaring produces the candidates $x = 0, \\dfrac{\\pi}{2}, \\dfrac{3\\pi}{2}$. Which are the actual solutions on $[0, 2\\pi)$?",
      choices: [
        { text: "$x = 0, \\dfrac{3\\pi}{2}$", correct: true, explain: "Check each in the original: $x = \\tfrac{\\pi}{2}$ gives $1 \\ne -1$, so it is extraneous. Both $0$ and $\\tfrac{3\\pi}{2}$ satisfy it." },
        { text: "$x = 0, \\dfrac{\\pi}{2}, \\dfrac{3\\pi}{2}$", explain: "Squaring can add false roots. $x = \\tfrac{\\pi}{2}$ fails the original ($1 \\ne -1$) and must be discarded." },
        { text: "$x = \\dfrac{\\pi}{2}, \\dfrac{3\\pi}{2}$", explain: "$x = \\tfrac{\\pi}{2}$ is the extraneous root, and $x = 0$ is a genuine solution you should keep." },
        { text: "$x = 0, \\dfrac{\\pi}{2}$", explain: "$x = \\tfrac{\\pi}{2}$ is the extraneous one. The true second solution is $\\tfrac{3\\pi}{2}$." },
      ],
    },
    {
      id: "s-cos2x-neg1",
      prompt: "How many solutions does $\\cos 2x = -1$ have on $[0, 2\\pi)$?",
      choices: [
        { text: "four", explain: "The extreme value $-1$ is reached only once per turn, so two turns give two, not four." },
        { text: "one, at $x = \\dfrac{\\pi}{2}$", explain: "There are two turns of $2x$: both $2x = \\pi$ and $2x = 3\\pi$ count." },
        { text: "two, at $x = \\dfrac{\\pi}{2}, \\dfrac{3\\pi}{2}$", correct: true, explain: "With $2x \\in [0, 4\\pi)$, $\\cos = -1$ at $2x = \\pi, 3\\pi$. Halve to get $\\tfrac{\\pi}{2}, \\tfrac{3\\pi}{2}$." },
        { text: "none", explain: "Cosine does reach $-1$, at $2x = \\pi$ and $2x = 3\\pi$." },
      ],
    },
    {
      id: "s-cos2x-root2",
      prompt: "Solve $\\cos 2x = \\dfrac{\\sqrt{2}}{2}$ on $[0, 2\\pi)$.",
      choices: [
        { text: "$x = \\dfrac{\\pi}{8}, \\dfrac{7\\pi}{8}$", explain: "Only one turn. Over $2x \\in [0, 4\\pi)$ you also get $\\tfrac{9\\pi}{4}, \\tfrac{15\\pi}{4}$, i.e. two more $x$-values." },
        { text: "$x = \\dfrac{\\pi}{8}, \\dfrac{7\\pi}{8}, \\dfrac{9\\pi}{8}, \\dfrac{15\\pi}{8}$", correct: true, explain: "With $2x \\in [0, 4\\pi)$, $2x = \\tfrac{\\pi}{4}, \\tfrac{7\\pi}{4}, \\tfrac{9\\pi}{4}, \\tfrac{15\\pi}{4}$. Halve each." },
        { text: "$x = \\dfrac{\\pi}{4}, \\dfrac{7\\pi}{4}, \\dfrac{9\\pi}{4}, \\dfrac{15\\pi}{4}$", explain: "These are the values of $2x$. Divide each by $2$ to get $x$." },
        { text: "$x = \\dfrac{\\pi}{4}, \\dfrac{7\\pi}{4}$", explain: "This solves $\\cos x = \\tfrac{\\sqrt{2}}{2}$, ignoring the doubled angle. Work over $2x \\in [0, 4\\pi)$, then halve." },
      ],
    },
    {
      id: "s-most",
      prompt: "On $[0, 2\\pi)$, which equation has the **most** solutions?",
      choices: [
        { text: "$\\sin 2x = \\tfrac12$", explain: "The doubled angle gives $4$ solutions, fewer than the six from $\\sin 3x = \\tfrac12$." },
        { text: "$\\sin x = \\tfrac12$", explain: "A single angle gives just $2$ solutions." },
        { text: "$\\sin x = 1$", explain: "An extreme value gives only $1$ solution." },
        { text: "$\\sin 3x = \\tfrac12$", correct: true, explain: "The tripled angle sweeps three turns, so $2 \\times 3 = 6$ solutions, the most here." },
      ],
    },
    {
      id: "s-convert",
      prompt: "Why can you not directly factor $\\cos^2 x + \\sin x = 1$ as written?",
      choices: [
        { text: "it mixes $\\cos^2 x$ and $\\sin x$, so use $\\cos^2 x = 1 - \\sin^2 x$ to reach a single function first", correct: true, explain: "Factoring a quadratic needs one function. Converting gives $\\sin x - \\sin^2 x = 0$, i.e. $\\sin x\\,(1 - \\sin x) = 0$." },
        { text: "it cannot be solved at all", explain: "It is solvable. First convert $\\cos^2 x$ to $1 - \\sin^2 x$ so a single function remains." },
        { text: "you must square both sides first", explain: "No squaring is needed. A Pythagorean identity reduces it to one function." },
        { text: "sine and cosine can never appear together", explain: "They often do. The fix is an identity to reduce to one function, not a ban on mixing." },
      ],
    },
    {
      id: "s-sin2x-zero",
      prompt: "Solve $\\sin 2x = 0$ on $[0, 2\\pi)$.",
      choices: [
        { text: "$x = 0, \\pi$", explain: "That solves $\\sin x = 0$. With the doubled angle over two turns you also get $\\tfrac{\\pi}{2}$ and $\\tfrac{3\\pi}{2}$." },
        { text: "$x = 0, \\dfrac{\\pi}{2}, \\pi, \\dfrac{3\\pi}{2}, 2\\pi$", explain: "The interval $[0, 2\\pi)$ excludes $2\\pi$, where $2x = 4\\pi$ falls outside $[0, 4\\pi)$." },
        { text: "$x = 0, \\dfrac{\\pi}{2}, \\pi, \\dfrac{3\\pi}{2}$", correct: true, explain: "With $2x \\in [0, 4\\pi)$, $\\sin 2x = 0$ at $2x = 0, \\pi, 2\\pi, 3\\pi$. Halve to get these four." },
        { text: "$x = \\dfrac{\\pi}{2}, \\dfrac{3\\pi}{2}$", explain: "You missed $2x = 0$ and $2x = 2\\pi$, which give $x = 0$ and $x = \\pi$." },
      ],
    },
    {
      id: "s-divide-cos",
      prompt: "Solve $2\\sin x \\cos x = \\cos x$ on $[0, 2\\pi)$.",
      choices: [
        { text: "$x = \\dfrac{\\pi}{6}, \\dfrac{5\\pi}{6}$", explain: "Dividing by $\\cos x$ dropped the $\\cos x = 0$ case. Factor instead to keep $\\tfrac{\\pi}{2}, \\tfrac{3\\pi}{2}$." },
        { text: "$x = \\dfrac{\\pi}{6}, \\dfrac{\\pi}{2}, \\dfrac{5\\pi}{6}, \\dfrac{3\\pi}{2}$", correct: true, explain: "Factor $\\cos x\\,(2\\sin x - 1) = 0$: $\\cos x = 0$ gives $\\tfrac{\\pi}{2}, \\tfrac{3\\pi}{2}$, and $\\sin x = \\tfrac12$ gives $\\tfrac{\\pi}{6}, \\tfrac{5\\pi}{6}$." },
        { text: "$x = \\dfrac{\\pi}{2}, \\dfrac{3\\pi}{2}$", explain: "You kept $\\cos x = 0$ but dropped $\\sin x = \\tfrac12$, which adds $\\tfrac{\\pi}{6}, \\tfrac{5\\pi}{6}$." },
        { text: "$x = \\dfrac{\\pi}{3}, \\dfrac{\\pi}{2}, \\dfrac{2\\pi}{3}, \\dfrac{3\\pi}{2}$", explain: "$\\sin x = \\tfrac12$ gives $\\tfrac{\\pi}{6}, \\tfrac{5\\pi}{6}$, not $\\tfrac{\\pi}{3}, \\tfrac{2\\pi}{3}$ (those solve $\\sin x = \\tfrac{\\sqrt{3}}{2}$)." },
      ],
    },
  ],
};
