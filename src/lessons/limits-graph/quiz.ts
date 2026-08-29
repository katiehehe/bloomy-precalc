import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for reading limits from graphs and
 * tables. Grounded in the lesson: lim_{x->a} f(x) = L is the height f(x)
 * approaches from both sides, independent of f(a); the two-sided limit exists iff
 * the left-hand and right-hand limits exist and are equal; a hole (removable
 * discontinuity) still has a limit, while a jump has none.
 *
 * Distractors are the standard traps: reading f(a) instead of the limit; forgetting
 * the two one-sided limits must be EQUAL; concluding a limit exists at a jump;
 * assuming a hole forces the limit to not exist; mixing up left and right; and
 * reading the limit off the filled dot's height. Every value below is verified by
 * hand: (x^2-4)/(x-2) -> 4 at x=2, (x^2-9)/(x-3) -> 6 at x=3, |x|/x jumps -1 to 1.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-def",
      prompt: "$\\lim_{x \\to a} f(x) = L$ means that $f(x)$:",
      choices: [
        { text: "gets arbitrarily close to $L$ as $x$ approaches $a$ from both sides", correct: true, explain: "A limit is the height the outputs close in on as the inputs near $a$ from the left and the right." },
        { text: "equals $L$ exactly when $x = a$", explain: "That describes the value $f(a)$, not the limit; the limit is about the trend near $a$." },
        { text: "equals $a$ when $x = L$", explain: "This swaps the roles of input, output, and limit; $L$ is the height approached near $x = a$." },
        { text: "stays far from $L$ near $a$", explain: "The opposite is true: near $a$ the outputs get arbitrarily close to $L$." },
      ],
    },
    {
      id: "c-ignores-value",
      prompt: "The limit $\\lim_{x \\to a} f(x)$:",
      choices: [
        { text: "must equal $f(a)$", explain: "Not so: the limit can exist even when $f(a)$ is undefined or sits at a different height." },
        { text: "ignores the single value $f(a)$ and depends on the trend near $a$", correct: true, explain: "A limit is decided by the neighborhood around $a$, not by the one value at $a$." },
        { text: "only exists when $f(a)$ is undefined", explain: "The limit can exist whether or not $f(a)$ is defined; the value is simply irrelevant to it." },
        { text: "is always larger than $f(a)$", explain: "There is no size rule between the limit and the value; they can be equal, larger, or smaller." },
      ],
    },
    {
      id: "c-left-notation",
      prompt: "$\\lim_{x \\to a^{-}} f(x)$, a left-hand limit, considers inputs:",
      choices: [
        { text: "greater than $a$", explain: "That is the right-hand limit $\\lim_{x \\to a^{+}}$; the minus sign means the left." },
        { text: "equal to $a$", explain: "A limit never uses $x = a$ itself, only inputs near $a$." },
        { text: "less than $a$, approaching from the left", correct: true, explain: "The minus superscript means $x$ slightly less than $a$, coming in from below." },
        { text: "far below $a$, never approaching", explain: "One-sided limits use inputs close to $a$ (just below), not far away." },
      ],
    },
    {
      id: "c-exists-iff",
      prompt: "The two-sided limit $\\lim_{x \\to a} f(x)$ exists exactly when:",
      choices: [
        { text: "$f(a)$ is defined", explain: "The value at $a$ has no bearing on whether the limit exists." },
        { text: "the left-hand limit exists", explain: "The right-hand limit must exist too, and both must match." },
        { text: "the two one-sided limits exist, even if they are unequal", explain: "Unequal one-sided limits give a jump, and then the two-sided limit does not exist." },
        { text: "the left-hand and right-hand limits both exist and are equal", correct: true, explain: "Existence needs both one-sided limits to exist and agree on the same height." },
      ],
    },
    {
      id: "c-table",
      prompt: "A table gives $f(1.9) = 2.9$, $f(1.99) = 2.99$, $f(2.01) = 3.01$, $f(2.1) = 3.1$. Then $\\lim_{x \\to 2} f(x)$ is about:",
      choices: [
        { text: "$3$", correct: true, explain: "Both sides close in on $3$ (from $2.99$ below and $3.01$ above), so the limit is $3$." },
        { text: "$2$", explain: "$2$ is the input $x$ being approached, not the height the outputs approach." },
        { text: "$2.99$", explain: "That is one table entry; the limit is the value the entries settle on, which is $3$." },
        { text: "does not exist", explain: "Both sides settle on the same number, $3$, so the limit does exist." },
      ],
    },
    {
      id: "c-hole-exists",
      prompt: "A graph has a hole (open circle) at $(2, 4)$ and no other point above $x = 2$. Then $\\lim_{x \\to 2} f(x)$:",
      choices: [
        { text: "does not exist, because $f(2)$ is undefined", explain: "A hole does not stop a limit; an undefined value at the point is fine." },
        { text: "equals $4$, the height of the hole", correct: true, explain: "Both branches approach height $4$, so the limit is $4$ even though the point is missing." },
        { text: "equals $2$", explain: "$2$ is the input; the limit is the output height $4$." },
        { text: "equals $0$", explain: "The branches meet at height $4$, not $0$." },
      ],
    },
    {
      id: "c-removable",
      prompt: "A graph shows an open circle at $(3, 5)$ and a separate filled dot at $(3, 2)$. Then $\\lim_{x \\to 3} f(x)$ is:",
      choices: [
        { text: "$2$, the filled dot", explain: "The filled dot is the value $f(3) = 2$; the limit follows the branches, not the value." },
        { text: "nonexistent", explain: "Both branches head to the open circle, so the limit exists." },
        { text: "$5$, the height the branches approach", correct: true, explain: "The curve approaches the open circle at height $5$ from both sides, so the limit is $5$." },
        { text: "$3$", explain: "$3$ is the input $x$; the limit is the output height $5$." },
      ],
    },
    {
      id: "c-jump-dne",
      prompt: "At $x = 2$ a graph jumps: the left branch approaches $1$ and the right branch approaches $3$. Then $\\lim_{x \\to 2} f(x)$:",
      choices: [
        { text: "equals $1$", explain: "That is only the left-hand limit; a two-sided limit needs both sides to agree." },
        { text: "equals $3$", explain: "That is only the right-hand limit; the sides disagree here." },
        { text: "equals $2$, the average", explain: "The two-sided limit is not an average of disagreeing sides; it simply does not exist." },
        { text: "does not exist, since the two sides disagree", correct: true, explain: "Left limit $1$ and right limit $3$ differ, so the two-sided limit does not exist." },
      ],
    },
    {
      id: "c-hole-not-dne",
      prompt: "Does a hole in the graph always mean the limit does not exist?",
      choices: [
        { text: "No: if both branches approach the same height, the limit exists and equals that height", correct: true, explain: "A removable hole still has both branches meeting at one height, so the limit exists." },
        { text: "Yes, a hole always breaks the limit", explain: "A hole only removes a single point; the surrounding trend can still have a limit." },
        { text: "Yes, holes make $f(a)$ undefined, so no limit", explain: "An undefined $f(a)$ does not prevent a limit; the limit ignores $f(a)$." },
        { text: "No, a hole means the limit equals $f(a)$", explain: "At a hole $f(a)$ is undefined, so the limit cannot equal it; the limit is the hole's height." },
      ],
    },
    {
      id: "c-value-dot",
      prompt: "A filled dot at $(a, f(a))$ on a graph tells you:",
      choices: [
        { text: "the limit $\\lim_{x \\to a} f(x)$", explain: "The filled dot is the value $f(a)$, which need not equal the limit." },
        { text: "the value $f(a)$, which may differ from the limit", correct: true, explain: "A filled dot marks the actual output at $a$; the limit comes from the branches." },
        { text: "the left-hand limit only", explain: "A one-sided limit is read from a branch, not from the single plotted value." },
        { text: "nothing about the function", explain: "It does tell you something: the exact value $f(a)$." },
      ],
    },
    {
      id: "c-left-table",
      prompt: "To estimate the left-hand limit $\\lim_{x \\to 2^{-}} f(x)$ from a table, use inputs:",
      choices: [
        { text: "$2.1, 2.01, 2.001$", explain: "Those are greater than $2$, so they estimate the right-hand limit." },
        { text: "$2$ exactly", explain: "A limit never uses $x = 2$ itself, only nearby inputs." },
        { text: "$1.9, 1.99, 1.999$", correct: true, explain: "These are just below $2$, closing in from the left." },
        { text: "$0, 1, 2$", explain: "Those are too far from $2$ to reveal the trend right at $2$." },
      ],
    },
    {
      id: "c-simplify",
      prompt: "For $g(x) = \\dfrac{x^2 - 4}{x - 2}$, the value of $\\lim_{x \\to 2} g(x)$ is:",
      choices: [
        { text: "$4$", correct: true, explain: "Factor and cancel: $\\dfrac{(x-2)(x+2)}{x-2} = x + 2 \\to 4$ as $x \\to 2$." },
        { text: "$0$", explain: "Substituting gives $\\tfrac{0}{0}$, which is undefined, not $0$; simplify first to get $4$." },
        { text: "undefined, because $g(2) = \\tfrac{0}{0}$", explain: "$g(2)$ is undefined, but the limit ignores that and equals $4$." },
        { text: "$2$", explain: "$2$ is the input; the limit is the height $x + 2 = 4$." },
      ],
    },
    {
      id: "c-both-equal",
      prompt: "If $\\lim_{x \\to a^{-}} f(x) = 2$ and $\\lim_{x \\to a^{+}} f(x) = 2$, then $\\lim_{x \\to a} f(x)$:",
      choices: [
        { text: "does not exist", explain: "The sides agree, so the two-sided limit does exist." },
        { text: "equals $2$", correct: true, explain: "Both one-sided limits are $2$ and match, so the two-sided limit is $2$." },
        { text: "equals $4$, the sum", explain: "You do not add the one-sided limits; when they agree, the limit is their shared value $2$." },
        { text: "equals $a$", explain: "$a$ is the input; the limit is the output value $2$." },
      ],
    },
    {
      id: "c-both-differ",
      prompt: "If $\\lim_{x \\to a^{-}} f(x) = 2$ and $\\lim_{x \\to a^{+}} f(x) = 5$, then $\\lim_{x \\to a} f(x)$:",
      choices: [
        { text: "equals $2$", explain: "That is only the left side; a two-sided limit needs both sides equal." },
        { text: "equals $5$", explain: "That is only the right side; the sides disagree here." },
        { text: "equals $3.5$, the average", explain: "The limit is not an average of disagreeing sides; it does not exist." },
        { text: "does not exist", correct: true, explain: "Left $2$ and right $5$ differ, so the two-sided limit does not exist." },
      ],
    },
    {
      id: "c-trend",
      prompt: "A limit $\\lim_{x \\to a} f(x)$ describes:",
      choices: [
        { text: "the value of $f$ exactly at $a$", explain: "That is $f(a)$; a limit is about the nearby trend, not the value at $a$." },
        { text: "the largest value of $f$", explain: "A limit is a local height near $a$, not a maximum of the whole function." },
        { text: "the height $f(x)$ approaches as $x$ nears $a$", correct: true, explain: "That is exactly the definition of the limit." },
        { text: "the steepness of $f$ at $a$", explain: "Steepness is a slope idea; a limit here is a height, not a slope." },
      ],
    },
  ],
  summit: [
    {
      id: "s-value-defined",
      prompt: "A graph has $\\lim_{x \\to 2^{-}} f(x) = 4$, $\\lim_{x \\to 2^{+}} f(x) = 4$, and a filled dot showing $f(2) = 1$. Then $\\lim_{x \\to 2} f(x)$ is:",
      choices: [
        { text: "$1$, since $f(2) = 1$", explain: "The limit ignores the value $f(2)$; it depends only on the branches." },
        { text: "$4$, since both sides approach $4$ (the value is irrelevant)", correct: true, explain: "Both one-sided limits are $4$ and agree, so the limit is $4$, whatever $f(2)$ is." },
        { text: "does not exist, since $4 \\ne 1$", explain: "The mismatch is between the limit and the value, which is allowed; the sides still agree at $4$." },
        { text: "$2.5$, the average of $1$ and $4$", explain: "You never average the value with the limit; the limit is simply $4$." },
      ],
    },
    {
      id: "s-jump-defined",
      prompt: "A graph jumps at $x = 0$: the left branch approaches $-1$, the right approaches $1$, and $f(0) = -1$ (a filled dot on the left branch). Then $\\lim_{x \\to 0} f(x)$:",
      choices: [
        { text: "equals $-1$, since $f(0) = -1$", explain: "A defined value cannot make a limit exist when the two sides disagree." },
        { text: "equals $1$, the right side", explain: "That is only the right-hand limit; the sides differ, so no two-sided limit." },
        { text: "does not exist, because the left and right limits differ", correct: true, explain: "Left $-1$ and right $1$ disagree, so the two-sided limit does not exist, even though $f(0)$ is defined." },
        { text: "equals $0$", explain: "$0$ is the input; and the disagreeing sides mean there is no two-sided limit anyway." },
      ],
    },
    {
      id: "s-abs",
      prompt: "For $f(x) = \\dfrac{|x|}{x}$, which is $-1$ for $x < 0$ and $1$ for $x > 0$, $\\lim_{x \\to 0} f(x)$:",
      choices: [
        { text: "does not exist: the left limit is $-1$ and the right limit is $1$", correct: true, explain: "The one-sided limits are $-1$ and $1$; they differ, so the two-sided limit does not exist." },
        { text: "equals $0$", explain: "The function is never near $0$; it is $-1$ on the left and $1$ on the right." },
        { text: "equals $1$", explain: "That is only the right-hand limit; the left-hand limit is $-1$." },
        { text: "equals $-1$", explain: "That is only the left-hand limit; the right-hand limit is $1$." },
      ],
    },
    {
      id: "s-simplify9",
      prompt: "$\\lim_{x \\to 3} \\dfrac{x^2 - 9}{x - 3}$ equals:",
      choices: [
        { text: "$0$, from $\\tfrac{0}{0}$", explain: "$\\tfrac{0}{0}$ is undefined, not $0$; cancel the factor first." },
        { text: "$3$", explain: "$3$ is the input; the simplified height is $x + 3 = 6$." },
        { text: "does not exist", explain: "After canceling, $x + 3$ is a plain line, so the limit exists and is $6$." },
        { text: "$6$", correct: true, explain: "$\\dfrac{(x-3)(x+3)}{x-3} = x + 3 \\to 6$ as $x \\to 3$." },
      ],
    },
    {
      id: "s-table-diverge",
      prompt: "A table gives $f(2.1) = 10$, $f(2.01) = 100$, $f(2.001) = 1000$, growing larger. The right-hand limit $\\lim_{x \\to 2^{+}} f(x)$:",
      choices: [
        { text: "equals $1000$", explain: "$1000$ is just the latest entry; the values keep growing, they do not settle." },
        { text: "equals $2$", explain: "$2$ is the input; the outputs are shooting up, not approaching $2$." },
        { text: "does not exist as a finite number; the values grow without bound", correct: true, explain: "The outputs increase without settling, so there is no finite limit (the function heads to infinity)." },
        { text: "equals $0$", explain: "The values are getting large, not shrinking to $0$." },
      ],
    },
    {
      id: "s-classify-removable",
      prompt: "A function has $\\lim_{x \\to a} f(x) = L$ but $f(a) \\ne L$ (or $f(a)$ is undefined). This is:",
      choices: [
        { text: "a removable discontinuity", correct: true, explain: "The limit exists but does not match the value, so a single point could be moved to fix it: removable." },
        { text: "a jump discontinuity", explain: "A jump has unequal one-sided limits; here the two-sided limit exists." },
        { text: "a vertical asymptote", explain: "An asymptote has outputs blowing up; here the limit is a finite $L$." },
        { text: "a continuous point", explain: "Continuity needs the limit to equal $f(a)$; here they differ." },
      ],
    },
    {
      id: "s-classify-jump",
      prompt: "A function has $\\lim_{x \\to a^{-}} f(x) \\ne \\lim_{x \\to a^{+}} f(x)$, both finite. This is:",
      choices: [
        { text: "a removable discontinuity", explain: "Removable means the two-sided limit exists; here the sides disagree, so it does not." },
        { text: "a jump discontinuity", correct: true, explain: "Two finite but unequal one-sided limits are the definition of a jump." },
        { text: "a continuous point", explain: "Continuity requires a single limit equal to the value; a jump has no two-sided limit." },
        { text: "a removable hole", explain: "A hole is a single missing point with a limit that exists; a jump has no two-sided limit." },
      ],
    },
    {
      id: "s-graph-which",
      prompt: "At $x = 1$, which situation guarantees that $\\lim_{x \\to 1} f(x)$ exists?",
      choices: [
        { text: "$f(1)$ is defined", explain: "A defined value says nothing about the limit; the sides could still disagree." },
        { text: "the left-hand limit is $2$ and the right-hand limit is $5$", explain: "Unequal one-sided limits are a jump, so the two-sided limit does not exist." },
        { text: "there is a vertical asymptote at $x = 1$", explain: "An asymptote means the outputs blow up, so no finite two-sided limit." },
        { text: "the left-hand and right-hand limits both equal $3$", correct: true, explain: "Matching one-sided limits guarantee the two-sided limit exists (and equals $3$)." },
      ],
    },
    {
      id: "s-arrow-notation",
      prompt: "The statement $f(x) \\to 4$ as $x \\to 2$ is another way to write:",
      choices: [
        { text: "$f(2) = 4$", explain: "That is the value at $2$; the arrow statement is about the trend near $2$." },
        { text: "$2 \\to 4$", explain: "That is meaningless here; the arrow describes $f(x)$ approaching $4$ as $x$ approaches $2$." },
        { text: "$\\lim_{x \\to 2} f(x) = 4$", correct: true, explain: "The arrow phrasing and the limit notation say the same thing: $f(x)$ approaches $4$ as $x$ approaches $2$." },
        { text: "$f(4) = 2$", explain: "This swaps the numbers; the input approaches $2$ and the output approaches $4$." },
      ],
    },
    {
      id: "s-value-irrelevant",
      prompt: "Changing only the single value $f(2)$ (moving the filled dot up or down), leaving the rest of the graph the same:",
      choices: [
        { text: "does not change $\\lim_{x \\to 2} f(x)$", correct: true, explain: "The limit depends on the branches near $2$, not on the one value $f(2)$." },
        { text: "always makes the limit not exist", explain: "Moving the value does not touch the branches, so the limit is unaffected." },
        { text: "changes the limit to the new $f(2)$", explain: "The limit never tracks $f(2)$; it stays the height the branches approach." },
        { text: "changes the left-hand limit only", explain: "The value at a point is not part of any one-sided limit; both are unchanged." },
      ],
    },
    {
      id: "s-onesided-exist-two",
      prompt: "At a jump discontinuity, the two one-sided limits:",
      choices: [
        { text: "do not exist", explain: "At a jump each side does approach a finite height; they just disagree." },
        { text: "both exist but are unequal, so the two-sided limit does not exist", correct: true, explain: "That is exactly a jump: finite one-sided limits that differ, so no two-sided limit." },
        { text: "are equal", explain: "If they were equal it would not be a jump; a jump means they differ." },
        { text: "average to the two-sided limit", explain: "There is no two-sided limit at a jump, and it is never an average of the sides." },
      ],
    },
    {
      id: "s-hole-height",
      prompt: "For a removable hole, the two-sided limit equals:",
      choices: [
        { text: "the value at the filled replacement dot", explain: "The filled dot may sit elsewhere; the limit is where the branches meet, the open circle." },
        { text: "$0$ always", explain: "The limit is the hole's height, which is usually not $0$." },
        { text: "the input $a$", explain: "$a$ is an input; the limit is an output height." },
        { text: "the height of the open circle, where the branches meet", correct: true, explain: "Both branches head to the open circle, so the limit is that height." },
      ],
    },
    {
      id: "s-continuity-need",
      prompt: "For $f$ to be continuous at $a$, you need the limit to exist and also:",
      choices: [
        { text: "$\\lim_{x \\to a} f(x) = f(a)$", correct: true, explain: "Continuity requires the limit to exist, $f(a)$ to be defined, and the two to be equal." },
        { text: "$f(a)$ to be undefined", explain: "Continuity needs $f(a)$ to be defined and to match the limit, not undefined." },
        { text: "the left limit to differ from the right", explain: "Differing one-sided limits break the limit entirely, so $f$ cannot be continuous." },
        { text: "a vertical asymptote at $a$", explain: "An asymptote is a discontinuity, the opposite of continuity." },
      ],
    },
    {
      id: "s-estimate-both",
      prompt: "A table gives left values $f(0.9) = 1.8$, $f(0.99) = 1.98$ and right values $f(1.1) = 2.2$, $f(1.01) = 2.02$. The best estimate of $\\lim_{x \\to 1} f(x)$ is:",
      choices: [
        { text: "does not exist", explain: "Both sides are closing in on the same number, so the limit does exist." },
        { text: "$1.98$", explain: "That is one left entry; the two sides settle on $2$, not $1.98$." },
        { text: "$2$", correct: true, explain: "From the left the values head to $2$ ($1.98$) and from the right to $2$ ($2.02$), so the limit is $2$." },
        { text: "$1$", explain: "$1$ is the input $x$; the limit is the output height $2$." },
      ],
    },
    {
      id: "s-piecewise-eval",
      prompt: "For $p(x) = x - 1$ if $x \\le 2$ and $p(x) = x + 1$ if $x > 2$, the right-hand limit $\\lim_{x \\to 2^{+}} p(x)$ is:",
      choices: [
        { text: "$1$", explain: "$1$ is the left-hand limit (from $x - 1$); the right side uses $x + 1$." },
        { text: "$3$", correct: true, explain: "From the right, $p$ follows $x + 1$, which approaches $2 + 1 = 3$." },
        { text: "$2$", explain: "$2$ is the input; the right-hand height is $x + 1 = 3$." },
        { text: "does not exist", explain: "The one-sided limit exists and equals $3$; it is the two-sided limit that fails here." },
      ],
    },
  ],
};
