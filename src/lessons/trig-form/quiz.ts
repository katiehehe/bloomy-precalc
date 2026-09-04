import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Trig form".
 * Grounded in the lesson: trig (polar) form is $z = r(\cos\theta + i\sin\theta)$,
 * where $r = \sqrt{a^2+b^2}$ multiplies both terms and the $i$ is on the sine
 * term only. Rectangular to trig uses $r$ and a quadrant-correct $\theta$; trig
 * to rectangular uses $a = r\cos\theta$ and $b = r\sin\theta$.
 * Distractors are the classic traps: dropping the $i$ on sine, swapping sine and
 * cosine, forgetting $r$ multiplies both terms, using the wrong-quadrant angle,
 * and mixing degrees with radians.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-id-modulus",
      prompt: "In $z = 5(\\cos 40^\\circ + i\\sin 40^\\circ)$, what is the modulus $r$?",
      choices: [
        { text: "$5$", correct: true, explain: "The modulus is the factor multiplying the parentheses: $r = 5$." },
        { text: "$40^\\circ$", explain: "That is the argument $\\theta$, the angle, not the modulus $r$." },
        { text: "$\\sin 40^\\circ$", explain: "That is a term inside the parentheses, not the modulus out front." },
        { text: "$5\\cos 40^\\circ$", explain: "That is the real part $a = r\\cos\\theta$, not the modulus itself." },
      ],
    },
    {
      id: "c-id-argument",
      prompt: "In $z = 3(\\cos 210^\\circ + i\\sin 210^\\circ)$, what is the argument $\\theta$?",
      choices: [
        { text: "$3$", explain: "That is the modulus $r$ (the length), not the angle." },
        { text: "$\\sin 210^\\circ$", explain: "That is a term inside. The argument is the angle $210^\\circ$." },
        { text: "$210^\\circ$", correct: true, explain: "The argument is the angle inside the cosine and sine: $\\theta = 210^\\circ$." },
        { text: "$30^\\circ$", explain: "$30^\\circ$ is only the reference angle. The argument written here is $210^\\circ$." },
      ],
    },
    {
      id: "c-structure",
      prompt: "Which expression is the trigonometric (polar) form of a complex number?",
      choices: [
        { text: "$r(\\cos\\theta + \\sin\\theta)$", explain: "This drops the $i$. The sine term must be multiplied by $i$." },
        { text: "$r(\\sin\\theta + i\\cos\\theta)$", explain: "This swaps the functions. Cosine comes first, then $i\\sin\\theta$." },
        { text: "$r\\cos\\theta + i\\sin\\theta$", explain: "Here $r$ multiplies only the cosine. It must multiply both terms." },
        { text: "$r(\\cos\\theta + i\\sin\\theta)$", correct: true, explain: "The $r$ multiplies both terms and the $i$ is on the sine only." },
      ],
    },
    {
      id: "c-i-on-sine",
      prompt: "In $r(\\cos\\theta + i\\sin\\theta)$, which part does the $i$ multiply?",
      choices: [
        { text: "The cosine term only.", explain: "The $i$ is written in front of $\\sin\\theta$, not $\\cos\\theta$." },
        { text: "The sine term only.", correct: true, explain: "It is $\\cos\\theta + i\\sin\\theta$: the $i$ multiplies $\\sin\\theta$ alone." },
        { text: "Both the cosine and the sine.", explain: "Only the sine has the $i$. The cosine is the real part." },
        { text: "The modulus $r$.", explain: "The $i$ is inside the parentheses on the sine term, not on $r$." },
      ],
    },
    {
      id: "c-eval-0",
      prompt: "Evaluate $2(\\cos 0^\\circ + i\\sin 0^\\circ)$.",
      choices: [
        { text: "$2i$", explain: "That needs $\\sin 0^\\circ = 1$, but $\\sin 0^\\circ = 0$ and $\\cos 0^\\circ = 1$." },
        { text: "$0$", explain: "$\\cos 0^\\circ = 1$, so $z = 2(1 + i\\cdot 0) = 2$, not $0$." },
        { text: "$2$", correct: true, explain: "$\\cos 0^\\circ = 1$ and $\\sin 0^\\circ = 0$, so $z = 2(1 + 0) = 2$." },
        { text: "$2 + 2i$", explain: "Each part takes its own trig value: $2\\cdot 1$ and $2\\cdot 0$, giving $2$." },
      ],
    },
    {
      id: "c-eval-90",
      prompt: "$4(\\cos 90^\\circ + i\\sin 90^\\circ) = ?$",
      choices: [
        { text: "$4i$", correct: true, explain: "$\\cos 90^\\circ = 0$ and $\\sin 90^\\circ = 1$, so $z = 4(0 + i) = 4i$." },
        { text: "$4$", explain: "This drops the $i$. Since $\\sin 90^\\circ = 1$ the number is purely imaginary, $4i$." },
        { text: "$-4i$", explain: "$\\sin 90^\\circ = +1$, so the imaginary part is $+4i$, not $-4i$." },
        { text: "$4 + 4i$", explain: "$\\cos 90^\\circ = 0$, so the real part is $0$. The answer is $4i$." },
      ],
    },
    {
      id: "c-eval-180",
      prompt: "$3(\\cos 180^\\circ + i\\sin 180^\\circ) = ?$",
      choices: [
        { text: "$3$", explain: "$\\cos 180^\\circ = -1$, so the real part is $-3$, not $3$." },
        { text: "$3i$", explain: "$\\sin 180^\\circ = 0$, so there is no imaginary part. The answer is $-3$." },
        { text: "$-3i$", explain: "$\\sin 180^\\circ = 0$, so this is real: $-3$, not $-3i$." },
        { text: "$-3$", correct: true, explain: "$\\cos 180^\\circ = -1$ and $\\sin 180^\\circ = 0$, so $z = 3(-1 + 0) = -3$." },
      ],
    },
    {
      id: "c-written-correctly",
      prompt: "Which of these is a correctly written trig form?",
      choices: [
        { text: "$5(\\cos 20^\\circ + \\sin 20^\\circ)$", explain: "The sine term is missing its $i$." },
        { text: "$5(\\cos 20^\\circ + i\\sin 20^\\circ)$", correct: true, explain: "Cosine first, then $i$ on the sine, with $5$ multiplying both terms." },
        { text: "$5\\cos 20^\\circ + i\\sin 20^\\circ$", explain: "Here $5$ multiplies only the cosine. It must multiply the sine term too." },
        { text: "$5(i\\cos 20^\\circ + i\\sin 20^\\circ)$", explain: "The $i$ belongs on the sine only, not on the cosine." },
      ],
    },
    {
      id: "c-r-both",
      prompt: "In $7(\\cos 50^\\circ + i\\sin 50^\\circ)$, the factor $7$ multiplies which terms?",
      choices: [
        { text: "Only $\\cos 50^\\circ$.", explain: "The $7$ is outside the parentheses, so it multiplies everything inside." },
        { text: "Only $i\\sin 50^\\circ$.", explain: "It multiplies both terms, not just the imaginary one." },
        { text: "Both $\\cos 50^\\circ$ and $\\sin 50^\\circ$.", correct: true, explain: "The $7$ is outside the parentheses, so it scales both terms." },
        { text: "Only the $i$.", explain: "The $7$ multiplies the whole bracket, both the real and the imaginary term." },
      ],
    },
    {
      id: "c-rect-r-34",
      prompt: "For $z = 3 + 4i$, what is the modulus $r$?",
      choices: [
        { text: "$5$", correct: true, explain: "$r = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$." },
        { text: "$7$", explain: "That is $3 + 4$. The modulus roots the sum of squares, not the sum." },
        { text: "$25$", explain: "That is $3^2 + 4^2$. Take the square root to get $5$." },
        { text: "$\\sqrt{7}$", explain: "That is $\\sqrt{3 + 4}$. Square each part first: $\\sqrt{9 + 16}$." },
      ],
    },
    {
      id: "c-rect-theta-11",
      prompt: "For $z = 1 + i$, what is the argument $\\theta$?",
      choices: [
        { text: "$90^\\circ$", explain: "$90^\\circ$ points straight up. $1 + i$ points diagonally." },
        { text: "$30^\\circ$", explain: "$30^\\circ$ needs unequal legs. Here $a = b = 1$." },
        { text: "$60^\\circ$", explain: "$60^\\circ$ needs unequal legs. Here $a = b = 1$, so $\\tan\\theta = 1$." },
        { text: "$45^\\circ$", correct: true, explain: "$\\tan\\theta = \\dfrac{1}{1} = 1$ in quadrant I gives $\\theta = 45^\\circ$." },
      ],
    },
    {
      id: "c-rect-r-root3",
      prompt: "For $z = \\sqrt{3} + i$, what is the modulus $r$?",
      choices: [
        { text: "$4$", explain: "That is $(\\sqrt{3})^2 + 1^2 = 3 + 1$. You still need the square root: $\\sqrt{4} = 2$." },
        { text: "$2$", correct: true, explain: "$r = \\sqrt{(\\sqrt{3})^2 + 1^2} = \\sqrt{3 + 1} = \\sqrt{4} = 2$." },
        { text: "$\\sqrt{3} + 1$", explain: "You cannot add the legs directly. Use $r = \\sqrt{a^2 + b^2}$." },
        { text: "$\\sqrt{2}$", explain: "That is $\\sqrt{1 + 1}$. Here $a^2 = 3$, so $r = \\sqrt{3 + 1} = 2$." },
      ],
    },
    {
      id: "c-trig-real",
      prompt: "For $2(\\cos 60^\\circ + i\\sin 60^\\circ)$, what is the real part $a$?",
      choices: [
        { text: "$\\sqrt{3}$", explain: "That is the imaginary part $b = 2\\sin 60^\\circ$. The real part uses cosine." },
        { text: "$2$", explain: "That is $r$. The real part is $r\\cos 60^\\circ = 2\\cdot\\dfrac{1}{2} = 1$." },
        { text: "$1$", correct: true, explain: "$a = r\\cos\\theta = 2\\cos 60^\\circ = 2\\cdot\\dfrac{1}{2} = 1$." },
        { text: "$\\dfrac{1}{2}$", explain: "That is $\\cos 60^\\circ$ alone. Multiply by $r = 2$ to get $1$." },
      ],
    },
    {
      id: "c-trig-imag",
      prompt: "For $2(\\cos 60^\\circ + i\\sin 60^\\circ)$, what is the imaginary part $b$?",
      choices: [
        { text: "$\\sqrt{3}$", correct: true, explain: "$b = r\\sin\\theta = 2\\sin 60^\\circ = 2\\cdot\\dfrac{\\sqrt{3}}{2} = \\sqrt{3}$." },
        { text: "$1$", explain: "That is the real part $a = 2\\cos 60^\\circ$. The imaginary part uses sine." },
        { text: "$2$", explain: "That is $r$. The imaginary part is $r\\sin 60^\\circ = \\sqrt{3}$." },
        { text: "$\\dfrac{\\sqrt{3}}{2}$", explain: "That is $\\sin 60^\\circ$ alone. Multiply by $r = 2$ to get $\\sqrt{3}$." },
      ],
    },
    {
      id: "c-id-both",
      prompt: "In $8(\\cos 300^\\circ + i\\sin 300^\\circ)$, identify the modulus and the argument.",
      choices: [
        { text: "$r = 300$, $\\theta = 8^\\circ$", explain: "These are swapped. The factor in front is the modulus." },
        { text: "$r = 8$, $\\theta = 60^\\circ$", explain: "The written angle is $300^\\circ$. $60^\\circ$ is only its reference angle." },
        { text: "$r = 8$, $\\theta = 300^\\circ$", correct: true, explain: "The factor $8$ is the modulus. The angle inside is $\\theta = 300^\\circ$." },
        { text: "$r = 8$, with $\\theta = 300$ in radians", explain: "The angle is $300^\\circ$ in degrees here, not radians." },
      ],
    },
  ],
  summit: [
    {
      id: "s-rect-to-trig-11",
      prompt: "Write $z = 1 + i$ in trigonometric form.",
      choices: [
        { text: "$2(\\cos 45^\\circ + i\\sin 45^\\circ)$", explain: "The modulus is $\\sqrt{1^2 + 1^2} = \\sqrt{2}$, not $2$." },
        { text: "$\\sqrt{2}(\\cos 45^\\circ + i\\sin 45^\\circ)$", correct: true, explain: "$r = \\sqrt{2}$ and, in quadrant I, $\\theta = 45^\\circ$." },
        { text: "$\\sqrt{2}(\\cos 45^\\circ + \\sin 45^\\circ)$", explain: "The $i$ on the sine term is missing." },
        { text: "$\\sqrt{2}(\\sin 45^\\circ + i\\cos 45^\\circ)$", explain: "Sine and cosine are swapped. Cosine comes first." },
      ],
    },
    {
      id: "s-rect-to-trig-root3",
      prompt: "Write $z = \\sqrt{3} + i$ in trigonometric form.",
      choices: [
        { text: "$2(\\cos 60^\\circ + i\\sin 60^\\circ)$", explain: "The angle is $30^\\circ$: $\\tan\\theta = \\dfrac{1}{\\sqrt{3}}$, not $\\sqrt{3}$." },
        { text: "$4(\\cos 30^\\circ + i\\sin 30^\\circ)$", explain: "The modulus is $\\sqrt{3 + 1} = 2$, not $4$." },
        { text: "$2(\\cos 30^\\circ + \\sin 30^\\circ)$", explain: "The sine term needs its $i$." },
        { text: "$2(\\cos 30^\\circ + i\\sin 30^\\circ)$", correct: true, explain: "$r = \\sqrt{(\\sqrt{3})^2 + 1^2} = 2$ and $\\theta = 30^\\circ$." },
      ],
    },
    {
      id: "s-trig-to-rect-60",
      prompt: "Evaluate $2(\\cos 60^\\circ + i\\sin 60^\\circ)$ in rectangular form.",
      choices: [
        { text: "$1 + \\sqrt{3}\\,i$", correct: true, explain: "$a = 2\\cos 60^\\circ = 1$ and $b = 2\\sin 60^\\circ = \\sqrt{3}$." },
        { text: "$\\sqrt{3} + i$", explain: "This uses sine for the real part. The real part is $2\\cos 60^\\circ = 1$." },
        { text: "$1 + \\sqrt{3}$", explain: "The $i$ was dropped. The imaginary part is $\\sqrt{3}\\,i$." },
        { text: "$2 + 2i$", explain: "The cosine and sine were not evaluated: $\\cos 60^\\circ = \\dfrac{1}{2}$, $\\sin 60^\\circ = \\dfrac{\\sqrt{3}}{2}$." },
      ],
    },
    {
      id: "s-trig-to-rect-120",
      prompt: "Evaluate $4(\\cos 120^\\circ + i\\sin 120^\\circ)$ in rectangular form.",
      choices: [
        { text: "$2 + 2\\sqrt{3}\\,i$", explain: "$\\cos 120^\\circ = -\\dfrac{1}{2}$, so the real part is $-2$, not $+2$." },
        { text: "$-2\\sqrt{3} + 2i$", explain: "Cosine and sine are swapped. $a = 4\\cos 120^\\circ = -2$." },
        { text: "$-2 + 2\\sqrt{3}\\,i$", correct: true, explain: "$a = 4\\cos 120^\\circ = -2$ and $b = 4\\sin 120^\\circ = 2\\sqrt{3}$." },
        { text: "$-2 - 2\\sqrt{3}\\,i$", explain: "$\\sin 120^\\circ = +\\dfrac{\\sqrt{3}}{2}$, so the imaginary part is positive." },
      ],
    },
    {
      id: "s-quadrant-2",
      prompt: "Write $z = -1 + \\sqrt{3}\\,i$ in trig form, with $0^\\circ \\le \\theta < 360^\\circ$.",
      choices: [
        { text: "$2(\\cos 60^\\circ + i\\sin 60^\\circ)$", explain: "$60^\\circ$ ignores the quadrant. $a < 0$ and $b > 0$ is quadrant II, so $\\theta = 120^\\circ$." },
        { text: "$2(\\cos 120^\\circ + i\\sin 120^\\circ)$", correct: true, explain: "$r = \\sqrt{1 + 3} = 2$ and, in quadrant II, $\\theta = 180^\\circ - 60^\\circ = 120^\\circ$." },
        { text: "$2(\\cos 240^\\circ + i\\sin 240^\\circ)$", explain: "$240^\\circ$ is quadrant III. Here $b > 0$, so the point is in quadrant II." },
        { text: "$4(\\cos 120^\\circ + i\\sin 120^\\circ)$", explain: "The modulus is $\\sqrt{1 + 3} = 2$, not $4$." },
      ],
    },
    {
      id: "s-quadrant-3",
      prompt: "Write $z = -1 - i$ in trig form, with $0^\\circ \\le \\theta < 360^\\circ$.",
      choices: [
        { text: "$\\sqrt{2}(\\cos 45^\\circ + i\\sin 45^\\circ)$", explain: "$45^\\circ$ is quadrant I. Both parts are negative, so it is quadrant III." },
        { text: "$\\sqrt{2}(\\cos 135^\\circ + i\\sin 135^\\circ)$", explain: "$135^\\circ$ is quadrant II. Here $a < 0$ and $b < 0$." },
        { text: "$\\sqrt{2}(\\cos 225^\\circ + i\\sin 225^\\circ)$", correct: true, explain: "$r = \\sqrt{2}$ and, in quadrant III, $\\theta = 180^\\circ + 45^\\circ = 225^\\circ$." },
        { text: "$2(\\cos 225^\\circ + i\\sin 225^\\circ)$", explain: "The modulus is $\\sqrt{1 + 1} = \\sqrt{2}$, not $2$." },
      ],
    },
    {
      id: "s-trig-to-rect-210",
      prompt: "Evaluate $2(\\cos 210^\\circ + i\\sin 210^\\circ)$ in rectangular form.",
      choices: [
        { text: "$\\sqrt{3} + i$", explain: "In quadrant III both parts are negative. $\\cos 210^\\circ$ and $\\sin 210^\\circ$ are both negative." },
        { text: "$-\\sqrt{3} + i$", explain: "$\\sin 210^\\circ = -\\dfrac{1}{2}$, so the imaginary part is $-1$, not $+1$." },
        { text: "$-1 - \\sqrt{3}\\,i$", explain: "Cosine and sine are swapped. $a = 2\\cos 210^\\circ = -\\sqrt{3}$." },
        { text: "$-\\sqrt{3} - i$", correct: true, explain: "$a = 2\\cos 210^\\circ = -\\sqrt{3}$ and $b = 2\\sin 210^\\circ = -1$." },
      ],
    },
    {
      id: "s-dropped-i",
      prompt: "Converting $5(\\cos 30^\\circ + i\\sin 30^\\circ)$, a student writes $5\\cos 30^\\circ + 5\\sin 30^\\circ = \\dfrac{5\\sqrt{3}}{2} + \\dfrac{5}{2}$. What is the fix?",
      choices: [
        { text: "Restore the $i$ on the sine term: $z = \\dfrac{5\\sqrt{3}}{2} + \\dfrac{5}{2}i$.", correct: true, explain: "The imaginary part $5\\sin 30^\\circ$ must be multiplied by $i$." },
        { text: "Nothing, the answer is a real number.", explain: "The sine term has an $i$, so $z$ has a nonzero imaginary part." },
        { text: "Swap the parts: $z = \\dfrac{5}{2} + \\dfrac{5\\sqrt{3}}{2}i$.", explain: "Cosine gives the real part. Do not swap, just restore the $i$ on the sine." },
        { text: "Drop the $5$ on the sine: $z = \\dfrac{5\\sqrt{3}}{2} + \\dfrac{1}{2}i$.", explain: "The $5$ multiplies both terms, so the imaginary part is $\\dfrac{5}{2}i$." },
      ],
    },
    {
      id: "s-swap-error",
      prompt: "A student claims $3(\\cos 90^\\circ + i\\sin 90^\\circ) = 3$. Why is that wrong?",
      choices: [
        { text: "It is correct, since $\\cos 90^\\circ = 1$.", explain: "$\\cos 90^\\circ = 0$, not $1$. The value $1$ belongs to $\\sin 90^\\circ$." },
        { text: "$\\cos 90^\\circ = 0$ and $\\sin 90^\\circ = 1$, so $z = 3(0 + i) = 3i$.", correct: true, explain: "The real part vanishes and the result is purely imaginary, $3i$." },
        { text: "$z = -3$, because $\\cos 90^\\circ = -1$.", explain: "$\\cos 90^\\circ = 0$, not $-1$. The value $-1$ is $\\cos 180^\\circ$." },
        { text: "$z = 3 + 3i$.", explain: "$\\cos 90^\\circ = 0$, so the real part is $0$. The answer is $3i$." },
      ],
    },
    {
      id: "s-trig-to-rect-270",
      prompt: "Evaluate $5(\\cos 270^\\circ + i\\sin 270^\\circ)$ in rectangular form.",
      choices: [
        { text: "$5i$", explain: "$\\sin 270^\\circ = -1$, so the imaginary part is $-5i$, not $+5i$." },
        { text: "$-5$", explain: "$\\cos 270^\\circ = 0$, so the real part is $0$. The answer is $-5i$." },
        { text: "$-5i$", correct: true, explain: "$\\cos 270^\\circ = 0$ and $\\sin 270^\\circ = -1$, so $z = 5(0 - i) = -5i$." },
        { text: "$5$", explain: "$\\cos 270^\\circ = 0$, so this is not a positive real. It is $-5i$." },
      ],
    },
    {
      id: "s-build-135",
      prompt: "A number has $r = 2$ and $\\theta = 135^\\circ$. Write it in rectangular form.",
      choices: [
        { text: "$\\sqrt{2} + \\sqrt{2}\\,i$", explain: "$\\cos 135^\\circ = -\\dfrac{\\sqrt{2}}{2}$, so the real part is $-\\sqrt{2}$." },
        { text: "$-\\sqrt{2} - \\sqrt{2}\\,i$", explain: "$\\sin 135^\\circ = +\\dfrac{\\sqrt{2}}{2}$, so the imaginary part is $+\\sqrt{2}$." },
        { text: "$\\sqrt{2} - \\sqrt{2}\\,i$", explain: "Both signs are off. In quadrant II the real part is negative and the imaginary part positive." },
        { text: "$-\\sqrt{2} + \\sqrt{2}\\,i$", correct: true, explain: "$a = 2\\cos 135^\\circ = -\\sqrt{2}$ and $b = 2\\sin 135^\\circ = \\sqrt{2}$." },
      ],
    },
    {
      id: "s-real-negative",
      prompt: "Which trig form equals the real number $-7$?",
      choices: [
        { text: "$7(\\cos 180^\\circ + i\\sin 180^\\circ)$", correct: true, explain: "$\\cos 180^\\circ = -1$ and $\\sin 180^\\circ = 0$, so $z = 7(-1) = -7$." },
        { text: "$7(\\cos 0^\\circ + i\\sin 0^\\circ)$", explain: "That equals $+7$. The negative real axis is at $180^\\circ$." },
        { text: "$7(\\cos 90^\\circ + i\\sin 90^\\circ)$", explain: "That equals $7i$, on the imaginary axis, not $-7$." },
        { text: "$-7(\\cos 0^\\circ + i\\sin 0^\\circ)$", explain: "The modulus must be positive. Use $r = 7$ with $\\theta = 180^\\circ$." },
      ],
    },
    {
      id: "s-radians",
      prompt: "In radians, $z = 4(\\cos\\frac{\\pi}{2} + i\\sin\\frac{\\pi}{2})$. What is $z$?",
      choices: [
        { text: "$2\\sqrt{2} + 2\\sqrt{2}\\,i$", explain: "That is the value at $45^\\circ$. But $\\dfrac{\\pi}{2}$ radians is $90^\\circ$." },
        { text: "$4i$", correct: true, explain: "$\\dfrac{\\pi}{2}$ radians is $90^\\circ$, so $\\cos = 0$, $\\sin = 1$, and $z = 4i$." },
        { text: "$4$", explain: "$\\dfrac{\\pi}{2}$ is $90^\\circ$, so $\\cos\\dfrac{\\pi}{2} = 0$. The answer is $4i$, not $4$." },
        { text: "$-4i$", explain: "$\\sin\\dfrac{\\pi}{2} = +1$, so the imaginary part is $+4i$." },
      ],
    },
    {
      id: "s-quadrant-4",
      prompt: "Write $z = 2 - 2\\sqrt{3}\\,i$ in trig form, with $0^\\circ \\le \\theta < 360^\\circ$.",
      choices: [
        { text: "$4(\\cos 60^\\circ + i\\sin 60^\\circ)$", explain: "That is quadrant I. Here $b < 0$, so the point is in quadrant IV." },
        { text: "$4(\\cos 240^\\circ + i\\sin 240^\\circ)$", explain: "$240^\\circ$ is quadrant III. Here $a > 0$ and $b < 0$ is quadrant IV." },
        { text: "$4(\\cos 300^\\circ + i\\sin 300^\\circ)$", correct: true, explain: "$r = \\sqrt{2^2 + (2\\sqrt{3})^2} = 4$ and, in quadrant IV, $\\theta = 360^\\circ - 60^\\circ = 300^\\circ$." },
        { text: "$2(\\cos 300^\\circ + i\\sin 300^\\circ)$", explain: "The modulus is $\\sqrt{4 + 12} = 4$, not $2$." },
      ],
    },
    {
      id: "s-r-both-capstone",
      prompt: "Converting $6(\\cos 50^\\circ + i\\sin 50^\\circ)$, a student writes the imaginary part as $\\sin 50^\\circ$, dropping the $6$. What should the imaginary part be?",
      choices: [
        { text: "$\\sin 50^\\circ$", explain: "The $6$ multiplies both terms, so the sine term is $6\\sin 50^\\circ$." },
        { text: "$6$", explain: "The factor alone is not the imaginary part. It must multiply $\\sin 50^\\circ$." },
        { text: "$6\\cos 50^\\circ$", explain: "That is the real part $a$. The imaginary part uses sine." },
        { text: "$6\\sin 50^\\circ$", correct: true, explain: "$b = r\\sin\\theta = 6\\sin 50^\\circ$. The $6$ scales the sine term too." },
      ],
    },
  ],
};
