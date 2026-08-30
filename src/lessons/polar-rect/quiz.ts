import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Polar-rectangular conversion".
 * Grounded in the lesson: polar to rectangular is $x = r\cos\theta$ and
 * $y = r\sin\theta$. Rectangular to polar is $r = \sqrt{x^2+y^2}$ and
 * $\theta = \tan^{-1}(y/x)$ with a $+180^\circ$ fix when $x<0$, and $(r,\theta)$
 * is not unique. Distractors are the classic traps: swapping sine and cosine,
 * adding the parts instead of rooting the sum of squares, flipping $y/x$, the
 * bare inverse-tangent in the wrong quadrant, negative-radius direction, and
 * radians versus degrees.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-p2r-formula",
      prompt: "Which formulas convert polar $(r, \\theta)$ to rectangular $(x, y)$?",
      choices: [
        { text: "$x = r\\cos\\theta,\\ y = r\\sin\\theta$", correct: true, explain: "The horizontal leg is $r\\cos\\theta$ and the vertical leg is $r\\sin\\theta$." },
        { text: "$x = r\\sin\\theta,\\ y = r\\cos\\theta$", explain: "Sine and cosine are swapped. Cosine builds $x$, sine builds $y$." },
        { text: "$x = \\tfrac{r}{\\cos\\theta},\\ y = \\tfrac{r}{\\sin\\theta}$", explain: "The radius multiplies the trig value, it does not divide by it." },
        { text: "$x = r + \\cos\\theta,\\ y = r + \\sin\\theta$", explain: "The radius multiplies the trig value, it is not added to it." },
      ],
    },
    {
      id: "c-p2r-460-x",
      prompt: "For $(r, \\theta) = (4, 60^\\circ)$, find $x$.",
      choices: [
        { text: "$2$", correct: true, explain: "$x = 4\\cos 60^\\circ = 4 \\cdot \\tfrac{1}{2} = 2$." },
        { text: "$2\\sqrt{3}$", explain: "That is $y = 4\\sin 60^\\circ$. The $x$-coordinate uses cosine." },
        { text: "$4$", explain: "That would need $\\cos 60^\\circ = 1$, but $\\cos 60^\\circ = \\tfrac{1}{2}$." },
        { text: "$0$", explain: "That is $4\\cos 90^\\circ$, the wrong angle." },
      ],
    },
    {
      id: "c-p2r-460-y",
      prompt: "For $(r, \\theta) = (4, 60^\\circ)$, find $y$.",
      choices: [
        { text: "$2\\sqrt{3}$", correct: true, explain: "$y = 4\\sin 60^\\circ = 4 \\cdot \\tfrac{\\sqrt{3}}{2} = 2\\sqrt{3} \\approx 3.46$." },
        { text: "$2$", explain: "That is $x = 4\\cos 60^\\circ$. The $y$-coordinate uses sine." },
        { text: "$4$", explain: "That would need $\\sin 60^\\circ = 1$, but $\\sin 60^\\circ = \\tfrac{\\sqrt{3}}{2}$." },
      ],
    },
    {
      id: "c-p2r-290",
      prompt: "Convert $(r, \\theta) = (2, 90^\\circ)$ to rectangular form.",
      choices: [
        { text: "$(0, 2)$", correct: true, explain: "$\\cos 90^\\circ = 0$ and $\\sin 90^\\circ = 1$, so the point is straight up at $(0, 2)$." },
        { text: "$(2, 0)$", explain: "That is $\\theta = 0^\\circ$. At $90^\\circ$ the point points up, not right." },
        { text: "$(0, -2)$", explain: "That is $\\theta = 270^\\circ$ (straight down)." },
      ],
    },
    {
      id: "c-p2r-5180",
      prompt: "Convert $(r, \\theta) = (5, 180^\\circ)$ to rectangular form.",
      choices: [
        { text: "$(-5, 0)$", correct: true, explain: "$\\cos 180^\\circ = -1$ and $\\sin 180^\\circ = 0$, so the point is $5$ units left." },
        { text: "$(5, 0)$", explain: "That is $\\theta = 0^\\circ$. At $180^\\circ$ the point is to the left." },
        { text: "$(0, 5)$", explain: "That is $\\theta = 90^\\circ$ (straight up)." },
      ],
    },
    {
      id: "c-r2p-r34",
      prompt: "For $(x, y) = (3, 4)$, find the radius $r$.",
      choices: [
        { text: "$5$", correct: true, explain: "$r = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$." },
        { text: "$7$", explain: "That adds $3 + 4$. Use $\\sqrt{x^2 + y^2}$, not $x + y$." },
        { text: "$\\sqrt{7}$", explain: "That is $\\sqrt{3 + 4}$. You must square each part first." },
        { text: "$25$", explain: "That is $x^2 + y^2$. The square root is still needed: $\\sqrt{25} = 5$." },
      ],
    },
    {
      id: "c-r2p-tan",
      prompt: "For $(x, y) = (3, 4)$ in quadrant I, which expression gives the angle $\\theta$?",
      choices: [
        { text: "$\\tan^{-1}\\tfrac{4}{3}$", correct: true, explain: "The angle uses opposite over adjacent: $\\tan\\theta = \\tfrac{y}{x} = \\tfrac{4}{3}$." },
        { text: "$\\tan^{-1}\\tfrac{3}{4}$", explain: "That flips the ratio to $\\tfrac{x}{y}$. Use $\\tfrac{y}{x}$." },
        { text: "$\\sin^{-1}\\tfrac{4}{3}$", explain: "$\\tfrac{4}{3} > 1$, so $\\sin^{-1}$ is undefined here. Use $\\tan^{-1}\\tfrac{y}{x}$." },
      ],
    },
    {
      id: "c-r2p-11",
      prompt: "Convert $(x, y) = (1, 1)$ to polar form.",
      choices: [
        { text: "$(\\sqrt{2}, 45^\\circ)$", correct: true, explain: "$r = \\sqrt{1 + 1} = \\sqrt{2}$, and equal legs give $\\theta = 45^\\circ$." },
        { text: "$(2, 45^\\circ)$", explain: "$r = \\sqrt{1^2 + 1^2} = \\sqrt{2}$, not $2$." },
        { text: "$(\\sqrt{2}, 90^\\circ)$", explain: "Equal positive legs give $45^\\circ$, not $90^\\circ$." },
      ],
    },
    {
      id: "c-r2p-quadrant",
      prompt: "For $(x, y) = (-3, 4)$, the angle $\\theta$ (principal value) is",
      choices: [
        { text: "$126.87^\\circ$", correct: true, explain: "$x < 0$ puts it in quadrant II, so add $180^\\circ$: $-53.13^\\circ + 180^\\circ = 126.87^\\circ$." },
        { text: "$-53.13^\\circ$", explain: "That is the bare $\\tan^{-1}\\tfrac{4}{-3}$, which lands in quadrant IV. Add $180^\\circ$ since $x < 0$." },
        { text: "$53.13^\\circ$", explain: "That is the quadrant I angle. A negative $x$ shifts it to quadrant II." },
      ],
    },
    {
      id: "c-neg-r",
      prompt: "The polar point $(-3, 90^\\circ)$ equals which rectangular point?",
      choices: [
        { text: "$(0, -3)$", correct: true, explain: "$x = -3\\cos 90^\\circ = 0$ and $y = -3\\sin 90^\\circ = -3$: a negative $r$ points down instead of up." },
        { text: "$(0, 3)$", explain: "That ignores the negative $r$. A negative radius reverses direction, so it points down." },
        { text: "$(-3, 0)$", explain: "At $90^\\circ$ the motion is vertical, not horizontal." },
      ],
    },
    {
      id: "c-nonunique",
      prompt: "Which pair names the same point as $(2, 30^\\circ)$?",
      choices: [
        { text: "$(2, 390^\\circ)$", correct: true, explain: "$390^\\circ = 30^\\circ + 360^\\circ$, the same direction and distance." },
        { text: "$(2, 210^\\circ)$", explain: "Adding $180^\\circ$ without flipping $r$ points the opposite way." },
        { text: "$(-2, 30^\\circ)$", explain: "A negative $r$ flips the direction, so this is the opposite point." },
      ],
    },
    {
      id: "c-deg-rad",
      prompt: "The angle $\\theta = \\tfrac{\\pi}{6}$ in degrees is",
      choices: [
        { text: "$30^\\circ$", correct: true, explain: "$\\pi$ radians is $180^\\circ$, so $\\tfrac{\\pi}{6} = \\tfrac{180^\\circ}{6} = 30^\\circ$." },
        { text: "$60^\\circ$", explain: "$60^\\circ = \\tfrac{\\pi}{3}$. Here the angle is $\\tfrac{\\pi}{6}$." },
        { text: "$6^\\circ$", explain: "Radians are not degrees. Multiply by $\\tfrac{180^\\circ}{\\pi}$ to get $30^\\circ$." },
      ],
    },
    {
      id: "c-p2r-245",
      prompt: "Convert $(r, \\theta) = (2, 45^\\circ)$ to rectangular form.",
      choices: [
        { text: "$(\\sqrt{2}, \\sqrt{2})$", correct: true, explain: "$2\\cos 45^\\circ = 2 \\cdot \\tfrac{\\sqrt{2}}{2} = \\sqrt{2}$, and $y$ is the same." },
        { text: "$(1, 1)$", explain: "That uses $\\cos 45^\\circ = \\tfrac{1}{2}$. In fact $\\cos 45^\\circ = \\tfrac{\\sqrt{2}}{2}$." },
        { text: "$(\\sqrt{2}, 0)$", explain: "$\\sin 45^\\circ \\ne 0$, so $y = \\sqrt{2}$ as well." },
      ],
    },
    {
      id: "c-r2p-05",
      prompt: "Convert $(x, y) = (0, 5)$ to polar form.",
      choices: [
        { text: "$(5, 90^\\circ)$", correct: true, explain: "The point is straight up, distance $5$, so $\\theta = 90^\\circ$." },
        { text: "$(5, 0^\\circ)$", explain: "$0^\\circ$ points right. $(0, 5)$ points up." },
        { text: "$(5, 180^\\circ)$", explain: "$180^\\circ$ points left. $(0, 5)$ points up." },
      ],
    },
    {
      id: "c-never-neg",
      prompt: "Which quantity is never negative?",
      choices: [
        { text: "the radius $r = \\sqrt{x^2 + y^2}$", correct: true, explain: "It is a distance from the origin, so $r \\ge 0$ always." },
        { text: "the angle $\\theta$", explain: "Angles can be negative, for example $\\theta = -45^\\circ$." },
        { text: "the coordinate $x$", explain: "$x$ is negative in quadrants II and III." },
      ],
    },
  ],
  summit: [
    {
      id: "s-p2r-630",
      prompt: "Convert $(r, \\theta) = (6, 30^\\circ)$ to rectangular form.",
      choices: [
        { text: "$(3\\sqrt{3}, 3)$", correct: true, explain: "$6\\cos 30^\\circ = 6 \\cdot \\tfrac{\\sqrt{3}}{2} = 3\\sqrt{3}$ and $6\\sin 30^\\circ = 3$." },
        { text: "$(3, 3\\sqrt{3})$", explain: "That swaps the legs. Cosine gives $x = 3\\sqrt{3}$, sine gives $y = 3$." },
        { text: "$(3\\sqrt{3}, 3\\sqrt{3})$", explain: "$\\sin 30^\\circ = \\tfrac{1}{2}$, so $y = 3$, not $3\\sqrt{3}$." },
        { text: "$(3, 3)$", explain: "$\\cos 30^\\circ = \\tfrac{\\sqrt{3}}{2}$, so $x = 3\\sqrt{3}$, not $3$." },
      ],
    },
    {
      id: "s-r2p-full-34",
      prompt: "Convert $(x, y) = (3, 4)$ to polar form (angle to the nearest hundredth of a degree).",
      choices: [
        { text: "$(5, 53.13^\\circ)$", correct: true, explain: "$r = \\sqrt{9 + 16} = 5$ and $\\theta = \\tan^{-1}\\tfrac{4}{3} \\approx 53.13^\\circ$ in quadrant I." },
        { text: "$(5, 36.87^\\circ)$", explain: "$36.87^\\circ = \\tan^{-1}\\tfrac{3}{4}$, the flipped ratio. Use $\\tfrac{y}{x} = \\tfrac{4}{3}$." },
        { text: "$(7, 53.13^\\circ)$", explain: "$r = \\sqrt{9 + 16} = 5$, not $3 + 4 = 7$." },
        { text: "$(25, 53.13^\\circ)$", explain: "That is $x^2 + y^2$. Take the square root: $r = 5$." },
      ],
    },
    {
      id: "s-arg-q3",
      prompt: "For $(x, y) = (-1, -1)$, the angle $\\theta$ (principal value in $(-180^\\circ, 180^\\circ]$) is",
      choices: [
        { text: "$-135^\\circ$", correct: true, explain: "Quadrant III points at $225^\\circ$, and the principal value is $225^\\circ - 360^\\circ = -135^\\circ$." },
        { text: "$45^\\circ$", explain: "That is $\\tan^{-1}\\tfrac{-1}{-1} = \\tan^{-1}1$, ignoring that both parts are negative." },
        { text: "$135^\\circ$", explain: "$135^\\circ$ is quadrant II ($x < 0$, $y > 0$). Here both parts are negative." },
        { text: "$-45^\\circ$", explain: "$-45^\\circ$ is quadrant IV ($x > 0$). Here $x < 0$ as well." },
      ],
    },
    {
      id: "s-arg-q4",
      prompt: "For $(x, y) = (1, -1)$, the angle $\\theta$ (principal value) is",
      choices: [
        { text: "$-45^\\circ$", correct: true, explain: "Quadrant IV with $x > 0$ needs no fix: $\\tan^{-1}\\tfrac{-1}{1} = -45^\\circ$." },
        { text: "$45^\\circ$", explain: "That is $(1, 1)$ in quadrant I. Here $y < 0$, below the axis." },
        { text: "$135^\\circ$", explain: "$135^\\circ$ is quadrant II. This point is down and to the right." },
        { text: "$315^\\circ$", explain: "Same ray, but the principal value in $(-180^\\circ, 180^\\circ]$ is $-45^\\circ$." },
      ],
    },
    {
      id: "s-neg-r-name",
      prompt: "The point $(-4, 60^\\circ)$ names the same location as which positive-radius pair?",
      choices: [
        { text: "$(4, 240^\\circ)$", correct: true, explain: "Flip $r$ to positive and add a half turn: $60^\\circ + 180^\\circ = 240^\\circ$." },
        { text: "$(4, 60^\\circ)$", explain: "That drops the negative sign, giving the opposite point." },
        { text: "$(4, -60^\\circ)$", explain: "Reflecting the angle is not the same as flipping the radius." },
        { text: "$(4, 120^\\circ)$", explain: "Flipping the radius adds $180^\\circ$, not $60^\\circ$." },
      ],
    },
    {
      id: "s-r2p-neg-both",
      prompt: "For $(x, y) = (-5, -12)$, find the radius $r$.",
      choices: [
        { text: "$13$", correct: true, explain: "$\\sqrt{(-5)^2 + (-12)^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13$. Squaring removes the signs." },
        { text: "$-13$", explain: "A radius is a distance, so it is never negative." },
        { text: "$17$", explain: "That adds the sizes $5 + 12$. Use $\\sqrt{x^2 + y^2}$." },
        { text: "$7$", explain: "That subtracts. The Pythagorean theorem adds the squares." },
      ],
    },
    {
      id: "s-clean-30",
      prompt: "Convert $(x, y) = (\\sqrt{3}, 1)$ to polar form.",
      choices: [
        { text: "$(2, 30^\\circ)$", correct: true, explain: "$r = \\sqrt{3 + 1} = 2$, and $\\tan\\theta = \\tfrac{1}{\\sqrt{3}}$ gives $30^\\circ$." },
        { text: "$(2, 60^\\circ)$", explain: "$\\tan 60^\\circ = \\sqrt{3}$. Here $\\tan\\theta = \\tfrac{1}{\\sqrt{3}}$, so $30^\\circ$." },
        { text: "$(4, 30^\\circ)$", explain: "$r = \\sqrt{3 + 1} = 2$, not $4$." },
        { text: "$(2, 45^\\circ)$", explain: "Equal legs give $45^\\circ$, but here the legs differ." },
      ],
    },
    {
      id: "s-clean-60",
      prompt: "For $(x, y) = (1, \\sqrt{3})$, find the angle $\\theta$.",
      choices: [
        { text: "$60^\\circ$", correct: true, explain: "$\\tan\\theta = \\tfrac{\\sqrt{3}}{1} = \\sqrt{3}$, so $\\theta = 60^\\circ$ in quadrant I." },
        { text: "$30^\\circ$", explain: "That is the swapped ratio $\\tfrac{1}{\\sqrt{3}}$, which belongs to $(\\sqrt{3}, 1)$." },
        { text: "$45^\\circ$", explain: "Unequal legs, so the angle is not $45^\\circ$." },
        { text: "$120^\\circ$", explain: "Both parts positive means quadrant I, not quadrant II." },
      ],
    },
    {
      id: "s-p2r-2135",
      prompt: "Convert $(r, \\theta) = (2, 135^\\circ)$ to rectangular form.",
      choices: [
        { text: "$(-\\sqrt{2}, \\sqrt{2})$", correct: true, explain: "$2\\cos 135^\\circ = -\\sqrt{2}$ and $2\\sin 135^\\circ = \\sqrt{2}$." },
        { text: "$(\\sqrt{2}, \\sqrt{2})$", explain: "That is $45^\\circ$. At $135^\\circ$ the $x$-part is negative." },
        { text: "$(-\\sqrt{2}, -\\sqrt{2})$", explain: "That is $225^\\circ$. At $135^\\circ$ the $y$-part is positive." },
        { text: "$(\\sqrt{2}, -\\sqrt{2})$", explain: "That is $-45^\\circ$ (or $315^\\circ$), in quadrant IV." },
      ],
    },
    {
      id: "s-nonunique-count",
      prompt: "How many polar names $(r, \\theta)$ does a single point (other than the origin) have?",
      choices: [
        { text: "infinitely many", correct: true, explain: "Add any multiple of $360^\\circ$, or flip $r$ and add $180^\\circ$, to get another name." },
        { text: "exactly one", explain: "That is true for rectangular coordinates, not polar." },
        { text: "exactly two", explain: "Every extra full turn gives a new name, so there is no limit." },
        { text: "exactly four", explain: "It is not one per quadrant. There are infinitely many names." },
      ],
    },
    {
      id: "s-origin",
      prompt: "Which point has an undefined (any-value) angle $\\theta$?",
      choices: [
        { text: "the origin $(0, 0)$", correct: true, explain: "At the origin $r = 0$ and no direction is singled out, so $\\theta$ can be anything." },
        { text: "$(1, 0)$", explain: "That has $\\theta = 0^\\circ$, a well-defined angle." },
        { text: "$(0, 1)$", explain: "That has $\\theta = 90^\\circ$." },
        { text: "$(-1, 0)$", explain: "That has $\\theta = 180^\\circ$." },
      ],
    },
    {
      id: "s-deg-rad-90",
      prompt: "A point has $r = 3$ and $\\theta = \\tfrac{\\pi}{2}$ radians. Its rectangular form is",
      choices: [
        { text: "$(0, 3)$", correct: true, explain: "$\\tfrac{\\pi}{2} = 90^\\circ$, so $(3\\cos 90^\\circ, 3\\sin 90^\\circ) = (0, 3)$." },
        { text: "$(3, 0)$", explain: "$\\tfrac{\\pi}{2} = 90^\\circ$ points straight up, not right." },
        { text: "$(0, -3)$", explain: "That is $\\tfrac{3\\pi}{2} = 270^\\circ$." },
        { text: "$(1.5, 1.5)$", explain: "That would be $45^\\circ = \\tfrac{\\pi}{4}$, not $\\tfrac{\\pi}{2}$." },
      ],
    },
    {
      id: "s-error-swap",
      prompt: "A student converts $(r, \\theta) = (10, 30^\\circ)$ and writes $x = 10\\sin 30^\\circ = 5$. What went wrong?",
      choices: [
        { text: "The $x$-coordinate uses cosine: $x = 10\\cos 30^\\circ = 5\\sqrt{3}$", correct: true, explain: "For $x$ use cosine. $10\\cos 30^\\circ = 10 \\cdot \\tfrac{\\sqrt{3}}{2} = 5\\sqrt{3}$." },
        { text: "Nothing, $x = 5$ is correct", explain: "That used sine. The $x$-coordinate is $r\\cos\\theta = 10\\cos 30^\\circ = 5\\sqrt{3}$." },
        { text: "The formula should be $x = 10\\tan 30^\\circ$", explain: "Conversion uses cosine for $x$, not tangent." },
        { text: "The angle must be in radians first", explain: "Degrees are fine here. The error is using sine instead of cosine for $x$." },
      ],
    },
    {
      id: "s-r-circle",
      prompt: "In polar coordinates, the equation $r = 3$ describes",
      choices: [
        { text: "a circle of radius $3$ centered at the origin", correct: true, explain: "Every point a fixed distance $3$ from the origin traces a circle." },
        { text: "a ray at angle $3$", explain: "A fixed angle gives a ray, but a fixed $r$ gives a circle." },
        { text: "the single point $(3, 0)$", explain: "Many points have $r = 3$, for example $(0, 3)$ as well." },
        { text: "the vertical line $x = 3$", explain: "That is a rectangular equation. $r = 3$ is a circle." },
      ],
    },
    {
      id: "s-theta-line",
      prompt: "In polar coordinates, the equation $\\theta = \\tfrac{\\pi}{4}$ describes",
      choices: [
        { text: "a line through the origin at $45^\\circ$", correct: true, explain: "All points at angle $45^\\circ$ form a line, since $r$ may be positive or negative." },
        { text: "a circle of radius $\\tfrac{\\pi}{4}$", explain: "A fixed angle is a ray or line, not a circle." },
        { text: "the single point $(1, 45^\\circ)$", explain: "Any $r$ at $45^\\circ$ qualifies, not just one point." },
        { text: "a horizontal line", explain: "The $45^\\circ$ direction is diagonal, not horizontal." },
      ],
    },
  ],
};
