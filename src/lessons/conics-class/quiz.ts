import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Classifying conics from the general
 * form". Grounded in the lesson: in A x^2 + C y^2 + D x + E y + F = 0 the type is
 * set by A and C alone: AC = 0 -> parabola; AC > 0 -> ellipse (circle when
 * A = C); AC < 0 -> hyperbola. D, E, F only move and size the curve. Distractors
 * are the classic traps: calling any two squared terms a circle, ignoring the
 * sign of a coefficient, letting the linear terms change the type, and missing
 * degenerate cases (a point, no graph, a line pair). Every classification and
 * every completed square below is verified by hand.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-decide",
      prompt: "In $A x^2 + C y^2 + D x + E y + F = 0$, which coefficients determine the type of conic?",
      choices: [
        { text: "$A$ and $C$, on the squared terms", correct: true, explain: "The squared-term coefficients set the shape. The rest only shift and size it." },
        { text: "$D$ and $E$, on the linear terms", explain: "$D$ and $E$ only translate the curve. They never change the type." },
        { text: "$F$, the constant", explain: "$F$ only sets the size, not the type." },
        { text: "all six equally", explain: "Only $A$ and $C$ matter for the type." },
      ],
    },
    {
      id: "c-ellipse-basic",
      prompt: "Classify $3x^2 + 5y^2 - 15 = 0$.",
      choices: [
        { text: "hyperbola", explain: "That needs opposite signs. Here both coefficients are positive." },
        { text: "ellipse", correct: true, explain: "$A = 3$, $C = 5$: same sign and unequal, so $AC > 0$ with $A \\ne C$." },
        { text: "circle", explain: "A circle needs $A = C$. Here $3 \\ne 5$." },
        { text: "parabola", explain: "A parabola needs a missing squared term. Both are present." },
      ],
    },
    {
      id: "c-hyperbola-basic",
      prompt: "Classify $x^2 - 4y^2 - 4 = 0$.",
      choices: [
        { text: "ellipse", explain: "The squared terms have opposite signs, so it cannot be an ellipse." },
        { text: "parabola", explain: "Both variables are squared, so it is not a parabola." },
        { text: "hyperbola", correct: true, explain: "$A = 1$, $C = -4$: opposite signs, so $AC < 0$." },
        { text: "circle", explain: "Opposite signs rule out a circle." },
      ],
    },
    {
      id: "c-parabola-basic",
      prompt: "Classify $x^2 - 8y = 0$ (that is, $y = \\tfrac{1}{8}x^2$).",
      choices: [
        { text: "circle", explain: "A circle needs both variables squared with equal coefficients." },
        { text: "ellipse", explain: "An ellipse needs both variables squared." },
        { text: "hyperbola", explain: "A hyperbola needs both variables squared, with opposite signs." },
        { text: "parabola", correct: true, explain: "There is an $x^2$ but no $y^2$ ($A = 1$, $C = 0$), so $AC = 0$: a parabola." },
      ],
    },
    {
      id: "c-circle-basic",
      prompt: "Classify $2x^2 + 2y^2 - 8 = 0$.",
      choices: [
        { text: "ellipse", explain: "The coefficients are equal ($A = C = 2$), which makes it a circle, not a general ellipse." },
        { text: "circle", correct: true, explain: "$A = C = 2$. Dividing by $2$ gives $x^2 + y^2 = 4$, a circle." },
        { text: "parabola", explain: "Both variables are squared, so it is not a parabola." },
        { text: "hyperbola", explain: "Same-sign coefficients cannot make a hyperbola." },
      ],
    },
    {
      id: "c-product-zero",
      prompt: "If the product $AC = 0$, the conic is a:",
      choices: [
        { text: "parabola", correct: true, explain: "$AC = 0$ means one squared term is missing, the defining feature of a parabola." },
        { text: "circle", explain: "A circle needs $A = C \\ne 0$, so $AC > 0$." },
        { text: "hyperbola", explain: "A hyperbola needs $AC < 0$." },
        { text: "ellipse", explain: "An ellipse needs $AC > 0$." },
      ],
    },
    {
      id: "c-product-neg",
      prompt: "If the product $AC < 0$, the conic is a:",
      choices: [
        { text: "ellipse", explain: "An ellipse needs $AC > 0$ (same sign)." },
        { text: "parabola", explain: "A parabola needs $AC = 0$." },
        { text: "hyperbola", correct: true, explain: "Opposite signs give $AC < 0$, which is always a hyperbola." },
        { text: "circle", explain: "A circle needs $A = C$, so $AC > 0$." },
      ],
    },
    {
      id: "c-circle-vs-ellipse",
      prompt: "$5x^2 + 5y^2 - 20 = 0$ is a circle. What is $5x^2 + 4y^2 - 20 = 0$?",
      choices: [
        { text: "also a circle", explain: "Now $A = 5 \\ne 4 = C$, so the coefficients no longer match." },
        { text: "an ellipse", correct: true, explain: "Same sign but unequal ($5 \\ne 4$), so $AC > 0$ with $A \\ne C$: an ellipse." },
        { text: "a hyperbola", explain: "Both coefficients are still positive, so it is not a hyperbola." },
        { text: "a parabola", explain: "Both variables are squared, so it is not a parabola." },
      ],
    },
    {
      id: "c-ellipse-2",
      prompt: "Classify $9x^2 + 4y^2 - 36 = 0$.",
      choices: [
        { text: "ellipse", correct: true, explain: "$A = 9$, $C = 4$: same sign, unequal. Dividing gives $\\tfrac{x^2}{4} + \\tfrac{y^2}{9} = 1$." },
        { text: "circle", explain: "$9 \\ne 4$, so the coefficients do not match." },
        { text: "hyperbola", explain: "Both coefficients are positive, so no hyperbola." },
        { text: "parabola", explain: "Both variables are squared." },
      ],
    },
    {
      id: "c-hyperbola-2",
      prompt: "Classify $y^2 - x^2 - 1 = 0$.",
      choices: [
        { text: "circle", explain: "Opposite signs on the squared terms rule out a circle." },
        { text: "hyperbola", correct: true, explain: "$C = 1$ on $y^2$ and $A = -1$ on $x^2$: opposite signs, so $AC < 0$." },
        { text: "ellipse", explain: "An ellipse needs the same sign on both squared terms." },
        { text: "parabola", explain: "Both variables are squared." },
      ],
    },
    {
      id: "c-parabola-sideways",
      prompt: "Classify $y^2 - 8x = 0$ (that is, $x = \\tfrac{1}{8}y^2$).",
      choices: [
        { text: "hyperbola", explain: "Only one variable is squared, so it is not a hyperbola." },
        { text: "ellipse", explain: "An ellipse needs both variables squared." },
        { text: "parabola", correct: true, explain: "There is a $y^2$ but no $x^2$ ($C = 1$, $A = 0$), so $AC = 0$: a sideways parabola." },
        { text: "circle", explain: "A circle needs both variables squared." },
      ],
    },
    {
      id: "c-shift-no-change",
      prompt: "Starting from $x^2 + y^2 = 1$, you add linear terms and change the constant. This can change the curve's:",
      choices: [
        { text: "type, from a circle to an ellipse", explain: "Linear terms and the constant never change the type. $A = C$ keeps it a circle." },
        { text: "position and size, but not its type", correct: true, explain: "$D$, $E$ shift the center and $F$ changes the radius, but the type stays fixed by $A$ and $C$." },
        { text: "type, from a circle to a parabola", explain: "A parabola needs a missing squared term, which linear terms cannot remove." },
        { text: "nothing at all", explain: "They do move and resize the curve. They just cannot change its type." },
      ],
    },
    {
      id: "c-which-parabola",
      prompt: "Which of these is a parabola?",
      choices: [
        { text: "$x^2 + y^2 = 9$", explain: "Two equal squared terms: a circle." },
        { text: "$y = x^2 - 3x$", correct: true, explain: "Rearranged, $x^2 - 3x - y = 0$: an $x^2$ but no $y^2$, so a parabola." },
        { text: "$4x^2 + y^2 = 4$", explain: "Two same-sign, unequal squared terms: an ellipse." },
        { text: "$x^2 - y^2 = 4$", explain: "Opposite signs: a hyperbola." },
      ],
    },
    {
      id: "c-equal-coeff",
      prompt: "Classify $3x^2 + 3y^2 - 12 = 0$.",
      choices: [
        { text: "circle", correct: true, explain: "$A = C = 3$. Dividing by $3$ gives $x^2 + y^2 = 4$, a circle of radius $2$." },
        { text: "ellipse", explain: "The coefficients are equal, so it is the special circle case, not a general ellipse." },
        { text: "parabola", explain: "Both variables are squared." },
        { text: "hyperbola", explain: "Both coefficients are positive." },
      ],
    },
    {
      id: "c-samesign-unequal",
      prompt: "Two squared-term coefficients that are both positive but different (say $2$ and $7$) give:",
      choices: [
        { text: "a circle", explain: "A circle needs them equal. $2 \\ne 7$." },
        { text: "a hyperbola", explain: "A hyperbola needs opposite signs. These are both positive." },
        { text: "an ellipse", correct: true, explain: "Same sign and unequal is exactly the ellipse case ($AC > 0$, $A \\ne C$)." },
        { text: "a parabola", explain: "Both terms are present, so no parabola." },
      ],
    },
  ],
  summit: [
    {
      id: "s-circle-complete",
      prompt: "Write $x^2 + y^2 - 6x + 4y + 9 = 0$ in standard form. Its center and radius are:",
      choices: [
        { text: "center $(3, -2)$, $r = 2$", correct: true, explain: "$(x-3)^2 - 9 + (y+2)^2 - 4 + 9 = 0 \\Rightarrow (x-3)^2 + (y+2)^2 = 4$." },
        { text: "center $(-3, 2)$, $r = 2$", explain: "Signs flip when reading the center: $(x-3)^2$ gives $h = +3$, $(y+2)^2$ gives $k = -2$." },
        { text: "center $(3, -2)$, $r = 4$", explain: "The right side is $4 = r^2$, so $r = \\sqrt{4} = 2$, not $4$." },
        { text: "center $(6, -4)$, $r = 3$", explain: "Halve the linear coefficients: $h = 6/2 = 3$ and $k = -4/2 = -2$." },
      ],
    },
    {
      id: "s-ellipse-axes",
      prompt: "For $9x^2 + 4y^2 - 36 = 0$, rewritten as $\\tfrac{x^2}{4} + \\tfrac{y^2}{9} = 1$, the major axis is:",
      choices: [
        { text: "vertical (along the $y$-axis)", correct: true, explain: "The larger denominator, $9$, is under $y^2$, so the ellipse is taller than it is wide." },
        { text: "horizontal (along the $x$-axis)", explain: "The larger denominator is under $y^2$, not $x^2$, so the major axis is vertical." },
        { text: "neither, it is a circle", explain: "The denominators differ ($4 \\ne 9$), so it is a genuine ellipse." },
        { text: "both, equally", explain: "An ellipse has one longer axis. Here it is the vertical one." },
      ],
    },
    {
      id: "s-hyperbola-center",
      prompt: "Complete the square: $x^2 - y^2 - 2x - 4y - 4 = 0$ becomes $(x-1)^2 - (y+2)^2 = 1$. Its center is:",
      choices: [
        { text: "$(1, -2)$", correct: true, explain: "$(x-1)^2$ gives $h = 1$ and $(y+2)^2$ gives $k = -2$." },
        { text: "$(-1, 2)$", explain: "Read the opposite of the number inside each square: $h = +1$, $k = -2$." },
        { text: "$(1, 2)$", explain: "$(y+2)^2$ means $k = -2$, not $+2$." },
        { text: "$(2, -4)$", explain: "Those are the linear coefficients, not the center. Complete the square first." },
      ],
    },
    {
      id: "s-parabola-vertex",
      prompt: "For the parabola $y = x^2 - 6x + 5$, the vertex is:",
      choices: [
        { text: "$(3, -4)$", correct: true, explain: "$y = (x-3)^2 - 4$, so the vertex is $(3, -4)$." },
        { text: "$(-3, 5)$", explain: "Completing the square gives $(x-3)^2 - 4$. The vertex is $(3, -4)$." },
        { text: "$(3, 5)$", explain: "The constant $5$ is not the vertex $y$. After completing the square it becomes $-4$." },
        { text: "$(6, 5)$", explain: "The vertex $x$ is $-\\tfrac{b}{2a} = 3$, not $6$." },
      ],
    },
    {
      id: "s-degenerate-point",
      prompt: "What does $x^2 + y^2 = 0$ represent?",
      choices: [
        { text: "the single point $(0, 0)$", correct: true, explain: "The only way two squares sum to $0$ is $x = 0$ and $y = 0$: a degenerate circle, one point." },
        { text: "a circle of radius $0$... which is really every point", explain: "Radius $0$ collapses to just the center, the one point $(0, 0)$, not every point." },
        { text: "no graph at all", explain: "The origin does satisfy it, so the graph is that one point." },
        { text: "a circle of radius $1$", explain: "The right side is $0$, so $r = 0$, not $1$." },
      ],
    },
    {
      id: "s-degenerate-none",
      prompt: "What does $x^2 + y^2 = -4$ represent?",
      choices: [
        { text: "no real graph (the empty set)", correct: true, explain: "A sum of squares can never be negative, so no real point satisfies it." },
        { text: "a circle of radius $2$", explain: "That would need $r^2 = -4$, which is impossible for a real radius." },
        { text: "the point $(0, 0)$", explain: "Even the origin gives $0 \\ne -4$, so nothing satisfies it." },
        { text: "a hyperbola", explain: "Both squared terms are positive. The issue is the negative right side, which leaves no graph." },
      ],
    },
    {
      id: "s-degenerate-lines",
      prompt: "What does $x^2 - y^2 = 0$ represent?",
      choices: [
        { text: "the two lines $y = x$ and $y = -x$", correct: true, explain: "Factor: $(x-y)(x+y) = 0$, so $y = x$ or $y = -x$: a degenerate hyperbola." },
        { text: "a hyperbola with two curved branches", explain: "The right side is $0$, not $1$, so the branches collapse onto their asymptotes: two straight lines." },
        { text: "a single line", explain: "The factoring gives two different lines, not one." },
        { text: "the point $(0, 0)$", explain: "Every point on either line works, not just the origin." },
      ],
    },
    {
      id: "s-both-sides",
      prompt: "Classify $2x^2 = 8 - 2y^2$.",
      choices: [
        { text: "hyperbola", explain: "Move everything to one side first: $2x^2 + 2y^2 - 8 = 0$, both terms positive." },
        { text: "circle", correct: true, explain: "Rearranged, $2x^2 + 2y^2 = 8$, so $A = C = 2$: a circle ($x^2 + y^2 = 4$)." },
        { text: "ellipse", explain: "The coefficients are equal once collected ($2$ and $2$), so it is a circle, not a general ellipse." },
        { text: "parabola", explain: "Both variables are squared, so it is not a parabola." },
      ],
    },
    {
      id: "s-switch-type",
      prompt: "The ellipse $4x^2 + 9y^2 = 36$ can be turned into a hyperbola by changing:",
      choices: [
        { text: "the sign of the $y^2$ coefficient (to $-9$)", correct: true, explain: "$4x^2 - 9y^2 = 36$ has opposite signs, so $AC < 0$: a hyperbola." },
        { text: "the constant $36$ to $0$", explain: "That gives a degenerate case (a point or lines), not a hyperbola." },
        { text: "both coefficients to $4$", explain: "Equal coefficients would make a circle, not a hyperbola." },
        { text: "adding a linear term $x$", explain: "Linear terms only shift the ellipse. They cannot change its type." },
      ],
    },
    {
      id: "s-trap-two-squares",
      prompt: "A student says \"$x^2 + 3y^2 = 12$ has two squared terms, so it is a circle.\" What is the mistake?",
      choices: [
        { text: "A circle needs equal coefficients. $1 \\ne 3$, so it is an ellipse.", correct: true, explain: "Two squared terms alone are not enough. $A = C$ is required for a circle." },
        { text: "Nothing, it is a circle.", explain: "$A = 1$ and $C = 3$ differ, so it is an ellipse, not a circle." },
        { text: "It is actually a hyperbola.", explain: "Both coefficients are positive, so it cannot be a hyperbola." },
        { text: "It is actually a parabola.", explain: "Both variables are squared, so it is not a parabola." },
      ],
    },
    {
      id: "s-ellipse-major-16",
      prompt: "For $16x^2 + 9y^2 = 144$, rewritten as $\\tfrac{x^2}{9} + \\tfrac{y^2}{16} = 1$, the major axis is:",
      choices: [
        { text: "vertical, with semi-axis $4$", correct: true, explain: "The larger denominator $16$ is under $y^2$, so the major axis is vertical with $\\sqrt{16} = 4$." },
        { text: "horizontal, with semi-axis $4$", explain: "The larger denominator is under $y^2$, so the long axis is vertical, not horizontal." },
        { text: "vertical, with semi-axis $16$", explain: "The semi-axis is $\\sqrt{16} = 4$, not $16$." },
        { text: "horizontal, with semi-axis $3$", explain: "$3$ is the shorter (horizontal) semi-axis. The major axis is the vertical one, $4$." },
      ],
    },
    {
      id: "s-sign-trap",
      prompt: "Classify $-4x^2 + y^2 = 4$.",
      choices: [
        { text: "ellipse", explain: "The squared terms have opposite signs, so it cannot be an ellipse." },
        { text: "hyperbola", correct: true, explain: "$A = -4$ and $C = 1$: opposite signs. As $\\tfrac{y^2}{4} - \\tfrac{x^2}{1} = 1$, it opens up and down." },
        { text: "circle", explain: "Opposite signs rule out a circle." },
        { text: "parabola", explain: "Both variables are squared, so it is not a parabola." },
      ],
    },
    {
      id: "s-circle-radius",
      prompt: "Complete the square: $x^2 + y^2 + 2x - 8 = 0$. The center and radius are:",
      choices: [
        { text: "center $(-1, 0)$, $r = 3$", correct: true, explain: "$(x+1)^2 - 1 + y^2 - 8 = 0 \\Rightarrow (x+1)^2 + y^2 = 9$, so $r = 3$." },
        { text: "center $(1, 0)$, $r = 3$", explain: "$(x+1)^2$ means $h = -1$, not $+1$." },
        { text: "center $(-1, 0)$, $r = 9$", explain: "The right side is $9 = r^2$, so $r = 3$." },
        { text: "center $(-2, 0)$, $r = \\sqrt{8}$", explain: "Halve the linear coefficient: $h = 2/2 = 1$, and here it is $-1$. Also complete the square before reading $r$." },
      ],
    },
    {
      id: "s-parabola-sideways-open",
      prompt: "The parabola $x = 2y^2$ opens:",
      choices: [
        { text: "to the right", correct: true, explain: "Here $x$ grows with $y^2$ and the coefficient $2 > 0$, so the parabola opens rightward along the $x$-axis." },
        { text: "upward", explain: "Because $y$ (not $x$) is squared, the parabola opens sideways, not up." },
        { text: "downward", explain: "The coefficient is positive and $y$ is squared, so it opens right, not down." },
        { text: "to the left", explain: "A leftward parabola needs a negative coefficient. Here it is $+2$." },
      ],
    },
    {
      id: "s-capstone",
      prompt: "Classify and locate $5x^2 + 5y^2 - 10x + 20y + 5 = 0$.",
      choices: [
        { text: "circle, center $(1, -2)$, $r = 2$", correct: true, explain: "Divide by $5$ and complete the square: $(x-1)^2 + (y+2)^2 = 4$, a circle of radius $2$." },
        { text: "ellipse, center $(1, -2)$", explain: "$A = C = 5$, so after dividing it is a circle, not a general ellipse." },
        { text: "circle, center $(-1, 2)$, $r = 2$", explain: "$(x-1)^2$ gives $h = 1$ and $(y+2)^2$ gives $k = -2$." },
        { text: "circle, center $(1, -2)$, $r = 20$", explain: "After dividing by $5$ the right side is $4 = r^2$, so $r = 2$." },
      ],
    },
  ],
};
