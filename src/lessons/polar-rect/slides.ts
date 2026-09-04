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
    id: "two-addresses",
    title: "Two names for the same point",
    mode: "convert",
    params: [thetaParam(45), rParam(283)],
    baseReveal: {},
    beats: [
      {
        text: "A single point in the plane has two natural addresses. **Rectangular** coordinates $(x, y)$ locate it by going across by $x$ and up by $y$.",
        add: { legs: true, coords: true },
      },
      {
        text: "**Polar** coordinates locate the same point by a different pair. The first number is $r$, the straight-line distance from the origin to the point.",
        add: { radius: true },
      },
      {
        text: "The second number is the angle $\\theta$, measured counterclockwise from the positive $x$-axis around to that radius.",
        add: { angle: true },
      },
      {
        text: "Same point, two names: $(x, y)$ or $(r, \\theta)$. A right triangle with hypotenuse $r$ connects those two names.",
      },
    ],
    practice: "Rotate the point with the $\\theta$ slider, or drag it, until $\\theta$ matches the target.",
    questions: [
      {
        kind: "choice",
        prompt: "Polar coordinates locate a point using",
        options: [
          "a distance $r$ and an angle $\\theta$",
          "two distances, $x$ and $y$",
          "only an angle $\\theta$",
        ],
        answer: 0,
        hint: "Polar means how far, and in which direction.",
        success: "Polar uses a radius $r$ (how far) and an angle $\\theta$ (which direction).",
      },
      {
        kind: "manipulate",
        prompt: "Rotate the point so it points straight up, at $\\theta = 90^\\circ$.",
        hint: "Straight up the positive $y$-axis is $\\theta = 90^\\circ$.",
        success: "At $\\theta = 90^\\circ$ the radius points straight up the $y$-axis, whatever the length $r$.",
        check: (theta) => Math.abs(theta - 90) < 3,
      },
    ],
  },
  {
    id: "polar-to-rect",
    title: "How to convert polar to rectangular",
    mode: "worked",
    params: [thetaParam(60), rParam(400)],
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "A vertical segment from the point down to the $x$-axis completes a **right triangle**. The horizontal leg is $x$, the vertical leg is $y$, and the hypotenuse is the radius $r$.",
        add: { legs: true, radius: true, coords: true },
      },
      {
        text: "The angle $\\theta$ is at the origin, so basic right-triangle trig gives the polar-to-rectangular formulas: $$x = r\\cos\\theta, \\quad y = r\\sin\\theta$$ Cosine multiplies to make $x$, and sine multiplies to make $y$.",
        add: { angle: true, formulas: true },
      },
      {
        text: "Take $(r, \\theta) = (4, 60^\\circ)$. Then $x = 4\\cos 60^\\circ = 4 \\cdot \\tfrac{1}{2} = 2$ and $y = 4\\sin 60^\\circ = 4 \\cdot \\tfrac{\\sqrt{3}}{2} = 2\\sqrt{3} \\approx 3.46$.",
      },
      {
        text: "The common slip is to swap them. Make sure cosine builds the horizontal part $x$ and sine builds the vertical part $y$, never the other way around.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Which pair converts polar $(r, \\theta)$ to rectangular $(x, y)$?",
        options: [
          "$x = r\\cos\\theta,\\ y = r\\sin\\theta$",
          "$x = r\\sin\\theta,\\ y = r\\cos\\theta$",
          "$x = r + \\cos\\theta,\\ y = r + \\sin\\theta$",
        ],
        answer: 0,
        hint: "The horizontal leg uses the cosine of the angle.",
        success: "$x = r\\cos\\theta$ and $y = r\\sin\\theta$ read the two legs of the triangle.",
      },
      {
        kind: "choice",
        prompt: "For $(r, \\theta) = (4, 60^\\circ)$, what is the $x$-coordinate?",
        options: ["$2$", "$2\\sqrt{3}$", "$4$"],
        answer: 0,
        hint: "$x = 4\\cos 60^\\circ$ and $\\cos 60^\\circ = \\tfrac{1}{2}$.",
        success: "$x = 4 \\cdot \\tfrac{1}{2} = 2$. The value $2\\sqrt{3}$ is the $y$-coordinate.",
      },
    ],
  },
  {
    id: "rect-to-polar",
    title: "How to convert rectangular to polar",
    mode: "worked",
    params: [thetaParam(53.13), rParam(500)],
    hideSliders: true,
    baseReveal: { legs: true, radius: true, coords: true },
    beats: [
      {
        text: "Going the other way, we will recover $r$ and $\\theta$ from $(x, y)$. The reverse conversion starts from $(x, y)$ and finds $(r, \\theta)$. The radius is the hypotenuse, so by the Pythagorean theorem $$r = \\sqrt{x^2 + y^2}$$ Because it is a length, $r$ is never negative.",
        add: { formulas: true },
      },
      {
        text: "For the point $(x, y) = (3, 4)$: $r = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$.",
        add: { angle: true },
      },
      {
        text: "The angle comes from the tangent ratio, opposite over adjacent: $\\tan\\theta = \\tfrac{y}{x} = \\tfrac{4}{3}$, so $\\theta = \\tan^{-1}\\tfrac{4}{3} \\approx 53.13^\\circ$. Since $(3, 4)$ is in quadrant I, that angle is already correct.",
      },
      {
        text: "Make sure to check the quadrant. When $x < 0$, the bare $\\tan^{-1}\\tfrac{y}{x}$ lands a half turn off, so add $180^\\circ$. For $(-3, 4)$ in quadrant II, $\\theta \\approx -53.13^\\circ + 180^\\circ = 126.87^\\circ$.",
        to: { theta: 126.87 },
        ms: 2200,
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "For $(x, y) = (3, 4)$, the radius $r$ is",
        options: ["$5$", "$7$", "$\\sqrt{7}$"],
        answer: 0,
        hint: "Use $r = \\sqrt{x^2 + y^2} = \\sqrt{3^2 + 4^2}$.",
        success: "$r = \\sqrt{9 + 16} = \\sqrt{25} = 5$.",
      },
      {
        kind: "choice",
        prompt: "For $(x, y) = (-3, 4)$ in quadrant II, the angle $\\theta$ is",
        options: ["$126.87^\\circ$", "$-53.13^\\circ$", "$53.13^\\circ$"],
        answer: 0,
        hint: "Because $x < 0$, add $180^\\circ$ to the bare $\\tan^{-1}$.",
        success: "$\\tan^{-1}\\tfrac{4}{-3} \\approx -53.13^\\circ$, plus $180^\\circ$ gives $126.87^\\circ$.",
      },
    ],
  },
  {
    id: "not-unique",
    title: "Why one point has many polar names",
    mode: "play",
    params: [thetaParam(30), rParam(200)],
    baseReveal: { legs: true, radius: true, angle: true, coords: true },
    beats: [
      {
        text: "A point has exactly one rectangular name $(x, y)$, but infinitely many polar names $(r, \\theta)$.",
      },
      {
        text: "First reason: angles repeat every full turn. Adding $360^\\circ$ to $\\theta$ points the radius the same way, so $(2, 30^\\circ)$ and $(2, 390^\\circ)$ are the same dot.",
      },
      {
        text: "Second reason: a **negative radius** means stepping backward, opposite the angle. So $(-2, 210^\\circ)$ names our point too, because facing $210^\\circ$ and stepping backward matches facing $30^\\circ$ and stepping forward.",
      },
      {
        text: "The rectangular pair has no such freedom. Our dot is $(x, y) = (\\sqrt{3}, 1) \\approx (1.73, 1)$, and that is its only rectangular name.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Which is another polar name for the point $(2, 30^\\circ)$?",
        options: ["$(2, 390^\\circ)$", "$(2, 60^\\circ)$", "$(-2, 30^\\circ)$"],
        answer: 0,
        hint: "Add a full turn of $360^\\circ$ to the angle.",
        success: "$(2, 390^\\circ)$ uses $390^\\circ = 30^\\circ + 360^\\circ$, the same direction and distance.",
      },
      {
        kind: "choice",
        prompt: "A negative radius, as in $(-2, 210^\\circ)$, means you",
        options: [
          "step backward, opposite the direction of the angle",
          "step forward, in the direction of the angle",
          "ignore the angle entirely",
        ],
        answer: 0,
        hint: "A negative $r$ reverses the direction the angle points.",
        success: "With $r < 0$ you step opposite the angle, so $(-2, 210^\\circ)$ matches $(2, 30^\\circ)$.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn: convert between polar and rectangular",
    mode: "play",
    params: [rParam(200), thetaParam(30)],
    baseReveal: { legs: true, radius: true, angle: true, coords: true },
    beats: [
      {
        text: "The $r$ slider sets the distance and the $\\theta$ slider sets the direction. The coordinates $(x, y)$ stay in step with those two values.",
        to: { r: 360, theta: 120 },
        ms: 2200,
      },
      {
        text: "Growing $r$ slides the point outward along the ray, and shrinking it pulls the point back in. Turning $\\theta$ rotates the whole ray around the origin.",
        to: { r: 200, theta: 300 },
        ms: 2400,
      },
      {
        text: "It comes to rest near $(1.73, 1)$, short of the targets below.",
        to: { r: 200, theta: 30 },
        ms: 1600,
      },
    ],
    practice: "Use the $r$ and $\\theta$ sliders, or drag the point, to hit each target.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Place the point at $(x, y) = (-2, 2)$ by choosing $r$ and $\\theta$.",
        hint: "$r = \\sqrt{(-2)^2 + 2^2} = 2\\sqrt{2} \\approx 2.83$, and the point is in quadrant II, so $\\theta = 135^\\circ$.",
        success: "With $r \\approx 2.83$ and $\\theta = 135^\\circ$, the point lands at $(-2, 2)$.",
        check: (_value, values) => {
          const r = (values.r ?? 0) / 100;
          const a = ((values.theta ?? 0) * Math.PI) / 180;
          return Math.abs(r * Math.cos(a) + 2) < 0.3 && Math.abs(r * Math.sin(a) - 2) < 0.3;
        },
      },
      {
        kind: "plot",
        prompt: "Predict where $(r, \\theta) = (4, 120^\\circ)$ lands, then click it.",
        hint: "$x = 4\\cos 120^\\circ = -2$ and $y = 4\\sin 120^\\circ = 2\\sqrt{3} \\approx 3.46$.",
        success: "$(4, 120^\\circ)$ is $(-2, 3.46)$, up and to the left.",
        target: { x: -2, y: 3.4641 },
        tolerance: 0.5,
        label: "(-2, 3.46)",
      },
      {
        kind: "choice",
        prompt: "In rectangular form, the polar point $(3, 270^\\circ)$ is",
        options: ["$(0, -3)$", "$(0, 3)$", "$(-3, 0)$"],
        answer: 0,
        hint: "$x = 3\\cos 270^\\circ$ and $y = 3\\sin 270^\\circ$.",
        success: "$\\cos 270^\\circ = 0$ and $\\sin 270^\\circ = -1$, so $(3, 270^\\circ) = (0, -3)$.",
      },
    ],
  },
];
