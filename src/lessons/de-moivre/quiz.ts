import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Euler's form and De Moivre".
 * Grounded in the lesson: Euler's formula $e^{i\theta} = \cos\theta + i\sin\theta$
 * gives the exponential form $z = re^{i\theta}$; multiplying adds the arguments
 * because $e^{a}e^{b} = e^{a+b}$; and De Moivre raises the modulus to the power
 * $n$ and multiplies the argument by $n$. Distractors are the classic traps:
 * swapping the roles of $r$ and $\theta$, leaving $r$ un-raised or multiplying it
 * by $n$, leaving the argument unchanged, or adding $n$ to the argument instead
 * of multiplying.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-euler-formula",
      prompt: "Euler's formula says $e^{i\\theta}$ equals:",
      choices: [
        { text: "$\\cos\\theta + i\\sin\\theta$", correct: true, explain: "That is Euler's formula: the point at angle $\\theta$ on the unit circle." },
        { text: "$\\sin\\theta + i\\cos\\theta$", explain: "The real part is the cosine and the imaginary part is the sine, so this has them swapped." },
        { text: "$\\cos\\theta - i\\sin\\theta$", explain: "That is $e^{-i\\theta}$. For $e^{+i\\theta}$ the imaginary part is $+i\\sin\\theta$." },
        { text: "$\\theta + i$", explain: "Euler's formula produces a trig point on the unit circle, not $\\theta$ plus $i$." },
      ],
    },
    {
      id: "c-cis-euler",
      prompt: "Which is a shorter way to write $\\cos\\theta + i\\sin\\theta$?",
      choices: [
        { text: "$e^{i\\theta}$", correct: true, explain: "By Euler's formula, $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$." },
        { text: "$e^{\\theta}$", explain: "The exponent must be imaginary. $e^{\\theta}$ is a real number, not a point on the unit circle." },
        { text: "$e^{-i\\theta}$", explain: "That equals $\\cos\\theta - i\\sin\\theta$, the conjugate, with a minus sign on the sine." },
        { text: "$i\\theta$", explain: "$i\\theta$ is just an imaginary number, not the trig point $\\cos\\theta + i\\sin\\theta$." },
      ],
    },
    {
      id: "c-exp-r",
      prompt: "In the exponential form $z = re^{i\\theta}$, what does $r$ stand for?",
      choices: [
        { text: "The modulus $|z|$, the distance from the origin", correct: true, explain: "$r$ multiplies the unit-circle point $e^{i\\theta}$, stretching it to distance $r$." },
        { text: "The argument, the angle from the positive real axis", explain: "That is $\\theta$, not $r$. The angle lives in the exponent." },
        { text: "The real part of $z$", explain: "The real part is $r\\cos\\theta$, not $r$ alone." },
        { text: "The imaginary part of $z$", explain: "The imaginary part is $r\\sin\\theta$, not $r$ alone." },
      ],
    },
    {
      id: "c-exp-theta",
      prompt: "In the exponential form $z = re^{i\\theta}$, what does $\\theta$ stand for?",
      choices: [
        { text: "The argument, the angle from the positive real axis", correct: true, explain: "$\\theta = \\arg z$ sits in the exponent and sets the direction." },
        { text: "The modulus $|z|$", explain: "That is $r$, the factor in front, not $\\theta$." },
        { text: "The real part of $z$", explain: "The real part is $r\\cos\\theta$. $\\theta$ is the angle, not a coordinate." },
        { text: "The distance from the origin", explain: "The distance is $r$. $\\theta$ is the angle." },
      ],
    },
    {
      id: "c-euler-pi",
      prompt: "Apply Euler's formula: $e^{i\\pi}$ equals:",
      choices: [
        { text: "$-1$", correct: true, explain: "$e^{i\\pi} = \\cos\\pi + i\\sin\\pi = -1 + 0i = -1$." },
        { text: "$1$", explain: "That is $\\cos 0$. At $\\theta = \\pi$ the point is on the negative real axis, giving $-1$." },
        { text: "$i$", explain: "That is $e^{i\\pi/2}$. At $\\theta = \\pi$ the value is $-1$." },
        { text: "$-i$", explain: "That is $e^{-i\\pi/2}$ (or $e^{i3\\pi/2}$). At $\\theta = \\pi$ the value is $-1$." },
      ],
    },
    {
      id: "c-exp-half-pi",
      prompt: "Apply Euler's formula: $e^{i\\pi/2}$ equals:",
      choices: [
        { text: "$i$", correct: true, explain: "$e^{i\\pi/2} = \\cos\\tfrac{\\pi}{2} + i\\sin\\tfrac{\\pi}{2} = 0 + i = i$." },
        { text: "$1$", explain: "That is $\\cos 0$. At $\\theta = \\tfrac{\\pi}{2}$ the point is straight up, giving $i$." },
        { text: "$-1$", explain: "That is $e^{i\\pi}$. At $\\theta = \\tfrac{\\pi}{2}$ the value is $i$." },
        { text: "$-i$", explain: "That points straight down at $\\theta = \\tfrac{3\\pi}{2}$. At $\\tfrac{\\pi}{2}$ the value is $+i$." },
      ],
    },
    {
      id: "c-mult-exp",
      prompt: "Using exponential form, $\\left(r_1 e^{i\\theta_1}\\right)\\left(r_2 e^{i\\theta_2}\\right)$ equals:",
      choices: [
        { text: "$r_1 r_2 \\, e^{i(\\theta_1 + \\theta_2)}$", correct: true, explain: "The moduli multiply and the exponents add, because $e^{a}e^{b} = e^{a+b}$." },
        { text: "$r_1 r_2 \\, e^{i\\theta_1 \\theta_2}$", explain: "The exponents add, they do not multiply: $\\theta_1 + \\theta_2$, not $\\theta_1\\theta_2$." },
        { text: "$(r_1 + r_2)\\, e^{i(\\theta_1 + \\theta_2)}$", explain: "The moduli multiply, they do not add: $r_1 r_2$, not $r_1 + r_2$." },
        { text: "$r_1 r_2 \\, e^{i(\\theta_1 - \\theta_2)}$", explain: "That is division. Multiplying adds the arguments, giving $\\theta_1 + \\theta_2$." },
      ],
    },
    {
      id: "c-why-add",
      prompt: "Why do the arguments add when you multiply two complex numbers?",
      choices: [
        { text: "Because exponents add: $e^{i\\theta_1} e^{i\\theta_2} = e^{i(\\theta_1 + \\theta_2)}$", correct: true, explain: "The arguments sit in the exponents, and multiplying powers of $e$ adds those exponents." },
        { text: "Because angles are always added in geometry", explain: "Angles are not always added. Here it is the exponent law that makes them add." },
        { text: "Because the moduli multiply at the same time", explain: "The moduli multiplying is a separate fact. The arguments add because of the exponent rule." },
        { text: "Because $\\cos$ and $\\sin$ are periodic", explain: "Periodicity does not explain the sum. The exponent law $e^{a}e^{b} = e^{a+b}$ does." },
      ],
    },
    {
      id: "c-power-exp",
      prompt: "In exponential form, $\\left(r e^{i\\theta}\\right)^n$ equals:",
      choices: [
        { text: "$r^n e^{i n\\theta}$", correct: true, explain: "Raise the modulus to the $n$ and multiply the exponent $i\\theta$ by $n$." },
        { text: "$r^n e^{i\\theta}$", explain: "The argument must also be multiplied by $n$: the exponent becomes $in\\theta$." },
        { text: "$n r \\, e^{i n\\theta}$", explain: "The modulus is raised to a power, not multiplied by $n$: $r^n$, not $nr$." },
        { text: "$r e^{i n\\theta}$", explain: "The modulus must be raised too: $r^n$, not $r$." },
      ],
    },
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
  ],
  summit: [
    {
      id: "s-euler-identity",
      prompt: "Using $e^{i\\pi} = -1$, what is $e^{i\\pi} + 1$?",
      choices: [
        { text: "$0$", correct: true, explain: "$e^{i\\pi} = -1$, so $e^{i\\pi} + 1 = 0$. This is Euler's identity." },
        { text: "$2$", explain: "That would need $e^{i\\pi} = 1$. In fact $e^{i\\pi} = -1$, so the sum is $0$." },
        { text: "$i$", explain: "$e^{i\\pi}$ is real and equals $-1$, so $e^{i\\pi} + 1 = 0$, not $i$." },
        { text: "$-1$", explain: "That is $e^{i\\pi}$ before adding $1$. Adding $1$ gives $0$." },
      ],
    },
    {
      id: "s-exp-power",
      prompt: "In exponential form, $\\left(2 e^{i\\theta}\\right)^4$ equals:",
      choices: [
        { text: "$16\\, e^{i 4\\theta}$", correct: true, explain: "Raise the modulus, $2^4 = 16$, and multiply the exponent, $4\\theta$." },
        { text: "$8\\, e^{i 4\\theta}$", explain: "That is $2^3$. The exponent on the modulus is $4$, so $2^4 = 16$." },
        { text: "$16\\, e^{i\\theta}$", explain: "The argument must be multiplied by $4$ too: the exponent is $i4\\theta$." },
        { text: "$2\\, e^{i 4\\theta}$", explain: "The modulus must be raised to the $4$: $2^4 = 16$, not $2$." },
      ],
    },
    {
      id: "s-exp-power-mod",
      prompt: "What is the modulus of $\\left(5 e^{i\\theta}\\right)^3$?",
      choices: [
        { text: "$125$", correct: true, explain: "Raise the modulus to the power: $5^3 = 125$." },
        { text: "$15$", explain: "That multiplies $r$ by $n$ ($5 \\cdot 3$). The power is an exponent: $5^3 = 125$." },
        { text: "$25$", explain: "That is $5^2$. The exponent is $3$, so $5^3 = 125$." },
        { text: "$5$", explain: "That leaves $r$ unchanged. The power raises it to $5^3 = 125$." },
      ],
    },
    {
      id: "s-convert-2pi3",
      prompt: "Write $2 e^{i\\pi/3}$ in rectangular form $a + bi$.",
      choices: [
        { text: "$1 + \\sqrt{3}\\,i$", correct: true, explain: "$2e^{i\\pi/3} = 2(\\cos\\tfrac{\\pi}{3} + i\\sin\\tfrac{\\pi}{3}) = 2(\\tfrac{1}{2} + \\tfrac{\\sqrt{3}}{2}i) = 1 + \\sqrt{3}\\,i$." },
        { text: "$\\sqrt{3} + i$", explain: "That is $2e^{i\\pi/6}$ (angle $30^\\circ$). At $\\tfrac{\\pi}{3} = 60^\\circ$ the cosine is $\\tfrac{1}{2}$, giving $1 + \\sqrt{3}\\,i$." },
        { text: "$2 + 2i$", explain: "That has modulus $2\\sqrt{2}$ and angle $45^\\circ$. Here the modulus is $2$ and the angle is $60^\\circ$." },
        { text: "$1 + i$", explain: "The imaginary part is $2\\sin 60^\\circ = \\sqrt{3}$, not $1$." },
      ],
    },
    {
      id: "s-exp-vs-polar",
      prompt: "Which is the exponential form of $4\\left(\\cos\\tfrac{\\pi}{6} + i\\sin\\tfrac{\\pi}{6}\\right)$?",
      choices: [
        { text: "$4 e^{i\\pi/6}$", correct: true, explain: "Euler's formula turns $\\cos\\theta + i\\sin\\theta$ into $e^{i\\theta}$, keeping the modulus $4$." },
        { text: "$4 e^{i\\pi/3}$", explain: "The angle is $\\tfrac{\\pi}{6}$, not $\\tfrac{\\pi}{3}$. Keep the argument the same." },
        { text: "$e^{i\\pi/6}$", explain: "The modulus $4$ must stay in front: $4e^{i\\pi/6}$." },
        { text: "$4 e^{\\pi/6}$", explain: "The exponent must be imaginary: $i\\tfrac{\\pi}{6}$, not $\\tfrac{\\pi}{6}$." },
      ],
    },
    {
      id: "s-euler-neg",
      prompt: "Using Euler's formula, $e^{-i\\theta}$ equals:",
      choices: [
        { text: "$\\cos\\theta - i\\sin\\theta$", correct: true, explain: "Replace $\\theta$ with $-\\theta$: $\\cos(-\\theta) = \\cos\\theta$ and $\\sin(-\\theta) = -\\sin\\theta$, giving $\\cos\\theta - i\\sin\\theta$." },
        { text: "$\\cos\\theta + i\\sin\\theta$", explain: "That is $e^{+i\\theta}$. The negative exponent flips the sign of the sine." },
        { text: "$-\\cos\\theta - i\\sin\\theta$", explain: "Cosine is even, so $\\cos(-\\theta) = +\\cos\\theta$. Only the sine flips sign." },
        { text: "$-\\cos\\theta + i\\sin\\theta$", explain: "The real part stays $+\\cos\\theta$, and the imaginary part becomes $-i\\sin\\theta$." },
      ],
    },
    {
      id: "s-why-power",
      prompt: "Why does raising $re^{i\\theta}$ to the power $n$ multiply the argument by $n$?",
      choices: [
        { text: "A power of a power multiplies exponents, so $\\left(e^{i\\theta}\\right)^n = e^{i n\\theta}$", correct: true, explain: "The rule $(e^{x})^n = e^{nx}$ multiplies the exponent $i\\theta$ by $n$, turning the argument into $n\\theta$." },
        { text: "Because the modulus is raised to the $n$ at the same time", explain: "The modulus rule is separate. The argument multiplies because the exponent multiplies." },
        { text: "Because $\\cos$ and $\\sin$ repeat every $360^\\circ$", explain: "Periodicity is not the reason. It is the exponent rule $(e^{x})^n = e^{nx}$." },
        { text: "Because angles always scale with powers", explain: "This is vague. The precise reason is $(e^{i\\theta})^n = e^{in\\theta}$." },
      ],
    },
    {
      id: "s-demoivre-from-euler",
      prompt: "Starting from $z = re^{i\\theta}$, how does De Moivre's theorem $z^n = r^n(\\cos n\\theta + i\\sin n\\theta)$ follow?",
      choices: [
        { text: "$\\left(re^{i\\theta}\\right)^n = r^n e^{in\\theta}$, then Euler's formula rewrites $e^{in\\theta}$ as $\\cos n\\theta + i\\sin n\\theta$", correct: true, explain: "Apply the exponent laws, then convert back with Euler's formula." },
        { text: "Multiply $z$ by $n$, then apply Euler's formula", explain: "A power is repeated multiplication, not multiplication by $n$. You raise to the $n$, giving $r^n e^{in\\theta}$." },
        { text: "Add $\\theta$ to itself $n$ times only, leaving $r$ alone", explain: "The argument does become $n\\theta$, but the modulus must also be raised to $r^n$." },
        { text: "Take the $n$th root of both the modulus and the argument", explain: "That is for roots, not powers. A power raises the modulus and multiplies the argument." },
      ],
    },
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
  ],
};
