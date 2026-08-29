import type { Slide } from "../types";

/**
 * Limits from graphs and tables. Running examples, all hand-verified:
 *   g(x) = (x^2 - 4)/(x - 2) = x + 2 for x != 2, hole at (2, 4), lim = 4.
 *   h(x) = x + 2 for x != 2 with h(2) = 1: lim = 4 but value = 1.
 *   p(x) = x - 1 for x <= 2, x + 1 for x > 2: left limit 1, right limit 3, DNE.
 *
 * Reveal flags are read literally in Stage.tsx (see its flags-per-mode block).
 * The set of flags set here equals the set read there (zero dead flags):
 *   approach: curve, hole, approach, table, limit
 *   onesided: curve, hole (base), left, right, twoSided
 *   value:    curve, hole (base), value, limit, gap
 *   jump:     leftBranch, rightBranch, marks, dne
 *   yourturn: curve, hole (base)
 */

export const slides: Slide[] = [
  {
    id: "approach",
    title: "What a limit means",
    mode: "approach",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Here is a function built as one polynomial divided by another: $g(x) = \\dfrac{x^2 - 4}{x - 2}$. The top factors, since $x^2 - 4 = (x - 2)(x + 2)$, so $g(x) = \\dfrac{(x - 2)(x + 2)}{x - 2}$. For every input except $x = 2$ the $(x - 2)$ on top and bottom cancel, leaving the simple line $g(x) = x + 2$.",
        add: { curve: true },
        draw: true,
      },
      {
        text: "At $x = 2$ something breaks. Substituting gives $\\dfrac{2^2 - 4}{2 - 2} = \\dfrac{0}{0}$, which is undefined, so $g(2)$ does not exist. On the graph that shows up as a **hole**: one missing point, drawn as an open (hollow) circle at $(2, 4)$. The line is unbroken everywhere else.",
        add: { hole: true },
      },
      {
        text: "A **limit** asks a different question than 'what is $g(2)$'. It asks: as $x$ gets close to $2$, what height does $g(x)$ head toward? To find out we **approach** $2$ from both sides, trying inputs a little less than $2$ and a little more than $2$, shown by the dashed vertical line at $x = 2$. The table below lists those inputs and their outputs.",
        add: { approach: true, table: true },
      },
      {
        text: "Read the outputs. From the left, $g(1.9) = 3.9$, then $3.99$, then $3.999$. From the right, $g(2.1) = 4.1$, then $4.01$, then $4.001$. Both sides close in on the one height $4$, drawn as the dashed horizontal line. We write $\\lim_{x \\to 2} g(x) = 4$, read 'the limit of $g$ as $x$ approaches $2$ is $4$', even though $g(2)$ itself is missing.",
        add: { limit: true },
      },
    ],
    practice:
      "In a table, the limit is the single height the outputs settle on as the inputs close in on $2$ from both sides.",
    questions: [
      {
        kind: "choice",
        prompt: "The value of $\\lim_{x \\to 2} g(x)$ is the height that $g(x)$:",
        options: [
          "heads toward as $x$ approaches $2$ from both sides",
          "reaches exactly at $x = 2$",
          "takes at its $y$-intercept",
          "never gets close to",
        ],
        answer: 0,
        hint: "A limit is about the trend near the input, not the value at it.",
        success: "Right: the limit is the height the outputs approach from both sides.",
      },
      {
        kind: "choice",
        prompt:
          "A table shows $g(1.99) = 3.99$, $g(1.999) = 3.999$, $g(2.001) = 4.001$, $g(2.01) = 4.01$. The table points to $\\lim_{x \\to 2} g(x) =$",
        options: ["$2$", "$4$", "$0$", "the limit does not exist"],
        answer: 1,
        hint: "Both sides are closing in on the same number.",
        success: "Yes: both sides settle on $4$, so the limit is $4$.",
      },
    ],
  },
  {
    id: "onesided",
    title: "Left-hand and right-hand limits",
    mode: "onesided",
    hideSliders: true,
    baseReveal: { curve: true, hole: true },
    beats: [
      {
        text: "Sometimes we care about just one side. The **left-hand limit**, written $\\lim_{x \\to 2^{-}} g(x)$, looks only at inputs slightly **less** than $2$. That is what the small minus sign on the $2$ means. Coming in from the left along $y = x + 2$, the outputs $3.9, 3.99, 3.999$ head toward $4$, so $\\lim_{x \\to 2^{-}} g(x) = 4$.",
        add: { left: true },
      },
      {
        text: "The **right-hand limit**, written $\\lim_{x \\to 2^{+}} g(x)$, looks only at inputs slightly **greater** than $2$. That is the small plus sign. Coming in from the right, the outputs $4.1, 4.01, 4.001$ also head toward $4$, so $\\lim_{x \\to 2^{+}} g(x) = 4$.",
        add: { right: true },
      },
      {
        text: "Here is the rule that ties them together: the two-sided limit $\\lim_{x \\to 2} g(x)$ **exists** only when both one-sided limits exist and are **equal**. The left gives $4$ and the right gives $4$, they agree, so $\\lim_{x \\to 2} g(x) = 4$. Make sure to check both sides before you claim a two-sided limit exists.",
        add: { twoSided: true },
      },
    ],
    practice:
      "The two-sided limit exists only if the left-hand and right-hand limits are equal. Here both equal $4$.",
    questions: [
      {
        kind: "choice",
        prompt: "$\\lim_{x \\to 2^{-}} g(x)$, the left-hand limit, uses inputs that are:",
        options: [
          "slightly less than $2$",
          "slightly greater than $2$",
          "exactly equal to $2$",
          "very far from $2$",
        ],
        answer: 0,
        hint: "The minus superscript means you come in from below.",
        success: "Right: the minus sign means approach from the left, $x$ slightly less than $2$.",
      },
      {
        kind: "choice",
        prompt: "The two-sided limit $\\lim_{x \\to a} f(x)$ exists exactly when:",
        options: [
          "the left-hand limit exists, whatever the right does",
          "$f(a)$ is defined",
          "the left-hand and right-hand limits both exist and are equal",
          "the two one-sided limits exist, even if they differ",
        ],
        answer: 2,
        hint: "Both sides must agree on the same height.",
        success: "Yes: both one-sided limits must exist and match.",
      },
    ],
  },
  {
    id: "limit-vs-value",
    title: "The limit ignores the value",
    mode: "value",
    hideSliders: true,
    baseReveal: { curve: true, hole: true },
    beats: [
      {
        text: "Now change one thing. Define a new function $h$ that equals $x + 2$ for every $x \\ne 2$, but is assigned the specific value $h(2) = 1$. The graph is the same line with the same hole at $(2, 4)$, plus one filled (closed) dot sitting down at $(2, 1)$, which is the actual value $h(2)$.",
        add: { value: true },
      },
      {
        text: "What is $\\lim_{x \\to 2} h(x)$? A limit only cares about the trend as $x$ approaches $2$, and near $2$ the function still rides the line $x + 2$ toward height $4$. The lone point at $(2, 1)$ is not on that path. So $\\lim_{x \\to 2} h(x) = 4$, marked again by the dashed line at $y = 4$.",
        add: { limit: true },
      },
      {
        text: "Compare the two facts at $x = 2$: the **limit** is $4$ (the hollow hole, the height the branches head to), while the **value** $h(2) = 1$ (the filled dot). They disagree, and that is allowed. A limit describes the neighborhood around $2$, so it **ignores** the single value $h(2)$. When the limit exists but does not match the value, the break is called a **removable discontinuity**.",
        add: { gap: true },
      },
    ],
    practice:
      "At $x = 2$ the limit is $4$ (the hole height) while the value $h(2) = 1$ (the filled dot). The limit ignores the value.",
    questions: [
      {
        kind: "choice",
        prompt: "For $h$ with a hole at $(2, 4)$ and $h(2) = 1$, the value of $\\lim_{x \\to 2} h(x)$ is:",
        options: [
          "$1$, the value $h(2)$",
          "$4$, the height the branches approach",
          "nonexistent, because $h(2) \\ne 4$",
          "$2$",
        ],
        answer: 1,
        hint: "The limit follows the branches, not the single plotted value.",
        success: "Right: the branches head to $4$, so the limit is $4$. The value $1$ is irrelevant.",
      },
      {
        kind: "choice",
        prompt: "A function has $\\lim_{x \\to 2} f(x) = 4$ but $f(2) = 1$. This kind of break is a:",
        options: [
          "removable discontinuity",
          "jump, so the limit does not exist",
          "vertical asymptote",
          "place where the limit must equal $1$",
        ],
        answer: 0,
        hint: "The limit exists but the value sits at a different height.",
        success: "Yes: the limit exists yet differs from the value, a removable discontinuity.",
      },
    ],
  },
  {
    id: "jump",
    title: "A jump makes the limit vanish",
    mode: "jump",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "Here is a **piecewise** function, one built from different rules on different stretches of the number line: $p(x) = x - 1$ when $x \\le 2$, and $p(x) = x + 1$ when $x > 2$. Start on the left piece. For inputs up to and including $2$ the graph follows $x - 1$, ending at the filled point $(2, 1)$, so $p(2) = 1$.",
        add: { leftBranch: true },
        draw: true,
      },
      {
        text: "For inputs greater than $2$ the graph switches to the other rule, $x + 1$. Just to the right of $2$ the height is near $2 + 1 = 3$, but $x = 2$ is not part of this piece, so that endpoint is an open (hollow) circle at $(2, 3)$. The graph has a visible break at $x = 2$: a **jump**.",
        add: { rightBranch: true },
        draw: true,
      },
      {
        text: "Read the one-sided limits off the two heights. From the left the outputs approach $1$, so $\\lim_{x \\to 2^{-}} p(x) = 1$, drawn as the dashed line at $y = 1$. From the right they approach $3$, so $\\lim_{x \\to 2^{+}} p(x) = 3$, drawn at $y = 3$.",
        add: { marks: true },
      },
      {
        text: "Now apply the rule. The left-hand limit is $1$ and the right-hand limit is $3$, and $1 \\ne 3$. Because the two sides disagree, the two-sided limit $\\lim_{x \\to 2} p(x)$ **does not exist**, often shortened to DNE. Notice this holds even though $p(2) = 1$ is perfectly defined: a defined value cannot rescue a limit when the sides disagree.",
        add: { dne: true },
      },
    ],
    practice:
      "When the left-hand and right-hand limits differ (here $1$ and $3$), the two-sided limit does not exist, whatever the value at the point.",
    questions: [
      {
        kind: "choice",
        prompt:
          "For the jump $p$ with $\\lim_{x \\to 2^{-}} p(x) = 1$ and $\\lim_{x \\to 2^{+}} p(x) = 3$, the two-sided limit $\\lim_{x \\to 2} p(x)$:",
        options: [
          "equals $1$, the left-hand value",
          "equals $2$, the average of the two",
          "does not exist, because the two sides differ",
          "equals $3$, the right-hand value",
        ],
        answer: 2,
        hint: "A two-sided limit needs the sides to agree.",
        success: "Right: $1 \\ne 3$, so the two-sided limit does not exist.",
      },
      {
        kind: "choice",
        prompt: "In that jump, $p(2) = 1$ is defined. Does having a value make the two-sided limit exist?",
        options: [
          "No, the sides still disagree, so it does not exist",
          "Yes, a defined value forces the limit to exist",
          "Yes, the limit then equals $p(2) = 1$",
          "Only if $p(2)$ equals the average of $1$ and $3$",
        ],
        answer: 0,
        hint: "The limit depends on the trend from both sides, not on $p(2)$.",
        success: "Yes: the value at the point never fixes disagreeing one-sided limits.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn",
    mode: "yourturn",
    hideSliders: true,
    baseReveal: { curve: true, hole: true },
    beats: [
      {
        text: "Back to the removable hole. This is $g(x) = x + 2$ with a single hole at $x = 2$, the open circle where $g(2)$ is missing.",
      },
      {
        text: "Reading the line from the left and from the right, both branches climb toward the very same height as they near $x = 2$.",
      },
      {
        text: "That shared height is the limit. Even though the point itself is punched out, the branches still aim squarely at it, so the two-sided limit is well defined.",
      },
    ],
    practice: "Click the point that both branches head toward as $x$ approaches $2$.",
    questions: [
      {
        kind: "plot",
        prompt: "Click the point both branches head toward as $x \\to 2$.",
        target: { x: 2, y: 4 },
        tolerance: 0.6,
        label: "(2, 4)",
        hint: "Follow the line $y = x + 2$ to where $x = 2$. The height there is $2 + 2$.",
        success: "Yes: both branches aim at $(2, 4)$, so $\\lim_{x \\to 2} g(x) = 4$.",
      },
      {
        kind: "choice",
        prompt: "Even though $g(2)$ is undefined (a hole), $\\lim_{x \\to 2} g(x)$ equals:",
        options: [
          "$4$",
          "undefined, since $g(2)$ is undefined",
          "$0$",
          "$2$",
        ],
        answer: 0,
        hint: "A hole does not stop a limit. Read the height the branches approach.",
        success: "Right: the limit is $4$. A hole never forces a limit to not exist.",
      },
    ],
  },
];
