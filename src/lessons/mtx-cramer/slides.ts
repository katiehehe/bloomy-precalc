import type { ParamSpec, Slide } from "../types";

/**
 * The top constant (the right-hand side of the first equation, 2x + y = c). The
 * slider is integer-valued in the player, and x = (3c - 10)/5 is an integer only
 * when c is a multiple of 5. The manipulate target x = 4 lands at c = 10.
 */
const cParam: ParamSpec = {
  key: "c",
  label: "top constant (right side of 2x + y = c)",
  min: 0,
  max: 12,
  start: 5,
  step: 1,
  format: (v) => `top constant = ${Math.round(v)}`,
};

export const slides: Slide[] = [
  {
    id: "setup",
    title: "The rule and det(A)",
    mode: "setup",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "We will solve the system $2x + y = 5$ and $x + 3y = 10$. Cramer's rule solves for each variable using **determinants**, and it works for any square system as long as one number, the determinant of the coefficient matrix, is not zero.",
      },
      {
        text: "Cramer's rule needs two inputs. The **coefficient matrix** $A$ collects the numbers that multiply the variables: column $1$ is the $x$ coefficients $(2, 1)$, and column $2$ is the $y$ coefficients $(1, 3)$. The **constant column** $b$ holds the right-hand sides, $(5, 10)$.",
      },
      {
        text: "The rule gives each variable as a ratio of determinants: $$x_i = \\dfrac{\\det(A_i)}{\\det(A)}$$ where $A_i$ is $A$ with its $i$-th column replaced by the constant column $b$. The denominator $\\det(A)$ is the same for every variable, so it is computed only once.",
      },
      {
        text: "The denominator comes first. The **determinant** of a $2 \\times 2$ matrix is the product down the main diagonal minus the product of the other diagonal. For $A$ the main diagonal is $2$ and $3$, and the other diagonal is $1$ and $1$.",
        add: { detHi: true },
      },
      {
        text: "So the denominator is: $$\\det(A) = (2)(3) - (1)(1) = 6 - 1 = 5$$ Because $5$ is not $0$, Cramer's rule applies, and $5$ is the denominator we divide by for both $x$ and $y$.",
        add: { detVal: true },
      },
    ],
    practice:
      "Cramer's rule: $x_i = \\dfrac{\\det(A_i)}{\\det(A)}$, where $A_i$ is $A$ with column $i$ replaced by the constants $b$. Here the shared denominator is $\\det(A) = 5$.",
    questions: [
      {
        kind: "choice",
        prompt: "For $A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 3 \\end{bmatrix}$, what is $\\det(A)$?",
        options: ["$5$", "$7$", "$6$", "$-5$"],
        answer: 0,
        hint: "Multiply down the main diagonal, then subtract the other diagonal: $(2)(3) - (1)(1)$.",
        success: "Yes: $(2)(3) - (1)(1) = 6 - 1 = 5$.",
      },
      {
        kind: "choice",
        prompt: "To solve for $x$, which column of $A$ do you replace with the constant column $b$?",
        options: [
          "Column $2$, the $y$ column",
          "Both columns at once",
          "Column $1$, the $x$ column",
          "A row of $A$, not a column",
        ],
        answer: 2,
        hint: "Swap the column that belongs to the variable you want. $x$ sits in the first column.",
        success: "Right: replace column $1$ (the $x$ column) with $b$ to build $A_x$.",
      },
    ],
  },
  {
    id: "solve-x",
    title: "Solve for x",
    mode: "solveX",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Now solve for $x$. The $x$ coefficients occupy column $1$ of $A$, so we replace column $1$ with the constant column $b = (5, 10)$. The result is $A_x$, whose highlighted first column now holds the constants.",
      },
      {
        text: "Take its determinant the same way, main diagonal minus the other diagonal: $\\det(A_x) = (5)(3) - (1)(10) = 15 - 10 = 5$.",
        add: { detX: true },
      },
      {
        text: "Divide by the shared denominator $\\det(A) = 5$: $$x = \\dfrac{\\det(A_x)}{\\det(A)} = \\dfrac{5}{5} = 1$$ Make sure you divide by $\\det(A)$, the coefficient determinant, not by $\\det(A_x)$.",
      },
      {
        text: "So $x = 1$. Only the first column changed to make the numerator. The denominator stayed $\\det(A) = 5$, exactly what we computed before.",
      },
    ],
    practice:
      "To solve for $x$: replace column $1$ of $A$ with $b$, compute $\\det(A_x)$, and divide by $\\det(A) = 5$.",
    questions: [
      {
        kind: "choice",
        prompt: "For $A_x = \\begin{bmatrix} 5 & 1 \\\\ 10 & 3 \\end{bmatrix}$, what is $\\det(A_x)$?",
        options: ["$25$", "$15$", "$-5$", "$5$"],
        answer: 3,
        hint: "Main diagonal minus the other diagonal: $(5)(3) - (1)(10) = 15 - 10$.",
        success: "Yes: $(5)(3) - (1)(10) = 15 - 10 = 5$.",
      },
      {
        kind: "choice",
        prompt: "In Cramer's rule, the determinant you divide $\\det(A_x)$ by to get $x$ is:",
        options: [
          "$\\det(A)$, the determinant of the coefficient matrix",
          "$\\det(A_x)$ itself",
          "$\\det(A_y)$",
          "the product $\\det(A)\\,\\det(A_x)$",
        ],
        answer: 0,
        hint: "The denominator in $x = \\dfrac{\\det(A_x)}{\\det(A)}$ is always $\\det(A)$.",
        success: "Right: divide by $\\det(A)$, so $x = \\dfrac{5}{5} = 1$.",
      },
    ],
  },
  {
    id: "solve-y",
    title: "Solve for y",
    mode: "solveY",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Now solve for $y$. The $y$ coefficients occupy column $2$ of $A$, so we replace column $2$ with the constants $b = (5, 10)$ to form $A_y$. The first column returns to the original coefficients $(2, 1)$, and the highlighted second column holds the constants.",
      },
      {
        text: "Its determinant is $\\det(A_y) = (2)(10) - (5)(1) = 20 - 5 = 15$.",
        add: { detY: true },
      },
      {
        text: "Divide by the same denominator: $$y = \\dfrac{\\det(A_y)}{\\det(A)} = \\dfrac{15}{5} = 3$$",
      },
      {
        text: "So the solution is $(x, y) = (1, 3)$. Always check: $2(1) + 3 = 5$ and $1 + 3(3) = 10$, so both original equations hold, and $(1, 3)$ is confirmed.",
      },
    ],
    practice:
      "For $y$: replace column $2$ of $A$ with $b$, compute $\\det(A_y) = 15$, and divide by $\\det(A) = 5$ to get $y = 3$. The full solution is $(1, 3)$.",
    questions: [
      {
        kind: "choice",
        prompt: "For $A_y = \\begin{bmatrix} 2 & 5 \\\\ 1 & 10 \\end{bmatrix}$, what is $\\det(A_y)$?",
        options: ["$15$", "$25$", "$-15$", "$20$"],
        answer: 0,
        hint: "Main diagonal minus the other diagonal: $(2)(10) - (5)(1) = 20 - 5$.",
        success: "Yes: $(2)(10) - (5)(1) = 20 - 5 = 15$.",
      },
      {
        kind: "choice",
        prompt: "With $\\det(A_y) = 15$ and $\\det(A) = 5$, what is $y$?",
        options: [
          "$y = \\dfrac{5}{15} = \\dfrac{1}{3}$",
          "$y = \\dfrac{15}{5} = 3$",
          "$y = 15$",
          "$y = 10$",
        ],
        answer: 1,
        hint: "$y = \\dfrac{\\det(A_y)}{\\det(A)} = \\dfrac{15}{5}$.",
        success: "Right: $y = \\dfrac{15}{5} = 3$, so the solution is $(1, 3)$.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn",
    mode: "yourturn",
    params: [cParam],
    baseReveal: {},
    beats: [
      {
        text: "Now the top constant is set by the slider. The first equation becomes $2x + y = c$, while the second stays $x + 3y = 10$, so the constant column is $b = (c, 10)$. The coefficient matrix $A$ is unchanged, so $\\det(A) = 5$ no matter what.",
      },
      {
        text: "Only $A_x$ moves: $A_x = \\begin{bmatrix} c & 1 \\\\ 10 & 3 \\end{bmatrix}$, so $\\det(A_x) = (c)(3) - (1)(10) = 3c - 10$. Dividing by $\\det(A) = 5$ gives $$x = \\dfrac{3c - 10}{5}$$",
      },
      {
        text: "At the current value $c = 5$ we are back to the original system, and $x = \\dfrac{(3)(5) - 10}{5} = \\dfrac{5}{5} = 1$. Watch the top constant fall toward $0$: the top-left cell drops, $\\det(A_x)$ shrinks to $(0)(3) - (1)(10) = -10$, and $x$ becomes $\\dfrac{-10}{5} = -2$.",
        to: { c: 0 },
        ms: 2200,
      },
      {
        text: "As the constant climbs back to $5$, $x$ returns to $1$. The moving first column, its determinant $\\det(A_x)$, and the value of $x$ all change together, while the denominator $\\det(A) = 5$ never moves.",
        to: { c: 5 },
        ms: 1800,
      },
    ],
    practice:
      "Slide the top constant and watch $A_x$'s first column, $\\det(A_x) = 3c - 10$, and $x = \\dfrac{3c - 10}{5}$ update together. The denominator $\\det(A) = 5$ stays fixed.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Set the top constant so that $x = 4$.",
        hint: "$x = \\dfrac{3c - 10}{5}$. Set $\\dfrac{3c - 10}{5} = 4$, so $3c - 10 = 20$, then $3c = 30$ and $c = 10$.",
        success: "Yes: at $c = 10$, $\\det(A_x) = (10)(3) - (1)(10) = 20$, so $x = \\dfrac{20}{5} = 4$.",
        check: (_value, values) => Math.round(values.c ?? 5) === 10,
      },
      {
        kind: "choice",
        prompt: "Sliding the top constant changes only the first column of $A_x$. Why the first column?",
        options: [
          "Because $x$ is the first variable, so solving for $x$ replaces column $1$ with $b$.",
          "Because a determinant only uses the first column.",
          "Because the second column of $A$ is always zero.",
          "Because $b$ always goes in column $1$, for every variable.",
        ],
        answer: 0,
        hint: "The variable's position sets the column: $x$ is first, so column $1$.",
        success: "Right: $x$ is the first variable, so $A_x$ replaces column $1$ with $b$.",
      },
      {
        kind: "choice",
        prompt: "Suppose a different system had $\\det(A) = 0$. What would Cramer's rule say?",
        options: [
          "It does not apply: dividing by $\\det(A) = 0$ is undefined, so there is no unique solution.",
          "$x = 0$ and $y = 0$ automatically.",
          "Divide by $\\det(A_x)$ instead.",
          "The solution is still $(1, 3)$.",
        ],
        answer: 0,
        hint: "Cramer's rule always divides by $\\det(A)$, and you cannot divide by $0$.",
        success: "Right: $\\det(A) = 0$ means Cramer's rule does not apply and there is no unique solution.",
      },
    ],
  },
];
