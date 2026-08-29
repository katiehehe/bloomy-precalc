import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Angular and linear velocity".
 * Grounded in the lesson: arc length $s = r\theta$ with $\theta$ in radians, the
 * radian definition ($\theta = 1$ gives $s = r$), angular speed $\omega = \theta/t$,
 * and linear speed $v = s/t = r\omega$ (so the same $\omega$ makes a bigger radius
 * move faster). Distractors are the classic traps: degrees left un-converted,
 * mixing up $\omega$ with $v$, forgetting the $2\pi$ per revolution, dividing when
 * you should multiply, and slipping between per-minute and per-second.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-radian-def",
      prompt: "By the very definition of a radian, when a wheel of radius $r$ turns through exactly $\\theta = 1$ radian, how far does a rim point travel?",
      choices: [
        { text: "exactly $r$", correct: true, explain: "A radian is defined so that an angle of $1$ radian wraps exactly one radius of arc around the rim, so $s = r \\cdot 1 = r$." },
        { text: "exactly $2\\pi r$", explain: "That is the full circumference, the arc for one whole revolution ($\\theta = 2\\pi$), not for $\\theta = 1$." },
        { text: "exactly $\\pi r$", explain: "That is the arc for half a revolution ($\\theta = \\pi$), not for a single radian." },
        { text: "exactly $1$", explain: "The arc equals $r$, not $1$. They only match when the radius happens to be $1$." },
      ],
    },
    {
      id: "c-arc-formula",
      prompt: "Which formula gives the arc length $s$ a rim point travels when a wheel of radius $r$ turns through angle $\\theta$ (in radians)?",
      choices: [
        { text: "$s = r\\theta$", correct: true, explain: "Arc length is radius times angle in radians, straight from the radian definition." },
        { text: "$s = \\dfrac{\\theta}{r}$", explain: "Dividing by the radius is upside down: a bigger wheel sweeps a longer arc, not a shorter one." },
        { text: "$s = r + \\theta$", explain: "Arc length scales with both quantities, so they multiply. Adding them mixes a length and an angle." },
        { text: "$s = \\dfrac{r}{\\theta}$", explain: "This would shrink the arc as the angle grows, which is backwards." },
      ],
    },
    {
      id: "c-arc-compute",
      prompt: "A wheel of radius $3$ turns through an angle of $2$ radians. How far does a rim point travel?",
      choices: [
        { text: "$6$", correct: true, explain: "$s = r\\theta = 3 \\cdot 2 = 6$ units of arc." },
        { text: "$1.5$", explain: "That is $\\dfrac{r}{\\theta} = \\dfrac{3}{2}$. Arc length multiplies radius and angle, it does not divide them." },
        { text: "$5$", explain: "That adds $3 + 2$. The formula $s = r\\theta$ multiplies the two." },
        { text: "$3$", explain: "That is the arc for $\\theta = 1$ radian. Here $\\theta = 2$, so double it to $6$." },
      ],
    },
    {
      id: "c-arc-radians",
      prompt: "Before you may use $s = r\\theta$, the angle $\\theta$ must be measured in:",
      choices: [
        { text: "degrees", explain: "Plugging degrees straight into $s = r\\theta$ inflates the arc. The formula only holds for radians." },
        { text: "**radians**", correct: true, explain: "The formula comes directly from the radian definition, so convert any degree measure to radians first." },
        { text: "revolutions", explain: "You would first turn revolutions into radians ($1$ revolution $= 2\\pi$) before using the formula." },
        { text: "any unit works", explain: "Only radians give the clean $s = r\\theta$. Every other unit needs converting first." },
      ],
    },
    {
      id: "c-arc-quarter",
      prompt: "A wheel of radius $4$ turns through $\\dfrac{\\pi}{2}$ radians. How far does a rim point travel?",
      choices: [
        { text: "$\\dfrac{\\pi}{2}$", explain: "That is just the angle. You still have to multiply by the radius $4$ to get the arc." },
        { text: "$8\\pi$", explain: "That multiplies $4$ by $2\\pi$ (a whole revolution). Here the angle is only $\\dfrac{\\pi}{2}$." },
        { text: "$2\\pi$", correct: true, explain: "$s = r\\theta = 4 \\cdot \\dfrac{\\pi}{2} = 2\\pi$." },
        { text: "$2$", explain: "That drops the $\\pi$: treating $\\dfrac{\\pi}{2}$ as $\\dfrac{1}{2}$ gives $2$, but keep the $\\pi$ for $2\\pi$." },
      ],
    },
    {
      id: "c-omega-def",
      prompt: "The **angular speed** $\\omega$ of a spinning wheel measures:",
      choices: [
        { text: "distance travelled per unit time", explain: "That describes linear speed $v = \\dfrac{s}{t}$. Angular speed tracks the angle, not the distance." },
        { text: "angle swept per unit time", correct: true, explain: "$\\omega = \\dfrac{\\theta}{t}$: how fast the angle grows, measured in radians per unit time." },
        { text: "the radius of the wheel", explain: "The radius is a fixed length, not a rate. Angular speed is $\\dfrac{\\theta}{t}$." },
        { text: "the total number of turns", explain: "A count of turns is not a rate. Angular speed divides the angle by the time it took." },
      ],
    },
    {
      id: "c-omega-compute",
      prompt: "A wheel sweeps through $10$ radians in $2$ seconds. What is its angular speed $\\omega$?",
      choices: [
        { text: "$20$ rad/s", explain: "That multiplies $10 \\cdot 2$. Angular speed divides angle by time." },
        { text: "$0.2$ rad/s", explain: "That is $\\dfrac{t}{\\theta} = \\dfrac{2}{10}$, flipped. The rate is $\\omega = \\dfrac{\\theta}{t}$." },
        { text: "$8$ rad/s", explain: "That subtracts $10 - 2$. A rate is a quotient, not a difference." },
        { text: "$5$ rad/s", correct: true, explain: "$\\omega = \\dfrac{\\theta}{t} = \\dfrac{10}{2} = 5$ rad/s." },
      ],
    },
    {
      id: "c-v-formula",
      prompt: "Linear (rim) speed $v$ relates to angular speed $\\omega$ by which formula?",
      choices: [
        { text: "$v = \\dfrac{\\omega}{r}$", explain: "Dividing by the radius is backwards: sitting farther out (bigger $r$) makes you faster, not slower." },
        { text: "$v = r\\omega$", correct: true, explain: "Substituting $s = r\\theta$ into $v = \\dfrac{s}{t}$ gives $v = r \\cdot \\dfrac{\\theta}{t} = r\\omega$." },
        { text: "$v = \\omega - r$", explain: "Speed is built by multiplying radius and angular speed, not by subtracting a length from a rate." },
        { text: "$v = r + \\omega$", explain: "The relationship is a product $r\\omega$, not a sum." },
      ],
    },
    {
      id: "c-v-compute",
      prompt: "A wheel of radius $3$ m spins at $\\omega = 5$ rad/s. What is its rim speed $v$?",
      choices: [
        { text: "$8$ m/s", explain: "That adds $3 + 5$. The formula $v = r\\omega$ multiplies." },
        { text: "$0.6$ m/s", explain: "That is $\\dfrac{r}{\\omega} = \\dfrac{3}{5}$. You divide only when solving for $\\omega$, not for $v$." },
        { text: "$15$ m/s", correct: true, explain: "$v = r\\omega = 3 \\cdot 5 = 15$ m/s." },
        { text: "$5$ m/s", explain: "That ignores the radius. $v = r\\omega$ scales the $5$ by $r = 3$." },
      ],
    },
    {
      id: "c-v-from-st",
      prompt: "A rim point travels an arc of $20$ m in $4$ s. What is its linear speed $v$?",
      choices: [
        { text: "$80$ m/s", explain: "That multiplies $20 \\cdot 4$. Speed divides distance by time." },
        { text: "$0.2$ m/s", explain: "That is $\\dfrac{t}{s} = \\dfrac{4}{20}$, upside down. Speed is $v = \\dfrac{s}{t}$." },
        { text: "$16$ m/s", explain: "That subtracts $20 - 4$. Speed is a quotient, not a difference." },
        { text: "$5$ m/s", correct: true, explain: "Linear speed is distance over time: $v = \\dfrac{s}{t} = \\dfrac{20}{4} = 5$ m/s." },
      ],
    },
    {
      id: "c-edge-faster",
      prompt: "Two children ride a merry-go-round turning at one angular speed $\\omega$. One sits near the center, the other at the edge. Who moves faster?",
      choices: [
        { text: "the child at the edge (larger $r$)", correct: true, explain: "$v = r\\omega$ with the same $\\omega$, so the larger radius gives the larger linear speed." },
        { text: "the child near the center", explain: "Smaller $r$ means smaller $v$. The inner rider is slower, not faster." },
        { text: "they move at the same linear speed", explain: "They share $\\omega$, but $v = r\\omega$ differs because their radii differ." },
        { text: "it depends on their weights", explain: "Mass never appears in $v = r\\omega$. Only radius and angular speed set the rim speed." },
      ],
    },
    {
      id: "c-omega-shared",
      prompt: "On a rigid spinning disk, which quantity is the **same** for every point, from center to rim?",
      choices: [
        { text: "the linear speed $v$", explain: "$v = r\\omega$ grows with radius, so outer points move faster. Linear speed is not shared." },
        { text: "the angular speed $\\omega$", correct: true, explain: "Every point sweeps the same angle in the same time, so $\\omega = \\dfrac{\\theta}{t}$ is shared." },
        { text: "the arc length per second", explain: "Arc length per second is exactly $v$, which depends on $r$, so it differs point to point." },
        { text: "the distance from the center", explain: "That is the radius, which is different for each point by definition." },
      ],
    },
    {
      id: "c-rev-radians",
      prompt: "One full revolution equals how many radians?",
      choices: [
        { text: "$\\pi$", explain: "$\\pi$ radians is only half a revolution, which is $180^\\circ$." },
        { text: "$360$", explain: "That is the count in degrees. In radians a full turn is $2\\pi$." },
        { text: "$2\\pi$", correct: true, explain: "A full turn wraps the whole circumference $2\\pi r$, which is $2\\pi$ radii of arc, so $\\theta = 2\\pi$." },
        { text: "$1$", explain: "One radian is a small slice of a turn (about $57^\\circ$), not the whole thing." },
      ],
    },
    {
      id: "c-solve-omega",
      prompt: "A wheel of radius $3$ m must reach a rim speed of $v = 12$ m/s. What angular speed $\\omega$ is needed?",
      choices: [
        { text: "$36$ rad/s", explain: "That multiplies $12 \\cdot 3$. To undo $v = r\\omega$ you divide by $r$, not multiply." },
        { text: "$9$ rad/s", explain: "That subtracts $12 - 3$. Solving for $\\omega$ divides $v$ by $r$." },
        { text: "$0.25$ rad/s", explain: "That is $\\dfrac{r}{v} = \\dfrac{3}{12}$, flipped. The rearrangement is $\\omega = \\dfrac{v}{r}$." },
        { text: "$4$ rad/s", correct: true, explain: "Solve $v = r\\omega$ for $\\omega$: $\\omega = \\dfrac{v}{r} = \\dfrac{12}{3} = 4$ rad/s." },
      ],
    },
    {
      id: "c-deg-convert",
      prompt: "To use $s = r\\theta$, you first convert $90^\\circ$ to radians. What is $90^\\circ$ in radians?",
      choices: [
        { text: "$\\dfrac{\\pi}{2}$", correct: true, explain: "Multiply degrees by $\\dfrac{\\pi}{180}$: $90 \\cdot \\dfrac{\\pi}{180} = \\dfrac{\\pi}{2}$." },
        { text: "$90$", explain: "Leaving it as $90$ keeps degrees. You must convert with the factor $\\dfrac{\\pi}{180}$." },
        { text: "$\\pi$", explain: "$\\pi$ radians is $180^\\circ$. A right angle is half of that, $\\dfrac{\\pi}{2}$." },
        { text: "$\\dfrac{\\pi}{4}$", explain: "$\\dfrac{\\pi}{4}$ is $45^\\circ$. Doubling the angle doubles the radians to $\\dfrac{\\pi}{2}$." },
      ],
    },
  ],
  summit: [
    {
      id: "s-rpm-rads",
      prompt: "A turntable spins at $30$ revolutions per minute (rpm). What is its angular speed in radians per second?",
      choices: [
        { text: "$\\pi$ rad/s", correct: true, explain: "Convert with both factors: $30\\,\\dfrac{\\text{rev}}{\\text{min}} \\cdot \\dfrac{2\\pi\\,\\text{rad}}{1\\,\\text{rev}} \\cdot \\dfrac{1\\,\\text{min}}{60\\,\\text{s}} = \\dfrac{60\\pi}{60} = \\pi$ rad/s." },
        { text: "$30$ rad/s", explain: "That leaves the number untouched. Rpm is not rad/s until you multiply by $2\\pi$ and divide by $60$." },
        { text: "$60\\pi$ rad/s", explain: "That is radians per **minute** ($30 \\cdot 2\\pi$). Divide by $60$ to reach radians per second." },
        { text: "$2\\pi$ rad/s", explain: "That is the speed for $60$ rpm (one revolution per second). At $30$ rpm it is half, so $\\pi$." },
      ],
    },
    {
      id: "s-rpm-v",
      prompt: "A wheel of radius $0.5$ m spins at $60$ rpm. What is its rim speed $v$?",
      choices: [
        { text: "$60$ m/s", explain: "That uses $60$ directly as a speed. First turn rpm into $\\omega = 2\\pi$ rad/s, then multiply by $r$." },
        { text: "$\\pi$ m/s", correct: true, explain: "$60$ rpm is $\\omega = 2\\pi$ rad/s, then $v = r\\omega = 0.5 \\cdot 2\\pi = \\pi$ m/s (about $3.14$)." },
        { text: "$2\\pi$ m/s", explain: "That is $\\omega$ itself. You still multiply by the radius $0.5$ to get the linear speed." },
        { text: "$0.5$ m/s", explain: "That forgets each revolution is $2\\pi$ radians. $60$ rpm is $2\\pi$ rad/s, not $1$ rad/s." },
      ],
    },
    {
      id: "s-deg-arc",
      prompt: "A wheel of radius $6$ turns through $60^\\circ$. What arc length does a rim point travel?",
      choices: [
        { text: "$360$", explain: "That plugs degrees straight in ($6 \\cdot 60$). Convert $60^\\circ$ to $\\dfrac{\\pi}{3}$ first, since $s = r\\theta$ needs radians." },
        { text: "$6$", explain: "That is the arc for $1$ radian. Here $60^\\circ = \\dfrac{\\pi}{3} \\approx 1.05$ rad, giving $2\\pi$." },
        { text: "$2\\pi$", correct: true, explain: "Convert first: $60^\\circ = \\dfrac{\\pi}{3}$ rad, then $s = r\\theta = 6 \\cdot \\dfrac{\\pi}{3} = 2\\pi$." },
        { text: "$\\dfrac{\\pi}{3}$", explain: "That is just the angle in radians. Multiply by the radius $6$ to get the arc." },
      ],
    },
    {
      id: "s-inner-outer",
      prompt: "A rigid disk spins at $\\omega = 3$ rad/s. Point A sits at radius $2$ and point B at radius $4$. How do their linear speeds compare?",
      choices: [
        { text: "they move at the same speed", explain: "Same $\\omega$ does not mean same $v$. Since $v = r\\omega$, the larger radius wins." },
        { text: "A moves twice as fast as B", explain: "Backwards: the outer point (larger $r$) is faster, so B beats A." },
        { text: "B moves four times as fast as A", explain: "Speed scales with $r$, not $r^2$. Doubling $r$ from $2$ to $4$ doubles $v$, it does not quadruple it." },
        { text: "B moves twice as fast as A ($12$ vs $6$ m/s)", correct: true, explain: "$v = r\\omega$: $v_A = 2 \\cdot 3 = 6$ and $v_B = 4 \\cdot 3 = 12$, so double the radius doubles the speed." },
      ],
    },
    {
      id: "s-find-r",
      prompt: "A rim point moves at $v = 20$ m/s while the wheel spins at $\\omega = 4$ rad/s. What is the radius?",
      choices: [
        { text: "$5$ m", correct: true, explain: "Solve $v = r\\omega$ for $r$: $r = \\dfrac{v}{\\omega} = \\dfrac{20}{4} = 5$ m." },
        { text: "$80$ m", explain: "That multiplies $20 \\cdot 4$. To isolate $r$ you divide $v$ by $\\omega$." },
        { text: "$0.2$ m", explain: "That is $\\dfrac{\\omega}{v} = \\dfrac{4}{20}$, flipped. The rearrangement is $r = \\dfrac{v}{\\omega}$." },
        { text: "$16$ m", explain: "That subtracts $20 - 4$. Since $v = r\\omega$ is a product, undo it by dividing." },
      ],
    },
    {
      id: "s-find-omega",
      prompt: "A bicycle wheel of radius $0.35$ m rolls so its rim speed is $v = 7$ m/s. What is its angular speed $\\omega$?",
      choices: [
        { text: "$2.45$ rad/s", explain: "That multiplies $7 \\cdot 0.35$. Solving $v = r\\omega$ for $\\omega$ divides by $r$." },
        { text: "$20$ rad/s", correct: true, explain: "$\\omega = \\dfrac{v}{r} = \\dfrac{7}{0.35} = 20$ rad/s." },
        { text: "$0.05$ rad/s", explain: "That is $\\dfrac{r}{v} = \\dfrac{0.35}{7}$, upside down. The rearrangement is $\\omega = \\dfrac{v}{r}$." },
        { text: "$6.65$ rad/s", explain: "That subtracts $7 - 0.35$. The relation is a product, undone by division." },
      ],
    },
    {
      id: "s-rev-per-sec",
      prompt: "A wheel of radius $1$ m makes $2$ full revolutions every second. What is its rim speed $v$?",
      choices: [
        { text: "$2$ m/s", explain: "That forgets each revolution is $2\\pi$ radians. The arc per turn is the circumference $2\\pi r$, not $1$." },
        { text: "$4$ m/s", explain: "That drops the $\\pi$. Since $\\omega = 4\\pi$ rad/s, $v = 4\\pi$ m/s, about $12.6$." },
        { text: "$4\\pi$ m/s", correct: true, explain: "Each revolution is $2\\pi$ rad, so $\\omega = 2 \\cdot 2\\pi = 4\\pi$ rad/s, and $v = r\\omega = 1 \\cdot 4\\pi = 4\\pi$ m/s." },
        { text: "$2\\pi$ m/s", explain: "That is the speed for $1$ revolution per second. Here there are $2$, so double it." },
      ],
    },
    {
      id: "s-circumference",
      prompt: "How far does a rim point on a wheel of radius $r$ travel in exactly one full revolution?",
      choices: [
        { text: "$\\pi r$", explain: "That is only half a revolution ($\\theta = \\pi$). A full turn is $2\\pi r$." },
        { text: "$2\\pi$", explain: "That is the angle in radians, not a distance. Multiply by $r$ to get the arc." },
        { text: "$r$", explain: "That is the arc for just $1$ radian. A whole revolution is $2\\pi$ radians, giving $2\\pi r$." },
        { text: "$2\\pi r$", correct: true, explain: "One revolution is $\\theta = 2\\pi$ rad, so $s = r\\theta = r \\cdot 2\\pi = 2\\pi r$, the full circumference." },
      ],
    },
    {
      id: "s-double-radius",
      prompt: "You double the radius of a point on a spinning disk but keep the angular speed $\\omega$ fixed. What happens to its linear speed $v$?",
      choices: [
        { text: "$v$ stays the same", explain: "That is true for $\\omega$, which is shared across the disk. But $v = r\\omega$ depends on $r$, so it changes." },
        { text: "$v$ doubles", correct: true, explain: "$v = r\\omega$ is proportional to $r$, so doubling $r$ (with $\\omega$ fixed) doubles $v$." },
        { text: "$v$ is halved", explain: "A larger radius means a faster rim, not a slower one. $v$ grows with $r$." },
        { text: "$v$ quadruples", explain: "$v$ scales linearly with $r$, not with $r^2$, so it only doubles." },
      ],
    },
    {
      id: "s-time-arc",
      prompt: "A rim point moves at $v = 5$ m/s. How long does it take to travel an arc of $s = 20$ m?",
      choices: [
        { text: "$100$ s", explain: "That multiplies $20 \\cdot 5$. Time is distance divided by speed." },
        { text: "$0.25$ s", explain: "That is $\\dfrac{v}{s} = \\dfrac{5}{20}$, flipped. The rearrangement is $t = \\dfrac{s}{v}$." },
        { text: "$4$ s", correct: true, explain: "From $v = \\dfrac{s}{t}$, solve $t = \\dfrac{s}{v} = \\dfrac{20}{5} = 4$ s." },
        { text: "$15$ s", explain: "That subtracts $20 - 5$. Use the quotient $t = \\dfrac{s}{v}$." },
      ],
    },
    {
      id: "s-unit-min-sec",
      prompt: "A fan blade has angular speed $\\omega = 120$ rad/min. What is this in radians per second?",
      choices: [
        { text: "$7200$ rad/s", explain: "That multiplies by $60$. Going from per minute to per second divides by $60$." },
        { text: "$120$ rad/s", explain: "Per minute and per second are different rates. You must divide by $60$ seconds in a minute." },
        { text: "$2\\pi$ rad/s", explain: "No revolutions are involved here, so there is no factor of $2\\pi$. Just divide by $60$." },
        { text: "$2$ rad/s", correct: true, explain: "Divide by the $60$ seconds in a minute: $\\dfrac{120\\,\\text{rad}}{1\\,\\text{min}} \\cdot \\dfrac{1\\,\\text{min}}{60\\,\\text{s}} = 2$ rad/s." },
      ],
    },
    {
      id: "s-deg-trap",
      prompt: "A student computes the arc for radius $10$ and angle $30^\\circ$ as $s = 10 \\cdot 30 = 300$. What went wrong?",
      choices: [
        { text: "they used degrees; $s = r\\theta$ needs radians, so $30^\\circ = \\dfrac{\\pi}{6}$ and $s = \\dfrac{5\\pi}{3}$", correct: true, explain: "The formula only holds in radians. Converting $30^\\circ$ to $\\dfrac{\\pi}{6}$ gives $s = 10 \\cdot \\dfrac{\\pi}{6} = \\dfrac{5\\pi}{3} \\approx 5.24$." },
        { text: "nothing, $300$ is correct", explain: "Plugging degrees into $s = r\\theta$ is invalid. The angle must be in radians first." },
        { text: "they should have divided: $s = \\dfrac{10}{30}$", explain: "Arc length multiplies radius by angle (in radians). The fix is converting the units, not dividing." },
        { text: "they forgot to multiply by $2\\pi$", explain: "There is no full revolution here. The error is using degrees instead of radians, not a missing $2\\pi$." },
      ],
    },
    {
      id: "s-two-tracks",
      prompt: "A disc spins at $\\omega = 5$ rad/s. A rim point sits at radius $6$ cm and an inner point at radius $2$ cm. What are their linear speeds?",
      choices: [
        { text: "both $5$ cm/s", explain: "That reports $\\omega$, which is shared. But linear speeds differ because $v = r\\omega$ depends on the radius." },
        { text: "rim $30$ cm/s, inner $10$ cm/s", correct: true, explain: "$v = r\\omega$: rim $= 6 \\cdot 5 = 30$ and inner $= 2 \\cdot 5 = 10$ cm/s." },
        { text: "rim $10$ cm/s, inner $30$ cm/s", explain: "Backwards: the larger radius ($6$) gives the larger speed, so the rim is faster." },
        { text: "rim $11$ cm/s, inner $7$ cm/s", explain: "That adds $r + \\omega$. The formula $v = r\\omega$ multiplies, giving $30$ and $10$." },
      ],
    },
    {
      id: "s-omega-vs-v",
      prompt: "Which statement correctly distinguishes **angular speed** $\\omega$ from **linear speed** $v$?",
      choices: [
        { text: "they are the same quantity in different units", explain: "They are genuinely different: one is a turning rate, the other a travel speed, linked by $v = r\\omega$." },
        { text: "$v$ is angle per time and $\\omega$ is distance per time", explain: "It is reversed: $\\omega$ is the angle rate (rad/s) and $v$ is the distance rate (m/s)." },
        { text: "$\\omega$ is angle per time (rad/s); $v$ is distance per time (m/s), with $v = r\\omega$", correct: true, explain: "Angular speed measures how fast the angle turns, linear speed how fast the rim point travels, connected by the radius." },
        { text: "$\\omega = rv$", explain: "The correct link is $v = r\\omega$. You multiply $\\omega$ by $r$ to get $v$, not the other way around." },
      ],
    },
    {
      id: "s-rev-count",
      prompt: "A wheel spins at $\\omega = 4\\pi$ rad/s. How many full revolutions does it complete in one second?",
      choices: [
        { text: "$4\\pi$", explain: "That is the angle in radians per second. Divide by $2\\pi$ to count revolutions." },
        { text: "$8\\pi^2$", explain: "That multiplies by $2\\pi$. To convert radians to revolutions you divide by $2\\pi$." },
        { text: "$4$", explain: "That divides by $\\pi$ instead of $2\\pi$. A revolution is $2\\pi$ rad, so the answer is $2$." },
        { text: "$2$", correct: true, explain: "One revolution is $2\\pi$ rad, so $\\dfrac{4\\pi\\,\\text{rad/s}}{2\\pi\\,\\text{rad/rev}} = 2$ revolutions per second." },
      ],
    },
  ],
};
