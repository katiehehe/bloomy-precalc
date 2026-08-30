import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Asymptotes of hyperbolas".
 * Grounded in the lesson: x^2/a^2 - y^2/b^2 = 1 has asymptotes y = +/- (b/a) x
 * with box corners (+/- a, +/- b), and y^2/a^2 - x^2/b^2 = 1 has asymptotes
 * y = +/- (a/b) x with box corners (+/- b, +/- a). The asymptotes are the
 * extended diagonals of the central box, and the branches approach them.
 *
 * Distractors are the real traps: flipping b/a and a/b, using the denominators
 * without square roots, and confusing the box corner with the box half-widths.
 * Every slope and corner is verified by hand.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "a-slope-h",
      prompt: "For $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$, the asymptotes are:",
      choices: [
        { text: "$y = \\pm \\frac{b}{a}x$", correct: true, explain: "The box corner is $(a, b)$, so the diagonal slope is $\\frac{b}{a}$." },
        { text: "$y = \\pm \\frac{a}{b}x$", explain: "That is the up-down form's slope. The left-right form uses $\\frac{b}{a}$." },
        { text: "$y = \\pm \\frac{b^2}{a^2}x$", explain: "Do not square. The slope is $\\frac{b}{a}$, not $\\frac{b^2}{a^2}$." },
        { text: "$y = \\pm ab\\,x$", explain: "The slope is a ratio, not a product." },
      ],
    },
    {
      id: "a-slope-9-16",
      prompt: "For $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$, the asymptotes are:",
      choices: [
        { text: "$y = \\pm \\frac{4}{3}x$", correct: true, explain: "$a = 3$, $b = 4$, so $\\frac{b}{a} = \\frac{4}{3}$." },
        { text: "$y = \\pm \\frac{3}{4}x$", explain: "That flips the ratio. This left-right form uses $\\frac{b}{a} = \\frac{4}{3}$." },
        { text: "$y = \\pm \\frac{16}{9}x$", explain: "Take the square roots first: $\\frac{\\sqrt{16}}{\\sqrt{9}} = \\frac{4}{3}$." },
        { text: "$y = \\pm \\frac{4}{3}$", explain: "An asymptote is a line through the origin, so it needs the factor of $x$." },
      ],
    },
    {
      id: "a-corner-9-16",
      prompt: "For $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$, a corner of the central box is at:",
      choices: [
        { text: "$(3, 4)$", correct: true, explain: "The half-widths are $a = 3$ and $b = 4$, so a corner is $(3, 4)$." },
        { text: "$(9, 16)$", explain: "Those are $a^2$ and $b^2$. Take the square roots." },
        { text: "$(4, 3)$", explain: "For this left-right form the $x$ half-width is $a = 3$, so it is $(3, 4)$." },
        { text: "$(3, 0)$", explain: "That is a vertex, the midpoint of a box side, not a corner." },
      ],
    },
    {
      id: "a-are-diagonals",
      prompt: "The asymptotes of a hyperbola are:",
      choices: [
        { text: "the diagonals of the central box, extended", correct: true, explain: "Each diagonal runs through the origin and a box corner." },
        { text: "the sides of the central box", explain: "The sides are vertical and horizontal segments, not the slanted asymptotes." },
        { text: "the segment joining the two vertices", explain: "That is the transverse axis, not an asymptote." },
        { text: "the coordinate axes", explain: "The asymptotes are the slanted box diagonals, not the $x$ and $y$ axes." },
      ],
    },
    {
      id: "a-slope-v",
      prompt: "For $\\frac{y^2}{a^2} - \\frac{x^2}{b^2} = 1$, the asymptotes are:",
      choices: [
        { text: "$y = \\pm \\frac{a}{b}x$", correct: true, explain: "For the up-down form the slope flips to $\\frac{a}{b}$." },
        { text: "$y = \\pm \\frac{b}{a}x$", explain: "That is the left-right form. The up-down form uses $\\frac{a}{b}$." },
        { text: "$y = \\pm \\frac{a^2}{b^2}x$", explain: "Do not square. The slope is $\\frac{a}{b}$." },
        { text: "$x = \\pm \\frac{a}{b}y$", explain: "Write the asymptote as $y$ in terms of $x$: $y = \\pm \\frac{a}{b}x$." },
      ],
    },
    {
      id: "a-slope-9-16-v",
      prompt: "For $\\frac{y^2}{9} - \\frac{x^2}{16} = 1$, the asymptotes are:",
      choices: [
        { text: "$y = \\pm \\frac{3}{4}x$", correct: true, explain: "Up-down form with $a = 3$, $b = 4$ gives $\\frac{a}{b} = \\frac{3}{4}$." },
        { text: "$y = \\pm \\frac{4}{3}x$", explain: "That is $\\frac{b}{a}$, the left-right slope. This form uses $\\frac{a}{b}$." },
        { text: "$y = \\pm \\frac{9}{16}x$", explain: "Take the square roots: $\\frac{\\sqrt{9}}{\\sqrt{16}} = \\frac{3}{4}$." },
        { text: "$y = \\pm \\frac{16}{9}x$", explain: "That inverts and skips the roots. The slope is $\\frac{3}{4}$." },
      ],
    },
    {
      id: "a-slope-16-9",
      prompt: "For $\\frac{x^2}{16} - \\frac{y^2}{9} = 1$, the asymptotes are:",
      choices: [
        { text: "$y = \\pm \\frac{3}{4}x$", correct: true, explain: "$a = 4$, $b = 3$, so $\\frac{b}{a} = \\frac{3}{4}$." },
        { text: "$y = \\pm \\frac{4}{3}x$", explain: "That flips the ratio. Here $\\frac{b}{a} = \\frac{3}{4}$." },
        { text: "$y = \\pm \\frac{9}{16}x$", explain: "Take the square roots first: $\\frac{3}{4}$." },
        { text: "$y = \\pm \\frac{16}{9}x$", explain: "Use $\\frac{b}{a} = \\frac{3}{4}$, not the denominators." },
      ],
    },
    {
      id: "a-first-step",
      prompt: "The first step in sketching a hyperbola with its asymptotes is to:",
      choices: [
        { text: "draw the central box", correct: true, explain: "The box gives both the vertices and the diagonals for the asymptotes." },
        { text: "draw the asymptotes freehand", explain: "The asymptotes come from the box diagonals, so draw the box first." },
        { text: "plot the foci", explain: "Foci are not needed for the asymptote sketch. Start with the box." },
        { text: "draw the branches first", explain: "The branches are last, guided by the box and asymptotes." },
      ],
    },
    {
      id: "a-approach",
      prompt: "Far from the center, each branch of a hyperbola:",
      choices: [
        { text: "gets closer and closer to an asymptote without touching it", correct: true, explain: "That is exactly what an asymptote is, a guide line the curve approaches." },
        { text: "crosses its asymptote", explain: "The branch approaches but never crosses the asymptote." },
        { text: "becomes horizontal", explain: "It follows the slanted asymptote, not a horizontal line." },
        { text: "curves back toward the center", explain: "The branches open outward forever along the asymptotes." },
      ],
    },
    {
      id: "a-slope-4-9",
      prompt: "For $\\frac{x^2}{4} - \\frac{y^2}{9} = 1$, the asymptotes are:",
      choices: [
        { text: "$y = \\pm \\frac{3}{2}x$", correct: true, explain: "$a = 2$, $b = 3$, so $\\frac{b}{a} = \\frac{3}{2}$." },
        { text: "$y = \\pm \\frac{2}{3}x$", explain: "That flips the ratio. Here $\\frac{b}{a} = \\frac{3}{2}$." },
        { text: "$y = \\pm \\frac{9}{4}x$", explain: "Take the square roots first: $\\frac{3}{2}$." },
        { text: "$y = \\pm \\frac{2}{3}$", explain: "An asymptote through the origin needs the factor of $x$, and the slope is $\\frac{3}{2}$." },
      ],
    },
    {
      id: "a-halfwidths",
      prompt: "The central box of $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ has half-widths:",
      choices: [
        { text: "$a$ in the $x$ direction and $b$ in the $y$ direction", correct: true, explain: "The box reaches to the vertices at $\\pm a$ and to $\\pm b$ vertically." },
        { text: "$b$ in $x$ and $a$ in $y$", explain: "That is the up-down box. For this form it is $a$ in $x$ and $b$ in $y$." },
        { text: "$a^2$ in $x$ and $b^2$ in $y$", explain: "Use $a$ and $b$, the square roots of the denominators." },
        { text: "$1$ in each direction", explain: "The half-widths are $a$ and $b$, not $1$." },
      ],
    },
    {
      id: "a-rise-run",
      prompt: "The asymptote through the box corner $(a, b)$ and the origin has slope:",
      choices: [
        { text: "$\\frac{b}{a}$ (rise over run)", correct: true, explain: "From $(0,0)$ to $(a, b)$ the rise is $b$ and the run is $a$." },
        { text: "$\\frac{a}{b}$", explain: "That swaps rise and run. Rise is $b$, run is $a$." },
        { text: "$a \\cdot b$", explain: "Slope is rise over run, a ratio, not a product." },
        { text: "$b - a$", explain: "Slope is a ratio $\\frac{b}{a}$, not a difference." },
      ],
    },
    {
      id: "a-flip-trap",
      prompt: "A student writes the asymptotes of $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$ as $y = \\pm \\frac{3}{4}x$. The fix is:",
      choices: [
        { text: "the slope is $\\frac{b}{a} = \\frac{4}{3}$, so $y = \\pm \\frac{4}{3}x$", correct: true, explain: "For a left-right hyperbola the slope is $\\frac{b}{a}$, not $\\frac{a}{b}$." },
        { text: "nothing, $\\frac{3}{4}$ is right", explain: "That would be $\\frac{a}{b}$, the up-down slope. This form uses $\\frac{b}{a} = \\frac{4}{3}$." },
        { text: "use $\\frac{16}{9}$", explain: "Take the square roots and keep rise over run: $\\frac{4}{3}$." },
        { text: "use slope $1$", explain: "Slope $1$ needs $a = b$. Here $a = 3$ and $b = 4$." },
      ],
    },
    {
      id: "a-vertices-midpoints",
      prompt: "The vertices of $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$ sit at the midpoints of the box's:",
      choices: [
        { text: "left and right sides", correct: true, explain: "The vertices $(\\pm 3, 0)$ are halfway up the vertical sides of the box." },
        { text: "top and bottom sides", explain: "That would be true for an up-down hyperbola. This one opens left-right." },
        { text: "diagonals", explain: "The diagonals give the asymptotes. The vertices are on the sides." },
        { text: "corners", explain: "The corners are $(\\pm 3, \\pm 4)$. The vertices are the side midpoints $(\\pm 3, 0)$." },
      ],
    },
    {
      id: "a-slope-25-4-v",
      prompt: "For $\\frac{y^2}{25} - \\frac{x^2}{4} = 1$, the asymptotes are:",
      choices: [
        { text: "$y = \\pm \\frac{5}{2}x$", correct: true, explain: "Up-down form with $a = 5$, $b = 2$ gives $\\frac{a}{b} = \\frac{5}{2}$." },
        { text: "$y = \\pm \\frac{2}{5}x$", explain: "That is $\\frac{b}{a}$. The up-down form uses $\\frac{a}{b} = \\frac{5}{2}$." },
        { text: "$y = \\pm \\frac{25}{4}x$", explain: "Take the square roots first: $\\frac{5}{2}$." },
        { text: "$y = \\pm \\frac{4}{25}x$", explain: "Use $\\frac{a}{b} = \\frac{5}{2}$, not the denominators inverted." },
      ],
    },
  ],
  summit: [
    {
      id: "z-slope-6-2",
      prompt: "A left-right hyperbola has $a = 6$ and $b = 2$. Its asymptotes are:",
      choices: [
        { text: "$y = \\pm \\frac{1}{3}x$", correct: true, explain: "$\\frac{b}{a} = \\frac{2}{6} = \\frac{1}{3}$." },
        { text: "$y = \\pm 3x$", explain: "That is $\\frac{a}{b}$. The left-right form uses $\\frac{b}{a} = \\frac{1}{3}$." },
        { text: "$y = \\pm \\frac{2}{6}x$ left unreduced as $3x$", explain: "$\\frac{2}{6}$ reduces to $\\frac{1}{3}$, not $3$." },
        { text: "$y = \\pm 4x$", explain: "The slope is $\\frac{b}{a} = \\frac{1}{3}$, not $4$." },
      ],
    },
    {
      id: "z-slope-4-36-v",
      prompt: "For $\\frac{y^2}{4} - \\frac{x^2}{36} = 1$, the asymptotes are:",
      choices: [
        { text: "$y = \\pm \\frac{1}{3}x$", correct: true, explain: "Up-down form with $a = 2$, $b = 6$ gives $\\frac{a}{b} = \\frac{2}{6} = \\frac{1}{3}$." },
        { text: "$y = \\pm 3x$", explain: "That is $\\frac{b}{a}$. The up-down form uses $\\frac{a}{b} = \\frac{1}{3}$." },
        { text: "$y = \\pm \\frac{1}{18}x$", explain: "Take the square roots first: $\\frac{2}{6} = \\frac{1}{3}$." },
        { text: "$y = \\pm \\frac{1}{9}x$", explain: "Use $\\frac{a}{b} = \\frac{2}{6} = \\frac{1}{3}$." },
      ],
    },
    {
      id: "z-corner-v",
      prompt: "For $\\frac{y^2}{16} - \\frac{x^2}{9} = 1$, a corner of the central box is at:",
      choices: [
        { text: "$(3, 4)$", correct: true, explain: "Up-down box: half-width $b = 3$ in $x$ and $a = 4$ in $y$, so a corner is $(3, 4)$." },
        { text: "$(4, 3)$", explain: "Here the $x$ half-width is $b = 3$ and the $y$ half-width is $a = 4$, so it is $(3, 4)$." },
        { text: "$(16, 9)$", explain: "Those are the denominators. Take the square roots." },
        { text: "$(0, 4)$", explain: "That is a vertex, a side midpoint, not a corner." },
      ],
    },
    {
      id: "z-find-b",
      prompt: "A left-right hyperbola with $a = 3$ has asymptotes $y = \\pm 2x$. Then $b$ is:",
      choices: [
        { text: "$6$", correct: true, explain: "The slope is $\\frac{b}{a} = 2$, so $b = 2a = 6$." },
        { text: "$\\frac{2}{3}$", explain: "That is the slope divided by $a$. Solve $\\frac{b}{3} = 2$ to get $b = 6$." },
        { text: "$2$", explain: "That is the slope, not $b$. With $a = 3$, $b = 2 \\cdot 3 = 6$." },
        { text: "$\\frac{3}{2}$", explain: "That is $\\frac{a}{b}$ if the slope were $\\frac{a}{b}$. Here slope $= \\frac{b}{a} = 2$, so $b = 6$." },
      ],
    },
    {
      id: "z-which-slope-1",
      prompt: "Which hyperbola has asymptotes $y = \\pm x$?",
      choices: [
        { text: "$\\frac{x^2}{9} - \\frac{y^2}{9} = 1$", correct: true, explain: "$a = b = 3$, so $\\frac{b}{a} = 1$ and the asymptotes are $y = \\pm x$." },
        { text: "$\\frac{x^2}{9} - \\frac{y^2}{16} = 1$", explain: "$\\frac{b}{a} = \\frac{4}{3}$, not $1$." },
        { text: "$\\frac{x^2}{16} - \\frac{y^2}{9} = 1$", explain: "$\\frac{b}{a} = \\frac{3}{4}$, not $1$." },
        { text: "$\\frac{y^2}{9} - \\frac{x^2}{4} = 1$", explain: "$\\frac{a}{b} = \\frac{3}{2}$, not $1$." },
      ],
    },
    {
      id: "z-convert",
      prompt: "Put $9x^2 - 16y^2 = 144$ in standard form and read the asymptotes.",
      choices: [
        { text: "$\\frac{x^2}{16} - \\frac{y^2}{9} = 1$, asymptotes $y = \\pm \\frac{3}{4}x$", correct: true, explain: "Divide by $144$: $a = 4$, $b = 3$, so $\\frac{b}{a} = \\frac{3}{4}$." },
        { text: "$\\frac{x^2}{16} - \\frac{y^2}{9} = 1$, asymptotes $y = \\pm \\frac{4}{3}x$", explain: "The form is right, but $\\frac{b}{a} = \\frac{3}{4}$, not $\\frac{4}{3}$." },
        { text: "$\\frac{x^2}{9} - \\frac{y^2}{16} = 1$, asymptotes $y = \\pm \\frac{4}{3}x$", explain: "Dividing $9x^2$ by $144$ gives $x^2/16$, not $x^2/9$." },
        { text: "$9x^2 - 16y^2 = 144$ is already standard", explain: "Standard form needs a $1$ on the right, so divide by $144$ first." },
      ],
    },
    {
      id: "z-flip-trap-v",
      prompt: "A student writes the asymptotes of $\\frac{y^2}{9} - \\frac{x^2}{16} = 1$ as $y = \\pm \\frac{4}{3}x$. The fix is:",
      choices: [
        { text: "the up-down form uses $\\frac{a}{b} = \\frac{3}{4}$, so $y = \\pm \\frac{3}{4}x$", correct: true, explain: "Because $a = 3$ sits under the positive $y^2$, the slope is $\\frac{a}{b} = \\frac{3}{4}$." },
        { text: "nothing, $\\frac{4}{3}$ is right", explain: "That is the left-right slope $\\frac{b}{a}$. This form is up-down, so use $\\frac{a}{b}$." },
        { text: "use slope $1$", explain: "Slope $1$ needs $a = b$. Here $a = 3$, $b = 4$." },
        { text: "use $\\frac{16}{9}$", explain: "Take square roots and use $\\frac{a}{b} = \\frac{3}{4}$." },
      ],
    },
    {
      id: "z-order",
      prompt: "Which sketch order is correct?",
      choices: [
        { text: "box, then diagonals (asymptotes), then vertices, then branches", correct: true, explain: "The box gives the diagonals and the side midpoints, so it comes first." },
        { text: "branches, then box, then asymptotes", explain: "You need the box and asymptotes to guide the branches, so branches are last." },
        { text: "asymptotes, then vertices, then box", explain: "The asymptotes come from the box diagonals, so the box comes first." },
        { text: "vertices, then branches, then box", explain: "Draw the box first so the branches have guide lines." },
      ],
    },
    {
      id: "z-steeper",
      prompt: "For $\\frac{x^2}{9} - \\frac{y^2}{b^2} = 1$ with $a = 3$ fixed, increasing $b$ makes the asymptotes:",
      choices: [
        { text: "steeper", correct: true, explain: "The slope is $\\frac{b}{a} = \\frac{b}{3}$, which grows as $b$ grows." },
        { text: "shallower", explain: "A larger $b$ raises the box corner and increases the slope $\\frac{b}{3}$." },
        { text: "unchanged", explain: "The slope $\\frac{b}{3}$ depends directly on $b$." },
        { text: "vertical", explain: "The slope grows but stays finite. It does not become vertical." },
      ],
    },
    {
      id: "z-box-v",
      prompt: "The central box of $\\frac{y^2}{a^2} - \\frac{x^2}{b^2} = 1$ has half-widths:",
      choices: [
        { text: "$b$ in $x$ and $a$ in $y$", correct: true, explain: "The vertices are at $(0, \\pm a)$, so the box is $a$ tall (each way) and $b$ wide (each way)." },
        { text: "$a$ in $x$ and $b$ in $y$", explain: "That is the left-right box. For the up-down form the tall direction is $a$." },
        { text: "$a$ in both directions", explain: "The two half-widths are $b$ (in $x$) and $a$ (in $y$)." },
        { text: "$a^2$ in $y$ and $b^2$ in $x$", explain: "Use the square roots $a$ and $b$, not the denominators." },
      ],
    },
    {
      id: "z-through-center",
      prompt: "Both asymptotes of a hyperbola centered at the origin pass through:",
      choices: [
        { text: "the origin and the box corners", correct: true, explain: "They are the box diagonals, which cross at the center and reach the corners." },
        { text: "the two vertices", explain: "The vertices are on the sides of the box, not on the diagonals." },
        { text: "the two foci", explain: "The foci sit on the transverse axis, not on the asymptotes." },
        { text: "the top and bottom of the plane only", explain: "They pass through the center and the corners, extending in both directions." },
      ],
    },
    {
      id: "z-build",
      prompt: "A left-right hyperbola has vertices $(\\pm 2, 0)$ and asymptotes $y = \\pm \\frac{3}{2}x$. Its equation is:",
      choices: [
        { text: "$\\frac{x^2}{4} - \\frac{y^2}{9} = 1$", correct: true, explain: "Vertices give $a = 2$, and slope $\\frac{b}{a} = \\frac{3}{2}$ gives $b = 3$, so $a^2 = 4$, $b^2 = 9$." },
        { text: "$\\frac{x^2}{9} - \\frac{y^2}{4} = 1$", explain: "That swaps $a$ and $b$. The vertices fix $a = 2$, so $a^2 = 4$ under $x^2$." },
        { text: "$\\frac{x^2}{2} - \\frac{y^2}{3} = 1$", explain: "Square the semi-axes: $a^2 = 4$ and $b^2 = 9$." },
        { text: "$\\frac{y^2}{4} - \\frac{x^2}{9} = 1$", explain: "The vertices are on the $x$-axis, so the positive term is $x^2$." },
      ],
    },
    {
      id: "z-slope-36-64",
      prompt: "For $\\frac{x^2}{36} - \\frac{y^2}{64} = 1$, the asymptotes are:",
      choices: [
        { text: "$y = \\pm \\frac{4}{3}x$", correct: true, explain: "$a = 6$, $b = 8$, so $\\frac{b}{a} = \\frac{8}{6} = \\frac{4}{3}$." },
        { text: "$y = \\pm \\frac{3}{4}x$", explain: "That flips the ratio. Here $\\frac{b}{a} = \\frac{4}{3}$." },
        { text: "$y = \\pm \\frac{8}{6}x$ left unreduced as $\\frac{6}{8}x$", explain: "$\\frac{8}{6}$ reduces to $\\frac{4}{3}$, not $\\frac{3}{4}$." },
        { text: "$y = \\pm \\frac{64}{36}x$", explain: "Take the square roots first: $\\frac{8}{6} = \\frac{4}{3}$." },
      ],
    },
    {
      id: "z-reciprocal",
      prompt: "For the same $a$ and $b$, the horizontal hyperbola and the vertical hyperbola have asymptote slopes that are:",
      choices: [
        { text: "reciprocals of each other", correct: true, explain: "Horizontal uses $\\frac{b}{a}$ and vertical uses $\\frac{a}{b}$, which are reciprocals." },
        { text: "identical", explain: "They differ: $\\frac{b}{a}$ versus $\\frac{a}{b}$." },
        { text: "opposite in sign", explain: "Both forms already have $\\pm$ slopes. The two magnitudes are reciprocals, not sign flips." },
        { text: "unrelated", explain: "They are directly related, as reciprocals $\\frac{b}{a}$ and $\\frac{a}{b}$." },
      ],
    },
    {
      id: "z-capstone-v",
      prompt: "Which statement about $\\frac{y^2}{9} - \\frac{x^2}{16} = 1$ is correct?",
      choices: [
        { text: "opens up-down, asymptotes $y = \\pm \\frac{3}{4}x$", correct: true, explain: "Positive $y^2$ opens it up-down, and the up-down slope is $\\frac{a}{b} = \\frac{3}{4}$." },
        { text: "asymptotes $y = \\pm \\frac{4}{3}x$", explain: "That is $\\frac{b}{a}$, the left-right slope. This form uses $\\frac{a}{b} = \\frac{3}{4}$." },
        { text: "box corner at $(3, 4)$", explain: "The up-down box has half-widths $b = 4$ in $x$ and $a = 3$ in $y$, so the corner is $(4, 3)$." },
        { text: "opens left-right", explain: "The positive term is $y^2$, so it opens up and down." },
      ],
    },
  ],
};
