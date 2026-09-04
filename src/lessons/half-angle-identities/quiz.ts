import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Half-angle identities".
 * Grounded in the lesson: the sine and cosine half-angle formulas are the
 * double-angle cosine formulas solved backward, sine keeps $1-\cos\theta$ and
 * cosine keeps $1+\cos\theta$, the $\pm$ is chosen from the quadrant of the
 * half angle $\dfrac{\theta}{2}$ (never $\theta$), and exact values come from
 * halving a known angle. Distractors are the classic traps: sign from the wrong
 * quadrant, swapped numerators, a dropped root or division by two, and radical slips.
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
        { text: "$\\theta$", explain: "This is the common trap: the formula outputs a function of the **half** angle, so $\\theta$'s quadrant is the wrong place to look." },
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
        { text: "both sine and cosine", explain: "Only one does: sine gets the minus while cosine gets the plus." },
        { text: "sine", correct: true, explain: "$\\sin\\dfrac{\\theta}{2}=\\pm\\sqrt{\\dfrac{1-\\cos\\theta}{2}}$. The minus traces back to $\\cos 2\\alpha = 1-2\\sin^2\\alpha$." },
        { text: "neither", explain: "Sine does: $\\sin\\dfrac{\\theta}{2}$ has the $1-\\cos\\theta$ numerator." },
      ],
    },
    {
      id: "c-which-for-sin",
      prompt: "You know $\\cos\\theta$ and want $\\sin\\dfrac{\\theta}{2}$. Which formula do you use?",
      choices: [
        { text: "$\\pm\\sqrt{\\dfrac{1-\\cos\\theta}{2}}$", correct: true, explain: "Sine keeps $1-\\cos\\theta$ under the root. Then pick the $\\pm$ from the quadrant of $\\dfrac{\\theta}{2}$." },
        { text: "$\\pm\\sqrt{\\dfrac{1+\\cos\\theta}{2}}$", explain: "That is the cosine formula. Sine uses the minus: $1-\\cos\\theta$." },
        { text: "$2\\sin\\theta\\cos\\theta$", explain: "That is $\\sin 2\\theta$, a double-angle formula, not a half-angle one." },
        { text: "$\\dfrac{1-\\cos\\theta}{2}$", explain: "The square root is still needed. This is $\\sin^2\\dfrac{\\theta}{2}$, not $\\sin\\dfrac{\\theta}{2}$." },
      ],
    },
    {
      id: "c-which-for-cos",
      prompt: "You know $\\cos\\theta$ and want $\\cos\\dfrac{\\theta}{2}$. Which formula do you use?",
      choices: [
        { text: "$\\pm\\sqrt{\\dfrac{1-\\cos\\theta}{2}}$", explain: "That numerator belongs to sine. Cosine keeps the plus: $1+\\cos\\theta$." },
        { text: "$\\pm\\sqrt{\\dfrac{1+\\cos\\theta}{2}}$", correct: true, explain: "Cosine keeps $1+\\cos\\theta$ under the root. Then pick the $\\pm$ from the quadrant of $\\dfrac{\\theta}{2}$." },
        { text: "$2\\cos^2\\theta - 1$", explain: "That is $\\cos 2\\theta$, a double-angle formula, not a half-angle one." },
        { text: "$\\dfrac{1+\\cos\\theta}{2}$", explain: "The square root is still needed. This is $\\cos^2\\dfrac{\\theta}{2}$, not $\\cos\\dfrac{\\theta}{2}$." },
      ],
    },
    {
      id: "c-why-root",
      prompt: "After isolating $\\sin^2\\dfrac{\\theta}{2} = \\dfrac{1-\\cos\\theta}{2}$, why is a square root the next step?",
      choices: [
        { text: "Because you solved for the square of the half-angle sine, so a root recovers the sine itself", correct: true, explain: "The double-angle step isolates $\\sin^2$. Taking $\\pm$ the square root gives $\\sin\\dfrac{\\theta}{2}$." },
        { text: "Because every trig identity needs a radical", explain: "The root is there only because the isolated term is already a square." },
        { text: "Because the half angle is smaller, so you shrink the value", explain: "Halving the angle is not the same as taking a square root of the output. The root undoes the square." },
        { text: "You should divide by $2$ again instead", explain: "The $2$ is already in the denominator. What remains is to undo the square." },
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
        { text: "$\\dfrac{\\sqrt3}{4}$", explain: "This is an arithmetic slip: combine $1-\\dfrac{\\sqrt3}{2}$ into one fraction before taking the root." },
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
        { text: "$-\\dfrac{2\\sqrt5}{5}$", explain: "The magnitude is right but the sign is wrong: here $\\dfrac{\\theta}{2}$ is in quadrant I, so cosine is positive." },
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
        { text: "$-\\dfrac{\\sqrt5}{5}$", explain: "The sign is wrong: in quadrant I sine is positive." },
        { text: "$\\dfrac{1}{5}$", explain: "The square root was skipped. $\\sin^2\\dfrac{\\theta}{2}=\\dfrac{1}{5}$, so $\\sin\\dfrac{\\theta}{2}=\\dfrac{\\sqrt5}{5}$." },
      ],
    },
    {
      id: "c-sin225",
      prompt: "Find $\\sin 22.5^\\circ$ using $\\cos 45^\\circ=\\dfrac{\\sqrt2}{2}$.",
      choices: [
        { text: "$\\dfrac{\\sqrt{2+\\sqrt2}}{2}$", explain: "That is $\\cos 22.5^\\circ$. Sine uses $1-\\cos 45^\\circ$, so the inner sign is a minus." },
        { text: "$\\dfrac{\\sqrt{2-\\sqrt2}}{2}$", correct: true, explain: "$\\sin 22.5^\\circ=\\sqrt{\\dfrac{1-\\frac{\\sqrt2}{2}}{2}}=\\dfrac{\\sqrt{2-\\sqrt2}}{2}\\approx0.383$, positive in quadrant I." },
        { text: "$\\dfrac{\\sqrt2}{2}$", explain: "That is $\\sin 45^\\circ$. You must still apply the half-angle formula." },
        { text: "$\\dfrac{2-\\sqrt2}{4}$", explain: "The outer square root was dropped. Take the root of $\\dfrac{2-\\sqrt2}{4}$." },
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
      id: "s-sin225",
      prompt: "Find the exact value of $\\sin 22.5^\\circ$.",
      choices: [
        { text: "$\\dfrac{\\sqrt{2+\\sqrt2}}{2}$", explain: "That is $\\cos 22.5^\\circ$. Sine uses $1-\\cos 45^\\circ$, so the inner sign is a minus." },
        { text: "$\\dfrac{\\sqrt2}{2}$", explain: "That is $\\sin 45^\\circ$. You must still apply the half-angle formula." },
        { text: "$\\dfrac{\\sqrt{2-\\sqrt2}}{2}$", correct: true, explain: "$\\sin 22.5^\\circ=\\sqrt{\\dfrac{1-\\frac{\\sqrt2}{2}}{2}}=\\dfrac{\\sqrt{2-\\sqrt2}}{2}\\approx0.383$, positive in quadrant I." },
        { text: "$\\dfrac{2-\\sqrt2}{4}$", explain: "The outer square root was dropped. Take the root of $\\dfrac{2-\\sqrt2}{4}$." },
      ],
    },
    {
      id: "s-sin75",
      prompt: "Find $\\sin 75^\\circ$ using $\\theta=150^\\circ$ and $\\cos 150^\\circ=-\\dfrac{\\sqrt3}{2}$.",
      choices: [
        { text: "$\\dfrac{\\sqrt{2-\\sqrt3}}{2}$", explain: "That is $\\sin 15^\\circ$. Since $\\cos 150^\\circ=-\\dfrac{\\sqrt3}{2}$, the numerator $1-\\cos 150^\\circ=1+\\dfrac{\\sqrt3}{2}$ has a plus." },
        { text: "$\\dfrac{\\sqrt{2+\\sqrt3}}{2}$", correct: true, explain: "$1-\\left(-\\dfrac{\\sqrt3}{2}\\right)=\\dfrac{2+\\sqrt3}{2}$. Dividing by $2$ and rooting gives $\\dfrac{\\sqrt{2+\\sqrt3}}{2}\\approx0.966$, positive in quadrant I." },
        { text: "$-\\dfrac{\\sqrt{2+\\sqrt3}}{2}$", explain: "Wrong sign. $75^\\circ$ is in quadrant I, where sine is positive." },
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
        { text: "$-\\dfrac{4}{5}$", explain: "This is a sign trap: since $90^\\circ<\\theta<180^\\circ$, the half angle is in quadrant I, so sine is positive." },
        { text: "$\\dfrac{16}{25}$", explain: "The square root was skipped. $\\sin^2\\dfrac{\\theta}{2}=\\dfrac{16}{25}$, so $\\sin\\dfrac{\\theta}{2}=\\dfrac{4}{5}$." },
      ],
    },
    {
      id: "s-half-q2-cos",
      prompt: "Given $\\cos\\theta=-\\dfrac{7}{25}$ with $\\theta$ in quadrant II, find $\\cos\\dfrac{\\theta}{2}$.",
      choices: [
        { text: "$-\\dfrac{3}{5}$", explain: "This is a sign trap: with $90^\\circ<\\theta<180^\\circ$, the half angle is in quadrant I, so cosine is positive." },
        { text: "$\\dfrac{3}{5}$", correct: true, explain: "$\\cos\\dfrac{\\theta}{2}=\\sqrt{\\dfrac{1-7/25}{2}}=\\sqrt{\\dfrac{9}{25}}=\\dfrac{3}{5}$, positive in quadrant I." },
        { text: "$\\dfrac{4}{5}$", explain: "That is $\\sin\\dfrac{\\theta}{2}$. Cosine uses $1+\\cos\\theta=\\dfrac{18}{25}$, giving $\\sqrt{\\dfrac{9}{25}}$." },
        { text: "$\\dfrac{7}{25}$", explain: "That is $|\\cos\\theta|$, not $\\cos\\dfrac{\\theta}{2}$. Apply the half-angle formula." },
      ],
    },
    {
      id: "s-half-q4-cos",
      prompt: "Given $\\cos\\theta=\\dfrac{3}{5}$ with $270^\\circ<\\theta<360^\\circ$ (quadrant IV), find $\\cos\\dfrac{\\theta}{2}$.",
      choices: [
        { text: "$\\dfrac{2\\sqrt5}{5}$", explain: "This is a sign trap: $\\theta$ is in quadrant IV, but $\\dfrac{\\theta}{2}$ lands in $135^\\circ$ to $180^\\circ$ (quadrant II), where cosine is negative." },
        { text: "$-\\dfrac{\\sqrt5}{5}$", explain: "Wrong numerator. Cosine uses $1+\\cos\\theta=\\dfrac{8}{5}$, giving $\\sqrt{\\dfrac{4}{5}}$, not $\\sqrt{\\dfrac{1}{5}}$." },
        { text: "$-\\dfrac{2\\sqrt5}{5}$", correct: true, explain: "$\\dfrac{\\theta}{2}$ is in quadrant II, so $\\cos\\dfrac{\\theta}{2}=-\\sqrt{\\dfrac{1+3/5}{2}}=-\\sqrt{\\dfrac{4}{5}}=-\\dfrac{2\\sqrt5}{5}$." },
        { text: "$-\\dfrac{4}{5}$", explain: "The root was skipped: $\\sqrt{\\dfrac{4}{5}}=\\dfrac{2\\sqrt5}{5}$, not $\\dfrac{4}{5}$." },
      ],
    },
    {
      id: "s-half-q4-sin",
      prompt: "Given $\\cos\\theta=\\dfrac{3}{5}$ with $270^\\circ<\\theta<360^\\circ$ (quadrant IV), find $\\sin\\dfrac{\\theta}{2}$.",
      choices: [
        { text: "$-\\dfrac{\\sqrt5}{5}$", explain: "This is a sign trap: although $\\theta$ is in quadrant IV, $\\dfrac{\\theta}{2}$ is in quadrant II, where sine is positive." },
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
        { text: "$\\dfrac{\\sqrt5}{5}$", explain: "This is a sign trap: in quadrant II cosine is negative, so keep the minus." },
        { text: "$-\\dfrac{2\\sqrt5}{5}$", explain: "Wrong numerator. Cosine uses $1+\\cos\\theta=\\dfrac{2}{5}$, giving $\\sqrt{\\dfrac{1}{5}}$, not $\\sqrt{\\dfrac{4}{5}}$." },
        { text: "$-\\dfrac{3}{5}$", explain: "That is $\\cos\\theta$, not $\\cos\\dfrac{\\theta}{2}$. Apply the half-angle formula first." },
      ],
    },
    {
      id: "s-half-quad-check",
      prompt: "Given $\\cos\\dfrac{\\theta}{2}=-\\dfrac{2\\sqrt5}{5}$ and $\\sin\\dfrac{\\theta}{2}=\\dfrac{\\sqrt5}{5}$, which quadrant holds $\\dfrac{\\theta}{2}$?",
      choices: [
        { text: "quadrant I", explain: "Quadrant I needs both positive. Here cosine is negative." },
        { text: "quadrant II", correct: true, explain: "Sine is positive and cosine is negative, which is the sign pair for quadrant II." },
        { text: "quadrant III", explain: "Quadrant III needs both negative. Here sine is positive." },
        { text: "quadrant IV", explain: "Quadrant IV needs sine negative and cosine positive. Both signs are the other way around." },
      ],
    },
    {
      id: "s-pythag-check",
      prompt: "A student finds $\\sin\\dfrac{\\theta}{2}=\\dfrac{4}{5}$ and $\\cos\\dfrac{\\theta}{2}=\\dfrac{3}{5}$. How can you check both values at once?",
      choices: [
        { text: "Add them: $\\dfrac{4}{5}+\\dfrac{3}{5}$ should equal $1$", explain: "Sine and cosine are not required to add to $1$. Their squares add to $1$." },
        { text: "Check $\\left(\\dfrac{4}{5}\\right)^2+\\left(\\dfrac{3}{5}\\right)^2=1$", correct: true, explain: "The Pythagorean identity $\\sin^2+\\cos^2=1$ must hold for the half-angle values too: $\\dfrac{16}{25}+\\dfrac{9}{25}=1$." },
        { text: "They must be equal", explain: "Sine and cosine of the same angle are equal only at $45^\\circ$ plus turns, not in general." },
        { text: "Their product must be $\\dfrac12$", explain: "There is no such product rule. The check is that the squares sum to $1$." },
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
      id: "s-cos675",
      prompt: "Find $\\cos 67.5^\\circ$ using $\\theta=135^\\circ$ and $\\cos 135^\\circ=-\\dfrac{\\sqrt2}{2}$.",
      choices: [
        { text: "$\\dfrac{\\sqrt{2-\\sqrt2}}{2}$", correct: true, explain: "$1+\\left(-\\dfrac{\\sqrt2}{2}\\right)=\\dfrac{2-\\sqrt2}{2}$. Dividing by $2$ and rooting gives $\\dfrac{\\sqrt{2-\\sqrt2}}{2}$, positive in quadrant I." },
        { text: "$\\dfrac{\\sqrt{2+\\sqrt2}}{2}$", explain: "That is $\\sin 67.5^\\circ$ (or $\\cos 22.5^\\circ$). Cosine uses $1+\\cos 135^\\circ$, which shrinks because $\\cos 135^\\circ$ is negative." },
        { text: "$-\\dfrac{\\sqrt{2-\\sqrt2}}{2}$", explain: "Wrong sign. $67.5^\\circ$ is in quadrant I, where cosine is positive." },
        { text: "$\\dfrac{\\sqrt2}{2}$", explain: "That is $\\cos 45^\\circ$. You must still apply the half-angle formula." },
      ],
    },
    {
      id: "s-swap-trap",
      prompt: "A student uses $1+\\cos\\theta$ under the root when computing $\\sin\\dfrac{\\theta}{2}$. What is the mistake?",
      choices: [
        { text: "Nothing. Sine and cosine share the same numerator", explain: "They do not. Sine keeps $1-\\cos\\theta$. Cosine keeps $1+\\cos\\theta$." },
        { text: "Sine uses $1-\\cos\\theta$, so this student built the cosine formula by accident", correct: true, explain: "The minus traces back to $\\cos 2\\alpha=1-2\\sin^2\\alpha$. Swapping the sign swaps sine and cosine." },
        { text: "They should have used $1-\\sin\\theta$ instead", explain: "Both half-angle formulas are written in terms of $\\cos\\theta$, not $\\sin\\theta$." },
        { text: "The $1$ should be a $2$", explain: "The $1$ is correct. The error is the plus in the numerator of the sine formula." },
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
