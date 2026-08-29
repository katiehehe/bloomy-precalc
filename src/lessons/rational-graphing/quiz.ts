import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Complete rational graphing".
 * Grounded in the lesson workflow: factor top and bottom, cancel shared factors
 * (each cancelled factor is a hole), leftover denominator zeros are vertical
 * asymptotes (walls), leftover numerator zeros are x-intercepts, the y-intercept
 * is f(0), end behavior gives a horizontal or slant asymptote, and a sign
 * analysis decides which branch sits above or below the x-axis. Distractors are
 * the classic traps: mislabeling a hole as a wall, confusing intercepts with
 * walls, y-intercept slips, and "a graph can never cross its asymptote".
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-factor-first",
      prompt: "When graphing a rational function such as $f(x)=\\dfrac{x^2-1}{x^2-4}$, what should you do first?",
      choices: [
        { text: "Factor the numerator and denominator.", correct: true, explain: "Factoring reveals shared factors (holes) plus the zeros that become intercepts and walls." },
        { text: "Plot several random points and connect them.", explain: "Guessing points can miss holes and asymptotes; factor first to find the real features." },
        { text: "Find the horizontal asymptote before anything else.", explain: "End behavior is a later step; you factor before locating any feature." },
      ],
    },
    {
      id: "c-hole",
      prompt: "In $f(x)=\\dfrac{(x-3)(x+1)}{(x-3)(x-4)}$, the graph has a hole at:",
      choices: [
        { text: "$x=4$", explain: "$(x-4)$ stays in the denominator, so $x=4$ is a wall, not a hole." },
        { text: "$x=-1$", explain: "$x=-1$ is a surviving numerator zero, so it is an x-intercept." },
        { text: "$x=-3$", explain: "Sign slip: $x-3=0$ gives $x=3$, not $x=-3$." },
        { text: "$x=3$", correct: true, explain: "$(x-3)$ cancels from top and bottom, leaving a single removable hole." },
      ],
    },
    {
      id: "c-va",
      prompt: "Where is the vertical asymptote of $f(x)=\\dfrac{(x-3)(x+1)}{(x-3)(x-4)}$?",
      choices: [
        { text: "$x=3$", explain: "$(x-3)$ cancels, so $x=3$ is a hole, not a wall." },
        { text: "$x=4$", correct: true, explain: "$(x-4)$ does not cancel, so its zero is a wall." },
        { text: "$x=-1$", explain: "$x=-1$ is the x-intercept from the surviving numerator factor." },
      ],
    },
    {
      id: "c-xint",
      prompt: "Where does $f(x)=\\dfrac{(x-3)(x+1)}{(x-3)(x-4)}$ cross the x-axis?",
      choices: [
        { text: "$(1,0)$", explain: "Sign slip: $x+1=0$ means $x=-1$." },
        { text: "$(3,0)$", explain: "$x=3$ cancels to a hole, so it is not an intercept." },
        { text: "$(-1,0)$", correct: true, explain: "The surviving numerator factor $x+1=0$ gives $x=-1$." },
        { text: "$(4,0)$", explain: "$x=4$ is the vertical asymptote, not an intercept." },
      ],
    },
    {
      id: "c-yint",
      prompt: "What is the y-intercept of $f(x)=\\dfrac{x-2}{x+4}$?",
      choices: [
        { text: "$(0,-\\tfrac12)$", correct: true, explain: "The y-intercept is $f(0)=\\dfrac{0-2}{0+4}=-\\tfrac12$." },
        { text: "$(2,0)$", explain: "That is the x-intercept (numerator zero), not the y-intercept." },
        { text: "$(0,-2)$", explain: "You must divide by the denominator at $x=0$: $\\dfrac{-2}{4}=-\\tfrac12$." },
        { text: "$(0,\\tfrac12)$", explain: "Sign check: $\\dfrac{-2}{4}=-\\tfrac12$, which is negative." },
      ],
    },
    {
      id: "c-ha-zero",
      prompt: "What is the horizontal asymptote of $f(x)=\\dfrac{2x+1}{x^2+3}$?",
      choices: [
        { text: "$y=2$", explain: "That would be a leading-coefficient ratio, but that rule applies only when the degrees are equal." },
        { text: "$y=0$", correct: true, explain: "The top degree $1$ is less than the bottom degree $2$, so the ends flatten to $y=0$." },
        { text: "$y=\\tfrac13$", explain: "That is $f(0)$, the y-intercept, not the end behavior." },
        { text: "there is none", explain: "A smaller top degree always gives the horizontal asymptote $y=0$." },
      ],
    },
    {
      id: "c-ha-ratio",
      prompt: "What is the horizontal asymptote of $f(x)=\\dfrac{3x^2+x}{x^2-5}$?",
      choices: [
        { text: "$y=0$", explain: "That rule is for a smaller top degree; here the degrees are equal." },
        { text: "$y=\\tfrac13$", explain: "The ratio is top-over-bottom leading coefficients $\\dfrac{3}{1}$, not $\\dfrac{1}{3}$." },
        { text: "$y=3$", correct: true, explain: "Equal degrees, so the horizontal asymptote is the ratio of leading coefficients $\\dfrac{3}{1}=3$." },
        { text: "there is none", explain: "Equal degrees always give a horizontal asymptote at the leading-coefficient ratio." },
      ],
    },
    {
      id: "c-slant-when",
      prompt: "What kind of end-behavior asymptote does $f(x)=\\dfrac{x^2+3x+2}{x-1}$ have?",
      choices: [
        { text: "a slant asymptote", correct: true, explain: "The top degree ($2$) is exactly one more than the bottom ($1$), so division leaves a slanted line." },
        { text: "a horizontal asymptote at $y=1$", explain: "A larger top degree means no horizontal asymptote; you get a slant instead." },
        { text: "a horizontal asymptote at $y=0$", explain: "$y=0$ needs a smaller top degree; here the top degree is larger." },
        { text: "no asymptote of any kind", explain: "The polynomial division produces a slant asymptote." },
      ],
    },
    {
      id: "c-slant-compute",
      prompt: "Divide to find the slant asymptote of $f(x)=\\dfrac{x^2+3x+2}{x-1}$.",
      choices: [
        { text: "$y=x-1$", explain: "That is the denominator, not the quotient of the division." },
        { text: "$y=x+4$", correct: true, explain: "Long division gives quotient $x+4$ with remainder $6$, so the slant asymptote is $x+4$." },
        { text: "$y=x+4+\\dfrac{6}{x-1}$", explain: "Drop the remainder term; the slant asymptote is just the line $x+4$." },
        { text: "$y=x+3$", explain: "Recheck the division: the quotient is $x+4$, not $x+3$." },
      ],
    },
    {
      id: "c-cross-ha",
      prompt: "Which statement about a rational graph and its asymptotes is true?",
      choices: [
        { text: "A graph can never cross its horizontal asymptote.", explain: "It can; the horizontal asymptote controls only the far ends, not the middle." },
        { text: "A graph can cross a vertical asymptote.", explain: "Never; a vertical asymptote sits at an excluded x-value, so no point of the graph is there." },
        { text: "A graph can cross a horizontal asymptote but never a vertical asymptote.", correct: true, explain: "The horizontal asymptote governs end behavior, so a curve may cross it, while a vertical asymptote is a banned x-value." },
        { text: "A graph must cross both asymptotes exactly once.", explain: "There is no such rule; many rational graphs cross neither in a given region." },
      ],
    },
    {
      id: "c-domain",
      prompt: "Which x-values are excluded from the domain of $f(x)=\\dfrac{(x-3)(x+1)}{(x-3)(x-4)}$?",
      choices: [
        { text: "only $x=4$", explain: "The hole at $x=3$ is still excluded from the domain." },
        { text: "only $x=3$", explain: "The wall at $x=4$ also makes the denominator zero, so it is excluded too." },
        { text: "$x=-1$ and $x=4$", explain: "$x=-1$ is the x-intercept, which is allowed." },
        { text: "$x=3$ and $x=4$", correct: true, explain: "Both zero the original denominator; $x=3$ is a hole and $x=4$ a wall, and both are banned." },
      ],
    },
    {
      id: "c-count-va",
      prompt: "How many vertical asymptotes does $f(x)=\\dfrac{(x-2)(x+5)}{(x-2)(x+1)}$ have?",
      choices: [
        { text: "$1$", correct: true, explain: "$(x-2)$ cancels to a hole, leaving only $(x+1)$ as a wall." },
        { text: "$2$", explain: "$x=2$ is a hole, not a wall, because $(x-2)$ cancels." },
        { text: "$0$", explain: "$(x+1)$ never cancels, so there is one wall at $x=-1$." },
      ],
    },
    {
      id: "c-hole-height",
      prompt: "Find the hole of $f(x)=\\dfrac{(x-1)(x+3)}{(x-1)(x+1)}$.",
      choices: [
        { text: "$(1,0)$", explain: "Find the height from the simplified form; the hole is not on the axis here." },
        { text: "$(1,2)$", correct: true, explain: "Cancel to $\\dfrac{x+3}{x+1}$, then plug $x=1$: $\\dfrac{4}{2}=2$." },
        { text: "$(-1,2)$", explain: "$x=-1$ is the wall; the hole is at $x=1$ where $(x-1)$ cancels." },
        { text: "$(1,4)$", explain: "Use the simplified form: $\\dfrac{1+3}{1+1}=2$, not $4$." },
      ],
    },
    {
      id: "c-sign",
      prompt: "For $f(x)=\\dfrac{x-1}{x+2}$, on the interval $-2<x<1$ the graph is:",
      choices: [
        { text: "above the x-axis (positive)", explain: "A test point like $x=0$ gives $-\\tfrac12$, which is negative, so it is below." },
        { text: "on the x-axis the whole way", explain: "The graph meets the axis only at the x-intercept $x=1$, not across an interval." },
        { text: "below the x-axis (negative)", correct: true, explain: "Test $x=0$: $\\dfrac{0-1}{0+2}=-\\tfrac12<0$, so the branch sits below the axis." },
      ],
    },
    {
      id: "c-branches",
      prompt: "A rational function has vertical asymptotes at $x=-2$ and $x=2$ and no holes. Into how many regions do these two walls split the graph?",
      choices: [
        { text: "$3$", correct: true, explain: "The two walls cut the x-axis into three intervals: $x<-2$, $-2<x<2$, and $x>2$, one branch per region." },
        { text: "$2$", explain: "Two walls make three regions, not two; count the two outer pieces plus the middle." },
        { text: "$4$", explain: "Two vertical lines create three intervals along the x-axis, not four." },
      ],
    },
  ],
  summit: [
    {
      id: "s-statement",
      prompt: "For $f(x)=\\dfrac{x^2-4}{x^2-x-6}$, which factors to $\\dfrac{(x-2)(x+2)}{(x-3)(x+2)}$, which statement is true?",
      choices: [
        { text: "There is a hole at $x=-2$ and a vertical asymptote at $x=3$.", correct: true, explain: "$(x+2)$ cancels to a hole; the leftover $(x-3)$ is the wall." },
        { text: "There are vertical asymptotes at $x=-2$ and $x=3$.", explain: "$(x+2)$ cancels, so $x=-2$ is a hole, not a wall." },
        { text: "There is a hole at $x=3$ and a vertical asymptote at $x=-2$.", explain: "Backwards: the cancelling factor $(x+2)$ is the hole, the leftover $(x-3)$ is the wall." },
        { text: "There is an x-intercept at $x=-2$.", explain: "$x=-2$ cancels to a hole, so the graph has no point there at all." },
      ],
    },
    {
      id: "s-hole",
      prompt: "Find the hole of $f(x)=\\dfrac{x^2-4}{x^2-x-6}$.",
      choices: [
        { text: "$(-2,0)$", explain: "Find the height from the simplified form; the hole is not on the axis here." },
        { text: "$(-2,0.8)$", correct: true, explain: "Cancel $(x+2)$ to get $\\dfrac{x-2}{x-3}$, then plug $x=-2$: $\\dfrac{-4}{-5}=0.8$." },
        { text: "$(3,0.8)$", explain: "$x=3$ is the wall; the hole is at $x=-2$ where $(x+2)$ cancels." },
        { text: "$(-2,-0.8)$", explain: "Sign check: $\\dfrac{-4}{-5}$ is positive, so the height is $+0.8$." },
      ],
    },
    {
      id: "s-domain",
      prompt: "What is the domain of $f(x)=\\dfrac{x^2-4}{x^2-x-6}$?",
      choices: [
        { text: "$(-\\infty,3)\\cup(3,\\infty)$", explain: "The hole at $x=-2$ is still excluded from the domain." },
        { text: "$(-\\infty,-2)\\cup(-2,\\infty)$", explain: "You forgot to exclude the wall at $x=3$." },
        { text: "$(-\\infty,-2)\\cup(-2,3)\\cup(3,\\infty)$", correct: true, explain: "Both $x=-2$ (hole) and $x=3$ (wall) zero the original denominator, so both are removed." },
        { text: "all real numbers", explain: "Two values, $x=-2$ and $x=3$, make the denominator zero." },
      ],
    },
    {
      id: "s-slant",
      prompt: "Find the slant asymptote of $f(x)=\\dfrac{x^2-9}{x-2}$.",
      choices: [
        { text: "$y=x-2$", explain: "That is the denominator, not the quotient of the division." },
        { text: "$y=x+2-\\dfrac{5}{x-2}$", explain: "Drop the remainder term; the slant asymptote is only the line $x+2$." },
        { text: "$y=0$", explain: "A top degree larger than the bottom gives a slant, not a horizontal asymptote at $y=0$." },
        { text: "$y=x+2$", correct: true, explain: "Dividing $x^2-9$ by $x-2$ gives quotient $x+2$ with remainder $-5$, so the slant asymptote is $x+2$." },
      ],
    },
    {
      id: "s-no-hole",
      prompt: "Which statement about $f(x)=\\dfrac{x^2-9}{x-2}$ is true?",
      choices: [
        { text: "It has x-intercepts at $x=3$ and $x=-3$ and no hole.", correct: true, explain: "$x^2-9=(x-3)(x+3)$ shares no factor with $x-2$, so nothing cancels and both zeros are intercepts." },
        { text: "It has a hole at $x=2$.", explain: "Nothing cancels, so $x=2$ is a vertical asymptote, not a hole." },
        { text: "It has a horizontal asymptote at $y=1$.", explain: "The top degree is larger than the bottom, so there is a slant asymptote, not a horizontal one." },
        { text: "It has an x-intercept at $x=2$.", explain: "$x=2$ zeroes the denominator (a wall); intercepts come from numerator zeros." },
      ],
    },
    {
      id: "s-ha-zero",
      prompt: "What is the horizontal asymptote of $f(x)=\\dfrac{x-1}{(x+2)(x-3)}$?",
      choices: [
        { text: "$y=1$", explain: "Equal degrees would give a nonzero ratio, but here the bottom degree is larger." },
        { text: "$y=0$", correct: true, explain: "The top has degree $1$ and the bottom degree $2$, so the ends flatten to $y=0$." },
        { text: "a slant asymptote", explain: "A slant needs the top degree one more than the bottom; here the top degree is smaller." },
        { text: "$y=\\tfrac16$", explain: "That is $f(0)$, the y-intercept, not the end behavior." },
      ],
    },
    {
      id: "s-sign",
      prompt: "For $f(x)=\\dfrac{x-1}{(x+2)(x-3)}$, on the interval $1<x<3$ the graph sits:",
      choices: [
        { text: "above the x-axis", explain: "At $x=2$ the value is $-\\tfrac14$, which is negative, so it is below." },
        { text: "right on the x-axis throughout", explain: "The only x-intercept is $x=1$; across $1<x<3$ the sign stays fixed." },
        { text: "below the x-axis", correct: true, explain: "Test $x=2$: $\\dfrac{1}{(4)(-1)}=-\\tfrac14<0$, so the branch is below the axis." },
      ],
    },
    {
      id: "s-cross-ha",
      prompt: "The graph of $f(x)=\\dfrac{x-1}{(x+2)(x-3)}$ crosses its horizontal asymptote $y=0$. At which point?",
      choices: [
        { text: "at the x-intercept $(1,0)$", correct: true, explain: "Crossing $y=0$ means $f(x)=0$, which happens where the numerator is zero, at $x=1$." },
        { text: "it can never cross a horizontal asymptote", explain: "A curve may cross a horizontal asymptote; only vertical asymptotes are off-limits." },
        { text: "at the y-intercept $(0,\\tfrac16)$", explain: "The y-intercept is not on the line $y=0$, so it is not a crossing point." },
        { text: "at $x=-2$", explain: "$x=-2$ is a vertical asymptote, so the graph has no point there." },
      ],
    },
    {
      id: "s-which-hole",
      prompt: "Which function has a hole?",
      choices: [
        { text: "$\\dfrac{x+1}{(x-4)(x-2)}$", explain: "No factor is shared, so $x=4$ and $x=2$ are walls, not holes." },
        { text: "$\\dfrac{(x-4)(x+1)}{(x-4)(x-2)}$", correct: true, explain: "Top and bottom share $(x-4)$, which cancels to a removable hole at $x=4$." },
        { text: "$\\dfrac{(x-4)(x+1)}{x-2}$", explain: "Nothing cancels, so this has a wall at $x=2$ and no hole." },
        { text: "$\\dfrac{x-4}{x+1}$", explain: "No shared factor, so there is no hole (just a wall at $x=-1$)." },
      ],
    },
    {
      id: "s-multiplicity",
      prompt: "A student cancels one $(x+1)$ from $f(x)=\\dfrac{(x+1)(x-5)}{(x+1)^2(x-2)}$ and calls $x=-1$ a hole. Is that correct?",
      choices: [
        { text: "Yes; $(x+1)$ cancels, so it must be a hole.", explain: "Cancelling once does not remove the extra power of $(x+1)$ left in the denominator." },
        { text: "No; $x=-1$ is an x-intercept.", explain: "The denominator is still zero there, so it cannot be an intercept." },
        { text: "No; one $(x+1)$ still remains in the denominator, so $x=-1$ is a vertical asymptote.", correct: true, explain: "The bottom has $(x+1)^2$ but the top only one $(x+1)$; after cancelling once, a factor $(x+1)$ still divides zero, making it a wall." },
        { text: "Yes, and there is also a wall at $x=-1$.", explain: "A single point cannot be both a hole and a wall; here it is a wall only." },
      ],
    },
    {
      id: "s-yint",
      prompt: "What is the y-intercept of $f(x)=\\dfrac{(x-2)(x+3)}{(x+1)(x-4)}$?",
      choices: [
        { text: "$(2,0)$ and $(-3,0)$", explain: "Those are the x-intercepts (numerator zeros); the y-intercept is $f(0)$." },
        { text: "$(0,-1.5)$", explain: "Sign check: $\\dfrac{-6}{-4}$ is positive, so $+1.5$." },
        { text: "$(0,6)$", explain: "Divide by the denominator at $x=0$: $\\dfrac{-6}{-4}=1.5$, not $6$." },
        { text: "$(0,1.5)$", correct: true, explain: "$f(0)=\\dfrac{(-2)(3)}{(1)(-4)}=\\dfrac{-6}{-4}=1.5$." },
      ],
    },
    {
      id: "s-count",
      prompt: "For $f(x)=\\dfrac{(x+3)(x-2)}{(x-2)(x+5)}$, count the holes, vertical asymptotes, and x-intercepts.",
      choices: [
        { text: "$1$ hole, $1$ vertical asymptote, $1$ x-intercept", correct: true, explain: "$(x-2)$ cancels to a hole at $x=2$, $(x+5)$ is the wall at $x=-5$, and the surviving $(x+3)$ gives the intercept at $x=-3$." },
        { text: "$0$ holes, $2$ vertical asymptotes, $1$ x-intercept", explain: "$(x-2)$ cancels, so $x=2$ is a hole, not a second wall." },
        { text: "$1$ hole, $1$ vertical asymptote, $2$ x-intercepts", explain: "$x=2$ cancels to a hole, so only $(x+3)$ survives to make one intercept." },
        { text: "$1$ hole, $0$ vertical asymptotes, $1$ x-intercept", explain: "$(x+5)$ never cancels, so there is one wall at $x=-5$." },
      ],
    },
    {
      id: "s-method",
      prompt: "To find the height (y-coordinate) of a hole, you should:",
      choices: [
        { text: "substitute the hole's x-value into the **original** function", explain: "The original is $\\dfrac{0}{0}$ at a hole, which is undefined." },
        { text: "substitute the hole's x-value into the **simplified** function", correct: true, explain: "The original gives $\\dfrac{0}{0}$ there, so the simplified form gives the height the point would have had." },
        { text: "set the whole function equal to zero", explain: "That finds x-intercepts, not the hole's height." },
        { text: "read it off the horizontal asymptote", explain: "The hole's height comes from the simplified function, not the end behavior." },
      ],
    },
    {
      id: "s-undefined",
      prompt: "At its hole $x=5$, what is the value of $g(x)=\\dfrac{(x-5)(x+1)}{(x-5)(x-1)}$?",
      choices: [
        { text: "$1.5$", explain: "That is the hole's height from the simplified form, but the original $g(5)$ is undefined." },
        { text: "$0$", explain: "The graph skips the point entirely; it does not touch the axis at $x=5$." },
        { text: "undefined; the point is missing", correct: true, explain: "The original denominator is zero at $x=5$ (a $\\dfrac{0}{0}$ form), so $g(5)$ does not exist even though the hole hovers at height $1.5$." },
        { text: "$5$", explain: "There is no output at a hole; $x=5$ is excluded from the domain." },
      ],
    },
    {
      id: "s-build",
      prompt: "Which function has a hole at $x=-1$, a vertical asymptote at $x=2$, and an x-intercept at $x=3$?",
      choices: [
        { text: "$\\dfrac{(x-1)(x-3)}{(x-1)(x-2)}$", explain: "This puts the hole at $x=1$, not $x=-1$." },
        { text: "$\\dfrac{(x+1)(x+3)}{(x+1)(x-2)}$", explain: "This gives an x-intercept at $x=-3$, not $x=3$." },
        { text: "$\\dfrac{(x+1)(x-3)}{(x+1)(x+2)}$", explain: "This puts the wall at $x=-2$, not $x=2$." },
        { text: "$\\dfrac{(x+1)(x-3)}{(x+1)(x-2)}$", correct: true, explain: "$(x+1)$ cancels for the hole at $x=-1$, $(x-2)$ stays as the wall at $x=2$, and the surviving $(x-3)$ gives the intercept at $x=3$." },
      ],
    },
  ],
};
