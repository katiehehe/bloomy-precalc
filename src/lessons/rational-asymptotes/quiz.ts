import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Horizontal and slant asymptotes".
 * Grounded in the lesson: end behavior of a rational function p(x)/q(x) is set by
 * comparing the degrees n and m. n < m gives a horizontal asymptote y = 0. n = m
 * gives y = (leading coefficient ratio). n = m + 1 gives a slant asymptote (the
 * division quotient, remainder dropped). n > m + 1 gives neither. Distractors are
 * the classic traps: confusing horizontal with vertical asymptotes, using constant
 * terms instead of leading coefficients, keeping the remainder, and off-by-one on
 * the degree comparison.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-ha-def",
      prompt: "The **horizontal asymptote** of a rational function tells you:",
      choices: [
        { text: "the value $y$ approaches as $x\\to\\pm\\infty$ (its end behavior)", correct: true, explain: "A horizontal asymptote is exactly the height the graph settles toward far to the left and far to the right." },
        { text: "the vertical wall where the function is undefined", explain: "That describes a vertical asymptote, a wall, not the end behavior of the graph." },
        { text: "where the graph crosses the x-axis", explain: "That is an x-intercept, found from the numerator's zeros, not an asymptote." },
        { text: "the largest output the function can reach", explain: "An asymptote is a value the ends approach, not a maximum the function attains." },
      ],
    },
    {
      id: "c-lt-m",
      prompt: "For $f(x)=\\dfrac{3x+2}{x^2+5}$, the numerator degree is $1$ and the denominator degree is $2$. The horizontal asymptote is:",
      choices: [
        { text: "$y=3$", explain: "The leading-coefficient ratio $3/1$ only applies when the degrees are equal, which they are not here." },
        { text: "$y=0$", correct: true, explain: "When the numerator degree is smaller, the denominator grows faster, so the fraction approaches $0$." },
        { text: "$y=\\dfrac{2}{5}$", explain: "Those are the constant terms. End behavior depends on the leading terms, not the constants." },
        { text: "there is none", explain: "There is an asymptote here, namely $y=0$. A smaller numerator degree always gives that." },
      ],
    },
    {
      id: "c-eq-deg",
      prompt: "For $f(x)=\\dfrac{2x^2+1}{x^2+1}$, the degrees are equal. The horizontal asymptote is:",
      choices: [
        { text: "$y=1$", explain: "Those are the constant terms $1/1$. Use the leading coefficients instead." },
        { text: "$y=0$", explain: "$y=0$ is for a smaller numerator degree, but here the degrees match." },
        { text: "$y=2$", correct: true, explain: "With equal degrees the asymptote is the ratio of leading coefficients, $2/1=2$." },
        { text: "there is none", explain: "Equal degrees always give a horizontal asymptote, so one exists." },
      ],
    },
    {
      id: "c-eq-ratio",
      prompt: "The horizontal asymptote of $f(x)=\\dfrac{3x^2+3}{6x^2+7}$ is:",
      choices: [
        { text: "$y=\\dfrac{1}{2}$", correct: true, explain: "Equal degrees give the leading-coefficient ratio $3/6=\\dfrac{1}{2}$." },
        { text: "$y=2$", explain: "That inverts the ratio, which is numerator over denominator $3/6$, not the reverse." },
        { text: "$y=\\dfrac{3}{7}$", explain: "Those are the constant terms. The asymptote uses the leading coefficients." },
        { text: "$y=0$", explain: "$y=0$ needs a smaller numerator degree, but the degrees are equal here." },
      ],
    },
    {
      id: "c-leading-terms",
      prompt: "For very large $x$, why does $\\dfrac{5x^2+9}{x^2-4}$ approach $y=5$?",
      choices: [
        { text: "The $+9$ and $-4$ constants dominate as $x$ grows.", explain: "The opposite is true: next to $x^2$, the constants become negligible for large $x$." },
        { text: "The leading $x^2$ terms dominate, so the ratio nears $\\dfrac{5x^2}{x^2}=5$.", correct: true, explain: "For very large $x$ the highest-degree terms dominate the rest, leaving $5x^2/x^2=5$." },
        { text: "The graph follows the slant line $y=x$.", explain: "A slant line appears only when the numerator degree is one more than the denominator degree, not with equal degrees." },
      ],
    },
    {
      id: "c-slant-when",
      prompt: "A rational function has a **slant** (oblique) asymptote exactly when:",
      choices: [
        { text: "the numerator and denominator have equal degree", explain: "Equal degrees give a horizontal asymptote, not a slant." },
        { text: "the numerator degree is less than the denominator degree", explain: "A smaller numerator degree gives the horizontal asymptote $y=0$." },
        { text: "the numerator degree is two or more above the denominator degree", explain: "Then the ends follow a higher-degree curve, so there is no straight slant asymptote." },
        { text: "the numerator degree is exactly one more than the denominator degree", correct: true, explain: "Dividing then leaves a linear quotient plus a remainder that vanishes, which is the slant line." },
      ],
    },
    {
      id: "c-slant-div",
      prompt: "Divide to find the slant asymptote of $g(x)=\\dfrac{x^2+1}{x}$.",
      choices: [
        { text: "$y=x$", correct: true, explain: "Division gives $x+\\dfrac{1}{x}$, and $\\dfrac{1}{x}\\to 0$, so the line is $y=x$." },
        { text: "$y=x+\\dfrac{1}{x}$", explain: "Drop the remainder term $\\dfrac{1}{x}$. The asymptote is just the quotient." },
        { text: "$y=0$", explain: "A horizontal asymptote needs the numerator degree at most the denominator degree, but here it is larger." },
        { text: "$y=x+1$", explain: "The quotient is $x$ with remainder $\\dfrac{1}{x}$, not $x+1$." },
      ],
    },
    {
      id: "c-drop-remainder",
      prompt: "Long division gives $\\dfrac{x^2+3x+5}{x+1}=x+2+\\dfrac{3}{x+1}$. The slant asymptote is:",
      choices: [
        { text: "$y=x+2+\\dfrac{3}{x+1}$", explain: "Keep only the quotient. The remainder $\\dfrac{3}{x+1}$ fades to $0$ and is not part of the line." },
        { text: "$y=x$", explain: "Do not drop the $+2$. The whole quotient $x+2$ is the asymptote." },
        { text: "$y=x+2$", correct: true, explain: "The slant asymptote is the quotient $x+2$, since $\\dfrac{3}{x+1}\\to 0$ for large $x$." },
        { text: "$y=3$", explain: "The $3$ is the remainder's numerator, not a horizontal asymptote." },
      ],
    },
    {
      id: "c-find-slant-line",
      prompt: "Find the slant asymptote of $g(x)=\\dfrac{2x^2+3x-1}{x}$.",
      choices: [
        { text: "$y=2x+3-\\dfrac{1}{x}$", explain: "That still carries the remainder $-\\dfrac{1}{x}$. Drop it to get the asymptote." },
        { text: "$y=2x+3$", correct: true, explain: "Dividing by $x$ gives $2x+3-\\dfrac{1}{x}$, and the $-\\dfrac{1}{x}$ vanishes, leaving $y=2x+3$." },
        { text: "$y=2x$", explain: "Do not drop the $+3$. The full quotient is $2x+3$." },
        { text: "$y=x$", explain: "Divide each term by $x$: $2x^2/x=2x$, so the leading term is $2x$, not $x$." },
      ],
    },
    {
      id: "c-none",
      prompt: "$f(x)=\\dfrac{x^3+1}{x+2}$ has a numerator degree of $3$ and a denominator degree of $1$. Its end behavior is:",
      choices: [
        { text: "a slant asymptote", explain: "A slant needs the numerator exactly one degree higher. Here it is two higher." },
        { text: "a horizontal asymptote at $y=1$", explain: "A horizontal asymptote needs equal degrees, and it would not be the constant ratio anyway." },
        { text: "a horizontal asymptote at $y=0$", explain: "$y=0$ requires a smaller numerator degree, but the numerator is larger here." },
        { text: "neither a horizontal nor a slant asymptote", correct: true, explain: "With the numerator two degrees higher, the ends follow a curve (like $x^2$), so no straight-line asymptote exists." },
      ],
    },
    {
      id: "c-ha-vs-va",
      prompt: "How do a **horizontal** asymptote and a **vertical** asymptote differ?",
      choices: [
        { text: "The horizontal one is the end behavior as $x\\to\\pm\\infty$. The vertical one is a wall where the function grows without bound.", correct: true, explain: "End behavior appears far to the left and right (horizontal), while a wall sits where the denominator is zero (vertical)." },
        { text: "They are two names for the same line.", explain: "They are different features: one describes the ends, the other a blow-up at a specific x-value." },
        { text: "The horizontal one is a wall the graph can never touch.", explain: "That mixes them up. The untouchable wall is the vertical asymptote." },
        { text: "The vertical one shows the value $y$ settles to far out.", explain: "Far-out settling is the horizontal asymptote, not the vertical one." },
      ],
    },
    {
      id: "c-cross-ha",
      prompt: "Can a graph ever cross its horizontal asymptote?",
      choices: [
        { text: "No, a graph can never touch a horizontal asymptote.", explain: "That restriction really applies to vertical asymptotes, since a curve may cross its horizontal asymptote in the middle." },
        { text: "Yes, it can cross in the middle and still level off toward it at the far ends.", correct: true, explain: "A horizontal asymptote only controls end behavior, so the curve can cross it near the center." },
        { text: "No, all asymptotes are untouchable walls.", explain: "Only vertical asymptotes are untouchable. Horizontal ones can be crossed." },
        { text: "Only when the function has no vertical asymptote.", explain: "Crossing the horizontal asymptote does not depend on whether a vertical asymptote exists." },
      ],
    },
    {
      id: "c-y0-valid",
      prompt: "Which function has the horizontal asymptote $y=0$?",
      choices: [
        { text: "$\\dfrac{7x^2}{x^2+1}$", explain: "Equal degrees give $y=7/1=7$, not $0$." },
        { text: "$\\dfrac{x^3}{x^2+1}$", explain: "The numerator degree is one higher, so this has a slant asymptote, not $y=0$." },
        { text: "$\\dfrac{7}{x^2+1}$", correct: true, explain: "The numerator degree $0$ is below the denominator degree $2$, so the graph is squeezed to $y=0$." },
        { text: "$\\dfrac{x^2+1}{7}$", explain: "This is a polynomial (degree 2), which has no horizontal asymptote at all." },
      ],
    },
    {
      id: "c-eq-neg",
      prompt: "The horizontal asymptote of $f(x)=\\dfrac{-3x^2+x}{x^2-2}$ is:",
      choices: [
        { text: "$y=-3$", correct: true, explain: "Equal degrees give the leading-coefficient ratio $-3/1=-3$, keeping the sign." },
        { text: "$y=3$", explain: "Do not drop the sign. The numerator's leading term is $-3x^2$, so the ratio is $-3$." },
        { text: "$y=0$", explain: "$y=0$ is for a smaller numerator degree, but the degrees match here." },
        { text: "there is none", explain: "Equal degrees always give a horizontal asymptote, so one exists." },
      ],
    },
    {
      id: "c-always-ha",
      prompt: "True or false: every rational function has a horizontal asymptote.",
      choices: [
        { text: "True, every rational function levels off to a horizontal line.", explain: "This is false, because a numerator degree above the denominator degree gives a slant or a higher-degree end, not a horizontal line." },
        { text: "False, it may instead have a slant asymptote or neither, depending on the degrees.", correct: true, explain: "Only a numerator degree at most equal to the denominator degree gives a horizontal asymptote. Otherwise there is a slant or neither." },
        { text: "True, the horizontal asymptote is always $y=0$.", explain: "$y=0$ holds only when the numerator degree is smaller, not in general." },
        { text: "False, no rational function has a horizontal asymptote.", explain: "Many do: any time the numerator degree is at most the denominator degree." },
      ],
    },
  ],
  summit: [
    {
      id: "s-degrees-true",
      prompt: "For $f(x)=\\dfrac{3x^2+2}{x^2-9}$, which statement is true?",
      choices: [
        { text: "Its end behavior is a horizontal asymptote at $y=3$.", correct: true, explain: "Equal degrees give the leading-coefficient ratio $3/1=3$." },
        { text: "It has a slant asymptote because the numerator degree is larger.", explain: "The degrees are equal, so there is no slant and the numerator is not larger." },
        { text: "The horizontal asymptote is $y=0$.", explain: "$y=0$ needs a smaller numerator degree, but here the degrees match." },
        { text: "The horizontal asymptote is $y=\\dfrac{2}{-9}$.", explain: "Those are the constant terms. Use the leading coefficients for end behavior." },
      ],
    },
    {
      id: "s-slant-monomial",
      prompt: "The lesson writes $\\dfrac{x^2+1}{x} = x + \\dfrac{1}{x}$. The slant asymptote is:",
      choices: [
        { text: "$y = x$", correct: true, explain: "The quotient is $x$ and the remainder $\\dfrac{1}{x}$ vanishes as $|x|$ grows, so the line is $y = x$." },
        { text: "$y = x + \\dfrac{1}{x}$", explain: "That is the function itself. Drop the remainder. The asymptote is only the quotient $y = x$." },
        { text: "$y = 0$", explain: "The numerator is one degree higher, so the end behavior is a slant, not the $x$-axis." },
        { text: "$y = 1$", explain: "Equal degrees would give a horizontal line. Here the numerator degree is larger, so the slant is $y = x$." },
      ],
    },
    {
      id: "s-offbyone",
      prompt: "A student says $\\dfrac{x^2+1}{x^2-4}$ has a slant asymptote because it is quadratic over quadratic. Are they right?",
      choices: [
        { text: "No, equal degrees give a horizontal asymptote (here $y=1$), not a slant.", correct: true, explain: "A slant needs the numerator exactly one degree higher. Equal degrees give the ratio $1/1=1$." },
        { text: "Yes, any quadratic over quadratic slants.", explain: "Equal degrees never slant. They level off to the leading-coefficient ratio." },
        { text: "No, it has neither a horizontal nor a slant asymptote.", explain: "Equal degrees do give a horizontal asymptote, namely $y=1$." },
        { text: "Yes, the slant is $y=x$.", explain: "There is no slant here. The end behavior is the horizontal line $y=1$." },
      ],
    },
    {
      id: "s-classify-neither",
      prompt: "Classify the end-behavior asymptote of $h(x)=\\dfrac{x^4+2}{x^2+1}$.",
      choices: [
        { text: "A horizontal asymptote $y=1$.", explain: "A horizontal asymptote needs equal degrees, but the numerator degree is higher." },
        { text: "A horizontal asymptote $y=0$.", explain: "$y=0$ needs a smaller numerator degree, but here the numerator is larger." },
        { text: "A slant asymptote $y=x^2$.", explain: "A slant asymptote must be a straight line, and $x^2$ is a parabola, not a line." },
        { text: "Neither a horizontal nor a slant asymptote.", correct: true, explain: "The numerator degree is two higher, so the ends follow a parabola and no straight-line asymptote exists." },
      ],
    },
    {
      id: "s-remainder-2",
      prompt: "Polynomial division gives $\\dfrac{3x^2+x+2}{x+1}=3x-2+\\dfrac{4}{x+1}$. The oblique asymptote is:",
      choices: [
        { text: "$y=4$", explain: "The $4$ is the remainder's numerator, not a horizontal asymptote." },
        { text: "$y=3x-2+\\dfrac{4}{x+1}$", explain: "Keep only the quotient. The remainder $\\dfrac{4}{x+1}$ fades to $0$." },
        { text: "$y=3x-2$", correct: true, explain: "The oblique asymptote is the quotient $3x-2$, since $\\dfrac{4}{x+1}\\to 0$ for large $x$." },
        { text: "$y=3x$", explain: "Do not drop the constant. The full quotient is $3x-2$." },
      ],
    },
    {
      id: "s-cross-true",
      prompt: "Which statement about crossing asymptotes is true?",
      choices: [
        { text: "A graph can cross its horizontal asymptote but never crosses a vertical asymptote.", correct: true, explain: "The horizontal one only governs the ends, so the middle may cross it, while a vertical wall can never be crossed." },
        { text: "A graph can never cross either kind of asymptote.", explain: "It can cross a horizontal asymptote. Only vertical ones are truly uncrossable." },
        { text: "A graph can cross a vertical asymptote but not a horizontal one.", explain: "This is backwards: vertical walls are uncrossable, horizontal ones can be crossed." },
        { text: "A graph always crosses its horizontal asymptote exactly once.", explain: "It may cross zero, one, or several times, or not at all. There is no fixed count." },
      ],
    },
    {
      id: "s-y0-which",
      prompt: "Which function has the horizontal asymptote $y=0$?",
      choices: [
        { text: "$\\dfrac{2x^2-1}{x^2+x+1}$", explain: "Equal degrees give $y=2/1=2$, not $0$." },
        { text: "$\\dfrac{2x-1}{x^2+x+1}$", correct: true, explain: "The numerator degree $1$ is below the denominator degree $2$, so the ends approach $y=0$." },
        { text: "$\\dfrac{2x^3}{x^2+1}$", explain: "The numerator degree is higher, so this has a slant, not $y=0$." },
        { text: "$\\dfrac{x^2+1}{2x-1}$", explain: "The numerator degree is larger, giving a slant asymptote, so there is no horizontal asymptote." },
      ],
    },
    {
      id: "s-higher-parabola",
      prompt: "$f(x)=\\dfrac{2x^3+1}{x-1}$. Its end behavior is best described as:",
      choices: [
        { text: "like a parabola, with no horizontal or slant asymptote", correct: true, explain: "The numerator degree is two higher and $2x^3/x=2x^2$, so the ends bend like a parabola with no straight-line asymptote." },
        { text: "a slant line $y=2x^2$", explain: "A slant asymptote must be a straight line, and $2x^2$ is a parabola, not a line." },
        { text: "a horizontal asymptote $y=2$", explain: "A horizontal asymptote needs equal degrees, but the numerator degree is much larger." },
        { text: "a slant asymptote found by dropping the remainder", explain: "Dividing here leaves a quadratic quotient, not a linear one, so it is not a slant asymptote." },
      ],
    },
    {
      id: "s-neg-leading",
      prompt: "The horizontal asymptote of $f(x)=\\dfrac{1-4x^2}{2x^2+3}$ is:",
      choices: [
        { text: "$y=\\dfrac{1}{3}$", explain: "Those are the constant terms. The asymptote uses the leading coefficients, not the constants." },
        { text: "$y=2$", explain: "That dropped the sign. The leading terms are $-4x^2$ over $2x^2$." },
        { text: "$y=0$", explain: "$y=0$ needs a smaller numerator degree, but the degrees are equal here." },
        { text: "$y=-2$", correct: true, explain: "Reorder the numerator as $-4x^2+1$. The leading-coefficient ratio is $-4/2=-2$." },
      ],
    },
    {
      id: "s-two-features",
      prompt: "For $f(x)=\\dfrac{5x}{x-4}$, which pair of asymptotes is correct?",
      choices: [
        { text: "horizontal asymptote $y=5$, vertical asymptote $x=4$", correct: true, explain: "Equal degrees give $y=5/1=5$, and the denominator is zero at $x=4$, a wall." },
        { text: "horizontal asymptote $x=4$, vertical asymptote $y=5$", explain: "The labels are swapped: horizontal asymptotes are $y=$ values, vertical ones are $x=$ values." },
        { text: "horizontal asymptote $y=0$, vertical asymptote $x=4$", explain: "The degrees are equal, so the end behavior is $y=5$, not $y=0$." },
        { text: "slant asymptote $y=5x$, vertical asymptote $x=4$", explain: "Equal degrees give a horizontal asymptote, not a slant." },
      ],
    },
    {
      id: "s-which-slants",
      prompt: "Which function has a slant asymptote?",
      choices: [
        { text: "$\\dfrac{x+3}{x^2-1}$", explain: "The numerator degree is smaller, so this has the horizontal asymptote $y=0$." },
        { text: "$\\dfrac{x^2+3}{x^2-1}$", explain: "Equal degrees give a horizontal asymptote, not a slant." },
        { text: "$\\dfrac{x^2+3}{x-1}$", correct: true, explain: "The numerator degree is exactly one higher, so division leaves a linear slant asymptote." },
        { text: "$\\dfrac{x^3+3}{x-1}$", explain: "The numerator degree is two higher, so the ends follow a curve, not a straight slant." },
      ],
    },
    {
      id: "s-point-vs-degree",
      prompt: "A learner reads the value at $x=10$ instead of comparing degrees. The horizontal asymptote of $\\dfrac{x^2+1}{2x^2+1}$ is:",
      choices: [
        { text: "$y=\\dfrac{1}{2}$, from the ratio of leading coefficients", correct: true, explain: "End behavior comes from the leading coefficients $1/2$, not from any single sample point." },
        { text: "whatever the function equals at $x=10$", explain: "One nearby point is not the asymptote. The ends are set by the degrees and leading coefficients." },
        { text: "$y=1$, from the constant terms", explain: "Those are the constant terms. The asymptote uses the leading coefficients instead." },
        { text: "there is no horizontal asymptote", explain: "Equal degrees always give a horizontal asymptote, here $y=\\dfrac{1}{2}$." },
      ],
    },
    {
      id: "s-expand-degrees",
      prompt: "The horizontal asymptote of $f(x)=\\dfrac{(2x-1)(x+3)}{x^2+5}$ is:",
      choices: [
        { text: "$y=0$", explain: "Do not read the numerator as degree 1. Multiplying the two factors gives $2x^2$, so the numerator has degree 2." },
        { text: "$y=2$", correct: true, explain: "The numerator expands to $2x^2+5x-3$, so equal degrees give the ratio $2/1=2$." },
        { text: "there is a slant asymptote", explain: "Two linear factors multiply to degree 2, matching the denominator, so it is a horizontal asymptote, not a slant." },
        { text: "$y=-\\dfrac{3}{5}$", explain: "Those are the constant terms $(-1)(3)$ over $5$. Use the leading coefficients instead." },
      ],
    },
    {
      id: "s-slant-two-x",
      prompt: "Divide term by term: $\\dfrac{2x^2+1}{x} = $",
      choices: [
        { text: "$2x + \\dfrac{1}{x}$, so the slant asymptote is $y = 2x$", correct: true, explain: "Each term divides by $x$: $2x^2/x = 2x$ and $1/x$ remains. The remainder vanishes, leaving the line $y = 2x$." },
        { text: "$2x + 1$, so the slant is $y = 2x + 1$", explain: "The $1$ is $1/x$ after dividing, not a constant $1$. Drop that remainder to get $y = 2x$." },
        { text: "$2 + \\dfrac{1}{x}$, so the slant is $y = 2$", explain: "The leading term $2x^2/x$ is $2x$, not $2$." },
        { text: "$x^2 + 1$, so there is no slant", explain: "You did not divide. After dividing by $x$ the quotient is the line $y = 2x$." },
      ],
    },
    {
      id: "s-comprehensive-true",
      prompt: "For $\\dfrac{p(x)}{q(x)}$ with numerator degree $n$ and denominator degree $m$, which statement is true?",
      choices: [
        { text: "If $n<m$, the horizontal asymptote is the ratio of leading coefficients.", explain: "A smaller numerator degree gives $y=0$. The leading-coefficient ratio is for equal degrees." },
        { text: "If $n=m$, there is a slant asymptote.", explain: "Equal degrees give a horizontal asymptote. A slant needs $n=m+1$." },
        { text: "If $n=m+1$, the slant asymptote is the division quotient, ignoring the remainder.", correct: true, explain: "A numerator one degree higher yields a linear quotient plus a vanishing remainder, and that quotient is the slant line." },
        { text: "If $n>m+1$, there is a slant asymptote.", explain: "More than one degree higher gives higher-degree end behavior, so neither a horizontal nor a slant asymptote." },
      ],
    },
  ],
};
