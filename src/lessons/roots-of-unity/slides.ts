import type { ParamSpec, Slide } from "../types";

/** Integer slider for the number of roots of unity ringing the circle. */
const nParam = (start: number): ParamSpec => ({
  key: "n",
  label: "Number of roots n",
  min: 2,
  max: 6,
  start,
  step: 1,
  format: (v) => `n = ${Math.round(v)}`,
});

export const slides: Slide[] = [
  {
    id: "roots-of-unity",
    title: "Roots of unity",
    mode: "roots",
    params: [nParam(3)],
    hideSliders: true,
    baseReveal: { ring: true },
    beats: [
      {
        text: "The **$n$th roots of unity** are the complex numbers that satisfy $z^n = 1$, the numbers that give $1$ when raised to the $n$th power. Every one of them has modulus $1$, so they all lie on the **unit circle** drawn here.",
      },
      {
        text: "There are exactly $n$ of them, equally spaced around the circle, and one is always $z = 1$ at the far right. With $n = 3$, the three **cube roots of unity** sit $120^\\circ$ apart.",
        to: { n: 3 },
        add: { dots: true },
      },
      {
        text: "With $n = 4$ the four **fourth roots of unity** are $1$, $i$, $-1$ and $-i$. Consecutive roots are now only $90^\\circ$ apart, because four equal steps around $360^\\circ$ are $90^\\circ$ each.",
        to: { n: 4 },
      },
      {
        text: "Both examples fit the same pattern: the step between neighbors is $\\dfrac{360^\\circ}{n}$. We now derive that step from $z^n = 1$ by writing $1 = e^{2\\pi i k}$.",
        add: { dock: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "How many distinct 4th roots of unity are there?",
        options: ["$4$", "$2$", "$8$", "$3$"],
        answer: 0,
        hint: "The $n$th roots of unity number exactly $n$.",
        success: "Right: there are exactly four, namely $1$, $i$, $-1$ and $-i$.",
      },
      {
        kind: "choice",
        prompt: "Which complex number is one of the $n$th roots of unity for every $n$?",
        options: ["$1$", "$0$", "$i$", "$-1$"],
        answer: 0,
        hint: "Which number gives $1$ when raised to any power?",
        success: "Right: $1^n = 1$ always, so $z = 1$ is a root of unity for every $n$.",
      },
    ],
  },
  {
    id: "why-spacing",
    title: "Solve z^n = 1",
    mode: "derive",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "The $n$th roots of unity are the solutions of $z^n = 1$. Rewrite the right-hand side in exponential form so the exponent laws from De Moivre apply.",
      },
      {
        text: "Euler's formula gives $e^{2\\pi i} = \\cos 2\\pi + i\\sin 2\\pi = 1$. Each extra integer $k$ is another full turn, still the same point, so $1 = e^{2\\pi i k}$ for any integer $k$. The equation is therefore $z^n = e^{2\\pi i k}$.",
        add: { s1: true },
      },
      {
        text: "Every root of unity has modulus $1$, so it can be written $z = e^{i\\theta}$. De Moivre's theorem then says $z^n = e^{i n \\theta}$. Setting that equal to $1$ produces $e^{i n \\theta} = e^{2\\pi i k}$.",
        add: { s2: true },
      },
      {
        text: "Two points on the unit circle are the same when their arguments differ by a multiple of $2\\pi$. The integer $k$ already counts every full turn, so matching the exponents gives the single equation $n\\theta = 2\\pi k$.",
        add: { s3: true },
      },
      {
        text: "Divide both sides by $n$. The argument of each root is $\\theta = \\dfrac{2\\pi k}{n}$ radians.",
        add: { s4: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Why can we write $1 = e^{2\\pi i k}$ for any integer $k$?",
        options: [
          "Because $e^{2\\pi i} = 1$ and each extra integer $k$ is another full turn, still the same point",
          "Because $k$ has to be smaller than $n$",
          "Because the modulus of $1$ equals $k$",
          "Because Euler's formula only holds when $k = 0$",
        ],
        answer: 0,
        hint: "Evaluate $e^{2\\pi i}$ with Euler's formula, then raise that value to the integer $k$.",
        success: "Right: $e^{2\\pi i} = 1$, so $e^{2\\pi i k} = 1^k = 1$. Extra full turns do not move the point.",
      },
      {
        kind: "choice",
        prompt: "If $z = e^{i\\theta}$ and $z^n = e^{2\\pi i k}$, what is $\\theta$?",
        options: [
          "$\\theta = \\dfrac{2\\pi k}{n}$",
          "$\\theta = \\dfrac{2\\pi n}{k}$",
          "$\\theta = 2\\pi n k$",
          "$\\theta = \\dfrac{n}{2\\pi k}$",
        ],
        answer: 0,
        hint: "De Moivre gives $z^n = e^{i n \\theta}$. Match that exponent with $2\\pi k$, then divide by $n$.",
        success: "Right: $e^{i n \\theta} = e^{2\\pi i k}$ forces $n\\theta = 2\\pi k$, so $\\theta = \\dfrac{2\\pi k}{n}$.",
      },
    ],
  },
  {
    id: "why-degrees",
    title: "Why the step is 360/n",
    mode: "degrees",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "So far, $\\theta = \\dfrac{2\\pi k}{n}$ in radians. Convert to degrees using the bridge $2\\pi$ radians $= 360^\\circ$, which means multiply by $\\dfrac{360^\\circ}{2\\pi}$.",
      },
      {
        text: "Write the product first, without cancelling: $\\theta = \\dfrac{2\\pi k}{n} \\cdot \\dfrac{360^\\circ}{2\\pi}$.",
        add: { d1: true },
      },
      {
        text: "The $2\\pi$ in the numerator cancels the $2\\pi$ in the denominator, leaving $\\theta = \\dfrac{360^\\circ k}{n}$. That is the argument of the $k$th root of unity, now in degrees.",
        add: { d2: true },
      },
      {
        text: "Consecutive integers $k$ and $k+1$ therefore differ by $\\dfrac{360^\\circ}{n}$. That is why the $n$ roots sit equally spaced around the unit circle.",
        add: { d3: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "After converting $\\theta = \\dfrac{2\\pi k}{n}$ from radians to degrees, the argument of the $k$th root is",
        options: [
          "$\\dfrac{360^\\circ k}{n}$",
          "$\\dfrac{2\\pi k}{n}$ degrees",
          "$360^\\circ n k$",
          "$\\dfrac{n}{360^\\circ k}$",
        ],
        answer: 0,
        hint: "Multiply by $\\dfrac{360^\\circ}{2\\pi}$ and cancel the $2\\pi$.",
        success: "Right: $\\dfrac{2\\pi k}{n} \\cdot \\dfrac{360^\\circ}{2\\pi} = \\dfrac{360^\\circ k}{n}$.",
      },
      {
        kind: "choice",
        prompt: "The 6th roots of unity are spaced how many degrees apart?",
        options: ["$60^\\circ$", "$6^\\circ$", "$72^\\circ$", "$30^\\circ$"],
        answer: 0,
        hint: "Adjacent integers $k$ differ by $\\dfrac{360^\\circ}{n}$ with $n = 6$.",
        success: "Yes: $\\dfrac{360^\\circ}{6} = 60^\\circ$ between neighbors.",
      },
    ],
  },
  {
    id: "roots-formula",
    title: "Why exactly n roots",
    mode: "roots",
    params: [nParam(3)],
    hideSliders: true,
    baseReveal: { ring: true, dots: true, dock: true },
    beats: [
      {
        text: "Euler's formula turns $\\theta = \\dfrac{360^\\circ k}{n}$ back into a point on the circle. The **roots of unity formula** is $$z_k = \\cos\\dfrac{360^\\circ k}{n} + i\\sin\\dfrac{360^\\circ k}{n}$$ Here $k$ runs through $0, 1, \\dots, n-1$. For $n = 3$: $z_0 = 1$, then $z_1 = \\cos 120^\\circ + i\\sin 120^\\circ$, then $z_2 = \\cos 240^\\circ + i\\sin 240^\\circ$.",
      },
      {
        text: "Why stop at $k = n - 1$? Because $k = n$ gives argument $\\dfrac{360^\\circ n}{n} = 360^\\circ$, a full turn that lands right back on $z_0 = 1$. After that the roots just repeat, so there are exactly $n$ distinct ones.",
      },
      {
        text: "The same evenly spaced idea finds the $n$th roots of **any** number $w = s(\\cos p + i\\sin p)$: $$\\begin{aligned} z_k = s^{1/n}\\Big[ &\\cos\\tfrac{p + 360^\\circ k}{n} \\\\ &{}+ i\\sin\\tfrac{p + 360^\\circ k}{n} \\Big] \\end{aligned}$$ The modulus is the real $n$th root $s^{1/n}$, and the $+\\,360^\\circ k$ spreads the arguments evenly. Roots of unity are just the case $w = 1$.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Why are there exactly $n$ distinct $n$th roots of unity, not more?",
        options: [
          "$k = n$ adds a full $360^\\circ$, returning to $z_0$, so the roots repeat after $n$ of them",
          "The modulus grows past $1$ once $k = n$, leaving the unit circle",
          "Only $n$ angles are smaller than $90^\\circ$",
          "The number $1$ has exactly $n$ digits",
        ],
        answer: 0,
        hint: "Compare the angle at $k = n$ to the angle at $k = 0$.",
        success: "Right: at $k = n$ the angle is $360^\\circ$, identical to $k = 0$, so no new roots appear.",
      },
      {
        kind: "choice",
        prompt: "In $z_k = \\cos\\dfrac{360^\\circ k}{n} + i\\sin\\dfrac{360^\\circ k}{n}$, which root is $z_0$?",
        options: ["$1$", "$i$", "$-1$", "$0$"],
        answer: 0,
        hint: "Put $k = 0$, so the angle is $0^\\circ$.",
        success: "Right: $\\cos 0^\\circ + i\\sin 0^\\circ = 1$, the anchor every list of roots starts from.",
      },
      {
        kind: "choice",
        prompt: "A student lists only $z_0 = 1$ as a cube root of unity. What did they forget?",
        options: [
          "The roots $k = 1$ and $k = 2$, at $120^\\circ$ and $240^\\circ$",
          "Nothing, $1$ is the only cube root of unity",
          "To cube the modulus of $1$",
          "The root at $90^\\circ$",
        ],
        answer: 0,
        hint: "An $n$th root problem has $n$ answers. Here $n = 3$.",
        success: "Right: the $+360^\\circ k$ terms give two more roots, at $120^\\circ$ and $240^\\circ$.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn",
    mode: "roots",
    params: [nParam(2)],
    baseReveal: { ring: true, dots: true, dock: true },
    beats: [
      {
        text: "Now the count $n$ is the variable. At $n = 2$ there are just two roots of unity, $1$ and $-1$, half a turn apart.",
      },
      {
        text: "As $n$ climbs to $6$, the roots increase in number and spread into a regular hexagon, each $60^\\circ$ from the next.",
        to: { n: 6 },
        ms: 2400,
      },
      {
        text: "Settling back at $n = 3$ shows the three cube roots of unity again, $120^\\circ$ apart, with $1$ anchored on the right.",
        to: { n: 3 },
        ms: 1800,
      },
    ],
    practice: "Drag the $n$ slider to change how many roots ring the circle.",
    questions: [
      {
        kind: "plot",
        prompt: "The three cube roots of unity are on the circle now ($n = 3$). Click either cube root that is **not** the point at $1$.",
        target: { x: -0.5, y: 0.8660254 },
        targets: [
          { x: -0.5, y: 0.8660254 },
          { x: -0.5, y: -0.8660254 },
        ],
        tolerance: 0.35,
        label: "cis 120\u00b0",
        hint: "The cube roots are $120^\\circ$ apart, and $1$ sits on the right. The other two are up-and-left and down-and-left.",
        success: "Yes: $\\cos 120^\\circ + i\\sin 120^\\circ = -\\tfrac{1}{2} + \\tfrac{\\sqrt{3}}{2}i$ and its mirror below are the other two cube roots of unity.",
      },
      {
        kind: "manipulate",
        prompt: "Now set $n$ so the roots of unity are exactly $1$, $i$, $-1$, and $-i$.",
        hint: "Those four point straight along the axes, $90^\\circ$ apart, and $\\dfrac{360^\\circ}{n} = 90^\\circ$ means $n = 4$.",
        success: "Right: at $n = 4$ the fourth roots of unity are $1$, $i$, $-1$ and $-i$, one along each axis direction.",
        check: (_value, values) => Math.round(values.n ?? 0) === 4,
      },
    ],
  },
];
