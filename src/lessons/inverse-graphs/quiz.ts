import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Graphing inverse trig".
 * Grounded in the lesson: sine is restricted to [-pi/2, pi/2] so it is
 * one-to-one, then its inverse is the reflection of that piece across y = x,
 * which swaps domain and range. Climb drills domain/range and the reflection
 * idea across arcsine, arccosine, and arctangent; Summit adds asymptotes,
 * monotonicity, and transformations. Distractors are the classic traps:
 * swapping domain and range, using the wrong restriction interval, reflecting
 * across an axis instead of y = x, and giving arctangent endpoints instead of
 * horizontal asymptotes.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-restrict-why",
      prompt: "Why must we restrict sine before it can have an inverse?",
      choices: [
        { text: "The full sine is **many-to-one**, so it fails the horizontal line test and an inverse could not decide which angle to return.", correct: true, explain: "One output comes from many angles, so undoing sine would be ambiguous until we keep just one piece." },
        { text: "Sine is undefined at certain angles, so those gaps must be removed first.", explain: "Sine is defined for every angle; there are no gaps to remove." },
        { text: "Sine grows without bound, so we trim it to keep the outputs finite.", explain: "Sine already stays inside $[-1, 1]$; it never grows without bound." },
        { text: "Sine is negative on half its cycle, and inverses need positive outputs.", explain: "The sign of the output has nothing to do with whether a function is invertible." },
      ],
    },
    {
      id: "c-restrict-interval",
      prompt: "Which interval do we restrict sine to so it becomes one-to-one and invertible?",
      choices: [
        { text: "$[0, \\pi]$", explain: "That is the restriction used for cosine; on this span sine rises then falls, so it repeats values." },
        { text: "$[0, 2\\pi]$", explain: "Over a full period sine repeats every output, so it is still many-to-one here." },
        { text: "$\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$", correct: true, explain: "On this piece sine climbs once from $-1$ to $1$, passing the horizontal line test." },
        { text: "$[-\\pi, \\pi]$", explain: "Sine rises then falls across this symmetric span, so it takes many values twice." },
      ],
    },
    {
      id: "c-reflect-line",
      prompt: "The graph of an inverse function is the original graph reflected across:",
      choices: [
        { text: "the $x$-axis", explain: "Reflecting across the $x$-axis negates the outputs; it does not undo the function." },
        { text: "the line $y = x$", correct: true, explain: "Inverting swaps input and output, which geometrically is a reflection across $y = x$." },
        { text: "the $y$-axis", explain: "Reflecting across the $y$-axis negates the inputs, which is not the inverse relationship." },
        { text: "the origin", explain: "A reflection through the origin negates both coordinates, not the same as swapping them." },
      ],
    },
    {
      id: "c-reflect-swap",
      prompt: "Reflecting the point $(a, b)$ across the line $y = x$ lands it at:",
      choices: [
        { text: "$(-a, b)$", explain: "That reflects across the $y$-axis by negating the input." },
        { text: "$(a, -b)$", explain: "That reflects across the $x$-axis by negating the output." },
        { text: "$(-a, -b)$", explain: "That is a reflection through the origin, negating both coordinates." },
        { text: "$(b, a)$", correct: true, explain: "Reflecting across $y = x$ simply swaps the two coordinates." },
      ],
    },
    {
      id: "c-arcsin-domain",
      prompt: "The domain of $\\arcsin x$ (the inputs it accepts) is:",
      choices: [
        { text: "$[-1, 1]$", correct: true, explain: "Arcsine reads back the outputs of sine, and those live in $[-1, 1]$." },
        { text: "$\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$", explain: "That is the range, the angles arcsine returns, not the inputs it accepts." },
        { text: "all real numbers", explain: "That is arctangent's domain; arcsine only accepts inputs from $-1$ to $1$." },
        { text: "$[0, \\pi]$", explain: "That is arccosine's range, unrelated to arcsine's inputs." },
      ],
    },
    {
      id: "c-arcsin-range",
      prompt: "The range of $\\arcsin x$ (the angles it returns) is:",
      choices: [
        { text: "$[-1, 1]$", explain: "That is the domain, the inputs arcsine accepts, not the output angles." },
        { text: "$[0, \\pi]$", explain: "That is arccosine's range; sine is restricted differently." },
        { text: "$\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$", correct: true, explain: "Arcsine returns exactly the restricted domain of sine, from $-\\tfrac{\\pi}{2}$ to $\\tfrac{\\pi}{2}$." },
        { text: "$\\left(-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right)$", explain: "Arcsine actually reaches its endpoints, so the interval is closed; the open version is arctangent's range." },
      ],
    },
    {
      id: "c-swap",
      prompt: "When you invert a function, its domain and range:",
      choices: [
        { text: "stay exactly the same", explain: "Inverting swaps inputs and outputs, so the two sets cannot stay in place." },
        { text: "swap places, so the old range becomes the new domain", correct: true, explain: "Reflecting across $y = x$ trades the roles of input and output, so domain and range switch." },
        { text: "both become all real numbers", explain: "Inverting relabels the existing sets; it does not expand them to all reals." },
        { text: "stay as the domain, while the range doubles in size", explain: "Nothing doubles; the two sets simply trade roles." },
      ],
    },
    {
      id: "c-arcsin-point",
      prompt: "The point $\\left(1, \\tfrac{\\pi}{2}\\right)$ sits on the arcsine graph. Which point on the restricted sine did it come from?",
      choices: [
        { text: "$\\left(-\\tfrac{\\pi}{2}, 1\\right)$", explain: "This has a sign slip: $\\sin\\left(-\\tfrac{\\pi}{2}\\right) = -1$, not $1$, so it is not the source point." },
        { text: "$\\left(1, \\tfrac{\\pi}{2}\\right)$", explain: "That is the arcsine point itself; you must swap the coordinates to get back to sine." },
        { text: "$\\left(\\tfrac{\\pi}{2}, -1\\right)$", explain: "Another sign slip: $\\sin\\tfrac{\\pi}{2} = 1$, not $-1$." },
        { text: "$\\left(\\tfrac{\\pi}{2}, 1\\right)$", correct: true, explain: "Swap the coordinates; since $\\sin\\tfrac{\\pi}{2} = 1$, this is the matching point on sine." },
      ],
    },
    {
      id: "c-arccos-domain",
      prompt: "The domain of $\\arccos x$ is:",
      choices: [
        { text: "$[-1, 1]$", correct: true, explain: "Like arcsine, arccosine accepts the outputs of cosine, which lie in $[-1, 1]$." },
        { text: "$[0, \\pi]$", explain: "That is arccosine's range, the angles it returns, not its inputs." },
        { text: "all real numbers", explain: "That is arctangent's domain, not arccosine's." },
        { text: "$\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$", explain: "That is arcsine's range; it is neither the domain nor the range of arccosine." },
      ],
    },
    {
      id: "c-arccos-range",
      prompt: "The range of $\\arccos x$ (the angles it returns) is:",
      choices: [
        { text: "$[-1, 1]$", explain: "That is the domain, the inputs, not the output angles." },
        { text: "$[0, \\pi]$", correct: true, explain: "Arccosine inverts cosine restricted to $[0, \\pi]$, so its outputs fill $[0, \\pi]$." },
        { text: "$\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$", explain: "That is arcsine's range; cosine is restricted to a different interval." },
        { text: "$\\left(-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right)$", explain: "That open interval is arctangent's range, not arccosine's." },
      ],
    },
    {
      id: "c-arctan-domain",
      prompt: "The domain of $\\arctan x$ is:",
      choices: [
        { text: "$[-1, 1]$", explain: "That is the domain of arcsine and arccosine; arctangent takes much more." },
        { text: "$\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$", explain: "That closed interval is arcsine's range, not arctangent's domain." },
        { text: "all real numbers", correct: true, explain: "Tangent produces every real value, so its inverse accepts every real input." },
        { text: "$\\left(-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right)$", explain: "That is arctangent's range, the outputs, not the inputs it accepts." },
      ],
    },
    {
      id: "c-arctan-range",
      prompt: "The range of $\\arctan x$ (the angles it returns) is:",
      choices: [
        { text: "$\\left(-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right)$", correct: true, explain: "Arctangent's outputs approach but never reach $\\pm\\tfrac{\\pi}{2}$, so the interval is open." },
        { text: "$\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$", explain: "The endpoints are never attained; they are horizontal asymptotes, so the interval is open, not closed." },
        { text: "$[-1, 1]$", explain: "That is arcsine's domain, not the output angles of arctangent." },
        { text: "$[0, \\pi]$", explain: "That is arccosine's range, not arctangent's." },
      ],
    },
    {
      id: "c-eval-arcsin",
      prompt: "Reading the arcsine graph, $\\arcsin \\tfrac{1}{2} = $",
      choices: [
        { text: "$\\tfrac{\\pi}{3}$", explain: "That is $\\arccos\\tfrac{1}{2}$; here we need the angle whose sine is $\\tfrac{1}{2}$." },
        { text: "$\\tfrac{1}{2}$", explain: "The output is an angle, not the input value repeated back." },
        { text: "$\\tfrac{\\pi}{2}$", explain: "$\\sin\\tfrac{\\pi}{2} = 1$, not $\\tfrac{1}{2}$, so this angle is too big." },
        { text: "$\\tfrac{\\pi}{6}$", correct: true, explain: "Since $\\sin\\tfrac{\\pi}{6} = \\tfrac{1}{2}$, the curve returns $\\arcsin\\tfrac{1}{2} = \\tfrac{\\pi}{6}$." },
      ],
    },
    {
      id: "c-arccos-point",
      prompt: "The point $(0, 1)$ lies on the restricted cosine graph. Reflecting across $y = x$ puts which point on the arccosine graph?",
      choices: [
        { text: "$(-1, 0)$", explain: "Sign slip: $\\cos 0 = 1$, not $-1$, so the source point is $(0, 1)$." },
        { text: "$(1, 0)$", correct: true, explain: "Swap the coordinates of $(0, 1)$; indeed $\\arccos 1 = 0$." },
        { text: "$(0, 1)$", explain: "You forgot to swap; that is the point on cosine, not on arccosine." },
        { text: "$(1, \\pi)$", explain: "That is $\\arccos(-1) = \\pi$, a different point on the graph." },
      ],
    },
    {
      id: "c-monotonic",
      prompt: "As the input runs from $-1$ to $1$, the arcsine output runs from:",
      choices: [
        { text: "$0$ up to $\\pi$", explain: "That is arccosine's span of outputs, and arccosine decreases rather than increases." },
        { text: "$-1$ up to $1$", explain: "Those are the inputs; arcsine returns angles, not the same numbers back." },
        { text: "$-\\tfrac{\\pi}{2}$ up to $\\tfrac{\\pi}{2}$", correct: true, explain: "Arcsine increases steadily across its full range, from $-\\tfrac{\\pi}{2}$ to $\\tfrac{\\pi}{2}$." },
        { text: "$\\tfrac{\\pi}{2}$ down to $-\\tfrac{\\pi}{2}$", explain: "Arcsine increases, it does not decrease; a downward run would be the wrong direction." },
      ],
    },
  ],
  summit: [
    {
      id: "s-arctan-asym",
      prompt: "Which best describes the asymptotes of $y = \\arctan x$?",
      choices: [
        { text: "Two horizontal asymptotes, $y = \\tfrac{\\pi}{2}$ and $y = -\\tfrac{\\pi}{2}$.", correct: true, explain: "As $x \\to \\pm\\infty$ the graph levels off toward these two heights without ever touching them." },
        { text: "Two vertical asymptotes, $x = \\tfrac{\\pi}{2}$ and $x = -\\tfrac{\\pi}{2}$.", explain: "Those are tangent's vertical walls; reflecting across $y = x$ turns them into horizontal asymptotes for arctangent." },
        { text: "No asymptotes; it stops at the endpoints $\\left(\\pm 1, \\pm\\tfrac{\\pi}{2}\\right)$.", explain: "That describes arcsine; arctangent's domain is all reals, so the curve never stops." },
        { text: "One horizontal asymptote, $y = 0$.", explain: "Arctangent is not squeezed to zero; it flattens toward two different heights." },
      ],
    },
    {
      id: "s-arcsin-noasym",
      prompt: "Does $y = \\arcsin x$ have horizontal asymptotes?",
      choices: [
        { text: "Yes, at $y = \\tfrac{\\pi}{2}$ and $y = -\\tfrac{\\pi}{2}$.", explain: "Arcsine actually reaches those heights at its endpoints, so they are values it attains, not asymptotes." },
        { text: "Yes, at $y = 1$ and $y = -1$.", explain: "Those are the input limits, and arcsine has no asymptotes at all." },
        { text: "No; instead it has vertical asymptotes at $x = \\pm 1$.", explain: "At $x = \\pm 1$ arcsine has solid endpoints, not walls." },
        { text: "No; it has closed endpoints at $\\left(-1, -\\tfrac{\\pi}{2}\\right)$ and $\\left(1, \\tfrac{\\pi}{2}\\right)$.", correct: true, explain: "The curve simply stops at those two points, so there is nothing to approach." },
      ],
    },
    {
      id: "s-arccos-decr",
      prompt: "On its domain $[-1, 1]$, the function $y = \\arccos x$ is:",
      choices: [
        { text: "increasing", explain: "Cosine falls on $[0, \\pi]$, so its inverse falls too; arccosine decreases." },
        { text: "decreasing", correct: true, explain: "As $x$ goes from $-1$ to $1$, arccosine drops from $\\pi$ down to $0$." },
        { text: "constant", explain: "The outputs change from $\\pi$ to $0$, so the graph is not flat." },
        { text: "increasing then decreasing", explain: "Arccosine is monotonic, always decreasing; it never turns around." },
      ],
    },
    {
      id: "s-why-asym",
      prompt: "Why does $y = \\arctan x$ flatten toward the line $y = \\tfrac{\\pi}{2}$ instead of reaching it?",
      choices: [
        { text: "Because arctangent actually equals $\\tfrac{\\pi}{2}$ once $x = 1$.", explain: "In fact $\\arctan 1 = \\tfrac{\\pi}{4}$, and the graph never actually reaches $\\tfrac{\\pi}{2}$." },
        { text: "Because arctangent is undefined for large $x$.", explain: "Arctangent is defined for every real $x$; it just levels off as $x$ grows." },
        { text: "Tangent has a vertical asymptote at $\\tfrac{\\pi}{2}$, and reflecting across $y = x$ turns it into a horizontal asymptote at $y = \\tfrac{\\pi}{2}$.", correct: true, explain: "The wall of tangent becomes the ceiling of arctangent when you swap $x$ and $y$." },
        { text: "Because tangent equals zero at $\\tfrac{\\pi}{2}$.", explain: "Tangent blows up toward $\\tfrac{\\pi}{2}$; it does not equal zero there." },
      ],
    },
    {
      id: "s-arccos-restrict",
      prompt: "Arccosine is the inverse of cosine restricted to which interval?",
      choices: [
        { text: "$[0, \\pi]$", correct: true, explain: "Cosine is one-to-one here, falling steadily from $1$ down to $-1$." },
        { text: "$\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$", explain: "That is sine's restriction; cosine is symmetric there ($\\cos(-x) = \\cos x$), so it fails the horizontal line test." },
        { text: "$[0, 2\\pi]$", explain: "Over a full period cosine repeats every value, so it is many-to-one." },
        { text: "$[-\\pi, \\pi]$", explain: "Cosine is even, so on this symmetric span it takes each value twice." },
      ],
    },
    {
      id: "s-shift-arctan",
      prompt: "The graph $y = \\arctan x + \\tfrac{\\pi}{2}$ has which horizontal asymptotes?",
      choices: [
        { text: "$y = \\tfrac{\\pi}{2}$ and $y = -\\tfrac{\\pi}{2}$", explain: "You forgot to add $\\tfrac{\\pi}{2}$ to each asymptote after shifting the graph up." },
        { text: "$y = \\pi$ and $y = 0$", correct: true, explain: "Shift both of arctangent's asymptotes up by $\\tfrac{\\pi}{2}$: $\\tfrac{\\pi}{2} + \\tfrac{\\pi}{2} = \\pi$ and $-\\tfrac{\\pi}{2} + \\tfrac{\\pi}{2} = 0$." },
        { text: "$y = \\pi$ and $y = -\\pi$", explain: "That would come from a vertical stretch by $2$, not an upward shift." },
        { text: "$y = \\pi$ only", explain: "A vertical shift keeps both asymptotes; the lower one moves to $y = 0$, it does not vanish." },
      ],
    },
    {
      id: "s-stretch-arctan",
      prompt: "Compared with $y = \\arctan x$, the graph $y = 2\\arctan x$ has asymptotes:",
      choices: [
        { text: "$y = \\tfrac{\\pi}{2}$ and $y = -\\tfrac{\\pi}{2}$, unchanged", explain: "Multiplying the outputs by $2$ also doubles the heights the graph approaches." },
        { text: "$y = \\tfrac{\\pi}{4}$ and $y = -\\tfrac{\\pi}{4}$", explain: "That halves the heights; multiplying by $2$ stretches them, it does not shrink them." },
        { text: "$y = 2$ and $y = -2$", explain: "The stretch multiplies the angle $\\tfrac{\\pi}{2}$ by $2$ to get $\\pi$; it does not replace $\\tfrac{\\pi}{2}$ with $2$." },
        { text: "$y = \\pi$ and $y = -\\pi$", correct: true, explain: "Each asymptote height $\\pm\\tfrac{\\pi}{2}$ is doubled to $\\pm\\pi$." },
      ],
    },
    {
      id: "s-arcsin-hshift",
      prompt: "What is the domain of $y = \\arcsin(x - 2)$?",
      choices: [
        { text: "$[-1, 1]$", explain: "That is the domain before shifting; replacing $x$ with $x - 2$ slides it to the right." },
        { text: "$[-3, -1]$", explain: "The shift goes the other way; solve $-1 \\le x - 2 \\le 1$." },
        { text: "$[1, 3]$", correct: true, explain: "We need $-1 \\le x - 2 \\le 1$, so adding $2$ gives $1 \\le x \\le 3$." },
        { text: "$\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$", explain: "That is the range of outputs, not the domain of inputs." },
      ],
    },
    {
      id: "s-arcsin-compress",
      prompt: "What is the domain of $y = \\arcsin(2x)$?",
      choices: [
        { text: "$\\left[-\\tfrac{1}{2}, \\tfrac{1}{2}\\right]$", correct: true, explain: "We need $-1 \\le 2x \\le 1$, so dividing by $2$ gives $-\\tfrac{1}{2} \\le x \\le \\tfrac{1}{2}$." },
        { text: "$[-2, 2]$", explain: "That multiplies instead of divides; solve $-1 \\le 2x \\le 1$ to shrink the interval." },
        { text: "$[-1, 1]$", explain: "The inner factor $2$ compresses the domain, so it is not left unchanged." },
        { text: "$\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$", explain: "That is the range, not the domain." },
      ],
    },
    {
      id: "s-tan-point",
      prompt: "The point $\\left(\\tfrac{\\pi}{4}, 1\\right)$ lies on the restricted tangent graph. Where is the matching point on $y = \\arctan x$?",
      choices: [
        { text: "$\\left(\\tfrac{\\pi}{4}, 1\\right)$", explain: "That is the point on tangent; you must swap the coordinates to land on arctangent." },
        { text: "$\\left(1, \\tfrac{\\pi}{4}\\right)$", correct: true, explain: "Reflecting across $y = x$ swaps to $\\left(1, \\tfrac{\\pi}{4}\\right)$, and indeed $\\arctan 1 = \\tfrac{\\pi}{4}$." },
        { text: "$\\left(1, -\\tfrac{\\pi}{4}\\right)$", explain: "Sign slip: $\\arctan 1 = +\\tfrac{\\pi}{4}$." },
        { text: "$\\left(-1, \\tfrac{\\pi}{4}\\right)$", explain: "Sign slip on the input; $\\tan\\tfrac{\\pi}{4} = +1$, so the input is $+1$." },
      ],
    },
    {
      id: "s-arccos-endpoints",
      prompt: "As $x$ runs from $-1$ to $1$, the arccosine graph goes:",
      choices: [
        { text: "from $(-1, \\pi)$ down to $(1, 0)$", correct: true, explain: "$\\arccos(-1) = \\pi$ and $\\arccos 1 = 0$, so the graph decreases from $\\pi$ to $0$." },
        { text: "from $(-1, 0)$ up to $(1, \\pi)$", explain: "That reverses the direction; arccosine decreases, it does not increase." },
        { text: "from $\\left(-1, -\\tfrac{\\pi}{2}\\right)$ up to $\\left(1, \\tfrac{\\pi}{2}\\right)$", explain: "That is the arcsine graph, not arccosine." },
        { text: "from $(0, -1)$ to $(\\pi, 1)$", explain: "The coordinates are swapped; arccosine takes inputs in $[-1, 1]$, not in $[0, \\pi]$." },
      ],
    },
    {
      id: "s-domain-reals",
      prompt: "Which inverse trig function has a domain of all real numbers?",
      choices: [
        { text: "$\\arcsin$", explain: "Its domain is only $[-1, 1]$." },
        { text: "$\\arccos$", explain: "Its domain is only $[-1, 1]$." },
        { text: "all three", explain: "Arcsine and arccosine are each limited to $[-1, 1]$." },
        { text: "$\\arctan$", correct: true, explain: "Tangent hits every real output, so arctangent accepts every real input." },
      ],
    },
    {
      id: "s-neg-arctan",
      prompt: "How does the graph of $y = -\\arctan x$ compare to $y = \\arctan x$?",
      choices: [
        { text: "It still increases, with asymptotes $y = \\pm\\tfrac{\\pi}{2}$.", explain: "The negative sign flips the curve over the $x$-axis, so it decreases instead." },
        { text: "It decreases, and its only asymptote is $y = 0$.", explain: "Reflecting across the $x$-axis keeps two asymptotes; they remain at $y = \\pm\\tfrac{\\pi}{2}$." },
        { text: "It decreases, with the same asymptotes $y = \\tfrac{\\pi}{2}$ and $y = -\\tfrac{\\pi}{2}$.", correct: true, explain: "Negating the outputs flips the graph, turning increasing into decreasing while the two asymptote lines stay at $\\pm\\tfrac{\\pi}{2}$." },
        { text: "It increases and has no asymptotes.", explain: "It has the same two horizontal asymptotes, and the sign flip makes it decrease." },
      ],
    },
    {
      id: "s-arcsin-vshift",
      prompt: "The graph $y = \\arcsin x + \\tfrac{\\pi}{2}$ has which range?",
      choices: [
        { text: "$\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$", explain: "You forgot to add $\\tfrac{\\pi}{2}$ to the outputs after shifting up." },
        { text: "$[0, \\pi]$", correct: true, explain: "Shift arcsine's range up by $\\tfrac{\\pi}{2}$: $\\left[-\\tfrac{\\pi}{2} + \\tfrac{\\pi}{2}, \\tfrac{\\pi}{2} + \\tfrac{\\pi}{2}\\right] = [0, \\pi]$." },
        { text: "$[-1, 1]$", explain: "That is arcsine's domain of inputs, not its shifted outputs." },
        { text: "$\\left[\\tfrac{\\pi}{2}, \\tfrac{3\\pi}{2}\\right]$", explain: "That adds $\\pi$ to each end; the shift here is only $\\tfrac{\\pi}{2}$." },
      ],
    },
    {
      id: "s-true",
      prompt: "Which statement about graphing the inverse trig functions is **true**?",
      choices: [
        { text: "Arctangent increases with two horizontal asymptotes, while arcsine and arccosine end at solid points, not asymptotes.", correct: true, explain: "Only arctangent has an unbounded domain and levels off; arcsine and arccosine stop at closed endpoints." },
        { text: "Arccosine increases across its domain.", explain: "Arccosine decreases, dropping from $\\pi$ down to $0$." },
        { text: "Arcsine and arccosine each have vertical asymptotes at $x = \\pm 1$.", explain: "They have closed endpoints at $x = \\pm 1$, not walls." },
        { text: "All three inverse functions share the range $\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$.", explain: "Only arcsine has that range; arccosine's is $[0, \\pi]$ and arctangent's is the open $\\left(-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right)$." },
      ],
    },
  ],
};
