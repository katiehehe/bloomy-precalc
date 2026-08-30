import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Magnitude and direction".
 * Grounded in the lesson: |v| = sqrt(vx^2 + vy^2); direction theta = tan^-1(vy/vx)
 * with +180 degrees in quadrants II and III; and the reverse conversion
 * vx = |v|cos(theta), vy = |v|sin(theta). Distractors are the classic traps:
 * adding the components, skipping the square root, flipping the tangent ratio,
 * forgetting the quadrant fix, and swapping sine with cosine. Every magnitude,
 * angle, and component below is verified by hand.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-mag-34",
      prompt: "Find the magnitude of $v = (3, 4)$.",
      choices: [
        { text: "$7$", explain: "That adds the components, $3 + 4$. Magnitude squares each part first, then takes a square root." },
        { text: "$5$", correct: true, explain: "$\\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$." },
        { text: "$25$", explain: "That is $3^2 + 4^2$ before the square root. You still need $\\sqrt{25} = 5$." },
        { text: "$12$", explain: "That multiplies the components, $3 \\cdot 4$. Magnitude uses a sum of squares, not a product." },
      ],
    },
    {
      id: "c-mag-68",
      prompt: "Find the magnitude of $v = (6, 8)$.",
      choices: [
        { text: "$10$", correct: true, explain: "$\\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$." },
        { text: "$14$", explain: "That adds the parts, $6 + 8$. The parts are perpendicular, so you cannot just add them." },
        { text: "$100$", explain: "That is $6^2 + 8^2$ before the square root. Take $\\sqrt{100} = 10$." },
        { text: "$48$", explain: "That multiplies the parts, $6 \\cdot 8$. Magnitude adds the squares instead." },
      ],
    },
    {
      id: "c-mag-512",
      prompt: "Find the magnitude of $v = (5, 12)$.",
      choices: [
        { text: "$17$", explain: "That adds $5 + 12$. Square each part, add, then take the root." },
        { text: "$13$", correct: true, explain: "$\\sqrt{5^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13$." },
        { text: "$169$", explain: "That is $5^2 + 12^2$. You still owe the square root, $\\sqrt{169} = 13$." },
        { text: "$60$", explain: "That is $5 \\cdot 12$. Magnitude is not a product of the components." },
      ],
    },
    {
      id: "c-mag-neg",
      prompt: "Find the magnitude of $v = (-3, 4)$.",
      choices: [
        { text: "$-5$", explain: "A magnitude is a length, so it is never negative. Squaring $-3$ gives $+9$." },
        { text: "$5$", correct: true, explain: "$\\sqrt{(-3)^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$. The sign of a part does not matter." },
        { text: "$1$", explain: "That subtracts, $4 - 3$. Magnitude squares each part, so the sign disappears." },
        { text: "$7$", explain: "That adds the sizes, $3 + 4$. Use the square root of the sum of squares." },
      ],
    },
    {
      id: "c-mag-formula",
      prompt: "Which formula gives the magnitude of $v = (v_x, v_y)$?",
      choices: [
        { text: "$|v| = v_x + v_y$", explain: "Adding the parts ignores that they are perpendicular legs of a right triangle." },
        { text: "$|v| = \\sqrt{v_x^2 + v_y^2}$", correct: true, explain: "The components are the legs, so the length is the hypotenuse by the Pythagorean theorem." },
        { text: "$|v| = \\sqrt{v_x + v_y}$", explain: "You must square each component before adding, not after." },
        { text: "$|v| = v_x^2 + v_y^2$", explain: "That is the sum of squares. The magnitude is its square root." },
      ],
    },
    {
      id: "c-dir-formula",
      prompt: "For a vector $(v_x, v_y)$, which equation gives its direction angle $\\theta$?",
      choices: [
        { text: "$\\tan\\theta = \\dfrac{v_y}{v_x}$", correct: true, explain: "In the component triangle $v_y$ is opposite and $v_x$ is adjacent, so tangent is $v_y / v_x$." },
        { text: "$\\tan\\theta = \\dfrac{v_x}{v_y}$", explain: "This flips the ratio. Tangent is opposite over adjacent, which is $v_y / v_x$." },
        { text: "$\\tan\\theta = v_x \\cdot v_y$", explain: "Tangent is a ratio of the two parts, not their product." },
        { text: "$\\tan\\theta = v_x + v_y$", explain: "Direction comes from the ratio of the parts, not their sum." },
      ],
    },
    {
      id: "c-dir-43",
      prompt: "Find the direction angle of $v = (4, 3)$, a first-quadrant vector.",
      choices: [
        { text: "$36.87^\\circ$", correct: true, explain: "$\\theta = \\tan^{-1}\\!\\left(\\dfrac{3}{4}\\right) \\approx 36.87^\\circ$, and it already points into quadrant I." },
        { text: "$53.13^\\circ$", explain: "That uses $\\tan^{-1}(4/3)$, the flipped ratio. Opposite over adjacent is $3/4$." },
        { text: "$0.75^\\circ$", explain: "That is the ratio $3/4$ itself. You must take the inverse tangent of it." },
        { text: "$143.13^\\circ$", explain: "That adds $180^\\circ$, but a first-quadrant vector needs no correction." },
      ],
    },
    {
      id: "c-dir-up",
      prompt: "Find the direction angle of $v = (0, 5)$.",
      choices: [
        { text: "$90^\\circ$", correct: true, explain: "The vector points straight up along $+y$, which is $90^\\circ$ from the positive $x$-axis." },
        { text: "$0^\\circ$", explain: "$0^\\circ$ points along $+x$. This vector has no horizontal part, so it points straight up." },
        { text: "$180^\\circ$", explain: "$180^\\circ$ points along $-x$ (to the left). Straight up is $90^\\circ$." },
        { text: "$45^\\circ$", explain: "$45^\\circ$ would need equal parts. Here the horizontal part is $0$." },
      ],
    },
    {
      id: "c-arctan-range",
      prompt: "A calculator's $\\tan^{-1}$ (inverse tangent) returns angles only in which range?",
      choices: [
        { text: "Between $-90^\\circ$ and $90^\\circ$", correct: true, explain: "Inverse tangent covers quadrants I and IV only, which is why quadrants II and III need a fix." },
        { text: "Between $0^\\circ$ and $180^\\circ$", explain: "That is the range of inverse cosine, not inverse tangent." },
        { text: "Between $0^\\circ$ and $360^\\circ$", explain: "A calculator cannot return a full turn from tangent alone. It gives $-90^\\circ$ to $90^\\circ$." },
        { text: "Between $-180^\\circ$ and $180^\\circ$", explain: "That is wider than inverse tangent's true range of $-90^\\circ$ to $90^\\circ$." },
      ],
    },
    {
      id: "c-quad-II",
      prompt: "Find the direction angle of $v = (-4, 3)$, which points up and to the left (quadrant II).",
      choices: [
        { text: "$143.13^\\circ$", correct: true, explain: "$\\tan^{-1}\\!\\left(\\dfrac{3}{-4}\\right) \\approx -36.87^\\circ$, and adding $180^\\circ$ gives $143.13^\\circ$ in quadrant II." },
        { text: "$-36.87^\\circ$", explain: "That is the raw calculator value, which points into quadrant IV. Add $180^\\circ$ for quadrant II." },
        { text: "$36.87^\\circ$", explain: "That points up and to the right, but this vector points up and to the left." },
        { text: "$216.87^\\circ$", explain: "That adds $180^\\circ$ to $+36.87^\\circ$. Start from the calculator value $-36.87^\\circ$, then add $180^\\circ$." },
      ],
    },
    {
      id: "c-quad-which",
      prompt: "For which quadrants must you add $180^\\circ$ to the calculator's $\\tan^{-1}$ result?",
      choices: [
        { text: "Quadrants II and III", correct: true, explain: "These are exactly the quadrants where $v_x < 0$, so the raw value points the wrong way." },
        { text: "Quadrants I and IV", explain: "These are where the calculator already lands, so no fix is needed there." },
        { text: "Quadrants III and IV", explain: "Quadrant IV needs no fix. The correction is for II and III, where $v_x < 0$." },
        { text: "All four quadrants", explain: "Quadrants I and IV are already correct, so adding $180^\\circ$ there would break them." },
      ],
    },
    {
      id: "c-comp-cos",
      prompt: "A vector has $|v| = 10$ and $\\theta = 30^\\circ$. Find $v_x = |v|\\cos\\theta$.",
      choices: [
        { text: "$5\\sqrt{3} \\approx 8.66$", correct: true, explain: "$\\cos 30^\\circ = \\dfrac{\\sqrt{3}}{2}$, so $v_x = 10 \\cdot \\dfrac{\\sqrt{3}}{2} = 5\\sqrt{3}$." },
        { text: "$5$", explain: "That is $|v|\\sin 30^\\circ$. The horizontal part uses cosine, not sine." },
        { text: "$10$", explain: "That is the full magnitude. You must multiply by $\\cos 30^\\circ$." },
        { text: "$\\dfrac{\\sqrt{3}}{2}$", explain: "That is just $\\cos 30^\\circ$. Multiply it by $|v| = 10$." },
      ],
    },
    {
      id: "c-comp-sin",
      prompt: "The same vector has $|v| = 10$ and $\\theta = 30^\\circ$. Find $v_y = |v|\\sin\\theta$.",
      choices: [
        { text: "$5\\sqrt{3} \\approx 8.66$", explain: "That is $|v|\\cos 30^\\circ$. The vertical part uses sine, not cosine." },
        { text: "$5$", correct: true, explain: "$\\sin 30^\\circ = \\dfrac{1}{2}$, so $v_y = 10 \\cdot \\dfrac{1}{2} = 5$." },
        { text: "$10$", explain: "That is the full magnitude. You must multiply by $\\sin 30^\\circ$." },
        { text: "$\\dfrac{1}{2}$", explain: "That is just $\\sin 30^\\circ$. Multiply it by $|v| = 10$." },
      ],
    },
    {
      id: "c-convert-formulas",
      prompt: "Which pair of formulas turns a magnitude and direction into components?",
      choices: [
        { text: "$v_x = |v|\\cos\\theta, \\ v_y = |v|\\sin\\theta$", correct: true, explain: "The horizontal part is adjacent to $\\theta$ (cosine), the vertical part is opposite (sine)." },
        { text: "$v_x = |v|\\sin\\theta, \\ v_y = |v|\\cos\\theta$", explain: "This swaps sine and cosine. The horizontal part pairs with cosine." },
        { text: "$v_x = |v|\\tan\\theta, \\ v_y = |v|\\cos\\theta$", explain: "Components use sine and cosine, not tangent." },
        { text: "$v_x = \\dfrac{\\cos\\theta}{|v|}, \\ v_y = \\dfrac{\\sin\\theta}{|v|}$", explain: "You multiply by $|v|$, not divide by it. Dividing shrinks a long vector to nearly nothing." },
      ],
    },
    {
      id: "c-app-513",
      prompt: "A vector has $|v| = 13$ and a whole-number horizontal part $v_x = 5$. Find $v_y$, taking it positive.",
      choices: [
        { text: "$8$", explain: "That is $13 - 5$. Use the Pythagorean relation $5^2 + v_y^2 = 13^2$, not subtraction." },
        { text: "$12$", correct: true, explain: "$v_y = \\sqrt{13^2 - 5^2} = \\sqrt{169 - 25} = \\sqrt{144} = 12$, the 5-12-13 triangle." },
        { text: "$12.5$", explain: "That is close, but the exact answer is $\\sqrt{144} = 12$ from the 5-12-13 triangle." },
        { text: "$18$", explain: "That adds $13 + 5$. The magnitude is the hypotenuse, so subtract the squares." },
      ],
    },
  ],
  summit: [
    {
      id: "s-mag-724",
      prompt: "Find the magnitude of $v = (7, 24)$.",
      choices: [
        { text: "$25$", correct: true, explain: "$\\sqrt{7^2 + 24^2} = \\sqrt{49 + 576} = \\sqrt{625} = 25$, the 7-24-25 triangle." },
        { text: "$31$", explain: "That adds $7 + 24$. The parts are perpendicular, so use the square root of the sum of squares." },
        { text: "$625$", explain: "That is $7^2 + 24^2$ before the root. Take $\\sqrt{625} = 25$." },
        { text: "$168$", explain: "That is $7 \\cdot 24$. Magnitude is not a product." },
      ],
    },
    {
      id: "s-mag-negneg",
      prompt: "Find the magnitude of $v = (-6, -8)$.",
      choices: [
        { text: "$10$", correct: true, explain: "$\\sqrt{(-6)^2 + (-8)^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$. Squaring removes both minus signs." },
        { text: "$-10$", explain: "A magnitude is a length, so it is never negative even when both parts are negative." },
        { text: "$14$", explain: "That adds the sizes, $6 + 8$. Use the square root of the sum of squares." },
        { text: "$2$", explain: "That subtracts, $8 - 6$. Squaring makes both parts positive before adding." },
      ],
    },
    {
      id: "s-dir-34",
      prompt: "Find the direction angle of $v = (3, 4)$, a first-quadrant vector.",
      choices: [
        { text: "$53.13^\\circ$", correct: true, explain: "$\\theta = \\tan^{-1}\\!\\left(\\dfrac{4}{3}\\right) \\approx 53.13^\\circ$, and it lies in quadrant I already." },
        { text: "$36.87^\\circ$", explain: "That uses $\\tan^{-1}(3/4)$, the flipped ratio. Opposite over adjacent is $4/3$ here." },
        { text: "$126.87^\\circ$", explain: "That adds $90^\\circ$. A first-quadrant vector needs no correction." },
        { text: "$306.87^\\circ$", explain: "That points into quadrant IV. This vector points up and to the right." },
      ],
    },
    {
      id: "s-dir-III",
      prompt: "Find the direction angle of $v = (-3, -4)$, which points down and to the left (quadrant III).",
      choices: [
        { text: "$233.13^\\circ$", correct: true, explain: "$\\tan^{-1}\\!\\left(\\dfrac{-4}{-3}\\right) \\approx 53.13^\\circ$, and adding $180^\\circ$ gives $233.13^\\circ$ in quadrant III." },
        { text: "$53.13^\\circ$", explain: "That is the raw calculator value, which points into quadrant I. Add $180^\\circ$ for quadrant III." },
        { text: "$126.87^\\circ$", explain: "That is a quadrant II angle. This vector points down and to the left." },
        { text: "$306.87^\\circ$", explain: "That is a quadrant IV angle. Quadrant III needs the raw value plus $180^\\circ$." },
      ],
    },
    {
      id: "s-dir-IV",
      prompt: "Find the direction angle of $v = (3, -4)$, which points down and to the right (quadrant IV), reported in $[0^\\circ, 360^\\circ)$.",
      choices: [
        { text: "$306.87^\\circ$", correct: true, explain: "$\\tan^{-1}\\!\\left(\\dfrac{-4}{3}\\right) \\approx -53.13^\\circ$, and adding $360^\\circ$ lands it at $306.87^\\circ$." },
        { text: "$53.13^\\circ$", explain: "That drops the negative sign. The vertical part is negative, so the angle is below the $x$-axis." },
        { text: "$233.13^\\circ$", explain: "That adds $180^\\circ$, but quadrant IV needs no $180^\\circ$ fix, only a wrap by $360^\\circ$." },
        { text: "$126.87^\\circ$", explain: "That is a quadrant II angle, pointing up and to the left, the opposite way." },
      ],
    },
    {
      id: "s-comp-120",
      prompt: "A vector has $|v| = 2$ and $\\theta = 120^\\circ$. Find its components $(v_x, v_y)$.",
      choices: [
        { text: "$(-1, \\sqrt{3})$", correct: true, explain: "$\\cos 120^\\circ = -\\dfrac{1}{2}$ and $\\sin 120^\\circ = \\dfrac{\\sqrt{3}}{2}$, so $v = 2\\left(-\\dfrac{1}{2}, \\dfrac{\\sqrt{3}}{2}\\right) = (-1, \\sqrt{3})$." },
        { text: "$(1, \\sqrt{3})$", explain: "That misses the sign of cosine. At $120^\\circ$ the vector points left, so $v_x < 0$." },
        { text: "$(\\sqrt{3}, -1)$", explain: "That swaps the roles of sine and cosine and misplaces the sign." },
        { text: "$(-1, -\\sqrt{3})$", explain: "At $120^\\circ$ the vector points up, so $v_y > 0$. The vertical part is $+\\sqrt{3}$." },
      ],
    },
    {
      id: "s-comp-45",
      prompt: "A vector has $|v| = 8$ and $\\theta = 45^\\circ$. Find the horizontal component $v_x$.",
      choices: [
        { text: "$4\\sqrt{2} \\approx 5.66$", correct: true, explain: "$\\cos 45^\\circ = \\dfrac{\\sqrt{2}}{2}$, so $v_x = 8 \\cdot \\dfrac{\\sqrt{2}}{2} = 4\\sqrt{2}$." },
        { text: "$8$", explain: "That is the full magnitude. Multiply by $\\cos 45^\\circ = \\dfrac{\\sqrt{2}}{2}$." },
        { text: "$4$", explain: "That uses $\\cos 45^\\circ = \\dfrac{1}{2}$, but the correct value is $\\dfrac{\\sqrt{2}}{2}$." },
        { text: "$8\\sqrt{2} \\approx 11.31$", explain: "That multiplies by $\\sqrt{2}$ instead of $\\dfrac{\\sqrt{2}}{2}$, so it is twice too big." },
      ],
    },
    {
      id: "s-comp-9053",
      prompt: "A vector has $|v| = 10$ and $\\theta = 53.13^\\circ$, where $\\cos\\theta = 0.6$ and $\\sin\\theta = 0.8$. Find $v_x$.",
      choices: [
        { text: "$6$", correct: true, explain: "$v_x = |v|\\cos\\theta = 10(0.6) = 6$." },
        { text: "$8$", explain: "That is $v_y = 10\\sin\\theta = 10(0.8)$. The horizontal part uses cosine." },
        { text: "$10$", explain: "That is the full magnitude. Multiply by $\\cos\\theta = 0.6$." },
        { text: "$5$", explain: "That would need $\\cos\\theta = 0.5$, but here $\\cos\\theta = 0.6$." },
      ],
    },
    {
      id: "s-comp-270",
      prompt: "A vector has $|v| = 5$ and $\\theta = 270^\\circ$. Find its components $(v_x, v_y)$.",
      choices: [
        { text: "$(0, -5)$", correct: true, explain: "$\\cos 270^\\circ = 0$ and $\\sin 270^\\circ = -1$, so $v = 5(0, -1) = (0, -5)$, pointing straight down." },
        { text: "$(0, 5)$", explain: "That points straight up ($90^\\circ$). At $270^\\circ$ the vector points straight down." },
        { text: "$(5, 0)$", explain: "That points right ($0^\\circ$). At $270^\\circ$ the horizontal part is $0$." },
        { text: "$(-5, 0)$", explain: "That points left ($180^\\circ$). At $270^\\circ$ the horizontal part is $0$ and the vertical part is $-5$." },
      ],
    },
    {
      id: "s-quad-of-angle",
      prompt: "A vector has direction angle $\\theta = 210^\\circ$. In which quadrant does it lie?",
      choices: [
        { text: "Quadrant III", correct: true, explain: "Angles from $180^\\circ$ to $270^\\circ$ point down and to the left, so both components are negative." },
        { text: "Quadrant II", explain: "Quadrant II runs from $90^\\circ$ to $180^\\circ$. At $210^\\circ$ you are past $180^\\circ$." },
        { text: "Quadrant IV", explain: "Quadrant IV runs from $270^\\circ$ to $360^\\circ$. At $210^\\circ$ you have not reached $270^\\circ$." },
        { text: "Quadrant I", explain: "Quadrant I runs from $0^\\circ$ to $90^\\circ$. At $210^\\circ$ the vector points into quadrant III." },
      ],
    },
    {
      id: "s-dir-negx",
      prompt: "Find the direction angle of $v = (-5, 0)$.",
      choices: [
        { text: "$180^\\circ$", correct: true, explain: "The vector points straight along the negative $x$-axis, which is $180^\\circ$ from the positive $x$-axis." },
        { text: "$0^\\circ$", explain: "$0^\\circ$ points along $+x$ (to the right). This vector points to the left." },
        { text: "$90^\\circ$", explain: "$90^\\circ$ points straight up. This vector lies flat along the $x$-axis." },
        { text: "$270^\\circ$", explain: "$270^\\circ$ points straight down. Pointing left is $180^\\circ$." },
      ],
    },
    {
      id: "s-trap-add",
      prompt: "A student computes the magnitude of $(6, 8)$ as $6 + 8 = 14$. What is the correct value?",
      choices: [
        { text: "$14$, adding the parts is fine", explain: "The parts are perpendicular, so they do not add directly. You need the hypotenuse." },
        { text: "$10$, the square root of the sum of squares", correct: true, explain: "$\\sqrt{6^2 + 8^2} = \\sqrt{100} = 10$. The magnitude is the hypotenuse, always less than the sum of the legs." },
        { text: "$48$, the product of the parts", explain: "$6 \\cdot 8 = 48$ is a product, not a length. Use the sum of squares under a root." },
        { text: "$100$, the sum of the squares", explain: "That is $6^2 + 8^2$ before the square root. Finish with $\\sqrt{100} = 10$." },
      ],
    },
    {
      id: "s-dir-downy",
      prompt: "Find the direction angle of $v = (0, -3)$.",
      choices: [
        { text: "$270^\\circ$", correct: true, explain: "The vector points straight down along $-y$, which is $270^\\circ$ measured counterclockwise from $+x$." },
        { text: "$90^\\circ$", explain: "$90^\\circ$ points straight up. This vector points straight down." },
        { text: "$0^\\circ$", explain: "$0^\\circ$ points to the right. This vector has no horizontal part and points down." },
        { text: "$180^\\circ$", explain: "$180^\\circ$ points to the left. Straight down is $270^\\circ$." },
      ],
    },
    {
      id: "s-comp-690",
      prompt: "A vector has $|v| = 6$ and $\\theta = 90^\\circ$. Find its components $(v_x, v_y)$.",
      choices: [
        { text: "$(0, 6)$", correct: true, explain: "$\\cos 90^\\circ = 0$ and $\\sin 90^\\circ = 1$, so $v = 6(0, 1) = (0, 6)$, straight up." },
        { text: "$(6, 0)$", explain: "That points right ($0^\\circ$). At $90^\\circ$ the horizontal part is $0$." },
        { text: "$(0, -6)$", explain: "That points straight down ($270^\\circ$). At $90^\\circ$ the vertical part is $+6$." },
        { text: "$(6, 6)$", explain: "That would need a $45^\\circ$ direction with a larger magnitude. Here all the length is vertical." },
      ],
    },
    {
      id: "s-samemag",
      prompt: "Which vector has the same magnitude as $(8, 6)$?",
      choices: [
        { text: "$(6, 8)$", correct: true, explain: "$\\sqrt{6^2 + 8^2} = \\sqrt{100} = 10$, the same as $\\sqrt{8^2 + 6^2} = 10$. Swapping the parts keeps the length." },
        { text: "$(5, 5)$", explain: "$\\sqrt{25 + 25} = \\sqrt{50} \\approx 7.07$, not $10$." },
        { text: "$(9, 4)$", explain: "$\\sqrt{81 + 16} = \\sqrt{97} \\approx 9.85$, close but not $10$." },
        { text: "$(2, 3)$", explain: "$\\sqrt{4 + 9} = \\sqrt{13} \\approx 3.61$, far from $10$." },
      ],
    },
  ],
};
