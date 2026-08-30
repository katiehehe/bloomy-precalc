import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb and Summit for vec-ops: add, subtract, and scale vectors.
 * Every number is checked by hand. Distractors are built from the common
 * mistakes: adding within a vector, sign slips on subtraction, scaling only
 * one component, forgetting to scale before combining, and confusing k(v)
 * with k^2 on the magnitude.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "co-c-add1",
      prompt: "Add componentwise: $(2, 3) + (4, 1)$.",
      choices: [
        { text: "$(6, 4)$", correct: true, explain: "Add matching parts: $(2 + 4,\\ 3 + 1) = (6, 4)$." },
        { text: "$(5, 5)$", explain: "Trap: this adds each vector's own two numbers ($2 + 3$ and $4 + 1$). Add across vectors instead, horizontal with horizontal." },
        { text: "$(-2, 2)$", explain: "Trap: this subtracts. The problem asks for a sum, so add each pair, not subtract." },
        { text: "$10$", explain: "Trap: this sums all four numbers into one. A vector sum keeps two separate components." },
      ],
    },
    {
      id: "co-c-add2",
      prompt: "To add $a$ and $b$ geometrically with the tip-to-tail rule, you place:",
      choices: [
        { text: "the tail of $b$ on the tip of $a$", correct: true, explain: "Tip to tail means $b$ starts where $a$ ends, and the sum runs from $a$'s tail to $b$'s tip." },
        { text: "the tip of $b$ on the tip of $a$", explain: "Trap: joining the two tips does not build a chain. The tail of $b$ must land on the tip of $a$." },
        { text: "the tail of $b$ on the tail of $a$", explain: "Trap: both tails at the origin is the setup for the parallelogram picture, not the tip-to-tail chain. Move $b$ to the tip of $a$." },
        { text: "the tip of $b$ on the tail of $a$", explain: "Trap: this reverses the order. Start the second arrow at the end of the first." },
      ],
    },
    {
      id: "co-c-sub-def",
      prompt: "The difference $a - b$ is equal to:",
      choices: [
        { text: "$a + (-b)$", correct: true, explain: "Subtracting a vector means adding its opposite, so $a - b = a + (-b)$." },
        { text: "$a + b$", explain: "Trap: that is the sum, not the difference. Subtraction flips the sign of $b$ first." },
        { text: "$b + (-a)$", explain: "Trap: that equals $b - a$, the opposite of what we want. Keep $a$ positive and flip $b$." },
        { text: "$-a + (-b)$", explain: "Trap: this flips both vectors, giving $-(a + b)$. Only the second vector is reversed." },
      ],
    },
    {
      id: "co-c-sub1",
      prompt: "Subtract componentwise: $(7, 3) - (2, 5)$.",
      choices: [
        { text: "$(5, -2)$", correct: true, explain: "Do each coordinate: $7 - 2 = 5$ and $3 - 5 = -2$." },
        { text: "$(5, 2)$", explain: "Trap: a sign slip on the second part. $3 - 5 = -2$, not $+2$." },
        { text: "$(9, 8)$", explain: "Trap: this adds instead of subtracts. The problem is a difference." },
        { text: "$(5, 8)$", explain: "Trap: this subtracts the first part but adds the second. Subtract both parts." },
      ],
    },
    {
      id: "co-c-negb",
      prompt: "What is $-b$ when $b = (3, -2)$?",
      choices: [
        { text: "$(-3, 2)$", correct: true, explain: "The opposite flips the sign of every component: $-(3, -2) = (-3, 2)$." },
        { text: "$(3, 2)$", explain: "Trap: only the second sign was flipped. Flip both." },
        { text: "$(-3, -2)$", explain: "Trap: only the first sign was flipped. Flip both." },
        { text: "$(2, -3)$", explain: "Trap: this swaps the components. Negation changes signs, it does not reorder." },
      ],
    },
    {
      id: "co-c-scale1",
      prompt: "Compute $4v$ for $v = (2, 3)$.",
      choices: [
        { text: "$(8, 12)$", correct: true, explain: "Multiply both components by $4$: $(4 \\cdot 2,\\ 4 \\cdot 3) = (8, 12)$." },
        { text: "$(8, 3)$", explain: "Trap: only the first component was scaled. Scalar multiplication hits both." },
        { text: "$(6, 7)$", explain: "Trap: this adds $4$ to each component. Scaling multiplies, it does not add." },
        { text: "$(2, 12)$", explain: "Trap: only the second component was scaled. Multiply both by $4$." },
      ],
    },
    {
      id: "co-c-scale-both",
      prompt: "To compute the scalar multiple $k\\,v$, you multiply:",
      choices: [
        { text: "every component of $v$ by $k$", correct: true, explain: "Right: $k(v_x, v_y) = (k\\,v_x,\\ k\\,v_y)$, both components scaled the same way." },
        { text: "only the first component of $v$ by $k$", explain: "Trap: scaling only $v_x$ changes the direction. Both parts must be multiplied." },
        { text: "$v$ by itself $k$ times", explain: "Trap: that would multiply vectors together. A scalar just stretches one vector." },
        { text: "the magnitude of $v$ by $k$ and leave the components", explain: "Trap: to actually get the new components, you scale each of them by $k$." },
      ],
    },
    {
      id: "co-c-flip",
      prompt: "What is $(-1)\\,v$?",
      choices: [
        { text: "the opposite vector $-v$, same length, reversed direction", correct: true, explain: "Multiplying by $-1$ keeps $|v|$ but points the other way." },
        { text: "the same vector $v$", explain: "Trap: a negative scalar reverses direction, so it is not unchanged." },
        { text: "the zero vector $(0, 0)$", explain: "Trap: multiplying by $0$ gives the zero vector. Here the scalar is $-1$." },
        { text: "a vector twice as long", explain: "Trap: the size of the scalar is $1$, so the length is unchanged. Only the direction flips." },
      ],
    },
    {
      id: "co-c-zero",
      prompt: "What is $0 \\cdot v$ for any vector $v$?",
      choices: [
        { text: "the zero vector $(0, 0)$", correct: true, explain: "Every component times $0$ is $0$, giving $(0, 0)$." },
        { text: "the vector $v$ unchanged", explain: "Trap: multiplying by $1$ leaves $v$ alone. Multiplying by $0$ collapses it to the origin." },
        { text: "undefined", explain: "Trap: $0 \\cdot v$ is perfectly defined. It is the zero vector." },
        { text: "a unit vector", explain: "Trap: a unit vector has length $1$. Scaling by $0$ gives length $0$." },
      ],
    },
    {
      id: "co-c-2a",
      prompt: "For $a = (3, 2)$, what is $2a$?",
      choices: [
        { text: "$(6, 4)$", correct: true, explain: "Double both components: $(2 \\cdot 3,\\ 2 \\cdot 2) = (6, 4)$." },
        { text: "$(3, 2)$", explain: "Trap: this is $a$ unchanged. The factor $2$ must multiply each part." },
        { text: "$(6, 2)$", explain: "Trap: only the first component was doubled. Double both." },
        { text: "$(5, 4)$", explain: "Trap: this adds $2$ to the first part. Scaling multiplies." },
      ],
    },
    {
      id: "co-c-a-plus-2b",
      prompt: "Compute $a + 2b$ for $a = (1, 1)$ and $b = (2, 3)$.",
      choices: [
        { text: "$(5, 7)$", correct: true, explain: "Scale first: $2b = (4, 6)$, then add $a$: $(1 + 4,\\ 1 + 6) = (5, 7)$." },
        { text: "$(3, 4)$", explain: "Trap: this is $a + b$, forgetting to double $b$ before adding." },
        { text: "$(6, 8)$", explain: "Trap: this doubles both $a$ and $b$. Only $b$ carries the factor $2$." },
        { text: "$(5, 8)$", explain: "Trap: a slip in the vertical part. $1 + 6 = 7$, not $8$." },
      ],
    },
    {
      id: "co-c-half",
      prompt: "Compute $0.5\\,v$ for $v = (4, 6)$.",
      choices: [
        { text: "$(2, 3)$", correct: true, explain: "Halve both components: $(0.5 \\cdot 4,\\ 0.5 \\cdot 6) = (2, 3)$." },
        { text: "$(8, 12)$", explain: "Trap: this multiplies by $2$. A scalar of $0.5$ shrinks, it does not stretch." },
        { text: "$(2, 6)$", explain: "Trap: only the first component was halved. Scale both." },
        { text: "$(4, 3)$", explain: "Trap: only the second component was halved. Scale both." },
      ],
    },
    {
      id: "co-c-comm",
      prompt: "Which statement about vector operations is always true?",
      choices: [
        { text: "$a + b = b + a$", correct: true, explain: "Addition is commutative, since adding matching components can be done in either order." },
        { text: "$a - b = b - a$", explain: "Trap: subtraction is not commutative. In fact $b - a = -(a - b)$, the opposite." },
        { text: "$a + b = a - b$", explain: "Trap: these are equal only when $b = 0$. In general adding and subtracting differ." },
        { text: "$2a = a + 2$", explain: "Trap: you cannot add a number to a vector. $2a$ scales, it does not add $2$." },
      ],
    },
    {
      id: "co-c-sub-order",
      prompt: "How do $a - b$ and $b - a$ compare?",
      choices: [
        { text: "They are opposites: $b - a = -(a - b)$", correct: true, explain: "Swapping the order flips every component's sign, giving the opposite vector." },
        { text: "They are always equal", explain: "Trap: that would make subtraction commutative, which it is not." },
        { text: "They are unrelated", explain: "Trap: they are tightly related. One is the negative of the other." },
        { text: "$b - a$ is always the zero vector", explain: "Trap: that only happens when $a = b$. In general it is $-(a - b)$." },
      ],
    },
    {
      id: "co-c-add3",
      prompt: "Add: $(3, -2) + (-1, 5)$.",
      choices: [
        { text: "$(2, 3)$", correct: true, explain: "Add each pair: $(3 + (-1),\\ -2 + 5) = (2, 3)$." },
        { text: "$(4, -7)$", explain: "Trap: this subtracts the second vector. The signs are already built in, just add." },
        { text: "$(2, 7)$", explain: "Trap: this treats $-2$ as $+2$. Keep the negative: $-2 + 5 = 3$." },
        { text: "$(8, -3)$", explain: "Trap: this mixes the parts across, adding a horizontal to a vertical. Keep them separate." },
      ],
    },
  ],
  summit: [
    {
      id: "co-s-add-neg",
      prompt: "Add: $(-3, 4) + (5, -6)$.",
      choices: [
        { text: "$(2, -2)$", correct: true, explain: "Add each pair with signs: $(-3 + 5,\\ 4 + (-6)) = (2, -2)$." },
        { text: "$(2, 2)$", explain: "Trap: a sign slip on the vertical part. $4 + (-6) = -2$, not $+2$." },
        { text: "$(-8, 10)$", explain: "Trap: this subtracts instead of adding. The problem is a sum." },
        { text: "$(8, -2)$", explain: "Trap: this drops the sign on the first vector. $-3 + 5 = 2$, not $8$." },
      ],
    },
    {
      id: "co-s-sub-neg",
      prompt: "Subtract: $(-2, 5) - (-4, 3)$.",
      choices: [
        { text: "$(2, 2)$", correct: true, explain: "Subtracting a negative adds: $-2 - (-4) = 2$ and $5 - 3 = 2$." },
        { text: "$(-6, 8)$", explain: "Trap: this adds both parts as if there were no minus sign in front. Subtract, which flips the second vector to $(4, -3)$." },
        { text: "$(-6, 2)$", explain: "Trap: $-2 - (-4)$ was treated as $-2 + (-4) = -6$. Subtracting $-4$ means adding $4$." },
        { text: "$(2, 8)$", explain: "Trap: the vertical part was added, $5 + 3$. It should be $5 - 3 = 2$." },
      ],
    },
    {
      id: "co-s-scale-neg",
      prompt: "Compute $-3v$ for $v = (2, -1)$.",
      choices: [
        { text: "$(-6, 3)$", correct: true, explain: "Multiply both by $-3$: $(-3 \\cdot 2,\\ -3 \\cdot -1) = (-6, 3)$." },
        { text: "$(-6, -3)$", explain: "Trap: a sign slip. $-3 \\cdot (-1) = +3$, not $-3$." },
        { text: "$(6, -3)$", explain: "Trap: the negative sign was dropped from the first part. $-3 \\cdot 2 = -6$." },
        { text: "$(-6, -1)$", explain: "Trap: only the first component was scaled. Multiply both by $-3$." },
      ],
    },
    {
      id: "co-s-2a-b",
      prompt: "Compute $2a - b$ for $a = (3, 1)$ and $b = (2, 4)$.",
      choices: [
        { text: "$(4, -2)$", correct: true, explain: "Scale first: $2a = (6, 2)$, then subtract $b$: $(6 - 2,\\ 2 - 4) = (4, -2)$." },
        { text: "$(1, -3)$", explain: "Trap: this is $a - b$, forgetting to double $a$ first." },
        { text: "$(8, 6)$", explain: "Trap: this computes $2a + b$, adding instead of subtracting." },
        { text: "$(4, -3)$", explain: "Trap: only $a_x$ was doubled. Double both parts of $a$: $2a = (6, 2)$." },
      ],
    },
    {
      id: "co-s-3a-2b",
      prompt: "Compute $3a - 2b$ for $a = (1, 2)$ and $b = (2, 1)$.",
      choices: [
        { text: "$(-1, 4)$", correct: true, explain: "Scale: $3a = (3, 6)$ and $2b = (4, 2)$, then subtract: $(3 - 4,\\ 6 - 2) = (-1, 4)$." },
        { text: "$(1, 4)$", explain: "Trap: a sign slip. $3 - 4 = -1$, not $+1$." },
        { text: "$(7, 8)$", explain: "Trap: this adds $3a + 2b$ instead of subtracting." },
        { text: "$(-1, -4)$", explain: "Trap: a sign slip on the vertical part. $6 - 2 = +4$." },
      ],
    },
    {
      id: "co-s-tiptail",
      prompt: "In the tip-to-tail rule, to form $a + b$ you slide $b$ so that:",
      choices: [
        { text: "its tail sits on the tip of $a$", correct: true, explain: "The second arrow begins where the first ends, and the sum spans the whole chain." },
        { text: "its tip sits on the tip of $a$", explain: "Trap: joining the tips does not chain the arrows. The tail of $b$ goes on the tip of $a$." },
        { text: "its tail sits on the tail of $a$", explain: "Trap: leaving both at the origin is the parallelogram setup, not the tip-to-tail chain." },
        { text: "its tip sits on the tail of $a$", explain: "Trap: this points $b$ backward into $a$. Place the tail of $b$ at the tip of $a$." },
      ],
    },
    {
      id: "co-s-scale-mag",
      prompt: "If $|v| = 5$, what is $|3v|$?",
      choices: [
        { text: "$15$", correct: true, explain: "Scaling by $3$ triples the length: $|3v| = 3\\,|v| = 15$." },
        { text: "$5$", explain: "Trap: the length does change. Multiplying by $3$ makes it three times longer." },
        { text: "$8$", explain: "Trap: this adds $3$ to the length. Scaling multiplies the length instead." },
        { text: "$45$", explain: "Trap: this multiplies by $3^2 = 9$. Length scales by $|k|$, not $k^2$." },
      ],
    },
    {
      id: "co-s-scale-dir",
      prompt: "Multiplying $v$ by the positive scalar $4$ changes:",
      choices: [
        { text: "the length only, not the direction", correct: true, explain: "A positive scalar stretches the arrow along the same line, so the heading is unchanged." },
        { text: "the direction only, not the length", explain: "Trap: a positive scalar leaves direction alone but does change the length." },
        { text: "neither the length nor the direction", explain: "Trap: the length becomes four times as long, so it does change." },
        { text: "both the length and the direction", explain: "Trap: only a negative scalar flips direction. A positive one keeps it." },
      ],
    },
    {
      id: "co-s-sub-geo",
      prompt: "Geometrically, $a - b$ is found by:",
      choices: [
        { text: "reversing $b$ into $-b$ and adding it to $a$ tip to tail", correct: true, explain: "Since $a - b = a + (-b)$, you flip $b$ and use the ordinary sum." },
        { text: "reversing $a$ and adding $b$", explain: "Trap: only the second vector is reversed for $a - b$. Flipping $a$ would give $b - a$." },
        { text: "placing both tips together and connecting the tails", explain: "Trap: that is a made-up rule. Reverse $b$, then add tip to tail." },
        { text: "adding $a$ and $b$ and then halving", explain: "Trap: halving the sum gives the midpoint, not the difference." },
      ],
    },
    {
      id: "co-s-solve-b1",
      prompt: "If $a + b = (5, 3)$ and $a = (2, 1)$, what is $b$?",
      choices: [
        { text: "$(3, 2)$", correct: true, explain: "Solve $b = (a + b) - a = (5 - 2,\\ 3 - 1) = (3, 2)$." },
        { text: "$(7, 4)$", explain: "Trap: this adds $a$ to the sum. To isolate $b$, subtract $a$." },
        { text: "$(3, 4)$", explain: "Trap: a slip on the vertical part. $3 - 1 = 2$, not $4$." },
        { text: "$(-3, -2)$", explain: "Trap: the subtraction was done backwards, $a - (a + b)$. Subtract $a$ from the sum." },
      ],
    },
    {
      id: "co-s-solve-b2",
      prompt: "If $a - b = (1, -2)$ and $a = (3, 1)$, what is $b$?",
      choices: [
        { text: "$(2, 3)$", correct: true, explain: "From $a - b = (1, -2)$, we get $b = a - (a - b) = (3 - 1,\\ 1 - (-2)) = (2, 3)$." },
        { text: "$(4, -1)$", explain: "Trap: this adds, computing $a + (a - b)$. Solve for $b$ by subtracting the difference from $a$." },
        { text: "$(2, -3)$", explain: "Trap: a sign slip. $1 - (-2) = 3$, not $-3$." },
        { text: "$(-2, 3)$", explain: "Trap: the first part has the wrong sign. $3 - 1 = 2$, not $-2$." },
      ],
    },
    {
      id: "co-s-half-combo",
      prompt: "Compute $0.5\\,a + b$ for $a = (4, 2)$ and $b = (1, 1)$.",
      choices: [
        { text: "$(3, 2)$", correct: true, explain: "Scale first: $0.5\\,a = (2, 1)$, then add $b$: $(2 + 1,\\ 1 + 1) = (3, 2)$." },
        { text: "$(5, 3)$", explain: "Trap: this is $a + b$, forgetting to halve $a$ first." },
        { text: "$(2.5, 2)$", explain: "Trap: the $0.5$ was applied to the sum's first part only. Halve $a$ before adding." },
        { text: "$(3, 3)$", explain: "Trap: a slip on the vertical part. $1 + 1 = 2$, not $3$." },
      ],
    },
    {
      id: "co-s-scale-only-one",
      prompt: "A student writes $3(2, 4) = (6, 4)$. What went wrong?",
      choices: [
        { text: "They scaled only the first component, so it should be $(6, 12)$", correct: true, explain: "Both components must be multiplied by $3$: $(3 \\cdot 2,\\ 3 \\cdot 4) = (6, 12)$." },
        { text: "Nothing, the answer is correct", explain: "Trap: $3 \\cdot 4 = 12$, so the vertical part is wrong. The answer is $(6, 12)$." },
        { text: "They should have added: $(5, 7)$", explain: "Trap: scaling multiplies, it does not add $3$ to each part." },
        { text: "They should have used $3^2$: $(18, 36)$", explain: "Trap: a scalar multiplies once, not squared. The result is $(6, 12)$." },
      ],
    },
    {
      id: "co-s-zero-combo",
      prompt: "What is $a - a$ for any vector $a$?",
      choices: [
        { text: "the zero vector $(0, 0)$", correct: true, explain: "Each component minus itself is $0$, so the difference is $(0, 0)$." },
        { text: "$a$", explain: "Trap: subtracting a vector from itself cancels it, it does not leave $a$." },
        { text: "$2a$", explain: "Trap: that is the sum $a + a$. Here we subtract, which cancels." },
        { text: "$1$", explain: "Trap: the result is a vector, not the number $1$. It is $(0, 0)$." },
      ],
    },
    {
      id: "co-s-neg-scale-both",
      prompt: "Compute $-2(3, -1)$.",
      choices: [
        { text: "$(-6, 2)$", correct: true, explain: "Multiply both by $-2$: $(-2 \\cdot 3,\\ -2 \\cdot -1) = (-6, 2)$." },
        { text: "$(-6, -2)$", explain: "Trap: a sign slip. $-2 \\cdot (-1) = +2$." },
        { text: "$(6, -2)$", explain: "Trap: the negative was dropped from the first part. $-2 \\cdot 3 = -6$." },
        { text: "$(-5, -3)$", explain: "Trap: this subtracts $2$ from each part. Scaling multiplies by $-2$." },
      ],
    },
  ],
};
