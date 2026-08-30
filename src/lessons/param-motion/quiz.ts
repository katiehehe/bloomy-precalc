import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Parametric motion models".
 * Grounded in the lesson: a moving object's position at time t is the pair
 * (x(t), y(t)); the horizontal coordinate is linear (steady, no sideways force)
 * while the vertical coordinate is quadratic (gravity gives the -1/2 g t^2 term),
 * which is why the path is a parabola. The landing time solves y(t) = 0 for
 * t > 0; the range is x at that landing time; the peak time is half the landing
 * time (ground to ground); the maximum height is y at the peak time.
 * Distractors are the classic traps: swapping x and y, using the wrong equation,
 * forgetting gravity makes y quadratic, using the landing time for the max height
 * (off by a factor of 2, since the peak time is half the landing time), sign
 * errors on the -1/2 g t^2 term, and confusing the range (a distance) with a time.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-read-x",
      prompt: "A drone follows $x(t) = 2t$ and $y(t) = 4t - t^2$. What is its horizontal position $x$ at $t = 3$?",
      choices: [
        { text: "$6$", correct: true, explain: "$x(3) = 2(3) = 6$." },
        { text: "$3$", explain: "That is the height $y(3) = 4(3) - 3^2 = 3$, not the horizontal position." },
        { text: "$9$", explain: "That uses $x = 3t$. Here $x = 2t$, so $x(3) = 6$." },
        { text: "$2$", explain: "That is $x(1) = 2$, the position one second earlier." },
      ],
    },
    {
      id: "c-read-y",
      prompt: "For $x(t) = 2t$ and $y(t) = 4t - t^2$, what is the height $y$ at $t = 1$?",
      choices: [
        { text: "$2$", explain: "That is $x(1) = 2$, the horizontal position, not the height." },
        { text: "$4$", explain: "That is $4(1)$. You dropped the $-1^2$ gravity term." },
        { text: "$3$", correct: true, explain: "$y(1) = 4(1) - 1^2 = 4 - 1 = 3$." },
        { text: "$5$", explain: "That adds instead of subtracting. The gravity term is $-1^2$, so $4 - 1 = 3$." },
      ],
    },
    {
      id: "c-position-pair",
      prompt: "With $x(t) = 2t$ and $y(t) = 4t - t^2$, where is the object at $t = 2$?",
      choices: [
        { text: "$(2,\\ 4)$", explain: "The height is right, but $x(2) = 2(2) = 4$, not $2$." },
        { text: "$(4,\\ 8)$", explain: "The $x$ is right, but $y(2) = 4(2) - 2^2 = 4$. The $8$ forgets the $-t^2$ term." },
        { text: "$(2,\\ 2)$", explain: "That is the point $(t,\\ t)$. The model gives $x = 2t$ and $y = 4t - t^2$." },
        { text: "$(4,\\ 4)$", correct: true, explain: "$x(2) = 4$ and $y(2) = 8 - 4 = 4$." },
      ],
    },
    {
      id: "c-which-linear",
      prompt: "In a projectile model, which coordinate is linear (a steady, equal change each second)?",
      choices: [
        { text: "the height $y(t)$", explain: "The height is quadratic. Gravity changes it by different amounts each second." },
        { text: "the horizontal position $x(t)$", correct: true, explain: "With no sideways force, $x$ changes by the same amount each second, so it is linear." },
        { text: "both coordinates", explain: "Only the horizontal coordinate is linear. The height is quadratic." },
        { text: "neither coordinate", explain: "The horizontal coordinate is linear, so 'neither' is wrong." },
      ],
    },
    {
      id: "c-which-quadratic",
      prompt: "Which coordinate of a projectile is quadratic, curved by gravity?",
      choices: [
        { text: "the horizontal position $x(t)$", explain: "The horizontal position is linear. Gravity does not act sideways." },
        { text: "both coordinates", explain: "Only the height is quadratic. The horizontal position stays linear." },
        { text: "the height $y(t)$", correct: true, explain: "Gravity bends the height with a $-\\tfrac{1}{2}g t^2$ term, so $y(t)$ is quadratic." },
        { text: "neither coordinate", explain: "The height is quadratic, so 'neither' is wrong." },
      ],
    },
    {
      id: "c-why-quadratic",
      prompt: "Why is the height $y(t) = 4t - t^2$ quadratic rather than linear?",
      choices: [
        { text: "The $-t^2$ gravity term makes it quadratic.", correct: true, explain: "The squared-time term, from $-\\tfrac{1}{2}g t^2$, is what makes $y$ quadratic." },
        { text: "Because $4t$ is a quadratic term.", explain: "$4t$ is linear. The quadratic part is the $-t^2$." },
        { text: "Because $x(t)$ is squared as well.", explain: "$x(t) = 2t$ is linear and has no squared term." },
        { text: "It is actually linear.", explain: "The $-t^2$ term is squared, so the height is quadratic, not linear." },
      ],
    },
    {
      id: "c-why-x-linear",
      prompt: "The horizontal position $x(t) = 2t$ stays linear because",
      choices: [
        { text: "gravity pulls it sideways at a steady rate.", explain: "Gravity acts vertically, not sideways. It does not touch $x$." },
        { text: "the ball keeps speeding up horizontally.", explain: "If it sped up, $x$ would be quadratic. Instead the sideways speed is constant." },
        { text: "$x$ depends on $t^2$.", explain: "$x = 2t$ has no squared term, which is exactly why it is linear." },
        { text: "there is no horizontal force, so the sideways speed is constant.", correct: true, explain: "Constant sideways speed gives equal steps each second, which is linear." },
      ],
    },
    {
      id: "c-set-zero",
      prompt: "To find when a ground launch lands, which equation do you set equal to zero?",
      choices: [
        { text: "$x(t)$, the horizontal position", explain: "Setting $x = 0$ finds the start, not the landing. Landing is about height." },
        { text: "$y(t)$, the height", correct: true, explain: "Landing means the height is $0$, so solve $y(t) = 0$." },
        { text: "the product $x(t)\\,y(t)$", explain: "Only the height needs to be zero at landing, not the product." },
        { text: "the time $t$ itself", explain: "You solve for $t$. You do not set $t$ itself to zero." },
      ],
    },
    {
      id: "c-landing-solve",
      prompt: "Solve $y(t) = 4t - t^2 = 0$ for the landing time $t > 0$.",
      choices: [
        { text: "$t = 0$", explain: "$t = 0$ is the launch. The landing needs $t > 0$." },
        { text: "$t = 2$", explain: "$t = 2$ is the peak time (half the landing), not the landing." },
        { text: "$t = 4$", correct: true, explain: "$t(4 - t) = 0$ gives $t = 0$ or $t = 4$. The landing is $t = 4$." },
        { text: "$t = 8$", explain: "$8$ is the range $x(4)$, a distance, not a time." },
      ],
    },
    {
      id: "c-peak-half",
      prompt: "A ground-to-ground launch lands at $t = 4$. When does it reach its peak height?",
      choices: [
        { text: "$t = 2$, half the landing time", correct: true, explain: "By symmetry the peak sits in the middle of the flight, at half the landing time." },
        { text: "$t = 4$, the same as the landing time", explain: "At $t = 4$ it is back on the ground, not at the top." },
        { text: "$t = 8$, twice the landing time", explain: "The peak comes earlier than landing, not later." },
        { text: "$t = 0$, the launch", explain: "It starts on the ground, so the peak is not at $t = 0$." },
      ],
    },
    {
      id: "c-max-height",
      prompt: "The peak of $y(t) = 4t - t^2$ is at $t = 2$. Find the maximum height.",
      choices: [
        { text: "$8$", explain: "That is $4(2)$. You dropped the $-t^2$ gravity term." },
        { text: "$4$", correct: true, explain: "$y(2) = 4(2) - 2^2 = 8 - 4 = 4$." },
        { text: "$0$", explain: "$0$ is $y(4)$, the height at the landing time, not the peak." },
        { text: "$2$", explain: "That is the peak time $t = 2$, not the height." },
      ],
    },
    {
      id: "c-range",
      prompt: "A launch has $x(t) = 2t$ and lands at $t = 4$. What is its range (horizontal distance)?",
      choices: [
        { text: "$4$", explain: "$4$ is the landing time, a time, not a distance." },
        { text: "$2$", explain: "$2$ is the horizontal speed factor, not the distance traveled." },
        { text: "$16$", explain: "That squares the time. The range is $x(4) = 2(4) = 8$." },
        { text: "$8$", correct: true, explain: "Range is the horizontal position at landing: $x(4) = 2(4) = 8$." },
      ],
    },
    {
      id: "c-initial-height",
      prompt: "In $y(t) = h_0 + (v_0\\sin\\theta)\\,t - \\tfrac{1}{2}g t^2$, what does $y(0)$ give?",
      choices: [
        { text: "$h_0$, the initial launch height", correct: true, explain: "At $t = 0$ every term with a $t$ vanishes, leaving $y(0) = h_0$." },
        { text: "the landing time", explain: "The landing time comes from solving $y(t) = 0$, not from $y(0)$." },
        { text: "the maximum height", explain: "The maximum height is $y$ at the peak time, not at $t = 0$." },
        { text: "the range", explain: "The range is a horizontal distance, read from $x$, not from $y(0)$." },
      ],
    },
    {
      id: "c-which-time-maxht",
      prompt: "To get the maximum height, which time do you plug into $y(t)$?",
      choices: [
        { text: "the landing time", explain: "The landing time gives height $0$. The ball is on the ground then." },
        { text: "$t = 0$, the launch", explain: "At the launch the ball is at its starting height, not its highest." },
        { text: "the peak time (half the landing time)", correct: true, explain: "The top of the arc is at the peak time, so plug that in." },
        { text: "the range", explain: "The range is a distance, not a time you can plug into $y(t)$." },
      ],
    },
    {
      id: "c-distance-not-time",
      prompt: "For a launch with $x(t) = 2t$ that lands at $t = 4$, the value $x(4) = 8$ is",
      choices: [
        { text: "a time: when it lands", explain: "The landing time is $t = 4$. $x(4)$ is what you get after plugging it in." },
        { text: "a distance: the range, how far it travels", correct: true, explain: "$x$ is a horizontal position, so $x(4) = 8$ is the range, a distance." },
        { text: "a height: how high it goes", explain: "Height is read from $y$, not $x$. $x(4)$ is horizontal." },
        { text: "a speed: how fast it moves", explain: "$x(4)$ is a position, not a rate. The speed factor is the $2$ in $2t$." },
      ],
    },
  ],
  summit: [
    {
      id: "s-m1-landing",
      prompt: "A ball follows $x(t) = 2t$ and $y(t) = 4t - t^2$. When does it land?",
      choices: [
        { text: "$t = 2$", explain: "$t = 2$ is the peak time, half the landing. It is still in the air." },
        { text: "$t = 8$", explain: "$8$ is the range $x(4)$, a distance, not the landing time." },
        { text: "$t = 4$", correct: true, explain: "$y(t) = t(4 - t) = 0$ gives $t = 4$ for the landing ($t > 0$)." },
        { text: "$t = 0$", explain: "$t = 0$ is the launch. The landing is the later zero of $y$." },
      ],
    },
    {
      id: "s-m1-maxht",
      prompt: "For $x(t) = 2t$ and $y(t) = 4t - t^2$, find the maximum height.",
      choices: [
        { text: "$4$", correct: true, explain: "Peak at $t = 2$: $y(2) = 8 - 4 = 4$." },
        { text: "$0$", explain: "$0$ is $y(4)$, the landing height. Use the peak time $t = 2$." },
        { text: "$8$", explain: "$8$ is $4(2)$. You dropped the $-t^2$ gravity term." },
        { text: "$3$", explain: "$3$ is $y(1)$, not the top of the arc." },
      ],
    },
    {
      id: "s-m1-range",
      prompt: "For $x(t) = 2t$ and $y(t) = 4t - t^2$, find the range (horizontal distance to landing).",
      choices: [
        { text: "$16$", explain: "That squares the landing time. The range is $x(4) = 8$." },
        { text: "$4$", explain: "$4$ is the landing time, not a distance." },
        { text: "$8$", correct: true, explain: "Land at $t = 4$, so range $= x(4) = 2(4) = 8$." },
        { text: "$2$", explain: "$2$ is the horizontal speed factor, not the distance." },
      ],
    },
    {
      id: "s-m2-maxht",
      prompt: "A rocket follows $x(t) = 3t$ and $y(t) = 12t - 3t^2$. What is its maximum height?",
      choices: [
        { text: "$24$", explain: "That is $12(2)$. You dropped the $-3t^2$ gravity term." },
        { text: "$0$", explain: "$0$ is $y(4)$ at the landing time. Use the peak time $t = 2$." },
        { text: "$6$", explain: "$6$ is $x(2)$, a horizontal distance, not the height." },
        { text: "$12$", correct: true, explain: "Land at $t = 4$, peak at $t = 2$: $y(2) = 24 - 12 = 12$." },
      ],
    },
    {
      id: "s-m2-range",
      prompt: "For $x(t) = 3t$ and $y(t) = 12t - 3t^2$, find the range.",
      choices: [
        { text: "$12$", correct: true, explain: "Land at $t = 4$ (from $3t(4 - t) = 0$), so range $= x(4) = 12$." },
        { text: "$4$", explain: "$4$ is the landing time, not a distance." },
        { text: "$9$", explain: "$9$ is $x(3)$, the position one second before landing." },
        { text: "$24$", explain: "That doubles the range. $x(4) = 3(4) = 12$." },
      ],
    },
    {
      id: "s-m3-landing",
      prompt: "A stone follows $x(t) = 2t$ and $y(t) = 6t - 3t^2$. When does it land?",
      choices: [
        { text: "$t = 1$", explain: "$t = 1$ is the peak time, half the landing, still airborne." },
        { text: "$t = 2$", correct: true, explain: "$3t(2 - t) = 0$ gives $t = 2$ for the landing." },
        { text: "$t = 4$", explain: "$4$ is the range $x(2)$, a distance, not a time." },
        { text: "$t = 6$", explain: "$y(6) \\ne 0$, so it is not the landing time." },
      ],
    },
    {
      id: "s-m3-maxht",
      prompt: "For $x(t) = 2t$ and $y(t) = 6t - 3t^2$, find the maximum height.",
      choices: [
        { text: "$0$", explain: "$0$ is $y(2)$ at the landing time. Use the peak time $t = 1$." },
        { text: "$3$", correct: true, explain: "Peak at $t = 1$: $y(1) = 6 - 3 = 3$." },
        { text: "$6$", explain: "$6$ is $6(1)$. You dropped the $-3t^2$ gravity term." },
        { text: "$4$", explain: "$4$ is the range $x(2)$, a distance, not the height." },
      ],
    },
    {
      id: "s-m4-range",
      prompt: "A jet of water follows $x(t) = 5t$ and $y(t) = 10t - 5t^2$. Find the range.",
      choices: [
        { text: "$2$", explain: "$2$ is the landing time, not a distance." },
        { text: "$10$", correct: true, explain: "Land at $t = 2$ (from $5t(2 - t) = 0$), so range $= x(2) = 10$." },
        { text: "$5$", explain: "$5$ is the maximum height $y(1)$, not the range." },
        { text: "$20$", explain: "That doubles it. $x(2) = 5(2) = 10$." },
      ],
    },
    {
      id: "s-error-landing-for-maxht",
      prompt: "To find the maximum height of $x(t) = 2t$, $y(t) = 4t - t^2$, a student plugs in the landing time $t = 4$ and gets $y(4) = 0$. What is the fix?",
      choices: [
        { text: "The maximum is at the peak time $t = 2$ (half the landing), so $y(2) = 4$.", correct: true, explain: "Height is greatest at the vertex, the peak time, not at landing." },
        { text: "Nothing is wrong. The maximum height is $0$.", explain: "$y(4) = 0$ is the ground. The ball clearly rose above it." },
        { text: "Use $t = 8$ (the range) as the time.", explain: "$8$ is a distance, not a time. The peak time is $t = 2$." },
        { text: "Use $t = 0$, the launch, which also gives $0$.", explain: "The launch is on the ground too. The peak is in the middle, $t = 2$." },
      ],
    },
    {
      id: "s-sign-of-gravity",
      prompt: "Which vertical equation models a ball thrown upward, with gravity pulling the height back down?",
      choices: [
        { text: "$y(t) = 8t + 2t^2$", explain: "A $+2t^2$ term would speed the rise forever. Gravity must subtract." },
        { text: "$y(t) = 8t$", explain: "With no gravity term the ball rises forever and never returns." },
        { text: "$y(t) = 8t - 2t^2$", correct: true, explain: "The upward $8t$ minus the gravity term $2t^2$ gives an arc that comes back down." },
        { text: "$y(t) = -8t - 2t^2$", explain: "A negative initial term sends it straight down from the start." },
      ],
    },
    {
      id: "s-interpret-point",
      prompt: "For $x(t) = 2t$ and $y(t) = 4t - t^2$, what does the point $(6,\\ 3)$, reached at $t = 3$, tell you?",
      choices: [
        { text: "The ball is $6$ units high and $3$ units downrange.", explain: "The coordinates are swapped: the first is horizontal ($6$), the second is the height ($3$)." },
        { text: "The ball is at its maximum height.", explain: "The peak is $(4,\\ 4)$ at $t = 2$. At $t = 3$ the ball is already falling." },
        { text: "The ball has just landed there.", explain: "It lands at $(8,\\ 0)$. At $(6,\\ 3)$ it is still in the air." },
        { text: "The ball is $6$ units downrange and $3$ units high, on its way down.", correct: true, explain: "$x = 6$ is horizontal distance, $y = 3$ is height, and $t = 3$ is past the peak, so it is descending." },
      ],
    },
    {
      id: "s-m6-peak-time",
      prompt: "A ball follows $x(t) = 2t$ and $y(t) = 6t - t^2$. At what time does it reach its peak?",
      choices: [
        { text: "$t = 6$", explain: "$t = 6$ is the landing time. The peak is halfway there." },
        { text: "$t = 12$", explain: "$12$ is the range $x(6)$, a distance, not a time." },
        { text: "$t = 3$", correct: true, explain: "Land at $t = 6$ (from $t(6 - t) = 0$), so the peak is at half, $t = 3$." },
        { text: "$t = 1$", explain: "$1$ is not half the landing time. The landing is $t = 6$, so the peak is $t = 3$." },
      ],
    },
    {
      id: "s-m6-maxht",
      prompt: "For $x(t) = 2t$ and $y(t) = 6t - t^2$, find the maximum height.",
      choices: [
        { text: "$18$", explain: "That is $6(3)$. You dropped the $-t^2$ gravity term." },
        { text: "$0$", explain: "$0$ is $y(6)$ at the landing time. Use the peak time $t = 3$." },
        { text: "$12$", explain: "$12$ is the range $x(6)$, a distance, not the height." },
        { text: "$9$", correct: true, explain: "Peak at $t = 3$: $y(3) = 18 - 9 = 9$." },
      ],
    },
    {
      id: "s-capstone-triple",
      prompt: "For $x(t) = 2t$ and $y(t) = 10t - 5t^2$, find the landing time, the maximum height, and the range.",
      choices: [
        { text: "landing $t = 2$, max height $5$, range $4$", correct: true, explain: "Land at $t = 2$. Peak at $t = 1$ gives $y(1) = 5$. Range $= x(2) = 4$." },
        { text: "landing $t = 2$, max height $4$, range $5$", explain: "Height and range are swapped: $y(1) = 5$ is the height and $x(2) = 4$ is the range." },
        { text: "landing $t = 1$, max height $5$, range $2$", explain: "$t = 1$ is the peak time, not the landing. The landing is $t = 2$." },
        { text: "landing $t = 2$, max height $10$, range $4$", explain: "$10$ drops the $-5t^2$ term. The true peak height is $y(1) = 5$." },
      ],
    },
    {
      id: "s-linear-vs-quadratic",
      prompt: "One projectile has $y(t) = 8t - 2t^2$. Another has $y(t) = 8t$ (no gravity term). What is the difference?",
      choices: [
        { text: "They are identical.", explain: "One height is quadratic and one is linear, so they behave very differently." },
        { text: "The second arcs higher, then falls.", explain: "$y = 8t$ is linear. It rises forever and never falls in this model." },
        { text: "The first never comes back down.", explain: "$y = 8t - 2t^2 = 2t(4 - t)$ returns to $0$ at $t = 4$. It does come down." },
        { text: "The first arcs up and back down (quadratic). The second climbs in a straight line forever (linear).", correct: true, explain: "The $-2t^2$ gravity term bends the first into an arc. Without it the height only grows linearly." },
      ],
    },
  ],
};
