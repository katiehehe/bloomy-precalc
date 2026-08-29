import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for infinite geometric series. Grounded
 * in the lesson: a_1 + a_1 r + a_1 r^2 + ... converges iff |r| < 1, and then
 * S = a_1 / (1 - r); if |r| >= 1 it diverges (no finite sum). Distractors are the
 * standard traps: using 1 + r instead of 1 - r, forgetting a_1 is the FIRST term,
 * thinking r = 1 (or r = -1) converges, ignoring the sign of a negative ratio,
 * and blindly plugging into the formula when |r| >= 1. Every sum is verified by
 * hand.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-define",
      prompt: "Which describes an infinite geometric series?",
      choices: [
        {
          text: "A never-ending sum where each term is the one before it times a fixed ratio $r$",
          correct: true,
          explain: "Geometric means a constant ratio between consecutive terms, continued without end.",
        },
        { text: "A sum of finitely many terms", explain: "That is a finite series. An infinite series never stops." },
        {
          text: "A sum where you add a fixed amount to each term",
          explain: "Adding a fixed amount is arithmetic. Geometric multiplies by a fixed ratio $r$.",
        },
        {
          text: "A sum with no relationship between the terms",
          explain: "A geometric series has a strict rule: multiply by $r$ to get the next term.",
        },
      ],
    },
    {
      id: "c-ratio",
      prompt: "For $4 + 2 + 1 + \\tfrac{1}{2} + \\cdots$, what is the common ratio $r$?",
      choices: [
        { text: "$2$", explain: "That divides the wrong way. $r$ is a term over the previous one, $\\tfrac{2}{4} = \\tfrac{1}{2}$." },
        { text: "$\\tfrac{1}{2}$", correct: true, explain: "$r = \\tfrac{2}{4} = \\tfrac{1}{2}$. Each term is half the one before." },
        { text: "$-2$", explain: "All terms are positive, so $r$ is positive. $r = \\tfrac{1}{2}$." },
        { text: "$\\tfrac{1}{4}$", explain: "That is the third term over the first. Use consecutive terms, $\\tfrac{2}{4} = \\tfrac{1}{2}$." },
      ],
    },
    {
      id: "c-condition",
      prompt: "An infinite geometric series converges (has a finite sum) exactly when:",
      choices: [
        { text: "$|r| > 1$", explain: "That makes the terms grow, so the partial sums run off. It diverges." },
        { text: "$a_1 < 1$", explain: "The first term does not decide convergence. The ratio does." },
        { text: "$|r| < 1$", correct: true, explain: "When $|r| < 1$ the terms shrink toward zero, so the partial sums settle." },
        { text: "$r < 1$", explain: "This wrongly allows $r = -2$ (where $r < 1$ but $|r| = 2$), which diverges. You need $|r| < 1$." },
      ],
    },
    {
      id: "c-pick-converge",
      prompt: "Which common ratio gives a convergent infinite geometric series?",
      choices: [
        { text: "$r = 1$", explain: "$|r| = 1$ is not less than $1$. The terms never shrink, so it diverges." },
        { text: "$r = 2$", explain: "$|r| = 2 \\ge 1$. The terms grow and the series diverges." },
        { text: "$r = -3$", explain: "$|r| = 3 \\ge 1$. A large negative ratio still diverges." },
        {
          text: "$r = -\\tfrac{1}{2}$",
          correct: true,
          explain: "$\\left|-\\tfrac{1}{2}\\right| = \\tfrac{1}{2} < 1$, so it converges even though $r$ is negative.",
        },
      ],
    },
    {
      id: "c-sum-half",
      prompt: "Find the sum: $1 + \\tfrac{1}{2} + \\tfrac{1}{4} + \\tfrac{1}{8} + \\cdots$",
      choices: [
        { text: "$2$", correct: true, explain: "$S = \\dfrac{1}{1 - \\tfrac{1}{2}} = \\dfrac{1}{\\,1/2\\,} = 2$." },
        { text: "$1$", explain: "That is only the first term. The whole sum is $\\dfrac{1}{1 - 1/2} = 2$." },
        { text: "$\\tfrac{1}{2}$", explain: "That is the ratio, not the sum. $S = 2$." },
        { text: "There is no finite sum", explain: "$|r| = \\tfrac{1}{2} < 1$, so it converges, to $2$." },
      ],
    },
    {
      id: "c-sum-6",
      prompt: "Find the sum: $6 + 3 + \\tfrac{3}{2} + \\cdots$ (so $a_1 = 6$, $r = \\tfrac{1}{2}$).",
      choices: [
        { text: "$4$", explain: "That used $1 + r$ in the denominator. The formula is $\\dfrac{a_1}{1 - r} = \\dfrac{6}{\\,1/2\\,} = 12$." },
        { text: "$12$", correct: true, explain: "$S = \\dfrac{6}{1 - \\tfrac{1}{2}} = \\dfrac{6}{\\,1/2\\,} = 12$." },
        { text: "$6$", explain: "That is just $a_1$. Keep adding the rest, giving $12$." },
        { text: "There is no finite sum", explain: "$|r| = \\tfrac{1}{2} < 1$, so it converges, to $12$." },
      ],
    },
    {
      id: "c-identify",
      prompt: "For $3 + 1 + \\tfrac{1}{3} + \\tfrac{1}{9} + \\cdots$, identify $a_1$ and $r$.",
      choices: [
        { text: "$a_1 = 1,\\ r = \\tfrac{1}{3}$", explain: "$a_1$ is the FIRST term, which is $3$, not the second term $1$." },
        { text: "$a_1 = 3,\\ r = 3$", explain: "The terms are shrinking, so $r < 1$. Here $r = \\tfrac{1}{3}$, not $3$." },
        { text: "$a_1 = 3,\\ r = \\tfrac{1}{3}$", correct: true, explain: "First term $3$. Each term is $\\tfrac{1}{3}$ of the previous one." },
        { text: "$a_1 = \\tfrac{1}{3},\\ r = 3$", explain: "Both are off: the first term is $3$ and the ratio is $\\tfrac{1}{3}$." },
      ],
    },
    {
      id: "c-apply",
      prompt: "Compute the sum of $3 + 1 + \\tfrac{1}{3} + \\cdots$ using $S = \\dfrac{a_1}{1 - r}$.",
      choices: [
        { text: "$3$", explain: "That is only $a_1$. The full sum is $\\dfrac{3}{1 - 1/3} = \\tfrac{9}{2}$." },
        { text: "$\\tfrac{9}{4}$", explain: "That used $1 + r$. The denominator is $1 - r = \\tfrac{2}{3}$, giving $\\tfrac{9}{2}$." },
        { text: "It diverges", explain: "$|r| = \\tfrac{1}{3} < 1$, so it converges." },
        { text: "$\\tfrac{9}{2}$", correct: true, explain: "$S = \\dfrac{3}{1 - \\tfrac{1}{3}} = \\dfrac{3}{\\,2/3\\,} = \\tfrac{9}{2} = 4.5$." },
      ],
    },
    {
      id: "c-alternating",
      prompt: "Compute $1 - \\tfrac{1}{2} + \\tfrac{1}{4} - \\tfrac{1}{8} + \\cdots$ (so $a_1 = 1$, $r = -\\tfrac{1}{2}$).",
      choices: [
        { text: "$\\tfrac{2}{3}$", correct: true, explain: "$S = \\dfrac{1}{1 - (-\\tfrac{1}{2})} = \\dfrac{1}{\\,3/2\\,} = \\tfrac{2}{3}$." },
        { text: "$2$", explain: "That used $r = +\\tfrac{1}{2}$. Here $r = -\\tfrac{1}{2}$, so $1 - r = \\tfrac{3}{2}$ and $S = \\tfrac{2}{3}$." },
        { text: "$-2$", explain: "The sum is positive. Subtracting a negative gives $1 - (-\\tfrac{1}{2}) = \\tfrac{3}{2}$, so $S = \\tfrac{2}{3}$." },
        { text: "$1$", explain: "That is just the first term. The alternating tail pulls the sum down to $\\tfrac{2}{3}$." },
      ],
    },
    {
      id: "c-diverge-grow",
      prompt: "Does $2 + 4 + 8 + 16 + \\cdots$ converge?",
      choices: [
        { text: "Yes: $S = \\dfrac{2}{1 - 2} = -2$", explain: "The formula needs $|r| < 1$. Here $|r| = 2$, so this negative result is meaningless." },
        {
          text: "No: $|r| = 2 \\ge 1$, so it diverges (no finite sum)",
          correct: true,
          explain: "The terms grow, the partial sums run off, and there is no sum.",
        },
        { text: "Yes: $S = 2$", explain: "The sum is not just the first term, and this series has no sum at all." },
        { text: "Yes: $S = 0$", explain: "A sum of positive, growing terms cannot be $0$. The series diverges." },
      ],
    },
    {
      id: "c-diverge-one",
      prompt: "Does $5 + 5 + 5 + 5 + \\cdots$ converge? (Here $r = 1$.)",
      choices: [
        { text: "Yes: $S = \\dfrac{5}{1 - 1}$", explain: "$1 - 1 = 0$, so this is division by zero. The formula does not apply and the series diverges." },
        { text: "Yes: $S = 5$", explain: "The partial sums are $5, 10, 15, \\ldots$. They never settle." },
        {
          text: "No: with $r = 1$ the terms never shrink, so the partial sums grow without bound",
          correct: true,
          explain: "$|r| = 1$ fails the $|r| < 1$ test, so the series diverges.",
        },
        { text: "Yes: $S = 0$", explain: "Adding positive terms cannot give $0$. It diverges." },
      ],
    },
    {
      id: "c-decimal",
      prompt: "The repeating decimal $0.4444\\ldots$ equals $\\tfrac{4}{10} + \\tfrac{4}{100} + \\tfrac{4}{1000} + \\cdots$. What is its value?",
      choices: [
        { text: "$\\tfrac{4}{10}$", explain: "That is only the first term. The whole sum is $\\tfrac{4}{9}$." },
        { text: "$\\tfrac{1}{4}$", explain: "$\\tfrac{1}{4} = 0.25$, not $0.4444\\ldots$. The value is $\\tfrac{4}{9}$." },
        { text: "$0.44$", explain: "That stops after two digits. The exact value is $\\tfrac{4}{9} = 0.4444\\ldots$." },
        {
          text: "$\\tfrac{4}{9}$",
          correct: true,
          explain: "$S = \\dfrac{4/10}{1 - 1/10} = \\dfrac{4/10}{9/10} = \\tfrac{4}{9}$.",
        },
      ],
    },
    {
      id: "c-formula",
      prompt: "For $a_1 + a_1 r + a_1 r^2 + \\cdots$ with $|r| < 1$, the sum is:",
      choices: [
        { text: "$\\dfrac{a_1}{1 - r}$", correct: true, explain: "This is the convergent geometric sum, valid when $|r| < 1$." },
        { text: "$\\dfrac{a_1}{1 + r}$", explain: "The denominator is $1 - r$, not $1 + r$. Watch the sign." },
        { text: "$\\dfrac{1 - r}{a_1}$", explain: "That is the reciprocal. The sum is $\\dfrac{a_1}{1 - r}$." },
        { text: "$a_1(1 - r)$", explain: "You divide by $1 - r$, not multiply by it." },
      ],
    },
    {
      id: "c-sum-thirds",
      prompt: "Compute $\\tfrac{1}{3} + \\tfrac{1}{9} + \\tfrac{1}{27} + \\cdots$ (so $a_1 = \\tfrac{1}{3}$, $r = \\tfrac{1}{3}$).",
      choices: [
        { text: "$\\tfrac{1}{3}$", explain: "That is just the first term. The total is $\\tfrac{1}{2}$." },
        { text: "$\\tfrac{1}{2}$", correct: true, explain: "$S = \\dfrac{1/3}{1 - 1/3} = \\dfrac{1/3}{2/3} = \\tfrac{1}{2}$." },
        { text: "$1$", explain: "Too big: the terms total $\\tfrac{1}{2}$, not $1$." },
        { text: "$\\tfrac{3}{2}$", explain: "That flips the fraction. $\\dfrac{1/3}{2/3} = \\tfrac{1}{2}$." },
      ],
    },
    {
      id: "c-sum-9",
      prompt: "Compute $9 + 3 + 1 + \\tfrac{1}{3} + \\cdots$ (so $a_1 = 9$, $r = \\tfrac{1}{3}$).",
      choices: [
        { text: "$9$", explain: "That is only $a_1$. The full sum is $\\tfrac{27}{2}$." },
        { text: "$\\tfrac{27}{4}$", explain: "That used $1 + r = \\tfrac{4}{3}$. The correct denominator is $1 - r = \\tfrac{2}{3}$, giving $\\tfrac{27}{2}$." },
        { text: "$\\tfrac{27}{2}$", correct: true, explain: "$S = \\dfrac{9}{1 - \\tfrac{1}{3}} = \\dfrac{9}{\\,2/3\\,} = \\tfrac{27}{2} = 13.5$." },
        { text: "It diverges", explain: "$|r| = \\tfrac{1}{3} < 1$, so it converges." },
      ],
    },
  ],
  summit: [
    {
      id: "s-sum-8",
      prompt: "Find the sum: $8 + 6 + \\tfrac{9}{2} + \\cdots$",
      choices: [
        {
          text: "$32$",
          correct: true,
          explain: "$r = \\tfrac{6}{8} = \\tfrac{3}{4}$, so $S = \\dfrac{8}{1 - \\tfrac{3}{4}} = \\dfrac{8}{\\,1/4\\,} = 32$.",
        },
        { text: "$\\tfrac{32}{7}$", explain: "That used $1 + r = \\tfrac{7}{4}$. The denominator is $1 - r = \\tfrac{1}{4}$, giving $32$." },
        { text: "$8$", explain: "That is only $a_1$. The terms keep adding up to $32$." },
        { text: "It diverges", explain: "$r = \\tfrac{3}{4}$ and $|r| < 1$, so it converges." },
      ],
    },
    {
      id: "s-alt-4",
      prompt: "Find the sum: $4 - 2 + 1 - \\tfrac{1}{2} + \\cdots$",
      choices: [
        { text: "$8$", explain: "That treated $r$ as $+\\tfrac{1}{2}$. Here $r = -\\tfrac{1}{2}$, so $1 - r = \\tfrac{3}{2}$ and $S = \\tfrac{8}{3}$." },
        { text: "$\\tfrac{8}{3}$", correct: true, explain: "$S = \\dfrac{4}{1 - (-\\tfrac{1}{2})} = \\dfrac{4}{\\,3/2\\,} = \\tfrac{8}{3}$." },
        { text: "$-8$", explain: "The sum is positive. $1 - (-\\tfrac{1}{2}) = \\tfrac{3}{2}$, so $S = \\tfrac{8}{3}$." },
        { text: "$4$", explain: "That is just the first term. The alternating tail leaves $\\tfrac{8}{3}$." },
      ],
    },
    {
      id: "s-which-diverges",
      prompt: "Which of these infinite geometric series diverges?",
      choices: [
        { text: "$1 + \\tfrac{1}{2} + \\tfrac{1}{4} + \\cdots$", explain: "$r = \\tfrac{1}{2}$, so $|r| < 1$: this converges." },
        { text: "$1 - \\tfrac{1}{2} + \\tfrac{1}{4} - \\cdots$", explain: "$r = -\\tfrac{1}{2}$, so $|r| < 1$: this converges." },
        {
          text: "$1 + \\tfrac{3}{2} + \\tfrac{9}{4} + \\cdots$",
          correct: true,
          explain: "$r = \\tfrac{3}{2}$, so $|r| \\ge 1$. The terms grow and it diverges.",
        },
        { text: "$3 + 1 + \\tfrac{1}{3} + \\cdots$", explain: "$r = \\tfrac{1}{3}$, so $|r| < 1$: this converges." },
      ],
    },
    {
      id: "s-range",
      prompt: "For what values of $r$ does $a_1 + a_1 r + a_1 r^2 + \\cdots$ have a finite sum?",
      choices: [
        { text: "$r > 1$", explain: "Those ratios make the terms grow. The series diverges." },
        { text: "$0 < r < 1$", explain: "Close, but this drops negative ratios. $r = -\\tfrac{1}{2}$ also converges." },
        { text: "all real $r$", explain: "Ratios with $|r| \\ge 1$ diverge, so not all $r$ work." },
        {
          text: "$-1 < r < 1$",
          correct: true,
          explain: "This is exactly $|r| < 1$: the terms shrink toward zero and the sum is finite.",
        },
      ],
    },
    {
      id: "s-sum-10",
      prompt: "Find the sum: $10 + 6 + \\tfrac{18}{5} + \\cdots$",
      choices: [
        {
          text: "$25$",
          correct: true,
          explain: "$r = \\tfrac{6}{10} = \\tfrac{3}{5}$, so $S = \\dfrac{10}{1 - \\tfrac{3}{5}} = \\dfrac{10}{\\,2/5\\,} = 25$.",
        },
        { text: "$\\tfrac{25}{4}$", explain: "That used $1 + r = \\tfrac{8}{5}$. The denominator is $1 - r = \\tfrac{2}{5}$, giving $25$." },
        { text: "$10$", explain: "That is only $a_1$. The sum is $25$." },
        { text: "It diverges", explain: "$r = \\tfrac{3}{5}$, so $|r| < 1$, and it converges." },
      ],
    },
    {
      id: "s-alt-thirds",
      prompt: "Find the sum: $1 - \\tfrac{1}{3} + \\tfrac{1}{9} - \\tfrac{1}{27} + \\cdots$",
      choices: [
        { text: "$\\tfrac{3}{2}$", explain: "That used $r = +\\tfrac{1}{3}$. Here $r = -\\tfrac{1}{3}$, so $1 - r = \\tfrac{4}{3}$ and $S = \\tfrac{3}{4}$." },
        { text: "$\\tfrac{3}{4}$", correct: true, explain: "$S = \\dfrac{1}{1 - (-\\tfrac{1}{3})} = \\dfrac{1}{\\,4/3\\,} = \\tfrac{3}{4}$." },
        { text: "$-\\tfrac{3}{2}$", explain: "The sum is positive. $1 - (-\\tfrac{1}{3}) = \\tfrac{4}{3}$, so $S = \\tfrac{3}{4}$." },
        { text: "$1$", explain: "That is just the first term. The alternating tail leaves $\\tfrac{3}{4}$." },
      ],
    },
    {
      id: "s-diverge-error",
      prompt: "A student writes $S = \\dfrac{1}{1 - 2} = -1$ for $1 + 2 + 4 + 8 + \\cdots$. What is the error?",
      choices: [
        { text: "They should have used $\\dfrac{a_1}{1 + r}$", explain: "The formula is $\\dfrac{a_1}{1 - r}$. The real problem is that it does not apply here at all." },
        { text: "They used the wrong $a_1$", explain: "$a_1 = 1$ is correct. The problem is that the series diverges." },
        {
          text: "The formula does not apply: $|r| = 2 \\ge 1$, so the series diverges and has no sum",
          correct: true,
          explain: "With $|r| \\ge 1$ the terms grow, so no finite sum exists. The negative result is meaningless.",
        },
        { text: "Nothing is wrong. The sum really is $-1$", explain: "A sum of positive terms cannot be negative. The series has no sum." },
      ],
    },
    {
      id: "s-decimal-27",
      prompt: "Write $0.2727\\ldots$ as a fraction. (It is $\\tfrac{27}{100} + \\tfrac{27}{10000} + \\cdots$.)",
      choices: [
        { text: "$\\tfrac{27}{100}$", explain: "That is only the first term. The full repeating value is $\\tfrac{3}{11}$." },
        { text: "$\\tfrac{27}{101}$", explain: "That used $1 + r = \\tfrac{101}{100}$. The denominator is $1 - r = \\tfrac{99}{100}$, giving $\\tfrac{27}{99} = \\tfrac{3}{11}$." },
        { text: "$\\tfrac{3}{10}$", explain: "$\\tfrac{3}{10} = 0.3$, not $0.2727\\ldots$. The value is $\\tfrac{3}{11}$." },
        {
          text: "$\\tfrac{3}{11}$",
          correct: true,
          explain: "$S = \\dfrac{27/100}{1 - 1/100} = \\dfrac{27/100}{99/100} = \\tfrac{27}{99} = \\tfrac{3}{11}$.",
        },
      ],
    },
    {
      id: "s-sum-100",
      prompt: "Find the sum: $100 + 10 + 1 + \\tfrac{1}{10} + \\cdots$",
      choices: [
        {
          text: "$\\tfrac{1000}{9}$",
          correct: true,
          explain: "$S = \\dfrac{100}{1 - \\tfrac{1}{10}} = \\dfrac{100}{\\,9/10\\,} = \\tfrac{1000}{9}$.",
        },
        { text: "$\\tfrac{1000}{11}$", explain: "That used $1 + r = \\tfrac{11}{10}$. The denominator is $1 - r = \\tfrac{9}{10}$, giving $\\tfrac{1000}{9}$." },
        { text: "$100$", explain: "That is only $a_1$. The sum is $\\tfrac{1000}{9} \\approx 111.1$." },
        { text: "It diverges", explain: "$r = \\tfrac{1}{10}$, so $|r| < 1$, and it converges." },
      ],
    },
    {
      id: "s-osc",
      prompt: "What happens with $1 - 1 + 1 - 1 + \\cdots$ (so $r = -1$)?",
      choices: [
        { text: "It converges to $\\tfrac{1}{2}$ by $\\dfrac{1}{1 - (-1)}$", explain: "The formula needs $|r| < 1$. Here $|r| = 1$, so it does not apply." },
        {
          text: "It diverges: the partial sums are $1, 0, 1, 0, \\ldots$ and never settle",
          correct: true,
          explain: "With $r = -1$ the partial sums oscillate forever, so there is no limit.",
        },
        { text: "It converges to $0$", explain: "The partial sums bounce between $1$ and $0$. They do not approach a single value." },
        { text: "It converges to $1$", explain: "The partial sums keep alternating and never settle on $1$, so it diverges." },
      ],
    },
    {
      id: "s-solve-r",
      prompt: "An infinite geometric series has $a_1 = 2$ and converges to $S = 8$. Find $r$.",
      choices: [
        { text: "$\\tfrac{1}{4}$", explain: "That is $1 - r$, not $r$. Solving $\\dfrac{2}{1 - r} = 8$ gives $r = \\tfrac{3}{4}$." },
        { text: "$4$", explain: "$|r| \\ge 1$ could not converge. Solve $\\dfrac{2}{1 - r} = 8$ to get $r = \\tfrac{3}{4}$." },
        {
          text: "$\\tfrac{3}{4}$",
          correct: true,
          explain: "$\\dfrac{2}{1 - r} = 8 \\Rightarrow 1 - r = \\tfrac{1}{4} \\Rightarrow r = \\tfrac{3}{4}$.",
        },
        { text: "$-\\tfrac{3}{4}$", explain: "That gives $S = \\dfrac{2}{1 + 3/4} = \\tfrac{8}{7}$, not $8$. The answer is $r = \\tfrac{3}{4}$." },
      ],
    },
    {
      id: "s-solve-a1",
      prompt: "An infinite geometric series has ratio $r = \\tfrac{1}{2}$ and sum $S = 6$. Find the first term $a_1$.",
      choices: [
        { text: "$12$", explain: "That multiplies by $\\dfrac{1}{1 - r} = 2$. Instead $a_1 = S(1 - r) = 6 \\cdot \\tfrac{1}{2} = 3$." },
        { text: "$6$", explain: "That is $S$ itself. Solve $6 = \\dfrac{a_1}{1 - 1/2}$ to get $a_1 = 3$." },
        { text: "$\\tfrac{1}{2}$", explain: "That is $r$, not $a_1$. Here $a_1 = 6 \\cdot \\tfrac{1}{2} = 3$." },
        {
          text: "$3$",
          correct: true,
          explain: "$S = \\dfrac{a_1}{1 - r} \\Rightarrow a_1 = S(1 - r) = 6 \\cdot \\tfrac{1}{2} = 3$.",
        },
      ],
    },
    {
      id: "s-sum-sixths",
      prompt: "Find the sum: $\\tfrac{1}{2} + \\tfrac{1}{6} + \\tfrac{1}{18} + \\cdots$",
      choices: [
        {
          text: "$\\tfrac{3}{4}$",
          correct: true,
          explain: "$r = \\dfrac{1/6}{1/2} = \\tfrac{1}{3}$, so $S = \\dfrac{1/2}{1 - 1/3} = \\dfrac{1/2}{2/3} = \\tfrac{3}{4}$.",
        },
        { text: "$\\tfrac{3}{8}$", explain: "That used $1 + r = \\tfrac{4}{3}$. The denominator is $1 - r = \\tfrac{2}{3}$, giving $\\tfrac{3}{4}$." },
        { text: "$\\tfrac{1}{2}$", explain: "That is only the first term. The sum is $\\tfrac{3}{4}$." },
        { text: "$1$", explain: "Too big: the terms total $\\tfrac{3}{4}$, not $1$." },
      ],
    },
    {
      id: "s-twice",
      prompt: "For which ratio does an infinite geometric series sum to exactly twice its first term?",
      choices: [
        { text: "$r = \\tfrac{1}{3}$", explain: "That gives $S = \\dfrac{a_1}{\\,2/3\\,} = \\tfrac{3}{2} a_1$, not $2 a_1$." },
        {
          text: "$r = \\tfrac{1}{2}$",
          correct: true,
          explain: "$\\dfrac{a_1}{1 - 1/2} = 2 a_1$, so the sum is twice the first term.",
        },
        { text: "$r = 2$", explain: "$|r| \\ge 1$ diverges, so there is no sum at all." },
        { text: "$r = \\tfrac{1}{4}$", explain: "That gives $S = \\dfrac{a_1}{\\,3/4\\,} = \\tfrac{4}{3} a_1$, not $2 a_1$." },
      ],
    },
    {
      id: "s-capstone",
      prompt: "Find the sum: $1 + \\tfrac{2}{3} + \\tfrac{4}{9} + \\tfrac{8}{27} + \\cdots$",
      choices: [
        { text: "$\\tfrac{3}{5}$", explain: "That used $1 + r = \\tfrac{5}{3}$. The denominator is $1 - r = \\tfrac{1}{3}$, giving $3$." },
        { text: "$1$", explain: "That is only the first term. The terms keep adding up to $3$." },
        {
          text: "$3$",
          correct: true,
          explain: "$r = \\tfrac{2}{3}$, so $S = \\dfrac{1}{1 - \\tfrac{2}{3}} = \\dfrac{1}{\\,1/3\\,} = 3$.",
        },
        { text: "It diverges", explain: "$r = \\tfrac{2}{3}$, so $|r| < 1$, and it converges." },
      ],
    },
  ],
};
