import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Special angles".
 * Grounded in the lesson: axis points and the four undefined cases, the
 * reciprocal identities tan = sin/cos, sec = 1/cos, csc = 1/sin, cot = cos/sin,
 * the 45-45-90 and 30-60-90 scalings to hypotenuse 1, and the signed copies
 * around the full circle. Distractors are the classic traps: swapping sine and
 * cosine, mixing up √2/2 with √3/2, dropping a quadrant sign, and treating a
 * zero denominator as if the ratio were 0 or 1.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-point0",
      prompt: "The point on the unit circle at $0^\\circ$ is:",
      choices: [
        { text: "$(1, 0)$", correct: true, explain: "The terminal side lies on the positive $x$-axis, so $\\cos 0^\\circ = 1$ and $\\sin 0^\\circ = 0$." },
        { text: "$(0, 1)$", explain: "That is $90^\\circ$, straight up. At $0^\\circ$ the point is $(1, 0)$." },
        { text: "$(-1, 0)$", explain: "That is $180^\\circ$. At $0^\\circ$ the point is $(1, 0)$." },
        { text: "$(0, 0)$", explain: "The origin is the center, not a point on the circle. At $0^\\circ$ the point is $(1, 0)$." },
      ],
    },
    {
      id: "c-sin90",
      prompt: "What is $\\sin 90^\\circ$?",
      choices: [
        { text: "$1$", correct: true, explain: "At $90^\\circ$ the point is $(0, 1)$, so the $y$-coordinate $\\sin 90^\\circ$ is $1$." },
        { text: "$0$", explain: "That is $\\cos 90^\\circ$, the $x$-coordinate. Sine is the height $1$." },
        { text: "$-1$", explain: "Sine is $-1$ at $270^\\circ$. At $90^\\circ$ it is $1$." },
        { text: "$\\tfrac{\\sqrt{2}}{2}$", explain: "That is the $45^\\circ$ value. At $90^\\circ$, sine is $1$." },
      ],
    },
    {
      id: "c-sin180",
      prompt: "What is $\\sin 180^\\circ$?",
      choices: [
        { text: "$0$", correct: true, explain: "At $180^\\circ$ the point is $(-1, 0)$, so its height is $0$." },
        { text: "$-1$", explain: "That is $\\cos 180^\\circ$. Sine is the $y$-coordinate, which is $0$." },
        { text: "$1$", explain: "Sine is $1$ at $90^\\circ$. At $180^\\circ$ the height is $0$." },
        { text: "$\\tfrac12$", explain: "The point at $180^\\circ$ is $(-1, 0)$, so $\\sin 180^\\circ = 0$." },
      ],
    },
    {
      id: "c-point270",
      prompt: "The point on the unit circle at $270^\\circ$ is:",
      choices: [
        { text: "$(0, -1)$", correct: true, explain: "The terminal side points straight down, so $\\cos 270^\\circ = 0$ and $\\sin 270^\\circ = -1$." },
        { text: "$(0, 1)$", explain: "That is $90^\\circ$, pointing up. $270^\\circ$ points down to $(0, -1)$." },
        { text: "$(-1, 0)$", explain: "That is $180^\\circ$. At $270^\\circ$ the point is $(0, -1)$." },
        { text: "$(1, 0)$", explain: "That is $0^\\circ$. At $270^\\circ$ the point is $(0, -1)$." },
      ],
    },
    {
      id: "c-360",
      prompt: "Why do $360^\\circ$ and $0^\\circ$ have the same sine and cosine?",
      choices: [
        { text: "they name the same point $(1, 0)$", correct: true, explain: "A full turn returns the terminal side to the positive $x$-axis, so both angles read $(1, 0)$." },
        { text: "every angle has the same sine and cosine", explain: "Sine and cosine change with the angle. These two agree because they are the same position." },
        { text: "a full turn changes the radius", explain: "The radius stays $1$. The point is the same because the terminal side has come back." },
        { text: "$360^\\circ$ is undefined", explain: "$360^\\circ$ is an ordinary angle. It is just another name for the $0^\\circ$ point." },
      ],
    },
    {
      id: "c-tan-def",
      prompt: "By definition, $\\tan\\theta$ equals:",
      choices: [
        { text: "$\\dfrac{\\sin\\theta}{\\cos\\theta}$", correct: true, explain: "Tangent is the ratio of sine to cosine, and it is undefined when cosine is $0$." },
        { text: "$\\dfrac{\\cos\\theta}{\\sin\\theta}$", explain: "That is $\\cot\\theta$. Tangent is sine over cosine." },
        { text: "$\\dfrac{1}{\\cos\\theta}$", explain: "That is $\\sec\\theta$. Tangent is $\\sin\\theta/\\cos\\theta$." },
        { text: "$\\dfrac{1}{\\sin\\theta}$", explain: "That is $\\csc\\theta$. Tangent is $\\sin\\theta/\\cos\\theta$." },
      ],
    },
    {
      id: "c-sec-def",
      prompt: "By definition, $\\sec\\theta$ equals:",
      choices: [
        { text: "$\\dfrac{1}{\\cos\\theta}$", correct: true, explain: "Secant is the reciprocal of cosine, undefined wherever cosine is $0$." },
        { text: "$\\dfrac{1}{\\sin\\theta}$", explain: "That is $\\csc\\theta$. Secant is $1/\\cos\\theta$." },
        { text: "$\\dfrac{\\sin\\theta}{\\cos\\theta}$", explain: "That is $\\tan\\theta$. Secant is $1/\\cos\\theta$." },
        { text: "$\\cos\\theta$", explain: "Secant is the reciprocal of cosine, not cosine itself." },
      ],
    },
    {
      id: "c-undef90",
      prompt: "Which two functions are undefined at $90^\\circ$?",
      choices: [
        { text: "$\\tan\\theta$ and $\\sec\\theta$", correct: true, explain: "Both divide by $\\cos 90^\\circ = 0$, so both are undefined." },
        { text: "$\\sin\\theta$ and $\\cos\\theta$", explain: "Those two are $1$ and $0$. The undefined pair is tangent and secant." },
        { text: "$\\csc\\theta$ and $\\cot\\theta$", explain: "Those two divide by sine, which is $1$ at $90^\\circ$, so both are defined." },
        { text: "$\\sec\\theta$ and $\\csc\\theta$", explain: "Cosecant is $1$ at $90^\\circ$. Tangent is the partner of secant that is undefined." },
      ],
    },
    {
      id: "c-tan0",
      prompt: "What is $\\tan 0^\\circ$?",
      choices: [
        { text: "$0$", correct: true, explain: "$\\tan 0^\\circ = \\sin 0^\\circ / \\cos 0^\\circ = 0/1 = 0$." },
        { text: "undefined", explain: "The undefined pair at $0^\\circ$ is $\\csc$ and $\\cot$, which divide by sine $0$. Tangent is $0$." },
        { text: "$1$", explain: "Tangent is $1$ at $45^\\circ$. At $0^\\circ$ it is $0/1 = 0$." },
        { text: "$-1$", explain: "Sine is $0$ and cosine is $1$, so the ratio is $0$, not $-1$." },
      ],
    },
    {
      id: "c-point45",
      prompt: "The point on the unit circle at $45^\\circ$ is:",
      choices: [
        { text: "$\\left(\\tfrac{\\sqrt{2}}{2}, \\tfrac{\\sqrt{2}}{2}\\right)$", correct: true, explain: "Equal legs give $\\cos 45^\\circ = \\sin 45^\\circ = \\tfrac{\\sqrt{2}}{2}$." },
        { text: "$\\left(\\tfrac12, \\tfrac{\\sqrt{3}}{2}\\right)$", explain: "That is the $60^\\circ$ point. At $45^\\circ$ the two coordinates are equal." },
        { text: "$\\left(\\tfrac{\\sqrt{3}}{2}, \\tfrac12\\right)$", explain: "That is the $30^\\circ$ point. At $45^\\circ$ both coordinates equal $\\tfrac{\\sqrt{2}}{2}$." },
        { text: "$(1, 1)$", explain: "That point is off the unit circle. The $45^\\circ$ point is $\\left(\\tfrac{\\sqrt{2}}{2}, \\tfrac{\\sqrt{2}}{2}\\right)$." },
      ],
    },
    {
      id: "c-sin30",
      prompt: "What is $\\sin 30^\\circ$?",
      choices: [
        { text: "$\\tfrac12$", correct: true, explain: "At $30^\\circ$ the height is the short leg of the scaled $30^\\circ$-$60^\\circ$-$90^\\circ$ triangle, $\\tfrac12$." },
        { text: "$\\tfrac{\\sqrt{3}}{2}$", explain: "That is $\\cos 30^\\circ$. The height $\\sin 30^\\circ$ is $\\tfrac12$." },
        { text: "$\\tfrac{\\sqrt{2}}{2}$", explain: "That is the $45^\\circ$ value. At $30^\\circ$, sine is $\\tfrac12$." },
        { text: "$0$", explain: "Sine is $0$ at $0^\\circ$. At $30^\\circ$ it is $\\tfrac12$." },
      ],
    },
    {
      id: "c-cos60",
      prompt: "What is $\\cos 60^\\circ$?",
      choices: [
        { text: "$\\tfrac12$", correct: true, explain: "At $60^\\circ$ the base is the short leg of the $30^\\circ$-$60^\\circ$-$90^\\circ$ triangle, $\\tfrac12$." },
        { text: "$\\tfrac{\\sqrt{3}}{2}$", explain: "That is $\\sin 60^\\circ$, the height. The base $\\cos 60^\\circ$ is $\\tfrac12$." },
        { text: "$\\tfrac{\\sqrt{2}}{2}$", explain: "That is the value at $45^\\circ$. At $60^\\circ$, cosine is $\\tfrac12$." },
        { text: "$1$", explain: "Cosine is $1$ only at $0^\\circ$. At $60^\\circ$ it is $\\tfrac12$." },
      ],
    },
    {
      id: "c-tan45",
      prompt: "What is $\\tan 45^\\circ$?",
      choices: [
        { text: "$1$", correct: true, explain: "Sine and cosine are equal at $45^\\circ$, so their ratio is $1$." },
        { text: "$\\tfrac{\\sqrt{2}}{2}$", explain: "That is sine (and cosine) at $45^\\circ$, not their ratio. The ratio is $1$." },
        { text: "$\\sqrt{2}$", explain: "That is $\\sec 45^\\circ$. Tangent is $(\\sqrt{2}/2)/(\\sqrt{2}/2) = 1$." },
        { text: "undefined", explain: "Cosine is not zero at $45^\\circ$, so tangent is defined and equals $1$." },
      ],
    },
    {
      id: "c-scale45",
      prompt: "A $45^\\circ$-$45^\\circ$-$90^\\circ$ triangle with legs $1$ and $1$ has hypotenuse $\\sqrt{2}$. After every side is divided by $\\sqrt{2}$, each leg equals:",
      choices: [
        { text: "$\\tfrac{\\sqrt{2}}{2}$", correct: true, explain: "$1/\\sqrt{2}$ rationalizes to $\\sqrt{2}/2$ by multiplying the top and the bottom by $\\sqrt{2}$." },
        { text: "$\\tfrac12$", explain: "That is the short $30^\\circ$-$60^\\circ$-$90^\\circ$ leg after dividing by $2$. Here we divide by $\\sqrt{2}$." },
        { text: "$\\sqrt{2}$", explain: "That was the old hypotenuse. After dividing by $\\sqrt{2}$ the hypotenuse is $1$ and each leg is $\\sqrt{2}/2$." },
        { text: "$1$", explain: "The legs become $1/\\sqrt{2} = \\sqrt{2}/2$, not $1$. The hypotenuse becomes $1$." },
      ],
    },
    {
      id: "c-csc30",
      prompt: "What is $\\csc 30^\\circ$?",
      choices: [
        { text: "$2$", correct: true, explain: "$\\csc 30^\\circ = 1/\\sin 30^\\circ = 1/(1/2) = 2$." },
        { text: "$\\tfrac12$", explain: "That is $\\sin 30^\\circ$. Cosecant is the reciprocal, $2$." },
        { text: "$\\tfrac{2\\sqrt{3}}{3}$", explain: "That is $\\sec 30^\\circ$. Cosecant uses sine, so it is $2$." },
        { text: "undefined", explain: "Sine is $1/2$, not $0$, so cosecant is defined and equals $2$." },
      ],
    },
  ],
  summit: [
    {
      id: "s-csc0",
      prompt: "Why is $\\csc 0^\\circ$ undefined?",
      choices: [
        { text: "its definition divides by $\\sin 0^\\circ = 0$", correct: true, explain: "$\\csc\\theta = 1/\\sin\\theta$, and sine is $0$ at $0^\\circ$." },
        { text: "cosine is $0$ at $0^\\circ$", explain: "Cosine is $1$ at $0^\\circ$. The zero in the denominator is sine." },
        { text: "the radius is $0$ at $0^\\circ$", explain: "The radius stays $1$. Cosecant fails because it divides by sine $0$." },
        { text: "tangent is $0$ there", explain: "Tangent being $0$ does not make cosecant undefined. The cause is $\\sin 0^\\circ = 0$." },
      ],
    },
    {
      id: "s-sec180",
      prompt: "What is $\\sec 180^\\circ$?",
      choices: [
        { text: "$-1$", correct: true, explain: "$\\sec 180^\\circ = 1/\\cos 180^\\circ = 1/(-1) = -1$." },
        { text: "$1$", explain: "That is $\\sec 0^\\circ$. At $180^\\circ$ cosine is $-1$, so secant is $-1$." },
        { text: "$0$", explain: "Secant is $1$ over cosine, not cosine itself. Here it is $1/(-1) = -1$." },
        { text: "undefined", explain: "Cosine is $-1$, not $0$, so secant is defined and equals $-1$." },
      ],
    },
    {
      id: "s-tan270",
      prompt: "What is $\\tan 270^\\circ$?",
      choices: [
        { text: "undefined", correct: true, explain: "$\\tan\\theta = \\sin\\theta/\\cos\\theta$ and $\\cos 270^\\circ = 0$, so the ratio is undefined." },
        { text: "$0$", explain: "That would require sine to be $0$. At $270^\\circ$ sine is $-1$ and cosine is $0$." },
        { text: "$-1$", explain: "That is $\\sin 270^\\circ$, not the ratio. The ratio divides by zero." },
        { text: "$1$", explain: "Tangent is $1$ when sine and cosine are equal and nonzero. Here cosine is $0$." },
      ],
    },
    {
      id: "s-cot90",
      prompt: "What is $\\cot 90^\\circ$?",
      choices: [
        { text: "$0$", correct: true, explain: "$\\cot 90^\\circ = \\cos 90^\\circ / \\sin 90^\\circ = 0/1 = 0$." },
        { text: "undefined", explain: "Cotangent divides by sine, which is $1$ at $90^\\circ$. Tangent is the undefined one." },
        { text: "$1$", explain: "Cosine is $0$ and sine is $1$, so the ratio is $0$, not $1$." },
        { text: "$-1$", explain: "The coordinates are $(0, 1)$, so $\\cot = 0/1 = 0$." },
      ],
    },
    {
      id: "s-cos30",
      prompt: "What is $\\cos 30^\\circ$?",
      choices: [
        { text: "$\\tfrac{\\sqrt{3}}{2}$", correct: true, explain: "At $30^\\circ$ the base is the long leg of the scaled $30^\\circ$-$60^\\circ$-$90^\\circ$ triangle, $\\tfrac{\\sqrt{3}}{2}$." },
        { text: "$\\tfrac12$", explain: "That is $\\sin 30^\\circ$, the height. The base $\\cos 30^\\circ$ is $\\tfrac{\\sqrt{3}}{2}$." },
        { text: "$\\tfrac{\\sqrt{2}}{2}$", explain: "That is the $45^\\circ$ value. At $30^\\circ$, cosine is $\\tfrac{\\sqrt{3}}{2}$." },
        { text: "$\\tfrac{\\sqrt{3}}{3}$", explain: "That is $\\tan 30^\\circ$. On the unit circle $\\cos 30^\\circ = \\tfrac{\\sqrt{3}}{2}$." },
      ],
    },
    {
      id: "s-point30",
      prompt: "The point on the unit circle at $30^\\circ$ is:",
      choices: [
        { text: "$\\left(\\tfrac{\\sqrt{3}}{2}, \\tfrac12\\right)$", correct: true, explain: "The base is $\\cos 30^\\circ = \\tfrac{\\sqrt{3}}{2}$ and the height is $\\sin 30^\\circ = \\tfrac12$." },
        { text: "$\\left(\\tfrac12, \\tfrac{\\sqrt{3}}{2}\\right)$", explain: "That swaps the coordinates. It is the $60^\\circ$ point, not $30^\\circ$." },
        { text: "$\\left(\\tfrac{\\sqrt{2}}{2}, \\tfrac{\\sqrt{2}}{2}\\right)$", explain: "Equal coordinates occur at $45^\\circ$, not $30^\\circ$." },
        { text: "$\\left(\\tfrac12, \\tfrac12\\right)$", explain: "That point is not on the unit circle. At $30^\\circ$ it is $\\left(\\tfrac{\\sqrt{3}}{2}, \\tfrac12\\right)$." },
      ],
    },
    {
      id: "s-swap",
      prompt: "Why do the coordinates at $30^\\circ$ and $60^\\circ$ swap, giving $\\left(\\tfrac{\\sqrt{3}}{2}, \\tfrac12\\right)$ and $\\left(\\tfrac12, \\tfrac{\\sqrt{3}}{2}\\right)$?",
      choices: [
        { text: "the short leg always faces the smaller angle, so the roles of base and height trade", correct: true, explain: "The $30^\\circ$ and $60^\\circ$ triangles are the same shape with the acute angles swapped, so the short leg $\\tfrac12$ is the height at $30^\\circ$ and the base at $60^\\circ$." },
        { text: "sine and cosine are always equal", explain: "They are equal only at $45^\\circ$. Here they swap values between the two angles." },
        { text: "the radius changes between them", explain: "The radius stays $1$. Only which leg is base versus height changes." },
        { text: "the angles are coterminal", explain: "$30^\\circ$ and $60^\\circ$ are different terminal sides, not coterminal. The legs simply trade roles." },
      ],
    },
    {
      id: "s-point-to-angle",
      prompt: "A terminal side meets the unit circle at $\\left(-\\tfrac{\\sqrt{2}}{2}, \\tfrac{\\sqrt{2}}{2}\\right)$. The angle is:",
      choices: [
        { text: "$135^\\circ$", correct: true, explain: "Equal magnitudes $\\tfrac{\\sqrt{2}}{2}$ with negative $x$ and positive $y$ put the point in Quadrant II at $135^\\circ$." },
        { text: "$45^\\circ$", explain: "$45^\\circ$ has both coordinates positive. The negative $x$ here means Quadrant II, $135^\\circ$." },
        { text: "$225^\\circ$", explain: "$225^\\circ$ has both coordinates negative. Here $y$ is positive, so it is $135^\\circ$." },
        { text: "$315^\\circ$", explain: "$315^\\circ$ has positive $x$ and negative $y$. This point is $135^\\circ$." },
      ],
    },
    {
      id: "s-tan135",
      prompt: "What is $\\tan 135^\\circ$?",
      choices: [
        { text: "$-1$", correct: true, explain: "$\\tan 135^\\circ = (\\sqrt{2}/2)/(-\\sqrt{2}/2) = -1$." },
        { text: "$1$", explain: "The lengths are equal, but cosine is negative in Quadrant II, so the ratio is $-1$." },
        { text: "$-\\tfrac{\\sqrt{2}}{2}$", explain: "That is cosine at $135^\\circ$, not the ratio of sine to cosine." },
        { text: "undefined", explain: "Cosine is $-\\sqrt{2}/2$, not $0$, so tangent is defined and equals $-1$." },
      ],
    },
    {
      id: "s-tan30",
      prompt: "What is $\\tan 30^\\circ$?",
      choices: [
        { text: "$\\tfrac{\\sqrt{3}}{3}$", correct: true, explain: "$(1/2)/(\\sqrt{3}/2) = 1/\\sqrt{3}$, which rationalizes to $\\sqrt{3}/3$." },
        { text: "$\\sqrt{3}$", explain: "That is $\\tan 60^\\circ$. At $30^\\circ$ the ratio is the reciprocal, $\\sqrt{3}/3$." },
        { text: "$\\tfrac12$", explain: "That is $\\sin 30^\\circ$. Tangent is sine over cosine, $\\sqrt{3}/3$." },
        { text: "$\\tfrac{\\sqrt{3}}{2}$", explain: "That is $\\cos 30^\\circ$. The ratio of the two legs is $\\sqrt{3}/3$." },
      ],
    },
    {
      id: "s-point150",
      prompt: "The point on the unit circle at $150^\\circ$ is:",
      choices: [
        { text: "$\\left(-\\tfrac{\\sqrt{3}}{2}, \\tfrac12\\right)$", correct: true, explain: "The reference angle is $30^\\circ$, and Quadrant II makes only cosine negative." },
        { text: "$\\left(-\\tfrac12, \\tfrac{\\sqrt{3}}{2}\\right)$", explain: "That is the $120^\\circ$ point, whose reference angle is $60^\\circ$." },
        { text: "$\\left(\\tfrac{\\sqrt{3}}{2}, \\tfrac12\\right)$", explain: "That is $30^\\circ$. At $150^\\circ$ the $x$-coordinate is negative." },
        { text: "$\\left(-\\tfrac{\\sqrt{3}}{2}, -\\tfrac12\\right)$", explain: "That is $210^\\circ$ in Quadrant III. At $150^\\circ$ sine stays positive." },
      ],
    },
    {
      id: "s-point120",
      prompt: "The point on the unit circle at $120^\\circ$ is:",
      choices: [
        { text: "$\\left(-\\tfrac12, \\tfrac{\\sqrt{3}}{2}\\right)$", correct: true, explain: "The reference angle is $60^\\circ$, and Quadrant II flips the sign of cosine." },
        { text: "$\\left(-\\tfrac{\\sqrt{3}}{2}, \\tfrac12\\right)$", explain: "That is $150^\\circ$, whose reference angle is $30^\\circ$." },
        { text: "$\\left(\\tfrac12, \\tfrac{\\sqrt{3}}{2}\\right)$", explain: "That is $60^\\circ$. At $120^\\circ$ the $x$-coordinate is negative." },
        { text: "$\\left(-\\tfrac12, -\\tfrac{\\sqrt{3}}{2}\\right)$", explain: "That is $240^\\circ$ in Quadrant III. At $120^\\circ$ sine stays positive." },
      ],
    },
    {
      id: "s-sec240",
      prompt: "What is $\\sec 240^\\circ$?",
      choices: [
        { text: "$-2$", correct: true, explain: "At $240^\\circ$ cosine is $-1/2$, so $\\sec 240^\\circ = 1/(-1/2) = -2$." },
        { text: "$2$", explain: "That drops the Quadrant III sign. Cosine is negative, so secant is $-2$." },
        { text: "$-\\tfrac12$", explain: "That is cosine at $240^\\circ$. Secant is the reciprocal, $-2$." },
        { text: "undefined", explain: "Cosine is $-1/2$, not $0$, so secant is defined and equals $-2$." },
      ],
    },
    {
      id: "s-sec45",
      prompt: "What is $\\sec 45^\\circ$?",
      choices: [
        { text: "$\\sqrt{2}$", correct: true, explain: "$\\sec 45^\\circ = 1/(\\sqrt{2}/2) = 2/\\sqrt{2} = \\sqrt{2}$." },
        { text: "$\\tfrac{\\sqrt{2}}{2}$", explain: "That is cosine at $45^\\circ$. Secant is the reciprocal, $\\sqrt{2}$." },
        { text: "$1$", explain: "Secant is $1$ at $0^\\circ$. At $45^\\circ$ it is $1$ over $\\sqrt{2}/2$, which is $\\sqrt{2}$." },
        { text: "$2$", explain: "That is $\\sec 60^\\circ$. At $45^\\circ$ secant is $\\sqrt{2}$." },
      ],
    },
    {
      id: "s-ref210",
      prompt: "The reference angle of $210^\\circ$ is $30^\\circ$. The point is therefore:",
      choices: [
        { text: "$\\left(-\\tfrac{\\sqrt{3}}{2}, -\\tfrac12\\right)$", correct: true, explain: "The $30^\\circ$ lengths with both Quadrant III signs negative." },
        { text: "$\\left(\\tfrac{\\sqrt{3}}{2}, \\tfrac12\\right)$", explain: "Those are the $30^\\circ$ signs. $210^\\circ$ is in Quadrant III, so both signs flip." },
        { text: "$\\left(-\\tfrac12, -\\tfrac{\\sqrt{3}}{2}\\right)$", explain: "Those are the $60^\\circ$ lengths. The reference angle is $30^\\circ$, not $60^\\circ$." },
        { text: "$\\left(-\\tfrac{\\sqrt{3}}{2}, \\tfrac12\\right)$", explain: "That keeps sine positive, which is Quadrant II ($150^\\circ$), not III." },
      ],
    },
  ],
};
