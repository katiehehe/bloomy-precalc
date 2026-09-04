import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Roots of unity". Grounded in the
 * lesson: solve $z^n = 1$ by writing $1 = e^{2\pi i k}$, so a unit-modulus
 * $z = e^{i\theta}$ satisfies $e^{in\theta} = e^{2\pi i k}$, hence
 * $\theta = 2\pi k/n = 360^\circ k/n$. The $n$ roots sit equally spaced by
 * $360^\circ/n$ on the unit circle, starting at $1$, given by
 * $z_k = \cos\frac{360^\circ k}{n} + i\sin\frac{360^\circ k}{n}$ for
 * $k = 0,\dots,n-1$. Distractors are the classic traps: dropping the $i$ in
 * the exponential, miscounting the roots, using the wrong spacing, reporting
 * only a single root, forgetting that every root has modulus $1$, or losing
 * the $+360^\circ k$ that generates them all.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-count-3",
      prompt: "How many distinct cube roots of unity are there?",
      choices: [
        { text: "$3$", correct: true, explain: "The $n$th roots of unity number exactly $n$, so there are $3$." },
        { text: "$1$", explain: "Only $z = 1$ is obvious, but there are $3$ in all, spaced $120^\\circ$ apart." },
        { text: "$2$", explain: "That miscounts. A cube root problem ($n = 3$) has three answers." },
        { text: "$6$", explain: "That doubles the count. There are exactly $n = 3$ cube roots." },
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
      id: "c-solve-z3",
      prompt: "How many complex solutions does $z^3 = 1$ have?",
      choices: [
        { text: "$3$", correct: true, explain: "A degree-$3$ equation has $3$ complex roots: the three cube roots of unity." },
        { text: "$1$", explain: "Only $z = 1$ is real, but there are two more complex solutions at $120^\\circ$ and $240^\\circ$." },
        { text: "$2$", explain: "That undercounts. $z^3 = 1$ has exactly $3$ solutions." },
        { text: "Infinitely many", explain: "A polynomial equation of degree $3$ has exactly $3$ roots, not infinitely many." },
      ],
    },
    {
      id: "c-spacing-4",
      prompt: "The 4th roots of unity are spaced how many degrees apart?",
      choices: [
        { text: "$90^\\circ$", correct: true, explain: "Spacing is $\\dfrac{360^\\circ}{n} = \\dfrac{360^\\circ}{4} = 90^\\circ$." },
        { text: "$4^\\circ$", explain: "That is $n$ degrees, not the spacing. The step is $\\dfrac{360^\\circ}{4} = 90^\\circ$." },
        { text: "$45^\\circ$", explain: "That is $\\dfrac{360^\\circ}{8}$, the spacing for $n = 8$." },
        { text: "$120^\\circ$", explain: "That is $\\dfrac{360^\\circ}{3}$, the spacing for $n = 3$." },
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
      id: "c-why-one",
      prompt: "Why can we write $1 = e^{2\\pi i k}$ for any integer $k$?",
      choices: [
        { text: "Because $e^{2\\pi i} = 1$ and each extra integer $k$ is another full turn, still the same point", correct: true, explain: "Euler's formula gives $e^{2\\pi i} = \\cos 2\\pi + i\\sin 2\\pi = 1$, so $e^{2\\pi i k} = 1^k = 1$." },
        { text: "Because $k$ has to be smaller than $n$", explain: "The integer $k$ can be any integer. The bound $k = 0,\\dots,n-1$ comes later, when we drop repeats." },
        { text: "Because the modulus of $1$ equals $k$", explain: "The modulus of $1$ is $1$, not $k$. The $k$ counts full turns around the unit circle." },
        { text: "Because Euler's formula only holds when $k = 0$", explain: "Euler's formula holds for every angle. At $2\\pi k$ it always returns $1$." },
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
      id: "c-not-fourth",
      prompt: "Which complex number is NOT a 4th root of unity?",
      choices: [
        { text: "$\\tfrac{\\sqrt{2}}{2} + \\tfrac{\\sqrt{2}}{2}i$", correct: true, explain: "This is $\\cos 45^\\circ + i\\sin 45^\\circ$, an 8th root of unity. Its 4th power is $\\cos 180^\\circ = -1$, not $1$." },
        { text: "$1$", explain: "$1^4 = 1$, so $1$ is a 4th root of unity ($z_0$)." },
        { text: "$i$", explain: "$i^4 = 1$, so $i$ is a 4th root of unity." },
        { text: "$-1$", explain: "$(-1)^4 = 1$, so $-1$ is a 4th root of unity." },
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
      id: "c-z1-n3",
      prompt: "For the cube roots of unity, the root $z_1$ (taking $k = 1$) has what argument?",
      choices: [
        { text: "$120^\\circ$", correct: true, explain: "The argument is $\\dfrac{360^\\circ k}{n} = \\dfrac{360^\\circ (1)}{3} = 120^\\circ$." },
        { text: "$60^\\circ$", explain: "That halves the step. Each cube root is $120^\\circ$ apart, so $z_1$ is at $120^\\circ$." },
        { text: "$240^\\circ$", explain: "That is $z_2$ ($k = 2$). The root $z_1$ sits at $120^\\circ$." },
        { text: "$90^\\circ$", explain: "$90^\\circ$ is not a multiple of $120^\\circ$. The cube roots sit at $0^\\circ, 120^\\circ, 240^\\circ$." },
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
      id: "s-which-eq-6",
      prompt: "Which equation do all six 6th roots of unity satisfy?",
      choices: [
        { text: "$z^6 = 1$", correct: true, explain: "By definition, the $n$th roots of unity are the solutions of $z^n = 1$, so here $z^6 = 1$." },
        { text: "$z^3 = 1$", explain: "That is satisfied only by the three cube roots, a subset of the 6th roots." },
        { text: "$z^6 = -1$", explain: "Those are a different set (the primitive 12th roots that are not 6th roots). Roots of unity solve $z^n = 1$." },
        { text: "$6z = 1$", explain: "That is a linear equation with a single real solution, not the six roots." },
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
      id: "s-z2-n5",
      prompt: "For the 5th roots of unity, what is the argument of $z_2$ (taking $k = 2$)?",
      choices: [
        { text: "$144^\\circ$", correct: true, explain: "The argument is $\\dfrac{360^\\circ k}{n} = \\dfrac{360^\\circ (2)}{5} = 144^\\circ$." },
        { text: "$72^\\circ$", explain: "That is $z_1$ ($k = 1$). Doubling the step gives $z_2$ at $144^\\circ$." },
        { text: "$216^\\circ$", explain: "That is $z_3$ ($k = 3$). The root $z_2$ sits at $144^\\circ$." },
        { text: "$288^\\circ$", explain: "That is $z_4$ ($k = 4$). The root $z_2$ sits at $144^\\circ$." },
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
      id: "s-cube-neg8",
      prompt: "Which complex number is one of the cube roots of $-8$?",
      choices: [
        { text: "$1 + \\sqrt{3}\\,i$", correct: true, explain: "$-8 = 8(\\cos 180^\\circ + i\\sin 180^\\circ)$, so a root is $8^{1/3}(\\cos 60^\\circ + i\\sin 60^\\circ) = 2(\\tfrac{1}{2} + \\tfrac{\\sqrt{3}}{2}i) = 1 + \\sqrt{3}\\,i$." },
        { text: "$-2$ only", explain: "$-2$ is one real cube root, but there are three roots in all, and $1 + \\sqrt{3}\\,i$ is another." },
        { text: "$2$", explain: "$2^3 = 8 \\ne -8$. That is a cube root of $8$, not $-8$." },
        { text: "$2i$", explain: "$(2i)^3 = -8i \\ne -8$, so $2i$ is not a cube root of $-8$." },
      ],
    },
    {
      id: "s-fourth-root-16",
      prompt: "Which complex number is one of the 4th roots of $16$?",
      choices: [
        { text: "$2i$", correct: true, explain: "$16 = 16(\\cos 0^\\circ + i\\sin 0^\\circ)$, so a root is $16^{1/4}(\\cos 90^\\circ + i\\sin 90^\\circ) = 2i$. Check: $(2i)^4 = 16$." },
        { text: "$4$", explain: "$4^4 = 256 \\ne 16$. The real 4th root of $16$ is $2$, not $4$." },
        { text: "$\\sqrt{2}$", explain: "$(\\sqrt{2})^4 = 4 \\ne 16$. The modulus of each root is $16^{1/4} = 2$." },
        { text: "$8$", explain: "$8^4$ is far larger than $16$. Take the real 4th root of the modulus: $16^{1/4} = 2$." },
      ],
    },
    {
      id: "s-why-spacing",
      prompt: "Starting from $e^{i n \\theta} = e^{2\\pi i k}$, why are consecutive roots $\\dfrac{360^\\circ}{n}$ apart?",
      choices: [
        { text: "Matching arguments gives $n\\theta = 2\\pi k$, so $\\theta = \\dfrac{2\\pi k}{n}$, which converts to $\\dfrac{360^\\circ k}{n}$. Adjacent integers $k$ therefore differ by $\\dfrac{360^\\circ}{n}$.", correct: true, explain: "The $2\\pi$ in $\\dfrac{2\\pi k}{n} \\cdot \\dfrac{360^\\circ}{2\\pi}$ cancels, leaving $\\dfrac{360^\\circ k}{n}$. One step in $k$ is one step of $\\dfrac{360^\\circ}{n}$." },
        { text: "Because there are $360$ roots", explain: "There are $n$ roots, not $360$. The $360^\\circ$ is a full turn shared equally among those $n$ roots." },
        { text: "Because the modulus grows by $n$ each time $k$ increases", explain: "Every root has modulus $1$. It is the argument that steps, not the modulus." },
        { text: "Because $e^{i\\theta}$ is only defined at multiples of $360^\\circ$", explain: "$e^{i\\theta}$ is defined for every real $\\theta$. The $360^\\circ/n$ step comes from dividing a full turn among $n$ roots." },
      ],
    },
    {
      id: "s-from-exp",
      prompt: "If $z = e^{i\\theta}$ satisfies $z^n = 1$ and $1 = e^{2\\pi i k}$, what is $\\theta$?",
      choices: [
        { text: "$\\theta = \\dfrac{2\\pi k}{n}$", correct: true, explain: "De Moivre gives $z^n = e^{i n \\theta}$. Setting that equal to $e^{2\\pi i k}$ and matching arguments produces $n\\theta = 2\\pi k$, so $\\theta = \\dfrac{2\\pi k}{n}$." },
        { text: "$\\theta = \\dfrac{2\\pi n}{k}$", explain: "That inverts $n$ and $k$. Divide $2\\pi k$ by $n$, not $2\\pi n$ by $k$." },
        { text: "$\\theta = 2\\pi n k$", explain: "That multiplies instead of dividing. The equation is $n\\theta = 2\\pi k$, so $\\theta = \\dfrac{2\\pi k}{n}$." },
        { text: "$\\theta = \\dfrac{n}{2\\pi k}$", explain: "The $2\\pi k$ belongs in the numerator. Matching $n\\theta = 2\\pi k$ gives $\\theta = \\dfrac{2\\pi k}{n}$." },
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
      id: "s-6th-count",
      prompt: "How many distinct 6th roots of unity are there, and how far apart are consecutive ones?",
      choices: [
        { text: "$6$ roots, $30^\\circ$ apart", explain: "The count is right, but the spacing is $\\dfrac{360^\\circ}{6} = 60^\\circ$, not $30^\\circ$." },
        { text: "$6$ roots, $60^\\circ$ apart", correct: true, explain: "There are exactly $n = 6$, spaced $\\dfrac{360^\\circ}{6} = 60^\\circ$." },
        { text: "$3$ roots, $120^\\circ$ apart", explain: "That describes the cube roots ($n = 3$), not the 6th roots." },
        { text: "$12$ roots, $60^\\circ$ apart", explain: "There are exactly $6$ sixth roots, not $12$, though the $60^\\circ$ spacing is right for $n = 6$." },
      ],
    },
    {
      id: "s-count-spacing-12",
      prompt: "How many 12th roots of unity are there, and how far apart are consecutive ones?",
      choices: [
        { text: "$12$ roots, $30^\\circ$ apart", correct: true, explain: "There are exactly $n = 12$, spaced $\\dfrac{360^\\circ}{12} = 30^\\circ$." },
        { text: "$12$ roots, $15^\\circ$ apart", explain: "The count is right, but $\\dfrac{360^\\circ}{12} = 30^\\circ$, not $15^\\circ$." },
        { text: "$6$ roots, $60^\\circ$ apart", explain: "That describes the 6th roots ($n = 6$), not the 12th roots." },
        { text: "$24$ roots, $30^\\circ$ apart", explain: "There are exactly $12$ twelfth roots, not $24$, though the $30^\\circ$ spacing is right for $n = 12$." },
      ],
    },
  ],
};
