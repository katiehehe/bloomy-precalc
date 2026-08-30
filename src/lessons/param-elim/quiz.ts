import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Eliminating the parameter".
 * Grounded in the lesson takeaways: eliminate t to get one Cartesian equation in
 * x and y. The substitution method solves the simpler equation for t and
 * substitutes into the other. The trig method isolates cos t and sin t, squares,
 * and adds, using cos^2 t + sin^2 t = 1, giving x^2 + y^2 = r^2 for equal radii
 * and (x/a)^2 + (y/b)^2 = 1 (an ellipse) when the radii differ. The parameter's
 * range can restrict the Cartesian graph to only a piece of the full curve.
 * Distractors are the classic traps: solving the harder equation, dropping a
 * constant, mis-squaring (x - 1)^2 as x^2 - 1, forgetting to square the radius,
 * using x^2 + y^2 = 1 when the answer is an ellipse, and keeping the full curve
 * after a restricted range.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-sub-concept",
      prompt: "To eliminate the parameter by substitution, you",
      choices: [
        { text: "solve one equation for $t$ and substitute that into the other", correct: true, explain: "Removing $t$ leaves a single equation in $x$ and $y$." },
        { text: "add the two equations together", explain: "Adding them keeps $t$ in the result. You must replace $t$, not combine the equations." },
        { text: "set $x$ equal to $y$", explain: "$x$ and $y$ are generally different. Substitution replaces $t$, it does not equate the coordinates." },
      ],
    },
    {
      id: "c-solve-for-t",
      prompt: "Given $x = t + 1$, solving for $t$ gives",
      choices: [
        { text: "$t = x - 1$", correct: true, explain: "Subtract $1$ from both sides." },
        { text: "$t = x + 1$", explain: "That adds $1$. To undo $+1$ you subtract, giving $t = x - 1$." },
        { text: "$t = 1 - x$", explain: "That flips the sign of $x$. Solving $x = t + 1$ gives $t = x - 1$." },
      ],
    },
    {
      id: "c-sub-line",
      prompt: "Eliminate $t$ from $x = t + 1$ and $y = 2t$.",
      choices: [
        { text: "$y = 2x - 2$", correct: true, explain: "$t = x - 1$, so $y = 2(x - 1) = 2x - 2$." },
        { text: "$y = 2x$", explain: "That used $t = x$. Here $t = x - 1$, so distribute the $2$: $2x - 2$." },
        { text: "$y = 2x + 2$", explain: "Sign slip. $2(x - 1) = 2x - 2$, not $2x + 2$." },
      ],
    },
    {
      id: "c-sub-parabola",
      prompt: "Eliminate $t$ from $x = t - 2$ and $y = t^2$.",
      choices: [
        { text: "$y = (x + 2)^2$", correct: true, explain: "$t = x + 2$, so $y = t^2 = (x + 2)^2$." },
        { text: "$y = (x - 2)^2$", explain: "Sign error. From $x = t - 2$ you get $t = x + 2$, not $x - 2$." },
        { text: "$y = x^2 - 2$", explain: "You must substitute $t = x + 2$ into $t^2$, giving $(x + 2)^2$, not $x^2 - 2$." },
      ],
    },
    {
      id: "c-trig-identity",
      prompt: "To eliminate $t$ from $x = \\cos t$ and $y = \\sin t$, the tool to use is",
      choices: [
        { text: "$\\cos^2 t + \\sin^2 t = 1$", correct: true, explain: "Square each coordinate and add, then the identity replaces the left side with $1$." },
        { text: "$\\sin t = \\cos t$", explain: "That is only true at special angles, not an identity." },
        { text: "$t = \\arccos x$", explain: "Inverse trig is awkward here. The Pythagorean identity avoids it." },
      ],
    },
    {
      id: "c-circle",
      prompt: "Eliminate $t$ from $x = \\cos t$ and $y = \\sin t$.",
      choices: [
        { text: "$x^2 + y^2 = 1$", correct: true, explain: "$\\cos^2 t + \\sin^2 t = x^2 + y^2 = 1$." },
        { text: "$x + y = 1$", explain: "The identity squares the terms, so it is $x^2 + y^2$, not $x + y$." },
        { text: "$y = x$", explain: "That is not what squaring and adding gives. The result is the circle $x^2 + y^2 = 1$." },
      ],
    },
    {
      id: "c-circle-5",
      prompt: "Eliminate $t$ from $x = 5\\cos t$ and $y = 5\\sin t$.",
      choices: [
        { text: "$x^2 + y^2 = 25$", correct: true, explain: "$\\cos t = x/5$ and $\\sin t = y/5$, so $x^2/25 + y^2/25 = 1$, giving $x^2 + y^2 = 25$." },
        { text: "$x^2 + y^2 = 5$", explain: "You must square the radius: $5^2 = 25$, not $5$." },
        { text: "$x^2 + y^2 = 1$", explain: "That ignores the radius $5$. A radius of $5$ gives $x^2 + y^2 = 25$." },
      ],
    },
    {
      id: "c-ellipse",
      prompt: "Eliminate $t$ from $x = 4\\cos t$ and $y = 3\\sin t$.",
      choices: [
        { text: "$\\dfrac{x^2}{16} + \\dfrac{y^2}{9} = 1$", correct: true, explain: "$\\cos t = x/4$, $\\sin t = y/3$, so $x^2/16 + y^2/9 = 1$." },
        { text: "$x^2 + y^2 = 1$", explain: "That is only for equal radii. Different radii give an ellipse." },
        { text: "$\\dfrac{x^2}{4} + \\dfrac{y^2}{3} = 1$", explain: "You must square the denominators: $4^2 = 16$ and $3^2 = 9$." },
      ],
    },
    {
      id: "c-divide-first",
      prompt: "For $x = 4\\cos t$, the first step before squaring is to",
      choices: [
        { text: "divide by $4$, giving $\\cos t = \\dfrac{x}{4}$", correct: true, explain: "Isolate $\\cos t$ so the identity applies cleanly." },
        { text: "square right away, giving $x^2 = 4\\cos^2 t$", explain: "Squaring $4\\cos t$ gives $16\\cos^2 t$, not $4\\cos^2 t$. Divide first." },
        { text: "take $\\arccos$ of both sides", explain: "Inverse trig is unnecessary. Divide, then use the identity." },
      ],
    },
    {
      id: "c-circle-when",
      prompt: "The curve $x = a\\cos t$, $y = b\\sin t$ is a circle exactly when",
      choices: [
        { text: "$a = b$, the radii are equal", correct: true, explain: "Equal radii give $x^2 + y^2 = a^2$, a circle. Unequal radii give an ellipse." },
        { text: "$a \\ne b$", explain: "Different radii give an ellipse, not a circle." },
        { text: "$a$ and $b$ are both zero", explain: "That collapses to a single point, not a circle." },
      ],
    },
    {
      id: "c-restrict-why",
      prompt: "After eliminating $t$, why might the Cartesian graph show more than the parametric curve does?",
      choices: [
        { text: "The range of $t$ may reach only part of the full graph", correct: true, explain: "The equation describes the whole curve, but limited $t$ traces only a piece of it." },
        { text: "Eliminating $t$ adds extra points", explain: "The algebra is exact and adds nothing. The range is what limits the curve." },
        { text: "The Pythagorean identity fails for some $t$", explain: "The identity holds for every $t$. The limit comes from the range, not the identity." },
      ],
    },
    {
      id: "c-restrict-semicircle",
      prompt: "The curve $x = \\cos t$, $y = \\sin t$ with $0 \\le t \\le \\pi$ traces",
      choices: [
        { text: "the upper half of $x^2 + y^2 = 1$, where $y \\ge 0$", correct: true, explain: "For $0 \\le t \\le \\pi$, $\\sin t \\ge 0$, so the point stays on the top." },
        { text: "the whole circle", explain: "The range stops at $\\pi$, so only the upper half is traced." },
        { text: "the right half, where $x \\ge 0$", explain: "The right half needs $\\cos t \\ge 0$, a different range of $t$." },
      ],
    },
    {
      id: "c-which-solve",
      prompt: "For $x = t^2$ and $y = t$, which equation is easier to solve for $t$?",
      choices: [
        { text: "$y = t$, since it gives $t = y$ directly", correct: true, explain: "Then substitute $t = y$ into $x = t^2$ to get $x = y^2$." },
        { text: "$x = t^2$, since squaring is simple", explain: "Solving $x = t^2$ needs a square root and a sign choice. Use $y = t$ instead." },
        { text: "neither one can be solved for $t$", explain: "$y = t$ solves instantly. Always pick the easier equation." },
      ],
    },
    {
      id: "c-sub-sideways",
      prompt: "Eliminate $t$ from $x = t^2$ and $y = t$.",
      choices: [
        { text: "$x = y^2$", correct: true, explain: "$t = y$, so $x = t^2 = y^2$, a right-opening parabola." },
        { text: "$y = x^2$", explain: "That solves the harder equation. Using $t = y$ gives $x = y^2$." },
        { text: "$x = y$", explain: "You must square: $x = t^2 = y^2$, not $y$." },
      ],
    },
    {
      id: "c-restrict-sub",
      prompt: "For $x = t^2$, $y = t$ with $t \\ge 0$, the curve $x = y^2$ is traced only where",
      choices: [
        { text: "$y \\ge 0$, the upper half of the sideways parabola", correct: true, explain: "Since $y = t$ and $t \\ge 0$, the height $y$ is never negative." },
        { text: "the whole parabola, top and bottom", explain: "The range $t \\ge 0$ keeps only $y \\ge 0$, so the bottom is missing." },
        { text: "$y \\le 0$, the lower half", explain: "With $t \\ge 0$, $y = t \\ge 0$, so it is the upper half, not the lower." },
      ],
    },
  ],
  summit: [
    {
      id: "s-sub-line",
      prompt: "Eliminate $t$ from $x = 2t$ and $y = t - 1$.",
      choices: [
        { text: "$y = \\dfrac{x}{2} - 1$", correct: true, explain: "$t = x/2$, so $y = x/2 - 1$." },
        { text: "$y = 2x - 1$", explain: "That used $t = 2x$. From $x = 2t$ you get $t = x/2$." },
        { text: "$y = x - 1$", explain: "That used $t = x$. Here $t = x/2$." },
        { text: "$y = \\dfrac{x}{2} + 1$", explain: "Sign slip. $y = t - 1 = x/2 - 1$." },
      ],
    },
    {
      id: "s-ellipse-openstax",
      prompt: "Eliminate $t$ from $x = 4\\cos t$ and $y = 3\\sin t$ for $0 \\le t \\le 2\\pi$.",
      choices: [
        { text: "$\\dfrac{x^2}{16} + \\dfrac{y^2}{9} = 1$", correct: true, explain: "Divide by $4$ and $3$, square, and add: $x^2/16 + y^2/9 = 1$." },
        { text: "$\\dfrac{x^2}{4} + \\dfrac{y^2}{3} = 1$", explain: "The denominators must be squared: $4^2 = 16$ and $3^2 = 9$." },
        { text: "$x^2 + y^2 = 1$", explain: "That is a circle. Different radii give an ellipse." },
        { text: "$\\dfrac{x^2}{16} + \\dfrac{y^2}{9} = 12$", explain: "The identity equals $1$, not $12$. The right side is $1$." },
      ],
    },
    {
      id: "s-radius-square",
      prompt: "A student eliminates $x = 5\\cos t$, $y = 5\\sin t$ and writes $x^2 + y^2 = 5$. What is the fix?",
      choices: [
        { text: "It should be $x^2 + y^2 = 25$, since $5^2 = 25$", correct: true, explain: "Dividing by $5$ then squaring gives $x^2/25 + y^2/25 = 1$, so $x^2 + y^2 = 25$." },
        { text: "Nothing, $x^2 + y^2 = 5$ is correct", explain: "The radius must be squared. The circle has radius $5$, so $r^2 = 25$." },
        { text: "It should be $x^2 + y^2 = 10$", explain: "That doubles the radius. Squaring $5$ gives $25$, not $10$." },
        { text: "It should be $x + y = 5$", explain: "The identity squares the terms, giving $x^2 + y^2$, not $x + y$." },
      ],
    },
    {
      id: "s-divide-first-error",
      prompt: "To eliminate $x = 3\\cos t$, $y = 2\\sin t$, a student squares first and writes $x^2 = 3\\cos^2 t$. What went wrong?",
      choices: [
        { text: "Squaring $3\\cos t$ gives $9\\cos^2 t$, so divide by $3$ first", correct: true, explain: "$(3\\cos t)^2 = 9\\cos^2 t$. Dividing first, $\\cos t = x/3$, avoids the slip." },
        { text: "Nothing is wrong", explain: "$x^2 = (3\\cos t)^2 = 9\\cos^2 t$, not $3\\cos^2 t$, so it is wrong." },
        { text: "They should have written $x = 3\\cos^2 t$", explain: "That misuses the exponent. Isolate $\\cos t$ first by dividing." },
        { text: "They should take $\\arccos$ of both sides", explain: "Inverse trig is not needed. Divide, then use the identity." },
      ],
    },
    {
      id: "s-cubic-sub",
      prompt: "For $x = t^3$, $y = t$, the cleanest way to eliminate $t$ is",
      choices: [
        { text: "substitution: $t = y$, so $x = y^3$", correct: true, explain: "$y = t$ solves instantly, then $x = t^3 = y^3$." },
        { text: "the identity $\\cos^2 t + \\sin^2 t = 1$", explain: "There are no trig functions here, so that identity does not apply." },
        { text: "you cannot eliminate $t$ from a cubic", explain: "You can: $t = y$ gives $x = y^3$ directly." },
      ],
    },
    {
      id: "s-restrict-right",
      prompt: "The curve $x = \\cos t$, $y = \\sin t$ with $-\\tfrac{\\pi}{2} \\le t \\le \\tfrac{\\pi}{2}$ traces which part of the circle?",
      choices: [
        { text: "the right half, where $x \\ge 0$", correct: true, explain: "On that interval $\\cos t \\ge 0$, so $x \\ge 0$, the right half." },
        { text: "the upper half, where $y \\ge 0$", explain: "The upper half needs $0 \\le t \\le \\pi$. Here $\\cos t \\ge 0$, giving the right half." },
        { text: "the whole circle", explain: "The range spans only $\\pi$ radians, half the circle." },
      ],
    },
    {
      id: "s-restrict-segment",
      prompt: "Eliminating $t$ from $x = t$, $y = 2t$ with $0 \\le t \\le 3$ gives $y = 2x$. What is the actual graph?",
      choices: [
        { text: "the segment of $y = 2x$ from $(0, 0)$ to $(3, 6)$", correct: true, explain: "As $t$ runs $0$ to $3$, $x = t$ runs $0$ to $3$, so only that segment is traced." },
        { text: "the whole line $y = 2x$", explain: "The range of $t$ limits $x$ to $[0, 3]$, so it is only a segment." },
        { text: "just the single point $(3, 6)$", explain: "Every $t$ in $[0, 3]$ gives a point, so it is a whole segment, not one point." },
      ],
    },
    {
      id: "s-not-function",
      prompt: "$x = t^2$, $y = t$ (with $t$ any real number) eliminates to $x = y^2$. Is it a function of $x$?",
      choices: [
        { text: "No, it is a sideways parabola, so it fails the vertical line test", correct: true, explain: "For $x = 4$ both $t = 2$ and $t = -2$ give points, so one $x$ has two $y$-values." },
        { text: "Yes, it is a normal parabola", explain: "It opens sideways: $x = y^2$ gives two $y$-values for most $x$, so it is not a function of $x$." },
        { text: "Yes, it is a straight line", explain: "The squared term makes it a parabola, not a line." },
      ],
    },
    {
      id: "s-which-method",
      prompt: "Which pair is best eliminated using $\\cos^2 t + \\sin^2 t = 1$?",
      choices: [
        { text: "$x = 2\\cos t$, $y = 5\\sin t$", correct: true, explain: "Both coordinates use $\\cos t$ and $\\sin t$, so isolate, square, and add." },
        { text: "$x = 2t$, $y = 5t$", explain: "No trig here. Solve one for $t$ and substitute instead." },
        { text: "$x = t^2$, $y = t$", explain: "No trig here. Substitution ($t = y$) is the clean route." },
      ],
    },
    {
      id: "s-ellipse-id",
      prompt: "The curve $x = 6\\cos t$, $y = 4\\sin t$ is",
      choices: [
        { text: "an ellipse, $\\dfrac{x^2}{36} + \\dfrac{y^2}{16} = 1$", correct: true, explain: "$\\cos t = x/6$, $\\sin t = y/4$, so $x^2/36 + y^2/16 = 1$." },
        { text: "a circle of radius $24$", explain: "The radii differ ($6$ and $4$), so it is an ellipse, not a circle." },
        { text: "a circle, $x^2 + y^2 = 1$", explain: "Unequal radii give an ellipse. A circle needs equal radii." },
        { text: "a straight line", explain: "Squaring and adding gives a quadratic in $x$ and $y$, an ellipse." },
      ],
    },
    {
      id: "s-sub-quadratic",
      prompt: "Eliminate $t$ from $x = t$ and $y = t^2 + 1$.",
      choices: [
        { text: "$y = x^2 + 1$", correct: true, explain: "$t = x$, so $y = t^2 + 1 = x^2 + 1$." },
        { text: "$x = y^2 + 1$", explain: "That solves the wrong equation. Use $t = x$, giving $y = x^2 + 1$." },
        { text: "$y = x^2 - 1$", explain: "Sign slip. The constant is $+1$, so $y = x^2 + 1$." },
        { text: "$y = (x + 1)^2$", explain: "The $+1$ is added after squaring, so $y = x^2 + 1$, not $(x + 1)^2$." },
      ],
    },
    {
      id: "s-missing-bottom",
      prompt: "For $x = \\cos t$, $y = \\sin t$ on $0 \\le t \\le \\pi$, why is $(0, -1)$ not on the curve?",
      choices: [
        { text: "$\\sin t \\ge 0$ on that range, so $y$ is never negative", correct: true, explain: "$(0, -1)$ needs $\\sin t = -1$ at $t = \\tfrac{3\\pi}{2}$, outside $0 \\le t \\le \\pi$." },
        { text: "$\\cos t$ is never $0$ there", explain: "$\\cos t = 0$ does happen, at $t = \\tfrac{\\pi}{2}$. The issue is that $y = \\sin t \\ge 0$." },
        { text: "the identity excludes that point", explain: "The identity holds everywhere. The range of $t$ is what excludes the bottom." },
      ],
    },
    {
      id: "s-error-full-circle",
      prompt: "A student eliminates $x = \\cos t$, $y = \\sin t$ on $0 \\le t \\le \\pi$ and reports the graph as the full circle. What is the fix?",
      choices: [
        { text: "Only the upper half ($y \\ge 0$) is traced, because of the range of $t$", correct: true, explain: "The equation is the full circle, but $0 \\le t \\le \\pi$ keeps only the top." },
        { text: "Nothing, it is the full circle", explain: "The range stops at $\\pi$, so the bottom half is never reached." },
        { text: "It is the lower half", explain: "For $0 \\le t \\le \\pi$, $\\sin t \\ge 0$, so it is the upper half." },
        { text: "It is the right half", explain: "The right half needs $\\cos t \\ge 0$. Here the restriction gives the upper half." },
      ],
    },
    {
      id: "s-sub-shift",
      prompt: "Eliminate $t$ from $x = t + 3$ and $y = t^2 - 1$.",
      choices: [
        { text: "$y = (x - 3)^2 - 1$", correct: true, explain: "$t = x - 3$, so $y = (x - 3)^2 - 1$." },
        { text: "$y = (x + 3)^2 - 1$", explain: "Sign error. From $x = t + 3$ you get $t = x - 3$." },
        { text: "$y = x^2 - 4$", explain: "You must substitute $t = x - 3$ into $t^2 - 1$, not expand loosely." },
        { text: "$y = (x - 3)^2$", explain: "Do not drop the $-1$: $y = t^2 - 1 = (x - 3)^2 - 1$." },
      ],
    },
    {
      id: "s-capstone",
      prompt: "For $x = 2\\cos t$, $y = 2\\sin t$ with $0 \\le t \\le \\pi$, which statement is completely correct?",
      choices: [
        { text: "It eliminates to $x^2 + y^2 = 4$, and the curve is the upper half ($y \\ge 0$), an arc of radius $2$", correct: true, explain: "$\\cos t = x/2$, $\\sin t = y/2$ give $x^2 + y^2 = 4$, and $0 \\le t \\le \\pi$ keeps the top half." },
        { text: "It eliminates to $x^2 + y^2 = 2$ and traces the whole circle", explain: "The radius $2$ squares to $4$, and the range keeps only the upper half." },
        { text: "It eliminates to $x^2 + y^2 = 4$ and traces the whole circle", explain: "The equation is right, but $0 \\le t \\le \\pi$ traces only the upper half." },
        { text: "It eliminates to $\\dfrac{x^2}{2} + \\dfrac{y^2}{2} = 1$, the upper half", explain: "That is the same as $x^2 + y^2 = 2$, which has the wrong radius. It should be $x^2 + y^2 = 4$." },
      ],
    },
  ],
};
