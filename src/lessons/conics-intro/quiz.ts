import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb and Summit for "Intro to the conic sections". Grounded in the watch:
 * a conic section is a plane slice of a cone, the four cuts produce circle /
 * ellipse / parabola / hyperbola, eccentricity e sorts them (0, (0,1), 1, >1),
 * and the four standard equations are name-tags only. Distractors swap the
 * cuts, swap the e ranges, and swap plus with minus. No item asks for e = c/a,
 * c^2 formulas, vertices, or the AC test.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-what-conic",
      prompt: "A **conic section** is",
      choices: [
        { text: "the curve a plane leaves when it cuts a cone", correct: true, explain: "The four shapes are the traces of those plane cuts." },
        { text: "any curve that fails the vertical line test", explain: "That describes some graphs, not the definition of a conic." },
        { text: "a line through the origin", explain: "A line is not one of the four conic sections." },
        { text: "a graph with two intercepts", explain: "Many graphs have intercepts. A conic is a plane slice of a cone." },
      ],
    },
    {
      id: "c-why-family",
      prompt: "The four curves are one family because they are all",
      choices: [
        { text: "plane slices of a cone", correct: true, explain: "Changing the tilt of the cutting plane produces the four shapes." },
        { text: "graphs of $y = x^2$", explain: "That is one parabola, not the whole family." },
        { text: "circles of different radii", explain: "Only one member is a circle. The others come from different cuts." },
        { text: "lines with different slopes", explain: "Conics are curves, not lines." },
      ],
    },
    {
      id: "c-cut-circle",
      prompt: "A cut **parallel to the base** of the cone leaves a",
      choices: [
        { text: "circle", correct: true, explain: "That level cut meets the cone in a round closed curve." },
        { text: "parabola", explain: "A parabola comes from a cut parallel to a side of the cone." },
        { text: "hyperbola", explain: "A hyperbola comes from a steeper cut that meets both nappes." },
        { text: "pair of lines", explain: "The ordinary level cut is a circle, not a degenerate line pair." },
      ],
    },
    {
      id: "c-cut-ellipse",
      prompt: "A slightly **tilted** cut that still leaves a closed curve produces an",
      choices: [
        { text: "ellipse", correct: true, explain: "A modest tilt stretches the circle into a closed oval." },
        { text: "hyperbola", explain: "A hyperbola is open, with two branches, from a steeper cut." },
        { text: "parabola", explain: "A parabola is the open single-branch cut, parallel to a side." },
        { text: "circle only", explain: "The untilted cut is the circle. A tilt that stays closed is an ellipse." },
      ],
    },
    {
      id: "c-cut-parabola",
      prompt: "A cut **parallel to a side** of the cone leaves a",
      choices: [
        { text: "parabola", correct: true, explain: "That tilt is the boundary between closed and open, a single branch." },
        { text: "circle", explain: "A circle comes from a cut parallel to the base." },
        { text: "ellipse", explain: "An ellipse is still closed. The side-parallel cut no longer closes." },
        { text: "hyperbola", explain: "A hyperbola needs a steeper cut that meets both nappes." },
      ],
    },
    {
      id: "c-cut-hyperbola",
      prompt: "A steeper cut that meets **both nappes** of the cone leaves a",
      choices: [
        { text: "hyperbola", correct: true, explain: "Meeting both halves of the cone produces two separate branches." },
        { text: "parabola", explain: "A parabola meets only one nappe, in a single open branch." },
        { text: "ellipse", explain: "An ellipse is a closed cut of one nappe." },
        { text: "circle", explain: "A circle is the level cut parallel to the base." },
      ],
    },
    {
      id: "c-nappe",
      prompt: "A **nappe** of a cone is",
      choices: [
        { text: "one of the two opposing halves that join at the tip", correct: true, explain: "A double cone has two nappes meeting at the vertex." },
        { text: "the circular base of the cone", explain: "The base is a circle. A nappe is a whole half of the double cone." },
        { text: "the cutting plane itself", explain: "The plane is the cutter. A nappe is part of the cone." },
        { text: "the eccentricity number $e$", explain: "Eccentricity is a number that sorts the curves, not a piece of the cone." },
      ],
    },
    {
      id: "c-e-meaning",
      prompt: "Eccentricity $e$ measures",
      choices: [
        { text: "how far a conic is from being a circle", correct: true, explain: "Larger $e$ means a more stretched or more open curve." },
        { text: "the radius of the cone", explain: "The cone's size does not set $e$. The tilt of the cut does." },
        { text: "the number of intercepts", explain: "Intercepts are not what $e$ records." },
        { text: "the slope of a tangent line", explain: "Eccentricity is a shape number for the whole curve, not a slope." },
      ],
    },
    {
      id: "c-e-circle",
      prompt: "A circle has eccentricity",
      choices: [
        { text: "$e = 0$", correct: true, explain: "A circle is the unstretched member of the family." },
        { text: "$e = 1$", explain: "That is a parabola, the boundary between closed and open." },
        { text: "$0 < e < 1$", explain: "That range is an ellipse, closed but stretched." },
        { text: "$e > 1$", explain: "That range is a hyperbola." },
      ],
    },
    {
      id: "c-e-ellipse",
      prompt: "An ellipse has eccentricity in the range",
      choices: [
        { text: "$0 < e < 1$", correct: true, explain: "Closed, but not a circle, so $e$ is strictly between $0$ and $1$." },
        { text: "$e = 0$", explain: "That is a circle, the special unstretched case." },
        { text: "$e = 1$", explain: "That is a parabola." },
        { text: "$e > 1$", explain: "That is a hyperbola." },
      ],
    },
    {
      id: "c-e-parabola",
      prompt: "A parabola has eccentricity",
      choices: [
        { text: "$e = 1$", correct: true, explain: "Exactly $1$ is the crossover between closed ovals and open two-branch curves." },
        { text: "$e = 0$", explain: "That is a circle." },
        { text: "$0 < e < 1$", explain: "That range is an ellipse." },
        { text: "$e > 1$", explain: "That range is a hyperbola." },
      ],
    },
    {
      id: "c-e-hyperbola",
      prompt: "A hyperbola has eccentricity",
      choices: [
        { text: "$e > 1$", correct: true, explain: "Past the $e = 1$ boundary, the curve opens into two branches." },
        { text: "$e = 1$", explain: "That is a parabola." },
        { text: "$0 < e < 1$", explain: "That range is an ellipse." },
        { text: "$e = 0$", explain: "That is a circle." },
      ],
    },
    {
      id: "c-eq-circle",
      prompt: "The standard equation of a circle centered at the origin is",
      choices: [
        { text: "$x^2 + y^2 = r^2$", correct: true, explain: "Every point is the same distance $r$ from the center." },
        { text: "$y = a x^2$", explain: "That is a parabola." },
        { text: "$\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1$", explain: "That is a hyperbola, with a minus between the squares." },
        { text: "$\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1$ with $a \\ne b$", explain: "Unequal denominators give an ellipse, not a circle." },
      ],
    },
    {
      id: "c-eq-plus-minus",
      prompt: "The ellipse $\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1$ becomes a hyperbola when you",
      choices: [
        { text: "change the plus to a minus", correct: true, explain: "The minus splits the curve into two branches." },
        { text: "set $a = b$", explain: "Equal denominators with a plus give a circle, still closed." },
        { text: "drop the $y$ term", explain: "Dropping a squared term is the parabola move, not the hyperbola move." },
        { text: "replace $1$ with $r^2$", explain: "That does not change plus to minus, so it does not open two branches." },
      ],
    },
    {
      id: "c-eq-parabola",
      prompt: "What makes $y = a x^2$ a parabola rather than an ellipse or a hyperbola?",
      choices: [
        { text: "only one variable is squared", correct: true, explain: "Ellipse and hyperbola square both $x$ and $y$." },
        { text: "the coefficient $a$ is positive", explain: "The sign of $a$ flips the parabola up or down. It does not change the type." },
        { text: "there is no $e$ value", explain: "A parabola has $e = 1$. The equation type is the missing square." },
        { text: "both variables are squared and added", explain: "That is an ellipse." },
      ],
    },
  ],
  summit: [
    {
      id: "s-steeper-than-para",
      prompt: "Start from the parabola cut (parallel to a side) and tilt the plane **steeper**. The slice becomes a",
      choices: [
        { text: "hyperbola", correct: true, explain: "Steeper than the side-parallel cut meets both nappes and opens two branches." },
        { text: "circle", explain: "A circle is the level cut, the opposite direction of tilt." },
        { text: "ellipse", explain: "An ellipse is a shallower tilt that stays closed." },
        { text: "second parabola", explain: "There is only one side-parallel tilt. Steeper than that is a hyperbola." },
      ],
    },
    {
      id: "s-untilt-ellipse",
      prompt: "Start from an ellipse cut and flatten the plane until it is parallel to the base. The slice becomes a",
      choices: [
        { text: "circle", correct: true, explain: "The untilted cut is the circle, $e = 0$." },
        { text: "parabola", explain: "A parabola needs a much steeper, side-parallel cut." },
        { text: "hyperbola", explain: "A hyperbola is steeper still, through both nappes." },
        { text: "line", explain: "The ordinary untilted cut is a circle, not a line." },
      ],
    },
    {
      id: "s-both-nappes",
      prompt: "Why does a hyperbola have **two** branches?",
      choices: [
        { text: "the cutting plane meets both nappes of the cone", correct: true, explain: "Each nappe contributes one branch." },
        { text: "the equation has a plus sign", explain: "A plus keeps the curve closed (ellipse or circle)." },
        { text: "its eccentricity is $e = 0$", explain: "$e = 0$ is a circle, one closed curve." },
        { text: "only one variable is squared", explain: "That is a parabola, which has one branch." },
      ],
    },
    {
      id: "s-e-boundary",
      prompt: "The value $e = 1$ is the boundary because",
      choices: [
        { text: "below it the curve stays closed, and above it the curve opens into two branches", correct: true, explain: "Ellipse $0 < e < 1$, parabola $e = 1$, hyperbola $e > 1$." },
        { text: "it is the eccentricity of every circle", explain: "A circle has $e = 0$, not $e = 1$." },
        { text: "it forces $a = b$ in the ellipse equation", explain: "Equal axes make a circle ($e = 0$), not a parabola." },
        { text: "it is the only value $e$ can take", explain: "$e$ runs from $0$ through values larger than $1$." },
      ],
    },
    {
      id: "s-e-near-one-ellipse",
      prompt: "An ellipse with $e$ very close to $1$ looks",
      choices: [
        { text: "long and thin", correct: true, explain: "As $e$ approaches $1$ the oval stretches." },
        { text: "almost circular", explain: "Nearly circular is $e$ near $0$." },
        { text: "like two separate branches", explain: "Two branches is a hyperbola, $e > 1$." },
        { text: "like a single open branch", explain: "A single open branch is a parabola, $e = 1$ exactly." },
      ],
    },
    {
      id: "s-e-near-zero",
      prompt: "A conic with $e$ very close to $0$ looks",
      choices: [
        { text: "almost like a circle", correct: true, explain: "Small $e$ means almost no stretch." },
        { text: "like a hyperbola", explain: "A hyperbola has $e > 1$." },
        { text: "like a parabola", explain: "A parabola has $e = 1$." },
        { text: "like two lines", explain: "The ordinary small-$e$ member is a nearly circular ellipse." },
      ],
    },
    {
      id: "s-match-hyperbola-eq",
      prompt: "Which equation names a hyperbola?",
      choices: [
        { text: "$\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1$", correct: true, explain: "The minus between the squares is the hyperbola." },
        { text: "$\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1$", explain: "The plus is an ellipse." },
        { text: "$x^2 + y^2 = r^2$", explain: "That is a circle." },
        { text: "$y = a x^2$", explain: "That is a parabola." },
      ],
    },
    {
      id: "s-match-ellipse-eq",
      prompt: "Which equation names an ellipse that is not a circle?",
      choices: [
        { text: "$\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1$ with $a \\ne b$", correct: true, explain: "Plus sign, two different axis lengths." },
        { text: "$x^2 + y^2 = r^2$", explain: "Equal stretch in every direction is a circle." },
        { text: "$\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1$", explain: "The minus is a hyperbola." },
        { text: "$y = a x^2$", explain: "That is a parabola." },
      ],
    },
    {
      id: "s-match-parabola-eq",
      prompt: "Which equation names a parabola?",
      choices: [
        { text: "$y = a x^2$", correct: true, explain: "Only one variable is squared." },
        { text: "$x^2 + y^2 = r^2$", explain: "That is a circle." },
        { text: "$\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1$", explain: "That is an ellipse." },
        { text: "$\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1$", explain: "That is a hyperbola." },
      ],
    },
    {
      id: "s-four-names",
      prompt: "The four members of the conic family are",
      choices: [
        { text: "circle, ellipse, parabola, hyperbola", correct: true, explain: "Those are the four traces of a plane cutting a cone." },
        { text: "line, parabola, sine, cosine", explain: "Lines and sinusoids are not conic sections." },
        { text: "ellipse, hyperbola, and two circles", explain: "A circle is one member. The fourth is the parabola." },
        { text: "parabola only, in four orientations", explain: "The four types are different cuts, not four rotations of one parabola." },
      ],
    },
    {
      id: "s-larger-e",
      prompt: "As eccentricity $e$ increases from $0$, the curve becomes",
      choices: [
        { text: "more stretched, then more open", correct: true, explain: "Circle, then ellipse, then parabola, then hyperbola." },
        { text: "more circular", explain: "More circular is $e$ decreasing toward $0$." },
        { text: "a straight line", explain: "The family stays curved. Larger $e$ opens branches, it does not flatten to a line." },
        { text: "undefined", explain: "$e$ is defined for every member of the family." },
      ],
    },
    {
      id: "s-not-parabola-kind",
      prompt: "A hyperbola is **not**",
      choices: [
        { text: "a kind of parabola", correct: true, explain: "It is its own member of the family, with $e > 1$ and two branches." },
        { text: "a plane slice of a cone", explain: "It is exactly that: the steep two-nappe cut." },
        { text: "the $e > 1$ member of the family", explain: "That is the correct eccentricity range." },
        { text: "the curve with a minus between the squared terms", explain: "That is the standard equation of a hyperbola." },
      ],
    },
    {
      id: "s-circle-special",
      prompt: "A circle is the special ellipse with",
      choices: [
        { text: "$e = 0$", correct: true, explain: "No stretch: every direction has the same radius." },
        { text: "$e = 1$", explain: "That is a parabola, not a circle." },
        { text: "$e > 1$", explain: "That is a hyperbola." },
        { text: "no equation", explain: "A circle has $x^2 + y^2 = r^2$." },
      ],
    },
    {
      id: "s-which-closed",
      prompt: "Which two conics are **closed** curves?",
      choices: [
        { text: "circle and ellipse", correct: true, explain: "Those are the $e < 1$ members. Parabola and hyperbola stay open." },
        { text: "parabola and hyperbola", explain: "Those are the open members, $e \\ge 1$." },
        { text: "ellipse and hyperbola", explain: "A hyperbola is open, with two branches." },
        { text: "circle and parabola", explain: "A parabola is a single open branch." },
      ],
    },
    {
      id: "s-unified",
      prompt: "The four conics share one framework because they are all",
      choices: [
        { text: "cross-sections of a cone", correct: true, explain: "Different tilts of one cutting plane produce the four traces." },
        { text: "graphs of linear functions", explain: "Linear graphs are lines, not conics." },
        { text: "kinds of parabola", explain: "Only one member is a parabola. The others are different cuts." },
        { text: "circles of different radii", explain: "Only $e = 0$ is a circle." },
      ],
    },
  ],
};
