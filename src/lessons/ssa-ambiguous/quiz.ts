import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "The ambiguous SSA case".
 * Grounded in the lesson: given a non-included angle $A$ with sides $a$ (opposite
 * $A$) and $b$, the height $h = b\sin A$ is the threshold. For acute $A$: $a<h$
 * gives zero, $a=h$ one right triangle, $h<a<b$ two, and $a\ge b$ one. For obtuse
 * $A$, one only when $a>b$. The law of sines gives $\sin B = \dfrac{b\sin A}{a}$,
 * and the second triangle uses the supplement $180^\circ - B_1$, kept only when a
 * positive third angle remains. Distractors are the classic traps.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-ssa-meaning",
      prompt: "The **ambiguous case** shows up with an SSA triangle. What does SSA mean here?",
      choices: [
        { text: "Two sides and an angle **not** between them (a non-included angle)", correct: true, explain: "SSA gives two sides and the angle opposite one of them, so the side opposite that angle can reach the base at more than one point." },
        { text: "Two sides and the angle **between** them", explain: "That is SAS, which fixes a single triangle, so it is never ambiguous." },
        { text: "Three sides", explain: "That is SSS, which also pins down exactly one triangle, not the ambiguous case." },
        { text: "Two angles and a side", explain: "That is AAS or ASA, which determines one triangle, not the SSA setup." },
      ],
    },
    {
      id: "c-opposite-side",
      prompt: "We are given angle $A$ with sides $a$ and $b$. Which side is **opposite** angle $A$?",
      choices: [
        { text: "$b$", explain: "Side $b$ is given, but it is not the one across from angle $A$. The opposite side is $a$." },
        { text: "$a$", correct: true, explain: "By convention side $a$ is directly across from angle $A$, which is why the law of sines pairs them." },
        { text: "the height $h$", explain: "$h$ is the drop from vertex $C$ to the base, not a side of the triangle. The side opposite $A$ is $a$." },
      ],
    },
    {
      id: "c-height-formula",
      prompt: "The threshold length that determines the case is the height. It equals:",
      choices: [
        { text: "$h = b\\cos A$", explain: "Cosine gives the horizontal run, not the vertical drop. The height opposite $A$ uses sine." },
        { text: "$h = a\\sin A$", explain: "The height drops from vertex $C$ and depends on the fixed side $b$, not the swinging side $a$." },
        { text: "$h = b\\sin A$", correct: true, explain: "The height is the shortest drop from $C$ to the base, $b\\sin A$, opposite angle $A$ in the right triangle." },
      ],
    },
    {
      id: "c-height-compute",
      prompt: "With $A = 30^\\circ$ and $b = 8$, the height is:",
      choices: [
        { text: "$h = 4$", correct: true, explain: "$h = b\\sin A = 8\\sin 30^\\circ = 8(0.5) = 4$." },
        { text: "$h = 8$", explain: "That is $b$ itself. You still must multiply by $\\sin 30^\\circ = 0.5$." },
        { text: "$h = 6.93$", explain: "That is $8\\cos 30^\\circ$. The height uses sine, not cosine." },
      ],
    },
    {
      id: "c-lawsines-form",
      prompt: "The law of sines links each side to the sine of its opposite angle. Which equation is correct?",
      choices: [
        { text: "$\\dfrac{\\sin A}{b} = \\dfrac{\\sin B}{a}$", explain: "This pairs each angle with the wrong side. $A$ must are over its opposite side $a$." },
        { text: "$\\dfrac{\\sin A}{a} = \\dfrac{\\sin B}{b}$", correct: true, explain: "Each angle is over its own opposite side, which is exactly the law of sines." },
        { text: "$\\dfrac{a}{b} = \\dfrac{\\sin B}{\\sin A}$", explain: "The ratios are flipped and mismatched. Keep each sine over its own opposite side." },
      ],
    },
    {
      id: "c-solve-sinB",
      prompt: "Solving $\\dfrac{\\sin A}{a} = \\dfrac{\\sin B}{b}$ for $\\sin B$ gives:",
      choices: [
        { text: "$\\sin B = \\dfrac{a\\sin A}{b}$", explain: "The sides are swapped. Multiplying both sides by $b$ puts $b\\sin A$ on top, over $a$." },
        { text: "$\\sin B = \\dfrac{b}{a\\sin A}$", explain: "Only $b$ moved. You must write the whole factor $b\\sin A$ in the numerator over $a$." },
        { text: "$\\sin B = \\dfrac{b\\sin A}{a}$", correct: true, explain: "Multiplying both sides by $b$ isolates $\\sin B = \\dfrac{b\\sin A}{a}$." },
      ],
    },
    {
      id: "c-compute-sinB",
      prompt: "With $A = 30^\\circ$, $a = 2.5$, and $b = 3$, compute $\\sin B$.",
      choices: [
        { text: "$\\sin B = 0.6$", correct: true, explain: "$\\sin B = \\dfrac{b\\sin A}{a} = \\dfrac{3(0.5)}{2.5} = \\dfrac{1.5}{2.5} = 0.6$." },
        { text: "$\\sin B = 1.2$", explain: "That divides by $b$ instead of $a$. The denominator is the opposite side $a = 2.5$." },
        { text: "$\\sin B = 0.5$", explain: "That is just $\\sin 30^\\circ$. You still must multiply by $b$ and divide by $a$." },
      ],
    },
    {
      id: "c-lt-h",
      prompt: "Take $A = 30^\\circ$, $b = 8$ (so $h = 4$). If $a = 3$, how many triangles are there?",
      choices: [
        { text: "one", explain: "A triangle needs $a$ to at least reach the base. Here $a = 3 < h = 4$, so it falls short." },
        { text: "two", explain: "Two triangles need $h < a < b$. Here $a = 3$ is below the height $h = 4$." },
        { text: "three", explain: "SSA can produce at most two triangles, never three." },
        { text: "zero", correct: true, explain: "Since $a = 3 < h = 4$, the swinging side cannot reach the base at all, so no triangle forms." },
      ],
    },
    {
      id: "c-eq-h",
      prompt: "Same setup, $A = 30^\\circ$, $b = 8$, $h = 4$. If $a = 4$ exactly, how many triangles?",
      choices: [
        { text: "zero", explain: "At $a = h$ the side just reaches the base at one point, so a triangle does exist." },
        { text: "one (a right triangle)", correct: true, explain: "When $a = h$ the side touches the base straight down, forming exactly one right triangle." },
        { text: "two", explain: "Two triangles need $a$ strictly greater than $h$. At $a = h$ the two landing points merge into one." },
      ],
    },
    {
      id: "c-between",
      prompt: "Same setup, $A = 30^\\circ$, $b = 8$, $h = 4$. If $a = 5$, how many triangles?",
      choices: [
        { text: "zero", explain: "$a = 5$ clears the height $h = 4$, so it reaches the base. At least one triangle exists." },
        { text: "one", explain: "Here $h < a < b$ (that is $4 < 5 < 8$), so the side reaches the base at two points, not one." },
        { text: "two", correct: true, explain: "Since $4 < 5 < 8$, we have $h < a < b$: the swinging side meets the base twice, the ambiguous case." },
        { text: "three", explain: "SSA produces at most two triangles, never three." },
      ],
    },
    {
      id: "c-ge-b",
      prompt: "Same setup, $A = 30^\\circ$, $b = 8$. If $a = 10$, how many triangles?",
      choices: [
        { text: "one", correct: true, explain: "Once $a \\ge b$, one of the two landing points slips behind vertex $A$, leaving a single triangle." },
        { text: "two", explain: "Two triangles require $a < b$. Here $a = 10 > 8 = b$, so one landing point is lost." },
        { text: "zero", explain: "$a = 10$ easily clears the height, so a triangle certainly exists." },
      ],
    },
    {
      id: "c-sinB-gt1",
      prompt: "With $A = 30^\\circ$, $b = 10$, $a = 4$, the law of sines gives $\\sin B = \\dfrac{10(0.5)}{4} = 1.25$. How many triangles?",
      choices: [
        { text: "one", explain: "No angle has sine greater than $1$, so the setup cannot close into any triangle." },
        { text: "two", explain: "A sine above $1$ is impossible, so there is no valid angle $B$ at all." },
        { text: "one right triangle", explain: "A right triangle needs $\\sin B = 1$ exactly. $1.25$ is impossible, so no triangle forms." },
        { text: "zero", correct: true, explain: "$\\sin B = 1.25 > 1$ is impossible, the algebra's way of saying $a < h$: no triangle." },
      ],
    },
    {
      id: "c-supp-why",
      prompt: "After finding $\\sin B = 0.6$, why must you also test $180^\\circ - B_1$?",
      choices: [
        { text: "Because the calculator gives only wrong answers", explain: "The calculator is fine. The issue is that sine alone does not pin down the quadrant." },
        { text: "Because sine is positive in both quadrant I and quadrant II, so the supplement shares the same sine", correct: true, explain: "$\\sin(180^\\circ - B) = \\sin B$, so an acute angle and its obtuse supplement both satisfy $\\sin B = 0.6$." },
        { text: "Because angle $B$ must be obtuse", explain: "$B$ need not be obtuse. You check both the acute value and its supplement, then keep whichever is valid." },
      ],
    },
    {
      id: "c-supp-compute",
      prompt: "If the acute solution is $B_1 \\approx 36.87^\\circ$, its supplement $B_2 = 180^\\circ - B_1$ is:",
      choices: [
        { text: "$53.13^\\circ$", explain: "That is $90^\\circ - B_1$, the complement. The supplement subtracts from $180^\\circ$ instead." },
        { text: "$36.87^\\circ$", explain: "That repeats $B_1$. The supplement is $180^\\circ - 36.87^\\circ$, a different angle." },
        { text: "$143.13^\\circ$", correct: true, explain: "$180^\\circ - 36.87^\\circ = 143.13^\\circ$, the obtuse angle sharing the same sine." },
      ],
    },
    {
      id: "c-compare-both",
      prompt: "Before deciding how many triangles exist (with $A$ acute), which comparison do you need?",
      choices: [
        { text: "Compare $a$ to **both** $h = b\\sin A$ and $b$", correct: true, explain: "You need $h$ to rule out zero and $b$ to rule out the second landing point, so both comparisons matter." },
        { text: "Compare $a$ to $b$ only", explain: "Comparing to $b$ alone cannot tell zero from two. You also need the height $h$." },
        { text: "Compare $a$ to $h$ only", explain: "The height separates zero from a solution, but you still need $b$ to tell one from two." },
        { text: "No comparison is needed. There is always one triangle", explain: "SSA can give zero, one, or two triangles, so a comparison is essential." },
      ],
    },
  ],
  summit: [
    {
      id: "s-count-zero-acute",
      prompt: "For $A = 30^\\circ$, $b = 10$, $a = 4$, how many triangles are possible?",
      choices: [
        { text: "two, because $a < b$", explain: "Comparing $a$ to $b$ alone is the trap. You must also check $h$. Here $a = 4 < h = 5$, so none form." },
        { text: "one", explain: "A triangle needs $a \\ge h$. Here $a = 4$ is below $h = 5$, so it cannot reach the base." },
        { text: "zero", correct: true, explain: "$h = 10\\sin 30^\\circ = 5$ and $a = 4 < 5 = h$, so the side cannot reach the base: no triangle. Indeed $\\sin B = 1.25 > 1$." },
        { text: "one right triangle", explain: "A right triangle occurs only when $a = h$. Here $a = 4 \\ne 5 = h$." },
      ],
    },
    {
      id: "s-count-right",
      prompt: "A triangle has $A = 30^\\circ$, $b = 12$, and $a = 6$. How many triangles form, and what type?",
      choices: [
        { text: "exactly one, a right triangle", correct: true, explain: "$h = 12\\sin 30^\\circ = 6 = a$, so the side meets the base straight down: one right triangle, with $\\sin B = 1$ and $B = 90^\\circ$." },
        { text: "two", explain: "Two needs $h < a < b$ strictly. Here $a = h = 6$ is the boundary, so the two solutions merge into one." },
        { text: "zero", explain: "$a = 6$ exactly reaches the height, so a triangle does exist." },
        { text: "one, but not a right triangle", explain: "At $a = h$ the side drops straight to the base, so the single triangle is right by construction." },
      ],
    },
    {
      id: "s-count-two",
      prompt: "For $A = 30^\\circ$, $b = 8$, $a = 5$, how many triangles?",
      choices: [
        { text: "one", explain: "$h < a < b$ here ($4 < 5 < 8$), so the side reaches the base at two points, not one." },
        { text: "two", correct: true, explain: "$h = 4$, and $4 < 5 < 8$ means $h < a < b$: the ambiguous case with two triangles." },
        { text: "zero", explain: "$a = 5 > h = 4$, so the side reaches the base. Triangles do exist." },
      ],
    },
    {
      id: "s-count-one-ge",
      prompt: "For $A = 30^\\circ$, $b = 5$, $a = 8$, how many triangles?",
      choices: [
        { text: "two", explain: "Two needs $a < b$. Here $a = 8 > 5 = b$, so one landing point falls off the ray." },
        { text: "zero", explain: "$a = 8$ far exceeds $h = 2.5$, so it reaches the base. A triangle exists." },
        { text: "two, one acute and one obtuse", explain: "The obtuse option is rejected because $a \\ge b$ forces $B < A$, so only one triangle survives." },
        { text: "one", correct: true, explain: "Since $a = 8 \\ge b = 5$, only one triangle forms. The supplement of $B_1$ would push $A + B_2$ past $180^\\circ$." },
      ],
    },
    {
      id: "s-obtuse-one",
      prompt: "Now $A = 120^\\circ$ (obtuse), $b = 5$, $a = 8$. How many triangles?",
      choices: [
        { text: "one", correct: true, explain: "With $A$ obtuse, a triangle exists only if $a > b$. Since $8 > 5$, exactly one does." },
        { text: "two", explain: "An obtuse given angle can never yield two triangles, since a second obtuse angle cannot fit." },
        { text: "zero", explain: "Here $a = 8 > b = 5$, so the side opposite the obtuse angle is the longest, and one triangle forms." },
      ],
    },
    {
      id: "s-obtuse-zero",
      prompt: "With $A = 120^\\circ$ (obtuse), $b = 8$, $a = 5$, how many triangles?",
      choices: [
        { text: "one", explain: "With obtuse $A$, the opposite side $a$ must be the longest. Here $a = 5 < 8 = b$, so no triangle." },
        { text: "two", explain: "An obtuse angle never gives two triangles, and here it gives none since $a < b$." },
        { text: "zero", correct: true, explain: "Obtuse $A$ needs $a > b$. Since $a = 5 < 8 = b$, none exists. Indeed $\\sin B = \\dfrac{8\\sin 120^\\circ}{5} \\approx 1.39 > 1$." },
        { text: "one right triangle", explain: "No right triangle can contain a $120^\\circ$ angle, and here no triangle forms at all." },
      ],
    },
    {
      id: "s-second-B",
      prompt: "The case $A = 30^\\circ$, $b = 8$, $a = 5$ gives $\\sin B = 0.8$, so $B_1 \\approx 53.13^\\circ$. In the **second** triangle, angle $B$ is:",
      choices: [
        { text: "$53.13^\\circ$", explain: "That is $B_1$, the first triangle's angle. The second uses its supplement." },
        { text: "$126.87^\\circ$", correct: true, explain: "The second angle is $B_2 = 180^\\circ - 53.13^\\circ = 126.87^\\circ$, the obtuse angle with the same sine." },
        { text: "$36.87^\\circ$", explain: "That is $90^\\circ - 53.13^\\circ$, the complement. The second solution is the supplement instead." },
        { text: "$106.26^\\circ$", explain: "That doubles $B_1$. The supplement subtracts from $180^\\circ$, giving $126.87^\\circ$." },
      ],
    },
    {
      id: "s-second-C",
      prompt: "Continuing $A = 30^\\circ$ with $B_2 \\approx 126.87^\\circ$, the third angle $C_2$ of the second triangle is:",
      choices: [
        { text: "$96.87^\\circ$", explain: "That is $C_1 = 180^\\circ - 30^\\circ - 53.13^\\circ$ for the first triangle, not the second." },
        { text: "$53.13^\\circ$", explain: "That is $B_1$. The third angle comes from $180^\\circ - A - B_2$." },
        { text: "$30^\\circ$", explain: "That just repeats $A$. You must subtract both $A$ and $B_2$ from $180^\\circ$." },
        { text: "$23.13^\\circ$", correct: true, explain: "$C_2 = 180^\\circ - 30^\\circ - 126.87^\\circ = 23.13^\\circ$, which is positive, so the second triangle is valid." },
      ],
    },
    {
      id: "s-reject-supp",
      prompt: "For $A = 30^\\circ$, $b = 5$, $a = 8$ we get $\\sin B \\approx 0.3125$, so $B_1 \\approx 18.21^\\circ$. Why is there only **one** triangle?",
      choices: [
        { text: "The supplement $B_2 = 161.79^\\circ$ fails, since $30^\\circ + 161.79^\\circ > 180^\\circ$ leaves no room for a third angle", correct: true, explain: "$A + B_2$ already exceeds $180^\\circ$, so $C_2$ would be negative. Only the acute $B_1$ survives." },
        { text: "Because $\\sin B > 1$", explain: "Here $\\sin B \\approx 0.3125 < 1$, so that is not the reason. The supplement is what fails." },
        { text: "Because the supplement equals $B_1$", explain: "The supplement $161.79^\\circ$ differs from $18.21^\\circ$. It is rejected for overflowing $180^\\circ$, not for matching." },
        { text: "Because a triangle can hold only acute angles", explain: "Triangles can hold an obtuse angle. The supplement fails here only because $A + B_2 > 180^\\circ$." },
      ],
    },
    {
      id: "s-sinB-gt1",
      prompt: "For $A = 40^\\circ$, $b = 10$, $a = 5$, the law of sines gives $\\sin B = \\dfrac{10\\sin 40^\\circ}{5} \\approx 1.29$. How many triangles?",
      choices: [
        { text: "two", explain: "A sine above $1$ has no angle solution at all, so there cannot be two triangles." },
        { text: "one", explain: "$\\sin B \\approx 1.29 > 1$ is impossible, so not even one triangle forms." },
        { text: "zero", correct: true, explain: "No angle has sine above $1$, so $\\sin B \\approx 1.29$ means $a < h$: no triangle exists." },
        { text: "one right triangle", explain: "A right triangle needs $\\sin B = 1$. A value above $1$ gives no triangle." },
      ],
    },
    {
      id: "s-select-two",
      prompt: "Which set of data produces **two** triangles?",
      choices: [
        { text: "$A = 30^\\circ$, $b = 8$, $a = 5$", correct: true, explain: "$h = 4$ and $4 < 5 < 8$, so $h < a < b$: the ambiguous two-triangle case." },
        { text: "$A = 30^\\circ$, $b = 8$, $a = 3$", explain: "$h = 4$ and $a = 3 < h$, so the side cannot reach the base: zero triangles." },
        { text: "$A = 30^\\circ$, $b = 8$, $a = 10$", explain: "$a = 10 \\ge b = 8$, so one landing point is lost: only one triangle." },
        { text: "$A = 120^\\circ$, $b = 5$, $a = 8$", explain: "An obtuse given angle with $a > b$ yields exactly one triangle, never two." },
      ],
    },
    {
      id: "s-mix-opposite",
      prompt: "A triangle has $A = 50^\\circ$, side $a = 7$ (opposite $A$), and side $b = 9$. Which law-of-sines setup correctly finds $\\sin B$?",
      choices: [
        { text: "$\\sin B = \\dfrac{7\\sin 50^\\circ}{9}$", explain: "This puts $a$ on top and $b$ on the bottom. Each angle must pair with its own opposite side." },
        { text: "$\\sin B = \\dfrac{9\\sin 50^\\circ}{7}$", correct: true, explain: "$\\dfrac{\\sin A}{a} = \\dfrac{\\sin B}{b}$ gives $\\sin B = \\dfrac{b\\sin A}{a} = \\dfrac{9\\sin 50^\\circ}{7}$." },
        { text: "$\\sin B = \\dfrac{9\\sin 50^\\circ}{9}$", explain: "The denominator must be $a = 7$, the side opposite $A$, not $b$." },
        { text: "$\\sin B = \\dfrac{7\\sin 50^\\circ}{7}$", explain: "That uses $a$ in both spots. The numerator has $b = 9$, the side opposite $B$." },
      ],
    },
    {
      id: "s-boundary-eq",
      prompt: "For $A = 30^\\circ$, $b = 6$, $a = 6$ (so $a = b$), how many triangles?",
      choices: [
        { text: "zero", explain: "$a = 6 > h = 3$, so the side reaches the base. A triangle does exist." },
        { text: "two", explain: "Two triangles need $a < b$. At $a = b$ the supplement of $B_1$ gives a zero third angle, so it is rejected." },
        { text: "one", correct: true, explain: "With $a = b$ we get $B = A = 30^\\circ$. The supplement $150^\\circ$ makes $A + B = 180^\\circ$, leaving no third angle, so just one triangle." },
        { text: "one right triangle", explain: "The single triangle here is isosceles with $B = 30^\\circ$, not a right triangle." },
      ],
    },
    {
      id: "s-sinB-eq1",
      prompt: "If the law of sines yields $\\sin B = 1$ exactly, how many triangles form?",
      choices: [
        { text: "one, a right triangle", correct: true, explain: "$\\sin B = 1$ forces $B = 90^\\circ$. Its supplement is also $90^\\circ$, the same angle, so exactly one right triangle. This is the $a = h$ case." },
        { text: "two, an acute and an obtuse", explain: "The supplement of $90^\\circ$ is again $90^\\circ$, so there is no distinct second triangle." },
        { text: "zero", explain: "$\\sin B = 1$ is achievable at $B = 90^\\circ$, so a triangle does exist." },
        { text: "infinitely many", explain: "$B$ is pinned to $90^\\circ$, so the triangle is unique, not infinite." },
      ],
    },
    {
      id: "s-second-method",
      prompt: "You found the acute $B_1$ for a two-triangle SSA problem. What is the correct method to build the **second** triangle?",
      choices: [
        { text: "Use $B_2 = 90^\\circ - B_1$, then $C_2 = 180^\\circ - A - B_2$", explain: "That is the complement, not the supplement. The second angle sharing the sine is $180^\\circ - B_1$." },
        { text: "Use $B_2 = B_1$ with a different $C$", explain: "Reusing $B_1$ just rebuilds the first triangle. The second uses the supplement $180^\\circ - B_1$." },
        { text: "Recompute $\\sin B$ with $a$ and $b$ swapped", explain: "Swapping the sides changes the problem. The second solution comes from the supplement, not new data." },
        { text: "Use $B_2 = 180^\\circ - B_1$, then $C_2 = 180^\\circ - A - B_2$, keeping it only if $C_2 > 0$", correct: true, explain: "The supplement shares the same sine, and the triangle is valid exactly when the remaining angle $C_2$ is positive." },
      ],
    },
  ],
};
