import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Degree-radian conversion".
 * Grounded in the lesson: the bridge is $180^\circ = \pi$. A full turn is
 * $2\pi$. Degrees to radians multiplies by $\dfrac{\pi}{180^\circ}$. Radians to
 * degrees multiplies by $\dfrac{180^\circ}{\pi}$. Then reduce the fraction and
 * let the units cancel. Distractors are the classic traps: the flipped factor,
 * a skipped reduction, a stray or missing $\pi$, off-by neighbors, and treating
 * a degree count and a radian count as interchangeable numbers.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-bridge",
      prompt: "The **bridge** behind every conversion: $180^\\circ$ equals how many radians?",
      choices: [
        { text: "$\\pi$", correct: true, explain: "A full turn is $360^\\circ = 2\\pi$, so half a turn is $180^\\circ = \\pi$. This one fact drives every conversion." },
        { text: "$2\\pi$", explain: "$2\\pi$ is a whole turn, $360^\\circ$, not a half turn." },
        { text: "$\\dfrac{\\pi}{2}$", explain: "$\\dfrac{\\pi}{2}$ is a right angle, $90^\\circ$, which is half of $180^\\circ$." },
        { text: "$90$", explain: "That is a degree count, not radians. A straight angle is $\\pi$ radians." },
      ],
    },
    {
      id: "c-full",
      prompt: "A full turn all the way around is $360^\\circ$. In radians that is:",
      choices: [
        { text: "$\\pi$", explain: "$\\pi$ is only half a turn, $180^\\circ$." },
        { text: "$2\\pi$", correct: true, explain: "One trip around sweeps the whole circumference, $2\\pi$ radii of arc, so $360^\\circ = 2\\pi$." },
        { text: "$4\\pi$", explain: "$4\\pi$ is two full turns. Once around is $2\\pi$." },
        { text: "$\\dfrac{\\pi}{2}$", explain: "$\\dfrac{\\pi}{2}$ is a right angle, $90^\\circ$, far short of a full turn." },
      ],
    },
    {
      id: "c-right",
      prompt: "How many radians is a right angle, $90^\\circ$?",
      choices: [
        { text: "$\\dfrac{\\pi}{4}$", explain: "$\\dfrac{\\pi}{4} = 45^\\circ$, which is half of a right angle." },
        { text: "$\\pi$", explain: "$\\pi = 180^\\circ$, a straight angle, not a right angle." },
        { text: "$\\dfrac{\\pi}{2}$", correct: true, explain: "$90^\\circ$ is half of $180^\\circ = \\pi$, so it is $\\dfrac{\\pi}{2}$." },
        { text: "$\\dfrac{\\pi}{3}$", explain: "$\\dfrac{\\pi}{3} = 60^\\circ$, not $90^\\circ$." },
      ],
    },
    {
      id: "c-d2r-factor",
      prompt: "To convert **degrees to radians**, multiply by which factor?",
      choices: [
        { text: "$\\dfrac{\\pi}{180^\\circ}$", correct: true, explain: "The degree unit on the bottom cancels the degrees, and since $180^\\circ = \\pi$ this factor equals $1$: it swaps units without changing the angle." },
        { text: "$\\dfrac{180^\\circ}{\\pi}$", explain: "That is the reverse factor. It turns radians into degrees, not the other way." },
        { text: "$2\\pi$", explain: "Multiplying by $2\\pi$ scales the angle, it does not convert the units." },
        { text: "$\\pi$", explain: "Multiplying by $\\pi$ alone never cancels the degree unit." },
      ],
    },
    {
      id: "c-30",
      prompt: "Convert $30^\\circ$ to radians.",
      choices: [
        { text: "$\\dfrac{\\pi}{3}$", explain: "$\\dfrac{\\pi}{3} = 60^\\circ$. Here $30 \\cdot \\dfrac{\\pi}{180} = \\dfrac{\\pi}{6}$, not $\\dfrac{\\pi}{3}$." },
        { text: "$\\dfrac{\\pi}{2}$", explain: "$\\dfrac{\\pi}{2} = 90^\\circ$, far more than $30^\\circ$." },
        { text: "$\\dfrac{\\pi}{30}$", explain: "Stray slip: you multiply by $\\dfrac{\\pi}{180}$, so $\\dfrac{30\\pi}{180} = \\dfrac{\\pi}{6}$, not $\\dfrac{\\pi}{30}$." },
        { text: "$\\dfrac{\\pi}{6}$", correct: true, explain: "$30 \\cdot \\dfrac{\\pi}{180} = \\dfrac{30\\pi}{180} = \\dfrac{\\pi}{6}$." },
      ],
    },
    {
      id: "c-45",
      prompt: "Convert $45^\\circ$ to radians.",
      choices: [
        { text: "$\\dfrac{\\pi}{2}$", explain: "$\\dfrac{\\pi}{2} = 90^\\circ$, which is double $45^\\circ$." },
        { text: "$\\dfrac{\\pi}{4}$", correct: true, explain: "$45 \\cdot \\dfrac{\\pi}{180} = \\dfrac{45\\pi}{180} = \\dfrac{\\pi}{4}$." },
        { text: "$\\dfrac{\\pi}{6}$", explain: "$\\dfrac{\\pi}{6} = 30^\\circ$, not $45^\\circ$." },
        { text: "$\\dfrac{\\pi}{45}$", explain: "Multiply by $\\dfrac{\\pi}{180}$, not $\\dfrac{\\pi}{45}$: $\\dfrac{45\\pi}{180} = \\dfrac{\\pi}{4}$." },
      ],
    },
    {
      id: "c-60",
      prompt: "Convert $60^\\circ$ to radians.",
      choices: [
        { text: "$\\dfrac{\\pi}{6}$", explain: "Classic off-by mix-up: $\\dfrac{\\pi}{6} = 30^\\circ$. Since $60$ is one third of $180$, $60^\\circ = \\dfrac{\\pi}{3}$." },
        { text: "$\\dfrac{\\pi}{2}$", explain: "$\\dfrac{\\pi}{2} = 90^\\circ$, not $60^\\circ$." },
        { text: "$\\dfrac{\\pi}{3}$", correct: true, explain: "$60 \\cdot \\dfrac{\\pi}{180} = \\dfrac{60\\pi}{180} = \\dfrac{\\pi}{3}$." },
        { text: "$\\dfrac{2\\pi}{3}$", explain: "$\\dfrac{2\\pi}{3} = 120^\\circ$, double the target angle." },
      ],
    },
    {
      id: "c-120",
      prompt: "Convert $120^\\circ$ to radians, **fully reduced**.",
      choices: [
        { text: "$\\dfrac{120\\pi}{180}$", explain: "Correct before reducing, but you must simplify: $\\gcd(120, 180) = 60$ gives $\\dfrac{2\\pi}{3}$." },
        { text: "$\\dfrac{\\pi}{3}$", explain: "$\\dfrac{\\pi}{3} = 60^\\circ$. You divided the fraction too far." },
        { text: "$\\dfrac{3\\pi}{2}$", explain: "$\\dfrac{3\\pi}{2} = 270^\\circ$, not $120^\\circ$." },
        { text: "$\\dfrac{2\\pi}{3}$", correct: true, explain: "$\\dfrac{120\\pi}{180} = \\dfrac{2\\pi}{3}$ after dividing top and bottom by $60$." },
      ],
    },
    {
      id: "c-r2d-factor",
      prompt: "To convert **radians to degrees**, multiply by which factor?",
      choices: [
        { text: "$\\dfrac{\\pi}{180^\\circ}$", explain: "That is the reverse factor. It turns degrees into radians." },
        { text: "$\\dfrac{180^\\circ}{\\pi}$", correct: true, explain: "With $\\pi$ on the bottom, the radian $\\pi$ cancels and degrees are left behind." },
        { text: "$\\dfrac{1}{2\\pi}$", explain: "Dividing by $2\\pi$ does not produce degrees. You need $\\dfrac{180^\\circ}{\\pi}$." },
        { text: "$360^\\circ$", explain: "Multiplying by $360^\\circ$ scales the angle rather than converting it." },
      ],
    },
    {
      id: "c-pi6",
      prompt: "Convert $\\dfrac{\\pi}{6}$ to degrees.",
      choices: [
        { text: "$30^\\circ$", correct: true, explain: "$\\dfrac{\\pi}{6} \\cdot \\dfrac{180^\\circ}{\\pi} = \\dfrac{180^\\circ}{6} = 30^\\circ$." },
        { text: "$60^\\circ$", explain: "$60^\\circ = \\dfrac{\\pi}{3}$, which is $\\dfrac{180}{3}$. But $\\dfrac{\\pi}{6}$ gives $\\dfrac{180}{6} = 30^\\circ$." },
        { text: "$6^\\circ$", explain: "Do not just copy the $6$: multiply by $\\dfrac{180^\\circ}{\\pi}$ to get $\\dfrac{180}{6} = 30^\\circ$." },
        { text: "$180^\\circ$", explain: "That drops the $6$ entirely. $\\dfrac{\\pi}{6}$ is one sixth of $\\pi = 180^\\circ$, so $30^\\circ$." },
      ],
    },
    {
      id: "c-pi3",
      prompt: "Convert $\\dfrac{\\pi}{3}$ to degrees.",
      choices: [
        { text: "$30^\\circ$", explain: "$30^\\circ = \\dfrac{\\pi}{6}$. Here $\\dfrac{180}{3} = 60^\\circ$." },
        { text: "$90^\\circ$", explain: "$90^\\circ = \\dfrac{\\pi}{2}$, not $\\dfrac{\\pi}{3}$." },
        { text: "$60^\\circ$", correct: true, explain: "$\\dfrac{\\pi}{3} \\cdot \\dfrac{180^\\circ}{\\pi} = \\dfrac{180^\\circ}{3} = 60^\\circ$." },
        { text: "$120^\\circ$", explain: "$120^\\circ = \\dfrac{2\\pi}{3}$. You doubled the numerator." },
      ],
    },
    {
      id: "c-pi2",
      prompt: "Convert $\\dfrac{\\pi}{2}$ to degrees.",
      choices: [
        { text: "$45^\\circ$", explain: "$45^\\circ = \\dfrac{\\pi}{4}$. Here $\\dfrac{180}{2} = 90^\\circ$." },
        { text: "$90^\\circ$", correct: true, explain: "$\\dfrac{\\pi}{2} \\cdot \\dfrac{180^\\circ}{\\pi} = \\dfrac{180^\\circ}{2} = 90^\\circ$." },
        { text: "$180^\\circ$", explain: "$180^\\circ = \\pi$. Dividing by $2$ gives $90^\\circ$." },
        { text: "$60^\\circ$", explain: "$60^\\circ = \\dfrac{\\pi}{3}$, not $\\dfrac{\\pi}{2}$." },
      ],
    },
    {
      id: "c-3pi4",
      prompt: "Convert $\\dfrac{3\\pi}{4}$ to degrees.",
      choices: [
        { text: "$45^\\circ$", explain: "That is $\\dfrac{\\pi}{4}$. You dropped the $3$ on top. Multiply it back: $3 \\times 45^\\circ = 135^\\circ$." },
        { text: "$120^\\circ$", explain: "$120^\\circ = \\dfrac{2\\pi}{3}$, a different angle." },
        { text: "$105^\\circ$", explain: "Multiply, do not add: $3 \\times 45^\\circ = 135^\\circ$, not $45 + 60$." },
        { text: "$135^\\circ$", correct: true, explain: "$\\dfrac{3\\pi}{4} \\cdot \\dfrac{180^\\circ}{\\pi} = \\dfrac{3 \\times 180^\\circ}{4} = 3 \\times 45^\\circ = 135^\\circ$." },
      ],
    },
    {
      id: "c-150",
      prompt: "Convert $150^\\circ$ to radians, **fully reduced**.",
      choices: [
        { text: "$\\dfrac{5\\pi}{6}$", correct: true, explain: "$\\dfrac{150\\pi}{180} = \\dfrac{5\\pi}{6}$ after dividing top and bottom by $30$." },
        { text: "$\\dfrac{\\pi}{6}$", explain: "$\\dfrac{\\pi}{6} = 30^\\circ$. You reduced away the $5$." },
        { text: "$\\dfrac{6\\pi}{5}$", explain: "You flipped the fraction: $\\dfrac{150}{180} = \\dfrac{5}{6}$, so $\\dfrac{5\\pi}{6}$." },
        { text: "$\\dfrac{150\\pi}{180}$", explain: "Right idea, but reduce it: $\\gcd(150, 180) = 30$ gives $\\dfrac{5\\pi}{6}$." },
      ],
    },
    {
      id: "c-identity",
      prompt: "In the factor $\\dfrac{\\pi}{180^\\circ}$, why does multiplying by it leave the angle's actual size unchanged?",
      choices: [
        { text: "Because $\\pi$ is about $3.14$, a small number.", explain: "The size of $\\pi$ is not the reason. The factor works because it equals $1$." },
        { text: "Because every angle is a whole multiple of $\\pi$.", explain: "Not every angle is a multiple of $\\pi$. The factor works because it equals $1$." },
        { text: "Because $180^\\circ = \\pi$, so the fraction equals $1$.", correct: true, explain: "A fraction with an equal top and bottom is $1$, and multiplying by $1$ only swaps the units." },
        { text: "Because degrees and radians are the same size.", explain: "They are different-sized units. The factor converts between them precisely because $180^\\circ = \\pi$." },
      ],
    },
  ],
  summit: [
    {
      id: "s-225",
      prompt: "Convert $225^\\circ$ to radians, **fully reduced**.",
      choices: [
        { text: "$\\dfrac{225\\pi}{180}$", explain: "Correct value before reducing. Divide top and bottom by $45$ to reach $\\dfrac{5\\pi}{4}$." },
        { text: "$\\dfrac{5\\pi}{4}$", correct: true, explain: "$\\dfrac{225\\pi}{180} = \\dfrac{5\\pi}{4}$ after dividing by $\\gcd(225, 180) = 45$." },
        { text: "$\\dfrac{4\\pi}{5}$", explain: "Flipped fraction: $\\dfrac{225}{180} = \\dfrac{5}{4}$, so $\\dfrac{5\\pi}{4}$." },
        { text: "$\\dfrac{5\\pi}{6}$", explain: "$\\dfrac{5\\pi}{6} = 150^\\circ$. That reduces $225$ incorrectly." },
      ],
    },
    {
      id: "s-270",
      prompt: "Convert $270^\\circ$ to radians, **fully reduced**.",
      choices: [
        { text: "$\\dfrac{2\\pi}{3}$", explain: "$\\dfrac{2\\pi}{3} = 120^\\circ$. You flipped $\\dfrac{3}{2}$ into $\\dfrac{2}{3}$." },
        { text: "$\\dfrac{270\\pi}{180}$", explain: "Right value, not reduced: $\\gcd(270, 180) = 90$ gives $\\dfrac{3\\pi}{2}$." },
        { text: "$\\dfrac{\\pi}{2}$", explain: "$\\dfrac{\\pi}{2} = 90^\\circ$. You reduced away the $3$." },
        { text: "$\\dfrac{3\\pi}{2}$", correct: true, explain: "$\\dfrac{270\\pi}{180} = \\dfrac{3\\pi}{2}$ after dividing top and bottom by $90$." },
      ],
    },
    {
      id: "s-330",
      prompt: "Convert $330^\\circ$ to radians, **fully reduced**.",
      choices: [
        { text: "$\\dfrac{11\\pi}{6}$", correct: true, explain: "$\\dfrac{330\\pi}{180} = \\dfrac{11\\pi}{6}$ after dividing top and bottom by $30$." },
        { text: "$\\dfrac{5\\pi}{6}$", explain: "$\\dfrac{5\\pi}{6} = 150^\\circ$. You reduced $330$ as if it were $150$." },
        { text: "$\\dfrac{6\\pi}{11}$", explain: "Flipped fraction: $\\dfrac{330}{180} = \\dfrac{11}{6}$, so $\\dfrac{11\\pi}{6}$." },
        { text: "$\\dfrac{11\\pi}{12}$", explain: "You reduced only the top. $\\dfrac{330}{180}$ becomes $\\dfrac{11}{6}$, not $\\dfrac{11}{12}$." },
      ],
    },
    {
      id: "s-7pi6",
      prompt: "Convert $\\dfrac{7\\pi}{6}$ to degrees.",
      choices: [
        { text: "$150^\\circ$", explain: "$150^\\circ = \\dfrac{5\\pi}{6}$. You used $5$ on top instead of $7$." },
        { text: "$240^\\circ$", explain: "$240^\\circ = \\dfrac{4\\pi}{3}$, a different angle." },
        { text: "$210^\\circ$", correct: true, explain: "$\\dfrac{7\\pi}{6} \\cdot \\dfrac{180^\\circ}{\\pi} = 7 \\times 30^\\circ = 210^\\circ$." },
        { text: "$70^\\circ$", explain: "Do not just keep the $7$. Multiply by $\\dfrac{180^\\circ}{\\pi}$: $7 \\times 30^\\circ = 210^\\circ$." },
      ],
    },
    {
      id: "s-4pi3",
      prompt: "Convert $\\dfrac{4\\pi}{3}$ to degrees.",
      choices: [
        { text: "$120^\\circ$", explain: "$120^\\circ = \\dfrac{2\\pi}{3}$. You halved the numerator." },
        { text: "$210^\\circ$", explain: "$210^\\circ = \\dfrac{7\\pi}{6}$, not $\\dfrac{4\\pi}{3}$." },
        { text: "$270^\\circ$", explain: "$270^\\circ = \\dfrac{3\\pi}{2}$, a different angle." },
        { text: "$240^\\circ$", correct: true, explain: "$\\dfrac{4\\pi}{3} \\cdot \\dfrac{180^\\circ}{\\pi} = 4 \\times 60^\\circ = 240^\\circ$." },
      ],
    },
    {
      id: "s-5pi3",
      prompt: "Convert $\\dfrac{5\\pi}{3}$ to degrees.",
      choices: [
        { text: "$300^\\circ$", correct: true, explain: "$\\dfrac{5\\pi}{3} \\cdot \\dfrac{180^\\circ}{\\pi} = 5 \\times 60^\\circ = 300^\\circ$." },
        { text: "$150^\\circ$", explain: "$150^\\circ = \\dfrac{5\\pi}{6}$. That has a $6$ on the bottom, not a $3$." },
        { text: "$200^\\circ$", explain: "Multiply, do not add: $5 \\times 60^\\circ = 300^\\circ$." },
        { text: "$100^\\circ$", explain: "$\\dfrac{180}{3} = 60$, then times $5$ is $300^\\circ$, not $100^\\circ$." },
      ],
    },
    {
      id: "s-15",
      prompt: "Convert $15^\\circ$ to radians, **fully reduced**.",
      choices: [
        { text: "$\\dfrac{\\pi}{15}$", explain: "Multiply by $\\dfrac{\\pi}{180}$: $\\dfrac{15\\pi}{180} = \\dfrac{\\pi}{12}$, not $\\dfrac{\\pi}{15}$." },
        { text: "$\\dfrac{\\pi}{12}$", correct: true, explain: "$\\dfrac{15\\pi}{180} = \\dfrac{\\pi}{12}$ after dividing top and bottom by $15$." },
        { text: "$\\dfrac{\\pi}{6}$", explain: "$\\dfrac{\\pi}{6} = 30^\\circ$, which is double $15^\\circ$." },
        { text: "$\\dfrac{15\\pi}{180}$", explain: "Correct before reducing. Divide by $15$ to get $\\dfrac{\\pi}{12}$." },
      ],
    },
    {
      id: "s-72",
      prompt: "Convert $72^\\circ$ to radians, **fully reduced**.",
      choices: [
        { text: "$\\dfrac{\\pi}{5}$", explain: "$\\dfrac{\\pi}{5} = 36^\\circ$. You divided too far. $\\dfrac{72}{180} = \\dfrac{2}{5}$." },
        { text: "$\\dfrac{72\\pi}{180}$", explain: "Right value, not reduced: $\\gcd(72, 180) = 36$ gives $\\dfrac{2\\pi}{5}$." },
        { text: "$\\dfrac{2\\pi}{5}$", correct: true, explain: "$\\dfrac{72\\pi}{180} = \\dfrac{2\\pi}{5}$ after dividing top and bottom by $36$." },
        { text: "$\\dfrac{5\\pi}{2}$", explain: "Flipped fraction: $\\dfrac{72}{180} = \\dfrac{2}{5}$, so $\\dfrac{2\\pi}{5}$." },
      ],
    },
    {
      id: "s-5pi12",
      prompt: "Convert $\\dfrac{5\\pi}{12}$ to degrees.",
      choices: [
        { text: "$60^\\circ$", explain: "$60^\\circ = \\dfrac{\\pi}{3}$. Here $\\dfrac{180}{12} = 15$, then times $5$ is $75^\\circ$." },
        { text: "$150^\\circ$", explain: "$150^\\circ = \\dfrac{5\\pi}{6}$. You used $6$ on the bottom, not $12$." },
        { text: "$17^\\circ$", explain: "Multiply, do not add: $5 \\times 15^\\circ = 75^\\circ$, not $12 + 5$." },
        { text: "$75^\\circ$", correct: true, explain: "$\\dfrac{5\\pi}{12} \\cdot \\dfrac{180^\\circ}{\\pi} = 5 \\times 15^\\circ = 75^\\circ$." },
      ],
    },
    {
      id: "s-wrongfactor",
      prompt: "A student converts $90^\\circ$ to radians by multiplying by $\\dfrac{180^\\circ}{\\pi}$. What went wrong?",
      choices: [
        { text: "They used the reverse factor. Degrees to radians needs $\\dfrac{\\pi}{180^\\circ}$, giving $\\dfrac{\\pi}{2}$.", correct: true, explain: "$\\dfrac{180^\\circ}{\\pi}$ turns radians into degrees. The other direction uses $\\dfrac{\\pi}{180^\\circ}$: $90 \\cdot \\dfrac{\\pi}{180} = \\dfrac{\\pi}{2}$." },
        { text: "Nothing. $90^\\circ$ really is $\\dfrac{180}{\\pi}$ radians.", explain: "That factor leaves the degree unit uncancelled and gives a huge number, not the tidy $\\dfrac{\\pi}{2}$." },
        { text: "They should have multiplied by $2\\pi$ instead.", explain: "$2\\pi$ scales the angle rather than converting units. The right factor is $\\dfrac{\\pi}{180^\\circ}$." },
        { text: "They forgot to reduce the final fraction.", explain: "The problem is the flipped factor itself, not a missed reduction." },
      ],
    },
    {
      id: "s-reduce",
      prompt: "Multiplying gives $135^\\circ \\cdot \\dfrac{\\pi}{180^\\circ} = \\dfrac{135\\pi}{180}$. Which is the **fully reduced** answer?",
      choices: [
        { text: "$\\dfrac{27\\pi}{36}$", explain: "Only partly reduced (you divided by $5$). Keep going: $\\dfrac{27}{36} = \\dfrac{3}{4}$." },
        { text: "$\\dfrac{135\\pi}{180}$", explain: "Not reduced at all. $\\gcd(135, 180) = 45$ gives $\\dfrac{3\\pi}{4}$." },
        { text: "$\\dfrac{3\\pi}{4}$", correct: true, explain: "Divide top and bottom by $45$: $\\dfrac{135}{180} = \\dfrac{3}{4}$, so $\\dfrac{3\\pi}{4}$." },
        { text: "$\\dfrac{4\\pi}{3}$", explain: "Flipped fraction: $\\dfrac{135}{180} = \\dfrac{3}{4}$, so $\\dfrac{3\\pi}{4}$." },
      ],
    },
    {
      id: "s-compare",
      prompt: "Which is the **larger** angle, $\\pi$ radians or $150^\\circ$?",
      choices: [
        { text: "$150^\\circ$, since $\\pi \\approx 3.14$ is much smaller than $150$.", explain: "Trap: you cannot compare a radian count to a degree count as raw numbers. Convert first: $\\pi = 180^\\circ$." },
        { text: "$\\pi$ radians, because $\\pi = 180^\\circ$, which is more than $150^\\circ$.", correct: true, explain: "Put both in the same unit first: $\\pi$ radians is $180^\\circ$, which beats $150^\\circ$." },
        { text: "They are equal.", explain: "$\\pi = 180^\\circ$, not $150^\\circ$, so they are not equal." },
        { text: "It cannot be determined.", explain: "It can: once both are in one unit, $\\pi = 180^\\circ > 150^\\circ$." },
      ],
    },
    {
      id: "s-equal-pi3",
      prompt: "Which angle is exactly equal to $\\dfrac{\\pi}{3}$ radians?",
      choices: [
        { text: "$30^\\circ$", explain: "$30^\\circ = \\dfrac{\\pi}{6}$, half of $\\dfrac{\\pi}{3}$." },
        { text: "$120^\\circ$", explain: "$120^\\circ = \\dfrac{2\\pi}{3}$, double $\\dfrac{\\pi}{3}$." },
        { text: "$90^\\circ$", explain: "$90^\\circ = \\dfrac{\\pi}{2}$, not $\\dfrac{\\pi}{3}$." },
        { text: "$60^\\circ$", correct: true, explain: "$\\dfrac{\\pi}{3} \\cdot \\dfrac{180^\\circ}{\\pi} = 60^\\circ$." },
      ],
    },
    {
      id: "s-stray-pi",
      prompt: "Convert $\\dfrac{\\pi}{4}$ to degrees. Watch what happens to the $\\pi$.",
      choices: [
        { text: "$45^\\circ$", correct: true, explain: "$\\dfrac{\\pi}{4} \\cdot \\dfrac{180^\\circ}{\\pi} = \\dfrac{180^\\circ}{4} = 45^\\circ$. The $\\pi$ cancels, so none is left." },
        { text: "$45\\pi^\\circ$", explain: "Stray $\\pi$: the $\\pi$ on top cancels the $\\pi$ in $\\dfrac{180^\\circ}{\\pi}$, leaving a plain $45^\\circ$." },
        { text: "$90^\\circ$", explain: "$90^\\circ = \\dfrac{\\pi}{2}$. Here $\\dfrac{180}{4} = 45^\\circ$." },
        { text: "$60^\\circ$", explain: "$60^\\circ = \\dfrac{\\pi}{3}$, not $\\dfrac{\\pi}{4}$." },
      ],
    },
    {
      id: "s-540",
      prompt: "A wheel turns through $540^\\circ$. In radians, **fully reduced**, that is:",
      choices: [
        { text: "$\\dfrac{3\\pi}{2}$", explain: "$\\dfrac{3\\pi}{2} = 270^\\circ$. Here $\\dfrac{540}{180} = 3$, so $3\\pi$." },
        { text: "$\\dfrac{540\\pi}{180}$", explain: "Correct before reducing. $\\dfrac{540}{180} = 3$, so this is just $3\\pi$." },
        { text: "$3\\pi$", correct: true, explain: "$540 \\cdot \\dfrac{\\pi}{180} = \\dfrac{540\\pi}{180} = 3\\pi$, which is one and a half turns." },
        { text: "$\\dfrac{\\pi}{3}$", explain: "You flipped it: $\\dfrac{540}{180} = 3$, giving $3\\pi$, not $\\dfrac{\\pi}{3}$." },
      ],
    },
  ],
};
