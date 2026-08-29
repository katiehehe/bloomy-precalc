import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Cramer's rule". Grounded in the
 * lesson: for a square system A x = b with det(A) != 0, each variable is
 * x_i = det(A_i)/det(A), where A_i is A with its i-th column replaced by the
 * constant column b; det(A) is the one shared denominator; det(A) = 0 means no
 * unique solution and the rule does not apply. The 2x2 determinant is the main
 * diagonal product minus the anti-diagonal product. Distractors are the classic
 * traps: replacing the wrong column, dividing by det(A_x) instead of det(A), sign
 * errors in the determinant, and ignoring the det(A) = 0 case. Every determinant
 * below is verified by hand.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-detA",
      prompt: "For $A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 3 \\end{bmatrix}$, what is $\\det(A)$?",
      choices: [
        { text: "$5$", correct: true, explain: "Main diagonal minus anti-diagonal: $(2)(3) - (1)(1) = 6 - 1 = 5$." },
        { text: "$7$", explain: "That adds the two products, $(2)(3) + (1)(1) = 7$; the determinant subtracts." },
        { text: "$6$", explain: "That is only $(2)(3)$; you still subtract $(1)(1)$." },
        { text: "$-5$", explain: "That reverses the order, $(1)(1) - (2)(3)$; use main diagonal minus anti-diagonal." },
      ],
    },
    {
      id: "c-col-x",
      prompt: "To solve for $x$ with Cramer's rule, which column of $A$ do you replace with the constants $b$?",
      choices: [
        { text: "Column $2$, the $y$ column", explain: "Column $2$ holds the $y$ coefficients; replacing it solves for $y$, not $x$." },
        { text: "Column $1$, the $x$ column", correct: true, explain: "$x$ is the first variable, so its coefficients sit in column $1$; swap that column for $b$." },
        { text: "Both columns at once", explain: "You replace exactly one column, the one for the variable you want." },
        { text: "A row of $A$", explain: "Cramer's rule replaces a column, never a row." },
      ],
    },
    {
      id: "c-col-y",
      prompt: "To solve for $y$, which column of $A$ do you replace with $b$?",
      choices: [
        { text: "Column $1$, the $x$ column", explain: "Column $1$ holds the $x$ coefficients; replacing it solves for $x$." },
        { text: "Neither column; you replace a row", explain: "Cramer's rule replaces a column, not a row." },
        { text: "Column $2$, the $y$ column", correct: true, explain: "$y$ is the second variable, so replace column $2$ with $b$ to build $A_y$." },
        { text: "Both columns", explain: "Only the column for the variable you want gets replaced." },
      ],
    },
    {
      id: "c-detAx",
      prompt: "For $A_x = \\begin{bmatrix} 5 & 1 \\\\ 10 & 3 \\end{bmatrix}$, what is $\\det(A_x)$?",
      choices: [
        { text: "$25$", explain: "That adds the products, $(5)(3) + (1)(10) = 25$; the determinant subtracts." },
        { text: "$15$", explain: "That is only $(5)(3)$; you still subtract $(1)(10)$." },
        { text: "$5$", correct: true, explain: "$(5)(3) - (1)(10) = 15 - 10 = 5$." },
        { text: "$-5$", explain: "That reverses the order, $(1)(10) - (5)(3)$; use main diagonal minus anti-diagonal." },
      ],
    },
    {
      id: "c-detAy",
      prompt: "For $A_y = \\begin{bmatrix} 2 & 5 \\\\ 1 & 10 \\end{bmatrix}$, what is $\\det(A_y)$?",
      choices: [
        { text: "$25$", explain: "That adds the products, $(2)(10) + (5)(1) = 25$; the determinant subtracts." },
        { text: "$20$", explain: "That is only $(2)(10)$; you still subtract $(5)(1)$." },
        { text: "$-15$", explain: "That reverses the order, $(5)(1) - (2)(10)$; take main diagonal minus anti-diagonal." },
        { text: "$15$", correct: true, explain: "$(2)(10) - (5)(1) = 20 - 5 = 15$." },
      ],
    },
    {
      id: "c-x-worked",
      prompt: "With $\\det(A_x) = 5$ and $\\det(A) = 5$, what is $x$?",
      choices: [
        { text: "$1$", correct: true, explain: "$x = \\dfrac{\\det(A_x)}{\\det(A)} = \\dfrac{5}{5} = 1$." },
        { text: "$0$", explain: "You divide, not subtract: $\\dfrac{5}{5} = 1$, not $5 - 5$." },
        { text: "$25$", explain: "You divide, not multiply: $\\dfrac{5}{5} = 1$." },
        { text: "$10$", explain: "That adds the determinants; Cramer's rule divides them." },
      ],
    },
    {
      id: "c-y-worked",
      prompt: "With $\\det(A_y) = 15$ and $\\det(A) = 5$, what is $y$?",
      choices: [
        { text: "$10$", explain: "That subtracts, $15 - 5$; Cramer's rule divides: $\\dfrac{15}{5}$." },
        { text: "$\\dfrac{1}{3}$", explain: "That divides the wrong way, $\\dfrac{5}{15}$; use $\\dfrac{\\det(A_y)}{\\det(A)}$." },
        { text: "$3$", correct: true, explain: "$y = \\dfrac{\\det(A_y)}{\\det(A)} = \\dfrac{15}{5} = 3$." },
        { text: "$15$", explain: "That skips the division by $\\det(A) = 5$." },
      ],
    },
    {
      id: "c-cond",
      prompt: "Cramer's rule gives a unique solution exactly when:",
      choices: [
        { text: "$\\det(A) = 0$", explain: "If $\\det(A) = 0$ you would divide by zero, so the rule does not apply." },
        { text: "$b = 0$", explain: "The constants can be anything; what matters is the coefficient determinant." },
        { text: "$\\det(A) \\neq 0$", correct: true, explain: "A nonzero denominator $\\det(A)$ lets you divide and get one solution for each variable." },
        { text: "the matrix is not square", explain: "Cramer's rule needs a square system; a nonsquare system has no single $\\det(A)$." },
      ],
    },
    {
      id: "c-det-fresh1",
      prompt: "What is $\\det\\begin{bmatrix} 3 & 2 \\\\ 1 & 1 \\end{bmatrix}$?",
      choices: [
        { text: "$1$", correct: true, explain: "$(3)(1) - (2)(1) = 3 - 2 = 1$." },
        { text: "$5$", explain: "That adds the products, $(3)(1) + (2)(1) = 5$; the determinant subtracts." },
        { text: "$-1$", explain: "That reverses the order, $(2)(1) - (3)(1)$; use main diagonal minus anti-diagonal." },
        { text: "$6$", explain: "That multiplies the main diagonal wrong; $(3)(1) = 3$, not $6$." },
      ],
    },
    {
      id: "c-Ax-def",
      prompt: "In $x = \\dfrac{\\det(A_x)}{\\det(A)}$, the matrix $A_x$ is:",
      choices: [
        { text: "$b$ with one column replaced by a column of $A$", explain: "It is the other way around: you change a column of $A$, using $b$." },
        { text: "$A$ with its first column replaced by the constant column $b$", correct: true, explain: "For $x$ (the first variable) you swap column $1$ of $A$ for $b$." },
        { text: "$A$ with its first row replaced by $b$", explain: "Cramer's rule replaces a column, not a row." },
        { text: "$A$ multiplied by $b$", explain: "There is no matrix product here; you replace a column, then take a determinant." },
      ],
    },
    {
      id: "c-denom",
      prompt: "When solving for either $x$ or $y$, the denominator you divide by is:",
      choices: [
        { text: "$\\det(A_x)$ for $x$ and $\\det(A_y)$ for $y$", explain: "Those are the numerators; the denominator is the same for both." },
        { text: "$b$", explain: "You divide by a determinant, not by the constant column." },
        { text: "$\\det(A)$ for both", correct: true, explain: "The coefficient determinant $\\det(A)$ is the one shared denominator for every variable." },
        { text: "$\\det(A_x) + \\det(A_y)$", explain: "You never add the numerators; divide each numerator by $\\det(A)$." },
      ],
    },
    {
      id: "c-det-zero",
      prompt: "If a system has $\\det(A) = 0$, Cramer's rule tells you to:",
      choices: [
        { text: "set every variable to $0$", explain: "A zero determinant does not make the variables zero; it blocks the division." },
        { text: "divide by $\\det(A_x)$ instead", explain: "The rule always divides by $\\det(A)$; there is no substitute denominator." },
        { text: "multiply the numerators together", explain: "That is not part of the rule; the issue is that you cannot divide by zero." },
        { text: "stop, because the rule does not apply and there is no unique solution", correct: true, explain: "Dividing by $\\det(A) = 0$ is undefined, so Cramer's rule cannot be used." },
      ],
    },
    {
      id: "c-det-sign",
      prompt: "What is $\\det\\begin{bmatrix} 1 & 4 \\\\ 2 & 3 \\end{bmatrix}$?",
      choices: [
        { text: "$-5$", correct: true, explain: "$(1)(3) - (4)(2) = 3 - 8 = -5$." },
        { text: "$5$", explain: "The main diagonal product $3$ is smaller than the anti-diagonal product $8$, so the result is negative." },
        { text: "$11$", explain: "That adds the products, $(1)(3) + (4)(2) = 11$; the determinant subtracts." },
        { text: "$-11$", explain: "Check the products: $(1)(3) = 3$ and $(4)(2) = 8$, so $3 - 8 = -5$." },
      ],
    },
    {
      id: "c-x-fresh",
      prompt: "For the system $3x + 2y = 7$, $x + y = 3$ you find $\\det(A) = 1$ and $\\det(A_x) = 1$. What is $x$?",
      choices: [
        { text: "$2$", explain: "That is $y$ for this system; $x = \\dfrac{\\det(A_x)}{\\det(A)} = \\dfrac{1}{1}$." },
        { text: "$1$", correct: true, explain: "$x = \\dfrac{\\det(A_x)}{\\det(A)} = \\dfrac{1}{1} = 1$." },
        { text: "$0$", explain: "You divide, not subtract: $\\dfrac{1}{1} = 1$." },
        { text: "$7$", explain: "That is a constant from the system, not $\\dfrac{\\det(A_x)}{\\det(A)}$." },
      ],
    },
    {
      id: "c-detAx-fresh",
      prompt: "For $x + y = 5$, $2x + 3y = 12$, the matrix $A_x$ replaces column $1$ with $(5, 12)$: $A_x = \\begin{bmatrix} 5 & 1 \\\\ 12 & 3 \\end{bmatrix}$. What is $\\det(A_x)$?",
      choices: [
        { text: "$27$", explain: "That adds the products, $(5)(3) + (1)(12) = 27$; the determinant subtracts." },
        { text: "$-3$", explain: "That reverses the order, $(1)(12) - (5)(3)$; use main diagonal minus anti-diagonal." },
        { text: "$3$", correct: true, explain: "$(5)(3) - (1)(12) = 15 - 12 = 3$." },
        { text: "$15$", explain: "That is only $(5)(3)$; you still subtract $(1)(12)$." },
      ],
    },
  ],
  summit: [
    {
      id: "s-full-worked",
      prompt: "Solve $2x + y = 5$, $x + 3y = 10$ by Cramer's rule. The solution $(x, y)$ is:",
      choices: [
        { text: "$(1, 3)$", correct: true, explain: "$\\det(A) = 5$, $\\det(A_x) = 5$, $\\det(A_y) = 15$, so $x = \\tfrac{5}{5} = 1$ and $y = \\tfrac{15}{5} = 3$." },
        { text: "$(3, 1)$", explain: "That swaps the values; $x = \\tfrac{\\det(A_x)}{\\det(A)} = 1$ and $y = \\tfrac{\\det(A_y)}{\\det(A)} = 3$." },
        { text: "$(5, 15)$", explain: "Those are the numerators $\\det(A_x)$ and $\\det(A_y)$; you still divide each by $\\det(A) = 5$." },
        { text: "$(5, 10)$", explain: "That is the constant column $b$, not the solution." },
      ],
    },
    {
      id: "s-full-f",
      prompt: "Solve $3x + y = 5$, $x + 2y = 5$ (here $\\det(A) = 5$). The solution is:",
      choices: [
        { text: "$(5, 5)$", explain: "That is the constant column; divide each numerator by $\\det(A) = 5$ first." },
        { text: "$(1, 2)$", correct: true, explain: "$\\det(A_x) = (5)(2) - (1)(5) = 5$ and $\\det(A_y) = (3)(5) - (5)(1) = 10$, so $x = 1$, $y = 2$." },
        { text: "$(2, 1)$", explain: "That swaps $x$ and $y$; $x = \\tfrac{5}{5} = 1$ and $y = \\tfrac{10}{5} = 2$." },
        { text: "$(5, 10)$", explain: "Those are the numerators $\\det(A_x)$ and $\\det(A_y)$; still divide by $\\det(A) = 5$." },
      ],
    },
    {
      id: "s-full-g",
      prompt: "Solve $x + y = 5$, $2x + 3y = 12$ (here $\\det(A) = 1$). The solution is:",
      choices: [
        { text: "$(2, 3)$", explain: "That swaps the values; $\\det(A_x) = 3$ gives $x = 3$ and $\\det(A_y) = 2$ gives $y = 2$." },
        { text: "$(5, 12)$", explain: "That is the constant column $b$, not the solution." },
        { text: "$(3, 2)$", correct: true, explain: "$\\det(A_x) = (5)(3) - (1)(12) = 3$ and $\\det(A_y) = (1)(12) - (5)(2) = 2$; with $\\det(A) = 1$, $x = 3$, $y = 2$." },
        { text: "$(1, 4)$", explain: "Recompute: $\\det(A_x) = 3$ and $\\det(A_y) = 2$ over $\\det(A) = 1$ give $(3, 2)$." },
      ],
    },
    {
      id: "s-3x3-z",
      prompt: "For a $3 \\times 3$ system $A\\mathbf{x} = b$ with variables $x, y, z$, to solve for $z$ you replace which column of $A$ with $b$?",
      choices: [
        { text: "Column $1$", explain: "Column $1$ is for $x$; the column index matches the variable's position." },
        { text: "Column $2$", explain: "Column $2$ is for $y$; $z$ is the third variable." },
        { text: "The third row", explain: "Cramer's rule replaces a column, not a row." },
        { text: "Column $3$", correct: true, explain: "$z$ is the third variable, so $A_z$ replaces column $3$ with $b$, and $z = \\dfrac{\\det(A_z)}{\\det(A)}$." },
      ],
    },
    {
      id: "s-detzero",
      prompt: "For some system you compute $\\det(A) = 0$ and $\\det(A_x) = 3$. What can you conclude about $x$?",
      choices: [
        { text: "Cramer's rule does not apply; with $\\det(A) = 0$ there is no unique solution.", correct: true, explain: "You cannot divide by $\\det(A) = 0$, so the rule gives no value and the system lacks a unique solution." },
        { text: "$x = \\dfrac{3}{0} = 0$", explain: "Division by zero is undefined, not zero." },
        { text: "$x = 3$", explain: "That ignores the denominator; you cannot divide by $\\det(A) = 0$." },
        { text: "$x = \\dfrac{0}{3} = 0$", explain: "The denominator is $\\det(A) = 0$, not $\\det(A_x)$; the division is undefined either way." },
      ],
    },
    {
      id: "s-vs-subst",
      prompt: "You solve $2x + y = 5$, $x + 3y = 10$ by substitution and get $(1, 3)$. Solving the same system by Cramer's rule gives:",
      choices: [
        { text: "a different answer, because determinants change the solution", explain: "The method does not change the solution; both give the same unique answer." },
        { text: "$(1, 3)$, the same unique solution", correct: true, explain: "A consistent system with $\\det(A) \\neq 0$ has one solution, and every correct method finds it." },
        { text: "$(3, 1)$", explain: "That swaps the coordinates; Cramer's rule also gives $(1, 3)$." },
        { text: "no solution, because Cramer's rule needs three equations", explain: "Cramer's rule works for any square system, including $2 \\times 2$." },
      ],
    },
    {
      id: "s-trap-wrongcol",
      prompt: "A student solves for $x$ but replaces column $2$ of $A$ with $b$. What went wrong?",
      choices: [
        { text: "Nothing; either column works for $x$.", explain: "The column must match the variable; column $2$ is for $y$." },
        { text: "They should have replaced a row instead.", explain: "Cramer's rule replaces a column, not a row; the mistake is which column." },
        { text: "For $x$ you must replace column $1$; replacing column $2$ computes $\\det(A_y)$ instead.", correct: true, explain: "$x$ is the first variable, so its matrix $A_x$ replaces column $1$; column $2$ builds $A_y$." },
        { text: "They should have used $\\det(b)$.", explain: "The constant column $b$ is not square, so $\\det(b)$ is not defined; replace column $1$ of $A$." },
      ],
    },
    {
      id: "s-trap-divide",
      prompt: "To get $x$, a student computes $\\dfrac{\\det(A)}{\\det(A_x)}$. Why is this wrong?",
      choices: [
        { text: "It is fine; division is commutative.", explain: "Division is not commutative: $\\dfrac{\\det(A)}{\\det(A_x)}$ is the reciprocal of the correct value." },
        { text: "You should multiply, not divide.", explain: "Cramer's rule does divide; the fix is which quantity is on top." },
        { text: "The numerator and denominator are swapped; $x = \\dfrac{\\det(A_x)}{\\det(A)}$.", correct: true, explain: "The variable's own matrix determinant goes on top and $\\det(A)$ on the bottom." },
        { text: "You should add $\\det(A)$ and $\\det(A_x)$.", explain: "There is no addition in Cramer's rule; it is a single quotient." },
      ],
    },
    {
      id: "s-sign-trap",
      prompt: "What is $\\det\\begin{bmatrix} 2 & 3 \\\\ 4 & 5 \\end{bmatrix}$?",
      choices: [
        { text: "$-2$", correct: true, explain: "$(2)(5) - (3)(4) = 10 - 12 = -2$." },
        { text: "$2$", explain: "The anti-diagonal product $12$ exceeds the main diagonal product $10$, so the result is negative." },
        { text: "$22$", explain: "That adds the products, $(2)(5) + (3)(4) = 22$; the determinant subtracts." },
        { text: "$-22$", explain: "Check the products: $(2)(5) = 10$ and $(3)(4) = 12$, so $10 - 12 = -2$." },
      ],
    },
    {
      id: "s-neg-solution",
      prompt: "Solve $x + y = 1$, $2x + y = 0$ (here $\\det(A) = -1$). The value of $x$ is:",
      choices: [
        { text: "$1$", explain: "You forgot the denominator sign: $\\det(A_x) = 1$ over $\\det(A) = -1$ gives $-1$." },
        { text: "$-1$", correct: true, explain: "$\\det(A_x) = (1)(1) - (1)(0) = 1$, so $x = \\dfrac{1}{-1} = -1$." },
        { text: "$0$", explain: "$\\det(A_x) = 1$, not $0$, so $x = \\dfrac{1}{-1} = -1$." },
        { text: "$2$", explain: "That is $-y$; here $y = \\dfrac{\\det(A_y)}{\\det(A)} = \\dfrac{-2}{-1} = 2$, while $x = -1$." },
      ],
    },
    {
      id: "s-denom-shared",
      prompt: "In any square system, the quantity that is the same denominator for every variable is:",
      choices: [
        { text: "the largest constant in $b$", explain: "The constants form the numerators through $A_i$, not the denominator." },
        { text: "$\\det(A_x)$", explain: "That is the numerator for $x$ only; each variable has its own numerator." },
        { text: "$\\det(A)$, the coefficient determinant", correct: true, explain: "Every variable is $\\dfrac{\\det(A_i)}{\\det(A)}$, so $\\det(A)$ is the shared denominator." },
        { text: "the sum of all the $\\det(A_i)$", explain: "You never sum the numerators; you divide each by $\\det(A)$." },
      ],
    },
    {
      id: "s-from-dets",
      prompt: "A system gives $\\det(A) = 2$, $\\det(A_x) = 6$, and $\\det(A_y) = -4$. The solution $(x, y)$ is:",
      choices: [
        { text: "$(6, -4)$", explain: "Those are the numerators; divide each by $\\det(A) = 2$." },
        { text: "$(12, -8)$", explain: "That multiplies by $\\det(A)$; Cramer's rule divides by it." },
        { text: "$(-2, 3)$", explain: "That swaps and mis-signs; $x = \\tfrac{6}{2} = 3$ and $y = \\tfrac{-4}{2} = -2$." },
        { text: "$(3, -2)$", correct: true, explain: "$x = \\dfrac{6}{2} = 3$ and $y = \\dfrac{-4}{2} = -2$." },
      ],
    },
    {
      id: "s-3x3-denom",
      prompt: "For a $3 \\times 3$ system, how many different determinants do you divide by to find $x$, $y$, and $z$?",
      choices: [
        { text: "One: $\\det(A)$ is the denominator for all three.", correct: true, explain: "Only the numerators $\\det(A_x)$, $\\det(A_y)$, $\\det(A_z)$ change; the denominator $\\det(A)$ is shared." },
        { text: "Three: a different denominator for each variable.", explain: "The numerators differ, but the single denominator $\\det(A)$ is reused." },
        { text: "Four: $\\det(A)$ plus one per variable.", explain: "You compute four determinants in all, but you divide by just one of them, $\\det(A)$." },
        { text: "Zero: a $3 \\times 3$ system has no determinant.", explain: "A square matrix of any size has a determinant." },
      ],
    },
    {
      id: "s-capstone",
      prompt: "Solve $4x + 3y = 18$, $x + 2y = 7$ by Cramer's rule (here $\\det(A) = 5$). The solution is:",
      choices: [
        { text: "$(2, 3)$", explain: "That swaps the values; $\\det(A_x) = 15$ gives $x = 3$ and $\\det(A_y) = 10$ gives $y = 2$." },
        { text: "$(3, 2)$", correct: true, explain: "$\\det(A_x) = (18)(2) - (3)(7) = 15$ and $\\det(A_y) = (4)(7) - (18)(1) = 10$; over $\\det(A) = 5$, $x = 3$, $y = 2$." },
        { text: "$(15, 10)$", explain: "Those are the numerators $\\det(A_x)$ and $\\det(A_y)$; divide each by $\\det(A) = 5$." },
        { text: "$(18, 7)$", explain: "That is the constant column $b$, not the solution." },
      ],
    },
    {
      id: "s-needs",
      prompt: "Cramer's rule can be used on a system exactly when it is:",
      choices: [
        { text: "any system, square or not", explain: "A nonsquare system has no single $\\det(A)$, so the rule does not apply." },
        { text: "square, with no restriction on $\\det(A)$", explain: "If $\\det(A) = 0$ the division fails, so a nonzero determinant is required." },
        { text: "square and has $\\det(A) \\neq 0$", correct: true, explain: "You need one $\\det(A)$ (square) and a nonzero value to divide by (unique solution)." },
        { text: "square and has $\\det(A) = 0$", explain: "$\\det(A) = 0$ is exactly the case where the rule fails." },
      ],
    },
  ],
};
