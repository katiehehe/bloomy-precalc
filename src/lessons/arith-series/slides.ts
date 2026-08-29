import type { ParamSpec, Slide } from "../types";

/**
 * Arithmetic series sums. An arithmetic sequence steps by a common difference d,
 * so a_n = a_1 + (n-1)d, and a finite arithmetic series adds to
 * S_n = (n/2)(a_1 + a_n) = (n/2)(2a_1 + (n-1)d).
 *
 * Reveal flags are read literally in Stage.tsx:
 *   sequence: bars, step, nth
 *   pairing:  bars, pairs, formula
 *   formula:  bars, plug, total
 *   worked:   bars, plug, total
 *   yourturn: none (bars + total always shown, driven by the n slider)
 */

const nParam: ParamSpec = {
  key: "n",
  label: "number of terms n",
  min: 1,
  max: 8,
  start: 3,
  step: 1,
  format: (v) => `n = ${Math.round(v)}`,
};

export const slides: Slide[] = [
  {
    id: "sequence",
    title: "An arithmetic sequence steps by d",
    mode: "sequence",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "An **arithmetic sequence** is a list of numbers where you move from one term to the next by adding the same fixed amount every time. That fixed amount is the **common difference**, written $d$. Take $3, 7, 11, 15, 19$: from $3$ you add $4$ to get $7$, add $4$ again to get $11$, and so on. So the common difference here is $d = 4$.",
      },
      {
        text: "Let us picture the five terms as bars, one per term, each bar's height equal to that term's value: $3$, then $7$, then $11$, then $15$, then $19$. Reading left to right, the bars climb by the same step each time, and that steady, equal climb is exactly what makes the sequence arithmetic.",
        add: { bars: true },
        draw: true,
      },
      {
        text: "That steady climb is the common difference in action. Subtract any term from the one right after it and you always get the same number: $7 - 3 = 4$, then $11 - 7 = 4$, then $15 - 11 = 4$. So $d$ is the constant gap between neighbouring bars, the amount each new bar rises above the one before it.",
        add: { step: true },
      },
      {
        text: "To jump straight to any term without listing them all, use the term formula $a_n = a_1 + (n-1)d$, where $a_1$ is the first term and $n$ is the position in the list. It says: start at $a_1$, then add the step $d$ a total of $(n-1)$ times, because it takes $n-1$ steps to walk from the first term to the $n$th. For our sequence $a_5 = 3 + (5-1)\\cdot 4 = 3 + 16 = 19$, which matches the last bar.",
        add: { nth: true },
      },
    ],
    practice:
      "Read off the common difference $d$ by subtracting a term from the next, then use $a_n = a_1 + (n-1)d$ to reach any term.",
    questions: [
      {
        kind: "choice",
        prompt: "What is the common difference $d$ of $3, 7, 11, 15, 19$?",
        options: ["$3$", "$4$", "$7$", "$-4$"],
        answer: 1,
        hint: "Subtract a term from the one after it, for example $7 - 3$.",
        success: "Right: each step adds $4$, so $d = 4$.",
      },
      {
        kind: "choice",
        prompt: "Using $a_n = a_1 + (n-1)d$ with $a_1 = 3$ and $d = 4$, what is $a_5$?",
        options: ["$23$", "$19$", "$15$", "$16$"],
        answer: 1,
        hint: "Add the step $4$ exactly $(5-1) = 4$ times to the first term $3$.",
        success: "Yes: $3 + 4\\cdot 4 = 19$.",
      },
    ],
  },
  {
    id: "pairing",
    title: "Gauss's pairing trick",
    mode: "pairing",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "A **series** is what you get when you add up the terms of a sequence. Adding a long arithmetic series one term at a time is slow, so here is a famous shortcut, the one Carl Friedrich Gauss reportedly used as a schoolboy to add $1 + 2 + 3 + \\cdots + 100$ in seconds.",
      },
      {
        text: "We will find the trick on a small case first, $1 + 2 + 3 + 4 + 5 + 6$, drawn as six bars. Small numbers make the pattern easy to see, and the same idea will then work for any arithmetic series.",
        add: { bars: true },
        draw: true,
      },
      {
        text: "Pair the first term with the last, the second with the second to last, and so on inward: $(1 + 6)$, then $(2 + 5)$, then $(3 + 4)$. Every pair adds to the same total, $7$. That is no accident: as you step inward, the left number rises by $1$ while the right number drops by $1$, so each pair keeps the same sum, which is $a_1 + a_n$.",
        add: { pairs: true },
      },
      {
        text: "There are $6$ terms, so they form $6 / 2 = 3$ pairs, each worth $7$, giving $3 \\cdot 7 = 21$. In general, $n$ terms make $n/2$ pairs and each pair is worth $a_1 + a_n$, so the sum is $S_n = \\dfrac{n}{2}(a_1 + a_n)$. Gauss's sum is then just $\\dfrac{100}{2}(1 + 100) = 50 \\cdot 101 = 5050$.",
        add: { formula: true },
      },
    ],
    practice:
      "Pair the first term with the last: there are $n/2$ pairs, each equal to $a_1 + a_n$, so $S_n = \\dfrac{n}{2}(a_1 + a_n)$.",
    questions: [
      {
        kind: "choice",
        prompt: "In $1 + 2 + 3 + 4 + 5 + 6$, each first-plus-last pair adds to:",
        options: ["$7$", "$6$", "$21$", "$3$"],
        answer: 0,
        hint: "Add the first and last term, $1 + 6$.",
        success: "Right: $(1+6) = (2+5) = (3+4) = 7$.",
      },
      {
        kind: "choice",
        prompt: "How many first-plus-last pairs do the $6$ terms form?",
        options: ["$6$", "$3$", "$2$", "$12$"],
        answer: 1,
        hint: "It is $n/2$ pairs, and here $n = 6$.",
        success: "Yes: $6/2 = 3$ pairs, which is why the formula uses $\\dfrac{n}{2}$, not $n$.",
      },
    ],
  },
  {
    id: "formula",
    title: "Apply the sum formula",
    mode: "apply",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Now put the formula to work on the arithmetic series $3 + 7 + 11 + 15 + 19$, the same terms from the first slide. First read off the three pieces the formula needs: the first term $a_1 = 3$, the last term $a_n = 19$, and the number of terms $n = 5$.",
      },
      {
        text: "Here are the five terms as bars again. Their heights are the numbers we are adding, and the running-total track underneath will fill up to the sum once we compute it.",
        add: { bars: true },
        draw: true,
      },
      {
        text: "Substitute into $S_n = \\dfrac{n}{2}(a_1 + a_n)$. With $n = 5$, $a_1 = 3$, and $a_n = 19$ this becomes $S_5 = \\dfrac{5}{2}(3 + 19)$. The factor $\\dfrac{n}{2} = \\dfrac{5}{2}$ is simply half the number of terms. It does not need to be a whole number for the formula to work.",
        add: { plug: true },
      },
      {
        text: "Finish the arithmetic: $3 + 19 = 22$, and $\\dfrac{5}{2}(22) = 5 \\cdot 11 = 55$. The running total fills to $55$, and you can confirm by adding directly: $3 + 7 + 11 + 15 + 19 = 55$. The same series can also be summed with $S_n = \\dfrac{n}{2}(2a_1 + (n-1)d)$, which is handy when you know $d$ but not the last term.",
        add: { total: true },
      },
    ],
    practice:
      "Identify $a_1$, $a_n$, and $n$, then compute $S_n = \\dfrac{n}{2}(a_1 + a_n)$, keeping the factor $\\dfrac{n}{2}$ and not $n$.",
    questions: [
      {
        kind: "choice",
        prompt: "Evaluate $S_5 = \\dfrac{5}{2}(3 + 19)$.",
        options: ["$110$", "$55$", "$22$", "$19$"],
        answer: 1,
        hint: "First add $3 + 19 = 22$, then multiply by $\\dfrac{5}{2}$.",
        success: "Yes: $\\dfrac{5}{2}\\cdot 22 = 5 \\cdot 11 = 55$.",
      },
      {
        kind: "choice",
        prompt: "Which factor multiplies $(a_1 + a_n)$ in the sum formula?",
        options: ["$n$", "$\\dfrac{n}{2}$", "$2n$", "$n - 1$"],
        answer: 1,
        hint: "It counts the number of pairs, which is half the number of terms.",
        success: "Right: $\\dfrac{n}{2}$, because $n$ terms make $n/2$ pairs.",
      },
    ],
  },
  {
    id: "worked",
    title: "A second worked sum",
    mode: "worked",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Here is a second example: the first ten multiples of $5$, that is $5 + 10 + 15 + \\cdots + 50$. It is arithmetic with first term $a_1 = 5$ and common difference $d = 5$, and there are $n = 10$ terms. But to use $S_n = \\dfrac{n}{2}(a_1 + a_n)$ we first need the last term $a_n$.",
      },
      {
        text: "The ten terms are shown as bars, climbing from $5$ up to $50$ in equal steps of $5$.",
        add: { bars: true },
        draw: true,
      },
      {
        text: "Find the last term with the term formula: $a_{10} = 5 + (10 - 1)\\cdot 5 = 5 + 45 = 50$. A common slip is to reach for the sum before finding $a_n$, so make sure to compute the last term first. Now substitute: $S_{10} = \\dfrac{10}{2}(5 + 50)$.",
        add: { plug: true },
      },
      {
        text: "Evaluate: $\\dfrac{10}{2} = 5$ pairs, times $5 + 50 = 55$, gives $5 \\cdot 55 = 275$. The running total fills to $275$, the sum of the first ten multiples of $5$.",
        add: { total: true },
      },
    ],
    practice:
      "Find the last term $a_n$ first (with $a_n = a_1 + (n-1)d$), then apply $S_n = \\dfrac{n}{2}(a_1 + a_n)$.",
    questions: [
      {
        kind: "choice",
        prompt: "First find the last term: $a_{10}$ for $a_1 = 5$, $d = 5$.",
        options: ["$50$", "$55$", "$45$", "$275$"],
        answer: 0,
        hint: "Use $a_{10} = 5 + (10-1)\\cdot 5$.",
        success: "Yes: $5 + 45 = 50$.",
      },
      {
        kind: "choice",
        prompt: "Now evaluate $S_{10} = \\dfrac{10}{2}(5 + 50)$.",
        options: ["$275$", "$550$", "$55$", "$50$"],
        answer: 0,
        hint: "$\\dfrac{10}{2} = 5$, then multiply by $55$.",
        success: "Right: $5 \\cdot 55 = 275$.",
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
        text: "Time to put it together on the **odd numbers** $1, 3, 5, 7, \\ldots$, an arithmetic sequence with first term $a_1 = 1$ and common difference $d = 2$. Right now the slider is at $n = 3$, so the series is $1 + 3 + 5 = 9$, and the running total sits below the dashed target line at $25$.",
      },
      {
        text: "There is a clean pattern hiding here. The $n$th odd number is $a_n = 1 + (n-1)\\cdot 2 = 2n - 1$, so the sum becomes $S_n = \\dfrac{n}{2}(1 + (2n - 1)) = \\dfrac{n}{2}(2n) = n^2$. The sum of the first $n$ odd numbers is exactly $n^2$: $1 = 1^2$, then $1 + 3 = 2^2 = 4$, then $1 + 3 + 5 = 3^2 = 9$, and the total reaches $25 = 5^2$ when $n = 5$.",
      },
    ],
    practice:
      "Drag the slider $n$ to add more odd numbers and watch the running total climb. Use $S_n = n^2$ to land exactly on the dashed line at $25$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Set $n$ so the sum of the first $n$ odd numbers equals $25$ (reach the dashed line).",
        hint: "Since $S_n = n^2$ and $5^2 = 25$, slide to $n = 5$.",
        success: "Yes: $1 + 3 + 5 + 7 + 9 = 25 = 5^2$.",
        check: (_value, values) => Math.round(values.n ?? 3) === 5,
      },
      {
        kind: "choice",
        prompt: "Using $S_n = n^2$, what is the sum of the first $7$ odd numbers?",
        options: ["$49$", "$13$", "$14$", "$64$"],
        answer: 0,
        hint: "Compute $7^2$.",
        success: "Right: $7^2 = 49$ (that is $1+3+5+7+9+11+13$).",
      },
    ],
  },
];
