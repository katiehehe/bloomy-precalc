import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Foci and eccentricity". Grounded in
 * the lesson: an ellipse uses c^2 = a^2 - b^2 (minus, foci inside), a hyperbola
 * uses c^2 = a^2 + b^2 (plus, foci outside), eccentricity is e = c/a, and the
 * conics sort as circle (e = 0), ellipse (0 < e < 1), parabola (e = 1),
 * hyperbola (e > 1).
 *
 * Distractors are the real traps: swapping the plus and minus in the c formula,
 * adding a + b instead of squaring, thinking a larger e is rounder, and mixing up
 * c (center to focus) with 2c (focus spacing). Every c and e is verified by hand.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "x-ellipse-c",
      prompt: "For an ellipse, the focus distance $c$ satisfies:",
      choices: [
        { text: "$c^2 = a^2 - b^2$", correct: true, explain: "An ellipse subtracts, which keeps the foci inside the curve." },
        { text: "$c^2 = a^2 + b^2$", explain: "That is the hyperbola rule. An ellipse subtracts." },
        { text: "$c = a - b$", explain: "You must square first, then subtract, then take the root." },
        { text: "$c = a + b$", explain: "The foci come from a difference of squares, not a sum of lengths." },
      ],
    },
    {
      id: "x-hyperbola-c",
      prompt: "For a hyperbola, the focus distance $c$ satisfies:",
      choices: [
        { text: "$c^2 = a^2 + b^2$", correct: true, explain: "A hyperbola adds, which pushes the foci outside the vertices." },
        { text: "$c^2 = a^2 - b^2$", explain: "That is the ellipse rule. A hyperbola adds." },
        { text: "$c = a + b$", explain: "You must square first, then add, then take the root." },
        { text: "$c = b - a$", explain: "The foci come from a sum of squares, not a difference of lengths." },
      ],
    },
    {
      id: "x-e-def",
      prompt: "Eccentricity is defined as:",
      choices: [
        { text: "$e = \\frac{c}{a}$", correct: true, explain: "It is the ratio of the focus distance to the vertex distance." },
        { text: "$e = \\frac{a}{c}$", explain: "That is the reciprocal. Eccentricity is $c$ over $a$." },
        { text: "$e = a \\cdot c$", explain: "Eccentricity is a ratio, not a product." },
        { text: "$e = c - a$", explain: "It is a ratio $c/a$, not a difference." },
      ],
    },
    {
      id: "x-ellipse-c-5-3",
      prompt: "An ellipse has $a = 5$ and $b = 3$. Then $c$ is:",
      choices: [
        { text: "$4$", correct: true, explain: "$c^2 = 25 - 9 = 16$, so $c = 4$." },
        { text: "$\\sqrt{34}$", explain: "That uses $a^2 + b^2$. An ellipse subtracts." },
        { text: "$2$", explain: "That is $a - b$. Square first: $\\sqrt{25 - 9} = 4$." },
        { text: "$8$", explain: "That is $2c$, the distance between the foci, not $c$." },
      ],
    },
    {
      id: "x-ellipse-e-5-4",
      prompt: "An ellipse has $a = 5$ and $c = 4$. Its eccentricity is:",
      choices: [
        { text: "$0.8$", correct: true, explain: "$e = c/a = 4/5 = 0.8$." },
        { text: "$1.25$", explain: "That is $a/c$. Eccentricity is $c/a$." },
        { text: "$0.2$", explain: "$0.2 = 1/5$. Use $c/a = 4/5 = 0.8$." },
        { text: "$4$", explain: "That is $c$ alone. Divide by $a = 5$." },
      ],
    },
    {
      id: "x-hyperbola-c-3-4",
      prompt: "A hyperbola has $a = 3$ and $b = 4$. Then $c$ is:",
      choices: [
        { text: "$5$", correct: true, explain: "$c^2 = 9 + 16 = 25$, so $c = 5$." },
        { text: "$1$", explain: "That uses $a^2 - b^2$, the ellipse rule, which fails here." },
        { text: "$7$", explain: "That is $a + b$. Add the squares, then take the root." },
        { text: "$\\sqrt{7}$", explain: "That subtracts. A hyperbola adds: $\\sqrt{9 + 16} = 5$." },
      ],
    },
    {
      id: "x-hyperbola-e-3-5",
      prompt: "A hyperbola has $a = 3$ and $c = 5$. Its eccentricity is:",
      choices: [
        { text: "$\\frac{5}{3} \\approx 1.67$", correct: true, explain: "$e = c/a = 5/3$, which is greater than $1$." },
        { text: "$\\frac{3}{5} = 0.6$", explain: "That is $a/c$. Eccentricity is $c/a$, and for a hyperbola it exceeds $1$." },
        { text: "$2$", explain: "$c/a = 5/3 \\approx 1.67$, not $2$." },
        { text: "$8$", explain: "That is $a + c$. Eccentricity is the ratio $c/a$." },
      ],
    },
    {
      id: "x-circle-e",
      prompt: "The eccentricity of a circle is:",
      choices: [
        { text: "$e = 0$", correct: true, explain: "A circle's foci sit at the center, so $c = 0$ and $e = 0$." },
        { text: "$e = 1$", explain: "That is a parabola. A circle has $e = 0$." },
        { text: "$e = 0.5$", explain: "A circle has $c = 0$, so $e$ is exactly $0$." },
        { text: "undefined", explain: "With $c = 0$ the ratio $c/a$ is a well-defined $0$." },
      ],
    },
    {
      id: "x-parabola-e",
      prompt: "The eccentricity of a parabola is:",
      choices: [
        { text: "$e = 1$", correct: true, explain: "A parabola is the boundary case, exactly $e = 1$." },
        { text: "$e = 0$", explain: "That is a circle. A parabola is $e = 1$." },
        { text: "$e > 1$", explain: "That is a hyperbola. A parabola is exactly $1$." },
        { text: "$e = 2$", explain: "A parabola is exactly $e = 1$, not $2$." },
      ],
    },
    {
      id: "x-ellipse-range",
      prompt: "The eccentricity of an ellipse (that is not a circle) is always:",
      choices: [
        { text: "between $0$ and $1$", correct: true, explain: "The foci sit inside, so $c < a$ and $0 < e < 1$." },
        { text: "exactly $1$", explain: "That is a parabola, not an ellipse." },
        { text: "greater than $1$", explain: "That is a hyperbola. An ellipse stays below $1$." },
        { text: "negative", explain: "Eccentricity is a ratio of lengths, never negative." },
      ],
    },
    {
      id: "x-hyperbola-range",
      prompt: "The eccentricity of a hyperbola is always:",
      choices: [
        { text: "greater than $1$", correct: true, explain: "Since $c > a$ for a hyperbola, $e = c/a > 1$." },
        { text: "between $0$ and $1$", explain: "That is an ellipse. A hyperbola exceeds $1$." },
        { text: "exactly $1$", explain: "That is a parabola, the boundary case." },
        { text: "exactly $0$", explain: "That is a circle. A hyperbola has $e > 1$." },
      ],
    },
    {
      id: "x-ellipse-c-13-5",
      prompt: "An ellipse has $a = 13$ and $b = 5$. Then $c$ is:",
      choices: [
        { text: "$12$", correct: true, explain: "$c^2 = 169 - 25 = 144$, so $c = 12$." },
        { text: "$\\sqrt{194}$", explain: "That adds the squares. An ellipse subtracts." },
        { text: "$8$", explain: "That is $a - b$. Square first: $\\sqrt{169 - 25} = 12$." },
        { text: "$18$", explain: "That is $a + b$. Use the difference of squares." },
      ],
    },
    {
      id: "x-ellipse-e-5-4b",
      prompt: "An ellipse has $a = 5$ and $b = 4$. Its eccentricity is:",
      choices: [
        { text: "$0.6$", correct: true, explain: "$c^2 = 25 - 16 = 9$, so $c = 3$ and $e = 3/5 = 0.6$." },
        { text: "$0.8$", explain: "That would need $c = 4$. Here $c = 3$, so $e = 0.6$." },
        { text: "$0.2$", explain: "$c = 3$ and $a = 5$ give $e = 0.6$, not $0.2$." },
        { text: "$1.25$", explain: "That is $a/c$. Eccentricity is $c/a$." },
      ],
    },
    {
      id: "x-stretch-meaning",
      prompt: "As an ellipse's eccentricity increases from $0$ toward $1$, the ellipse becomes:",
      choices: [
        { text: "longer and more stretched", correct: true, explain: "The foci push out toward the vertices, so the oval elongates." },
        { text: "rounder, closer to a circle", explain: "That happens as $e$ shrinks toward $0$, not as it grows." },
        { text: "unchanged in shape", explain: "The eccentricity directly controls the shape." },
        { text: "split into two branches", explain: "Branches appear only for $e > 1$, a hyperbola." },
      ],
    },
    {
      id: "x-ellipse-plus-trap",
      prompt: "A student computes $c = \\sqrt{25 + 9} = \\sqrt{34}$ for the ellipse with $a = 5$, $b = 3$. The fix is:",
      choices: [
        { text: "an ellipse subtracts: $c = \\sqrt{25 - 9} = 4$", correct: true, explain: "The ellipse rule is $c^2 = a^2 - b^2$, giving $c = 4$." },
        { text: "nothing, $\\sqrt{34}$ is right", explain: "That is the hyperbola formula. An ellipse subtracts." },
        { text: "use $c = a + b = 8$", explain: "You must square, subtract, then take the root: $c = 4$." },
        { text: "use $c = a = 5$", explain: "The focus distance is $4$, found from $\\sqrt{25 - 9}$." },
      ],
    },
  ],
  summit: [
    {
      id: "y-ellipse-c-10-6",
      prompt: "An ellipse has $a = 10$ and $b = 6$. Then $c$ is:",
      choices: [
        { text: "$8$", correct: true, explain: "$c^2 = 100 - 36 = 64$, so $c = 8$." },
        { text: "$\\sqrt{136}$", explain: "That adds the squares. An ellipse subtracts." },
        { text: "$4$", explain: "That is $a - b$. Square first: $\\sqrt{100 - 36} = 8$." },
        { text: "$16$", explain: "That is $2c$, the focus spacing, not $c$." },
      ],
    },
    {
      id: "y-ellipse-e-10-6",
      prompt: "That ellipse ($a = 10$, $c = 8$) has eccentricity:",
      choices: [
        { text: "$0.8$", correct: true, explain: "$e = c/a = 8/10 = 0.8$." },
        { text: "$1.25$", explain: "That is $a/c$. Eccentricity is $c/a$." },
        { text: "$0.6$", explain: "$8/10 = 0.8$, not $0.6$." },
        { text: "$0.08$", explain: "Divide $c = 8$ by $a = 10$, giving $0.8$." },
      ],
    },
    {
      id: "y-hyperbola-e-8-6",
      prompt: "A hyperbola has $a = 8$ and $b = 6$. Its eccentricity is:",
      choices: [
        { text: "$1.25$", correct: true, explain: "$c^2 = 64 + 36 = 100$, so $c = 10$ and $e = 10/8 = 1.25$." },
        { text: "$0.8$", explain: "That is $a/c$. For a hyperbola $e = c/a > 1$." },
        { text: "$\\frac{\\sqrt{28}}{8}$", explain: "That subtracts the squares. A hyperbola adds: $c = 10$." },
        { text: "$1.75$", explain: "$c/a = 10/8 = 1.25$, not $1.75$." },
      ],
    },
    {
      id: "y-classify-1",
      prompt: "A conic has $e = 1$. It is:",
      choices: [
        { text: "a parabola", correct: true, explain: "$e = 1$ is exactly the parabola case." },
        { text: "an ellipse", explain: "An ellipse has $0 < e < 1$, strictly below $1$." },
        { text: "a hyperbola", explain: "A hyperbola has $e > 1$, strictly above $1$." },
        { text: "a circle", explain: "A circle has $e = 0$." },
      ],
    },
    {
      id: "y-classify-15",
      prompt: "A conic has $e = 1.5$. It is:",
      choices: [
        { text: "a hyperbola", correct: true, explain: "$e > 1$ means a hyperbola." },
        { text: "an ellipse", explain: "An ellipse stays below $1$." },
        { text: "a parabola", explain: "A parabola is exactly $1$, not $1.5$." },
        { text: "a circle", explain: "A circle has $e = 0$." },
      ],
    },
    {
      id: "y-classify-0",
      prompt: "A conic has $e = 0$. It is:",
      choices: [
        { text: "a circle", correct: true, explain: "$e = 0$ means the foci sit at the center, a circle." },
        { text: "an ellipse", explain: "A non-circular ellipse has $e > 0$." },
        { text: "a parabola", explain: "A parabola has $e = 1$." },
        { text: "a hyperbola", explain: "A hyperbola has $e > 1$." },
      ],
    },
    {
      id: "y-roundest",
      prompt: "Which ellipse is closest to a perfect circle?",
      choices: [
        { text: "$e = 0.2$", correct: true, explain: "The smallest eccentricity is the roundest, closest to $e = 0$." },
        { text: "$e = 0.6$", explain: "Larger $e$ is more stretched, not rounder." },
        { text: "$e = 0.9$", explain: "This is quite stretched, far from a circle." },
        { text: "$e = 0.99$", explain: "This is nearly as stretched as an ellipse can get." },
      ],
    },
    {
      id: "y-bigger-e-trap",
      prompt: "Which statement about eccentricity is true?",
      choices: [
        { text: "a larger $e$ means a more stretched or more open curve", correct: true, explain: "Eccentricity grows as the curve elongates and then opens up." },
        { text: "a larger $e$ means a rounder curve", explain: "Rounder means closer to a circle, which is small $e$, not large." },
        { text: "$e$ has no effect on the shape", explain: "Eccentricity is exactly the number that sets the shape." },
        { text: "every conic has $e < 1$", explain: "A hyperbola has $e > 1$, so this is false." },
      ],
    },
    {
      id: "y-ellipse-foci-axis",
      prompt: "The foci of an ellipse always lie on the:",
      choices: [
        { text: "major axis (the longer one)", correct: true, explain: "The foci sit on the major axis, a distance $c$ from the center." },
        { text: "minor axis (the shorter one)", explain: "The foci are on the longer, major axis, not the minor axis." },
        { text: "line $y = x$", explain: "For a standard ellipse the foci sit on a coordinate axis, the major one." },
        { text: "circle through the vertices", explain: "The foci are two fixed points on the major axis." },
      ],
    },
    {
      id: "y-hyp-foci-outside",
      prompt: "Compared with the vertices of a hyperbola, the foci are:",
      choices: [
        { text: "farther from the center", correct: true, explain: "Since $c > a$, the foci lie beyond the vertices." },
        { text: "closer to the center", explain: "That is the ellipse pattern. For a hyperbola $c > a$." },
        { text: "at the same distance", explain: "$c > a$ strictly, so the foci are farther out." },
        { text: "off the transverse axis", explain: "The foci sit on the transverse axis, just beyond the vertices." },
      ],
    },
    {
      id: "y-vertical-ellipse-foci",
      prompt: "For $\\frac{x^2}{9} + \\frac{y^2}{25} = 1$, the foci are:",
      choices: [
        { text: "$(0, \\pm 4)$", correct: true, explain: "The major axis is vertical ($a = 5$, $b = 3$), so $c = 4$ and the foci are $(0, \\pm 4)$." },
        { text: "$(\\pm 4, 0)$", explain: "The major axis is vertical here, so the foci lie on the $y$-axis." },
        { text: "$(0, \\pm \\sqrt{34})$", explain: "An ellipse subtracts: $c^2 = 25 - 9 = 16$, so $c = 4$." },
        { text: "$(0, \\pm 5)$", explain: "$(0, \\pm 5)$ are the vertices. The foci sit inside at $c = 4$." },
      ],
    },
    {
      id: "y-ellipse-e-25-16",
      prompt: "The eccentricity of $\\frac{x^2}{25} + \\frac{y^2}{16} = 1$ is:",
      choices: [
        { text: "$0.6$", correct: true, explain: "$a = 5$, $b = 4$, so $c = \\sqrt{25 - 16} = 3$ and $e = 3/5 = 0.6$." },
        { text: "$0.8$", explain: "That would need $c = 4$. Here $c = 3$, so $e = 0.6$." },
        { text: "$0.64$", explain: "Do not divide $b^2$ by $a^2$. Compute $c$ first, then $c/a$." },
        { text: "$1.25$", explain: "That is $a/c$. Eccentricity is $c/a = 0.6$." },
      ],
    },
    {
      id: "y-hyperbola-e-16-9",
      prompt: "The eccentricity of $\\frac{x^2}{16} - \\frac{y^2}{9} = 1$ is:",
      choices: [
        { text: "$1.25$", correct: true, explain: "$a = 4$, $b = 3$, so $c = \\sqrt{16 + 9} = 5$ and $e = 5/4 = 1.25$." },
        { text: "$0.8$", explain: "That is $a/c$. For a hyperbola $e = c/a > 1$." },
        { text: "$\\frac{\\sqrt{7}}{4}$", explain: "That subtracts the squares. A hyperbola adds: $c = 5$." },
        { text: "$1.75$", explain: "$c/a = 5/4 = 1.25$, not $1.75$." },
      ],
    },
    {
      id: "y-solve-c-from-e",
      prompt: "An ellipse has $a = 6$ and eccentricity $e = 0.5$. Its focus distance $c$ is:",
      choices: [
        { text: "$3$", correct: true, explain: "$c = e \\cdot a = 0.5 \\times 6 = 3$." },
        { text: "$12$", explain: "That divides instead of multiplying. $c = e \\cdot a = 3$." },
        { text: "$0.5$", explain: "That is $e$ itself. Multiply by $a$ to get $c = 3$." },
        { text: "$6$", explain: "That is $a$. With $e = 0.5$, $c$ is half of it, $3$." },
      ],
    },
    {
      id: "y-capstone-169-25",
      prompt: "Which statement about $\\frac{x^2}{169} + \\frac{y^2}{25} = 1$ is correct?",
      choices: [
        { text: "$e = \\frac{12}{13} \\approx 0.92$, foci $(\\pm 12, 0)$", correct: true, explain: "$a = 13$, $b = 5$, so $c = \\sqrt{169 - 25} = 12$ and $e = 12/13 \\approx 0.92$." },
        { text: "$c = \\sqrt{194}$", explain: "An ellipse subtracts: $c^2 = 169 - 25 = 144$, so $c = 12$." },
        { text: "$e > 1$, so it is a hyperbola", explain: "It is an ellipse (added terms), so $e < 1$. Here $e \\approx 0.92$." },
        { text: "foci $(0, \\pm 12)$", explain: "The major axis is horizontal ($169 > 25$), so the foci are on the $x$-axis." },
      ],
    },
  ],
};
