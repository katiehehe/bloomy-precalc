import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Half-angle identities".
 * Grounded in the lesson: the sine and cosine half-angle formulas are the
 * double-angle cosine formulas solved backward, sine keeps $1-\cos\theta$ and
 * cosine keeps $1+\cos\theta$, the $\pm$ is chosen from the quadrant of the
 * half angle $\dfrac{\theta}{2}$ (never $\theta$), the tangent quotient forms
 * need no sign, and exact values come from halving a known angle. Distractors
 * are the classic traps: sign from the wrong quadrant, swapped numerators, a
 * dropped root or division by two, flipped tangent quotients, and radical slips.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-sin-formula",
      prompt: "The half-angle formula for sine is $\\sin\\dfrac{\\theta}{2} =$",
      choices: [
        { text: "$\\pm\\sqrt{\\dfrac{1-\\cos\\theta}{2}}$", correct: true, explain: "This comes from $\\cos 2\\alpha = 1 - 2\\sin^2\\alpha$ solved for the sine term with $\\alpha=\\dfrac{\\theta}{2}$, so the numerator is $1-\\cos\\theta$." },
        { text: "$\\pm\\sqrt{\\dfrac{1+\\cos\\theta}{2}}$", explain: "That is the **cosine** formula. Sine keeps $1-\\cos\\theta$ on top. Cosine keeps $1+\\cos\\theta$." },
        { text: "$\\dfrac{1-\\cos\\theta}{2}$", explain: "The square root is missing. You isolate $\\sin^2\\dfrac{\\theta}{2}=\\dfrac{1-\\cos\\theta}{2}$, so a root must follow." },
        { text: "$2\\sin\\theta\\cos\\theta$", explain: "That is $\\sin 2\\theta$, a double-angle formula, not a half-angle one." },
      ],
    },
    {
      id: "c-cos-formula",
      prompt: "The half-angle formula for cosine is $\\cos\\dfrac{\\theta}{2} =$",
      choices: [
        { text: "$\\pm\\sqrt{\\dfrac{1-\\cos\\theta}{2}}$", explain: "That numerator belongs to **sine**. Cosine keeps a plus: $1+\\cos\\theta$." },
        { text: "$\\pm\\sqrt{\\dfrac{1+\\cos\\theta}{2}}$", correct: true, explain: "It comes from $\\cos 2\\alpha = 2\\cos^2\\alpha - 1$ solved for the cosine term, so the numerator is $1+\\cos\\theta$." },
        { text: "$\\pm\\dfrac{1+\\cos\\theta}{2}$", explain: "The root is missing. You solved for $\\cos^2\\dfrac{\\theta}{2}$, so the square root is still needed." },
        { text: "$2\\cos^2\\theta - 1$", explain: "That is the double-angle formula $\\cos 2\\theta$, not the half-angle version." },
      ],
    },
    {
      id: "c-derive-sin",
      prompt: "Which double-angle identity is solved backward to build the **sine** half-angle formula?",
      choices: [
        { text: "$\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha$", explain: "This has no $\\sin^2$ term to isolate, so it cannot produce $\\sin\\dfrac{\\theta}{2}$." },
        { text: "$\\cos 2\\alpha = 2\\cos^2\\alpha - 1$", explain: "This face has $\\cos^2$, so it builds the cosine half-angle formula, not sine." },
        { text: "$\\cos 2\\alpha = 1 - 2\\sin^2\\alpha$", correct: true, explain: "It already contains $\\sin^2\\alpha$. Isolating that term with $\\alpha=\\dfrac{\\theta}{2}$ gives the sine half-angle formula." },
        { text: "$\\sin^2\\alpha + \\cos^2\\alpha = 1$", explain: "The Pythagorean identity has no angle doubling, so it yields no half-angle formula." },
      ],
    },
    {
      id: "c-sign-quadrant",
      prompt: "In $\\sin\\dfrac{\\theta}{2}=\\pm\\sqrt{\\dfrac{1-\\cos\\theta}{2}}$, the $\\pm$ sign is decided by the quadrant of:",
      choices: [
        { text: "$\\theta$", explain: "Common trap. The formula outputs a function of the **half** angle, so $\\theta$'s quadrant is the wrong place to look." },
        { text: "$\\dfrac{\\theta}{2}$", correct: true, explain: "You are evaluating $\\sin\\dfrac{\\theta}{2}$, so its own quadrant sets the sign. Halve first, then check the quadrant." },
        { text: "$2\\theta$", explain: "Doubling goes the wrong direction. The sign follows the angle you evaluate, $\\dfrac{\\theta}{2}$." },
        { text: "it is always $+$", explain: "Not always. Depending on the half angle's quadrant the value can be negative, so you must check." },
      ],
    },
    {
      id: "c-numerator",
      prompt: "Which half-angle formula has $1-\\cos\\theta$ (a **minus**) in the numerator under the root?",
      choices: [
        { text: "cosine", explain: "Cosine uses $1+\\cos\\theta$, a plus. Swapping the two signs is the classic mix-up." },
        { text: "both sine and cosine", explain: "Only one does. Sine gets the minus. Cosine gets the plus." },
        { text: "sine", correct: true, explain: "$\\sin\\dfrac{\\theta}{2}=\\pm\\sqrt{\\dfrac{1-\\cos\\theta}{2}}$. The minus traces back to $\\cos 2\\alpha = 1-2\\sin^2\\alpha$." },
        { text: "neither", explain: "Sine does. $\\sin\\dfrac{\\theta}{2}$ carries the $1-\\cos\\theta$ numerator." },
      ],
    },
    {
      id: "c-tan-form1",
      prompt: "Which expression equals $\\tan\\dfrac{\\theta}{2}$?",
      choices: [
        { text: "$\\dfrac{1-\\cos\\theta}{\\sin\\theta}$", correct: true, explain: "This is the standard tangent half-angle form, and it needs no $\\pm$." },
        { text: "$\\dfrac{1+\\cos\\theta}{\\sin\\theta}$", explain: "Wrong numerator. This expression is actually $\\cot\\dfrac{\\theta}{2}$, the reciprocal." },
        { text: "$\\dfrac{\\sin\\theta}{1-\\cos\\theta}$", explain: "This is upside down. $\\dfrac{\\sin\\theta}{1-\\cos\\theta}=\\cot\\dfrac{\\theta}{2}$, not $\\tan\\dfrac{\\theta}{2}$." },
        { text: "$2\\sin\\theta\\cos\\theta$", explain: "That is $\\sin 2\\theta$, a double-angle formula, unrelated to the half angle." },
      ],
    },
    {
      id: "c-tan-form2",
      prompt: "The tangent half-angle has a second equivalent form. $\\tan\\dfrac{\\theta}{2}$ also equals:",
      choices: [
        { text: "$\\dfrac{\\cos\\theta}{1+\\sin\\theta}$", explain: "This mixes up the pieces. The correct second form keeps $\\sin\\theta$ on top and $1+\\cos\\theta$ on the bottom." },
        { text: "$\\dfrac{\\sin\\theta}{1+\\cos\\theta}$", correct: true, explain: "Both $\\dfrac{1-\\cos\\theta}{\\sin\\theta}$ and $\\dfrac{\\sin\\theta}{1+\\cos\\theta}$ equal $\\tan\\dfrac{\\theta}{2}$." },
        { text: "$\\dfrac{\\sin\\theta}{1-\\cos\\theta}$", explain: "This has a minus where a plus belongs. It equals $\\cot\\dfrac{\\theta}{2}$, the reciprocal." },
        { text: "$\\dfrac{1+\\cos\\theta}{\\sin\\theta}$", explain: "This is $\\cot\\dfrac{\\theta}{2}$. Flip it to get a tangent." },
      ],
    },
    {
      id: "c-tan-nosign",
      prompt: "Do the tangent forms $\\dfrac{1-\\cos\\theta}{\\sin\\theta}$ and $\\dfrac{\\sin\\theta}{1+\\cos\\theta}$ need a $\\pm$?",
      choices: [
        { text: "No, these forms already carry the correct sign automatically", correct: true, explain: "Unlike the sine and cosine roots, the tangent quotient forms need no $\\pm$. The signs of $\\sin\\theta$ and $\\cos\\theta$ handle it." },
        { text: "Yes, every half-angle formula needs a $\\pm$", explain: "Only the square-root forms do. The tangent quotient forms resolve the sign on their own." },
        { text: "Only the first form needs a $\\pm$", explain: "Neither quotient form needs one. Both are exact as written." },
        { text: "Yes, because tangent can be negative", explain: "Tangent can be negative, but the quotient already produces that sign without a $\\pm$." },
      ],
    },
    {
      id: "c-cos15",
      prompt: "$\\cos 15^\\circ = \\sqrt{\\dfrac{1+\\cos 30^\\circ}{2}}$. Using $\\cos 30^\\circ=\\dfrac{\\sqrt3}{2}$, this equals:",
      choices: [
        { text: "$\\dfrac{\\sqrt{2-\\sqrt3}}{2}$", explain: "That is $\\sin 15^\\circ$. You used $1-\\cos 30^\\circ$. Cosine needs $1+\\cos 30^\\circ$." },
        { text: "$\\dfrac{1+\\sqrt3}{2}$", explain: "The nested root was dropped too early. Keep it: $\\sqrt{\\dfrac{2+\\sqrt3}{4}}=\\dfrac{\\sqrt{2+\\sqrt3}}{2}$." },
        { text: "$\\dfrac{\\sqrt3}{2}$", explain: "That is $\\cos 30^\\circ$ itself, not $\\cos 15^\\circ$. Simplify the nested fraction fully." },
        { text: "$\\dfrac{\\sqrt{2+\\sqrt3}}{2}$", correct: true, explain: "$1+\\dfrac{\\sqrt3}{2}=\\dfrac{2+\\sqrt3}{2}$. Dividing by $2$ gives $\\dfrac{2+\\sqrt3}{4}$, whose root is $\\dfrac{\\sqrt{2+\\sqrt3}}{2}\\approx0.966$." },
      ],
    },
    {
      id: "c-sin15",
      prompt: "$\\sin 15^\\circ = \\sqrt{\\dfrac{1-\\cos 30^\\circ}{2}}$. Using $\\cos 30^\\circ=\\dfrac{\\sqrt3}{2}$, this equals:",
      choices: [
        { text: "$\\dfrac{\\sqrt{2-\\sqrt3}}{2}$", correct: true, explain: "$1-\\dfrac{\\sqrt3}{2}=\\dfrac{2-\\sqrt3}{2}$. Dividing by $2$ gives $\\dfrac{2-\\sqrt3}{4}$, whose root is $\\dfrac{\\sqrt{2-\\sqrt3}}{2}\\approx0.259$." },
        { text: "$\\dfrac{\\sqrt{2+\\sqrt3}}{2}$", explain: "That is $\\cos 15^\\circ$. You used $1+\\cos 30^\\circ$. Sine needs $1-\\cos 30^\\circ$." },
        { text: "$\\dfrac{1-\\sqrt3}{2}$", explain: "This skips the root and is negative, yet $\\sin 15^\\circ>0$ since $1-\\sqrt3<0$." },
        { text: "$\\dfrac{\\sqrt3}{4}$", explain: "Arithmetic slip. Combine $1-\\dfrac{\\sqrt3}{2}$ into one fraction before taking the root." },
      ],
    },
    {
      id: "c-quadrant-halve",
      prompt: "If $90^\\circ < \\theta < 180^\\circ$ (so $\\theta$ is in quadrant II), which quadrant holds $\\dfrac{\\theta}{2}$?",
      choices: [
        { text: "quadrant II", explain: "Halving shrinks the angle. Dividing $90^\\circ$ to $180^\\circ$ by $2$ lands in $45^\\circ$ to $90^\\circ$, not quadrant II." },
        { text: "quadrant I", correct: true, explain: "$\\dfrac{\\theta}{2}$ runs from $45^\\circ$ to $90^\\circ$, which is quadrant I, where sine and cosine are both positive." },
        { text: "quadrant III", explain: "Quadrant III is $180^\\circ$ to $270^\\circ$. Halving makes the angle smaller, not larger." },
        { text: "quadrant IV", explain: "Halving cannot push the angle past $90^\\circ$ here. $\\dfrac{\\theta}{2}$ stays in quadrant I." },
      ],
    },
    {
      id: "c-sign-pick",
      prompt: "Suppose $\\dfrac{\\theta}{2}$ lands in quadrant II. What sign does $\\cos\\dfrac{\\theta}{2}$ take?",
      choices: [
        { text: "positive", explain: "In quadrant II cosine is negative. Only sine stays positive there." },
        { text: "it depends on $\\theta$", explain: "Once you know the half angle's quadrant the sign is fixed. Quadrant II makes cosine negative." },
        { text: "negative", correct: true, explain: "Cosine is negative throughout quadrant II, so $\\cos\\dfrac{\\theta}{2}$ takes the minus root." },
        { text: "zero", explain: "Cosine is zero only on an axis. Strictly inside quadrant II it is negative." },
      ],
    },
    {
      id: "c-cos-half-val",
      prompt: "Given $\\cos\\theta=\\dfrac{3}{5}$ with $\\theta$ in quadrant I, find $\\cos\\dfrac{\\theta}{2}$.",
      choices: [
        { text: "$\\dfrac{\\sqrt5}{5}$", explain: "That is $\\sin\\dfrac{\\theta}{2}$. Cosine uses $1+\\cos\\theta=\\dfrac{8}{5}$, giving $\\sqrt{\\dfrac{4}{5}}$, not $\\sqrt{\\dfrac{1}{5}}$." },
        { text: "$-\\dfrac{2\\sqrt5}{5}$", explain: "Right size, wrong sign. Here $\\dfrac{\\theta}{2}$ is in quadrant I, so cosine is positive." },
        { text: "$\\dfrac{3}{5}$", explain: "That is $\\cos\\theta$, not $\\cos\\dfrac{\\theta}{2}$. Apply the half-angle formula first." },
        { text: "$\\dfrac{2\\sqrt5}{5}$", correct: true, explain: "$\\cos\\dfrac{\\theta}{2}=\\sqrt{\\dfrac{1+3/5}{2}}=\\sqrt{\\dfrac{4}{5}}=\\dfrac{2\\sqrt5}{5}$, positive since $\\dfrac{\\theta}{2}$ is in quadrant I." },
      ],
    },
    {
      id: "c-sin-half-val",
      prompt: "Given $\\cos\\theta=\\dfrac{3}{5}$ with $\\theta$ in quadrant I, find $\\sin\\dfrac{\\theta}{2}$.",
      choices: [
        { text: "$\\dfrac{\\sqrt5}{5}$", correct: true, explain: "$\\sin\\dfrac{\\theta}{2}=\\sqrt{\\dfrac{1-3/5}{2}}=\\sqrt{\\dfrac{1}{5}}=\\dfrac{\\sqrt5}{5}$, positive in quadrant I." },
        { text: "$\\dfrac{2\\sqrt5}{5}$", explain: "That is $\\cos\\dfrac{\\theta}{2}$. Sine uses $1-\\cos\\theta=\\dfrac{2}{5}$, giving $\\sqrt{\\dfrac{1}{5}}$." },
        { text: "$-\\dfrac{\\sqrt5}{5}$", explain: "Wrong sign. In quadrant I sine is positive." },
        { text: "$\\dfrac{1}{5}$", explain: "The square root was skipped. $\\sin^2\\dfrac{\\theta}{2}=\\dfrac{1}{5}$, so $\\sin\\dfrac{\\theta}{2}=\\dfrac{\\sqrt5}{5}$." },
      ],
    },
    {
      id: "c-tan15",
      prompt: "Compute $\\tan 15^\\circ$ using $\\tan\\dfrac{\\theta}{2}=\\dfrac{1-\\cos\\theta}{\\sin\\theta}$ with $\\theta=30^\\circ$.",
      choices: [
        { text: "$2+\\sqrt3$", explain: "That is $\\tan 75^\\circ$. The numerator $1-\\cos 30^\\circ$ uses a minus, which leads to $2-\\sqrt3$." },
        { text: "$2-\\sqrt3$", correct: true, explain: "$\\dfrac{1-\\frac{\\sqrt3}{2}}{\\frac12}=2\\left(1-\\dfrac{\\sqrt3}{2}\\right)=2-\\sqrt3\\approx0.268$." },
        { text: "$\\dfrac{\\sqrt3}{2}$", explain: "That is $\\cos 30^\\circ$. Finish dividing by $\\sin 30^\\circ=\\dfrac12$." },
        { text: "$\\sqrt3-2$", explain: "Sign flipped. Since $\\sqrt3\\approx1.73<2$, the value $2-\\sqrt3$ is positive, matching $\\tan 15^\\circ>0$." },
      ],
    },
  ],
  summit: [
    {
      id: "s-cos225",
      prompt: "Find the exact value of $\\cos 22.5^\\circ$.",
      choices: [
        { text: "$\\dfrac{\\sqrt{2-\\sqrt2}}{2}$", explain: "That is $\\sin 22.5^\\circ$. Cosine uses $1+\\cos 45^\\circ$, so the inner sign is a plus." },
        { text: "$\\dfrac{\\sqrt2}{2}$", explain: "That is $\\cos 45^\\circ$. You must halve the angle with the formula, not stop at $45^\\circ$." },
        { text: "$\\dfrac{\\sqrt{2+\\sqrt2}}{2}$", correct: true, explain: "$\\cos 22.5^\\circ=\\sqrt{\\dfrac{1+\\frac{\\sqrt2}{2}}{2}}=\\sqrt{\\dfrac{2+\\sqrt2}{4}}=\\dfrac{\\sqrt{2+\\sqrt2}}{2}\\approx0.924$, positive in quadrant I." },
        { text: "$\\dfrac{2+\\sqrt2}{4}$", explain: "The outer square root was dropped. Take the root of $\\dfrac{2+\\sqrt2}{4}$." },
      ],
    },
    {
      id: "s-tan225",
      prompt: "$\\tan 22.5^\\circ=\\dfrac{1-\\cos 45^\\circ}{\\sin 45^\\circ}$ simplifies to:",
      choices: [
        { text: "$\\sqrt2-1$", correct: true, explain: "$\\dfrac{1-\\frac{\\sqrt2}{2}}{\\frac{\\sqrt2}{2}}=\\dfrac{2-\\sqrt2}{\\sqrt2}=\\sqrt2-1\\approx0.414$." },
        { text: "$\\sqrt2+1$", explain: "That is $\\tan 67.5^\\circ$. Watch the numerator: $1-\\cos 45^\\circ$ carries a minus." },
        { text: "$1-\\sqrt2$", explain: "This is negative, but $22.5^\\circ$ is in quadrant I where tangent is positive. The value is $\\sqrt2-1$." },
        { text: "$\\dfrac{\\sqrt2}{2}$", explain: "That is $\\sin 45^\\circ$. Finish the division rather than stopping partway." },
      ],
    },
    {
      id: "s-sin75",
      prompt: "Find $\\sin 75^\\circ$ using $\\theta=150^\\circ$ and $\\cos 150^\\circ=-\\dfrac{\\sqrt3}{2}$.",
      choices: [
        { text: "$\\dfrac{\\sqrt{2-\\sqrt3}}{2}$", explain: "That is $\\sin 15^\\circ$. Since $\\cos 150^\\circ=-\\dfrac{\\sqrt3}{2}$, the numerator $1-\\cos 150^\\circ=1+\\dfrac{\\sqrt3}{2}$ carries a plus." },
        { text: "$\\dfrac{\\sqrt{2+\\sqrt3}}{2}$", correct: true, explain: "$1-\\left(-\\dfrac{\\sqrt3}{2}\\right)=\\dfrac{2+\\sqrt3}{2}$. Dividing by $2$ and rooting gives $\\dfrac{\\sqrt{2+\\sqrt3}}{2}\\approx0.966$, positive in quadrant I." },
        { text: "$-\\dfrac{\\sqrt{2+\\sqrt3}}{2}$", explain: "Wrong sign. $75^\\circ$ sits in quadrant I, where sine is positive." },
        { text: "$\\dfrac{\\sqrt3}{2}$", explain: "This ignores the nested radical. $\\sin 75^\\circ\\approx0.966$, not $\\dfrac{\\sqrt3}{2}\\approx0.866$." },
      ],
    },
    {
      id: "s-cos75",
      prompt: "Find $\\cos 75^\\circ$ using $\\theta=150^\\circ$ and $\\cos 150^\\circ=-\\dfrac{\\sqrt3}{2}$.",
      choices: [
        { text: "$\\dfrac{\\sqrt{2+\\sqrt3}}{2}$", explain: "That is $\\sin 75^\\circ$. Cosine uses $1+\\cos 150^\\circ=1-\\dfrac{\\sqrt3}{2}$, so the inner value shrinks." },
        { text: "$\\dfrac{\\sqrt2-\\sqrt3}{2}$", explain: "The radical must cover the whole $2-\\sqrt3$: write $\\dfrac{\\sqrt{2-\\sqrt3}}{2}$, not $\\dfrac{\\sqrt2-\\sqrt3}{2}$." },
        { text: "$-\\dfrac{\\sqrt{2-\\sqrt3}}{2}$", explain: "Wrong sign. $75^\\circ$ is in quadrant I, where cosine is positive." },
        { text: "$\\dfrac{\\sqrt{2-\\sqrt3}}{2}$", correct: true, explain: "$1+\\left(-\\dfrac{\\sqrt3}{2}\\right)=\\dfrac{2-\\sqrt3}{2}$. Dividing by $2$ and rooting gives $\\dfrac{\\sqrt{2-\\sqrt3}}{2}\\approx0.259$." },
      ],
    },
    {
      id: "s-half-q2-sin",
      prompt: "Given $\\cos\\theta=-\\dfrac{7}{25}$ with $\\theta$ in quadrant II, find $\\sin\\dfrac{\\theta}{2}$.",
      choices: [
        { text: "$\\dfrac{4}{5}$", correct: true, explain: "$\\sin\\dfrac{\\theta}{2}=\\sqrt{\\dfrac{1+7/25}{2}}=\\sqrt{\\dfrac{16}{25}}=\\dfrac{4}{5}$, positive because $\\dfrac{\\theta}{2}$ is in quadrant I." },
        { text: "$\\dfrac{3}{5}$", explain: "That is $\\cos\\dfrac{\\theta}{2}$. Sine uses $1-\\cos\\theta=\\dfrac{32}{25}$, giving $\\sqrt{\\dfrac{16}{25}}$." },
        { text: "$-\\dfrac{4}{5}$", explain: "Sign trap. Since $90^\\circ<\\theta<180^\\circ$, the half angle is in quadrant I, so sine is positive." },
        { text: "$\\dfrac{16}{25}$", explain: "The square root was skipped. $\\sin^2\\dfrac{\\theta}{2}=\\dfrac{16}{25}$, so $\\sin\\dfrac{\\theta}{2}=\\dfrac{4}{5}$." },
      ],
    },
    {
      id: "s-half-q2-cos",
      prompt: "Given $\\cos\\theta=-\\dfrac{7}{25}$ with $\\theta$ in quadrant II, find $\\cos\\dfrac{\\theta}{2}$.",
      choices: [
        { text: "$-\\dfrac{3}{5}$", explain: "Sign trap. With $90^\\circ<\\theta<180^\\circ$, the half angle is in quadrant I, so cosine is positive." },
        { text: "$\\dfrac{3}{5}$", correct: true, explain: "$\\cos\\dfrac{\\theta}{2}=\\sqrt{\\dfrac{1-7/25}{2}}=\\sqrt{\\dfrac{9}{25}}=\\dfrac{3}{5}$, positive in quadrant I." },
        { text: "$\\dfrac{4}{5}$", explain: "That is $\\sin\\dfrac{\\theta}{2}$. Cosine uses $1+\\cos\\theta=\\dfrac{18}{25}$, giving $\\sqrt{\\dfrac{9}{25}}$." },
        { text: "$\\dfrac{7}{25}$", explain: "That is $|\\cos\\theta|$, not $\\cos\\dfrac{\\theta}{2}$. Apply the half-angle formula." },
      ],
    },
    {
      id: "s-half-q4-cos",
      prompt: "Given $\\cos\\theta=\\dfrac{3}{5}$ with $270^\\circ<\\theta<360^\\circ$ (quadrant IV), find $\\cos\\dfrac{\\theta}{2}$.",
      choices: [
        { text: "$\\dfrac{2\\sqrt5}{5}$", explain: "Sign trap. $\\theta$ is in quadrant IV, but $\\dfrac{\\theta}{2}$ lands in $135^\\circ$ to $180^\\circ$ (quadrant II), where cosine is negative." },
        { text: "$-\\dfrac{\\sqrt5}{5}$", explain: "Wrong numerator. Cosine uses $1+\\cos\\theta=\\dfrac{8}{5}$, giving $\\sqrt{\\dfrac{4}{5}}$, not $\\sqrt{\\dfrac{1}{5}}$." },
        { text: "$-\\dfrac{2\\sqrt5}{5}$", correct: true, explain: "$\\dfrac{\\theta}{2}$ is in quadrant II, so $\\cos\\dfrac{\\theta}{2}=-\\sqrt{\\dfrac{1+3/5}{2}}=-\\sqrt{\\dfrac{4}{5}}=-\\dfrac{2\\sqrt5}{5}$." },
        { text: "$-\\dfrac{4}{5}$", explain: "The root was skipped: $\\sqrt{\\dfrac{4}{5}}=\\dfrac{2\\sqrt5}{5}$, not $\\dfrac{4}{5}$." },
      ],
    },
    {
      id: "s-half-q4-sin",
      prompt: "Given $\\cos\\theta=\\dfrac{3}{5}$ with $270^\\circ<\\theta<360^\\circ$ (quadrant IV), find $\\sin\\dfrac{\\theta}{2}$.",
      choices: [
        { text: "$-\\dfrac{\\sqrt5}{5}$", explain: "Sign trap. Although $\\theta$ is in quadrant IV, $\\dfrac{\\theta}{2}$ is in quadrant II, where sine is positive." },
        { text: "$\\dfrac{2\\sqrt5}{5}$", explain: "That is $\\left|\\cos\\dfrac{\\theta}{2}\\right|$. Sine uses $1-\\cos\\theta=\\dfrac{2}{5}$, giving $\\sqrt{\\dfrac{1}{5}}$." },
        { text: "$-\\dfrac{2\\sqrt5}{5}$", explain: "This has both the wrong numerator and the wrong sign. $\\sin\\dfrac{\\theta}{2}$ is positive here." },
        { text: "$\\dfrac{\\sqrt5}{5}$", correct: true, explain: "$\\dfrac{\\theta}{2}$ is in quadrant II, so $\\sin\\dfrac{\\theta}{2}=+\\sqrt{\\dfrac{1-3/5}{2}}=\\sqrt{\\dfrac{1}{5}}=\\dfrac{\\sqrt5}{5}$." },
      ],
    },
    {
      id: "s-half-q3-cos",
      prompt: "Given $\\cos\\theta=-\\dfrac{3}{5}$ with $180^\\circ<\\theta<270^\\circ$ (quadrant III), find $\\cos\\dfrac{\\theta}{2}$.",
      choices: [
        { text: "$-\\dfrac{\\sqrt5}{5}$", correct: true, explain: "$\\dfrac{\\theta}{2}$ falls in $90^\\circ$ to $135^\\circ$ (quadrant II), so $\\cos\\dfrac{\\theta}{2}=-\\sqrt{\\dfrac{1-3/5}{2}}=-\\sqrt{\\dfrac{1}{5}}=-\\dfrac{\\sqrt5}{5}$." },
        { text: "$\\dfrac{\\sqrt5}{5}$", explain: "Sign trap. In quadrant II cosine is negative, so keep the minus." },
        { text: "$-\\dfrac{2\\sqrt5}{5}$", explain: "Wrong numerator. Cosine uses $1+\\cos\\theta=\\dfrac{2}{5}$, giving $\\sqrt{\\dfrac{1}{5}}$, not $\\sqrt{\\dfrac{4}{5}}$." },
        { text: "$-\\dfrac{3}{5}$", explain: "That is $\\cos\\theta$, not $\\cos\\dfrac{\\theta}{2}$. Apply the half-angle formula first." },
      ],
    },
    {
      id: "s-tan-q4",
      prompt: "Given $\\cos\\theta=\\dfrac{3}{5}$ and $\\sin\\theta=-\\dfrac{4}{5}$, use $\\dfrac{1-\\cos\\theta}{\\sin\\theta}$ to find $\\tan\\dfrac{\\theta}{2}$.",
      choices: [
        { text: "$\\dfrac{1}{2}$", explain: "Sign dropped. The denominator $\\sin\\theta=-\\dfrac{4}{5}$ is negative, so the quotient is negative." },
        { text: "$-\\dfrac{1}{2}$", correct: true, explain: "$\\dfrac{1-3/5}{-4/5}=\\dfrac{2/5}{-4/5}=-\\dfrac{1}{2}$. The quotient form carries the sign for you." },
        { text: "$-2$", explain: "The fraction is flipped. It is $\\dfrac{1-\\cos\\theta}{\\sin\\theta}$, not $\\dfrac{\\sin\\theta}{1-\\cos\\theta}$." },
        { text: "$-\\dfrac{4}{5}$", explain: "That is $\\sin\\theta$, not $\\tan\\dfrac{\\theta}{2}$. Divide $1-\\cos\\theta$ by $\\sin\\theta$." },
      ],
    },
    {
      id: "s-tan-q2",
      prompt: "Given $\\cos\\theta=-\\dfrac{7}{25}$ and $\\sin\\theta=\\dfrac{24}{25}$, find $\\tan\\dfrac{\\theta}{2}$ using $\\dfrac{1-\\cos\\theta}{\\sin\\theta}$.",
      choices: [
        { text: "$\\dfrac{3}{4}$", explain: "The fraction is upside down. $\\dfrac{1-\\cos\\theta}{\\sin\\theta}=\\dfrac{32/25}{24/25}=\\dfrac{4}{3}$." },
        { text: "$-\\dfrac{4}{3}$", explain: "Sign trap. Both $1-\\cos\\theta$ and $\\sin\\theta$ are positive here, so the quotient is positive." },
        { text: "$\\dfrac{4}{3}$", correct: true, explain: "$1-\\left(-\\dfrac{7}{25}\\right)=\\dfrac{32}{25}$, and $\\dfrac{32/25}{24/25}=\\dfrac{4}{3}$, positive since $\\dfrac{\\theta}{2}$ is in quadrant I." },
        { text: "$\\dfrac{24}{25}$", explain: "That is $\\sin\\theta$. Finish by dividing $1-\\cos\\theta$ by it." },
      ],
    },
    {
      id: "s-sign-q3-sin",
      prompt: "For $180^\\circ<\\theta<270^\\circ$ (quadrant III), what is the sign of $\\sin\\dfrac{\\theta}{2}$?",
      choices: [
        { text: "negative, because $\\theta$ is in quadrant III where sine is negative", explain: "This reads the sign from $\\theta$ instead of $\\dfrac{\\theta}{2}$. The half angle sets the sign." },
        { text: "it can be either sign", explain: "The half angle's quadrant is fixed here, so the sign is determined, not ambiguous." },
        { text: "zero", explain: "Sine is zero only on an axis. Strictly inside quadrant II it is positive." },
        { text: "positive, because $\\dfrac{\\theta}{2}$ is in quadrant II where sine is positive", correct: true, explain: "Halving $180^\\circ$ to $270^\\circ$ gives $90^\\circ$ to $135^\\circ$ (quadrant II), where sine is positive." },
      ],
    },
    {
      id: "s-tan675",
      prompt: "Find $\\tan 67.5^\\circ$ using $\\theta=135^\\circ$, $\\cos 135^\\circ=-\\dfrac{\\sqrt2}{2}$, and $\\dfrac{1-\\cos\\theta}{\\sin\\theta}$.",
      choices: [
        { text: "$\\sqrt2+1$", correct: true, explain: "$\\dfrac{1+\\frac{\\sqrt2}{2}}{\\frac{\\sqrt2}{2}}=\\dfrac{2+\\sqrt2}{\\sqrt2}=\\sqrt2+1\\approx2.414$." },
        { text: "$\\sqrt2-1$", explain: "That is $\\tan 22.5^\\circ$. Here $\\cos 135^\\circ$ is negative, so $1-\\cos 135^\\circ=1+\\dfrac{\\sqrt2}{2}$." },
        { text: "$1-\\sqrt2$", explain: "This is negative, but $67.5^\\circ$ is in quadrant I where tangent is positive." },
        { text: "$\\dfrac{\\sqrt2}{2}$", explain: "That is $\\sin 135^\\circ$. Finish dividing to reach $\\sqrt2+1$." },
      ],
    },
    {
      id: "s-tan75",
      prompt: "Find $\\tan 75^\\circ$ using $\\theta=150^\\circ$, $\\cos 150^\\circ=-\\dfrac{\\sqrt3}{2}$, and $\\dfrac{1-\\cos\\theta}{\\sin\\theta}$.",
      choices: [
        { text: "$2-\\sqrt3$", explain: "That is $\\tan 15^\\circ$. With $\\cos 150^\\circ=-\\dfrac{\\sqrt3}{2}$, the numerator becomes $1+\\dfrac{\\sqrt3}{2}$, a plus." },
        { text: "$2+\\sqrt3$", correct: true, explain: "$\\dfrac{1+\\frac{\\sqrt3}{2}}{\\frac12}=2\\left(1+\\dfrac{\\sqrt3}{2}\\right)=2+\\sqrt3\\approx3.732$." },
        { text: "$\\sqrt3-2$", explain: "Sign flipped. Since $2+\\sqrt3>0$ and $75^\\circ$ is in quadrant I, tangent is positive." },
        { text: "$\\dfrac{\\sqrt3}{2}$", explain: "That matches $|\\cos 150^\\circ|$. Divide the full numerator by $\\sin 150^\\circ=\\dfrac12$." },
      ],
    },
    {
      id: "s-sign-capstone",
      prompt: "For $\\cos\\theta=\\dfrac{1}{2}$ with $270^\\circ<\\theta<360^\\circ$, a student writes $\\cos\\dfrac{\\theta}{2}=+\\dfrac{\\sqrt3}{2}$ because $\\theta$ is in quadrant IV where cosine is positive. What is the correct value?",
      choices: [
        { text: "$+\\dfrac{\\sqrt3}{2}$, the work is correct", explain: "Not correct. The sign must come from the half angle's quadrant, not $\\theta$'s." },
        { text: "$+\\dfrac{1}{2}$, the magnitude was wrong", explain: "The magnitude $\\dfrac{\\sqrt3}{2}$ is right. Only the sign is wrong." },
        { text: "$-\\dfrac{\\sqrt3}{2}$, the sign comes from $\\dfrac{\\theta}{2}$ in quadrant II", correct: true, explain: "$\\dfrac{\\theta}{2}$ lies in $135^\\circ$ to $180^\\circ$ (quadrant II), where cosine is negative: $\\cos\\dfrac{\\theta}{2}=-\\sqrt{\\dfrac{1+1/2}{2}}=-\\dfrac{\\sqrt3}{2}$." },
        { text: "$+\\dfrac{1}{2}$, the formula should use $1-\\cos\\theta$", explain: "Cosine correctly uses $1+\\cos\\theta$. The mistake is the sign, not the numerator." },
      ],
    },
  ],
};
