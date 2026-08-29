import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Vertical asymptotes and holes".
 * Grounded in the lesson: a shared factor cancels to a hole; a leftover
 * denominator factor builds a wall; find the hole's height from the simplified
 * form; both banned x-values leave the domain; the denominator's sign sets the
 * one-sided direction. Distractors are the classic traps.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-def",
      prompt: "Which of these is a **rational function**?",
      choices: [
        { text: "$f(x)=\\dfrac{x^2-1}{x+4}$", correct: true, explain: "A rational function is one polynomial divided by another, which is exactly this form." },
        { text: "$f(x)=\\sqrt{x}+3$", explain: "A square root is not a polynomial, so this is not a ratio of polynomials." },
        { text: "$f(x)=2^{x}$", explain: "That is exponential, not a polynomial over a polynomial." },
        { text: "$f(x)=\\sin x$", explain: "Trig functions are not polynomials, so this is not rational." },
      ],
    },
    {
      id: "c-shared",
      prompt: "In $f(x)=\\dfrac{(x+2)(x-1)}{(x-1)(x-3)}$, which factor is shared by top and bottom?",
      choices: [
        { text: "$(x-1)$", correct: true, explain: "It appears in both numerator and denominator, so it cancels." },
        { text: "$(x+2)$", explain: "That factor is only in the numerator." },
        { text: "$(x-3)$", explain: "That factor is only in the denominator." },
      ],
    },
    {
      id: "c-cancel-hole",
      prompt: "A factor that cancels from both top and bottom produces:",
      choices: [
        { text: "a hole (one removable point)", correct: true, explain: "Cancelling removes a single point, which is a hole." },
        { text: "a vertical asymptote", explain: "A wall comes from a leftover denominator factor, not a cancelled one." },
        { text: "an x-intercept", explain: "Intercepts come from numerator zeros that stay, not from cancelling." },
      ],
    },
    {
      id: "c-leftover-va",
      prompt: "After cancelling, $f(x)=\\dfrac{x+2}{x-3}$. The leftover factor $x-3$ in the denominator creates:",
      choices: [
        { text: "a vertical asymptote at $x=3$", correct: true, explain: "A leftover denominator zero with a nonzero top is a wall." },
        { text: "a hole at $x=3$", explain: "Holes come from factors that cancel; $x-3$ never cancelled." },
        { text: "an x-intercept at $x=3$", explain: "Intercepts come from numerator zeros, not denominator zeros." },
      ],
    },
    {
      id: "c-hole-xy",
      prompt: "The hole of $f(x)=\\dfrac{(x+2)(x-1)}{(x-1)(x-3)}$ sits at which point?",
      choices: [
        { text: "$(1,-1.5)$", correct: true, explain: "Cancel to $\\dfrac{x+2}{x-3}$, then plug $x=1$: $\\dfrac{3}{-2}=-1.5$." },
        { text: "$(1,0)$", explain: "A hole is usually not on the x-axis; find its height from the simplified form." },
        { text: "$(-1,-1.5)$", explain: "The hole is where the cancelled factor is zero, $x=1$, not $x=-1$." },
        { text: "$(3,-1.5)$", explain: "$x=3$ is the vertical asymptote, not the hole." },
      ],
    },
    {
      id: "c-xint",
      prompt: "Where does $f(x)=\\dfrac{(x+2)(x-1)}{(x-1)(x-3)}$ cross the x-axis?",
      choices: [
        { text: "$(-2,0)$", correct: true, explain: "The surviving numerator factor $x+2=0$ gives $x=-2$." },
        { text: "$(1,0)$", explain: "$x=1$ cancelled, so it is a hole, not an intercept." },
        { text: "$(2,0)$", explain: "Sign slip: $x+2=0$ means $x=-2$." },
        { text: "$(3,0)$", explain: "$x=3$ is the vertical asymptote." },
      ],
    },
    {
      id: "c-domain",
      prompt: "Which x-values must be excluded from the domain of $f(x)=\\dfrac{(x+2)(x-1)}{(x-1)(x-3)}$?",
      choices: [
        { text: "$x=1$ and $x=3$", correct: true, explain: "Both make the original denominator zero; $x=1$ is a hole and $x=3$ a wall, but both are banned." },
        { text: "only $x=3$", explain: "$x=1$ is still excluded even though it only makes a hole." },
        { text: "only $x=1$", explain: "$x=3$ also makes the denominator zero." },
        { text: "$x=-2$ and $x=3$", explain: "$x=-2$ is the x-intercept, which is allowed." },
      ],
    },
    {
      id: "c-left",
      prompt: "As $x\\to 3^-$, the bottom $x-3$ is a tiny **negative** number and the top is near $5$. So $f(x)\\to$",
      choices: [
        { text: "$-\\infty$", correct: true, explain: "A positive top over a tiny negative bottom is a large negative number." },
        { text: "$+\\infty$", explain: "That is the right-side behavior; from the left the bottom is negative." },
        { text: "$0$", explain: "Dividing by a shrinking number grows the magnitude; it does not vanish." },
      ],
    },
    {
      id: "c-right",
      prompt: "As $x\\to 3^+$, the bottom $x-3$ is a tiny **positive** number. So $f(x)\\to$",
      choices: [
        { text: "$+\\infty$", correct: true, explain: "A positive top over a tiny positive bottom is a large positive number." },
        { text: "$-\\infty$", explain: "That is the left-side behavior; from the right the bottom is positive." },
        { text: "$1$", explain: "Near the wall the value explodes; it does not settle to a number." },
      ],
    },
    {
      id: "c-g-hole",
      prompt: "For $g(x)=\\dfrac{(x-4)(x+1)}{(x+1)(x+5)}$, the hole is at which x-value?",
      choices: [
        { text: "$x=-1$", correct: true, explain: "$(x+1)$ cancels, so the hole is where $x+1=0$." },
        { text: "$x=-5$", explain: "$(x+5)$ is the leftover denominator factor, so that is the wall." },
        { text: "$x=4$", explain: "$x=4$ is a numerator-only zero, so it is the x-intercept." },
        { text: "$x=1$", explain: "Sign slip: $x+1=0$ gives $x=-1$." },
      ],
    },
    {
      id: "c-g-va",
      prompt: "For $g(x)=\\dfrac{(x-4)(x+1)}{(x+1)(x+5)}$, the vertical asymptote is at:",
      choices: [
        { text: "$x=-5$", correct: true, explain: "$(x+5)$ does not cancel, so its zero is a wall." },
        { text: "$x=-1$", explain: "$(x+1)$ cancels, so $x=-1$ is a hole, not a wall." },
        { text: "$x=4$", explain: "$x=4$ is the x-intercept from the numerator." },
        { text: "$x=5$", explain: "Sign slip: $x+5=0$ gives $x=-5$." },
      ],
    },
    {
      id: "c-g-holexy",
      prompt: "Find the hole of $g(x)=\\dfrac{(x-4)(x+1)}{(x+1)(x+5)}$.",
      choices: [
        { text: "$(-1,-1.25)$", correct: true, explain: "Cancel to $\\dfrac{x-4}{x+5}$, then plug $x=-1$: $\\dfrac{-5}{4}=-1.25$." },
        { text: "$(-1,0)$", explain: "Find the height from the simplified form; the hole is not on the axis here." },
        { text: "$(-5,-1.25)$", explain: "$x=-5$ is the wall; the hole is at $x=-1$." },
        { text: "$(1,-1.25)$", explain: "Sign slip: the hole is at $x=-1$." },
      ],
    },
    {
      id: "c-classify",
      prompt: "$h(x)=\\dfrac{x-2}{(x-2)(x+3)}$. After cancelling, classify $x=2$ and $x=-3$.",
      choices: [
        { text: "hole at $x=2$, vertical asymptote at $x=-3$", correct: true, explain: "$(x-2)$ cancels to a hole; the leftover $(x+3)$ is the wall." },
        { text: "vertical asymptote at $x=2$, hole at $x=-3$", explain: "Backwards: the cancelling factor makes the hole, the leftover makes the wall." },
        { text: "two vertical asymptotes", explain: "$(x-2)$ cancels, so $x=2$ is a hole, not a wall." },
        { text: "two holes", explain: "$(x+3)$ never cancels, so $x=-3$ is a wall." },
      ],
    },
    {
      id: "c-undef",
      prompt: "At the hole $x=1$, what is the value of the original $f(x)=\\dfrac{(x+2)(x-1)}{(x-1)(x-3)}$?",
      choices: [
        { text: "undefined; the function has no value there", correct: true, explain: "The original denominator is zero at $x=1$, so $f(1)$ does not exist." },
        { text: "$-1.5$", explain: "That is the height the hole hovers at, but $f(1)$ itself is undefined." },
        { text: "$0$", explain: "The graph does not reach the axis at $x=1$; the point is missing entirely." },
        { text: "$1$", explain: "There is no output at $x=1$; the point is removed." },
      ],
    },
    {
      id: "c-count",
      prompt: "How many vertical asymptotes does $\\dfrac{(x-1)(x+4)}{(x-1)(x-6)}$ have?",
      choices: [
        { text: "$1$", correct: true, explain: "$(x-1)$ cancels to a hole; only $(x-6)$ remains as a wall." },
        { text: "$2$", explain: "$x=1$ is a hole, not a wall, because $(x-1)$ cancels." },
        { text: "$0$", explain: "$(x-6)$ does not cancel, so there is one wall at $x=6$." },
        { text: "$3$", explain: "There are only two distinct factors in the denominator to begin with." },
      ],
    },
  ],
  summit: [
    {
      id: "s-classify",
      prompt: "For $f(x)=\\dfrac{(x-3)(x+4)}{(x-3)(x-1)}$, which statement is true?",
      choices: [
        { text: "hole at $x=3$, vertical asymptote at $x=1$", correct: true, explain: "$(x-3)$ cancels to a hole; the leftover $(x-1)$ is the wall." },
        { text: "hole at $x=1$, vertical asymptote at $x=3$", explain: "Backwards: the cancelling factor is the hole, the leftover is the wall." },
        { text: "vertical asymptotes at $x=3$ and $x=1$", explain: "$(x-3)$ cancels, so $x=3$ is a hole, not a wall." },
        { text: "hole at $x=3$, vertical asymptote at $x=-1$", explain: "$x-1=0$ gives $x=1$, not $x=-1$." },
      ],
    },
    {
      id: "s-holexy",
      prompt: "Find the coordinates of the hole of $f(x)=\\dfrac{(x-3)(x+4)}{(x-3)(x-1)}$.",
      choices: [
        { text: "$(3,3.5)$", correct: true, explain: "Cancel to $\\dfrac{x+4}{x-1}$, then plug $x=3$: $\\dfrac{7}{2}=3.5$." },
        { text: "$(3,0)$", explain: "Compute the height from the simplified form; the hole is not on the axis." },
        { text: "$(3.5,3)$", explain: "The coordinates are swapped: $x=3$ first, then the height." },
        { text: "$(-3,3.5)$", explain: "Sign slip: the hole is at $x=3$." },
      ],
    },
    {
      id: "s-xint",
      prompt: "Where does $f(x)=\\dfrac{(x-3)(x+4)}{(x-3)(x-1)}$ cross the x-axis?",
      choices: [
        { text: "$(-4,0)$", correct: true, explain: "The surviving numerator factor $x+4=0$ gives $x=-4$." },
        { text: "$(3,0)$", explain: "$x=3$ cancelled, so it is a hole, not an intercept." },
        { text: "$(4,0)$", explain: "Sign slip: $x+4=0$ means $x=-4$." },
        { text: "$(1,0)$", explain: "$x=1$ is the vertical asymptote." },
      ],
    },
    {
      id: "s-domain",
      prompt: "The domain of $f(x)=\\dfrac{(x-3)(x+4)}{(x-3)(x-1)}$ is:",
      choices: [
        { text: "$(-\\infty,1)\\cup(1,3)\\cup(3,\\infty)$", correct: true, explain: "Both $x=1$ and $x=3$ make the original denominator zero, so both are removed." },
        { text: "$(-\\infty,1)\\cup(1,\\infty)$", explain: "The hole at $x=3$ is still excluded from the domain." },
        { text: "$(-\\infty,3)\\cup(3,\\infty)$", explain: "You forgot to exclude the wall at $x=1$." },
        { text: "all real numbers", explain: "Two values, $x=1$ and $x=3$, are banned." },
      ],
    },
    {
      id: "s-right",
      prompt: "For the simplified $f(x)=\\dfrac{x+4}{x-1}$, as $x\\to 1^{+}$, $f(x)\\to$",
      choices: [
        { text: "$+\\infty$", correct: true, explain: "Just above $1$ the bottom is a tiny positive number and the top is about $5$, so the value is large and positive." },
        { text: "$-\\infty$", explain: "That is the left-side behavior; from the right the bottom is positive." },
        { text: "$5$", explain: "Right at the wall the value explodes; it does not settle to $5$." },
        { text: "$0$", explain: "Dividing by a shrinking bottom grows the magnitude, it does not vanish." },
      ],
    },
    {
      id: "s-left",
      prompt: "Same $f(x)=\\dfrac{x+4}{x-1}$: as $x\\to 1^{-}$, $f(x)\\to$",
      choices: [
        { text: "$-\\infty$", correct: true, explain: "Just below $1$ the bottom is a tiny negative number, so a positive top over it is large and negative." },
        { text: "$+\\infty$", explain: "That is the right-side behavior; from the left the bottom is negative." },
        { text: "$-5$", explain: "Near the wall the value explodes; it does not settle to a number." },
        { text: "$0$", explain: "The magnitude grows near a wall; it does not go to zero." },
      ],
    },
    {
      id: "s-no-hole",
      prompt: "Which function has a vertical asymptote at $x=2$ and **no** hole?",
      choices: [
        { text: "$\\dfrac{x+1}{x-2}$", correct: true, explain: "No shared factor, so $x=2$ is a pure wall." },
        { text: "$\\dfrac{(x-2)(x+1)}{x-2}$", explain: "$(x-2)$ cancels, leaving a hole at $x=2$ and no wall there." },
        { text: "$\\dfrac{x+1}{x+2}$", explain: "This has its wall at $x=-2$, not $x=2$." },
        { text: "$\\dfrac{x-2}{x+1}$", explain: "Here $x=2$ is an x-intercept; the wall is at $x=-1$." },
      ],
    },
    {
      id: "s-multiplicity",
      prompt: "A student cancels one $(x+2)$ from $\\dfrac{(x+2)(x-5)}{(x+2)(x+2)}$ and calls $x=-2$ a hole. Correct?",
      choices: [
        { text: "No; one $(x+2)$ remains in the denominator, so $x=-2$ is a vertical asymptote", correct: true, explain: "The denominator has $(x+2)^2$ but the top only one $(x+2)$; after cancelling once, a factor $(x+2)$ still divides zero, so it is a wall." },
        { text: "Yes; $(x+2)$ cancels, so it must be a hole", explain: "Cancelling once does not remove the higher power left in the denominator." },
        { text: "No; $x=-2$ is an x-intercept", explain: "The denominator is zero there, so it cannot be an intercept." },
        { text: "Yes, and there is also a wall at $x=-2$", explain: "There is a wall, but then it is not also a hole; the point is a wall only." },
      ],
    },
    {
      id: "s-method",
      prompt: "To find the y-coordinate of a hole, you should:",
      choices: [
        { text: "substitute the hole's x into the **simplified** function", correct: true, explain: "The original is undefined there, so the simplified form gives the height the point would have." },
        { text: "substitute into the **original** function", explain: "The original gives $0/0$, which is undefined." },
        { text: "set the numerator equal to zero", explain: "That finds x-intercepts, not the hole's height." },
        { text: "always read it off as $0$", explain: "Holes are generally not on the x-axis." },
      ],
    },
    {
      id: "s-count",
      prompt: "How many holes and vertical asymptotes does $\\dfrac{(x+2)(x-5)}{(x-5)(x+7)}$ have?",
      choices: [
        { text: "$1$ hole and $1$ vertical asymptote", correct: true, explain: "$(x-5)$ cancels to a hole at $x=5$; the leftover $(x+7)$ is the wall at $x=-7$." },
        { text: "$2$ holes", explain: "$(x+7)$ never cancels, so it is a wall, not a hole." },
        { text: "$2$ vertical asymptotes", explain: "$(x-5)$ cancels, so $x=5$ is a hole, not a wall." },
        { text: "$1$ hole and $2$ vertical asymptotes", explain: "There is only one leftover denominator factor, so one wall." },
      ],
    },
    {
      id: "s-line-hole",
      prompt: "$f(x)=\\dfrac{(x-6)(x+2)}{x+2}$ simplifies to $x-6$ with a hole. Where is the hole?",
      choices: [
        { text: "$(-2,-8)$", correct: true, explain: "Cancel $(x+2)$; the hole is at $x=-2$ with height $(-2)-6=-8$." },
        { text: "$(-2,0)$", explain: "Compute the height from $x-6$; the hole is not on the axis." },
        { text: "$(6,0)$", explain: "That is the x-intercept of the line, not the hole." },
        { text: "there is a vertical asymptote at $x=-2$", explain: "$(x+2)$ cancels completely, so $x=-2$ is a hole, not a wall." },
      ],
    },
    {
      id: "s-line-domain",
      prompt: "What is the domain of $f(x)=\\dfrac{(x-6)(x+2)}{x+2}$?",
      choices: [
        { text: "$(-\\infty,-2)\\cup(-2,\\infty)$", correct: true, explain: "Only $x=-2$ makes the original denominator zero." },
        { text: "all real numbers", explain: "$x=-2$ is still banned even though it is only a hole." },
        { text: "$(-\\infty,6)\\cup(6,\\infty)$", explain: "$x=6$ is an x-intercept, which is allowed; the excluded value is $-2$." },
        { text: "$(-\\infty,-2)\\cup(-2,6)\\cup(6,\\infty)$", explain: "$x=6$ is fine; only $x=-2$ is excluded." },
      ],
    },
    {
      id: "s-why",
      prompt: "Near a vertical asymptote the graph flies to $\\pm\\infty$ because:",
      choices: [
        { text: "a nonzero numerator is divided by a denominator shrinking to zero", correct: true, explain: "A tiny bottom with a nonzero top gives huge magnitude, and the bottom's sign sets the direction." },
        { text: "the numerator grows without bound", explain: "The blow-up comes from the shrinking bottom, not a growing top." },
        { text: "the numerator and denominator are both zero there", explain: "That is $0/0$, which is a hole, not a wall." },
        { text: "the function equals zero there", explain: "Equalling zero is an x-intercept, the opposite of blowing up." },
      ],
    },
    {
      id: "s-feature",
      prompt: "For $\\dfrac{(x+2)(x-1)}{(x-1)(x-3)}$, what happens at $x=-2$?",
      choices: [
        { text: "an x-intercept at $(-2,0)$", correct: true, explain: "$x+2=0$ makes the simplified numerator zero, so the graph crosses there." },
        { text: "a hole", explain: "Holes sit at cancelled factors, here $x=1$." },
        { text: "a vertical asymptote", explain: "Walls sit at leftover denominator zeros, here $x=3$." },
        { text: "nothing special", explain: "It is the x-intercept, a real feature of the graph." },
      ],
    },
    {
      id: "s-same",
      prompt: "Are $f(x)=\\dfrac{(x-1)(x+2)}{x-1}$ and $g(x)=x+2$ the same function?",
      choices: [
        { text: "No; they agree everywhere except $f$ has a hole at $x=1$", correct: true, explain: "Cancelling is valid only where $x\\neq 1$, so $f$ is $x+2$ with the point at $x=1$ removed." },
        { text: "Yes; $f$ simplifies to $x+2$ exactly", explain: "Cancelling changes the domain, so they are not identical." },
        { text: "No; $f$ has a vertical asymptote at $x=1$", explain: "$(x-1)$ cancels, so $x=1$ is a hole, not a wall." },
        { text: "Yes; both are lines", explain: "$f$ is a line with one missing point, so not exactly the same function." },
      ],
    },
  ],
};
