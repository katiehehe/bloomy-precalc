import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Polynomial inequalities".
 * Grounded in the lesson: move everything to one side so it compares to 0,
 * factor to find the real zeros (the critical points), test a point strictly
 * inside each interval to read the product's sign, then keep the intervals whose
 * sign matches the inequality and write the answer in interval notation. Strict
 * inequalities exclude the zeros (parentheses). Non-strict include them
 * (brackets). At a squared factor the sign does not change. Distractors are the
 * classic traps: bracket vs parenthesis, a squared factor that should not flip
 * the sign, testing on a boundary, miscounting negative factors, and reading the
 * wanted sign backward.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-critical-def",
      prompt: "In the method for polynomial inequalities, the **critical points** are:",
      choices: [
        { text: "the real zeros, where the polynomial equals $0$", correct: true, explain: "A smooth polynomial can only switch sign where it passes through zero, so its real zeros are the critical points." },
        { text: "the test points you pick inside each interval", explain: "Test points only reveal the sign on an interval. The critical points are the zeros that create the intervals." },
        { text: "the x-values where the polynomial is undefined", explain: "Polynomials are defined everywhere, so there are no such gaps. The boundaries are the zeros." },
      ],
    },
    {
      id: "c-find-criticals",
      prompt: "What are the critical points of $(x+2)(x-1)(x-3)$?",
      choices: [
        { text: "$x=2,\\;-1,\\;-3$", explain: "Sign slip: $x+2=0$ gives $x=-2$, so the signs of the constants must be reversed." },
        { text: "$x=-2,\\;1,\\;3$", correct: true, explain: "Set each factor to zero: $x+2=0$, $x-1=0$, and $x-3=0$." },
        { text: "$x=-2,\\;-1,\\;3$", explain: "Middle factor slip: $x-1=0$ gives $x=1$, not $-1$." },
      ],
    },
    {
      id: "c-why-intervals",
      prompt: "Why do the critical points split the number line into intervals we can test?",
      choices: [
        { text: "Because the polynomial is undefined at the critical points", explain: "Polynomials are defined everywhere. The zeros are outputs of $0$, not gaps in the domain." },
        { text: "Because the polynomial is always positive between two zeros", explain: "The sign between zeros can be positive or negative. That is exactly what testing decides." },
        { text: "Because a polynomial is smooth, so it can only change sign by passing through a zero", correct: true, explain: "Between neighboring zeros the value never reaches $0$, so each interval is entirely positive or entirely negative." },
      ],
    },
    {
      id: "c-test-point",
      prompt: "To find the sign of $(x+2)(x-1)(x-3)$ on the interval $(1,3)$, which is a valid test point?",
      choices: [
        { text: "$x=1$", explain: "$x=1$ is a boundary where the product is $0$, so it cannot show the interval's sign." },
        { text: "$x=3$", explain: "$x=3$ is the other boundary, a zero of the product, not an interior point." },
        { text: "$x=2$", correct: true, explain: "$2$ sits strictly inside $(1,3)$, so its sign represents the whole interval." },
        { text: "$x=5$", explain: "$5$ lies outside $(1,3)$, so it would test the wrong interval." },
      ],
    },
    {
      id: "c-sign-at-test",
      prompt: "Testing $x=2$ in $(x+2)(x-1)(x-3)$, the product is:",
      choices: [
        { text: "positive", explain: "Recount the signs: $(+)(+)(-)$ has one negative factor, so the product is negative." },
        { text: "zero", explain: "A test point strictly inside an interval is never a zero. Only the critical points give $0$." },
        { text: "negative", correct: true, explain: "$(4)(1)(-1)=-4$, so the product is negative across $(1,3)$." },
      ],
    },
    {
      id: "c-sign-pattern",
      prompt: "Reading left to right, the sign pattern of $(x+2)(x-1)(x-3)$ across its four intervals is:",
      choices: [
        { text: "$-,\\;+,\\;-,\\;+$", correct: true, explain: "Far left is negative for a positive-lead cubic, and the sign flips at each simple zero." },
        { text: "$+,\\;-,\\;+,\\;-$", explain: "This starts with the wrong sign. Far to the left all three factors are negative, giving a negative product." },
        { text: "$-,\\;-,\\;+,\\;+$", explain: "The sign flips at every simple zero, so it must alternate rather than change only once." },
      ],
    },
    {
      id: "c-leftmost",
      prompt: "For very negative $x$ (far to the left), the sign of $(x+2)(x-1)(x-3)$ is:",
      choices: [
        { text: "positive, because two of the negative factors cancel", explain: "There are three negative factors there, not two, so the product is negative." },
        { text: "negative, because all three factors are negative and $(-)(-)(-)$ is negative", correct: true, explain: "An odd number of negative factors makes the product negative." },
        { text: "positive, because a positive-lead cubic is positive for large $|x|$", explain: "That holds only for large positive $x$. For large negative $x$ a positive-lead cubic is negative." },
      ],
    },
    {
      id: "c-solve-greater",
      prompt: "Using the pattern $-,\\;+,\\;-,\\;+$, the solution of $(x+2)(x-1)(x-3)>0$ is:",
      choices: [
        { text: "$(-\\infty,-2)\\cup(1,3)$", explain: "These are the negative intervals. That would solve $<0$, not $>0$." },
        { text: "$(-2,1)\\cup(3,\\infty)$", correct: true, explain: "Keep the two intervals marked positive and join them with a union." },
        { text: "$(-2,3)$", explain: "This merges across the zero at $x=1$, where the product is actually negative." },
      ],
    },
    {
      id: "c-strict-open",
      prompt: "In the solution of the strict inequality $(x+2)(x-1)(x-3)>0$, the critical points are written with:",
      choices: [
        { text: "parentheses (open), because at each zero the product is $0$, which is not $>0$", correct: true, explain: "Strict $>$ never accepts equality, so the endpoints stay open." },
        { text: "brackets (closed), because the critical points are important", explain: "Importance is not the test. Strict $>$ excludes the zeros, so use parentheses." },
        { text: "brackets, because every solution set uses brackets", explain: "Only non-strict inequalities ($\\ge$ or $\\le$) include the zeros with brackets." },
      ],
    },
    {
      id: "c-nonstrict-closed",
      prompt: "How does the answer change for $(x+2)(x-1)(x-3)\\ge 0$ compared with $>0$?",
      choices: [
        { text: "the answer is unchanged: $(-2,1)\\cup(3,\\infty)$", explain: "Non-strict $\\ge$ must include the zeros, so the endpoints become brackets." },
        { text: "the sign you keep flips to the negative intervals", explain: "Switching $>$ to $\\ge$ never flips the sign you keep. It only fills in the endpoints." },
        { text: "same intervals, now including the zeros: $[-2,1]\\cup[3,\\infty)$", correct: true, explain: "$\\ge$ allows the product to equal $0$, so the critical points are filled in." },
      ],
    },
    {
      id: "c-solve-less",
      prompt: "The solution of $(x+2)(x-1)(x-3)<0$ is:",
      choices: [
        { text: "$(-\\infty,-2)\\cup(1,3)$", correct: true, explain: "Keep the intervals marked negative on the sign chart." },
        { text: "$(-2,1)\\cup(3,\\infty)$", explain: "Those are the positive intervals. Reading the wanted sign backward solves $>0$ instead." },
        { text: "$(-\\infty,-2]\\cup[1,3]$", explain: "Strict $<$ excludes the zeros, so these should be parentheses, not brackets." },
      ],
    },
    {
      id: "c-quad-criticals",
      prompt: "What are the critical points of $(x-4)(x+1)$?",
      choices: [
        { text: "$x=-4$ and $x=1$", explain: "Sign slip: $x-4=0$ gives $x=4$ and $x+1=0$ gives $x=-1$." },
        { text: "$x=4$ and $x=-1$", correct: true, explain: "Set each factor to zero: $x-4=0$ and $x+1=0$." },
        { text: "$x=4$ and $x=1$", explain: "The factor $x+1=0$ gives $x=-1$, not $x=1$." },
      ],
    },
    {
      id: "c-quad-sign",
      prompt: "For $(x-4)(x+1)$, test $x=0$ on the interval $(-1,4)$. The product is:",
      choices: [
        { text: "positive", explain: "Recount: $(-)(+)$ has one negative factor, so the product is negative." },
        { text: "zero", explain: "$x=0$ is strictly inside the interval, not a root, so the product is not $0$." },
        { text: "negative", correct: true, explain: "$(0-4)(0+1)=(-4)(1)=-4$, so it is negative between the roots." },
      ],
    },
    {
      id: "c-quad-solve",
      prompt: "Solve $(x-4)(x+1)<0$.",
      choices: [
        { text: "$(-\\infty,-1)\\cup(4,\\infty)$", explain: "These are the intervals where the product is positive. That solves $>0$." },
        { text: "$[-1,4]$", explain: "Strict $<$ excludes the roots, so use parentheses, not brackets." },
        { text: "$(-4,1)$", explain: "Sign slip on the roots: they are $-1$ and $4$, not $-4$ and $1$." },
        { text: "$(-1,4)$", correct: true, explain: "The upward parabola is below zero only between its roots, and strict $<$ excludes them." },
      ],
    },
    {
      id: "c-quad-solve-ge",
      prompt: "Solve $(x-4)(x+1)\\ge 0$.",
      choices: [
        { text: "$(-\\infty,-1]\\cup[4,\\infty)$", correct: true, explain: "The upward parabola is at or above zero outside its roots, and $\\ge$ includes them." },
        { text: "$(-\\infty,-1)\\cup(4,\\infty)$", explain: "$\\ge$ includes the roots, so the endpoints should be brackets." },
        { text: "$[-1,4]$", explain: "That is where the product is $\\le 0$. This reads the wanted sign backward." },
        { text: "$(-1,4)$", explain: "This is the negative interval, the opposite of what $\\ge 0$ keeps." },
      ],
    },
  ],
  summit: [
    {
      id: "s-one-side",
      prompt: "To solve $x^2 \\le x+6$, the correct first step is:",
      choices: [
        { text: "move everything to one side: $x^2-x-6 \\le 0$", correct: true, explain: "The sign-chart method needs a comparison with $0$, so collect all terms on one side first." },
        { text: "take the square root of both sides to get $x \\le \\sqrt{x+6}$", explain: "You cannot square-root across an inequality like this. Move to one side and factor instead." },
        { text: "divide both sides by $x$", explain: "Dividing by $x$ is unsafe because its sign is unknown, and it can discard solutions." },
      ],
    },
    {
      id: "s-one-side-solve",
      prompt: "Finish solving $x^2 \\le x+6$.",
      choices: [
        { text: "$(-2,3)$", explain: "Non-strict $\\le$ includes the roots, so the endpoints should be brackets." },
        { text: "$(-\\infty,-2]\\cup[3,\\infty)$", explain: "That is where the product is $\\ge 0$. This reads the wanted sign backward." },
        { text: "$[-3,2]$", explain: "Sign slip: $(x-3)(x+2)=0$ gives roots $3$ and $-2$." },
        { text: "$[-2,3]$", correct: true, explain: "Factor to $(x-3)(x+2)\\le 0$. The upward parabola is at or below zero between its roots, endpoints included." },
      ],
    },
    {
      id: "s-squared-concept",
      prompt: "At a zero coming from a **squared** factor such as $(x-1)^2$, the product's sign:",
      choices: [
        { text: "always changes, exactly like any other zero", explain: "Even multiplicity is the exception: the sign holds steady rather than flipping." },
        { text: "does not change. The graph touches the axis and turns back", correct: true, explain: "A factor to an even power keeps the same sign on both sides, so the product does not flip there." },
        { text: "becomes undefined at that point", explain: "The product is simply $0$ there. Polynomials are never undefined." },
      ],
    },
    {
      id: "s-squared-strict",
      prompt: "Solve $(x-1)^2(x-4)>0$.",
      choices: [
        { text: "$(-\\infty,1)\\cup(4,\\infty)$", explain: "This expects a sign flip at $x=1$, but a squared factor does not change the sign." },
        { text: "$(1,4)\\cup(4,\\infty)$", explain: "On $(1,4)$ the product is negative, so it is not part of the $>0$ solution." },
        { text: "$(4,\\infty)$", correct: true, explain: "$(x-1)^2$ is never negative, so the product is positive only where $x-4>0$." },
        { text: "$[4,\\infty)$", explain: "Strict $>$ excludes the zero, so $x=4$ should not be included." },
      ],
    },
    {
      id: "s-squared-nonstrict",
      prompt: "Solve $(x-1)^2(x-4)\\ge 0$.",
      choices: [
        { text: "$\\{1\\}\\cup[4,\\infty)$", correct: true, explain: "The product is positive on $(4,\\infty)$ and equals $0$ at $x=1$ and $x=4$, so the lone point $x=1$ joins the ray." },
        { text: "$[4,\\infty)$", explain: "This drops the isolated solution $x=1$, where the product is $0$ and $\\ge 0$ holds." },
        { text: "$[1,\\infty)$", explain: "This treats $x=1$ as a sign change. Between $1$ and $4$ the product is negative, so that stretch is excluded." },
        { text: "$(4,\\infty)$", explain: "That solves strict $>0$. The non-strict version also keeps the zeros." },
      ],
    },
    {
      id: "s-touch",
      prompt: "For $y=(x+3)(x-2)^2$, the graph near $x=2$:",
      choices: [
        { text: "crosses straight through the axis", explain: "Crossing happens at odd multiplicity. A squared factor makes the graph touch and turn." },
        { text: "touches the x-axis and turns back without crossing", correct: true, explain: "The factor $(x-2)^2$ has even multiplicity, so the curve meets the axis and bounces." },
        { text: "shoots off to a vertical asymptote", explain: "Polynomials have no asymptotes. At $x=2$ the value is simply $0$." },
      ],
    },
    {
      id: "s-squared2",
      prompt: "Solve $(x+3)(x-2)^2 \\ge 0$.",
      choices: [
        { text: "$(-\\infty,-3]\\cup[2,\\infty)$", explain: "This wrongly flips the sign at $x=2$. The squared factor keeps the product positive on both sides of $2$." },
        { text: "$[-3,2]$", explain: "The product stays positive beyond $x=2$ as well, so the solution continues to $+\\infty$." },
        { text: "$(-3,\\infty)$", explain: "$\\ge$ includes the zero at $x=-3$, so that endpoint must be a bracket." },
        { text: "$[-3,\\infty)$", correct: true, explain: "Left of $-3$ the product is negative. From $-3$ on it is positive or $0$, since $(x-2)^2$ never dips below zero." },
      ],
    },
    {
      id: "s-cubic-onesid",
      prompt: "Solve $x^3 \\le 4x$.",
      choices: [
        { text: "$[-2,0]\\cup[2,\\infty)$", explain: "These are the intervals where the product is $\\ge 0$. This reads the wanted sign backward." },
        { text: "$(-\\infty,-2)\\cup(0,2)$", explain: "Non-strict $\\le$ includes the zeros, so the endpoints should be brackets." },
        { text: "$(-\\infty,-2]\\cup[0,2]$", correct: true, explain: "Rewrite as $x(x-2)(x+2)\\le 0$ with zeros $-2,0,2$. The product is negative or $0$ on those two closed intervals." },
        { text: "$[-2,2]$", explain: "Dividing by $x$ to get $x^2\\le 4$ drops the zero at $x=0$ and merges intervals that differ in sign." },
      ],
    },
    {
      id: "s-test-inside",
      prompt: "While solving $x(x-2)(x+2)\\le 0$, which is a valid test point for the interval $(-2,0)$?",
      choices: [
        { text: "$x=-2$", explain: "$x=-2$ is a boundary zero, not an interior point, so it cannot show the interval's sign." },
        { text: "$x=0$", explain: "$x=0$ is the other boundary, a zero of the product, not strictly inside." },
        { text: "$x=1$", explain: "$1$ lies in $(0,2)$, a different interval, so it tests the wrong region." },
        { text: "$x=-1$", correct: true, explain: "$-1$ lies strictly inside $(-2,0)$, so its sign represents the interval." },
      ],
    },
    {
      id: "s-count-neg",
      prompt: "At $x=-1$, count the negative factors of $x(x-2)(x+2)$ and give the product's sign.",
      choices: [
        { text: "two factors are negative, so the product is negative", explain: "An even number of negative factors gives a positive product, not a negative one." },
        { text: "two factors are negative, so the product is positive", correct: true, explain: "$(-1)(-3)(1)=3$. An even count of negative factors makes a positive product." },
        { text: "three factors are negative, so the product is negative", explain: "$x+2=1$ is positive at $x=-1$, so only two factors are negative." },
      ],
    },
    {
      id: "s-read-sign",
      prompt: "Solving $P(x)\\ge 0$ means keeping the intervals where the product is:",
      choices: [
        { text: "negative or zero", explain: "That describes $P(x)\\le 0$. This reads the wanted sign backward." },
        { text: "positive only, never zero", explain: "The $\\ge$ sign also allows equality, so the zeros are included." },
        { text: "positive or zero", correct: true, explain: "$\\ge 0$ is satisfied by positive values and by $0$, so keep the positive intervals and include the zeros." },
      ],
    },
    {
      id: "s-strict-vs-nonstrict",
      prompt: "Two correct write-ups of the same problem read $(-2,1)\\cup(3,\\infty)$ and $[-2,1]\\cup[3,\\infty)$. The difference means:",
      choices: [
        { text: "the first solved a strict inequality ($>$), the second a non-strict one ($\\ge$)", correct: true, explain: "Strict inequalities exclude the zeros (parentheses). Non-strict ones include them (brackets)." },
        { text: "one of them made an arithmetic mistake, since the answers should match", explain: "Both can be right for different inequalities. The bracket type encodes strict versus non-strict." },
        { text: "parentheses and brackets are interchangeable here", explain: "They are not: a bracket includes the endpoint, a parenthesis excludes it." },
      ],
    },
    {
      id: "s-union",
      prompt: "A cubic with a positive leading coefficient has zeros $-4,0,5$, giving the pattern $-,\\;+,\\;-,\\;+$. Solve $P(x)>0$.",
      choices: [
        { text: "$(-4,0)$", explain: "This drops the second positive interval $(5,\\infty)$." },
        { text: "$(-4,0)\\cup(5,\\infty)$", correct: true, explain: "Keep both intervals marked positive and join them with a union." },
        { text: "$(-\\infty,-4)\\cup(0,5)$", explain: "These are the negative intervals. That solves $<0$." },
        { text: "$(0,5)\\cup(5,\\infty)$", explain: "$(0,5)$ is a negative interval, so it does not belong in the $>0$ solution." },
      ],
    },
    {
      id: "s-nonzero",
      prompt: "From $(x-1)(x-5)>3$, a student jumps to $x-1>3$ or $x-5>3$. The mistake is:",
      choices: [
        { text: "nothing is wrong. A product can be split across an inequality like that", explain: "Splitting a product this way is never valid. It only mimics the zero-product idea, which needs a $0$." },
        { text: "they should have divided both sides by $3$", explain: "Dividing by $3$ still leaves a product on the left and isolates nothing useful." },
        { text: "the product is compared with $3$, not $0$, so you must move everything to one side first", correct: true, explain: "Expand, subtract $3$, then factor. The interval method only works against $0$." },
      ],
    },
    {
      id: "s-endpoint",
      prompt: "You reduce $(x+2)(x-1)(x-3)\\le 0$ to the negative intervals plus the zeros. The final answer is:",
      choices: [
        { text: "$(-\\infty,-2]\\cup[1,3]$", correct: true, explain: "Keep the negative intervals and, because $\\le$ allows $0$, include the critical points as brackets." },
        { text: "$(-\\infty,-2)\\cup(1,3)$", explain: "Non-strict $\\le$ includes the zeros, so these endpoints should be brackets." },
        { text: "$[-2,1]\\cup[3,\\infty)$", explain: "These are the positive intervals. That reads the wanted sign backward." },
        { text: "$(-\\infty,3]$", explain: "This merges across $x=-2$ and $x=1$, but the product is positive on $(-2,1)$, so that stretch is excluded." },
      ],
    },
  ],
};
