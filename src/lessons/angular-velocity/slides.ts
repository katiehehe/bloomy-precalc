import type { ParamSpec, Slide } from "../types";

const sweep = (start: number): ParamSpec => ({
  key: "deg",
  label: "Angle",
  min: 0,
  max: 300,
  start,
  step: 15,
  format: (v) => `${Math.round(v)}\u00b0`,
});

const omegaParam = (start: number): ParamSpec => ({
  key: "omega",
  label: "Angular speed \u03c9",
  min: 0,
  max: 10,
  start,
  step: 1,
  format: (v) => `\u03c9 = ${Math.round(v)} rad/s`,
});

export const slides: Slide[] = [
  {
    id: "arc-length",
    title: "Arc length from an angle",
    mode: "arc",
    params: [sweep(0)],
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Radians pay off here. The definition of a radian is built so that arc length is just radius times angle: $$s = r\\theta.$$ This holds as long as $\\theta$ is measured in radians. Watch the arc grow as the angle opens.",
        to: { deg: 150 },
        ms: 1600,
      },
      {
        text: "Why so clean? Because one radian is defined as the angle that wraps exactly one radius of arc around the rim. So at $\\theta = 1$, the arc length is exactly $r$.",
        to: { deg: 60 },
        ms: 1400,
        add: { s1: true },
      },
      {
        text: "Scale up from there. With a radius of $3$ and an angle of $2$ radians, the arc is $s = 3 \\cdot 2$.",
        to: { deg: 115 },
        ms: 1200,
        add: { s2: true },
      },
      {
        text: "That is $6$ units of arc. The formula only works in radians, so make sure to convert degrees first.",
        add: { s3: true },
      },
    ],
    practice: "Use $s = r\\theta$ with the angle in radians.",
    questions: [
      {
        kind: "choice",
        prompt: "A wheel of radius $4$ turns through $\\dfrac{\\pi}{2}$ radians. How far does a rim point travel?",
        options: ["$2\\pi$", "$\\dfrac{\\pi}{2}$", "$4\\pi$", "$8$"],
        answer: 0,
        hint: "$s = r\\theta = 4 \\cdot \\dfrac{\\pi}{2}$.",
        success: "$s = 4 \\cdot \\dfrac{\\pi}{2} = 2\\pi$.",
      },
      {
        kind: "choice",
        prompt: "Before using $s = r\\theta$, the angle must be in:",
        options: ["radians", "degrees", "revolutions", "either, it does not matter"],
        answer: 0,
        hint: "The formula comes from the radian definition of arc length.",
        success: "Radians. Convert any degree measure first.",
      },
    ],
  },
  {
    id: "derive",
    title: "From spinning to speed",
    mode: "derive",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Two speeds live on a spinning wheel. **Linear speed** $v$ is how fast a rim point travels along its path, distance over time: $v = \\dfrac{s}{t}$.",
      },
      {
        text: "But we just found the distance: the arc length is $s = r\\theta$. Substitute it in.",
        add: { s1: true },
      },
      {
        text: "Regroup the factors, pulling the constant radius out front: $v = r \\cdot \\dfrac{\\theta}{t}$.",
        add: { s2: true },
      },
      {
        text: "That leftover $\\dfrac{\\theta}{t}$, angle swept per unit time, is the **angular speed** $\\omega$. Putting it together gives: $$v = r\\omega.$$ Linear speed is radius times angular speed. The farther out you sit, the faster you move, even though everyone shares the same $\\omega$.",
        add: { s3: true },
      },
    ],
    practice: "Linear speed $v = r\\omega$: same spin, but a bigger radius means a faster rim.",
    questions: [
      {
        kind: "choice",
        prompt: "Two children ride a merry-go-round at the same $\\omega$, one near the center and one at the edge. Who moves faster?",
        options: ["the one at the edge (larger $r$)", "the one near the center", "they move at the same speed", "it depends on their weight"],
        answer: 0,
        hint: "$v = r\\omega$, and $\\omega$ is the same for both.",
        success: "Larger $r$ means larger $v$: the edge rider is faster.",
      },
      {
        kind: "choice",
        prompt: "In $v = r\\omega$, the quantity $\\omega$ measures:",
        options: ["angle swept per unit time", "distance per unit time", "the radius", "the number of turns total"],
        answer: 0,
        hint: "It is the $\\dfrac{\\theta}{t}$ that appeared when we regrouped.",
        success: "$\\omega = \\dfrac{\\theta}{t}$ is angular speed, angle per time.",
      },
    ],
  },
  {
    id: "worked",
    title: "Set the speed yourself",
    mode: "worked",
    params: [omegaParam(0)],
    baseReveal: {},
    beats: [
      {
        text: "Put it to work on a wheel of radius $3$ metres. Its rim speed is $v = 3\\omega$, so the faster it spins, the longer the green velocity arrow.",
        add: { s1: true },
      },
      {
        text: "The arrow points along the direction of travel, tangent to the rim, and its length is the linear speed. Change $\\omega$ and the whole thing scales.",
        add: { s2: true },
      },
    ],
    practice: "Drag $\\omega$ and read off $v = 3\\omega$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Set $\\omega$ so the rim speed is $v = 12$ m/s.",
        hint: "$v = 3\\omega$, so you need $3\\omega = 12$.",
        success: "$\\omega = 4$ rad/s gives $v = 3 \\cdot 4 = 12$ m/s.",
        check: (value) => Math.abs(3 * value - 12) < 0.5,
      },
      {
        kind: "choice",
        prompt: "If this wheel spins at $\\omega = 5$ rad/s, its rim speed is:",
        options: ["$15$ m/s", "$8$ m/s", "$5$ m/s", "$1.67$ m/s"],
        answer: 0,
        hint: "$v = r\\omega = 3 \\cdot 5$.",
        success: "$v = 3 \\cdot 5 = 15$ m/s.",
      },
    ],
  },
];
