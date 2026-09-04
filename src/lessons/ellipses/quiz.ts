import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Ellipses". Grounded in the lesson:
 * for x^2/a^2 + y^2/b^2 = 1 the semi-axes are the square roots of the
 * denominators, the vertices are the ends of the longer axis and the co-vertices
 * the ends of the shorter, and the major axis lies along the larger denominator.
 *
 * Distractors are the real traps: reading the denominator as the semi-axis
 * (skipping the square root), swapping vertices and co-vertices, picking the
 * wrong axis as major, and assuming a is always the larger number. Every semi-
 * axis, vertex, and axis length below is verified by hand.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "e-ab-meaning",
      prompt: "In $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$, what are $a$ and $b$?",
      choices: [
        { text: "the semi-axis lengths (center to curve along each axis)", correct: true, explain: "$a$ reaches from the center along $x$ and $b$ along $y$." },
        { text: "the full axis lengths", explain: "The full axes are $2a$ and $2b$. The letters $a$ and $b$ are the halves." },
        { text: "the denominators of the equation", explain: "The denominators are $a^2$ and $b^2$. You still take a square root to get $a$ and $b$." },
        { text: "the coordinates of the foci", explain: "The foci are a separate feature. $a$ and $b$ are the semi-axes." },
      ],
    },
    {
      id: "e-read-25-9",
      prompt: "For $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$, the semi-axes are:",
      choices: [
        { text: "$a = 5$, $b = 3$", correct: true, explain: "$\\sqrt{25} = 5$ and $\\sqrt{9} = 3$." },
        { text: "$a = 25$, $b = 9$", explain: "Those are $a^2$ and $b^2$. Take the square root of each." },
        { text: "$a = 3$, $b = 5$", explain: "That swaps them. $a$ is under $x^2$ ($25$) and $b$ under $y^2$ ($9$)." },
        { text: "$a = 12.5$, $b = 4.5$", explain: "Halving the denominator is not the same as square-rooting it." },
      ],
    },
    {
      id: "e-vertices-25-9",
      prompt: "The vertices of $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$ are:",
      choices: [
        { text: "$(\\pm 5, 0)$", correct: true, explain: "The longer semi-axis is $5$ along $x$, so the far points are $(\\pm 5, 0)$." },
        { text: "$(0, \\pm 3)$", explain: "Those are the co-vertices, on the shorter axis." },
        { text: "$(\\pm 3, 0)$", explain: "The horizontal semi-axis is $5$, not $3$." },
        { text: "$(0, \\pm 5)$", explain: "The longer axis is horizontal here, so the vertices lie on the $x$-axis." },
      ],
    },
    {
      id: "e-covertices-25-9",
      prompt: "The co-vertices of $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$ are:",
      choices: [
        { text: "$(0, \\pm 3)$", correct: true, explain: "The shorter semi-axis is $3$ along $y$, so the near points are $(0, \\pm 3)$." },
        { text: "$(\\pm 5, 0)$", explain: "Those are the vertices, on the longer axis." },
        { text: "$(0, \\pm 9)$", explain: "Take the square root: $\\sqrt{9} = 3$, not $9$." },
        { text: "$(\\pm 3, 0)$", explain: "The shorter semi-axis is vertical here, so the co-vertices lie on the $y$-axis." },
      ],
    },
    {
      id: "e-major-25-9",
      prompt: "The major axis of $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$ is:",
      choices: [
        { text: "horizontal", correct: true, explain: "The larger denominator $25$ sits under $x^2$, so the long axis runs across." },
        { text: "vertical", explain: "That would need the larger denominator under $y^2$. Here it is under $x^2$." },
        { text: "neither, it is a circle", explain: "The denominators differ ($25 \\ne 9$), so it is a true ellipse." },
        { text: "both directions equally", explain: "An ellipse has one longer axis. Here it is the horizontal one." },
      ],
    },
    {
      id: "e-major-rule",
      prompt: "The major axis of an ellipse always lies along the variable with the:",
      choices: [
        { text: "larger denominator", correct: true, explain: "A bigger denominator is a bigger $a^2$ or $b^2$, so its axis is the longer one." },
        { text: "smaller denominator", explain: "The smaller denominator marks the shorter, minor axis." },
        { text: "larger numerator", explain: "Both numerators are just $x^2$ and $y^2$. The denominators decide the shape." },
        { text: "plus sign in front", explain: "Both terms of an ellipse are added. The denominators, not the signs, set the orientation." },
      ],
    },
    {
      id: "e-orient-9-25",
      prompt: "The major axis of $\\frac{x^2}{9} + \\frac{y^2}{25} = 1$ is:",
      choices: [
        { text: "vertical", correct: true, explain: "The larger denominator $25$ is under $y^2$, so the long axis runs up and down." },
        { text: "horizontal", explain: "The larger denominator is under $y^2$, not $x^2$, so it is vertical." },
        { text: "diagonal", explain: "For a standard-form ellipse centered at the origin the axes are horizontal and vertical only." },
        { text: "neither, it is a circle", explain: "The denominators differ, so it is a true ellipse." },
      ],
    },
    {
      id: "e-vertices-9-25",
      prompt: "The vertices of $\\frac{x^2}{9} + \\frac{y^2}{25} = 1$ are:",
      choices: [
        { text: "$(0, \\pm 5)$", correct: true, explain: "Vertical major axis with $\\sqrt{25} = 5$ puts the vertices at $(0, \\pm 5)$." },
        { text: "$(\\pm 5, 0)$", explain: "The long axis is vertical here, so the vertices are on the $y$-axis." },
        { text: "$(\\pm 3, 0)$", explain: "Those are the co-vertices, at $\\sqrt{9} = 3$ along $x$." },
        { text: "$(0, \\pm 25)$", explain: "Take the square root: $\\sqrt{25} = 5$, not $25$." },
      ],
    },
    {
      id: "e-major-length",
      prompt: "The major axis of $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$ has length:",
      choices: [
        { text: "$10$", correct: true, explain: "The full major axis is $2a = 2(5) = 10$." },
        { text: "$5$", explain: "That is the semi-major axis $a$. The full axis is twice that." },
        { text: "$20$", explain: "That would be $2(10)$. The semi-axis is $5$, so the axis is $10$." },
        { text: "$6$", explain: "$6 = 2b$ is the minor axis. The major axis uses $a = 5$." },
      ],
    },
    {
      id: "e-which-circle",
      prompt: "Which of these is actually a circle?",
      choices: [
        { text: "$\\frac{x^2}{16} + \\frac{y^2}{16} = 1$", correct: true, explain: "Equal denominators mean $a = b$, so the ellipse is a circle." },
        { text: "$\\frac{x^2}{16} + \\frac{y^2}{4} = 1$", explain: "Different denominators give a genuine ellipse, wider than tall." },
        { text: "$\\frac{x^2}{25} + \\frac{y^2}{9} = 1$", explain: "$25 \\ne 9$, so it is an ellipse, not a circle." },
        { text: "$\\frac{x^2}{9} + \\frac{y^2}{1} = 1$", explain: "$9 \\ne 1$, so this is a stretched ellipse." },
      ],
    },
    {
      id: "e-semi-major-49-4",
      prompt: "For $\\frac{x^2}{49} + \\frac{y^2}{4} = 1$, the semi-major axis length is:",
      choices: [
        { text: "$7$", correct: true, explain: "The larger denominator is $49$, and $\\sqrt{49} = 7$." },
        { text: "$49$", explain: "That is $a^2$. The semi-axis is its square root, $7$." },
        { text: "$2$", explain: "$\\sqrt{4} = 2$ is the semi-minor axis, the shorter one." },
        { text: "$14$", explain: "$14 = 2a$ is the full major axis, not the semi-axis." },
      ],
    },
    {
      id: "e-sqrt-trap",
      prompt: "A student reads $\\frac{x^2}{36} + \\frac{y^2}{16} = 1$ as $a = 36$, $b = 16$. What are $a$ and $b$?",
      choices: [
        { text: "square-root the denominators: $a = 6$, $b = 4$", correct: true, explain: "The denominators are $a^2$ and $b^2$, so $a = \\sqrt{36} = 6$ and $b = \\sqrt{16} = 4$." },
        { text: "nothing, $a = 36$ and $b = 16$ are right", explain: "Those are $a^2$ and $b^2$. The semi-axes are their square roots." },
        { text: "halve them: $a = 18$, $b = 8$", explain: "Halving is not square-rooting. $\\sqrt{36} = 6$, not $18$." },
        { text: "add them: $a = b = 52$", explain: "Each semi-axis comes from its own denominator by a square root." },
      ],
    },
    {
      id: "e-taller",
      prompt: "Which ellipse is taller than it is wide?",
      choices: [
        { text: "$\\frac{x^2}{4} + \\frac{y^2}{25} = 1$", correct: true, explain: "The larger denominator $25$ is under $y^2$, so the long axis is vertical." },
        { text: "$\\frac{x^2}{25} + \\frac{y^2}{4} = 1$", explain: "Here the larger denominator is under $x^2$, so it is wider than tall." },
        { text: "$\\frac{x^2}{9} + \\frac{y^2}{9} = 1$", explain: "Equal denominators give a circle, neither taller nor wider." },
        { text: "$\\frac{x^2}{16} + \\frac{y^2}{1} = 1$", explain: "The larger denominator $16$ is under $x^2$, so it is wide." },
      ],
    },
    {
      id: "e-covertex-axis",
      prompt: "The co-vertices of an ellipse lie on the:",
      choices: [
        { text: "minor axis (the shorter one)", correct: true, explain: "Co-vertices are the endpoints of the shorter, minor axis." },
        { text: "major axis (the longer one)", explain: "The endpoints of the longer axis are the vertices, not the co-vertices." },
        { text: "line through the foci", explain: "The foci sit on the major axis. The co-vertices are on the minor axis." },
        { text: "diagonal of the ellipse", explain: "The co-vertices sit on a coordinate axis, the minor one." },
      ],
    },
    {
      id: "e-minor-endpoints",
      prompt: "For $\\frac{x^2}{16} + \\frac{y^2}{4} = 1$, the endpoints of the minor axis are:",
      choices: [
        { text: "$(0, \\pm 2)$", correct: true, explain: "The shorter semi-axis is $\\sqrt{4} = 2$ along $y$, so the minor endpoints are $(0, \\pm 2)$." },
        { text: "$(\\pm 4, 0)$", explain: "Those are the vertices, ends of the longer axis." },
        { text: "$(0, \\pm 4)$", explain: "The vertical semi-axis is $\\sqrt{4} = 2$, not $4$." },
        { text: "$(\\pm 2, 0)$", explain: "The shorter axis is vertical here, so its endpoints are on the $y$-axis." },
      ],
    },
  ],
  summit: [
    {
      id: "s-build-from-semiaxes",
      prompt: "An ellipse centered at the origin has horizontal semi-axis $6$ and vertical semi-axis $10$. Its equation is:",
      choices: [
        { text: "$\\frac{x^2}{36} + \\frac{y^2}{100} = 1$", correct: true, explain: "The denominators are the squares of the semi-axes: $6^2 = 36$ under $x^2$ and $10^2 = 100$ under $y^2$." },
        { text: "$\\frac{x^2}{100} + \\frac{y^2}{36} = 1$", explain: "That swaps the axes. The horizontal semi-axis $6$ belongs under $x^2$." },
        { text: "$\\frac{x^2}{6} + \\frac{y^2}{10} = 1$", explain: "You must square the semi-axes to get the denominators." },
        { text: "$\\frac{x^2}{12} + \\frac{y^2}{20} = 1$", explain: "Doubling is not squaring. Use $6^2$ and $10^2$." },
      ],
    },
    {
      id: "s-vertices-100-36",
      prompt: "The vertices of $\\frac{x^2}{100} + \\frac{y^2}{36} = 1$ are:",
      choices: [
        { text: "$(\\pm 10, 0)$", correct: true, explain: "The larger denominator $100$ is under $x^2$, so the horizontal semi-axis $\\sqrt{100} = 10$ gives the vertices." },
        { text: "$(0, \\pm 6)$", explain: "Those are the co-vertices, at $\\sqrt{36} = 6$ along $y$." },
        { text: "$(\\pm 100, 0)$", explain: "Take the square root: $\\sqrt{100} = 10$." },
        { text: "$(0, \\pm 10)$", explain: "The long axis is horizontal here, so the vertices are on the $x$-axis." },
      ],
    },
    {
      id: "s-major-length-100-36",
      prompt: "The major axis of $\\frac{x^2}{100} + \\frac{y^2}{36} = 1$ has length:",
      choices: [
        { text: "$20$", correct: true, explain: "$2a = 2\\sqrt{100} = 2(10) = 20$." },
        { text: "$10$", explain: "That is the semi-major axis. The full axis is twice as long." },
        { text: "$12$", explain: "$12 = 2b$ is the minor axis, using $b = 6$." },
        { text: "$200$", explain: "Square-root first: $a = 10$, so $2a = 20$." },
      ],
    },
    {
      id: "s-build-from-vertices",
      prompt: "An ellipse has vertices $(0, \\pm 8)$ and co-vertices $(\\pm 5, 0)$. Its equation is:",
      choices: [
        { text: "$\\frac{x^2}{25} + \\frac{y^2}{64} = 1$", correct: true, explain: "Vertices $(0, \\pm 8)$ make the major axis vertical, so $8^2 = 64$ goes under $y^2$ and $5^2 = 25$ under $x^2$." },
        { text: "$\\frac{x^2}{64} + \\frac{y^2}{25} = 1$", explain: "That puts the larger denominator under $x^2$, which would be a horizontal major axis." },
        { text: "$\\frac{x^2}{5} + \\frac{y^2}{8} = 1$", explain: "The denominators are the squares of the semi-axes, so use $25$ and $64$." },
        { text: "$\\frac{x^2}{8} + \\frac{y^2}{5} = 1$", explain: "Both the squaring and the placement are off. The vertical vertices force $64$ under $y^2$." },
      ],
    },
    {
      id: "s-which-ellipse",
      prompt: "Which equation is an ellipse that is not a circle?",
      choices: [
        { text: "$\\frac{x^2}{9} + \\frac{y^2}{4} = 1$", correct: true, explain: "Two added squared terms with unequal positive denominators make a genuine ellipse." },
        { text: "$\\frac{x^2}{9} + \\frac{y^2}{9} = 1$", explain: "Equal denominators make a circle." },
        { text: "$\\frac{x^2}{9} - \\frac{y^2}{4} = 1$", explain: "The minus sign makes this a hyperbola." },
        { text: "$y = \\frac{x^2}{9}$", explain: "Only one variable is squared, so this is a parabola." },
      ],
    },
    {
      id: "s-divide-first",
      prompt: "Put $4x^2 + 25y^2 = 100$ into standard form and read its vertices.",
      choices: [
        { text: "$\\frac{x^2}{25} + \\frac{y^2}{4} = 1$, vertices $(\\pm 5, 0)$", correct: true, explain: "Divide by $100$ to get a $1$ on the right, then $\\sqrt{25} = 5$ is the larger, horizontal semi-axis." },
        { text: "$\\frac{x^2}{25} + \\frac{y^2}{4} = 1$, vertices $(0, \\pm 2)$", explain: "The standard form is right, but the larger denominator $25$ is under $x^2$, so the vertices are horizontal." },
        { text: "$4x^2 + 25y^2 = 100$ is already standard, vertices $(\\pm 4, 0)$", explain: "Standard form needs a $1$ on the right. Divide by $100$ first." },
        { text: "$\\frac{x^2}{4} + \\frac{y^2}{25} = 1$, vertices $(0, \\pm 5)$", explain: "Dividing $4x^2$ by $100$ gives $x^2/25$, not $x^2/4$. Watch which coefficient goes where." },
      ],
    },
    {
      id: "s-taller-16-36",
      prompt: "Is $\\frac{x^2}{16} + \\frac{y^2}{36} = 1$ wider or taller?",
      choices: [
        { text: "taller (vertical major axis)", correct: true, explain: "The larger denominator $36$ is under $y^2$, so the long axis is vertical." },
        { text: "wider (horizontal major axis)", explain: "That needs the larger denominator under $x^2$. Here it is under $y^2$." },
        { text: "a circle", explain: "$16 \\ne 36$, so it is a true ellipse." },
        { text: "cannot tell without the foci", explain: "Comparing the two denominators is enough to fix the orientation." },
      ],
    },
    {
      id: "s-minor-length-36-16",
      prompt: "The minor axis of $\\frac{x^2}{36} + \\frac{y^2}{16} = 1$ has length:",
      choices: [
        { text: "$8$", correct: true, explain: "The shorter semi-axis is $\\sqrt{16} = 4$, so the minor axis is $2(4) = 8$." },
        { text: "$4$", explain: "That is the semi-minor axis. The full minor axis is twice as long." },
        { text: "$12$", explain: "$12 = 2a$ is the major axis, using $a = 6$." },
        { text: "$16$", explain: "Square-root first: $b = \\sqrt{16} = 4$, so the minor axis is $8$." },
      ],
    },
    {
      id: "s-wider-not-taller",
      prompt: "A student says $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$ is taller because $25 > 9$. What is the mistake?",
      choices: [
        { text: "the larger denominator $25$ is under $x^2$, so it is wider, not taller", correct: true, explain: "A bigger denominator makes its own axis longer, and $25$ belongs to $x$, the horizontal direction." },
        { text: "nothing, it is taller", explain: "The larger denominator sits under $x^2$, so the ellipse stretches horizontally." },
        { text: "you should compare numerators, not denominators", explain: "The numerators are both just $x^2$ and $y^2$. The denominators decide orientation." },
        { text: "$25$ and $9$ are the semi-axes, so it is a circle", explain: "They are $a^2$ and $b^2$, and they differ, so it is a wide ellipse." },
      ],
    },
    {
      id: "s-major-endpoints-9-49",
      prompt: "The endpoints of the major axis of $\\frac{x^2}{9} + \\frac{y^2}{49} = 1$ are:",
      choices: [
        { text: "$(0, \\pm 7)$", correct: true, explain: "The larger denominator $49$ is under $y^2$, so the vertices are $(0, \\pm \\sqrt{49}) = (0, \\pm 7)$." },
        { text: "$(\\pm 3, 0)$", explain: "Those are the co-vertices, at $\\sqrt{9} = 3$ along $x$." },
        { text: "$(0, \\pm 49)$", explain: "Take the square root: $\\sqrt{49} = 7$." },
        { text: "$(\\pm 7, 0)$", explain: "The long axis is vertical here, so the endpoints are on the $y$-axis." },
      ],
    },
    {
      id: "s-major-length-16-81",
      prompt: "The major axis of $\\frac{x^2}{16} + \\frac{y^2}{81} = 1$ has length:",
      choices: [
        { text: "$18$", correct: true, explain: "The larger denominator $81$ gives $a = \\sqrt{81} = 9$, so the major axis is $2(9) = 18$." },
        { text: "$8$", explain: "$8 = 2\\sqrt{16}$ is the minor axis, using the smaller denominator." },
        { text: "$9$", explain: "That is the semi-major axis. The full axis is twice that." },
        { text: "$81$", explain: "Square-root first: $a = 9$, so $2a = 18$." },
      ],
    },
    {
      id: "s-divide-9-4",
      prompt: "Put $9x^2 + 4y^2 = 36$ into standard form and read its vertices.",
      choices: [
        { text: "$\\frac{x^2}{4} + \\frac{y^2}{9} = 1$, vertices $(0, \\pm 3)$", correct: true, explain: "Divide by $36$. The larger denominator $9$ lands under $y^2$, so the vertices are vertical at $\\sqrt{9} = 3$." },
        { text: "$\\frac{x^2}{9} + \\frac{y^2}{4} = 1$, vertices $(\\pm 3, 0)$", explain: "Dividing $9x^2$ by $36$ gives $x^2/4$, not $x^2/9$. The larger denominator ends up under $y^2$." },
        { text: "$\\frac{x^2}{4} + \\frac{y^2}{9} = 1$, vertices $(\\pm 2, 0)$", explain: "The standard form is right, but $(\\pm 2, 0)$ are the co-vertices. The vertices are on the longer, vertical axis." },
        { text: "$9x^2 + 4y^2 = 36$ is already standard", explain: "Standard form needs a $1$ on the right, so divide by $36$ first." },
      ],
    },
    {
      id: "s-twice-wide",
      prompt: "An ellipse has vertices $(\\pm 6, 0)$ and is twice as wide as it is tall. Its co-vertices are:",
      choices: [
        { text: "$(0, \\pm 3)$", correct: true, explain: "The horizontal semi-axis is $6$, and twice as wide as tall means the vertical semi-axis is $6/2 = 3$." },
        { text: "$(0, \\pm 6)$", explain: "That would make it a circle. It is twice as wide as tall, so the vertical semi-axis is smaller." },
        { text: "$(0, \\pm 12)$", explain: "Twice as wide as tall means the height is half the width, so the semi-axis is $3$, not $12$." },
        { text: "$(\\pm 3, 0)$", explain: "Co-vertices are on the minor (vertical) axis here, so they are $(0, \\pm 3)$." },
      ],
    },
    {
      id: "s-point-is-vertex",
      prompt: "The point $(5, 0)$ on $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$ is a:",
      choices: [
        { text: "vertex", correct: true, explain: "It sits at the end of the longer (horizontal) axis, a distance $a = 5$ from the center." },
        { text: "co-vertex", explain: "Co-vertices are on the shorter axis, at $(0, \\pm 3)$ here." },
        { text: "focus", explain: "The foci sit inside the ellipse, not on the curve. $(5, 0)$ is on the curve." },
        { text: "center", explain: "The center is the origin $(0, 0)$." },
      ],
    },
    {
      id: "s-capstone-144-25",
      prompt: "Which statement about $\\frac{x^2}{144} + \\frac{y^2}{25} = 1$ is correct?",
      choices: [
        { text: "vertices $(\\pm 12, 0)$, major axis horizontal of length $24$", correct: true, explain: "$\\sqrt{144} = 12$ is the larger, horizontal semi-axis, so the vertices are $(\\pm 12, 0)$ and the major axis is $2(12) = 24$." },
        { text: "vertices $(0, \\pm 12)$", explain: "The larger denominator $144$ is under $x^2$, so the vertices are horizontal, not vertical." },
        { text: "$a = 144$", explain: "The denominator is $a^2$, so $a = \\sqrt{144} = 12$." },
        { text: "it is a circle of radius $12$", explain: "$144 \\ne 25$, so it is a stretched ellipse, not a circle." },
      ],
    },
  ],
};
