import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Graphing sinusoids".
 * Grounded in the lesson: for $y = A\sin(B(x - C)) + D$ the amplitude is $|A|$,
 * the midline is $y = D$, the maximum is $D + |A|$ and the minimum is $D - |A|$,
 * the period is $\dfrac{2\pi}{B}$, and the graph shifts right by $C$ when the
 * input is $x - C$. Distractors are the classic traps: reading amplitude off a
 * peak while ignoring the midline, using $2\pi B$ instead of $\dfrac{2\pi}{B}$,
 * flipping the direction of the phase shift, treating $B$ as the period, and
 * forgetting that amplitude is a size and cannot be negative.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-role-a",
      prompt: "In $y = A\\sin\\!\\big(B(x - C)\\big) + D$, which constant controls the amplitude?",
      choices: [
        { text: "$A$", correct: true, explain: "$A$ multiplies the sine, so it scales the height of every peak and trough. The amplitude is $|A|$." },
        { text: "$B$", explain: "$B$ sets the period through $\\dfrac{2\\pi}{B}$, not the height." },
        { text: "$C$", explain: "$C$ shifts the graph horizontally, leaving the height unchanged." },
        { text: "$D$", explain: "$D$ raises or lowers the midline, but the amplitude stays the same." },
      ],
    },
    {
      id: "c-role-d",
      prompt: "Which constant sets the midline of the graph?",
      choices: [
        { text: "$D$", correct: true, explain: "$D$ is added to the whole expression, so it shifts every output up by $D$ to the midline $y = D$." },
        { text: "$A$", explain: "$A$ sets how far the wave reaches from the midline, not where the midline sits." },
        { text: "$B$", explain: "$B$ controls the period, not the vertical position." },
        { text: "$C$", explain: "$C$ moves the wave sideways, leaving the midline height unchanged." },
      ],
    },
    {
      id: "c-amp-basic",
      prompt: "What is the amplitude of $y = 3\\sin x$?",
      choices: [
        { text: "$3$", correct: true, explain: "The amplitude is $|A| = |3| = 3$, the distance from the midline up to a peak." },
        { text: "$6$", explain: "$6$ is the full distance from trough to peak, which is $2A$, not the amplitude." },
        { text: "$1$", explain: "$1$ is the amplitude of the parent $y = \\sin x$. Multiplying by $3$ triples it." },
        { text: "$\\dfrac{1}{3}$", explain: "Multiplying by $3$ stretches the height, so the amplitude grows to $3$, it does not shrink." },
      ],
    },
    {
      id: "c-midline-basic",
      prompt: "What is the midline of $y = \\sin x + 4$?",
      choices: [
        { text: "$y = 4$", correct: true, explain: "The constant $D = 4$ is added to every output, so the wave oscillates around $y = 4$." },
        { text: "$y = 0$", explain: "$y = 0$ is the midline of the parent $y = \\sin x$. Adding $4$ lifts it to $y = 4$." },
        { text: "$y = 5$", explain: "$5$ is the maximum, one amplitude above the midline. The midline itself is $y = 4$." },
        { text: "$x = 4$", explain: "The midline is a horizontal line $y = D$, not a vertical line." },
      ],
    },
    {
      id: "c-max-basic",
      prompt: "What is the maximum value of $y = \\sin x + 2$?",
      choices: [
        { text: "$3$", correct: true, explain: "The maximum is $D + |A| = 2 + 1 = 3$, since the parent peaks at $1$ before the shift." },
        { text: "$2$", explain: "$2$ is the midline. The peak rises one amplitude above it to $3$." },
        { text: "$1$", explain: "$1$ is the peak of the parent $y = \\sin x$. Adding $2$ raises it to $3$." },
        { text: "$4$", explain: "That would need an amplitude of $2$. Here $A = 1$, so the peak is $2 + 1 = 3$." },
      ],
    },
    {
      id: "c-min-basic",
      prompt: "What is the minimum value of $y = 2\\sin x - 1$?",
      choices: [
        { text: "$-3$", correct: true, explain: "The minimum is $D - |A| = -1 - 2 = -3$, one amplitude below the midline $-1$." },
        { text: "$-1$", explain: "$-1$ is the midline. The trough falls one amplitude of $2$ below it, to $-3$." },
        { text: "$1$", explain: "$1$ is the maximum ($-1 + 2$). The minimum is on the other side of the midline, at $-3$." },
        { text: "$-2$", explain: "That uses the amplitude alone and forgets the midline. The minimum is $-1 - 2 = -3$." },
      ],
    },
    {
      id: "c-period-2x",
      prompt: "What is the period of $y = \\sin(2x)$?",
      choices: [
        { text: "$\\pi$", correct: true, explain: "The period is $\\dfrac{2\\pi}{B} = \\dfrac{2\\pi}{2} = \\pi$, so the wave repeats twice as fast." },
        { text: "$4\\pi$", explain: "That multiplies by $2$ instead of dividing. Larger $B$ shortens the period." },
        { text: "$2\\pi$", explain: "$2\\pi$ is the parent period. With $B = 2$ it halves to $\\pi$." },
        { text: "$2$", explain: "The period keeps the factor of $\\pi$: $\\dfrac{2\\pi}{2} = \\pi$, not $2$." },
      ],
    },
    {
      id: "c-period-3x",
      prompt: "What is the period of $y = \\sin(3x)$?",
      choices: [
        { text: "$\\dfrac{2\\pi}{3}$", correct: true, explain: "The period is $\\dfrac{2\\pi}{B} = \\dfrac{2\\pi}{3}$, so three cycles fit between $0$ and $2\\pi$." },
        { text: "$6\\pi$", explain: "That multiplies by $3$. A larger $B$ makes the period shorter, not longer." },
        { text: "$3$", explain: "The period is a length that keeps $\\pi$: $\\dfrac{2\\pi}{3}$, not the plain number $3$." },
        { text: "$\\dfrac{3}{2\\pi}$", explain: "The formula is $\\dfrac{2\\pi}{B}$, so the $2\\pi$ stays on top: $\\dfrac{2\\pi}{3}$." },
      ],
    },
    {
      id: "c-b-from-period",
      prompt: "A sinusoid $y = \\sin(Bx)$ has period $\\pi$. What is $B$?",
      choices: [
        { text: "$2$", correct: true, explain: "Solve $\\dfrac{2\\pi}{B} = \\pi$, which gives $B = 2$." },
        { text: "$\\dfrac{1}{2}$", explain: "$B = \\dfrac12$ gives period $4\\pi$. To shorten the period to $\\pi$ you need $B = 2$." },
        { text: "$\\pi$", explain: "Setting $B = \\pi$ gives period $\\dfrac{2\\pi}{\\pi} = 2$, not $\\pi$." },
        { text: "$\\dfrac{\\pi}{2}$", explain: "That gives period $\\dfrac{2\\pi}{\\pi/2} = 4$, not $\\pi$. The correct value is $B = 2$." },
      ],
    },
    {
      id: "c-phase-right",
      prompt: "How is $y = \\sin\\!\\big(x - \\tfrac{\\pi}{4}\\big)$ shifted from the parent wave?",
      choices: [
        { text: "right by $\\dfrac{\\pi}{4}$", correct: true, explain: "The input has the form $x - C$ with $C = \\dfrac{\\pi}{4}$, so the graph moves right by $\\dfrac{\\pi}{4}$." },
        { text: "left by $\\dfrac{\\pi}{4}$", explain: "Subtracting inside moves the graph right, not left. Left shifts come from $x + C$." },
        { text: "up by $\\dfrac{\\pi}{4}$", explain: "A change inside the sine moves the graph horizontally, not vertically." },
        { text: "right by $4$", explain: "The shift is the value of $C$, which is $\\dfrac{\\pi}{4}$, not $4$." },
      ],
    },
    {
      id: "c-phase-left",
      prompt: "How is $y = \\sin\\!\\big(x + \\tfrac{\\pi}{2}\\big)$ shifted from the parent wave?",
      choices: [
        { text: "left by $\\dfrac{\\pi}{2}$", correct: true, explain: "Writing $x + \\dfrac{\\pi}{2}$ is the same as $x - (-\\tfrac{\\pi}{2})$, so $C$ is negative and the graph moves left." },
        { text: "right by $\\dfrac{\\pi}{2}$", explain: "Adding inside moves the graph left. A right shift needs a minus sign, as in $x - C$." },
        { text: "down by $\\dfrac{\\pi}{2}$", explain: "A change inside the sine shifts the graph horizontally, not down." },
        { text: "left by $2$", explain: "The shift is $\\dfrac{\\pi}{2}$, the value inside, not $2$." },
      ],
    },
    {
      id: "c-reflect",
      prompt: "What is the amplitude of $y = -\\sin x$, and what does the negative sign do?",
      choices: [
        { text: "amplitude $1$, and the wave is reflected across the midline", correct: true, explain: "Amplitude is $|-1| = 1$. The minus sign flips the wave, turning each peak into a trough." },
        { text: "amplitude $-1$, so the wave points downward", explain: "Amplitude is a distance, so it is never negative. The size is $|-1| = 1$." },
        { text: "amplitude $1$, with no change to the shape", explain: "The size is $1$, but the negative sign still reflects the wave across the midline." },
        { text: "amplitude $0$, so the graph is flat", explain: "A flat graph needs $A = 0$. Here $|A| = 1$, so the wave keeps its full height." },
      ],
    },
    {
      id: "c-amp-negative",
      prompt: "What is the amplitude of $y = -5\\sin x$?",
      choices: [
        { text: "$5$", correct: true, explain: "Amplitude is $|A| = |-5| = 5$. The sign only reflects the wave, it does not change the height." },
        { text: "$-5$", explain: "Amplitude is a size and cannot be negative. The value is $|-5| = 5$." },
        { text: "$10$", explain: "$10$ is the full trough-to-peak distance, $2|A|$, not the amplitude." },
        { text: "$1$", explain: "The factor $-5$ stretches the height to $5$. Only the parent has amplitude $1$." },
      ],
    },
    {
      id: "c-cycles",
      prompt: "How many complete cycles does $y = \\sin(3x)$ complete between $x = 0$ and $x = 2\\pi$?",
      choices: [
        { text: "$3$", correct: true, explain: "Each cycle has width $\\dfrac{2\\pi}{3}$, so $2\\pi \\div \\dfrac{2\\pi}{3} = 3$ cycles fit. The count equals $B$." },
        { text: "$1$", explain: "The parent completes one cycle on $[0, 2\\pi]$. With $B = 3$ it completes three." },
        { text: "$6$", explain: "That doubles the count. The number of cycles on $[0, 2\\pi]$ is $B = 3$." },
        { text: "$\\dfrac{2\\pi}{3}$", explain: "$\\dfrac{2\\pi}{3}$ is the width of one cycle, not how many cycles fit." },
      ],
    },
    {
      id: "c-max-combo",
      prompt: "What is the maximum value of $y = 3\\sin x + 1$?",
      choices: [
        { text: "$4$", correct: true, explain: "The maximum is $D + |A| = 1 + 3 = 4$, one amplitude above the midline." },
        { text: "$3$", explain: "$3$ is the amplitude alone. You must add the midline $1$ to reach the peak at $4$." },
        { text: "$1$", explain: "$1$ is the midline. The peak rises one amplitude of $3$ above it, to $4$." },
        { text: "$2$", explain: "That adds only part of the amplitude. The peak is $1 + 3 = 4$." },
      ],
    },
  ],
  summit: [
    {
      id: "s-max-full",
      prompt: "What is the maximum value of $y = 4\\sin(2x) - 1$?",
      choices: [
        { text: "$3$", correct: true, explain: "The maximum is $D + |A| = -1 + 4 = 3$. The factor $B = 2$ changes the period, not the height." },
        { text: "$4$", explain: "That is the amplitude alone. You must add the midline $-1$, giving $3$." },
        { text: "$5$", explain: "That adds the amplitude to $+1$ instead of $-1$. The midline here is $-1$, so the peak is $3$." },
        { text: "$-1$", explain: "$-1$ is the midline. The peak sits one amplitude of $4$ above it, at $3$." },
      ],
    },
    {
      id: "s-min-full",
      prompt: "What is the minimum value of $y = 2\\sin x + 5$?",
      choices: [
        { text: "$3$", correct: true, explain: "The minimum is $D - |A| = 5 - 2 = 3$, one amplitude below the midline $5$." },
        { text: "$5$", explain: "$5$ is the midline. The trough falls one amplitude of $2$ below it, to $3$." },
        { text: "$7$", explain: "$7$ is the maximum ($5 + 2$). The minimum is on the low side, at $3$." },
        { text: "$-3$", explain: "That forgets the midline and reflects around $0$. With midline $5$ the minimum is $3$." },
      ],
    },
    {
      id: "s-period-pi-x",
      prompt: "What is the period of $y = \\sin(\\pi x)$?",
      choices: [
        { text: "$2$", correct: true, explain: "The period is $\\dfrac{2\\pi}{B} = \\dfrac{2\\pi}{\\pi} = 2$. The $\\pi$ cancels, leaving a plain $2$." },
        { text: "$2\\pi$", explain: "That ignores $B = \\pi$. Dividing by $\\pi$ cancels the $\\pi$ and gives $2$." },
        { text: "$\\pi$", explain: "$\\dfrac{2\\pi}{\\pi} = 2$, not $\\pi$. The $\\pi$ in $B$ cancels the one on top." },
        { text: "$\\dfrac{2}{\\pi}$", explain: "The $2\\pi$ stays on top: $\\dfrac{2\\pi}{\\pi} = 2$, not $\\dfrac{2}{\\pi}$." },
      ],
    },
    {
      id: "s-b-from-period-frac",
      prompt: "A sinusoid $y = \\sin(Bx)$ has period $\\dfrac{2\\pi}{3}$. What is $B$?",
      choices: [
        { text: "$3$", correct: true, explain: "Solve $\\dfrac{2\\pi}{B} = \\dfrac{2\\pi}{3}$, which gives $B = 3$ directly." },
        { text: "$\\dfrac{1}{3}$", explain: "$B = \\dfrac13$ gives period $6\\pi$, far too long. The correct value is $3$." },
        { text: "$\\dfrac{2\\pi}{3}$", explain: "That confuses $B$ with the period itself. Here $B = 3$ produces that period." },
        { text: "$6$", explain: "$B = 6$ gives period $\\dfrac{\\pi}{3}$, too short by half. The correct value is $3$." },
      ],
    },
    {
      id: "s-phase-factor",
      prompt: "Written in the form $y = \\sin\\!\\big(B(x - C)\\big)$, how is $y = \\sin(2x - \\pi)$ shifted?",
      choices: [
        { text: "right by $\\dfrac{\\pi}{2}$", correct: true, explain: "Factor out $B = 2$: $2x - \\pi = 2\\big(x - \\tfrac{\\pi}{2}\\big)$, so $C = \\dfrac{\\pi}{2}$ and the shift is right by $\\dfrac{\\pi}{2}$." },
        { text: "right by $\\pi$", explain: "You must factor out the $2$ first. The shift is $C$ after factoring, which is $\\dfrac{\\pi}{2}$, not $\\pi$." },
        { text: "left by $\\dfrac{\\pi}{2}$", explain: "The factored form is $x - \\tfrac{\\pi}{2}$, a minus sign, so the shift is to the right." },
        { text: "right by $2\\pi$", explain: "That multiplies instead of factoring. After factoring $2$, the shift is $\\dfrac{\\pi}{2}$." },
      ],
    },
    {
      id: "s-amp-from-graph",
      prompt: "A sinusoid has a maximum of $5$ and a minimum of $1$. What is its amplitude?",
      choices: [
        { text: "$2$", correct: true, explain: "Amplitude is half the peak-to-trough distance: $\\dfrac{5 - 1}{2} = 2$." },
        { text: "$4$", explain: "$4$ is the full distance from trough to peak. The amplitude is half of that, $2$." },
        { text: "$3$", explain: "$3$ is the midline $\\dfrac{5 + 1}{2}$, not the amplitude." },
        { text: "$5$", explain: "$5$ is the maximum value. Amplitude is measured from the midline, giving $2$." },
      ],
    },
    {
      id: "s-mid-from-graph",
      prompt: "A sinusoid has a maximum of $7$ and a minimum of $-1$. What is its midline?",
      choices: [
        { text: "$y = 3$", correct: true, explain: "The midline is the average of the extremes: $\\dfrac{7 + (-1)}{2} = 3$." },
        { text: "$y = 4$", explain: "$4$ is the amplitude, half of $7 - (-1) = 8$. The midline is the average, $3$." },
        { text: "$y = 6$", explain: "That averages incorrectly. $\\dfrac{7 + (-1)}{2} = 3$, not $6$." },
        { text: "$y = 0$", explain: "The midline is centered between $7$ and $-1$, which is $3$, not $0$." },
      ],
    },
    {
      id: "s-reflect-max",
      prompt: "What is the maximum value of $y = -3\\sin x + 2$?",
      choices: [
        { text: "$5$", correct: true, explain: "The term $-3\\sin x$ ranges from $-3$ to $3$, so the maximum is $2 + 3 = 5$. The reflection does not change the reach $|A| = 3$." },
        { text: "$-1$", explain: "That subtracts the amplitude. The maximum uses $+|A|$: $2 + 3 = 5$." },
        { text: "$2$", explain: "$2$ is the midline. The peak rises one amplitude of $3$ above it, to $5$." },
        { text: "$3$", explain: "$3$ is the amplitude. Add the midline $2$ to reach the maximum, $5$." },
      ],
    },
    {
      id: "s-write-eq",
      prompt: "Which equation has amplitude $2$, period $2\\pi$, midline $y = -3$, and no phase shift?",
      choices: [
        { text: "$y = 2\\sin x - 3$", correct: true, explain: "$A = 2$ gives amplitude $2$, $B = 1$ gives period $2\\pi$, $D = -3$ sets the midline, and no shift means $C = 0$." },
        { text: "$y = 2\\sin x + 3$", explain: "This puts the midline at $y = 3$. A midline of $-3$ needs $D = -3$." },
        { text: "$y = -3\\sin x + 2$", explain: "This has amplitude $3$ and midline $2$, the roles swapped. Amplitude is $A$, midline is $D$." },
        { text: "$y = 2\\sin(2x) - 3$", explain: "$B = 2$ makes the period $\\pi$, not $2\\pi$. Period $2\\pi$ needs $B = 1$." },
      ],
    },
    {
      id: "s-period-with-amp",
      prompt: "What is the period of $y = 3\\sin(4x)$?",
      choices: [
        { text: "$\\dfrac{\\pi}{2}$", correct: true, explain: "The period depends only on $B$: $\\dfrac{2\\pi}{4} = \\dfrac{\\pi}{2}$. The amplitude $3$ does not affect it." },
        { text: "$\\dfrac{3\\pi}{2}$", explain: "The amplitude does not enter the period. It is $\\dfrac{2\\pi}{4} = \\dfrac{\\pi}{2}$." },
        { text: "$8\\pi$", explain: "That multiplies by $4$. The period divides: $\\dfrac{2\\pi}{4} = \\dfrac{\\pi}{2}$." },
        { text: "$2\\pi$", explain: "$2\\pi$ ignores $B = 4$. Dividing by $4$ gives $\\dfrac{\\pi}{2}$." },
      ],
    },
    {
      id: "s-phase-sign",
      prompt: "How is $y = \\sin\\!\\big(x + \\tfrac{\\pi}{3}\\big)$ shifted from the parent wave?",
      choices: [
        { text: "left by $\\dfrac{\\pi}{3}$", correct: true, explain: "The plus sign matches $x - (-\\tfrac{\\pi}{3})$, so $C$ is negative and the graph shifts left by $\\dfrac{\\pi}{3}$." },
        { text: "right by $\\dfrac{\\pi}{3}$", explain: "A right shift needs a minus sign inside. The plus sign moves the graph left." },
        { text: "up by $\\dfrac{\\pi}{3}$", explain: "A change inside the sine shifts the graph horizontally, not vertically." },
        { text: "left by $3$", explain: "The shift is the value $\\dfrac{\\pi}{3}$, not $3$." },
      ],
    },
    {
      id: "s-amp-full",
      prompt: "What is the amplitude of $y = -2\\sin(3x) + 1$?",
      choices: [
        { text: "$2$", correct: true, explain: "Amplitude is $|A| = |-2| = 2$. Neither $B = 3$ nor $D = 1$ affects the height." },
        { text: "$-2$", explain: "Amplitude is a size and cannot be negative. The value is $|-2| = 2$." },
        { text: "$3$", explain: "$3$ is $B$, which sets the period, not the amplitude." },
        { text: "$1$", explain: "$1$ is the midline $D$. The amplitude is $|-2| = 2$." },
      ],
    },
    {
      id: "s-peak-to-trough",
      prompt: "For $y = 5\\sin x$, what is the vertical distance from a peak down to the next trough?",
      choices: [
        { text: "$10$", correct: true, explain: "The wave reaches from $+5$ to $-5$, a total distance of $2|A| = 10$." },
        { text: "$5$", explain: "$5$ is the amplitude, only half the peak-to-trough distance. The full drop is $10$." },
        { text: "$0$", explain: "Peak and trough are at different heights, $+5$ and $-5$, a distance of $10$ apart." },
        { text: "$25$", explain: "That squares the amplitude. The distance is $2|A| = 10$." },
      ],
    },
    {
      id: "s-midline-avg",
      prompt: "A sinusoid has a maximum of $9$ and a minimum of $3$. What are its midline and amplitude?",
      choices: [
        { text: "midline $y = 6$, amplitude $3$", correct: true, explain: "Midline is the average $\\dfrac{9 + 3}{2} = 6$, and amplitude is half the gap $\\dfrac{9 - 3}{2} = 3$." },
        { text: "midline $y = 3$, amplitude $6$", explain: "These swap the two. The midline is the average $6$, and the amplitude is half the gap $3$." },
        { text: "midline $y = 6$, amplitude $6$", explain: "The midline $6$ is right, but the amplitude is half the gap $9 - 3$, which is $3$." },
        { text: "midline $y = 12$, amplitude $3$", explain: "The midline is the average of $9$ and $3$, which is $6$, not their sum $12$." },
      ],
    },
    {
      id: "s-half-cycle",
      prompt: "How many complete cycles does $y = \\sin\\!\\big(\\tfrac{x}{2}\\big)$ complete between $x = 0$ and $x = 2\\pi$?",
      choices: [
        { text: "$\\dfrac{1}{2}$", correct: true, explain: "Here $B = \\dfrac12$, so the period is $\\dfrac{2\\pi}{1/2} = 4\\pi$. On the width $2\\pi$ only half a cycle fits." },
        { text: "$2$", explain: "That treats $B$ as if it were $2$. With $B = \\dfrac12$ the wave slows down, fitting half a cycle." },
        { text: "$1$", explain: "The parent fits one cycle. Halving $B$ stretches the period to $4\\pi$, so only half a cycle fits." },
        { text: "$4\\pi$", explain: "$4\\pi$ is the period, the width of one cycle, not the number of cycles on $[0, 2\\pi]$." },
      ],
    },
  ],
};
