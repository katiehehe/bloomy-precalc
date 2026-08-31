import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for sigma (summation) notation. Grounded
 * in the lesson: sum_{k=m}^{n} a_k adds the summand a_k for every integer from
 * m to n; the term count is n - m + 1; and the basic rules are sum c = n c,
 * sum c a_k = c sum a_k, and sum (a_k + b_k) = sum a_k + sum b_k. The index
 * letter is a dummy, so the questions deliberately cycle through i, j, k, m, p,
 * and r to keep the learner from tying the idea to one symbol. Distractors are
 * the standard traps: off-by-one term counts, treating the index letter as a
 * value, forgetting to plug in every term, using sum c = c, and the false "sum
 * of a product equals the product of sums". Every total below is verified by hand.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-upper",
      prompt: "In $\\sum_{i=1}^{6} i$, what is the $6$?",
      choices: [
        { text: "the upper limit (the last value of $i$)", correct: true, explain: "The number on top of the sigma is where the index stops." },
        { text: "the number of terms", explain: "It happens to equal the term count here, but the top number is the upper limit. The count is upper $-$ lower $+ 1$." },
        { text: "the value of the sum", explain: "The sum is $21$. The $6$ is just where $i$ stops." },
        { text: "the lower limit", explain: "The lower limit is the number under the sigma, $i = 1$." },
      ],
    },
    {
      id: "c-index",
      prompt: "In $\\sum_{j=1}^{5} j$, the letter $j$ is:",
      choices: [
        { text: "the index: a placeholder that takes each value in turn", correct: true, explain: "$j$ is a counter that never appears in the final number. The letter is arbitrary, so $i$, $k$, or $n$ would name the same sum." },
        { text: "a fixed unknown to solve for", explain: "There is nothing to solve. $j$ just runs through the listed integers." },
        { text: "the value of the sum", explain: "The sum is a single number ($15$). $j$ is the running index." },
        { text: "the number of terms", explain: "The term count is upper $-$ lower $+ 1$, not the index letter." },
      ],
    },
    {
      id: "c-count1",
      prompt: "How many terms are in $\\sum_{m=1}^{6} m$?",
      choices: [
        { text: "6", correct: true, explain: "$6 - 1 + 1 = 6$ terms." },
        { text: "5", explain: "That drops the endpoint. Use upper $-$ lower $+ 1 = 6$." },
        { text: "7", explain: "That over-counts. It is $6 - 1 + 1 = 6$." },
        { text: "21", explain: "$21$ is the value of the sum, not the number of terms." },
      ],
    },
    {
      id: "c-count2",
      prompt: "How many terms are in $\\sum_{p=3}^{7} p$?",
      choices: [
        { text: "5", correct: true, explain: "$7 - 3 + 1 = 5$ terms ($p = 3,4,5,6,7$)." },
        { text: "4", explain: "Off by one: remember to add $1$, so $7 - 3 + 1 = 5$." },
        { text: "7", explain: "The upper limit is not the count. It is $7 - 3 + 1 = 5$." },
        { text: "10", explain: "That is not how the count works. Use upper $-$ lower $+ 1 = 5$." },
      ],
    },
    {
      id: "c-eval-k",
      prompt: "Evaluate $\\sum_{k=1}^{4} k$.",
      choices: [
        { text: "10", correct: true, explain: "$1 + 2 + 3 + 4 = 10$." },
        { text: "4", explain: "That is only the last term. Add all four." },
        { text: "24", explain: "$24$ is $4!$, not the sum $1+2+3+4$." },
        { text: "8", explain: "Add every term: $1+2+3+4 = 10$." },
      ],
    },
    {
      id: "c-eval-2k",
      prompt: "Evaluate $\\sum_{i=1}^{3} 2i$.",
      choices: [
        { text: "12", correct: true, explain: "$2(1) + 2(2) + 2(3) = 2 + 4 + 6 = 12$." },
        { text: "6", explain: "That is $2 \\cdot 3$, only the last term. Add all three." },
        { text: "8", explain: "Plug in each $i$: $2+4+6 = 12$." },
        { text: "9", explain: "That is $1+2+3+3$. The summand is $2i$, giving $2+4+6 = 12$." },
      ],
    },
    {
      id: "c-eval-const",
      prompt: "Evaluate $\\sum_{j=1}^{5} 4$.",
      choices: [
        { text: "20", correct: true, explain: "A constant summand: $n\\,c = 5 \\cdot 4 = 20$." },
        { text: "4", explain: "The $4$ is added once per term, $5$ times: $5 \\cdot 4 = 20$." },
        { text: "9", explain: "That is $5 + 4$. The constant rule is $n\\,c = 5 \\cdot 4 = 20$." },
        { text: "24", explain: "Not $6 \\cdot 4$. There are $5$ terms, so $5 \\cdot 4 = 20$." },
      ],
    },
    {
      id: "c-const-rule",
      prompt: "For a constant $c$, $\\sum_{i=1}^{n} c$ equals:",
      choices: [
        { text: "$n\\,c$", correct: true, explain: "The constant is added once for each of the $n$ terms." },
        { text: "$c$", explain: "That forgets there are $n$ terms. Each contributes $c$." },
        { text: "$n + c$", explain: "It is a product $n\\,c$, not a sum $n + c$." },
        { text: "$c^{\\,n}$", explain: "Summation adds copies of $c$. Raising to a power would be a product of $c$'s." },
      ],
    },
    {
      id: "c-factor",
      prompt: "Using $\\sum_{k=1}^{4} k = 10$, evaluate $\\sum_{k=1}^{4} 5k$.",
      choices: [
        { text: "50", correct: true, explain: "Factor the constant: $\\sum 5k = 5 \\sum k = 5 \\cdot 10 = 50$." },
        { text: "15", explain: "That is $5 + 10$. The constant multiplies the whole sum: $5 \\cdot 10$." },
        { text: "10", explain: "The factor of $5$ scales the sum: $5 \\cdot 10 = 50$." },
        { text: "200", explain: "That multiplies by $20$. You only factor out the $5$: $5 \\cdot 10 = 50$." },
      ],
    },
    {
      id: "c-expand",
      prompt: "Evaluate $\\sum_{m=1}^{3} (m + 2)$.",
      choices: [
        { text: "12", correct: true, explain: "Terms are $3, 4, 5$ (add $2$ to each $m$): $3 + 4 + 5 = 12$." },
        { text: "6", explain: "That is $\\sum m$. You must add $2$ to each term: $3+4+5 = 12$." },
        { text: "8", explain: "That adds $2$ only once. Add it to every term: $3+4+5 = 12$." },
        { text: "9", explain: "Recount: $(1{+}2)+(2{+}2)+(3{+}2) = 3+4+5 = 12$." },
      ],
    },
    {
      id: "c-eval-ksq",
      prompt: "Evaluate $\\sum_{i=1}^{3} i^{2}$.",
      choices: [
        { text: "14", correct: true, explain: "$1^2 + 2^2 + 3^2 = 1 + 4 + 9 = 14$." },
        { text: "36", explain: "$36 = (1+2+3)^2$. That squares the sum, not each term." },
        { text: "9", explain: "That is only the last term $3^2$. Add all three squares." },
        { text: "6", explain: "That is $\\sum i$, not $\\sum i^2 = 1+4+9 = 14$." },
      ],
    },
    {
      id: "c-first-term",
      prompt: "What is the first term of $\\sum_{p=2}^{5} (p - 1)$?",
      choices: [
        { text: "1", correct: true, explain: "The first term is at $p = 2$: $2 - 1 = 1$." },
        { text: "2", explain: "You must plug $p = 2$ into $p - 1$, giving $1$." },
        { text: "0", explain: "That would be $p = 1$, but the lower limit is $p = 2$: $2 - 1 = 1$." },
        { text: "4", explain: "That is the last term ($p = 5$). The first is at $p = 2$." },
      ],
    },
    {
      id: "c-const-trap",
      prompt: "Evaluate $\\sum_{r=1}^{4} 7$.",
      choices: [
        { text: "28", correct: true, explain: "Constant rule: $4 \\cdot 7 = 28$." },
        { text: "7", explain: "The $7$ is added once per term, $4$ times: $4 \\cdot 7 = 28$." },
        { text: "11", explain: "That is $4 + 7$. The rule is the product $n\\,c = 28$." },
        { text: "21", explain: "That is $3 \\cdot 7$. There are $4$ terms, so $4 \\cdot 7 = 28$." },
      ],
    },
    {
      id: "c-eval-shift",
      prompt: "Evaluate $\\sum_{j=0}^{2} 3^{j}$.",
      choices: [
        { text: "13", correct: true, explain: "$3^0 + 3^1 + 3^2 = 1 + 3 + 9 = 13$." },
        { text: "12", explain: "That drops the $j=0$ term. $3^0 = 1$, so $1 + 3 + 9 = 13$." },
        { text: "9", explain: "That is only $3^2$. Add all three terms." },
        { text: "27", explain: "That is $3^3$. The sum is $1 + 3 + 9 = 13$." },
      ],
    },
    {
      id: "c-split",
      prompt: "Evaluate $\\sum_{k=1}^{3} (k + 1)$.",
      choices: [
        { text: "9", correct: true, explain: "Terms $2, 3, 4$ sum to $9$. Equivalently $\\sum k + \\sum 1 = 6 + 3 = 9$." },
        { text: "6", explain: "That is $\\sum k$ alone. The $+1$ adds $3$ more (once per term)." },
        { text: "7", explain: "That adds $1$ only once. Add it to each of the $3$ terms." },
        { text: "12", explain: "Recount: $2 + 3 + 4 = 9$." },
      ],
    },
  ],
  summit: [
    {
      id: "s-write-even",
      prompt: "Which sum equals $2 + 4 + 6 + 8 + 10$?",
      choices: [
        { text: "$\\sum_{i=1}^{5} 2i$", correct: true, explain: "$2i$ for $i = 1..5$ gives $2,4,6,8,10$." },
        { text: "$\\sum_{i=1}^{5} i$", explain: "That gives $1+2+3+4+5 = 15$, the wrong terms." },
        { text: "$\\sum_{i=1}^{10} i$", explain: "That adds every integer $1$ through $10$, not just the evens." },
        { text: "$\\sum_{i=2}^{10} i$", explain: "That adds all integers $2$ through $10$, not only the even ones." },
      ],
    },
    {
      id: "s-write-sq",
      prompt: "Which sum equals $1 + 4 + 9 + 16$?",
      choices: [
        { text: "$\\sum_{m=1}^{4} m^{2}$", correct: true, explain: "$m^2$ for $m = 1..4$ gives $1,4,9,16$." },
        { text: "$\\sum_{m=1}^{4} 2m$", explain: "That gives $2,4,6,8$, not the perfect squares." },
        { text: "$\\sum_{m=1}^{16} m$", explain: "That adds every integer up to $16$." },
        { text: "$\\sum_{m=1}^{4} m^{3}$", explain: "Cubes give $1,8,27,64$, not $1,4,9,16$." },
      ],
    },
    {
      id: "s-shift-equiv",
      prompt: "Which sum equals $\\sum_{k=1}^{5} k$?",
      choices: [
        { text: "$\\sum_{j=0}^{4} (j + 1)$", correct: true, explain: "Shifting the index down by $1$ and adding $1$ to the summand keeps the same terms $1..5$." },
        { text: "$\\sum_{j=0}^{4} j$", explain: "That gives $0+1+2+3+4 = 10$, missing the shift in the summand." },
        { text: "$\\sum_{j=1}^{5} (j + 1)$", explain: "That gives $2+3+4+5+6 = 20$. The terms are shifted up." },
        { text: "$\\sum_{j=0}^{5} (j + 1)$", explain: "That has $6$ terms ($1..6 = 21$), one too many." },
      ],
    },
    {
      id: "s-const-large",
      prompt: "Evaluate $\\sum_{j=1}^{20} 5$.",
      choices: [
        { text: "100", correct: true, explain: "Constant rule: $n\\,c = 20 \\cdot 5 = 100$." },
        { text: "25", explain: "That is $20 + 5$. The rule is the product $20 \\cdot 5 = 100$." },
        { text: "5", explain: "The $5$ is added once for each of the $20$ terms." },
        { text: "20", explain: "That is just $n$. Multiply by $c$: $20 \\cdot 5 = 100$." },
      ],
    },
    {
      id: "s-factor-eval",
      prompt: "Evaluate $\\sum_{i=1}^{5} 3i$.",
      choices: [
        { text: "45", correct: true, explain: "$3\\sum_{i=1}^{5} i = 3 \\cdot 15 = 45$." },
        { text: "18", explain: "That is $3 + 15$. The $3$ multiplies the whole sum: $3 \\cdot 15$." },
        { text: "15", explain: "That is $\\sum i$. The factor of $3$ scales it to $45$." },
        { text: "30", explain: "That is $2 \\cdot 15$. The constant is $3$, so $3 \\cdot 15 = 45$." },
      ],
    },
    {
      id: "s-split-eval",
      prompt: "Evaluate $\\sum_{k=1}^{4} (2k + 3)$.",
      choices: [
        { text: "32", correct: true, explain: "$2\\sum k + \\sum 3 = 2(10) + 4(3) = 20 + 12 = 32$ (check: $5+7+9+11 = 32$)." },
        { text: "26", explain: "That adds the $3$ only once. It is added to all $4$ terms: $2(10) + 12 = 32$." },
        { text: "23", explain: "That is $2(10) + 3$. The constant contributes $4 \\cdot 3 = 12$." },
        { text: "44", explain: "That doubles the constant part too. $\\sum 3 = 12$, giving $20 + 12 = 32$." },
      ],
    },
    {
      id: "s-wrong-rule",
      prompt: "Which statement is NOT a valid rule of summation?",
      choices: [
        { text: "$\\sum a_k b_k = \\left(\\sum a_k\\right)\\left(\\sum b_k\\right)$", correct: true, explain: "False: the sum of products is not the product of sums (try $a=b=(1,1)$: LHS $2$, RHS $4$)." },
        { text: "$\\sum c\\,a_k = c \\sum a_k$", explain: "Valid: a constant factor pulls out of the sum." },
        { text: "$\\sum (a_k + b_k) = \\sum a_k + \\sum b_k$", explain: "Valid: sums split over addition." },
        { text: "$\\sum_{k=1}^{n} c = n\\,c$", explain: "Valid: a constant summed $n$ times." },
      ],
    },
    {
      id: "s-count-neg",
      prompt: "How many terms are in $\\sum_{m=-2}^{3} m$?",
      choices: [
        { text: "6", correct: true, explain: "$3 - (-2) + 1 = 6$ terms ($m = -2,-1,0,1,2,3$)." },
        { text: "5", explain: "Off by one: subtracting a negative adds, so $3 + 2 + 1 = 6$." },
        { text: "1", explain: "That is $3 + (-2)$. The count is upper $-$ lower $+ 1 = 6$." },
        { text: "4", explain: "Count each integer from $-2$ to $3$: that is $6$ of them." },
      ],
    },
    {
      id: "s-alternating",
      prompt: "Evaluate $\\sum_{i=1}^{3} (-1)^{i}\\,i$.",
      choices: [
        { text: "$-2$", correct: true, explain: "$(-1)^1(1) + (-1)^2(2) + (-1)^3(3) = -1 + 2 - 3 = -2$." },
        { text: "$6$", explain: "That ignores the alternating sign. $(-1)^i$ flips odd terms negative." },
        { text: "$2$", explain: "Signs go $-,+,-$: $-1 + 2 - 3 = -2$, not $+2$." },
        { text: "$0$", explain: "Add carefully: $-1 + 2 - 3 = -2$." },
      ],
    },
    {
      id: "s-ksq-4",
      prompt: "Evaluate $\\sum_{p=1}^{4} p^{2}$.",
      choices: [
        { text: "30", correct: true, explain: "$1 + 4 + 9 + 16 = 30$." },
        { text: "100", explain: "$100 = (1+2+3+4)^2$. That squares the sum, not each term." },
        { text: "20", explain: "Recount the squares: $1+4+9+16 = 30$." },
        { text: "16", explain: "That is only the last term $4^2$. Add all four squares." },
      ],
    },
    {
      id: "s-sum-vs-sq",
      prompt: "Which is $\\sum_{k=1}^{3} k^{2}$ (not $\\left(\\sum_{k=1}^{3} k\\right)^{2}$)?",
      choices: [
        { text: "14", correct: true, explain: "$1 + 4 + 9 = 14$. You square each term first, then add." },
        { text: "36", explain: "$36 = (1+2+3)^2$. That is the square of the sum, a classic mix-up." },
        { text: "6", explain: "That is $\\sum k$ with no squaring." },
        { text: "9", explain: "That is only $3^2$. Add all three squares to get $14$." },
      ],
    },
    {
      id: "s-reindex-value",
      prompt: "Evaluate $\\sum_{j=3}^{6} (j - 2)$.",
      choices: [
        { text: "10", correct: true, explain: "Terms at $j=3,4,5,6$ are $1,2,3,4$: sum $10$." },
        { text: "18", explain: "That is $\\sum j$ for $j=3..6$. You must subtract $2$ from each: $1+2+3+4 = 10$." },
        { text: "8", explain: "That subtracts $2$ only once. Subtract it from each of the $4$ terms." },
        { text: "12", explain: "Recount: $1 + 2 + 3 + 4 = 10$." },
      ],
    },
    {
      id: "s-odds",
      prompt: "Evaluate $\\sum_{i=1}^{5} (2i - 1)$.",
      choices: [
        { text: "25", correct: true, explain: "The first five odd numbers $1,3,5,7,9$ sum to $25$ (which is $5^2$)." },
        { text: "20", explain: "Recount the odds: $1+3+5+7+9 = 25$." },
        { text: "24", explain: "That is $\\sum 2i$ minus $1$ once. Subtract $1$ from each term: $25$." },
        { text: "30", explain: "That is $\\sum 2i = 30$. The $-1$ per term drops it to $25$." },
      ],
    },
    {
      id: "s-single",
      prompt: "Evaluate $\\sum_{m=4}^{4} m^{2}$.",
      choices: [
        { text: "16", correct: true, explain: "One term only ($m=4$): $4^2 = 16$." },
        { text: "0", explain: "It is not empty. $m=4$ is included, giving $16$." },
        { text: "8", explain: "That is $2 \\cdot 4$. The summand is $m^2 = 16$." },
        { text: "30", explain: "That is $\\sum_{m=1}^{4} m^2$. Here the sum starts and ends at $4$." },
      ],
    },
    {
      id: "s-capstone",
      prompt: "Using $\\sum_{k=1}^{n} k = \\dfrac{n(n+1)}{2}$, evaluate $\\sum_{k=1}^{10} k$.",
      choices: [
        { text: "55", correct: true, explain: "$\\dfrac{10 \\cdot 11}{2} = 55$." },
        { text: "45", explain: "That is $\\dfrac{9 \\cdot 10}{2}$, the sum to $9$. Use $n = 10$." },
        { text: "100", explain: "That is $10^2$. The formula gives $\\dfrac{10 \\cdot 11}{2} = 55$." },
        { text: "110", explain: "That is $10 \\cdot 11$. Do not forget to divide by $2$." },
      ],
    },
  ],
};
