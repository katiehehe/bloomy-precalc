import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Modulus and argument".
 * Grounded in the lesson: $|z| = \sqrt{a^2+b^2}$ is a distance (never negative),
 * the argument is the angle from the positive real axis with $\tan\theta = b/a$,
 * and the bare $\arctan(b/a)$ needs a $+180^\circ$ quadrant fix when $a<0$.
 * Distractors are the classic traps: adding instead of rooting, dropping the
 * square root, flipping $b/a$ to $a/b$, a negative modulus, and skipping the
 * quadrant fix.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-mod-34",
      prompt: "Find the modulus $|z|$ of $z = 3 + 4i$.",
      choices: [
        { text: "$5$", correct: true, explain: "$\\sqrt{3^2+4^2}=\\sqrt{9+16}=\\sqrt{25}=5$, the classic 3-4-5 triangle." },
        { text: "$7$", explain: "That is $a+b=3+4$. Modulus roots the sum of squares, it does not add the parts." },
        { text: "$\\sqrt{7}$", explain: "That is $\\sqrt{3+4}$. You must square first: $\\sqrt{3^2+4^2}$." },
        { text: "$25$", explain: "That is $a^2+b^2$. The square root is still needed: $\\sqrt{25}=5$." },
      ],
    },
    {
      id: "c-mod-512",
      prompt: "Find $|z|$ for $z = 5 + 12i$.",
      choices: [
        { text: "$13$", correct: true, explain: "$\\sqrt{5^2+12^2}=\\sqrt{25+144}=\\sqrt{169}=13$ (a 5-12-13 triangle)." },
        { text: "$17$", explain: "That is $5+12$. Modulus is $\\sqrt{a^2+b^2}$, not $a+b$." },
        { text: "$\\sqrt{17}$", explain: "That is $\\sqrt{5+12}$. Square each part before adding." },
        { text: "$169$", explain: "That is $a^2+b^2$. Take the square root to get $13$." },
      ],
    },
    {
      id: "c-formula",
      prompt: "Which formula gives the modulus of $z = a + bi$?",
      choices: [
        { text: "$\\sqrt{a^2 + b^2}$", correct: true, explain: "The modulus is the hypotenuse of the right triangle with legs $a$ and $b$." },
        { text: "$a^2 + b^2$", explain: "That is the modulus squared. The distance itself needs the square root." },
        { text: "$a + b$", explain: "Adding the legs is not the hypotenuse. Use the Pythagorean theorem." },
        { text: "$\\sqrt{a^2 - b^2}$", explain: "The Pythagorean theorem adds the squared legs, it does not subtract them." },
      ],
    },
    {
      id: "c-tan-ratio",
      prompt: "For $z = a + bi$ in quadrant I, which ratio equals $\\tan\\theta$ for the argument?",
      choices: [
        { text: "$\\dfrac{b}{a}$", correct: true, explain: "Argument uses opposite over adjacent: the vertical leg $b$ over the horizontal leg $a$." },
        { text: "$\\dfrac{a}{b}$", explain: "That is flipped. It gives $\\cot\\theta$, not $\\tan\\theta$." },
        { text: "$\\dfrac{b}{\\sqrt{a^2+b^2}}$", explain: "That is $\\sin\\theta$ (opposite over hypotenuse), not $\\tan\\theta$." },
        { text: "$\\dfrac{a}{\\sqrt{a^2+b^2}}$", explain: "That is $\\cos\\theta$ (adjacent over hypotenuse), not $\\tan\\theta$." },
      ],
    },
    {
      id: "c-pure-imag",
      prompt: "What is $|z|$ for $z = 7i$ (that is, $0 + 7i$)?",
      choices: [
        { text: "$7$", correct: true, explain: "$\\sqrt{0^2+7^2}=\\sqrt{49}=7$. A pure imaginary number sits $7$ up the imaginary axis." },
        { text: "$0$", explain: "Only $z=0$ has modulus $0$. Here the point is $7$ units up." },
        { text: "$7i$", explain: "The modulus is a real length, never an imaginary number." },
        { text: "$49$", explain: "That is $b^2$. Take the square root to get $7$." },
      ],
    },
    {
      id: "c-real-neg",
      prompt: "What is $|z|$ for the real number $z = -6$ (that is, $-6 + 0i$)?",
      choices: [
        { text: "$6$", correct: true, explain: "$\\sqrt{(-6)^2+0^2}=\\sqrt{36}=6$. A modulus is a distance, so it is never negative." },
        { text: "$-6$", explain: "Modulus is a length. It cannot be negative even when $a$ is." },
        { text: "$0$", explain: "The point is $6$ units left of the origin, a distance of $6$." },
        { text: "$36$", explain: "That is $(-6)^2$. The square root gives $6$." },
      ],
    },
    {
      id: "c-locate",
      prompt: "A point sits $1$ unit left and $3$ units up from the origin. Which complex number is it?",
      choices: [
        { text: "$-1 + 3i$", correct: true, explain: "Left $1$ means real part $-1$. Up $3$ means imaginary part $+3$." },
        { text: "$1 + 3i$", explain: "That is $1$ unit right, not left. A leftward move makes the real part negative." },
        { text: "$-1 - 3i$", explain: "That is down $3$, not up. Up makes the imaginary part positive." },
        { text: "$3 - i$", explain: "That swaps the coordinates: real part $3$, imaginary part $-1$." },
      ],
    },
    {
      id: "c-mod-11",
      prompt: "Find $|z|$ for $z = 1 + i$.",
      choices: [
        { text: "$\\sqrt{2}$", correct: true, explain: "$\\sqrt{1^2+1^2}=\\sqrt{2}\\approx1.41$." },
        { text: "$2$", explain: "That is $1+1$. Root the sum of squares: $\\sqrt{1+1}=\\sqrt2$." },
        { text: "$1$", explain: "The point $(1,1)$ is farther than $1$ from the origin. The distance is $\\sqrt2$." },
        { text: "$\\sqrt{2}\\,i$", explain: "The modulus is a real length, not an imaginary number." },
      ],
    },
    {
      id: "c-arg-11",
      prompt: "What is the argument of $z = 1 + i$?",
      choices: [
        { text: "$45^\\circ$", correct: true, explain: "$\\tan\\theta = \\dfrac{1}{1}=1$ and the point is in quadrant I, so $\\theta = 45^\\circ$." },
        { text: "$90^\\circ$", explain: "$90^\\circ$ points straight up. $1+i$ points diagonally, at $45^\\circ$." },
        { text: "$135^\\circ$", explain: "$135^\\circ$ is in quadrant II. Here $a>0$ and $b>0$, so it is quadrant I." },
        { text: "$0^\\circ$", explain: "$0^\\circ$ is along the positive real axis. $1+i$ has an equal upward part." },
      ],
    },
    {
      id: "c-arg-real",
      prompt: "What is the argument of the positive real number $z = 5$?",
      choices: [
        { text: "$0^\\circ$", correct: true, explain: "A positive real number points straight along the positive real axis, angle $0^\\circ$." },
        { text: "$90^\\circ$", explain: "$90^\\circ$ is straight up (pure imaginary). A positive real points right." },
        { text: "$180^\\circ$", explain: "$180^\\circ$ points left, which is a negative real number." },
        { text: "$45^\\circ$", explain: "$45^\\circ$ needs an equal imaginary part. Here $b=0$." },
      ],
    },
    {
      id: "c-arg-imag",
      prompt: "What is the argument of $z = 3i$?",
      choices: [
        { text: "$90^\\circ$", correct: true, explain: "A positive pure imaginary number points straight up, angle $90^\\circ$." },
        { text: "$0^\\circ$", explain: "$0^\\circ$ is along the real axis. $3i$ has no real part and points up." },
        { text: "$180^\\circ$", explain: "$180^\\circ$ points left along the negative real axis." },
        { text: "$270^\\circ$", explain: "$270^\\circ$ points straight down. $3i$ points up (its $b>0$)." },
      ],
    },
    {
      id: "c-quadrant",
      prompt: "In which quadrant does $z = -2 + 2i$ lie?",
      choices: [
        { text: "Quadrant II", correct: true, explain: "Real part $-2<0$ (left) and imaginary part $+2>0$ (up) is the upper-left quadrant, II." },
        { text: "Quadrant I", explain: "Quadrant I needs $a>0$. Here $a=-2<0$." },
        { text: "Quadrant III", explain: "Quadrant III needs $b<0$. Here $b=+2>0$." },
        { text: "Quadrant IV", explain: "Quadrant IV needs $a>0$ and $b<0$. Here it is the opposite." },
      ],
    },
    {
      id: "c-which-ratio",
      prompt: "A student writes $\\tan\\theta = \\dfrac{a}{b}$ for $z = a+bi$. What is the fix?",
      choices: [
        { text: "It should be $\\dfrac{b}{a}$ (imaginary over real)", correct: true, explain: "Opposite over adjacent is the vertical part $b$ over the horizontal part $a$." },
        { text: "It is correct as written", explain: "$\\dfrac{a}{b}$ is $\\cot\\theta$, the reciprocal, so it gives the wrong angle." },
        { text: "It should be $\\dfrac{a}{\\sqrt{a^2+b^2}}$", explain: "That is $\\cos\\theta$, not $\\tan\\theta$." },
        { text: "It should be $a \\cdot b$", explain: "The tangent is a ratio of the legs, not their product." },
      ],
    },
    {
      id: "c-mod-815",
      prompt: "Find $|z|$ for $z = 8 + 15i$.",
      choices: [
        { text: "$17$", correct: true, explain: "$\\sqrt{8^2+15^2}=\\sqrt{64+225}=\\sqrt{289}=17$ (an 8-15-17 triangle)." },
        { text: "$23$", explain: "That is $8+15$. Modulus roots the sum of squares, not the sum." },
        { text: "$\\sqrt{23}$", explain: "That is $\\sqrt{8+15}$. Square each leg first." },
        { text: "$289$", explain: "That is $a^2+b^2$. Take the root to reach $17$." },
      ],
    },
    {
      id: "c-neg-mod",
      prompt: "Can the modulus $|z|$ ever be negative?",
      choices: [
        { text: "No, it is a distance, so $|z| \\ge 0$ always", correct: true, explain: "The modulus measures length from the origin, which is never negative." },
        { text: "Yes, when the real part $a$ is negative", explain: "Squaring $a$ removes its sign, so a negative $a$ still gives a non-negative modulus." },
        { text: "Yes, when the number is in quadrant III", explain: "The quadrant affects the argument, not the sign of the modulus." },
        { text: "Yes, when $b < 0$", explain: "Squaring $b$ removes its sign. The modulus stays non-negative." },
      ],
    },
    {
      id: "c-distance-34",
      prompt: "What is the distance between $z_1 = 4 + 5i$ and $z_2 = 1 + i$?",
      choices: [
        { text: "$5$", correct: true, explain: "Subtract first: $z_1-z_2=3+4i$, so the distance is $|3+4i|=\\sqrt{3^2+4^2}=\\sqrt{25}=5$." },
        { text: "$7$", explain: "That adds the gaps $3+4$. Distance roots the sum of squares: $\\sqrt{3^2+4^2}$." },
        { text: "$\\sqrt{61}$", explain: "That is $|z_1+z_2|=|5+6i|$. Distance uses the difference $z_1-z_2$, not the sum." },
        { text: "$\\sqrt{7}$", explain: "That is $\\sqrt{3+4}$. Square each gap before adding them." },
      ],
    },
  ],
  summit: [
    {
      id: "s-arg-q2",
      prompt: "Find the argument of $z = -3 + 4i$ (principal value).",
      choices: [
        { text: "$126.9^\\circ$", correct: true, explain: "$a<0$ puts the point in quadrant II, so add $180^\\circ$: $\\arctan\\dfrac{4}{-3}\\approx-53.1^\\circ$, then $-53.1^\\circ+180^\\circ\\approx126.9^\\circ$." },
        { text: "$-53.1^\\circ$", explain: "That is the bare $\\arctan\\dfrac{4}{-3}$, which lands in quadrant IV. Since $a<0$, add $180^\\circ$." },
        { text: "$53.1^\\circ$", explain: "That is the quadrant I angle for $3+4i$. A negative real part shifts it to quadrant II." },
        { text: "$233.1^\\circ$", explain: "That points into quadrant III. Quadrant II is between $90^\\circ$ and $180^\\circ$." },
      ],
    },
    {
      id: "s-arg-q3",
      prompt: "Find an argument of $z = -1 - i$ using the lesson's quadrant fix.",
      choices: [
        { text: "$225^\\circ$", correct: true, explain: "Both parts are negative (quadrant III). The bare $\\arctan 1 = 45^\\circ$ is off by a half turn, so add $180^\\circ$ to get $225^\\circ$." },
        { text: "$45^\\circ$", explain: "That is the bare $\\arctan\\dfrac{-1}{-1}$. Because $a<0$, you still add $180^\\circ$." },
        { text: "$135^\\circ$", explain: "$135^\\circ$ is quadrant II ($a<0$, $b>0$). Here both parts are negative." },
        { text: "$-45^\\circ$", explain: "$-45^\\circ$ is quadrant IV ($a>0$, $b<0$). Here $a<0$ as well." },
      ],
    },
    {
      id: "s-arg-q4",
      prompt: "Find the principal argument of $z = 1 - i$.",
      choices: [
        { text: "$-45^\\circ$", correct: true, explain: "Quadrant IV with $a>0$, so no fix is needed: $\\arctan\\dfrac{-1}{1}=-45^\\circ$." },
        { text: "$45^\\circ$", explain: "That is $1+i$ (quadrant I). Here $b<0$, so the angle is below the axis." },
        { text: "$135^\\circ$", explain: "$135^\\circ$ is quadrant II. $1-i$ points down and to the right." },
        { text: "$315^\\circ$", explain: "$315^\\circ$ is the same ray, but the principal value in $(-180^\\circ,180^\\circ]$ is $-45^\\circ$." },
      ],
    },
    {
      id: "s-mod-724",
      prompt: "Find $|z|$ for $z = -7 + 24i$.",
      choices: [
        { text: "$25$", correct: true, explain: "$\\sqrt{(-7)^2+24^2}=\\sqrt{49+576}=\\sqrt{625}=25$. The negative sign vanishes when squared." },
        { text: "$17$", explain: "That is $-7+24$. Modulus is $\\sqrt{a^2+b^2}$, and the parts are squared first." },
        { text: "$\\sqrt{527}$", explain: "That is $\\sqrt{576-49}$. The Pythagorean theorem adds the squares, not subtracts." },
        { text: "$-25$", explain: "A modulus is a length and is never negative, even though $a<0$." },
      ],
    },
    {
      id: "s-arg-30",
      prompt: "Find the exact argument of $z = \\sqrt{3} + i$.",
      choices: [
        { text: "$30^\\circ$", correct: true, explain: "$\\tan\\theta = \\dfrac{1}{\\sqrt3}$, and in quadrant I that is $30^\\circ$." },
        { text: "$60^\\circ$", explain: "$60^\\circ$ has $\\tan\\theta=\\sqrt3=\\dfrac{\\sqrt3}{1}$. That is $1+\\sqrt3\\,i$, with the parts swapped." },
        { text: "$45^\\circ$", explain: "$45^\\circ$ needs equal parts. Here the real part $\\sqrt3$ is larger than the imaginary part $1$." },
        { text: "$150^\\circ$", explain: "$150^\\circ$ is quadrant II. Both parts here are positive (quadrant I)." },
      ],
    },
    {
      id: "s-arg-60",
      prompt: "Find the exact argument of $z = 1 + \\sqrt{3}\\,i$.",
      choices: [
        { text: "$60^\\circ$", correct: true, explain: "$\\tan\\theta = \\dfrac{\\sqrt3}{1}=\\sqrt3$, and in quadrant I that is $60^\\circ$." },
        { text: "$30^\\circ$", explain: "$30^\\circ$ has $\\tan\\theta=\\dfrac{1}{\\sqrt3}$. That is $\\sqrt3 + i$, with the parts swapped." },
        { text: "$45^\\circ$", explain: "$45^\\circ$ needs equal parts. Here the imaginary part $\\sqrt3$ is larger." },
        { text: "$120^\\circ$", explain: "$120^\\circ$ is quadrant II. Both parts here are positive." },
      ],
    },
    {
      id: "s-neg-real",
      prompt: "A complex number has modulus $10$ and lies on the negative real axis. What is $z$, and what is $\\arg z$?",
      choices: [
        { text: "$z = -10$, $\\arg z = 180^\\circ$", correct: true, explain: "The negative real axis points left, angle $180^\\circ$, at distance $10$." },
        { text: "$z = 10$, $\\arg z = 0^\\circ$", explain: "That is the positive real axis. Negative real means the point is to the left." },
        { text: "$z = 10i$, $\\arg z = 90^\\circ$", explain: "That is the imaginary axis (straight up), not the real axis." },
        { text: "$z = -10i$, $\\arg z = -90^\\circ$", explain: "That points straight down (imaginary), not left along the real axis." },
      ],
    },
    {
      id: "s-neg-mod-error",
      prompt: "A student computes $|-3 - 4i| = -5$. What went wrong?",
      choices: [
        { text: "The modulus is $5$: squaring removes the signs, and a length is never negative", correct: true, explain: "$\\sqrt{(-3)^2+(-4)^2}=\\sqrt{9+16}=5$. The negatives disappear under the squares." },
        { text: "Nothing, a number in quadrant III has a negative modulus", explain: "The quadrant sets the argument, not the sign of the modulus. Modulus is always $\\ge 0$." },
        { text: "The modulus is $-7$: add the parts $-3$ and $-4$", explain: "Modulus is $\\sqrt{a^2+b^2}$, not $a+b$, and it cannot be negative." },
        { text: "The modulus is $25$: it is $a^2 + b^2$", explain: "That is the modulus squared. Take the root to get $5$, still positive." },
      ],
    },
    {
      id: "s-compare",
      prompt: "Which number is farther from the origin: $z_1 = 6 + 8i$ or $z_2 = 5 + 12i$?",
      choices: [
        { text: "$z_2$, since $|z_2| = 13 > 10 = |z_1|$", correct: true, explain: "$|z_1|=\\sqrt{36+64}=10$ and $|z_2|=\\sqrt{25+144}=13$, so $z_2$ is farther." },
        { text: "$z_1$, since $6 + 8 = 14 > 17 = 5 + 12$ is false, so $z_1$ wins another way", explain: "Comparing $a+b$ is not the distance. Use $\\sqrt{a^2+b^2}$: $10$ versus $13$." },
        { text: "They are equal, both a distance of about $11$", explain: "The moduli are $10$ and $13$, which are not equal." },
        { text: "$z_1$, since it has the larger real part", explain: "A larger real part alone does not decide distance. Compare the full modulus." },
      ],
    },
    {
      id: "s-imag-neg",
      prompt: "Find the modulus and principal argument of $z = -4i$.",
      choices: [
        { text: "$|z| = 4$, $\\arg z = -90^\\circ$", correct: true, explain: "$\\sqrt{0^2+(-4)^2}=4$, and a negative pure imaginary points straight down at $-90^\\circ$." },
        { text: "$|z| = 4$, $\\arg z = 90^\\circ$", explain: "$90^\\circ$ points up. $-4i$ points down, so the argument is $-90^\\circ$." },
        { text: "$|z| = -4$, $\\arg z = -90^\\circ$", explain: "The angle is right, but the modulus is a length and cannot be $-4$." },
        { text: "$|z| = 4$, $\\arg z = 0^\\circ$", explain: "$0^\\circ$ is the positive real axis. This point is on the imaginary axis." },
      ],
    },
    {
      id: "s-arg-43",
      prompt: "Find the principal argument of $z = -4 + 3i$ (to the nearest tenth).",
      choices: [
        { text: "$143.1^\\circ$", correct: true, explain: "Quadrant II, so add $180^\\circ$: $\\arctan\\dfrac{3}{-4}\\approx-36.9^\\circ$, then $-36.9^\\circ+180^\\circ\\approx143.1^\\circ$." },
        { text: "$-36.9^\\circ$", explain: "That is the bare $\\arctan\\dfrac{3}{-4}$ in quadrant IV. Since $a<0$, add $180^\\circ$." },
        { text: "$36.9^\\circ$", explain: "That is quadrant I. A negative real part moves the angle into quadrant II." },
        { text: "$216.9^\\circ$", explain: "That is quadrant III. Quadrant II lies between $90^\\circ$ and $180^\\circ$." },
      ],
    },
    {
      id: "s-mod-22",
      prompt: "Find the exact modulus of $z = 2 + 2i$.",
      choices: [
        { text: "$2\\sqrt{2}$", correct: true, explain: "$\\sqrt{2^2+2^2}=\\sqrt{8}=2\\sqrt2\\approx2.83$." },
        { text: "$4$", explain: "That is $2+2$. Root the sum of squares: $\\sqrt{8}=2\\sqrt2$, not $4$." },
        { text: "$2$", explain: "That is one leg. The hypotenuse $\\sqrt{2^2+2^2}$ is longer." },
        { text: "$\\sqrt{8}\\,i$", explain: "The modulus is a real length, not imaginary. Also $\\sqrt8$ simplifies to $2\\sqrt2$." },
      ],
    },
    {
      id: "s-circle",
      prompt: "What shape is the set of all complex numbers $z$ with $|z| = 3$?",
      choices: [
        { text: "A circle of radius $3$ centered at the origin", correct: true, explain: "Constant distance $3$ from the origin is exactly a circle of radius $3$." },
        { text: "A line through the origin at angle $3^\\circ$", explain: "A fixed angle gives a ray. A fixed modulus gives a circle." },
        { text: "The single point $3 + 0i$", explain: "Many points are $3$ away, for example $3i$ and $-3$, not just $3$." },
        { text: "A disk (all points within distance $3$)", explain: "$|z|=3$ is the boundary circle only. $|z|\\le 3$ would be the filled disk." },
      ],
    },
    {
      id: "s-build",
      prompt: "A complex number has $|z| = 6$ and $\\arg z = 90^\\circ$. What is $z$?",
      choices: [
        { text: "$6i$", correct: true, explain: "Angle $90^\\circ$ points straight up the imaginary axis, at distance $6$: $z = 0 + 6i$." },
        { text: "$6$", explain: "That is $\\arg z = 0^\\circ$ (positive real axis). $90^\\circ$ points up." },
        { text: "$-6i$", explain: "That is $\\arg z = -90^\\circ$ (straight down). $90^\\circ$ points up." },
        { text: "$6 + 6i$", explain: "That has $\\arg z = 45^\\circ$ and modulus $6\\sqrt2$, not $90^\\circ$ and $6$." },
      ],
    },
    {
      id: "s-q2-fix",
      prompt: "For $z = -2 + 2i$, the bare $\\arctan\\dfrac{2}{-2} = -45^\\circ$. What is the argument after the quadrant fix?",
      choices: [
        { text: "$135^\\circ$", correct: true, explain: "The point is in quadrant II, so $a<0$. Add $180^\\circ$: $-45^\\circ + 180^\\circ = 135^\\circ$." },
        { text: "$-45^\\circ$", explain: "That is the bare arctan. Because $a<0$, you still add $180^\\circ$." },
        { text: "$45^\\circ$", explain: "$45^\\circ$ is quadrant I ($2+2i$). Here $a<0$, so the ray is in quadrant II." },
        { text: "$225^\\circ$", explain: "$225^\\circ$ is quadrant III. Here $b>0$, so the point is above the axis." },
      ],
    },
    {
      id: "s-distance-formula",
      prompt: "Which expression gives the distance between $z_1 = a_1 + b_1 i$ and $z_2 = a_2 + b_2 i$?",
      choices: [
        { text: "$\\sqrt{(a_1-a_2)^2 + (b_1-b_2)^2}$", correct: true, explain: "The distance is $|z_1-z_2|$, and $z_1-z_2=(a_1-a_2)+(b_1-b_2)i$, so its modulus roots the squared gaps." },
        { text: "$\\sqrt{(a_1+a_2)^2 + (b_1+b_2)^2}$", explain: "That is $|z_1+z_2|$. Distance uses the difference, so the parts subtract, not add." },
        { text: "$|a_1-a_2| + |b_1-b_2|$", explain: "That adds the two gaps like blocks on a grid. The straight-line distance roots the sum of their squares." },
        { text: "$\\sqrt{a_1^2+b_1^2} - \\sqrt{a_2^2+b_2^2}$", explain: "That is $|z_1|-|z_2|$, the difference of the two distances from the origin, not the distance between the points." },
      ],
    },
  ],
};
