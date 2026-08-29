import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "De Moivre and roots of unity".
 * Grounded in the lesson: De Moivre raises the modulus to the power $n$ and
 * multiplies the argument by $n$; the $n$th roots of unity are $n$ points
 * equally spaced by $360^\circ/n$ on the unit circle, starting at $1$, given by
 * $z_k = \cos\frac{360^\circ k}{n} + i\sin\frac{360^\circ k}{n}$ for
 * $k = 0,\dots,n-1$. Distractors are the classic traps: leaving $r$ un-raised or
 * multiplying it by $n$, leaving the argument unchanged, miscounting the roots,
 * using the wrong spacing, or reporting only a single root.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-power-mod",
      prompt: "For $(3(\\cos 40^\\circ + i\\sin 40^\\circ))^2$, what is the new modulus?",
      choices: [
        { text: "$6$", explain: "That multiplies $r$ by $n$ ($3 \\cdot 2$). The power is an exponent, so it is $3^2 = 9$." },
        { text: "$3$", explain: "That leaves $r$ unchanged. A power raises the modulus: $3^2 = 9$." },
        { text: "$9$", correct: true, explain: "De Moivre raises the modulus to the power: $3^2 = 9$." },
        { text: "$27$", explain: "That is $3^3$. The exponent is $n = 2$, so $3^2 = 9$." },
      ],
    },
    {
      id: "c-power-arg",
      prompt: "For $(\\cos 20^\\circ + i\\sin 20^\\circ)^4$, what is the new argument?",
      choices: [
        { text: "$24^\\circ$", explain: "That adds $n$ to $t$ ($20 + 4$). De Moivre multiplies the argument: $4 \\cdot 20^\\circ$." },
        { text: "$80^\\circ$", correct: true, explain: "The argument is multiplied by $n$: $4 \\cdot 20^\\circ = 80^\\circ$." },
        { text: "$20^\\circ$", explain: "That leaves the argument unchanged. A power multiplies it by $n = 4$." },
        { text: "$5^\\circ$", explain: "That divides by $n$. The power multiplies the argument, giving $80^\\circ$." },
      ],
    },
    {
      id: "c-power-both",
      prompt: "Apply De Moivre: $(2(\\cos 30^\\circ + i\\sin 30^\\circ))^2 = ?$",
      choices: [
        { text: "$2(\\cos 60^\\circ + i\\sin 60^\\circ)$", explain: "The modulus was left un-raised. It should be $2^2 = 4$." },
        { text: "$4(\\cos 30^\\circ + i\\sin 30^\\circ)$", explain: "The angle was left unchanged. It should double to $60^\\circ$." },
        { text: "$2(\\cos 15^\\circ + i\\sin 15^\\circ)$", explain: "The angle was halved and the modulus left alone. A power multiplies the angle and raises the modulus." },
        { text: "$4(\\cos 60^\\circ + i\\sin 60^\\circ)$", correct: true, explain: "Square the modulus, $2^2 = 4$, and double the angle, $2 \\cdot 30^\\circ = 60^\\circ$." },
      ],
    },
    {
      id: "c-count-5",
      prompt: "How many distinct 5th roots of unity are there?",
      choices: [
        { text: "$4$", explain: "That miscounts. The $n$th roots number exactly $n = 5$." },
        { text: "$5$", correct: true, explain: "There are exactly $n$ distinct $n$th roots of unity, so $5$." },
        { text: "$10$", explain: "That doubles the count. There are exactly $n = 5$ roots." },
        { text: "$1$", explain: "Only $z = 1$ is the obvious one, but there are $5$ in all, spaced around the circle." },
      ],
    },
    {
      id: "c-spacing-6",
      prompt: "The 6th roots of unity are spaced how many degrees apart?",
      choices: [
        { text: "$6^\\circ$", explain: "That is $n$ degrees, not the spacing. Spacing is $\\dfrac{360^\\circ}{n} = 60^\\circ$." },
        { text: "$60^\\circ$", correct: true, explain: "Spacing is $\\dfrac{360^\\circ}{n} = \\dfrac{360^\\circ}{6} = 60^\\circ$." },
        { text: "$72^\\circ$", explain: "That is $\\dfrac{360^\\circ}{5}$, the spacing for $n = 5$, not $n = 6$." },
        { text: "$30^\\circ$", explain: "That is $\\dfrac{360^\\circ}{12}$. For $n = 6$ the step is $60^\\circ$." },
      ],
    },
    {
      id: "c-spacing-8",
      prompt: "The 8th roots of unity are equally spaced by how many degrees?",
      choices: [
        { text: "$8^\\circ$", explain: "That is $n$ degrees. The spacing is $\\dfrac{360^\\circ}{n} = 45^\\circ$." },
        { text: "$90^\\circ$", explain: "That is $\\dfrac{360^\\circ}{4}$, the spacing for $n = 4$." },
        { text: "$45^\\circ$", correct: true, explain: "$\\dfrac{360^\\circ}{8} = 45^\\circ$ between neighbors." },
        { text: "$40^\\circ$", explain: "That is $\\dfrac{360^\\circ}{9}$. For $n = 8$ the step is $45^\\circ$." },
      ],
    },
    {
      id: "c-fourth-set",
      prompt: "Which list gives all the 4th roots of unity?",
      choices: [
        { text: "$1,\\ -1$", explain: "Those are only the square roots of unity ($n = 2$). For $n = 4$ there are four." },
        { text: "$i,\\ -i$", explain: "Those are two of them, but $1$ and $-1$ are missing." },
        { text: "$1,\\ i$", explain: "That is only half the list. There are exactly $4$ fourth roots." },
        { text: "$1,\\ i,\\ -1,\\ -i$", correct: true, explain: "Starting at $1$ and stepping $90^\\circ$ gives $1, i, -1, -i$." },
      ],
    },
    {
      id: "c-always-one",
      prompt: "Which number is one of the $n$th roots of unity for every $n$?",
      choices: [
        { text: "$0$", explain: "$0^n = 0$, never $1$, so $0$ is never a root of unity." },
        { text: "$1$", correct: true, explain: "$1^n = 1$ for every $n$, so $z = 1$ is always a root of unity (it is $z_0$)." },
        { text: "$i$", explain: "$i$ is a root of unity only when $4$ divides $n$. It is not universal." },
        { text: "$-1$", explain: "$-1$ is a root of unity only when $n$ is even. It is not universal." },
      ],
    },
    {
      id: "c-cube-which",
      prompt: "Which complex number is a cube root of unity?",
      choices: [
        { text: "$i$", explain: "$i^3 = -i \\ne 1$, so $i$ is a fourth root of unity, not a cube root." },
        { text: "$\\tfrac{1}{2} + \\tfrac{\\sqrt{3}}{2}i$", explain: "This is $\\cos 60^\\circ + i\\sin 60^\\circ$, a 6th root of unity. Its cube is $\\cos 180^\\circ = -1$." },
        { text: "$-\\tfrac{1}{2} + \\tfrac{\\sqrt{3}}{2}i$", correct: true, explain: "This is $\\cos 120^\\circ + i\\sin 120^\\circ$, and cubing it gives $\\cos 360^\\circ = 1$." },
        { text: "$-1$", explain: "$(-1)^3 = -1 \\ne 1$, so $-1$ is not a cube root of unity." },
      ],
    },
    {
      id: "c-root-modulus",
      prompt: "Every root of unity has what modulus?",
      choices: [
        { text: "$n$", explain: "The count is $n$, but the distance from the origin is $1$." },
        { text: "$\\tfrac{1}{n}$", explain: "The modulus is $1$, not a fraction. All roots sit on the unit circle." },
        { text: "$1$", correct: true, explain: "Roots of unity lie on the unit circle, so each has modulus $1$." },
        { text: "$0$", explain: "Only $z = 0$ has modulus $0$, and it is never a root of unity." },
      ],
    },
    {
      id: "c-power-unit-mod",
      prompt: "What is the modulus of $(\\cos t + i\\sin t)^7$?",
      choices: [
        { text: "$7$", explain: "That would need a base modulus of $7$. Here $r = 1$, and $1^7 = 1$." },
        { text: "$1$", correct: true, explain: "The base modulus is $1$, and De Moivre raises it: $1^7 = 1$." },
        { text: "$7t$", explain: "$7t$ is the new argument, not the modulus. The modulus is $1^7 = 1$." },
        { text: "$t$", explain: "$t$ is the base angle, not a modulus. The modulus stays $1$." },
      ],
    },
    {
      id: "c-demoivre-form",
      prompt: "De Moivre's theorem says $[r(\\cos t + i\\sin t)]^n$ equals:",
      choices: [
        { text: "$r(\\cos nt + i\\sin nt)$", explain: "The modulus must also be raised: $r^n$, not $r$." },
        { text: "$r^n(\\cos t + i\\sin t)$", explain: "The argument must also be multiplied by $n$: $nt$, not $t$." },
        { text: "$nr(\\cos nt + i\\sin nt)$", explain: "The modulus is raised to a power, not multiplied by $n$: $r^n$, not $nr$." },
        { text: "$r^n(\\cos nt + i\\sin nt)$", correct: true, explain: "Raise the modulus to the $n$ and multiply the argument by $n$." },
      ],
    },
    {
      id: "c-apply-45",
      prompt: "Evaluate $(\\cos 45^\\circ + i\\sin 45^\\circ)^2$.",
      choices: [
        { text: "$1$", explain: "$1 = \\cos 0^\\circ$. Doubling $45^\\circ$ gives $90^\\circ$, whose value is $i$." },
        { text: "$-1$", explain: "$-1 = \\cos 180^\\circ$. That would need the angle to reach $180^\\circ$, but $2 \\cdot 45^\\circ = 90^\\circ$." },
        { text: "$i$", correct: true, explain: "Double the angle: $\\cos 90^\\circ + i\\sin 90^\\circ = 0 + i = i$." },
        { text: "$\\cos 45^\\circ + i\\sin 45^\\circ$", explain: "That is the first power. Squaring doubles the angle to $90^\\circ$." },
      ],
    },
    {
      id: "c-square-roots",
      prompt: "What are the two square roots of unity (the 2nd roots of $1$)?",
      choices: [
        { text: "$i$ and $-i$", explain: "Those square to $-1$, not $1$. They are 4th roots of unity, not square roots." },
        { text: "$1$ and $-1$", correct: true, explain: "Stepping $\\dfrac{360^\\circ}{2} = 180^\\circ$ from $1$ gives $-1$. Both square to $1$." },
        { text: "$1$ and $i$", explain: "$i^2 = -1 \\ne 1$, so $i$ is not a square root of unity." },
        { text: "$1$ only", explain: "There are exactly $2$ square roots. $-1$ also satisfies $(-1)^2 = 1$." },
      ],
    },
    {
      id: "c-spacing-3",
      prompt: "The three cube roots of unity are spaced how many degrees apart?",
      choices: [
        { text: "$3^\\circ$", explain: "That is $n$ degrees. Spacing is $\\dfrac{360^\\circ}{n} = 120^\\circ$." },
        { text: "$60^\\circ$", explain: "That is $\\dfrac{360^\\circ}{6}$, the spacing for $n = 6$." },
        { text: "$360^\\circ$", explain: "That is a full turn shared among all three. Each step is $\\dfrac{360^\\circ}{3} = 120^\\circ$." },
        { text: "$120^\\circ$", correct: true, explain: "$\\dfrac{360^\\circ}{3} = 120^\\circ$ between neighbors." },
      ],
    },
  ],
  summit: [
    {
      id: "s-1pi-2",
      prompt: "Evaluate $(1 + i)^2$.",
      choices: [
        { text: "$2$", explain: "That squares only the modulus and drops the angle. The doubled angle $90^\\circ$ makes it $2i$." },
        { text: "$1 + i$", explain: "That is the first power, not the square." },
        { text: "$2i$", correct: true, explain: "$1 + i = \\sqrt{2}(\\cos 45^\\circ + i\\sin 45^\\circ)$, so the square is $(\\sqrt{2})^2(\\cos 90^\\circ + i\\sin 90^\\circ) = 2i$. Directly, $1 + 2i + i^2 = 2i$." },
        { text: "$-2$", explain: "That would be $2\\cos 180^\\circ$. The angle doubles to $90^\\circ$, not $180^\\circ$, giving $2i$." },
      ],
    },
    {
      id: "s-1pi-4",
      prompt: "Evaluate $(1 + i)^4$.",
      choices: [
        { text: "$4$", explain: "The modulus is right, but $4 \\cdot 45^\\circ = 180^\\circ$ points along the negative real axis: $-4$." },
        { text: "$-4$", correct: true, explain: "$(\\sqrt{2})^4 = 4$ and $4 \\cdot 45^\\circ = 180^\\circ$, so it is $4(\\cos 180^\\circ) = -4$. Check: $(2i)^2 = -4$." },
        { text: "$4i$", explain: "That is angle $90^\\circ$. Here the angle is $4 \\cdot 45^\\circ = 180^\\circ$, giving $-4$." },
        { text: "$-4i$", explain: "That is angle $270^\\circ$. The angle here is $180^\\circ$, so the value is $-4$." },
      ],
    },
    {
      id: "s-1pi-6",
      prompt: "Evaluate $(1 + i)^6$.",
      choices: [
        { text: "$8i$", explain: "That is angle $90^\\circ$. Here $6 \\cdot 45^\\circ = 270^\\circ$, which points down, giving $-8i$." },
        { text: "$-8i$", correct: true, explain: "$(\\sqrt{2})^6 = 8$ and $6 \\cdot 45^\\circ = 270^\\circ$, so it is $8(\\cos 270^\\circ + i\\sin 270^\\circ) = -8i$. Check: $(2i)^3 = -8i$." },
        { text: "$-8$", explain: "That is angle $180^\\circ$. The angle here is $270^\\circ$, giving $-8i$." },
        { text: "$8$", explain: "That squares the modulus correctly but ignores the angle $270^\\circ$." },
      ],
    },
    {
      id: "s-2cis30-3",
      prompt: "Evaluate $(2(\\cos 30^\\circ + i\\sin 30^\\circ))^3$.",
      choices: [
        { text: "$2(\\cos 90^\\circ + i\\sin 90^\\circ) = 2i$", explain: "The modulus was left un-raised. It should be $2^3 = 8$." },
        { text: "$6(\\cos 90^\\circ + i\\sin 90^\\circ) = 6i$", explain: "The modulus was multiplied by $n$ ($2 \\cdot 3$) instead of raised. It should be $2^3 = 8$." },
        { text: "$8(\\cos 30^\\circ + i\\sin 30^\\circ)$", explain: "The angle was left unchanged. It should triple to $90^\\circ$." },
        { text: "$8(\\cos 90^\\circ + i\\sin 90^\\circ) = 8i$", correct: true, explain: "Cube the modulus, $2^3 = 8$, and triple the angle, $3 \\cdot 30^\\circ = 90^\\circ$." },
      ],
    },
    {
      id: "s-cube-list",
      prompt: "Which list gives all three cube roots of unity?",
      choices: [
        { text: "$1,\\ i,\\ -1$", explain: "$i^3 = -i \\ne 1$ and $(-1)^3 = -1 \\ne 1$. These are not all cube roots." },
        { text: "$-1,\\ i,\\ -i$", explain: "None of these cubes to $1$. The cube roots include $1$ and the two at $120^\\circ, 240^\\circ$." },
        { text: "$1,\\ -\\tfrac{1}{2} + \\tfrac{\\sqrt{3}}{2}i,\\ -\\tfrac{1}{2} - \\tfrac{\\sqrt{3}}{2}i$", correct: true, explain: "These are $\\cos\\theta + i\\sin\\theta$ at $0^\\circ, 120^\\circ, 240^\\circ$: the three cube roots of unity." },
        { text: "$1,\\ \\tfrac{1}{2} + \\tfrac{\\sqrt{3}}{2}i,\\ \\tfrac{1}{2} - \\tfrac{\\sqrt{3}}{2}i$", explain: "Those two are $\\cos(\\pm 60^\\circ) + i\\sin(\\pm 60^\\circ)$, which are 6th roots of unity, not cube roots." },
      ],
    },
    {
      id: "s-fourth-list",
      prompt: "List the fourth roots of unity.",
      choices: [
        { text: "$1,\\ -1$", explain: "Those are only the square roots of unity. There are four fourth roots." },
        { text: "$i,\\ -i$", explain: "Those are two of them, but $1$ and $-1$ are missing." },
        { text: "$1,\\ i,\\ -1$", explain: "That drops $-i$. There are exactly four, one per axis direction." },
        { text: "$1,\\ i,\\ -1,\\ -i$", correct: true, explain: "Stepping $90^\\circ$ from $1$ gives all four, one along each axis." },
      ],
    },
    {
      id: "s-why-n",
      prompt: "Why are there exactly $n$ distinct $n$th roots of unity?",
      choices: [
        { text: "Because the modulus changes each time you increase $k$", explain: "The modulus is always $1$. It is the angle that steps, and it repeats after a full turn." },
        { text: "Because only $n$ angles are less than $90^\\circ$", explain: "The angles run all the way to $360^\\circ$, not just to $90^\\circ$." },
        { text: "Taking $k = n$ adds a full $360^\\circ$, returning to $k = 0$, so the roots repeat after $n$ of them", correct: true, explain: "The angle $\\dfrac{360^\\circ n}{n} = 360^\\circ$ is the same terminal side as $0^\\circ$, so no new roots appear." },
        { text: "Because the number $1$ has $n$ digits", explain: "This has nothing to do with digits. It is the $360^\\circ$ repeat that caps the count at $n$." },
      ],
    },
    {
      id: "s-trap-r",
      prompt: "A student writes $(2(\\cos 40^\\circ + i\\sin 40^\\circ))^3 = 2(\\cos 120^\\circ + i\\sin 120^\\circ)$. What is the mistake?",
      choices: [
        { text: "The angle should stay $40^\\circ$", explain: "No: De Moivre multiplies the argument, so $3 \\cdot 40^\\circ = 120^\\circ$ is correct." },
        { text: "The modulus must be cubed: $2^3 = 8$, so it is $8(\\cos 120^\\circ + i\\sin 120^\\circ)$", correct: true, explain: "The angle $3 \\cdot 40^\\circ = 120^\\circ$ is right, but the modulus must be raised to the power: $2^3 = 8$." },
        { text: "Nothing, the answer is correct", explain: "The modulus was left un-raised. It should be $2^3 = 8$, not $2$." },
        { text: "The angle should be $43^\\circ$", explain: "The argument is multiplied by $n$, not added to $n$: $3 \\cdot 40^\\circ = 120^\\circ$." },
      ],
    },
    {
      id: "s-trap-one-root",
      prompt: "To find every cube root of unity, a student reports only $z = 1$. What did they forget?",
      choices: [
        { text: "Nothing, $1$ is the only cube root of unity", explain: "There are exactly $3$ cube roots. $\\cos 120^\\circ + i\\sin 120^\\circ$ and its mirror are also roots." },
        { text: "To cube the modulus of $1$", explain: "The modulus is already $1$. The missing part is the other two angles." },
        { text: "The root at $90^\\circ$", explain: "$90^\\circ$ is not a multiple of $\\dfrac{360^\\circ}{3} = 120^\\circ$. The missing roots are at $120^\\circ$ and $240^\\circ$." },
        { text: "The values $k = 1$ and $k = 2$, which give two more roots at $120^\\circ$ and $240^\\circ$", correct: true, explain: "The $+360^\\circ k$ term generates all $n = 3$ roots, not just $z_0 = 1$." },
      ],
    },
    {
      id: "s-trap-spacing",
      prompt: "A student says the 5th roots of unity are $60^\\circ$ apart. What is the correct spacing?",
      choices: [
        { text: "$60^\\circ$ is correct", explain: "$60^\\circ = \\dfrac{360^\\circ}{6}$ is the spacing for $n = 6$, not $n = 5$." },
        { text: "$72^\\circ$, since $\\dfrac{360^\\circ}{5} = 72^\\circ$", correct: true, explain: "Spacing is $\\dfrac{360^\\circ}{n}$, and $\\dfrac{360^\\circ}{5} = 72^\\circ$." },
        { text: "$36^\\circ$", explain: "That is $\\dfrac{360^\\circ}{10}$. For $n = 5$ the step is $72^\\circ$." },
        { text: "$90^\\circ$", explain: "That is $\\dfrac{360^\\circ}{4}$, the spacing for $n = 4$." },
      ],
    },
    {
      id: "s-cube-of-8",
      prompt: "Which complex number is one of the cube roots of $8$?",
      choices: [
        { text: "$4$", explain: "$4^3 = 64 \\ne 8$. The real cube root of $8$ is $2$, not $4$." },
        { text: "$2i$", explain: "$(2i)^3 = -8i \\ne 8$, so $2i$ is not a cube root of $8$." },
        { text: "$-1 + \\sqrt{3}\\,i$", correct: true, explain: "$8 = 8(\\cos 0^\\circ + i\\sin 0^\\circ)$, so a root is $8^{1/3}(\\cos 120^\\circ + i\\sin 120^\\circ) = 2(-\\tfrac{1}{2} + \\tfrac{\\sqrt{3}}{2}i) = -1 + \\sqrt{3}\\,i$." },
        { text: "$8$", explain: "$8^3 = 512 \\ne 8$. You would cube, not keep, the number." },
      ],
    },
    {
      id: "s-circle",
      prompt: "The $n$th roots of unity all lie on which curve?",
      choices: [
        { text: "A circle of radius $n$", explain: "The radius is $1$, not $n$. $n$ is the count of roots." },
        { text: "The unit circle (modulus $1$)", correct: true, explain: "Each root has modulus $1$, so they sit on the circle of radius $1$." },
        { text: "The real axis", explain: "Only $1$ (and $-1$ when $n$ is even) are real. Most roots are off the axis." },
        { text: "A straight line through the origin", explain: "Equally spaced points on a circle are not collinear." },
      ],
    },
    {
      id: "s-mod-power",
      prompt: "What is the modulus of $(3(\\cos t + i\\sin t))^4$?",
      choices: [
        { text: "$12$", explain: "That multiplies $r$ by $n$ ($3 \\cdot 4$). The power is an exponent: $3^4 = 81$." },
        { text: "$3$", explain: "That leaves $r$ unchanged. The power raises it to $3^4 = 81$." },
        { text: "$27$", explain: "That is $3^3$. The exponent is $4$, so $3^4 = 81$." },
        { text: "$81$", correct: true, explain: "Raise the modulus to the power: $3^4 = 81$." },
      ],
    },
    {
      id: "s-sqrt3i-2",
      prompt: "Evaluate $(\\sqrt{3} + i)^2$.",
      choices: [
        { text: "$2\\sqrt{3} + 2i$", explain: "That is $4(\\cos 30^\\circ + i\\sin 30^\\circ)$. The angle must double to $60^\\circ$." },
        { text: "$1 + \\sqrt{3}\\,i$", explain: "That is $2(\\cos 60^\\circ + i\\sin 60^\\circ)$. The modulus must be squared to $4$, not left at $2$." },
        { text: "$2 + 2\\sqrt{3}\\,i$", correct: true, explain: "$\\sqrt{3} + i = 2(\\cos 30^\\circ + i\\sin 30^\\circ)$, so the square is $4(\\cos 60^\\circ + i\\sin 60^\\circ) = 2 + 2\\sqrt{3}\\,i$. Check: $3 + 2\\sqrt{3}i + i^2 = 2 + 2\\sqrt{3}i$." },
        { text: "$4$", explain: "That squares the modulus but drops the angle $60^\\circ$." },
      ],
    },
    {
      id: "s-6th-count",
      prompt: "How many distinct 6th roots of unity are there, and how far apart are consecutive ones?",
      choices: [
        { text: "$6$ roots, $30^\\circ$ apart", explain: "The count is right, but the spacing is $\\dfrac{360^\\circ}{6} = 60^\\circ$, not $30^\\circ$." },
        { text: "$6$ roots, $60^\\circ$ apart", correct: true, explain: "There are exactly $n = 6$, spaced $\\dfrac{360^\\circ}{6} = 60^\\circ$." },
        { text: "$3$ roots, $120^\\circ$ apart", explain: "That describes the cube roots ($n = 3$), not the 6th roots." },
        { text: "$12$ roots, $60^\\circ$ apart", explain: "There are exactly $6$ sixth roots, not $12$, though the $60^\\circ$ spacing is right for $n = 6$." },
      ],
    },
  ],
};
