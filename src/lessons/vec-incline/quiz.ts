import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Decomposition on inclines".
 * Grounded in the lesson: a straight-down weight W on a ramp at angle alpha
 * resolves into an along-incline part W sin(alpha) (down the slope) and an
 * into-surface part W cos(alpha) (which the normal force balances, N = W cos alpha).
 * The two parts are perpendicular and recombine to W by the Pythagorean theorem.
 * Distractors are the classic traps: swapping sine and cosine, using N = W,
 * adding the components as plain magnitudes, and the wrong steepness behavior.
 * Clean angles: 3-4-5 (sin = 0.6, cos = 0.8), 30, 45, 60 degrees.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-down",
      prompt: "A block rests on a ramp tilted at angle $\\alpha$. In which direction does its weight $W$ point?",
      choices: [
        { text: "Straight down toward the ground.", correct: true, explain: "Gravity always pulls straight down, the vector $(0,-W)$, no matter the ramp." },
        { text: "Down along the ramp surface.", explain: "That is only the along-incline component of $W$, not the whole weight." },
        { text: "Perpendicular to the ramp surface.", explain: "That is the into-surface component of $W$, not the whole weight." },
        { text: "It changes direction as $\\alpha$ changes.", explain: "The direction of gravity is fixed. Only how it splits changes." },
      ],
    },
    {
      id: "c-sine",
      prompt: "Which part of the weight equals $W\\sin\\alpha$?",
      choices: [
        { text: "The into-surface (perpendicular) part.", explain: "That part is adjacent to $\\alpha$, so it uses cosine: $W\\cos\\alpha$." },
        { text: "The normal force $N$.", explain: "The normal force balances the perpendicular part, $N = W\\cos\\alpha$." },
        { text: "The along-incline (down-slope) part.", correct: true, explain: "It is opposite $\\alpha$, so it uses sine: $W\\sin\\alpha$." },
        { text: "The full weight $W$.", explain: "The full weight is the hypotenuse. $W\\sin\\alpha$ is only one leg." },
      ],
    },
    {
      id: "c-cosine",
      prompt: "Which part of the weight equals $W\\cos\\alpha$?",
      choices: [
        { text: "The along-incline (down-slope) part.", explain: "That part is opposite $\\alpha$, so it uses sine, not cosine." },
        { text: "The into-surface (perpendicular) part.", correct: true, explain: "It is adjacent to $\\alpha$, so it uses cosine." },
        { text: "There is no $W\\cos\\alpha$ on an incline.", explain: "The perpendicular component is exactly $W\\cos\\alpha$." },
        { text: "The weight $W$ itself.", explain: "$W$ is the hypotenuse of the force triangle, not a single component." },
      ],
    },
    {
      id: "c-normal",
      prompt: "On a frictionless incline at angle $\\alpha$, the normal force $N$ equals:",
      choices: [
        { text: "$W$", explain: "That holds only when $\\alpha = 0$ (a flat surface)." },
        { text: "$W\\sin\\alpha$", explain: "That is the along-incline component, not what the surface supports." },
        { text: "$W\\tan\\alpha$", explain: "Tangent does not appear here. The perpendicular part uses cosine." },
        { text: "$W\\cos\\alpha$", correct: true, explain: "$N$ balances the into-surface component $W\\cos\\alpha$." },
      ],
    },
    {
      id: "c-along30",
      prompt: "A block of weight $W = 10$ is on a $30^\\circ$ ramp. The along-incline component $W\\sin\\alpha$ is:",
      choices: [
        { text: "$10$", explain: "That would need $\\sin\\alpha = 1$, i.e. $\\alpha = 90^\\circ$." },
        { text: "$5$", correct: true, explain: "$10\\sin 30^\\circ = 10(0.5) = 5$." },
        { text: "$5\\sqrt{3} \\approx 8.66$", explain: "That is $10\\cos 30^\\circ$, the perpendicular part." },
        { text: "$0$", explain: "The along-incline part is zero only on a flat ramp, $\\alpha = 0$." },
      ],
    },
    {
      id: "c-normal30",
      prompt: "Same $30^\\circ$ ramp, $W = 10$. The into-surface component $W\\cos\\alpha$ is:",
      choices: [
        { text: "$5$", explain: "That is $10\\sin 30^\\circ$, the along-incline part." },
        { text: "$10$", explain: "That would need $\\cos\\alpha = 1$, a flat ramp." },
        { text: "$5\\sqrt{3} \\approx 8.66$", correct: true, explain: "$10\\cos 30^\\circ = 10\\cdot\\tfrac{\\sqrt{3}}{2} = 5\\sqrt{3}$." },
        { text: "$\\tfrac{\\sqrt{3}}{2}$", explain: "That is $\\cos 30^\\circ$ alone. Multiply by $W = 10$." },
      ],
    },
    {
      id: "c-along60",
      prompt: "A $60^\\circ$ ramp, $W = 10$. The along-incline component $W\\sin\\alpha$ is:",
      choices: [
        { text: "$5\\sqrt{3} \\approx 8.66$", correct: true, explain: "$10\\sin 60^\\circ = 10\\cdot\\tfrac{\\sqrt{3}}{2} = 5\\sqrt{3}$." },
        { text: "$5$", explain: "That is $10\\cos 60^\\circ$, the perpendicular part." },
        { text: "$10$", explain: "That needs $\\sin\\alpha = 1$, i.e. $\\alpha = 90^\\circ$." },
        { text: "$\\tfrac{\\sqrt{3}}{2}$", explain: "That is $\\sin 60^\\circ$ alone. Multiply by $W = 10$." },
      ],
    },
    {
      id: "c-normal60",
      prompt: "A $60^\\circ$ ramp, $W = 10$. The normal force $N = W\\cos\\alpha$ is:",
      choices: [
        { text: "$5\\sqrt{3} \\approx 8.66$", explain: "That is $10\\sin 60^\\circ$, the along-incline part." },
        { text: "$10$", explain: "The surface supports the full weight only when $\\alpha = 0$." },
        { text: "$0$", explain: "The perpendicular part is zero only at $\\alpha = 90^\\circ$." },
        { text: "$5$", correct: true, explain: "$10\\cos 60^\\circ = 10(0.5) = 5$." },
      ],
    },
    {
      id: "c-345-along",
      prompt: "On the 3-4-5 ramp ($\\sin\\alpha = \\tfrac{3}{5}$, $\\cos\\alpha = \\tfrac{4}{5}$) a block has $W = 10$. The along-incline component is:",
      choices: [
        { text: "$8$", explain: "That is $W\\cos\\alpha = 10\\cdot\\tfrac{4}{5}$, the perpendicular part." },
        { text: "$3$", explain: "That is the rise $3$, not $W\\sin\\alpha = 10\\cdot\\tfrac{3}{5} = 6$." },
        { text: "$6$", correct: true, explain: "$W\\sin\\alpha = 10\\cdot\\tfrac{3}{5} = 6$." },
        { text: "$10$", explain: "That is the whole weight, the hypotenuse of the force triangle." },
      ],
    },
    {
      id: "c-345-normal",
      prompt: "Same 3-4-5 ramp, $W = 10$. The into-surface component $W\\cos\\alpha$ is:",
      choices: [
        { text: "$8$", correct: true, explain: "$W\\cos\\alpha = 10\\cdot\\tfrac{4}{5} = 8$." },
        { text: "$6$", explain: "That is $W\\sin\\alpha$, the along-incline part." },
        { text: "$4$", explain: "That is the run $4$, not $10\\cdot\\tfrac{4}{5} = 8$." },
        { text: "$10$", explain: "The full weight is the hypotenuse, not the perpendicular leg." },
      ],
    },
    {
      id: "c-steeper-along",
      prompt: "As a ramp gets steeper (larger $\\alpha$), the along-incline component $W\\sin\\alpha$:",
      choices: [
        { text: "decreases toward $0$.", explain: "Sine increases from $0^\\circ$ to $90^\\circ$, so this part grows." },
        { text: "increases toward $W$.", correct: true, explain: "$\\sin\\alpha$ rises to $1$ at $90^\\circ$, so $W\\sin\\alpha \\to W$." },
        { text: "stays the same.", explain: "It depends on $\\alpha$ through $\\sin\\alpha$, so it changes." },
        { text: "becomes negative.", explain: "This component's magnitude stays between $0$ and $W$." },
      ],
    },
    {
      id: "c-steeper-normal",
      prompt: "As a ramp gets steeper (larger $\\alpha$), the normal force $W\\cos\\alpha$:",
      choices: [
        { text: "decreases toward $0$.", correct: true, explain: "Cosine falls from $1$ to $0$ as $\\alpha$ goes $0^\\circ$ to $90^\\circ$." },
        { text: "increases toward $W$.", explain: "Cosine shrinks as the ramp steepens, so $N$ drops." },
        { text: "stays equal to $W$.", explain: "$N = W$ only on a flat ramp, $\\alpha = 0$." },
        { text: "grows without bound.", explain: "$N$ never exceeds the weight $W$." },
      ],
    },
    {
      id: "c-flat",
      prompt: "On a flat surface ($\\alpha = 0^\\circ$), how does the weight split?",
      choices: [
        { text: "All along the surface, none into it.", explain: "That is the steep limit $\\alpha = 90^\\circ$." },
        { text: "Half along, half into.", explain: "That is $\\alpha = 45^\\circ$, not $0^\\circ$." },
        { text: "It cannot be split at all.", explain: "It splits fine. The along-incline part is just $0$." },
        { text: "All into the surface: $W\\sin 0^\\circ = 0$ and $N = W$.", correct: true, explain: "$\\sin 0 = 0$ and $\\cos 0 = 1$, so all the weight presses straight in." },
      ],
    },
    {
      id: "c-vertical",
      prompt: "On a vertical wall ($\\alpha = 90^\\circ$), how does the weight split?",
      choices: [
        { text: "All into the surface.", explain: "That is the flat case $\\alpha = 0^\\circ$." },
        { text: "Half and half.", explain: "That is $\\alpha = 45^\\circ$." },
        { text: "All along the surface: $W\\sin 90^\\circ = W$ and $N = W\\cos 90^\\circ = 0$.", correct: true, explain: "$\\sin 90 = 1$ and $\\cos 90 = 0$, so nothing presses in." },
        { text: "The weight becomes zero.", explain: "Gravity is unchanged. Only the split changes." },
      ],
    },
    {
      id: "c-bigger-gentle",
      prompt: "On a gentle ramp with $\\alpha < 45^\\circ$, which component of the weight is larger?",
      choices: [
        { text: "The along-incline part $W\\sin\\alpha$.", explain: "For $\\alpha < 45^\\circ$, $\\sin\\alpha < \\cos\\alpha$, so this part is smaller." },
        { text: "The into-surface part $W\\cos\\alpha$.", correct: true, explain: "For $\\alpha < 45^\\circ$, $\\cos\\alpha > \\sin\\alpha$, so more weight presses in." },
        { text: "They are always equal.", explain: "They are equal only at $\\alpha = 45^\\circ$." },
        { text: "The along-incline part, and it exceeds $W$.", explain: "No component can exceed the whole weight $W$." },
      ],
    },
  ],
  summit: [
    {
      id: "s-345-both",
      prompt: "A block of weight $W = 10$ is on the 3-4-5 ramp. Which pair of components is correct?",
      choices: [
        { text: "along-incline $6$, into-surface $8$.", correct: true, explain: "$W\\sin\\alpha = 10\\cdot\\tfrac{3}{5} = 6$ and $W\\cos\\alpha = 10\\cdot\\tfrac{4}{5} = 8$." },
        { text: "along-incline $8$, into-surface $6$.", explain: "Swapped: sine gives the along-incline part, so $6$, not $8$." },
        { text: "along-incline $3$, into-surface $4$.", explain: "Those are the rise and run. Multiply each by $W = 10$." },
        { text: "along-incline $5$, into-surface $5$.", explain: "Equal parts happen at $45^\\circ$, not on the 3-4-5 ramp." },
      ],
    },
    {
      id: "s-345-recombine",
      prompt: "Check the 3-4-5 split: do the components $6$ and $8$ rebuild the weight $10$?",
      choices: [
        { text: "No, $6 + 8 = 14$, so the total is $14$.", explain: "The components are perpendicular. You cannot add their magnitudes directly." },
        { text: "Yes, $\\sqrt{6^2 + 8^2} = \\sqrt{100} = 10$.", correct: true, explain: "Perpendicular legs combine by the Pythagorean theorem back to $W = 10$." },
        { text: "No, they never rebuild $W$.", explain: "They must: they are just $W$ resolved into two directions." },
        { text: "Yes, $6\\cdot 8 = 48$ confirms it.", explain: "Products are not how vectors combine. Use $\\sqrt{6^2 + 8^2}$." },
      ],
    },
    {
      id: "s-30-both",
      prompt: "A block of weight $W = 10$ rests on a $30^\\circ$ ramp. Its components are:",
      choices: [
        { text: "along $5$, into-surface $5\\sqrt{3} \\approx 8.66$.", correct: true, explain: "$10\\sin 30^\\circ = 5$ and $10\\cos 30^\\circ = 5\\sqrt{3}$." },
        { text: "along $5\\sqrt{3}$, into-surface $5$.", explain: "Those are the $60^\\circ$ values. At $30^\\circ$ the sine part is the smaller one." },
        { text: "along $5$, into-surface $5$.", explain: "$\\cos 30^\\circ = \\tfrac{\\sqrt{3}}{2}$, not $\\tfrac{1}{2}$, so the perpendicular part is $5\\sqrt{3}$." },
        { text: "along $8.66$, into-surface $5$.", explain: "Swapped: at $30^\\circ$ the along-incline part is the smaller value, $5$." },
      ],
    },
    {
      id: "s-30-recombine",
      prompt: "For that $30^\\circ$ ramp ($W = 10$), do the parts $5$ and $5\\sqrt{3}$ rebuild the weight?",
      choices: [
        { text: "No, $5 + 5\\sqrt{3} \\approx 13.7$.", explain: "Perpendicular parts do not add as plain magnitudes." },
        { text: "Yes, $\\sqrt{5^2 + (5\\sqrt{3})^2} = \\sqrt{25 + 75} = \\sqrt{100} = 10$.", correct: true, explain: "$25 + 75 = 100$, whose root is $10$, the weight." },
        { text: "Yes, multiplying $5\\cdot 5\\sqrt{3}$ works.", explain: "Multiplying magnitudes is not how components recombine." },
        { text: "No, the weight was $10$, not $\\sqrt{100}$.", explain: "$\\sqrt{100} = 10$, so it does match." },
      ],
    },
    {
      id: "s-compare-along",
      prompt: "Two ramps, one at $30^\\circ$ and one at $60^\\circ$, hold identical blocks ($W = 10$). On which is the along-incline pull larger?",
      choices: [
        { text: "The $30^\\circ$ ramp.", explain: "$\\sin 30^\\circ = 0.5 < \\sin 60^\\circ$, so its pull is smaller." },
        { text: "They are equal.", explain: "Different angles give different pulls here." },
        { text: "The $60^\\circ$ ramp.", correct: true, explain: "$\\sin 60^\\circ \\approx 0.87 > \\sin 30^\\circ$, so $W\\sin\\alpha$ is larger there." },
        { text: "Neither, the pull is always $W$.", explain: "The pull is $W\\sin\\alpha$, less than $W$ except at $90^\\circ$." },
      ],
    },
    {
      id: "s-compare-normal",
      prompt: "Same two ramps ($30^\\circ$ and $60^\\circ$, $W = 10$). On which is the normal force larger?",
      choices: [
        { text: "The $30^\\circ$ ramp.", correct: true, explain: "$\\cos 30^\\circ \\approx 0.87 > \\cos 60^\\circ = 0.5$, so $N = W\\cos\\alpha$ is larger." },
        { text: "The $60^\\circ$ ramp.", explain: "Cosine is smaller at $60^\\circ$, so $N$ is smaller there." },
        { text: "They are equal.", explain: "Cosine differs between the two angles." },
        { text: "Neither, $N = W$ always.", explain: "$N = W$ only when $\\alpha = 0$." },
      ],
    },
    {
      id: "s-swap-trap",
      prompt: "A student writes the along-incline component as $W\\cos\\alpha$. What is the error?",
      choices: [
        { text: "No error. That is correct.", explain: "It is backwards. The along-incline part is opposite $\\alpha$." },
        { text: "Sine and cosine are swapped: the along-incline part is $W\\sin\\alpha$ and $W\\cos\\alpha$ is the perpendicular part.", correct: true, explain: "Adjacent to $\\alpha$ is cosine (perpendicular). Opposite is sine (along-incline)." },
        { text: "It should be $W\\tan\\alpha$.", explain: "Tangent is not one of the two components." },
        { text: "The weight should be $W\\cos\\alpha$ too.", explain: "The weight is the hypotenuse $W$, not a component." },
      ],
    },
    {
      id: "s-N-trap",
      prompt: "A student claims the normal force always equals the full weight, $N = W$. When is that actually true?",
      choices: [
        { text: "Always. The surface holds up the whole block.", explain: "On a slope, part of the weight goes along the incline, so $N < W$." },
        { text: "Never.", explain: "It is true in exactly one case: a flat surface." },
        { text: "Only when $\\alpha = 90^\\circ$.", explain: "At $90^\\circ$, $\\cos\\alpha = 0$, so $N = 0$, the opposite extreme." },
        { text: "Only when $\\alpha = 0^\\circ$ (a flat surface), where $\\cos\\alpha = 1$.", correct: true, explain: "For any $\\alpha > 0$, $N = W\\cos\\alpha < W$." },
      ],
    },
    {
      id: "s-sum-trap",
      prompt: "The two components of a $W = 10$ weight are $6$ and $8$. A student says the block feels a total force of $6 + 8 = 14$. Why is that wrong?",
      choices: [
        { text: "The components are perpendicular, so they combine as $\\sqrt{6^2 + 8^2} = 10$, the original weight.", correct: true, explain: "Perpendicular vectors add by the Pythagorean theorem, not by adding lengths." },
        { text: "The arithmetic $6 + 8 = 14$ is wrong.", explain: "The arithmetic is fine. The method is wrong because the parts are perpendicular." },
        { text: "The total really is $14$.", explain: "That would exceed the weight $10$. The parts cannot combine to more than $W$." },
        { text: "One component must be negative.", explain: "Both magnitudes are positive. Combine them by Pythagoras." },
      ],
    },
    {
      id: "s-along-steepen-trap",
      prompt: "True or false: as a ramp gets steeper, the along-incline pull shrinks.",
      choices: [
        { text: "True, steeper ramps reduce the pull.", explain: "Steeper means larger $\\alpha$, and $\\sin\\alpha$ grows, so the pull grows." },
        { text: "False, the pull $W\\sin\\alpha$ grows because $\\sin\\alpha$ increases toward $1$.", correct: true, explain: "From $0^\\circ$ to $90^\\circ$ sine rises, so a steeper ramp slides the block harder." },
        { text: "True, only the normal force changes.", explain: "Both change: the along-incline part grows and the normal part shrinks." },
        { text: "False, the pull stays fixed at $W$.", explain: "The pull is $W\\sin\\alpha$, less than $W$ except at $90^\\circ$." },
      ],
    },
    {
      id: "s-find-angle-along",
      prompt: "A block of weight $W = 10$ has an along-incline pull of $5$. What is the ramp angle?",
      choices: [
        { text: "$60^\\circ$", explain: "$10\\sin 60^\\circ \\approx 8.66$, not $5$." },
        { text: "$45^\\circ$", explain: "$10\\sin 45^\\circ \\approx 7.07$, not $5$." },
        { text: "$30^\\circ$", correct: true, explain: "$W\\sin\\alpha = 5$ means $\\sin\\alpha = 0.5$, so $\\alpha = 30^\\circ$." },
        { text: "$0^\\circ$", explain: "At $0^\\circ$ the along-incline pull is $0$." },
      ],
    },
    {
      id: "s-find-angle-normal",
      prompt: "A block of weight $W = 10$ presses into the surface with a normal force of $5$. What is the ramp angle?",
      choices: [
        { text: "$60^\\circ$", correct: true, explain: "$W\\cos\\alpha = 5$ means $\\cos\\alpha = 0.5$, so $\\alpha = 60^\\circ$." },
        { text: "$30^\\circ$", explain: "$10\\cos 30^\\circ \\approx 8.66$, not $5$." },
        { text: "$45^\\circ$", explain: "$10\\cos 45^\\circ \\approx 7.07$, not $5$." },
        { text: "$90^\\circ$", explain: "At $90^\\circ$ the normal force is $0$." },
      ],
    },
    {
      id: "s-scale-W",
      prompt: "On the 3-4-5 ramp a lighter block has $W = 5$. Its components are:",
      choices: [
        { text: "along $3$, into-surface $4$.", correct: true, explain: "$5\\cdot\\tfrac{3}{5} = 3$ and $5\\cdot\\tfrac{4}{5} = 4$. Note $3^2 + 4^2 = 5^2$." },
        { text: "along $6$, into-surface $8$.", explain: "Those are the $W = 10$ values. Halve them for $W = 5$." },
        { text: "along $4$, into-surface $3$.", explain: "Swapped: sine ($\\tfrac{3}{5}$) gives the along-incline part, so $3$." },
        { text: "along $2.5$, into-surface $2.5$.", explain: "Equal parts need $45^\\circ$. The 3-4-5 ramp is not $45^\\circ$." },
      ],
    },
    {
      id: "s-equal-angle",
      prompt: "At what ramp angle are the along-incline and into-surface components equal?",
      choices: [
        { text: "$30^\\circ$", explain: "There $\\sin 30^\\circ = 0.5 \\ne \\cos 30^\\circ \\approx 0.87$." },
        { text: "$60^\\circ$", explain: "There sine and cosine differ ($0.87$ versus $0.5$)." },
        { text: "$45^\\circ$", correct: true, explain: "$\\sin 45^\\circ = \\cos 45^\\circ$, so $W\\sin\\alpha = W\\cos\\alpha$, each $\\tfrac{W}{\\sqrt{2}}$." },
        { text: "$0^\\circ$", explain: "There the parts are $0$ and $W$, as different as possible." },
      ],
    },
    {
      id: "s-capstone",
      prompt: "A block of weight $10$ is moved from a $30^\\circ$ ramp to a $60^\\circ$ ramp. Which statement is correct?",
      choices: [
        { text: "Both the pull and the normal force increase.", explain: "The normal force decreases as the ramp steepens." },
        { text: "The along-incline pull falls and the normal force rises.", explain: "It is the reverse: steeper means more sliding and less pressing in." },
        { text: "Nothing changes because the weight is still $10$.", explain: "The weight is fixed, but its split shifts with $\\alpha$." },
        { text: "The along-incline pull rises from $5$ to $5\\sqrt{3}$, and the normal force falls from $5\\sqrt{3}$ to $5$.", correct: true, explain: "Sine grows ($0.5 \\to 0.87$) so the pull rises. Cosine shrinks ($0.87 \\to 0.5$) so $N$ falls." },
      ],
    },
  ],
};
