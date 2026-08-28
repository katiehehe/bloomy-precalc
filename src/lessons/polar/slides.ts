import type { ParamSpec, Slide } from "../types";

const thetaParam = (start: number): ParamSpec => ({
  key: "theta",
  label: "Angle theta",
  min: 0,
  max: 360,
  start,
  step: 5,
  format: (v) => `theta = ${v.toFixed(0)}\u00b0`,
});

const rParam = (start: number): ParamSpec => ({
  key: "r",
  label: "Radius r",
  min: 0,
  max: 500,
  start,
  step: 20,
  format: (v) => `r = ${(v / 100).toFixed(2)}`,
});

export const slides: Slide[] = [
  {
    id: "polar-two-addresses",
    title: "From (x, y) to (r, theta)",
    mode: "convert",
    params: [thetaParam(45), rParam(283)],
    baseReveal: {},
    beats: [
      {
        text: "A single point in the plane has two natural addresses. **Rectangular** coordinates locate it by going across by $x$ and up by $y$.",
        add: { legs: true, coords: true },
      },
      {
        text: "**Polar** coordinates locate the same dot differently: by its straight-line distance from the origin, $r$.",
        add: { radius: true },
      },
      {
        text: "and by the angle $\\theta$, measured from the positive $x$-axis around to that radius.",
        add: { angle: true },
      },
      {
        text: "Same dot, two names: $(x, y)$ or $(r, \\theta)$. Next we connect them with a right triangle.",
      },
    ],
    practice: "Drag the point and watch both the legs $x, y$ and the polar pair $r, \\theta$ describe it.",
    questions: [
      {
        kind: "choice",
        prompt: "Polar coordinates locate a point using",
        options: ["two distances, $x$ and $y$", "a distance $r$ and an angle $\\theta$", "only an angle"],
        answer: 1,
        hint: "Polar means how far, and in what direction.",
        success: "Polar uses a radius $r$ (how far) and an angle $\\theta$ (which direction).",
      },
      {
        kind: "manipulate",
        prompt: "Rotate the point so it sits straight up, at $\\theta = 90^\\circ$.",
        hint: "Straight up the positive $y$-axis is $\\theta = 90^\\circ$.",
        success: "At $\\theta = 90^\\circ$ the radius points straight up the $y$-axis, no matter the length $r$.",
        check: (theta) => Math.abs(theta - 90) < 3,
      },
    ],
  },
  {
    id: "polar-relationship",
    title: "The relationship, visually and algebraically",
    mode: "worked",
    params: [thetaParam(53.13), rParam(500)],
    baseReveal: {},
    beats: [
      {
        text: "Drop the point to the $x$-axis and a **right triangle** appears: horizontal leg $x$, vertical leg $y$, hypotenuse $r$.",
        add: { legs: true, radius: true, coords: true },
      },
      {
        text: "Trig on that triangle gives the polar-to-rectangular formulas: $x = r\\cos\\theta$ and $y = r\\sin\\theta$.",
        add: { angle: true, formulas: true },
      },
      {
        text: "Running it backward gives rectangular-to-polar: $r = \\sqrt{x^2 + y^2}$ and $\\theta = \\arctan\\!\\left(\\tfrac{y}{x}\\right)$.",
      },
      {
        text: "Concrete case: the point $(3, 4)$ has $r = \\sqrt{9 + 16} = 5$ and $\\theta \\approx 53.13^\\circ$. Every number in the dock is computed live.",
      },
    ],
    practice: "This point is $(3, 4)$. Read $r = 5$ and $\\theta \\approx 53.13^\\circ$ straight off the triangle.",
    questions: [
      {
        kind: "choice",
        prompt: "For the point $(3, 4)$, the radius $r$ equals",
        options: ["$7$", "$5$", "$\\sqrt{7}$"],
        answer: 1,
        hint: "Use $r = \\sqrt{x^2 + y^2}$.",
        success: "$r = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$.",
      },
      {
        kind: "choice",
        prompt: "Which pair converts polar to rectangular?",
        options: [
          "$x = r\\cos\\theta,\\ y = r\\sin\\theta$",
          "$x = r\\sin\\theta,\\ y = r\\cos\\theta$",
          "$x = r + \\theta,\\ y = r - \\theta$",
        ],
        answer: 0,
        hint: "The horizontal leg uses cosine of the angle.",
        success: "$x = r\\cos\\theta$ and $y = r\\sin\\theta$ read the legs of the triangle.",
      },
    ],
  },
  {
    id: "polar-play",
    title: "Play with r and theta",
    mode: "play",
    params: [rParam(200), thetaParam(30)],
    baseReveal: { legs: true, radius: true, angle: true, coords: true },
    beats: [
      {
        text: "Your turn to drive. One slider sets the radius $r$, the other sets the angle $\\theta$.",
        to: { r: 360, theta: 120 },
        ms: 2200,
      },
      {
        text: "Grow $r$ and the point slides **outward** along the ray. Change $\\theta$ and the whole ray **swings** around the origin.",
        to: { r: 150, theta: 300 },
        ms: 2400,
      },
      {
        text: "The dock shows the matching $(x, y)$ the entire time, so both coordinate systems stay in step.",
      },
    ],
    practice: "Use the $r$ and $\\theta$ sliders, or drag the point, and watch $(x, y)$ update together.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Place the point at $(3, 2)$ by choosing $r$ and $\\theta$.",
        hint: "$r = \\sqrt{3^2 + 2^2} \\approx 3.6$ and $\\theta = \\arctan\\!\\left(\\tfrac{2}{3}\\right) \\approx 33.7^\\circ$.",
        success: "With $r \\approx 3.6$ and $\\theta \\approx 33.7^\\circ$, the point lands at $(3, 2)$.",
        check: (_value, values) => {
          const r = (values.r ?? 0) / 100;
          const a = ((values.theta ?? 0) * Math.PI) / 180;
          return Math.abs(r * Math.cos(a) - 3) < 0.25 && Math.abs(r * Math.sin(a) - 2) < 0.25;
        },
      },
      {
        kind: "choice",
        prompt: "Compared with $(r, \\theta)$, the rectangular pair $(x, y)$ is",
        options: ["a different point", "the same point, named differently", "only valid for lines"],
        answer: 1,
        hint: "Both describe where the same dot sits.",
        success: "They are two names for the same location, linked by $x = r\\cos\\theta$, $y = r\\sin\\theta$.",
      },
    ],
  },
  {
    id: "polar-curve",
    title: "When r depends on theta",
    mode: "rose",
    params: [thetaParam(0)],
    baseReveal: { path: true },
    beats: [
      {
        text: "Finally, let the radius **depend on** the angle: $r = \\cos 2\\theta$. Rather than guess the shape, **plot a few points** first.",
      },
      {
        text: "At $\\theta = 0^\\circ$, $r = \\cos 0^\\circ = 1$: step one unit out along the $x$-axis to $(1, 0)$.",
        add: { samples: true, radius: true, coords: true },
      },
      {
        text: "At $\\theta = 30^\\circ$, $r = \\cos 60^\\circ = 0.5$: only half a unit out, so the point pulls in toward the center.",
        to: 30,
        ms: 1500,
      },
      {
        text: "At $\\theta = 45^\\circ$, $r = \\cos 90^\\circ = 0$: the radius shrinks to zero, landing the point right at the origin.",
        to: 45,
        ms: 1500,
      },
      {
        text: "Connect those dots and keep sweeping. $r = \\cos 2\\theta$ carves a four-petaled **rose**.",
        to: 360,
        ms: 3200,
        add: { trace: true },
      },
      {
        text: "To find any point, pick $\\theta$, compute $r = \\cos 2\\theta$, then step out $r$ at that angle. Your turn to place a few.",
      },
    ],
    practice: "Estimate from the rule: compute $r = \\cos 2\\theta$, then click where the point lands on the plane.",
    questions: [
      {
        kind: "plot",
        prompt: "Click where the curve is at $\\theta = 180^\\circ$. Compute $r = \\cos 360^\\circ = 1$, then step out along $180^\\circ$.",
        hint: "One unit out at $180^\\circ$ points straight along the negative $x$-axis.",
        success: "At $\\theta = 180^\\circ$, $r = 1$, so the point sits at $(-1, 0)$: the tip of the left petal.",
        target: { x: -1, y: 0 },
        tolerance: 0.3,
        label: "\u03b8 = 180\u00b0",
      },
      {
        kind: "plot",
        prompt: "Trickier: click the point at $\\theta = 90^\\circ$, where $r = \\cos 180^\\circ = -1$.",
        hint: "A negative radius points the opposite way: instead of up at $90^\\circ$, step one unit down.",
        success: "With $r = -1$ at $\\theta = 90^\\circ$, the point flips to $(0, -1)$: negative $r$ reverses direction.",
        target: { x: 0, y: -1 },
        tolerance: 0.3,
        label: "\u03b8 = 90\u00b0",
      },
      {
        kind: "choice",
        prompt: "A polar curve such as $r = \\cos 2\\theta$ comes from",
        options: ["fixing $r$ at one value", "letting $r$ depend on $\\theta$", "ignoring the angle"],
        answer: 1,
        hint: "What makes the radius change as you sweep around?",
        success: "Letting $r$ be a function of $\\theta$ turns a moving point into a whole curve.",
      },
    ],
  },
];
