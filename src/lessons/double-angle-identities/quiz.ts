import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Double-angle identities".
 * Grounded in the lesson: a double angle is the angle added to itself, so
 * $\sin 2\theta = 2\sin\theta\cos\theta$. $\cos 2\theta$ has three equal faces
 * ($\cos^2\theta-\sin^2\theta = 2\cos^2\theta-1 = 1-2\sin^2\theta$). Distractors
 * are the classic traps: dropping the factor of $2$, forgetting the $\cos\theta$,
 * mixing the three cosine forms or flipping a sign, and ignoring the quadrant.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-sin2",
      prompt: "$\\sin 2\\theta =$",
      choices: [
        { text: "$2\\sin\\theta\\cos\\theta$", correct: true, explain: "Rewrite $2\\theta$ as $\\theta+\\theta$, expand the sine of a sum, and the two equal terms add to this." },
        { text: "$2\\sin\\theta$", explain: "This drops the $\\cos\\theta$ factor. The doubled term is $\\sin\\theta\\cos\\theta$, not $\\sin\\theta$." },
        { text: "$\\sin^2\\theta - \\cos^2\\theta$", explain: "That is $-\\cos 2\\theta$, a cosine form with a sign flip, not $\\sin 2\\theta$." },
        { text: "$\\sin\\theta\\cos\\theta$", explain: "Right product, but you dropped the factor of $2$ that comes from adding two equal terms." },
      ],
    },
    {
      id: "c-origin",
      prompt: "Where do the double-angle identities come from?",
      choices: [
        { text: "Multiply the single-angle value by $2$.", explain: "Doubling the output is not the same as doubling the angle. $\\sin 2\\theta \\neq 2\\sin\\theta$." },
        { text: "Replace $\\theta$ with $2\\theta$ inside $\\sin\\theta$ and stop.", explain: "That just renames the angle. You still need the sum formula to expand it." },
        { text: "Rewrite $2\\theta$ as $\\theta+\\theta$ and apply the sum formulas.", correct: true, explain: "A double angle is the angle added to itself, so every sum formula applies with both angles equal to $\\theta$." },
        { text: "They are separate rules unrelated to the sum formulas.", explain: "They are the sum formulas with $A=B=\\theta$, not new memorized facts." },
      ],
    },
    {
      id: "c-cos2-not",
      prompt: "Which expression is **not** a form of $\\cos 2\\theta$?",
      choices: [
        { text: "$\\cos^2\\theta - \\sin^2\\theta$", explain: "This is the first face of $\\cos 2\\theta$, straight from the cosine sum formula." },
        { text: "$2\\sin\\theta\\cos\\theta$", correct: true, explain: "This is $\\sin 2\\theta$, not $\\cos 2\\theta$. The other three are all valid cosine forms." },
        { text: "$2\\cos^2\\theta - 1$", explain: "This is a valid cosine-only face of $\\cos 2\\theta$." },
        { text: "$1 - 2\\sin^2\\theta$", explain: "This is a valid sine-only face of $\\cos 2\\theta$." },
      ],
    },
    {
      id: "c-cos2-derive",
      prompt: "Start from $\\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta$ and replace $\\sin^2\\theta$ with $1-\\cos^2\\theta$. You get:",
      choices: [
        { text: "$2\\cos^2\\theta - 1$", correct: true, explain: "$\\cos^2\\theta - (1-\\cos^2\\theta) = \\cos^2\\theta - 1 + \\cos^2\\theta = 2\\cos^2\\theta - 1$." },
        { text: "$1 - 2\\cos^2\\theta$", explain: "Sign flip: every term is negated. Distribute the minus carefully." },
        { text: "$2\\cos^2\\theta + 1$", explain: "The constant becomes $-1$, not $+1$, once you subtract the $1$." },
        { text: "$\\cos^2\\theta - 1$", explain: "You forgot the second $\\cos^2\\theta$ that appears when you distribute the minus." },
      ],
    },
    {
      id: "c-cos2-is",
      prompt: "$\\cos 2\\theta$ equals which of these?",
      choices: [
        { text: "$\\cos^2\\theta + \\sin^2\\theta$", explain: "That sum is $1$, the Pythagorean identity, not a double-angle form." },
        { text: "$2\\sin\\theta\\cos\\theta$", explain: "That is $\\sin 2\\theta$. Cosine subtracts: $\\cos^2\\theta - \\sin^2\\theta$." },
        { text: "$\\cos^2\\theta - \\sin^2\\theta$", correct: true, explain: "This is the first face of $\\cos 2\\theta$, straight from the cosine sum formula with $A=B=\\theta$." },
        { text: "$\\sin^2\\theta - \\cos^2\\theta$", explain: "That is $-\\cos 2\\theta$. Keep cosine first: $\\cos^2\\theta - \\sin^2\\theta$." },
      ],
    },
    {
      id: "c-false-sin",
      prompt: "A classmate writes $\\sin 2\\theta = 2\\sin\\theta$. What is the mistake?",
      choices: [
        { text: "Nothing, it is correct.", explain: "It is a false identity. Test $\\theta = 45^\\circ$: $\\sin 90^\\circ = 1$, but $2\\sin 45^\\circ \\approx 1.41$." },
        { text: "It drops the $\\cos\\theta$ factor. The identity is $2\\sin\\theta\\cos\\theta$.", correct: true, explain: "Expanding $\\sin(\\theta+\\theta)$ leaves $\\sin\\theta\\cos\\theta$ twice, so $\\cos\\theta$ must stay." },
        { text: "It should read $2\\cos\\theta$ instead.", explain: "That is also wrong, and it loses the $\\sin\\theta$. The correct form keeps both, as $2\\sin\\theta\\cos\\theta$." },
        { text: "The factor of $2$ does not belong.", explain: "The $2$ is correct. It comes from adding two equal terms. The missing piece is $\\cos\\theta$." },
      ],
    },
    {
      id: "c-sin2-compute",
      prompt: "If $\\sin\\theta = \\dfrac35$ and $\\cos\\theta = \\dfrac45$, then $\\sin 2\\theta =$",
      choices: [
        { text: "$\\dfrac{12}{25}$", explain: "That is $\\sin\\theta\\cos\\theta$ without the factor of $2$. Double it." },
        { text: "$\\dfrac{6}{5}$", explain: "That is $2\\sin\\theta$. You dropped the $\\cos\\theta$ factor." },
        { text: "$\\dfrac{24}{25}$", correct: true, explain: "$2\\sin\\theta\\cos\\theta = 2\\cdot\\dfrac35\\cdot\\dfrac45 = \\dfrac{24}{25}$." },
        { text: "$\\dfrac{7}{25}$", explain: "That is $\\cos 2\\theta = \\cos^2\\theta-\\sin^2\\theta$, not $\\sin 2\\theta$." },
      ],
    },
    {
      id: "c-cos2-compute",
      prompt: "With $\\sin\\theta = \\dfrac35$ and $\\cos\\theta = \\dfrac45$, use $\\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta$ to get:",
      choices: [
        { text: "$\\dfrac{7}{25}$", correct: true, explain: "$\\cos^2\\theta - \\sin^2\\theta = \\dfrac{16}{25} - \\dfrac{9}{25} = \\dfrac{7}{25}$." },
        { text: "$-\\dfrac{7}{25}$", explain: "You computed $\\sin^2\\theta - \\cos^2\\theta$. Keep cosine first: $\\cos^2\\theta - \\sin^2\\theta$." },
        { text: "$\\dfrac{24}{25}$", explain: "That is $\\sin 2\\theta = 2\\sin\\theta\\cos\\theta$, not $\\cos 2\\theta$." },
        { text: "$1$", explain: "That is $\\cos^2\\theta + \\sin^2\\theta$. The double-angle form subtracts, it does not add." },
      ],
    },
    {
      id: "c-form-cos-only",
      prompt: "You know $\\cos\\theta$ but not $\\sin\\theta$. Which $\\cos 2\\theta$ form is most convenient?",
      choices: [
        { text: "$1 - 2\\sin^2\\theta$", explain: "This needs $\\sin\\theta$, which you were not given. Pick the cosine-only face." },
        { text: "$2\\cos^2\\theta - 1$", correct: true, explain: "This face uses only $\\cos\\theta$, so you can plug in directly." },
        { text: "$\\cos^2\\theta - \\sin^2\\theta$", explain: "This also needs $\\sin\\theta$. Choose the form built from what you have." },
        { text: "$2\\sin\\theta\\cos\\theta$", explain: "That is $\\sin 2\\theta$, and it still needs $\\sin\\theta$." },
      ],
    },
    {
      id: "c-form-sin-only",
      prompt: "You know $\\sin\\theta$ but not $\\cos\\theta$. Which $\\cos 2\\theta$ form is most convenient?",
      choices: [
        { text: "$2\\cos^2\\theta - 1$", explain: "This needs $\\cos\\theta$, which you were not given. Pick the sine-only face." },
        { text: "$\\cos^2\\theta - \\sin^2\\theta$", explain: "This also needs $\\cos\\theta$. Choose the form built from what you have." },
        { text: "$1 - 2\\sin^2\\theta$", correct: true, explain: "This face uses only $\\sin\\theta$, so you can plug in directly." },
        { text: "$2\\sin\\theta\\cos\\theta$", explain: "That is $\\sin 2\\theta$, and it still needs $\\cos\\theta$." },
      ],
    },
    {
      id: "c-cos2-from-cos",
      prompt: "If $\\cos\\theta = \\dfrac45$, then $2\\cos^2\\theta - 1 =$",
      choices: [
        { text: "$\\dfrac{32}{25}$", explain: "That is just $2\\cos^2\\theta$. You forgot to subtract $1$." },
        { text: "$\\dfrac35$", explain: "That is $2\\cos\\theta - 1$. You forgot to square $\\cos\\theta$ first." },
        { text: "$-\\dfrac{7}{25}$", explain: "That is $1 - 2\\cos^2\\theta$, the form flipped. Keep it as $2\\cos^2\\theta - 1$." },
        { text: "$\\dfrac{7}{25}$", correct: true, explain: "$2\\cdot\\dfrac{16}{25} - 1 = \\dfrac{32}{25} - \\dfrac{25}{25} = \\dfrac{7}{25}$." },
      ],
    },
    {
      id: "c-cos2-from-sin",
      prompt: "If $\\sin\\theta = \\dfrac35$, then $1 - 2\\sin^2\\theta =$",
      choices: [
        { text: "$\\dfrac{7}{25}$", correct: true, explain: "$1 - 2\\cdot\\dfrac{9}{25} = \\dfrac{25}{25} - \\dfrac{18}{25} = \\dfrac{7}{25}$." },
        { text: "$-\\dfrac{7}{25}$", explain: "That is $2\\sin^2\\theta - 1$, the form flipped. Keep it as $1 - 2\\sin^2\\theta$." },
        { text: "$-\\dfrac15$", explain: "That is $1 - 2\\cdot\\dfrac35$. You forgot to square $\\sin\\theta$ first." },
        { text: "$\\dfrac{18}{25}$", explain: "That is $2\\sin^2\\theta$ alone. You forgot the leading $1-$." },
      ],
    },
    {
      id: "c-cos2-acute",
      prompt: "If $\\cos\\theta = \\dfrac35$ with $\\theta$ acute, then $2\\cos^2\\theta - 1 =$",
      choices: [
        { text: "$\\dfrac{18}{25}$", explain: "That is $2\\cos^2\\theta$ alone. You still need to subtract $1$." },
        { text: "$\\dfrac{7}{25}$", explain: "That is $1 - 2\\cos^2\\theta$ with the sign flipped, or $1 - 2\\sin^2\\theta$ for a different value. Keep $2\\cos^2\\theta - 1$." },
        { text: "$\\dfrac{1}{5}$", explain: "You forgot to square: $2\\cdot\\dfrac35 - 1$. Square $\\cos\\theta$ first." },
        { text: "$-\\dfrac{7}{25}$", correct: true, explain: "$2\\cdot\\dfrac{9}{25} - 1 = \\dfrac{18}{25} - \\dfrac{25}{25} = -\\dfrac{7}{25}$." },
      ],
    },
    {
      id: "c-the-2",
      prompt: "In $\\sin 2\\theta = 2\\sin\\theta\\cos\\theta$, where does the $2$ come from?",
      choices: [
        { text: "Doubling the angle doubles the result.", explain: "Doubling the angle does not scale the output. Test any angle to see it fails." },
        { text: "From $\\sin^2\\theta + \\cos^2\\theta = 1$.", explain: "The Pythagorean identity is not used here. The $2$ comes from the expansion." },
        { text: "The two equal terms $\\sin\\theta\\cos\\theta + \\cos\\theta\\sin\\theta$ add together.", correct: true, explain: "Expanding $\\sin(\\theta+\\theta)$ gives the same product twice, and they add to $2\\sin\\theta\\cos\\theta$." },
        { text: "It is memorized with no reason.", explain: "There is a reason: the expansion produces two identical terms that add, so the factor of $2$ is derived rather than memorized." },
      ],
    },
    {
      id: "c-reverse",
      prompt: "Simplify $2\\sin 3x\\cos 3x$ using a double-angle identity.",
      choices: [
        { text: "$\\sin 6x$", correct: true, explain: "With $\\theta = 3x$, $2\\sin\\theta\\cos\\theta = \\sin 2\\theta = \\sin 6x$." },
        { text: "$\\sin 3x$", explain: "You forgot to double the angle. $2\\theta = 2(3x) = 6x$." },
        { text: "$2\\sin 6x$", explain: "The factor of $2$ is absorbed by the identity. The result is just $\\sin 6x$." },
        { text: "$\\cos 6x$", explain: "The pattern $2\\sin\\theta\\cos\\theta$ is $\\sin 2\\theta$, not a cosine." },
      ],
    },
  ],
  summit: [
    {
      id: "s-A-cos",
      prompt: "$\\sin\\theta = \\dfrac35$ with $\\theta$ in **Quadrant II**. Find $\\cos\\theta$.",
      choices: [
        { text: "$\\dfrac45$", explain: "Correct size, wrong sign. In Quadrant II cosine is negative." },
        { text: "$-\\dfrac45$", correct: true, explain: "$\\cos^2\\theta = 1 - \\dfrac{9}{25} = \\dfrac{16}{25}$, and Quadrant II makes it negative: $-\\dfrac45$." },
        { text: "$-\\dfrac35$", explain: "That is $-\\sin\\theta$. Use $\\cos^2\\theta = 1 - \\sin^2\\theta$ to find cosine." },
        { text: "$\\dfrac{16}{25}$", explain: "That is $\\cos^2\\theta$. Take the square root (and the Quadrant II sign)." },
      ],
    },
    {
      id: "s-A-sin2",
      prompt: "Same setup ($\\sin\\theta = \\dfrac35$, $\\cos\\theta = -\\dfrac45$). Find $\\sin 2\\theta$.",
      choices: [
        { text: "$-\\dfrac{24}{25}$", correct: true, explain: "$2\\sin\\theta\\cos\\theta = 2\\cdot\\dfrac35\\cdot\\left(-\\dfrac45\\right) = -\\dfrac{24}{25}$." },
        { text: "$\\dfrac{24}{25}$", explain: "You used $\\cos\\theta = +\\dfrac45$. In Quadrant II cosine is negative, so the result is negative." },
        { text: "$-\\dfrac{12}{25}$", explain: "You dropped the factor of $2$. Multiply the product by $2$." },
        { text: "$\\dfrac{7}{25}$", explain: "That is $\\cos 2\\theta$, not $\\sin 2\\theta$." },
      ],
    },
    {
      id: "s-A-cos2",
      prompt: "Same setup ($\\sin\\theta = \\dfrac35$). Using $1 - 2\\sin^2\\theta$, find $\\cos 2\\theta$.",
      choices: [
        { text: "$-\\dfrac{7}{25}$", explain: "That is $2\\sin^2\\theta - 1$, the form flipped. Use $1 - 2\\sin^2\\theta$." },
        { text: "$-\\dfrac15$", explain: "You forgot to square: $1 - 2\\cdot\\dfrac35$. Square $\\sin\\theta$ first." },
        { text: "$\\dfrac{7}{25}$", correct: true, explain: "$1 - 2\\cdot\\dfrac{9}{25} = \\dfrac{25}{25} - \\dfrac{18}{25} = \\dfrac{7}{25}$. Note $\\cos 2\\theta$ needs only $\\sin^2\\theta$, so the quadrant sign of $\\cos\\theta$ never enters." },
        { text: "$-\\dfrac{24}{25}$", explain: "That is $\\sin 2\\theta$ for this angle, not $\\cos 2\\theta$." },
      ],
    },
    {
      id: "s-A-tan2",
      prompt: "Same setup ($\\sin 2\\theta = -\\dfrac{24}{25}$, $\\cos 2\\theta = \\dfrac{7}{25}$). Find $\\tan 2\\theta$.",
      choices: [
        { text: "$\\dfrac{24}{7}$", explain: "Sign slip: $\\sin 2\\theta$ is negative and $\\cos 2\\theta$ is positive, so the quotient is negative." },
        { text: "$-\\dfrac{7}{24}$", explain: "You flipped the ratio. $\\tan 2\\theta = \\dfrac{\\sin 2\\theta}{\\cos 2\\theta}$, not the reciprocal." },
        { text: "$\\dfrac{7}{24}$", explain: "Flipped and wrong sign. Divide sine by cosine, keeping the negative." },
        { text: "$-\\dfrac{24}{7}$", correct: true, explain: "$\\dfrac{\\sin 2\\theta}{\\cos 2\\theta} = \\dfrac{-24/25}{7/25} = -\\dfrac{24}{7}$." },
      ],
    },
    {
      id: "s-A-quad",
      prompt: "Same setup ($\\theta$ in Quadrant II, $\\sin 2\\theta = -\\dfrac{24}{25}$, $\\cos 2\\theta = \\dfrac{7}{25}$). Which quadrant holds $2\\theta$?",
      choices: [
        { text: "Quadrant II", explain: "You doubled the quadrant label. Check the actual signs of $\\sin 2\\theta$ and $\\cos 2\\theta$." },
        { text: "Quadrant IV", correct: true, explain: "$\\theta \\in (90^\\circ,180^\\circ)$ gives $2\\theta \\in (180^\\circ,360^\\circ)$. With $\\sin 2\\theta < 0$ and $\\cos 2\\theta > 0$, that is Quadrant IV." },
        { text: "Quadrant III", explain: "Quadrant III needs $\\cos 2\\theta < 0$, but here $\\cos 2\\theta = \\dfrac{7}{25} > 0$." },
        { text: "Quadrant I", explain: "Quadrant I needs both positive, but $\\sin 2\\theta = -\\dfrac{24}{25} < 0$." },
      ],
    },
    {
      id: "s-B-sin",
      prompt: "$\\cos\\theta = -\\dfrac{5}{13}$ with $\\theta$ in **Quadrant III**. Find $\\sin\\theta$.",
      choices: [
        { text: "$-\\dfrac{12}{13}$", correct: true, explain: "$\\sin^2\\theta = 1 - \\dfrac{25}{169} = \\dfrac{144}{169}$, and Quadrant III makes sine negative: $-\\dfrac{12}{13}$." },
        { text: "$\\dfrac{12}{13}$", explain: "Correct size, wrong sign. In Quadrant III sine is negative." },
        { text: "$-\\dfrac{5}{13}$", explain: "That is $\\cos\\theta$. Use $\\sin^2\\theta = 1 - \\cos^2\\theta$." },
        { text: "$\\dfrac{144}{169}$", explain: "That is $\\sin^2\\theta$. Take the square root (and the Quadrant III sign)." },
      ],
    },
    {
      id: "s-B-sin2",
      prompt: "Same setup ($\\sin\\theta = -\\dfrac{12}{13}$, $\\cos\\theta = -\\dfrac{5}{13}$). Find $\\sin 2\\theta$.",
      choices: [
        { text: "$-\\dfrac{120}{169}$", explain: "Sign error: a negative times a negative is positive, so $\\sin 2\\theta > 0$." },
        { text: "$\\dfrac{60}{169}$", explain: "You dropped the factor of $2$. Double the product." },
        { text: "$\\dfrac{120}{169}$", correct: true, explain: "$2\\left(-\\dfrac{12}{13}\\right)\\left(-\\dfrac{5}{13}\\right) = 2\\cdot\\dfrac{60}{169} = \\dfrac{120}{169}$." },
        { text: "$\\dfrac{119}{169}$", explain: "That is the size of $\\cos 2\\theta$, not $\\sin 2\\theta$." },
      ],
    },
    {
      id: "s-B-cos2",
      prompt: "Same setup ($\\cos\\theta = -\\dfrac{5}{13}$). Using $2\\cos^2\\theta - 1$, find $\\cos 2\\theta$.",
      choices: [
        { text: "$\\dfrac{119}{169}$", explain: "That is $1 - 2\\cos^2\\theta$, the form flipped. Use $2\\cos^2\\theta - 1$." },
        { text: "$-\\dfrac{119}{169}$", correct: true, explain: "$2\\cdot\\dfrac{25}{169} - 1 = \\dfrac{50}{169} - \\dfrac{169}{169} = -\\dfrac{119}{169}$." },
        { text: "$\\dfrac{50}{169}$", explain: "That is $2\\cos^2\\theta$ alone. You forgot to subtract $1$." },
        { text: "$-\\dfrac{120}{169}$", explain: "That is $-\\sin 2\\theta$ for this angle, not $\\cos 2\\theta$." },
      ],
    },
    {
      id: "s-B-tan2",
      prompt: "Same setup ($\\sin 2\\theta = \\dfrac{120}{169}$, $\\cos 2\\theta = -\\dfrac{119}{169}$). Find $\\tan 2\\theta$.",
      choices: [
        { text: "$\\dfrac{120}{119}$", explain: "Sign slip: $\\cos 2\\theta$ is negative, so the quotient is negative." },
        { text: "$-\\dfrac{119}{120}$", explain: "You flipped the ratio. Divide $\\sin 2\\theta$ by $\\cos 2\\theta$." },
        { text: "$\\dfrac{119}{120}$", explain: "Flipped and wrong sign. Keep sine over cosine with its negative." },
        { text: "$-\\dfrac{120}{119}$", correct: true, explain: "$\\dfrac{120/169}{-119/169} = -\\dfrac{120}{119}$." },
      ],
    },
    {
      id: "s-C-cos",
      prompt: "$\\sin\\theta = -\\dfrac{8}{17}$ with $\\theta$ in **Quadrant IV**. Find $\\cos\\theta$.",
      choices: [
        { text: "$\\dfrac{15}{17}$", correct: true, explain: "$\\cos^2\\theta = 1 - \\dfrac{64}{289} = \\dfrac{225}{289}$, and Quadrant IV makes cosine positive: $\\dfrac{15}{17}$." },
        { text: "$-\\dfrac{15}{17}$", explain: "Correct size, wrong sign. In Quadrant IV cosine is positive." },
        { text: "$\\dfrac{8}{17}$", explain: "That is $|\\sin\\theta|$. Use $\\cos^2\\theta = 1 - \\sin^2\\theta$ instead." },
        { text: "$\\dfrac{225}{289}$", explain: "That is $\\cos^2\\theta$. Take the square root." },
      ],
    },
    {
      id: "s-C-sin2",
      prompt: "Same setup ($\\sin\\theta = -\\dfrac{8}{17}$, $\\cos\\theta = \\dfrac{15}{17}$). Find $\\sin 2\\theta$.",
      choices: [
        { text: "$\\dfrac{240}{289}$", explain: "Sign error: $\\sin\\theta$ is negative and $\\cos\\theta$ is positive, so the product is negative." },
        { text: "$-\\dfrac{120}{289}$", explain: "You dropped the factor of $2$. Double the product." },
        { text: "$-\\dfrac{240}{289}$", correct: true, explain: "$2\\left(-\\dfrac{8}{17}\\right)\\left(\\dfrac{15}{17}\\right) = 2\\cdot\\left(-\\dfrac{120}{289}\\right) = -\\dfrac{240}{289}$." },
        { text: "$\\dfrac{161}{289}$", explain: "That is $\\cos 2\\theta$, not $\\sin 2\\theta$." },
      ],
    },
    {
      id: "s-C-cos2",
      prompt: "Same setup ($\\sin\\theta = -\\dfrac{8}{17}$). Using $1 - 2\\sin^2\\theta$, find $\\cos 2\\theta$.",
      choices: [
        { text: "$\\dfrac{161}{289}$", correct: true, explain: "$1 - 2\\cdot\\dfrac{64}{289} = \\dfrac{289}{289} - \\dfrac{128}{289} = \\dfrac{161}{289}$." },
        { text: "$-\\dfrac{161}{289}$", explain: "That is $2\\sin^2\\theta - 1$, the form flipped. Use $1 - 2\\sin^2\\theta$." },
        { text: "$\\dfrac{225}{289}$", explain: "That is $1 - \\sin^2\\theta = \\cos^2\\theta$. You forgot the factor of $2$ on $\\sin^2\\theta$." },
        { text: "$-\\dfrac{240}{289}$", explain: "That is $\\sin 2\\theta$ for this angle, not $\\cos 2\\theta$." },
      ],
    },
    {
      id: "s-D-cos2-only",
      prompt: "If $\\cos\\theta = \\dfrac13$ (with $\\theta$ acute), find $\\cos 2\\theta$ using $2\\cos^2\\theta - 1$.",
      choices: [
        { text: "$\\dfrac79$", explain: "That is $1 - 2\\cos^2\\theta$, the form flipped. Keep $2\\cos^2\\theta - 1$." },
        { text: "$-\\dfrac79$", correct: true, explain: "$2\\cdot\\dfrac19 - 1 = \\dfrac29 - 1 = -\\dfrac79$." },
        { text: "$-\\dfrac13$", explain: "You forgot to square: $2\\cdot\\dfrac13 - 1$. Square $\\cos\\theta$ first." },
        { text: "$\\dfrac29$", explain: "That is $2\\cos^2\\theta$ alone. You still need to subtract $1$." },
      ],
    },
    {
      id: "s-form-choice",
      prompt: "You know $\\cos\\theta$ but have not found $\\sin\\theta$ yet. Which $\\cos 2\\theta$ form gets the value in **one step**?",
      choices: [
        { text: "$1 - 2\\sin^2\\theta$", explain: "This needs $\\sin\\theta$, which you have not computed. Choose the cosine-only face." },
        { text: "$\\cos^2\\theta - \\sin^2\\theta$", explain: "This also needs $\\sin\\theta$. Pick the form built from what you already have." },
        { text: "$2\\sin\\theta\\cos\\theta$", explain: "That is $\\sin 2\\theta$, and it needs $\\sin\\theta$ too." },
        { text: "$2\\cos^2\\theta - 1$", correct: true, explain: "This face uses only $\\cos\\theta$, so it gives $\\cos 2\\theta$ without finding $\\sin\\theta$." },
      ],
    },
    {
      id: "s-irrational",
      prompt: "If $\\sin\\theta = \\dfrac13$ (with $\\theta$ acute), find $\\cos 2\\theta$.",
      choices: [
        { text: "$-\\dfrac79$", explain: "That is $2\\sin^2\\theta - 1$, the form flipped. Use $1 - 2\\sin^2\\theta$." },
        { text: "$\\dfrac89$", explain: "That is $1 - \\sin^2\\theta = \\cos^2\\theta$. You forgot the factor of $2$ on $\\sin^2\\theta$." },
        { text: "$\\dfrac79$", correct: true, explain: "$1 - 2\\sin^2\\theta = 1 - 2\\cdot\\dfrac19 = \\dfrac79$. The sine-only form avoids the messy $\\cos\\theta = \\dfrac{2\\sqrt2}{3}$." },
        { text: "$\\dfrac13$", explain: "You forgot to square: $1 - 2\\cdot\\dfrac13$. Square $\\sin\\theta$ first." },
      ],
    },
  ],
};
