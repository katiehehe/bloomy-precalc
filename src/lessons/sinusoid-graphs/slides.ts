import type { ParamSpec, Slide } from "../types";

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

/** Plain-text (unicode) label for k*(pi/6), reduced, for the phase slider. */
function piFrac(k: number): string {
  if (k === 0) return "0";
  const sign = k < 0 ? "-" : "";
  const a = Math.abs(k);
  const g = gcd(a, 6);
  const p = a / g;
  const q = 6 / g;
  const num = p === 1 ? "\u03c0" : `${p}\u03c0`;
  return q === 1 ? `${sign}${num}` : `${sign}${num}/${q}`;
}

const ampParam = (start: number): ParamSpec => ({
  key: "A",
  label: "Amplitude A",
  min: 1,
  max: 5,
  start,
  step: 1,
  format: (v) => `A = ${v}`,
});

const midParam = (start: number): ParamSpec => ({
  key: "D",
  label: "Vertical shift D",
  min: -3,
  max: 3,
  start,
  step: 1,
  format: (v) => `D = ${v}`,
});

const periodParam = (start: number): ParamSpec => ({
  key: "B",
  label: "Frequency B",
  min: 1,
  max: 4,
  start,
  step: 1,
  format: (v) => `B = ${v}`,
});

const phaseParam = (start: number): ParamSpec => ({
  key: "C",
  label: "Phase shift C",
  min: -6,
  max: 6,
  start,
  step: 1,
  format: (v) => `C = ${piFrac(v)}`,
});

