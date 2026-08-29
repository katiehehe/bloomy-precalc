import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Sum and difference identities".
 * Grounded in the lesson: cosine pairs like with like and flips the middle sign
 * (minus for a sum, plus for a difference); sine mixes the functions and keeps
 * the sign; tangent is a quotient with the opposite sign in the denominator.
 * Split a strange angle into two unit-circle angles to get exact values, and
 * mind the quadrant when the givens carry signs. Distractors are the classic
 * traps: false distribution, sign flips, and like-vs-mixed swaps.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-cos-sum",
      prompt: "Expand $\\cos(A+B)$.",
      choices: [
        { text: "$\\cos A\\cos B - \\sin A\\sin B$", correct: true, explain: "Cosine pairs like with like (cosine-cosine, sine-sine) and a **sum** flips the middle sign to minus." },
        { text: "$\\cos A\\cos B + \\sin A\\sin B$", explain: "That is $\\cos(A-B)$; a sum needs the flipped **minus** sign, not plus." },
        { text: "$\\sin A\\cos B + \\cos A\\sin B$", explain: "That is the sine pattern (mixed products); cosine pairs like with like." },
        { text: "$\\cos A + \\cos B$", explain: "Cosine does not distribute over a sum; there is a real formula built from products." },
      ],
    },
    {
      id: "c-cos-diff",
      prompt: "Expand $\\cos(A-B)$.",
      choices: [
        { text: "$\\cos A\\cos B - \\sin A\\sin B$", explain: "That is $\\cos(A+B)$; a difference flips the middle sign the other way, to plus." },
        { text: "$\\cos A - \\cos B$", explain: "Cosine does not split across a difference; use the product formula." },
        { text: "$\\cos A\\cos B + \\sin A\\sin B$", correct: true, explain: "Cosine pairs like with like, and for a **difference** the middle sign is plus." },
        { text: "$\\sin A\\cos B - \\cos A\\sin B$", explain: "That is $\\sin(A-B)$, the mixed sine pattern, not cosine." },
      ],
    },
    {
      id: "c-sin-sum",
      prompt: "Expand $\\sin(A+B)$.",
      choices: [
        { text: "$\\sin A\\cos B - \\cos A\\sin B$", explain: "That is $\\sin(A-B)$; a sum keeps the plus sign." },
        { text: "$\\sin A\\cos B + \\cos A\\sin B$", correct: true, explain: "Sine mixes sine-cosine and cosine-sine, and a **sum** keeps the plus." },
        { text: "$\\cos A\\cos B - \\sin A\\sin B$", explain: "That is the cosine pattern (like with like); sine mixes the two functions." },
        { text: "$\\sin A + \\sin B$", explain: "Sine does not distribute over a sum; use the mixed-product formula." },
      ],
    },
    {
      id: "c-sin-diff",
      prompt: "Expand $\\sin(A-B)$.",
      choices: [
        { text: "$\\sin A\\cos B + \\cos A\\sin B$", explain: "That is $\\sin(A+B)$; a difference keeps the minus sign." },
        { text: "$\\cos A\\cos B - \\sin A\\sin B$", explain: "That is the cosine pattern; sine mixes sine with cosine." },
        { text: "$\\sin A\\sin B - \\cos A\\cos B$", explain: "Wrong pairings: sine uses sine-cosine and cosine-sine products, never sine-sine or cosine-cosine." },
        { text: "$\\sin A\\cos B - \\cos A\\sin B$", correct: true, explain: "Sine mixes the functions and **keeps** the operation sign, so a difference stays minus." },
      ],
    },
    {
      id: "c-tan-sum",
      prompt: "The formula for $\\tan(A+B)$ is:",
      choices: [
        { text: "$\\dfrac{\\tan A+\\tan B}{1-\\tan A\\tan B}$", correct: true, explain: "Sum on top, and the denominator takes the **opposite** sign, a minus." },
        { text: "$\\dfrac{\\tan A+\\tan B}{1+\\tan A\\tan B}$", explain: "Denominator sign is flipped: for a sum on top it must be $1-\\tan A\\tan B$." },
        { text: "$\\dfrac{\\tan A-\\tan B}{1-\\tan A\\tan B}$", explain: "The numerator should match the operation: a sum needs $\\tan A+\\tan B$ on top." },
        { text: "$\\tan A+\\tan B$", explain: "Tangent does not distribute; there is a denominator $1-\\tan A\\tan B$." },
      ],
    },
    {
      id: "c-valid-identity",
      prompt: "Which equation is a **valid** identity?",
      choices: [
        { text: "$\\cos(A+B)=\\cos A+\\cos B$", explain: "False: cosine does not distribute over a sum." },
        { text: "$\\sin(A+B)=\\sin A+\\sin B$", explain: "False: sine does not distribute over a sum." },
        { text: "$\\cos(A+B)=\\cos A\\cos B+\\sin A\\sin B$", explain: "That plus sign makes it $\\cos(A-B)$; for a sum the middle sign is minus." },
        { text: "$\\sin(A+B)=\\sin A\\cos B+\\cos A\\sin B$", correct: true, explain: "This is the correct sine sum formula: mixed products, plus sign kept." },
      ],
    },
    {
      id: "c-split-15",
      prompt: "To find the exact value of $\\cos 15^\\circ$, which split uses two unit-circle angles?",
      choices: [
        { text: "$15^\\circ = 45^\\circ + 30^\\circ$", explain: "That sum is $75^\\circ$, not $15^\\circ$." },
        { text: "$15^\\circ = 60^\\circ + 45^\\circ$", explain: "That sum is $105^\\circ$, not $15^\\circ$." },
        { text: "$15^\\circ = 45^\\circ - 30^\\circ$", correct: true, explain: "Both $45^\\circ$ and $30^\\circ$ live on the unit circle, and their **difference** is $15^\\circ$." },
        { text: "$15^\\circ = 10^\\circ + 5^\\circ$", explain: "We do not know the exact sine and cosine of $10^\\circ$ or $5^\\circ$ from the unit circle." },
      ],
    },
    {
      id: "c-cos15",
      prompt: "$\\cos 15^\\circ$ equals:",
      choices: [
        { text: "$\\dfrac{\\sqrt6-\\sqrt2}{4}$", explain: "That value is $\\sin 15^\\circ$ (and $\\cos 75^\\circ$); $\\cos 15^\\circ$ is the larger one, near $0.97$." },
        { text: "$\\dfrac{\\sqrt6+\\sqrt2}{4}$", correct: true, explain: "$\\cos(45^\\circ-30^\\circ)=\\cos45^\\circ\\cos30^\\circ+\\sin45^\\circ\\sin30^\\circ=\\dfrac{\\sqrt6}{4}+\\dfrac{\\sqrt2}{4}$." },
        { text: "$\\dfrac{\\sqrt2-\\sqrt6}{4}$", explain: "This is negative, but $\\cos 15^\\circ$ is positive, and the terms are in the wrong order." },
        { text: "$\\dfrac{\\sqrt6+\\sqrt2}{2}$", explain: "Wrong denominator: each product is over $4$, so the sum is over $4$, not $2$." },
      ],
    },
    {
      id: "c-sin15",
      prompt: "$\\sin 15^\\circ$ equals:",
      choices: [
        { text: "$\\dfrac{\\sqrt6+\\sqrt2}{4}$", explain: "That value is $\\cos 15^\\circ$ (and $\\sin 75^\\circ$); $\\sin 15^\\circ$ is the small one, near $0.26$." },
        { text: "$\\dfrac{\\sqrt2-\\sqrt6}{4}$", explain: "Right size but wrong sign: $\\sin 15^\\circ$ is positive, so it is $\\sqrt6-\\sqrt2$ on top." },
        { text: "$\\dfrac{\\sqrt3-\\sqrt2}{4}$", explain: "Arithmetic slip: the products are $\\dfrac{\\sqrt6}{4}$ and $\\dfrac{\\sqrt2}{4}$, giving $\\sqrt6-\\sqrt2$." },
        { text: "$\\dfrac{\\sqrt6-\\sqrt2}{4}$", correct: true, explain: "$\\sin(45^\\circ-30^\\circ)=\\sin45^\\circ\\cos30^\\circ-\\cos45^\\circ\\sin30^\\circ=\\dfrac{\\sqrt6}{4}-\\dfrac{\\sqrt2}{4}$." },
      ],
    },
    {
      id: "c-sin75-setup",
      prompt: "Using $75^\\circ = 45^\\circ + 30^\\circ$, $\\sin 75^\\circ$ expands to:",
      choices: [
        { text: "$\\sin45^\\circ\\cos30^\\circ + \\cos45^\\circ\\sin30^\\circ$", correct: true, explain: "Sine of a **sum** mixes the functions and keeps the plus." },
        { text: "$\\sin45^\\circ\\cos30^\\circ - \\cos45^\\circ\\sin30^\\circ$", explain: "That minus makes it $\\sin 15^\\circ=\\sin(45^\\circ-30^\\circ)$." },
        { text: "$\\cos45^\\circ\\cos30^\\circ - \\sin45^\\circ\\sin30^\\circ$", explain: "That is $\\cos 75^\\circ$, the cosine pattern, not sine." },
        { text: "$\\cos45^\\circ\\cos30^\\circ + \\sin45^\\circ\\sin30^\\circ$", explain: "That is $\\cos 15^\\circ$; you want the mixed sine products instead." },
      ],
    },
    {
      id: "c-cos75",
      prompt: "$\\cos 75^\\circ$ equals:",
      choices: [
        { text: "$\\dfrac{\\sqrt6+\\sqrt2}{4}$", explain: "That is $\\sin 75^\\circ$ (and $\\cos 15^\\circ$); $\\cos 75^\\circ$ is small, near $0.26$." },
        { text: "$\\dfrac{\\sqrt2-\\sqrt6}{4}$", explain: "This is negative, but $\\cos 75^\\circ$ is positive, and the order is reversed." },
        { text: "$\\dfrac{\\sqrt6-\\sqrt2}{4}$", correct: true, explain: "$\\cos(45^\\circ+30^\\circ)=\\cos45^\\circ\\cos30^\\circ-\\sin45^\\circ\\sin30^\\circ=\\dfrac{\\sqrt6}{4}-\\dfrac{\\sqrt2}{4}$." },
        { text: "$\\dfrac{\\sqrt6-\\sqrt2}{2}$", explain: "Wrong denominator: both products are over $4$, not $2$." },
      ],
    },
    {
      id: "c-cofunction",
      prompt: "Expanding with the cosine difference formula, $\\cos\\!\\left(\\dfrac{\\pi}{2}-\\theta\\right)$ equals:",
      choices: [
        { text: "$\\cos\\theta$", explain: "That is $\\sin\\!\\left(\\dfrac{\\pi}{2}-\\theta\\right)$; the cosine version collapses to $\\sin\\theta$." },
        { text: "$\\sin\\theta$", correct: true, explain: "$\\cos\\dfrac{\\pi}{2}\\cos\\theta+\\sin\\dfrac{\\pi}{2}\\sin\\theta=0+\\sin\\theta$, since $\\cos\\dfrac{\\pi}{2}=0$ and $\\sin\\dfrac{\\pi}{2}=1$." },
        { text: "$-\\sin\\theta$", explain: "The difference formula gives $+\\sin\\theta$ here, because $\\sin\\dfrac{\\pi}{2}=1$." },
        { text: "$\\csc\\theta$", explain: "No reciprocal appears; the expansion leaves plain $\\sin\\theta$." },
      ],
    },
    {
      id: "c-tan15",
      prompt: "$\\tan 15^\\circ$, from $\\tan(45^\\circ-30^\\circ)$, equals:",
      choices: [
        { text: "$2-\\sqrt3$", correct: true, explain: "Using the tangent difference formula with $\\tan45^\\circ=1$ and $\\tan30^\\circ=\\dfrac{1}{\\sqrt3}$, then rationalizing, $\\tan 15^\\circ=2-\\sqrt3$." },
        { text: "$2+\\sqrt3$", explain: "That is $\\tan 75^\\circ$; the difference gives $2-\\sqrt3$." },
        { text: "$\\sqrt3-2$", explain: "Sign flip: $2-\\sqrt3\\approx0.27$ is positive, so it is $2-\\sqrt3$." },
        { text: "$\\dfrac{\\sqrt3}{3}$", explain: "That is $\\tan 30^\\circ$; you still have to run the difference formula." },
      ],
    },
    {
      id: "c-term-pair",
      prompt: "In $\\sin(A+B)=\\sin A\\cos B+\\cos A\\sin B$, the term $\\sin A\\cos B$ pairs:",
      choices: [
        { text: "$\\cos$ of the first angle with $\\sin$ of the second", explain: "That describes the **other** term, $\\cos A\\sin B$." },
        { text: "$\\sin$ of both angles", explain: "There is no $\\sin A\\sin B$ term in the sine formula." },
        { text: "$\\cos$ of both angles", explain: "There is no $\\cos A\\cos B$ term in the sine formula." },
        { text: "$\\sin$ of the first angle with $\\cos$ of the second", correct: true, explain: "Exactly: $\\sin A\\cos B$ is sine of $A$ times cosine of $B$." },
      ],
    },
    {
      id: "c-sign-rule",
      prompt: "How do the **difference** formulas relate to the **sum** formulas?",
      choices: [
        { text: "Flip each middle sign: cosine goes from minus to plus, and sine goes from plus to minus", correct: true, explain: "A difference simply reverses the operation sign inside each formula." },
        { text: "Keep every sign the same", explain: "Then sum and difference would be identical, but they are not." },
        { text: "Swap sine and cosine throughout", explain: "The functions stay put; only the middle sign changes." },
      ],
    },
  ],
  summit: [
    {
      id: "s-cos105",
      prompt: "Find the exact value of $\\cos 105^\\circ$.",
      choices: [
        { text: "$\\dfrac{\\sqrt2-\\sqrt6}{4}$", correct: true, explain: "$\\cos(60^\\circ+45^\\circ)=\\cos60^\\circ\\cos45^\\circ-\\sin60^\\circ\\sin45^\\circ=\\dfrac{\\sqrt2}{4}-\\dfrac{\\sqrt6}{4}$, negative as expected in Quadrant II." },
        { text: "$\\dfrac{\\sqrt6-\\sqrt2}{4}$", explain: "Right size but wrong sign: $105^\\circ$ is in Quadrant II, so cosine is negative." },
        { text: "$\\dfrac{\\sqrt2+\\sqrt6}{4}$", explain: "That plus sign is the sine pattern; cosine of a sum uses minus, giving $\\sqrt2-\\sqrt6$." },
        { text: "$\\dfrac{\\sqrt6-\\sqrt2}{2}$", explain: "Wrong denominator: each product is over $4$." },
      ],
    },
    {
      id: "s-sin105",
      prompt: "Find the exact value of $\\sin 105^\\circ$.",
      choices: [
        { text: "$\\dfrac{\\sqrt6-\\sqrt2}{4}$", explain: "That is $\\sin 15^\\circ$; $\\sin 105^\\circ$ is large, near $0.97$." },
        { text: "$\\dfrac{\\sqrt2-\\sqrt6}{4}$", explain: "This is negative, but $\\sin 105^\\circ$ is positive in Quadrant II." },
        { text: "$\\dfrac{\\sqrt6+\\sqrt2}{2}$", explain: "Wrong denominator: both products are over $4$." },
        { text: "$\\dfrac{\\sqrt6+\\sqrt2}{4}$", correct: true, explain: "$\\sin(60^\\circ+45^\\circ)=\\sin60^\\circ\\cos45^\\circ+\\cos60^\\circ\\sin45^\\circ=\\dfrac{\\sqrt6}{4}+\\dfrac{\\sqrt2}{4}$." },
      ],
    },
    {
      id: "s-tan75",
      prompt: "Find the exact value of $\\tan 75^\\circ$.",
      choices: [
        { text: "$2-\\sqrt3$", explain: "That is $\\tan 15^\\circ$; for $75^\\circ$ use $\\tan(45^\\circ+30^\\circ)$." },
        { text: "$-2-\\sqrt3$", explain: "Sign slip: $75^\\circ$ is in Quadrant I, so $\\tan 75^\\circ$ is positive." },
        { text: "$2+\\sqrt3$", correct: true, explain: "Using $\\tan(45^\\circ+30^\\circ)$ with $\\tan45^\\circ=1$ and $\\tan30^\\circ=\\dfrac{1}{\\sqrt3}$, then rationalizing, $\\tan 75^\\circ=2+\\sqrt3$." },
        { text: "$\\sqrt3$", explain: "That is $\\tan 60^\\circ$; the sum formula gives $2+\\sqrt3$." },
      ],
    },
    {
      id: "s-reverse-tan",
      prompt: "Simplify $\\dfrac{\\tan20^\\circ+\\tan25^\\circ}{1-\\tan20^\\circ\\tan25^\\circ}$.",
      choices: [
        { text: "$\\tan 5^\\circ$", explain: "The minus in the denominator marks the **sum** formula, so the angle is $20^\\circ+25^\\circ=45^\\circ$, not the difference." },
        { text: "$\\dfrac{\\sqrt2}{2}$", explain: "That is $\\sin 45^\\circ$ or $\\cos 45^\\circ$; the tangent of $45^\\circ$ is $1$." },
        { text: "$\\sqrt3$", explain: "That would be $\\tan 60^\\circ$; here the angles add to $45^\\circ$." },
        { text: "$1$", correct: true, explain: "This is $\\tan(20^\\circ+25^\\circ)=\\tan 45^\\circ=1$." },
      ],
    },
    {
      id: "s-reverse-cos",
      prompt: "Simplify $\\cos40^\\circ\\cos10^\\circ+\\sin40^\\circ\\sin10^\\circ$.",
      choices: [
        { text: "$\\cos 50^\\circ$", explain: "The $+$ sign marks $\\cos(A-B)$, so the angle is $40^\\circ-10^\\circ=30^\\circ$, not $40^\\circ+10^\\circ$." },
        { text: "$\\dfrac{\\sqrt3}{2}$", correct: true, explain: "This is $\\cos(A-B)$ with $A=40^\\circ$, $B=10^\\circ$, so it equals $\\cos 30^\\circ=\\dfrac{\\sqrt3}{2}$." },
        { text: "$\\dfrac12$", explain: "That is $\\cos 60^\\circ$; here the angle is $30^\\circ$." },
        { text: "$\\dfrac{\\sqrt2}{2}$", explain: "That is $\\cos 45^\\circ$; the difference $40^\\circ-10^\\circ$ is $30^\\circ$." },
      ],
    },
    {
      id: "s-reverse-sin",
      prompt: "Simplify $\\sin50^\\circ\\cos20^\\circ-\\cos50^\\circ\\sin20^\\circ$.",
      choices: [
        { text: "$\\dfrac12$", correct: true, explain: "This is $\\sin(50^\\circ-20^\\circ)=\\sin 30^\\circ=\\dfrac12$." },
        { text: "$\\dfrac{\\sqrt3}{2}$", explain: "That is $\\sin 60^\\circ$; here the angle is $30^\\circ$." },
        { text: "$\\sin 70^\\circ$", explain: "The minus sign marks $\\sin(A-B)$, so the angle is $50^\\circ-20^\\circ=30^\\circ$, not the sum." },
        { text: "$\\dfrac{\\sqrt2}{2}$", explain: "That is $\\sin 45^\\circ$; the difference is $30^\\circ$." },
      ],
    },
    {
      id: "s-given-sin-sum",
      prompt: "Let $\\sin A=\\dfrac35$ and $\\cos B=\\dfrac{5}{13}$, with both $A$ and $B$ in Quadrant I. Find $\\sin(A+B)$.",
      choices: [
        { text: "$-\\dfrac{16}{65}$", explain: "That is $\\cos(A+B)$; the sine formula gives a different value." },
        { text: "$-\\dfrac{33}{65}$", explain: "That uses the difference formula $\\sin A\\cos B-\\cos A\\sin B$; a sum keeps the plus." },
        { text: "$\\dfrac{63}{65}$", correct: true, explain: "With $\\cos A=\\dfrac45$ and $\\sin B=\\dfrac{12}{13}$: $\\sin A\\cos B+\\cos A\\sin B=\\dfrac{15}{65}+\\dfrac{48}{65}$." },
        { text: "$\\dfrac{48}{65}$", explain: "That is only $\\cos A\\sin B$; you must add both products." },
      ],
    },
    {
      id: "s-given-cos-sum",
      prompt: "With the same $A$ and $B$ ($\\sin A=\\dfrac35$, $\\cos B=\\dfrac{5}{13}$, both Quadrant I), find $\\cos(A+B)$.",
      choices: [
        { text: "$-\\dfrac{16}{65}$", correct: true, explain: "$\\cos A\\cos B-\\sin A\\sin B=\\dfrac{20}{65}-\\dfrac{36}{65}=-\\dfrac{16}{65}$." },
        { text: "$\\dfrac{56}{65}$", explain: "That is $\\cos(A-B)$; a sum flips the middle sign to minus." },
        { text: "$\\dfrac{16}{65}$", explain: "Sign error: $20-36=-16$, so the value is negative." },
        { text: "$\\dfrac{63}{65}$", explain: "That is $\\sin(A+B)$, not $\\cos(A+B)$." },
      ],
    },
    {
      id: "s-quadrant-cos",
      prompt: "If $\\cos A=-\\dfrac45$ with $A$ in Quadrant II and $\\sin B=\\dfrac{5}{13}$ with $B$ in Quadrant I, find $\\cos(A+B)$.",
      choices: [
        { text: "$-\\dfrac{33}{65}$", explain: "This takes $\\sin A$ negative, but sine is **positive** in Quadrant II, so $\\sin A=\\dfrac35$." },
        { text: "$-\\dfrac{63}{65}$", correct: true, explain: "With $\\sin A=\\dfrac35$ and $\\cos B=\\dfrac{12}{13}$: $\\cos A\\cos B-\\sin A\\sin B=-\\dfrac{48}{65}-\\dfrac{15}{65}$." },
        { text: "$\\dfrac{63}{65}$", explain: "Sign error: both products are negative, so their combination is negative." },
        { text: "$\\dfrac{33}{65}$", explain: "This drops the sign on $\\sin A$ and on the total; $\\sin A$ is positive in Quadrant II." },
      ],
    },
    {
      id: "s-quadrant-sin",
      prompt: "For the same angles ($\\cos A=-\\dfrac45$ in Quadrant II, $\\sin B=\\dfrac{5}{13}$ in Quadrant I), find $\\sin(A+B)$.",
      choices: [
        { text: "$\\dfrac{56}{65}$", explain: "This takes $\\cos A$ positive, but cosine is **negative** in Quadrant II, so $\\cos A=-\\dfrac45$." },
        { text: "$-\\dfrac{16}{65}$", explain: "Sign error: $36-20=16$, which is positive." },
        { text: "$\\dfrac{63}{65}$", explain: "That was $\\sin(A+B)$ for the earlier all-Quadrant-I angles; here $\\cos A$ is negative." },
        { text: "$\\dfrac{16}{65}$", correct: true, explain: "$\\sin A\\cos B+\\cos A\\sin B=\\dfrac{36}{65}+\\left(-\\dfrac{20}{65}\\right)=\\dfrac{16}{65}$." },
      ],
    },
    {
      id: "s-cos-pi-minus",
      prompt: "Use a difference formula to simplify $\\cos(\\pi-\\theta)$.",
      choices: [
        { text: "$\\cos\\theta$", explain: "This forgets that $\\cos\\pi=-1$; the surviving term is $-\\cos\\theta$." },
        { text: "$-\\sin\\theta$", explain: "That is a sine result; $\\cos(\\pi-\\theta)$ expands with cosine products." },
        { text: "$-\\cos\\theta$", correct: true, explain: "$\\cos\\pi\\cos\\theta+\\sin\\pi\\sin\\theta=(-1)\\cos\\theta+0=-\\cos\\theta$." },
        { text: "$\\sin\\theta$", explain: "No sine survives: $\\sin\\pi=0$ kills that term, leaving $-\\cos\\theta$." },
      ],
    },
    {
      id: "s-sin-pi-plus",
      prompt: "Use a sum formula to simplify $\\sin(\\pi+\\theta)$.",
      choices: [
        { text: "$-\\sin\\theta$", correct: true, explain: "$\\sin\\pi\\cos\\theta+\\cos\\pi\\sin\\theta=0+(-1)\\sin\\theta=-\\sin\\theta$." },
        { text: "$\\sin\\theta$", explain: "This forgets $\\cos\\pi=-1$; the surviving term is $-\\sin\\theta$." },
        { text: "$-\\cos\\theta$", explain: "No cosine survives: $\\sin\\pi=0$ removes that term." },
        { text: "$\\cos\\theta$", explain: "The expansion leaves a sine term, not a cosine." },
      ],
    },
    {
      id: "s-false-split",
      prompt: "A student writes $\\cos 75^\\circ=\\cos45^\\circ+\\cos30^\\circ=\\dfrac{\\sqrt2}{2}+\\dfrac{\\sqrt3}{2}$. What went wrong?",
      choices: [
        { text: "Nothing; the value is correct", explain: "That sum is about $1.57$, larger than $1$, which is impossible for a cosine." },
        { text: "Cosine does not distribute; use $\\cos(45^\\circ+30^\\circ)=\\cos45^\\circ\\cos30^\\circ-\\sin45^\\circ\\sin30^\\circ$", correct: true, explain: "The sum formula gives $\\dfrac{\\sqrt6-\\sqrt2}{4}\\approx0.26$, a legal cosine value." },
        { text: "The split $75^\\circ=45^\\circ+30^\\circ$ is wrong", explain: "The split is fine; the error is treating cosine as if it distributes over a sum." },
        { text: "They should have used radians", explain: "Units are not the issue; cosine simply does not split across addition." },
      ],
    },
    {
      id: "s-tan105",
      prompt: "Find the exact value of $\\tan 105^\\circ$.",
      choices: [
        { text: "$2+\\sqrt3$", explain: "That is $\\tan 75^\\circ$; $105^\\circ$ is in Quadrant II, where tangent is negative." },
        { text: "$2-\\sqrt3$", explain: "That is $\\tan 15^\\circ$; use $\\tan(60^\\circ+45^\\circ)$ for $105^\\circ$." },
        { text: "$\\sqrt3-2$", explain: "Close in size to $\\tan 15^\\circ$, but $\\tan 105^\\circ$ is about $-3.7$, not $-0.27$." },
        { text: "$-2-\\sqrt3$", correct: true, explain: "$\\tan(60^\\circ+45^\\circ)=\\dfrac{\\sqrt3+1}{1-\\sqrt3}=-(2+\\sqrt3)$, negative as expected in Quadrant II." },
      ],
    },
    {
      id: "s-compound",
      prompt: "Simplify $\\cos(A+B)\\cos B+\\sin(A+B)\\sin B$.",
      choices: [
        { text: "$\\cos(A+2B)$", explain: "The cosine-cosine plus sine-sine pattern is the **difference** formula, giving $(A+B)-B$, not a sum." },
        { text: "$\\sin A$", explain: "The pattern collapses to a cosine of the angle difference, not a sine." },
        { text: "$\\cos A$", correct: true, explain: "This is $\\cos\\big((A+B)-B\\big)=\\cos A$ by the cosine difference formula." },
        { text: "$\\cos A\\cos B$", explain: "The whole expression reduces to a single cosine, $\\cos A$, with no leftover factor." },
      ],
    },
  ],
};
