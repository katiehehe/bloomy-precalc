import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Evaluating inverse trig".
 * Grounded in the lesson: every inverse answers from a fixed principal-value
 * range, arcsin from [-pi/2, pi/2], arccos from [0, pi], arctan from
 * (-pi/2, pi/2). Arcsin and arccos accept only [-1, 1] while arctan accepts any
 * real. Negatives send arcsin and arctan below zero but push arccos up into
 * quadrant II. Distractors are the classic range, sign, and domain traps.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-range-sin",
      prompt: "Which interval is the principal-value range of $\\arcsin$?",
      choices: [
        { text: "$[0, \\pi]$", explain: "That is the range of $\\arccos$, not $\\arcsin$. Sine needs the right half of the circle, not the top half." },
        { text: "$\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$", correct: true, explain: "Correct. $\\arcsin$ answers from quadrants IV and I, where sine climbs from $-1$ to $1$ exactly once." },
        { text: "$[0, 2\\pi]$", explain: "A full turn repeats every sine value, so a function could not pick one output. The band must be half as wide." },
        { text: "$\\left(-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right)$", explain: "Those open endpoints belong to $\\arctan$. Arcsine includes $\\pm\\tfrac{\\pi}{2}$ because $\\sin\\!\\left(\\pm\\tfrac{\\pi}{2}\\right)=\\pm 1$ is defined." },
      ],
    },
    {
      id: "c-range-cos",
      prompt: "Which interval is the principal-value range of $\\arccos$?",
      choices: [
        { text: "$[0, \\pi]$", correct: true, explain: "Correct. $\\arccos$ answers from quadrants I and II, where cosine falls from $1$ to $-1$ exactly once." },
        { text: "$\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$", explain: "That is arcsine's range. On the right half cosine is never negative, so it could not return every value." },
        { text: "$[-\\pi, \\pi]$", explain: "This double-wide band would repeat cosine values, so a function could not choose one output." },
        { text: "$[0, 2\\pi]$", explain: "A full turn repeats every cosine value. The band must be half as wide, just the top half." },
      ],
    },
    {
      id: "c-dom-tan",
      prompt: "Which inputs are allowed for $\\arctan x$?",
      choices: [
        { text: "only $x$ in $[-1, 1]$", explain: "That domain belongs to $\\arcsin$ and $\\arccos$. Tangent can be any size, so its inverse accepts any input." },
        { text: "only $x \\ge 0$", explain: "Tangent takes negative values too, so $\\arctan$ accepts negatives and returns a negative angle." },
        { text: "every real number", correct: true, explain: "Correct. Tangent ranges over all reals, so $\\arctan$ accepts any input and returns an angle in $\\left(-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right)$." },
        { text: "only $\\left(-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right)$", explain: "That interval is arctangent's output range, not its input domain. Do not mix the two." },
      ],
    },
    {
      id: "c-sin-half",
      prompt: "$\\arcsin\\!\\left(\\tfrac12\\right) =$",
      choices: [
        { text: "$\\dfrac{\\pi}{3}$", explain: "That is $\\arcsin\\!\\left(\\tfrac{\\sqrt3}{2}\\right)$. You swapped the $30^\\circ$ and $60^\\circ$ values." },
        { text: "$\\dfrac{5\\pi}{6}$", explain: "Its sine is also $\\tfrac12$, but $\\tfrac{5\\pi}{6}$ sits in quadrant II, outside the arcsine range." },
        { text: "$\\dfrac{\\pi}{4}$", explain: "That is $\\arcsin\\!\\left(\\tfrac{\\sqrt2}{2}\\right)$. The input here is $\\tfrac12$, not $\\tfrac{\\sqrt2}{2}$." },
        { text: "$\\dfrac{\\pi}{6}$", correct: true, explain: "Correct. $\\sin\\tfrac{\\pi}{6}=\\tfrac12$ and $\\tfrac{\\pi}{6}$ is inside $\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$." },
      ],
    },
    {
      id: "c-cos-half",
      prompt: "$\\arccos\\!\\left(\\tfrac12\\right) =$",
      choices: [
        { text: "$\\dfrac{\\pi}{6}$", explain: "That is the angle whose cosine is $\\tfrac{\\sqrt3}{2}$. You swapped the $30^\\circ$ and $60^\\circ$ values." },
        { text: "$\\dfrac{\\pi}{3}$", correct: true, explain: "Correct. $\\cos\\tfrac{\\pi}{3}=\\tfrac12$ and $\\tfrac{\\pi}{3}$ is inside $[0, \\pi]$." },
        { text: "$\\dfrac{2\\pi}{3}$", explain: "That is $\\arccos\\!\\left(-\\tfrac12\\right)$. The input here is positive, so the angle is acute." },
        { text: "$-\\dfrac{\\pi}{3}$", explain: "$\\arccos$ never returns a negative angle. Its outputs live in $[0, \\pi]$." },
      ],
    },
    {
      id: "c-tan-one",
      prompt: "$\\arctan(1) =$",
      choices: [
        { text: "$\\dfrac{\\pi}{2}$", explain: "Tangent is undefined at $\\tfrac{\\pi}{2}$, so it can never be the answer. It is also an open endpoint of the range." },
        { text: "$\\dfrac{\\pi}{3}$", explain: "That is $\\arctan\\!\\left(\\sqrt3\\right)$. The input here is $1$, not $\\sqrt3$." },
        { text: "$\\dfrac{\\pi}{4}$", correct: true, explain: "Correct. $\\tan\\tfrac{\\pi}{4}=1$ and $\\tfrac{\\pi}{4}$ is inside $\\left(-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right)$." },
        { text: "$\\dfrac{5\\pi}{4}$", explain: "Its tangent is also $1$, but $\\tfrac{5\\pi}{4}$ is far outside the arctangent range." },
      ],
    },
    {
      id: "c-sin-root3",
      prompt: "$\\arcsin\\!\\left(\\tfrac{\\sqrt3}{2}\\right) =$",
      choices: [
        { text: "$\\dfrac{\\pi}{3}$", correct: true, explain: "Correct. $\\sin\\tfrac{\\pi}{3}=\\tfrac{\\sqrt3}{2}$ and $\\tfrac{\\pi}{3}$ is inside $\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$." },
        { text: "$\\dfrac{\\pi}{6}$", explain: "That is $\\arcsin\\!\\left(\\tfrac12\\right)$. You swapped the $30^\\circ$ and $60^\\circ$ values." },
        { text: "$\\dfrac{2\\pi}{3}$", explain: "Its sine is also $\\tfrac{\\sqrt3}{2}$, but $\\tfrac{2\\pi}{3}$ is in quadrant II, outside the arcsine range." },
        { text: "$\\dfrac{\\pi}{2}$", explain: "That is $\\arcsin(1)$. The input here is $\\tfrac{\\sqrt3}{2}$, which is less than $1$." },
      ],
    },
    {
      id: "c-cos-zero",
      prompt: "$\\arccos(0) =$",
      choices: [
        { text: "$0$", explain: "That is $\\arccos(1)$. Here the cosine equals $0$, not $1$." },
        { text: "$\\pi$", explain: "That is $\\arccos(-1)$. Cosine is $0$ at a right angle, not at a straight angle." },
        { text: "$-\\dfrac{\\pi}{2}$", explain: "That is $\\arcsin(-1)$. Arccosine never returns a negative angle. It stays in $[0, \\pi]$." },
        { text: "$\\dfrac{\\pi}{2}$", correct: true, explain: "Correct. $\\cos\\tfrac{\\pi}{2}=0$ and $\\tfrac{\\pi}{2}$ is inside $[0, \\pi]$." },
      ],
    },
    {
      id: "c-sin-neg-half",
      prompt: "$\\arcsin\\!\\left(-\\tfrac12\\right) =$",
      choices: [
        { text: "$-\\dfrac{\\pi}{6}$", correct: true, explain: "Correct. A negative sine sends the angle into quadrant IV, and $-\\tfrac{\\pi}{6}$ is inside $\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$." },
        { text: "$\\dfrac{\\pi}{6}$", explain: "You dropped the sign. A negative input must give a negative angle for arcsine." },
        { text: "$\\dfrac{7\\pi}{6}$", explain: "Its sine is $-\\tfrac12$, but $\\tfrac{7\\pi}{6}$ is in quadrant III, far outside the arcsine range." },
        { text: "$\\dfrac{5\\pi}{6}$", explain: "$\\sin\\tfrac{5\\pi}{6}=+\\tfrac12$, the wrong sign, and it lies outside the range as well." },
      ],
    },
    {
      id: "c-tan-neg-one",
      prompt: "$\\arctan(-1) =$",
      choices: [
        { text: "$\\dfrac{3\\pi}{4}$", explain: "Its tangent is $-1$, but $\\tfrac{3\\pi}{4}$ is in quadrant II, outside the arctangent range." },
        { text: "$\\dfrac{\\pi}{4}$", explain: "You dropped the sign. A negative input gives a negative angle for arctangent." },
        { text: "$-\\dfrac{\\pi}{4}$", correct: true, explain: "Correct. $\\tan\\!\\left(-\\tfrac{\\pi}{4}\\right)=-1$ and it lies in $\\left(-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right)$." },
        { text: "$-\\dfrac{\\pi}{2}$", explain: "Tangent is undefined at $-\\tfrac{\\pi}{2}$, an open endpoint, so it can never be the answer." },
      ],
    },
    {
      id: "c-cos-neg-half",
      prompt: "$\\arccos\\!\\left(-\\tfrac12\\right) =$",
      choices: [
        { text: "$-\\dfrac{\\pi}{3}$", explain: "$\\arccos$ never returns a negative angle. A negative input pushes the answer up into quadrant II, not below zero." },
        { text: "$\\dfrac{2\\pi}{3}$", correct: true, explain: "Correct. The reference angle is $\\tfrac{\\pi}{3}$, and a negative cosine lands in quadrant II: $\\pi-\\tfrac{\\pi}{3}=\\tfrac{2\\pi}{3}$." },
        { text: "$\\dfrac{\\pi}{3}$", explain: "That is $\\arccos\\!\\left(\\tfrac12\\right)$. You ignored the negative sign on the input." },
        { text: "$\\dfrac{4\\pi}{3}$", explain: "Its cosine is $-\\tfrac12$, but $\\tfrac{4\\pi}{3}$ is in quadrant III, outside $[0, \\pi]$." },
      ],
    },
    {
      id: "c-sin-one",
      prompt: "$\\arcsin(1) =$",
      choices: [
        { text: "$0$", explain: "That is $\\arcsin(0)$. Here the sine equals $1$, its largest value, not $0$." },
        { text: "$\\pi$", explain: "That is where cosine is $-1$, and it is outside the arcsine range. Do not borrow arccosine's endpoint." },
        { text: "$\\dfrac{\\pi}{4}$", explain: "That is $\\arcsin\\!\\left(\\tfrac{\\sqrt2}{2}\\right)$. Sine reaches $1$ only at the top of the range." },
        { text: "$\\dfrac{\\pi}{2}$", correct: true, explain: "Correct. $\\sin\\tfrac{\\pi}{2}=1$ and $\\tfrac{\\pi}{2}$ is the top endpoint of $\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$." },
      ],
    },
    {
      id: "c-cos-neg-one",
      prompt: "$\\arccos(-1) =$",
      choices: [
        { text: "$0$", explain: "That is $\\arccos(1)$. You ignored the negative sign. Cosine is $-1$ at a straight angle." },
        { text: "$-\\pi$", explain: "$\\arccos$ never returns a negative angle. The output must stay in $[0, \\pi]$." },
        { text: "$\\pi$", correct: true, explain: "Correct. $\\cos\\pi=-1$ and $\\pi$ is the far endpoint of $[0, \\pi]$." },
        { text: "$\\dfrac{\\pi}{2}$", explain: "That is $\\arccos(0)$. Here the input is $-1$, the most negative cosine, not $0$." },
      ],
    },
    {
      id: "c-tan-root3",
      prompt: "$\\arctan\\!\\left(\\sqrt3\\right) =$",
      choices: [
        { text: "$\\dfrac{\\pi}{3}$", correct: true, explain: "Correct. $\\tan\\tfrac{\\pi}{3}=\\sqrt3$ and $\\tfrac{\\pi}{3}$ is inside $\\left(-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right)$." },
        { text: "$\\dfrac{\\pi}{6}$", explain: "That is $\\arctan\\!\\left(\\tfrac{\\sqrt3}{3}\\right)$, the reciprocal input. $\\tan\\tfrac{\\pi}{6}=\\tfrac{1}{\\sqrt3}$, not $\\sqrt3$." },
        { text: "$\\dfrac{\\pi}{2}$", explain: "Tangent is undefined at $\\tfrac{\\pi}{2}$, so it can never be an arctangent output." },
        { text: "$\\dfrac{2\\pi}{3}$", explain: "Its tangent is $-\\sqrt3$, the wrong sign, and it is outside the arctangent range." },
      ],
    },
    {
      id: "c-undef",
      prompt: "Which expression is **undefined**?",
      choices: [
        { text: "$\\arcsin\\!\\left(\\tfrac12\\right)$", explain: "This is fine: $\\tfrac12$ is inside $[-1, 1]$, and the value is $\\tfrac{\\pi}{6}$." },
        { text: "$\\arcsin(2)$", correct: true, explain: "Correct. Arcsine only accepts inputs in $[-1, 1]$, and $2$ is too large, so no angle has sine $2$." },
        { text: "$\\arctan(2)$", explain: "This is fine: arctangent accepts every real number, so $\\arctan(2)$ is a valid angle." },
        { text: "$\\arccos(-1)$", explain: "This is fine: $-1$ is inside $[-1, 1]$, and the value is $\\pi$." },
      ],
    },
  ],
  summit: [
    {
      id: "s-cos-neg-root2",
      prompt: "$\\arccos\\!\\left(-\\tfrac{\\sqrt2}{2}\\right) =$",
      choices: [
        { text: "$\\dfrac{\\pi}{4}$", explain: "That is only the reference angle. The input is negative, so the answer must open past $\\tfrac{\\pi}{2}$ into quadrant II." },
        { text: "$-\\dfrac{\\pi}{4}$", explain: "$\\arccos$ is never negative. Its outputs live in $[0, \\pi]$." },
        { text: "$\\dfrac{3\\pi}{4}$", correct: true, explain: "Correct. Reference angle $\\tfrac{\\pi}{4}$, and a negative cosine lands in quadrant II: $\\pi-\\tfrac{\\pi}{4}=\\tfrac{3\\pi}{4}$." },
        { text: "$\\dfrac{5\\pi}{4}$", explain: "Its cosine is $-\\tfrac{\\sqrt2}{2}$, but $\\tfrac{5\\pi}{4}$ is in quadrant III, outside $[0, \\pi]$." },
      ],
    },
    {
      id: "s-sin-neg-root3",
      prompt: "$\\arcsin\\!\\left(-\\tfrac{\\sqrt3}{2}\\right) =$",
      choices: [
        { text: "$-\\dfrac{\\pi}{3}$", correct: true, explain: "Correct. Reference angle $\\tfrac{\\pi}{3}$, and a negative sine gives a negative angle in quadrant IV: $-\\tfrac{\\pi}{3}$." },
        { text: "$\\dfrac{\\pi}{3}$", explain: "You dropped the sign. A negative input must give a negative angle for arcsine." },
        { text: "$\\dfrac{4\\pi}{3}$", explain: "Its sine is $-\\tfrac{\\sqrt3}{2}$, but $\\tfrac{4\\pi}{3}$ is in quadrant III, far outside the arcsine range." },
        { text: "$-\\dfrac{\\pi}{6}$", explain: "Wrong reference angle. That is $\\arcsin\\!\\left(-\\tfrac12\\right)$, not $\\arcsin\\!\\left(-\\tfrac{\\sqrt3}{2}\\right)$." },
      ],
    },
    {
      id: "s-tan-neg-root3",
      prompt: "$\\arctan\\!\\left(-\\sqrt3\\right) =$",
      choices: [
        { text: "$\\dfrac{\\pi}{3}$", explain: "You dropped the sign. A negative input gives a negative angle for arctangent." },
        { text: "$\\dfrac{2\\pi}{3}$", explain: "Its tangent is $-\\sqrt3$, but $\\tfrac{2\\pi}{3}$ is in quadrant II, outside the arctangent range." },
        { text: "$-\\dfrac{\\pi}{6}$", explain: "That is $\\arctan\\!\\left(-\\tfrac{\\sqrt3}{3}\\right)$, the reciprocal input. $\\tan\\!\\left(-\\tfrac{\\pi}{6}\\right)=-\\tfrac{1}{\\sqrt3}$." },
        { text: "$-\\dfrac{\\pi}{3}$", correct: true, explain: "Correct. Reference angle $\\tfrac{\\pi}{3}$, and a negative tangent gives a negative angle: $-\\tfrac{\\pi}{3}$, inside $\\left(-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right)$." },
      ],
    },
    {
      id: "s-cos-neg-root3",
      prompt: "$\\arccos\\!\\left(-\\tfrac{\\sqrt3}{2}\\right) =$",
      choices: [
        { text: "$\\dfrac{\\pi}{6}$", explain: "That is only the reference angle. A negative input opens the answer past $\\tfrac{\\pi}{2}$ into quadrant II." },
        { text: "$\\dfrac{5\\pi}{6}$", correct: true, explain: "Correct. Reference angle $\\tfrac{\\pi}{6}$, and a negative cosine lands in quadrant II: $\\pi-\\tfrac{\\pi}{6}=\\tfrac{5\\pi}{6}$." },
        { text: "$-\\dfrac{\\pi}{6}$", explain: "$\\arccos$ is never negative. Its outputs stay in $[0, \\pi]$." },
        { text: "$\\dfrac{7\\pi}{6}$", explain: "Its cosine is $-\\tfrac{\\sqrt3}{2}$, but $\\tfrac{7\\pi}{6}$ is in quadrant III, outside $[0, \\pi]$." },
      ],
    },
    {
      id: "s-arcsin-sin-out",
      prompt: "$\\arcsin\\!\\left(\\sin\\tfrac{5\\pi}{6}\\right) =$",
      choices: [
        { text: "$\\dfrac{\\pi}{6}$", correct: true, explain: "Correct. First $\\sin\\tfrac{5\\pi}{6}=\\tfrac12$, then $\\arcsin\\tfrac12=\\tfrac{\\pi}{6}$, the in-range angle with that sine." },
        { text: "$\\dfrac{5\\pi}{6}$", explain: "The classic trap. $\\tfrac{5\\pi}{6}$ is outside $\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$, so arcsine cannot return it. Reduce to $\\tfrac{\\pi}{6}$." },
        { text: "$\\dfrac{\\pi}{3}$", explain: "Wrong reference angle. $\\sin\\tfrac{5\\pi}{6}=\\tfrac12$, whose arcsine is $\\tfrac{\\pi}{6}$, not $\\tfrac{\\pi}{3}$." },
        { text: "$-\\dfrac{\\pi}{6}$", explain: "Sign slip. $\\sin\\tfrac{5\\pi}{6}$ is positive $\\tfrac12$, so the arcsine is $+\\tfrac{\\pi}{6}$." },
      ],
    },
    {
      id: "s-arccos-cos-out",
      prompt: "$\\arccos\\!\\left(\\cos\\tfrac{7\\pi}{6}\\right) =$",
      choices: [
        { text: "$\\dfrac{7\\pi}{6}$", explain: "The inner angle $\\tfrac{7\\pi}{6}$ is outside $[0, \\pi]$, so arccosine cannot just hand it back." },
        { text: "$\\dfrac{\\pi}{6}$", explain: "Right reference angle, wrong quadrant. $\\cos\\tfrac{7\\pi}{6}=-\\tfrac{\\sqrt3}{2}$ is negative, so the answer is in quadrant II." },
        { text: "$\\dfrac{5\\pi}{6}$", correct: true, explain: "Correct. $\\cos\\tfrac{7\\pi}{6}=-\\tfrac{\\sqrt3}{2}$, and $\\arccos\\!\\left(-\\tfrac{\\sqrt3}{2}\\right)=\\tfrac{5\\pi}{6}$, inside $[0, \\pi]$." },
        { text: "$-\\dfrac{7\\pi}{6}$", explain: "$\\arccos$ is never negative, and this value also lies outside $[0, \\pi]$." },
      ],
    },
    {
      id: "s-arctan-tan-out",
      prompt: "$\\arctan\\!\\left(\\tan\\tfrac{3\\pi}{4}\\right) =$",
      choices: [
        { text: "$\\dfrac{3\\pi}{4}$", explain: "The inner angle $\\tfrac{3\\pi}{4}$ is outside $\\left(-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right)$, so arctangent cannot just return it." },
        { text: "$-\\dfrac{\\pi}{4}$", correct: true, explain: "Correct. $\\tan\\tfrac{3\\pi}{4}=-1$, and $\\arctan(-1)=-\\tfrac{\\pi}{4}$, inside the range." },
        { text: "$\\dfrac{\\pi}{4}$", explain: "Sign slip. $\\tan\\tfrac{3\\pi}{4}=-1$, so the arctangent is negative." },
        { text: "$\\dfrac{\\pi}{2}$", explain: "Tangent is undefined at $\\tfrac{\\pi}{2}$. It is never a valid arctangent output." },
      ],
    },
    {
      id: "s-cos-arcsin",
      prompt: "$\\cos\\!\\left(\\arcsin\\tfrac{3}{5}\\right) =$",
      choices: [
        { text: "$\\dfrac{3}{5}$", explain: "That is the input $\\sin\\theta$, not $\\cos\\theta$. Build the right triangle to find the other leg." },
        { text: "$\\dfrac{5}{4}$", explain: "Reciprocal slip. Cosine is adjacent over hypotenuse, $\\tfrac{4}{5}$, not $\\tfrac{5}{4}$." },
        { text: "$-\\dfrac{4}{5}$", explain: "Wrong sign. $\\arcsin\\tfrac{3}{5}$ lands in $\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$, where cosine is positive." },
        { text: "$\\dfrac{4}{5}$", correct: true, explain: "Correct. With $\\sin\\theta=\\tfrac{3}{5}$, a $3$-$4$-$5$ triangle gives $\\cos\\theta=\\tfrac{4}{5}$, positive since $\\theta$ is in quadrant I." },
      ],
    },
    {
      id: "s-sin-arccos",
      prompt: "$\\sin\\!\\left(\\arccos\\!\\left(-\\tfrac12\\right)\\right) =$",
      choices: [
        { text: "$-\\dfrac{\\sqrt3}{2}$", explain: "Wrong sign. $\\arccos\\!\\left(-\\tfrac12\\right)=\\tfrac{2\\pi}{3}$ lies in $[0, \\pi]$, where sine is positive." },
        { text: "$-\\dfrac12$", explain: "That is the input, the cosine value, not the sine you are asked for." },
        { text: "$\\dfrac{\\sqrt3}{2}$", correct: true, explain: "Correct. $\\arccos\\!\\left(-\\tfrac12\\right)=\\tfrac{2\\pi}{3}$, and $\\sin\\tfrac{2\\pi}{3}=\\tfrac{\\sqrt3}{2}$." },
        { text: "$\\dfrac12$", explain: "Magnitude slip. $\\sin\\tfrac{2\\pi}{3}=\\tfrac{\\sqrt3}{2}$, not $\\tfrac12$." },
      ],
    },
    {
      id: "s-sin-arcsin-id",
      prompt: "$\\sin\\!\\left(\\arcsin\\tfrac{2}{5}\\right) =$",
      choices: [
        { text: "$\\dfrac{2}{5}$", correct: true, explain: "Correct. Since $\\tfrac{2}{5}$ is in $[-1, 1]$, the identity $\\sin(\\arcsin x)=x$ applies directly." },
        { text: "It is undefined.", explain: "It is defined: $\\tfrac{2}{5}$ is inside $[-1, 1]$, so the composition is just $\\tfrac{2}{5}$." },
        { text: "$\\dfrac{5}{2}$", explain: "Reciprocal slip. Sine and arcsine undo each other, returning the input $\\tfrac{2}{5}$." },
        { text: "$0$", explain: "Sine and arcsine cancel, so the result is the input $\\tfrac{2}{5}$, not $0$." },
      ],
    },
    {
      id: "s-arcsin-sin-in",
      prompt: "$\\arcsin\\!\\left(\\sin\\tfrac{\\pi}{7}\\right) =$",
      choices: [
        { text: "$\\dfrac{6\\pi}{7}$", explain: "You applied the reduction unnecessarily. That step is only needed when the inner angle is outside the range." },
        { text: "$\\dfrac{\\pi}{7}$", correct: true, explain: "Correct. $\\tfrac{\\pi}{7}$ is already inside $\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$, so arcsine returns it unchanged." },
        { text: "$\\dfrac{\\pi}{2}-\\dfrac{\\pi}{7}$", explain: "That is a cofunction move, which does not apply here. The angle is already in range." },
        { text: "It cannot be evaluated exactly.", explain: "It can: because $\\tfrac{\\pi}{7}$ is in range, the exact value is simply $\\tfrac{\\pi}{7}$." },
      ],
    },
    {
      id: "s-arccos-neg-quadrant",
      prompt: "For any input in $[-1, 0)$, the value of $\\arccos$ is:",
      choices: [
        { text: "a negative angle in quadrant IV", explain: "That describes arcsine or arctangent of a negative. Arccosine never goes negative." },
        { text: "an acute angle in quadrant I", explain: "Acute angles have positive cosine. A negative input forces an angle past $\\tfrac{\\pi}{2}$." },
        { text: "an angle in quadrant III", explain: "Quadrant III is outside $[0, \\pi]$. Arccosine stays within the top half." },
        { text: "an obtuse angle in quadrant II", correct: true, explain: "Correct. A negative cosine puts the angle between $\\tfrac{\\pi}{2}$ and $\\pi$, obtuse and in quadrant II." },
      ],
    },
    {
      id: "s-which-solution",
      prompt: "Both $\\tfrac{2\\pi}{3}$ and $\\tfrac{4\\pi}{3}$ satisfy $\\cos\\theta=-\\tfrac12$. Which one does $\\arccos\\!\\left(-\\tfrac12\\right)$ return, and why?",
      choices: [
        { text: "$\\dfrac{2\\pi}{3}$, because it is the solution inside $[0, \\pi]$", correct: true, explain: "Correct. Arccosine reports the one solution in its range $[0, \\pi]$, and $\\tfrac{2\\pi}{3}$ qualifies." },
        { text: "$\\dfrac{4\\pi}{3}$, because it is the solution inside $[0, \\pi]$", explain: "$\\tfrac{4\\pi}{3}$ is in quadrant III, outside $[0, \\pi]$, so it cannot be the arccosine value." },
        { text: "$\\dfrac{4\\pi}{3}$, because arccosine prefers larger angles", explain: "There is no preference for larger angles. The rule is simply to stay inside $[0, \\pi]$." },
        { text: "both, since each has cosine $-\\tfrac12$", explain: "A function returns exactly one output, so arccosine must choose the in-range angle." },
      ],
    },
    {
      id: "s-undef",
      prompt: "Which expression is **undefined**?",
      choices: [
        { text: "$\\arctan(500)$", explain: "This is fine: arctangent accepts every real number, no matter how large." },
        { text: "$\\arccos(-1)$", explain: "This is fine: $-1$ is inside $[-1, 1]$, and the value is $\\pi$." },
        { text: "$\\arccos\\!\\left(\\tfrac{3}{2}\\right)$", correct: true, explain: "Correct. Arccosine only accepts inputs in $[-1, 1]$, and $\\tfrac{3}{2}>1$, so no angle has cosine $\\tfrac{3}{2}$." },
        { text: "$\\arcsin(-1)$", explain: "This is fine: $-1$ is inside $[-1, 1]$, and the value is $-\\tfrac{\\pi}{2}$." },
      ],
    },
    {
      id: "s-sin-arcsin-undef",
      prompt: "$\\sin\\!\\left(\\arcsin(2)\\right) =$",
      choices: [
        { text: "$2$", explain: "Tempting, but the identity $\\sin(\\arcsin x)=x$ only holds for $x$ in $[-1, 1]$. Here the inside is undefined first." },
        { text: "It is undefined, since $2$ is outside $[-1, 1]$.", correct: true, explain: "Correct. $\\arcsin(2)$ does not exist because $2$ is outside the domain, so the whole expression is undefined." },
        { text: "$1$", explain: "There is no clamping to $1$. Since $\\arcsin(2)$ is undefined, nothing downstream can be evaluated." },
        { text: "$0$", explain: "The expression never gets off the ground: $\\arcsin(2)$ is undefined, so there is no value." },
      ],
    },
  ],
};
