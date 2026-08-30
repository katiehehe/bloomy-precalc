import type { ParamSpec, Slide } from "../types";

/** The angle dial. Integer degrees, snapped to 15 so radian fractions stay clean. */
const dial = (start: number): ParamSpec => ({
  key: "deg",
  label: "Angle",
  min: 15,
  max: 360,
  start,
  step: 15,
  format: (v) => `${Math.round(v)}\u00b0`,
});

export const slides: Slide[] = [
  {
    id: "bridge",
    title: "The bridge: 180 degrees is pi",
    mode: "bridge",
    params: [dial(360)],
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "A **radian** measures an angle by arc length: swing one radius worth of arc and you have turned one radian. Go the whole way around and the arc is the full circumference, $2\\pi r$, which is $2\\pi$ radii of arc. So one full turn is $360^\\circ = 2\\pi$ radians.",
      },
      {
        text: "Cut that in half. Half a turn is a straight angle, $180^\\circ$, and half of $2\\pi$ is $\\pi$. That one fact is the **bridge** between the two units: $$180^\\circ = \\pi.$$",
        to: { deg: 180 },
        ms: 1600,
        add: { s1: true },
      },
      {
        text: "Halve it once more. A right angle, $90^\\circ$, is half of $\\pi$, so it is $\\dfrac{\\pi}{2}$.",
        to: { deg: 90 },
        ms: 1400,
        add: { s2: true },
      },
      {
        text: "Split the straight angle into thirds instead: $60^\\circ$ is $\\dfrac{\\pi}{3}$. Every familiar angle is just a piece of $\\pi$.",
        to: { deg: 60 },
        ms: 1400,
        add: { s3: true },
      },
    ],
    practice: "Answer using the bridge $180^\\circ = \\pi$.",
    questions: [
      {
        kind: "choice",
        prompt: "A straight angle, a half turn, equals how many radians?",
        options: ["$\\pi$", "$2\\pi$", "$\\dfrac{\\pi}{2}$", "$90$"],
        answer: 0,
        hint: "It is half of a full turn, and a full turn is $2\\pi$.",
        success: "$180^\\circ = \\pi$. That is the bridge you will use for every conversion.",
      },
      {
        kind: "choice",
        prompt: "How many radians is $90^\\circ$?",
        options: ["$\\dfrac{\\pi}{2}$", "$\\dfrac{\\pi}{3}$", "$\\dfrac{\\pi}{4}$", "$\\pi$"],
        answer: 0,
        hint: "$90^\\circ$ is half of $180^\\circ = \\pi$.",
        success: "$90^\\circ = \\dfrac{\\pi}{2}$.",
      },
    ],
  },
  {
    id: "deg-to-rad",
    title: "Degrees to radians",
    mode: "d2r",
    params: [dial(60)],
    baseReveal: {},
    beats: [
      {
        text: "To turn **degrees into radians**, multiply by $\\dfrac{\\pi}{180^\\circ}$. Because $180^\\circ = \\pi$, that fraction equals $1$: it swaps the units without changing the angle.",
        to: { deg: 120 },
        ms: 1500,
      },
      {
        text: "Take $120^\\circ$ and write it times that fraction.",
        add: { s1: true },
      },
      {
        text: "The degree unit on top cancels the degree unit on the bottom, leaving $\\dfrac{120\\,\\pi}{180}$: a plain number times $\\pi$, which is radians.",
        add: { s2: true },
      },
      {
        text: "Now reduce the number. Since $\\gcd(120, 180) = 60$, divide the top and bottom by $60$.",
        add: { s3: true },
      },
      {
        text: "That leaves $\\dfrac{2\\pi}{3}$, so the conversion is complete: $$120^\\circ = \\dfrac{2\\pi}{3}.$$ The dial and the fraction now agree.",
        add: { s4: true },
      },
    ],
    practice: "Drag the dial, then set it where each problem asks.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Turn the dial to the angle that measures $\\dfrac{3\\pi}{4}$ radians.",
        hint: "$\\dfrac{3\\pi}{4}$ is three quarters of $\\pi = 180^\\circ$, so it is $\\tfrac{3}{4} \\times 180^\\circ$.",
        success: "$\\dfrac{3\\pi}{4} = 135^\\circ$. Multiplying by $\\dfrac{\\pi}{180^\\circ}$ would take you right back.",
        check: (value) => Math.abs(value - 135) < 8,
      },
      {
        kind: "choice",
        prompt: "Convert $30^\\circ$ to radians.",
        options: ["$\\dfrac{\\pi}{6}$", "$\\dfrac{\\pi}{3}$", "$\\dfrac{\\pi}{4}$", "$\\dfrac{\\pi}{2}$"],
        answer: 0,
        hint: "$30$ is one sixth of $180$, so $30^\\circ = \\dfrac{180^\\circ}{6}$.",
        success: "$30^\\circ = \\dfrac{\\pi}{6}$.",
      },
    ],
  },
  {
    id: "rad-to-deg",
    title: "Radians to degrees",
    mode: "r2d",
    params: [dial(150)],
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Going the other way, **radians into degrees**, multiply by the flipped fraction $\\dfrac{180^\\circ}{\\pi}$. Watch it work on $\\dfrac{5\\pi}{6}$.",
      },
      {
        text: "Write the angle times that fraction.",
        add: { s1: true },
      },
      {
        text: "The $\\pi$ on top cancels the $\\pi$ on the bottom, so the radian marker disappears and degrees are left.",
        add: { s2: true },
      },
      {
        text: "Multiply straight across the top: $\\dfrac{5 \\times 180^\\circ}{6}$.",
        add: { s3: true },
      },
      {
        text: "Divide $180$ by $6$ to get $30$, so the expression becomes $5 \\times 30^\\circ$.",
        add: { s4: true },
      },
      {
        text: "That is $150^\\circ$, so the conversion gives: $$\\dfrac{5\\pi}{6} = 150^\\circ.$$ That is the angle drawn on the dial.",
        add: { s5: true },
      },
    ],
    practice: "Multiply by $\\dfrac{180^\\circ}{\\pi}$, then simplify.",
    questions: [
      {
        kind: "choice",
        prompt: "Convert $\\dfrac{7\\pi}{6}$ to degrees.",
        options: ["$210^\\circ$", "$150^\\circ$", "$240^\\circ$", "$330^\\circ$"],
        answer: 0,
        hint: "$\\dfrac{7\\pi}{6} = 7 \\times \\dfrac{180^\\circ}{6} = 7 \\times 30^\\circ$.",
        success: "$\\dfrac{7\\pi}{6} = 210^\\circ$.",
      },
      {
        kind: "choice",
        prompt: "To change radians to degrees, you multiply by which factor?",
        options: ["$\\dfrac{180^\\circ}{\\pi}$", "$\\dfrac{\\pi}{180^\\circ}$", "$2\\pi$", "$\\pi$"],
        answer: 0,
        hint: "You want degrees on top and $\\pi$ on the bottom so the radians cancel.",
        success: "Multiply by $\\dfrac{180^\\circ}{\\pi}$.",
      },
    ],
  },
];
