import type { ParamSpec, Slide } from "../types";

/** One integer time slider mapped to real time t in [0, 4]. */
const tParam = (start: number): ParamSpec => ({
  key: "t",
  label: "Time t",
  min: 0,
  max: 100,
  start,
  step: 5,
  format: (v) => `t = ${((v / 100) * 4).toFixed(2)}`,
});

export const slides: Slide[] = [
  {
    id: "position-at-time",
    title: "Position at a time t",
    mode: "projectile",
    params: [tParam(0)],
    hideSliders: true,
    baseReveal: { path: true, ground: true, marker: true, dock: true },
    beats: [
      {
        text: "A **parametric motion model** describes a moving object by giving its position as a function of **time** $t$. At each time $t$ the object has a horizontal position $x(t)$ and a height $y(t)$, so its location is the ordered pair $$(x(t),\\ y(t))$$",
      },
      {
        text: "Our example is a ball launched from the ground: $$x(t) = 2t \\quad\\text{and}\\quad y(t) = 4t - t^2$$ To find the ball's location at a chosen time, substitute that time into **both** equations. At $t = 1$, $x = 2(1) = 2$ and $y = 4(1) - 1^2 = 3$, the point $(2,\\ 3)$.",
        to: 25,
        ms: 2200,
        add: { drops: true, samples: true },
      },
      {
        text: "At $t = 3$, $x = 2(3) = 6$ and $y = 4(3) - 3^2 = 12 - 9 = 3$, the point $(6,\\ 3)$. The times $t = 1$ and $t = 3$ produce the **same height** of $3$, which already suggests the path is symmetric about its middle.",
        to: 75,
        ms: 2200,
      },
      {
        text: "The vertical dashed segment carries the height $y$ across to the side axis, while the horizontal position $x$ sits directly below on the ground. Reading the two coordinates together fixes the object's location at any instant.",
      },
    ],
    practice: "Read $x(t) = 2t$ and $y(t) = 4t - t^2$ at the time requested, then click where the ball is.",
    questions: [
      {
        kind: "plot",
        prompt:
          "Predict the ball's position at $t = 2$, halfway between $t = 1$ and $t = 3$. Compute $x = 2(2) = 4$ and $y = 4(2) - 2^2 = 8 - 4 = 4$, then click that point.",
        target: { x: 4, y: 4 },
        tolerance: 0.6,
        label: "t = 2",
        hint: "$x = 2(2) = 4$ and $y = 4(2) - 4 = 4$, so aim for $(4,\\ 4)$.",
        success: "At $t = 2$ the ball is at $(4,\\ 4)$, the top of this arc.",
      },
      {
        kind: "choice",
        prompt: "In the position $(2,\\ 3)$ at $t = 1$, what does the first coordinate, $2$, represent?",
        options: [
          "The horizontal position $x$, the distance downrange",
          "The time $t$ on the clock",
          "The height $y$ above the ground",
          "The ball's speed",
        ],
        answer: 0,
        hint: "The first coordinate is always $x(t)$.",
        success:
          "Right: the first coordinate is $x(t) = 2t$, the horizontal distance. The height is the second coordinate.",
      },
    ],
  },
  {
    id: "why-a-parabola",
    title: "Why the path is a parabola",
    mode: "projectile",
    params: [tParam(0)],
    hideSliders: true,
    baseReveal: { path: true, ground: true, marker: true, dock: true },
    beats: [
      {
        text: "The path is a **parabola** because its two coordinates behave differently. The horizontal coordinate $x(t) = 2t$ is **linear**, since each second adds the same $2$ units. From $t = 0$ to $t = 4$ it steps through $0, 2, 4, 6, 8$, because no sideways force changes the horizontal speed.",
        to: 100,
        ms: 2600,
        add: { trace: true },
      },
      {
        text: "The vertical coordinate $y(t) = 4t - t^2$ is **quadratic**. The $-t^2$ term is **gravity** pulling the ball back down, the $-\\tfrac{1}{2}g t^2$ term with its constant chosen to keep the numbers whole. Because of it the height rises, slows, and then falls through $0, 3, 4, 3, 0$.",
        to: 0,
        ms: 2600,
      },
      {
        text: "A steady horizontal motion combined with a height curved by gravity is exactly what traces a **parabola**. The shape is forced rather than chosen, because a linear $x$ paired with a quadratic $y$ can only bend into this curve.",
        to: 50,
        ms: 1800,
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Which coordinate is **quadratic**, the one curved by gravity into an arc?",
        options: [
          "$x(t) = 2t$",
          "$y(t) = 4t - t^2$",
          "Both coordinates are quadratic",
          "Neither, both are linear",
        ],
        answer: 1,
        hint: "Which formula contains a $t^2$ term?",
        success:
          "Right: $y(t) = 4t - t^2$ carries the $-t^2$ gravity term, so the height is quadratic. $x(t) = 2t$ stays linear.",
      },
      {
        kind: "choice",
        prompt:
          "The horizontal position $x(t) = 2t$ adds the same $2$ units every second. That makes it a ___ function.",
        options: ["linear", "quadratic", "constant (not moving)", "exponential"],
        answer: 0,
        hint: "The change is equal over equal time steps.",
        success:
          "Right: a constant change per second is linear. With no horizontal force the sideways speed never changes.",
      },
    ],
  },
  {
    id: "landing-and-peak",
    title: "Landing time, peak, and range",
    mode: "projectile",
    params: [tParam(0)],
    hideSliders: true,
    baseReveal: { path: true, ground: true, marker: true, dock: true },
    beats: [
      {
        text: "Two questions matter for any launch: when it **lands**, and how **high** it climbs. Consider the landing first. The ball is back on the ground when its height is zero, so the landing time solves $y(t) = 0$.",
      },
      {
        text: "Factor the height into $$4t - t^2 = t(4 - t)$$ A product equals zero only when one factor is zero, giving $t = 0$ at the launch or $t = 4$. The positive time is the landing, $t = 4$.",
        to: 100,
        ms: 2400,
        add: { landing: true },
      },
      {
        text: "The **range** is the horizontal distance to the landing point, which is $x$ evaluated at the landing time: $x(4) = 2(4) = 8$. The ball therefore reaches the ground at $(8,\\ 0)$, eight units from the launch.",
      },
      {
        text: "The **peak** of a ground-to-ground launch falls exactly halfway through the flight, at $t = \\tfrac{4}{2} = 2$, which is half the landing time. Make sure to halve the landing time here rather than reuse $t = 4$.",
        to: 50,
        ms: 2400,
        add: { peak: true },
      },
      {
        text: "The **maximum height** is the height at that peak time: $$y(2) = 4(2) - 2^2 = 8 - 4 = 4$$ Substituting the landing time $t = 4$ instead gives $y(4) = 0$, the ground, so always evaluate the height at the peak time $t = 2$.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "Solve $y(t) = 4t - t^2 = 0$ for the landing time (take $t > 0$).",
        options: ["$t = 0$", "$t = 2$", "$t = 4$", "$t = 8$"],
        answer: 2,
        hint: "Factor to $t(4 - t) = 0$.",
        success: "Right: $t(4 - t) = 0$ gives $t = 0$ or $t = 4$. The landing is the positive time, $t = 4$.",
      },
      {
        kind: "choice",
        prompt: "The peak is at $t = 2$. What is the maximum height, $y(2)$?",
        options: ["$8$", "$0$", "$2$", "$4$"],
        answer: 3,
        hint: "Compute $y(2) = 4(2) - 2^2$.",
        success:
          "Right: $y(2) = 8 - 4 = 4$. Answer $8$ forgets the $-t^2$ gravity term, and $0$ comes from using the landing time $t = 4$.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn",
    mode: "projectile",
    params: [tParam(0)],
    baseReveal: { path: true, ground: true, marker: true, drops: true, dock: true },
    beats: [
      {
        text: "Now it is your turn. As the time slider advances $t$, the ball moves along the arc while the dock and the dashed segments report the live position $(x(t),\\ y(t))$.",
        to: 75,
        ms: 2200,
      },
      {
        text: "The ball now rests at the launch, where $t = 0$.",
        to: 0,
        ms: 2000,
      },
    ],
    practice: "Drag the ball along the arc, or use the time slider, until it reaches each target.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Slide the time to $t = 3$, when the ball is on its way back down.",
        hint: "Move the slider until the dock reads $t = 3.00$. The ball should sit at $(6,\\ 3)$.",
        success: "At $t = 3$ the ball is at $(6,\\ 3)$, descending and level with its $t = 1$ point.",
        check: (value) => Math.abs((value / 100) * 4 - 3) < 0.1,
      },
      {
        kind: "plot",
        prompt: "The ball lands when $y = 0$, at $t = 4$. Click the landing point on the ground.",
        target: { x: 8, y: 0 },
        tolerance: 0.6,
        label: "t = 4",
        hint: "$x(4) = 2(4) = 8$ and the height is $0$, so the landing is $(8,\\ 0)$.",
        success: "Right: it lands at $(8,\\ 0)$, so the range is $8$.",
      },
      {
        kind: "choice",
        prompt: "A classmate says the ball is highest at $t = 4$, when it lands. What is the mistake?",
        options: [
          "Nothing, it is highest at $t = 4$",
          "At $t = 4$ the height is $y = 0$ (back on the ground). The peak is at $t = 2$, half the landing time",
          "The ball is highest at $t = 8$",
          "Height and time are the same thing here",
        ],
        answer: 1,
        hint: "Compute $y(4)$.",
        success:
          "Right: $y(4) = 0$ is the ground. The maximum is at the middle of the flight, $t = 2$, where the height is $4$.",
      },
    ],
  },
];
