import type { ParamSpec, Slide } from "../types";

const midlineParam = (start: number): ParamSpec => ({
  key: "d",
  label: "Midline D",
  min: 50,
  max: 70,
  start,
  step: 1,
  format: (v) => `D = ${Math.round(v)}`,
});

export const slides: Slide[] = [
  {
    id: "read",
    title: "Amplitude and midline from data",
    mode: "read",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Real data that rises and falls on a cycle, like monthly high temperatures, can be modeled by a sinusoid $y = A\\sin\\!\\big(B(x - C)\\big) + D$. Four numbers do all the work, and two of them come straight from the highest and lowest points.",
      },
      {
        text: "Read the peak and the valley off the dots: the high is about $85$, the low about $35$.",
        add: { s1: true },
      },
      {
        text: "The **amplitude** $A$ is half the gap between them, how far the curve swings from the middle: $A = \\dfrac{85 - 35}{2} = 25$.",
        add: { s2: true, amp: true },
      },
      {
        text: "The **midline** $D$ is the average of the high and low, the level the curve oscillates around: $D = \\dfrac{85 + 35}{2} = 60$. Make sure to use the sum for the midline and the difference for the amplitude. Swapping them is the classic slip.",
        add: { s3: true, mid: true, curve: true },
      },
    ],
    practice: "Amplitude is half the max-minus-min. Midline is the average of max and min.",
    questions: [
      {
        kind: "choice",
        prompt: "Data peaks at $90$ and bottoms at $30$. The amplitude is:",
        options: ["$30$", "$60$", "$120$", "$15$"],
        answer: 0,
        hint: "$A = \\dfrac{\\max - \\min}{2}$.",
        success: "$A = \\dfrac{90 - 30}{2} = 30$.",
      },
      {
        kind: "choice",
        prompt: "For that same data, the midline is:",
        options: ["$D = 60$", "$D = 30$", "$D = 90$", "$D = 120$"],
        answer: 0,
        hint: "$D = \\dfrac{\\max + \\min}{2}$.",
        success: "$D = \\dfrac{90 + 30}{2} = 60$.",
      },
    ],
  },
  {
    id: "fit",
    title: "Period and phase shift",
    mode: "fit",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "The other two numbers control timing. First the **period**: the data repeats every $12$ months, one full cycle.",
      },
      {
        text: "The coefficient $B$ is set by the period, not equal to it: $B = \\dfrac{2\\pi}{\\text{period}} = \\dfrac{2\\pi}{12} = \\dfrac{\\pi}{6}$. A longer period means a smaller $B$.",
        add: { s1: true, period: true },
      },
      {
        text: "Last is the **phase shift** $C$, which slides the curve sideways so its peak lands at the right time. The data peaks at month $7$, and a sine peaks when its inside equals $\\dfrac{\\pi}{2}$.",
        add: { s2: true },
      },
      {
        text: "Set the inside to $\\dfrac{\\pi}{2}$ at the peak: $\\dfrac{\\pi}{6}(7 - C) = \\dfrac{\\pi}{2}$, which gives $7 - C = 3$.",
        add: { s3: true },
      },
      {
        text: "So $C = 4$, and the full model is $y = 25\\sin\\!\\big(\\tfrac{\\pi}{6}(x - 4)\\big) + 60$. The curve now rides through the data.",
        add: { s4: true },
      },
    ],
    practice: "Get $B$ from $\\dfrac{2\\pi}{\\text{period}}$, then choose $C$ so the peak lines up.",
    questions: [
      {
        kind: "choice",
        prompt: "A cycle repeats every $8$ units. What is $B$?",
        options: ["$\\dfrac{\\pi}{4}$", "$8$", "$\\dfrac{2\\pi}{8}\\cdot 2$", "$\\dfrac{\\pi}{8}$"],
        answer: 0,
        hint: "$B = \\dfrac{2\\pi}{\\text{period}} = \\dfrac{2\\pi}{8}$.",
        success: "$B = \\dfrac{2\\pi}{8} = \\dfrac{\\pi}{4}$.",
      },
      {
        kind: "choice",
        prompt: "The phase shift $C$ is chosen mainly to:",
        options: [
          "line the curve's peak up with the data's peak",
          "set how tall the curve is",
          "set the average value",
          "change the period",
        ],
        answer: 0,
        hint: "It slides the whole curve left or right.",
        success: "$C$ is the horizontal shift that aligns the peaks.",
      },
    ],
  },
  {
    id: "match",
    title: "Tune the fit yourself",
    mode: "match",
    params: [midlineParam(50)],
    baseReveal: {},
    beats: [
      {
        text: "See how sensitive the fit is. The amplitude, period, and phase are already set correctly, but the midline $D$ starts too low, so the whole curve sags beneath the data.",
        add: { s1: true },
      },
      {
        text: "Raise $D$ and the curve lifts as a rigid shape until it rides through the points. The best midline is the average of the high and low, $60$.",
        add: { s2: true },
      },
    ],
    practice: "Drag the midline $D$ until the curve sits centered in the data cloud.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Set the midline $D$ to its best-fit value.",
        hint: "$D = \\dfrac{\\max + \\min}{2} = \\dfrac{85 + 35}{2}$.",
        success: "$D = 60$ centers the curve in the data.",
        check: (value) => Math.abs(value - 60) < 0.5,
      },
      {
        kind: "choice",
        prompt: "Changing only $D$ moves the curve:",
        options: ["straight up or down", "left or right", "taller or shorter", "faster or slower"],
        answer: 0,
        hint: "$D$ is added at the end, outside the sine.",
        success: "$D$ is a vertical shift: up or down with no change in shape.",
      },
    ],
  },
];
