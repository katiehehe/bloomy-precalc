import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Rational inequalities".
 * Grounded in the lesson: never cross-multiply by a denominator of unknown sign;
 * get 0 on one side and combine into a single fraction; the critical points are
 * the numerator zeros AND the denominator zeros (walls); test the sign of the
 * whole fraction on each interval; include a numerator zero only for non-strict
 * inequalities, and exclude a wall always. Distractors are the classic traps.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-cross-multiply",
      prompt: "To solve $\\dfrac{x-3}{x+1}>0$, why should you **not** multiply both sides by $x+1$?",
      choices: [
        { text: "Because $x+1$ can be negative, which would flip the inequality", correct: true, explain: "Its sign is unknown, so multiplying by it is unsafe; move everything to one side and sign-analyze instead." },
        { text: "Because $x+1$ is always zero", explain: "It is only zero at $x=-1$, not everywhere, so this is not the reason." },
        { text: "You can, and the solution is unchanged", explain: "Multiplying by an unknown-sign expression can flip the inequality, so the solution can change." },
      ],
    },
    {
      id: "c-num-zero",
      prompt: "The fraction $\\dfrac{x-3}{x+1}$ equals **zero** at which $x$?",
      choices: [
        { text: "$x=3$", correct: true, explain: "A fraction is zero only when its numerator is zero, and $x-3=0$ at $x=3$." },
        { text: "$x=-1$", explain: "At $x=-1$ the denominator is zero, so the fraction is undefined there, not zero." },
        { text: "both $x=3$ and $x=-1$", explain: "$x=-1$ makes it undefined, not zero, so only $x=3$ is a numerator zero." },
      ],
    },
    {
      id: "c-wall",
      prompt: "Where is $\\dfrac{x-3}{x+1}$ **undefined** (its wall)?",
      choices: [
        { text: "$x=3$", explain: "At $x=3$ the numerator is zero, so the value is $0$ there, not undefined." },
        { text: "$x=-1$", correct: true, explain: "The denominator $x+1$ is zero at $x=-1$, so the fraction is undefined and builds a wall." },
        { text: "$x=1$", explain: "Sign slip: $x+1=0$ gives $x=-1$, not $x=1$." },
      ],
    },
    {
      id: "c-criticals",
      prompt: "Which values split the number line into test intervals for $\\dfrac{x-3}{x+1}$?",
      choices: [
        { text: "only $x=3$", explain: "The wall $x=-1$ is also a critical point, so this misses a boundary where the sign can flip." },
        { text: "only $x=-1$", explain: "The numerator zero $x=3$ is also a critical point, so this misses a boundary." },
        { text: "$x=-1$ and $x=3$", correct: true, explain: "Both the numerator zero $x=3$ and the denominator zero $x=-1$ can change the sign, so both split the line." },
        { text: "$x=0$ and $x=3$", explain: "$x=0$ is not special here; the wall is at $x=-1$, where the denominator is zero." },
      ],
    },
    {
      id: "c-test-point",
      prompt: "To find the sign of $\\dfrac{x-3}{x+1}$ on the interval $(-1,3)$, which is a valid test point?",
      choices: [
        { text: "$x=-1$", explain: "That is the wall itself, a boundary, not a point strictly inside the interval." },
        { text: "$x=0$", correct: true, explain: "$0$ sits strictly between $-1$ and $3$, so it correctly samples that interval." },
        { text: "$x=3$", explain: "That is the numerator-zero boundary, not a point inside the interval." },
        { text: "$x=5$", explain: "$5$ lies to the right of $3$, outside the interval $(-1,3)$." },
      ],
    },
    {
      id: "c-sign-left",
      prompt: "Testing $x=-2$ (left of $-1$) in $\\dfrac{x-3}{x+1}$, the value is:",
      choices: [
        { text: "zero", explain: "The fraction is zero only at the numerator zero $x=3$, not at $x=-2$." },
        { text: "negative", explain: "Both top and bottom are negative here, and a negative over a negative is positive, not negative." },
        { text: "positive", correct: true, explain: "The top $x-3=-5$ and bottom $x+1=-1$ are both negative, and a negative over a negative is positive." },
      ],
    },
    {
      id: "c-sign-mid",
      prompt: "Testing $x=0$ (between $-1$ and $3$) in $\\dfrac{x-3}{x+1}$, the value is:",
      choices: [
        { text: "negative", correct: true, explain: "The top $0-3=-3$ is negative and the bottom $0+1=1$ is positive, and a negative over a positive is negative." },
        { text: "positive", explain: "The top is negative and the bottom is positive here, so the quotient is negative, not positive." },
        { text: "undefined", explain: "The denominator is nonzero at $x=0$, so the value is perfectly defined." },
      ],
    },
    {
      id: "c-sign-right",
      prompt: "Testing $x=4$ (right of $3$) in $\\dfrac{x-3}{x+1}$, the value is:",
      choices: [
        { text: "negative", explain: "Both top and bottom are positive here, so the quotient is positive, not negative." },
        { text: "positive", correct: true, explain: "The top $4-3=1$ and bottom $4+1=5$ are both positive, so the quotient is positive." },
        { text: "zero", explain: "The fraction is zero only at $x=3$, not at $x=4$." },
      ],
    },
    {
      id: "c-solve-gt",
      prompt: "The solution of $\\dfrac{x-3}{x+1}>0$ is:",
      choices: [
        { text: "$(-1,3)$", explain: "That is where the fraction is negative; for $>0$ you want the positive intervals instead." },
        { text: "$[-1,3]$", explain: "That interval is negative and also wrongly includes the wall $x=-1$." },
        { text: "$(-\\infty,-1]\\cup[3,\\infty)$", explain: "The sign is right, but the wall $x=-1$ must be open and, since $>$ is strict, so must $3$." },
        { text: "$(-\\infty,-1)\\cup(3,\\infty)$", correct: true, explain: "Those are the two positive intervals, with both boundaries open because $>$ is strict." },
      ],
    },
    {
      id: "c-solve-lt",
      prompt: "The solution of $\\dfrac{x-3}{x+1}<0$ is:",
      choices: [
        { text: "$(-1,3)$", correct: true, explain: "The fraction is negative only between the wall and the zero, and both ends are open for strict $<$." },
        { text: "$(-\\infty,-1)\\cup(3,\\infty)$", explain: "Those are the positive intervals; for $<0$ you want the single negative interval." },
        { text: "$[-1,3]$", explain: "The interval is right, but the wall $x=-1$ can never be included and $3$ is excluded for strict $<$." },
        { text: "$(-1,3]$", explain: "The zero $x=3$ gives $0$, which is not less than $0$, so $3$ must be open." },
      ],
    },
    {
      id: "c-solve-ge",
      prompt: "The solution of $\\dfrac{x-3}{x+1}\\ge 0$ is:",
      choices: [
        { text: "$(-\\infty,-1]\\cup[3,\\infty)$", explain: "The wall $x=-1$ is undefined, so it can never be bracketed, even for $\\ge$." },
        { text: "$(-\\infty,-1)\\cup(3,\\infty)$", explain: "For $\\ge$ the numerator zero $x=3$ gives $0$, which satisfies $\\ge 0$, so $3$ must be included." },
        { text: "$(-\\infty,-1)\\cup[3,\\infty)$", correct: true, explain: "Bracket the numerator zero $x=3$ because $\\ge$ allows equality, but keep the wall $x=-1$ open." },
        { text: "$[-1,3]$", explain: "That is the wrong sign region for $\\ge 0$ and it wrongly closes the wall." },
      ],
    },
    {
      id: "c-solve-le",
      prompt: "The solution of $\\dfrac{x-3}{x+1}\\le 0$ is:",
      choices: [
        { text: "$[-1,3]$", explain: "The wall $x=-1$ is undefined, so it must stay open even for $\\le$." },
        { text: "$(-1,3]$", correct: true, explain: "The fraction is negative on $(-1,3)$ and equals $0$ at $x=3$, which $\\le$ allows, while the wall stays open." },
        { text: "$(-1,3)$", explain: "For $\\le$ the zero $x=3$ satisfies $\\le 0$, so $3$ should be included." },
        { text: "$[-1,3)$", explain: "The zero $x=3$ should be closed and the wall $x=-1$ must be open, so both brackets are backward." },
      ],
    },
    {
      id: "c-wall-open",
      prompt: "In the solution of $\\dfrac{x-3}{x+1}\\ge 0$, what kind of endpoint is the wall $x=-1$?",
      choices: [
        { text: "Closed, because $\\ge$ allows equality", explain: "Equality never reaches a wall; the fraction is undefined at $x=-1$, so it stays excluded." },
        { text: "Open, because the fraction is undefined there", correct: true, explain: "A wall is undefined, so it is always excluded, whether the inequality is strict or not." },
        { text: "It depends on the test point nearby", explain: "A wall is always excluded regardless of nearby signs, so it never becomes closed." },
      ],
    },
    {
      id: "c-const-crit",
      prompt: "For $\\dfrac{5}{x-2}$, what are the critical points?",
      choices: [
        { text: "only the wall $x=2$", correct: true, explain: "The numerator $5$ is never zero, so the only boundary is the denominator zero at $x=2$." },
        { text: "$x=5$ and $x=2$", explain: "$5$ is the constant numerator, not a zero; it never makes the fraction equal $0$." },
        { text: "only $x=5$", explain: "There is no numerator zero here; the boundary is the wall at $x=2$." },
        { text: "$x=0$ and $x=2$", explain: "$x=0$ is not special; only the wall $x=2$ is a critical point." },
      ],
    },
    {
      id: "c-const-solve",
      prompt: "The solution of $\\dfrac{5}{x-2}>0$ is:",
      choices: [
        { text: "$(-\\infty,2)$", explain: "There the bottom is negative, so a positive $5$ over it is negative, not positive." },
        { text: "$[2,\\infty)$", explain: "The wall $x=2$ is undefined, so it must be open, never bracketed." },
        { text: "$(2,\\infty)$", correct: true, explain: "For $x>2$ the bottom is positive, so $5$ over it is positive, and the wall stays open." },
        { text: "$(-\\infty,2)\\cup(2,\\infty)$", explain: "The fraction is negative on $(-\\infty,2)$, so that half fails $>0$." },
      ],
    },
  ],
  summit: [
    {
      id: "s-a-first-move",
      prompt: "What is the correct **first step** to solve $\\dfrac{x}{x-2}\\ge 3$?",
      choices: [
        { text: "Multiply both sides by $x-2$", explain: "The sign of $x-2$ is unknown, so multiplying can flip the inequality; that step is unsafe." },
        { text: "Subtract $3$ from both sides, then combine into one fraction $\\ge 0$", correct: true, explain: "Getting $0$ on one side lets you sign-analyze a single fraction, which is always valid." },
        { text: "Cross-multiply to get $x\\ge 3(x-2)$", explain: "Cross-multiplying assumes $x-2>0$; if it is negative the inequality flips, so this is unsafe." },
      ],
    },
    {
      id: "s-a-combine",
      prompt: "Writing $\\dfrac{x}{x-2}-3$ as a single fraction gives:",
      choices: [
        { text: "$\\dfrac{-2x+6}{x-2}$", correct: true, explain: "Over the common denominator $x-2$: $x-3(x-2)=x-3x+6=-2x+6$." },
        { text: "$\\dfrac{-2x-6}{x-2}$", explain: "Sign slip: $-3(x-2)=-3x+6$, so the constant is $+6$, not $-6$." },
        { text: "$\\dfrac{x-3}{x-2}$", explain: "This forgets to multiply the $3$ by the whole denominator $x-2$." },
      ],
    },
    {
      id: "s-a-solve",
      prompt: "The solution of $\\dfrac{x}{x-2}\\ge 3$ is:",
      choices: [
        { text: "$[2,3]$", explain: "The wall $x=2$ is undefined, so it can never be included." },
        { text: "$(2,3)$", explain: "The numerator zero $x=3$ gives equality, which $\\ge$ allows, so $3$ must be included." },
        { text: "$(2,3]$", correct: true, explain: "After combining, $\\dfrac{-2x+6}{x-2}\\ge 0$ holds on $(2,3]$: the wall $2$ is open and the numerator zero $3$ is closed." },
        { text: "$(-\\infty,2)\\cup[3,\\infty)$", explain: "This reads the sign backward; the combined expression is positive between the wall and the zero, not outside them." },
      ],
    },
    {
      id: "s-a-endpoints",
      prompt: "In the solution $(2,3]$ of $\\dfrac{x}{x-2}\\ge 3$, why is $2$ excluded but $3$ included?",
      choices: [
        { text: "Both should be included because the inequality is $\\ge$", explain: "A wall is undefined, so $x=2$ can never be included even with $\\ge$." },
        { text: "Both should be excluded because it is a fraction", explain: "The numerator zero $x=3$ gives the true statement $0\\ge 0$, so $3$ is included." },
        { text: "$2$ is a wall (undefined) while $3$ is a numerator zero that satisfies $\\ge$", correct: true, explain: "Walls are always open, and a numerator zero is included exactly when the inequality is non-strict." },
        { text: "$2$ makes the expression equal $3$, so it is skipped", explain: "$x=2$ is excluded because the expression is undefined there, not because of any value it takes." },
      ],
    },
    {
      id: "s-b-combine",
      prompt: "Moving everything to one side, $\\dfrac{2}{x+1}\\le\\dfrac{1}{x-1}$ becomes $\\dfrac{\\square}{(x+1)(x-1)}\\le 0$. The numerator is:",
      choices: [
        { text: "$x-3$", correct: true, explain: "Over the common denominator, $2(x-1)-(x+1)=2x-2-x-1=x-3$." },
        { text: "$3-x$", explain: "That subtracts in the wrong order; $\\dfrac{2}{x+1}-\\dfrac{1}{x-1}$ puts $2(x-1)$ first, giving $x-3$." },
        { text: "$x-1$", explain: "Sign slip: $-(x+1)=-x-1$, so the numerator is $2x-2-x-1=x-3$, not $x-1$." },
        { text: "$1$", explain: "You cannot just subtract the numerators; each must first be multiplied by the other denominator." },
      ],
    },
    {
      id: "s-b-walls",
      prompt: "How many **walls** does the combined expression $\\dfrac{x-3}{(x+1)(x-1)}$ have?",
      choices: [
        { text: "$1$", explain: "There are two denominator zeros, at $x=-1$ and $x=1$, so there are two walls." },
        { text: "$2$", correct: true, explain: "The denominator is zero at both $x=-1$ and $x=1$, and each is an excluded wall." },
        { text: "$3$", explain: "$x=3$ is a numerator zero, not a wall; only denominator zeros are walls." },
        { text: "$0$", explain: "The denominator $(x+1)(x-1)$ is zero at two points, so walls certainly exist." },
      ],
    },
    {
      id: "s-b-solve",
      prompt: "The solution of $\\dfrac{2}{x+1}\\le\\dfrac{1}{x-1}$ is:",
      choices: [
        { text: "$(-\\infty,-1]\\cup[1,3]$", explain: "The walls $x=-1$ and $x=1$ are undefined, so they can never be bracketed." },
        { text: "$(-1,1)\\cup(3,\\infty)$", explain: "Those are the positive intervals; for $\\le 0$ you want the negative ones." },
        { text: "$(-\\infty,-1)\\cup(1,3)$", explain: "For $\\le$ the numerator zero $x=3$ satisfies the inequality, so $3$ must be included." },
        { text: "$(-\\infty,-1)\\cup(1,3]$", correct: true, explain: "The expression is negative on those two intervals, with both walls open and the numerator zero $x=3$ closed for $\\le$." },
      ],
    },
    {
      id: "s-b-strict",
      prompt: "For the same expression, how does the solution of $\\dfrac{2}{x+1}<\\dfrac{1}{x-1}$ (strict) differ from the $\\le$ case?",
      choices: [
        { text: "Drop $x=3$; the answer is $(-\\infty,-1)\\cup(1,3)$", correct: true, explain: "Strict $<$ excludes the numerator zero, and the walls were already open, so only $3$ changes." },
        { text: "No difference; the answers are identical", explain: "Strict $<$ removes the numerator zero $x=3$, so the two sets are not identical." },
        { text: "Now include the walls: $(-\\infty,-1]\\cup[1,3)$", explain: "Walls are undefined, so they stay open no matter whether the inequality is strict." },
        { text: "Drop the whole interval $(1,3)$", explain: "Only the single endpoint $x=3$ leaves the set; the open interval $(1,3)$ stays." },
      ],
    },
    {
      id: "s-c-cross-trap",
      prompt: "A student multiplies both sides of $\\dfrac{3}{x-1}<1$ by $x-1$ to get $3<x-1$, then answers $x>4$. What went wrong?",
      choices: [
        { text: "Nothing; $x>4$ is the complete solution", explain: "The whole interval $(-\\infty,1)$ is missing, so $x>4$ alone is incomplete." },
        { text: "The arithmetic should give $x<4$", explain: "The real problem is not the arithmetic but multiplying by a factor of unknown sign." },
        { text: "When $x<1$, $x-1$ is negative, so multiplying flips the sign and loses the interval $(-\\infty,1)$", correct: true, explain: "The full solution is $(-\\infty,1)\\cup(4,\\infty)$; cross-multiplying dropped the negative-denominator region." },
        { text: "The error was subtracting instead of dividing", explain: "No subtraction happened; the fatal move was multiplying by $x-1$ without knowing its sign." },
      ],
    },
    {
      id: "s-c-combine",
      prompt: "Writing $\\dfrac{3}{x-1}-1$ as a single fraction gives:",
      choices: [
        { text: "$\\dfrac{2-x}{x-1}$", explain: "Sign slip: $3-(x-1)=3-x+1=4-x$, so the constant is $+4$, not $+2$." },
        { text: "$\\dfrac{4-x}{x-1}$", correct: true, explain: "Over the common denominator $x-1$: $3-(x-1)=3-x+1=4-x$." },
        { text: "$\\dfrac{3-x}{x-1}$", explain: "This drops the $+1$ from $-(x-1)$; the numerator is $3-x+1=4-x$." },
        { text: "$3<x-1$", explain: "That is an invalid cross-multiplication, not a single combined fraction." },
      ],
    },
    {
      id: "s-c-solve",
      prompt: "The solution of $\\dfrac{3}{x-1}<1$ is:",
      choices: [
        { text: "$(-\\infty,1)\\cup(4,\\infty)$", correct: true, explain: "The combined expression $\\dfrac{4-x}{x-1}$ is negative on both outer intervals, and both endpoints are open for strict $<$." },
        { text: "$(4,\\infty)$", explain: "This is the cross-multiplying mistake that drops the whole interval $(-\\infty,1)$." },
        { text: "$(-\\infty,1)\\cup[4,\\infty)$", explain: "Strict $<$ excludes the numerator zero, so $x=4$ must be open." },
        { text: "$(1,4)$", explain: "That is where the expression is positive; for $<0$ you want the negative intervals." },
      ],
    },
    {
      id: "s-compare-zero",
      prompt: "To solve $\\dfrac{x}{x-2}\\ge 3$, why can you not just build a sign chart for $\\dfrac{x}{x-2}$ and read off where it is positive?",
      choices: [
        { text: "Because a sign chart only works for polynomials", explain: "Sign charts work for rational expressions too; the real issue is that you have not compared to $0$ yet." },
        { text: "Because that chart answers $\\ge 0$, not $\\ge 3$, so you must move the $3$ over first", correct: true, explain: "Sign analysis compares one expression to $0$, so subtract $3$ first to get a single fraction $\\ge 0$." },
        { text: "Because you should compare the fraction to $3$, not to $0$", explain: "A sign chart only reports where an expression is above or below $0$, so the $3$ must be moved across." },
        { text: "Because the $3$ only shifts the endpoints, not the intervals", explain: "The $3$ changes the whole expression, not just its endpoints, so it must be combined in first." },
      ],
    },
    {
      id: "s-wall-open-rule",
      prompt: "In any rational inequality, a denominator zero (wall) that lands in the solution region is:",
      choices: [
        { text: "Included whenever the inequality is $\\le$ or $\\ge$", explain: "The expression is undefined at a wall, so equality can never actually hold there." },
        { text: "Included when the numerator is also zero there", explain: "If the denominator is zero the expression is undefined regardless of the numerator, so it is excluded." },
        { text: "Always excluded, because the expression is undefined there", correct: true, explain: "A wall makes the fraction undefined, so it is open for strict and non-strict inequalities alike." },
        { text: "Sometimes included, depending on the sign nearby", explain: "Nearby signs decide which intervals you keep, not whether a wall is included, and it never is." },
      ],
    },
    {
      id: "s-num-zero-rule",
      prompt: "A numerator zero is included in the solution set exactly when:",
      choices: [
        { text: "Always, since it is a critical point", explain: "For strict $<$ or $>$ the value $0$ fails the inequality, so the numerator zero is excluded." },
        { text: "Never, since fractions exclude their boundaries", explain: "For $\\le$ or $\\ge$ the value $0$ satisfies the inequality, so the numerator zero is included." },
        { text: "Only when the fraction is positive just to its right", explain: "Inclusion depends on strict versus non-strict, not on the neighboring sign." },
        { text: "The inequality is non-strict ($\\le$ or $\\ge$) and the point is not also a wall", correct: true, explain: "Non-strict inequalities allow the value $0$, and a numerator zero that is also a wall stays excluded." },
      ],
    },
    {
      id: "s-signchart-read",
      prompt: "A rational expression is $+$ on $(-\\infty,-2)$, undefined at $x=-2$, $-$ on $(-2,4)$, $0$ at $x=4$, and $+$ on $(4,\\infty)$. Its solution set for $\\le 0$ is:",
      choices: [
        { text: "$(-2,4]$", correct: true, explain: "Keep where it is negative, $(-2,4)$, add the zero at $x=4$, and leave the wall $x=-2$ open." },
        { text: "$[-2,4]$", explain: "The wall at $x=-2$ is undefined, so it must be open, not bracketed." },
        { text: "$(-2,4)$", explain: "For $\\le 0$ the zero at $x=4$ is included, so that endpoint should be closed." },
        { text: "$(-\\infty,-2)\\cup(4,\\infty)$", explain: "Those are the positive intervals; for $\\le 0$ you want the negative region." },
      ],
    },
  ],
};
