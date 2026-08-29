import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Sinusoidal regression".
 * Grounded in the lesson: fit real cyclic data with y = A sin(B(x - C)) + D.
 * Read A and D from the extremes (A = (max - min)/2, D = (max + min)/2),
 * get B from the period (B = 2*pi / period), then set C so the curve's peak
 * lands on the data's peak (C = x_peak - period/4). Distractors are the classic
 * traps: A = max, B = period, D = the max, forgetting to average, and the sign
 * of the phase shift.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-model",
      prompt: "Cyclic data is modeled by $y = A\\sin\\!\\big(B(x - C)\\big) + D$. Which parameter sets the **midline**, the level the curve oscillates around?",
      choices: [
        { text: "$A$", explain: "$A$ is the amplitude, how far the curve swings from the middle, not the middle itself." },
        { text: "$B$", explain: "$B$ controls the period (how fast it cycles), not the vertical center." },
        { text: "$C$", explain: "$C$ is the phase shift. It slides the curve sideways, not up or down." },
        { text: "$D$", correct: true, explain: "$D$ is added outside the sine, so it lifts the whole curve to its center height." },
      ],
    },
    {
      id: "c-amp-formula",
      prompt: "Which formula gives the **amplitude** $A$ from the data's highest and lowest values?",
      choices: [
        { text: "$A = \\dfrac{\\max - \\min}{2}$", correct: true, explain: "Amplitude is half the gap between the high and the low." },
        { text: "$A = \\dfrac{\\max + \\min}{2}$", explain: "That sum-over-two is the midline $D$, not the amplitude." },
        { text: "$A = \\max - \\min$", explain: "That is the full top-to-bottom swing. Amplitude is only half of it." },
        { text: "$A = \\max$", explain: "Using the peak as the amplitude is the classic slip. Measure from the midline, so halve the gap." },
      ],
    },
    {
      id: "c-amp-compute",
      prompt: "Monthly data peaks at $70$ and bottoms out at $10$. The amplitude $A$ is:",
      choices: [
        { text: "$A = 60$", explain: "That is the full range $70 - 10$. Halve it to get the amplitude." },
        { text: "$A = 40$", explain: "That is the midline $\\dfrac{70 + 10}{2} = 40$. Amplitude uses the difference, not the sum." },
        { text: "$A = 30$", correct: true, explain: "$A = \\dfrac{70 - 10}{2} = 30$." },
        { text: "$A = 70$", explain: "The peak alone is not the amplitude. Measure from the middle, so halve the gap." },
      ],
    },
    {
      id: "c-mid-formula",
      prompt: "Which formula gives the **midline** $D$?",
      choices: [
        { text: "$D = \\dfrac{\\max - \\min}{2}$", explain: "That difference-over-two is the amplitude $A$, not the midline." },
        { text: "$D = \\dfrac{\\max + \\min}{2}$", correct: true, explain: "The midline is the average of the high and low." },
        { text: "$D = \\max + \\min$", explain: "You forgot to average. Divide the sum by $2$." },
        { text: "$D = \\dfrac{\\max}{2}$", explain: "Halving only the max ignores the low. Average both extremes." },
      ],
    },
    {
      id: "c-mid-compute",
      prompt: "For that same data (peak $70$, low $10$), the midline $D$ is:",
      choices: [
        { text: "$D = 30$", explain: "That is the amplitude $\\dfrac{70 - 10}{2} = 30$. The midline uses the sum." },
        { text: "$D = 70$", explain: "The max is not the midline. Average the high and low." },
        { text: "$D = 80$", explain: "That is the sum $70 + 10$. Divide by $2$ to average it, giving $40$." },
        { text: "$D = 40$", correct: true, explain: "$D = \\dfrac{70 + 10}{2} = 40$." },
      ],
    },
    {
      id: "c-amp-compute2",
      prompt: "A tide gauge reads a high of $20$ and a low of $4$. The amplitude $A$ is:",
      choices: [
        { text: "$A = 8$", correct: true, explain: "$A = \\dfrac{20 - 4}{2} = 8$." },
        { text: "$A = 16$", explain: "That is the full range $20 - 4$. The amplitude is half of it." },
        { text: "$A = 12$", explain: "That is the midline $\\dfrac{20 + 4}{2} = 12$. Amplitude uses the difference." },
        { text: "$A = 20$", explain: "Using the peak as the amplitude is the classic trap. Measure from the midline." },
      ],
    },
    {
      id: "c-mid-compute2",
      prompt: "Data swings between a high of $50$ and a low of $20$. The midline $D$ is:",
      choices: [
        { text: "$D = 15$", explain: "That is the amplitude $\\dfrac{50 - 20}{2} = 15$. The midline uses the sum." },
        { text: "$D = 50$", explain: "The max is not the midline. Average the extremes to get $35$." },
        { text: "$D = 35$", correct: true, explain: "$D = \\dfrac{50 + 20}{2} = 35$." },
        { text: "$D = 70$", explain: "That is the sum $50 + 20$. Divide by $2$ to average it, giving $35$." },
      ],
    },
    {
      id: "c-period-def",
      prompt: "In a sinusoidal model, the **period** is:",
      choices: [
        { text: "the horizontal length of one full cycle, such as peak to the next peak", correct: true, explain: "The period is how far along the x-axis the pattern takes to repeat once." },
        { text: "the vertical distance from the lowest point to the highest point", explain: "That is the full swing (twice the amplitude), a vertical measure, not the period." },
        { text: "the height of the midline", explain: "That is $D$. The period measures a horizontal repeat length, not a height." },
        { text: "the value of $B$ in the model", explain: "$B$ comes from the period via $B = \\dfrac{2\\pi}{\\text{period}}$, but $B$ is not itself the period." },
      ],
    },
    {
      id: "c-b-formula",
      prompt: "If the data repeats with period $P$, the coefficient $B$ is:",
      choices: [
        { text: "$B = P$", explain: "That confuses $B$ with the period. $B = \\dfrac{2\\pi}{P}$, not the period itself." },
        { text: "$B = \\dfrac{2\\pi}{P}$", correct: true, explain: "$B$ is set by the period through $B = \\dfrac{2\\pi}{P}$." },
        { text: "$B = \\dfrac{P}{2\\pi}$", explain: "You flipped the fraction. The period is $\\dfrac{2\\pi}{B}$, so $B = \\dfrac{2\\pi}{P}$." },
        { text: "$B = 2\\pi P$", explain: "You multiplied instead of divided. $B = \\dfrac{2\\pi}{P}$." },
      ],
    },
    {
      id: "c-b-compute",
      prompt: "A cycle repeats every $8$ units. What is $B$?",
      choices: [
        { text: "$B = 8$", explain: "That is the period itself. $B = \\dfrac{2\\pi}{\\text{period}}$, not the period." },
        { text: "$B = \\dfrac{\\pi}{8}$", explain: "You used $\\pi$ on top. The numerator is $2\\pi$, giving $\\dfrac{2\\pi}{8} = \\dfrac{\\pi}{4}$." },
        { text: "$B = \\dfrac{4}{\\pi}$", explain: "You flipped the fraction. $B = \\dfrac{2\\pi}{8} = \\dfrac{\\pi}{4}$, not its reciprocal." },
        { text: "$B = \\dfrac{\\pi}{4}$", correct: true, explain: "$B = \\dfrac{2\\pi}{8} = \\dfrac{\\pi}{4}$." },
      ],
    },
    {
      id: "c-b-compute2",
      prompt: "The data repeats every $12$ months. What is $B$?",
      choices: [
        { text: "$B = 12$", explain: "That is the period. $B = \\dfrac{2\\pi}{12}$, not the period itself." },
        { text: "$B = \\dfrac{\\pi}{12}$", explain: "You used $\\pi$ on top. With $2\\pi$ it is $\\dfrac{2\\pi}{12} = \\dfrac{\\pi}{6}$." },
        { text: "$B = \\dfrac{\\pi}{6}$", correct: true, explain: "$B = \\dfrac{2\\pi}{12} = \\dfrac{\\pi}{6}$." },
        { text: "$B = \\dfrac{\\pi}{3}$", explain: "You used half the period ($6$) in the denominator. The period is $12$, so $B = \\dfrac{\\pi}{6}$." },
      ],
    },
    {
      id: "c-b-longer",
      prompt: "Set X repeats every $6$ months. Set Y repeats every $24$ months. Compared with X, the coefficient $B$ for Y is:",
      choices: [
        { text: "larger, because the cycle is longer", explain: "$B$ is inversely related to the period. A longer period makes $B$ smaller, not larger." },
        { text: "smaller, because a longer period means a smaller $B$", correct: true, explain: "$B = \\dfrac{2\\pi}{\\text{period}}$, so a bigger denominator gives a smaller $B$." },
        { text: "the same, because $B$ does not depend on the period", explain: "$B$ depends directly on the period through $B = \\dfrac{2\\pi}{\\text{period}}$." },
      ],
    },
    {
      id: "c-phase-role",
      prompt: "In $y = A\\sin\\!\\big(B(x - C)\\big) + D$, the phase shift $C$ mainly:",
      choices: [
        { text: "slides the curve left or right so its peak lands at the right x-value", correct: true, explain: "$C$ is the horizontal shift that lines the model's peak up with the data's peak." },
        { text: "sets how far the curve swings above and below the midline", explain: "That is the amplitude $A$, not the phase shift." },
        { text: "sets the average value the curve oscillates around", explain: "That is the midline $D$, not the phase shift." },
        { text: "sets how many cycles fit in a given interval", explain: "That is controlled by $B$ and the period, not by $C$." },
      ],
    },
    {
      id: "c-phase-direction",
      prompt: "In $y = A\\sin\\!\\big(B(x - C)\\big) + D$ with $C = 3$, the curve is shifted:",
      choices: [
        { text: "left by $3$", explain: "$x - C$ shifts **right**, not left. $x + C$ would shift left." },
        { text: "up by $3$", explain: "Vertical shifts come from $D$ (added outside), not from $C$ inside the sine." },
        { text: "right by $3$", correct: true, explain: "Subtracting inside, $x - 3$, slides the graph to the right by $3$." },
        { text: "down by $3$", explain: "That is a vertical move from $D$. $C$ shifts horizontally, and $x - 3$ goes right." },
      ],
    },
    {
      id: "c-d-vertical",
      prompt: "Changing only $D$ in $y = A\\sin\\!\\big(B(x - C)\\big) + D$ moves the curve:",
      choices: [
        { text: "left or right", explain: "Horizontal moves come from $C$. $D$ is added at the end, so it moves the curve vertically." },
        { text: "taller or shorter", explain: "Height comes from the amplitude $A$. $D$ only relocates the midline, keeping the shape." },
        { text: "faster or slower", explain: "The cycling speed is set by $B$ and the period. $D$ does not change the period." },
        { text: "straight up or down", correct: true, explain: "$D$ is a vertical shift: it slides the whole curve up or down with no change in shape." },
      ],
    },
  ],
  summit: [
    {
      id: "s-amp-mid",
      prompt: "Sea-surface temperature peaks at $92$ and dips to $8$. The amplitude and midline are:",
      choices: [
        { text: "$A = 42,\\ D = 50$", correct: true, explain: "$A = \\dfrac{92 - 8}{2} = 42$ and $D = \\dfrac{92 + 8}{2} = 50$." },
        { text: "$A = 50,\\ D = 42$", explain: "Swapped: the amplitude uses the difference ($42$) and the midline uses the sum ($50$)." },
        { text: "$A = 84,\\ D = 50$", explain: "$84$ is the full range. The amplitude is half of it, $42$." },
        { text: "$A = 42,\\ D = 92$", explain: "The midline is the average of high and low ($50$), not the max." },
      ],
    },
    {
      id: "s-b-build",
      prompt: "A data set completes one full cycle every $10$ days. What is $B$?",
      choices: [
        { text: "$B = 10$", explain: "That is the period. $B = \\dfrac{2\\pi}{10}$, not the period itself." },
        { text: "$B = \\dfrac{\\pi}{10}$", explain: "You used $\\pi$ on top. With $2\\pi$ it is $\\dfrac{2\\pi}{10} = \\dfrac{\\pi}{5}$." },
        { text: "$B = \\dfrac{\\pi}{5}$", correct: true, explain: "$B = \\dfrac{2\\pi}{10} = \\dfrac{\\pi}{5}$." },
        { text: "$B = \\dfrac{5}{\\pi}$", explain: "You flipped the fraction. $B = \\dfrac{2\\pi}{10} = \\dfrac{\\pi}{5}$, not its reciprocal." },
      ],
    },
    {
      id: "s-period-from-b",
      prompt: "A model has $B = \\dfrac{\\pi}{6}$. What is its **period**?",
      choices: [
        { text: "$P = \\dfrac{\\pi}{6}$", explain: "That is $B$ itself. The period is $\\dfrac{2\\pi}{B}$." },
        { text: "$P = 12$", correct: true, explain: "$P = \\dfrac{2\\pi}{B} = \\dfrac{2\\pi}{\\pi/6} = 12$." },
        { text: "$P = 6$", explain: "You dropped the factor of $2$. $\\dfrac{2\\pi}{\\pi/6} = 12$, not $6$." },
        { text: "$P = \\dfrac{\\pi}{12}$", explain: "That mixes up the relationship. Solve $P = \\dfrac{2\\pi}{B} = 12$." },
      ],
    },
    {
      id: "s-c-solve",
      prompt: "A model has $B = \\dfrac{\\pi}{4}$ and the data peaks at $x = 5$. A sine peaks when its inside equals $\\dfrac{\\pi}{2}$, so solve $\\dfrac{\\pi}{4}(5 - C) = \\dfrac{\\pi}{2}$. Then $C$ is:",
      choices: [
        { text: "$C = 3$", correct: true, explain: "Dividing gives $5 - C = 2$, so $C = 3$." },
        { text: "$C = 7$", explain: "Sign slip: $5 - C = 2$ gives $C = 3$, not $C = 7$." },
        { text: "$C = 2$", explain: "You stopped at $5 - C = 2$. Finish solving for $C$ to get $3$." },
        { text: "$C = 5$", explain: "The peak's x-value is not $C$ itself. The peak sits a quarter period after $x = C$." },
      ],
    },
    {
      id: "s-quarter-period",
      prompt: "A sine model has period $12$ and its data peaks at $x = 10$. Using $C = x_{\\text{peak}} - \\dfrac{P}{4}$, the phase shift is:",
      choices: [
        { text: "$C = 13$", explain: "You added the quarter period. The peak is a quarter period **after** $x = C$, so subtract: $10 - 3 = 7$." },
        { text: "$C = 10$", explain: "The peak is not at $x = C$. It is a quarter period later, so $C = 10 - 3 = 7$." },
        { text: "$C = 4$", explain: "A quarter of $12$ is $3$, not $6$. $C = 10 - 3 = 7$." },
        { text: "$C = 7$", correct: true, explain: "A quarter period is $\\dfrac{12}{4} = 3$, so $C = 10 - 3 = 7$." },
      ],
    },
    {
      id: "s-max-from-model",
      prompt: "A sinusoid is modeled by $y = 20\\sin\\!\\big(\\tfrac{\\pi}{5}(x - 3)\\big) + 55$. Its **maximum** value is:",
      choices: [
        { text: "$55$", explain: "$55$ is the midline. The curve rises a full amplitude above it." },
        { text: "$20$", explain: "$20$ is the amplitude (the swing). The maximum is $D + A = 75$." },
        { text: "$75$", correct: true, explain: "The max is midline plus amplitude: $55 + 20 = 75$." },
        { text: "$35$", explain: "That is $D - A = 35$, the **minimum**, not the maximum." },
      ],
    },
    {
      id: "s-min-from-model",
      prompt: "For the same model $y = 20\\sin\\!\\big(\\tfrac{\\pi}{5}(x - 3)\\big) + 55$, the **minimum** value is:",
      choices: [
        { text: "$35$", correct: true, explain: "The min is midline minus amplitude: $55 - 20 = 35$." },
        { text: "$75$", explain: "That is $D + A$, the maximum. The minimum is $D - A = 35$." },
        { text: "$55$", explain: "That is the midline. The curve dips a full amplitude below it." },
        { text: "$-20$", explain: "Amplitude is a distance below the midline, so the min is $55 - 20 = 35$, not $-20$." },
      ],
    },
    {
      id: "s-interpret-d",
      prompt: "The model $y = 9\\sin\\!\\big(\\tfrac{\\pi}{6}(x - 4)\\big) + 61$ gives a city's average monthly temperature, where $x$ is the month. What does the $61$ tell you?",
      choices: [
        { text: "the hottest monthly temperature", explain: "The hottest is $D + A = 61 + 9 = 70$. The $61$ is the average, not the peak." },
        { text: "the average temperature over the year, the midline the temperatures swing around", correct: true, explain: "$D = 61$ is the midline, the central value the curve oscillates about." },
        { text: "the coldest monthly temperature", explain: "The coldest is $D - A = 61 - 9 = 52$. The $61$ is the midline." },
        { text: "the number of months in a cycle", explain: "The cycle length is the period $\\dfrac{2\\pi}{\\pi/6} = 12$, not the value of $D$." },
      ],
    },
    {
      id: "s-interpret-a",
      prompt: "In the same model $y = 9\\sin\\!\\big(\\tfrac{\\pi}{6}(x - 4)\\big) + 61$, what does the $9$ represent?",
      choices: [
        { text: "the total range from coldest to hottest", explain: "The full range is $2A = 18$. The amplitude is half of that." },
        { text: "the average temperature", explain: "The average is the midline $D = 61$, not the amplitude." },
        { text: "the month when the temperature peaks", explain: "The peak month comes from $C$ and the period, not from the amplitude." },
        { text: "how far the temperature swings above or below the average, half the total range", correct: true, explain: "$A = 9$ is the amplitude, the distance from the midline to a peak or valley." },
      ],
    },
    {
      id: "s-interpret-period",
      prompt: "For that model $y = 9\\sin\\!\\big(\\tfrac{\\pi}{6}(x - 4)\\big) + 61$, the period and its meaning are:",
      choices: [
        { text: "$12$ months, the time for one full temperature cycle", correct: true, explain: "$P = \\dfrac{2\\pi}{\\pi/6} = 12$, so the pattern repeats every $12$ months." },
        { text: "$6$ months", explain: "You dropped the factor of $2$. $\\dfrac{2\\pi}{\\pi/6} = 12$, not $6$." },
        { text: "$\\dfrac{\\pi}{6}$ months", explain: "That is $B$, not the period. The period is $\\dfrac{2\\pi}{B} = 12$." },
        { text: "$61$ months", explain: "$61$ is the midline value, unrelated to the period." },
      ],
    },
    {
      id: "s-read-features",
      prompt: "For $y = 4\\sin\\!\\big(\\tfrac{\\pi}{3}(x - 1)\\big) + 9$, which lists (amplitude, period, midline) correctly?",
      choices: [
        { text: "amplitude $4$, period $\\dfrac{\\pi}{3}$, midline $9$", explain: "$\\dfrac{\\pi}{3}$ is $B$, not the period. The period is $\\dfrac{2\\pi}{\\pi/3} = 6$." },
        { text: "amplitude $9$, period $6$, midline $4$", explain: "Swapped: the coefficient $4$ is the amplitude and the $+9$ is the midline." },
        { text: "amplitude $4$, period $6$, midline $9$", correct: true, explain: "$A = 4$, $P = \\dfrac{2\\pi}{\\pi/3} = 6$, and $D = 9$." },
        { text: "amplitude $8$, period $6$, midline $9$", explain: "The amplitude is the coefficient $4$. $8 = 2A$ is the full range, not the amplitude." },
      ],
    },
    {
      id: "s-period-from-extremes",
      prompt: "Data reaches its peak at month $3$ and its next trough (low) at month $9$. The period is:",
      choices: [
        { text: "$6$", explain: "Peak to the next trough is only **half** a cycle. Double it to get the period, $12$." },
        { text: "$12$", correct: true, explain: "Peak to trough is half a cycle: $9 - 3 = 6$, so the full period is $12$." },
        { text: "$3$", explain: "That is less than half a cycle. Peak to trough spans half a period, so $P = 12$." },
        { text: "$24$", explain: "You doubled twice. Peak to trough is half a period, so $P = 2 \\times 6 = 12$." },
      ],
    },
    {
      id: "s-full-model",
      prompt: "Data has a high of $85$, a low of $35$, a period of $12$, and peaks at month $7$. The full model is:",
      choices: [
        { text: "$y = 85\\sin\\!\\big(\\tfrac{\\pi}{6}(x - 4)\\big) + 60$", explain: "$85$ is the max, not the amplitude. $A = \\dfrac{85 - 35}{2} = 25$." },
        { text: "$y = 25\\sin\\!\\big(12(x - 4)\\big) + 60$", explain: "$12$ is the period, not $B$. $B = \\dfrac{2\\pi}{12} = \\dfrac{\\pi}{6}$." },
        { text: "$y = 25\\sin\\!\\big(\\tfrac{\\pi}{6}(x + 4)\\big) + 60$", explain: "Wrong sign: the peak at month $7$ needs $x - 4$ (a right shift), not $x + 4$." },
        { text: "$y = 25\\sin\\!\\big(\\tfrac{\\pi}{6}(x - 4)\\big) + 60$", correct: true, explain: "$A = 25$, $D = 60$, $B = \\dfrac{2\\pi}{12} = \\dfrac{\\pi}{6}$, and $C = 7 - \\dfrac{12}{4} = 4$." },
      ],
    },
    {
      id: "s-full-model-2",
      prompt: "Data has a high of $26$, a low of $6$, a period of $8$, and peaks at month $4$. The full model is:",
      choices: [
        { text: "$y = 10\\sin\\!\\big(\\tfrac{\\pi}{4}(x - 2)\\big) + 16$", correct: true, explain: "$A = \\dfrac{26 - 6}{2} = 10$, $D = \\dfrac{26 + 6}{2} = 16$, $B = \\dfrac{2\\pi}{8} = \\dfrac{\\pi}{4}$, and $C = 4 - \\dfrac{8}{4} = 2$." },
        { text: "$y = 20\\sin\\!\\big(\\tfrac{\\pi}{4}(x - 2)\\big) + 16$", explain: "$20$ is the full range (max minus min). Halve it for the amplitude, $10$." },
        { text: "$y = 10\\sin\\!\\big(\\tfrac{\\pi}{4}(x - 2)\\big) + 26$", explain: "$26$ is the max, not the midline. The midline is the average $\\dfrac{26 + 6}{2} = 16$." },
        { text: "$y = 10\\sin\\!\\big(8(x - 2)\\big) + 16$", explain: "$8$ is the period, not $B$. Using it as $B$ is the classic mix-up. $B = \\dfrac{\\pi}{4}$." },
      ],
    },
    {
      id: "s-midline-crossing",
      prompt: "For $y = A\\sin\\!\\big(B(x - C)\\big) + D$, the value $x = C$ marks the point where the curve:",
      choices: [
        { text: "reaches its maximum", explain: "The max is a quarter period **after** $x = C$. At $x = C$ the curve is only at the midline." },
        { text: "reaches its minimum", explain: "The min is three quarters of a period after $x = C$. At $x = C$ the curve is at the midline, rising." },
        { text: "crosses the midline while **rising**", correct: true, explain: "At $x = C$ the inside is $0$, so $\\sin = 0$ and increasing: the curve sits on the midline heading up." },
        { text: "crosses the midline while **falling**", explain: "The rising crossing is at $x = C$. The falling crossing comes half a period later." },
      ],
    },
  ],
};
