import type { ParamSpec, Slide } from "../types";

const nParam = (start: number): ParamSpec => ({
  key: "n",
  label: "Order n",
  min: 1,
  max: 6,
  start,
  step: 1,
  format: (v) => `n = ${Math.round(v)}`,
});

const thetaParam = (start: number): ParamSpec => ({
  key: "theta",
  label: "Angle theta",
  min: 0,
  max: 360,
  start,
  step: 5,
  format: (v) => `theta = ${v.toFixed(0)}\u00b0`,
});

const aParam = (start: number): ParamSpec => ({
  key: "a",
  label: "Constant a",
  min: 0,
  max: 30,
  start,
  step: 5,
  format: (v) => `a = ${(v / 10).toFixed(1)}`,
});

const bParam = (start: number): ParamSpec => ({
  key: "b",
  label: "Coefficient b",
  min: 10,
  max: 30,
  start,
  step: 5,
  format: (v) => `b = ${(v / 10).toFixed(1)}`,
});

export const slides: Slide[] = [
  {
    id: "what-r-of-theta-means",
    title: "What does $r = f(\\theta)$ mean?",
    mode: "rose",
    params: [thetaParam(0), nParam(2)],
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "A **polar equation** is a rule with one input and one output: you choose an angle $\\theta$, and the rule returns a radius $r$. Letting $\\theta$ sweep and plotting each pair $(r, \\theta)$ traces a whole curve.",
      },
      {
        text: "The angle $\\theta$ is a direction measured from the positive $x$-axis, and $r$ is the distance to travel along that direction, so the pair $(r, \\theta)$ marks exactly one point. Using $r = \\cos 2\\theta$, the angle $\\theta = 0^\\circ$ gives $r = \\cos 0^\\circ = 1$, the point one unit out at $(1, 0)$.",
        add: { tracer: true, dock: true },
      },
      {
        text: "Choose a different angle and the rule returns a different radius, which lands a different point. At $\\theta = 30^\\circ$ the rule gives $r = \\cos 60^\\circ = 0.5$, so this point is only half a unit out.",
        to: 30,
        ms: 1600,
        add: { samples: true },
      },
      {
        text: "Each angle from $0^\\circ$ through $360^\\circ$ contributes its own point this way. Collecting all of those points is exactly what draws the curve.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "In $r = f(\\theta)$, which quantity is the input and which is the output?",
        options: [
          "$\\theta$ is the input angle and $r$ is the output radius",
          "$r$ is the input and $\\theta$ is the output",
          "Both are inputs, and there is no output",
        ],
        answer: 0,
        hint: "You pick the direction first, then the rule returns how far out to go.",
        success: "Right: you choose $\\theta$, the rule returns $r = f(\\theta)$, and the pair $(r, \\theta)$ is one point.",
      },
      {
        kind: "choice",
        prompt: "How does the single equation $r = f(\\theta)$ produce a whole curve?",
        options: [
          "Each angle $\\theta$ gives its own $r$, and all those points join up",
          "It fixes one point and spins it around the origin",
          "It ignores $\\theta$ and lets $r$ wander freely",
        ],
        answer: 0,
        hint: "Think about what happens as $\\theta$ sweeps through every direction.",
        success: "Right: every angle contributes one point $(r, \\theta)$, and sweeping all angles traces the whole curve.",
      },
    ],
  },
  {
    id: "sweeping",
    title: "Sweeping out a polar graph",
    mode: "rose",
    params: [thetaParam(0), nParam(2)],
    hideSliders: true,
    baseReveal: { curve: true },
    beats: [
      {
        text: "Now sweep the angle through a full turn and let the points join into a curve, using the rose $r = \\cos 2\\theta$.",
      },
      {
        text: "At $\\theta = 0^\\circ$, $r = \\cos 0^\\circ = 1$: step one unit out along the positive $x$-axis to $(1, 0)$.",
        add: { samples: true, tracer: true, dock: true },
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
        text: "Keep sweeping through a full turn, and the dots join up. $r = \\cos 2\\theta$ carves a four-petaled **rose**.",
        to: 360,
        ms: 3200,
        add: { trace: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "A polar curve such as $r = \\cos 2\\theta$ is produced by",
        options: [
          "letting $r$ depend on the angle $\\theta$",
          "fixing $r$ at a single value",
          "ignoring the angle $\\theta$",
        ],
        answer: 0,
        hint: "What makes the radius change as you sweep around?",
        success: "Letting $r$ be a function of $\\theta$ turns a moving point into a whole curve.",
      },
      {
        kind: "choice",
        prompt: "For $r = \\cos 2\\theta$, what is $r$ at $\\theta = 45^\\circ$?",
        options: ["$0$", "$1$", "$-1$"],
        answer: 0,
        hint: "Compute $\\cos(2 \\cdot 45^\\circ) = \\cos 90^\\circ$.",
        success: "$\\cos 90^\\circ = 0$, so the curve passes through the origin at $\\theta = 45^\\circ$.",
      },
    ],
  },
  {
    id: "negative-radius",
    title: "A negative polar radius",
    mode: "rose",
    params: [thetaParam(90), nParam(2)],
    hideSliders: true,
    baseReveal: { curve: true },
    beats: [
      {
        text: "The rose $r = \\cos 2\\theta$ sometimes returns a negative radius. A negative $r$ means travel the opposite way from $\\theta$, a half turn of $180^\\circ$ around.",
      },
      {
        text: "Take $r = \\cos 2\\theta$ at $\\theta = 90^\\circ$. The rule gives $r = \\cos 180^\\circ = -1$, a negative radius.",
        add: { tracer: true, dock: true },
      },
      {
        text: "Because $r = -1$ is negative, do not step out along $90^\\circ$. Step one unit the opposite way, along $270^\\circ$, which lands the point at $(0, -1)$ on the downward petal.",
      },
      {
        text: "This is how $r = \\cos 2\\theta$ fills petals in every direction even though the cosine is positive only part of the time. Whenever $r$ comes out negative, the point is placed a half turn around from $\\theta$.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "For $r = \\cos 2\\theta$ at $\\theta = 90^\\circ$, the rule gives $r = -1$. Where is the point plotted?",
        options: [
          "At $(0, -1)$, a half turn from the $90^\\circ$ direction",
          "At $(0, 1)$, straight out along $90^\\circ$",
          "Nowhere, because a negative radius is undefined",
        ],
        answer: 0,
        hint: "A negative radius reverses the direction, sending the point along $270^\\circ$.",
        success: "Right: $r = -1$ sends the point one unit along $270^\\circ$, landing at $(0, -1)$.",
      },
      {
        kind: "choice",
        prompt: "In general, a point with a negative radius $r$ at angle $\\theta$ is plotted",
        options: [
          "$|r|$ units along the direction $\\theta + 180^\\circ$",
          "$r$ units along the direction $\\theta$",
          "at the origin, regardless of $\\theta$",
        ],
        answer: 0,
        hint: "Negative distance means face the other way, a half turn around.",
        success: "Right: reverse the direction and step $|r|$ units, which is the direction $\\theta + 180^\\circ$.",
      },
    ],
  },
  {
    id: "petal-count",
    title: "How to count the petals of a rose",
    mode: "rose",
    params: [nParam(2), thetaParam(360)],
    hideSliders: true,
    baseReveal: { curve: true, dock: true },
    beats: [
      {
        text: "The number of petals depends on $n$ in $r = \\cos(n\\theta)$. With $n = 2$, this rose has $4$ petals.",
      },
      {
        text: "Change to $n = 3$. Now there are $3$ petals, not $6$.",
        to: 3,
        ms: 2000,
      },
      {
        text: "Change to $n = 4$. Now there are $8$ petals.",
        to: 4,
        ms: 2000,
      },
      {
        text: "Change to $n = 5$. Now there are $5$ petals.",
        to: 5,
        ms: 2000,
      },
      {
        text: "The petal count follows a parity rule. If $n$ is odd, $r = \\cos(n\\theta)$ has $n$ petals. If $n$ is even, it has $2n$ petals.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "How many petals does $r = \\cos 2\\theta$ have?",
        options: ["$4$", "$2$", "$8$"],
        answer: 0,
        hint: "$n = 2$ is even, so use $2n$.",
        success: "$n = 2$ is even, so $2n = 4$ petals.",
      },
      {
        kind: "choice",
        prompt: "How many petals does $r = \\cos 3\\theta$ have?",
        options: ["$3$", "$6$", "$9$"],
        answer: 0,
        hint: "$n = 3$ is odd, so use $n$.",
        success: "$n = 3$ is odd, so there are $3$ petals.",
      },
    ],
  },
  {
    id: "cardioid",
    title: "What is a cardioid?",
    mode: "cardioid",
    params: [thetaParam(0)],
    hideSliders: true,
    baseReveal: { curve: true },
    beats: [
      {
        text: "Adding a constant produces a **cardioid**, the heart-shaped curve $r = 1 + \\cos\\theta$.",
      },
      {
        text: "At $\\theta = 0^\\circ$, $r = 1 + \\cos 0^\\circ = 2$: the farthest point, out at $(2, 0)$.",
        add: { tracer: true, dock: true },
      },
      {
        text: "At $\\theta = 90^\\circ$, $r = 1 + \\cos 90^\\circ = 1$: the point $(0, 1)$.",
        to: 90,
        ms: 1800,
      },
      {
        text: "At $\\theta = 180^\\circ$, $r = 1 + \\cos 180^\\circ = 0$: the curve reaches the origin, forming the **cusp** (the dent of the heart).",
        to: 180,
        ms: 1800,
      },
      {
        text: "Sweeping on to $\\theta = 360^\\circ$ traces the lower half and closes the heart.",
        to: 360,
        ms: 2600,
        add: { trace: true },
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "For the cardioid $r = 1 + \\cos\\theta$, what is $r$ at $\\theta = 180^\\circ$?",
        options: ["$0$", "$2$", "$1$"],
        answer: 0,
        hint: "$\\cos 180^\\circ = -1$.",
        success: "$r = 1 + (-1) = 0$, so the cusp is right at the origin.",
      },
      {
        kind: "choice",
        prompt: "The cardioid $r = 1 + \\cos\\theta$ reaches its greatest distance $r = 2$ at $\\theta =$",
        options: ["$0^\\circ$", "$180^\\circ$", "$90^\\circ$"],
        answer: 0,
        hint: "Where is $\\cos\\theta$ the largest?",
        success: "$\\cos 0^\\circ = 1$ gives the maximum $r = 2$, out at $(2, 0)$.",
      },
    ],
  },
  {
    id: "limacons",
    title: "What is a limaçon?",
    mode: "limacon",
    params: [aParam(5), bParam(10)],
    hideSliders: true,
    baseReveal: { curve: true, dock: true },
    beats: [
      {
        text: "A **limaçon** is $r = a + b\\cos\\theta$: here $b = 1$ and $a = 0.5$, so $a < b$ and the curve has an **inner loop**. The cardioid is the special case $a = b$.",
      },
      {
        text: "As $a$ grows to $1$, the case $a = b$ is reached, and the loop shrinks to a single point at the origin. This special case is exactly the **cardioid**.",
        to: { a: 10 },
        ms: 2000,
      },
      {
        text: "As $a$ grows to $1.5$, it passes $b$, so the loop is gone. For $b \\le a < 2b$, a **dimple** remains.",
        to: { a: 15 },
        ms: 2000,
      },
      {
        text: "As $a$ grows to $2.5$, it reaches $a \\ge 2b$, and even the dimple flattens into a smooth **convex** bump.",
        to: { a: 25 },
        ms: 2000,
      },
      {
        text: "The shape depends on how $a$ compares with $b$. $a < b$ gives an inner loop, $a = b$ gives the cardioid, and $a > b$ gives a dimple that flattens as $a$ grows.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "A limaçon $r = a + b\\cos\\theta$ has an inner loop when",
        options: ["$a < b$", "$a > b$", "$a = b$"],
        answer: 0,
        hint: "The loop appears when $r$ dips below zero for some angles.",
        success: "When $a < b$, $r$ turns negative on part of the sweep, which draws the inner loop.",
      },
      {
        kind: "choice",
        prompt: "The special case $a = b$, such as $r = 1 + \\cos\\theta$, is a",
        options: ["cardioid", "rose", "circle"],
        answer: 0,
        hint: "This is the borderline between a loop and a dimple.",
        success: "At $a = b$ the loop closes to a cusp, which is the cardioid.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn: recognize a polar graph",
    mode: "rose",
    params: [nParam(2), thetaParam(0)],
    baseReveal: { curve: true, tracer: true, dock: true },
    beats: [
      {
        text: "One slider sets $n$ in $r = \\cos(n\\theta)$, and the other sweeps the tracer around the curve.",
        to: { n: 4, theta: 90 },
        ms: 2200,
      },
      {
        text: "The parity rule still governs the count: an odd $n$ gives $n$ petals, and an even $n$ gives $2n$.",
        to: { n: 5, theta: 200 },
        ms: 2200,
      },
      {
        text: "It comes to rest at $n = 2$, a four-petaled rose ready for you to change.",
        to: { n: 2, theta: 0 },
        ms: 1600,
      },
    ],
    practice: "Drag the $n$ slider to change the petal count, and the $\\theta$ slider to move the tracer.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Make a rose with exactly $3$ petals.",
        hint: "For $r = \\cos(n\\theta)$, an odd $n$ gives $n$ petals. Which odd $n$ gives $3$?",
        success: "$n = 3$ is odd, so $r = \\cos 3\\theta$ has exactly $3$ petals.",
        check: (value) => Math.round(value) === 3,
      },
      {
        kind: "plot",
        prompt: "Click the tip of the petal on the positive $x$-axis, where $\\theta = 0^\\circ$ and $r = 1$.",
        hint: "At $\\theta = 0^\\circ$, $r = \\cos 0^\\circ = 1$, so the tip is one unit to the right.",
        success: "Every $r = \\cos(n\\theta)$ has a petal tip at $(1, 0)$, because $\\cos 0^\\circ = 1$.",
        target: { x: 1, y: 0 },
        tolerance: 0.3,
        label: "\u03b8 = 0\u00b0",
      },
      {
        kind: "choice",
        prompt: "How many petals does $r = \\cos 4\\theta$ have?",
        options: ["$8$", "$4$", "$16$"],
        answer: 0,
        hint: "$n = 4$ is even, so use $2n$.",
        success: "$n = 4$ is even, so $2n = 8$ petals.",
      },
    ],
  },
];