export const slides: Slide[] = [
  {
    id: "form",
    title: "The four constants of a sinusoid",
    mode: "intro",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "A sinusoid is any curve built from the shape of $y = \\sin x$ by four constants, written $$y = A\\sin\\!\\big(B(x - C)\\big) + D.$$ The parent curve carries the wave shape, and each constant reshapes it without changing that underlying rise and fall.",
        add: { parent: true },
        draw: true,
      },
      {
        text: "The constant $D$ raises or lowers the whole curve to a new center line called the midline, which is the horizontal line the wave oscillates around.",
        add: { mid: true },
      },
      {
        text: "The constant $A$ sets the amplitude, the distance from the midline up to a peak. An amplitude of $2$ reaches twice as far above the center as the parent wave does.",
        add: { amp: true },
      },
      {
        text: "The constant $B$ controls how quickly the wave repeats. The length of one full cycle, called the period, is $\\dfrac{2\\pi}{B}$.",
        add: { per: true },
      },
      {
        text: "The constant $C$ slides the wave left or right, a move called the phase shift. Since each constant changes one feature on its own, the next slides examine them one at a time.",
      },
    ],
    practice: "In $y = A\\sin(B(x - C)) + D$, the letter $A$ sets amplitude, $B$ sets the period through $\\dfrac{2\\pi}{B}$, $C$ sets the horizontal shift, and $D$ sets the midline.",
    questions: [
      {
        kind: "choice",
        prompt: "In $y = A\\sin\\!\\big(B(x - C)\\big) + D$, which constant sets the amplitude?",
        options: ["$A$", "$B$", "$C$", "$D$"],
        answer: 0,
        hint: "Amplitude is the height from the midline to a peak, and it is the factor multiplying the sine.",
        success: "Correct: $A$ multiplies the sine, so it scales the height of every peak and trough.",
      },
      {
        kind: "choice",
        prompt: "Which constant moves the midline up or down?",
        options: ["$D$", "$A$", "$B$", "$C$"],
        answer: 0,
        hint: "Adding a number to the whole expression raises every output by that amount.",
        success: "Correct: $D$ is added last, so it shifts the entire curve vertically to the midline $y = D$.",
      },
    ],
  },
  {
    id: "amplitude",
    title: "Amplitude: the constant A",
    mode: "amp",
    params: [ampParam(2)],
    baseReveal: {},
    beats: [
      {
        text: "On this slide only $A$ changes, with $B = 1$, $C = 0$, and $D = 0$, so the curve is $y = A\\sin x$. The amplitude is $|A|$, the distance from the midline at $y = 0$ up to each peak.",
      },
      {
        text: "Multiplying $\\sin x$ by a larger $A$ scales every output by that same factor, so the peaks climb to $A$ and the troughs drop to $-A$.",
        to: { A: 4 },
        ms: 1300,
      },
      {
        text: "A negative $A$ would keep this height but reflect the wave across the midline, turning each peak into a trough. The amplitude is the size $|A|$, so it is never negative.",
        to: { A: 2 },
        ms: 1100,
      },
    ],
    practice: "With the midline at $y = 0$, the peaks sit at $y = A$ and the troughs at $y = -A$, so the wave spans a total height of $2A$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Set $A$ so the wave peaks at a maximum of $y = 4$.",
        hint: "Since the midline is $0$, the peak height equals $A$ itself.",
        success: "With $A = 4$ the wave runs from $-4$ up to $4$, an amplitude of $4$.",
        check: (value) => value === 4,
      },
      {
        kind: "choice",
        prompt: "If $A = 3$ and the midline is $y = 0$, the minimum value of the wave is:",
        options: ["$-3$", "$3$", "$0$", "$-6$"],
        answer: 0,
        hint: "The trough sits as far below the midline as the peak sits above it.",
        success: "Correct: the trough is $-A = -3$, mirroring the peak at $+3$ across the midline.",
      },
    ],
  },
  {
    id: "midline",
    title: "Midline: the constant D",
    mode: "mid",
    params: [midParam(-1)],
    baseReveal: {},
    beats: [
      {
        text: "Now only $D$ changes, with $A = 1$, $B = 1$, and $C = 0$. Adding $D$ to $\\sin x$ raises every output by $D$, so the whole wave shifts vertically to a new midline $y = D$.",
      },
      {
        text: "The midline lies exactly halfway between the maximum and the minimum. Increasing $D$ carries the peaks, the troughs, and the midline upward together by the same amount.",
        to: { D: 2 },
        ms: 1300,
      },
      {
        text: "A negative $D$ lowers the whole curve in the same way, placing the midline below the horizontal axis.",
        to: { D: -1 },
        ms: 1100,
      },
    ],
    practice: "The midline sits at $y = D$, and because $A = 1$ here the wave still rises and falls by $1$ around it, reaching $D + 1$ at the top and $D - 1$ at the bottom.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Raise the midline to $y = 2$.",
        hint: "The midline sits at $y = D$, so choose the value of $D$ that places it at $2$.",
        success: "With $D = 2$ the wave now oscillates around the line $y = 2$.",
        check: (value) => value === 2,
      },
      {
        kind: "choice",
        prompt: "With $A = 1$ and $D = 2$, the maximum value of the wave is:",
        options: ["$3$", "$2$", "$1$", "$4$"],
        answer: 0,
        hint: "Start at the midline $D$ and rise by the amplitude $A$ to reach the peak.",
        success: "Correct: the maximum is $D + A = 2 + 1 = 3$.",
      },
    ],
  },
  {
    id: "period",
    title: "Period: the constant B",
    mode: "period",
    params: [periodParam(3)],
    baseReveal: {},
    beats: [
      {
        text: "This slide varies only $B$, which controls how fast the wave repeats, with $A = 1$, $C = 0$, and $D = 0$. One full cycle spans a horizontal length called the period, and for $y = \\sin(Bx)$ that period is $\\dfrac{2\\pi}{B}$.",
      },
      {
        text: "A larger $B$ packs more cycles into the same width, so the period shrinks. Doubling $B$ to $2$ halves the period from $2\\pi$ down to $\\pi$.",
        to: { B: 2 },
        ms: 1300,
      },
      {
        text: "The number of complete cycles between $0$ and $2\\pi$ equals $B$ itself, because each cycle now occupies a width of $\\dfrac{2\\pi}{B}$.",
        to: { B: 3 },
        ms: 1100,
      },
    ],
    practice: "The period is $\\dfrac{2\\pi}{B}$, so a larger $B$ produces a shorter period and more cycles across the same window.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Set $B$ so the period equals $\\pi$.",
        hint: "Solve $\\dfrac{2\\pi}{B} = \\pi$ for $B$.",
        success: "With $B = 2$ the period is $\\dfrac{2\\pi}{2} = \\pi$, so the wave repeats twice as fast.",
        check: (value) => value === 2,
      },
      {
        kind: "choice",
        prompt: "For $y = \\sin(4x)$, the period is:",
        options: ["$\\dfrac{\\pi}{2}$", "$8\\pi$", "$4\\pi$", "$2\\pi$"],
        answer: 0,
        hint: "The period is $\\dfrac{2\\pi}{B}$, and here $B = 4$.",
        success: "Correct: $\\dfrac{2\\pi}{4} = \\dfrac{\\pi}{2}$, so the wave completes a cycle in a quarter of the parent's width.",
      },
    ],
  },
  {
    id: "phase",
    title: "Phase shift: the constant C",
    mode: "phase",
    params: [phaseParam(0)],
    baseReveal: {},
    beats: [
      {
        text: "The final constant is $C$, the phase shift, which slides the wave horizontally, with $A = 1$, $B = 1$, and $D = 0$. Because the input is written $x - C$, a positive $C$ moves the graph to the right by $C$.",
      },
      {
        text: "Shifting right by $C$ means the point that began at $x = 0$ now sits at $x = C$, carrying the whole wave along with it. A shift of $\\dfrac{\\pi}{2}$ moves the starting point a quarter of a full period to the right.",
        to: { C: 3 },
        ms: 1300,
      },
      {
        text: "Writing the input instead as $x + C$ moves the wave the same distance to the left, so the direction of the shift is opposite to the sign attached to $x$.",
        to: { C: 0 },
        ms: 1100,
      },
    ],
    practice: "A positive $C$ shifts the graph right because the input $x - C$ reaches any given value later, at a larger $x$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Shift the wave to the right by $\\dfrac{\\pi}{2}$.",
        hint: "$\\dfrac{\\pi}{2}$ is three sixths of $\\pi$, so choose the $C$ whose readout shows $\\dfrac{\\pi}{2}$.",
        success: "With $C = \\dfrac{\\pi}{2}$ the wave starts its rise a quarter cycle later, at $x = \\dfrac{\\pi}{2}$.",
        check: (value) => value === 3,
      },
      {
        kind: "choice",
        prompt: "In $y = \\sin\\!\\big(x - \\tfrac{\\pi}{3}\\big)$, the graph is shifted:",
        options: ["right by $\\dfrac{\\pi}{3}$", "left by $\\dfrac{\\pi}{3}$", "up by $\\dfrac{\\pi}{3}$", "right by $3$"],
        answer: 0,
        hint: "The input has the form $x - C$, and here $C = \\dfrac{\\pi}{3}$.",
        success: "Correct: subtracting $\\dfrac{\\pi}{3}$ inside moves the graph right by $\\dfrac{\\pi}{3}$.",
      },
    ],
  },
  {
    id: "combine",
    title: "Reading all four at once",
    mode: "all",
    params: [ampParam(1), periodParam(1), phaseParam(0), midParam(0)],
    baseReveal: {},
    beats: [
      {
        text: "Now the four constants act together to turn the parent wave into the specific target drawn as a dashed curve. Read each constant off the target one at a time.",
      },
      {
        text: "The peaks of the target reach $3$ and the troughs reach $-1$, so the midline lies halfway between them at $y = 1$, giving $D = 1$. The amplitude is the distance from that midline up to a peak, $3 - 1 = 2$, so $A = 2$.",
      },
      {
        text: "One full cycle of the target spans a width of $\\pi$. Setting the period equal to $\\pi$ in $\\dfrac{2\\pi}{B} = \\pi$ gives $B = 2$.",
      },
      {
        text: "The target begins its rise not at $x = 0$ but a quarter cycle later, at $x = \\dfrac{\\pi}{2}$, so the phase shift is $C = \\dfrac{\\pi}{2}$. Together these constants give $$y = 2\\sin\\!\\big(2(x - \\tfrac{\\pi}{2})\\big) + 1.$$",
      },
    ],
    practice: "Match all four features: amplitude $A = 2$, period $\\pi$ so $B = 2$, phase shift $C = \\dfrac{\\pi}{2}$, and midline $D = 1$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Set $A$, $B$, $C$, and $D$ so the solid curve lands exactly on the dashed target.",
        hint: "Read amplitude $2$ (so $A = 2$), period $\\pi$ (so $B = 2$), shift $\\dfrac{\\pi}{2}$ (so $C = \\dfrac{\\pi}{2}$), and midline $1$ (so $D = 1$).",
        success: "That is $y = 2\\sin\\!\\big(2(x - \\tfrac{\\pi}{2})\\big) + 1$, exactly the target curve.",
        check: (_value, values) => values.A === 2 && values.B === 2 && values.C === 3 && values.D === 1,
      },
      {
        kind: "choice",
        prompt: "For the target $y = 2\\sin\\!\\big(2(x - \\tfrac{\\pi}{2})\\big) + 1$, the maximum value is:",
        options: ["$3$", "$2$", "$1$", "$4$"],
        answer: 0,
        hint: "The maximum is the midline plus the amplitude.",
        success: "Correct: $D + A = 1 + 2 = 3$ is the highest point of the curve.",
      },
    ],
  },
];
