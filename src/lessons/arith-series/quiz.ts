import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for arithmetic series sums. Grounded in
 * the lesson: an arithmetic sequence steps by a common difference d, so
 * a_n = a_1 + (n-1)d, and a finite arithmetic series adds to
 * S_n = (n/2)(a_1 + a_n) = (n/2)(2a_1 + (n-1)d). Distractors are the standard
 * traps: using n instead of n/2, forgetting to find the last term a_n first,
 * off-by-one in the term count n, confusing the term a_n with the sum S_n, and
 * reaching for the geometric formula on an arithmetic series. Every total below
 * is verified by hand.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-diff",
      prompt: "What is the common difference $d$ of $3, 7, 11, 15, 19$?",
      choices: [
        { text: "$3$", explain: "That is the first term $a_1$, not the step between terms. Use $7 - 3 = 4$." },
        { text: "$7$", explain: "That is the second term. The difference is $7 - 3 = 4$." },
        { text: "$4$", correct: true, explain: "$7 - 3 = 4$, and every step matches: $11 - 7 = 4$." },
        { text: "$-4$", explain: "The terms increase, so $d$ is positive: $7 - 3 = 4$." },
      ],
    },
    {
      id: "c-nth",
      prompt: "Using $a_n = a_1 + (n-1)d$ with $a_1 = 2$ and $d = 3$, find $a_5$.",
      choices: [
        { text: "$17$", explain: "That used $n$ instead of $n-1$: $2 + 5\\cdot 3 = 17$. It takes only $4$ steps to reach the 5th term." },
        { text: "$14$", correct: true, explain: "$2 + (5-1)\\cdot 3 = 2 + 12 = 14$." },
        { text: "$11$", explain: "That is $a_4 = 2 + 3\\cdot 3$. Step $n-1 = 4$ times for $a_5$." },
        { text: "$5$", explain: "That adds $d$ only once ($2 + 3$). Add it $n-1 = 4$ times." },
      ],
    },
    {
      id: "c-count",
      prompt: "How many terms are in $4, 7, 10, \\ldots, 31$ (with $d = 3$)?",
      choices: [
        { text: "$10$", correct: true, explain: "$(31 - 4)/3 + 1 = 9 + 1 = 10$ terms." },
        { text: "$9$", explain: "Off by one: you must add $1$, so $(31 - 4)/3 + 1 = 10$." },
        { text: "$27$", explain: "That is just $31 - 4$. Divide by $d = 3$ and add $1$." },
        { text: "$11$", explain: "That over-counts. The count is $(31 - 4)/3 + 1 = 10$." },
      ],
    },
    {
      id: "c-sum4",
      prompt: "Evaluate the sum $2 + 5 + 8 + 11$.",
      choices: [
        { text: "$52$", explain: "That used $n$ instead of $\\dfrac{n}{2}$: $4\\cdot 13 = 52$. There are only $n/2 = 2$ pairs." },
        { text: "$13$", explain: "That is $a_1 + a_n$ alone. Still multiply by $\\dfrac{n}{2} = 2$." },
        { text: "$26$", correct: true, explain: "$\\dfrac{4}{2}(2 + 11) = 2\\cdot 13 = 26$ (check: $2+5+8+11 = 26$)." },
        { text: "$11$", explain: "That is the last term $a_n$, not the sum $S_n$." },
      ],
    },
    {
      id: "c-formula",
      prompt: "Which formula gives the sum of an arithmetic series?",
      choices: [
        { text: "$S_n = n(a_1 + a_n)$", explain: "This is missing the factor $\\dfrac{1}{2}$. $n$ terms make $n/2$ pairs, not $n$." },
        { text: "$S_n = \\dfrac{n}{2}(a_1 + a_n)$", correct: true, explain: "Correct: $n/2$ pairs, each worth $a_1 + a_n$." },
        { text: "$S_n = \\dfrac{a_1(1 - r^n)}{1 - r}$", explain: "That is the geometric series sum (it uses a ratio $r$), not the arithmetic one." },
        { text: "$a_n = a_1 + (n-1)d$", explain: "That is the term formula (a single term), not the sum of the series." },
      ],
    },
    {
      id: "c-sum10",
      prompt: "Evaluate $1 + 2 + 3 + \\cdots + 10$.",
      choices: [
        { text: "$55$", correct: true, explain: "$\\dfrac{10}{2}(1 + 10) = 5\\cdot 11 = 55$." },
        { text: "$110$", explain: "That forgot to halve: $10(1 + 10) = 110$ counts each term twice." },
        { text: "$45$", explain: "That is $1 + \\cdots + 9$. Include the term $10$ for $55$." },
        { text: "$100$", explain: "That is $10^2$. The sum is $\\dfrac{10}{2}(1 + 10) = 55$." },
      ],
    },
    {
      id: "c-sum-mult3",
      prompt: "Evaluate $3 + 6 + 9 + \\cdots + 30$.",
      choices: [
        { text: "$330$", explain: "That used $n$ instead of $\\dfrac{n}{2}$: $10\\cdot 33 = 330$." },
        { text: "$33$", explain: "That is $a_1 + a_n$ only. Multiply by $\\dfrac{n}{2} = 5$." },
        { text: "$30$", explain: "That is the last term, not the sum." },
        { text: "$165$", correct: true, explain: "$10$ terms, so $\\dfrac{10}{2}(3 + 30) = 5\\cdot 33 = 165$." },
      ],
    },
    {
      id: "c-need-an",
      prompt: "Sum the first $6$ terms of the sequence with $a_1 = 4$ and $d = 2$.",
      choices: [
        { text: "$24$", explain: "That reused $a_1$ as the last term: $\\dfrac{6}{2}(4 + 4) = 24$. Find $a_6 = 14$ first." },
        { text: "$54$", correct: true, explain: "First $a_6 = 4 + 5\\cdot 2 = 14$, then $\\dfrac{6}{2}(4 + 14) = 3\\cdot 18 = 54$." },
        { text: "$108$", explain: "That forgot to halve: $6(4 + 14) = 108$. Use $\\dfrac{n}{2} = 3$." },
        { text: "$14$", explain: "That is the last term $a_6$, not the sum of the six terms." },
      ],
    },
    {
      id: "c-count-even",
      prompt: "How many terms are in the evens $2, 4, 6, \\ldots, 20$?",
      choices: [
        { text: "$10$", correct: true, explain: "$(20 - 2)/2 + 1 = 9 + 1 = 10$." },
        { text: "$9$", explain: "Off by one: add $1$ after dividing, giving $10$." },
        { text: "$20$", explain: "That is the last term, not the count. There are $10$ evens." },
        { text: "$18$", explain: "That is $20 - 2$. Divide by $2$ and add $1$ to get $10$." },
      ],
    },
    {
      id: "c-recognize",
      prompt: "Evaluate the arithmetic series $2 + 6 + 10 + 14$.",
      choices: [
        { text: "$64$", explain: "That forgot to halve: $4\\cdot 16 = 64$. There are $n/2 = 2$ pairs." },
        { text: "$32$", correct: true, explain: "$d = 4$, so $\\dfrac{4}{2}(2 + 14) = 2\\cdot 16 = 32$ (check: $2+6+10+14 = 32$)." },
        { text: "$16$", explain: "That is $a_1 + a_n$ only. Multiply by $\\dfrac{n}{2} = 2$." },
        { text: "$14$", explain: "That is the last term, not the sum." },
      ],
    },
    {
      id: "c-neg-diff",
      prompt: "What is the common difference $d$ of $10, 7, 4, 1$?",
      choices: [
        { text: "$-3$", correct: true, explain: "$7 - 10 = -3$. The terms decrease, so $d$ is negative." },
        { text: "$3$", explain: "The size is right but the sign is wrong: $7 - 10 = -3$." },
        { text: "$-7$", explain: "That is not the step. Subtract neighbours: $7 - 10 = -3$." },
        { text: "$10$", explain: "That is the first term, not the difference." },
      ],
    },
    {
      id: "c-2a1-form",
      prompt: "Use $S_n = \\dfrac{n}{2}(2a_1 + (n-1)d)$ with $a_1 = 1$, $d = 2$, $n = 5$.",
      choices: [
        { text: "$50$", explain: "That forgot to halve: $5(10) = 50$. Keep the $\\dfrac{n}{2}$ factor." },
        { text: "$10$", explain: "That is $2a_1 + (n-1)d$ only. Still multiply by $\\dfrac{n}{2}$." },
        { text: "$9$", explain: "That is the last term $a_5 = 2(5) - 1 = 9$, not the sum." },
        { text: "$25$", correct: true, explain: "$\\dfrac{5}{2}(2 + 8) = \\dfrac{5}{2}(10) = 25$ (the first five odds $1+3+5+7+9$)." },
      ],
    },
    {
      id: "c-which-term",
      prompt: "For $a_1 = 7$, $d = 5$, which term $a_n$ equals $42$?",
      choices: [
        { text: "$n = 8$", correct: true, explain: "$7 + (n-1)5 = 42$ gives $n - 1 = 7$, so $n = 8$." },
        { text: "$n = 7$", explain: "Off by one: $n - 1 = 7$, so add $1$ to get $n = 8$." },
        { text: "$n = 9$", explain: "That over-shoots: $a_9 = 7 + 8\\cdot 5 = 47$, not $42$." },
        { text: "$n = 35$", explain: "That is $(n-1)d = 35$. Solve on to get $n = 8$." },
      ],
    },
    {
      id: "c-sum6",
      prompt: "Evaluate $6 + 12 + 18 + 24$.",
      choices: [
        { text: "$120$", explain: "That forgot to halve: $4\\cdot 30 = 120$." },
        { text: "$30$", explain: "That is $a_1 + a_n$ only. Multiply by $\\dfrac{n}{2} = 2$." },
        { text: "$60$", correct: true, explain: "$\\dfrac{4}{2}(6 + 24) = 2\\cdot 30 = 60$ (check: $6+12+18+24 = 60$)." },
        { text: "$24$", explain: "That is the last term, not the sum." },
      ],
    },
    {
      id: "c-half-meaning",
      prompt: "In $S_n = \\dfrac{n}{2}(a_1 + a_n)$, what does the factor $\\dfrac{n}{2}$ represent?",
      choices: [
        { text: "the number of terms", explain: "That is $n$. The number of pairs is half of it, $\\dfrac{n}{2}$." },
        { text: "the number of first-plus-last pairs", correct: true, explain: "$n$ terms pair up into $n/2$ pairs, each worth $a_1 + a_n$." },
        { text: "the common difference", explain: "The common difference is $d$. $\\dfrac{n}{2}$ counts the pairs." },
        { text: "the average of all the terms", explain: "The average term is $\\dfrac{a_1 + a_n}{2}$, the other factor, not $\\dfrac{n}{2}$." },
      ],
    },
  ],
  summit: [
    {
      id: "s-evens20",
      prompt: "Evaluate $2 + 4 + 6 + \\cdots + 40$ (the first $20$ even numbers).",
      choices: [
        { text: "$420$", correct: true, explain: "$\\dfrac{20}{2}(2 + 40) = 10\\cdot 42 = 420$." },
        { text: "$840$", explain: "That forgot to halve: $20(42) = 840$. There are $n/2 = 10$ pairs." },
        { text: "$800$", explain: "That is $20\\cdot 40$. Use $\\dfrac{n}{2}(a_1 + a_n) = 420$." },
        { text: "$42$", explain: "That is $a_1 + a_n$ only. Multiply by $\\dfrac{n}{2} = 10$." },
      ],
    },
    {
      id: "s-find-n-sum",
      prompt: "An arithmetic series has $a_1 = 3$, $d = 4$, and last term $43$. Find its sum.",
      choices: [
        { text: "$230$", explain: "That used $n = 10$ (off by one). The term $43$ is the 11th, so $n = 11$." },
        { text: "$253$", correct: true, explain: "$n = 11$ (since $3 + (n-1)4 = 43$), then $\\dfrac{11}{2}(3 + 43) = 11\\cdot 23 = 253$." },
        { text: "$506$", explain: "That forgot to halve: $11(46) = 506$." },
        { text: "$46$", explain: "That is $a_1 + a_n$ only. Multiply by $\\dfrac{n}{2}$." },
      ],
    },
    {
      id: "s-term-not-sum",
      prompt: "For $a_1 = 5$, $d = 3$, find the 10th term $a_{10}$.",
      choices: [
        { text: "$32$", correct: true, explain: "$a_{10} = 5 + (10-1)\\cdot 3 = 5 + 27 = 32$." },
        { text: "$35$", explain: "That used $n$ instead of $n-1$: $5 + 10\\cdot 3 = 35$." },
        { text: "$185$", explain: "That is the sum $S_{10}$, not the 10th term. The term is $a_{10} = 32$." },
        { text: "$29$", explain: "That is $a_9 = 5 + 8\\cdot 3$. Step $n-1 = 9$ times for $a_{10}$." },
      ],
    },
    {
      id: "s-which-arith",
      prompt: "For which series does $S_n = \\dfrac{n}{2}(a_1 + a_n)$ apply?",
      choices: [
        { text: "$3 + 7 + 11 + 15$ (add $4$ each time)", correct: true, explain: "Equal steps of $4$ make it arithmetic, so the pairing formula applies." },
        { text: "$3 + 6 + 12 + 24$ (double each time)", explain: "That is geometric (ratio $2$). Use the geometric sum instead." },
        { text: "$1 + 4 + 9 + 16$ (the squares)", explain: "The gaps grow ($3, 5, 7$), so it is not arithmetic." },
        { text: "$2 + 3 + 5 + 8$ (gaps grow)", explain: "The differences $1, 2, 3$ are not constant, so it is not arithmetic." },
      ],
    },
    {
      id: "s-neg-d",
      prompt: "Evaluate $20 + 16 + 12 + \\cdots + 0$.",
      choices: [
        { text: "$120$", explain: "That forgot to halve: $6(20) = 120$." },
        { text: "$50$", explain: "That used $n = 5$ (off by one). $0$ is the 6th term, so $n = 6$." },
        { text: "$20$", explain: "That is $a_1 + a_n$ only. Multiply by $\\dfrac{n}{2} = 3$." },
        { text: "$60$", correct: true, explain: "The $6$ terms $20, 16, 12, 8, 4, 0$ give $\\dfrac{6}{2}(20 + 0) = 3\\cdot 20 = 60$." },
      ],
    },
    {
      id: "s-2a1-form",
      prompt: "Use $S_n = \\dfrac{n}{2}(2a_1 + (n-1)d)$ with $a_1 = 4$, $d = 6$, $n = 8$.",
      choices: [
        { text: "$200$", correct: true, explain: "$\\dfrac{8}{2}(2\\cdot 4 + 7\\cdot 6) = 4(8 + 42) = 4\\cdot 50 = 200$." },
        { text: "$400$", explain: "That forgot to halve: $8(50) = 400$." },
        { text: "$50$", explain: "That is $2a_1 + (n-1)d$ only. Multiply by $\\dfrac{n}{2} = 4$." },
        { text: "$46$", explain: "That is the last term $a_8 = 4 + 7\\cdot 6$, not the sum." },
      ],
    },
    {
      id: "s-gauss50",
      prompt: "Evaluate $1 + 2 + 3 + \\cdots + 50$.",
      choices: [
        { text: "$2550$", explain: "That forgot to halve: $50(51) = 2550$." },
        { text: "$51$", explain: "That is $a_1 + a_n$ only. Multiply by $\\dfrac{n}{2} = 25$." },
        { text: "$1275$", correct: true, explain: "$\\dfrac{50}{2}(1 + 50) = 25\\cdot 51 = 1275$." },
        { text: "$1225$", explain: "That is $1 + \\cdots + 49$. Include the term $50$ for $1275$." },
      ],
    },
    {
      id: "s-6th-term",
      prompt: "For $a_1 = 2$, $d = 5$, find the 6th term.",
      choices: [
        { text: "$27$", correct: true, explain: "$a_6 = 2 + (6-1)\\cdot 5 = 2 + 25 = 27$." },
        { text: "$32$", explain: "That used $n$ instead of $n-1$: $2 + 6\\cdot 5 = 32$." },
        { text: "$87$", explain: "That is the sum $S_6 = \\dfrac{6}{2}(2 + 27)$, not the 6th term." },
        { text: "$22$", explain: "That is $a_5 = 2 + 4\\cdot 5$. Step $n-1 = 5$ times for $a_6$." },
      ],
    },
    {
      id: "s-logs",
      prompt: "A stack has $12$ logs on the bottom row, $11$ on the next, down to $1$ on top. How many logs in all?",
      choices: [
        { text: "$156$", explain: "That forgot to halve: $12(13) = 156$." },
        { text: "$78$", correct: true, explain: "The rows $1, 2, \\ldots, 12$ sum to $\\dfrac{12}{2}(1 + 12) = 6\\cdot 13 = 78$." },
        { text: "$66$", explain: "That is $1 + \\cdots + 11$. Include the bottom row of $12$ for $78$." },
        { text: "$13$", explain: "That is $a_1 + a_n$ only. Multiply by $\\dfrac{n}{2} = 6$." },
      ],
    },
    {
      id: "s-solve-a1",
      prompt: "An arithmetic series has $n = 10$ terms, last term $a_{10} = 32$, and sum $S_{10} = 185$. Find $a_1$.",
      choices: [
        { text: "$5$", correct: true, explain: "$185 = \\dfrac{10}{2}(a_1 + 32) = 5(a_1 + 32)$, so $a_1 + 32 = 37$ and $a_1 = 5$." },
        { text: "$37$", explain: "That is $a_1 + a_n = 37$. Subtract $a_n = 32$ to get $a_1 = 5$." },
        { text: "$3$", explain: "That is the common difference $d = (32 - 5)/9$, not the first term." },
        { text: "$6$", explain: "Recompute: $a_1 + 32 = 37$, so $a_1 = 5$." },
      ],
    },
    {
      id: "s-odds15",
      prompt: "Evaluate $1 + 3 + 5 + \\cdots$, the first $15$ odd numbers.",
      choices: [
        { text: "$29$", explain: "That is the 15th odd number $a_{15} = 2(15) - 1$, not the sum." },
        { text: "$450$", explain: "That forgot to halve: $15(1 + 29) = 450$. There are $n/2$ pairs." },
        { text: "$225$", correct: true, explain: "The sum of the first $n$ odds is $n^2$, so $15^2 = 225$ (or $\\dfrac{15}{2}(1 + 29)$)." },
        { text: "$196$", explain: "That is $14^2$ (off by one). The first $15$ odds sum to $15^2 = 225$." },
      ],
    },
    {
      id: "s-geo-trap",
      prompt: "Evaluate $4 + 8 + 16 + 32$.",
      choices: [
        { text: "$60$", correct: true, explain: "These terms multiply by $2$ (geometric), so add directly: $4 + 8 + 16 + 32 = 60$." },
        { text: "$72$", explain: "That misuses the arithmetic formula $\\dfrac{4}{2}(4 + 32) = 72$. It does not apply, since the terms are not equally spaced." },
        { text: "$36$", explain: "That is $a_1 + a_n$. The arithmetic formula does not apply here anyway, and the sum is $60$." },
        { text: "$120$", explain: "That doubles the total. Adding the four terms gives $60$." },
      ],
    },
    {
      id: "s-average",
      prompt: "An arithmetic series of $10$ terms has $a_1 = 2$ and $a_{10} = 38$. Find its sum.",
      choices: [
        { text: "$200$", correct: true, explain: "$S = n\\cdot \\dfrac{a_1 + a_n}{2} = 10\\cdot \\dfrac{40}{2} = 10\\cdot 20 = 200$." },
        { text: "$400$", explain: "That used $n(a_1 + a_n)$ without halving. The average term is $\\dfrac{40}{2} = 20$." },
        { text: "$20$", explain: "That is the average term only. Multiply by the $n = 10$ terms." },
        { text: "$40$", explain: "That is $a_1 + a_n$. The sum is $10\\cdot \\dfrac{40}{2} = 200$." },
      ],
    },
    {
      id: "s-endpoints",
      prompt: "An arithmetic series starts at $4$, has $7$ terms, and ends at $28$. Find its sum.",
      choices: [
        { text: "$224$", explain: "That forgot to halve: $7(32) = 224$." },
        { text: "$112$", correct: true, explain: "$\\dfrac{7}{2}(4 + 28) = 7\\cdot 16 = 112$." },
        { text: "$32$", explain: "That is $a_1 + a_n$ only. Multiply by $\\dfrac{n}{2}$." },
        { text: "$28$", explain: "That is the last term, not the sum." },
      ],
    },
    {
      id: "s-mult3",
      prompt: "Evaluate the sum of all multiples of $3$ from $3$ to $99$.",
      choices: [
        { text: "$1683$", correct: true, explain: "There are $99/3 = 33$ terms, so $\\dfrac{33}{2}(3 + 99) = 33\\cdot 51 = 1683$." },
        { text: "$3366$", explain: "That forgot to halve: $33(102) = 3366$." },
        { text: "$1632$", explain: "That used $n = 32$ (off by one). There are $33$ multiples of $3$ up to $99$." },
        { text: "$102$", explain: "That is $a_1 + a_n$ only. Multiply by $\\dfrac{n}{2}$." },
      ],
    },
  ],
};
