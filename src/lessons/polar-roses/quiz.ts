import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Polar graphs: roses, limaçons,
 * cardioids" (skill id `polar-graphs`, folder `polar-roses`). Grounded in the
 * lesson: graph $r = f(\theta)$ by sweeping $\theta$. A rose $r = \cos(n\theta)$
 * has $n$ petals when $n$ is odd and $2n$ when $n$ is even. The cardioid
 * $r = 1 + \cos\theta$ has its cusp at the origin ($r = 0$ at $\theta = 180^\circ$)
 * and its max $r = 2$ at $\theta = 0$. A limaçon $r = a + b\cos\theta$ has an
 * inner loop when $a < b$, is the cardioid when $a = b$, is dimpled for
 * $1 < a/b < 2$, and is convex for $a/b \ge 2$. Distractors are the classic
 * traps: applying the wrong parity rule, miscounting the cusp, and confusing the
 * loop, dimple, and cardioid cases.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-graph-method",
      prompt: "To graph a polar equation $r = f(\\theta)$, you",
      choices: [
        { text: "sweep $\\theta$, compute $r$ for each, and plot the points", correct: true, explain: "Each angle gives a radius, and the plotted points trace the curve." },
        { text: "fix $r$ and ignore $\\theta$", explain: "A fixed $r$ is just a circle, not a general curve." },
        { text: "plot $\\theta$ on the $y$-axis and $r$ on the $x$-axis", explain: "That is rectangular graphing. Polar plots a distance $r$ at an angle $\\theta$." },
      ],
    },
    {
      id: "c-rose-cos2",
      prompt: "How many petals does $r = \\cos 2\\theta$ have?",
      choices: [
        { text: "$4$", correct: true, explain: "$n = 2$ is even, so the count is $2n = 4$." },
        { text: "$2$", explain: "That uses the odd rule ($n$ petals). For even $n$ the count is $2n$." },
        { text: "$8$", explain: "That is $2n$ with $n = 4$. Here $n = 2$, so $4$ petals." },
      ],
    },
    {
      id: "c-rose-cos3",
      prompt: "How many petals does $r = \\cos 3\\theta$ have?",
      choices: [
        { text: "$3$", correct: true, explain: "$n = 3$ is odd, so the count is $n = 3$." },
        { text: "$6$", explain: "That uses the even rule ($2n$). For odd $n$ the count is $n$." },
        { text: "$9$", explain: "The count is $n$ or $2n$, never $n^2$." },
      ],
    },
    {
      id: "c-rose-rule",
      prompt: "For $r = \\cos(n\\theta)$, the petal count is",
      choices: [
        { text: "$n$ when $n$ is odd, and $2n$ when $n$ is even", correct: true, explain: "This is the standard rose petal rule." },
        { text: "$2n$ when $n$ is odd, and $n$ when $n$ is even", explain: "The two cases are reversed." },
        { text: "always $n$", explain: "Even $n$ gives $2n$ petals, for example $r = \\cos 2\\theta$ has $4$." },
      ],
    },
    {
      id: "c-rose-cos4",
      prompt: "How many petals does $r = \\cos 4\\theta$ have?",
      choices: [
        { text: "$8$", correct: true, explain: "$n = 4$ is even, so $2n = 8$." },
        { text: "$4$", explain: "That uses the odd rule. Even $n$ gives $2n$." },
        { text: "$16$", explain: "The count is $2n = 8$, not $n^2$." },
      ],
    },
    {
      id: "c-cardioid-name",
      prompt: "The curve $r = 1 + \\cos\\theta$ is called a",
      choices: [
        { text: "cardioid", correct: true, explain: "It is heart shaped, the $a = b$ case of a limaçon." },
        { text: "rose", explain: "Roses come from $r = \\cos(n\\theta)$, not $1 + \\cos\\theta$." },
        { text: "circle", explain: "A circle is $r = $ constant. Adding $\\cos\\theta$ makes a cardioid." },
      ],
    },
    {
      id: "c-cardioid-r0",
      prompt: "For $r = 1 + \\cos\\theta$, the value of $r$ at $\\theta = 180^\\circ$ is",
      choices: [
        { text: "$0$", correct: true, explain: "$1 + \\cos 180^\\circ = 1 + (-1) = 0$, the cusp at the origin." },
        { text: "$2$", explain: "That is $\\theta = 0^\\circ$. At $180^\\circ$, $\\cos = -1$." },
        { text: "$1$", explain: "That is $\\theta = 90^\\circ$, where $\\cos = 0$." },
      ],
    },
    {
      id: "c-cardioid-max",
      prompt: "The maximum $r = 2$ on $r = 1 + \\cos\\theta$ is reached at $\\theta =$",
      choices: [
        { text: "$0^\\circ$", correct: true, explain: "$\\cos 0^\\circ = 1$, so $r = 2$." },
        { text: "$90^\\circ$", explain: "$\\cos 90^\\circ = 0$, giving $r = 1$." },
        { text: "$180^\\circ$", explain: "$\\cos 180^\\circ = -1$, giving $r = 0$." },
      ],
    },
    {
      id: "c-limacon-loop",
      prompt: "A limaçon $r = a + b\\cos\\theta$ has an inner loop when",
      choices: [
        { text: "$a < b$", correct: true, explain: "The radius goes negative for some angles, which draws the loop." },
        { text: "$a > b$", explain: "Then $r$ stays nonnegative, so there is no loop, just a dimple or convex shape." },
        { text: "$a = b$", explain: "That is the cardioid, the borderline with a cusp but no loop." },
      ],
    },
    {
      id: "c-limacon-cardioid",
      prompt: "For $r = a + b\\cos\\theta$, the cardioid is the special case",
      choices: [
        { text: "$a = b$", correct: true, explain: "Equal parts close the loop to a cusp at the origin." },
        { text: "$a = 0$", explain: "That gives $r = b\\cos\\theta$, a circle." },
        { text: "$b = 0$", explain: "That gives $r = a$, a circle." },
      ],
    },
    {
      id: "c-limacon-ex",
      prompt: "Which equation has an inner loop?",
      choices: [
        { text: "$r = 1 + 2\\cos\\theta$", correct: true, explain: "$a = 1 < b = 2$, so there is a loop." },
        { text: "$r = 2 + \\cos\\theta$", explain: "$a = 2 > b = 1$, so no loop." },
        { text: "$r = 1 + \\cos\\theta$", explain: "$a = b = 1$ is the cardioid, no loop." },
      ],
    },
    {
      id: "c-rose-sin2",
      prompt: "How many petals does $r = \\sin 2\\theta$ have?",
      choices: [
        { text: "$4$", correct: true, explain: "$n = 2$ is even, so $2n = 4$. The sine rose follows the same rule as cosine." },
        { text: "$2$", explain: "That uses the odd rule. Even $n$ gives $2n$." },
        { text: "$8$", explain: "That is $2n$ with $n = 4$. Here $n = 2$." },
      ],
    },
    {
      id: "c-depends",
      prompt: "A polar curve that is not a circle comes from",
      choices: [
        { text: "letting $r$ depend on $\\theta$", correct: true, explain: "A varying radius traces a curve as the angle sweeps." },
        { text: "fixing $r$ at one value", explain: "A constant $r$ is a circle." },
        { text: "fixing $\\theta$ at one value", explain: "A constant $\\theta$ is a ray or line." },
      ],
    },
    {
      id: "c-cos-symmetry",
      prompt: "A polar graph built from $\\cos\\theta$, such as $r = 1 + \\cos\\theta$, is symmetric about",
      choices: [
        { text: "the $x$-axis (the polar axis)", correct: true, explain: "Cosine is even, so $\\theta$ and $-\\theta$ give the same $r$, mirroring across the $x$-axis." },
        { text: "the $y$-axis", explain: "That symmetry goes with $\\sin\\theta$ equations." },
        { text: "no axis at all", explain: "Cosine curves are symmetric across the polar axis." },
      ],
    },
    {
      id: "c-petal-tip",
      prompt: "On $r = \\cos 3\\theta$, the petal along the positive $x$-axis reaches its tip at $\\theta = 0^\\circ$, where $r =$",
      choices: [
        { text: "$1$", correct: true, explain: "$\\cos(3 \\cdot 0^\\circ) = \\cos 0^\\circ = 1$." },
        { text: "$0$", explain: "$r = 0$ happens between petals, not at a tip." },
        { text: "$3$", explain: "The amplitude here is $1$, so the tip reaches $r = 1$." },
      ],
    },
  ],
  summit: [
    {
      id: "s-rose-cos5",
      prompt: "How many petals does $r = \\cos 5\\theta$ have?",
      choices: [
        { text: "$5$", correct: true, explain: "$n = 5$ is odd, so the count is $n = 5$." },
        { text: "$10$", explain: "That uses the even rule ($2n$). For odd $n$ the count is $n$." },
        { text: "$25$", explain: "The count is $n$ or $2n$, never $n^2$." },
      ],
    },
    {
      id: "s-rose-cos6",
      prompt: "How many petals does $r = \\cos 6\\theta$ have?",
      choices: [
        { text: "$12$", correct: true, explain: "$n = 6$ is even, so $2n = 12$." },
        { text: "$6$", explain: "That uses the odd rule. Even $n$ gives $2n$." },
        { text: "$36$", explain: "The count is $2n = 12$, not $n^2$." },
      ],
    },
    {
      id: "s-rose-most",
      prompt: "Which rose has the most petals?",
      choices: [
        { text: "$r = \\cos 4\\theta$", correct: true, explain: "$n = 4$ is even, giving $2n = 8$ petals, the most here." },
        { text: "$r = \\cos 3\\theta$", explain: "$n = 3$ is odd, giving $3$ petals." },
        { text: "$r = \\cos 5\\theta$", explain: "$n = 5$ is odd, giving $5$ petals." },
        { text: "$r = \\cos 2\\theta$", explain: "$n = 2$ is even, giving $4$ petals." },
      ],
    },
    {
      id: "s-limacon-dimpled",
      prompt: "Classify $r = 3 + 2\\cos\\theta$.",
      choices: [
        { text: "dimpled limaçon", correct: true, explain: "$a/b = 3/2 = 1.5$, between $1$ and $2$, a dimple with no loop." },
        { text: "inner loop", explain: "A loop needs $a < b$. Here $a = 3 > b = 2$." },
        { text: "convex (no dimple)", explain: "Convex needs $a/b \\ge 2$. Here $1.5 < 2$." },
        { text: "cardioid", explain: "A cardioid needs $a = b$." },
      ],
    },
    {
      id: "s-limacon-convex",
      prompt: "Classify $r = 2 + \\cos\\theta$.",
      choices: [
        { text: "convex limaçon (no dimple)", correct: true, explain: "$a/b = 2/1 = 2$, and $a/b \\ge 2$ gives a convex shape." },
        { text: "dimpled", explain: "A dimple needs $1 < a/b < 2$. Here $a/b = 2$." },
        { text: "inner loop", explain: "A loop needs $a < b$. Here $a = 2 > b = 1$." },
        { text: "cardioid", explain: "A cardioid needs $a = b$." },
      ],
    },
    {
      id: "s-limacon-r0",
      prompt: "For $r = 1 + 2\\cos\\theta$, at which angle is $r = 0$ (where the inner loop meets the origin)?",
      choices: [
        { text: "$120^\\circ$", correct: true, explain: "$1 + 2\\cos\\theta = 0$ gives $\\cos\\theta = -\\tfrac{1}{2}$, so $\\theta = 120^\\circ$ (also $240^\\circ$)." },
        { text: "$90^\\circ$", explain: "$\\cos 90^\\circ = 0$ gives $r = 1$, not $0$." },
        { text: "$180^\\circ$", explain: "$\\cos 180^\\circ = -1$ gives $r = -1$, not $0$." },
        { text: "$60^\\circ$", explain: "$\\cos 60^\\circ = \\tfrac{1}{2}$ gives $r = 2$." },
      ],
    },
    {
      id: "s-cardioid-pt90",
      prompt: "On $r = 1 + \\cos\\theta$, the point at $\\theta = 90^\\circ$ is",
      choices: [
        { text: "$(0, 1)$", correct: true, explain: "$r = 1 + \\cos 90^\\circ = 1$, and $\\theta = 90^\\circ$ points straight up." },
        { text: "$(2, 0)$", explain: "That is $\\theta = 0^\\circ$, where $r = 2$." },
        { text: "$(0, 2)$", explain: "The greatest $r = 2$ points right (at $\\theta = 0^\\circ$), not up." },
        { text: "$(0, -1)$", explain: "That is $\\theta = 270^\\circ$, where $r = 1$ points down." },
      ],
    },
    {
      id: "s-rose-sin4",
      prompt: "How many petals does $r = \\sin 4\\theta$ have?",
      choices: [
        { text: "$8$", correct: true, explain: "$n = 4$ is even, so $2n = 8$. Sine roses follow the same parity rule." },
        { text: "$4$", explain: "That uses the odd rule. Even $n$ gives $2n$." },
        { text: "$16$", explain: "The count is $2n = 8$, not $n^2$." },
      ],
    },
    {
      id: "s-graph-neg-r",
      prompt: "While graphing $r = \\cos 2\\theta$, at $\\theta = 90^\\circ$ you get $r = \\cos 180^\\circ = -1$. Where do you plot it?",
      choices: [
        { text: "at $(0, -1)$, stepping backward from $90^\\circ$", correct: true, explain: "A negative $r$ reverses direction, so facing $90^\\circ$ and stepping back points down." },
        { text: "at $(0, 1)$, straight up", explain: "A negative $r$ does not point along $90^\\circ$, it reverses to the opposite side." },
        { text: "you skip it, since $r$ cannot be negative", explain: "In polar graphing $r$ may be negative. You plot in the opposite direction." },
        { text: "at $(-1, 0)$", explain: "That is $\\theta = 180^\\circ$. At $\\theta = 90^\\circ$ the reversed point is $(0, -1)$." },
      ],
    },
    {
      id: "s-cardioid-border",
      prompt: "Why is the cardioid the borderline limaçon?",
      choices: [
        { text: "at $a = b$ the inner loop shrinks to a single cusp at the origin", correct: true, explain: "It sits exactly between the loop ($a < b$) and the dimple ($a > b$)." },
        { text: "because it has two separate loops", explain: "A cardioid has no loop, only a cusp." },
        { text: "because $r$ stays constant", explain: "On a cardioid $r$ varies from $0$ to $2$." },
        { text: "because it is actually a rose", explain: "A cardioid is a limaçon, not a rose." },
      ],
    },
    {
      id: "s-even-double",
      prompt: "Compared with an odd $n$, an even $n$ in $r = \\cos(n\\theta)$ gives",
      choices: [
        { text: "twice as many petals, $2n$ instead of $n$", correct: true, explain: "Even $n$ doubles the petal count to $2n$." },
        { text: "the same number of petals", explain: "Even $n$ doubles the count." },
        { text: "half as many petals", explain: "It is the reverse: even $n$ gives more petals." },
        { text: "no petals at all", explain: "Even $n$ still forms petals, just $2n$ of them." },
      ],
    },
    {
      id: "s-amplitude",
      prompt: "How does $r = 3\\cos 2\\theta$ differ from $r = \\cos 2\\theta$?",
      choices: [
        { text: "same $4$ petals, but each reaches out to $r = 3$ instead of $r = 1$", correct: true, explain: "The leading number sets petal length, not the count." },
        { text: "it has three times as many petals", explain: "The amplitude sets length, and the petal count still comes from $n = 2$." },
        { text: "it has $6$ petals", explain: "Petal count depends on $n = 2$, giving $4$, whatever the amplitude." },
        { text: "it becomes a cardioid", explain: "It is still a rose, only the petal length changed." },
      ],
    },
    {
      id: "s-limacon-b0",
      prompt: "What shape is $r = 2$ (a limaçon with $b = 0$)?",
      choices: [
        { text: "a circle of radius $2$", correct: true, explain: "With no $\\cos\\theta$ term, $r$ is constant, which is a circle." },
        { text: "a cardioid", explain: "A cardioid needs the $\\cos\\theta$ term with $a = b$." },
        { text: "a rose", explain: "Roses need $\\cos(n\\theta)$ with $n \\ge 2$." },
        { text: "a straight line", explain: "A constant $r$ is a circle, not a line." },
      ],
    },
    {
      id: "s-which-cardioid",
      prompt: "Which equation is a cardioid?",
      choices: [
        { text: "$r = 2 + 2\\cos\\theta$", correct: true, explain: "$a = b = 2$, the cardioid case." },
        { text: "$r = 2 + 3\\cos\\theta$", explain: "$a = 2 < b = 3$, an inner-loop limaçon." },
        { text: "$r = 3 + 2\\cos\\theta$", explain: "$a = 3 > b = 2$, a dimpled limaçon." },
        { text: "$r = \\cos 2\\theta$", explain: "That is a four-petaled rose." },
      ],
    },
    {
      id: "s-full-classify",
      prompt: "Which classification of the limaçon $r = a + b\\cos\\theta$ by the ratio $a/b$ is correct?",
      choices: [
        { text: "$a/b < 1$ loop, $a/b = 1$ cardioid, $1 < a/b < 2$ dimple, $a/b \\ge 2$ convex", correct: true, explain: "This is the standard ratio classification." },
        { text: "$a/b < 1$ convex, $a/b \\ge 2$ loop", explain: "That reverses the loop and convex cases." },
        { text: "$a/b = 1$ rose", explain: "$a = b$ is the cardioid, not a rose." },
        { text: "$a/b < 1$ dimple, $1 < a/b < 2$ loop", explain: "A loop needs $a < b$, and a dimple needs $1 < a/b < 2$." },
      ],
    },
  ],
};
