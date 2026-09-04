import type { Slide } from "../types";

export const slides: Slide[] = [
  {
    id: "exponential-form",
    title: "What is Euler's formula?",
    mode: "euler",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "**Euler's formula** says $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$, so the point at angle $\\theta$ on the unit circle can be written as a single exponential. Multiplying by a length $r$ then gives $z = r e^{i\\theta}$.",
      },
      {
        text: "Multiplying that point by a positive number $r$ stretches it to distance $r$ from the origin. This gives the **exponential form** of a complex number, $$z = r e^{i\\theta}$$ where $r = |z|$ is the **modulus** and $\\theta = \\arg z$ is the **argument**, the same two numbers polar form uses.",
        add: { scaled: true },
      },
      {
        text: "The horizontal leg is the real part $r\\cos\\theta$ and the vertical leg is the imaginary part $r\\sin\\theta$, so $r e^{i\\theta}$ and $r(\\cos\\theta + i\\sin\\theta)$ name the same point. The exponential form is just a shorter way to write the polar form.",
        add: { legs: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "In the exponential form $z = re^{i\\theta}$, what does $r$ stand for?",
        options: [
          "The modulus $|z|$, the distance from the origin",
          "The argument, the angle from the positive real axis",
          "The real part $\\cos\\theta$",
          "The imaginary part $\\sin\\theta$",
        ],
        answer: 0,
        hint: "It multiplies the unit-circle point $e^{i\\theta}$, stretching it away from the origin.",
        success: "Right: $r = |z|$ is the modulus, and $\\theta$ is the argument.",
      },
      {
        kind: "choice",
        prompt: "Euler's formula says $e^{i\\theta}$ equals:",
        options: [
          "$\\cos\\theta + i\\sin\\theta$",
          "$\\sin\\theta + i\\cos\\theta$",
          "$\\cos\\theta - i\\sin\\theta$",
          "$\\theta + i$",
        ],
        answer: 0,
        hint: "The real part is the cosine and the imaginary part is the sine.",
        success: "Yes: $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$, the point at angle $\\theta$ on the unit circle.",
      },
    ],
  },
  {
    id: "multiplying-adds-arguments",
    title: "Why multiplying adds the arguments",
    mode: "multiply",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "The exponential form explains **why** multiplying complex numbers multiplies the moduli and adds the arguments. Write two numbers as $z_1 = r_1 e^{i\\theta_1}$ and $z_2 = r_2 e^{i\\theta_2}$.",
      },
      {
        text: "Gather the real moduli in front and the two exponentials together.",
        add: { s1: true },
      },
      {
        text: "Exponentials with the same base combine by the rule $e^{a} e^{b} = e^{a+b}$, so the exponents $i\\theta_1$ and $i\\theta_2$ add. The moduli multiply to $r_1 r_2$ and the arguments add to $\\theta_1 + \\theta_2$, exactly the rule polar form stated without proof.",
        add: { s2: true },
      },
      {
        text: "A power is repeated multiplication, so raising $z = r e^{i\\theta}$ to the $n$ multiplies the single exponent $i\\theta$ by $n$.",
        add: { s3: true },
      },
      {
        text: "That leaves $z^n = r^n e^{i n\\theta}$, which is **De Moivre's theorem** in exponential form: the modulus is raised to the $n$ and the argument is multiplied by $n$.",
        add: { s4: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Using exponential form, $\\left(r_1 e^{i\\theta_1}\\right)\\left(r_2 e^{i\\theta_2}\\right)$ equals:",
        options: [
          "$r_1 r_2 \\, e^{i(\\theta_1 + \\theta_2)}$",
          "$r_1 r_2 \\, e^{i\\theta_1 \\theta_2}$",
          "$(r_1 + r_2)\\, e^{i(\\theta_1 + \\theta_2)}$",
          "$r_1 r_2 \\, e^{i(\\theta_1 - \\theta_2)}$",
        ],
        answer: 0,
        hint: "Multiply the moduli, and add the exponents because $e^{a}e^{b} = e^{a+b}$.",
        success: "Right: the moduli multiply to $r_1 r_2$ and the arguments add to $\\theta_1 + \\theta_2$.",
      },
      {
        kind: "choice",
        prompt: "Why do the arguments **add** when you multiply two complex numbers?",
        options: [
          "Because exponents add: $e^{i\\theta_1} e^{i\\theta_2} = e^{i(\\theta_1 + \\theta_2)}$",
          "Because angles are always added in geometry",
          "Because the moduli multiply at the same time",
          "Because $\\cos$ and $\\sin$ are periodic",
        ],
        answer: 0,
        hint: "Write each factor as a power of $e$ and use the exponent law.",
        success: "Yes: the arguments are in the exponents, and multiplying powers of $e$ adds those exponents.",
      },
    ],
  },
  {
    id: "powers",
    title: "De Moivre's theorem for powers",
    mode: "power",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Put $z$ in polar form first: $z = r(\\cos t + i\\sin t)$, where $r = |z|$ is the modulus and $t = \\arg z$ is the argument.",
      },
      {
        text: "The core fact is that multiplying two complex numbers **multiplies their moduli and adds their arguments**. Multiplying $z$ by itself makes the modulus $r^2$ while the argument becomes $t + t = 2t$.",
      },
      {
        text: "Do that $n$ times and you get **De Moivre's theorem**: $$[r(\\cos t + i\\sin t)]^n = r^n(\\cos nt + i\\sin nt)$$ The modulus is **raised to the power $n$**, and the argument is **multiplied by $n$**. Make sure to raise $r$, not just leave it alone and not just multiply it by $n$.",
        add: { s1: true },
      },
      {
        text: "Take the concrete power $(\\cos 30^\\circ + i\\sin 30^\\circ)^3$. Here $r = 1$, $t = 30^\\circ$, and $n = 3$.",
        add: { s2: true },
      },
      {
        text: "Raise the modulus to $1^3 = 1$ and multiply the angle to $3 \\cdot 30^\\circ = 90^\\circ$. That leaves $\\cos 90^\\circ + i\\sin 90^\\circ$.",
        add: { s3: true },
      },
      {
        text: "Finally $\\cos 90^\\circ = 0$ and $\\sin 90^\\circ = 1$, so the entire power reduces to $i$.",
        add: { s4: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "In $[r(\\cos t + i\\sin t)]^n$, what happens to the modulus $r$ and the argument $t$?",
        options: [
          "$r$ becomes $r^n$, and $t$ becomes $nt$",
          "$r$ becomes $nr$, and $t$ becomes $nt$",
          "$r$ stays $r$, and $t$ becomes $nt$",
          "$r$ becomes $r^n$, and $t$ stays $t$",
        ],
        answer: 0,
        hint: "The power hits the modulus as an exponent and hits the argument as a multiplier.",
        success: "Right: raise the modulus to the $n$ ($r^n$) and multiply the argument by $n$ ($nt$).",
      },
      {
        kind: "choice",
        prompt: "Use De Moivre on $(1 + i)^2$. Since $1 + i = \\sqrt{2}(\\cos 45^\\circ + i\\sin 45^\\circ)$, the square is:",
        options: [
          "$2(\\cos 90^\\circ + i\\sin 90^\\circ) = 2i$",
          "$\\sqrt{2}(\\cos 90^\\circ + i\\sin 90^\\circ) = \\sqrt{2}\\,i$",
          "$2\\sqrt{2}(\\cos 90^\\circ + i\\sin 90^\\circ) = 2\\sqrt{2}\\,i$",
          "$2(\\cos 45^\\circ + i\\sin 45^\\circ) = \\sqrt{2} + \\sqrt{2}\\,i$",
        ],
        answer: 0,
        hint: "Square the modulus $(\\sqrt{2})^2 = 2$ and double the angle $2 \\cdot 45^\\circ = 90^\\circ$.",
        success: "Yes: $(\\sqrt{2})^2 = 2$ and $2 \\cdot 45^\\circ = 90^\\circ$, so the square is $2i$. Check directly: $(1+i)^2 = 1 + 2i + i^2 = 2i$.",
      },
      {
        kind: "choice",
        prompt: "What is the modulus of $(\\cos t + i\\sin t)^5$?",
        options: ["$1$", "$5$", "$5t$", "$t$"],
        answer: 0,
        hint: "The modulus here is $r = 1$, and De Moivre raises it to the power $5$.",
        success: "Right: $1^5 = 1$. Any power of $\\cos t + i\\sin t$ stays on the unit circle.",
      },
    ],
  },
  {
    id: "angle-sum-formulas",
    title: "From De Moivre to the sum formulas",
    mode: "anglesum",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Euler's formula makes $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$, so start from the fact that arguments add: $e^{i(\\alpha+\\beta)} = e^{i\\alpha}e^{i\\beta}$.",
      },
      {
        text: "Rewrite the left side with Euler's formula, using the angle $\\alpha+\\beta$.",
        add: { s1: true },
      },
      {
        text: "Rewrite the right side the same way, one factor for each angle. The product becomes two binomials.",
        add: { s2: true },
      },
      {
        text: "Multiply the two binomials with FOIL, keeping $i$ as a symbol for now. All four products appear.",
        add: { s3: true },
      },
      {
        text: "Because $i^2 = -1$, the last product becomes $-\\sin\\alpha\\sin\\beta$. Separate the two terms with no $i$ (the real part) from the two terms with a single $i$ (the imaginary part).",
        add: { s4: true },
      },
      {
        text: "Two complex numbers are equal only when their real parts agree and their imaginary parts agree. Matching the real parts gives the **cosine sum formula**, and matching the imaginary parts gives the **sine sum formula**, both from one multiplication.",
        add: { s5: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Taking the **real part** of $(\\cos\\alpha + i\\sin\\alpha)(\\cos\\beta + i\\sin\\beta)$ gives which identity?",
        options: [
          "$\\cos(\\alpha+\\beta) = \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta$",
          "$\\cos(\\alpha+\\beta) = \\cos\\alpha\\cos\\beta + \\sin\\alpha\\sin\\beta$",
          "$\\cos(\\alpha+\\beta) = \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta$",
          "$\\cos(\\alpha+\\beta) = \\cos\\alpha\\cos\\beta - \\sin\\alpha\\cos\\beta$",
        ],
        answer: 0,
        hint: "The real terms are $\\cos\\alpha\\cos\\beta$ and the $i^2$ term, which becomes $-\\sin\\alpha\\sin\\beta$.",
        success: "Right: the two real terms are $\\cos\\alpha\\cos\\beta$ and $i^2\\sin\\alpha\\sin\\beta = -\\sin\\alpha\\sin\\beta$.",
      },
      {
        kind: "choice",
        prompt: "In the FOIL expansion, why does $i^2\\sin\\alpha\\sin\\beta$ turn into $-\\sin\\alpha\\sin\\beta$?",
        options: [
          "Because $i^2 = -1$",
          "Because sine is negative for large angles",
          "Because it is the imaginary part",
          "Because FOIL always flips the last sign",
        ],
        answer: 0,
        hint: "Replace $i^2$ with its value.",
        success: "Right: $i^2 = -1$, so $i^2\\sin\\alpha\\sin\\beta = -\\sin\\alpha\\sin\\beta$, which lands in the real part.",
      },
    ],
  },
];
