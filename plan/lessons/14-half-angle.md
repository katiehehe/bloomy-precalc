# 14. Half-angle identities

- Skill id: `half-angle`
- Unit: Trig completion (Unit 2, block start)
- Status: authored (Journey lesson `half-angle-identities`)
- Figure engine: `AlgebraFlow` (dynamic equations) + a mini unit circle.

## Goal
Derive the half-angle formulas by solving a double-angle formula backward, choose the sign by quadrant, and compute an exact value.

## Skills from the original 57-list covered here
- `half-angle` Half-angle identities

## Prerequisites (must already be learned)
- Double-angle identities (lesson 13), especially cos 2alpha = 1 - 2 sin^2 alpha and 2 cos^2 alpha - 1.
- Solving a simple equation for a squared term and taking a root.

## Sources to cite (>= 2 credible)
- OpenStax Precalculus 2e: Double-Angle, Half-Angle, and Reduction Formulas.
- Sullivan, Precalculus: Double-angle and Half-angle Formulas.

## Slides (one idea per slide; one visual change per beat)
1. Solve cos 2alpha = 1 - 2 sin^2 alpha with alpha = theta/2: isolate, divide by 2, square root, to get sin(theta/2) = +/- sqrt((1-cos theta)/2).
2. Same on 2 cos^2 alpha - 1 to get cos(theta/2) = +/- sqrt((1+cos theta)/2); then the sign rule (quadrant of theta/2).
3. Worked exact value: sin 22.5 = sin(45/2), plus sign (QI), simplify nested radicals to sqrt(2 - sqrt2)/2.

## Questions (retrieval; prefer manipulate/plot; predict-before-reveal)
- Slide 1: choice, the sine half-angle formula; choice, which double-angle form it came from.
- Slide 2: choice, the cosine half-angle formula; choice, the quadrant that decides the sign.
- Slide 3: choice, simplified value of sin 22.5; choice, why the sign is positive.

## Figure and interactions (draw it literally; let the learner play)
- Mini unit circle showing theta and theta/2.
- The algebra manipulation (isolate, divide, root) writes itself with arrows; nested radicals simplify step by step.

## Known pitfalls to avoid
- The +/- sign is chosen by the quadrant of theta/2, not theta (stated explicitly).
- Nested radical simplification is shown, not skipped.
