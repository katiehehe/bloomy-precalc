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

/** A swept angle for the radian-intro animation, in degrees (0 to a full turn). */
const sweep = (start = 0): ParamSpec => ({
  key: "deg",
  label: "Sweep",
  min: 0,
  max: 360,
  start,
  step: 1,
  format: (v) => `${Math.round(v)}\u00b0`,
});

/** One radian in degrees, 180/pi, so the arc-length animation lands exactly. */
const ONE_RAD = 180 / Math.PI;

export const slides: Slide[] = [
  {
    id: "radian",
    title: "What a radian is",
    mode: "radian",
    params: [sweep(0)],
    hideSliders: true,
    baseReveal: { radius: true },
    beats: [
      {
        text: "A **radian** measures an angle by arc length. When an arc equal to one radius is laid along the circle, the angle it opens at the center is exactly **one radian**, which equals about $57.3^\\circ$.",
        to: { deg: ONE_RAD },
        add: { oneRad: true },
        draw: true,
        ms: 1600,
      },
      {
        text: "Stepped around the circle, that same one-radius arc fits about $6.28$ times, because the whole circumference is $2\\pi r$ and $2\\pi \\approx 6.28$. One complete turn is therefore $$360^\\circ = 2\\pi \\text{ radians}.$$",
        to: { deg: 360 },
        add: { wrap: true },
        draw: true,
        ms: 2400,
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "One radian is about how many degrees?",
        options: ["$\\approx 57.3^\\circ$", "$\\approx 45^\\circ$", "$\\approx 90^\\circ$", "$\\approx 6.28^\\circ$"],
        answer: 0,
        hint: "A full turn is $2\\pi$ radians and $360^\\circ$, so one radian is $\\dfrac{360^\\circ}{2\\pi}$.",
        success: "$1 \\text{ radian} = \\dfrac{180^\\circ}{\\pi} \\approx 57.3^\\circ$.",
      },
      {
        kind: "choice",
        prompt: "Going exactly once around the circle is how many radians?",
        options: ["$2\\pi$", "$\\pi$", "$360$", "$\\dfrac{\\pi}{2}$"],
        answer: 0,
        hint: "The circumference $2\\pi r$ is $2\\pi$ radii of arc.",
        success: "One full turn is $2\\pi$ radians, since the circumference is $2\\pi$ radii of arc.",
      },
    ],
  },
  {
    id: "bridge",
    title: "The bridge: 180 degrees is pi",
    mode: "bridge",
    params: [dial(360)],
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "One complete turn is $$360^\\circ = 2\\pi \\text{ radians}.$$ Every familiar angle comes from dividing both sides of this one equation.",
      },
      {
        text: "Divide both sides by $2$. The left side becomes $\\dfrac{360^\\circ}{2}$ and the right side becomes $\\dfrac{2\\pi}{2}$.",
        add: { s1: true },
        draw: true,
        ms: 900,
      },
      {
        text: "Simplifying both sides gives the **bridge** between the two units: $$180^\\circ = \\pi.$$",
        to: { deg: 180 },
        ms: 1600,
        add: { s2: true },
        draw: true,
      },
      {
        text: "Divide both sides of the bridge by $2$ again. A right angle, $90^\\circ$, is half of $\\pi$, so it is $\\dfrac{\\pi}{2}$.",
        to: { deg: 90 },
        ms: 1400,
        add: { s3: true },
        draw: true,
      },
      {
        text: "The same move works with thirds. Divide both sides of $180^\\circ = \\pi$ by $3$ to get $60^\\circ = \\dfrac{\\pi}{3}$.",
        to: { deg: 60 },
        ms: 1400,
        add: { s4: true },
        draw: true,
      },
    ],
    practice: "",
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
        text: "Multiply $120^\\circ$ by that fraction.",
        add: { s1: true },
        draw: true,
        ms: 900,
      },
      {
        text: "The degree unit on top cancels the degree unit on the bottom, leaving $\\dfrac{120\\,\\pi}{180}$: a plain number times $\\pi$, which is radians.",
        add: { s2: true },
        draw: true,
        ms: 900,
      },
      {
        text: "Now reduce the number. Since $\\gcd(120, 180) = 60$, divide the top and bottom by $60$.",
        add: { s3: true },
        draw: true,
        ms: 900,
      },
      {
        text: "That leaves $\\dfrac{2\\pi}{3}$, so the conversion is complete: $$120^\\circ = \\dfrac{2\\pi}{3}.$$",
        add: { s4: true },
        draw: true,
        ms: 900,
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Which angle measures $\\dfrac{3\\pi}{4}$ radians?",
        options: ["$135^\\circ$", "$120^\\circ$", "$45^\\circ$", "$150^\\circ$"],
        answer: 0,
        hint: "$\\dfrac{3\\pi}{4}$ is three quarters of $\\pi = 180^\\circ$, so it is $\\tfrac{3}{4} \\times 180^\\circ$.",
        success: "$\\dfrac{3\\pi}{4} = \\tfrac{3}{4} \\times 180^\\circ = 135^\\circ$.",
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
        text: "Going the other way, from **radians into degrees**, multiply by the flipped fraction $\\dfrac{180^\\circ}{\\pi}$. Applying it to $\\dfrac{5\\pi}{6}$ multiplies the angle by that fraction.",
        add: { s1: true },
        draw: true,
        ms: 900,
      },
      {
        text: "The $\\pi$ on top cancels the $\\pi$ on the bottom, so the radian unit disappears and only degrees remain.",
        add: { s2: true },
        draw: true,
        ms: 900,
      },
      {
        text: "Multiply straight across the top: $\\dfrac{5 \\times 180^\\circ}{6}$.",
        add: { s3: true },
        draw: true,
        ms: 900,
      },
      {
        text: "Divide $180$ by $6$ to get $30$, so the expression becomes $5 \\times 30^\\circ$.",
        add: { s4: true },
        draw: true,
        ms: 900,
      },
      {
        text: "That is $150^\\circ$, so the conversion gives: $$\\dfrac{5\\pi}{6} = 150^\\circ.$$",
        add: { s5: true },
        draw: true,
        ms: 900,
      },
      {
        text: "A quicker route uses the bridge directly. Because $\\pi = 180^\\circ$, replace $\\pi$ with $180^\\circ$ and simplify: $$\\dfrac{5\\pi}{6} = \\dfrac{5 \\times 180^\\circ}{6} = 150^\\circ.$$ This gives the same answer as multiplying by $\\dfrac{180^\\circ}{\\pi}$, with nothing to cancel.",
      },
    ],
    practice: "",
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
