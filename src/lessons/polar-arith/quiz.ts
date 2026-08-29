import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Multiply and divide in polar form".
 * Grounded in the lesson: to multiply, multiply the moduli and add the arguments;
 * to divide, divide the moduli and subtract the arguments (top minus bottom). The
 * derivation expands the two factors, uses $i^2 = -1$, and reads off the sum
 * identities. Distractors are the classic traps: adding the moduli, multiplying
 * the arguments, subtracting the moduli, dividing the arguments, forgetting
 * $i^2 = -1$, and subtracting the angles in the wrong order.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-mult-mod",
      prompt: "$z_1$ has modulus $2$ and $z_2$ has modulus $3$. What is the modulus of the product $z_1 z_2$?",
      choices: [
        { text: "$6$", correct: true, explain: "Multiply the moduli: $2 \\times 3 = 6$." },
        { text: "$5$", explain: "That adds the moduli ($2 + 3$). For a product you multiply them." },
        { text: "$1$", explain: "That subtracts the moduli. Subtraction is for the angle in a quotient, not the modulus of a product." },
        { text: "$\\tfrac{2}{3}$", explain: "That divides the moduli. Division of moduli belongs to $z_1 / z_2$, not the product." },
      ],
    },
    {
      id: "c-mult-arg",
      prompt: "$z_1$ has argument $30^\\circ$ and $z_2$ has argument $40^\\circ$. What is the argument of the product $z_1 z_2$?",
      choices: [
        { text: "$1200^\\circ$", explain: "That multiplies the angles ($30 \\times 40$). Angles are added, not multiplied." },
        { text: "$70^\\circ$", correct: true, explain: "Add the arguments: $30^\\circ + 40^\\circ = 70^\\circ$." },
        { text: "$-10^\\circ$", explain: "That subtracts the angles, which is the quotient rule, not the product rule." },
        { text: "$10^\\circ$", explain: "That is the size of the difference. A product adds the angles." },
      ],
    },
    {
      id: "c-div-mod",
      prompt: "$|z_1| = 6$ and $|z_2| = 3$. What is $|z_1 / z_2|$?",
      choices: [
        { text: "$18$", explain: "That multiplies the moduli. Multiplication is the product rule. A quotient divides them." },
        { text: "$3$", explain: "That subtracts the moduli ($6 - 3$). Divide them instead: $6 \\div 3$." },
        { text: "$2$", correct: true, explain: "Divide the moduli: $6 \\div 3 = 2$." },
        { text: "$\\tfrac{1}{2}$", explain: "That is bottom over top ($3 / 6$). Keep it top over bottom: $6 / 3$." },
      ],
    },
    {
      id: "c-div-arg",
      prompt: "$\\arg z_1 = 50^\\circ$ and $\\arg z_2 = 20^\\circ$. What is $\\arg(z_1 / z_2)$?",
      choices: [
        { text: "$70^\\circ$", explain: "That adds the angles. Addition is the product rule. A quotient subtracts." },
        { text: "$-30^\\circ$", explain: "That subtracts in the wrong order ($20 - 50$). Use top minus bottom." },
        { text: "$2.5^\\circ$", explain: "That divides the angles ($50 / 20$). Angles are subtracted, not divided." },
        { text: "$30^\\circ$", correct: true, explain: "Subtract top minus bottom: $50^\\circ - 20^\\circ = 30^\\circ$." },
      ],
    },
    {
      id: "c-rule-mult",
      prompt: "Which is the rule for multiplying two complex numbers in polar form?",
      choices: [
        { text: "Multiply the moduli and add the arguments", correct: true, explain: "Lengths multiply. Angles add." },
        { text: "Add the moduli and multiply the arguments", explain: "That swaps the two operations. Multiply the lengths and add the angles." },
        { text: "Add both the moduli and the arguments", explain: "Only the angles add. The moduli multiply." },
        { text: "Multiply both the moduli and the arguments", explain: "Only the moduli multiply. The angles add." },
      ],
    },
    {
      id: "c-rule-div",
      prompt: "Which is the rule for dividing two complex numbers in polar form?",
      choices: [
        { text: "Subtract the moduli and divide the arguments", explain: "That swaps the two operations. Divide the lengths and subtract the angles." },
        { text: "Divide the moduli and subtract the arguments", correct: true, explain: "Lengths divide. Angles subtract." },
        { text: "Divide both the moduli and the arguments", explain: "Only the moduli divide. The angles subtract." },
        { text: "Subtract both the moduli and the arguments", explain: "Only the angles subtract. The moduli divide." },
      ],
    },
    {
      id: "c-cis",
      prompt: "The shorthand $\\text{cis}\\,\\theta$ stands for which expression?",
      choices: [
        { text: "$\\cos\\theta - i\\sin\\theta$", explain: "That has the wrong sign. Cis uses a plus between the cosine and the sine." },
        { text: "$\\sin\\theta + i\\cos\\theta$", explain: "That swaps sine and cosine. The cosine comes first." },
        { text: "$\\cos\\theta + i\\sin\\theta$", correct: true, explain: "Cis is cosine plus $i$ sine: $\\cos\\theta + i\\sin\\theta$." },
        { text: "$i(\\cos\\theta + \\sin\\theta)$", explain: "The $i$ multiplies only the sine term, not both." },
      ],
    },
    {
      id: "c-mult-by-one",
      prompt: "$z_1$ has modulus $1$ and $z_2$ has modulus $5$. What is $|z_1 z_2|$?",
      choices: [
        { text: "$6$", explain: "That adds the moduli. Multiply them: $1 \\times 5$." },
        { text: "$\\tfrac{1}{5}$", explain: "That divides the moduli. A product multiplies them." },
        { text: "$4$", explain: "That subtracts the moduli. A product multiplies them." },
        { text: "$5$", correct: true, explain: "Multiply the moduli: $1 \\times 5 = 5$. Multiplying by a modulus of $1$ keeps the length." },
      ],
    },
    {
      id: "c-mult-arg-eq",
      prompt: "$\\arg z_1 = 15^\\circ$ and $\\arg z_2 = 15^\\circ$. What is $\\arg(z_1 z_2)$?",
      choices: [
        { text: "$30^\\circ$", correct: true, explain: "Add the arguments: $15^\\circ + 15^\\circ = 30^\\circ$." },
        { text: "$225^\\circ$", explain: "That multiplies the angles ($15 \\times 15$). Add them instead." },
        { text: "$0^\\circ$", explain: "That subtracts the angles. A product adds them." },
        { text: "$1^\\circ$", explain: "That divides the angles. A product adds them." },
      ],
    },
    {
      id: "c-div-mod-eq",
      prompt: "$|z_1| = 4$ and $|z_2| = 4$. What is $|z_1 / z_2|$?",
      choices: [
        { text: "$0$", explain: "That subtracts the moduli ($4 - 4$). Divide them: $4 \\div 4$." },
        { text: "$1$", correct: true, explain: "Divide the moduli: $4 \\div 4 = 1$." },
        { text: "$16$", explain: "That multiplies the moduli. A quotient divides them." },
        { text: "$8$", explain: "That adds the moduli. A quotient divides them." },
      ],
    },
    {
      id: "c-div-arg-order",
      prompt: "$\\arg z_1 = 80^\\circ$ and $\\arg z_2 = 30^\\circ$. What is $\\arg(z_1 / z_2)$?",
      choices: [
        { text: "$110^\\circ$", explain: "That adds the angles. A quotient subtracts them." },
        { text: "$-50^\\circ$", explain: "That is the wrong order ($30 - 80$). Use top minus bottom." },
        { text: "$50^\\circ$", correct: true, explain: "Subtract top minus bottom: $80^\\circ - 30^\\circ = 50^\\circ$." },
        { text: "$\\tfrac{8}{3}^\\circ$", explain: "That divides the angles. Subtract them instead." },
      ],
    },
    {
      id: "c-mult-mod-52",
      prompt: "$|z_1| = 5$ and $|z_2| = 2$. What is $|z_1 z_2|$?",
      choices: [
        { text: "$7$", explain: "That adds the moduli. Multiply them: $5 \\times 2$." },
        { text: "$3$", explain: "That subtracts the moduli. A product multiplies them." },
        { text: "$2.5$", explain: "That divides the moduli. A product multiplies them." },
        { text: "$10$", correct: true, explain: "Multiply the moduli: $5 \\times 2 = 10$." },
      ],
    },
    {
      id: "c-times-i",
      prompt: "The number $i$ has modulus $1$ and argument $90^\\circ$. What does multiplying by $i$ do to a complex number's argument?",
      choices: [
        { text: "Adds $90^\\circ$ to it", correct: true, explain: "Multiplying adds the arguments, and $\\arg i = 90^\\circ$, so the number turns $90^\\circ$ counterclockwise." },
        { text: "Subtracts $90^\\circ$ from it", explain: "Subtraction is for division. Multiplying by $i$ adds $90^\\circ$." },
        { text: "Multiplies it by $90$", explain: "Angles add under multiplication. They are not scaled by $90$." },
        { text: "Leaves it unchanged", explain: "Multiplying by $i$ rotates by $90^\\circ$. Only a factor of $1 = \\text{cis}\\,0^\\circ$ leaves the angle unchanged." },
      ],
    },
    {
      id: "c-mult-arg-45",
      prompt: "$\\arg z_1 = 45^\\circ$ and $\\arg z_2 = 45^\\circ$. What is $\\arg(z_1 z_2)$?",
      choices: [
        { text: "$0^\\circ$", explain: "That subtracts the angles. A product adds them." },
        { text: "$90^\\circ$", correct: true, explain: "Add the arguments: $45^\\circ + 45^\\circ = 90^\\circ$." },
        { text: "$2025^\\circ$", explain: "That multiplies the angles ($45 \\times 45$). Add them instead." },
        { text: "$1^\\circ$", explain: "That divides the angles. A product adds them." },
      ],
    },
    {
      id: "c-div-mod-93",
      prompt: "$|z_1| = 9$ and $|z_2| = 3$. What is $|z_1 / z_2|$?",
      choices: [
        { text: "$6$", explain: "That subtracts the moduli ($9 - 3$). Divide them: $9 \\div 3$." },
        { text: "$27$", explain: "That multiplies the moduli. A quotient divides them." },
        { text: "$3$", correct: true, explain: "Divide the moduli: $9 \\div 3 = 3$." },
        { text: "$\\tfrac{1}{3}$", explain: "That is bottom over top ($3 / 9$). Keep it top over bottom." },
      ],
    },
  ],
  summit: [
    {
      id: "s-product-full",
      prompt: "Let $z_1 = 2(\\cos 30^\\circ + i\\sin 30^\\circ)$ and $z_2 = 3(\\cos 40^\\circ + i\\sin 40^\\circ)$. Find $z_1 z_2$.",
      choices: [
        { text: "$6(\\cos 70^\\circ + i\\sin 70^\\circ)$", correct: true, explain: "Multiply the moduli ($2 \\times 3 = 6$) and add the angles ($30^\\circ + 40^\\circ = 70^\\circ$)." },
        { text: "$5(\\cos 70^\\circ + i\\sin 70^\\circ)$", explain: "The angle is right, but $5$ adds the moduli. Multiply them: $2 \\times 3 = 6$." },
        { text: "$6(\\cos 1200^\\circ + i\\sin 1200^\\circ)$", explain: "The modulus is right, but $1200^\\circ$ multiplies the angles. Add them: $30^\\circ + 40^\\circ$." },
        { text: "$6(\\cos(-10^\\circ) + i\\sin(-10^\\circ))$", explain: "That subtracts the angles, which is the quotient rule, not the product rule." },
      ],
    },
    {
      id: "s-quotient-full",
      prompt: "With $z_1 = 2(\\cos 30^\\circ + i\\sin 30^\\circ)$ and $z_2 = 3(\\cos 40^\\circ + i\\sin 40^\\circ)$, find $z_1 / z_2$.",
      choices: [
        { text: "$-1(\\cos(-10^\\circ) + i\\sin(-10^\\circ))$", explain: "The angle is right, but $-1$ subtracts the moduli. Divide them: $2 \\div 3 = \\tfrac{2}{3}$." },
        { text: "$\\tfrac{2}{3}(\\cos 10^\\circ + i\\sin 10^\\circ)$", explain: "The modulus is right, but $10^\\circ$ subtracts in the wrong order. Use top minus bottom: $30^\\circ - 40^\\circ$." },
        { text: "$\\tfrac{2}{3}(\\cos 70^\\circ + i\\sin 70^\\circ)$", explain: "That adds the angles. A quotient subtracts them." },
        { text: "$\\tfrac{2}{3}(\\cos(-10^\\circ) + i\\sin(-10^\\circ))$", correct: true, explain: "Divide the moduli ($2 \\div 3 = \\tfrac{2}{3}$) and subtract the angles ($30^\\circ - 40^\\circ = -10^\\circ$)." },
      ],
    },
    {
      id: "s-pure-rotation",
      prompt: "Multiply $(\\cos 20^\\circ + i\\sin 20^\\circ)(\\cos 40^\\circ + i\\sin 40^\\circ)$.",
      choices: [
        { text: "$2(\\cos 60^\\circ + i\\sin 60^\\circ)$", explain: "The angle is right, but each modulus is $1$, so the product's modulus is $1 \\times 1 = 1$, not $2$." },
        { text: "$\\cos 60^\\circ + i\\sin 60^\\circ$", correct: true, explain: "Both moduli are $1$ ($1 \\times 1 = 1$) and the angles add: $20^\\circ + 40^\\circ = 60^\\circ$." },
        { text: "$\\cos 800^\\circ + i\\sin 800^\\circ$", explain: "That multiplies the angles ($20 \\times 40$). Add them: $20^\\circ + 40^\\circ$." },
        { text: "$\\cos 20^\\circ + i\\sin 20^\\circ$", explain: "That subtracts the angles ($40^\\circ - 20^\\circ$). A product adds them: $20^\\circ + 40^\\circ = 60^\\circ$." },
      ],
    },
    {
      id: "s-cis-4i",
      prompt: "Compute $(2(\\cos 50^\\circ + i\\sin 50^\\circ))(2(\\cos 40^\\circ + i\\sin 40^\\circ))$ and simplify.",
      choices: [
        { text: "$4(\\cos 2000^\\circ + i\\sin 2000^\\circ)$", explain: "That multiplies the angles ($50 \\times 40$). Add them: $50^\\circ + 40^\\circ = 90^\\circ$." },
        { text: "$\\cos 90^\\circ + i\\sin 90^\\circ = i$", explain: "The angle is right, but the moduli multiply to $2 \\times 2 = 4$, giving $4i$." },
        { text: "$4i$", correct: true, explain: "Moduli: $2 \\times 2 = 4$. Angles: $50^\\circ + 40^\\circ = 90^\\circ$. So $4(\\cos 90^\\circ + i\\sin 90^\\circ) = 4i$." },
        { text: "$4(\\cos 10^\\circ + i\\sin 10^\\circ)$", explain: "That subtracts the angles. A product adds them to $90^\\circ$." },
      ],
    },
    {
      id: "s-i-squared",
      prompt: "Expanding $(\\cos\\theta_1 + i\\sin\\theta_1)(\\cos\\theta_2 + i\\sin\\theta_2)$, what does the term $i^2\\sin\\theta_1\\sin\\theta_2$ simplify to?",
      choices: [
        { text: "$+\\sin\\theta_1\\sin\\theta_2$", explain: "That forgets $i^2 = -1$. The sign must flip to a minus." },
        { text: "$-\\sin\\theta_1\\sin\\theta_2$", correct: true, explain: "Since $i^2 = -1$, the term becomes $-\\sin\\theta_1\\sin\\theta_2$." },
        { text: "$i\\sin\\theta_1\\sin\\theta_2$", explain: "That treats $i^2$ as $i$, but $i^2 = -1$, a real number." },
        { text: "$-i\\sin\\theta_1\\sin\\theta_2$", explain: "That treats $i^2$ as $-i$, but $i^2 = -1$, so no $i$ remains." },
      ],
    },
    {
      id: "s-real-part",
      prompt: "After using $i^2 = -1$, the real part of $(\\cos\\theta_1 + i\\sin\\theta_1)(\\cos\\theta_2 + i\\sin\\theta_2)$ is:",
      choices: [
        { text: "$\\cos\\theta_1\\cos\\theta_2 + \\sin\\theta_1\\sin\\theta_2$", explain: "That keeps a plus, which forgets $i^2 = -1$. The real part has a minus." },
        { text: "$\\sin\\theta_1\\cos\\theta_2 + \\cos\\theta_1\\sin\\theta_2$", explain: "That is the imaginary part (the terms carrying $i$), not the real part." },
        { text: "$\\cos\\theta_1\\cos\\theta_2 - \\sin\\theta_1\\sin\\theta_2$", correct: true, explain: "The real terms are $\\cos\\theta_1\\cos\\theta_2$ and $-\\sin\\theta_1\\sin\\theta_2$ (from $i^2 = -1$)." },
        { text: "$\\cos\\theta_1\\cos\\theta_2$", explain: "That drops the $-\\sin\\theta_1\\sin\\theta_2$ term, which is also real." },
      ],
    },
    {
      id: "s-cos-sum",
      prompt: "The expression $\\cos\\theta_1\\cos\\theta_2 - \\sin\\theta_1\\sin\\theta_2$ equals:",
      choices: [
        { text: "$\\cos(\\theta_1 - \\theta_2)$", explain: "The difference form has a plus: $\\cos\\theta_1\\cos\\theta_2 + \\sin\\theta_1\\sin\\theta_2$. The minus gives the sum." },
        { text: "$\\sin(\\theta_1 + \\theta_2)$", explain: "The sine sum mixes sine and cosine. This all-cosine-minus-all-sine form is a cosine." },
        { text: "$\\cos\\theta_1 - \\cos\\theta_2$", explain: "Cosine of a sum does not split into a difference of cosines." },
        { text: "$\\cos(\\theta_1 + \\theta_2)$", correct: true, explain: "This is exactly the cosine sum identity: $\\cos(\\theta_1 + \\theta_2)$." },
      ],
    },
    {
      id: "s-sin-sum",
      prompt: "The expression $\\sin\\theta_1\\cos\\theta_2 + \\cos\\theta_1\\sin\\theta_2$ equals:",
      choices: [
        { text: "$\\sin(\\theta_1 + \\theta_2)$", correct: true, explain: "This is exactly the sine sum identity: $\\sin(\\theta_1 + \\theta_2)$." },
        { text: "$\\sin(\\theta_1 - \\theta_2)$", explain: "The difference form has a minus: $\\sin\\theta_1\\cos\\theta_2 - \\cos\\theta_1\\sin\\theta_2$." },
        { text: "$\\cos(\\theta_1 + \\theta_2)$", explain: "The cosine sum is all-cosine minus all-sine. This mixed form is a sine." },
        { text: "$\\sin\\theta_1 + \\sin\\theta_2$", explain: "Sine of a sum does not split into a sum of sines." },
      ],
    },
    {
      id: "s-trap-add-mod",
      prompt: "A student computes $(3(\\cos 25^\\circ + i\\sin 25^\\circ))(4(\\cos 35^\\circ + i\\sin 35^\\circ)) = 7(\\cos 60^\\circ + i\\sin 60^\\circ)$. What is the error?",
      choices: [
        { text: "Nothing, the answer is correct", explain: "The angle $60^\\circ$ is right, but the modulus is wrong: $3 \\times 4 = 12$, not $7$." },
        { text: "They added the moduli instead of multiplying. It should be $12(\\cos 60^\\circ + i\\sin 60^\\circ)$", correct: true, explain: "Moduli multiply: $3 \\times 4 = 12$. The angle $25^\\circ + 35^\\circ = 60^\\circ$ was already correct." },
        { text: "They should have subtracted the angles", explain: "Subtraction is for division. For a product the angles add, and $60^\\circ$ is correct." },
        { text: "The angle should be $25 \\times 35$", explain: "Angles add, not multiply. $25^\\circ + 35^\\circ = 60^\\circ$ is right." },
      ],
    },
    {
      id: "s-trap-div-arg",
      prompt: "For $\\dfrac{10(\\cos 60^\\circ + i\\sin 60^\\circ)}{2(\\cos 20^\\circ + i\\sin 20^\\circ)}$, a student writes $5(\\cos 3^\\circ + i\\sin 3^\\circ)$. What went wrong?",
      choices: [
        { text: "Nothing, the answer is correct", explain: "The modulus $5$ is right, but $3^\\circ$ divided the angles. They should be subtracted." },
        { text: "They should have multiplied the moduli", explain: "The modulus $10 \\div 2 = 5$ is already correct. The angle is the problem." },
        { text: "They divided the angles ($60 \\div 20$) instead of subtracting. It should be $5(\\cos 40^\\circ + i\\sin 40^\\circ)$", correct: true, explain: "Angles subtract: $60^\\circ - 20^\\circ = 40^\\circ$. The modulus $10 \\div 2 = 5$ was right." },
        { text: "The modulus should be $20$", explain: "That multiplies the moduli. Division divides them: $10 \\div 2 = 5$." },
      ],
    },
    {
      id: "s-order",
      prompt: "For $z_1 / z_2$ with $\\arg z_1 = 35^\\circ$ and $\\arg z_2 = 80^\\circ$, what is $\\arg(z_1 / z_2)$?",
      choices: [
        { text: "$-45^\\circ$", correct: true, explain: "Top minus bottom: $35^\\circ - 80^\\circ = -45^\\circ$." },
        { text: "$45^\\circ$", explain: "That is bottom minus top ($80^\\circ - 35^\\circ$). The order is top minus bottom." },
        { text: "$115^\\circ$", explain: "That adds the angles. A quotient subtracts them." },
        { text: "$\\tfrac{7}{16}^\\circ$", explain: "That divides the angles ($35 / 80$). Subtract them instead." },
      ],
    },
    {
      id: "s-quotient-clean",
      prompt: "Compute $\\dfrac{10(\\cos 130^\\circ + i\\sin 130^\\circ)}{5(\\cos 40^\\circ + i\\sin 40^\\circ)}$.",
      choices: [
        { text: "$2(\\cos 170^\\circ + i\\sin 170^\\circ)$", explain: "That adds the angles. A quotient subtracts: $130^\\circ - 40^\\circ$." },
        { text: "$5(\\cos 90^\\circ + i\\sin 90^\\circ)$", explain: "That subtracts the moduli ($10 - 5$). Divide them: $10 \\div 5 = 2$." },
        { text: "$2(\\cos 3.25^\\circ + i\\sin 3.25^\\circ)$", explain: "That divides the angles ($130 / 40$). Subtract them: $130^\\circ - 40^\\circ$." },
        { text: "$2(\\cos 90^\\circ + i\\sin 90^\\circ)$, which is $2i$", correct: true, explain: "Divide the moduli ($10 \\div 5 = 2$) and subtract the angles ($130^\\circ - 40^\\circ = 90^\\circ$), giving $2i$." },
      ],
    },
    {
      id: "s-times-i-geom",
      prompt: "Geometrically, what does multiplying a complex number by $i$ do?",
      choices: [
        { text: "Doubles its length", explain: "Multiplying by $i$ keeps the length: $|i| = 1$, so the modulus is unchanged." },
        { text: "Rotates it $90^\\circ$ counterclockwise, keeping its length", correct: true, explain: "$i = 1(\\cos 90^\\circ + i\\sin 90^\\circ)$: modulus $1$ keeps the length, and $+90^\\circ$ turns it counterclockwise." },
        { text: "Rotates it $90^\\circ$ clockwise", explain: "A clockwise turn subtracts $90^\\circ$. Multiplying adds the argument $+90^\\circ$." },
        { text: "Reflects it across the real axis", explain: "Reflection across the real axis is conjugation. Multiplying by $i$ is a $90^\\circ$ rotation." },
      ],
    },
    {
      id: "s-square",
      prompt: "Using the product rule on $(\\cos 30^\\circ + i\\sin 30^\\circ)^2 = (\\cos 30^\\circ + i\\sin 30^\\circ)(\\cos 30^\\circ + i\\sin 30^\\circ)$, what do you get?",
      choices: [
        { text: "$2(\\cos 60^\\circ + i\\sin 60^\\circ)$", explain: "The angle is right, but each modulus is $1$, so $1 \\times 1 = 1$, not $2$." },
        { text: "$\\cos 900^\\circ + i\\sin 900^\\circ$", explain: "That multiplies the angles ($30 \\times 30$). Add them: $30^\\circ + 30^\\circ = 60^\\circ$." },
        { text: "$\\cos 60^\\circ + i\\sin 60^\\circ$", correct: true, explain: "Multiply the moduli ($1 \\times 1 = 1$) and add the angles ($30^\\circ + 30^\\circ = 60^\\circ$)." },
        { text: "$\\cos 30^\\circ + i\\sin 30^\\circ$", explain: "That leaves the angle unchanged. Multiplying two copies adds the angles to $60^\\circ$." },
      ],
    },
    {
      id: "s-combined",
      prompt: "Let $z_1 = 6(\\cos 100^\\circ + i\\sin 100^\\circ)$ and $z_2 = 2(\\cos 30^\\circ + i\\sin 30^\\circ)$. Which statement is correct?",
      choices: [
        { text: "$z_1 z_2 = 8(\\cos 130^\\circ + i\\sin 130^\\circ)$ and $z_1 / z_2 = 4(\\cos 70^\\circ + i\\sin 70^\\circ)$", explain: "The angles are right, but $8$ and $4$ add and subtract the moduli. They should multiply and divide: $12$ and $3$." },
        { text: "$z_1 z_2 = 12(\\cos 3000^\\circ + i\\sin 3000^\\circ)$ and $z_1 / z_2 = 3(\\cos 3.33^\\circ + i\\sin 3.33^\\circ)$", explain: "The moduli are right, but the angles were multiplied and divided. They should add and subtract: $130^\\circ$ and $70^\\circ$." },
        { text: "$z_1 z_2 = 12(\\cos 70^\\circ + i\\sin 70^\\circ)$ and $z_1 / z_2 = 3(\\cos 130^\\circ + i\\sin 130^\\circ)$", explain: "The moduli are right, but add and subtract are swapped: the product adds ($130^\\circ$) and the quotient subtracts ($70^\\circ$)." },
        { text: "$z_1 z_2 = 12(\\cos 130^\\circ + i\\sin 130^\\circ)$ and $z_1 / z_2 = 3(\\cos 70^\\circ + i\\sin 70^\\circ)$", correct: true, explain: "Product: $6 \\times 2 = 12$ and $100^\\circ + 30^\\circ = 130^\\circ$. Quotient: $6 \\div 2 = 3$ and $100^\\circ - 30^\\circ = 70^\\circ$." },
      ],
    },
  ],
};
