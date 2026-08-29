import type { ParamSpec, Slide } from "../types";

/**
 * Concavity and inflection points. Concave up is a cup (tangent lines below,
 * slope increasing). Concave down is a cap (tangent lines above, slope
 * decreasing). An inflection point is where the two switch. The running
 * examples are x^2 (concave up), -x^2 (concave down), x^3 (switches at 0), and
 * sqrt(x) (increasing yet concave down, to break the "up means up" trap).
 *
 * Reveal flags are read literally in Stage.tsx:
 *   updown:      cup, cupTan, cap, capTan
 *   slopes:      curve, t1, t2, t3
 *   inflection:  curve, left, right, infl
 *   independent: root, rootTan, para, paraTan
 *   yourturn:    curve (the point, f'' readout, and concavity word follow x)
 */

const xParam: ParamSpec = {
  key: "x",
  label: "point x",
  min: -18,
  max: 18,
  start: -15,
  step: 1,
  // Slider value v in [-18, 18] stands for x = v / 10, so x runs -1.8 to 1.8,
  // which keeps the point on the cubic inside the visible plane (|y| <= 5.83).
  format: (v) => `x = ${(Math.round(v) / 10).toFixed(1)}`,
};

export const slides: Slide[] = [
  {
    id: "updown",
    title: "Concave up and concave down",
    mode: "updown",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Concavity answers one question about a curve: which way does it bend? There are two answers. The first is **concave up**. Picture a cup or a valley that could hold water. The graph of $f(x) = x^2$ is the classic example: it curves upward on both sides, like the inside of a bowl.",
        add: { cup: true },
        draw: true,
      },
      {
        text: "Here is the precise test. A **tangent line** is a straight line that just touches the curve at a single point and matches its steepness there, without cutting across. Two tangent lines appear now, one on each arm. For a concave up curve, every tangent line lies **below** the curve: the bowl always sits above its tangents.",
        add: { cupTan: true },
      },
      {
        text: "Now the opposite bend, **concave down**. Picture a cap, a hill, or a frown that would spill water instead of holding it. The graph of $f(x) = -x^2$ is the mirror image of the cup: it curves downward on both sides.",
        add: { cap: true },
      },
      {
        text: "Run the same tangent test on the cap. This time every tangent line lies **above** the curve: the hill tucks underneath each of its tangents. So the rule is short: concave up is a cup with its tangents below, concave down is a cap with its tangents above.",
        add: { capTan: true },
      },
    ],
    practice:
      "Concave up bends like a cup (tangent lines lie below the curve). Concave down bends like a cap (tangent lines lie above). $f(x) = x^2$ is concave up, $f(x) = -x^2$ is concave down.",
    questions: [
      {
        kind: "choice",
        prompt: "A curve is **concave up** when it bends like:",
        options: [
          "a cup, and every tangent line lies below it",
          "a cap, and every tangent line lies above it",
          "a straight ramp with no bend at all",
          "a cup, and every tangent line lies above it",
        ],
        answer: 0,
        hint: "Concave up holds water like a cup. The bowl sits above its tangents.",
        success: "Right: concave up is a cup, with the tangent lines below the curve.",
      },
      {
        kind: "choice",
        prompt: "For a curve that is **concave down** (a cap), the tangent lines:",
        options: [
          "lie below the curve",
          "lie above the curve",
          "are always vertical",
          "never touch the curve",
        ],
        answer: 1,
        hint: "A cap tucks underneath each of its tangents.",
        success: "Yes: for concave down, every tangent line lies above the curve.",
      },
    ],
  },
  {
    id: "slopes",
    title: "Concave up means slopes increasing",
    mode: "slopes",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Let us read concave up a second way, through the **slope** of the tangent line (its steepness). Here is the cup $f(x) = x^2$ again. We will read the tangent slope at three inputs, moving left to right: first $x = -1.5$, then $x = 0$, then $x = 1.5$.",
        add: { curve: true },
        draw: true,
      },
      {
        text: "At $x = -1.5$, on the left arm, the curve is falling steeply, so its tangent points downhill. Its slope is $-3$. (For $y = x^2$ the tangent at $x = a$ has slope $2a$, and $2(-1.5) = -3$.) A negative slope means the tangent tilts downhill.",
        add: { t1: true },
      },
      {
        text: "At $x = 0$, the very bottom of the cup, the tangent is perfectly flat, so its slope is $0$. Notice we have already climbed from a slope of $-3$ up to a slope of $0$.",
        add: { t2: true },
      },
      {
        text: "At $x = 1.5$, on the right arm, the curve climbs steeply and the tangent points uphill with slope $+3$. Line the three slopes up in order: $-3$, then $0$, then $+3$. They are **increasing**. That is the deeper meaning of concave up: as $x$ moves right, the tangent slope keeps increasing.",
        add: { t3: true },
      },
    ],
    practice:
      "On a concave up curve the tangent slope increases from left to right. For $f(x) = x^2$ the slopes at $x = -1.5, 0, 1.5$ are $-3, 0, 3$, which climb.",
    questions: [
      {
        kind: "choice",
        prompt: "On a curve that is concave up, as $x$ increases the tangent slope:",
        options: [
          "increases",
          "decreases",
          "stays constant",
          "is always zero",
        ],
        answer: 0,
        hint: "Look at the three slopes in order: $-3$, then $0$, then $+3$.",
        success: "Right: concave up means the tangent slope is increasing left to right.",
      },
      {
        kind: "choice",
        prompt: "For $y = x^2$, the tangent slopes at $x = -1.5,\\ 0,\\ 1.5$ are:",
        options: [
          "$3,\\ 0,\\ -3$ (decreasing)",
          "$-3,\\ 0,\\ 3$ (increasing)",
          "$0,\\ 0,\\ 0$ (all flat)",
          "$-1.5,\\ 0,\\ 1.5$",
        ],
        answer: 1,
        hint: "The tangent to $x^2$ at $x = a$ has slope $2a$, so use $2a$ at each input.",
        success: "Yes: $2a$ gives $-3, 0, 3$, an increasing list, the mark of concave up.",
      },
    ],
  },
  {
    id: "inflection",
    title: "Inflection points: where concavity switches",
    mode: "inflection",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Many curves are concave up in one place and concave down in another. Meet $f(x) = x^3$. Through the middle it looks nearly flat, then it sweeps downward on the left and upward on the right. Let us split it at $x = 0$ and check each side on its own.",
        add: { curve: true },
        draw: true,
      },
      {
        text: "Take the left side first, $x < 0$ (the third quadrant, where both $x$ and $y$ are negative). Trace it from left to right: the curve bends like a cap, tucking downward. On the left, $x^3$ is **concave down**.",
        add: { left: true },
      },
      {
        text: "Now the right side, $x > 0$. Trace that arm and the bend flips: it curves like a cup, opening upward. On the right, $x^3$ is **concave up**. The single curve is concave down on one side and concave up on the other.",
        add: { right: true },
      },
      {
        text: "The one point where the concavity switches, here from down to up, is called an **inflection point**. For $x^3$ it sits exactly at the origin, $(0, 0)$, marked now. A calculus shortcut worth knowing: a quantity called the **second derivative**, written $f''(x)$, is positive where a curve is concave up and negative where it is concave down. For $x^3$ it works out to $f''(x) = 6x$, which is negative for $x < 0$, positive for $x > 0$, and $0$ right at $x = 0$, confirming the switch. We will keep reasoning mostly from the picture.",
        add: { infl: true },
      },
    ],
    practice:
      "An inflection point is where concavity changes. $f(x) = x^3$ is concave down for $x < 0$ and concave up for $x > 0$, so it has an inflection point at $(0, 0)$, where $f''(x) = 6x$ changes sign.",
    questions: [
      {
        kind: "choice",
        prompt: "For $f(x) = x^3$, which side of the curve is concave up?",
        options: [
          "the right side, $x > 0$",
          "the left side, $x < 0$",
          "both sides",
          "neither side",
        ],
        answer: 0,
        hint: "Trace the right arm: it opens upward like a cup.",
        success: "Right: $x^3$ is concave up for $x > 0$ (and concave down for $x < 0$).",
      },
      {
        kind: "choice",
        prompt: "An **inflection point** is a point where:",
        options: [
          "the curve reaches its highest value",
          "the tangent slope is largest",
          "the concavity changes (up to down, or down to up)",
          "the curve crosses the $x$-axis",
        ],
        answer: 2,
        hint: "Inflection is about the bend switching direction, not the height.",
        success: "Yes: an inflection point is exactly where the concavity changes.",
      },
    ],
  },
  {
    id: "independent",
    title: "Concavity is not the same as increasing",
    mode: "independent",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Watch out for a natural but wrong assumption: that going up (increasing) and concave up mean the same thing. They do not. Here is $f(x) = \\sqrt{x}$ for $x \\ge 0$. As $x$ grows, $y$ grows, so the curve is **increasing**: it rises as we move to the right.",
        add: { root: true },
        draw: true,
      },
      {
        text: "But look at how it bends. The curve rises quickly at first, then flattens out, bending like the top of a cap: it is **concave down**. A tangent line drawn on it lies above the curve, the concave down signature. So $\\sqrt{x}$ is increasing and concave down at the same time. Increasing is about the slope being positive. Concavity is about how that slope is changing.",
        add: { rootTan: true },
      },
      {
        text: "Now the reverse pairing. Here is the left arm of $f(x) = x^2$, for $x < 0$. Moving left to right toward the origin, the height keeps dropping, so this piece is **decreasing** (its slope is negative).",
        add: { para: true },
      },
      {
        text: "Yet its bend is a cup: this piece is **concave up**, and a tangent drawn on it lies below the curve. So it is decreasing and concave up together. The takeaway: increasing versus decreasing is one property (the sign of the slope), while concave up versus concave down is a separate property (how the slope is changing). Do not conflate going up with concave up.",
        add: { paraTan: true },
      },
    ],
    practice:
      "Increasing or decreasing (the sign of the slope) is independent of concave up or down (how the slope changes). $\\sqrt{x}$ is increasing yet concave down. The left arm of $x^2$ is decreasing yet concave up.",
    questions: [
      {
        kind: "choice",
        prompt: "$f(x) = \\sqrt{x}$ (for $x > 0$) is:",
        options: [
          "increasing and concave down",
          "increasing and concave up",
          "decreasing and concave down",
          "decreasing and concave up",
        ],
        answer: 0,
        hint: "It rises (increasing) but keeps flattening, bending like a cap (concave down).",
        success: "Right: $\\sqrt{x}$ is increasing yet concave down.",
      },
      {
        kind: "choice",
        prompt: "Which statement is true?",
        options: [
          "Increasing always means concave up",
          "Concave up always means increasing",
          "Decreasing always means concave down",
          "A function can be increasing while concave down",
        ],
        answer: 3,
        hint: "Recall $\\sqrt{x}$: it rises while bending downward.",
        success: "Yes: concavity and increasing/decreasing are independent, as $\\sqrt{x}$ shows.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn",
    mode: "yourturn",
    params: [xParam],
    baseReveal: { curve: true },
    beats: [
      {
        text: "Now it is your turn to locate an inflection point. The curve is $f(x) = x^3$ once more, and a single point rides along it. The panel reports the current $x$, the value of $f''(x) = 6x$, and the concavity at that spot. The point begins on the left, at a negative $x$, where $x^3$ is concave down.",
      },
      {
        text: "Keep the plan in mind: $x^3$ is concave down where $f''(x) = 6x$ is negative (the left side), concave up where $6x$ is positive (the right side), and the inflection point is the one place where the bend switches, exactly where $f''(x) = 6x$ equals $0$.",
      },
    ],
    practice:
      "Move the point along $y = x^3$ and watch $f''(x) = 6x$: negative on the left (concave down), positive on the right (concave up). The inflection point is where it switches sign.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Move the point to the inflection point of $y = x^3$, where the concavity switches from down to up.",
        hint: "The switch is at the origin: set $x = 0$, where $f''(x) = 6x = 0$.",
        success: "Yes: at $x = 0$ the concavity switches from down to up, so $(0, 0)$ is the inflection point.",
        check: (_value, values) => Math.round(values.x ?? -15) === 0,
      },
      {
        kind: "choice",
        prompt: "As the point crosses $x = 0$ on $y = x^3$, the concavity goes from:",
        options: [
          "concave down to concave up",
          "concave up to concave down",
          "concave up and stays concave up",
          "it never changes",
        ],
        answer: 0,
        hint: "On the left ($x < 0$) it is concave down. On the right ($x > 0$) it is concave up.",
        success: "Right: $x^3$ switches from concave down to concave up at $x = 0$.",
      },
    ],
  },
];
