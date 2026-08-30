import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "FTA and conjugate root pairs".
 * Grounded in the lesson: the Fundamental Theorem of Algebra promises exactly n
 * complex roots counting multiplicity. With real coefficients, non-real roots
 * come in conjugate pairs a+bi and a-bi (flip only the imaginary sign). A pair
 * builds the real quadratic x^2 - 2ax + (a^2 + b^2). Distractors mine the classic
 * traps: distinct vs multiplicity, flipping the real part, forgetting the forced
 * conjugate, odd counts of non-real roots, and odd-degree real polynomials.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-fta-total-degree7",
      prompt: "The **Fundamental Theorem of Algebra** says a degree $7$ polynomial has exactly how many roots in the complex numbers, counting multiplicity?",
      choices: [
        { text: "$7$", correct: true, explain: "The theorem is exact: a degree $n$ polynomial has exactly $n$ complex roots when you count multiplicity." },
        { text: "At most $7$, sometimes fewer", explain: "That treats it as an upper bound, but the total is always exactly $n$ once complex roots and multiplicity are included." },
        { text: "It depends on the graph", explain: "The count is fixed by the degree, not by how the real graph happens to look." },
        { text: "$14$", explain: "Doubling the degree is wrong. The number of roots equals the degree, which is $7$." },
      ],
    },
    {
      id: "c-fta-statement",
      prompt: "Which statement is exactly what the Fundamental Theorem of Algebra guarantees for a polynomial of degree $n\\ge 1$?",
      choices: [
        { text: "It has exactly $n$ **real** roots", explain: "Requiring all real is too strong: some of the $n$ roots may be non-real complex numbers." },
        { text: "It has at most $n$ roots", explain: "It is not an upper bound: the count is exactly $n$ with multiplicity, never fewer." },
        { text: "It has exactly $n$ roots in the complex numbers, counting multiplicity", correct: true, explain: "This is the theorem word for word: degree $n$ gives exactly $n$ complex roots counted with multiplicity." },
        { text: "It has exactly $n$ **distinct** roots", explain: "Distinct roots can be fewer than $n$. Reaching exactly $n$ needs multiplicity." },
      ],
    },
    {
      id: "c-conj-def",
      prompt: "What is the complex conjugate $\\overline{4+7i}$?",
      choices: [
        { text: "$-4+7i$", explain: "That flips the real part. The conjugate keeps the real part and flips only the imaginary sign." },
        { text: "$4-7i$", correct: true, explain: "Keep the real part $4$ and flip the sign in front of $i$, giving $4-7i$." },
        { text: "$-4-7i$", explain: "That flips both parts, but only the imaginary part changes sign." },
      ],
    },
    {
      id: "c-conj-neg",
      prompt: "Find the conjugate of $-2-5i$.",
      choices: [
        { text: "$2+5i$", explain: "That flips both signs, but the real part $-2$ must stay put." },
        { text: "$2-5i$", explain: "That flips the real part instead of the imaginary part." },
        { text: "$-2-5i$", explain: "That is unchanged. The conjugate must flip the sign of the imaginary part." },
        { text: "$-2+5i$", correct: true, explain: "Keep the real part $-2$ and flip only the imaginary sign to get $-2+5i$." },
      ],
    },
    {
      id: "c-partner-root",
      prompt: "A polynomial with real coefficients has $3+2i$ as a root. Which number is forced to be a root as well?",
      choices: [
        { text: "$3-2i$", correct: true, explain: "Real coefficients force the conjugate, and $\\overline{3+2i}=3-2i$." },
        { text: "$-3+2i$", explain: "That flips the real part. The conjugate flips only the imaginary part." },
        { text: "$-3-2i$", explain: "That negates the whole number rather than taking the conjugate." },
      ],
    },
    {
      id: "c-real-tally",
      prompt: "A degree $4$ polynomial with real coefficients has roots $5$, $-1$, $2+i$, and $2-i$. How many of its roots are **real**?",
      choices: [
        { text: "$4$", explain: "That counts every root as real, but $2+i$ and $2-i$ are non-real." },
        { text: "$0$", explain: "There are real roots here: $5$ and $-1$ sit on the real axis." },
        { text: "$2$", correct: true, explain: "Only $5$ and $-1$ are real. The pair $2\\pm i$ is non-real." },
        { text: "$3$", explain: "Miscount: exactly two roots, $5$ and $-1$, are real." },
      ],
    },
    {
      id: "c-nonreal-even",
      prompt: "For a polynomial with real coefficients, the number of non-real roots is always:",
      choices: [
        { text: "odd", explain: "Non-real roots pair each root with its conjugate, so the count cannot be odd." },
        { text: "even", correct: true, explain: "Each non-real root occurs together with its conjugate, so they arrive in pairs and the total is even." },
        { text: "zero", explain: "There can be non-real roots. They always come in conjugate pairs." },
      ],
    },
    {
      id: "c-pure-imag-partner",
      prompt: "If $6i$ is a root of a polynomial with real coefficients, its conjugate partner is:",
      choices: [
        { text: "$-6i$", correct: true, explain: "Since $6i=0+6i$, flipping the imaginary sign gives $0-6i=-6i$." },
        { text: "$6i$", explain: "That is unchanged. The conjugate must flip the sign of the imaginary part." },
        { text: "$6$", explain: "The partner is not real. The conjugate of $6i$ is $-6i$." },
      ],
    },
    {
      id: "c-real-quadratic",
      prompt: "Which quadratic with real coefficients has exactly the roots $2i$ and $-2i$?",
      choices: [
        { text: "$x^{2}-4$", explain: "That factors as $(x-2)(x+2)$ with real roots $\\pm 2$, not $\\pm 2i$." },
        { text: "$x^{2}+4i$", explain: "A polynomial with real coefficients cannot have an imaginary coefficient like $4i$." },
        { text: "$x^{2}+2$", explain: "Its roots are $\\pm\\sqrt{2}\\,i$, not $\\pm 2i$. The constant must be $2^{2}=4$." },
        { text: "$x^{2}+4$", correct: true, explain: "$(x-2i)(x+2i)=x^{2}-(2i)^{2}=x^{2}+4$, a real quadratic." },
      ],
    },
    {
      id: "c-total-factored",
      prompt: "Counting multiplicity, how many complex roots does $p(x)=(x-1)(x^{2}+4)$ have?",
      choices: [
        { text: "$1$", explain: "That counts only the real root. The factor $x^{2}+4$ contributes two more." },
        { text: "$3$", correct: true, explain: "The degree is $1+2=3$, so there are $3$ roots: $1$, $2i$, and $-2i$." },
        { text: "$2$", explain: "The quadratic adds two roots to the one real root, for three in total." },
        { text: "$4$", explain: "The degree is $1+2=3$, not $4$." },
      ],
    },
    {
      id: "c-nonreal-count",
      prompt: "A degree $5$ polynomial with real coefficients has $3$ real roots (counting multiplicity). How many non-real roots does it have?",
      choices: [
        { text: "$3$", explain: "That repeats the real count. The non-real roots are the remaining $5-3=2$." },
        { text: "$1$", explain: "Non-real roots come in conjugate pairs, so the count must be even, not $1$." },
        { text: "$2$", correct: true, explain: "The total is $5$, so $5-3=2$ roots are non-real, forming one conjugate pair." },
        { text: "$0$", explain: "Here $3$ of the $5$ roots are real, so $2$ non-real roots remain." },
      ],
    },
    {
      id: "c-odd-atleast",
      prompt: "Every odd-degree polynomial with real coefficients has at least how many real roots?",
      choices: [
        { text: "At least $1$", correct: true, explain: "Non-real roots pair up evenly, so an odd degree cannot be filled by pairs alone and must include a real root." },
        { text: "Exactly $0$", explain: "Zero real roots is impossible for odd degree, since the non-real roots come in even-sized pairs." },
        { text: "At least $2$", explain: "Only one real root is guaranteed. An odd degree can have exactly one." },
      ],
    },
    {
      id: "c-conj-how",
      prompt: "Which action correctly produces the complex conjugate of $a+bi$?",
      choices: [
        { text: "Flip the sign of the real part only", explain: "That changes $a$, but the conjugate leaves the real part alone." },
        { text: "Flip the sign of the imaginary part only", correct: true, explain: "The conjugate is $a-bi$: keep $a$ and change the sign in front of $i$." },
        { text: "Flip the signs of both parts", explain: "That gives $-a-bi$, the negative, not the conjugate $a-bi$." },
        { text: "Swap the real and imaginary parts", explain: "Swapping gives $b+ai$, which is unrelated to the conjugate." },
      ],
    },
    {
      id: "c-why-partner",
      prompt: "A polynomial with real coefficients has $2+3i$ as a root. Why must $2-3i$ also be a root?",
      choices: [
        { text: "Because every polynomial is symmetric about the $y$-axis", explain: "Graph symmetry is not the reason. The conjugate root theorem is about real coefficients." },
        { text: "Because the degree must be even", explain: "Degree parity is irrelevant here. The conjugate is forced by the real coefficients." },
        { text: "Because roots always come in positive and negative pairs", explain: "Roots are not forced into $\\pm$ pairs. Only conjugate pairs are, and only with real coefficients." },
        { text: "Because with real coefficients non-real roots come in conjugate pairs", correct: true, explain: "The conjugate root theorem forces $\\overline{2+3i}=2-3i$ to be a root when the coefficients are real." },
      ],
    },
    {
      id: "c-quadratic-imag",
      prompt: "Solve $x^{2}+9=0$ over the complex numbers.",
      choices: [
        { text: "$x=\\pm 3$", explain: "Those solve $x^{2}-9=0$. Here $x^{2}=-9$ needs an imaginary square root." },
        { text: "$x=\\pm 9i$", explain: "Take the square root of $9$, not $81$: $\\sqrt{-9}=3i$, so $x=\\pm 3i$." },
        { text: "$x=\\pm 3i$", correct: true, explain: "$x^{2}=-9$ gives $x=\\pm\\sqrt{-9}=\\pm 3i$, a conjugate pair." },
        { text: "No solutions", explain: "There are no real solutions, but two complex ones, $\\pm 3i$, exist by the theorem." },
      ],
    },
  ],
  summit: [
    {
      id: "s-mult-count",
      prompt: "Counting multiplicity, how many roots does $p(x)=(x-2)^{3}(x+5)$ have?",
      choices: [
        { text: "$2$", explain: "That counts only the distinct roots. Multiplicity makes the total larger." },
        { text: "$4$", correct: true, explain: "The degree is $3+1=4$, so there are $4$ roots: $x=2$ three times and $x=-5$ once." },
        { text: "$3$", explain: "That is only the multiplicity of $x=2$. Add the root $x=-5$ to reach degree $4$." },
        { text: "$5$", explain: "The exponents add to $3+1=4$, not $5$." },
      ],
    },
    {
      id: "s-distinct",
      prompt: "How many **distinct** roots does $p(x)=(x-1)^{2}(x^{2}+4)$ have?",
      choices: [
        { text: "$4$", explain: "That is the count with multiplicity. Distinct roots ignore the repeat of $x=1$." },
        { text: "$2$", explain: "Do not forget that $x^{2}+4$ contributes two distinct roots, $2i$ and $-2i$." },
        { text: "$3$", correct: true, explain: "The distinct roots are $1$, $2i$, and $-2i$. The squared factor lists $1$ only once." },
        { text: "$1$", explain: "There are three distinct roots, not one. Only the value $x=1$ is repeated." },
      ],
    },
    {
      id: "s-reconstruct-quad",
      prompt: "A polynomial with real coefficients has $2+3i$ as a root. Which real quadratic factor does this conjugate pair contribute?",
      choices: [
        { text: "$x^{2}+4x+13$", explain: "The middle term should be $-2ax=-4x$, so the $+4x$ sign is flipped." },
        { text: "$x^{2}-4x+9$", explain: "The constant is $a^{2}+b^{2}=4+9=13$, not just $b^{2}=9$." },
        { text: "$x^{2}-4x-5$", explain: "The constant is $a^{2}+b^{2}=13$, not $a^{2}-b^{2}=-5$." },
        { text: "$x^{2}-4x+13$", correct: true, explain: "For roots $a\\pm bi$ the factor is $x^{2}-2ax+(a^{2}+b^{2})=x^{2}-4x+13$." },
      ],
    },
    {
      id: "s-reconstruct-i",
      prompt: "Which real quadratic factor comes from the conjugate pair $i$ and $-i$?",
      choices: [
        { text: "$x^{2}+1$", correct: true, explain: "$(x-i)(x+i)=x^{2}-i^{2}=x^{2}+1$." },
        { text: "$x^{2}-1$", explain: "That has real roots $\\pm 1$. The pair $\\pm i$ needs a $+1$ constant." },
        { text: "$x^{2}+i$", explain: "A real quadratic cannot carry an imaginary coefficient like $i$." },
        { text: "$x-1$", explain: "That is linear with root $1$. A conjugate pair needs a quadratic factor." },
      ],
    },
    {
      id: "s-least-degree",
      prompt: "What is the least possible degree of a polynomial with real coefficients that has both $2+3i$ and $-4$ as roots?",
      choices: [
        { text: "$2$", explain: "That forgets the forced conjugate $2-3i$, which is a third required root." },
        { text: "$3$", correct: true, explain: "Real coefficients force $2-3i$ too, so the roots $2+3i$, $2-3i$, and $-4$ need degree $3$." },
        { text: "$4$", explain: "Three roots are required, so degree $3$ suffices. A fourth root is not forced." },
        { text: "$1$", explain: "A single linear factor cannot hold a non-real root of a real polynomial." },
      ],
    },
    {
      id: "s-odd-atleast",
      prompt: "A degree $5$ polynomial with real coefficients must have at least how many real roots?",
      choices: [
        { text: "$0$", explain: "Zero is impossible: five roots cannot all pair into conjugates, so one must be real." },
        { text: "$2$", explain: "Only one real root is guaranteed. The other four could form two conjugate pairs." },
        { text: "$1$", correct: true, explain: "Non-real roots come in pairs, so an odd degree leaves at least one real root." },
        { text: "$5$", explain: "All five need not be real. Up to four can be non-real in two pairs." },
      ],
    },
    {
      id: "s-even-max-nonreal",
      prompt: "What is the greatest number of non-real roots a degree $6$ polynomial with real coefficients can have?",
      choices: [
        { text: "$6$", correct: true, explain: "All six can be non-real as three conjugate pairs, for example $(x^{2}+1)(x^{2}+4)(x^{2}+9)$." },
        { text: "$5$", explain: "Five is odd, but non-real roots come in pairs, so the count must be even." },
        { text: "$4$", explain: "You can do better: three conjugate pairs give six non-real roots." },
        { text: "$3$", explain: "Three is odd and too small. Six non-real roots are possible." },
      ],
    },
    {
      id: "s-tally-degree7",
      prompt: "A degree $7$ polynomial with real coefficients has exactly $4$ non-real roots (two conjugate pairs). How many real roots does it have, counting multiplicity?",
      choices: [
        { text: "$4$", explain: "That repeats the non-real count. The real roots are the remaining $7-4=3$." },
        { text: "$1$", explain: "One is only the odd-degree minimum. Here $7-4=3$ real roots remain." },
        { text: "$2$", explain: "That leaves a root unaccounted for. $7-4=3$ real roots are needed." },
        { text: "$3$", correct: true, explain: "The total is $7$, so $7-4=3$ roots are real." },
      ],
    },
    {
      id: "s-impossible",
      prompt: "Which situation is **impossible** for a polynomial with real coefficients?",
      choices: [
        { text: "A degree $4$ polynomial with exactly $1$ non-real root", correct: true, explain: "Non-real roots come in conjugate pairs, so their count is even and can never be exactly $1$." },
        { text: "A degree $4$ polynomial with $2$ non-real roots", explain: "That is fine: one conjugate pair plus two real roots." },
        { text: "A degree $3$ polynomial with $2$ non-real roots", explain: "That is fine: one conjugate pair plus one real root." },
        { text: "A degree $5$ polynomial with $4$ non-real roots", explain: "That is fine: two conjugate pairs plus one real root." },
      ],
    },
    {
      id: "s-conj-realpart-trap",
      prompt: "Real coefficients force a partner root for $-5+2i$. That partner is:",
      choices: [
        { text: "$5+2i$", explain: "That flips the real part. The conjugate flips only the imaginary part." },
        { text: "$5-2i$", explain: "That flips both parts, but the real part $-5$ must stay." },
        { text: "$-5-2i$", correct: true, explain: "Keep the real part $-5$ and flip the imaginary sign: $\\overline{-5+2i}=-5-2i$." },
        { text: "$-2+5i$", explain: "That swaps the parts. The conjugate keeps $-5$ as the real part." },
      ],
    },
    {
      id: "s-needs-real-coef",
      prompt: "If a polynomial does **not** have all real coefficients, must the conjugate of a non-real root also be a root?",
      choices: [
        { text: "Yes, for every polynomial", explain: "The conjugate root theorem needs real coefficients. Without them the guarantee is lost." },
        { text: "No, the conjugate pair guarantee holds only when the coefficients are real", correct: true, explain: "The theorem's hypothesis is real coefficients, so it does not apply to something like $x-i$, whose only root is $i$." },
        { text: "Yes, as long as the degree is even", explain: "Degree parity does not matter. The missing condition is real coefficients." },
        { text: "Only if the root is purely imaginary", explain: "The kind of root is irrelevant. The theorem requires real coefficients." },
      ],
    },
    {
      id: "s-constant-term",
      prompt: "A monic real quadratic has roots $3+2i$ and $3-2i$. What is its constant term?",
      choices: [
        { text: "$13$", correct: true, explain: "The constant equals the product of the roots, $(3+2i)(3-2i)=9+4=13$." },
        { text: "$5$", explain: "That is $a^{2}-b^{2}=9-4$. The product of a conjugate pair is $a^{2}+b^{2}=13$." },
        { text: "$-13$", explain: "The product $(3+2i)(3-2i)$ is positive $13$, since $-(2i)^{2}=+4$." },
        { text: "$12$", explain: "That is $2ab$. The constant is $a^{2}+b^{2}=13$." },
      ],
    },
    {
      id: "s-middle-term",
      prompt: "For the monic real quadratic with roots $3+2i$ and $3-2i$, written $x^{2}+cx+13$, the coefficient $c$ is:",
      choices: [
        { text: "$6$", explain: "That is the sum of the roots. The middle coefficient is the **negative** of the sum." },
        { text: "$-6$", correct: true, explain: "The sum of the roots is $6$, and $c=-2a=-6$." },
        { text: "$-12$", explain: "That doubles the value. $c=-2a=-2(3)=-6$." },
        { text: "$0$", explain: "The imaginary parts cancel, but the real parts add to $6$, so $c=-6$, not $0$." },
      ],
    },
    {
      id: "s-mult-degree-build",
      prompt: "A polynomial with real coefficients has a double root at $x=1$ and a root at $2-i$. What is its least possible degree?",
      choices: [
        { text: "$3$", explain: "That forgets the forced conjugate $2+i$. Adding it to the double root gives degree $4$." },
        { text: "$2$", explain: "A double root alone is degree $2$. The non-real root and its conjugate add two more." },
        { text: "$4$", correct: true, explain: "Count $x=1$ twice, plus $2-i$ and its forced conjugate $2+i$: $2+1+1=4$." },
        { text: "$5$", explain: "Only four roots are forced. Nothing requires a fifth." },
      ],
    },
    {
      id: "s-graph-nonreal",
      prompt: "A degree $4$ polynomial with real coefficients has a graph that never touches the $x$-axis. How many non-real roots does it have, counting multiplicity?",
      choices: [
        { text: "$0$", explain: "No x-intercepts means no real roots, so none of the four roots are real." },
        { text: "$2$", explain: "With no real roots at all, four (not just two) of the roots must be non-real." },
        { text: "$4$", correct: true, explain: "No x-intercepts means $0$ real roots, so all $4$ roots are non-real, in two conjugate pairs." },
        { text: "It cannot happen", explain: "It can: for example $(x^{2}+1)(x^{2}+4)$ has degree $4$ and no real roots." },
      ],
    },
  ],
};
