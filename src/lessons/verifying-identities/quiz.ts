import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Verifying identities".
 * Grounded in the lesson: verifying is proving, not solving. You may rewrite
 * either side, or both sides separately, until they become the same expression.
 * You may not treat the identity like an equation (add, square, or cross-multiply
 * across the equals sign). Useful moves are converting to sine and cosine, using a
 * Pythagorean identity, combining over a common denominator, splitting a
 * fraction, factoring a difference of squares, and multiplying by a conjugate.
 * Distractors are the classic traps: treating the identity like an equation,
 * cross-multiplying, the wrong Pythagorean form, dividing by a possibly-zero
 * factor, and calling a single numerical check a proof.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-what-verify",
      prompt: "What does it mean to **verify** an identity?",
      choices: [
        { text: "Show the two sides are equal for every angle by rewriting either side, or both sides separately, until they match", correct: true, explain: "An identity is a claim that holds for all angles. A verification rewrites each expression using known identities until the two sides are the same." },
        { text: "Find the value of $x$ that makes the equation true", explain: "That is solving an equation for an unknown, not proving a statement true for all angles." },
        { text: "Check that both sides match at one convenient angle", explain: "A single matching angle is a spot check, not a proof for every angle." },
        { text: "Graph both sides and confirm they look close", explain: "Eyeballing a graph is not a proof. You must transform the expressions symbolically." },
      ],
    },
    {
      id: "c-allowed",
      prompt: "Which action is **allowed** while verifying an identity?",
      choices: [
        { text: "Adding the same expression to both sides", explain: "Operating on both sides assumes they are already equal, which is what you must prove." },
        { text: "Squaring both sides", explain: "Squaring both sides treats the identity like an equation and can even introduce false solutions." },
        { text: "Rewriting one side using a known identity", correct: true, explain: "Transforming a single side with established identities is exactly the legitimate move." },
        { text: "Cross-multiplying the two sides", explain: "Cross-multiplying manipulates both sides at once, so it assumes the equality you are trying to prove." },
      ],
    },
    {
      id: "c-not-equation",
      prompt: "Why can you **not** move a term from the left side to the right side while verifying?",
      choices: [
        { text: "It is allowed and is usually the fastest route", explain: "It is not allowed: moving terms across treats the identity as a known equation." },
        { text: "It assumes the two sides are already equal, which is exactly what you must prove", correct: true, explain: "Rearranging across the equals sign uses the conclusion as an assumption, which is circular." },
        { text: "Subtraction is not defined for trigonometric functions", explain: "Subtraction is perfectly well defined. That is not the issue." },
        { text: "It changes the period of the functions involved", explain: "Moving a term does not change any periods. The real problem is assuming the equality." },
      ],
    },
    {
      id: "c-which-side",
      prompt: "Which side is often less work to start transforming?",
      choices: [
        { text: "Always the left side, by convention", explain: "There is no left-side rule. Position does not determine which side is easier." },
        { text: "The more complicated side, since it has more to simplify", correct: true, explain: "The more complicated side often has more to simplify, so it is a useful place to start. Either side is allowed." },
        { text: "Always the shorter side, since it is closer to done", explain: "A short side has little to work with, so building it up is often harder, not easier." },
        { text: "It never matters, the work is identical either way", explain: "You can start from either side, but one is usually far less work, so the choice matters." },
      ],
    },
    {
      id: "c-first-move",
      prompt: "A dependable first move on a messy trig expression is to:",
      choices: [
        { text: "Take the derivative of each side", explain: "Derivatives are calculus and have nothing to do with proving an identity." },
        { text: "Substitute $x = 0$ to test it", explain: "Testing one angle is a spot check, not a step in a proof." },
        { text: "Rewrite every function in terms of sine and cosine", correct: true, explain: "Pythagorean and reciprocal identities are written in sine and cosine, so this rewrite often exposes a cancellation." },
        { text: "Add $1$ to both sides", explain: "Adding to both sides manipulates the equation you are trying to prove, which is not allowed." },
      ],
    },
    {
      id: "c-tan",
      prompt: "Written in sine and cosine, $\\tan x$ is:",
      choices: [
        { text: "$\\dfrac{\\cos x}{\\sin x}$", explain: "That ratio is $\\cot x$, the reciprocal of tangent." },
        { text: "$\\dfrac{1}{\\cos x}$", explain: "That is $\\sec x$, not $\\tan x$." },
        { text: "$\\dfrac{\\sin x}{\\cos x}$", correct: true, explain: "By the quotient identity, $\\tan x = \\dfrac{\\sin x}{\\cos x}$." },
        { text: "$\\dfrac{1}{\\sin x}$", explain: "That is $\\csc x$, not $\\tan x$." },
      ],
    },
    {
      id: "c-sec",
      prompt: "Written in sine and cosine, $\\sec x$ is:",
      choices: [
        { text: "$\\dfrac{1}{\\sin x}$", explain: "That is $\\csc x$. Secant pairs with cosine, not sine." },
        { text: "$\\dfrac{1}{\\cos x}$", correct: true, explain: "Secant is the reciprocal of cosine, so $\\sec x = \\dfrac{1}{\\cos x}$." },
        { text: "$\\dfrac{\\sin x}{\\cos x}$", explain: "That ratio is $\\tan x$, not $\\sec x$." },
        { text: "$\\dfrac{\\cos x}{\\sin x}$", explain: "That ratio is $\\cot x$, not $\\sec x$." },
      ],
    },
    {
      id: "c-pyth-basic",
      prompt: "Which identity lets you replace $\\sin^2 x$ with $1 - \\cos^2 x$?",
      choices: [
        { text: "$1 + \\tan^2 x = \\sec^2 x$", explain: "That relates tangent and secant, not $\\sin^2$ and $\\cos^2$." },
        { text: "$1 + \\cot^2 x = \\csc^2 x$", explain: "That relates cotangent and cosecant, not $\\sin^2$ and $\\cos^2$." },
        { text: "a double-angle identity", explain: "Double-angle identities involve $2x$. This swap comes from the basic Pythagorean identity." },
        { text: "$\\sin^2 x + \\cos^2 x = 1$", correct: true, explain: "Rearranging $\\sin^2 x + \\cos^2 x = 1$ gives $\\sin^2 x = 1 - \\cos^2 x$." },
      ],
    },
    {
      id: "c-pyth-sec",
      prompt: "An expression is full of $\\sec x$ and $\\tan x$. The most useful Pythagorean identity is:",
      choices: [
        { text: "$\\sin^2 x + \\cos^2 x = 1$", explain: "That form fits sine and cosine. Here you want the one built from secant and tangent." },
        { text: "$1 + \\cot^2 x = \\csc^2 x$", explain: "That relates cotangent and cosecant, the wrong pair for this expression." },
        { text: "$\\sec^2 x + \\tan^2 x = 1$", explain: "This is not a real identity. The true one is $1 + \\tan^2 x = \\sec^2 x$." },
        { text: "$1 + \\tan^2 x = \\sec^2 x$", correct: true, explain: "This is the Pythagorean form that directly connects $\\tan x$ and $\\sec x$." },
      ],
    },
    {
      id: "c-diff-squares",
      prompt: "$(1 - \\sin x)(1 + \\sin x)$ multiplies out to:",
      choices: [
        { text: "$1 - \\sin^2 x$", correct: true, explain: "Difference of squares: $(a - b)(a + b) = a^2 - b^2$ with $a = 1$ and $b = \\sin x$." },
        { text: "$1 + \\sin^2 x$", explain: "The middle terms cancel to give a minus, so it is $1 - \\sin^2 x$, not a plus." },
        { text: "$1 - 2\\sin x$", explain: "That would come from $(1 - \\sin x)^2$. Here the two factors differ in sign." },
        { text: "$\\sin^2 x - 1$", explain: "Sign flip: the constant $1$ leads, so the result is $1 - \\sin^2 x$." },
      ],
    },
    {
      id: "c-diff-squares-2",
      prompt: "And $1 - \\sin^2 x$ equals:",
      choices: [
        { text: "$\\sin^2 x$", explain: "That ignores the identity. Rearrange $\\sin^2 x + \\cos^2 x = 1$ instead." },
        { text: "$\\tan^2 x$", explain: "Tangent does not appear here. The leftover of $1 - \\sin^2 x$ is a cosine square." },
        { text: "$\\cos^2 x$", correct: true, explain: "From $\\sin^2 x + \\cos^2 x = 1$, $1 - \\sin^2 x = \\cos^2 x$." },
        { text: "$1$", explain: "Only if $\\sin x = 0$. In general $1 - \\sin^2 x = \\cos^2 x$." },
      ],
    },
    {
      id: "c-cancel-cos",
      prompt: "$\\dfrac{\\cos^2 x}{\\cos x}$ simplifies to:",
      choices: [
        { text: "$1$", explain: "You only cancel one factor of $\\cos x$, leaving $\\cos x$, not $1$." },
        { text: "$\\cos x$", correct: true, explain: "One $\\cos x$ cancels top and bottom, leaving a single $\\cos x$." },
        { text: "$\\sec x$", explain: "That is the reciprocal. Cancelling leaves $\\cos x$, not $\\dfrac{1}{\\cos x}$." },
        { text: "$\\cos^3 x$", explain: "Dividing subtracts exponents, so $\\cos^2 x \\div \\cos x = \\cos x$, not a higher power." },
      ],
    },
    {
      id: "c-split",
      prompt: "Splitting $\\dfrac{1 - \\cos^2\\theta}{\\cos\\theta}$ into two fractions gives:",
      choices: [
        { text: "$\\dfrac{1}{\\cos\\theta} - \\cos^2\\theta$", explain: "The second piece still needs the denominator $\\cos\\theta$. Dropping it changes the value." },
        { text: "$\\dfrac{1}{\\cos\\theta} - \\dfrac{\\cos^2\\theta}{\\cos\\theta}$", correct: true, explain: "Each term of the numerator keeps the shared denominator $\\cos\\theta$." },
        { text: "$1 - \\dfrac{\\cos^2\\theta}{\\cos\\theta}$", explain: "The first piece also needs the denominator $\\cos\\theta$. The $1$ is not free of it." },
        { text: "it cannot be separated into two fractions", explain: "A sum or difference over one denominator always splits term by term over that denominator." },
      ],
    },
    {
      id: "c-conjugate",
      prompt: "To push $\\dfrac{1}{1 - \\cos x}$ toward a Pythagorean form, multiply top and bottom by:",
      choices: [
        { text: "$1 - \\cos x$", explain: "That gives $(1 - \\cos x)^2$ on the bottom, which is not a difference of squares." },
        { text: "$\\sin x$", explain: "That introduces a sine but never creates the $1 - \\cos^2 x$ you are aiming for." },
        { text: "$\\cos x$", explain: "That just scales the fraction and does not build a Pythagorean form." },
        { text: "$1 + \\cos x$", correct: true, explain: "The conjugate makes $(1 - \\cos x)(1 + \\cos x) = 1 - \\cos^2 x = \\sin^2 x$." },
      ],
    },
    {
      id: "c-numerical-check",
      prompt: "A student checks $x = \\dfrac{\\pi}{4}$, both sides match, and calls the identity verified. Is that a proof?",
      choices: [
        { text: "No, one angle is not a proof. An identity must hold for every angle", correct: true, explain: "A single value can pass by luck. A proof must transform one side into the other for all angles." },
        { text: "Yes, one matching angle is enough", explain: "Many non-identities happen to agree at a special angle, so one match proves nothing." },
        { text: "Yes, because $\\dfrac{\\pi}{4}$ is a special angle", explain: "Special angles are not special for proofs. A check at any single angle is still just a check." },
        { text: "Yes, as long as the angle is not $0$", explain: "The angle chosen does not matter. Testing one value is never a proof." },
      ],
    },
  ],
  summit: [
    {
      id: "s-circular",
      prompt: "Which is a **legitimate** way to prove the identity $A = B$?",
      choices: [
        { text: "Do the same operation to both sides until you reach $1 = 1$", explain: "Operating across the equals sign assumes $A = B$ from the start, so reaching $1 = 1$ proves nothing." },
        { text: "Rewrite either side, or both sides separately, until they become the same expression", correct: true, explain: "Each rewrite uses a known identity on its own expression. That never assumes $A = B$." },
        { text: "Cross-multiply, then check the two products are equal", explain: "Cross-multiplying treats the identity like an equation, which assumes the equality you must prove." },
        { text: "Assume $A = B$ and simplify until you reach $0 = 0$", explain: "Starting by assuming $A = B$ is circular. You cannot use the claim to prove itself." },
      ],
    },
    {
      id: "s-cross-mult-illegal",
      prompt: "Which step is **not** a legitimate move when verifying an identity?",
      choices: [
        { text: "Rewriting $\\cot x$ as $\\dfrac{\\cos x}{\\sin x}$", explain: "That is a valid quotient-identity rewrite on one side, so it is allowed." },
        { text: "Combining two fractions over a common denominator", explain: "Combining fractions on one side is a standard, legal simplification." },
        { text: "Cross-multiplying the two sides and checking the products match", correct: true, explain: "Cross-multiplying operates on both sides, so it assumes the equality you are trying to prove." },
        { text: "Factoring $\\sin^2 x - \\cos^2 x$ as $(\\sin x - \\cos x)(\\sin x + \\cos x)$", explain: "That is a valid factoring of one expression, so it is a legal step." },
      ],
    },
    {
      id: "s-choose-side",
      prompt: "To prove $\\sec^2 x + \\csc^2 x = \\sec^2 x\\,\\csc^2 x$, which side is smarter to start from?",
      choices: [
        { text: "The left side, rewriting each term in sines and cosines", correct: true, explain: "The sum is the messier side. Converting gives $\\dfrac{1}{\\cos^2 x} + \\dfrac{1}{\\sin^2 x} = \\dfrac{\\sin^2 x + \\cos^2 x}{\\sin^2 x\\cos^2 x}$, which simplifies to the product." },
        { text: "The right side, because a product is always simpler", explain: "A product is not automatically simpler. Here the sum has more to simplify and leads somewhere." },
        { text: "Neither, just cross-multiply the two sides", explain: "Cross-multiplying manipulates both sides, which is not a legal verification move." },
        { text: "The right side, by taking its square root", explain: "Taking a square root is not a valid identity step and does not help here." },
      ],
    },
    {
      id: "s-which-identity",
      prompt: "The quickest way to finish $\\dfrac{1 - \\cos^2 x}{\\sin x}$ is to:",
      choices: [
        { text: "Multiply top and bottom by $1 + \\cos x$", explain: "The conjugate is unnecessary here and only makes the expression messier." },
        { text: "Replace $1 - \\cos^2 x$ with $\\sin^2 x$, then cancel to get $\\sin x$", correct: true, explain: "By the Pythagorean identity $1 - \\cos^2 x = \\sin^2 x$, so $\\dfrac{\\sin^2 x}{\\sin x} = \\sin x$." },
        { text: "Replace $1 - \\cos^2 x$ with $\\tan^2 x$", explain: "That is not an identity. $1 - \\cos^2 x$ equals $\\sin^2 x$, not $\\tan^2 x$." },
        { text: "Replace $1 - \\cos^2 x$ with $1 + \\sin^2 x$", explain: "Sign error: the Pythagorean identity gives $1 - \\cos^2 x = \\sin^2 x$, not $1 + \\sin^2 x$." },
      ],
    },
    {
      id: "s-wrong-pythagorean",
      prompt: "To simplify $\\dfrac{\\sec^2 x - 1}{\\tan x}$, the correct replacement is:",
      choices: [
        { text: "$\\sec^2 x - 1 = \\sin^2 x$", explain: "Wrong Pythagorean form. That swap does not follow from $1 + \\tan^2 x = \\sec^2 x$." },
        { text: "$\\sec^2 x - 1 = 1 - \\tan^2 x$", explain: "Sign error: $1 + \\tan^2 x = \\sec^2 x$ gives $\\sec^2 x - 1 = \\tan^2 x$, not $1 - \\tan^2 x$." },
        { text: "$\\sec^2 x - 1 = \\tan^2 x$", correct: true, explain: "From $1 + \\tan^2 x = \\sec^2 x$, subtracting $1$ gives $\\sec^2 x - 1 = \\tan^2 x$, so the fraction becomes $\\tan x$." },
        { text: "$\\sec^2 x - 1 = \\cot^2 x$", explain: "Cotangent belongs to the $\\csc^2 x$ identity, not this one." },
      ],
    },
    {
      id: "s-conjugate-first",
      prompt: "To prove $\\dfrac{\\sin x}{1 + \\cos x} = \\dfrac{1 - \\cos x}{\\sin x}$, the cleanest first move is:",
      choices: [
        { text: "Multiply the left side, top and bottom, by $1 - \\cos x$", correct: true, explain: "The conjugate turns the bottom into $1 - \\cos^2 x = \\sin^2 x$, and the left side reduces to $\\dfrac{1 - \\cos x}{\\sin x}$." },
        { text: "Cross-multiply to get $\\sin^2 x = (1 + \\cos x)(1 - \\cos x)$ and stop", explain: "Even though both sides happen to equal $\\sin^2 x$, cross-multiplying assumes the identity, so it is circular." },
        { text: "Move $\\sin x$ across to the other side", explain: "Moving terms across the equals sign treats the identity like an equation, which is not allowed." },
        { text: "Replace $1 + \\cos x$ with $\\sin x$", explain: "That is not an identity. $1 + \\cos x$ does not equal $\\sin x$." },
      ],
    },
    {
      id: "s-conjugate-why",
      prompt: "Multiplying $\\sec x - \\tan x$ by its conjugate $\\sec x + \\tan x$ gives:",
      choices: [
        { text: "$\\sec^2 x + \\tan^2 x$", explain: "The conjugate product is a difference of squares, so the middle terms cancel to a minus, not a plus." },
        { text: "$\\sec x - \\tan x$, unchanged", explain: "Multiplying by the conjugate does change it. You get a difference of squares." },
        { text: "$\\sec^2 x - \\tan^2 x$, which equals $-1$", explain: "The difference of squares is right, but $1 + \\tan^2 x = \\sec^2 x$ makes it $+1$, not $-1$." },
        { text: "$\\sec^2 x - \\tan^2 x$, which equals $1$", correct: true, explain: "$(\\sec x - \\tan x)(\\sec x + \\tan x) = \\sec^2 x - \\tan^2 x$, and that equals $1$ by the Pythagorean identity." },
      ],
    },
    {
      id: "s-combine-fractions",
      prompt: "To prove $\\dfrac{\\cos x}{1 - \\sin x} = \\sec x + \\tan x$, rewriting the right side over a common denominator gives:",
      choices: [
        { text: "$\\dfrac{1 + \\sin x}{\\sin x}$", explain: "Both $\\sec x$ and $\\tan x$ have denominator $\\cos x$, not $\\sin x$." },
        { text: "$\\dfrac{1 + \\sin x}{\\cos x}$", correct: true, explain: "$\\sec x + \\tan x = \\dfrac{1}{\\cos x} + \\dfrac{\\sin x}{\\cos x} = \\dfrac{1 + \\sin x}{\\cos x}$." },
        { text: "$\\dfrac{1 - \\sin x}{\\cos x}$", explain: "Sign error: adding the numerators gives $1 + \\sin x$, not $1 - \\sin x$." },
        { text: "$\\dfrac{\\sin x}{\\cos x}$", explain: "That drops the $\\dfrac{1}{\\cos x}$ from $\\sec x$. Keep both terms." },
      ],
    },
    {
      id: "s-full-strategy",
      prompt: "To prove $\\sin^4 x - \\cos^4 x = \\sin^2 x - \\cos^2 x$, the smartest first step is:",
      choices: [
        { text: "Take the square root of both sides", explain: "Square-rooting both sides manipulates the equation and is not a valid verification move." },
        { text: "Convert everything to $\\tan x$", explain: "That buries the clean difference-of-squares structure and leads nowhere useful." },
        { text: "Factor the left side as $(\\sin^2 x - \\cos^2 x)(\\sin^2 x + \\cos^2 x)$", correct: true, explain: "The left side is a difference of squares, and one factor is $\\sin^2 x + \\cos^2 x = 1$." },
        { text: "Cross-multiply the two sides", explain: "Cross-multiplying operates on both sides, so it assumes the identity you must prove." },
      ],
    },
    {
      id: "s-full-strategy-2",
      prompt: "After factoring to $(\\sin^2 x - \\cos^2 x)(\\sin^2 x + \\cos^2 x)$, the finishing move is:",
      choices: [
        { text: "Replace $\\sin^2 x - \\cos^2 x$ with $1$", explain: "That factor is not $1$. The one that equals $1$ is $\\sin^2 x + \\cos^2 x$." },
        { text: "Replace $\\sin^2 x + \\cos^2 x$ with $1$", correct: true, explain: "By the Pythagorean identity this factor is $1$, leaving exactly $\\sin^2 x - \\cos^2 x$." },
        { text: "Cancel $\\sin^2 x$ from both factors", explain: "You cannot cancel a term out of a sum. Only shared factors cancel." },
        { text: "Multiply the two factors back out", explain: "That just returns $\\sin^4 x - \\cos^4 x$, undoing your progress." },
      ],
    },
    {
      id: "s-spot-error",
      prompt: "A student 'proves' $\\sin x = \\cos x$ because both equal $\\dfrac{\\sqrt{2}}{2}$ at $x = \\dfrac{\\pi}{4}$. What is wrong?",
      choices: [
        { text: "Nothing, the check is a valid proof", explain: "One matching angle is never a proof, and this statement is not even an identity." },
        { text: "The values at $\\dfrac{\\pi}{4}$ are actually different", explain: "They really are both $\\dfrac{\\sqrt{2}}{2}$ at that angle. The flaw is treating one match as a proof." },
        { text: "They should test $x = 0$ instead, where it also holds", explain: "At $x = 0$, $\\sin 0 = 0$ but $\\cos 0 = 1$, so it fails. More spot checks still are not a proof." },
        { text: "One matching angle is not a proof, and $\\sin x = \\cos x$ fails in general", correct: true, explain: "A single agreeing angle cannot establish an identity, and this equation is false for almost every $x$." },
      ],
    },
    {
      id: "s-domain",
      prompt: "After a successful verification, the identity is guaranteed to hold:",
      choices: [
        { text: "Only for the angles you happened to test", explain: "A symbolic verification covers all angles, not just tested ones. Testing was never the proof." },
        { text: "Only for acute angles between $0$ and $\\dfrac{\\pi}{2}$", explain: "The proof is not limited to acute angles. It covers every angle where both sides are defined." },
        { text: "For every angle where both sides are defined", correct: true, explain: "Identities hold wherever both sides exist. Angles that make a denominator zero are excluded." },
        { text: "For absolutely every real number, with no exceptions", explain: "Angles where a denominator is zero are excluded, so 'no exceptions' is too strong." },
      ],
    },
    {
      id: "s-divide-zero",
      prompt: "You cancel $\\sin x$ to simplify $\\dfrac{\\sin x \\cos x}{\\sin x}$ to $\\cos x$. What should you keep in mind?",
      choices: [
        { text: "Cancelling is never allowed inside a proof", explain: "Cancelling a shared factor is a standard, legal simplification on one side." },
        { text: "It is valid only where $\\sin x \\neq 0$, since the identity is claimed only where both sides are defined", correct: true, explain: "You are dividing by $\\sin x$, so the step needs $\\sin x \\neq 0$. The identity only claims equality where both sides exist." },
        { text: "$\\sin x$ is never zero, so there is nothing to note", explain: "$\\sin x$ is zero at $0$, $\\pi$, and other angles, so the caution is real." },
        { text: "You must also cancel a $\\cos x$ to stay balanced", explain: "There is no rule forcing a matching cancel. You only cancel factors that actually appear top and bottom." },
      ],
    },
    {
      id: "s-dead-end",
      prompt: "To prove $\\dfrac{1 + \\tan^2 x}{\\sec x} = \\sec x$, which first step makes clean progress?",
      choices: [
        { text: "Replace $1 + \\tan^2 x$ with $\\csc^2 x$", explain: "Wrong Pythagorean form. $1 + \\tan^2 x = \\sec^2 x$, while $\\csc^2 x$ pairs with $\\cot x$." },
        { text: "Replace $1 + \\tan^2 x$ with $1 + \\sec^2 x$", explain: "That is not an identity. The sum $1 + \\tan^2 x$ equals $\\sec^2 x$ itself." },
        { text: "Replace $1 + \\tan^2 x$ with $\\sec^2 x$", correct: true, explain: "The Pythagorean swap gives $\\dfrac{\\sec^2 x}{\\sec x} = \\sec x$ in one clean step." },
        { text: "Multiply both sides by $\\sec x$", explain: "Multiplying both sides manipulates the equation, which assumes the identity you are proving." },
      ],
    },
    {
      id: "s-goal",
      prompt: "A verification is finished exactly when:",
      choices: [
        { text: "The two sides have become the same expression", correct: true, explain: "A symbol-for-symbol match, reached by rewriting either side or both sides separately, completes the proof." },
        { text: "Cross-multiplying leaves a true statement", explain: "Cross-multiplying assumes the equality, so a resulting true statement does not prove it." },
        { text: "The two sides agree at several test angles", explain: "Agreement at sample angles is only evidence, never a completed proof." },
        { text: "You have solved for $x$", explain: "There is no unknown to solve for. Verifying proves a statement for all angles." },
      ],
    },
  ],
};
