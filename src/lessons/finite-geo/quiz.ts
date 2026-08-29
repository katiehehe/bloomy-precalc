import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for finite geometric series. Grounded in
 * the lesson: a geometric sequence has a constant common ratio r (found by
 * dividing consecutive terms), a_n = a_1 r^(n-1), and the finite sum is
 * S_n = a_1 (1 - r^n) / (1 - r) for r != 1. Distractors are the standard traps:
 * using the arithmetic-sum formula n(a_1 + a_n)/2, a sign slip in 1 - r when
 * r > 1, writing r^(n-1) instead of r^n inside the formula, calling r a
 * difference, off-by-one term counts, and confusing a finite sum with its
 * infinite limit. Every sum below is verified by hand.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-ratio-1",
      prompt: "What is the common ratio $r$ of $3, 6, 12, 24$?",
      choices: [
        { text: "$2$", correct: true, explain: "Divide consecutive terms: $\\tfrac{6}{3} = \\tfrac{12}{6} = 2$." },
        { text: "$3$", explain: "That is the difference $6 - 3$; the ratio comes from dividing, not subtracting." },
        { text: "$\\tfrac{1}{2}$", explain: "That divides the wrong way ($\\tfrac{3}{6}$); take later over earlier, $\\tfrac{6}{3} = 2$." },
        { text: "$4$", explain: "Not a ratio of these terms; $\\tfrac{6}{3} = 2$ every step." },
      ],
    },
    {
      id: "c-ratio-2",
      prompt: "What is the common ratio $r$ of $8, 4, 2, 1$?",
      choices: [
        { text: "$-4$", explain: "That is the difference $4 - 8$; the ratio divides, giving $\\tfrac{4}{8} = \\tfrac{1}{2}$." },
        { text: "$2$", explain: "That divides earlier over later; use later over earlier, $\\tfrac{4}{8} = \\tfrac{1}{2}$." },
        { text: "$\\tfrac{1}{2}$", correct: true, explain: "Each term is half the last: $\\tfrac{4}{8} = \\tfrac{2}{4} = \\tfrac{1}{2}$." },
        { text: "$\\tfrac{1}{4}$", explain: "That skips a term; consecutive terms give $\\tfrac{1}{2}$." },
      ],
    },
    {
      id: "c-nth-term",
      prompt: "With $a_1 = 3$ and $r = 2$, use $a_n = a_1 r^{\\,n-1}$ to find $a_5$.",
      choices: [
        { text: "$48$", correct: true, explain: "$a_5 = 3 \\cdot 2^{5-1} = 3 \\cdot 2^4 = 3 \\cdot 16 = 48$." },
        { text: "$96$", explain: "That uses $2^5$; the exponent is $n - 1 = 4$, not $n$." },
        { text: "$24$", explain: "That is $a_4 = 3 \\cdot 2^3$; for $a_5$ the exponent is $4$." },
        { text: "$13$", explain: "That looks like arithmetic ($3 + 2 \\cdot 5$); geometric multiplies, giving $48$." },
      ],
    },
    {
      id: "c-geo-vs-arith",
      prompt: "Which of these is a geometric sequence?",
      choices: [
        { text: "$2, 4, 6, 8$", explain: "That is arithmetic: a constant difference of $2$, not a constant ratio." },
        { text: "$2, 4, 8, 16$", correct: true, explain: "Each term is $2$ times the last, a constant ratio $r = 2$." },
        { text: "$1, 4, 9, 16$", explain: "Those are perfect squares; the ratios $\\tfrac{4}{1}, \\tfrac{9}{4}$ are not equal." },
        { text: "$2, 5, 10, 17$", explain: "The ratios $\\tfrac{5}{2}, \\tfrac{10}{5}$ differ, so it is not geometric." },
      ],
    },
    {
      id: "c-count",
      prompt: "How many terms are in the sum $5 + 10 + 20 + 40 + 80$?",
      choices: [
        { text: "$5$", correct: true, explain: "Count them: $5, 10, 20, 40, 80$ is five terms, so $n = 5$." },
        { text: "$4$", explain: "That misses one; there are five terms listed." },
        { text: "$6$", explain: "That over-counts; only five terms are written." },
        { text: "$16$", explain: "That is $\\tfrac{80}{5}$, not a term count; $n = 5$." },
      ],
    },
    {
      id: "c-small-sum",
      prompt: "Evaluate $3 + 6 + 12$ (here $a_1 = 3$, $r = 2$, $n = 3$).",
      choices: [
        { text: "$21$", correct: true, explain: "$\\dfrac{3(1 - 2^3)}{1 - 2} = \\dfrac{3(-7)}{-1} = 21$ (and $3 + 6 + 12 = 21$)." },
        { text: "$24$", explain: "That is $3 \\cdot 2^3$, a single term value, not the sum $21$." },
        { text: "$18$", explain: "That adds $3 + 6 + 9$ as if arithmetic; the terms are $3, 6, 12$, summing to $21$." },
        { text: "$42$", explain: "That doubles the sum; $3 + 6 + 12 = 21$." },
      ],
    },
    {
      id: "c-exponent",
      prompt: "In $S_n = \\dfrac{a_1(1 - r^{\\,n})}{1 - r}$, the exponent on $r$ in the numerator is:",
      choices: [
        { text: "$n$, the number of terms", correct: true, explain: "The numerator uses $r^{\\,n}$, matching the count of terms." },
        { text: "$n - 1$", explain: "$r^{\\,n-1}$ appears in the last term $a_n$, but the sum formula uses $r^{\\,n}$." },
        { text: "the ratio $r$ itself", explain: "The exponent is a count $n$, not the value $r$." },
        { text: "$1$ always", explain: "It is $r^{\\,n}$; only when $n = 1$ would the exponent be $1$." },
      ],
    },
    {
      id: "c-sum-example",
      prompt: "Evaluate $2 + 6 + 18 + 54$ (here $a_1 = 2$, $r = 3$, $n = 4$).",
      choices: [
        { text: "$112$", explain: "That is the arithmetic formula $\\tfrac{4(2 + 54)}{2}$; this series is geometric, giving $80$." },
        { text: "$80$", correct: true, explain: "$\\dfrac{2(1 - 3^4)}{1 - 3} = \\dfrac{2(-80)}{-2} = 80$ (and $2 + 6 + 18 + 54 = 80$)." },
        { text: "$-80$", explain: "A sign slip: dividing $-160$ by $-2$ gives $+80$, since a negative over a negative is positive." },
        { text: "$162$", explain: "That is $2 \\cdot 3^4$, a term value, not the sum." },
      ],
    },
    {
      id: "c-sum-frac",
      prompt: "Evaluate $4 + 2 + 1$ (here $a_1 = 4$, $r = \\tfrac{1}{2}$, $n = 3$).",
      choices: [
        { text: "$7$", correct: true, explain: "$\\dfrac{4\\left(1 - (\\tfrac{1}{2})^3\\right)}{1 - \\tfrac{1}{2}} = \\dfrac{4 \\cdot \\tfrac{7}{8}}{\\tfrac{1}{2}} = 7$ (and $4 + 2 + 1 = 7$)." },
        { text: "$7.5$", explain: "That includes a fourth term ($+\\tfrac{1}{2}$); with only $n = 3$ terms the sum is $7$." },
        { text: "$8$", explain: "That is the infinite limit $\\tfrac{a_1}{1 - r} = \\tfrac{4}{1/2}$; a finite $3$-term sum is $7$." },
        { text: "$6$", explain: "Recount: $4 + 2 + 1 = 7$, not $6$." },
      ],
    },
    {
      id: "c-first-term",
      prompt: "What is the first term $a_1$ of the series $7 + 14 + 28 + 56$?",
      choices: [
        { text: "$14$", explain: "That is the second term; $a_1$ is the one you start from, $7$." },
        { text: "$7$", correct: true, explain: "The first term written is $7$, so $a_1 = 7$ (and $r = \\tfrac{14}{7} = 2$)." },
        { text: "$56$", explain: "That is the last term $a_4$, not the first." },
        { text: "$2$", explain: "That is the common ratio $r$, not the first term." },
      ],
    },
    {
      id: "c-ratio-neg",
      prompt: "What is the common ratio $r$ of $1, -2, 4, -8$?",
      choices: [
        { text: "$-2$", correct: true, explain: "$\\tfrac{-2}{1} = \\tfrac{4}{-2} = \\tfrac{-8}{4} = -2$; the sign alternates because $r < 0$." },
        { text: "$2$", explain: "That drops the sign; the ratio is $-2$, which flips the sign each step." },
        { text: "$-3$", explain: "That is the difference $-2 - 1$; use division, giving $-2$." },
        { text: "$\\tfrac{1}{2}$", explain: "That inverts the ratio; later over earlier is $\\tfrac{-2}{1} = -2$." },
      ],
    },
    {
      id: "c-restriction",
      prompt: "The formula $S_n = \\dfrac{a_1(1 - r^{\\,n})}{1 - r}$ is valid when:",
      choices: [
        { text: "$r \\neq 1$", correct: true, explain: "We divided by $1 - r$, so $r = 1$ is not allowed (then every term is $a_1$ and $S_n = n a_1$)." },
        { text: "$r = 1$", explain: "That is exactly the excluded case: $1 - r = 0$ makes the denominator zero." },
        { text: "$r > 0$ only", explain: "Negative and fractional ratios are fine; only $r = 1$ is barred." },
        { text: "always, with no restriction", explain: "There is one restriction: $r \\neq 1$, or the denominator is zero." },
      ],
    },
    {
      id: "c-sum-r2",
      prompt: "Evaluate $5 + 10 + 20 + 40$ (here $a_1 = 5$, $r = 2$, $n = 4$).",
      choices: [
        { text: "$90$", explain: "That is the arithmetic formula $\\tfrac{4(5 + 40)}{2}$; this series is geometric, giving $75$." },
        { text: "$75$", correct: true, explain: "$\\dfrac{5(1 - 2^4)}{1 - 2} = \\dfrac{5(-15)}{-1} = 75$ (and $5 + 10 + 20 + 40 = 75$)." },
        { text: "$80$", explain: "That is $5 \\cdot 2^4$, a term value, not the sum." },
        { text: "$150$", explain: "That doubles the sum; $5 + 10 + 20 + 40 = 75$." },
      ],
    },
    {
      id: "c-count-2",
      prompt: "How many terms are in $1 + 3 + 9 + 27 + 81 + 243$?",
      choices: [
        { text: "$6$", correct: true, explain: "Six terms are listed, so $n = 6$." },
        { text: "$5$", explain: "Off by one: count each term, there are six." },
        { text: "$7$", explain: "That over-counts; only six terms appear." },
        { text: "$243$", explain: "That is the last term, not the number of terms." },
      ],
    },
    {
      id: "c-ratio-half",
      prompt: "For the sequence $100, 50, 25, \\ldots$, the common ratio is:",
      choices: [
        { text: "$-50$", explain: "That is the difference $50 - 100$; divide instead: $\\tfrac{50}{100} = \\tfrac{1}{2}$." },
        { text: "$2$", explain: "That inverts the ratio; later over earlier is $\\tfrac{50}{100} = \\tfrac{1}{2}$." },
        { text: "$\\tfrac{1}{2}$", correct: true, explain: "Each term is half the last: $\\tfrac{50}{100} = \\tfrac{25}{50} = \\tfrac{1}{2}$." },
        { text: "$25$", explain: "That is the third term, not the ratio." },
      ],
    },
  ],
  summit: [
    {
      id: "s-sum-r3",
      prompt: "Evaluate $3 + 9 + 27 + 81$ (here $a_1 = 3$, $r = 3$, $n = 4$).",
      choices: [
        { text: "$120$", correct: true, explain: "$\\dfrac{3(1 - 3^4)}{1 - 3} = \\dfrac{3(-80)}{-2} = 120$ (and $3 + 9 + 27 + 81 = 120$)." },
        { text: "$168$", explain: "That is the arithmetic formula $\\tfrac{4(3 + 81)}{2}$; this series is geometric, giving $120$." },
        { text: "$-120$", explain: "A sign slip: $\\tfrac{-240}{-2} = +120$, a negative over a negative." },
        { text: "$243$", explain: "That is $3 \\cdot 3^4 = 3^5$, a term value, not the sum." },
      ],
    },
    {
      id: "s-sum-neg",
      prompt: "Evaluate $1 - 3 + 9 - 27$ (here $a_1 = 1$, $r = -3$, $n = 4$).",
      choices: [
        { text: "$-20$", correct: true, explain: "$\\dfrac{1 - (-3)^4}{1 - (-3)} = \\dfrac{1 - 81}{4} = \\dfrac{-80}{4} = -20$ (and $1 - 3 + 9 - 27 = -20$)." },
        { text: "$40$", explain: "That adds the absolute values $1 + 3 + 9 + 27$; the signs alternate, giving $-20$." },
        { text: "$20$", explain: "A sign slip: the sum is negative, $-20$." },
        { text: "$-80$", explain: "That is only the numerator $1 - (-3)^4$; you still divide by $1 - (-3) = 4$." },
      ],
    },
    {
      id: "s-which-not-geo",
      prompt: "Which sum should NOT be evaluated with the geometric formula?",
      choices: [
        { text: "$4 + 8 + 12 + 16$", correct: true, explain: "This is arithmetic (constant difference $4$), so use $\\tfrac{n(a_1 + a_n)}{2}$, not the geometric formula." },
        { text: "$4 + 8 + 16 + 32$", explain: "Geometric with $r = 2$; the geometric formula applies." },
        { text: "$3 + 9 + 27$", explain: "Geometric with $r = 3$; the geometric formula applies." },
        { text: "$5 + 15 + 45$", explain: "Geometric with $r = 3$; the geometric formula applies." },
      ],
    },
    {
      id: "s-sign-r4",
      prompt: "Evaluate $2 + 8 + 32 + 128$ (here $a_1 = 2$, $r = 4$, $n = 4$).",
      choices: [
        { text: "$170$", correct: true, explain: "$\\dfrac{2(1 - 4^4)}{1 - 4} = \\dfrac{2(-255)}{-3} = \\dfrac{-510}{-3} = 170$ (and $2 + 8 + 32 + 128 = 170$)." },
        { text: "$-170$", explain: "A sign slip: both $1 - 4^4$ and $1 - 4$ are negative, so the quotient is positive $170$." },
        { text: "$260$", explain: "That is the arithmetic formula $\\tfrac{4(2 + 128)}{2}$; this series is geometric." },
        { text: "$512$", explain: "That is $2 \\cdot 4^4$, a term value, not the sum." },
      ],
    },
    {
      id: "s-large-n",
      prompt: "For $a_1 = 1$, $r = 2$ the sum is $S_n = 2^{\\,n} - 1$. Find $S_{10}$.",
      choices: [
        { text: "$1024$", explain: "That is $2^{10}$; the formula subtracts $1$, giving $1023$." },
        { text: "$1023$", correct: true, explain: "$2^{10} - 1 = 1024 - 1 = 1023$." },
        { text: "$511$", explain: "That is $2^9 - 1 = S_9$; here $n = 10$." },
        { text: "$100$", explain: "That is roughly a linear guess; the sum doubles each step to $1023$." },
      ],
    },
    {
      id: "s-fraction-4",
      prompt: "Evaluate $4 + 2 + 1 + \\tfrac{1}{2}$ (here $a_1 = 4$, $r = \\tfrac{1}{2}$, $n = 4$).",
      choices: [
        { text: "$\\tfrac{15}{2}$", correct: true, explain: "$\\dfrac{4\\left(1 - (\\tfrac{1}{2})^4\\right)}{1 - \\tfrac{1}{2}} = \\dfrac{4 \\cdot \\tfrac{15}{16}}{\\tfrac{1}{2}} = \\tfrac{15}{2} = 7.5$ (and $4 + 2 + 1 + 0.5 = 7.5$)." },
        { text: "$8$", explain: "That is the infinite limit $\\tfrac{a_1}{1 - r} = \\tfrac{4}{1/2}$; a finite $4$-term sum is $\\tfrac{15}{2}$." },
        { text: "$7$", explain: "That is only the first three terms; include the $\\tfrac{1}{2}$ for $n = 4$." },
        { text: "$\\tfrac{31}{4}$", explain: "Recompute: $4 + 2 + 1 + \\tfrac{1}{2} = \\tfrac{15}{2}$, not $\\tfrac{31}{4}$." },
      ],
    },
    {
      id: "s-solve-n-63",
      prompt: "For $a_1 = 1$, $r = 2$ (so $S_n = 2^{\\,n} - 1$), which $n$ gives a sum of $63$?",
      choices: [
        { text: "$6$", correct: true, explain: "$2^{\\,n} - 1 = 63 \\Rightarrow 2^{\\,n} = 64 \\Rightarrow n = 6$." },
        { text: "$5$", explain: "$n = 5$ gives $2^5 - 1 = 31$, not $63$." },
        { text: "$7$", explain: "$n = 7$ gives $2^7 - 1 = 127$; too many terms." },
        { text: "$32$", explain: "That is $2^5$; solve $2^{\\,n} = 64$ to get $n = 6$." },
      ],
    },
    {
      id: "s-nth-term",
      prompt: "With $a_1 = 2$ and $r = 3$, find the fifth term $a_5 = a_1 r^{\\,n-1}$.",
      choices: [
        { text: "$486$", explain: "That uses $3^5$; the exponent for $a_5$ is $n - 1 = 4$." },
        { text: "$162$", correct: true, explain: "$a_5 = 2 \\cdot 3^{4} = 2 \\cdot 81 = 162$." },
        { text: "$54$", explain: "That is $a_4 = 2 \\cdot 3^3$; for $a_5$ the exponent is $4$." },
        { text: "$30$", explain: "That looks arithmetic ($2 + 3 \\cdot \\ldots$); geometric multiplies, giving $162$." },
      ],
    },
    {
      id: "s-choose-formula",
      prompt: "Which expression correctly computes $6 + 12 + 24 + 48 + 96$?",
      choices: [
        { text: "$\\dfrac{6(1 - 2^{5})}{1 - 2}$", correct: true, explain: "$a_1 = 6$, $r = 2$, $n = 5$: $\\dfrac{6(1 - 32)}{-1} = 186$ (and the terms sum to $186$)." },
        { text: "$\\dfrac{6(1 - 2^{4})}{1 - 2}$", explain: "That uses $n = 4$ and gives $90$, the sum of only four terms." },
        { text: "$\\dfrac{6(1 - 2^{5})}{2 - 1}$", explain: "The denominator is $1 - r = -1$, not $2 - 1$; this flips the sign to $-186$." },
        { text: "$\\dfrac{5(6 + 96)}{2}$", explain: "That is the arithmetic formula, which does not apply to a geometric series." },
      ],
    },
    {
      id: "s-fraction-half",
      prompt: "Evaluate $\\tfrac{1}{2} + \\tfrac{1}{4} + \\tfrac{1}{8} + \\tfrac{1}{16}$ (here $a_1 = \\tfrac{1}{2}$, $r = \\tfrac{1}{2}$, $n = 4$).",
      choices: [
        { text: "$\\tfrac{15}{16}$", correct: true, explain: "$\\dfrac{\\tfrac{1}{2}\\left(1 - (\\tfrac{1}{2})^4\\right)}{1 - \\tfrac{1}{2}} = 1 - \\tfrac{1}{16} = \\tfrac{15}{16}$ (and the four terms sum to $0.9375$)." },
        { text: "$1$", explain: "That is the infinite limit $\\tfrac{a_1}{1 - r} = \\tfrac{1/2}{1/2}$; the finite $4$-term sum is $\\tfrac{15}{16}$." },
        { text: "$\\tfrac{31}{32}$", explain: "That is the $5$-term sum; here $n = 4$, giving $\\tfrac{15}{16}$." },
        { text: "$\\tfrac{1}{2}$", explain: "That is only the first term; add all four to get $\\tfrac{15}{16}$." },
      ],
    },
    {
      id: "s-alternating",
      prompt: "Evaluate $2 - 4 + 8 - 16 + 32$ (here $a_1 = 2$, $r = -2$, $n = 5$).",
      choices: [
        { text: "$22$", correct: true, explain: "$\\dfrac{2(1 - (-2)^5)}{1 - (-2)} = \\dfrac{2(1 + 32)}{3} = \\dfrac{66}{3} = 22$ (and $2 - 4 + 8 - 16 + 32 = 22$)." },
        { text: "$62$", explain: "That adds absolute values $2 + 4 + 8 + 16 + 32$; the signs alternate, giving $22$." },
        { text: "$-22$", explain: "A sign slip: $(-2)^5 = -32$, so the numerator is $2(1 + 32) = 66$, a positive $22$." },
        { text: "$-42$", explain: "Recompute: $(-2)^5 = -32$ makes $1 - (-32) = 33$, giving $22$." },
      ],
    },
    {
      id: "s-word",
      prompt: "A colony doubles each hour, starting at $10$. What is the total $10 + 20 + 40 + 80$ over four hours?",
      choices: [
        { text: "$180$", explain: "That is the arithmetic formula $\\tfrac{4(10 + 80)}{2}$; doubling is geometric, giving $150$." },
        { text: "$150$", correct: true, explain: "$\\dfrac{10(1 - 2^4)}{1 - 2} = \\dfrac{10(-15)}{-1} = 150$ (and $10 + 20 + 40 + 80 = 150$)." },
        { text: "$160$", explain: "That is $10 \\cdot 2^4$, a term value, not the running total." },
        { text: "$300$", explain: "That doubles the sum; the four-hour total is $150$." },
      ],
    },
    {
      id: "s-sign-concept",
      prompt: "For which ratios is the denominator $1 - r$ positive?",
      choices: [
        { text: "$r < 1$", correct: true, explain: "$1 - r > 0$ exactly when $r < 1$ (this includes negatives and proper fractions)." },
        { text: "$r > 1$", explain: "Then $1 - r < 0$; the numerator $1 - r^{\\,n}$ is also negative, so the sum still comes out right." },
        { text: "$r = 1$", explain: "Then $1 - r = 0$, which is undefined, not positive." },
        { text: "$r > 0$", explain: "A fraction like $r = 2$ is positive yet gives $1 - r < 0$; the true condition is $r < 1$." },
      ],
    },
    {
      id: "s-solve-n-121",
      prompt: "A geometric series has $a_1 = 1$, $r = 3$, and sum $121$. How many terms $n$ are there?",
      choices: [
        { text: "$5$", correct: true, explain: "$\\dfrac{1 - 3^{\\,n}}{1 - 3} = 121 \\Rightarrow 3^{\\,n} = 243 \\Rightarrow n = 5$ (and $1 + 3 + 9 + 27 + 81 = 121$)." },
        { text: "$4$", explain: "$n = 4$ gives $1 + 3 + 9 + 27 = 40$, not $121$." },
        { text: "$6$", explain: "$n = 6$ gives $364$; solve $3^{\\,n} = 243$ to get $n = 5$." },
        { text: "$243$", explain: "That is $3^5$; the number of terms is the exponent, $n = 5$." },
      ],
    },
    {
      id: "s-capstone",
      prompt: "Evaluate $3 + 6 + 12 + 24 + 48$ (here $a_1 = 3$, $r = 2$, $n = 5$).",
      choices: [
        { text: "$93$", correct: true, explain: "$\\dfrac{3(1 - 2^5)}{1 - 2} = \\dfrac{3(-31)}{-1} = 93$ (and $3 + 6 + 12 + 24 + 48 = 93$)." },
        { text: "$96$", explain: "That is $3 \\cdot 2^5$, a term value, not the sum." },
        { text: "$45$", explain: "That treats it as arithmetic with difference $3$ ($3 + 6 + 9 + 12 + 15$); the ratio is $2$." },
        { text: "$186$", explain: "That doubles the sum; $3 + 6 + 12 + 24 + 48 = 93$." },
      ],
    },
  ],
};
