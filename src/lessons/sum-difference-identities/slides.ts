import type { ParamSpec, Slide } from "../types";

const bParam: ParamSpec = {
  key: "b",
  label: "Angle B",
  min: 0,
  max: 90,
  start: 80,
  step: 5,
  format: (v) => `B = ${Math.round(v)}\u00b0`,
};

export const slides: Slide[] = [
  {
    id: "signs",
    title: "Sum formulas: watch the sign",
    mode: "signs",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "A common mistake is to write $\\cos(A+B)$ as $\\cos A + \\cos B$, but cosine does not distribute across a sum. The real expansion is built from products of sines and cosines, and the sign in the middle is where most errors happen.",
      },
      {
        text: "The correct expansion pairs cosine with cosine and sine with sine: $$\\cos(A+B) = \\cos A\\cos B - \\sin A\\sin B$$ The middle sign flips from plus to minus. Because that flip is the step most students forget, state it deliberately: the cosine of a sum takes a minus in the middle.",
        add: { s1: true },
      },
      {
        text: "Sine behaves differently, mixing sine with cosine instead of pairing like with like: $$\\sin(A+B) = \\sin A\\cos B + \\cos A\\sin B$$ The middle sign is **kept** rather than flipped, so a sum stays a plus.",
        add: { s2: true, s3: true },
      },
      {
        text: "The difference versions come from flipping every middle sign: $\\cos(A-B) = \\cos A\\cos B + \\sin A\\sin B$ and $\\sin(A-B) = \\sin A\\cos B - \\cos A\\sin B$. For cosine the sign becomes plus, and for sine it becomes minus.",
      },
      {
        text: "Dividing the sine formula by the cosine formula gives the tangent versions: $$\\tan(A+B) = \\dfrac{\\tan A + \\tan B}{1 - \\tan A\\tan B}$$ The numerator keeps the operation sign while the denominator takes the opposite one, so the difference form is $\\tan(A-B) = \\dfrac{\\tan A - \\tan B}{1 + \\tan A\\tan B}$.",
      },
    ],
    practice: "Cosine pairs like with like and flips the middle sign, while sine mixes the functions and keeps it.",
    questions: [
      {
        kind: "choice",
        prompt: "Expand $\\cos(A+B)$.",
        options: [
          "$\\cos A\\cos B - \\sin A\\sin B$",
          "$\\cos A\\cos B + \\sin A\\sin B$",
          "$\\sin A\\cos B + \\cos A\\sin B$",
          "$\\cos A + \\cos B$",
        ],
        answer: 0,
        hint: "Cosine of a sum pairs cosine-cosine and sine-sine, and the middle sign flips to minus.",
        success: "$\\cos(A+B) = \\cos A\\cos B - \\sin A\\sin B$.",
      },
      {
        kind: "choice",
        prompt: "Expand $\\sin(A-B)$.",
        options: [
          "$\\sin A\\cos B - \\cos A\\sin B$",
          "$\\sin A\\cos B + \\cos A\\sin B$",
          "$\\cos A\\cos B + \\sin A\\sin B$",
          "$\\sin A\\sin B - \\cos A\\cos B$",
        ],
        answer: 0,
        hint: "Sine mixes sine-cosine and cosine-sine, and it keeps the operation sign: a difference stays a minus.",
        success: "$\\sin(A-B) = \\sin A\\cos B - \\cos A\\sin B$.",
      },
    ],
  },
  {
    id: "cos75",
    title: "Exact value of cos 75 degrees",
    mode: "cos75",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "These formulas turn an unfamiliar angle into two angles whose exact values are known from the unit circle. A calculator gives $\\cos 75^\\circ \\approx 0.2588$, but the sum formula produces the exact value by hand.",
      },
      {
        text: "The first step is to write $75^\\circ$ as a sum of two unit-circle angles, $75^\\circ = 45^\\circ + 30^\\circ$.",
        add: { s1: true },
      },
      {
        text: "Apply the cosine sum formula to that split. Because this is the cosine of a sum, the middle sign is a minus.",
        add: { s2: true },
      },
      {
        text: "Substitute the exact unit-circle values $\\cos45^\\circ = \\sin45^\\circ = \\dfrac{\\sqrt2}{2}$, $\\cos30^\\circ = \\dfrac{\\sqrt3}{2}$, and $\\sin30^\\circ = \\dfrac12$.",
        add: { s3: true },
      },
      {
        text: "Multiply the paired factors: $\\dfrac{\\sqrt2}{2}\\cdot\\dfrac{\\sqrt3}{2} = \\dfrac{\\sqrt6}{4}$ and $\\dfrac{\\sqrt2}{2}\\cdot\\dfrac12 = \\dfrac{\\sqrt2}{4}$.",
        add: { s4: true },
      },
      {
        text: "Because both products already share the denominator $4$, they combine over a single denominator: $$\\cos 75^\\circ = \\dfrac{\\sqrt6 - \\sqrt2}{4} \\approx 0.2588$$ This exact value agrees with the calculator's decimal.",
        add: { s5: true },
      },
    ],
    practice: "Write the angle as a sum of two known angles, expand with the sum formula, then substitute the exact values.",
    questions: [
      {
        kind: "choice",
        prompt: "$\\cos 75^\\circ = \\cos45^\\circ\\cos30^\\circ - \\sin45^\\circ\\sin30^\\circ$ works out to:",
        options: [
          "$\\dfrac{\\sqrt6 - \\sqrt2}{4}$",
          "$\\dfrac{\\sqrt6 + \\sqrt2}{4}$",
          "$\\dfrac{\\sqrt2 - \\sqrt6}{4}$",
          "$\\dfrac{\\sqrt3 - 1}{4}$",
        ],
        answer: 0,
        hint: "Each product is $\\tfrac{\\sqrt6}{4}$ and $\\tfrac{\\sqrt2}{4}$. Subtract them over the shared denominator.",
        success: "$\\cos 75^\\circ = \\dfrac{\\sqrt6 - \\sqrt2}{4}$.",
      },
      {
        kind: "choice",
        prompt: "To find $\\sin 75^\\circ$ the same way, expand $\\sin(45^\\circ + 30^\\circ)$ as:",
        options: [
          "$\\sin45^\\circ\\cos30^\\circ + \\cos45^\\circ\\sin30^\\circ$",
          "$\\sin45^\\circ\\cos30^\\circ - \\cos45^\\circ\\sin30^\\circ$",
          "$\\cos45^\\circ\\cos30^\\circ - \\sin45^\\circ\\sin30^\\circ$",
          "$\\sin45^\\circ\\sin30^\\circ + \\cos45^\\circ\\cos30^\\circ$",
        ],
        answer: 0,
        hint: "Sine mixes sine-cosine and cosine-sine, and a sum keeps the plus.",
        success: "$\\sin 75^\\circ = \\sin45^\\circ\\cos30^\\circ + \\cos45^\\circ\\sin30^\\circ = \\dfrac{\\sqrt6 + \\sqrt2}{4}$.",
      },
    ],
  },
  {
    id: "cofunction",
    title: "Proving a cofunction identity",
    mode: "cofunction",
    hideSliders: true,
    baseReveal: {},
    beats: [
      {
        text: "The same formulas prove the cofunction identities that are often only memorized. One of them states that the cosine of the complement equals the sine: $$\\cos\\!\\left(\\dfrac{\\pi}{2}-\\theta\\right) = \\sin\\theta$$ The complement of $\\theta$ is $\\dfrac{\\pi}{2}-\\theta$, the angle that adds to $\\theta$ to make a right angle.",
      },
      {
        text: "Expand the left side with the cosine difference formula, where a difference makes the middle sign a plus.",
        add: { s1: true },
      },
      {
        text: "Substitute the two quarter-turn values $\\cos\\dfrac{\\pi}{2} = 0$ and $\\sin\\dfrac{\\pi}{2} = 1$.",
        add: { s2: true },
      },
      {
        text: "The first term is multiplied by $0$ and vanishes, while the second is multiplied by $1$ and remains, so the expansion collapses to exactly $\\sin\\theta$. The identity is now proved rather than assumed.",
        add: { s3: true },
      },
    ],
    practice: "Expand with a sum or difference formula, then substitute the values at the quarter turn.",
    questions: [
      {
        kind: "choice",
        prompt: "By the same method, $\\sin\\!\\left(\\dfrac{\\pi}{2}-\\theta\\right) =$",
        options: ["$\\cos\\theta$", "$\\sin\\theta$", "$-\\cos\\theta$", "$\\csc\\theta$"],
        answer: 0,
        hint: "Sine of the complement is cosine. Expanding $\\sin(\\tfrac{\\pi}{2}-\\theta)$ leaves only the cosine term.",
        success: "$\\sin\\!\\left(\\dfrac{\\pi}{2}-\\theta\\right) = \\cos\\theta$.",
      },
      {
        kind: "choice",
        prompt: "In the proof, why does the term $\\cos\\dfrac{\\pi}{2}\\cos\\theta$ disappear?",
        options: [
          "$\\cos\\dfrac{\\pi}{2} = 0$, so the whole term is $0$",
          "$\\cos\\theta = 0$",
          "$\\sin\\dfrac{\\pi}{2} = 0$",
          "it does not disappear",
        ],
        answer: 0,
        hint: "Look at what each factor equals at a quarter turn.",
        success: "$\\cos\\dfrac{\\pi}{2} = 0$, and zero times anything is zero.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn: watch the sum formula hold",
    mode: "practice",
    params: [bParam],
    baseReveal: {},
    beats: [
      {
        text: "Here the $B$ slider changes the second angle while $A$ stays fixed at $45^\\circ$. As $B$ changes, the figure computes $\\cos(A+B)$ two ways: directly from the combined angle $A+B$ and from the formula $\\cos A\\cos B - \\sin A\\sin B$.",
        add: { s1: true, s2: true, s3: true },
      },
      {
        text: "The two results agree at every value of $B$, which is what makes the equation an identity rather than a coincidence. The angle currently rests at $B = 80^\\circ$, giving a combined angle of $A + B = 125^\\circ$.",
      },
    ],
    practice: "Drag $B$ until the combined angle $A + B$ reaches $75^\\circ$, the value found by hand earlier.",
    questions: [
      {
        kind: "manipulate",
        prompt: "Drag $B$ so the combined angle $A + B$ lands on $75^\\circ$.",
        hint: "$A$ is fixed at $45^\\circ$, so you need $B = 30^\\circ$.",
        success: "$A + B = 75^\\circ$, and both readouts give $\\cos 75^\\circ = \\dfrac{\\sqrt6 - \\sqrt2}{4} \\approx 0.259$.",
        check: (value) => Math.abs(value - 30) < 5,
      },
      {
        kind: "choice",
        prompt: "As you drag $B$, $\\cos A\\cos B - \\sin A\\sin B$ tracks $\\cos(A+B)$ exactly. What would $\\cos A\\cos B + \\sin A\\sin B$ track instead?",
        options: [
          "$\\cos(A-B)$",
          "$\\cos(A+B)$ still",
          "$\\sin(A+B)$",
          "nothing, it is never a real identity",
        ],
        answer: 0,
        hint: "Flipping the middle sign to a plus is exactly the difference formula.",
        success: "Right: the plus version is $\\cos(A-B)$, so the sign in the middle is what separates a sum from a difference.",
      },
    ],
  },
];
