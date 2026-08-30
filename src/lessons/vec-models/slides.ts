import type { ParamSpec, Slide } from "../types";

/** Slider units per world unit on the interactive slide (kept in sync with Stage.SCALE). */
const S = 20;

const compParam = (key: string, label: string, start: number): ParamSpec => ({
  key,
  label,
  min: -100,
  max: 100,
  start,
  step: 5,
  format: (v) => `${label} = ${(v / S).toFixed(2)}`,
});

const f2xParam = compParam("f2x", "F2x", 40);
const f2yParam = compParam("f2y", "F2y", 20);

export const slides: Slide[] = [
  {
    id: "adding-forces",
    title: "Adding forces",
    mode: "forces",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "A **force** is a push or a pull, and like any vector it carries two facts: how hard it pushes (its **magnitude**) and which way it pushes (its **direction**). We work in the standard plane, with **east as $+x$** and **north as $+y$**. A first force $F_1 = (3, 0)$ pushes an object $3$ units straight east.",
        draw: true,
        ms: 1000,
        add: { f1: true },
      },
      {
        text: "A second force $F_2 = (0, 4)$ pushes the same object $4$ units straight north. To combine two forces we lay them **tip to tail**: the tail of $F_2$ starts at the tip of $F_1$, exactly the way vectors were added in Base Camp.",
        draw: true,
        ms: 1000,
        add: { f2: true },
      },
      {
        text: "The single force with the same total effect is the **resultant** $R$, drawn from the tail of $F_1$ straight to the tip of $F_2$. Add component by component: $$R = F_1 + F_2 = (3 + 0,\\ 0 + 4) = (3, 4)$$",
        draw: true,
        ms: 1100,
        add: { sum: true, dock: true },
      },
      {
        text: "Two forces add as vectors rather than settling on a compromise. Here $3$ east and $4$ north combine into one resultant heading up and to the right, into the first quadrant. The east parts add to the east part of $R$, and the north parts add to its north part.",
      },
    ],
    practice: "The resultant of two forces is their vector sum, placed tip to tail: add the east parts, then add the north parts.",
    questions: [
      {
        kind: "choice",
        prompt: "Two forces act on a crate, $F_1 = (5, 2)$ and $F_2 = (1, 6)$. Which single resultant force $R = F_1 + F_2$ has the same effect?",
        options: ["$(6, 8)$", "$(8, 6)$", "$(6, 2)$", "$(4, -4)$"],
        answer: 0,
        hint: "Add the east parts $5 + 1$ and the north parts $2 + 6$ separately.",
        success: "Yes: $(5 + 1,\\ 2 + 6) = (6, 8)$.",
      },
      {
        kind: "plot",
        prompt: "Suppose instead $F_1 = (4, 0)$ (east) and $F_2 = (0, 3)$ (north). Click the tip of the resultant $F_1 + F_2$.",
        target: { x: 4, y: 3 },
        tolerance: 0.6,
        label: "(4, 3)",
        hint: "Add the parts: $(4 + 0,\\ 0 + 3)$, so $4$ east and $3$ north.",
        success: "Yes: $R = (4, 3)$, a 3-4-5 triangle with $|R| = 5$.",
      },
    ],
  },
  {
    id: "magnitude-and-direction",
    title: "Magnitude and direction of a resultant",
    mode: "resultant",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "A resultant is itself a vector, so it has its own **magnitude** (how strong the net push is) and **direction** (which way it points). Take the resultant we just built, $R = (3, 4)$.",
        draw: true,
        ms: 1000,
        add: { sum: true, dock: true },
      },
      {
        text: "For the magnitude, drop a right triangle under the arrow. The horizontal leg is the east part $R_x = 3$, the vertical leg is the north part $R_y = 4$, and the resultant itself is the hypotenuse.",
        add: { legs: true },
      },
      {
        text: "By the Pythagorean theorem the magnitude is: $$\\begin{aligned} |R| &= \\sqrt{R_x^2 + R_y^2} = \\sqrt{3^2 + 4^2} \\\\ &= \\sqrt{9 + 16} = \\sqrt{25} = 5 \\end{aligned}$$ The net force has strength $5$.",
      },
      {
        text: "For the direction, measure the angle $\\theta$ up from the positive $x$-axis (east). In that right triangle the side **opposite** $\\theta$ is $R_y$ and the side **adjacent** is $R_x$, so the tangent is: $$\\tan\\theta = \\dfrac{R_y}{R_x} = \\dfrac{4}{3}$$ Taking the inverse gives $\\theta = \\arctan\\dfrac{4}{3} \\approx 53.13^\\circ$.",
        add: { angle: true },
      },
      {
        text: "Make sure to measure from the east axis and to put the opposite part $R_y$ over the adjacent part $R_x$. If you instead compute $\\arctan\\dfrac{3}{4} \\approx 36.87^\\circ$, you have found the angle from the **north** axis, not from east.",
      },
    ],
    practice: "For a resultant $R = (R_x, R_y)$: the magnitude is $\\sqrt{R_x^2 + R_y^2}$, and the direction from east is $\\arctan\\dfrac{R_y}{R_x}$.",
    questions: [
      {
        kind: "choice",
        prompt: "A resultant is $R = (6, 8)$. What is its magnitude $|R|$?",
        options: ["$14$", "$10$", "$100$", "$2$"],
        answer: 1,
        hint: "Use $|R| = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64}$.",
        success: "Yes: $\\sqrt{36 + 64} = \\sqrt{100} = 10$. Adding the parts as $6 + 8 = 14$ fails because they are perpendicular.",
      },
      {
        kind: "choice",
        prompt: "The resultant $R = (3, 4)$ points at what angle above the positive $x$-axis (east)?",
        options: ["$36.87^\\circ$", "$45^\\circ$", "$53.13^\\circ$", "$90^\\circ$"],
        answer: 2,
        hint: "Use $\\theta = \\arctan\\dfrac{R_y}{R_x} = \\arctan\\dfrac{4}{3}$.",
        success: "Yes: $\\arctan\\dfrac{4}{3} \\approx 53.13^\\circ$. The value $36.87^\\circ = \\arctan\\dfrac{3}{4}$ is the angle from north.",
      },
      {
        kind: "plot",
        prompt: "Click the tip of a resultant that has $|R| = 5$ but points at only $\\arctan\\dfrac{3}{4} \\approx 36.87^\\circ$ above east.",
        target: { x: 4, y: 3 },
        tolerance: 0.6,
        label: "(4, 3)",
        hint: "A smaller angle from east means more east than north: try $R_x = 4$, $R_y = 3$.",
        success: "Yes: $(4, 3)$ has $|R| = \\sqrt{16 + 9} = 5$ and points at $36.87^\\circ$ from east.",
      },
    ],
  },
  {
    id: "navigation",
    title: "Navigation: velocity and bearings",
    mode: "navigation",
    hideSliders: true,
    baseReveal: { compass: true },
    beats: [
      {
        text: "Velocities add as vectors too. A plane's **air velocity** (its motion through the air) combines with the **wind velocity** to give its **ground velocity**, the motion seen from the ground. On this grid each square is $10$ km/h, with east as $+x$ and north as $+y$, so the air velocity $(30, 0)$ is $30$ km/h due east.",
        draw: true,
        ms: 1000,
        add: { air: true },
      },
      {
        text: "The wind blows toward the north at $40$ km/h, so its velocity is $(0, 40)$, drawn **tip to tail** with its tail at the tip of the air-velocity arrow.",
        draw: true,
        ms: 1000,
        add: { wind: true },
      },
      {
        text: "The **ground velocity** is the resultant, from the origin to the final tip: $(30, 0) + (0, 40) = (30, 40)$. The **ground speed** is its magnitude: $$\\begin{aligned} |(30, 40)| &= \\sqrt{30^2 + 40^2} = \\sqrt{900 + 1600} \\\\ &= \\sqrt{2500} = 50 \\text{ km/h} \\end{aligned}$$",
        draw: true,
        ms: 1100,
        add: { sum: true, dock: true },
      },
      {
        text: "Its direction from east is $\\theta = \\arctan\\dfrac{40}{30} = \\arctan\\dfrac{4}{3} \\approx 53.13^\\circ$, so the plane tracks about $53.13^\\circ$ north of east.",
        add: { angle: true },
      },
    ],
    practice: "Ground velocity is air velocity plus wind velocity, and its magnitude is the ground speed.",
    questions: [
      {
        kind: "choice",
        prompt: "A plane's air velocity is $(0, 200)$ (north) and the wind is $(50, 0)$ (east), in km/h. What is the ground velocity?",
        options: ["$(200, 50)$", "$(250, 0)$", "$(50, 200)$", "$(50, -200)$"],
        answer: 2,
        hint: "Add the east parts and the north parts separately: $(0 + 50,\\ 200 + 0)$.",
        success: "Yes: $(0 + 50,\\ 200 + 0) = (50, 200)$.",
      },
      {
        kind: "choice",
        prompt: "A ground velocity is $(30, 40)$ km/h. What is the ground speed?",
        options: ["$50$ km/h", "$70$ km/h", "$35$ km/h", "$2500$ km/h"],
        answer: 0,
        hint: "Ground speed is the magnitude, $\\sqrt{30^2 + 40^2}$.",
        success: "Yes: $\\sqrt{900 + 1600} = \\sqrt{2500} = 50$. Adding $30 + 40 = 70$ ignores that the parts are perpendicular.",
      },
    ],
  },
  {
    id: "navigation-bearings",
    title: "Navigation: bearings",
    mode: "navigation",
    hideSliders: true,
    baseReveal: { compass: true, air: true, wind: true, sum: true, dock: true, angle: true },
    beats: [
      {
        text: "Navigators name a direction with a **bearing**, measured **clockwise from north** (the $+y$ axis) rather than counterclockwise from east. A bearing $B$ matches the standard angle $90^\\circ - B$, which rearranges to: $$B = 90^\\circ - \\theta$$",
        add: { bearing: true },
      },
      {
        text: "For the plane, $\\theta \\approx 53.13^\\circ$, so the bearing is $90^\\circ - 53.13^\\circ = 36.87^\\circ$, written about $\\mathrm{N}\\,37^\\circ\\mathrm{E}$.",
      },
      {
        text: "As a check, a course pointing exactly northeast has $\\theta = 45^\\circ$ from east, and $90^\\circ - 45^\\circ = 45^\\circ$ gives a bearing of $45^\\circ$. Northeast is halfway between north and east, so the conversion is consistent.",
      },
    ],
    practice: "A bearing is measured clockwise from north, equal to $90^\\circ$ minus the direction measured from east.",
    questions: [
      {
        kind: "choice",
        prompt: "A track points at $\\theta = 53.13^\\circ$ measured from east. What is its bearing (clockwise from north)?",
        options: ["$53.13^\\circ$", "$36.87^\\circ$", "$143.13^\\circ$", "$306.87^\\circ$"],
        answer: 1,
        hint: "Use $B = 90^\\circ - \\theta$.",
        success: "Yes: $B = 90^\\circ - 53.13^\\circ = 36.87^\\circ$, about $\\mathrm{N}\\,37^\\circ\\mathrm{E}$.",
      },
    ],
  },
  {
    id: "your-turn-equilibrium",
    title: "Your turn: steering a resultant",
    mode: "balance",
    params: [f2xParam, f2yParam],
    baseReveal: { f1: true, f2: true, sum: true, dock: true },
    beats: [
      {
        text: "Now you build a resultant. A fixed load pulls with the force $F_1 = (3, 4)$ from the origin, and a second force $F_2$ is drawn tip to tail from the end of $F_1$. The **resultant** $R = F_1 + F_2$ runs from the origin to the final tip, and right now $F_2 = (2, 1)$, so $R = (5, 5)$.",
      },
      {
        text: "As $F_2$ changes, the resultant rotates and stretches with it. Here it grows as $F_2$ turns toward the northeast.",
        to: { f2x: 80, f2y: 80 },
        ms: 2000,
      },
      {
        text: "When $F_2$ points exactly opposite to $F_1$, at $(-3, -4)$, the tip-to-tail chain returns to the origin and the resultant collapses to zero. The two forces are then in **equilibrium**, perfectly balanced.",
        to: { f2x: -60, f2y: -80 },
        ms: 2400,
      },
      {
        text: "To cancel a force $F_1$, oppose it with its negative $-F_1$. Since $-F_1 = (-3, -4)$, the balancing force is $F_2 = (-3, -4)$. The figure now returns to its resting value $F_2 = (2, 1)$.",
        to: { f2x: 40, f2y: 20 },
        ms: 2000,
      },
    ],
    practice: "Drag the tip of the resultant, or use the F2x and F2y sliders, to steer $F_2$ and read the resultant $R$ with its magnitude and direction.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Steer $F_2$ so the resultant is $R = (4, 3)$: a net force of magnitude $5$ pointing about $36.87^\\circ$ above east.",
        hint: "You need $F_2 = R - F_1 = (4 - 3,\\ 3 - 4) = (1, -1)$: set $F_{2x} = 1$ and $F_{2y} = -1$.",
        success: "Yes: $F_2 = (1, -1)$ gives $R = (3, 4) + (1, -1) = (4, 3)$, with $|R| = 5$.",
        check: (_value, values) => Math.abs((values.f2x ?? 0) - 20) < 6 && Math.abs((values.f2y ?? 0) + 20) < 6,
      },
      {
        kind: "manipulate",
        prompt: "Balance the load: choose $F_2$ so the resultant is the zero vector, $R = (0, 0)$.",
        hint: "To cancel $F_1 = (3, 4)$, make $F_2 = -F_1 = (-3, -4)$: set $F_{2x} = -3$ and $F_{2y} = -4$.",
        success: "Equilibrium: $F_2 = (-3, -4)$ opposes $F_1 = (3, 4)$, so $R = (0, 0)$ and the resultant arrow vanishes.",
        check: (_value, values) => Math.abs((values.f2x ?? 0) + 60) < 6 && Math.abs((values.f2y ?? 0) + 80) < 6,
      },
      {
        kind: "choice",
        prompt: "A crate is pushed by several forces and stays perfectly still, in equilibrium. What must be true of the resultant force on it?",
        options: ["It is the zero vector, $(0, 0)$.", "It equals the largest single force.", "It points due north.", "It is undefined."],
        answer: 0,
        hint: "Equilibrium means the pushes cancel, so nothing is left over to accelerate the crate.",
        success: "Yes: in equilibrium the forces sum to the zero vector, so the resultant is $(0, 0)$.",
      },
    ],
  },
];
