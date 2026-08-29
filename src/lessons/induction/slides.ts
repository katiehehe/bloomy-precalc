import type { ParamSpec, Slide } from "../types";

/**
 * Mathematical induction. Prove P(n) for all integers n >= 1 with two parts: a
 * base case (show P(1)) and an inductive step (if P(k) then P(k+1)). The running
 * example is S(n): 1 + 2 + ... + n = n(n+1)/2. Reveal flags are read literally in
 * Stage.tsx:
 *   principle:  firstfall, cascade
 *   base:       lhs, rhs, match
 *   step:       e1, e2, e3, e4
 *   bothneeded: caseA, caseB
 *   yourturn:   none (dominoes + dock follow the n slider)
 */

const nParam: ParamSpec = {
  key: "n",
  label: "upper value n",
  min: 1,
  max: 8,
  start: 2,
  step: 1,
  format: (v) => `n = ${Math.round(v)}`,
};

export const slides: Slide[] = [
  {
    id: "principle",
    title: "Induction is two dominoes' worth of promises",
    mode: "principle",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Some claims are meant to hold for every positive integer $n = 1, 2, 3, 4, \\ldots$, on and on with no last case. Call such a claim $P(n)$. Checking them one by one never finishes, so we need a method that captures all of them at once. That method is **mathematical induction**, and the picture to keep in mind is an endless line of dominoes, one domino for each value of $n$: domino $1$, domino $2$, domino $3$, and so on.",
      },
      {
        text: "Induction has exactly two jobs. The first is the **base case**: show the claim is true at the very first value, $P(1)$. In the domino picture this is like tipping the first domino over by hand. If the first one never falls, nothing downstream can fall either, so this part is not optional.",
        add: { firstfall: true },
        draw: true,
      },
      {
        text: "The second job is the **inductive step**: show that whenever the claim holds at some value $k$, it must also hold at the next value $k+1$. In symbols, if $P(k)$ is true then $P(k+1)$ is true. In the picture, this guarantees that each domino, as it falls, knocks over the one right after it. Put the two facts together and the whole line goes: the first falls, which knocks the second, which knocks the third, forever.",
        add: { cascade: true },
      },
      {
        text: "So a proof by induction is two promises: the first domino falls (the base case), and every domino knocks the next (the inductive step). Together they force $P(n)$ to be true for all integers $n \\ge 1$. Break either promise and the line can stay standing, which is why we always do both.",
      },
    ],
    practice:
      "A proof by induction has two parts: a base case (show $P(1)$) and an inductive step (show $P(k) \\Rightarrow P(k+1)$). Both are required.",
    questions: [
      {
        kind: "choice",
        prompt: "In the falling-dominoes picture, knocking over the first domino stands for which part of an induction proof?",
        options: [
          "the base case: showing $P(1)$ is true",
          "the inductive step: $P(k) \\Rightarrow P(k+1)$",
          "the conclusion, that $P(n)$ holds for all $n$",
          "the inductive hypothesis",
        ],
        answer: 0,
        hint: "It is the very first statement, at $n = 1$.",
        success: "Right: the first domino falling is the base case, $P(1)$.",
      },
      {
        kind: "choice",
        prompt: "And 'each falling domino knocks over the next one' stands for:",
        options: [
          "the inductive step: if $P(k)$ then $P(k+1)$",
          "the base case $P(1)$",
          "re-checking $P(1)$ a second time",
          "a lucky guess about the pattern",
        ],
        answer: 0,
        hint: "It links one value $k$ to the next value $k+1$.",
        success: "Yes: that is the inductive step, $P(k) \\Rightarrow P(k+1)$.",
      },
    ],
  },
  {
    id: "base",
    title: "The base case: knock over the first domino",
    mode: "base",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Let us make this concrete with a running example. Let $P(n)$ be the statement $1 + 2 + 3 + \\cdots + n = \\dfrac{n(n+1)}{2}$: the sum of the first $n$ positive integers has a tidy closed form. We will prove it by induction, and everything starts with the **base case**: verify the claim at the very first value, $n = 1$.",
      },
      {
        text: "Look at the **left-hand side** first, the sum $1 + 2 + \\cdots + n$. When $n = 1$ the sum stops immediately, because $n$ is both the start and the end: there is only one term, the number $1$. So the left side equals $1$.",
        add: { lhs: true },
      },
      {
        text: "Now the **right-hand side**, the formula $\\dfrac{n(n+1)}{2}$, evaluated at $n = 1$. Substitute carefully: $\\dfrac{1 \\cdot (1+1)}{2} = \\dfrac{1 \\cdot 2}{2} = \\dfrac{2}{2} = 1$. So the right side is also $1$.",
        add: { rhs: true },
      },
      {
        text: "The two sides agree: $1 = 1$. That means $P(1)$ is true, so the base case checks out and the first domino has fallen. One promise kept, one to go. Notice how little work this took: the base case is almost always just plugging in the first value and confirming both sides match.",
        add: { match: true },
      },
    ],
    practice:
      "The base case plugs the first value into both sides and checks they match. Here $P(1)$: the left side is $1$, and the right side is $\\dfrac{1 \\cdot 2}{2} = 1$.",
    questions: [
      {
        kind: "choice",
        prompt: "For $P(n): 1 + 2 + \\cdots + n = \\dfrac{n(n+1)}{2}$, the base case checks $n = 1$. What is the left-hand side there?",
        options: ["$1$", "$0$", "$2$", "$\\dfrac{1}{2}$"],
        answer: 0,
        hint: "At $n = 1$ the sum $1 + \\cdots + n$ has a single term.",
        success: "Right: only one term, so the left side is $1$.",
      },
      {
        kind: "choice",
        prompt: "What is the right-hand side $\\dfrac{n(n+1)}{2}$ at $n = 1$?",
        options: ["$2$", "$1$", "$\\dfrac{1}{2}$", "$0$"],
        answer: 1,
        hint: "Substitute $n = 1$: $\\dfrac{1 \\cdot 2}{2}$.",
        success: "Yes: $\\dfrac{1 \\cdot 2}{2} = 1$, matching the left side, so $P(1)$ holds.",
      },
    ],
  },
  {
    id: "step",
    title: "The inductive step: each domino knocks the next",
    mode: "step",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Now the **inductive step**, the engine of the proof. Here we do not test a specific number. Instead we **assume** the claim already holds for some unspecified value $k \\ge 1$, and use that to force it for the next value $k+1$. The assumption $P(k)$ has a name: the **inductive hypothesis**. So assume $1 + 2 + \\cdots + k = \\dfrac{k(k+1)}{2}$. The goal is to prove $P(k+1)$, namely $1 + 2 + \\cdots + (k+1) = \\dfrac{(k+1)(k+2)}{2}$.",
      },
      {
        text: "Start from the left side of $P(k+1)$, the sum up to $k+1$: $1 + 2 + \\cdots + k + (k+1)$. The front part, $1 + 2 + \\cdots + k$, is exactly what the inductive hypothesis describes, so replace it with $\\dfrac{k(k+1)}{2}$. This is the one place the assumption gets used, and it is why the hypothesis matters. In the strip above, assuming $P(k)$ is domino $k$ lying down.",
        add: { e1: true },
      },
      {
        text: "From here it is pure algebra. The two terms share a common factor of $(k+1)$: the first term $\\dfrac{k(k+1)}{2}$ contains it, and the second term is $(k+1)$ itself. Factor $(k+1)$ out front to get $(k+1)\\left(\\dfrac{k}{2} + 1\\right)$.",
        add: { e2: true },
      },
      {
        text: "Tidy the inside over a common denominator of $2$: $\\dfrac{k}{2} + 1 = \\dfrac{k}{2} + \\dfrac{2}{2} = \\dfrac{k+2}{2}$. So the expression becomes $(k+1) \\cdot \\dfrac{k+2}{2}$.",
        add: { e3: true },
      },
      {
        text: "Multiply the pieces: $\\dfrac{(k+1)(k+2)}{2}$. Compare that with the formula $\\dfrac{n(n+1)}{2}$ at $n = k+1$, which is $\\dfrac{(k+1)\\big((k+1)+1\\big)}{2} = \\dfrac{(k+1)(k+2)}{2}$. They are identical, so we have proved $P(k+1)$. Domino $k$ has knocked over domino $k+1$, and since $k$ was arbitrary, this works at every link in the chain.",
        add: { e4: true },
      },
    ],
    practice:
      "In the inductive step, assume the hypothesis $P(k)$, substitute it into the sum for $P(k+1)$, then factor and simplify until you reach $\\dfrac{(k+1)(k+2)}{2}$, which is exactly $P(k+1)$.",
    questions: [
      {
        kind: "choice",
        prompt: "The inductive hypothesis for this proof is the assumption that:",
        options: [
          "$1 + 2 + \\cdots + k = \\dfrac{k(k+1)}{2}$, that is, $P(k)$",
          "$1 + 2 + \\cdots + (k+1) = \\dfrac{(k+1)(k+2)}{2}$, that is, $P(k+1)$",
          "$P(n)$ is true for every $n$ at once",
          "$P(1)$ is true",
        ],
        answer: 0,
        hint: "The hypothesis is what you assume about $k$, not what you are trying to prove.",
        success: "Right: you assume $P(k)$, the statement at $k$.",
      },
      {
        kind: "choice",
        prompt: "Using the hypothesis, $\\dfrac{k(k+1)}{2} + (k+1)$ simplifies to:",
        options: [
          "$\\dfrac{(k+1)(k+2)}{2}$",
          "$\\dfrac{(k+1)(k+1)}{2}$",
          "$\\dfrac{k(k+1)}{2}$",
          "$\\dfrac{(k+2)(k+3)}{2}$",
        ],
        answer: 0,
        hint: "Factor out $(k+1)$, then combine $\\dfrac{k}{2} + 1 = \\dfrac{k+2}{2}$.",
        success: "Yes: $(k+1)\\left(\\dfrac{k}{2} + 1\\right) = \\dfrac{(k+1)(k+2)}{2}$, which is $P(k+1)$.",
      },
    ],
  },
  {
    id: "bothneeded",
    title: "Why both parts are required",
    mode: "bothneeded",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Both parts are doing real work. It is tempting to think one of them is enough, but drop either promise and the argument collapses. Let us see exactly how each half fails on its own.",
      },
      {
        text: "**Base case, but no working step.** Suppose you show $P(1)$ is true (the first domino falls) but you never prove the step $P(k) \\Rightarrow P(k+1)$. Then nothing guarantees that a fallen domino knocks the next one over. The first gap in the chain stops everything: the first domino lies down and the rest stay standing. Proving one case, or even a handful, never covers the infinitely many that remain.",
        add: { caseA: true },
        draw: true,
      },
      {
        text: "**Working step, but no base case.** Now suppose you prove the step, so every domino would knock the next, but you never establish $P(1)$. Then the chain reaction has no starting push. Each domino is poised to topple the one after it, yet nothing ever tips the first, so not a single domino falls. An implication $P(k) \\Rightarrow P(k+1)$ with no true starting value proves nothing.",
        add: { caseB: true },
      },
      {
        text: "Here is the sharp warning. A false statement can still satisfy the inductive step. Take the bogus claim $P(n): n = n + 1$. If you assume $P(k)$, that $k = k + 1$, and add $1$ to both sides, you get $k + 1 = k + 2$, which is $P(k+1)$: the step holds. But $P(1)$ says $1 = 2$, which is false, and the claim is in fact false for every $n$. The step alone was worthless without a true base case, so always prove both.",
      },
    ],
    practice:
      "Both parts are mandatory: the base case starts the chain and the inductive step keeps it going. A working step with no true base case (like $n = n+1$) can satisfy $P(k) \\Rightarrow P(k+1)$ and still be false everywhere.",
    questions: [
      {
        kind: "choice",
        prompt: "You prove the base case $P(1)$ but skip the inductive step. Is $P(n)$ proved for all $n \\ge 1$?",
        options: [
          "No: without the step, nothing carries the truth from one value to the next",
          "Yes: the base case alone is enough",
          "Yes, but only for even $n$",
          "Only if you also check $P(2)$ by hand",
        ],
        answer: 0,
        hint: "A single true case cannot cover infinitely many values.",
        success: "Right: the base case starts the chain, but only the inductive step propagates it.",
      },
      {
        kind: "choice",
        prompt: "A claim satisfies the inductive step $P(k) \\Rightarrow P(k+1)$, but its base case $P(1)$ is false. What can you conclude?",
        options: [
          "Nothing follows: the step alone proves nothing, and the claim may be false for every $n$, as with $n = n+1$",
          "The claim is still true for all $n$",
          "The claim is true for all $n \\ge 2$",
          "The base case does not actually matter",
        ],
        answer: 0,
        hint: "Recall $n = n+1$: the step held, yet the statement is false everywhere.",
        success: "Yes: with no true starting value, the implications never launch.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn",
    mode: "yourturn",
    params: [nParam],
    baseReveal: {},
    beats: [
      {
        text: "Time to watch the chain react on the running example. Below is a row of $8$ dominoes, one for each value of $n$ from $1$ to $8$. A fallen domino means $P(n)$ has been established up to that point. Right now $n = 2$, so the first two dominoes are down and the running sum $1 + 2 = 3$ matches $\\dfrac{2 \\cdot 3}{2} = 3$.",
      },
      {
        text: "Because the base case and the inductive step both hold for this statement, raising $n$ topples one more domino and the identity $1 + 2 + \\cdots + n = \\dfrac{n(n+1)}{2}$ keeps balancing. For instance $n = 5$ gives $\\dfrac{5 \\cdot 6}{2} = 15$, and $n = 8$ gives $\\dfrac{8 \\cdot 9}{2} = 36$.",
      },
    ],
    practice:
      "Drag $n$ and watch dominoes $1$ through $n$ topple while the identity $1 + \\cdots + n = \\dfrac{n(n+1)}{2}$ stays balanced. Slide $n$ up to $5$ to knock down the first five.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Slide $n$ until the first five dominoes have toppled, that is, set $n = 5$.",
        hint: "Move the slider up to $n = 5$; then $1 + \\cdots + 5 = \\dfrac{5 \\cdot 6}{2} = 15$.",
        success: "Yes: at $n = 5$ the first five dominoes are down and $1 + \\cdots + 5 = 15$.",
        check: (_value, values) => Math.round(values.n ?? 2) === 5,
      },
      {
        kind: "choice",
        prompt: "With $n = 5$, the running total $1 + 2 + 3 + 4 + 5$ equals $\\dfrac{5 \\cdot 6}{2}$, which is:",
        options: ["$15$", "$10$", "$21$", "$25$"],
        answer: 0,
        hint: "Compute $\\dfrac{5 \\cdot 6}{2}$.",
        success: "Right: $\\dfrac{30}{2} = 15$.",
      },
    ],
  },
];
