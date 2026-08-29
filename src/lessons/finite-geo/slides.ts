import type { ParamSpec, Slide } from "../types";

/**
 * Finite geometric series. A geometric sequence multiplies by a fixed common
 * ratio r, so a_n = a_1 r^(n-1); the finite sum has the closed form
 * S_n = a_1 (1 - r^n) / (1 - r) for r != 1.
 *
 * Reveal flags are read literally in Stage.tsx:
 *   sequence: bars, ratio, formula
 *   derive:   e1, e2, e3, e4 (AlgebraFlow steps; first line always shown)
 *   apply:    bars, plug, simplify, total
 *   shrink:   bars, plug, simplify, total
 *   yourturn: none (bars + total always shown, driven by the n slider)
 */

const nParam: ParamSpec = {
  key: "n",
  label: "number of terms n",
  min: 1,
  max: 6,
  start: 3,
  step: 1,
  format: (v) => `n = ${Math.round(v)}`,
};

export const slides: Slide[] = [
  {
    id: "sequence",
    title: "A geometric sequence multiplies by a fixed ratio",
    mode: "sequence",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "A **geometric sequence** is a list of numbers where you get the next term by **multiplying** by the same fixed number every time. That fixed multiplier is called the **common ratio**, written $r$. This is the multiplying cousin of an arithmetic sequence: there you **add** the same amount each step (a common difference), here you **multiply** by the same amount each step.",
      },
      {
        text: "Take the sequence $2, 6, 18, 54$. To check it is geometric, divide each term by the one before it: $\\dfrac{6}{2} = 3$, $\\dfrac{18}{6} = 3$, $\\dfrac{54}{18} = 3$. The ratio is the same every time, so this is geometric with common ratio $r = 3$. Each bar on the right is one term, and it is three times as tall as the bar before it.",
        add: { bars: true },
        draw: true,
      },
      {
        text: "Here is the warning that trips people up: $r$ is a **ratio** (a division), not a **difference** (a subtraction). If you subtracted instead, $6 - 2 = 4$, you would get a different, wrong answer, and it would not even be constant ($18 - 6 = 12$). Always **divide** consecutive terms to find $r$: same quotient every time means geometric.",
        add: { ratio: true },
      },
      {
        text: "Because every step multiplies by $r$, the $n$-th term is the first term times $r$ multiplied $n - 1$ times: $a_n = a_1\\, r^{\\,n-1}$. The exponent is $n - 1$, not $n$, because $a_1$ itself has been multiplied zero times. Check the fourth term: $a_4 = 2 \\cdot 3^{\\,4-1} = 2 \\cdot 3^3 = 2 \\cdot 27 = 54$, exactly the last bar.",
        add: { formula: true },
      },
    ],
    practice:
      "To find the common ratio $r$, divide any term by the one before it. The $n$-th term is $a_n = a_1\\, r^{\\,n-1}$.",
    questions: [
      {
        kind: "choice",
        prompt: "What is the common ratio $r$ of $2, 6, 18, 54$?",
        options: ["$3$", "$4$", "$6$", "$\\tfrac{1}{3}$"],
        answer: 0,
        hint: "Divide a term by the one before it: $\\tfrac{6}{2}$.",
        success: "Right: $\\tfrac{6}{2} = \\tfrac{18}{6} = 3$, a constant ratio.",
      },
      {
        kind: "choice",
        prompt: "Using $a_n = a_1\\, r^{\\,n-1}$ with $a_1 = 2$ and $r = 3$, what is $a_4$?",
        options: ["$54$", "$162$", "$24$", "$18$"],
        answer: 0,
        hint: "The exponent is $n - 1 = 3$: compute $2 \\cdot 3^3$.",
        success: "Yes: $2 \\cdot 3^{3} = 2 \\cdot 27 = 54$.",
      },
    ],
  },
  {
    id: "derive",
    title: "A shortcut for the sum: shift and subtract",
    mode: "derive",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Adding a long geometric sequence term by term is slow, so we build a shortcut. Call the sum $S_n = a_1 + a_1 r + a_1 r^2 + \\cdots + a_1 r^{\\,n-1}$. The trick has one clever move: **multiply the whole sum by $r$**, which shifts every term up one power, then **subtract**. Watch the lines write themselves.",
      },
      {
        text: "First, multiply every term of $S_n$ by $r$. Each power goes up by one, so $r S_n = a_1 r + a_1 r^2 + \\cdots + a_1 r^{\\,n-1} + a_1 r^{\\,n}$. Notice $r S_n$ is almost the same list as $S_n$, just missing the first term $a_1$ and gaining a new last term $a_1 r^{\\,n}$.",
        add: { e1: true },
      },
      {
        text: "Now **subtract** $r S_n$ from $S_n$. Line up equal powers: the whole middle, from $a_1 r$ all the way to $a_1 r^{\\,n-1}$, appears in both sums and cancels. All that survives is the very first term of $S_n$ and the very last term of $r S_n$: $S_n - r S_n = a_1 - a_1 r^{\\,n}$.",
        add: { e2: true },
      },
      {
        text: "The left side has $S_n$ in both pieces, so factor it out: $S_n(1 - r)$. The right side has $a_1$ in both pieces, so factor that: $a_1(1 - r^{\\,n})$. That gives $S_n(1 - r) = a_1(1 - r^{\\,n})$, a single tidy equation with one unknown, $S_n$.",
        add: { e3: true },
      },
      {
        text: "Finally, divide both sides by $(1 - r)$ to isolate $S_n$: $S_n = \\dfrac{a_1(1 - r^{\\,n})}{1 - r}$. This is the finite geometric sum formula. We divided by $1 - r$, so it needs $r \\neq 1$ (if $r = 1$ every term is just $a_1$ and the sum is $n\\,a_1$). Make sure the exponent inside is $r^{\\,n}$, the number of terms, not $r^{\\,n-1}$.",
        add: { e4: true },
      },
    ],
    practice:
      "The finite geometric sum is $S_n = \\dfrac{a_1(1 - r^{\\,n})}{1 - r}$ for $r \\neq 1$. It comes from multiplying $S_n$ by $r$ and subtracting so the middle cancels.",
    questions: [
      {
        kind: "choice",
        prompt: "After multiplying by $r$ and subtracting, what does $S_n - r S_n$ equal?",
        options: [
          "$a_1 - a_1 r^{\\,n}$",
          "$a_1 - a_1 r^{\\,n-1}$",
          "$a_1 r - a_1 r^{\\,n}$",
          "$0$",
        ],
        answer: 0,
        hint: "Only the first term of $S_n$ and the last term of $r S_n$ survive.",
        success: "Right: the middle cancels, leaving $a_1 - a_1 r^{\\,n}$.",
      },
      {
        kind: "choice",
        prompt: "Solving $S_n(1 - r) = a_1(1 - r^{\\,n})$ for $S_n$ gives:",
        options: [
          "$\\dfrac{a_1(1 - r^{\\,n})}{1 - r}$",
          "$\\dfrac{a_1(1 - r)}{1 - r^{\\,n}}$",
          "$\\dfrac{a_1(1 - r^{\\,n-1})}{1 - r}$",
          "$a_1(1 - r^{\\,n})(1 - r)$",
        ],
        answer: 0,
        hint: "Divide both sides by $(1 - r)$; this needs $r \\neq 1$.",
        success: "Yes: $S_n = \\dfrac{a_1(1 - r^{\\,n})}{1 - r}$, valid for $r \\neq 1$.",
      },
    ],
  },
  {
    id: "apply",
    title: "Use the formula on 2 + 6 + 18 + 54",
    mode: "apply",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Let us add $2 + 6 + 18 + 54$ with the formula instead of by hand. First read off the three ingredients the formula needs: the first term $a_1 = 2$, the common ratio $r = 3$ (each term triples), and the number of terms $n = 4$ (there are four bars). Getting these three right is the whole job.",
        add: { bars: true },
        draw: true,
      },
      {
        text: "Substitute those into $S_n = \\dfrac{a_1(1 - r^{\\,n})}{1 - r}$. With $a_1 = 2$, $r = 3$, and $n = 4$ this becomes $S_4 = \\dfrac{2\\,(1 - 3^{4})}{1 - 3}$. Notice the exponent is $n = 4$, the number of terms, so it is $3^4$.",
        add: { plug: true },
      },
      {
        text: "Now simplify carefully. On top, $3^4 = 81$, so $1 - 81 = -80$, and the numerator is $2(-80) = -160$. On the bottom, $1 - 3 = -2$. So $S_4 = \\dfrac{-160}{-2}$. A negative divided by a negative is **positive**, which is exactly what we want for a sum of positive terms.",
        add: { simplify: true },
      },
      {
        text: "That leaves $S_4 = \\dfrac{-160}{-2} = 80$. The running-total bar underneath fills right up to $80$. As a check, add the terms directly: $2 + 6 = 8$, plus $18$ is $26$, plus $54$ is $80$. The formula and the direct sum agree.",
        add: { total: true },
      },
    ],
    practice:
      "Read off $a_1$, $r$, and $n$, then substitute into $S_n = \\dfrac{a_1(1 - r^{\\,n})}{1 - r}$. When $r > 1$ both $1 - r^{\\,n}$ and $1 - r$ are negative, and the negatives cancel.",
    questions: [
      {
        kind: "choice",
        prompt: "Evaluate $S_4 = \\dfrac{2\\,(1 - 3^{4})}{1 - 3}$ for $2 + 6 + 18 + 54$.",
        options: ["$80$", "$-80$", "$112$", "$162$"],
        answer: 0,
        hint: "Top: $2(1 - 81) = -160$. Bottom: $1 - 3 = -2$. Divide.",
        success: "Right: $\\dfrac{-160}{-2} = 80$, matching $2 + 6 + 18 + 54$.",
      },
      {
        kind: "choice",
        prompt: "Which values of $a_1$, $r$, and $n$ belong in the formula for $2 + 6 + 18 + 54$?",
        options: [
          "$a_1 = 2,\\ r = 3,\\ n = 4$",
          "$a_1 = 2,\\ r = 4,\\ n = 4$",
          "$a_1 = 2,\\ r = 3,\\ n = 3$",
          "$a_1 = 6,\\ r = 3,\\ n = 4$",
        ],
        answer: 0,
        hint: "First term, ratio (divide, do not subtract), and count the terms.",
        success: "Yes: first term $2$, ratio $\\tfrac{6}{2} = 3$, and $4$ terms.",
      },
    ],
  },
  {
    id: "shrink",
    title: "The ratio can be a fraction",
    mode: "shrink",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "The common ratio does not have to be a whole number. Take $1 + \\tfrac{1}{2} + \\tfrac{1}{4} + \\tfrac{1}{8}$: each term is **half** the one before, so $a_1 = 1$ and $r = \\tfrac{1}{2}$. Because $r$ is between $0$ and $1$, multiplying shrinks each term, and the bars get shorter left to right instead of taller.",
        add: { bars: true },
        draw: true,
      },
      {
        text: "The formula is the same one. With $a_1 = 1$, $r = \\tfrac{1}{2}$, and $n = 4$ terms, $S_4 = \\dfrac{1\\left(1 - \\left(\\tfrac{1}{2}\\right)^{4}\\right)}{1 - \\tfrac{1}{2}}$. Again the exponent is $n = 4$, so we need $\\left(\\tfrac{1}{2}\\right)^4$.",
        add: { plug: true },
      },
      {
        text: "Simplify. On top, $\\left(\\tfrac{1}{2}\\right)^4 = \\tfrac{1}{16}$, so $1 - \\tfrac{1}{16} = \\tfrac{15}{16}$. On the bottom, $1 - \\tfrac{1}{2} = \\tfrac{1}{2}$. Dividing by $\\tfrac{1}{2}$ is the same as multiplying by $2$, so $S_4 = \\tfrac{15}{16} \\cdot 2 = \\tfrac{15}{8}$. Here $r < 1$, so $1 - r$ is positive and there are no sign worries at all.",
        add: { simplify: true },
      },
      {
        text: "So $S_4 = \\tfrac{15}{8} = 1.875$. The running total fills to $1.875$. Check by hand: $1 + 0.5 + 0.25 + 0.125 = 1.875$. The bars keep shrinking, so even as you add more terms the total climbs only a little each time, but the same finite formula gives the exact sum.",
        add: { total: true },
      },
    ],
    practice:
      "The same formula $S_n = \\dfrac{a_1(1 - r^{\\,n})}{1 - r}$ works for a fractional ratio. For $0 < r < 1$ the terms shrink and $1 - r > 0$, so no sign trouble.",
    questions: [
      {
        kind: "choice",
        prompt: "What is the common ratio of $1, \\tfrac{1}{2}, \\tfrac{1}{4}, \\tfrac{1}{8}$?",
        options: ["$\\tfrac{1}{2}$", "$2$", "$-\\tfrac{1}{2}$", "$\\tfrac{1}{4}$"],
        answer: 0,
        hint: "Divide a term by the one before it: $\\tfrac{1/2}{1}$.",
        success: "Right: each term is half the last, so $r = \\tfrac{1}{2}$.",
      },
      {
        kind: "choice",
        prompt: "Evaluate $1 + \\tfrac{1}{2} + \\tfrac{1}{4} + \\tfrac{1}{8}$ with the formula.",
        options: ["$\\tfrac{15}{8}$", "$2$", "$\\tfrac{16}{15}$", "$\\tfrac{7}{8}$"],
        answer: 0,
        hint: "$\\dfrac{1 - (1/2)^4}{1 - 1/2} = \\dfrac{15/16}{1/2}$.",
        success: "Yes: $\\tfrac{15}{16} \\cdot 2 = \\tfrac{15}{8} = 1.875$.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn",
    mode: "yourturn",
    params: [nParam],
    baseReveal: {},
    beats: [
      {
        text: "Now you set the number of terms. Here $a_1 = 1$ and $r = 2$, so the terms **double**: $1, 2, 4, 8, 16, \\ldots$. Putting $a_1 = 1$ and $r = 2$ into the formula gives a clean result: $S_n = \\dfrac{1(1 - 2^{\\,n})}{1 - 2} = \\dfrac{1 - 2^{\\,n}}{-1} = 2^{\\,n} - 1$. Right now $n = 3$, so $S_3 = 2^3 - 1 = 7$, and the filling bar sits well short of the dashed target line at $31$.",
      },
      {
        text: "Each time $n$ goes up by one, another doubling bar joins the row and the running total climbs. From the formula $S_n = 2^{\\,n} - 1$: $n = 4$ gives $2^4 - 1 = 15$, and $n = 5$ gives $2^5 - 1 = 31$. That last one is the height of the dashed line.",
      },
    ],
    practice:
      "Drag $n$ and watch a new bar appear while the running total rises. Use $S_n = 2^{\\,n} - 1$ to land on the target.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Set $n$ so that $1 + 2 + 4 + \\cdots = 31$ (reach the dashed line).",
        hint: "Solve $2^{\\,n} - 1 = 31$, so $2^{\\,n} = 32$. Since $2^5 = 32$, use $n = 5$.",
        success: "Yes: $1 + 2 + 4 + 8 + 16 = 31 = 2^5 - 1$.",
        check: (_value, values) => Math.round(values.n ?? 3) === 5,
      },
      {
        kind: "choice",
        prompt: "Using $S_n = 2^{\\,n} - 1$, what is the sum for $n = 6$?",
        options: ["$63$", "$31$", "$64$", "$36$"],
        answer: 0,
        hint: "Compute $2^{6} - 1$.",
        success: "Right: $2^{6} - 1 = 64 - 1 = 63$.",
      },
    ],
  },
];
