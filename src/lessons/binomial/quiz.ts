import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for the binomial theorem. Grounded in the
 * lesson: (a+b)^n = sum_{k=0}^{n} C(n,k) a^(n-k) b^k, coefficients read from row n
 * of Pascal's triangle, the power of a falls while the power of b rises (summing
 * to n), row n has n+1 terms, and (a-b)^n alternates signs. Distractors are the
 * standard traps: using n terms instead of n+1, reading the wrong row, dropping
 * the coefficient, swapping which exponent falls, sign slips on (a-b)^n, and
 * miscomputing C(n,k). Every coefficient below is verified by hand.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-def",
      prompt: "The binomial coefficient $\\binom{n}{k}$ equals:",
      choices: [
        { text: "$\\dfrac{n!}{k!\\,(n-k)!}$", correct: true, explain: "By definition $\\binom{n}{k} = \\dfrac{n!}{k!\\,(n-k)!}$, the same number you read off row $n$, position $k$." },
        { text: "$\\dfrac{n!}{k!}$", explain: "This forgets the $(n-k)!$ in the denominator, so it overcounts." },
        { text: "$\\dfrac{k!\\,(n-k)!}{n!}$", explain: "This is the reciprocal. $\\binom{n}{k}$ is a whole number at least $1$, not a fraction below $1$." },
        { text: "$\\dfrac{n!}{k! + (n-k)!}$", explain: "The denominator is a product $k!\\,(n-k)!$, not a sum." },
      ],
    },
    {
      id: "c-terms5",
      prompt: "How many terms are in the expansion of $(a+b)^5$?",
      choices: [
        { text: "6", correct: true, explain: "Row $n$ has $n + 1$ entries, so $(a+b)^5$ has $5 + 1 = 6$ terms." },
        { text: "5", explain: "This uses $n$ itself. The count is $n + 1 = 6$." },
        { text: "7", explain: "That is $n + 2$. Each expansion has exactly $n + 1$ terms." },
        { text: "10", explain: "That is not the term count. $(a+b)^5$ has $5 + 1 = 6$ terms." },
      ],
    },
    {
      id: "c-row4",
      prompt: "Row $4$ of Pascal's triangle (rows counted from $0$) is:",
      choices: [
        { text: "$1, 4, 6, 4, 1$", correct: true, explain: "Row $4$ is $1, 4, 6, 4, 1$. The interior $6$ is $3 + 3$ from row $3$." },
        { text: "$1, 3, 3, 1$", explain: "That is row $3$. Counting rows from $0$, row $4$ is one further down." },
        { text: "$1, 4, 4, 1$", explain: "The middle entry is $\\binom{4}{2} = 6$, not $4$." },
        { text: "$1, 5, 10, 10, 5, 1$", explain: "That is row $5$. Row $4$ has only $5$ entries." },
      ],
    },
    {
      id: "c-recurrence",
      prompt: "In Pascal's triangle, each interior entry equals:",
      choices: [
        { text: "the sum of the two entries directly above it", correct: true, explain: "The recurrence $\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}$ says each entry is the sum of the two above it." },
        { text: "the product of the two entries above it", explain: "It is a sum, not a product. $3 + 3 = 6$, not $3 \\times 3 = 9$." },
        { text: "the sum of every entry in the row above it", explain: "Only the two directly above matter, not the whole row." },
        { text: "always equal to $n$", explain: "Entries vary across a row (like $1, 4, 6, 4, 1$). They are not all $n$." },
      ],
    },
    {
      id: "c-c52",
      prompt: "Compute $\\binom{5}{2}$.",
      choices: [
        { text: "10", correct: true, explain: "$\\binom{5}{2} = \\dfrac{5!}{2!\\,3!} = \\dfrac{120}{2 \\cdot 6} = 10$, the third entry of row $5$." },
        { text: "20", explain: "That is $5 \\cdot 4$. You still must divide by $2! = 2$ to get $10$." },
        { text: "15", explain: "$\\binom{5}{2} = 10$. $15$ is $\\binom{6}{2}$, a different row." },
        { text: "25", explain: "That is $5^2$. The binomial coefficient is $\\dfrac{5!}{2!\\,3!} = 10$." },
      ],
    },
    {
      id: "c-coeff-a2b",
      prompt: "In $(a+b)^3$, the coefficient of the $a^2 b$ term is:",
      choices: [
        { text: "3", correct: true, explain: "The $a^2 b$ term has $k = 1$, so its coefficient is $\\binom{3}{1} = 3$." },
        { text: "1", explain: "$1$ is $\\binom{3}{0}$, the coefficient of $a^3$, not $a^2 b$." },
        { text: "2", explain: "Read the coefficient from row $3$ ($1, 3, 3, 1$): the $a^2 b$ term is $3$." },
        { text: "6", explain: "$6$ appears in row $4$, not row $3$. Here the coefficient is $\\binom{3}{1} = 3$." },
      ],
    },
    {
      id: "c-firstterm",
      prompt: "The first term (at $k = 0$) of $(a+b)^n$ is:",
      choices: [
        { text: "$a^n$", correct: true, explain: "At $k = 0$, $\\binom{n}{0} a^{n} b^{0} = 1 \\cdot a^n \\cdot 1 = a^n$." },
        { text: "$b^n$", explain: "$b^n$ is the last term (at $k = n$), not the first." },
        { text: "$a^n b^n$", explain: "Each term has $b$ to the power $k = 0$ here, so $b$ does not appear." },
        { text: "$n a$", explain: "The coefficient is $\\binom{n}{0} = 1$ and the power is $a^n$, giving $a^n$." },
      ],
    },
    {
      id: "c-sum-exp",
      prompt: "In a term $\\binom{n}{k}\\, a^{\\,n-k} b^{\\,k}$, the exponents on $a$ and $b$ add up to:",
      choices: [
        { text: "$n$", correct: true, explain: "$(n - k) + k = n$, so the exponents always sum to $n$." },
        { text: "$k$", explain: "$k$ is only the exponent on $b$. The total is $(n - k) + k = n$." },
        { text: "$n - k$", explain: "That is only the exponent on $a$. Adding $k$ back gives $n$." },
        { text: "$n + 1$", explain: "$n + 1$ is the number of terms, not the sum of exponents." },
      ],
    },
    {
      id: "c-expand-x1cubed",
      prompt: "$(x+1)^3$ equals:",
      choices: [
        { text: "$x^3 + 3x^2 + 3x + 1$", correct: true, explain: "Row $3$ is $1, 3, 3, 1$. With $b = 1$ every power of $1$ is $1$, giving $x^3 + 3x^2 + 3x + 1$." },
        { text: "$x^3 + 1$", explain: "This drops the two middle terms $3x^2$ and $3x$." },
        { text: "$x^3 + 3x^2 + 3x$", explain: "This drops the last term $\\binom{3}{3}(1)^3 = 1$." },
        { text: "$3x^3 + 3x^2 + 3x + 3$", explain: "The coefficients are $1, 3, 3, 1$, not $3, 3, 3, 3$." },
      ],
    },
    {
      id: "c-which-falls",
      prompt: "Writing $(a+b)^n$ from $k = 0$ to $k = n$, which exponent decreases from term to term?",
      choices: [
        { text: "the exponent on $a$, from $n$ down to $0$", correct: true, explain: "The power of $a$ is $n - k$, which falls $n, n-1, \\ldots, 0$ as $k$ grows." },
        { text: "the exponent on $b$", explain: "The power of $b$ is $k$, which rises $0, 1, \\ldots, n$. It increases." },
        { text: "both exponents", explain: "They move oppositely: $a$ falls while $b$ rises, keeping the sum at $n$." },
        { text: "neither, they stay equal", explain: "They are equal only in the middle term. In general $a$ falls and $b$ rises." },
      ],
    },
    {
      id: "c-coeff6",
      prompt: "In $(a+b)^4$, the term whose coefficient is $6$ is:",
      choices: [
        { text: "$6a^2 b^2$", correct: true, explain: "The $6$ is $\\binom{4}{2}$ (at $k = 2$), so the powers are $a^{4-2} b^{2} = a^2 b^2$." },
        { text: "$6a^3 b$", explain: "The $a^3 b$ term has coefficient $\\binom{4}{1} = 4$, not $6$." },
        { text: "$6a b^3$", explain: "The $a b^3$ term has coefficient $\\binom{4}{3} = 4$, not $6$." },
        { text: "$6a^4$", explain: "The $a^4$ term has coefficient $\\binom{4}{0} = 1$. The $6$ goes with $a^2 b^2$." },
      ],
    },
    {
      id: "c-sign-x1cubed",
      prompt: "$(x-1)^3$ equals:",
      choices: [
        { text: "$x^3 - 3x^2 + 3x - 1$", correct: true, explain: "Take $b = -1$: the signs alternate $+, -, +, -$, giving $x^3 - 3x^2 + 3x - 1$." },
        { text: "$x^3 + 3x^2 + 3x + 1$", explain: "That is $(x+1)^3$. With $-1$ the odd powers of $b$ turn negative." },
        { text: "$x^3 - 3x^2 - 3x - 1$", explain: "Only the odd-$k$ terms flip sign. $(-1)^2 = +1$ keeps $+3x$ positive." },
        { text: "$-x^3 + 3x^2 - 3x + 1$", explain: "The leading $x^3$ term is $(+1)x^3$. The signs are $+, -, +, -$." },
      ],
    },
    {
      id: "c-symmetry",
      prompt: "Using the symmetry $\\binom{n}{k} = \\binom{n}{n-k}$, which equals $\\binom{7}{5}$?",
      choices: [
        { text: "$\\binom{7}{2}$", correct: true, explain: "$n - k = 7 - 5 = 2$, so $\\binom{7}{5} = \\binom{7}{2} = 21$." },
        { text: "$\\binom{7}{3}$", explain: "That would need $n - k = 3$, but $7 - 5 = 2$. $\\binom{7}{3} = 35 \\neq 21$." },
        { text: "$\\binom{7}{6}$", explain: "$\\binom{7}{6} = 7$, not $21$. The partner of $5$ is $7 - 5 = 2$." },
        { text: "$\\binom{5}{2}$", explain: "Symmetry keeps the top number $n = 7$ fixed. Only $k$ reflects to $n - k$." },
      ],
    },
    {
      id: "c-coeff-x2-x1-4",
      prompt: "In $(x+1)^4$, the coefficient of $x^2$ is:",
      choices: [
        { text: "6", correct: true, explain: "The $x^2$ term has $k = 2$, so its coefficient is $\\binom{4}{2} = 6$ (row $4$: $1, 4, 6, 4, 1$)." },
        { text: "4", explain: "$4$ is $\\binom{4}{1}$ or $\\binom{4}{3}$. The $x^2$ term is $\\binom{4}{2} = 6$." },
        { text: "1", explain: "$1$ is $\\binom{4}{0}$, the coefficient of $x^4$, not $x^2$." },
        { text: "12", explain: "There is no $12$ in row $4$. The coefficient is $\\binom{4}{2} = 6$." },
      ],
    },
    {
      id: "c-last",
      prompt: "The last term (at $k = n$) of $(a+b)^n$ is:",
      choices: [
        { text: "$b^n$", correct: true, explain: "At $k = n$, $\\binom{n}{n} a^{0} b^{n} = 1 \\cdot 1 \\cdot b^n = b^n$." },
        { text: "$a^n$", explain: "$a^n$ is the first term (at $k = 0$), not the last." },
        { text: "$n b$", explain: "The coefficient is $\\binom{n}{n} = 1$ and the power is $b^n$, giving $b^n$." },
        { text: "$1$", explain: "It is $1 \\cdot b^n = b^n$. The $b^n$ stays unless $b$ is a number." },
      ],
    },
  ],
  summit: [
    {
      id: "s-x2cubed",
      prompt: "Expand $(x+2)^3$.",
      choices: [
        { text: "$x^3 + 6x^2 + 12x + 8$", correct: true, explain: "Row $3$ ($1, 3, 3, 1$) with rising powers of $2$: $x^3 + 3x^2(2) + 3x(4) + 8 = x^3 + 6x^2 + 12x + 8$." },
        { text: "$x^3 + 3x^2 + 3x + 8$", explain: "This forgets to raise the $2$ on the middle terms. Each needs a factor $2^k$." },
        { text: "$x^3 + 6x^2 + 6x + 8$", explain: "The $x$ term is $3x \\cdot 2^2 = 12x$, not $6x$." },
        { text: "$x^3 + 8$", explain: "This drops both middle terms $6x^2$ and $12x$." },
      ],
    },
    {
      id: "s-coeff-x3y2",
      prompt: "In $(x+y)^5$, the coefficient of $x^3 y^2$ is:",
      choices: [
        { text: "10", correct: true, explain: "The power of $y$ is $k = 2$, so the coefficient is $\\binom{5}{2} = 10$." },
        { text: "5", explain: "$5 = \\binom{5}{1}$ (the $x^4 y$ term). For $x^3 y^2$ use $\\binom{5}{2} = 10$." },
        { text: "20", explain: "There is no $20$ in row $5$ ($1, 5, 10, 10, 5, 1$). It is $\\binom{5}{2} = 10$." },
        { text: "15", explain: "$15$ is in row $6$, not row $5$. The coefficient is $\\binom{5}{2} = 10$." },
      ],
    },
    {
      id: "s-b3term",
      prompt: "Which is the term containing $b^3$ in $(a+b)^5$?",
      choices: [
        { text: "$10\\,a^2 b^3$", correct: true, explain: "At $k = 3$: $\\binom{5}{3} = 10$ and $a^{5-3} = a^2$, giving $10 a^2 b^3$." },
        { text: "$10\\,a^3 b^2$", explain: "This swaps the exponents. With $b^3$ the power of $a$ is $5 - 3 = 2$." },
        { text: "$5\\,a^2 b^3$", explain: "The coefficient is $\\binom{5}{3} = 10$, not $5$." },
        { text: "$20\\,a^2 b^3$", explain: "$\\binom{5}{3} = 10$. There is no $20$ in row $5$." },
      ],
    },
    {
      id: "s-sign-x1-4",
      prompt: "$(x-1)^4$ equals:",
      choices: [
        { text: "$x^4 - 4x^3 + 6x^2 - 4x + 1$", correct: true, explain: "With $b = -1$ the signs alternate $+, -, +, -, +$ over row $4$ ($1, 4, 6, 4, 1$)." },
        { text: "$x^4 + 4x^3 + 6x^2 + 4x + 1$", explain: "That is $(x+1)^4$. The odd-power-of-$b$ terms should be negative." },
        { text: "$x^4 - 4x^3 - 6x^2 - 4x - 1$", explain: "Even powers of $-1$ are positive, so $+6x^2$ and $+1$ stay positive." },
        { text: "$x^4 - 4x^3 + 6x^2 - 4x - 1$", explain: "The last term is $(-1)^4 = +1$, not $-1$." },
      ],
    },
    {
      id: "s-neg-terms",
      prompt: "In the expansion of $(a-b)^6$, which terms are negative?",
      choices: [
        { text: "the terms with an odd power of $b$", correct: true, explain: "Each term carries $(-1)^k$. It is negative exactly when $k$ (the power of $b$) is odd." },
        { text: "the terms with an even power of $b$", explain: "$(-1)^k$ is positive for even $k$, so even powers of $b$ stay positive." },
        { text: "every term", explain: "The terms with even $k$ (like $a^6$ and $15 a^4 b^2$) are positive." },
        { text: "the terms with an odd power of $a$", explain: "The sign depends on the power of $b$ (the negated part), not the power of $a$." },
      ],
    },
    {
      id: "s-terms10",
      prompt: "How many terms are in the expansion of $(a+b)^{10}$?",
      choices: [
        { text: "11", correct: true, explain: "Row $n$ has $n + 1$ entries, so $(a+b)^{10}$ has $10 + 1 = 11$ terms." },
        { text: "10", explain: "This uses $n$ itself. Remember to add one, $10 + 1 = 11$." },
        { text: "12", explain: "That is $n + 2$. The count is exactly $n + 1 = 11$." },
        { text: "9", explain: "That is $n - 1$. Each expansion has $n + 1 = 11$ terms." },
      ],
    },
    {
      id: "s-c63",
      prompt: "Compute $\\binom{6}{3}$.",
      choices: [
        { text: "20", correct: true, explain: "$\\binom{6}{3} = \\dfrac{6!}{3!\\,3!} = \\dfrac{720}{6 \\cdot 6} = 20$, the middle of row $6$." },
        { text: "120", explain: "$120 = 6 \\cdot 5 \\cdot 4$. You still divide by $3! = 6$ to get $20$." },
        { text: "18", explain: "$\\binom{6}{3} = 20$. $18$ does not appear in row $6$." },
        { text: "15", explain: "$15 = \\binom{6}{2}$. The center entry $\\binom{6}{3}$ is $20$." },
      ],
    },
    {
      id: "s-largest6",
      prompt: "The largest coefficient in the expansion of $(a+b)^6$ is:",
      choices: [
        { text: "20", correct: true, explain: "Row $6$ is $1, 6, 15, 20, 15, 6, 1$. The largest, in the middle, is $\\binom{6}{3} = 20$." },
        { text: "15", explain: "$15 = \\binom{6}{2}$, but the middle entry $20$ is larger." },
        { text: "6", explain: "$6 = \\binom{6}{1}$. The coefficients peak in the middle at $20$." },
        { text: "64", explain: "$64 = 2^6$ is the sum of all the coefficients, not any single one." },
      ],
    },
    {
      id: "s-wrongrow",
      prompt: "To expand $(a+b)^4$, which row of Pascal's triangle gives the coefficients?",
      choices: [
        { text: "row $4$: $1, 4, 6, 4, 1$", correct: true, explain: "$(a+b)^n$ uses row $n$, so $(a+b)^4$ uses row $4$: $1, 4, 6, 4, 1$." },
        { text: "row $3$: $1, 3, 3, 1$", explain: "Counting rows from $0$, row $3$ belongs to $(a+b)^3$." },
        { text: "row $5$: $1, 5, 10, 10, 5, 1$", explain: "Row $5$ belongs to $(a+b)^5$. It has too many entries for a power of $4$." },
        { text: "row $4$: $1, 4, 4, 1$", explain: "The middle entry is $\\binom{4}{2} = 6$, so row $4$ is $1, 4, 6, 4, 1$." },
      ],
    },
    {
      id: "s-2x1-3-x2",
      prompt: "In $(2x+1)^3$, the coefficient of $x^2$ is:",
      choices: [
        { text: "12", correct: true, explain: "The $x^2$ term comes from $\\binom{3}{1}(2x)^2(1) = 3 \\cdot 4x^2 = 12x^2$." },
        { text: "6", explain: "This uses $3 \\cdot 2$. You must square the $2$: $(2x)^2 = 4x^2$, giving $3 \\cdot 4 = 12$." },
        { text: "3", explain: "This is only $\\binom{3}{1}$. The factor $(2)^2 = 4$ must be included." },
        { text: "8", explain: "$8 = 2^3$. The $x^2$ coefficient is $\\binom{3}{1}\\,2^2 = 12$." },
      ],
    },
    {
      id: "s-x-2-4-const",
      prompt: "In $(x-2)^4$, the constant term is:",
      choices: [
        { text: "16", correct: true, explain: "The constant is the $k = 4$ term: $\\binom{4}{4}(-2)^4 = 1 \\cdot 16 = 16$." },
        { text: "$-16$", explain: "$(-2)^4$ is positive because the exponent $4$ is even, so the term is $+16$." },
        { text: "8", explain: "$(-2)^4 = 16$, not $8$. The constant term is $16$." },
        { text: "$-8$", explain: "The exponent is even, so the sign is positive and the value is $16$." },
      ],
    },
    {
      id: "s-x3-4-x2",
      prompt: "In $(x+3)^4$, the term containing $x^2$ is:",
      choices: [
        { text: "$54x^2$", correct: true, explain: "The $x^2$ term is $\\binom{4}{2} x^2 (3)^2 = 6 \\cdot 9 \\cdot x^2 = 54x^2$." },
        { text: "$6x^2$", explain: "This forgets $(3)^2 = 9$. Multiply $6 \\cdot 9 = 54$." },
        { text: "$18x^2$", explain: "This uses $6 \\cdot 3$. The constant must be squared, $6 \\cdot 3^2 = 54$." },
        { text: "$36x^2$", explain: "This uses the wrong coefficient. It is $\\binom{4}{2} = 6$, giving $6 \\cdot 9 = 54$." },
      ],
    },
    {
      id: "s-symm85",
      prompt: "Using $\\binom{n}{k} = \\binom{n}{n-k}$, which equals $\\binom{8}{5}$?",
      choices: [
        { text: "$\\binom{8}{3}$", correct: true, explain: "$n - k = 8 - 5 = 3$, so $\\binom{8}{5} = \\binom{8}{3} = 56$." },
        { text: "$\\binom{8}{2}$", explain: "$\\binom{8}{2} = 28$. The partner of $5$ is $8 - 5 = 3$." },
        { text: "$\\binom{5}{3}$", explain: "Symmetry keeps the top number $8$ fixed. Only $k$ reflects." },
        { text: "$\\binom{8}{6}$", explain: "$\\binom{8}{6} = 28$, not $56$. The correct partner is $\\binom{8}{3}$." },
      ],
    },
    {
      id: "s-general",
      prompt: "The general term (the term for index $k$) in the expansion of $(a+b)^n$ is:",
      choices: [
        { text: "$\\binom{n}{k}\\, a^{\\,n-k} b^{\\,k}$", correct: true, explain: "This is exactly the binomial theorem's term: coefficient $\\binom{n}{k}$, $a$ falling, $b$ rising." },
        { text: "$\\binom{n}{k}\\, a^{\\,k} b^{\\,n-k}$", explain: "The exponents are swapped. The power of $a$ is $n - k$ and of $b$ is $k$." },
        { text: "$\\binom{n}{k}\\, a^{\\,n-k} b^{\\,n-k}$", explain: "Both powers cannot be $n - k$. The exponents must add to $n$." },
        { text: "$\\binom{n}{k}\\, a^{\\,n} b^{\\,k}$", explain: "The power of $a$ must fall to $n - k$. Leaving it at $n$ makes the exponents exceed $n$." },
      ],
    },
    {
      id: "s-2x-1-cubed",
      prompt: "Expand $(2x-1)^3$.",
      choices: [
        { text: "$8x^3 - 12x^2 + 6x - 1$", correct: true, explain: "$(2x)^3 - 3(2x)^2 + 3(2x) - 1 = 8x^3 - 12x^2 + 6x - 1$ (row $3$ with alternating signs)." },
        { text: "$8x^3 + 12x^2 + 6x + 1$", explain: "The $-1$ makes the odd-power terms negative. The signs alternate." },
        { text: "$8x^3 - 12x^2 - 6x - 1$", explain: "The $+3(2x)$ term is positive because $(-1)^2 = +1$: it is $+6x$." },
        { text: "$2x^3 - 12x^2 + 6x - 1$", explain: "The leading term is $(2x)^3 = 8x^3$, not $2x^3$." },
      ],
    },
  ],
};
