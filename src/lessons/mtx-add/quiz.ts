import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Add and scale matrices". Grounded in
 * the lesson: addition and subtraction are entrywise and require identical
 * shapes; scalar multiplication multiplies EVERY entry; addition is commutative
 * ($A+B=B+A$) and scalars distribute ($k(A+B)=kA+kB$). Distractors are the
 * classic traps: multiplying entries instead of adding, scaling only one entry,
 * adding mismatched shapes, and sign slips in subtraction. Running pair
 * $A=[[1,2],[3,4]]$, $B=[[5,6],[7,8]]$. Every value is verified by hand.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-add-tl",
      prompt:
        "For $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$, $B = \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix}$, the top-left entry of $A + B$ is:",
      choices: [
        { text: "$6$", correct: true, explain: "$1 + 5 = 6$, adding the two top-left entries." },
        { text: "$5$", explain: "That multiplies the entries, $1 \\times 5$. Addition adds them." },
        { text: "$4$", explain: "That subtracts, $5 - 1$. The sum adds $1$ and $5$." },
        { text: "$8$", explain: "That is the top-right sum, $2 + 6$. Use the top-left entries." },
      ],
    },
    {
      id: "c-add-tr",
      prompt:
        "For the same $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$, $B = \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix}$, the top-right entry of $A + B$ is:",
      choices: [
        { text: "$12$", explain: "That multiplies the entries, $2 \\times 6$. Addition adds them." },
        { text: "$8$", correct: true, explain: "$2 + 6 = 8$, adding the two top-right entries." },
        { text: "$6$", explain: "That keeps only $B$'s entry. You must add $A$'s $2$." },
        { text: "$4$", explain: "That subtracts, $6 - 2$. The sum adds them." },
      ],
    },
    {
      id: "c-add-br",
      prompt:
        "For the same $A$ and $B$, the bottom-right entry of $A + B$ is:",
      choices: [
        { text: "$32$", explain: "That multiplies the entries, $4 \\times 8$. Add them instead." },
        { text: "$4$", explain: "That subtracts, $8 - 4$. The bottom-right sum adds $4$ and $8$." },
        { text: "$12$", correct: true, explain: "$4 + 8 = 12$." },
        { text: "$11$", explain: "That mixes spots ($3 + 8$). Both entries must be from the bottom-right." },
      ],
    },
    {
      id: "c-add-bl",
      prompt: "For the same $A$ and $B$, the bottom-left entry of $A + B$ is:",
      choices: [
        { text: "$21$", explain: "That multiplies the entries, $3 \\times 7$. Add them instead." },
        { text: "$4$", explain: "That subtracts, $7 - 3$. The sum adds them." },
        { text: "$3$", explain: "That keeps only $A$'s entry. You must add $B$'s $7$." },
        { text: "$10$", correct: true, explain: "$3 + 7 = 10$." },
      ],
    },
    {
      id: "c-sub-tl",
      prompt:
        "For $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$, $B = \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix}$, the top-left entry of $A - B$ is:",
      choices: [
        { text: "$4$", explain: "That reverses the order, $5 - 1$. $A - B$ does $1 - 5$." },
        { text: "$-4$", correct: true, explain: "$1 - 5 = -4$." },
        { text: "$6$", explain: "That adds, $1 + 5$. The problem asks you to subtract." },
        { text: "$-5$", explain: "That drops the $1$ and keeps only $-5$. Subtract $1 - 5$." },
      ],
    },
    {
      id: "c-sub-var",
      prompt:
        "For $\\begin{bmatrix} 4 & 1 \\\\ 2 & 6 \\end{bmatrix} - \\begin{bmatrix} 1 & 3 \\\\ 5 & 2 \\end{bmatrix}$, the top-left entry is:",
      choices: [
        { text: "$5$", explain: "That adds, $4 + 1$. The problem subtracts." },
        { text: "$-3$", explain: "That reverses the order, $1 - 4$. Subtract $4 - 1$." },
        { text: "$3$", correct: true, explain: "$4 - 1 = 3$." },
        { text: "$4$", explain: "That keeps only the first entry. Subtract the matching $1$." },
      ],
    },
    {
      id: "c-scale-3A-tr",
      prompt:
        "For $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$, the top-right entry of $3A$ is:",
      choices: [
        { text: "$5$", explain: "That adds, $3 + 2$. Scaling multiplies." },
        { text: "$3$", explain: "That scales the wrong entry, $3 \\times 1$. The top-right entry is $2$." },
        { text: "$12$", explain: "That scales a different entry, $3 \\times 4$. The top-right entry is $2$." },
        { text: "$6$", correct: true, explain: "$3 \\times 2 = 6$." },
      ],
    },
    {
      id: "c-scale-3A-br",
      prompt: "For the same $A$, the bottom-right entry of $3A$ is:",
      choices: [
        { text: "$7$", explain: "That adds, $3 + 4$. Scaling multiplies." },
        { text: "$12$", correct: true, explain: "$3 \\times 4 = 12$." },
        { text: "$9$", explain: "That scales the wrong entry, $3 \\times 3$. The bottom-right entry is $4$." },
        { text: "$4$", explain: "That forgot to multiply. A scalar must reach every entry." },
      ],
    },
    {
      id: "c-scale-neg-tl",
      prompt:
        "For $B = \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix}$, the top-left entry of $-2B$ is:",
      choices: [
        { text: "$10$", explain: "That drops the negative sign. $-2$ times $5$ is negative." },
        { text: "$3$", explain: "That adds, $-2 + 5$. Scaling multiplies." },
        { text: "$-10$", correct: true, explain: "$-2 \\times 5 = -10$." },
        { text: "$-7$", explain: "That subtracts, $-2 - 5$. Scaling multiplies." },
      ],
    },
    {
      id: "c-scale-neg-br",
      prompt: "For the same $B$, the bottom-right entry of $-2B$ is:",
      choices: [
        { text: "$-16$", correct: true, explain: "$-2 \\times 8 = -16$." },
        { text: "$16$", explain: "That drops the negative sign. A negative scalar flips the sign." },
        { text: "$6$", explain: "That adds, $-2 + 8$. Scaling multiplies." },
        { text: "$-10$", explain: "That scales the wrong entry, $-2 \\times 5$. The bottom-right entry is $8$." },
      ],
    },
    {
      id: "c-canadd-yes",
      prompt: "Can you add a $2 \\times 2$ matrix and another $2 \\times 2$ matrix?",
      choices: [
        { text: "No, you can only multiply matrices of the same size.", explain: "Same-shape matrices add fine, entry by entry." },
        { text: "Yes, and the sum is a single number.", explain: "Addition keeps the shape. It does not collapse to one number." },
        { text: "Yes, and the sum is $4 \\times 4$.", explain: "Addition never changes the shape. It stays $2 \\times 2$." },
        { text: "Yes, and the sum is $2 \\times 2$.", correct: true, explain: "Matching shapes add entrywise, and the sum keeps that shape." },
      ],
    },
    {
      id: "c-canadd-no",
      prompt: "Can you add a $3 \\times 2$ matrix and a $2 \\times 2$ matrix?",
      choices: [
        { text: "No, the shapes differ, so the sum is undefined.", correct: true, explain: "The row counts differ ($3$ vs $2$), so entries have no partners." },
        { text: "Yes, and the sum is $3 \\times 2$.", explain: "Addition needs identical shapes first. These differ." },
        { text: "Yes, and the sum is $2 \\times 2$.", explain: "There is no defined sum. You cannot pick a shape." },
        { text: "Yes, after padding with zeros.", explain: "You do not invent entries. A shape mismatch is simply undefined." },
      ],
    },
    {
      id: "c-identify-2A",
      prompt: "For $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$, which matrix is $2A$?",
      choices: [
        { text: "$\\begin{bmatrix} 3 & 4 \\\\ 5 & 6 \\end{bmatrix}$", explain: "That adds $2$ to each entry. Scaling multiplies instead." },
        { text: "$\\begin{bmatrix} 2 & 4 \\\\ 6 & 8 \\end{bmatrix}$", correct: true, explain: "Each entry of $A$ is multiplied by $2$." },
        { text: "$\\begin{bmatrix} 2 & 2 \\\\ 2 & 2 \\end{bmatrix}$", explain: "That replaces every entry with $2$. Multiply, do not overwrite." },
        { text: "$\\begin{bmatrix} 1 & 4 \\\\ 9 & 16 \\end{bmatrix}$", explain: "That squares each entry. $2A$ multiplies by $2$." },
      ],
    },
    {
      id: "c-identify-5A-bl",
      prompt: "For $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$, the bottom-left entry of $5A$ is:",
      choices: [
        { text: "$8$", explain: "That adds, $5 + 3$. Scaling multiplies." },
        { text: "$5$", explain: "That is just the scalar. Multiply it by the entry $3$." },
        { text: "$15$", correct: true, explain: "$5 \\times 3 = 15$." },
        { text: "$20$", explain: "That scales the wrong entry, $5 \\times 4$. The bottom-left entry is $3$." },
      ],
    },
    {
      id: "c-entrywise-def",
      prompt: "To add two matrices of the same shape, you:",
      choices: [
        { text: "multiply the entries in matching spots.", explain: "That is not addition. Multiplying entries is a different operation." },
        { text: "multiply each row of the first by each column of the second.", explain: "That describes matrix multiplication, not addition." },
        { text: "add every entry of the first to every entry of the second.", explain: "You only add partners in the same spot, not all possible pairs." },
        { text: "add the entries that sit in matching spots.", correct: true, explain: "Addition is entrywise: same row and same column pair up." },
      ],
    },
  ],
  summit: [
    {
      id: "s-full-add",
      prompt:
        "For $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$, $B = \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix}$, what is $A + B$?",
      choices: [
        { text: "$\\begin{bmatrix} 6 & 8 \\\\ 10 & 12 \\end{bmatrix}$", correct: true, explain: "Each entry is the sum of the two matching entries: $6, 8, 10, 12$." },
        { text: "$\\begin{bmatrix} 5 & 12 \\\\ 21 & 32 \\end{bmatrix}$", explain: "That multiplies entrywise. Addition adds the matching entries." },
        { text: "$\\begin{bmatrix} -4 & -4 \\\\ -4 & -4 \\end{bmatrix}$", explain: "That is $A - B$. Here you add, not subtract." },
        { text: "$\\begin{bmatrix} 6 & 10 \\\\ 8 & 12 \\end{bmatrix}$", explain: "Right numbers, but the off-diagonal entries are swapped." },
      ],
    },
    {
      id: "s-full-sub",
      prompt: "For the same $A$ and $B$, what is $A - B$?",
      choices: [
        { text: "$\\begin{bmatrix} 4 & 4 \\\\ 4 & 4 \\end{bmatrix}$", explain: "That is $B - A$. Subtraction order matters, so this has the wrong sign." },
        { text: "$\\begin{bmatrix} 6 & 8 \\\\ 10 & 12 \\end{bmatrix}$", explain: "That adds instead of subtracting. That matrix is $A + B$." },
        { text: "$\\begin{bmatrix} -4 & -4 \\\\ -4 & -4 \\end{bmatrix}$", correct: true, explain: "Each entry is $a - b$, and every one works out to $-4$." },
        { text: "$\\begin{bmatrix} -4 & 4 \\\\ -4 & 4 \\end{bmatrix}$", explain: "Sign slip. Every entry of $A - B$ is $-4$." },
      ],
    },
    {
      id: "s-full-2A-plus-B",
      prompt: "For the same $A$ and $B$, what is $2A + B$?",
      choices: [
        { text: "$\\begin{bmatrix} 11 & 14 \\\\ 17 & 20 \\end{bmatrix}$", explain: "That doubles $B$ instead of $A$. That is $A + 2B$." },
        { text: "$\\begin{bmatrix} 7 & 10 \\\\ 13 & 16 \\end{bmatrix}$", correct: true, explain: "Double $A$ to $\\begin{bmatrix} 2 & 4 \\\\ 6 & 8 \\end{bmatrix}$, then add $B$." },
        { text: "$\\begin{bmatrix} 12 & 16 \\\\ 20 & 24 \\end{bmatrix}$", explain: "That is $2(A + B)$. Only $A$ should be doubled here." },
        { text: "$\\begin{bmatrix} 6 & 8 \\\\ 10 & 12 \\end{bmatrix}$", explain: "That is $A + B$. You forgot to double $A$." },
      ],
    },
    {
      id: "s-full-3A-minus-2B",
      prompt: "For the same $A$ and $B$, what is $3A - 2B$?",
      choices: [
        { text: "$\\begin{bmatrix} 7 & 6 \\\\ 5 & 4 \\end{bmatrix}$", explain: "That is $2B - 3A$. The signs are all flipped." },
        { text: "$\\begin{bmatrix} 13 & 18 \\\\ 23 & 28 \\end{bmatrix}$", explain: "That added instead of subtracting ($3A + 2B$)." },
        { text: "$\\begin{bmatrix} -2 & 0 \\\\ 2 & 4 \\end{bmatrix}$", explain: "That subtracts $B$, not $2B$. Double $B$ first." },
        { text: "$\\begin{bmatrix} -7 & -6 \\\\ -5 & -4 \\end{bmatrix}$", correct: true, explain: "$\\begin{bmatrix} 3 & 6 \\\\ 9 & 12 \\end{bmatrix} - \\begin{bmatrix} 10 & 12 \\\\ 14 & 16 \\end{bmatrix}$ gives these entries." },
      ],
    },
    {
      id: "s-full-3A",
      prompt: "For $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$, what is $3A$?",
      choices: [
        { text: "$\\begin{bmatrix} 3 & 6 \\\\ 9 & 12 \\end{bmatrix}$", correct: true, explain: "Multiply every entry by $3$." },
        { text: "$\\begin{bmatrix} 4 & 5 \\\\ 6 & 7 \\end{bmatrix}$", explain: "That adds $3$ to each entry. A scalar multiplies." },
        { text: "$\\begin{bmatrix} 3 & 2 \\\\ 3 & 4 \\end{bmatrix}$", explain: "Only the top-left was scaled. A scalar hits every entry." },
        { text: "$\\begin{bmatrix} 1 & 4 \\\\ 9 & 16 \\end{bmatrix}$", explain: "That squares each entry. $3A$ multiplies by $3$." },
      ],
    },
    {
      id: "s-full-neg2B",
      prompt: "For $B = \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix}$, what is $-2B$?",
      choices: [
        { text: "$\\begin{bmatrix} 10 & 12 \\\\ 14 & 16 \\end{bmatrix}$", explain: "That drops the negative sign. $-2$ times a positive is negative." },
        { text: "$\\begin{bmatrix} -10 & 6 \\\\ 7 & 8 \\end{bmatrix}$", explain: "Only the first entry was scaled. A scalar reaches all of them." },
        { text: "$\\begin{bmatrix} -10 & -12 \\\\ -14 & -16 \\end{bmatrix}$", correct: true, explain: "Multiply every entry of $B$ by $-2$." },
        { text: "$\\begin{bmatrix} 3 & 4 \\\\ 5 & 6 \\end{bmatrix}$", explain: "That adds $-2$ to each entry. Scaling multiplies." },
      ],
    },
    {
      id: "s-prop-commute",
      prompt: "Which statement is always true?",
      choices: [
        { text: "$AB = BA$ for all matrices.", explain: "Matrix multiplication is not commutative in general." },
        { text: "$A + B = B + A$ for matrices of the same shape.", correct: true, explain: "Addition is commutative because each spot adds the same two numbers." },
        { text: "$A - B = B - A$ for all matrices.", explain: "Subtraction is not commutative. These differ by a sign." },
        { text: "$A + B$ is defined for any two matrices.", explain: "Addition is defined only when the shapes match." },
      ],
    },
    {
      id: "s-prop-distribute",
      prompt: "For a scalar $k$, which expression equals $k(A + B)$?",
      choices: [
        { text: "$kA + B$", explain: "The scalar must reach $B$ too, not just $A$." },
        { text: "$A + kB$", explain: "The scalar must reach $A$ too, not just $B$." },
        { text: "$k + AB$", explain: "Distribution spreads multiplication over a sum. This is not that." },
        { text: "$kA + kB$", correct: true, explain: "The scalar distributes onto both matrices: $k(A + B) = kA + kB$." },
      ],
    },
    {
      id: "s-shape-defined",
      prompt: "Which sum is defined?",
      choices: [
        { text: "$(2 \\times 2) + (2 \\times 3)$", explain: "The column counts differ ($2$ vs $3$)." },
        { text: "$(3 \\times 2) + (2 \\times 2)$", explain: "The row counts differ ($3$ vs $2$)." },
        { text: "$(2 \\times 3) + (2 \\times 3)$", correct: true, explain: "Identical shapes, so it is defined and the sum stays $2 \\times 3$." },
        { text: "$(2 \\times 3) + (3 \\times 2)$", explain: "Both the rows and the columns differ." },
      ],
    },
    {
      id: "s-shape-undefined",
      prompt: "Which sum is undefined?",
      choices: [
        { text: "$(3 \\times 2) + (2 \\times 3)$", correct: true, explain: "Rows differ ($3$ vs $2$) and columns differ ($2$ vs $3$)." },
        { text: "$(3 \\times 3) + (3 \\times 3)$", explain: "Identical shapes, so this is defined." },
        { text: "$(1 \\times 4) + (1 \\times 4)$", explain: "Identical shapes, so this is defined." },
        { text: "$(2 \\times 2) + (2 \\times 2)$", explain: "Identical shapes, so this is defined." },
      ],
    },
    {
      id: "s-solve-k",
      prompt:
        "For $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$, $B = \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix}$, find $k$ so the top-left entry of $A + kB$ equals $11$.",
      choices: [
        { text: "$k = 1$", explain: "$1 + 5(1) = 6$, not $11$." },
        { text: "$k = 2$", correct: true, explain: "The top-left is $1 + 5k$. Set $1 + 5k = 11$, so $5k = 10$ and $k = 2$." },
        { text: "$k = \\tfrac{11}{6}$", explain: "That divides $11$ by $6$. The equation is $1 + 5k = 11$." },
        { text: "$k = 10$", explain: "$1 + 5(10) = 51$, far larger than $11$." },
      ],
    },
    {
      id: "s-solve-c",
      prompt:
        "For $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$, $B = \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix}$, find $c$ so the top-left entry of $cA - B$ equals $0$.",
      choices: [
        { text: "$c = -5$", explain: "$-5 - 5 = -10$, not $0$." },
        { text: "$c = 1$", explain: "$1 - 5 = -4$, not $0$." },
        { text: "$c = 5$", correct: true, explain: "The top-left is $c - 5$. Set $c - 5 = 0$, so $c = 5$." },
        { text: "$c = \\tfrac{1}{5}$", explain: "That solves the wrong equation. You need $c - 5 = 0$." },
      ],
    },
    {
      id: "s-trap-mult",
      prompt:
        "A student computes $A + B = \\begin{bmatrix} 5 & 12 \\\\ 21 & 32 \\end{bmatrix}$ for $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$, $B = \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix}$. What went wrong?",
      choices: [
        { text: "Nothing, that is correct.", explain: "That is the entrywise product, not the sum." },
        { text: "They used $B + A$ instead of $A + B$.", explain: "Addition is commutative, so $B + A$ gives the same correct sum." },
        { text: "They should have subtracted.", explain: "The task is addition. The fix is to add matching entries." },
        { text: "They multiplied matching entries instead of adding. $A + B = \\begin{bmatrix} 6 & 8 \\\\ 10 & 12 \\end{bmatrix}$.", correct: true, explain: "Each entry of a sum is $a_{ij} + b_{ij}$, giving $6, 8, 10, 12$." },
      ],
    },
    {
      id: "s-trap-partial-scale",
      prompt:
        "To compute $3A$ for $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$, a student writes $\\begin{bmatrix} 3 & 2 \\\\ 3 & 4 \\end{bmatrix}$. What went wrong?",
      choices: [
        { text: "They scaled only the top-left. A scalar hits every entry, so $3A = \\begin{bmatrix} 3 & 6 \\\\ 9 & 12 \\end{bmatrix}$.", correct: true, explain: "Only the top-left was multiplied by $3$. The other three were left alone." },
        { text: "Nothing, that is correct.", explain: "Three of the entries were never scaled." },
        { text: "They squared the entries.", explain: "Squaring would give $\\begin{bmatrix} 1 & 4 \\\\ 9 & 16 \\end{bmatrix}$, which is different." },
        { text: "They added $3$ to each entry.", explain: "Adding $3$ would give $\\begin{bmatrix} 4 & 5 \\\\ 6 & 7 \\end{bmatrix}$, which is different." },
      ],
    },
    {
      id: "s-trap-shape",
      prompt:
        "A student adds a $2 \\times 2$ matrix to a $2 \\times 3$ matrix by dropping the extra column. Is that allowed?",
      choices: [
        { text: "Yes, dropping the extra column makes the shapes match.", explain: "You cannot delete data to force a match. The sum is undefined as given." },
        { text: "No, addition needs identical shapes, so this sum is undefined.", correct: true, explain: "Every entry needs a partner in the same spot, so the shapes must be identical." },
        { text: "Yes, but only if the extra column is all zeros.", explain: "It is still undefined. You do not edit a matrix just to add it." },
        { text: "Yes, and the result is $2 \\times 3$.", explain: "There is no defined sum. The shapes do not match." },
      ],
    },
  ],
};
