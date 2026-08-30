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
    id: "powers",
    title: "De Moivre's theorem: powers",
    mode: "power",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "To raise a complex number to a power, put it in **polar form** first: $z = r(\\cos t + i\\sin t)$, where $r = |z|$ is the **modulus** and $t = \\arg z$ is the **argument**. (A compact shorthand is $\\operatorname{cis} t = \\cos t + i\\sin t$, read cosine i sine.)",
      },
      {
        text: "The core fact is that multiplying two complex numbers **multiplies their moduli and adds their arguments**. Multiplying $z$ by itself makes the modulus $r^2$ while the argument becomes $t + t = 2t$.",
      },
      {
        text: "Do that $n$ times and you get **De Moivre's theorem**: $$[r(\\cos t + i\\sin t)]^n = r^n(\\cos nt + i\\sin nt)$$ The modulus is **raised to the power $n$**, and the argument is **multiplied by $n$**. Make sure to raise $r$, not just leave it alone and not just multiply it by $n$.",
        add: { s1: true },
      },
      {
        text: "Work a clean case: $(\\cos 30^\\circ + i\\sin 30^\\circ)^3$. Here $r = 1$, $t = 30^\\circ$, and $n = 3$.",
        add: { s2: true },
      },
      {
        text: "Raise the modulus, $1^3 = 1$, and multiply the angle, $3 \\cdot 30^\\circ = 90^\\circ$. That leaves $\\cos 90^\\circ + i\\sin 90^\\circ$.",
        add: { s3: true },
      },
      {
        text: "Finally $\\cos 90^\\circ = 0$ and $\\sin 90^\\circ = 1$, so the entire power reduces to $i$. A complicated looking power collapses to a single point.",
        add: { s4: true },
      },
    ],
    practice: "Remember the two moves: raise the modulus to the power $n$, and multiply the argument by $n$.",
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
    id: "roots-of-unity",
    title: "Roots of unity",
    mode: "roots",
    params: [nParam(3)],
    hideSliders: true,
    baseReveal: { ring: true },
    beats: [
      {
        text: "Now go the other way. The **$n$th roots of unity** are the complex numbers that satisfy $z^n = 1$, the numbers that give $1$ when raised to the $n$th power. Every one of them has modulus $1$, so they all lie on the **unit circle** drawn here.",
      },
      {
        text: "There are exactly $n$ of them, equally spaced around the circle, and one is always $z = 1$ at the far right. With $n = 3$, the three **cube roots of unity** sit $120^\\circ$ apart.",
        to: { n: 3 },
        add: { dots: true },
      },
      {
        text: "With $n = 4$ the four **fourth roots of unity** are $1$, $i$, $-1$ and $-i$. Consecutive roots are now only $90^\\circ$ apart, because more roots divide the circle into smaller equal steps.",
        to: { n: 4 },
      },
      {
        text: "That step between neighbors is always $\\dfrac{360^\\circ}{n}$: one full turn shared equally among the $n$ roots.",
        add: { dock: true },
      },
    ],
    practice: "Count the roots, and read the spacing as $\\dfrac{360^\\circ}{n}$.",
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
        prompt: "The 6th roots of unity are spaced how many degrees apart?",
        options: ["$60^\\circ$", "$6^\\circ$", "$72^\\circ$", "$30^\\circ$"],
        answer: 0,
        hint: "Spacing is $\\dfrac{360^\\circ}{n}$ with $n = 6$.",
        success: "Yes: $\\dfrac{360^\\circ}{6} = 60^\\circ$ between neighbors.",
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
    id: "roots-formula",
    title: "Why exactly n roots",
    mode: "roots",
    params: [nParam(3)],
    hideSliders: true,
    baseReveal: { ring: true, dots: true, dock: true },
    beats: [
      {
        text: "Where do the angles come from? Start at $1 = \\cos 0^\\circ + i\\sin 0^\\circ$ and split the full circle into $n$ equal turns. The $k$th root has argument $\\dfrac{360^\\circ k}{n}$.",
      },
      {
        text: "So the **roots of unity formula** is $$z_k = \\cos\\dfrac{360^\\circ k}{n} + i\\sin\\dfrac{360^\\circ k}{n}$$ Here $k$ runs through $0, 1, \\dots, n-1$. For $n = 3$: $z_0 = 1$, then $z_1 = \\cos 120^\\circ + i\\sin 120^\\circ$, then $z_2 = \\cos 240^\\circ + i\\sin 240^\\circ$.",
      },
      {
        text: "Why stop at $k = n - 1$? Because $k = n$ gives argument $\\dfrac{360^\\circ n}{n} = 360^\\circ$, a full turn that lands right back on $z_0 = 1$. After that the roots just repeat, so there are exactly $n$ distinct ones.",
      },
      {
        text: "The same evenly spaced idea finds the $n$th roots of **any** number $w = s(\\cos p + i\\sin p)$: $$z_k = s^{1/n}\\left[\\cos\\dfrac{p + 360^\\circ k}{n} + i\\sin\\dfrac{p + 360^\\circ k}{n}\\right]$$ The modulus is the real $n$th root $s^{1/n}$, and the $+\\,360^\\circ k$ spreads the arguments evenly. Roots of unity are just the case $w = 1$.",
      },
    ],
    practice: "Read each root's angle as $\\dfrac{360^\\circ k}{n}$, and remember that $k = n$ repeats $k = 0$.",
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
        text: "As $n$ climbs to $6$, the roots multiply and spread into a regular hexagon, each $60^\\circ$ from the next.",
        to: { n: 6 },
        ms: 2400,
      },
      {
        text: "Settling back at $n = 3$ shows the three cube roots of unity again, $120^\\circ$ apart, with $1$ anchored on the right.",
        to: { n: 3 },
        ms: 1800,
      },
    ],
    practice: "Drag the $n$ slider to change how many roots ring the circle, then answer below.",
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
