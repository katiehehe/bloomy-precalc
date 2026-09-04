import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for mathematical induction. Grounded in
 * the lesson: to prove P(n) for all integers n >= 1 you need a base case (show
 * P(1)) and an inductive step (assume the inductive hypothesis P(k), then prove
 * P(k+1)). The running example is S(n): 1 + 2 + ... + n = n(n+1)/2, with
 * S(1)=1, S(2)=3, S(3)=6, S(4)=10, S(5)=15. Distractors are the standard traps:
 * checking finitely many cases, assuming P(k+1) (assuming the conclusion), an
 * off-by-one P(k+1), proving only the base case or only the step, and forgetting
 * the hypothesis. Every computation below is verified by hand.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-two-parts",
      prompt: "A proof by mathematical induction requires which two parts?",
      choices: [
        { text: "a base case and an inductive step", correct: true, explain: "Exactly: prove $P(1)$, then prove $P(k) \\Rightarrow P(k+1)$." },
        { text: "a base case and a conclusion, with no step", explain: "Without the step nothing passes the truth from one value to the next." },
        { text: "two separate base cases", explain: "One base case is enough. The work of reaching every $n$ is done by the step." },
        { text: "an inductive step alone", explain: "A step with no true starting value proves nothing (think $n = n+1$)." },
      ],
    },
    {
      id: "c-base-is-p1",
      prompt: "To prove a statement $P(n)$ for all integers $n \\ge 1$, the base case is:",
      choices: [
        { text: "proving $P(k+1)$", explain: "That is the target of the inductive step, not the base case." },
        { text: "assuming $P(k)$", explain: "That is the inductive hypothesis inside the step, not the base case." },
        { text: "proving $P(1)$ is true", correct: true, explain: "The base case anchors the chain at the first value, $n = 1$." },
        { text: "checking $P(100)$", explain: "One large case is still just one case. The base case is the first value, $P(1)$." },
      ],
    },
    {
      id: "c-domino-base",
      prompt: "In the falling-dominoes metaphor, the base case corresponds to:",
      choices: [
        { text: "a domino somewhere in the middle falling", explain: "The base case is specifically the very first domino, not a middle one." },
        { text: "the first domino being knocked over", correct: true, explain: "Tipping the first domino is exactly showing $P(1)$." },
        { text: "every domino falling at once", explain: "That is the conclusion, reached only after both parts are proved." },
        { text: "gluing the dominoes together", explain: "Nothing is glued. The step is what makes each one knock the next." },
      ],
    },
    {
      id: "c-step-meaning",
      prompt: "The inductive step requires you to show:",
      choices: [
        { text: "if $P(k)$ is true, then $P(k+1)$ is true", correct: true, explain: "The step is the implication linking $k$ to $k+1$." },
        { text: "$P(1)$ is true", explain: "That is the base case, a separate part." },
        { text: "$P(k)$ is true for one specific number $k$", explain: "You do not prove $P(k)$ outright. You assume it and derive $P(k+1)$." },
        { text: "$P(n)$ fails for some $n$", explain: "Induction proves a statement, it does not look for a counterexample." },
      ],
    },
    {
      id: "c-hypothesis",
      prompt: "The inductive hypothesis is:",
      choices: [
        { text: "the thing you must prove, $P(k+1)$", explain: "That is the goal of the step, not the assumption." },
        { text: "the base case $P(1)$", explain: "The base case is proved separately. The hypothesis is the assumption about $k$." },
        { text: "the claim for all $n$ at once", explain: "Assuming the whole claim would be circular. You assume it only at $k$." },
        { text: "the assumption that $P(k)$ is true", correct: true, explain: "The inductive hypothesis is $P(k)$, assumed so you can reach $P(k+1)$." },
      ],
    },
    {
      id: "c-step-goal",
      prompt: "During the inductive step, your goal is to prove:",
      choices: [
        { text: "$P(k+1)$", correct: true, explain: "Assuming $P(k)$, you must establish the next case, $P(k+1)$." },
        { text: "$P(k)$", explain: "$P(k)$ is assumed, not proved, inside the step." },
        { text: "$P(1)$", explain: "$P(1)$ is the base case, handled separately." },
        { text: "$P(0)$", explain: "The statement starts at $n = 1$, so $P(0)$ is not part of it." },
      ],
    },
    {
      id: "c-lhs-base",
      prompt: "For $P(n): 1 + 2 + \\cdots + n = \\dfrac{n(n+1)}{2}$, the left-hand side at the base case $n = 1$ is:",
      choices: [
        { text: "$0$", explain: "The sum is not empty at $n = 1$. It has the single term $1$." },
        { text: "$2$", explain: "That would be $1 + 1$. At $n = 1$ there is only one term." },
        { text: "$1$", correct: true, explain: "At $n = 1$ the sum $1 + \\cdots + n$ stops at one term, so it is $1$." },
        { text: "$\\dfrac{1}{2}$", explain: "That is the formula mis-evaluated. The left side is the sum, which is $1$." },
      ],
    },
    {
      id: "c-rhs-base",
      prompt: "The right-hand side $\\dfrac{n(n+1)}{2}$ at $n = 1$ equals:",
      choices: [
        { text: "$2$", explain: "That is the numerator $1 \\cdot 2$ before dividing by $2$." },
        { text: "$1$", correct: true, explain: "$\\dfrac{1(1+1)}{2} = \\dfrac{2}{2} = 1$, matching the left side." },
        { text: "$\\dfrac{1}{2}$", explain: "You must include the factor $(n+1) = 2$: $\\dfrac{1 \\cdot 2}{2} = 1$." },
        { text: "$0$", explain: "Substituting $n = 1$ gives $\\dfrac{2}{2} = 1$, not $0$." },
      ],
    },
    {
      id: "c-combine",
      prompt: "Simplify $\\dfrac{k(k+1)}{2} + (k+1)$ (add the next term to the hypothesis):",
      choices: [
        { text: "$\\dfrac{(k+1)(k+2)}{2}$", correct: true, explain: "Factor $(k+1)$: $(k+1)\\left(\\dfrac{k}{2}+1\\right) = \\dfrac{(k+1)(k+2)}{2}$." },
        { text: "$\\dfrac{k(k+1)}{2}$", explain: "That drops the added term $(k+1)$ entirely." },
        { text: "$\\dfrac{(k+1)(k+1)}{2}$", explain: "Combining $\\dfrac{k}{2}+1 = \\dfrac{k+2}{2}$, not $\\dfrac{k+1}{2}$." },
        { text: "$k + 1$", explain: "The first term does not cancel. Factoring leaves a quotient by $2$." },
      ],
    },
    {
      id: "c-write-pk1",
      prompt: "For $P(n): 1 + \\cdots + n = \\dfrac{n(n+1)}{2}$, the statement $P(k+1)$ says the sum equals:",
      choices: [
        { text: "$\\dfrac{(k+1)(k+1)}{2}$", explain: "Off by one: substituting $n = k+1$ gives $(k+1)(k+2)$, not $(k+1)(k+1)$." },
        { text: "$\\dfrac{k(k+1)}{2}$", explain: "That is $P(k)$, the previous case." },
        { text: "$\\dfrac{(k+2)(k+3)}{2}$", explain: "That is $P(k+2)$. You jumped two steps ahead." },
        { text: "$\\dfrac{(k+1)(k+2)}{2}$", correct: true, explain: "Substitute $n = k+1$ into $\\dfrac{n(n+1)}{2}$ to get $\\dfrac{(k+1)(k+2)}{2}$." },
      ],
    },
    {
      id: "c-finite-checks",
      prompt: "A student checks the formula for $n = 1, 2, 3, 4, 5$ and it works each time. Has the student proved it for all $n$?",
      choices: [
        { text: "Yes, five cases is plenty", explain: "Finitely many successes leave infinitely many values unchecked." },
        { text: "No: checking finitely many cases is not a proof for all $n$", correct: true, explain: "You must prove the general step $P(k) \\Rightarrow P(k+1)$ to cover every $n$." },
        { text: "Yes, because the pattern is obvious", explain: "An apparent pattern can still fail later. Only the step guarantees all $n$." },
        { text: "Only if the fifth case works", explain: "No finite last case finishes the job. The step is what generalizes." },
      ],
    },
    {
      id: "c-assume-conclusion",
      prompt: "In the inductive step, are you allowed to assume $P(k+1)$, the very thing you want to prove?",
      choices: [
        { text: "Yes, that is the point of induction", explain: "Assuming the conclusion is circular reasoning, not induction." },
        { text: "Yes, if $k$ is large", explain: "Size does not matter. You may only assume $P(k)$, never $P(k+1)$." },
        { text: "No: assuming $P(k+1)$ is assuming what you must prove", correct: true, explain: "You assume $P(k)$ and derive $P(k+1)$. Assuming $P(k+1)$ proves nothing." },
        { text: "Only in the base case", explain: "The base case proves $P(1)$ directly. It assumes nothing." },
      ],
    },
    {
      id: "c-base-only",
      prompt: "You correctly prove the base case $P(1)$ but never prove the inductive step. Is $P(n)$ established for all $n \\ge 1$?",
      choices: [
        { text: "No: nothing passes the truth from each value to the next", correct: true, explain: "The base case starts the chain, but only the step propagates it." },
        { text: "Yes, the base case is enough", explain: "One true case cannot reach the infinitely many others." },
        { text: "Yes, for all even $n$", explain: "The base case says nothing about $n = 2, 4, \\ldots$ without the step." },
        { text: "Yes, automatically for all $n$", explain: "Automatic propagation is exactly what the missing step would provide." },
      ],
    },
    {
      id: "c-step-only",
      prompt: "You prove the inductive step $P(k) \\Rightarrow P(k+1)$ but never check any base case. Is $P(n)$ established?",
      choices: [
        { text: "Yes, the step alone is enough", explain: "An implication with no true starting value never fires." },
        { text: "Yes, for all $n \\ge 2$", explain: "Without a true $P(1)$ (or some true start) nothing reaches $n = 2$ either." },
        { text: "Yes, because the implication is true", explain: "A true implication still needs a true premise to conclude anything." },
        { text: "No: with no true starting value, the chain never begins", correct: true, explain: "The step needs a base case to launch, as $n = n+1$ shows." },
      ],
    },
    {
      id: "c-scope",
      prompt: "When both the base case and the inductive step are proved, you may conclude $P(n)$ holds for:",
      choices: [
        { text: "only $n = 1$", explain: "That is just the base case. The step extends it to every later $n$." },
        { text: "all integers $n \\ge 1$", correct: true, explain: "Base case plus step force $P(n)$ for every integer from $1$ upward." },
        { text: "only the values you checked", explain: "The step covers all $n$, not just checked ones." },
        { text: "all real numbers $n$", explain: "Induction covers the integers $n \\ge 1$, not the reals in between." },
      ],
    },
  ],
  summit: [
    {
      id: "s-state-hyp",
      prompt: "For the proof of $1 + 2 + \\cdots + n = \\dfrac{n(n+1)}{2}$, which is the correct inductive hypothesis?",
      choices: [
        { text: "Assume $1 + 2 + \\cdots + k = \\dfrac{k(k+1)}{2}$", correct: true, explain: "The hypothesis is the statement at $k$, namely $P(k)$." },
        { text: "Assume $1 + 2 + \\cdots + (k+1) = \\dfrac{(k+1)(k+2)}{2}$", explain: "That is $P(k+1)$, the goal, not the assumption." },
        { text: "Assume the formula holds for all $n$", explain: "Assuming everything at once is circular. Assume it only at $k$." },
        { text: "Assume $\\dfrac{k(k+1)}{2} = 0$", explain: "That is a false side condition, not the statement $P(k)$." },
      ],
    },
    {
      id: "s-added-term",
      prompt: "In the inductive step for that sum, what do you add to $\\dfrac{k(k+1)}{2}$ to build the sum for $k+1$?",
      choices: [
        { text: "$k$", explain: "The last term already included is $k$. The new one is the next integer." },
        { text: "$\\dfrac{k+1}{2}$", explain: "You add the whole new term $(k+1)$, not half of it." },
        { text: "$(k+1)$", correct: true, explain: "The sum to $k+1$ is the sum to $k$ plus the new term $(k+1)$." },
        { text: "$(k+2)$", explain: "That skips a term. The next integer after $k$ is $k+1$." },
      ],
    },
    {
      id: "s-goal-eq",
      prompt: "Which equation correctly states the goal $P(k+1)$ for this sum?",
      choices: [
        { text: "$1 + 2 + \\cdots + k = \\dfrac{k(k+1)}{2}$", explain: "That is $P(k)$, the hypothesis, not the goal." },
        { text: "$1 + 2 + \\cdots + (k+1) = \\dfrac{(k+1)(k+2)}{2}$", correct: true, explain: "Substituting $n = k+1$ into $\\dfrac{n(n+1)}{2}$ gives $\\dfrac{(k+1)(k+2)}{2}$." },
        { text: "$1 + 2 + \\cdots + (k+1) = \\dfrac{(k+1)(k+1)}{2}$", explain: "Off by one on the right: it should be $(k+1)(k+2)$." },
        { text: "$1 + 2 + \\cdots + (k+1) = \\dfrac{k(k+1)}{2} + k$", explain: "The added term is $(k+1)$, not $k$, and the target is a closed form." },
      ],
    },
    {
      id: "s-offbyone",
      prompt: "A student writes $P(k+1)$ as $\\dfrac{(k+1)(k+1)}{2}$. What went wrong?",
      choices: [
        { text: "Nothing, it is correct", explain: "It is not: $\\dfrac{n(n+1)}{2}$ at $n = k+1$ is $\\dfrac{(k+1)(k+2)}{2}$." },
        { text: "They should divide by $3$", explain: "The denominator stays $2$. The error is in the numerator." },
        { text: "They forgot the base case", explain: "This is an algebra slip in $P(k+1)$, not a missing base case." },
        { text: "They substituted $n = k+1$ incorrectly. It should be $\\dfrac{(k+1)(k+2)}{2}$", correct: true, explain: "The factor $(n+1)$ becomes $(k+2)$, not $(k+1)$." },
      ],
    },
    {
      id: "s-odd-base",
      prompt: "Consider $P(n): 1 + 3 + 5 + \\cdots + (2n-1) = n^2$, the sum of the first $n$ odd numbers. What is the base case $P(1)$?",
      choices: [
        { text: "$1 = 1^2$, which is true", correct: true, explain: "At $n = 1$ the only term is $2(1)-1 = 1$, and $1^2 = 1$." },
        { text: "$1 + 3 = 2^2$", explain: "That is $P(2)$, not the base case." },
        { text: "$0 = 0^2$", explain: "The statement starts at $n = 1$, where the sum is $1$." },
        { text: "$3 = 1^2$", explain: "The first odd number is $1$, not $3$, and $1^2 = 1$." },
      ],
    },
    {
      id: "s-odd-hyp",
      prompt: "For that odd-number sum, the inductive hypothesis assumes:",
      choices: [
        { text: "$1 + 3 + \\cdots + (2k+1) = (k+1)^2$", explain: "That is $P(k+1)$, the goal, not the assumption." },
        { text: "$1 + 3 + \\cdots + (2k-1) = k$", explain: "The right side is $k^2$, not $k$." },
        { text: "$1 + 3 + \\cdots + (2k-1) = k^2$", correct: true, explain: "The hypothesis is $P(k)$: the sum of the first $k$ odds is $k^2$." },
        { text: "$2k - 1 = k^2$", explain: "That equates a single term with the whole sum. The hypothesis is about the sum." },
      ],
    },
    {
      id: "s-odd-step",
      prompt: "Continuing that proof, $k^2 + \\big(2(k+1) - 1\\big)$ simplifies to:",
      choices: [
        { text: "$k^2 + 1$", explain: "The new term is $2(k+1)-1 = 2k+1$, not $1$." },
        { text: "$(k+1)^2$", correct: true, explain: "$k^2 + (2k+1) = k^2 + 2k + 1 = (k+1)^2$, which is $P(k+1)$." },
        { text: "$2k^2$", explain: "You add $2k+1$ to $k^2$, giving $(k+1)^2$, not doubling $k^2$." },
        { text: "$k^2 + 2k$", explain: "Do not drop the $+1$: $2(k+1)-1 = 2k+1$, so the total is $(k+1)^2$." },
      ],
    },
    {
      id: "s-circular",
      prompt: "A proof assumes $P(k+1)$ is true and then derives $P(k+1)$ again. What is the flaw?",
      choices: [
        { text: "No flaw", explain: "Assuming the conclusion is a real flaw: it establishes nothing." },
        { text: "It used the wrong base case", explain: "The flaw is circular assumption, independent of any base case." },
        { text: "It divided by zero", explain: "No division is involved. The issue is assuming what must be proved." },
        { text: "It is circular: it assumes the conclusion instead of deriving it from $P(k)$", correct: true, explain: "A valid step assumes $P(k)$ and proves $P(k+1)$, never the reverse." },
      ],
    },
    {
      id: "s-nn1",
      prompt: "The false claim $P(n): n = n + 1$ satisfies the inductive step (assume $k = k+1$, add $1$ to get $k+1 = k+2$). Why is it not a valid theorem?",
      choices: [
        { text: "Its base case fails ($P(1)$ says $1 = 2$), and a step with no true base case proves nothing", correct: true, explain: "The step alone cannot launch. A true base case is required, and here it is false." },
        { text: "The step is actually invalid", explain: "The step really does hold. The missing piece is a true base case." },
        { text: "It is valid for large $n$", explain: "It is false for every $n$. No starting case is ever true." },
        { text: "It is true for all $n$", explain: "$n = n+1$ is never true. That is the whole point of the warning." },
      ],
    },
    {
      id: "s-2n-base",
      prompt: "For $P(n): 2^n \\ge n + 1$, which correctly checks the base case at $n = 1$?",
      choices: [
        { text: "$2^1 = 2 \\ge 3$, true", explain: "That is false, since $2 \\ge 3$ is not true. Also $n+1 = 2$, not $3$." },
        { text: "$2^0 = 1 \\ge 1$, so $n = 0$ is the base", explain: "The statement starts at $n = 1$, so the base case is $n = 1$." },
        { text: "$2^1 = 2 \\ge 1 + 1 = 2$, true", correct: true, explain: "At $n = 1$, $2^1 = 2$ and $n + 1 = 2$, and $2 \\ge 2$ holds." },
        { text: "$2^1 = 2 \\ge 2 + 1$, true", explain: "At $n = 1$, $n + 1 = 2$, not $3$. And $2 \\ge 3$ is false anyway." },
      ],
    },
    {
      id: "s-one-implication",
      prompt: "Proving only $P(1) \\Rightarrow P(2)$ (one specific case of the step) is not enough because:",
      choices: [
        { text: "$P(2)$ is false", explain: "Whether $P(2)$ holds is beside the point. One implication cannot reach all $n$." },
        { text: "the inductive step must hold for a general $k$, giving $P(k) \\Rightarrow P(k+1)$ for every $k$", correct: true, explain: "A single link does not chain forward. The step must work at every $k$." },
        { text: "you must instead prove $P(2) \\Rightarrow P(1)$", explain: "Induction moves forward, from $k$ to $k+1$, not backward." },
        { text: "one implication already proves all $n$", explain: "It does not. You need the general implication for arbitrary $k$." },
      ],
    },
    {
      id: "s-common-factor",
      prompt: "In the step for $1 + \\cdots + n = \\dfrac{n(n+1)}{2}$, factoring $\\dfrac{k(k+1)}{2} + (k+1)$ starts by pulling out the common factor:",
      choices: [
        { text: "$(k+1)$", correct: true, explain: "Both terms contain $(k+1)$, leaving $(k+1)\\left(\\dfrac{k}{2} + 1\\right)$." },
        { text: "$\\dfrac{1}{2}$ only", explain: "The shared factor that simplifies the expression is $(k+1)$, not just $\\dfrac{1}{2}$." },
        { text: "$k$", explain: "The second term $(k+1)$ has no factor of $k$. The common factor is $(k+1)$." },
        { text: "$(k+2)$", explain: "$(k+2)$ appears only after simplifying, not as the original common factor." },
      ],
    },
    {
      id: "s-inner-simplify",
      prompt: "Simplify the inner expression $\\dfrac{k}{2} + 1$ over a common denominator:",
      choices: [
        { text: "$\\dfrac{k+1}{2}$", explain: "You add $\\dfrac{2}{2}$, not $\\dfrac{1}{2}$: $\\dfrac{k}{2} + 1 = \\dfrac{k+2}{2}$." },
        { text: "$\\dfrac{k}{2}$", explain: "That drops the $+1$. Include it as $\\dfrac{2}{2}$." },
        { text: "$\\dfrac{k+2}{2}$", correct: true, explain: "$\\dfrac{k}{2} + 1 = \\dfrac{k}{2} + \\dfrac{2}{2} = \\dfrac{k+2}{2}$." },
        { text: "$\\dfrac{k+2}{1}$", explain: "The common denominator is $2$, so it stays $\\dfrac{k+2}{2}$." },
      ],
    },
    {
      id: "s-false-statement",
      prompt: "Which statement about induction is FALSE?",
      choices: [
        { text: "The base case anchors the chain at a starting value", explain: "True: the base case is where the chain begins." },
        { text: "The inductive hypothesis assumes $P(k)$", explain: "True: that assumption is exactly the inductive hypothesis." },
        { text: "Both the base case and the inductive step are required", explain: "True: dropping either one breaks the proof." },
        { text: "The inductive step by itself proves the statement for all $n$", correct: true, explain: "False: without a true base case, the step never launches (recall $n = n+1$)." },
      ],
    },
    {
      id: "s-outline",
      prompt: "Which is a complete, correctly structured induction proof outline for $P(n)$ over $n \\ge 1$?",
      choices: [
        { text: "Assume $P(k+1)$. Prove $P(1)$. Conclude for all $n$", explain: "You never assume $P(k+1)$. That assumes the conclusion." },
        { text: "Prove $P(1)$. Then assume $P(k)$ and prove $P(k+1)$. Conclude $P(n)$ for all $n \\ge 1$", correct: true, explain: "This is the standard structure: base case, then step, then conclusion." },
        { text: "Prove $P(1)$ and $P(2)$, then stop", explain: "Two cases still leave infinitely many unproved. You need the general step." },
        { text: "Assume $P(n)$ for all $n$. Then verify $P(1)$", explain: "Assuming the full claim is circular. Assume only $P(k)$ inside the step." },
      ],
    },
  ],
};
