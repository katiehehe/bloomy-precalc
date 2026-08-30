import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Component and unit-vector form".
 * Grounded in the lesson: components (vx, vy); the unit vectors i = (1,0) and
 * j = (0,1); v = vx i + vy j; the unit vector v-hat = v/|v| has length 1; and a
 * vector is built by scaling a unit direction, v = |v|(cos(theta) i + sin(theta) j).
 * Distractors are the classic traps: swapping components, dividing by |v|^2
 * instead of |v|, forgetting to scale, and confusing a unit vector with the
 * original. Every number below is verified by hand.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-vy",
      prompt: "In the vector $v = (4, 3)$, which number is the vertical component $v_y$?",
      choices: [
        { text: "$3$", correct: true, explain: "The second entry is the vertical part, so $v_y = 3$." },
        { text: "$4$", explain: "That is the horizontal component $v_x$. The vertical one is listed second." },
        { text: "$7$", explain: "That adds the two components. Each stays separate in component form." },
        { text: "$5$", explain: "That is the magnitude $\\sqrt{4^2 + 3^2}$, not a single component." },
      ],
    },
    {
      id: "c-i",
      prompt: "What is the standard unit vector $\\mathbf{i}$?",
      choices: [
        { text: "$(1, 0)$", correct: true, explain: "$\\mathbf{i}$ is one step along the positive $x$-axis, with length $1$." },
        { text: "$(0, 1)$", explain: "That is $\\mathbf{j}$, the vertical unit vector." },
        { text: "$(1, 1)$", explain: "That has length $\\sqrt{2}$, not $1$, and points diagonally." },
        { text: "$(0, 0)$", explain: "The zero vector has length $0$ and no direction, so it is not a unit vector." },
      ],
    },
    {
      id: "c-j",
      prompt: "What is the standard unit vector $\\mathbf{j}$?",
      choices: [
        { text: "$(0, 1)$", correct: true, explain: "$\\mathbf{j}$ is one step along the positive $y$-axis, with length $1$." },
        { text: "$(1, 0)$", explain: "That is $\\mathbf{i}$, the horizontal unit vector." },
        { text: "$(1, 1)$", explain: "That points diagonally and has length $\\sqrt{2}$." },
        { text: "$(0, -1)$", explain: "That points down. The unit vector $\\mathbf{j}$ points up along $+y$." },
      ],
    },
    {
      id: "c-ij-write",
      prompt: "Write $v = (5, -2)$ in terms of $\\mathbf{i}$ and $\\mathbf{j}$.",
      choices: [
        { text: "$5\\mathbf{i} - 2\\mathbf{j}$", correct: true, explain: "The horizontal component multiplies $\\mathbf{i}$, the vertical multiplies $\\mathbf{j}$, keeping the sign." },
        { text: "$5\\mathbf{i} + 2\\mathbf{j}$", explain: "The vertical component is $-2$, so the $\\mathbf{j}$ term must be negative." },
        { text: "$-2\\mathbf{i} + 5\\mathbf{j}$", explain: "That swaps the components. The first entry multiplies $\\mathbf{i}$." },
        { text: "$5\\mathbf{j} - 2\\mathbf{i}$", explain: "That attaches the components to the wrong unit vectors." },
      ],
    },
    {
      id: "c-ij-zero",
      prompt: "Write $v = (0, 7)$ in terms of $\\mathbf{i}$ and $\\mathbf{j}$.",
      choices: [
        { text: "$7\\mathbf{j}$", correct: true, explain: "The horizontal part is $0$, so there is no $\\mathbf{i}$ term. Only $7\\mathbf{j}$ remains." },
        { text: "$7\\mathbf{i}$", explain: "That points right. With $v_x = 0$ and $v_y = 7$, the vector points up." },
        { text: "$7\\mathbf{i} + 7\\mathbf{j}$", explain: "There is no horizontal part, so no $\\mathbf{i}$ term at all." },
        { text: "$\\mathbf{j}$", explain: "That is only one step up. The vertical component is $7$, so it is $7\\mathbf{j}$." },
      ],
    },
    {
      id: "c-ij-comp",
      prompt: "Rewrite $3\\mathbf{i} + 4\\mathbf{j}$ in component form.",
      choices: [
        { text: "$(3, 4)$", correct: true, explain: "The coefficient of $\\mathbf{i}$ is $v_x = 3$ and of $\\mathbf{j}$ is $v_y = 4$." },
        { text: "$(4, 3)$", explain: "That swaps the parts. The $\\mathbf{i}$ coefficient goes first." },
        { text: "$(7, 0)$", explain: "That adds the coefficients. Keep them as separate components." },
        { text: "$(12, 0)$", explain: "That multiplies $3 \\cdot 4$. The coefficients stay separate." },
      ],
    },
    {
      id: "c-unit-def",
      prompt: "How do you find the unit vector in the direction of a nonzero vector $v$?",
      choices: [
        { text: "Divide $v$ by its magnitude $|v|$", correct: true, explain: "$\\hat v = v/|v|$ rescales the length to $1$ while keeping the direction." },
        { text: "Multiply $v$ by $|v|$", explain: "That makes the vector longer, not length $1$." },
        { text: "Subtract $|v|$ from each component", explain: "Subtracting a number from components changes the direction, not just the length." },
        { text: "Square each component", explain: "Squaring does not produce a length-$1$ vector in the same direction." },
      ],
    },
    {
      id: "c-unit-len",
      prompt: "What is the length of any unit vector?",
      choices: [
        { text: "$1$", correct: true, explain: "By definition a unit vector has magnitude exactly $1$." },
        { text: "$0$", explain: "Only the zero vector has length $0$, and it has no direction." },
        { text: "It depends on the original vector", explain: "No matter the original, dividing by $|v|$ always gives length $1$." },
        { text: "$|v|$", explain: "Dividing by $|v|$ cancels the length, leaving $1$." },
      ],
    },
    {
      id: "c-unit-68",
      prompt: "For $v = (6, 8)$, with $|v| = 10$, find the unit vector $\\hat v$.",
      choices: [
        { text: "$(0.6, 0.8)$", correct: true, explain: "$\\dfrac{1}{10}(6, 8) = (0.6, 0.8)$, which has length $1$." },
        { text: "$(6, 8)$", explain: "That is $v$ itself, length $10$. Divide by $|v|$ to reach length $1$." },
        { text: "$(0.8, 0.6)$", explain: "That swaps the components. Divide each part in place by $10$." },
        { text: "$(3, 4)$", explain: "That divides by $2$, not by $|v| = 10$." },
      ],
    },
    {
      id: "c-unit-86",
      prompt: "For $v = (8, 6)$, with $|v| = 10$, find the unit vector $\\hat v$.",
      choices: [
        { text: "$(0.8, 0.6)$", correct: true, explain: "$\\dfrac{1}{10}(8, 6) = (0.8, 0.6)$, length $1$." },
        { text: "$(0.6, 0.8)$", explain: "That swaps the parts. Divide each in place by $10$." },
        { text: "$(8, 6)$", explain: "That is $v$, length $10$, not a unit vector." },
        { text: "$(4, 3)$", explain: "That divides by $2$, not by $|v| = 10$." },
      ],
    },
    {
      id: "c-build-scale",
      prompt: "Given the unit vector $u$ in a direction, how do you build a vector of length $L$ in that same direction?",
      choices: [
        { text: "Multiply the unit vector by $L$: the vector is $Lu$", correct: true, explain: "Scaling a length-$1$ vector by $L$ gives length $L$ in the same direction." },
        { text: "Add $L$ to each component of $u$", explain: "Adding a constant changes the direction, not just the length." },
        { text: "Divide $u$ by $L$", explain: "Dividing shrinks the length below $1$, the opposite of what you want." },
        { text: "Square $u$", explain: "Squaring components does not scale length in a meaningful way here." },
      ],
    },
    {
      id: "c-build-5u",
      prompt: "A vector has magnitude $5$ in the direction of the unit vector $(0.6, 0.8)$. What is the vector?",
      choices: [
        { text: "$(3, 4)$", correct: true, explain: "$5(0.6, 0.8) = (3, 4)$, and $\\sqrt{3^2 + 4^2} = 5$." },
        { text: "$(0.6, 0.8)$", explain: "That is still the unit vector, length $1$. Scale it by $5$." },
        { text: "$(5, 5)$", explain: "That ignores the direction. Multiply each component by $5$." },
        { text: "$(0.12, 0.16)$", explain: "That divides by $5$ instead of multiplying." },
      ],
    },
    {
      id: "c-build-10",
      prompt: "Build a vector of magnitude $10$ pointing at $\\theta = 0^\\circ$ (straight right).",
      choices: [
        { text: "$(10, 0)$", correct: true, explain: "$\\cos 0^\\circ = 1$ and $\\sin 0^\\circ = 0$, so $v = 10(1, 0) = (10, 0)$." },
        { text: "$(0, 10)$", explain: "That points straight up ($90^\\circ$). At $0^\\circ$ all the length is horizontal." },
        { text: "$(10, 10)$", explain: "That points diagonally with length more than $10$. At $0^\\circ$ the vertical part is $0$." },
        { text: "$(1, 0)$", explain: "That is the unit vector. Scale it by the magnitude $10$." },
      ],
    },
    {
      id: "c-comp-scalar",
      prompt: "In $v = v_x\\mathbf{i} + v_y\\mathbf{j}$, the quantities $v_x$ and $v_y$ are:",
      choices: [
        { text: "Scalars (plain numbers) that scale $\\mathbf{i}$ and $\\mathbf{j}$", correct: true, explain: "The components are numbers telling how much of each unit vector to add." },
        { text: "Vectors added onto $v$", explain: "They are scalar multipliers, not vectors themselves." },
        { text: "The magnitude and direction of $v$", explain: "Those are different quantities. $v_x, v_y$ are the horizontal and vertical parts." },
        { text: "Always both positive", explain: "A component can be negative when the vector points left or down." },
      ],
    },
    {
      id: "c-isunit",
      prompt: "Is $(0.6, 0.8)$ a unit vector?",
      choices: [
        { text: "Yes, because its length is $1$", correct: true, explain: "$\\sqrt{0.6^2 + 0.8^2} = \\sqrt{0.36 + 0.64} = \\sqrt{1} = 1$." },
        { text: "No, its length is $1.4$", explain: "Adding $0.6 + 0.8$ is not the length. Use the square root of the sum of squares, which is $1$." },
        { text: "No, unit vectors must be $\\mathbf{i}$ or $\\mathbf{j}$", explain: "Any vector of length $1$ is a unit vector, in any direction." },
        { text: "Only if you round it", explain: "It is exactly a unit vector, since $0.36 + 0.64 = 1$ exactly." },
      ],
    },
  ],
  summit: [
    {
      id: "s-unit-512",
      prompt: "Find the unit vector in the direction of $v = (5, 12)$, where $|v| = 13$.",
      choices: [
        { text: "$(\\tfrac{5}{13}, \\tfrac{12}{13})$", correct: true, explain: "$\\dfrac{1}{13}(5, 12) = (\\tfrac{5}{13}, \\tfrac{12}{13})$, a length-$1$ vector." },
        { text: "$(5, 12)$", explain: "That is $v$, length $13$. Divide by $|v|$ to reach length $1$." },
        { text: "$(\\tfrac{12}{13}, \\tfrac{5}{13})$", explain: "That swaps the components. Divide each in place by $13$." },
        { text: "$(\\tfrac{5}{12}, 1)$", explain: "That divides the parts by each other, not by the magnitude $13$." },
      ],
    },
    {
      id: "s-unit-neg",
      prompt: "Find the unit vector in the direction of $v = (-3, 4)$, where $|v| = 5$.",
      choices: [
        { text: "$(-0.6, 0.8)$", correct: true, explain: "$\\dfrac{1}{5}(-3, 4) = (-0.6, 0.8)$. The sign of each component is preserved." },
        { text: "$(0.6, 0.8)$", explain: "That drops the minus sign. The horizontal part stays negative." },
        { text: "$(-3, 4)$", explain: "That is $v$, length $5$. Divide by $|v|$ to get length $1$." },
        { text: "$(-0.6, -0.8)$", explain: "The vertical part is $+4$, so its unit component stays positive." },
      ],
    },
    {
      id: "s-ij-neg",
      prompt: "Write $v = (-4, -7)$ in terms of $\\mathbf{i}$ and $\\mathbf{j}$.",
      choices: [
        { text: "$-4\\mathbf{i} - 7\\mathbf{j}$", correct: true, explain: "Both components are negative, so both terms carry a minus sign." },
        { text: "$-4\\mathbf{i} + 7\\mathbf{j}$", explain: "The vertical component is $-7$, so the $\\mathbf{j}$ term is negative." },
        { text: "$4\\mathbf{i} + 7\\mathbf{j}$", explain: "That drops both signs. Keep the negatives from the components." },
        { text: "$-7\\mathbf{i} - 4\\mathbf{j}$", explain: "That swaps the components onto the wrong unit vectors." },
      ],
    },
    {
      id: "s-which-unit",
      prompt: "Which of these is a unit vector?",
      choices: [
        { text: "$(0.6, 0.8)$", correct: true, explain: "$\\sqrt{0.36 + 0.64} = 1$, so it has length $1$." },
        { text: "$(1, 1)$", explain: "$\\sqrt{1 + 1} = \\sqrt{2} \\approx 1.41$, not $1$." },
        { text: "$(3, 4)$", explain: "$\\sqrt{9 + 16} = 5$, far from $1$." },
        { text: "$(0.5, 0.5)$", explain: "$\\sqrt{0.25 + 0.25} = \\sqrt{0.5} \\approx 0.71$, not $1$." },
      ],
    },
    {
      id: "s-is-34-unit",
      prompt: "Is $v = (3, 4)$ a unit vector?",
      choices: [
        { text: "No, its length is $5$", correct: true, explain: "$\\sqrt{3^2 + 4^2} = 5$, so it is not length $1$. Its unit vector is $(0.6, 0.8)$." },
        { text: "Yes", explain: "Its length is $5$, not $1$, so it is not a unit vector." },
        { text: "No, its length is $7$", explain: "Adding $3 + 4 = 7$ is not the length. The length is $\\sqrt{25} = 5$." },
        { text: "Yes, every whole-number vector is", explain: "Length has nothing to do with whole numbers. This one has length $5$." },
      ],
    },
    {
      id: "s-build-260",
      prompt: "Build a vector of magnitude $2$ at $\\theta = 60^\\circ$, where $\\cos 60^\\circ = \\tfrac{1}{2}$ and $\\sin 60^\\circ = \\tfrac{\\sqrt{3}}{2}$.",
      choices: [
        { text: "$(1, \\sqrt{3})$", correct: true, explain: "$2(\\tfrac{1}{2}, \\tfrac{\\sqrt{3}}{2}) = (1, \\sqrt{3})$." },
        { text: "$(\\sqrt{3}, 1)$", explain: "That swaps sine and cosine. The horizontal part uses cosine." },
        { text: "$(2, 2\\sqrt{3})$", explain: "That forgets to multiply the halves through. The magnitude is only $2$." },
        { text: "$(\\tfrac{1}{2}, \\tfrac{\\sqrt{3}}{2})$", explain: "That is the unit vector. Scale it by the magnitude $2$." },
      ],
    },
    {
      id: "s-build-4135",
      prompt: "Build a vector of magnitude $4$ at $\\theta = 135^\\circ$, where $\\cos 135^\\circ = -\\tfrac{\\sqrt{2}}{2}$ and $\\sin 135^\\circ = \\tfrac{\\sqrt{2}}{2}$.",
      choices: [
        { text: "$(-2\\sqrt{2}, 2\\sqrt{2})$", correct: true, explain: "$4(-\\tfrac{\\sqrt{2}}{2}, \\tfrac{\\sqrt{2}}{2}) = (-2\\sqrt{2}, 2\\sqrt{2})$." },
        { text: "$(2\\sqrt{2}, 2\\sqrt{2})$", explain: "That misses the sign of cosine. At $135^\\circ$ the vector points left." },
        { text: "$(-2\\sqrt{2}, -2\\sqrt{2})$", explain: "The vertical part is positive at $135^\\circ$, so the $y$-part is $+2\\sqrt{2}$." },
        { text: "$(-4, 4)$", explain: "That uses $\\pm 1$ for cosine and sine. Their exact values are $\\pm\\tfrac{\\sqrt{2}}{2}$." },
      ],
    },
    {
      id: "s-mag-ij",
      prompt: "Find the magnitude of $v = 2\\mathbf{i} - 5\\mathbf{j}$.",
      choices: [
        { text: "$\\sqrt{29}$", correct: true, explain: "The components are $(2, -5)$, so $|v| = \\sqrt{2^2 + (-5)^2} = \\sqrt{4 + 25} = \\sqrt{29}$." },
        { text: "$\\sqrt{21}$", explain: "That is $\\sqrt{25 - 4}$. Add the squares, do not subtract." },
        { text: "$7$", explain: "That adds the sizes, $2 + 5$. Use the square root of the sum of squares." },
        { text: "$29$", explain: "That is $2^2 + 5^2$ before the square root." },
      ],
    },
    {
      id: "s-scale-j",
      prompt: "Scale the unit vector $(0, 1)$ to make a vector of magnitude $6$.",
      choices: [
        { text: "$(0, 6)$", correct: true, explain: "$6(0, 1) = (0, 6)$, length $6$ straight up." },
        { text: "$(6, 0)$", explain: "That points right. The unit vector $(0, 1)$ points up, so scaling stays vertical." },
        { text: "$(0, 1)$", explain: "That is still length $1$. Multiply by $6$." },
        { text: "$(6, 6)$", explain: "That adds a horizontal part that was not there. Only the vertical part scales." },
      ],
    },
    {
      id: "s-unit-dir",
      prompt: "The unit vector $\\hat v = v/|v|$ points in which direction relative to $v$?",
      choices: [
        { text: "The same direction as $v$", correct: true, explain: "Dividing by the positive number $|v|$ scales the length but never turns the arrow." },
        { text: "The opposite direction", explain: "Dividing by a positive number keeps the direction. Only a negative factor would flip it." },
        { text: "Perpendicular to $v$", explain: "The unit vector is parallel to $v$, not at a right angle." },
        { text: "Always along the $x$-axis", explain: "It points along $v$, whatever direction that is." },
      ],
    },
    {
      id: "s-opp",
      prompt: "Find a vector of length $3$ pointing opposite to the unit vector $(0.6, 0.8)$.",
      choices: [
        { text: "$(-1.8, -2.4)$", correct: true, explain: "Opposite means multiply by $-3$: $-3(0.6, 0.8) = (-1.8, -2.4)$, length $3$." },
        { text: "$(1.8, 2.4)$", explain: "That is $+3$ times the unit vector, the same direction, not opposite." },
        { text: "$(-0.6, -0.8)$", explain: "That points the opposite way but has length $1$, not $3$." },
        { text: "$(-3, -3)$", explain: "That ignores the direction. Scale the unit vector by $-3$ component by component." },
      ],
    },
    {
      id: "s-reconstruct",
      prompt: "A vector has unit vector $\\hat v = (0.8, -0.6)$ and magnitude $|v| = 5$. Find $v$.",
      choices: [
        { text: "$(4, -3)$", correct: true, explain: "$v = |v|\\hat v = 5(0.8, -0.6) = (4, -3)$, and indeed $|(4, -3)| = 5$." },
        { text: "$(0.8, -0.6)$", explain: "That is the unit vector. Scale it up by $|v| = 5$." },
        { text: "$(4, 3)$", explain: "That drops the minus sign. The vertical part is $5(-0.6) = -3$." },
        { text: "$(0.16, -0.12)$", explain: "That divides by $5$ instead of multiplying." },
      ],
    },
    {
      id: "s-unit-denom",
      prompt: "Which expression correctly gives the unit vector in the direction of $v$?",
      choices: [
        { text: "$\\dfrac{v}{|v|}$", correct: true, explain: "Divide by the length once to rescale to $1$." },
        { text: "$\\dfrac{v}{|v|^2}$", explain: "Dividing by $|v|^2$ overshrinks the vector below length $1$." },
        { text: "$v \\cdot |v|$", explain: "Multiplying by $|v|$ makes the vector longer, not length $1$." },
        { text: "$\\dfrac{|v|}{v}$", explain: "You cannot divide a number by a vector. Divide the vector by the number." },
      ],
    },
    {
      id: "s-samedir",
      prompt: "Which vector has the same direction (the same unit vector) as $(2, 0)$?",
      choices: [
        { text: "$(5, 0)$", correct: true, explain: "Both have unit vector $(1, 0)$, so they point the same way (just different lengths)." },
        { text: "$(0, 2)$", explain: "That points up, unit vector $(0, 1)$, a different direction." },
        { text: "$(-2, 0)$", explain: "That points the opposite way, unit vector $(-1, 0)$." },
        { text: "$(2, 2)$", explain: "That points diagonally, unit vector about $(0.71, 0.71)$." },
      ],
    },
    {
      id: "s-build-formula",
      prompt: "Which formula correctly builds a vector from magnitude $|v|$ and direction $\\theta$?",
      choices: [
        { text: "$v = |v|(\\cos\\theta\\,\\mathbf{i} + \\sin\\theta\\,\\mathbf{j})$", correct: true, explain: "Scale the unit direction $(\\cos\\theta, \\sin\\theta)$ by $|v|$." },
        { text: "$v = |v|(\\sin\\theta\\,\\mathbf{i} + \\cos\\theta\\,\\mathbf{j})$", explain: "This swaps sine and cosine. The horizontal part uses cosine." },
        { text: "$v = \\dfrac{\\cos\\theta\\,\\mathbf{i} + \\sin\\theta\\,\\mathbf{j}}{|v|}$", explain: "Dividing by $|v|$ shrinks the vector. You multiply by it." },
        { text: "$v = |v| + \\cos\\theta\\,\\mathbf{i} + \\sin\\theta\\,\\mathbf{j}$", explain: "You scale the unit direction by $|v|$, you do not add $|v|$ on." },
      ],
    },
  ],
};
