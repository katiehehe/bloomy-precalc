import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Three-variable systems". Grounded in
 * the lesson: a system becomes an augmented matrix [A | b]; the three legal
 * elementary row operations (swap rows, scale a row by a nonzero number, add a
 * multiple of one row to another) preserve the solution; elimination clears each
 * column below its pivot; back-substitution reads the triple from the bottom up; a
 * row [0 0 0 | k] with k nonzero means no solution, and [0 0 0 | 0] means
 * infinitely many. Distractors are the classic traps: adding a constant to a row,
 * multiplying by zero, misreading the solution order, sign slips in elimination and
 * back-substitution, and reading constants as the answer. Every triple is verified
 * by hand.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-legal",
      prompt: "Which of the following is a legal elementary row operation?",
      choices: [
        { text: "Add $3$ to every entry of $R_2$.", explain: "Adding a constant to each entry is not one of the three moves; it changes that equation and the solution." },
        { text: "Replace $R_2$ with $R_2 - 3R_1$.", correct: true, explain: "Adding a multiple of one row to another is move (3), and it keeps the solution unchanged." },
        { text: "Multiply $R_2$ by $0$.", explain: "Scaling must use a nonzero number; multiplying by $0$ wipes out the row and loses information." },
        { text: "Swap columns 2 and 3.", explain: "Row operations act on rows; swapping columns would reorder the variables." },
      ],
    },
    {
      id: "c-illegal",
      prompt: "Which operation is NOT allowed, because it can change the solution set?",
      choices: [
        { text: "Swap two rows.", explain: "Swapping rows just reorders equations, so it is legal." },
        { text: "Multiply a row by $-\\tfrac{1}{2}$.", explain: "Scaling by any nonzero number is legal, and $-\\tfrac{1}{2} \\neq 0$." },
        { text: "Multiply a row by $0$.", correct: true, explain: "Zero is not allowed: it turns the row into $0 = 0$ and throws away that equation." },
        { text: "Add twice one row to another row.", explain: "Adding a multiple of one row to another is move (3), so it is legal." },
      ],
    },
    {
      id: "c-augment-2var",
      prompt: "The augmented matrix for $\\begin{cases} 2x + 3y = 5 \\\\ x - y = 1 \\end{cases}$ is:",
      choices: [
        { text: "$\\left[\\begin{array}{cc|c} 2 & 3 & 5 \\\\ 1 & -1 & 1 \\end{array}\\right]$", correct: true, explain: "Each row lists the $x$ and $y$ coefficients, then the constant after the bar." },
        { text: "$\\left[\\begin{array}{cc|c} 5 & 2 & 3 \\\\ 1 & 1 & -1 \\end{array}\\right]$", explain: "This puts the constants first; the constant belongs to the right of the bar." },
        { text: "$\\left[\\begin{array}{cc|c} 2 & 3 & 5 \\\\ 1 & 1 & 1 \\end{array}\\right]$", explain: "The second equation is $x - y = 1$, so the $y$ coefficient is $-1$, not $1$." },
        { text: "$\\left[\\begin{array}{cc|c} 2 & 1 & 5 \\\\ 3 & -1 & 1 \\end{array}\\right]$", explain: "The columns are scrambled; column 1 must hold every $x$ coefficient and column 2 every $y$ coefficient." },
      ],
    },
    {
      id: "c-bar-meaning",
      prompt: "In an augmented matrix $[A \\mid b]$, the numbers to the right of the vertical bar are:",
      choices: [
        { text: "the coefficients of $x$.", explain: "Those live in the first column, to the left of the bar." },
        { text: "the constants from the right-hand side of each equation.", correct: true, explain: "The bar marks the equals signs; the right column holds each equation's constant." },
        { text: "the solutions $x$, $y$, $z$.", explain: "You have to solve for those; they are not written in the matrix yet." },
        { text: "the coefficients of the last variable.", explain: "Those sit in the last column left of the bar, not right of it." },
      ],
    },
    {
      id: "c-read-2var",
      prompt: "$\\left[\\begin{array}{cc|c} 1 & 2 & 7 \\\\ 0 & 1 & 3 \\end{array}\\right]$ corresponds to which solution $(x, y)$?",
      choices: [
        { text: "$(7, 3)$", explain: "Those are the constants; you still have to back-substitute to get $x$." },
        { text: "$(13, 3)$", explain: "Sign slip: $x + 2(3) = 7$ gives $x = 7 - 6 = 1$, not $7 + 6$." },
        { text: "$(1, 3)$", correct: true, explain: "Row 2 gives $y = 3$; then $x + 2(3) = 7$, so $x = 1$." },
        { text: "$(3, 1)$", explain: "That reverses the pair; row 2 says $y = 3$, so $x$ is the $1$." },
      ],
    },
    {
      id: "c-elim-2var",
      prompt: "Apply $R_2 \\to R_2 - 3R_1$ to $\\left[\\begin{array}{cc|c} 1 & 2 & 7 \\\\ 3 & 5 & 20 \\end{array}\\right]$. The new $R_2$ is:",
      choices: [
        { text: "$(6, 11 \\mid 41)$", explain: "That is $R_2 + 3R_1$; the operation subtracts, it does not add." },
        { text: "$(0, -1 \\mid 1)$", explain: "Sign slip on the constant: $20 - 21 = -1$, not $+1$." },
        { text: "$(0, -1 \\mid -1)$", correct: true, explain: "$(3-3,\\ 5-6,\\ 20-21) = (0, -1 \\mid -1)$." },
        { text: "$(0, 1 \\mid 1)$", explain: "Check the middle and last: $5 - 6 = -1$ and $20 - 21 = -1$." },
      ],
    },
    {
      id: "c-read-3var",
      prompt: "$\\left[\\begin{array}{ccc|c} 1 & 0 & 0 & 2 \\\\ 0 & 1 & 0 & -3 \\\\ 0 & 0 & 1 & 5 \\end{array}\\right]$ gives $(x, y, z) = $?",
      choices: [
        { text: "$(2, 3, 5)$", explain: "Row 2 is $y = -3$; keep the negative sign." },
        { text: "$(5, -3, 2)$", explain: "That reverses the order; column 1 is $x$, so $x = 2$." },
        { text: "$(2, -3, 5)$", correct: true, explain: "Each row already isolates one variable: $x = 2$, $y = -3$, $z = 5$." },
        { text: "$(-3, 2, 5)$", explain: "The first two are swapped; row 1 gives $x = 2$." },
      ],
    },
    {
      id: "c-choose-multiple",
      prompt: "The pivot row starts with $1$, and $R_3$ starts with $4$ in the same column. Which step makes that $4$ into $0$?",
      choices: [
        { text: "$R_3 \\to R_3 - 4R_1$", correct: true, explain: "$4 - 4\\cdot 1 = 0$, so subtracting four times the pivot row clears it." },
        { text: "$R_3 \\to R_3 + 4R_1$", explain: "Adding gives $4 + 4 = 8$; you need to subtract to cancel." },
        { text: "$R_3 \\to 4R_3 - R_1$", explain: "That gives $4\\cdot 4 - 1 = 15$ in the first column, not $0$." },
        { text: "$R_3 \\to R_3 - R_1$", explain: "That gives $4 - 1 = 3$; you must subtract four copies, not one." },
      ],
    },
    {
      id: "c-goal",
      prompt: "What is the goal of elimination on $[A \\mid b]$?",
      choices: [
        { text: "Make every entry $0$.", explain: "An all-zero matrix throws away the equations; you would lose the solution." },
        { text: "Reach a triangular form with leading $1$s so each variable can be found by back-substitution.", correct: true, explain: "Triangular form isolates the variables one row at a time." },
        { text: "Turn the constants column into all $1$s.", explain: "The constants are whatever the arithmetic gives; forcing them to $1$ is not the aim." },
        { text: "Make the matrix symmetric.", explain: "Symmetry is unrelated to solving; the aim is a triangular, readable form." },
      ],
    },
    {
      id: "c-no-solution",
      prompt: "A system reduces to a row $\\left[\\begin{array}{ccc|c} 0 & 0 & 0 & 7 \\end{array}\\right]$. What does it tell you?",
      choices: [
        { text: "Infinitely many solutions.", explain: "That is the all-zero row $[0\\,0\\,0 \\mid 0]$; here the constant is $7$, not $0$." },
        { text: "The system has no solution (it is inconsistent).", correct: true, explain: "The row says $0 = 7$, which is impossible, so nothing satisfies the system." },
        { text: "$z = 7$.", explain: "The $z$ coefficient here is $0$, so the row is not about $z$; it reads $0 = 7$." },
        { text: "$x = y = z = 0$.", explain: "An all-left-zero row with a nonzero constant is a contradiction, not a solution." },
      ],
    },
    {
      id: "c-infinite",
      prompt: "A system reduces to a row $\\left[\\begin{array}{ccc|c} 0 & 0 & 0 & 0 \\end{array}\\right]$. What does it tell you?",
      choices: [
        { text: "No solution.", explain: "No solution comes from $0 = k$ with $k \\neq 0$; here $k = 0$." },
        { text: "A unique solution.", explain: "A redundant row removes a constraint, so the solution is not pinned down to one." },
        { text: "It is always true, so a variable is free: infinitely many solutions.", correct: true, explain: "$0 = 0$ holds for every value, leaving a free variable." },
        { text: "Every variable equals $0$.", explain: "The row places no condition at all, so it does not force the variables to $0$." },
      ],
    },
    {
      id: "c-backsub-neg",
      prompt: "$\\left[\\begin{array}{cc|c} 1 & -1 & 1 \\\\ 0 & 1 & 4 \\end{array}\\right]$: find $(x, y)$.",
      choices: [
        { text: "$(-3, 4)$", explain: "Sign slip: $x - 4 = 1$ gives $x = 5$, not $1 - 4$." },
        { text: "$(4, 5)$", explain: "That reverses the pair; row 2 gives $y = 4$, so $x = 5$." },
        { text: "$(5, 4)$", correct: true, explain: "Row 2 gives $y = 4$; then $x - 4 = 1$, so $x = 5$." },
        { text: "$(1, 4)$", explain: "You still have to solve row 1: $x - y = 1$ with $y = 4$ gives $x = 5$." },
      ],
    },
    {
      id: "c-augment-3var",
      prompt: "Which augmented matrix represents $\\begin{cases} x + y + z = 6 \\\\ 2x + y + z = 7 \\\\ x + 2y + z = 8 \\end{cases}$?",
      choices: [
        { text: "$\\left[\\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\\\ 2 & 1 & 1 & 7 \\\\ 1 & 2 & 1 & 8 \\end{array}\\right]$", correct: true, explain: "Row by row: $(1,1,1 \\mid 6)$, $(2,1,1 \\mid 7)$, $(1,2,1 \\mid 8)$." },
        { text: "$\\left[\\begin{array}{ccc|c} 1 & 2 & 1 & 6 \\\\ 1 & 1 & 2 & 7 \\\\ 1 & 1 & 1 & 8 \\end{array}\\right]$", explain: "The coefficients are scrambled; the first equation is $x + y + z = 6$, so row 1 is $(1,1,1 \\mid 6)$." },
        { text: "$\\left[\\begin{array}{ccc|c} 6 & 1 & 1 & 1 \\\\ 7 & 2 & 1 & 1 \\\\ 8 & 1 & 2 & 1 \\end{array}\\right]$", explain: "The constants were placed first; they belong to the right of the bar." },
        { text: "$\\left[\\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\\\ 1 & 1 & 2 & 7 \\\\ 1 & 2 & 1 & 8 \\end{array}\\right]$", explain: "Row 2 is wrong: $2x + y + z = 7$ gives $(2,1,1 \\mid 7)$." },
      ],
    },
    {
      id: "c-scale",
      prompt: "Scaling the row $\\left[\\begin{array}{cc|c} 2 & 4 & 6 \\end{array}\\right]$ by $\\tfrac{1}{2}$ gives:",
      choices: [
        { text: "$\\left[\\begin{array}{cc|c} 2 & 4 & 6 \\end{array}\\right]$", explain: "Scaling multiplies every entry; the row cannot stay the same." },
        { text: "$\\left[\\begin{array}{cc|c} 1 & 4 & 6 \\end{array}\\right]$", explain: "Every entry must be halved, not just the first." },
        { text: "$\\left[\\begin{array}{cc|c} 4 & 8 & 12 \\end{array}\\right]$", explain: "That doubles the row; multiplying by $\\tfrac{1}{2}$ halves it." },
        { text: "$\\left[\\begin{array}{cc|c} 1 & 2 & 3 \\end{array}\\right]$", correct: true, explain: "Halve every entry: $2 \\to 1$, $4 \\to 2$, $6 \\to 3$." },
      ],
    },
    {
      id: "c-elim-3var",
      prompt: "Apply $R_2 \\to R_2 - R_1$ to $R_2 = (1, 2, 1 \\mid 8)$ with pivot row $R_1 = (1, 1, 1 \\mid 6)$. The new $R_2$ is:",
      choices: [
        { text: "$(2, 3, 2 \\mid 14)$", explain: "That is $R_2 + R_1$; the operation subtracts." },
        { text: "$(0, 1, 0 \\mid 2)$", correct: true, explain: "$(1-1,\\ 2-1,\\ 1-1,\\ 8-6) = (0, 1, 0 \\mid 2)$." },
        { text: "$(0, 1, 0 \\mid -2)$", explain: "Sign slip on the constant: $8 - 6 = 2$, not $-2$." },
        { text: "$(0, -1, 0 \\mid 2)$", explain: "The middle entry is $2 - 1 = 1$, not $-1$." },
      ],
    },
  ],
  summit: [
    {
      id: "s-full-lesson",
      prompt: "Solve $\\begin{cases} x + y + z = 6 \\\\ 2x + y + z = 7 \\\\ x + 2y + z = 8 \\end{cases}$.",
      choices: [
        { text: "$(1, 2, 3)$", correct: true, explain: "Elimination and back-substitution give $y = 2$, $z = 3$, $x = 1$; all three equations check." },
        { text: "$(3, 2, 1)$", explain: "That reverses the order; testing it, $2(3) + 2 + 1 = 9 \\neq 7$." },
        { text: "$(2, 1, 3)$", explain: "Testing it, $x + 2y + z = 2 + 2 + 3 = 7 \\neq 8$." },
        { text: "$(1, 1, 4)$", explain: "It fits the first two equations but $1 + 2(1) + 4 = 7 \\neq 8$." },
      ],
    },
    {
      id: "s-full-s2",
      prompt: "Solve $\\begin{cases} x + y + z = 6 \\\\ x - y + z = 4 \\\\ 2x + y - z = 2 \\end{cases}$.",
      choices: [
        { text: "$(3, 1, 2)$", explain: "Testing it, $x + y + z = 3 + 1 + 2 = 6$ works, but $2(3) + 1 - 2 = 5 \\neq 2$." },
        { text: "$(2, 1, 3)$", correct: true, explain: "Subtracting equation 2 from 1 gives $2y = 2$, so $y = 1$; then $x = 2$, $z = 3$, and all three check." },
        { text: "$(2, 3, 1)$", explain: "Testing it, $x - y + z = 2 - 3 + 1 = 0 \\neq 4$." },
        { text: "$(1, 2, 3)$", explain: "Testing it, $x - y + z = 1 - 2 + 3 = 2 \\neq 4$." },
      ],
    },
    {
      id: "s-nosolution",
      prompt: "Row-reducing a 3-variable system produces a row $\\left[\\begin{array}{ccc|c} 0 & 0 & 0 & -2 \\end{array}\\right]$. How many solutions does the system have?",
      choices: [
        { text: "Exactly one.", explain: "A contradiction cannot be satisfied, so there is no solution to count." },
        { text: "None; it is inconsistent.", correct: true, explain: "The row says $0 = -2$, which is impossible, so no triple works." },
        { text: "Infinitely many.", explain: "Infinitely many needs an all-zero row $[0\\,0\\,0 \\mid 0]$; here the constant is $-2$." },
        { text: "Exactly three.", explain: "Systems have zero, one, or infinitely many solutions, never exactly three." },
      ],
    },
    {
      id: "s-infinite",
      prompt: "Row-reducing leaves two independent rows plus a final row $\\left[\\begin{array}{ccc|c} 0 & 0 & 0 & 0 \\end{array}\\right]$. How many solutions?",
      choices: [
        { text: "None.", explain: "No solution comes from $0 = k$ with $k \\neq 0$; here the constant is $0$." },
        { text: "Exactly one.", explain: "With only two real constraints on three variables, one variable is free." },
        { text: "Exactly two.", explain: "A system never has exactly two solutions; a free variable gives infinitely many." },
        { text: "Infinitely many (one free variable).", correct: true, explain: "Two pivots for three variables leaves one free, so infinitely many triples work." },
      ],
    },
    {
      id: "s-backsub-sign",
      prompt: "From the row $\\left[\\begin{array}{ccc|c} 0 & 1 & 2 & 1 \\end{array}\\right]$ with $z = 3$, find $y$.",
      choices: [
        { text: "$y = 7$", explain: "Sign slip: $y + 6 = 1$ gives $y = 1 - 6$, not $1 + 6$." },
        { text: "$y = 5$", explain: "Check the substitution: $y + 2(3) = 1$, so $y = 1 - 6 = -5$." },
        { text: "$y = -5$", correct: true, explain: "$y + 2(3) = 1 \\Rightarrow y + 6 = 1 \\Rightarrow y = -5$." },
        { text: "$y = -7$", explain: "That subtracts $8$; the term is $2z = 6$, so $y = 1 - 6 = -5$." },
      ],
    },
    {
      id: "s-elim-neg",
      prompt: "With pivot row $R_1 = (1, 2, -1 \\mid 3)$, apply $R_3 \\to R_3 - 2R_1$ to $R_3 = (2, 1, 1 \\mid 4)$. The new $R_3$ is:",
      choices: [
        { text: "$(4, 5, -1 \\mid 10)$", explain: "That is $R_3 + 2R_1$; the operation subtracts $2R_1$." },
        { text: "$(0, -3, 3 \\mid -2)$", correct: true, explain: "$2R_1 = (2,4,-2,6)$, so $R_3 - 2R_1 = (0, -3, 3 \\mid -2)$." },
        { text: "$(0, -3, -1 \\mid -2)$", explain: "Third entry: $1 - 2(-1) = 1 + 2 = 3$, not $-1$." },
        { text: "$(0, -3, 3 \\mid 2)$", explain: "Constant: $4 - 2(3) = 4 - 6 = -2$, not $+2$." },
      ],
    },
    {
      id: "s-order-read",
      prompt: "A reduced matrix (columns in order $x, y, z$) is $\\left[\\begin{array}{ccc|c} 1 & 0 & 0 & 4 \\\\ 0 & 1 & 0 & 0 \\\\ 0 & 0 & 1 & -2 \\end{array}\\right]$. The solution is:",
      choices: [
        { text: "$(4, -2, 0)$", explain: "That swaps $y$ and $z$; row 2 gives $y = 0$ and row 3 gives $z = -2$." },
        { text: "$(-2, 0, 4)$", explain: "That reverses the order; column 1 is $x$, so $x = 4$." },
        { text: "$(0, 4, -2)$", explain: "Row 1 gives $x = 4$, not $0$; do not shift the entries." },
        { text: "$(4, 0, -2)$", correct: true, explain: "Reading each row: $x = 4$, $y = 0$, $z = -2$." },
      ],
    },
    {
      id: "s-solve-2var",
      prompt: "Solve $\\begin{cases} 2x + y = 5 \\\\ x + y = 3 \\end{cases}$ by elimination.",
      choices: [
        { text: "$(1, 2)$", explain: "That reverses the pair; subtracting the equations gives $x = 2$, then $y = 1$." },
        { text: "$(2, -1)$", explain: "From $x + y = 3$ with $x = 2$, we get $y = 1$, not $-1$." },
        { text: "$(2, 1)$", correct: true, explain: "Subtracting equation 2 from 1 gives $x = 2$; then $2 + y = 3$, so $y = 1$." },
        { text: "$(3, -1)$", explain: "Check equation 1: $2(3) + (-1) = 5$ works, but $3 + (-1) = 2 \\neq 3$." },
      ],
    },
    {
      id: "s-pivot-def",
      prompt: "In elimination, the pivot is:",
      choices: [
        { text: "the largest entry in the matrix.", explain: "Size does not matter; the pivot is chosen by position, not by being largest." },
        { text: "the leading nonzero entry of a row, used to clear the entries below it.", correct: true, explain: "You use the pivot to make zeros beneath it, one column at a time." },
        { text: "the constant to the right of the bar.", explain: "That is part of the $b$ column, not a pivot." },
        { text: "the bottom-right entry.", explain: "The pivot is a leading entry, typically starting at the top-left, not the corner." },
      ],
    },
    {
      id: "s-illegal-capstone",
      prompt: "Which of these would change the solution set and is therefore illegal?",
      choices: [
        { text: "Swapping $R_1$ and $R_2$.", explain: "Reordering equations is legal and does not change the solution." },
        { text: "Replacing $R_2$ by $R_2 - 5R_1$.", explain: "Adding a multiple of one row to another is legal." },
        { text: "Multiplying $R_3$ by $3$.", explain: "Scaling by a nonzero number is legal." },
        { text: "Replacing a row by $0$ times that row.", correct: true, explain: "Multiplying by $0$ destroys the equation and can change the solution set, so it is not allowed." },
      ],
    },
    {
      id: "s-inconsistent-sys",
      prompt: "How many solutions does $\\begin{cases} x + y = 2 \\\\ x + y = 5 \\end{cases}$ have?",
      choices: [
        { text: "None; the equations contradict each other.", correct: true, explain: "Subtracting gives $0 = 3$, an impossible row, so there is no solution." },
        { text: "Exactly one.", explain: "The same left side cannot equal both $2$ and $5$, so no single pair works." },
        { text: "Infinitely many.", explain: "The lines are parallel and distinct, not the same line." },
        { text: "Exactly two.", explain: "A linear system never has exactly two solutions." },
      ],
    },
    {
      id: "s-dependent-sys",
      prompt: "How many solutions does $\\begin{cases} x + y = 2 \\\\ 2x + 2y = 4 \\end{cases}$ have?",
      choices: [
        { text: "None.", explain: "The equations agree, so they are not contradictory." },
        { text: "Exactly one.", explain: "The second equation is just twice the first, so it adds no new constraint." },
        { text: "Infinitely many; the second equation is twice the first.", correct: true, explain: "Both describe the same line, leaving a free variable." },
        { text: "Exactly two.", explain: "A linear system never has exactly two solutions." },
      ],
    },
    {
      id: "s-backsub-full",
      prompt: "Read $(x, y, z)$ from $\\left[\\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\\\ 0 & 1 & 3 & 11 \\\\ 0 & 0 & 1 & 3 \\end{array}\\right]$ by back-substitution.",
      choices: [
        { text: "$(6, 11, 3)$", explain: "Those are the constants; you still have to back-substitute for $x$ and $y$." },
        { text: "$(1, 2, 3)$", correct: true, explain: "$z = 3$; row 2: $y + 3(3) = 11$ gives $y = 2$; row 1: $x + 2 + 3 = 6$ gives $x = 1$." },
        { text: "$(1, 8, 3)$", explain: "Row 2 is $y + 3z = 11$ with $z = 3$, so $y = 11 - 9 = 2$, not $8$." },
        { text: "$(3, 2, 1)$", explain: "That reverses the order; row 3 gives $z = 3$, so $z$ is last, not first." },
      ],
    },
    {
      id: "s-count-pivots",
      prompt: "After reduction, a 3-variable system has a pivot (leading $1$) in all three variable columns and no contradictory row. How many solutions?",
      choices: [
        { text: "None.", explain: "No contradictory row means the system is consistent, so there is at least one solution." },
        { text: "Exactly one.", correct: true, explain: "A pivot in every variable column pins down each variable, giving a unique triple." },
        { text: "Infinitely many.", explain: "A free variable needs a column with no pivot; here every column has one." },
        { text: "It cannot be determined.", explain: "Three pivots and no contradiction always give exactly one solution." },
      ],
    },
    {
      id: "s-trap-column",
      prompt: "A reduced matrix has columns in order $x, y, z$. Row 2 is $\\left[\\begin{array}{ccc|c} 0 & 1 & 0 & 7 \\end{array}\\right]$. A student concludes $x = 7$. What is the error?",
      choices: [
        { text: "No error; $x = 7$.", explain: "The $1$ sits in the second column, which is the $y$ column, not the $x$ column." },
        { text: "It actually says $z = 7$.", explain: "The $1$ is in column 2, the $y$ column; column 3 (the $z$ column) is $0$ here." },
        { text: "Column 2 is the $y$-column, so the row says $y = 7$, not $x = 7$.", correct: true, explain: "Match each $1$ to its column: a $1$ in column 2 means $y = 7$." },
        { text: "The row is inconsistent.", explain: "It reads $y = 7$, a perfectly consistent statement, not a contradiction." },
      ],
    },
  ],
};
