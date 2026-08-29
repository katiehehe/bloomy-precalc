import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Dot product and angle between".
 * Grounded in the lesson: a . b = a1 b1 + a2 b2 is a scalar; its sign reads the
 * angle (positive acute, zero perpendicular, negative obtuse); the angle comes
 * from cos(theta) = (a . b)/(|a||b|); the scalar projection is (a . b)/|a| and
 * the vector projection is ((a . b)/|a|^2) a. Distractors are the classic traps.
 * Every dot product, angle, and projection below is verified by hand.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-dot-14",
      prompt: "Compute $a \\cdot b$ for $a = (3, 2)$ and $b = (4, 1)$.",
      choices: [
        { text: "$10$", explain: "That adds all four components, $3 + 2 + 4 + 1$. The dot product multiplies matching parts first." },
        { text: "$14$", correct: true, explain: "$(3)(4) + (2)(1) = 12 + 2 = 14$." },
        { text: "$(12, 2)$", explain: "Those are the two products. Add them into one number, $12 + 2 = 14$." },
        { text: "$7$", explain: "That adds only the $x$-parts, $3 + 4$. Multiply matching parts, then add." },
      ],
    },
    {
      id: "c-dot-neg",
      prompt: "Compute $a \\cdot b$ for $a = (5, -2)$ and $b = (1, 3)$.",
      choices: [
        { text: "$-1$", correct: true, explain: "$(5)(1) + (-2)(3) = 5 - 6 = -1$." },
        { text: "$11$", explain: "That treats the second product as $+6$, but $(-2)(3) = -6$." },
        { text: "$(5, -6)$", explain: "Those are the two products. Add them to get one number, $5 + (-6) = -1$." },
        { text: "$7$", explain: "That adds the $x$-parts only. Multiply matching parts, then add." },
      ],
    },
    {
      id: "c-formula",
      prompt: "Which expression gives the dot product of $a = (a_1, a_2)$ and $b = (b_1, b_2)$?",
      choices: [
        { text: "$a_1 b_2 + a_2 b_1$", explain: "This crosses the parts. The dot product pairs $x$ with $x$ and $y$ with $y$." },
        { text: "$a_1 + a_2 + b_1 + b_2$", explain: "That just adds components. The dot product multiplies matching ones first." },
        { text: "$a_1 b_1 + a_2 b_2$", correct: true, explain: "Matching parts multiplied, then added into one number." },
        { text: "$a_1 b_1 - a_2 b_2$", explain: "The dot product adds the two products. It does not subtract them." },
      ],
    },
    {
      id: "c-scalar",
      prompt: "The dot product $a \\cdot b$ of two vectors is:",
      choices: [
        { text: "A vector", explain: "The result has no direction. It is a scalar." },
        { text: "A single number (a scalar)", correct: true, explain: "The two products are added into one number, with no direction attached." },
        { text: "An angle", explain: "The dot product helps you find an angle, but it is itself a number." },
        { text: "Always positive", explain: "It can be negative or zero, depending on the angle between the vectors." },
      ],
    },
    {
      id: "c-sign-acute",
      prompt: "If $a \\cdot b = 12$, what kind of angle is between the vectors?",
      choices: [
        { text: "Obtuse", explain: "Obtuse needs $a \\cdot b < 0$. Here it is positive." },
        { text: "A right angle", explain: "A right angle needs $a \\cdot b = 0$. Here it is $12$." },
        { text: "Straight ($180^\\circ$)", explain: "A straight angle needs a negative dot product. Here it is positive." },
        { text: "Acute", correct: true, explain: "Positive $a \\cdot b$ means $\\cos\\theta > 0$, so the angle is acute." },
      ],
    },
    {
      id: "c-sign-obtuse",
      prompt: "If $a \\cdot b = -3$, what kind of angle is between the vectors?",
      choices: [
        { text: "Acute", explain: "Acute needs $a \\cdot b > 0$. Here it is negative." },
        { text: "A right angle", explain: "A right angle needs $a \\cdot b = 0$. Here it is $-3$." },
        { text: "Obtuse", correct: true, explain: "Negative $a \\cdot b$ means $\\cos\\theta < 0$, so the angle is obtuse." },
        { text: "Undefined", explain: "The angle is perfectly well defined. A negative dot product gives an obtuse angle." },
      ],
    },
    {
      id: "c-zero-perp",
      prompt: "If two nonzero vectors have $a \\cdot b = 0$, they are:",
      choices: [
        { text: "Parallel", explain: "Parallel vectors have a dot product of $\\pm |a|\\,|b|$, not $0$." },
        { text: "Perpendicular", correct: true, explain: "$a \\cdot b = 0$ forces $\\cos\\theta = 0$, so $\\theta = 90^\\circ$." },
        { text: "At an acute angle", explain: "An acute angle needs a positive dot product, not $0$." },
        { text: "At an obtuse angle", explain: "An obtuse angle needs a negative dot product, not $0$." },
      ],
    },
    {
      id: "c-cos-formula",
      prompt: "Which formula gives the cosine of the angle $\\theta$ between $a$ and $b$?",
      choices: [
        { text: "$\\cos\\theta = \\dfrac{a \\cdot b}{|a|\\,|b|}$", correct: true, explain: "Solve $a \\cdot b = |a|\\,|b|\\cos\\theta$ for $\\cos\\theta$ by dividing by $|a|\\,|b|$." },
        { text: "$\\cos\\theta = \\dfrac{a \\cdot b}{|a| + |b|}$", explain: "You divide by the product of the lengths, not their sum." },
        { text: "$\\cos\\theta = \\dfrac{|a|\\,|b|}{a \\cdot b}$", explain: "This flips the fraction. The dot product belongs on top." },
        { text: "$\\cos\\theta = (a \\cdot b)\\,|a|\\,|b|$", explain: "You divide by $|a|\\,|b|$, you do not multiply by it." },
      ],
    },
    {
      id: "c-perp-vector",
      prompt: "Which vector is perpendicular to $a = (2, 3)$?",
      choices: [
        { text: "$(2, 3)$", explain: "That is $a$ itself, which is parallel. $a \\cdot a = 4 + 9 = 13 \\ne 0$." },
        { text: "$(3, 2)$", explain: "$2(3) + 3(2) = 12 \\ne 0$, so not perpendicular." },
        { text: "$(-2, 3)$", explain: "$2(-2) + 3(3) = 5 \\ne 0$, so not perpendicular." },
        { text: "$(3, -2)$", correct: true, explain: "$2(3) + 3(-2) = 6 - 6 = 0$, so it is perpendicular." },
      ],
    },
    {
      id: "c-scalar-proj",
      prompt: "The scalar projection of $b$ onto $a$ (the length of $b$'s shadow on $a$) is:",
      choices: [
        { text: "$\\dfrac{a \\cdot b}{|b|}$", explain: "That divides by the wrong length. Projecting onto $a$ divides by $|a|$." },
        { text: "$\\dfrac{a \\cdot b}{|a|^2}$", explain: "That scalar belongs to the vector projection, which then multiplies $a$." },
        { text: "$\\dfrac{a \\cdot b}{|a|}$", correct: true, explain: "The scalar projection is $\\dfrac{a \\cdot b}{|a|} = |b|\\cos\\theta$, a length." },
        { text: "$a \\cdot b$", explain: "You still must divide by $|a|$ to turn the dot product into a length." },
      ],
    },
    {
      id: "c-zero-compute",
      prompt: "Compute $a \\cdot b$ for $a = (6, 0)$ and $b = (0, 9)$.",
      choices: [
        { text: "$0$", correct: true, explain: "$(6)(0) + (0)(9) = 0$. The vectors are perpendicular." },
        { text: "$54$", explain: "That multiplies $6$ and $9$, but those are not matching parts. $6$ pairs with $0$." },
        { text: "$15$", explain: "That adds $6 + 9$. Multiply matching parts first." },
        { text: "$(0, 0)$", explain: "The dot product here is the single number $0$, not a vector." },
      ],
    },
    {
      id: "c-magnitude",
      prompt: "What is $|a|$ for $a = (3, 4)$?",
      choices: [
        { text: "$7$", explain: "That adds $3 + 4$. Magnitude uses the square root of the sum of squares." },
        { text: "$5$", correct: true, explain: "$|a| = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$." },
        { text: "$25$", explain: "That is $3^2 + 4^2$ before taking the square root." },
        { text: "$\\sqrt{7}$", explain: "That is $\\sqrt{3 + 4}$. Square each component first, then add." },
      ],
    },
    {
      id: "c-geo-value",
      prompt: "Given $|a| = 2$, $|b| = 5$, and $\\cos\\theta = \\tfrac{1}{2}$, find $a \\cdot b = |a|\\,|b|\\cos\\theta$.",
      choices: [
        { text: "$10$", explain: "That is $|a|\\,|b|$ without the factor $\\cos\\theta = \\tfrac{1}{2}$." },
        { text: "$2.5$", explain: "That is $|a|\\cos\\theta$. You still need the factor $|b| = 5$." },
        { text: "$5$", correct: true, explain: "$(2)(5)\\left(\\tfrac{1}{2}\\right) = 5$." },
        { text: "$20$", explain: "That doubles $|a|\\,|b|$. Instead multiply by $\\cos\\theta = \\tfrac{1}{2}$." },
      ],
    },
    {
      id: "c-same-dir",
      prompt: "If $b$ points in the same direction as $a$, what is $a \\cdot b$?",
      choices: [
        { text: "$0$", explain: "Zero happens at a right angle, not when the vectors point the same way." },
        { text: "A negative number", explain: "Negative happens for an obtuse angle, not for $\\theta = 0$." },
        { text: "$|a| + |b|$", explain: "The dot product multiplies the lengths (times $\\cos\\theta$). It does not add them." },
        { text: "$|a|\\,|b|$", correct: true, explain: "Same direction means $\\theta = 0$ and $\\cos 0 = 1$, so $a \\cdot b = |a|\\,|b|$, its largest value." },
      ],
    },
    {
      id: "c-which-sign-acute",
      prompt: "Which sign of $a \\cdot b$ tells you the angle between the vectors is acute?",
      choices: [
        { text: "Positive", correct: true, explain: "Positive $a \\cdot b$ means $\\cos\\theta > 0$, an acute angle." },
        { text: "Negative", explain: "Negative means $\\cos\\theta < 0$, an obtuse angle." },
        { text: "Zero", explain: "Zero means $\\cos\\theta = 0$, a right angle." },
        { text: "The sign does not matter", explain: "The sign of $a \\cdot b$ is exactly what sets the type of angle." },
      ],
    },
  ],
  summit: [
    {
      id: "s-angle-45",
      prompt: "Find the angle between $a = (1, 1)$ and $b = (0, 1)$.",
      choices: [
        { text: "$30^\\circ$", explain: "$\\cos 30^\\circ = \\tfrac{\\sqrt3}{2}$, but here $\\cos\\theta = \\tfrac{1}{\\sqrt2}$." },
        { text: "$60^\\circ$", explain: "$\\cos 60^\\circ = \\tfrac{1}{2}$, but here $\\cos\\theta = \\tfrac{1}{\\sqrt2}$." },
        { text: "$45^\\circ$", correct: true, explain: "$a \\cdot b = 1$, $|a| = \\sqrt2$, $|b| = 1$, so $\\cos\\theta = \\tfrac{1}{\\sqrt2}$ and $\\theta = 45^\\circ$." },
        { text: "$90^\\circ$", explain: "A right angle needs $a \\cdot b = 0$, but here $a \\cdot b = 1$." },
      ],
    },
    {
      id: "s-angle-135",
      prompt: "Find the angle between $a = (2, 0)$ and $b = (-3, 3)$.",
      choices: [
        { text: "$135^\\circ$", correct: true, explain: "$a \\cdot b = -6$, $|a| = 2$, $|b| = 3\\sqrt2$, so $\\cos\\theta = \\tfrac{-6}{6\\sqrt2} = -\\tfrac{1}{\\sqrt2}$ and $\\theta = 135^\\circ$." },
        { text: "$45^\\circ$", explain: "That ignores the negative sign. $\\cos\\theta$ is negative, so the angle is obtuse." },
        { text: "$120^\\circ$", explain: "$\\cos 120^\\circ = -\\tfrac{1}{2}$, but here $\\cos\\theta = -\\tfrac{1}{\\sqrt2}$." },
        { text: "$90^\\circ$", explain: "A right angle needs $a \\cdot b = 0$, but here it is $-6$." },
      ],
    },
    {
      id: "s-angle-90",
      prompt: "Find the angle between $a = (2, 5)$ and $b = (5, -2)$.",
      choices: [
        { text: "$0^\\circ$", explain: "$0^\\circ$ needs the same direction. Here $a \\cdot b = 0$, a right angle." },
        { text: "$90^\\circ$", correct: true, explain: "$a \\cdot b = 10 - 10 = 0$, so the vectors are perpendicular." },
        { text: "$45^\\circ$", explain: "$45^\\circ$ needs a positive dot product. Here it is $0$." },
        { text: "$180^\\circ$", explain: "Opposite directions give a negative dot product. Here it is $0$." },
      ],
    },
    {
      id: "s-vproj-40",
      prompt: "Find the vector projection of $b = (4, 2)$ onto $a = (3, 0)$.",
      choices: [
        { text: "$(12, 0)$", explain: "That skips dividing by $|a|^2 = 9$." },
        { text: "$(4, 2)$", explain: "That is $b$ itself. The projection lies along $a$, so its $y$-part is $0$." },
        { text: "$(3, 0)$", explain: "That is $a$. You must scale it by $\\tfrac{a \\cdot b}{|a|^2} = \\tfrac{12}{9}$." },
        { text: "$(4, 0)$", correct: true, explain: "$a \\cdot b = 12$ and $|a|^2 = 9$, so $\\tfrac{12}{9}(3, 0) = (4, 0)$." },
      ],
    },
    {
      id: "s-sproj-4",
      prompt: "Find the scalar projection of $b = (4, 3)$ onto $a = (1, 0)$.",
      choices: [
        { text: "$4$", correct: true, explain: "$\\dfrac{a \\cdot b}{|a|} = \\dfrac{4}{1} = 4$." },
        { text: "$5$", explain: "That is $|b|$, the full length of $b$, not its shadow on $a$." },
        { text: "$(4, 0)$", explain: "That is the vector projection. The scalar projection is just the length $4$." },
        { text: "$3$", explain: "That is the $y$-part of $b$. The shadow on the $x$-axis uses the $x$-part." },
      ],
    },
    {
      id: "s-vproj-21",
      prompt: "Find the vector projection of $b = (1, 3)$ onto $a = (4, 2)$.",
      choices: [
        { text: "$(4, 2)$", explain: "That forgets the scalar $\\tfrac{a \\cdot b}{|a|^2} = \\tfrac{10}{20} = \\tfrac{1}{2}$." },
        { text: "$(2, 1)$", correct: true, explain: "$a \\cdot b = 10$ and $|a|^2 = 20$, so $\\tfrac{10}{20}(4, 2) = (2, 1)$." },
        { text: "$(1, 3)$", explain: "That is $b$. The projection lies along $a$, not along $b$." },
        { text: "$(1, -2)$", explain: "That is a direction perpendicular to $a$, not the shadow of $b$ on $a$." },
      ],
    },
    {
      id: "s-classify-perp",
      prompt: "Are $a = (2, 4)$ and $b = (-6, 3)$ perpendicular, parallel, or neither?",
      choices: [
        { text: "Parallel", explain: "Parallel would need $b$ to be a multiple of $a$. Here $a \\cdot b = 0$ instead." },
        { text: "Obtuse", explain: "Obtuse needs a negative dot product. Here $a \\cdot b = 0$." },
        { text: "Perpendicular", correct: true, explain: "$a \\cdot b = (2)(-6) + (4)(3) = -12 + 12 = 0$, a right angle." },
        { text: "Neither", explain: "The dot product is exactly $0$, which is the perpendicular case." },
      ],
    },
    {
      id: "s-classify-parallel",
      prompt: "Are $a = (2, 3)$ and $b = (4, 6)$ perpendicular, parallel, or neither?",
      choices: [
        { text: "Perpendicular", explain: "Perpendicular needs $a \\cdot b = 0$, but here $a \\cdot b = 26$." },
        { text: "Obtuse", explain: "Obtuse needs a negative dot product. Here it is positive." },
        { text: "Neither", explain: "Since $b = 2a$, the vectors are exactly parallel." },
        { text: "Parallel", correct: true, explain: "$b = 2a$, so they point the same way. Indeed $|a \\cdot b| = |a|\\,|b| = 26$." },
      ],
    },
    {
      id: "s-sign-trap",
      prompt: "A student computes $a \\cdot b = -5$ and concludes the angle is acute. Is that right?",
      choices: [
        { text: "No: a negative dot product means an obtuse angle", correct: true, explain: "$a \\cdot b < 0$ forces $\\cos\\theta < 0$, so $\\theta$ is between $90^\\circ$ and $180^\\circ$." },
        { text: "Yes, it is acute", explain: "Acute needs a positive dot product. $-5$ is negative." },
        { text: "No, it means the vectors are perpendicular", explain: "Perpendicular needs $a \\cdot b = 0$, not $-5$." },
        { text: "No, it means the vectors are parallel", explain: "Parallel would give $a \\cdot b = \\pm|a|\\,|b|$, and the angle would be $0^\\circ$ or $180^\\circ$." },
      ],
    },
    {
      id: "s-proj-denominator",
      prompt: "For the vector projection of $b$ onto $a$, you scale $a$ by $\\dfrac{a \\cdot b}{\\,?\\,}$. What is the denominator?",
      choices: [
        { text: "$|a|$", explain: "That denominator gives the scalar projection (a length), not the vector." },
        { text: "$|a|^2$", correct: true, explain: "The vector projection is $\\dfrac{a \\cdot b}{|a|^2}\\,a$." },
        { text: "$|b|^2$", explain: "You project onto $a$, so the denominator is built from $a$, not $b$." },
        { text: "$|a|\\,|b|$", explain: "That denominator appears in $\\cos\\theta$, not in the projection." },
      ],
    },
    {
      id: "s-scalar-result",
      prompt: "A student writes $a \\cdot b = (2, 12)$ for $a = (2, 3)$ and $b = (1, 4)$. What is the correct result?",
      choices: [
        { text: "$14$, a single number", correct: true, explain: "$(2)(1) + (3)(4) = 2 + 12 = 14$. The dot product is a scalar." },
        { text: "$(2, 12)$, a vector", explain: "Those are the two separate products. You must add them into one number." },
        { text: "$14$, a vector", explain: "The value $14$ is right, but it is a scalar, not a vector." },
        { text: "$(3, 7)$", explain: "That adds components in pairs. Multiply matching parts, then add." },
      ],
    },
    {
      id: "s-cos-2425",
      prompt: "For $a = (3, 4)$ and $b = (4, 3)$ you have $a \\cdot b = 24$, $|a| = 5$, $|b| = 5$. Find $\\cos\\theta$.",
      choices: [
        { text: "$24$", explain: "A cosine lies between $-1$ and $1$. You must still divide by $|a|\\,|b| = 25$." },
        { text: "$\\dfrac{24}{10}$", explain: "That divides by $|a| + |b| = 10$. The formula divides by the product $|a|\\,|b|$." },
        { text: "$\\dfrac{24}{25}$", correct: true, explain: "$\\cos\\theta = \\dfrac{a \\cdot b}{|a|\\,|b|} = \\dfrac{24}{(5)(5)} = \\dfrac{24}{25}$." },
        { text: "$\\dfrac{25}{24}$", explain: "This flips the fraction. The dot product goes on top." },
      ],
    },
    {
      id: "s-find-k1",
      prompt: "Find $k$ so that $b = (k, -8)$ is perpendicular to $a = (4, 2)$.",
      choices: [
        { text: "$k = 4$", correct: true, explain: "Perpendicular needs $4k + 2(-8) = 0$, so $4k = 16$ and $k = 4$." },
        { text: "$k = -4$", explain: "Sign slip: $4k = 16$ gives $k = 4$, not $-4$." },
        { text: "$k = 16$", explain: "That solves $4k = 16$ as $k = 16$. Divide by $4$ to get $k = 4$." },
        { text: "$k = -16$", explain: "You need $4k + 2(-8) = 0$, so $4k = 16$ and $k = 4$." },
      ],
    },
    {
      id: "s-find-k2",
      prompt: "Find $k$ so that $b = (2, k)$ is perpendicular to $a = (3, -1)$.",
      choices: [
        { text: "$k = -6$", explain: "Sign slip: $6 - k = 0$ gives $k = 6$." },
        { text: "$k = 6$", correct: true, explain: "Perpendicular needs $3(2) + (-1)k = 0$, so $6 - k = 0$ and $k = 6$." },
        { text: "$k = -2$", explain: "That does not satisfy $6 - k = 0$." },
        { text: "$k = \\tfrac{2}{3}$", explain: "That comes from the wrong equation. Use $3(2) + (-1)k = 0$." },
      ],
    },
    {
      id: "s-sproj-neg",
      prompt: "Find the scalar projection of $b = (-3, 5)$ onto $a = (1, 0)$.",
      choices: [
        { text: "$3$", explain: "The sign matters: $a \\cdot b = -3$, so the scalar projection is $-3$." },
        { text: "$5$", explain: "That is not the shadow on $a$. The scalar projection uses $a \\cdot b = -3$." },
        { text: "$(-3, 0)$", explain: "That is the vector projection. The scalar projection is the number $-3$." },
        { text: "$-3$", correct: true, explain: "$\\dfrac{a \\cdot b}{|a|} = \\dfrac{-3}{1} = -3$, negative because the angle is obtuse." },
      ],
    },
  ],
};
