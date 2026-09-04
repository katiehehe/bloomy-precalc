import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Hyperbolas". Grounded in the
 * lesson: x^2/a^2 - y^2/b^2 = 1 opens left-right and y^2/a^2 - x^2/b^2 = 1 opens
 * up-down, a is the number under the positive term (the vertex distance), and
 * the vertices are at (+/- a, 0) or (0, +/- a) on the transverse axis.
 *
 * Distractors are the real traps: reading a from the larger denominator (ellipse
 * habit) instead of the positive term, taking the denominator without the square
 * root, putting the vertices on the wrong axis, and confusing the plus/minus
 * sign with the size of the numbers. Every value is verified by hand.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "h-minus-sign",
      prompt: "$\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ (with a minus between the terms) is a:",
      choices: [
        { text: "hyperbola", correct: true, explain: "Subtracting the squared terms opens the curve into two branches, a hyperbola." },
        { text: "an ellipse", explain: "An ellipse adds the terms. The minus sign here makes a hyperbola." },
        { text: "a circle", explain: "A circle has equal added squared terms, not a subtraction." },
        { text: "a parabola", explain: "A parabola has only one squared term. This has two, subtracted." },
      ],
    },
    {
      id: "h-opens-lr",
      prompt: "$\\frac{x^2}{9} - \\frac{y^2}{16} = 1$ opens:",
      choices: [
        { text: "left and right", correct: true, explain: "The positive term is $x^2$, so the branches follow the $x$ direction." },
        { text: "up and down", explain: "That needs a positive $y^2$ term. Here $x^2$ is the positive one." },
        { text: "in all four directions", explain: "A hyperbola has exactly two branches, along one axis." },
        { text: "it is closed like an ellipse", explain: "The minus sign opens it into two branches." },
      ],
    },
    {
      id: "h-vertices-9-16",
      prompt: "The vertices of $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$ are:",
      choices: [
        { text: "$(\\pm 3, 0)$", correct: true, explain: "Set $y = 0$: $x^2 = 9$, so $x = \\pm 3$." },
        { text: "$(0, \\pm 4)$", explain: "The curve never crosses the $y$-axis, so there is no vertex there." },
        { text: "$(\\pm 4, 0)$", explain: "$4 = \\sqrt{16}$ comes from $b$, not from the positive term." },
        { text: "$(0, \\pm 3)$", explain: "The transverse axis is horizontal, so the vertices are on the $x$-axis." },
      ],
    },
    {
      id: "h-a-value",
      prompt: "For $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$, the vertex distance $a$ is:",
      choices: [
        { text: "$3$, from $\\sqrt{9}$", correct: true, explain: "$a$ is the square root of the denominator under the positive term." },
        { text: "$9$, the denominator", explain: "The denominator is $a^2$. Take its square root." },
        { text: "$4$, from $\\sqrt{16}$", explain: "$\\sqrt{16} = 4$ is $b$, from the negative term." },
        { text: "$16$", explain: "That denominator belongs to the negative term and is $b^2$." },
      ],
    },
    {
      id: "h-opens-ud",
      prompt: "$\\frac{y^2}{9} - \\frac{x^2}{16} = 1$ opens:",
      choices: [
        { text: "up and down", correct: true, explain: "The positive term is $y^2$, so the branches follow the $y$ direction." },
        { text: "left and right", explain: "That needs a positive $x^2$. Here $y^2$ is the positive term." },
        { text: "diagonally", explain: "A standard-form hyperbola centered at the origin opens along a coordinate axis." },
        { text: "it does not open", explain: "The minus sign guarantees two open branches." },
      ],
    },
    {
      id: "h-vertices-ud",
      prompt: "The vertices of $\\frac{y^2}{9} - \\frac{x^2}{16} = 1$ are:",
      choices: [
        { text: "$(0, \\pm 3)$", correct: true, explain: "Set $x = 0$: $y^2 = 9$, so $y = \\pm 3$ on the vertical axis." },
        { text: "$(\\pm 3, 0)$", explain: "The transverse axis is vertical here, so the vertices are on the $y$-axis." },
        { text: "$(\\pm 4, 0)$", explain: "$4 = \\sqrt{16}$ is $b$, and it gives no vertex." },
        { text: "$(0, \\pm 4)$", explain: "$a$ comes from the positive term ($9$), so $a = 3$, not $4$." },
      ],
    },
    {
      id: "h-direction-rule",
      prompt: "What sets which way a hyperbola opens?",
      choices: [
        { text: "which squared term is positive", correct: true, explain: "The variable with the plus sign points the opening direction." },
        { text: "which denominator is larger", explain: "Size of the denominators does not set the direction for a hyperbola. The sign does." },
        { text: "which numerator is larger", explain: "Both numerators are just $x^2$ and $y^2$." },
        { text: "the value of the constant on the right", explain: "The right side is $1$ in standard form and does not set the direction." },
      ],
    },
    {
      id: "h-a-under-plus",
      prompt: "In a hyperbola, the semi-axis $a$ (center to vertex) is the number under the:",
      choices: [
        { text: "positive term", correct: true, explain: "$a$ always is under the positive squared term, whether or not it is larger." },
        { text: "larger denominator", explain: "That is the ellipse habit. For a hyperbola, use the positive term." },
        { text: "negative term", explain: "The negative term's denominator is $b^2$, not $a^2$." },
        { text: "smaller denominator", explain: "Size does not determine it. The positive term does." },
      ],
    },
    {
      id: "h-branch-count",
      prompt: "How many branches does a hyperbola have?",
      choices: [
        { text: "two", correct: true, explain: "The subtraction splits it into two separate open curves." },
        { text: "one", explain: "One branch would be a parabola. A hyperbola has two." },
        { text: "four", explain: "There are two branches, not four." },
        { text: "none, it is a closed loop", explain: "It is open, with two branches, not a closed loop." },
      ],
    },
    {
      id: "h-a-larger",
      prompt: "For $\\frac{x^2}{16} - \\frac{y^2}{9} = 1$, the vertices are:",
      choices: [
        { text: "$(\\pm 4, 0)$", correct: true, explain: "The positive term is $x^2/16$, so $a = 4$ and the vertices are $(\\pm 4, 0)$." },
        { text: "$(\\pm 3, 0)$", explain: "$3 = \\sqrt{9}$ is $b$, from the negative term." },
        { text: "$(0, \\pm 4)$", explain: "The transverse axis is horizontal, so the vertices are on the $x$-axis." },
        { text: "$(0, \\pm 3)$", explain: "There is no vertex on the $y$-axis for a left-right hyperbola." },
      ],
    },
    {
      id: "h-vertices-25-4",
      prompt: "The vertices of $\\frac{y^2}{25} - \\frac{x^2}{4} = 1$ are:",
      choices: [
        { text: "$(0, \\pm 5)$", correct: true, explain: "The positive term is $y^2/25$, so $a = 5$ on the vertical axis." },
        { text: "$(\\pm 5, 0)$", explain: "The transverse axis is vertical here, so vertices are on the $y$-axis." },
        { text: "$(0, \\pm 2)$", explain: "$2 = \\sqrt{4}$ is $b$, from the negative term." },
        { text: "$(\\pm 2, 0)$", explain: "The vertices come from the positive $y^2$ term, at $(0, \\pm 5)$." },
      ],
    },
    {
      id: "h-which-hyperbola",
      prompt: "Which equation is a hyperbola?",
      choices: [
        { text: "$\\frac{x^2}{4} - \\frac{y^2}{9} = 1$", correct: true, explain: "Two squared terms subtracted make a hyperbola." },
        { text: "$\\frac{x^2}{4} + \\frac{y^2}{9} = 1$", explain: "Added terms make an ellipse." },
        { text: "$\\frac{x^2}{4} + \\frac{y^2}{4} = 1$", explain: "Equal added terms make a circle." },
        { text: "$y = x^2$", explain: "One squared term makes a parabola." },
      ],
    },
    {
      id: "h-no-y-intercept",
      prompt: "Where does $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$ cross the $y$-axis?",
      choices: [
        { text: "nowhere", correct: true, explain: "Set $x = 0$: $-y^2/16 = 1$ has no real solution, so there is no $y$-intercept." },
        { text: "$(0, \\pm 4)$", explain: "That would need the curve to reach the $y$-axis, but it never does." },
        { text: "$(0, \\pm 3)$", explain: "The vertices are on the $x$-axis, and there is no $y$-intercept at all." },
        { text: "at the origin", explain: "The origin gives $0 = 1$, which is false." },
      ],
    },
    {
      id: "h-transverse",
      prompt: "The transverse axis of a hyperbola is:",
      choices: [
        { text: "the segment through the two vertices", correct: true, explain: "It runs from one vertex to the other, along the positive term's direction." },
        { text: "the axis with no vertices", explain: "That is the conjugate axis. The transverse axis is the one with the vertices." },
        { text: "the line the branches never cross", explain: "That describes an asymptote, not the transverse axis." },
        { text: "the widest chord of the ellipse", explain: "This is a hyperbola, and the transverse axis joins its vertices." },
      ],
    },
    {
      id: "h-a-not-larger",
      prompt: "For $\\frac{x^2}{4} - \\frac{y^2}{25} = 1$, the vertex distance $a$ is:",
      choices: [
        { text: "$2$, from the positive term", correct: true, explain: "$a$ is under the positive $x^2$ term, so $a = \\sqrt{4} = 2$, even though $25$ is larger." },
        { text: "$5$, the larger semi-axis", explain: "That is the ellipse habit. For a hyperbola, $a$ is under the positive term." },
        { text: "$25$", explain: "That denominator is $b^2$, under the negative term." },
        { text: "$4$", explain: "That is $a^2$. Take the square root to get $a = 2$." },
      ],
    },
  ],
  summit: [
    {
      id: "s-open-1-9",
      prompt: "$\\frac{x^2}{1} - \\frac{y^2}{9} = 1$ opens:",
      choices: [
        { text: "left and right", correct: true, explain: "The positive term is $x^2$, so it opens along the $x$-axis with vertices $(\\pm 1, 0)$." },
        { text: "up and down", explain: "That needs a positive $y^2$ term." },
        { text: "it is a circle of radius $1$", explain: "The minus sign makes a hyperbola, not a circle." },
        { text: "it does not open", explain: "A hyperbola always has two open branches." },
      ],
    },
    {
      id: "s-divide-9-4",
      prompt: "Put $9x^2 - 4y^2 = 36$ in standard form and read the vertices.",
      choices: [
        { text: "$\\frac{x^2}{4} - \\frac{y^2}{9} = 1$, vertices $(\\pm 2, 0)$", correct: true, explain: "Divide by $36$: $x^2/4 - y^2/9 = 1$, so $a = \\sqrt{4} = 2$ on the $x$-axis." },
        { text: "$\\frac{x^2}{4} - \\frac{y^2}{9} = 1$, vertices $(0, \\pm 3)$", explain: "The positive term is $x^2$, so the vertices are on the $x$-axis at $(\\pm 2, 0)$." },
        { text: "$\\frac{x^2}{9} - \\frac{y^2}{4} = 1$, vertices $(\\pm 3, 0)$", explain: "Dividing $9x^2$ by $36$ gives $x^2/4$, not $x^2/9$." },
        { text: "$9x^2 - 4y^2 = 36$ is already standard", explain: "Standard form needs a $1$ on the right, so divide by $36$ first." },
      ],
    },
    {
      id: "s-y2-x2-1",
      prompt: "Classify and read the vertices of $y^2 - x^2 = 1$.",
      choices: [
        { text: "hyperbola opening up-down, vertices $(0, \\pm 1)$", correct: true, explain: "$y^2/1 - x^2/1 = 1$ has the positive term $y^2$, so $a = 1$ on the $y$-axis." },
        { text: "hyperbola opening left-right, vertices $(\\pm 1, 0)$", explain: "The positive term is $y^2$, so it opens up and down." },
        { text: "circle of radius $1$", explain: "The minus sign makes a hyperbola, not a circle." },
        { text: "ellipse", explain: "An ellipse adds its squared terms. This subtracts them." },
      ],
    },
    {
      id: "s-build-lr",
      prompt: "A hyperbola opens left and right with vertices $(\\pm 6, 0)$. Its equation looks like:",
      choices: [
        { text: "$\\frac{x^2}{36} - \\frac{y^2}{b^2} = 1$", correct: true, explain: "Left-right opening puts the positive term on $x^2$, and $a = 6$ gives $a^2 = 36$." },
        { text: "$\\frac{y^2}{36} - \\frac{x^2}{b^2} = 1$", explain: "That positive $y^2$ would open up and down." },
        { text: "$\\frac{x^2}{6} - \\frac{y^2}{b^2} = 1$", explain: "The denominator is $a^2 = 36$, not $6$." },
        { text: "$\\frac{x^2}{b^2} - \\frac{y^2}{36} = 1$", explain: "The $36$ belongs under the positive $x^2$ term, since the vertices are on the $x$-axis." },
      ],
    },
    {
      id: "s-two-branches",
      prompt: "Which feature separates a hyperbola from an ellipse?",
      choices: [
        { text: "a hyperbola has two separate branches", correct: true, explain: "The subtraction opens the curve into two pieces, while an ellipse is one closed loop." },
        { text: "a hyperbola is a single closed loop", explain: "That describes an ellipse. A hyperbola is open." },
        { text: "a hyperbola has no vertices", explain: "A hyperbola has two vertices, on its transverse axis." },
        { text: "a hyperbola has equal denominators", explain: "Equal denominators do not distinguish them. The sign between the terms does." },
      ],
    },
    {
      id: "s-vertices-49-4",
      prompt: "The vertices of $\\frac{x^2}{49} - \\frac{y^2}{4} = 1$ are:",
      choices: [
        { text: "$(\\pm 7, 0)$", correct: true, explain: "The positive term is $x^2/49$, so $a = \\sqrt{49} = 7$ on the $x$-axis." },
        { text: "$(0, \\pm 2)$", explain: "$2 = \\sqrt{4}$ is $b$, and the curve has no $y$-intercept anyway." },
        { text: "$(\\pm 2, 0)$", explain: "$a$ comes from the positive term, so $a = 7$, not $2$." },
        { text: "$(0, \\pm 7)$", explain: "The transverse axis is horizontal, so the vertices are on the $x$-axis." },
      ],
    },
    {
      id: "s-equal-denoms",
      prompt: "The vertices of $\\frac{y^2}{16} - \\frac{x^2}{16} = 1$ are:",
      choices: [
        { text: "$(0, \\pm 4)$", correct: true, explain: "Even with equal denominators, the positive term is $y^2$, so $a = 4$ on the $y$-axis." },
        { text: "$(\\pm 4, 0)$", explain: "The positive term is $y^2$, so the vertices are on the $y$-axis." },
        { text: "there are none, it is a circle", explain: "The minus sign makes a hyperbola with two vertices." },
        { text: "$(0, \\pm 16)$", explain: "Take the square root: $a = \\sqrt{16} = 4$." },
      ],
    },
    {
      id: "s-which-ud",
      prompt: "Which equation opens up and down?",
      choices: [
        { text: "$\\frac{y^2}{9} - \\frac{x^2}{25} = 1$", correct: true, explain: "The positive term is $y^2$, so it opens up and down." },
        { text: "$\\frac{x^2}{9} - \\frac{y^2}{25} = 1$", explain: "Positive $x^2$ opens it left and right." },
        { text: "$\\frac{x^2}{9} + \\frac{y^2}{25} = 1$", explain: "Added terms make an ellipse, not a hyperbola." },
        { text: "$\\frac{x^2}{25} - \\frac{y^2}{9} = 1$", explain: "Positive $x^2$ opens it left and right." },
      ],
    },
    {
      id: "s-a-trap",
      prompt: "A student says $\\frac{x^2}{4} - \\frac{y^2}{9} = 1$ has $a = 3$ because $9 > 4$. What is the fix?",
      choices: [
        { text: "$a$ is under the positive term, so $a = \\sqrt{4} = 2$", correct: true, explain: "For a hyperbola $a$ comes from the positive $x^2$ term, not the larger denominator." },
        { text: "nothing, $a = 3$ is right", explain: "That uses the larger-denominator rule from ellipses, which does not apply here." },
        { text: "$a = 9$, the larger denominator", explain: "The denominator is $a^2$, and it must come from the positive term." },
        { text: "$a = \\sqrt{13}$, combining both", explain: "$a$ is a single square root of the positive term's denominator." },
      ],
    },
    {
      id: "s-no-x-intercept",
      prompt: "Where does $\\frac{y^2}{9} - \\frac{x^2}{16} = 1$ cross the $x$-axis?",
      choices: [
        { text: "nowhere", correct: true, explain: "Set $y = 0$: $-x^2/16 = 1$ has no real solution, so there is no $x$-intercept." },
        { text: "$(\\pm 4, 0)$", explain: "The curve opens up and down and never reaches the $x$-axis." },
        { text: "$(\\pm 3, 0)$", explain: "The vertices are on the $y$-axis, and there is no $x$-intercept." },
        { text: "at the origin", explain: "The origin gives $0 = 1$, which is false." },
      ],
    },
    {
      id: "s-vertices-on",
      prompt: "The two vertices of a hyperbola always lie on the:",
      choices: [
        { text: "transverse axis", correct: true, explain: "The vertices are the endpoints of the transverse axis, along the positive term." },
        { text: "conjugate axis", explain: "The conjugate axis has no vertices on the curve." },
        { text: "asymptotes", explain: "Asymptotes are guide lines the branches approach, not where the vertices are." },
        { text: "line $y = x$", explain: "The vertices lie on a coordinate axis, the transverse one." },
      ],
    },
    {
      id: "s-build-ud",
      prompt: "A hyperbola opens up and down with vertices $(0, \\pm 4)$. Its equation looks like:",
      choices: [
        { text: "$\\frac{y^2}{16} - \\frac{x^2}{b^2} = 1$", correct: true, explain: "Up-down opening puts the positive term on $y^2$, and $a = 4$ gives $a^2 = 16$." },
        { text: "$\\frac{x^2}{16} - \\frac{y^2}{b^2} = 1$", explain: "That positive $x^2$ would open left and right." },
        { text: "$\\frac{y^2}{4} - \\frac{x^2}{b^2} = 1$", explain: "The denominator is $a^2 = 16$, not $4$." },
        { text: "$\\frac{y^2}{b^2} - \\frac{x^2}{16} = 1$", explain: "The $16$ belongs under the positive $y^2$ term, since the vertices are on the $y$-axis." },
      ],
    },
    {
      id: "s-convert-16-4",
      prompt: "Put $x^2 - 4y^2 = 16$ in standard form and read the vertices.",
      choices: [
        { text: "$\\frac{x^2}{16} - \\frac{y^2}{4} = 1$, vertices $(\\pm 4, 0)$", correct: true, explain: "Divide by $16$: $x^2/16 - y^2/4 = 1$, so $a = 4$ on the $x$-axis." },
        { text: "$\\frac{x^2}{16} - \\frac{y^2}{4} = 1$, vertices $(0, \\pm 2)$", explain: "The positive term is $x^2$, so the vertices are on the $x$-axis at $(\\pm 4, 0)$." },
        { text: "$\\frac{x^2}{16} - \\frac{y^2}{16} = 1$, vertices $(\\pm 4, 0)$", explain: "Dividing $4y^2$ by $16$ gives $y^2/4$, not $y^2/16$." },
        { text: "$x^2 - 4y^2 = 16$ is already standard", explain: "Standard form needs a $1$ on the right, so divide by $16$ first." },
      ],
    },
    {
      id: "s-not-hyperbola",
      prompt: "Which equation is NOT a hyperbola?",
      choices: [
        { text: "$\\frac{x^2}{9} + \\frac{y^2}{4} = 1$", correct: true, explain: "Added squared terms make an ellipse, not a hyperbola." },
        { text: "$\\frac{x^2}{9} - \\frac{y^2}{4} = 1$", explain: "Subtracted terms make a left-right hyperbola." },
        { text: "$\\frac{y^2}{9} - \\frac{x^2}{4} = 1$", explain: "Subtracted terms make an up-down hyperbola." },
        { text: "$4y^2 - x^2 = 4$", explain: "Rearranged this is $y^2/1 - x^2/4 = 1$, a hyperbola." },
      ],
    },
    {
      id: "s-capstone-36-64",
      prompt: "Which statement about $\\frac{x^2}{36} - \\frac{y^2}{64} = 1$ is correct?",
      choices: [
        { text: "opens left-right, $a = 6$, vertices $(\\pm 6, 0)$", correct: true, explain: "The positive term is $x^2/36$, so $a = \\sqrt{36} = 6$ on the $x$-axis." },
        { text: "$a = 8$, vertices $(0, \\pm 8)$", explain: "$8 = \\sqrt{64}$ is $b$, and it gives no vertex." },
        { text: "opens up-down, vertices $(0, \\pm 6)$", explain: "The positive term is $x^2$, so it opens left and right." },
        { text: "it is an ellipse because both terms are present", explain: "The minus sign makes it a hyperbola, not an ellipse." },
      ],
    },
  ],
};
