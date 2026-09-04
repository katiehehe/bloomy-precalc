import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Conic modeling". Grounded in the
 * lesson: a parabolic reflector x^2 = 4py has its focus at (0, p), found from a
 * rim point (radius, depth); an ellipse (whispering gallery) has foci with
 * c^2 = a^2 - b^2 and a constant sum of distances 2a; a hyperbola (navigation)
 * has foci with c^2 = a^2 + b^2 and a constant difference of distances 2a.
 *
 * Distractors are the real modeling traps: diameter vs radius, depth vs the
 * focal length p, focus vs vertex, the ellipse minus vs the hyperbola plus,
 * difference = 2a (not a or 2c), sum = 2a (not 2c), matching the wrong curve to
 * a scenario, and off-by-4p errors in x^2 = 4py. Every number is verified.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-scenario-dish",
      prompt: "Which conic best models a satellite dish or a flashlight reflector?",
      choices: [
        { text: "a parabola", correct: true, explain: "A parabola reflects axis-parallel rays through its focus, and a source at the focus back into a parallel beam." },
        { text: "an ellipse", explain: "An ellipse models a whispering gallery (focus to focus), not a single-focus reflector." },
        { text: "a hyperbola", explain: "A hyperbola models navigation by a difference of distances, not a reflector dish." },
        { text: "a circle", explain: "A circle has no focus to gather parallel rays. Reflectors are parabolic." },
      ],
    },
    {
      id: "c-scenario-gallery",
      prompt: "A whispering gallery, where a whisper at one spot is heard clearly at another, is modeled by:",
      choices: [
        { text: "an ellipse", correct: true, explain: "Sound from one focus of an ellipse reflects to the other focus, so the two spots are the foci." },
        { text: "a parabola", explain: "A parabola has a single focus and models a dish, not a two-spot room." },
        { text: "a hyperbola", explain: "A hyperbola is defined by a difference of distances (navigation), not a whispering room." },
        { text: "a circle", explain: "A circle sends sound from the center back to the center, not from one spot to a different one." },
      ],
    },
    {
      id: "c-scenario-loran",
      prompt: "Locating a ship from the difference in arrival times of two stations' signals uses:",
      choices: [
        { text: "a hyperbola", correct: true, explain: "A constant difference of distances to two foci is exactly a hyperbola. The stations are the foci." },
        { text: "an ellipse", explain: "An ellipse fixes a constant sum of distances, not a difference." },
        { text: "a parabola", explain: "A parabola uses one focus and a directrix, not two stations." },
        { text: "a circle", explain: "A single circle needs one station and a known distance, not a difference between two." },
      ],
    },
    {
      id: "c-reflect-focus",
      prompt: "Rays coming straight down a satellite dish's axis reflect off the bowl and meet at the:",
      choices: [
        { text: "focus", correct: true, explain: "A parabola sends every axis-parallel ray through its focus." },
        { text: "vertex", explain: "The vertex is the bottom of the bowl. The rays converge above it, at the focus." },
        { text: "directrix", explain: "The directrix is a line below the vertex, not where the rays meet." },
        { text: "rim", explain: "The rim is the edge of the dish. The concentrated signal forms at the focus." },
      ],
    },
    {
      id: "c-find-p-4-1",
      prompt: "A dish is $4$ ft wide and $1$ ft deep. Using the rim point $(2, 1)$ in $x^2 = 4py$, the focal length $p$ is:",
      choices: [
        { text: "$p = 1$", correct: true, explain: "$2^2 = 4p(1)$ gives $4 = 4p$, so $p = 1$." },
        { text: "$p = 4$", explain: "That uses the width $4$ for $x$. Use the radius $2$ (half the width)." },
        { text: "$p = 2$", explain: "That doubles the depth. Solving $4 = 4p$ gives $p = 1$." },
        { text: "$p = \\tfrac{1}{4}$", explain: "That divides by $16$. The equation is $4 = 4p$, so divide by $4$." },
      ],
    },
    {
      id: "c-focus-loc-4-1",
      prompt: "For that $4$ ft wide, $1$ ft deep dish ($p = 1$), the receiver goes at:",
      choices: [
        { text: "$(0, 1)$", correct: true, explain: "The focus is $(0, p) = (0, 1)$, one foot above the vertex." },
        { text: "$(0, 0)$", explain: "That is the vertex. A receiver there misses the concentrated signal." },
        { text: "$(1, 0)$", explain: "The focus is on the axis of symmetry (the $y$-axis), at $(0, 1)$." },
        { text: "$(0, 4)$", explain: "That would need $p = 4$. Here $p = 1$." },
      ],
    },
    {
      id: "c-find-p-8-4",
      prompt: "A larger dish is $8$ ft wide and $4$ ft deep. Using the rim point $(4, 4)$, $4^2 = 4p(4)$ gives:",
      choices: [
        { text: "$p = 1$", correct: true, explain: "$16 = 16p$, so $p = 1$ and the focus is $(0, 1)$." },
        { text: "$p = 4$", explain: "That reads the depth $4$ as the focal length. Solve $16 = 16p$ instead." },
        { text: "$p = 2$", explain: "That halves the depth. $16 = 16p$ gives $p = 1$." },
        { text: "$p = 16$", explain: "That skips dividing by $16$. $16 = 16p$ means $p = 1$." },
      ],
    },
    {
      id: "c-ellipse-c",
      prompt: "For a whispering-gallery ellipse with $a = 5$ and $b = 3$, the distance $c$ from center to each focus is:",
      choices: [
        { text: "$c = 4$", correct: true, explain: "$c^2 = a^2 - b^2 = 25 - 9 = 16$, so $c = 4$." },
        { text: "$c = \\sqrt{34}$", explain: "That uses $a^2 + b^2$ (the hyperbola rule). An ellipse subtracts." },
        { text: "$c = 2$", explain: "That is $a - b$. You must square, subtract, then take the root." },
        { text: "$c = 8$", explain: "That is $2c$, the distance between the foci, not $c$ itself." },
      ],
    },
    {
      id: "c-foci-apart",
      prompt: "Those ellipse foci are at $(\\pm 4, 0)$. Two people standing on them are how far apart?",
      choices: [
        { text: "$8$ ft", correct: true, explain: "The foci are $2c = 2(4) = 8$ ft apart." },
        { text: "$4$ ft", explain: "That is $c$ (center to one focus). The two foci are $2c$ apart." },
        { text: "$5$ ft", explain: "That is $a$, half the long axis, not the focus spacing." },
        { text: "$10$ ft", explain: "That is $2a$, the full long axis, not the distance between the foci." },
      ],
    },
    {
      id: "c-hyp-c",
      prompt: "For a navigation hyperbola with $a = 3$ and $b = 4$, the distance $c$ from center to each focus is:",
      choices: [
        { text: "$c = 5$", correct: true, explain: "$c^2 = a^2 + b^2 = 9 + 16 = 25$, so $c = 5$." },
        { text: "$c = 7$", explain: "That is $a + b$. You must square, add, then take the root." },
        { text: "$c = 1$", explain: "That uses $a^2 - b^2$ (the ellipse rule), which is negative here. A hyperbola adds." },
        { text: "$c = \\sqrt{7}$", explain: "That subtracts (the ellipse rule). A hyperbola uses $a^2 + b^2 = 25$." },
      ],
    },
    {
      id: "c-hyp-diff",
      prompt: "On that hyperbola ($a = 3$), the difference of a point's distances to the two foci is always:",
      choices: [
        { text: "$6$", correct: true, explain: "The constant difference is $2a = 2(3) = 6$." },
        { text: "$3$", explain: "That is $a$. The constant difference is $2a$." },
        { text: "$10$", explain: "That is $2c$, the focus spacing, not the difference of distances." },
        { text: "$5$", explain: "That is $c$. The difference of distances is $2a = 6$." },
      ],
    },
    {
      id: "c-ellipse-reflect",
      prompt: "A ray of sound leaving one focus of an ellipse reflects off the wall and travels to:",
      choices: [
        { text: "the other focus", correct: true, explain: "Every ray from one focus reflects to the second focus. That is the whispering-gallery property." },
        { text: "the same focus it started from", explain: "It reaches the other focus, which is why a listener stands across the room." },
        { text: "the center of the ellipse", explain: "The reflected ray reaches the other focus, not the center." },
        { text: "the nearest point on the wall", explain: "It reflects onward to the other focus, not back to the wall." },
      ],
    },
    {
      id: "c-p-meaning",
      prompt: "In $x^2 = 4py$ for a dish, what does $p$ represent?",
      choices: [
        { text: "the distance from the vertex to the focus", correct: true, explain: "$p$ is the focal length, so the focus is $(0, p)$." },
        { text: "the depth of the dish", explain: "The depth is the $y$-value of the rim, not $p$. Solve for $p$ from the rim point." },
        { text: "the width of the dish", explain: "The width sets the rim's $x$-value. $p$ comes from solving the equation." },
        { text: "the radius of the dish", explain: "The radius is half the width. $p$ is the vertex-to-focus distance." },
      ],
    },
    {
      id: "c-diameter-trap",
      prompt: "A dish is $4$ ft wide and $1$ ft deep. Which substitution into $x^2 = 4py$ is correct?",
      choices: [
        { text: "$(2, 1)$, using the radius $2$", correct: true, explain: "The rim point is (radius, depth) $= (2, 1)$, giving $4 = 4p$ and $p = 1$." },
        { text: "$(4, 1)$, using the width $4$", explain: "That uses the diameter. $x$ must be the radius (half the width)." },
        { text: "$(1, 2)$, swapping width and depth", explain: "$x$ is the horizontal radius and $y$ is the depth. Do not swap them." },
        { text: "$(0, 1)$, using the vertex", explain: "The vertex gives $0 = 4p(1)$, which gives no information. Use a rim point." },
      ],
    },
    {
      id: "c-receiver-where",
      prompt: "To catch the signal, the receiver of a dish must be placed at the:",
      choices: [
        { text: "focus", correct: true, explain: "All reflected rays pass through the focus, so the receiver belongs there." },
        { text: "vertex", explain: "At the vertex the rays have not yet converged. They meet at the focus." },
        { text: "rim", explain: "The rim is the edge of the dish. The signal concentrates at the focus." },
        { text: "center of the opening", explain: "The convergence point is the focus, which is generally not the center of the opening." },
      ],
    },
  ],
  summit: [
    {
      id: "s-dish-8-2",
      prompt: "A dish is $8$ ft wide and $2$ ft deep. Where is the receiver? (Use the rim point $(4, 2)$.)",
      choices: [
        { text: "$(0, 2)$", correct: true, explain: "$4^2 = 4p(2)$ gives $16 = 8p$, so $p = 2$ and the focus is $(0, 2)$." },
        { text: "$(0, 1)$", explain: "That halves the answer. $16 = 8p$ gives $p = 2$, not $1$." },
        { text: "$(0, 4)$", explain: "That uses the width for $x$. Use the radius $4$, giving $p = 2$." },
        { text: "$(0, \\tfrac{1}{2})$", explain: "That is the reciprocal. Solve $16 = 8p$ to get $p = 2$." },
      ],
    },
    {
      id: "s-flashlight-4-2",
      prompt: "A headlight reflector is $4$ ft wide and $2$ ft deep. Where does the bulb go? (Use the rim point $(2, 2)$.)",
      choices: [
        { text: "$(0, \\tfrac{1}{2})$", correct: true, explain: "$2^2 = 4p(2)$ gives $4 = 8p$, so $p = \\tfrac{1}{2}$. The bulb is at $(0, \\tfrac{1}{2})$." },
        { text: "$(0, 2)$", explain: "That is the depth, not the focal length. Solve $4 = 8p$ to get $p = \\tfrac{1}{2}$." },
        { text: "$(0, 1)$", explain: "That divides by $4$ instead of $8$. The equation is $4 = 8p$." },
        { text: "$(0, 0)$", explain: "That is the vertex. A bulb there would not produce a parallel beam." },
      ],
    },
    {
      id: "s-room-20-12",
      prompt: "A whispering room is $20$ ft long and $12$ ft wide. How far apart are the two listening spots (the foci)?",
      choices: [
        { text: "$16$ ft", correct: true, explain: "With $a = 10$ and $b = 6$, $c^2 = 100 - 36 = 64$ gives $c = 8$, so the foci are $2c = 16$ ft apart." },
        { text: "$8$ ft", explain: "That is $c$. The two foci are $2c$ apart." },
        { text: "$20$ ft", explain: "That is the full length $2a$, not the focus spacing." },
        { text: "$12$ ft", explain: "That is the width $2b$, not the distance between the foci." },
      ],
    },
    {
      id: "s-hyp-build",
      prompt: "Two stations are $10$ units apart (foci at $(\\pm 5, 0)$) and the constant difference of distances is $6$. The hyperbola is:",
      choices: [
        { text: "$\\frac{x^2}{9} - \\frac{y^2}{16} = 1$", correct: true, explain: "$2a = 6$ gives $a = 3$. $b^2 = c^2 - a^2 = 25 - 9 = 16$, so $b = 4$." },
        { text: "$\\frac{x^2}{25} - \\frac{y^2}{16} = 1$", explain: "That puts $c^2 = 25$ under $x^2$. The denominator is $a^2 = 9$." },
        { text: "$\\frac{x^2}{36} - \\frac{y^2}{16} = 1$", explain: "That uses $(2a)^2 = 36$. The denominator is $a^2 = 9$, not $(2a)^2$." },
        { text: "$\\frac{x^2}{9} + \\frac{y^2}{16} = 1$", explain: "A plus sign makes an ellipse. A hyperbola has a minus." },
      ],
    },
    {
      id: "s-ellipse-plus-trap",
      prompt: "For an ellipse with $a = 5$ and $b = 3$, a student writes $c = \\sqrt{25 + 9} = \\sqrt{34}$. What should they have computed?",
      choices: [
        { text: "an ellipse uses $c^2 = a^2 - b^2$, so $c = \\sqrt{16} = 4$", correct: true, explain: "The ellipse formula subtracts: $25 - 9 = 16$, so $c = 4$." },
        { text: "nothing, $c = \\sqrt{34}$ is right", explain: "That is the hyperbola formula. An ellipse subtracts." },
        { text: "use $c = a + b = 8$", explain: "You must square, subtract, then take the root: $c = 4$." },
        { text: "keep $\\sqrt{34}$ but halve it", explain: "The error is the sign, not a factor of two: $c = \\sqrt{25 - 9} = 4$." },
      ],
    },
    {
      id: "s-hyp-minus-trap",
      prompt: "For a hyperbola with $a = 3$ and $b = 4$, what is $c$?",
      choices: [
        { text: "$c = 5$, from $c^2 = 9 + 16$", correct: true, explain: "A hyperbola adds: $c^2 = a^2 + b^2 = 25$, so $c = 5$." },
        { text: "$c = \\sqrt{-7}$, from $c^2 = 9 - 16$", explain: "Subtracting is the ellipse rule and fails here. A hyperbola adds." },
        { text: "$c = 1$, from $4 - 3$", explain: "Use $c^2 = a^2 + b^2$ and take the root: $c = 5$." },
        { text: "$c = 7$, from $3 + 4$", explain: "Add the squares, not the numbers: $c = \\sqrt{9 + 16} = 5$." },
      ],
    },
    {
      id: "s-diff-not-2c",
      prompt: "A hyperbola has foci at $(\\pm 5, 0)$ and $a = 3$. The constant difference of distances to the foci is:",
      choices: [
        { text: "$6$ (which is $2a$)", correct: true, explain: "The defining difference for a hyperbola is $2a = 6$." },
        { text: "$10$ (which is $2c$)", explain: "That is the distance between the foci, not the difference of distances." },
        { text: "$3$ (which is $a$)", explain: "The difference is $2a$, twice this value." },
        { text: "$5$ (which is $c$)", explain: "That is $c$. The difference is $2a = 6$." },
      ],
    },
    {
      id: "s-ellipse-sum",
      prompt: "For an ellipse with $a = 5$, the sum of the distances from any point on it to the two foci is:",
      choices: [
        { text: "$10$ (which is $2a$)", correct: true, explain: "The defining sum for an ellipse is $2a = 10$." },
        { text: "$8$ (which is $2c$)", explain: "That is the focus spacing ($c = 4$), not the sum of distances." },
        { text: "$5$ (which is $a$)", explain: "The sum is $2a$, twice this value." },
        { text: "$4$ (which is $c$)", explain: "That is $c$. The constant sum is $2a = 10$." },
      ],
    },
    {
      id: "s-arch-4-4",
      prompt: "A parabolic reflector is $4$ ft wide and $4$ ft deep. Where is its focus? (Use the rim point $(2, 4)$.)",
      choices: [
        { text: "$(0, \\tfrac{1}{4})$", correct: true, explain: "$2^2 = 4p(4)$ gives $4 = 16p$, so $p = \\tfrac{1}{4}$ and the focus is $(0, \\tfrac{1}{4})$." },
        { text: "$(0, 4)$", explain: "That is the depth. Solve $4 = 16p$ to get $p = \\tfrac{1}{4}$." },
        { text: "$(0, 1)$", explain: "That divides by $4$ instead of $16$. The equation is $4 = 16p$." },
        { text: "$(0, 2)$", explain: "That is the radius. The focus is $(0, p) = (0, \\tfrac{1}{4})$." },
      ],
    },
    {
      id: "s-which-not-parabola",
      prompt: "Which scenario is NOT modeled by a parabola?",
      choices: [
        { text: "a whispering gallery", correct: true, explain: "A whispering gallery is an ellipse (focus-to-focus reflection). The others are parabolic reflectors." },
        { text: "a satellite dish", explain: "A dish is a parabola that gathers rays at its focus." },
        { text: "a car headlight", explain: "A headlight is a parabola with a bulb at its focus." },
        { text: "a flashlight", explain: "A flashlight reflector is a parabola." },
      ],
    },
    {
      id: "s-why-gallery",
      prompt: "Why does a whisper at one focus reach the other focus so clearly?",
      choices: [
        { text: "every reflected path has the same length $2a$, so the sound arrives together", correct: true, explain: "The equal path length $2a$ makes the reflected whispers reconverge in phase." },
        { text: "the whisper travels in a straight line across the room", explain: "It reflects off the curved wall. The paths bend but share one total length." },
        { text: "the foci are the two closest points in the room", explain: "It is the equal path length $2a$, not closeness, that focuses the sound." },
        { text: "sound speeds up near the curved wall", explain: "Sound speed is unchanged. The equal path length is the reason." },
      ],
    },
    {
      id: "s-loran-meaning",
      prompt: "A ship finds that station A's signal traveled $6$ units farther than station B's. This places the ship on:",
      choices: [
        { text: "one branch of a hyperbola with A and B as foci", correct: true, explain: "A fixed difference of distances (here $6 = 2a$) traces a hyperbola." },
        { text: "an ellipse with A and B as foci", explain: "An ellipse is a fixed sum of distances, not a difference." },
        { text: "a circle centered at B", explain: "A circle needs one fixed distance, not a difference between two." },
        { text: "the perpendicular bisector of AB", explain: "That is where the two distances are equal (difference $0$). A nonzero difference is a hyperbola." },
      ],
    },
    {
      id: "s-4p-step",
      prompt: "Written as $x^2 = 4py$ with focal length $p = 2$, the equation is:",
      choices: [
        { text: "$x^2 = 8y$", correct: true, explain: "$4p = 4(2) = 8$, so $x^2 = 8y$." },
        { text: "$x^2 = 2y$", explain: "That sets $4p = 2$. But $4p = 8$ when $p = 2$." },
        { text: "$x^2 = 4y$", explain: "That forgets the factor of $4$. $4p = 8$." },
        { text: "$x^2 = 16y$", explain: "That doubles too far. $4p = 8$, not $16$." },
      ],
    },
    {
      id: "s-read-focus",
      prompt: "A dish has equation $x^2 = 12y$. Its focus is:",
      choices: [
        { text: "$(0, 3)$", correct: true, explain: "$4p = 12$ gives $p = 3$, so the focus is $(0, 3)$." },
        { text: "$(0, 12)$", explain: "That reads $12$ as $p$. But $4p = 12$, so $p = 3$." },
        { text: "$(0, 6)$", explain: "That halves $12$. Solve $4p = 12$ to get $p = 3$." },
        { text: "$(3, 0)$", explain: "The focus of $x^2 = 4py$ lies on the $y$-axis: $(0, 3)$." },
      ],
    },
    {
      id: "s-reverse-depth",
      prompt: "You want the receiver $2$ ft above the vertex ($p = 2$) on a dish that is $8$ ft wide. How deep must the dish be?",
      choices: [
        { text: "$2$ ft", correct: true, explain: "Rim $(4, d)$: $4^2 = 4(2)d$, so $16 = 8d$ and $d = 2$." },
        { text: "$4$ ft", explain: "That reads the radius as the depth. Solve $16 = 8d$ to get $d = 2$." },
        { text: "$1$ ft", explain: "At $d = 1$ the rim would give $16 = 8(1)$, which is false. $d = 2$." },
        { text: "$8$ ft", explain: "That uses the width. The depth solves $16 = 8d$, giving $d = 2$." },
      ],
    },
  ],
};
