import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Graphing inverse trig".
 * Grounded in the lesson: sine is restricted to [-pi/2, pi/2] so it is
 * one-to-one, then its inverse is the reflection of that piece across y = x,
 * which swaps domain and range. Climb and Summit stay on that arcsine graph:
 * domain, range, reflection across y = x, reading a value, and shifting or
 * stretching the same curve. Distractors are the classic traps: swapping domain
 * and range, using the wrong restriction interval, and reflecting across an
 * axis instead of y = x.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-restrict-why",
      prompt: "Why must we restrict sine before it can have an inverse?",
      choices: [
        { text: "The full sine is **many-to-one**, so it fails the horizontal line test and an inverse could not decide which angle to return.", correct: true, explain: "One output comes from many angles, so undoing sine would be ambiguous until we keep just one piece." },
        { text: "Sine is undefined at certain angles, so those gaps must be removed first.", explain: "Sine is defined for every angle. There are no gaps to remove." },
        { text: "Sine grows without bound, so we trim it to keep the outputs finite.", explain: "Sine already stays inside $[-1, 1]$. It never grows without bound." },
        { text: "Sine is negative on half its cycle, and inverses need positive outputs.", explain: "The sign of the output has nothing to do with whether a function is invertible." },
      ],
    },
    {
      id: "c-restrict-interval",
      prompt: "Which interval do we restrict sine to so it becomes one-to-one and invertible?",
      choices: [
        { text: "$[0, \\pi]$", explain: "That is the restriction used for cosine. On this span sine rises then falls, so it repeats values." },
        { text: "$[0, 2\\pi]$", explain: "Over a full period sine repeats every output, so it is still many-to-one here." },
        { text: "$\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$", correct: true, explain: "On this piece sine climbs once from $-1$ to $1$, passing the horizontal line test." },
        { text: "$[-\\pi, \\pi]$", explain: "Sine rises then falls across this symmetric span, so it takes many values twice." },
      ],
    },
    {
      id: "c-reflect-line",
      prompt: "The graph of an inverse function is the original graph reflected across:",
      choices: [
        { text: "the $x$-axis", explain: "Reflecting across the $x$-axis negates the outputs. It does not undo the function." },
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
        { text: "all real numbers", explain: "Sine never produced values outside $[-1, 1]$, so there is nothing to undo there." },
        { text: "$[0, \\pi]$", explain: "That interval is a set of angles, not the inputs arcsine accepts." },
      ],
    },
    {
      id: "c-arcsin-range",
      prompt: "The range of $\\arcsin x$ (the angles it returns) is:",
      choices: [
        { text: "$[-1, 1]$", explain: "That is the domain, the inputs arcsine accepts, not the output angles." },
        { text: "$[0, \\pi]$", explain: "That is a different restriction interval. Sine's restricted piece is $\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$." },
        { text: "$\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$", correct: true, explain: "Arcsine returns exactly the restricted domain of sine, from $-\\tfrac{\\pi}{2}$ to $\\tfrac{\\pi}{2}$." },
        { text: "$\\left(-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right)$", explain: "Arcsine actually reaches its endpoints, so the interval is closed." },
      ],
    },
    {
      id: "c-swap",
      prompt: "When you invert a function, its domain and range:",
      choices: [
        { text: "stay exactly the same", explain: "Inverting swaps inputs and outputs, so the two sets cannot stay in place." },
        { text: "swap places, so the old range becomes the new domain", correct: true, explain: "Reflecting across $y = x$ trades the roles of input and output, so domain and range switch." },
        { text: "both become all real numbers", explain: "Inverting relabels the existing sets. It does not expand them to all reals." },
        { text: "stay as the domain, while the range doubles in size", explain: "Nothing doubles. The two sets simply trade roles." },
      ],
    },
    {
      id: "c-arcsin-point",
      prompt: "The point $\\left(1, \\tfrac{\\pi}{2}\\right)$ sits on the arcsine graph. Which point on the restricted sine did it come from?",
      choices: [
        { text: "$\\left(-\\tfrac{\\pi}{2}, 1\\right)$", explain: "This has a sign slip: $\\sin\\left(-\\tfrac{\\pi}{2}\\right) = -1$, not $1$, so it is not the source point." },
        { text: "$\\left(1, \\tfrac{\\pi}{2}\\right)$", explain: "That is the arcsine point itself. You must swap the coordinates to get back to sine." },
        { text: "$\\left(\\tfrac{\\pi}{2}, -1\\right)$", explain: "Another sign slip: $\\sin\\tfrac{\\pi}{2} = 1$, not $-1$." },
        { text: "$\\left(\\tfrac{\\pi}{2}, 1\\right)$", correct: true, explain: "Swap the coordinates. Since $\\sin\\tfrac{\\pi}{2} = 1$, this is the matching point on sine." },
      ],
    },
    {
      id: "c-sine-range",
      prompt: "The restricted sine we invert has outputs in:",
      choices: [
        { text: "$[-1, 1]$", correct: true, explain: "On $\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$ sine climbs from $-1$ to $1$, so those outputs become arcsine's inputs." },
        { text: "$\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$", explain: "Those are the inputs of the restricted sine, not its outputs." },
        { text: "all real numbers", explain: "Sine never leaves $[-1, 1]$." },
        { text: "$[0, \\pi]$", explain: "That is a different restriction, used for cosine, not the sine piece in this lesson." },
      ],
    },
    {
      id: "c-reflect-pi6",
      prompt: "The point $\\left(\\dfrac{\\pi}{6}, \\dfrac{1}{2}\\right)$ lies on the restricted sine. Where is the matching point on $y = \\arcsin x$?",
      choices: [
        { text: "$\\left(\\dfrac{\\pi}{6}, \\dfrac{1}{2}\\right)$", explain: "That is the point on sine. You must swap the coordinates to land on arcsine." },
        { text: "$\\left(\\dfrac{1}{2}, \\dfrac{\\pi}{6}\\right)$", correct: true, explain: "Reflecting across $y = x$ swaps to $\\left(\\dfrac{1}{2}, \\dfrac{\\pi}{6}\\right)$, and indeed $\\arcsin\\dfrac{1}{2} = \\dfrac{\\pi}{6}$." },
        { text: "$\\left(\\dfrac{1}{2}, -\\dfrac{\\pi}{6}\\right)$", explain: "Sign slip: $\\arcsin\\dfrac{1}{2} = +\\dfrac{\\pi}{6}$." },
        { text: "$\\left(-\\dfrac{1}{2}, \\dfrac{\\pi}{6}\\right)$", explain: "Sign slip on the input. $\\sin\\dfrac{\\pi}{6} = +\\dfrac{1}{2}$." },
      ],
    },
    {
      id: "c-why-domain",
      prompt: "Why does $\\arcsin x$ only accept inputs in $[-1, 1]$?",
      choices: [
        { text: "Those are exactly the outputs of the restricted sine, now used as inputs", correct: true, explain: "Inverting swaps domain and range. Sine's outputs $[-1, 1]$ become arcsine's domain." },
        { text: "Arcsine is undefined at every other real number for some other reason", explain: "The reason is the swap: sine never produced those other values, so there is nothing to undo." },
        { text: "The graph would fail the horizontal line test outside $[-1, 1]$", explain: "The horizontal line test was about sine, before the reflection. After reflecting, the limit is the old range." },
        { text: "Arcsine outputs must stay in $[-1, 1]$", explain: "Those are the inputs. The outputs are angles in $\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$." },
      ],
    },
    {
      id: "c-endpoints",
      prompt: "Does $y = \\arcsin x$ actually reach the heights $\\pm\\dfrac{\\pi}{2}$?",
      choices: [
        { text: "Yes. Those are closed endpoints: $\\arcsin(-1) = -\\dfrac{\\pi}{2}$ and $\\arcsin 1 = \\dfrac{\\pi}{2}$", correct: true, explain: "The restricted sine includes its endpoints, so the reflected curve includes them too." },
        { text: "No. The graph only approaches those heights", explain: "Arcsine attains the endpoints. The curve stops at the solid points $\\left(-1, -\\dfrac{\\pi}{2}\\right)$ and $\\left(1, \\dfrac{\\pi}{2}\\right)$." },
        { text: "It reaches $\\dfrac{\\pi}{2}$ but not $-\\dfrac{\\pi}{2}$", explain: "Both endpoints are included. Sine hits both $-1$ and $1$ on the restricted piece." },
        { text: "It never reaches either, because inverses stay open", explain: "There is no such rule. This inverse includes its endpoints." },
      ],
    },
    {
      id: "c-eval-arcsin",
      prompt: "Reading the arcsine graph, $\\arcsin \\tfrac{1}{2} = $",
      choices: [
        { text: "$\\tfrac{\\pi}{3}$", explain: "$\\sin\\tfrac{\\pi}{3} = \\tfrac{\\sqrt{3}}{2}$, not $\\tfrac{1}{2}$. The angle we need is $\\tfrac{\\pi}{6}$." },
        { text: "$\\tfrac{1}{2}$", explain: "The output is an angle, not the input value repeated back." },
        { text: "$\\tfrac{\\pi}{2}$", explain: "$\\sin\\tfrac{\\pi}{2} = 1$, not $\\tfrac{1}{2}$, so this angle is too big." },
        { text: "$\\tfrac{\\pi}{6}$", correct: true, explain: "Since $\\sin\\tfrac{\\pi}{6} = \\tfrac{1}{2}$, the curve returns $\\arcsin\\tfrac{1}{2} = \\tfrac{\\pi}{6}$." },
      ],
    },
    {
      id: "c-origin-point",
      prompt: "The point $(0, 0)$ lies on the restricted sine. Where is the matching point on $y = \\arcsin x$?",
      choices: [
        { text: "$(0, 0)$", correct: true, explain: "Swap $(0, 0)$ and you still have $(0, 0)$. Indeed $\\arcsin 0 = 0$." },
        { text: "$(1, 0)$", explain: "That would come from swapping $(0, 1)$, but $\\sin 0 = 0$, not $1$." },
        { text: "$\\left(\\dfrac{\\pi}{2}, 0\\right)$", explain: "Those coordinates are not a swap of $(0, 0)$." },
        { text: "$(0, 1)$", explain: "You did not swap, and $\\sin 0$ is $0$, not $1$." },
      ],
    },
    {
      id: "c-monotonic",
      prompt: "As the input runs from $-1$ to $1$, the arcsine output runs from:",
      choices: [
        { text: "$0$ up to $\\pi$", explain: "That interval is not the restricted domain of sine, so it is not arcsine's range." },
        { text: "$-1$ up to $1$", explain: "Those are the inputs. Arcsine returns angles, not the same numbers back." },
        { text: "$-\\tfrac{\\pi}{2}$ up to $\\tfrac{\\pi}{2}$", correct: true, explain: "Arcsine increases steadily across its full range, from $-\\tfrac{\\pi}{2}$ to $\\tfrac{\\pi}{2}$." },
        { text: "$\\tfrac{\\pi}{2}$ down to $-\\tfrac{\\pi}{2}$", explain: "Arcsine increases, it does not decrease. A downward run would be the wrong direction." },
      ],
    },
  ],
  summit: [
    {
      id: "s-eval-neg",
      prompt: "Reading the arcsine graph, $\\arcsin\\left(-\\dfrac{1}{2}\\right) = $",
      choices: [
        { text: "$-\\dfrac{\\pi}{6}$", correct: true, explain: "Since $\\sin\\left(-\\dfrac{\\pi}{6}\\right) = -\\dfrac{1}{2}$ and $-\\dfrac{\\pi}{6}$ sits in the range, the curve returns that angle." },
        { text: "$\\dfrac{\\pi}{6}$", explain: "That is $\\arcsin\\dfrac{1}{2}$. The input is negative, so the output is negative." },
        { text: "$-\\dfrac{\\pi}{3}$", explain: "$\\sin\\left(-\\dfrac{\\pi}{3}\\right) = -\\dfrac{\\sqrt{3}}{2}$, not $-\\dfrac{1}{2}$." },
        { text: "$-\\dfrac{1}{2}$", explain: "The output is an angle, not the input value repeated back." },
      ],
    },
    {
      id: "s-arcsin-noasym",
      prompt: "Does $y = \\arcsin x$ have horizontal asymptotes?",
      choices: [
        { text: "Yes, at $y = \\tfrac{\\pi}{2}$ and $y = -\\tfrac{\\pi}{2}$.", explain: "Arcsine actually reaches those heights at its endpoints, so they are values it attains, not asymptotes." },
        { text: "Yes, at $y = 1$ and $y = -1$.", explain: "Those are the input limits, and arcsine has no asymptotes at all." },
        { text: "No. Instead it has vertical asymptotes at $x = \\pm 1$.", explain: "At $x = \\pm 1$ arcsine has solid endpoints, not walls." },
        { text: "No. It has closed endpoints at $\\left(-1, -\\tfrac{\\pi}{2}\\right)$ and $\\left(1, \\tfrac{\\pi}{2}\\right)$.", correct: true, explain: "The curve simply stops at those two points, so there is nothing to approach." },
      ],
    },
    {
      id: "s-arcsin-incr",
      prompt: "On its domain $[-1, 1]$, the function $y = \\arcsin x$ is:",
      choices: [
        { text: "increasing", correct: true, explain: "The restricted sine climbs from $-1$ to $1$, so its reflection climbs from $-\\dfrac{\\pi}{2}$ to $\\dfrac{\\pi}{2}$." },
        { text: "decreasing", explain: "Arcsine rises. A downward run would undo the increasing sine piece." },
        { text: "constant", explain: "The outputs change from $-\\dfrac{\\pi}{2}$ to $\\dfrac{\\pi}{2}$, so the graph is not flat." },
        { text: "increasing then decreasing", explain: "Arcsine is monotonic. It climbs once and never turns around." },
      ],
    },
    {
      id: "s-why-range",
      prompt: "Why do the outputs of $y = \\arcsin x$ stay inside $\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right]$?",
      choices: [
        { text: "Because that interval was the restricted domain of sine, and inverting swaps domain and range", correct: true, explain: "Sine took that interval to $[-1, 1]$. After the reflection, those old inputs become the new outputs." },
        { text: "Because arcsine is undefined outside that interval", explain: "The outputs are forced by the swap. The inputs are the ones limited to $[-1, 1]$." },
        { text: "Because sine itself only takes values in that interval", explain: "Sine takes values in $[-1, 1]$. The angle interval is the restricted domain we chose." },
        { text: "Because every inverse has that range", explain: "The range is this specific restriction, not a rule for every inverse." },
      ],
    },
    {
      id: "s-why-not-full",
      prompt: "Why can we not invert sine on $[0, 2\\pi]$ and still get a function?",
      choices: [
        { text: "Over a full period sine repeats every output, so a horizontal line meets it twice", correct: true, explain: "The full wave is many-to-one. Only the one rising piece from $-\\dfrac{\\pi}{2}$ to $\\dfrac{\\pi}{2}$ passes the horizontal line test." },
        { text: "Sine is undefined on that interval", explain: "Sine is defined everywhere. The problem is repeated outputs, not missing inputs." },
        { text: "The outputs would leave $[-1, 1]$", explain: "Sine still stays in $[-1, 1]$. The failure is many-to-one, not unbounded output." },
        { text: "Inverses need a half-open interval", explain: "There is no such rule. We restrict to the one-to-one piece $\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right]$." },
      ],
    },
    {
      id: "s-neg-arcsin",
      prompt: "How does the graph of $y = -\\arcsin x$ compare to $y = \\arcsin x$?",
      choices: [
        { text: "It still increases, from $-\\dfrac{\\pi}{2}$ to $\\dfrac{\\pi}{2}$", explain: "The negative sign flips the curve over the $x$-axis, so it decreases instead." },
        { text: "It decreases, from $\\dfrac{\\pi}{2}$ down to $-\\dfrac{\\pi}{2}$", correct: true, explain: "Negating the outputs flips the graph. The endpoints swap roles: $\\arcsin 1 = \\dfrac{\\pi}{2}$ becomes $-\\dfrac{\\pi}{2}$." },
        { text: "It is the same graph", explain: "The sign flip changes every output, so the graphs are reflections of each other." },
        { text: "It has domain $\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right]$", explain: "The domain is still $[-1, 1]$. Negating outputs does not change the inputs." },
      ],
    },
    {
      id: "s-stretch-arcsin",
      prompt: "What is the range of $y = 2\\arcsin x$?",
      choices: [
        { text: "$\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right]$", explain: "You forgot to double the outputs after the vertical stretch." },
        { text: "$[-\\pi, \\pi]$", correct: true, explain: "Double each end of arcsine's range: $2\\cdot\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right] = [-\\pi, \\pi]$." },
        { text: "$[-2, 2]$", explain: "The stretch multiplies the angle $\\dfrac{\\pi}{2}$, not the number $1$. The ends become $\\pm\\pi$." },
        { text: "$[-1, 1]$", explain: "That is the domain of inputs, which a vertical stretch does not change." },
      ],
    },
    {
      id: "s-arcsin-hshift",
      prompt: "What is the domain of $y = \\arcsin(x - 2)$?",
      choices: [
        { text: "$[-1, 1]$", explain: "That is the domain before shifting. Replacing $x$ with $x - 2$ slides it to the right." },
        { text: "$[-3, -1]$", explain: "The shift goes the other way. Solve $-1 \\le x - 2 \\le 1$." },
        { text: "$[1, 3]$", correct: true, explain: "We need $-1 \\le x - 2 \\le 1$, so adding $2$ gives $1 \\le x \\le 3$." },
        { text: "$\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$", explain: "That is the range of outputs, not the domain of inputs." },
      ],
    },
    {
      id: "s-arcsin-compress",
      prompt: "What is the domain of $y = \\arcsin(2x)$?",
      choices: [
        { text: "$\\left[-\\tfrac{1}{2}, \\tfrac{1}{2}\\right]$", correct: true, explain: "We need $-1 \\le 2x \\le 1$, so dividing by $2$ gives $-\\tfrac{1}{2} \\le x \\le \\tfrac{1}{2}$." },
        { text: "$[-2, 2]$", explain: "That multiplies instead of divides. Solve $-1 \\le 2x \\le 1$ to shrink the interval." },
        { text: "$[-1, 1]$", explain: "The inner factor $2$ compresses the domain, so it is not left unchanged." },
        { text: "$\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$", explain: "That is the range, not the domain." },
      ],
    },
    {
      id: "s-reflect-neg",
      prompt: "The point $\\left(-\\dfrac{\\pi}{2}, -1\\right)$ lies on the restricted sine. Where is the matching point on $y = \\arcsin x$?",
      choices: [
        { text: "$\\left(-\\dfrac{\\pi}{2}, -1\\right)$", explain: "That is the point on sine. You must swap the coordinates." },
        { text: "$\\left(-1, -\\dfrac{\\pi}{2}\\right)$", correct: true, explain: "Swap the coordinates. Indeed $\\arcsin(-1) = -\\dfrac{\\pi}{2}$." },
        { text: "$\\left(-1, \\dfrac{\\pi}{2}\\right)$", explain: "Sign slip on the output. $\\arcsin(-1)$ is negative." },
        { text: "$\\left(1, -\\dfrac{\\pi}{2}\\right)$", explain: "Sign slip on the input. $\\sin\\left(-\\dfrac{\\pi}{2}\\right) = -1$, so the input is $-1$." },
      ],
    },
    {
      id: "s-arcsin-ends",
      prompt: "As $x$ runs from $-1$ to $1$, the arcsine graph goes:",
      choices: [
        { text: "from $\\left(-1, -\\dfrac{\\pi}{2}\\right)$ up to $\\left(1, \\dfrac{\\pi}{2}\\right)$", correct: true, explain: "$\\arcsin(-1) = -\\dfrac{\\pi}{2}$ and $\\arcsin 1 = \\dfrac{\\pi}{2}$, so the graph increases across its full range." },
        { text: "from $\\left(-1, \\dfrac{\\pi}{2}\\right)$ down to $\\left(1, -\\dfrac{\\pi}{2}\\right)$", explain: "That reverses the direction. Arcsine increases, it does not decrease." },
        { text: "from $(-1, \\pi)$ down to $(1, 0)$", explain: "Those endpoints belong to a different inverse. Arcsine uses $\\pm\\dfrac{\\pi}{2}$." },
        { text: "from $\\left(-\\dfrac{\\pi}{2}, -1\\right)$ to $\\left(\\dfrac{\\pi}{2}, 1\\right)$", explain: "The coordinates are swapped. Those points sit on the restricted sine, not on arcsine." },
      ],
    },
    {
      id: "s-domain-here",
      prompt: "The domain of $y = \\arcsin x$ is:",
      choices: [
        { text: "$[-1, 1]$", correct: true, explain: "Arcsine accepts the outputs of the restricted sine, which fill $[-1, 1]$." },
        { text: "$\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right]$", explain: "That is the range, the angles it returns, not the inputs it accepts." },
        { text: "all real numbers", explain: "Sine never produced values outside $[-1, 1]$, so there is nothing to undo there." },
        { text: "$[0, \\pi]$", explain: "That is a different restriction interval, not the domain of arcsine." },
      ],
    },
    {
      id: "s-read-one",
      prompt: "Reading the arcsine graph, $\\arcsin 1 = $",
      choices: [
        { text: "$\\dfrac{\\pi}{2}$", correct: true, explain: "$\\sin\\dfrac{\\pi}{2} = 1$, and $\\dfrac{\\pi}{2}$ is the right-hand endpoint of the range." },
        { text: "$1$", explain: "The output is an angle, not the input repeated back." },
        { text: "$\\dfrac{\\pi}{6}$", explain: "That is $\\arcsin\\dfrac{1}{2}$. The input $1$ is the far-right endpoint." },
        { text: "$\\pi$", explain: "$\\sin\\pi = 0$, and $\\pi$ is outside arcsine's range." },
      ],
    },
    {
      id: "s-arcsin-vshift",
      prompt: "The graph $y = \\arcsin x + \\tfrac{\\pi}{2}$ has which range?",
      choices: [
        { text: "$\\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]$", explain: "You forgot to add $\\tfrac{\\pi}{2}$ to the outputs after shifting up." },
        { text: "$[0, \\pi]$", correct: true, explain: "Shift arcsine's range up by $\\tfrac{\\pi}{2}$: $\\left[-\\tfrac{\\pi}{2} + \\tfrac{\\pi}{2}, \\tfrac{\\pi}{2} + \\tfrac{\\pi}{2}\\right] = [0, \\pi]$." },
        { text: "$[-1, 1]$", explain: "That is arcsine's domain of inputs, not its shifted outputs." },
        { text: "$\\left[\\tfrac{\\pi}{2}, \\tfrac{3\\pi}{2}\\right]$", explain: "That adds $\\pi$ to each end. The shift here is only $\\tfrac{\\pi}{2}$." },
      ],
    },
    {
      id: "s-true",
      prompt: "Which statement about the arcsine graph in this lesson is **true**?",
      choices: [
        { text: "It increases from $\\left(-1, -\\dfrac{\\pi}{2}\\right)$ to $\\left(1, \\dfrac{\\pi}{2}\\right)$, with solid endpoints and no asymptotes.", correct: true, explain: "The reflection of the restricted sine stops at those two points. The outputs stay in $\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right]$." },
        { text: "It decreases across its domain.", explain: "Arcsine increases, matching the rising sine piece it came from." },
        { text: "It has vertical asymptotes at $x = \\pm 1$.", explain: "At $x = \\pm 1$ the graph has solid endpoints, not walls." },
        { text: "Its domain is all real numbers.", explain: "The domain is only $[-1, 1]$, the old range of the restricted sine." },
      ],
    },
  ],
};
