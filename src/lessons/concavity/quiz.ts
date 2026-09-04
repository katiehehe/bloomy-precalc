import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for concavity and inflection. Grounded
 * in the lesson: concave up is a cup (tangent lines below, tangent slope
 * increasing, f'' > 0). Concave down is a cap (tangent lines above, slope
 * decreasing, f'' < 0). An inflection point is where concavity changes.
 * Examples: x^2 (concave up), -x^2 (concave down), x^3 (switches at 0, f'' = 6x),
 * sqrt(x) (increasing yet concave down), and x^4 (f''(0) = 0 but no inflection).
 * Distractors are the standard traps: confusing concave up with increasing,
 * putting tangents above for concave up, misreading which side of x^3 is concave
 * up, calling every critical point an inflection, and treating f'' = 0 as a
 * guarantee of an inflection. Every claim is verified by hand.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-up-def",
      prompt: "A curve is **concave up** when it bends like:",
      choices: [
        { text: "a cup, with every tangent line below the curve", correct: true, explain: "Concave up holds water like a cup. The bowl is above each of its tangent lines." },
        { text: "a cap, with every tangent line above the curve", explain: "That describes concave down, the opposite bend." },
        { text: "a straight line with no bend", explain: "A straight line has no concavity. Concave up is a genuine upward bend." },
        { text: "a cup, with every tangent line above the curve", explain: "A cup is concave up, but its tangents lie below it, not above." },
      ],
    },
    {
      id: "c-down-def",
      prompt: "A curve is **concave down** when it bends like:",
      choices: [
        { text: "a cup, with every tangent line below the curve", explain: "That is concave up. Concave down is the opposite bend." },
        { text: "a cap or frown, with every tangent line above the curve", correct: true, explain: "Concave down is a cap. The hill tucks underneath each of its tangent lines." },
        { text: "a straight ramp with no bend", explain: "A straight line has no concavity at all." },
        { text: "a cap, with every tangent line below the curve", explain: "A cap is concave down, but its tangents lie above it, not below." },
      ],
    },
    {
      id: "c-which-up",
      prompt: "Which function is concave up everywhere?",
      choices: [
        { text: "$f(x) = -x^2$", explain: "This opens downward, a cap, so it is concave down everywhere." },
        { text: "$f(x) = 2x - 1$", explain: "A line has no bend, so it is neither concave up nor concave down." },
        { text: "$f(x) = x^2$", correct: true, explain: "The parabola $x^2$ opens upward like a cup, concave up for every $x$." },
        { text: "$f(x) = \\sqrt{x}$", explain: "The square root rises but bends downward, so it is concave down." },
      ],
    },
    {
      id: "c-up-tan",
      prompt: "For a curve that is concave up, the tangent lines:",
      choices: [
        { text: "lie above the curve", explain: "That is the concave down signature. For concave up the tangents are below." },
        { text: "are always vertical", explain: "Tangent lines to these curves have finite slopes, not vertical." },
        { text: "cross the curve at three points", explain: "A tangent touches at one point. For concave up it stays below the curve." },
        { text: "lie below the curve", correct: true, explain: "The cup is above each of its tangents, so the tangents lie below the curve." },
      ],
    },
    {
      id: "c-down-tan",
      prompt: "For a curve that is concave down, the tangent lines:",
      choices: [
        { text: "lie above the curve", correct: true, explain: "The cap tucks underneath each tangent, so the tangents lie above the curve." },
        { text: "lie below the curve", explain: "That is concave up. For concave down the tangents are above." },
        { text: "are horizontal everywhere", explain: "Only at a peak is a tangent horizontal. Elsewhere it is tilted." },
        { text: "never touch the curve", explain: "A tangent line does touch, at exactly one point." },
      ],
    },
    {
      id: "c-up-slope",
      prompt: "On a concave up curve, as $x$ increases the tangent slope:",
      choices: [
        { text: "decreases", explain: "Decreasing slope is the concave down pattern." },
        { text: "increases", correct: true, explain: "Concave up means the tangent slope keeps increasing left to right (like $-3, 0, 3$ on $x^2$)." },
        { text: "stays constant", explain: "A constant slope is a straight line, which has no concavity." },
        { text: "is always negative", explain: "The slope can be negative, zero, or positive. What matters is that it is increasing." },
      ],
    },
    {
      id: "c-down-slope",
      prompt: "On a concave down curve, as $x$ increases the tangent slope:",
      choices: [
        { text: "increases", explain: "Increasing slope is the concave up pattern." },
        { text: "stays constant", explain: "A constant slope means a straight line, with no concavity." },
        { text: "decreases", correct: true, explain: "Concave down means the tangent slope keeps decreasing as $x$ increases." },
        { text: "is always positive", explain: "The slope may be positive or negative. The key is that it is decreasing." },
      ],
    },
    {
      id: "c-infl-def",
      prompt: "An **inflection point** is a point where:",
      choices: [
        { text: "the curve reaches its highest value", explain: "That is a maximum, which is about height, not about the bend switching." },
        { text: "the tangent slope is largest", explain: "Largest slope is not the definition. Inflection is about concavity changing." },
        { text: "the curve crosses the $x$-axis", explain: "That is an $x$-intercept, unrelated to concavity." },
        { text: "the concavity changes from up to down or down to up", correct: true, explain: "By definition, an inflection point is where the concavity switches direction." },
      ],
    },
    {
      id: "c-cube-up",
      prompt: "For $f(x) = x^3$, the curve is concave up on:",
      choices: [
        { text: "the right side, $x > 0$", correct: true, explain: "The right arm of $x^3$ opens upward like a cup, so it is concave up for $x > 0$." },
        { text: "the left side, $x < 0$", explain: "The left side bends downward like a cap, so it is concave down there." },
        { text: "the whole real line", explain: "$x^3$ is concave down on the left and only concave up on the right." },
        { text: "nowhere", explain: "It is concave up on the entire right side, $x > 0$." },
      ],
    },
    {
      id: "c-cube-down",
      prompt: "For $f(x) = x^3$, the curve is concave down on:",
      choices: [
        { text: "the right side, $x > 0$", explain: "The right side is concave up. It is the left side that bends downward." },
        { text: "the left side, $x < 0$", correct: true, explain: "The left arm of $x^3$ bends downward like a cap, so it is concave down for $x < 0$." },
        { text: "the whole real line", explain: "It is concave down only on the left. The right side is concave up." },
        { text: "nowhere", explain: "It is concave down on the entire left side, $x < 0$." },
      ],
    },
    {
      id: "c-cube-infl",
      prompt: "The inflection point of $f(x) = x^3$ is at:",
      choices: [
        { text: "$(1, 1)$", explain: "The concavity does not switch at $x = 1$. The whole right side is concave up." },
        { text: "$(-1, -1)$", explain: "The whole left side is concave down. The switch is not at $x = -1$." },
        { text: "$(0, 0)$", correct: true, explain: "At the origin $x^3$ switches from concave down to concave up, so $(0, 0)$ is the inflection point." },
        { text: "there is none", explain: "$x^3$ does change concavity, exactly once, at the origin." },
      ],
    },
    {
      id: "c-sqrt",
      prompt: "The function $f(x) = \\sqrt{x}$ (for $x > 0$) is:",
      choices: [
        { text: "decreasing and concave up", explain: "It rises, so it is increasing, not decreasing." },
        { text: "increasing and concave up", explain: "It is increasing, but it bends downward like a cap, so it is concave down." },
        { text: "decreasing and concave down", explain: "It is concave down, but it rises, so it is increasing, not decreasing." },
        { text: "increasing and concave down", correct: true, explain: "It rises (increasing) while flattening and bending downward (concave down)." },
      ],
    },
    {
      id: "c-indep",
      prompt: "Can a function be increasing yet concave down at the same time?",
      choices: [
        { text: "Yes, for example $\\sqrt{x}$", correct: true, explain: "$\\sqrt{x}$ rises the whole time yet bends downward, so it is increasing and concave down." },
        { text: "No, increasing always means concave up", explain: "Increasing is about the slope's sign. Concavity is a separate property, as $\\sqrt{x}$ shows." },
        { text: "No, concave down forces the function to decrease", explain: "Concave down only means the slope is decreasing. The slope can still stay positive." },
        { text: "Only if the function is a straight line", explain: "A straight line has no concavity. $\\sqrt{x}$ is a curved counterexample." },
      ],
    },
    {
      id: "c-negsq",
      prompt: "The function $f(x) = -x^2$ is:",
      choices: [
        { text: "concave up everywhere", explain: "$-x^2$ opens downward, so it is concave down, not up." },
        { text: "concave down everywhere", correct: true, explain: "$-x^2$ is a downward cap, concave down for every $x$." },
        { text: "concave up for $x > 0$ only", explain: "It is concave down on both sides. The concavity never switches." },
        { text: "has an inflection point at $x = 0$", explain: "There is no switch: it is concave down throughout, so there is no inflection point." },
      ],
    },
    {
      id: "c-mnemonic",
      prompt: "Which memory aid correctly matches the shape?",
      choices: [
        { text: "A cup that spills water is concave up", explain: "A cup holds water. A shape that spills is a cap (concave down)." },
        { text: "A cap that holds water is concave down", explain: "A cap spills water. It is the cup that holds it." },
        { text: "A cup holds water and is concave up", correct: true, explain: "Concave up is a cup or valley that could hold water: the classic mnemonic." },
        { text: "A straight line is concave up", explain: "A straight line has no bend, so it is neither concave up nor concave down." },
      ],
    },
  ],
  summit: [
    {
      id: "s-fpp-pos",
      prompt: "If $f''(x) > 0$ on an interval, the graph there is:",
      choices: [
        { text: "decreasing", explain: "The sign of $f''$ controls concavity, not whether the function rises or falls." },
        { text: "a straight line", explain: "A straight line has $f'' = 0$. A positive $f''$ means a genuine upward bend." },
        { text: "concave down", explain: "Positive $f''$ is concave up. Negative $f''$ is concave down." },
        { text: "concave up", correct: true, explain: "A positive second derivative means the slope is increasing, so the curve is concave up." },
      ],
    },
    {
      id: "s-fpp-neg",
      prompt: "If $f''(x) < 0$ on an interval, the graph there is:",
      choices: [
        { text: "concave down", correct: true, explain: "A negative second derivative means the slope is decreasing, so the curve is concave down." },
        { text: "concave up", explain: "Concave up needs $f'' > 0$. Here $f''$ is negative." },
        { text: "increasing", explain: "The sign of $f''$ sets concavity, not whether the function is increasing." },
        { text: "linear", explain: "A line has $f'' = 0$. A negative $f''$ is a downward bend." },
      ],
    },
    {
      id: "s-fpp-zero",
      prompt: "If $f''(a) = 0$, must $x = a$ be an inflection point?",
      choices: [
        { text: "Yes, always", explain: "Not always: $f'' = 0$ is only a candidate. The concavity must actually change." },
        { text: "No, it is only a candidate. The concavity must actually change sign", correct: true, explain: "For $x^4$, $f''(0) = 0$ but the curve stays concave up on both sides, so $(0,0)$ is not an inflection point." },
        { text: "Yes, but only for polynomials", explain: "Even for the polynomial $x^4$, $f''(0) = 0$ gives no inflection, so the rule fails." },
        { text: "No, because $f'' = 0$ can never happen", explain: "$f'' = 0$ happens often (for example $x^3$ and $x^4$ at $0$). It just does not guarantee an inflection." },
      ],
    },
    {
      id: "s-x4",
      prompt: "For $f(x) = x^4$, we have $f''(x) = 12x^2$, so $f''(0) = 0$. The point $(0, 0)$ is:",
      choices: [
        { text: "an inflection point, because $f'' = 0$ there", explain: "$f'' = 0$ alone is not enough. The concavity must switch, and here it does not." },
        { text: "a vertical asymptote", explain: "$x^4$ is a smooth polynomial with no asymptotes." },
        { text: "not an inflection point, since the curve is concave up on both sides", correct: true, explain: "$12x^2 \\ge 0$ for all $x$, so $x^4$ is concave up on both sides and the concavity never changes." },
        { text: "concave down near $0$", explain: "$f''(x) = 12x^2 \\ge 0$, so $x^4$ is concave up around $0$, not concave down." },
      ],
    },
    {
      id: "s-leftpar",
      prompt: "The left arm of $f(x) = x^2$ (for $x < 0$) is:",
      choices: [
        { text: "increasing and concave up", explain: "For $x < 0$ the parabola is falling, so it is decreasing, not increasing." },
        { text: "increasing and concave down", explain: "It is falling (decreasing), and $x^2$ is concave up, not down." },
        { text: "decreasing and concave down", explain: "It is decreasing, but $x^2$ is concave up everywhere, not concave down." },
        { text: "decreasing and concave up", correct: true, explain: "For $x < 0$ the height drops (decreasing), yet the cup shape keeps it concave up." },
      ],
    },
    {
      id: "s-incr-up-example",
      prompt: "Which is an example of a function that is both increasing and concave up?",
      choices: [
        { text: "the right arm of $y = x^2$ (for $x > 0$)", correct: true, explain: "For $x > 0$ the parabola rises (increasing) and keeps its cup shape (concave up)." },
        { text: "$y = \\sqrt{x}$", explain: "$\\sqrt{x}$ is increasing but concave down, not concave up." },
        { text: "the left arm of $y = x^2$ (for $x < 0$)", explain: "That arm is concave up but decreasing, not increasing." },
        { text: "$y = -x^2$ for $x > 0$", explain: "For $x > 0$ this is decreasing and concave down, the opposite of both." },
      ],
    },
    {
      id: "s-above-tan",
      prompt: "Near a point where a curve is concave up, the curve lies:",
      choices: [
        { text: "below its tangent line", explain: "That happens for concave down. For concave up the curve is above the tangent." },
        { text: "above its tangent line", correct: true, explain: "Concave up means tangents lie below the curve, so the curve lies above each tangent." },
        { text: "exactly on its tangent line", explain: "Only a straight line lies on its tangent. A concave up curve pulls away above it." },
        { text: "perpendicular to its tangent line", explain: "A curve is not perpendicular to its own tangent. It just curves away from it." },
      ],
    },
    {
      id: "s-tan-above-curve",
      prompt: "If every tangent line to a curve lies above the curve, the curve is:",
      choices: [
        { text: "concave up", explain: "Concave up has tangents below the curve, not above." },
        { text: "a straight line", explain: "A straight line coincides with its tangent. Here the tangents are strictly above." },
        { text: "concave down", correct: true, explain: "Tangents lying above the curve is exactly the concave down signature (a cap)." },
        { text: "increasing", explain: "Tangents above show the concavity (down), not whether the function rises or falls." },
      ],
    },
    {
      id: "s-crit-vs-infl",
      prompt: "How does a critical point differ from an inflection point?",
      choices: [
        { text: "They are the same thing", explain: "They are different: one is about the slope, the other about the concavity." },
        { text: "A critical point is where concavity changes", explain: "That is an inflection point. A critical point is where the slope is zero (or undefined)." },
        { text: "An inflection point is where the slope is zero", explain: "That describes a critical point. An inflection point is where concavity changes." },
        { text: "A critical point is where the slope is zero. An inflection point is where concavity changes", correct: true, explain: "Critical points concern the first derivative (slope). Inflection points concern the second derivative (concavity)." },
      ],
    },
    {
      id: "s-every-crit",
      prompt: "Is every critical point (where the slope is $0$) an inflection point?",
      choices: [
        { text: "No: at a critical point the slope is $0$, which may be a max, a min, or an inflection", correct: true, explain: "Slope $0$ does not force a concavity change. The vertex of $x^2$ has slope $0$ but is a minimum, not an inflection." },
        { text: "Yes, always", explain: "The vertex of $x^2$ has slope $0$ but no concavity change, so it is not an inflection point." },
        { text: "Yes, but only for cubics", explain: "Even cubics can have a critical point that is a max or min rather than an inflection." },
        { text: "No, because slope $0$ can never happen", explain: "Slope $0$ happens at every peak and valley. It just does not guarantee an inflection." },
      ],
    },
    {
      id: "s-localmin",
      prompt: "At the bottom of a smooth valley (a local minimum), the curve is:",
      choices: [
        { text: "concave down", explain: "A valley bottom bends upward like a cup, so it is concave up, not down." },
        { text: "concave up", correct: true, explain: "A local minimum is at the bottom of a cup, where the curve is concave up ($f'' > 0$)." },
        { text: "an inflection point", explain: "At a minimum the concavity does not switch. It stays concave up around the bottom." },
        { text: "a straight line", explain: "A smooth valley is genuinely curved (concave up), not straight." },
      ],
    },
    {
      id: "s-has-infl",
      prompt: "Which of these functions has an inflection point?",
      choices: [
        { text: "$f(x) = x^2$", explain: "$x^2$ is concave up everywhere. The concavity never changes, so no inflection point." },
        { text: "$f(x) = 2x + 1$", explain: "A line has no concavity to change, so it has no inflection point." },
        { text: "$f(x) = x^3$", correct: true, explain: "$x^3$ switches from concave down to concave up at $x = 0$, giving an inflection point at $(0,0)$." },
        { text: "$f(x) = \\sqrt{x}$", explain: "$\\sqrt{x}$ is concave down throughout its domain. The concavity never switches." },
      ],
    },
    {
      id: "s-tan-below",
      prompt: "Near a point where a curve is concave down, the curve lies:",
      choices: [
        { text: "above its tangent line", explain: "That is concave up. For concave down the curve dips below the tangent." },
        { text: "on its tangent line", explain: "Only a straight line stays on its tangent. A concave down curve bends below it." },
        { text: "perpendicular to its tangent line", explain: "A curve is never perpendicular to its own tangent." },
        { text: "below its tangent line", correct: true, explain: "Concave down means tangents lie above the curve, so the curve lies below each tangent." },
      ],
    },
    {
      id: "s-slope-changing",
      prompt: "Concavity is a statement about:",
      choices: [
        { text: "how the slope is changing (increasing or decreasing)", correct: true, explain: "Concave up means the slope is increasing. Concave down means the slope is decreasing." },
        { text: "whether the function is positive or negative", explain: "That is the sign of $f$, not its concavity." },
        { text: "whether the function is increasing or decreasing", explain: "That is the sign of the slope. Concavity is about how the slope itself changes." },
        { text: "where the curve crosses the $x$-axis", explain: "Those are the roots. Concavity is about the bending, not the intercepts." },
      ],
    },
    {
      id: "s-read",
      prompt: "A curve is increasing but concave down. Its slope is:",
      choices: [
        { text: "negative and decreasing", explain: "Increasing means the slope is positive, not negative." },
        { text: "positive but decreasing", correct: true, explain: "Increasing keeps the slope positive. Concave down means that positive slope is getting smaller." },
        { text: "positive and increasing", explain: "Increasing slope would be concave up. Here the curve is concave down." },
        { text: "zero everywhere", explain: "A zero slope everywhere is a horizontal line, which is neither increasing nor concave down." },
      ],
    },
  ],
};
