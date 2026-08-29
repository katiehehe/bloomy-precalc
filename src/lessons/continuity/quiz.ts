import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for continuity and discontinuity types.
 * Grounded in the lesson: continuity at x = a needs (1) f(a) defined, (2) the
 * two-sided limit to exist, and (3) the limit to equal the value. A removable
 * discontinuity (hole) has a finite two-sided limit but a missing or mismatched
 * value, and is fixed by setting f(a) equal to the limit; a jump has finite but
 * unequal one-sided limits (two-sided limit DNE); an infinite discontinuity is a
 * vertical asymptote where f blows up to +/- infinity (limit DNE, not fixable).
 * Polynomials are continuous everywhere; a rational is continuous except at zeros
 * of its denominator (a hole if the factor cancels, a wall if it does not).
 *
 * Distractors are the standard traps: keeping only one of the three conditions,
 * treating "defined at a" or "limit exists" as enough, calling a jump removable,
 * thinking a hole has no limit, believing an infinite discontinuity is patchable,
 * confusing a hole with a wall, and misreading which condition fails. Every
 * limit, jump size, patch value, and hole/asymptote location is verified by hand.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-three",
      prompt: "To be continuous at $x = a$, a function must satisfy which conditions?",
      choices: [
        { text: "$f(a)$ is defined, $\\lim_{x \\to a} f(x)$ exists, and the two are equal", correct: true, explain: "These are exactly the three conditions for continuity at a point." },
        { text: "$f(a)$ is defined, and nothing more", explain: "A value can exist while the graph still jumps or has a hole; you also need the limit to exist and match." },
        { text: "$\\lim_{x \\to a} f(x)$ exists, and nothing more", explain: "A hole has a limit yet no matching value, so an existing limit alone is not continuity." },
        { text: "$f$ is increasing as it passes through $a$", explain: "Continuity has nothing to do with increasing or decreasing; it is about value, limit, and their equality." },
      ],
    },
    {
      id: "c-pencil",
      prompt: "Which picture best matches 'continuous at $x = a$'?",
      choices: [
        { text: "The graph has a hole at $x = a$", explain: "A hole is a break: the pencil must lift over the missing point, so it is not continuous." },
        { text: "The graph jumps at $x = a$", explain: "A jump forces the pencil off the page, so the function is discontinuous there." },
        { text: "You can trace through $x = a$ without lifting your pencil", correct: true, explain: "Unbroken tracing through the point is the intuitive meaning of continuity." },
        { text: "The graph has a vertical asymptote at $x = a$", explain: "An asymptote sends the graph to infinity, the opposite of an unbroken curve." },
      ],
    },
    {
      id: "c-defined-not-enough",
      prompt: "Suppose $f(a)$ is defined. Does that alone make $f$ continuous at $a$?",
      choices: [
        { text: "Yes, a defined value is all that is needed", explain: "A jump can have a perfectly defined value at $a$ yet still be discontinuous." },
        { text: "No: the limit must also exist and equal $f(a)$", correct: true, explain: "Condition 1 is only one of three; the limit must exist and match the value too." },
        { text: "Yes, as long as $a > 0$", explain: "The sign of $a$ is irrelevant; continuity still needs the limit to exist and match." },
        { text: "No, because continuity never depends on $f(a)$", explain: "It does depend on $f(a)$: condition 3 compares the limit to that very value." },
      ],
    },
    {
      id: "c-limit-not-enough",
      prompt: "Suppose $\\lim_{x \\to a} f(x)$ exists. Is $f$ necessarily continuous at $a$?",
      choices: [
        { text: "Yes, an existing limit is enough", explain: "A hole has a limit but no value there, so the limit existing is not enough." },
        { text: "Yes, 'has a limit' and 'continuous' mean the same thing", explain: "They are different: continuity also needs the value to exist and equal the limit." },
        { text: "No, but only if the limit is $0$", explain: "The limit's value is irrelevant; what matters is that $f(a)$ exists and equals it." },
        { text: "No: $f(a)$ must also be defined and equal that limit", correct: true, explain: "A finite limit plus a matching, defined value is what continuity requires." },
      ],
    },
    {
      id: "c-removable-id",
      prompt: "A function has $\\lim_{x \\to a} f(x) = 5$ but $f(a)$ is undefined. This is a:",
      choices: [
        { text: "removable discontinuity (a hole); define $f(a) = 5$ to fix it", correct: true, explain: "A finite limit with a missing value is a hole, patched by setting the value to the limit." },
        { text: "jump discontinuity", explain: "A jump needs two different one-sided limits; here the two-sided limit exists ($5$)." },
        { text: "infinite discontinuity", explain: "Infinite means the function blows up; here the limit is the finite number $5$." },
        { text: "not a discontinuity at all", explain: "It is discontinuous because $f(a)$ is undefined; it just happens to be the fixable kind." },
      ],
    },
    {
      id: "c-jump-id",
      prompt: "At $x = a$ the left-hand limit is $3$ and the right-hand limit is $7$. This is a:",
      choices: [
        { text: "removable discontinuity", explain: "Removable needs the two-sided limit to exist; here the sides disagree, so it does not." },
        { text: "point of continuity", explain: "Continuity needs one shared limit; $3 \\ne 7$ breaks that." },
        { text: "jump discontinuity, since the one-sided limits differ", correct: true, explain: "Two finite but unequal one-sided limits is exactly a jump." },
        { text: "infinite discontinuity", explain: "Both one-sided limits are finite here, so nothing blows up to infinity." },
      ],
    },
    {
      id: "c-infinite-id",
      prompt: "Near $x = a$ a function grows without bound, racing off to $+\\infty$. This is a:",
      choices: [
        { text: "removable discontinuity", explain: "Removable needs a finite limit; an unbounded function has none." },
        { text: "infinite discontinuity (a vertical asymptote)", correct: true, explain: "Blowing up without bound is the definition of an infinite discontinuity." },
        { text: "jump discontinuity", explain: "A jump steps by a finite amount; this one goes to infinity." },
        { text: "continuous point", explain: "A graph escaping to infinity is the opposite of an unbroken curve." },
      ],
    },
    {
      id: "c-hole-has-limit",
      prompt: "At a hole (removable discontinuity), does the two-sided limit exist?",
      choices: [
        { text: "Yes: a hole means the limit exists but the value is missing or wrong", correct: true, explain: "The curve heads to one height from both sides; only the plotted point is off or absent." },
        { text: "No: a hole always means the limit fails to exist", explain: "That describes a jump or an asymptote; a hole is precisely where the limit does exist." },
        { text: "Only if $f$ is a polynomial", explain: "Polynomials have no holes at all; a hole's limit exists regardless of the function's type." },
        { text: "No: holes only occur at vertical asymptotes", explain: "A hole and an asymptote are different breaks; a hole has a finite limit, an asymptote does not." },
      ],
    },
    {
      id: "c-fix-removable",
      prompt: "To remove a removable discontinuity at $x = a$, you should:",
      choices: [
        { text: "draw a vertical asymptote at $a$", explain: "That would create an infinite discontinuity, not fix a hole." },
        { text: "erase the point at $a$", explain: "Removing a point creates a hole; you want to fill one." },
        { text: "set $f(a) = 0$ every time", explain: "Zero is only right if the limit happens to be $0$; use the actual limit." },
        { text: "define (or redefine) $f(a)$ to equal $\\lim_{x \\to a} f(x)$", correct: true, explain: "Matching the value to the existing limit satisfies all three conditions." },
      ],
    },
    {
      id: "c-jump-not-removable",
      prompt: "Can a jump discontinuity be removed by redefining a single point?",
      choices: [
        { text: "Yes, set the value to the average of the two sides", explain: "The average still fails to equal either one-sided limit, so the break remains." },
        { text: "No: the two-sided limit does not exist, so no single value works", correct: true, explain: "Removability requires an existing two-sided limit; a jump has none." },
        { text: "Yes, every jump is removable", explain: "Only discontinuities with an existing two-sided limit are removable; jumps are not." },
        { text: "Yes, set the value to the left-hand limit", explain: "Then the right side still disagrees, so the two-sided limit still does not exist." },
      ],
    },
    {
      id: "c-infinite-not-removable",
      prompt: "Can an infinite discontinuity be removed by defining a value there?",
      choices: [
        { text: "Yes, set it to $0$", explain: "No finite value helps when the function runs off to infinity nearby." },
        { text: "Yes, set it to the limit", explain: "There is no finite limit to copy; the limit is infinite." },
        { text: "No: the limit is infinite, so there is no finite value to assign", correct: true, explain: "Patching needs a finite two-sided limit, which an asymptote lacks." },
        { text: "Yes, every discontinuity is removable", explain: "Only holes are removable; jumps and infinite discontinuities are not." },
      ],
    },
    {
      id: "c-poly-everywhere",
      prompt: "Where is a polynomial such as $x^2 - 3x + 1$ continuous?",
      choices: [
        { text: "everywhere: polynomials are continuous for all real $x$", correct: true, explain: "Polynomials have no denominators or pieces, so they never break." },
        { text: "only where it is positive", explain: "Sign does not affect continuity; a polynomial is continuous even where it is negative or zero." },
        { text: "only at its roots", explain: "Roots are just where it crosses zero; it is continuous there and everywhere else." },
        { text: "nowhere", explain: "Polynomials are the standard example of everywhere-continuous functions." },
      ],
    },
    {
      id: "c-rational-where",
      prompt: "A rational function $\\dfrac{p(x)}{q(x)}$ is continuous:",
      choices: [
        { text: "everywhere, with no exceptions", explain: "It breaks wherever the denominator is zero, so there are exceptions." },
        { text: "only where $p(x) = 0$", explain: "Zeros of the numerator are just $x$-intercepts; continuity fails at zeros of the denominator." },
        { text: "everywhere except where $q(x) = 0$", correct: true, explain: "Division by zero is the only trouble; elsewhere the ratio is continuous." },
        { text: "only where $q(x) = 0$", explain: "That is backwards: those are exactly the points where it is discontinuous." },
      ],
    },
    {
      id: "c-which-cond-hole",
      prompt: "A function has $\\lim_{x \\to a} f(x) = 4$ but $f(a)$ is undefined. Which condition of continuity fails?",
      choices: [
        { text: "Condition 2: the limit exists", explain: "The limit does exist here (it is $4$), so condition 2 holds." },
        { text: "Condition 1: $f(a)$ is defined", correct: true, explain: "There is no value at $a$, so the 'defined' condition is the one that breaks." },
        { text: "No condition fails; it is continuous", explain: "A missing value makes it discontinuous even though the limit exists." },
        { text: "All three fail", explain: "Condition 2 holds because the limit exists; only the value (and thus the match) is the problem." },
      ],
    },
    {
      id: "c-which-cond-jump",
      prompt: "At a jump, $f(a)$ is defined and both one-sided limits exist but differ. Which condition fails?",
      choices: [
        { text: "Condition 1: $f(a)$ is defined", explain: "The value is given, so condition 1 actually holds." },
        { text: "None; it is continuous", explain: "Disagreeing one-sided limits break continuity, so something must fail." },
        { text: "Condition 3 only, the limit equals the value", explain: "You cannot even reach condition 3, because there is no two-sided limit to compare." },
        { text: "Condition 2: the two-sided limit exists (it does not, since the sides differ)", correct: true, explain: "Unequal one-sided limits mean the two-sided limit does not exist, so condition 2 fails." },
      ],
    },
  ],
  summit: [
    {
      id: "s-hole-39",
      prompt: "Find the hole of $g(x) = \\dfrac{x^2 - 9}{x - 3}$.",
      choices: [
        { text: "$(3, 6)$", correct: true, explain: "$\\dfrac{(x-3)(x+3)}{x-3} = x + 3$, and $3 + 3 = 6$, so the hole is at $(3, 6)$." },
        { text: "$(3, 0)$", explain: "The height is the limit $x + 3$ at $x = 3$, which is $6$, not $0$." },
        { text: "$(-3, 0)$", explain: "$x = -3$ is a root of the numerator, not the canceled factor; the hole is where $x - 3$ cancels." },
        { text: "There is no hole; it is a vertical asymptote at $x = 3$", explain: "The factor $x - 3$ cancels, so $x = 3$ is a hole, not a wall." },
      ],
    },
    {
      id: "s-jump-size",
      prompt: "For $f(x) = 2x$ if $x < 2$ and $f(x) = x + 5$ if $x \\ge 2$, the jump at $x = 2$ has size:",
      choices: [
        { text: "$0$: it is continuous", explain: "The left limit $2(2) = 4$ and right limit $2 + 5 = 7$ differ, so it is not continuous." },
        { text: "$7$", explain: "$7$ is the right-hand limit itself; the jump is the difference between the two sides." },
        { text: "$3$: the right limit $7$ minus the left limit $4$", correct: true, explain: "Left limit $4$, right limit $7$, so the jump is $7 - 4 = 3$." },
        { text: "$11$", explain: "That adds the limits ($4 + 7$); the jump subtracts them." },
      ],
    },
    {
      id: "s-classify-asymptote",
      prompt: "Classify the discontinuity of $f(x) = \\dfrac{1}{x + 3}$ at $x = -3$.",
      choices: [
        { text: "removable hole", explain: "Nothing cancels; the denominator alone hits zero, so the function blows up." },
        { text: "infinite discontinuity: a vertical asymptote at $x = -3$", correct: true, explain: "The denominator is $0$ while the numerator is $1$, so $|f| \\to \\infty$." },
        { text: "jump discontinuity", explain: "The one-sided limits are $\\pm\\infty$, not two different finite numbers." },
        { text: "no discontinuity", explain: "$f(-3) = \\tfrac{1}{0}$ is undefined, so it is discontinuous there." },
      ],
    },
    {
      id: "s-piecewise-cont",
      prompt: "Is $f(x) = x + 1$ for $x < 1$ and $f(x) = 2x$ for $x \\ge 1$ continuous at $x = 1$?",
      choices: [
        { text: "No: it has a jump of $1$", explain: "The left limit is $1 + 1 = 2$ and the right limit is $2(1) = 2$; they agree, so no jump." },
        { text: "No: it has a hole at $x = 1$", explain: "The value $f(1) = 2$ exists and equals the limit, so there is no hole." },
        { text: "No: it has a vertical asymptote", explain: "Both pieces are lines; nothing blows up." },
        { text: "Yes: left limit $2$, right limit $2$, and $f(1) = 2$ all agree", correct: true, explain: "All three conditions hold, so $f$ is continuous at $x = 1$." },
      ],
    },
    {
      id: "s-patch-value",
      prompt: "To make $g(x) = \\dfrac{x^2 - 1}{x - 1}$ continuous at $x = 1$, define $g(1) =$",
      choices: [
        { text: "$2$", correct: true, explain: "$\\dfrac{(x-1)(x+1)}{x-1} = x + 1$, whose limit at $x = 1$ is $2$." },
        { text: "$0$", explain: "The limit is $x + 1$ at $x = 1$, which is $2$, not $0$." },
        { text: "$1$", explain: "That is the input; the value to assign is the limit, $2$." },
        { text: "It cannot be made continuous", explain: "The factor cancels and the limit is finite, so setting $g(1) = 2$ removes the hole." },
      ],
    },
    {
      id: "s-hole-vs-wall",
      prompt: "For $f(x) = \\dfrac{x - 1}{(x - 1)(x + 2)}$, the points $x = 1$ and $x = -2$ are:",
      choices: [
        { text: "both vertical asymptotes", explain: "The factor $x - 1$ cancels, so $x = 1$ is a hole, not a wall." },
        { text: "both holes", explain: "The factor $x + 2$ does not cancel, so $x = -2$ is a wall, not a hole." },
        { text: "a hole at $x = 1$ (the factor cancels) and a wall at $x = -2$ (it does not)", correct: true, explain: "Canceling $x - 1$ leaves $\\tfrac{1}{x+2}$: a hole at $1$, an asymptote at $-2$." },
        { text: "a wall at $x = 1$ and a hole at $x = -2$", explain: "It is the reverse: the canceling factor $x - 1$ makes the hole at $x = 1$." },
      ],
    },
    {
      id: "s-abs-value",
      prompt: "Is $f(x) = |x|$ continuous at $x = 0$?",
      choices: [
        { text: "No: the absolute value jumps at $0$", explain: "Both sides approach $0$ and $f(0) = 0$; there is no jump." },
        { text: "Yes: the limit from both sides is $0$, and $f(0) = 0$", correct: true, explain: "Value, limit, and their equality all hold, so it is continuous at $0$." },
        { text: "No: it has a hole at $0$", explain: "The point $(0, 0)$ is present and matches the limit, so no hole." },
        { text: "No: the corner means it cannot be continuous", explain: "A corner blocks differentiability, not continuity; $|x|$ is continuous everywhere." },
      ],
    },
    {
      id: "s-value-mismatch",
      prompt: "Define $h(x) = x + 2$ for $x \\ne 2$ and $h(2) = 1$. At $x = 2$, $h$ is:",
      choices: [
        { text: "continuous, since $h(2)$ is defined", explain: "A defined value is not enough; it must equal the limit, and $1 \\ne 4$." },
        { text: "an infinite discontinuity", explain: "Nothing blows up; the limit is the finite number $4$." },
        { text: "a jump discontinuity", explain: "The two-sided limit exists ($4$); a jump needs disagreeing one-sided limits." },
        { text: "a removable discontinuity: the limit is $4$ but the value $1$ does not match (condition 3 fails)", correct: true, explain: "A finite limit with a mismatched value is removable; redefine $h(2) = 4$." },
      ],
    },
    {
      id: "s-never-zero",
      prompt: "Where is $f(x) = \\dfrac{1}{x^2 + 1}$ discontinuous?",
      choices: [
        { text: "nowhere: $x^2 + 1 \\ge 1 > 0$, so it is continuous for all real $x$", correct: true, explain: "The denominator is never zero, so the rational function never breaks." },
        { text: "at $x = 1$", explain: "$1^2 + 1 = 2 \\ne 0$, so nothing breaks at $x = 1$." },
        { text: "at $x = -1$ and $x = 1$", explain: "$x^2 + 1$ has no real zeros, so there are no discontinuities." },
        { text: "at $x = 0$", explain: "$0^2 + 1 = 1 \\ne 0$; the function is perfectly defined at $0$." },
      ],
    },
    {
      id: "s-rational-set",
      prompt: "$f(x) = \\dfrac{x + 1}{(x - 2)(x + 3)}$ is continuous for all $x$ except:",
      choices: [
        { text: "$x = -1$", explain: "$x = -1$ is a zero of the numerator (an $x$-intercept), where $f$ is still continuous." },
        { text: "$x = 2$ only", explain: "The denominator is also zero at $x = -3$, so that point breaks too." },
        { text: "$x = 2$ and $x = -3$ (the zeros of the denominator)", correct: true, explain: "Neither factor cancels, so both are discontinuities (vertical asymptotes)." },
        { text: "no exceptions; it is continuous everywhere", explain: "The denominator vanishes at $x = 2$ and $x = -3$, so those are excluded." },
      ],
    },
    {
      id: "s-jump-vs-infinite",
      prompt: "Both a jump and an infinite discontinuity have no two-sided limit. How do they differ?",
      choices: [
        { text: "They do not differ; the names mean the same thing", explain: "They are distinct: one steps by a finite amount, the other escapes to infinity." },
        { text: "A jump has finite one-sided limits that disagree; an infinite one has one-sided limits of $\\pm\\infty$", correct: true, explain: "That finite-versus-infinite behavior of the one-sided limits is the distinction." },
        { text: "A jump blows up to infinity; an infinite discontinuity steps by a finite amount", explain: "This reverses the two: the jump is the finite step." },
        { text: "A jump is always removable, and so is an infinite discontinuity", explain: "Neither is removable; only holes (with an existing two-sided limit) are." },
      ],
    },
    {
      id: "s-which-removable",
      prompt: "Which situation is a removable discontinuity?",
      choices: [
        { text: "$\\lim_{x \\to a} f(x)$ exists and is finite, but $f(a)$ is undefined or unequal to it", correct: true, explain: "A finite two-sided limit with a missing or wrong value is exactly a removable hole." },
        { text: "the left and right limits are finite but different", explain: "That is a jump: no two-sided limit, so it is not removable." },
        { text: "$f$ grows without bound near $a$", explain: "That is an infinite discontinuity, which has no finite limit to patch." },
        { text: "$f$ is defined at $a$ and its limit equals its value", explain: "That is continuity, not a discontinuity at all." },
      ],
    },
    {
      id: "s-solve-k",
      prompt: "For $f(x) = x + k$ if $x < 1$ and $f(x) = 3x$ if $x \\ge 1$, which $k$ makes $f$ continuous at $x = 1$?",
      choices: [
        { text: "$k = 0$", explain: "Then the left limit is $1$, but the right value is $3$; they must match." },
        { text: "$k = 3$", explain: "Then the left limit is $4 \\ne 3$; solve $1 + k = 3$ instead." },
        { text: "$k = 2$, so the left limit $1 + k = 3$ matches the right value $3$", correct: true, explain: "Continuity needs $1 + k = 3(1)$, giving $k = 2$." },
        { text: "no value of $k$ works", explain: "Choosing $k = 2$ aligns both sides at $3$, so continuity is achievable." },
      ],
    },
    {
      id: "s-hole-neg",
      prompt: "Find the hole of $f(x) = \\dfrac{x^2 - 4}{x + 2}$.",
      choices: [
        { text: "$(2, 0)$", explain: "The canceling factor is $x + 2$, so the hole is at $x = -2$, not $x = 2$." },
        { text: "$(2, 4)$", explain: "That would be a hole of a different function; here $x + 2$ cancels, giving $x = -2$." },
        { text: "$(-2, 4)$", explain: "The height is $x - 2$ at $x = -2$, which is $-4$, not $4$." },
        { text: "$(-2, -4)$", correct: true, explain: "$\\dfrac{(x-2)(x+2)}{x+2} = x - 2$, and $-2 - 2 = -4$, so the hole is $(-2, -4)$." },
      ],
    },
    {
      id: "s-compact-def",
      prompt: "Why does the single equation $\\lim_{x \\to a} f(x) = f(a)$ capture all three continuity conditions?",
      choices: [
        { text: "It does not; it only covers the limit", explain: "Written out, the equation needs both sides to make sense and to be equal, covering all three." },
        { text: "Writing it requires $f(a)$ to exist, the limit to exist, and the two to be equal, all at once", correct: true, explain: "The right side needs a value, the left needs a limit, and the equals sign forces the match." },
        { text: "Because every function satisfies it", explain: "Discontinuous functions fail it, so it is a genuine test, not automatic." },
        { text: "Because it only requires $f(a)$ to be defined", explain: "It also requires the limit to exist and to equal that value." },
      ],
    },
  ],
};
