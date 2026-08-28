# 07. Degree-radian conversion

- Skill id: `deg-rad`
- Unit: Trig completion (Unit 2, block start)
- Status: authored (Journey lesson `degrees-radians`)
- Figure engine: `AlgebraFlow` (dynamic equations) + a draggable angle dial.

## Goal
Convert fluently between degrees and radians using the bridge 180 degrees = pi, multiplying by pi/180 or 180/pi and reducing.

## Skills from the original 57-list covered here
- `deg-rad` Degree-radian conversion

## Prerequisites (must already be learned)
- Unit circle and the idea of a full turn.
- Reducing fractions; exact values are not needed.

## Sources to cite (>= 2 credible)
- OpenStax Precalculus 2e: Angles (radian measure).
- Sullivan, Precalculus: Angles and Their Measure.

## Slides (one idea per slide; one visual change per beat)
1. The bridge: a radian is arc length, a full turn is 2 pi, so 180 = pi; halve to reach 90 = pi/2 and split to 60 = pi/3. Dial animates through each angle.
2. Degrees to radians: multiply by pi/180, cancel the degree unit, reduce the fraction (struck 120 over 180 with the 2 and 3). Live from the dial.
3. Radians to degrees: multiply by 180/pi, cancel pi, simplify to a whole number of degrees (worked on 5 pi/6 = 150).

## Questions (retrieval; prefer manipulate/plot; predict-before-reveal)
- Slide 1: choice, half turn in radians; choice, 90 degrees in radians.
- Slide 2: manipulate, turn the dial to the angle equal to 3 pi/4 (135 degrees); choice, 30 degrees to radians.
- Slide 3: choice, 7 pi/6 to degrees; choice, the correct conversion factor.

## Figure and interactions (draw it literally; let the learner play)
- A dial showing the swept arc; draggable, snaps to 15 degrees so radian fractions stay clean.
- The conversion writes itself line by line with operation arrows and a visible cancel.

## Known pitfalls to avoid
- The 360-degree dial must draw a full ring, not a degenerate arc (handled).
- Manipulate must not start on the answer (starts at 60 degrees, answer is 135).
