import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Solving basic trig equations".
 * Grounded in the lesson: find the reference angle from the value, then use the
 * sign to place solutions in the correct quadrants (ASTC). On $[0, 2\pi)$ sine and
 * cosine usually give two solutions, tangent gives two spaced $\pi$ apart, and a
 * few peak cases (sin = 1, cos = -1) give one. General solutions add $2\pi k$ for
 * sine and cosine (period $2\pi$) but only $\pi k$ for tangent (period $\pi$).
 * Distractors are the classic traps: one solution instead of two, the wrong
 * quadrant, confusing the reference angle with the answer, and the wrong period.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-why-two",
      prompt: "On $[0, 2\\pi)$, most equations like $\\sin x = \\dfrac{1}{2}$ have **two** solutions. Why?",
      choices: [
        { text: "The circle comes back around, so most heights are reached twice per turn", correct: true, explain: "Each value is usually hit once on the way up and once on the way down, giving two angles in a single turn." },
        { text: "Because sine is always positive", explain: "Sine is negative in two of the four quadrants, so it is not always positive; the two comes from reaching the same height twice." },
        { text: "Because every equation of this type has exactly two solutions", explain: "Not always: $\\sin x = 1$ has only one, and over all real numbers there are infinitely many. Two is the typical count on one turn, not a guarantee." },
      ],
    },
    {
      id: "c-refangle",
      prompt: "What is the **reference angle** for $\\sin x = \\dfrac{1}{2}$?",
      choices: [
        { text: "$\\dfrac{5\\pi}{6}$", explain: "That is a full solution in quadrant II, not the acute reference angle you start from." },
        { text: "$\\dfrac{\\pi}{6}$", correct: true, explain: "Ignore the sign and take the acute angle whose sine is $\\dfrac{1}{2}$: $\\sin^{-1}\\dfrac{1}{2} = \\dfrac{\\pi}{6}$." },
        { text: "$\\dfrac{\\pi}{3}$", explain: "$\\sin\\dfrac{\\pi}{3} = \\dfrac{\\sqrt{3}}{2}$, not $\\dfrac{1}{2}$; the reference angle here is $\\dfrac{\\pi}{6}$." },
      ],
    },
    {
      id: "c-sin-half",
      prompt: "Solve $\\sin x = \\dfrac{1}{2}$ on $[0, 2\\pi)$.",
      choices: [
        { text: "$\\dfrac{\\pi}{6}, \\ \\dfrac{5\\pi}{6}$", correct: true, explain: "Reference angle $\\dfrac{\\pi}{6}$; sine is positive in quadrants I and II, giving $\\dfrac{\\pi}{6}$ and $\\pi - \\dfrac{\\pi}{6} = \\dfrac{5\\pi}{6}$." },
        { text: "$\\dfrac{\\pi}{6}$ only", explain: "That is just the quadrant I answer; the quadrant II partner $\\dfrac{5\\pi}{6}$ is missing." },
        { text: "$\\dfrac{\\pi}{6}, \\ \\dfrac{7\\pi}{6}$", explain: "$\\dfrac{7\\pi}{6}$ is in quadrant III where sine is negative, so it solves $\\sin x = -\\dfrac{1}{2}$ instead." },
        { text: "$\\dfrac{\\pi}{3}, \\ \\dfrac{2\\pi}{3}$", explain: "Those come from $\\sin x = \\dfrac{\\sqrt{3}}{2}$; the reference angle for $\\dfrac{1}{2}$ is $\\dfrac{\\pi}{6}$, not $\\dfrac{\\pi}{3}$." },
      ],
    },
    {
      id: "c-sin-quadrants",
      prompt: "Sine is **positive** in which quadrants?",
      choices: [
        { text: "I and IV", explain: "That is where cosine is positive; sine is the height, positive above the $x$-axis." },
        { text: "I and II", correct: true, explain: "Sine is the height of the terminal point, and the height is positive in quadrants I and II." },
        { text: "III and IV", explain: "Those are where the terminal point sits below the $x$-axis, so sine is negative there." },
      ],
    },
    {
      id: "c-cos-neg-half",
      prompt: "Solve $\\cos x = -\\dfrac{1}{2}$ on $[0, 2\\pi)$.",
      choices: [
        { text: "$\\dfrac{\\pi}{3}, \\ \\dfrac{5\\pi}{3}$", explain: "Those give $\\cos x = +\\dfrac{1}{2}$ (quadrants I and IV); the negative sign moves the answers to II and III." },
        { text: "$\\dfrac{2\\pi}{3}, \\ \\dfrac{4\\pi}{3}$", correct: true, explain: "Reference angle $\\dfrac{\\pi}{3}$; cosine is negative in quadrants II and III, giving $\\pi - \\dfrac{\\pi}{3} = \\dfrac{2\\pi}{3}$ and $\\pi + \\dfrac{\\pi}{3} = \\dfrac{4\\pi}{3}$." },
        { text: "$\\dfrac{2\\pi}{3}$ only", explain: "The quadrant III partner $\\dfrac{4\\pi}{3}$ is also a solution and must be included." },
        { text: "$\\dfrac{5\\pi}{6}, \\ \\dfrac{7\\pi}{6}$", explain: "Those use reference angle $\\dfrac{\\pi}{6}$; for $\\cos x = \\dfrac{1}{2}$ the reference angle is $\\dfrac{\\pi}{3}$." },
      ],
    },
    {
      id: "c-cos-quadrants",
      prompt: "Cosine is **positive** in which quadrants?",
      choices: [
        { text: "I and II", explain: "That is where sine is positive; cosine measures the horizontal coordinate instead." },
        { text: "II and III", explain: "Those are where the $x$-coordinate is negative, so cosine is negative there." },
        { text: "I and IV", correct: true, explain: "Cosine is the horizontal coordinate, positive to the right of the $y$-axis: quadrants I and IV." },
      ],
    },
    {
      id: "c-sin-neg-half",
      prompt: "Solve $\\sin x = -\\dfrac{1}{2}$ on $[0, 2\\pi)$.",
      choices: [
        { text: "$\\dfrac{\\pi}{6}, \\ \\dfrac{5\\pi}{6}$", explain: "Those solve $\\sin x = +\\dfrac{1}{2}$; the negative sign moves the answers below the axis to quadrants III and IV." },
        { text: "$\\dfrac{7\\pi}{6}, \\ \\dfrac{11\\pi}{6}$", correct: true, explain: "Reference angle $\\dfrac{\\pi}{6}$; sine is negative in quadrants III and IV, giving $\\pi + \\dfrac{\\pi}{6} = \\dfrac{7\\pi}{6}$ and $2\\pi - \\dfrac{\\pi}{6} = \\dfrac{11\\pi}{6}$." },
        { text: "$\\dfrac{7\\pi}{6}$ only", explain: "The quadrant IV partner $\\dfrac{11\\pi}{6}$ is also a solution." },
        { text: "$\\dfrac{5\\pi}{6}, \\ \\dfrac{7\\pi}{6}$", explain: "$\\dfrac{5\\pi}{6}$ is in quadrant II where sine is positive, so it does not solve $\\sin x = -\\dfrac{1}{2}$." },
      ],
    },
    {
      id: "c-cos-sqrt2",
      prompt: "Solve $\\cos x = \\dfrac{\\sqrt{2}}{2}$ on $[0, 2\\pi)$.",
      choices: [
        { text: "$\\dfrac{\\pi}{4}, \\ \\dfrac{3\\pi}{4}$", explain: "$\\dfrac{3\\pi}{4}$ is in quadrant II where cosine is negative; cosine is positive in I and IV." },
        { text: "$\\dfrac{\\pi}{4}, \\ \\dfrac{7\\pi}{4}$", correct: true, explain: "Reference angle $\\dfrac{\\pi}{4}$; cosine is positive in quadrants I and IV, giving $\\dfrac{\\pi}{4}$ and $2\\pi - \\dfrac{\\pi}{4} = \\dfrac{7\\pi}{4}$." },
        { text: "$\\dfrac{\\pi}{4}$ only", explain: "The quadrant IV partner $\\dfrac{7\\pi}{4}$ is missing." },
        { text: "$\\dfrac{3\\pi}{4}, \\ \\dfrac{5\\pi}{4}$", explain: "Those solve $\\cos x = -\\dfrac{\\sqrt{2}}{2}$, where cosine is negative." },
      ],
    },
    {
      id: "c-sin-sqrt3",
      prompt: "Solve $\\sin x = \\dfrac{\\sqrt{3}}{2}$ on $[0, 2\\pi)$.",
      choices: [
        { text: "$\\dfrac{\\pi}{3}, \\ \\dfrac{2\\pi}{3}$", correct: true, explain: "Reference angle $\\dfrac{\\pi}{3}$; sine is positive in quadrants I and II, giving $\\dfrac{\\pi}{3}$ and $\\pi - \\dfrac{\\pi}{3} = \\dfrac{2\\pi}{3}$." },
        { text: "$\\dfrac{\\pi}{6}, \\ \\dfrac{5\\pi}{6}$", explain: "Those use reference angle $\\dfrac{\\pi}{6}$, which gives $\\sin x = \\dfrac{1}{2}$, not $\\dfrac{\\sqrt{3}}{2}$." },
        { text: "$\\dfrac{\\pi}{3}, \\ \\dfrac{4\\pi}{3}$", explain: "$\\dfrac{4\\pi}{3}$ is in quadrant III where sine is negative; the correct partner is $\\dfrac{2\\pi}{3}$." },
        { text: "$\\dfrac{\\pi}{3}$ only", explain: "The quadrant II partner $\\dfrac{2\\pi}{3}$ must also be counted." },
      ],
    },
    {
      id: "c-cos-neg-sqrt2",
      prompt: "Solve $\\cos x = -\\dfrac{\\sqrt{2}}{2}$ on $[0, 2\\pi)$.",
      choices: [
        { text: "$\\dfrac{\\pi}{4}, \\ \\dfrac{7\\pi}{4}$", explain: "Those give $\\cos x = +\\dfrac{\\sqrt{2}}{2}$; the negative sign moves the answers to quadrants II and III." },
        { text: "$\\dfrac{3\\pi}{4}$ only", explain: "The quadrant III partner $\\dfrac{5\\pi}{4}$ is also a solution." },
        { text: "$\\dfrac{3\\pi}{4}, \\ \\dfrac{5\\pi}{4}$", correct: true, explain: "Reference angle $\\dfrac{\\pi}{4}$; cosine is negative in quadrants II and III, giving $\\dfrac{3\\pi}{4}$ and $\\dfrac{5\\pi}{4}$." },
        { text: "$\\dfrac{5\\pi}{4}, \\ \\dfrac{7\\pi}{4}$", explain: "$\\dfrac{7\\pi}{4}$ is in quadrant IV where cosine is positive, so it does not fit." },
      ],
    },
    {
      id: "c-sin-one",
      prompt: "Solve $\\sin x = 1$ on $[0, 2\\pi)$.",
      choices: [
        { text: "$\\dfrac{\\pi}{2}, \\ \\dfrac{3\\pi}{2}$", explain: "$\\dfrac{3\\pi}{2}$ gives $\\sin x = -1$; the height reaches $+1$ at only one angle." },
        { text: "$\\dfrac{\\pi}{2}$ only", correct: true, explain: "Sine peaks at height $1$ at exactly one place per turn, the very top: $x = \\dfrac{\\pi}{2}$. This is a rare single-solution case." },
        { text: "$0, \\ \\pi$", explain: "Those give $\\sin x = 0$, not $1$." },
        { text: "$\\dfrac{\\pi}{6}, \\ \\dfrac{5\\pi}{6}$", explain: "Those solve $\\sin x = \\dfrac{1}{2}$; the maximum $1$ is reached only at $\\dfrac{\\pi}{2}$." },
      ],
    },
    {
      id: "c-tan-one",
      prompt: "Solve $\\tan x = 1$ on $[0, 2\\pi)$.",
      choices: [
        { text: "$\\dfrac{\\pi}{4}$ only", explain: "Tangent is also positive in quadrant III, so $\\dfrac{5\\pi}{4}$ is a second solution on this interval." },
        { text: "$\\dfrac{\\pi}{4}, \\ \\dfrac{3\\pi}{4}$", explain: "$\\dfrac{3\\pi}{4}$ is in quadrant II where tangent is negative, so it solves $\\tan x = -1$." },
        { text: "$\\dfrac{\\pi}{4}, \\ \\dfrac{5\\pi}{4}$", correct: true, explain: "Reference angle $\\dfrac{\\pi}{4}$; tangent is positive in quadrants I and III, giving $\\dfrac{\\pi}{4}$ and $\\pi + \\dfrac{\\pi}{4} = \\dfrac{5\\pi}{4}$." },
        { text: "$\\dfrac{\\pi}{4}, \\ \\dfrac{7\\pi}{4}$", explain: "$\\dfrac{7\\pi}{4}$ is in quadrant IV where tangent is negative; the partner of $\\dfrac{\\pi}{4}$ is $\\dfrac{5\\pi}{4}$." },
      ],
    },
    {
      id: "c-ref-vs-solution",
      prompt: "For $\\cos x = -\\dfrac{\\sqrt{2}}{2}$ the reference angle is $\\dfrac{\\pi}{4}$. Is $\\dfrac{\\pi}{4}$ itself a solution on $[0, 2\\pi)$?",
      choices: [
        { text: "Yes, the reference angle is always one of the solutions", explain: "The reference angle only sets the size; here $\\cos\\dfrac{\\pi}{4} = +\\dfrac{\\sqrt{2}}{2}$, the wrong sign, so $\\dfrac{\\pi}{4}$ is not a solution." },
        { text: "No; the sign sends the solutions to quadrants II and III, at $\\dfrac{3\\pi}{4}$ and $\\dfrac{5\\pi}{4}$", correct: true, explain: "The reference angle is only the building block; the negative sign places the actual solutions in quadrants II and III." },
        { text: "No, because $\\dfrac{\\pi}{4}$ is not an acute angle", explain: "$\\dfrac{\\pi}{4}$ is acute; it is excluded here because its cosine is positive, not because of its size." },
      ],
    },
    {
      id: "c-mirror",
      prompt: "One solution of $\\sin x = \\dfrac{\\sqrt{3}}{2}$ is $\\dfrac{\\pi}{3}$. Its partner on $[0, 2\\pi)$ is:",
      choices: [
        { text: "$\\pi - \\dfrac{\\pi}{3} = \\dfrac{2\\pi}{3}$", correct: true, explain: "The two positive-sine angles are mirror images across the $y$-axis, so the partner is $\\pi - \\dfrac{\\pi}{3} = \\dfrac{2\\pi}{3}$." },
        { text: "$\\pi + \\dfrac{\\pi}{3} = \\dfrac{4\\pi}{3}$", explain: "Adding $\\pi$ lands in quadrant III where sine is negative, so that value solves $\\sin x = -\\dfrac{\\sqrt{3}}{2}$." },
        { text: "$2\\pi - \\dfrac{\\pi}{3} = \\dfrac{5\\pi}{3}$", explain: "That is the quadrant IV reflection, where sine is negative; sine's positive partner is the quadrant II angle $\\dfrac{2\\pi}{3}$." },
      ],
    },
    {
      id: "c-cos-half-pos",
      prompt: "Solve $\\cos x = \\dfrac{1}{2}$ on $[0, 2\\pi)$.",
      choices: [
        { text: "$\\dfrac{\\pi}{3}, \\ \\dfrac{2\\pi}{3}$", explain: "$\\dfrac{2\\pi}{3}$ is in quadrant II where cosine is negative; cosine is positive in I and IV." },
        { text: "$\\dfrac{\\pi}{6}, \\ \\dfrac{11\\pi}{6}$", explain: "Those use reference angle $\\dfrac{\\pi}{6}$ (that is $\\cos x = \\dfrac{\\sqrt{3}}{2}$); for $\\dfrac{1}{2}$ the reference angle is $\\dfrac{\\pi}{3}$." },
        { text: "$\\dfrac{\\pi}{3}, \\ \\dfrac{5\\pi}{3}$", correct: true, explain: "Reference angle $\\dfrac{\\pi}{3}$; cosine is positive in quadrants I and IV, giving $\\dfrac{\\pi}{3}$ and $2\\pi - \\dfrac{\\pi}{3} = \\dfrac{5\\pi}{3}$." },
        { text: "$\\dfrac{\\pi}{3}$ only", explain: "The quadrant IV partner $\\dfrac{5\\pi}{3}$ is also a solution." },
      ],
    },
  ],
  summit: [
    {
      id: "s-gen-sin-half",
      prompt: "Write the **general solution** (all real $x$) of $\\sin x = \\dfrac{1}{2}$.",
      choices: [
        { text: "$x = \\dfrac{\\pi}{6} + 2\\pi k, \\ \\dfrac{5\\pi}{6} + 2\\pi k$", correct: true, explain: "Both base solutions repeat every full turn, so each carries $+\\,2\\pi k$ for any integer $k$." },
        { text: "$x = \\dfrac{\\pi}{6} + 2\\pi k$", explain: "This drops the quadrant II family $\\dfrac{5\\pi}{6} + 2\\pi k$; both base angles must repeat." },
        { text: "$x = \\dfrac{\\pi}{6} + \\pi k, \\ \\dfrac{5\\pi}{6} + \\pi k$", explain: "Sine's period is $2\\pi$, not $\\pi$, so adding $\\pi k$ would sweep in angles where sine equals $-\\dfrac{1}{2}$." },
        { text: "$x = \\dfrac{\\pi}{6}, \\ \\dfrac{5\\pi}{6}$", explain: "These are only the solutions inside one turn; the general solution must add $+\\,2\\pi k$ to reach every co-terminal angle." },
      ],
    },
    {
      id: "s-gen-why",
      prompt: "In the general solution of $\\sin x = \\dfrac{1}{2}$, why is the added term $2\\pi k$ rather than $\\pi k$?",
      choices: [
        { text: "Because $2\\pi$ is the **period** of sine, so adding it returns to the same value", correct: true, explain: "One full period leaves every sine value unchanged, so $+\\,2\\pi k$ preserves the solution." },
        { text: "Because $k$ must always be even", explain: "$k$ ranges over all integers; the $2\\pi$ comes from sine's period, not from any restriction on $k$." },
        { text: "Because $\\pi k$ is never allowed in trig", explain: "$\\pi k$ is exactly right for tangent; it is wrong here only because sine's period is $2\\pi$." },
      ],
    },
    {
      id: "s-gen-tan-one",
      prompt: "Write the **general solution** of $\\tan x = 1$.",
      choices: [
        { text: "$x = \\dfrac{\\pi}{4} + 2\\pi k, \\ \\dfrac{5\\pi}{4} + 2\\pi k$", explain: "Both listed angles are correct on one turn, but $\\dfrac{5\\pi}{4} = \\dfrac{\\pi}{4} + \\pi$, so they collapse into the single family $\\dfrac{\\pi}{4} + \\pi k$." },
        { text: "$x = \\dfrac{\\pi}{4} + \\pi k$", correct: true, explain: "Tangent repeats every $\\pi$, so one base solution plus $\\pi k$ already lists $\\dfrac{\\pi}{4}$, $\\dfrac{5\\pi}{4}$, and all the rest." },
        { text: "$x = \\dfrac{\\pi}{4} + 2\\pi k$", explain: "With period $2\\pi$ this misses $\\dfrac{5\\pi}{4}$; tangent's period is $\\pi$, so add $\\pi k$." },
        { text: "$x = \\dfrac{\\pi}{4}, \\ \\dfrac{5\\pi}{4}$", explain: "These are only the two solutions on $[0, 2\\pi)$; the general solution needs $+\\,\\pi k$." },
      ],
    },
    {
      id: "s-tan-period",
      prompt: "Why does tangent's general solution add $\\pi k$ instead of $2\\pi k$?",
      choices: [
        { text: "Because tangent's **period is $\\pi$**, so it repeats twice as often as sine and cosine", correct: true, explain: "Tangent returns to the same value every $\\pi$, so a single base solution plus $\\pi k$ captures them all." },
        { text: "Because tangent has no period", explain: "Tangent is periodic; its period is simply $\\pi$ rather than $2\\pi$." },
        { text: "Because tangent is only defined in quadrant I", explain: "Tangent is defined wherever cosine is nonzero, across every quadrant; the $\\pi k$ comes from its period." },
      ],
    },
    {
      id: "s-gen-cos-neg-half",
      prompt: "Write the **general solution** of $\\cos x = -\\dfrac{1}{2}$.",
      choices: [
        { text: "$x = \\dfrac{\\pi}{3} + 2\\pi k, \\ \\dfrac{5\\pi}{3} + 2\\pi k$", explain: "Those base angles solve $\\cos x = +\\dfrac{1}{2}$; the negative value lives in quadrants II and III." },
        { text: "$x = \\dfrac{2\\pi}{3} + 2\\pi k, \\ \\dfrac{4\\pi}{3} + 2\\pi k$", correct: true, explain: "The interval solutions are $\\dfrac{2\\pi}{3}$ and $\\dfrac{4\\pi}{3}$, and each repeats every $2\\pi$." },
        { text: "$x = \\dfrac{2\\pi}{3} + \\pi k$", explain: "Adding $\\pi k$ to one angle would include $\\dfrac{2\\pi}{3} + \\pi = \\dfrac{5\\pi}{3}$, where cosine is positive; cosine needs $+\\,2\\pi k$ on both angles." },
        { text: "$x = \\dfrac{2\\pi}{3} + 2\\pi k$", explain: "This drops the quadrant III family $\\dfrac{4\\pi}{3} + 2\\pi k$." },
      ],
    },
    {
      id: "s-gen-sin-neg-half",
      prompt: "Write the **general solution** of $\\sin x = -\\dfrac{1}{2}$.",
      choices: [
        { text: "$x = \\dfrac{7\\pi}{6} + 2\\pi k, \\ \\dfrac{11\\pi}{6} + 2\\pi k$", correct: true, explain: "Sine is negative in quadrants III and IV, giving $\\dfrac{7\\pi}{6}$ and $\\dfrac{11\\pi}{6}$, each repeating every $2\\pi$." },
        { text: "$x = \\dfrac{\\pi}{6} + 2\\pi k, \\ \\dfrac{5\\pi}{6} + 2\\pi k$", explain: "Those solve $\\sin x = +\\dfrac{1}{2}$; the negative sign moves both answers below the axis." },
        { text: "$x = \\dfrac{7\\pi}{6} + \\pi k$", explain: "Adding only $\\pi k$ to one angle would sweep in quadrant II angles where sine is positive; keep both families with $+\\,2\\pi k$." },
        { text: "$x = -\\dfrac{\\pi}{6} + \\pi k$", explain: "This mixes a single base angle with the wrong period; sine needs both base angles plus $2\\pi k$." },
      ],
    },
    {
      id: "s-tan-two-interval",
      prompt: "Solve $\\tan x = \\sqrt{3}$ on $[0, 2\\pi)$.",
      choices: [
        { text: "$\\dfrac{\\pi}{3}, \\ \\dfrac{2\\pi}{3}$", explain: "$\\dfrac{2\\pi}{3}$ is in quadrant II where tangent is negative; tangent is positive in I and III." },
        { text: "$\\dfrac{\\pi}{3}$ only", explain: "On a full $2\\pi$ interval tangent hits each value twice, $\\pi$ apart, so $\\dfrac{4\\pi}{3}$ is also a solution." },
        { text: "$\\dfrac{\\pi}{3}, \\ \\dfrac{4\\pi}{3}$", correct: true, explain: "Reference angle $\\dfrac{\\pi}{3}$; tangent is positive in quadrants I and III, and the two solutions sit exactly $\\pi$ apart: $\\dfrac{\\pi}{3}$ and $\\dfrac{4\\pi}{3}$." },
        { text: "$\\dfrac{\\pi}{6}, \\ \\dfrac{7\\pi}{6}$", explain: "Reference angle $\\dfrac{\\pi}{6}$ gives $\\tan x = \\dfrac{\\sqrt{3}}{3}$, not $\\sqrt{3}$." },
      ],
    },
    {
      id: "s-cos-neg-one",
      prompt: "Solve $\\cos x = -1$ on $[0, 2\\pi)$.",
      choices: [
        { text: "$\\pi$ only", correct: true, explain: "Cosine reaches its minimum $-1$ at exactly one angle per turn, the far-left point: $x = \\pi$. Another single-solution case." },
        { text: "$\\pi, \\ 2\\pi$", explain: "$2\\pi$ is outside the half-open interval $[0, 2\\pi)$, and it gives $\\cos x = +1$ anyway." },
        { text: "$\\dfrac{\\pi}{2}, \\ \\dfrac{3\\pi}{2}$", explain: "Those give $\\cos x = 0$, not $-1$." },
        { text: "$0, \\ \\pi$", explain: "$\\cos 0 = +1$; only $x = \\pi$ gives $-1$." },
      ],
    },
    {
      id: "s-count-real",
      prompt: "How many solutions does $\\sin x = \\dfrac{1}{2}$ have over **all** real numbers?",
      choices: [
        { text: "Two", explain: "Two is the count on a single turn $[0, 2\\pi)$; over all reals each base angle repeats forever." },
        { text: "Infinitely many", correct: true, explain: "Each of the two base angles repeats every $2\\pi$, so together they give infinitely many solutions." },
        { text: "Four", explain: "No interval limits this to four; without a stated interval the count is infinite." },
      ],
    },
    {
      id: "s-quadrants-astc",
      prompt: "The solutions of $\\sin x = -\\dfrac{\\sqrt{3}}{2}$ lie in which quadrants?",
      choices: [
        { text: "I and II", explain: "That is where sine is positive; a negative value cannot land there." },
        { text: "II and III", explain: "That pattern fits a negative cosine; negative sine lives below the axis instead." },
        { text: "III and IV", correct: true, explain: "Sine is the height, negative below the $x$-axis, so the solutions $\\dfrac{4\\pi}{3}$ and $\\dfrac{5\\pi}{3}$ sit in quadrants III and IV." },
        { text: "III only", explain: "There are two solutions; the quadrant IV angle $\\dfrac{5\\pi}{3}$ is missing." },
      ],
    },
    {
      id: "s-tan-neg-one",
      prompt: "Solve $\\tan x = -1$ on $[0, 2\\pi)$.",
      choices: [
        { text: "$\\dfrac{\\pi}{4}, \\ \\dfrac{5\\pi}{4}$", explain: "Those give $\\tan x = +1$ (quadrants I and III); the negative sign moves the solutions to II and IV." },
        { text: "$\\dfrac{3\\pi}{4}, \\ \\dfrac{7\\pi}{4}$", correct: true, explain: "Reference angle $\\dfrac{\\pi}{4}$; tangent is negative in quadrants II and IV, giving $\\pi - \\dfrac{\\pi}{4} = \\dfrac{3\\pi}{4}$ and $2\\pi - \\dfrac{\\pi}{4} = \\dfrac{7\\pi}{4}$." },
        { text: "$\\dfrac{3\\pi}{4}$ only", explain: "Tangent hits $-1$ twice on a full turn, $\\pi$ apart; $\\dfrac{7\\pi}{4}$ is the partner." },
        { text: "$\\dfrac{3\\pi}{4}, \\ \\dfrac{5\\pi}{4}$", explain: "$\\dfrac{5\\pi}{4}$ is in quadrant III where tangent is positive, so it solves $\\tan x = +1$." },
      ],
    },
    {
      id: "s-missing-partner",
      prompt: "A student solves $\\sin x = \\dfrac{\\sqrt{2}}{2}$ on $[0, 2\\pi)$ and writes $x = \\dfrac{\\pi}{4}$. What did they miss?",
      choices: [
        { text: "Nothing; $\\dfrac{\\pi}{4}$ is the only solution", explain: "Sine is positive in two quadrants, so there is a second solution on this interval." },
        { text: "The quadrant II partner $\\dfrac{3\\pi}{4}$", correct: true, explain: "Sine is positive in quadrants I and II, so $\\pi - \\dfrac{\\pi}{4} = \\dfrac{3\\pi}{4}$ is the missing second solution." },
        { text: "The quadrant III angle $\\dfrac{5\\pi}{4}$", explain: "$\\dfrac{5\\pi}{4}$ is where sine is negative, so it solves $\\sin x = -\\dfrac{\\sqrt{2}}{2}$, not this equation." },
        { text: "The $+\\,2\\pi k$ term", explain: "On the interval $[0, 2\\pi)$ you do not add $2\\pi k$; the gap here is the second in-interval angle $\\dfrac{3\\pi}{4}$." },
      ],
    },
    {
      id: "s-which-period",
      prompt: "Which equation's complete solution is a **single family spaced by $\\pi$**, of the form (angle) $+\\,\\pi k$?",
      choices: [
        { text: "$\\sin x = \\dfrac{1}{2}$", explain: "Sine has period $2\\pi$ and two base angles, so its family is $+\\,2\\pi k$ on each." },
        { text: "$\\cos x = -1$", explain: "This is a single family, but cosine's period is $2\\pi$, so it is $\\pi + 2\\pi k$, not $+\\,\\pi k$." },
        { text: "$\\tan x = 1$", correct: true, explain: "Only tangent has period $\\pi$, so its whole solution set is the single family $\\dfrac{\\pi}{4} + \\pi k$." },
        { text: "$\\cos x = \\dfrac{1}{2}$", explain: "Cosine's period is $2\\pi$ with two base angles, giving $+\\,2\\pi k$ on each." },
      ],
    },
    {
      id: "s-coterminal",
      prompt: "Besides $\\dfrac{\\pi}{6}$ and $\\dfrac{5\\pi}{6}$, which angle also solves $\\sin x = \\dfrac{1}{2}$?",
      choices: [
        { text: "$\\dfrac{7\\pi}{6}$", explain: "This is $\\dfrac{\\pi}{6} + \\pi$; adding half a period flips the sign, so $\\sin\\dfrac{7\\pi}{6} = -\\dfrac{1}{2}$." },
        { text: "$\\dfrac{13\\pi}{6}$", correct: true, explain: "$\\dfrac{13\\pi}{6} = \\dfrac{\\pi}{6} + 2\\pi$ is co-terminal with $\\dfrac{\\pi}{6}$, so its sine is also $\\dfrac{1}{2}$." },
        { text: "$\\dfrac{2\\pi}{3}$", explain: "$\\sin\\dfrac{2\\pi}{3} = \\dfrac{\\sqrt{3}}{2}$, a different value entirely." },
        { text: "$\\dfrac{11\\pi}{6}$", explain: "$\\sin\\dfrac{11\\pi}{6} = -\\dfrac{1}{2}$, so it solves the negative equation instead." },
      ],
    },
    {
      id: "s-sin-one-general",
      prompt: "Write the **general solution** of $\\sin x = 1$.",
      choices: [
        { text: "$x = \\dfrac{\\pi}{2} + 2\\pi k$", correct: true, explain: "Sine reaches its peak $1$ only once per turn, at $\\dfrac{\\pi}{2}$, so there is a single family repeating every $2\\pi$." },
        { text: "$x = \\dfrac{\\pi}{2} + 2\\pi k, \\ \\dfrac{3\\pi}{2} + 2\\pi k$", explain: "$\\dfrac{3\\pi}{2}$ gives $\\sin x = -1$; the maximum is touched at only one angle, so there is just one family." },
        { text: "$x = \\dfrac{\\pi}{2} + \\pi k$", explain: "Adding $\\pi k$ would include $\\dfrac{3\\pi}{2}$, where sine is $-1$; sine's period is $2\\pi$." },
        { text: "$x = \\dfrac{\\pi}{2}$", explain: "Without an interval, list every co-terminal angle by adding $+\\,2\\pi k$." },
      ],
    },
  ],
};
