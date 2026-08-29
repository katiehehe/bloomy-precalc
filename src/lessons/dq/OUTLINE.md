# Difference quotient (dq)

Skill: `dq` (topic: calc). Average rate of change, the difference quotient, and
the secant-to-tangent idea that opens calculus. Running example f(x) = x^2 at
a = 1, where the difference quotient simplifies to 2 + h and the tangent slope
is 2.

## Takeaways
- Average rate of change of f on [a, b] is the slope of the secant line:
  (f(b) - f(a)) / (b - a).
- Writing b = a + h, that is the **difference quotient** (f(a+h) - f(a)) / h,
  where h is the run and f(a+h) - f(a) is the rise.
- For f(x) = x^2 at a = 1: (f(1+h) - f(1))/h = ((1+h)^2 - 1)/h = (2h + h^2)/h
  = 2 + h  (valid for h != 0, since we divide by h).
- As h shrinks toward 0 the secant tilts toward the **tangent line**, and its
  slope approaches 2. That limiting slope is the instantaneous rate of change
  (the derivative) at x = 1.

## Slides
1. secant  - average rate of change = secant slope. f(x)=x^2, from (1,1) to
   (2,4): slope = (4-1)/(2-1) = 3. Show rise 3, run 1.
2. formula - rename b = a + h. The difference quotient (f(a+h)-f(a))/h with the
   run h and the rise f(a+h)-f(a) labeled on the same secant (a=1, h=1).
3. shrink  - AlgebraFlow: ((1+h)^2 - 1)/h = (2h+h^2)/h = 2 + h. Secants for
   h = 1, 0.5, 0.25 (slopes 3, 2.5, 2.25) tilt toward the tangent.
4. tangent - h -> 0 gives slope 2. Draw the tangent y = 2x - 1 at (1,1). Name it
   the instantaneous rate of change / derivative.
5. your-turn - slider h in [0.1, 1.5]. Secant from (1,1) to (1+h,(1+h)^2) with a
   live slope readout 2 + h. Start h = 1.5 (slope 3.5). Target slope 2.5 (h=0.5).

## Figure
Shared `CurvePlane` (half = 6): the parabola as a curve, closed points at the
secant ends, the secant/tangent as lines with slope labels, and dashed guides
for the rise and run. Slide 3 docks an `AlgebraFlow` derivation.

## Quiz
Climb 15 + Summit 15. Traps: slope as run/rise (inverted), forgetting to divide
by h, plugging h = 0 before simplifying, difference quotient vs average of f,
secant vs tangent, sign errors expanding (a+h)^2, and reading rate of change as
f(a) rather than a slope.
