import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Matrices as transformations".
 * Grounded in the lesson: the columns of M are the images of the basis vectors
 * (M i-hat = column 1, M j-hat = column 2); the unit square maps to the
 * parallelogram of the columns; det(M) = ad - bc is the signed area scale factor
 * (zero collapses the square so M is not invertible, negative flips orientation);
 * composition "M then N" is the product NM. Distractors are the classic traps:
 * reading rows instead of columns, adding instead of the matrix-vector product,
 * using the trace as the area factor, dropping the orientation sign, and thinking
 * a rotation changes area. Every determinant and product is verified by hand.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-columns",
      prompt: "For a $2 \\times 2$ matrix $M$, its two columns are:",
      choices: [
        { text: "the images of the basis vectors: column 1 is $M\\hat{\\imath}$ and column 2 is $M\\hat{\\jmath}$", correct: true, explain: "$M\\hat{\\imath} = (a, c)$ is the first column and $M\\hat{\\jmath} = (b, d)$ is the second." },
        { text: "the images of the basis vectors, but placed in the rows", explain: "The images go in the columns, not the rows. The first row is not the image of $\\hat{\\imath}$." },
        { text: "always $(1, 0)$ and $(0, 1)$", explain: "Those are the basis vectors before $M$ acts. Only the identity keeps them." },
        { text: "the eigenvalues of $M$", explain: "Eigenvalues are numbers, not the columns, and are not used here." },
      ],
    },
    {
      id: "c-image-i",
      prompt: "For $M = \\begin{bmatrix} 3 & 1 \\\\ 2 & 4 \\end{bmatrix}$, where does $\\hat{\\imath} = (1, 0)$ land?",
      choices: [
        { text: "$(3, 1)$, the first row", explain: "That is the first row. The image of $\\hat{\\imath}$ is the first column, read top to bottom." },
        { text: "$(3, 2)$, the first column", correct: true, explain: "$M\\hat{\\imath} = (a, c) = (3, 2)$, the first column." },
        { text: "$(1, 4)$, the second column", explain: "That is $M\\hat{\\jmath}$, the image of $\\hat{\\jmath}$, not $\\hat{\\imath}$." },
        { text: "$(2, 3)$", explain: "The first column read top to bottom is $(3, 2)$, not reversed." },
      ],
    },
    {
      id: "c-image-j",
      prompt: "For $M = \\begin{bmatrix} 2 & -1 \\\\ 0 & 3 \\end{bmatrix}$, where does $\\hat{\\jmath} = (0, 1)$ land?",
      choices: [
        { text: "$(2, 0)$, the first column", explain: "That is $M\\hat{\\imath}$. $\\hat{\\jmath}$ maps to the second column." },
        { text: "$(0, 1)$, unchanged", explain: "Only the identity leaves $\\hat{\\jmath}$ fixed. Here $M$ moves it." },
        { text: "$(-1, 3)$, the second column", correct: true, explain: "$M\\hat{\\jmath} = (b, d) = (-1, 3)$, the second column." },
        { text: "$(3, -1)$", explain: "Read the second column top to bottom: $(-1, 3)$, not reversed." },
      ],
    },
    {
      id: "c-matvec",
      prompt: "For $M = \\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix}$, compute $M(1, 1)$.",
      choices: [
        { text: "$(2, 0)$", explain: "That is only column 1. $M(1,1)$ adds both columns." },
        { text: "$(3, 2)$", explain: "The columns are swapped. The result is column 1 plus column 2 $= (2, 3)$." },
        { text: "$(5, 0)$", explain: "That adds $2 + 3$ into the first slot. Keep the components separate." },
        { text: "$(2, 3)$", correct: true, explain: "$M(1,1) = 1\\cdot(2,0) + 1\\cdot(0,3) = (2, 3)$." },
      ],
    },
    {
      id: "c-area-factor",
      prompt: "The unit square has area $1$. After applying $M$, its image has area:",
      choices: [
        { text: "$|\\det(M)|$", correct: true, explain: "The size of the determinant is the area scale factor, and the square starts with area $1$." },
        { text: "$\\det(M)$ exactly, even when it is negative", explain: "Area cannot be negative. Use the absolute value $|\\det|$." },
        { text: "the trace of $M$", explain: "The trace (sum of the diagonal) is not the area factor. The determinant is." },
        { text: "always $1$", explain: "Only transformations with $|\\det| = 1$ preserve area." },
      ],
    },
    {
      id: "c-identity",
      prompt: "Which matrix leaves every vector exactly where it is?",
      choices: [
        { text: "$\\begin{bmatrix} 0 & 0 \\\\ 0 & 0 \\end{bmatrix}$", explain: "The zero matrix sends every vector to the origin." },
        { text: "$\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$", correct: true, explain: "The identity: $\\hat{\\imath} \\to (1,0)$ and $\\hat{\\jmath} \\to (0,1)$, so nothing moves." },
        { text: "$\\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix}$", explain: "That doubles every vector (a scaling), so vectors do move." },
        { text: "$\\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}$", explain: "That swaps the coordinates, a reflection across $y = x$." },
      ],
    },
    {
      id: "c-scaling",
      prompt: "The matrix $\\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix}$ does what to the plane?",
      choices: [
        { text: "Rotates it by $2$ radians", explain: "There is no rotation. Both columns still point along the axes." },
        { text: "Leaves area unchanged", explain: "Its determinant is $4$, not $1$, so area changes." },
        { text: "Doubles every vector, so area grows by a factor of $4$", correct: true, explain: "$\\hat{\\imath} \\to (2,0)$ and $\\hat{\\jmath} \\to (0,2)$. $\\det = 4$, so area scales by $4$." },
        { text: "Doubles area but leaves lengths the same", explain: "Lengths double too. That is why area grows by $2^2 = 4$." },
      ],
    },
    {
      id: "c-rotation-i",
      prompt: "The rotation $\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$ sends $\\hat{\\imath} = (1, 0)$ to:",
      choices: [
        { text: "$(1, 0)$, unchanged", explain: "This matrix turns $\\hat{\\imath}$. It does not leave it fixed." },
        { text: "$(-1, 0)$", explain: "That is where $\\hat{\\jmath}$ goes (the second column). $\\hat{\\imath}$ goes to the first column." },
        { text: "$(0, -1)$", explain: "That would be a clockwise quarter turn. This matrix turns counterclockwise." },
        { text: "$(0, 1)$", correct: true, explain: "The first column is $(0, 1)$: a quarter turn counterclockwise." },
      ],
    },
    {
      id: "c-shear-area",
      prompt: "A shear $\\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$ tilts the unit square. What happens to its area?",
      choices: [
        { text: "It stays $1$, since $\\det = (1)(1) - (1)(0) = 1$", correct: true, explain: "A shear slides one edge but keeps the base and height, so $\\det = 1$ and area is unchanged." },
        { text: "It doubles", explain: "$\\det = 1$, not $2$. A shear preserves area." },
        { text: "It drops to $0$", explain: "The two columns are not parallel, so the square does not collapse." },
        { text: "It grows with the amount of shear", explain: "Area depends on $\\det$, which is $1$ regardless of how far the shear pushes." },
      ],
    },
    {
      id: "c-reflection-det",
      prompt: "The reflection across the $x$-axis, $\\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix}$, has determinant:",
      choices: [
        { text: "$1$", explain: "The size is $1$ (area is preserved), but the sign is negative for a reflection." },
        { text: "$-1$", correct: true, explain: "$\\det = (1)(-1) - (0)(0) = -1$. The negative sign marks the orientation flip." },
        { text: "$0$", explain: "$\\det = 0$ would collapse the square. A reflection keeps full area." },
        { text: "$2$", explain: "Recompute: $(1)(-1) - (0)(0) = -1$." },
      ],
    },
    {
      id: "c-det-zero",
      prompt: "If $\\det(M) = 0$, then $M$:",
      choices: [
        { text: "rotates the plane", explain: "Rotations have $\\det = 1$, never $0$." },
        { text: "doubles every area", explain: "$\\det = 0$ means zero area, not doubled." },
        { text: "collapses the plane onto a line or point and has no inverse", correct: true, explain: "Zero determinant means the image is flattened, and a flattened shape cannot be reversed." },
        { text: "is the identity", explain: "The identity has $\\det = 1$." },
      ],
    },
    {
      id: "c-compute-det",
      prompt: "Compute $\\det \\begin{bmatrix} 3 & 1 \\\\ 2 & 4 \\end{bmatrix}$.",
      choices: [
        { text: "$14$", explain: "That adds: $(3)(4) + (1)(2)$. The determinant subtracts: $ad - bc$." },
        { text: "$12$", explain: "That is only $(3)(4)$. You must subtract $(1)(2)$." },
        { text: "$-10$", explain: "Watch the order: $ad - bc = 12 - 2 = 10$, which is positive." },
        { text: "$10$", correct: true, explain: "$(3)(4) - (1)(2) = 12 - 2 = 10$." },
      ],
    },
    {
      id: "c-fourth-vertex",
      prompt: "Under $M = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$ the unit square maps to a parallelogram whose corners are $(0, 0)$, $(a, c)$, $(b, d)$ and one more. The fourth corner is:",
      choices: [
        { text: "$(a + b, c + d)$", correct: true, explain: "The corner $(1, 1)$ maps to column 1 plus column 2 $= (a + b, c + d)$." },
        { text: "$(ab, cd)$", explain: "Entries multiply only inside the matrix-vector product. The far corner is the sum of the two columns." },
        { text: "$(a - b, c - d)$", explain: "The far corner is the sum of the columns, not their difference." },
        { text: "$(a, d)$", explain: "That mixes one entry from each column. The corner is $(a + b, c + d)$." },
      ],
    },
    {
      id: "c-reflect-yx",
      prompt: "The reflection across $y = x$ is $\\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}$. Where does $\\hat{\\imath} = (1, 0)$ go?",
      choices: [
        { text: "$(1, 0)$, unchanged", explain: "Here $\\hat{\\imath}$ swaps with $\\hat{\\jmath}$. It is not fixed." },
        { text: "$(0, 1)$", correct: true, explain: "The first column is $(0, 1)$: the reflection swaps the coordinates." },
        { text: "$(-1, 0)$", explain: "That would be a rotation. The swap sends $\\hat{\\imath}$ to $(0, 1)$." },
        { text: "$(0, -1)$", explain: "No sign change happens. The swap gives $(0, 1)$." },
      ],
    },
    {
      id: "c-rows-vs-cols",
      prompt: "To read where $\\hat{\\imath}$ lands, you look at $M$'s:",
      choices: [
        { text: "first row, left to right", explain: "The rows are not the images. Use the first column for $\\hat{\\imath}$." },
        { text: "diagonal", explain: "The diagonal alone does not give the image of $\\hat{\\imath}$." },
        { text: "first column, top to bottom", correct: true, explain: "$M\\hat{\\imath} = (a, c)$ is exactly the first column." },
        { text: "determinant", explain: "The determinant is a single number, not a vector image." },
      ],
    },
  ],
  summit: [
    {
      id: "s-matvec",
      prompt: "For $M = \\begin{bmatrix} 3 & 1 \\\\ 0 & 2 \\end{bmatrix}$, compute $M(2, 1)$.",
      choices: [
        { text: "$(6, 2)$", explain: "The top needs the $+ (1)(1)$ term: $(3)(2) + (1)(1) = 7$." },
        { text: "$(7, 4)$", explain: "The bottom is $(0)(2) + (2)(1) = 2$, not $4$." },
        { text: "$(5, 3)$", explain: "That adds entries. Weight each row by the vector instead." },
        { text: "$(7, 2)$", correct: true, explain: "$((3)(2) + (1)(1),\\ (0)(2) + (2)(1)) = (7, 2)$." },
      ],
    },
    {
      id: "s-area-scale",
      prompt: "A triangle has area $5$. After applying $M$ with $\\det(M) = 3$, the image area is:",
      choices: [
        { text: "$15$", correct: true, explain: "Every area scales by $|\\det| = 3$, so $5 \\times 3 = 15$." },
        { text: "$8$", explain: "Areas multiply by $|\\det|$, they do not add: use $5 \\times 3$, not $5 + 3$." },
        { text: "$5$", explain: "Area is unchanged only when $|\\det| = 1$." },
        { text: "$45$", explain: "That is $5 \\times 9$. The factor is $|\\det| = 3$, not $3^2$." },
      ],
    },
    {
      id: "s-image-i",
      prompt: "For $M = \\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix}$, the image of $\\hat{\\imath} = (1, 0)$ is:",
      choices: [
        { text: "$(2, 0)$, the first column", correct: true, explain: "A matrix sends $\\hat{\\imath}$ to its first column. Here that column is $(2, 0)$." },
        { text: "$(0, 3)$", explain: "That is the second column, the image of $\\hat{\\jmath}$." },
        { text: "$(2, 3)$", explain: "That mixes both columns. $\\hat{\\imath}$ uses only the first column." },
        { text: "$(1, 0)$", explain: "The first column is $(2, 0)$, not the original $\\hat{\\imath}$." },
      ],
    },
    {
      id: "s-orientation",
      prompt: "$M$ has $\\det(M) = -4$. Which statement is true?",
      choices: [
        { text: "Area scales by $-4$", explain: "Area cannot be negative. The factor is $|\\det| = 4$." },
        { text: "The square collapses", explain: "Only $\\det = 0$ collapses it. $-4$ keeps full area." },
        { text: "Area scales by $4$ and orientation flips", correct: true, explain: "The size $4$ scales area, and the negative sign flips orientation (a reflection is involved)." },
        { text: "Nothing changes", explain: "$\\det = -4$ both scales area by $4$ and flips orientation." },
      ],
    },
    {
      id: "s-find-scale",
      prompt: "Which matrix scales $x$ by $2$ and $y$ by $3$, so that $(1, 1) \\to (2, 3)$?",
      choices: [
        { text: "$\\begin{bmatrix} 3 & 0 \\\\ 0 & 2 \\end{bmatrix}$", explain: "That scales $x$ by $3$ and $y$ by $2$, sending $(1,1)$ to $(3, 2)$." },
        { text: "$\\begin{bmatrix} 2 & 3 \\\\ 0 & 0 \\end{bmatrix}$", explain: "The bottom row of zeros collapses everything onto the $x$-axis." },
        { text: "$\\begin{bmatrix} 2 & 0 \\\\ 3 & 0 \\end{bmatrix}$", explain: "Column 2 is $(0,0)$, so $\\hat{\\jmath}$ collapses. That is not a clean $x, y$ scaling." },
        { text: "$\\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix}$", correct: true, explain: "Columns $(2,0)$ and $(0,3)$ scale $x$ by $2$ and $y$ by $3$, so $(1,1) \\to (2,3)$." },
      ],
    },
    {
      id: "s-not-invertible",
      prompt: "For which matrix does $M$ fail to have an inverse?",
      choices: [
        { text: "$\\begin{bmatrix} 2 & 1 \\\\ 4 & 2 \\end{bmatrix}$", correct: true, explain: "$\\det = (2)(2) - (1)(4) = 0$, so it collapses the plane and has no inverse." },
        { text: "$\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$", explain: "$\\det = 1 \\neq 0$. The identity is invertible." },
        { text: "$\\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix}$", explain: "$\\det = 6 \\neq 0$. It is invertible." },
        { text: "$\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$", explain: "$\\det = 1 \\neq 0$. A rotation is invertible." },
      ],
    },
    {
      id: "s-rows-trap",
      prompt: "A student says $M = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$ sends $\\hat{\\imath}$ to $(1, 2)$. What went wrong?",
      choices: [
        { text: "Nothing, $(1, 2)$ is correct", explain: "$(1, 2)$ is the first row. The image of $\\hat{\\imath}$ is the first column $(1, 3)$." },
        { text: "They read the first row. $\\hat{\\imath}$ goes to the first column $(1, 3)$", correct: true, explain: "$M\\hat{\\imath} = (a, c) = (1, 3)$, read down the first column." },
        { text: "$\\hat{\\imath}$ goes to $(2, 4)$", explain: "That is the second column, the image of $\\hat{\\jmath}$." },
        { text: "$\\hat{\\imath}$ goes to $(1, 2)$ only after scaling", explain: "No scaling fixes this. The image of $\\hat{\\imath}$ is the first column $(1, 3)$." },
      ],
    },
    {
      id: "s-add-trap",
      prompt: "For $M = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$ and $v = (1, 1)$, what is $Mv$?",
      choices: [
        { text: "$(2, 2)$, by adding $v$ to itself", explain: "That ignores $M$. You must combine each row of $M$ with $v$." },
        { text: "$(3, 4)$, the second column only", explain: "You need both columns: $(1,3) + (2,4) = (3, 7)$." },
        { text: "$(3, 7)$", correct: true, explain: "$((1)(1) + (2)(1),\\ (3)(1) + (4)(1)) = (3, 7)$." },
        { text: "$(4, 6)$", explain: "Recompute: $(1 + 2,\\ 3 + 4) = (3, 7)$." },
      ],
    },
    {
      id: "s-trace-trap",
      prompt: "$M = \\begin{bmatrix} 4 & 0 \\\\ 0 & 1 \\end{bmatrix}$. By what factor does area scale?",
      choices: [
        { text: "$5$, the sum $4 + 1$", explain: "$5$ is the trace (sum of the diagonal). The area factor is the determinant." },
        { text: "$1$", explain: "Only $|\\det| = 1$ preserves area. Here $\\det = 4$." },
        { text: "$16$", explain: "That is $4^2$. The factor is $\\det = 4$, not squared." },
        { text: "$4$, since $|\\det| = (4)(1) - (0)(0) = 4$", correct: true, explain: "The determinant is $4$, so every area is multiplied by $4$." },
      ],
    },
    {
      id: "s-rotation-area",
      prompt: "A rotation has determinant $1$ for every angle. What does that say about area?",
      choices: [
        { text: "Area is unchanged. A rotation only turns the plane", correct: true, explain: "$|\\det| = 1$, so a rotation preserves every area and just changes direction." },
        { text: "Area grows with the angle", explain: "A rotation's determinant is always $1$, independent of the angle." },
        { text: "Area shrinks to $0$ at $90^\\circ$", explain: "A $90^\\circ$ rotation still has $\\det = 1$. Nothing collapses." },
        { text: "Area doubles at $180^\\circ$", explain: "A $180^\\circ$ rotation is $\\begin{bmatrix} -1 & 0 \\\\ 0 & -1 \\end{bmatrix}$ with $\\det = 1$. Area is unchanged." },
      ],
    },
    {
      id: "s-det-area-pair",
      prompt: "For $M = \\begin{bmatrix} 2 & 3 \\\\ 1 & 4 \\end{bmatrix}$, the determinant and the area factor are:",
      choices: [
        { text: "$\\det = 11$, area factor $11$", explain: "That adds: $(2)(4) + (3)(1)$. The determinant subtracts." },
        { text: "$\\det = 5$, area factor $5$", correct: true, explain: "$(2)(4) - (3)(1) = 8 - 3 = 5$, and the area factor is $|5| = 5$." },
        { text: "$\\det = -5$, area factor $5$", explain: "Order matters: $ad - bc = 8 - 3 = +5$." },
        { text: "$\\det = 5$, area factor $0$", explain: "The area factor is $|\\det| = 5$, not $0$." },
      ],
    },
    {
      id: "s-det-of-scale",
      prompt: "The matrix $S = \\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix}$ scales the unit square by $2$ in each direction. Its determinant is:",
      choices: [
        { text: "$4$", correct: true, explain: "$\\det S = (2)(2) - (0)(0) = 4$, so area scales by $4$." },
        { text: "$2$", explain: "That is the scale factor on each axis. Area uses the product: $\\det = 4$." },
        { text: "$0$", explain: "The columns $(2, 0)$ and $(0, 2)$ are not parallel, so the square does not collapse." },
        { text: "$-4$", explain: "Both diagonal entries are positive, so $\\det = 4 > 0$ and orientation is preserved." },
      ],
    },
    {
      id: "s-find-columns",
      prompt: "You want $\\hat{\\imath}$ to land on $(5, 2)$ while $\\hat{\\jmath}$ stays at $(0, 1)$. Which matrix works?",
      choices: [
        { text: "$\\begin{bmatrix} 5 & 2 \\\\ 0 & 1 \\end{bmatrix}$", explain: "That puts $(5, 2)$ in the first row. The image of $\\hat{\\imath}$ must be the first column." },
        { text: "$\\begin{bmatrix} 5 & 0 \\\\ 0 & 2 \\end{bmatrix}$", explain: "This sends $\\hat{\\imath}$ to $(5, 0)$, not $(5, 2)$." },
        { text: "$\\begin{bmatrix} 1 & 0 \\\\ 2 & 5 \\end{bmatrix}$", explain: "Its first column is $(1, 2)$, so $\\hat{\\imath}$ would land at $(1, 2)$." },
        { text: "$\\begin{bmatrix} 5 & 0 \\\\ 2 & 1 \\end{bmatrix}$", correct: true, explain: "Column 1 $= (5, 2)$ is the image of $\\hat{\\imath}$ and column 2 $= (0, 1)$ is the image of $\\hat{\\jmath}$." },
      ],
    },
    {
      id: "s-reflect-id",
      prompt: "$M = \\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}$ swaps $x$ and $y$, and $\\det(M) = -1$. Geometrically $M$ is a:",
      choices: [
        { text: "reflection across $y = x$ (area preserved, orientation flipped)", correct: true, explain: "The swap mirrors the plane across $y = x$. $|\\det| = 1$ keeps area, and the minus sign flips orientation." },
        { text: "rotation by $90^\\circ$ (orientation kept)", explain: "A rotation has $\\det = +1$. This has $\\det = -1$, so it flips orientation." },
        { text: "scaling that doubles area", explain: "$|\\det| = 1$, so area is unchanged." },
        { text: "collapse onto a line", explain: "$\\det \\neq 0$, so nothing collapses." },
      ],
    },
    {
      id: "s-capstone",
      prompt: "$M = \\begin{bmatrix} 0 & -2 \\\\ 2 & 0 \\end{bmatrix}$. What does $M$ do to the unit square?",
      choices: [
        { text: "Reflects and scales. Orientation flips", explain: "$\\det = (0)(0) - (-2)(2) = 4 > 0$, so orientation is preserved, not flipped." },
        { text: "Scales by $2$ and rotates $90^\\circ$ counterclockwise. Area becomes $4$, orientation preserved", correct: true, explain: "Columns $(0, 2)$ and $(-2, 0)$ double each basis vector and turn it a quarter turn. $\\det = 4$." },
        { text: "Collapses it to a line", explain: "$\\det = 4 \\neq 0$, so the square keeps full (larger) area." },
        { text: "Leaves the area unchanged", explain: "$\\det = 4$, so area is multiplied by $4$." },
      ],
    },
  ],
};
