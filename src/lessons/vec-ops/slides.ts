import type { ParamSpec, Slide } from "../types";

/** Slider units per world unit (kept in sync with Stage.SCALE). */
const S = 20;

/** A component slider spanning -5..5 in world units. */
const compParam = (key: string, label: string, start: number): ParamSpec => ({
  key,
  label,
  min: -100,
  max: 100,
  start,
  step: 5,
  format: (v) => `${label} = ${(v / S).toFixed(2)}`,
});

/** The scalar slider k, in hundredths so k = value / 100. */
const kParam = (start: number): ParamSpec => ({
  key: "k",
  label: "Scalar k",
  min: -200,
  max: 300,
  start,
  step: 25,
  format: (v) => `k = ${(v / 100).toFixed(2)}`,
});

export const slides: Slide[] = [
  {
    id: "add-tip-to-tail",
    title: "Adding tip to tail",
    mode: "add",
    params: [compParam("bx", "b\u2093", 20), compParam("by", "b\u1d67", 40)],
    hideSliders: true,
    baseReveal: { dock: true },
    beats: [
      {
        text: "To add two vectors, place them **tip to tail**. Start by drawing $a = (3, 1)$ as an arrow from the origin: $3$ across and $1$ up.",
        draw: true,
        ms: 1000,
        add: { drawA: true },
      },
      {
        text: "Now draw $b = (1, 2)$ starting where $a$ ends, so the tail of $b$ sits on the **tip of** $a$. This head-to-tail placement is exactly what vector addition requires.",
        draw: true,
        ms: 1000,
        add: { drawB: true },
      },
      {
        text: "The **sum**, also called the **resultant**, is the single arrow from the tail of $a$ straight to the tip of $b$. It replaces the two-step path with one direct arrow.",
        draw: true,
        ms: 1100,
        add: { drawSum: true },
      },
      {
        text: "Componentwise it is just as clean: add the matching parts. $a + b = (3 + 1,\\ 1 + 2) = (4, 3)$. The picture and the arithmetic give the same arrow.",
      },
      {
        text: "The resultant tracks $b$: when $b$ moves to $(-1, 2)$, the sum shifts to $a + b = (3 - 1,\\ 1 + 2) = (2, 3)$. Wherever $b$ points, the sum reaches its new tip.",
        to: { bx: -20, by: 40 },
        ms: 2000,
      },
    ],
    practice: "The resultant $a + b$ runs from the tail of the first arrow to the tip of the last, and componentwise you add matching parts.",
    questions: [
      {
        kind: "choice",
        prompt: "Add $a = (5, 2)$ and $b = (1, 6)$ componentwise.",
        options: ["$(6, 8)$", "$(7, 7)$", "$(4, -4)$", "$14$"],
        answer: 0,
        hint: "Add the two horizontal parts, then the two vertical parts, keeping them separate.",
        success: "Right: $(5 + 1,\\ 2 + 6) = (6, 8)$.",
      },
      {
        kind: "choice",
        prompt: "In tip-to-tail addition, the resultant $a + b$ is the arrow from:",
        options: [
          "the tail of $a$ to the tip of $b$",
          "the tip of $a$ to the tip of $b$",
          "the tail of $a$ to the tail of $b$",
          "the midpoint of $a$ to the midpoint of $b$",
        ],
        answer: 0,
        hint: "You start where the chain starts and end where it ends.",
        success: "Yes: with $b$ placed on the tip of $a$, the sum spans from $a$'s tail to $b$'s tip.",
      },
      {
        kind: "plot",
        prompt: "Let $a = (3, 1)$ and $b = (2, -1)$. Click the point at the tip of $a + b$.",
        target: { x: 5, y: 0 },
        tolerance: 0.6,
        label: "(5, 0)",
        hint: "Add componentwise: $(3 + 2,\\ 1 + (-1))$.",
        success: "Yes: $a + b = (5, 0)$, one step to the right of the last grid mark.",
      },
    ],
  },
  {
    id: "subtract-add-opposite",
    title: "Subtracting is adding the opposite",
    mode: "sub",
    params: [compParam("bx", "b\u2093", 40), compParam("by", "b\u1d67", 60)],
    hideSliders: true,
    baseReveal: { dock: true },
    beats: [
      {
        text: "Subtraction turns into addition with one flip: $a - b = a + (-b)$. Begin again with $a = (3, 1)$ from the origin.",
        draw: true,
        ms: 1000,
        add: { drawA: true },
      },
      {
        text: "The faint arrow shows $b = (2, 3)$ from the tip of $a$. To subtract $b$, we add its **opposite** rather than $b$ itself.",
        add: { showGhostB: true },
      },
      {
        text: "The **opposite** of $b$ is $-b = (-2, -3)$, the same length pointing the other way, drawn tip to tail from the end of $a$.",
        draw: true,
        ms: 1100,
        add: { drawNegB: true },
      },
      {
        text: "The difference $a - b$ runs from the tail of $a$ to the tip of $-b$. Componentwise, $a - b = (3 - 2,\\ 1 - 3) = (1, -2)$, down and to the right.",
        draw: true,
        ms: 1100,
        add: { drawDiff: true },
      },
      {
        text: "So subtraction needs no new rule: reverse the second vector, then add tip to tail. Every difference is an addition of the opposite vector.",
      },
    ],
    practice: "To subtract, reverse $b$ into $-b$ and add tip to tail, or subtract matching components: $a - b = (a_x - b_x,\\ a_y - b_y)$.",
    questions: [
      {
        kind: "choice",
        prompt: "The difference $a - b$ is the same as:",
        options: ["$a + (-b)$", "$a + b$", "$b - a$", "$-a + b$"],
        answer: 0,
        hint: "Subtracting means adding the opposite of the second vector.",
        success: "Right: $a - b = a + (-b)$, so you flip $b$ and add.",
      },
      {
        kind: "choice",
        prompt: "Subtract componentwise: $(7, 3) - (2, 5)$.",
        options: ["$(5, -2)$", "$(5, 2)$", "$(9, 8)$", "$(5, 8)$"],
        answer: 0,
        hint: "Do each coordinate separately: $7 - 2$, then $3 - 5$.",
        success: "Yes: $(7 - 2,\\ 3 - 5) = (5, -2)$. The second entry $3 - 5$ is negative.",
      },
      {
        kind: "choice",
        prompt: "What is $-b$ when $b = (3, -2)$?",
        options: ["$(-3, 2)$", "$(3, 2)$", "$(-3, -2)$", "$(2, -3)$"],
        answer: 0,
        hint: "The opposite flips the sign of both components.",
        success: "Right: $-b = (-3, 2)$, since both signs flip.",
      },
    ],
  },
  {
    id: "scale-a-vector",
    title: "Scaling a vector",
    mode: "scale",
    params: [kParam(100)],
    hideSliders: true,
    baseReveal: { dock: true, showBase: true, showScaled: true },
    beats: [
      {
        text: "**Scalar multiplication** multiplies a vector by an ordinary number $k$, called a **scalar**. Take $v = (2, 1)$, drawn faint as a reference. Scaling multiplies each component: $k\\,v = (2k,\\ k)$.",
      },
      {
        text: "With $k = 2$ the arrow **stretches** to twice its length, $2v = (4, 2)$, keeping the same heading and only reaching farther.",
        to: { k: 200 },
        ms: 2000,
      },
      {
        text: "With $k = 0.5$ it **shrinks** to half, $0.5\\,v = (1, 0.5)$, pointing the same direction but shorter.",
        to: { k: 50 },
        ms: 2000,
      },
      {
        text: "A **negative** scalar flips the arrow around. With $k = -1$, $-v = (-2, -1)$ has the same length but points the exact **opposite** way.",
        to: { k: -100 },
        ms: 2200,
      },
      {
        text: "So $k$ controls two things at once: its size sets the length and its sign sets the direction. $k > 1$ stretches, $0 < k < 1$ shrinks, and $k < 0$ flips.",
        to: { k: 100 },
        ms: 1600,
      },
    ],
    practice: "Scaling multiplies both components by $k$: $k\\,v = (k\\,v_x,\\ k\\,v_y)$, which stretches, shrinks, or flips the arrow.",
    questions: [
      {
        kind: "choice",
        prompt: "Compute $3v$ for $v = (2, -1)$.",
        options: ["$(6, -3)$", "$(6, -1)$", "$(5, -1)$", "$(6, 3)$"],
        answer: 0,
        hint: "Multiply each component by $3$, keeping signs.",
        success: "Right: $3(2, -1) = (6, -3)$. Both parts get multiplied.",
      },
      {
        kind: "choice",
        prompt: "Multiplying a vector by $k = -2$ does what?",
        options: [
          "Doubles its length and reverses its direction",
          "Doubles its length, same direction",
          "Halves its length and reverses its direction",
          "Leaves the length alone, only reverses direction",
        ],
        answer: 0,
        hint: "The size of $k$ sets the length, the sign sets the direction.",
        success: "Yes: $|k| = 2$ doubles the length and the minus sign flips it around.",
      },
      {
        kind: "choice",
        prompt: "What is $0 \\cdot v$ for any vector $v$?",
        options: ["The zero vector $(0, 0)$", "The vector $v$ unchanged", "Undefined", "A unit vector"],
        answer: 0,
        hint: "Multiply each component by $0$.",
        success: "Right: every component times $0$ is $0$, giving $(0, 0)$.",
      },
    ],
  },
  {
    id: "combinations",
    title: "Combinations like 2a - b",
    mode: "combo",
    baseReveal: { dock: true },
    beats: [
      {
        text: "Now combine the operations. To find $2a - b$ with $a = (2, 1)$ and $b = (1, 3)$, work left to right, starting from $a$ and $b$ at the origin with $b$ drawn faint.",
        add: { comboA: true },
      },
      {
        text: "First the scalar multiple: double $a$ to get $2a = (4, 2)$. This is the stretch step, the same scaling from before.",
        add: { comboTwoA: true },
      },
      {
        text: "Then subtract $b$ by adding its opposite $-b = (-1, -3)$ tip to tail from the end of $2a$. This is the subtraction step, the same reversal used earlier.",
        add: { comboNegB: true },
      },
      {
        text: "The result runs from the origin to the final tip: $2a - b = (4 - 1,\\ 2 - 3) = (3, -1)$.",
        add: { comboRes: true },
      },
      {
        text: "Componentwise you can do it in a single line: $2a - b = 2(2, 1) - (1, 3) = (4, 2) - (1, 3) = (3, -1)$. Scale first, then subtract.",
      },
    ],
    practice: "For a combination, scale each vector first, then add or subtract the results componentwise.",
    questions: [
      {
        kind: "choice",
        prompt: "For $a = (2, 1)$, what is $2a$?",
        options: ["$(4, 2)$", "$(2, 1)$", "$(4, 1)$", "$(2, 2)$"],
        answer: 0,
        hint: "Multiply both components of $a$ by $2$.",
        success: "Right: $2(2, 1) = (4, 2)$.",
      },
      {
        kind: "choice",
        prompt: "Compute $3a - 2b$ for $a = (1, 2)$ and $b = (2, 1)$.",
        options: ["$(-1, 4)$", "$(1, 4)$", "$(-1, 8)$", "$(7, 4)$"],
        answer: 0,
        hint: "Scale first: $3a = (3, 6)$ and $2b = (4, 2)$, then subtract componentwise.",
        success: "Yes: $(3, 6) - (4, 2) = (3 - 4,\\ 6 - 2) = (-1, 4)$.",
      },
      {
        kind: "plot",
        prompt: "Let $a = (1, 2)$ and $b = (3, 1)$. Click the tip of $2a - b$.",
        target: { x: -1, y: 3 },
        tolerance: 0.6,
        label: "(-1, 3)",
        hint: "First $2a = (2, 4)$, then subtract $b$: $(2 - 3,\\ 4 - 1)$.",
        success: "Yes: $2a - b = (2 - 3,\\ 4 - 1) = (-1, 3)$.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn: scale and combine vectors",
    mode: "scale",
    params: [kParam(25)],
    baseReveal: { dock: true, showBase: true, showScaled: true },
    beats: [
      {
        text: "Your turn to scale. The $k$ slider multiplies $v = (2, 1)$, and the readout shows $k\\,v = (2k,\\ k)$ updating as $k$ changes.",
      },
      {
        text: "As $k$ grows past $1$, the arrow stretches out along the same line, reaching $(5, 2.5)$ at $k = 2.5$.",
        to: { k: 250 },
        ms: 2000,
      },
      {
        text: "As $k$ turns negative, the arrow flips through the origin to point the other way, landing at $(-3, -1.5)$ when $k = -1.5$.",
        to: { k: -150 },
        ms: 2200,
      },
      {
        text: "It settles at $k = 0.5$, a shrunk copy of $v$ at $(1, 0.5)$, pointing the original way.",
        to: { k: 50 },
        ms: 1600,
      },
    ],
    practice: "Drag the $k$ slider until the readout $k\\,v$ matches each target.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Double the vector: set $k = 2$ so that $k\\,v = (4, 2)$.",
        hint: "You want twice the length in the same direction, so pick the scalar that doubles each component.",
        success: "Yes: $k = 2$ gives $2v = (4, 2)$, stretched to twice the length.",
        check: (value) => Math.abs(value - 200) < 15,
      },
      {
        kind: "manipulate",
        prompt: "Flip the vector: set $k = -1$ so it points the exact opposite way at the same length, $k\\,v = (-2, -1)$.",
        hint: "A scalar of $-1$ keeps the length but reverses the direction.",
        success: "Perfect: $k = -1$ gives $-v = (-2, -1)$, same length, opposite heading.",
        check: (value) => Math.abs(value + 100) < 15,
      },
      {
        kind: "choice",
        prompt: "Compute $2a - b$ for $a = (3, 1)$ and $b = (2, 4)$.",
        options: ["$(4, -2)$", "$(1, -3)$", "$(8, 6)$", "$(4, -3)$"],
        answer: 0,
        hint: "First double $a$ to $(6, 2)$, then subtract $b$ componentwise.",
        success: "Right: $2a - b = (6, 2) - (2, 4) = (4, -2)$.",
      },
    ],
  },
];
