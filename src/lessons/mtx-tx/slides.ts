import type { ParamSpec, Slide } from "../types";

/**
 * One matrix-entry slider. Entries are small integers in [-3, 3]; the figure
 * reads them directly as world coordinates (SCALE 1), so a clean integer like
 * a = 2 lands exactly on a grid line and every named example is reachable.
 */
const entry = (key: string, label: string, start: number): ParamSpec => ({
  key,
  label,
  min: -3,
  max: 3,
  start,
  step: 1,
  format: (v) => `${key} = ${Math.round(v)}`,
});

/** Slide 2 starts at the identity, then animates through named examples. */
const mapParams: ParamSpec[] = [
  entry("a", "a (top-left)", 1),
  entry("b", "b (top-right)", 0),
  entry("c", "c (bottom-left)", 0),
  entry("d", "d (bottom-right)", 1),
];

/** Slide 3 starts at [[2,0],[0,3]] (det 6), then animates det to 0 and negative. */
const detParams: ParamSpec[] = [
  entry("a", "a (top-left)", 2),
  entry("b", "b (top-right)", 0),
  entry("c", "c (bottom-left)", 0),
  entry("d", "d (bottom-right)", 3),
];

/** Slide 4 starts at the scaling [[2,0],[0,2]] (det 4), off the det = 0 answer. */
const tryParams: ParamSpec[] = [
  entry("a", "a (top-left)", 2),
  entry("b", "b (top-right)", 0),
  entry("c", "c (bottom-left)", 0),
  entry("d", "d (bottom-right)", 2),
];

