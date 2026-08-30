import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Graphing parametric equations".
 * Grounded in the lesson takeaways: a parametric curve gives x and y as functions
 * of a parameter t, so a point is found by substituting t into BOTH equations and
 * plotting (x, y); you build a table of (t, x, y) with t in increasing order,
 * plot the points, and connect them in order of increasing t (not left to right);
 * the arrows show the orientation, the direction of travel as t increases, and t
 * often stands for time. The running curve is x(t) = t^2 - 1, y(t) = t, a
 * right-opening parabola with vertex (-1, 0) that fails the vertical line test.
 * Distractors are the classic traps: plotting (t, x) or the swapped (y, x) instead
 * of (x, y), dropping the -1, sign slips on y = t, connecting by x instead of by
 * increasing t, and reversing the orientation.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-read-t2",
      prompt: "A curve is given by $x(t) = t^2 - 1$ and $y(t) = t$. What point corresponds to $t = 2$?",
      choices: [
        { text: "$(3, 2)$", correct: true, explain: "$x = 2^2 - 1 = 3$ and $y = 2$, so the point is $(3, 2)$." },
        { text: "$(2, 3)$", explain: "That plots $(t, x)$. The point is $(x, y) = (3, 2)$." },
        { text: "$(4, 2)$", explain: "That used $x = t^2$ and dropped the $-1$. Here $x = 4 - 1 = 3$." },
        { text: "$(3, -2)$", explain: "$(3, -2)$ is the point at $t = -2$. At $t = 2$ the height is $y = 2$." },
      ],
    },
    {
      id: "c-read-neg1",
      prompt: "For $x(t) = t^2 - 1$ and $y(t) = t$, where is the point at $t = -1$?",
      choices: [
        { text: "$(0, -1)$", correct: true, explain: "$x = (-1)^2 - 1 = 0$ and $y = -1$." },
        { text: "$(-1, -1)$", explain: "That used $x = t$. Here $x = t^2 - 1 = 0$." },
        { text: "$(0, 1)$", explain: "$y = t = -1$, not $1$, so keep the negative sign." },
        { text: "$(-2, -1)$", explain: "$(-1)^2 - 1 = 0$, not $-2$. Square before subtracting." },
      ],
    },
    {
      id: "c-plot-order",
      prompt: "You compute $x = 0$ and $y = 1$ for some value of $t$. Where does the point go?",
      choices: [
        { text: "$(0, 1)$", correct: true, explain: "You plot the pair $(x, y)$, so $(0, 1)$." },
        { text: "$(1, 0)$", explain: "That is $(y, x)$, the coordinates swapped. Plot $(x, y)$." },
        { text: "You also need $t$ as a third coordinate", explain: "Only $(x, y)$ is plotted. The value of $t$ picks the point but is not an axis." },
      ],
    },
    {
      id: "c-role-of-t",
      prompt: "In a parametric curve, what role does the parameter $t$ play?",
      choices: [
        { text: "It is the input you plug in to get $x$ and $y$, and it is not plotted on an axis", correct: true, explain: "Choose $t$, compute $x(t)$ and $y(t)$, then plot $(x, y)$. The plane has no $t$-axis." },
        { text: "It is the horizontal axis, replacing $x$", explain: "$x$ is still the horizontal axis. $t$ is the input, not an axis." },
        { text: "It is the vertical axis, replacing $y$", explain: "$y$ is still the vertical axis. $t$ is the input, not an axis." },
      ],
    },
    {
      id: "c-procedure",
      prompt: "To get one point of a parametric curve, you should",
      choices: [
        { text: "substitute the value of $t$ into both $x(t)$ and $y(t)$", correct: true, explain: "Both coordinates depend on the same $t$, so feed $t$ into both formulas." },
        { text: "substitute $t$ into $x(t)$ only", explain: "That gives just the $x$-coordinate. You still need $y(t)$." },
        { text: "add $x(t)$ and $y(t)$ into a single number", explain: "A point needs two coordinates, not one sum." },
      ],
    },
    {
      id: "c-connect-order",
      prompt: "After plotting the points from a table, how do you draw the curve?",
      choices: [
        { text: "Connect them in order of increasing $t$", correct: true, explain: "The table is built with $t$ increasing, so join the points in that same order." },
        { text: "Connect them left to right, smallest $x$ first", explain: "Connecting by $x$ can draw the wrong path and hides the orientation." },
        { text: "Connect them from the largest $y$ down to the smallest", explain: "Order comes from $t$, not from the $y$-values." },
      ],
    },
    {
      id: "c-orientation-def",
      prompt: "The orientation of a parametric curve is",
      choices: [
        { text: "the direction the point moves as $t$ increases", correct: true, explain: "Orientation is the direction of travel, shown by arrows along the curve." },
        { text: "the slope of the curve at each point", explain: "Slope is a different idea. Orientation is a direction of motion." },
        { text: "the list of $x$-intercepts", explain: "Intercepts are points, not a direction. Orientation is about motion." },
      ],
    },
    {
      id: "c-orientation-run",
      prompt: "For $x(t) = t^2 - 1$ and $y(t) = t$, as $t$ increases the point moves",
      choices: [
        { text: "upward, because $y = t$ increases with $t$", correct: true, explain: "The height is $y = t$, so it climbs as $t$ grows." },
        { text: "downward, because the parabola opens to the right", explain: "Opening right is the shape. The travel direction comes from $y = t$ rising." },
        { text: "it does not move, the curve is fixed", explain: "The point moves along the curve as $t$ changes." },
      ],
    },
    {
      id: "c-vlt",
      prompt: "Which statement about the curve $x(t) = t^2 - 1$, $y(t) = t$ is true?",
      choices: [
        { text: "It fails the vertical line test, so it is not a function of $x$", correct: true, explain: "For example $x = 3$ comes from both $t = 2$ and $t = -2$, so a vertical line hits it twice." },
        { text: "It is a function of $x$, a parabola opening upward", explain: "It opens to the right, and one $x$ gives two $y$-values, so it is not a function of $x$." },
        { text: "It is a straight line", explain: "The $t^2$ term makes it a parabola, not a line." },
      ],
    },
    {
      id: "c-t-is-time",
      prompt: "In many real models, the parameter $t$ represents",
      choices: [
        { text: "time", correct: true, explain: "Parametric motion tracks position over time, so $t$ usually stands for time." },
        { text: "the slope of the path", explain: "Slope is not the parameter. $t$ is the input that advances along the curve." },
        { text: "the area under the curve", explain: "Area is unrelated. $t$ is the input, often time." },
      ],
    },
    {
      id: "c-reverse",
      prompt: "Compare $x = t^2 - 1$, $y = t$ with $x = t^2 - 1$, $y = -t$ over the same range of $t$. They are",
      choices: [
        { text: "the same parabola traced in opposite directions", correct: true, explain: "Both cover the same points, but $y = -t$ falls as $t$ rises, so the orientation is reversed." },
        { text: "two completely different shapes", explain: "The set of points is identical. Only the direction of travel changes." },
        { text: "the same curve traced the same direction", explain: "Flipping $y$ to $-t$ reverses the direction, so the orientations differ." },
      ],
    },
    {
      id: "c-line-read",
      prompt: "A line is given by $x(t) = 2t$ and $y(t) = t - 1$. Where is the point at $t = 3$?",
      choices: [
        { text: "$(6, 2)$", correct: true, explain: "$x = 2(3) = 6$ and $y = 3 - 1 = 2$." },
        { text: "$(3, 2)$", explain: "That used $x = t$. Here $x = 2t = 6$." },
        { text: "$(6, 3)$", explain: "That used $y = t$ and dropped the $-1$. Here $y = 3 - 1 = 2$." },
        { text: "$(2, 6)$", explain: "The coordinates are swapped. The point is $(x, y) = (6, 2)$." },
      ],
    },
    {
      id: "c-line-orient",
      prompt: "For $x(t) = 2t$ and $y(t) = t - 1$, as $t$ increases the point moves",
      choices: [
        { text: "up and to the right, since both $x$ and $y$ increase", correct: true, explain: "$x = 2t$ grows and $y = t - 1$ grows, so the point heads up and to the right." },
        { text: "down and to the left", explain: "Both coordinates increase with $t$, so it moves up and to the right." },
        { text: "straight up with $x$ held fixed", explain: "$x = 2t$ changes too, so the point does not stay on one vertical line." },
      ],
    },
    {
      id: "c-which-horizontal",
      prompt: "A plotted parametric point is written $(4, 1)$. Which number is the horizontal coordinate?",
      choices: [
        { text: "$4$, the value of $x(t)$", correct: true, explain: "The first coordinate is always $x$, the horizontal position." },
        { text: "$1$, the value of $y(t)$", explain: "$1$ is the second coordinate, the height $y$." },
        { text: "neither, both are values of $t$", explain: "A plotted point shows $(x, y)$, not $t$." },
      ],
    },
    {
      id: "c-table-increasing",
      prompt: "When you make a table to graph parametric equations, you should choose the values of $t$",
      choices: [
        { text: "in increasing order, so the orientation is easy to mark", correct: true, explain: "Increasing $t$ lets you connect points in order and draw the direction arrows." },
        { text: "in a random order", explain: "Random order makes it hard to connect points and show orientation." },
        { text: "using only positive values", explain: "Negative $t$-values are allowed and often needed to draw the whole curve." },
      ],
    },
  ],
  summit: [
    {
      id: "s-read-t3",
      prompt: "For $x(t) = t^2 - 1$ and $y(t) = t$, what point corresponds to $t = 3$?",
      choices: [
        { text: "$(8, 3)$", correct: true, explain: "$x = 3^2 - 1 = 8$ and $y = 3$." },
        { text: "$(3, 8)$", explain: "The coordinates are swapped. The point is $(x, y) = (8, 3)$." },
        { text: "$(9, 3)$", explain: "That used $x = t^2$ and dropped the $-1$. Here $x = 9 - 1 = 8$." },
        { text: "$(8, -3)$", explain: "$y = t = 3$, not $-3$." },
      ],
    },
    {
      id: "s-solve-t",
      prompt: "For $x(t) = t^2 - 1$ and $y(t) = t$, which value of $t$ gives the point $(0, -1)$?",
      choices: [
        { text: "$t = -1$", correct: true, explain: "$y = t = -1$ and $x = (-1)^2 - 1 = 0$, so it matches." },
        { text: "$t = 1$", explain: "$t = 1$ gives $(0, 1)$, not $(0, -1)$." },
        { text: "$t = 0$", explain: "$t = 0$ gives $(-1, 0)$, the vertex." },
        { text: "$t = -2$", explain: "$t = -2$ gives $(3, -2)$." },
      ],
    },
    {
      id: "s-start-end",
      prompt: "On $x = t^2 - 1$, $y = t$ for $-2 \\le t \\le 2$, the point $(3, -2)$ is",
      choices: [
        { text: "the start, at $t = -2$", correct: true, explain: "The smallest $t$ is $-2$, giving $(3, -2)$, where the trace begins." },
        { text: "the end, at $t = 2$", explain: "The end is $(3, 2)$ at $t = 2$. $(3, -2)$ is at $t = -2$." },
        { text: "the vertex", explain: "The vertex is $(-1, 0)$ at $t = 0$." },
        { text: "not on the curve", explain: "It is on the curve: $t = -2$ gives $(3, -2)$." },
      ],
    },
    {
      id: "s-circle-quarter",
      prompt: "For $x = \\cos t$, $y = \\sin t$ with $t$ increasing from $0$, the first quarter runs from $(1, 0)$ to",
      choices: [
        { text: "$(0, 1)$", correct: true, explain: "At $t = \\tfrac{\\pi}{2}$ the point is $(\\cos\\tfrac{\\pi}{2}, \\sin\\tfrac{\\pi}{2}) = (0, 1)$, moving counterclockwise." },
        { text: "$(0, -1)$", explain: "$(0, -1)$ is at $t = \\tfrac{3\\pi}{2}$, three quarters around, not the first quarter." },
        { text: "$(-1, 0)$", explain: "$(-1, 0)$ is at $t = \\pi$, halfway around." },
      ],
    },
    {
      id: "s-circle-orient",
      prompt: "The unit circle $x = \\cos t$, $y = \\sin t$ is traced ___ as $t$ increases.",
      choices: [
        { text: "counterclockwise", correct: true, explain: "From $(1, 0)$ it goes to $(0, 1)$ then $(-1, 0)$, the counterclockwise direction." },
        { text: "clockwise", explain: "Clockwise would go from $(1, 0)$ toward $(0, -1)$. Increasing $t$ goes the other way." },
        { text: "back and forth along the $x$-axis", explain: "The point sweeps the whole circle, not just the axis." },
      ],
    },
    {
      id: "s-parabola-fn",
      prompt: "For $x(t) = t$ and $y(t) = t^2$, what point corresponds to $t = -2$?",
      choices: [
        { text: "$(-2, 4)$", correct: true, explain: "$x = -2$ and $y = (-2)^2 = 4$." },
        { text: "$(4, -2)$", explain: "The coordinates are swapped. The point is $(x, y) = (-2, 4)$." },
        { text: "$(-2, -4)$", explain: "$y = t^2 = 4$ is positive. Squaring removes the sign." },
        { text: "$(-4, 4)$", explain: "$x = t = -2$, not $-4$." },
      ],
    },
    {
      id: "s-which-not-fn",
      prompt: "Which set of parametric equations does NOT trace a function of $x$?",
      choices: [
        { text: "$x = t^2 - 1$, $y = t$", correct: true, explain: "One $x$-value comes from two $t$-values (like $x = 3$ from $t = \\pm 2$), so it fails the vertical line test." },
        { text: "$x = t$, $y = t^2$", explain: "Here $x = t$ is one-to-one, so each $x$ gives exactly one $y$. It is a function." },
        { text: "$x = t$, $y = 2t + 1$", explain: "This is a line, a function of $x$." },
      ],
    },
    {
      id: "s-error-swap",
      prompt: "To plot $t = 2$ for $x = t^2 - 1$, $y = t$, a student plots $(2, 3)$. What went wrong?",
      choices: [
        { text: "They plotted $(t, x)$. The point is $(x, y) = (3, 2)$", correct: true, explain: "$x = 3$ and $y = 2$, so the correct point is $(3, 2)$, not $(2, 3)$." },
        { text: "Nothing, $(2, 3)$ is correct", explain: "$(2, 3)$ uses $t$ as the first coordinate. The point is $(3, 2)$." },
        { text: "They should have used $t = 3$", explain: "The value $t = 2$ is fine. The mistake is the coordinate order." },
        { text: "They dropped the $-1$ in $x$", explain: "They kept $x$ correct as $3$ but wrote it second. The order is the issue." },
      ],
    },
    {
      id: "s-error-connect",
      prompt: "A student plots the points correctly but connects them by increasing $x$, and the curve looks wrong. The fix is to",
      choices: [
        { text: "connect the points in order of increasing $t$", correct: true, explain: "The path is defined by the parameter, so join points in $t$-order, not $x$-order." },
        { text: "erase the points with negative $t$", explain: "Negative $t$ points are part of the curve. Keep them and reorder by $t$." },
        { text: "swap every $x$ and $y$", explain: "The coordinates are fine. Only the connection order is wrong." },
      ],
    },
    {
      id: "s-line2-read",
      prompt: "For $x(t) = 2t$ and $y(t) = t^2$, what point corresponds to $t = 3$?",
      choices: [
        { text: "$(6, 9)$", correct: true, explain: "$x = 2(3) = 6$ and $y = 3^2 = 9$." },
        { text: "$(3, 9)$", explain: "That used $x = t$. Here $x = 2t = 6$." },
        { text: "$(6, 6)$", explain: "$y = t^2 = 9$, not $6$." },
        { text: "$(9, 6)$", explain: "The coordinates are swapped. The point is $(6, 9)$." },
      ],
    },
    {
      id: "s-two-params",
      prompt: "Two different parameterizations trace the same set of points but with the arrows pointing opposite ways. They differ in their",
      choices: [
        { text: "orientation", correct: true, explain: "Same points, opposite direction of travel, is exactly a difference in orientation." },
        { text: "shape", explain: "The shape (the set of points) is the same. Only the direction differs." },
        { text: "number of points", explain: "They cover the same points, so the count is the same." },
      ],
    },
    {
      id: "s-between-rows",
      prompt: "A table shows $t = 1 \\to (0, 1)$ and $t = 2 \\to (3, 2)$. Between $t = 1$ and $t = 2$, the point moves",
      choices: [
        { text: "up and to the right", correct: true, explain: "It goes from $(0, 1)$ to $(3, 2)$, so both $x$ and $y$ increase." },
        { text: "up and to the left", explain: "$x$ rises from $0$ to $3$, so it moves right, not left." },
        { text: "down and to the right", explain: "$y$ rises from $1$ to $2$, so it moves up, not down." },
      ],
    },
    {
      id: "s-no-t-axis",
      prompt: "Why does the graph of a parametric curve show no $t$-axis?",
      choices: [
        { text: "$t$ is the input, and only the resulting points $(x, y)$ are plotted on the plane", correct: true, explain: "The parameter chooses each point but is recorded by the arrows and labels, not by an axis." },
        { text: "The value of $t$ is always zero", explain: "$t$ ranges over an interval. It is simply not one of the plotted axes." },
        { text: "$t$ equals $x$ in every problem", explain: "Only sometimes is $x = t$. In general $t$ is a separate input, not an axis." },
      ],
    },
    {
      id: "s-line3-read",
      prompt: "For $x(t) = t + 1$ and $y(t) = t - 1$, what point corresponds to $t = 4$?",
      choices: [
        { text: "$(5, 3)$", correct: true, explain: "$x = 4 + 1 = 5$ and $y = 4 - 1 = 3$." },
        { text: "$(3, 5)$", explain: "The coordinates are swapped. The point is $(5, 3)$." },
        { text: "$(5, 4)$", explain: "$y = t - 1 = 3$, not $4$." },
        { text: "$(4, 3)$", explain: "$x = t + 1 = 5$, not $4$." },
      ],
    },
    {
      id: "s-capstone",
      prompt: "For $x = t^2 - 1$, $y = t$ on $-2 \\le t \\le 2$, which statement is completely correct?",
      choices: [
        { text: "A right-opening parabola with vertex $(-1, 0)$, traced upward as $t$ increases, that fails the vertical line test", correct: true, explain: "Vertex at $t = 0$ is $(-1, 0)$, $y = t$ makes it climb, and one $x$ gives two $t$-values, so it is not a function of $x$." },
        { text: "A right-opening parabola with vertex $(0, 0)$, traced upward", explain: "The vertex is $(-1, 0)$, since $x = 0^2 - 1 = -1$ at $t = 0$." },
        { text: "A right-opening parabola traced downward as $t$ increases", explain: "It is traced upward, because $y = t$ increases with $t$." },
        { text: "A parabola that is a function of $x$", explain: "It fails the vertical line test, so it is not a function of $x$." },
      ],
    },
  ],
};
