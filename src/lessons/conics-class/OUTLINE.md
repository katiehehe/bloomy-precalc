# conics-class: Classifying conics from the general form

## Skill
`conics-class` (Unit 7 Conics, planned). Given the general second-degree
equation with no xy term, name the conic from the coefficients of the squared
terms.

## Core idea (the hand procedure)
General form (precalc, no xy term):

  A x^2 + C y^2 + D x + E y + F = 0

Only A and C (the coefficients of the squared terms) decide the *type*:
- exactly one of A, C is zero (one variable is not squared) -> **parabola**
- A and C both nonzero, **same sign**:
    - A = C  -> **circle**
    - A != C -> **ellipse**
- A and C **opposite signs** (AC < 0) -> **hyperbola**

Compact test with the product AC:
- AC = 0 -> parabola
- AC > 0 -> ellipse (circle when A = C)
- AC < 0 -> hyperbola

D, E only shift the center; F only sets the size. They never change the type.

## Verified examples
- Ellipse: 4x^2 + 9y^2 - 36 = 0 -> x^2/9 + y^2/4 = 1. A=4, C=9 (AC=36>0, A!=C).
  a=3 (x semi-axis), b=2 (y semi-axis). Foci on x-axis, c=sqrt(9-4)=sqrt5.
- Circle: x^2 + y^2 - 4x - 6y + 9 = 0. Complete the square:
    (x^2-4x) + (y^2-6y) + 9 = 0
    (x-2)^2 - 4 + (y-3)^2 - 9 + 9 = 0
    (x-2)^2 + (y-3)^2 = 4.   center (2,3), r=2. A=C=1 -> circle.
- Hyperbola: x^2 - y^2 - 4 = 0 -> x^2/4 - y^2/4 = 1. A=1, C=-1 (AC=-1<0).
  a=2, b=2, asymptotes y = +/- x, foci c=sqrt(4+4)=2sqrt2 on x-axis.
- Parabola: x^2 - 4x - y + 4 = 0 -> y = (x-2)^2. A=1, C=0 -> parabola.
  vertex (2,0), opens up, coeff 1.

## Your turn (interactive)
Family x^2 + C y^2 = 4 with A = 1 fixed, C an integer dial in [-3, 5], start 4.
- C = 1 -> circle (x^2 + y^2 = 4), r = 2.
- C > 0, C != 1 -> ellipse: x^2/4 + y^2/(4/C) = 1, a=2 (x), b=2/sqrt(C) (y).
- C < 0 -> hyperbola: x^2/4 - y^2/(4/|C|) = 1, a=2, b=2/sqrt(|C|), asymptotes.
- C = 0 -> degenerate line pair x = +/- 2 (the boundary case).
Manipulate target: make it a circle, C = 1 (start C = 4, an ellipse, off-answer).

## Slides (5)
1. `general` (ConicPlane ellipse): general form, the four-case rule, apply to
   4x^2+9y^2-36=0 -> ellipse; reveal the curve as confirmation.
2. `complete` (AlgebraFlow): x^2+y^2-4x-6y+9=0, complete the square to
   (x-2)^2+(y-3)^2=4; A=C -> circle, center (2,3), r=2.
3. `hyperbola` (ConicPlane): x^2-y^2-4=0 -> hyperbola (opposite signs), asymptotes.
4. `parabola` (ConicPlane): x^2-4x-y+4=0 -> parabola (a missing square).
5. `yourturn` (ConicPlane): morph x^2 + C y^2 = 4 with the C dial; circle at C=1.

## Figure plan
Shared `src/components/ConicPlane.tsx` (grid + circle/ellipse/parabola/hyperbola/
line-pair, centered at (h,k), foci/directrix/asymptotes/vertices/center/points,
underlay/overlay). Watch slides gate the curve behind a reveal so the learner
reasons from A and C first, then sees the confirming shape. The complete-the-
square slide uses the shared AlgebraFlow.

## Reveal flags (read literally in Stage.tsx)
- general:   ac, verdict, curve, dock
- complete:  e1, e2, e3, e4 (AlgebraFlow steps)
- hyperbola: ac, verdict, curve, dock
- parabola:  ac, verdict, curve, dock
- yourturn:  dock (curve always shown; morphs with C)

## Quiz plan
Climb (15): direct classification from A, C; the rule and the product test;
circle vs ellipse (A=C vs A!=C); parabola from a missing square; sign test for
hyperbola. Traps: "two squared terms always = circle", ignoring the sign,
letting D/E/F change the type.
Summit (15): complete the square to standard form + center/radius/vertex;
harder sign traps; degenerate cases (line pair, point, no graph); classify with
coefficients on both sides; which coefficient to change to switch type.