export const slides: Slide[] = [
  {
    id: "columns-are-images",
    title: "What do the columns of a matrix show?",
    mode: "cols",
    hideSliders: true,
    baseReveal: { basis: true },
    beats: [
      {
        text: "A matrix times a vector is the row-times-column product. A $2 \\times 2$ matrix $M$ is a **transformation** of the plane: applying it to $v$ produces the new vector $Mv$, and the two columns of $M$ are the images of the basis vectors $\\hat{\\imath} = (1, 0)$ and $\\hat{\\jmath} = (0, 1)$.",
      },
      {
        text: "Apply $M$ to $\\hat{\\imath} = (1, 0)$. By the matrix-vector rule, $M\\hat{\\imath} = (a\\cdot 1 + b\\cdot 0,\\ c\\cdot 1 + d\\cdot 0) = (a, c)$, which is exactly the **first column** of $M$. For $M = \\begin{bmatrix} 3 & 2 \\\\ 1 & 2 \\end{bmatrix}$, the first column is $(3, 1)$, so the bold arrow shows $\\hat{\\imath}$ landing at $(3, 1)$.",
        add: { col1: true },
      },
      {
        text: "Now apply $M$ to $\\hat{\\jmath} = (0, 1)$: $M\\hat{\\jmath} = (a\\cdot 0 + b\\cdot 1,\\ c\\cdot 0 + d\\cdot 1) = (b, d)$, the **second column**. Here that is $(2, 2)$, so the second bold arrow shows $\\hat{\\jmath}$ landing at $(2, 2)$.",
        add: { col2: true },
      },
      {
        text: "So the two columns of $M$ are the images of the basis vectors: column 1 is where $\\hat{\\imath}$ goes and column 2 is where $\\hat{\\jmath}$ goes. Make sure you read the **columns**, not the rows, since the first row is $(3, 2)$ while $\\hat{\\imath}$ lands at the first column $(3, 1)$. Reading the two columns determines the entire transformation.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "For the matrix on screen, $M = \\begin{bmatrix} 3 & 2 \\\\ 1 & 2 \\end{bmatrix}$, where does $\\hat{\\imath} = (1, 0)$ land?",
        options: ["$(3, 1)$", "$(3, 2)$", "$(2, 2)$", "$(1, 0)$"],
        answer: 0,
        hint: "The image of $\\hat{\\imath}$ is the first column of $M$, read top to bottom: $(a, c)$.",
        success: "Yes: $M\\hat{\\imath} = (a, c) = (3, 1)$, the first column.",
      },
      {
        kind: "choice",
        prompt: "To find where $\\hat{\\jmath} = (0, 1)$ lands, which part of $M$ do you read?",
        options: [
          "The second column, top to bottom",
          "The second row, left to right",
          "The first column",
          "The determinant",
        ],
        answer: 0,
        hint: "Basis vectors map to columns. $\\hat{\\jmath}$ is the second basis vector, so use the second column.",
        success: "Right: $M\\hat{\\jmath} = (b, d)$ is the second column, read top to bottom.",
      },
    ],
  },
  {
    id: "unit-square-maps",
    title: "The unit square becomes a parallelogram",
    mode: "map",
    hideSliders: true,
    params: mapParams,
    baseReveal: { basis: true, col1: true, col2: true, para: true },
    beats: [
      {
        text: "The two basis vectors span the **unit square** of area $1$, and under $M$ that square maps to the parallelogram of the two columns. Right now $M$ is the identity, so the shaded region still is on the square.",
      },
      {
        text: "First a **scaling**. As $M$ becomes $\\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix}$, every vector doubles: $\\hat{\\imath}$ moves to $(2, 0)$ and $\\hat{\\jmath}$ to $(0, 2)$. The square grows into a $2$ by $2$ square, so its area becomes $4$.",
        to: { a: 2, b: 0, c: 0, d: 2 },
        ms: 2200,
      },
      {
        text: "Next a **rotation**. As $M$ becomes $\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$, the square turns a quarter turn counterclockwise, with $\\hat{\\imath}$ moving to the first column $(0, 1)$ and $\\hat{\\jmath}$ to the second column $(-1, 0)$. The shape and its area stay the same, and only the direction has turned.",
        to: { a: 0, b: -1, c: 1, d: 0 },
        ms: 2400,
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "The scaling $\\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix}$ doubles every vector. By what factor does the unit square's area grow?",
        options: ["$4$", "$2$", "$8$", "$1$"],
        answer: 0,
        hint: "The image is a $2$ by $2$ square. Area is length times width.",
        success: "Yes: a $2$ by $2$ square has area $2 \\times 2 = 4$, so the area grows by a factor of $4$.",
      },
    ],
  },
  {
    id: "unit-square-shear",
    title: "A shear maps the unit square",
    mode: "map",
    hideSliders: true,
    params: mapParams,
    baseReveal: { basis: true, col1: true, col2: true, para: true },
    beats: [
      {
        text: "Now a **shear**. As $M$ becomes $\\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$, the bottom edge stays fixed while the top edge shifts to the right: $\\hat{\\imath}$ stays at $(1, 0)$ and $\\hat{\\jmath}$ moves to $(1, 1)$. The square leans into a slanted parallelogram, yet its area is still $1$.",
        to: { a: 1, b: 1, c: 0, d: 1 },
        ms: 2400,
      },
      {
        text: "Each column showed where one basis vector went, and together the two columns built the parallelogram. Scaling grew it, the rotation turned it, and the shear tilted it, but in every case the columns are the two edges meeting at the origin.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "The shear $\\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$ sends $\\hat{\\jmath} = (0, 1)$ to which point?",
        options: ["$(1, 1)$", "$(0, 1)$", "$(1, 0)$", "$(2, 1)$"],
        answer: 0,
        hint: "The image of $\\hat{\\jmath}$ is the second column $(b, d)$.",
        success: "Right: the second column is $(1, 1)$, so $\\hat{\\jmath}$ lands at $(1, 1)$.",
      },
    ],
  },
  {
    id: "determinant-area",
    title: "Why the determinant is the area factor",
    mode: "det",
    hideSliders: true,
    params: detParams,
    baseReveal: { basis: true, col1: true, col2: true, para: true },
    beats: [
      {
        text: "Start with $M = \\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix}$: $\\det = 6$, and the unit square of area $1$ becomes a $2$ by $3$ rectangle of area $6$.",
      },
      {
        text: "The case $\\det = 0$ is special. As $d$ falls to $0$, $M$ becomes $\\begin{bmatrix} 2 & 0 \\\\ 0 & 0 \\end{bmatrix}$: the second column shrinks to the zero vector, so $\\det = (2)(0) - (0)(0) = 0$. The square collapses onto a line and its area drops to $0$, so the transformation cannot be reversed and $M$ has no inverse.",
        to: { a: 2, b: 0, c: 0, d: 0 },
        ms: 2400,
      },
      {
        text: "A **negative** determinant flips orientation. As $M$ becomes $\\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix}$, $\\det = (1)(-1) - (0)(0) = -1$. The area factor is the size $|-1| = 1$, so the square keeps its area, but the minus sign means it was mirrored: this is a reflection across the $x$-axis.",
        to: { a: 1, b: 0, c: 0, d: -1 },
        ms: 2400,
      },
      {
        text: "So the determinant reports three things at once. Its size $|\\det|$ is the area factor, $\\det = 0$ means the square collapsed and $M$ is not invertible, and a negative $\\det$ means orientation flipped, which is a reflection.",
      },
    ],
    practice: "",
    questions: [
      {
        kind: "choice",
        prompt: "The matrix $\\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix}$ has $\\det = 6$. The unit square maps to a region of area:",
        options: ["$6$", "$5$", "$1$", "$0$"],
        answer: 0,
        hint: "The area factor is the size of the determinant, $|\\det|$.",
        success: "Yes: $|\\det| = 6$, so the unit square (area $1$) becomes area $6$.",
      },
      {
        kind: "choice",
        prompt: "If $\\det(M) = 0$, the unit square is mapped to:",
        options: [
          "a line or a point (zero area), so $M$ has no inverse",
          "a larger square",
          "the same square",
          "a rotated square of area $1$",
        ],
        answer: 0,
        hint: "Zero area means the two columns line up, so the square is flattened.",
        success: "Right: $\\det = 0$ flattens the square onto a line (zero area), and that cannot be reversed, so $M$ has no inverse.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn: read a matrix transformation",
    mode: "try",
    params: tryParams,
    baseReveal: { basis: true, col1: true, col2: true, para: true },
    beats: [
      {
        text: "The starting matrix is $M = \\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix}$, a scaling with $\\det = (2)(2) - (0)(0) = 4$, so the shaded square has area $4$.",
      },
      {
        text: "As the entry $a$ falls to $0$, the first column $(a, c)$ collapses onto the origin, the parallelogram flattens onto a line, and $\\det = (0)(2) - (0)(0) = 0$.",
        to: { a: 0, b: 0, c: 0, d: 2 },
        ms: 2200,
      },
      {
        text: "As $a$ returns to $2$, the square fills back out and $\\det$ climbs back to $4$.",
        to: { a: 2, b: 0, c: 0, d: 2 },
        ms: 1800,
      },
    ],
    practice: "Change $a$, $b$, $c$, and $d$ until $\\det(M) = 0$.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Starting from the scaling $M = \\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix}$, change the entries until $\\det(M) = 0$, so the unit square collapses onto a line.",
        hint: "$\\det = ad - bc$. Since $b = 0$ and $c = 0$ to start, $\\det = ad$. Slide $a$ down to $0$ (or $d$ down to $0$) and the determinant becomes $0$.",
        success: "Yes: with $\\det = 0$ the image has zero area, so the square is squashed onto a line (or a point). A squashed shape cannot be reversed, so $M$ has no inverse.",
        check: (_value, values) =>
          Math.abs((values.a ?? 0) * (values.d ?? 0) - (values.b ?? 0) * (values.c ?? 0)) < 0.5,
      },
      {
        kind: "choice",
        prompt: "Starting from $\\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix}$, you increase the entry $b$. Which arrow moves?",
        options: [
          "$M\\hat{\\imath}$, the image of $\\hat{\\imath}$",
          "Neither arrow. $b$ does nothing",
          "$M\\hat{\\jmath}$, the image of $\\hat{\\jmath}$, since $\\hat{\\jmath}$ maps to column 2 $= (b, d)$",
          "Both basis arrows $\\hat{\\imath}$ and $\\hat{\\jmath}$",
        ],
        answer: 2,
        hint: "The entry $b$ is the top of the second column $(b, d)$, and column 2 is where $\\hat{\\jmath}$ lands.",
        success: "Right: $b$ is in column 2 $= (b, d)$, the image of $\\hat{\\jmath}$, so raising $b$ moves the $M\\hat{\\jmath}$ arrow to the right.",
      },
      {
        kind: "choice",
        prompt: "You set $M = \\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix}$. By what factor does the area of the unit square scale?",
        options: [
          "$5$, the sum $2 + 3$ along the diagonal",
          "$6$, since $\\det = (2)(3) - (0)(0) = 6$",
          "$1$, area never changes",
          "$0$, the square collapses",
        ],
        answer: 1,
        hint: "The area factor is $|\\det(M)|$, not the sum of the diagonal entries. Compute $\\det = ad - bc$.",
        success: "Yes: $\\det = (2)(3) - (0)(0) = 6$, so every area is multiplied by $6$. The sum $2 + 3 = 5$ is the trace, not the area factor.",
      },
    ],
  },
];
