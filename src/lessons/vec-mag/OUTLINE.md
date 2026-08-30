# Magnitude and direction (vec-mag)

Goal: a learner can move between a vector's two descriptions, reading its magnitude with |v| = sqrt(vx^2 + vy^2) and its direction with theta = tan^-1(vy/vx) adjusted for the quadrant, and rebuilding the components with vx = |v|cos(theta) and vy = |v|sin(theta).

## Sources

1. OpenStax, Precalculus 2e, Section 8.8 "Vectors". Facts used: a position vector v = <a, b> has magnitude |v| = sqrt(a^2 + b^2) (Pythagorean theorem); the direction is found from tan(theta) = b/a, so theta = tan^-1(b/a); the component form recovered from magnitude and direction is v = |v|cos(theta) i + |v|sin(theta) j. Convention used: the direction angle is measured counterclockwise from the positive x-axis.
2. Sullivan, Precalculus (11th ed.), Chapter 10 "Polar Coordinates; Vectors", the Vectors section. Facts used: the magnitude (norm) of v = a i + b j is |v| = sqrt(a^2 + b^2); a nonzero vector can be written v = |v|(cos(alpha) i + sin(alpha) j) where alpha is the direction angle; because the calculator's inverse tangent returns only angles between -90 and 90 degrees, you must add 180 degrees when the vector lies in the second or third quadrant.

Convention decision: write the inverse tangent as tan^-1 or arctan in all copy, never atan. Direction angles are reported counterclockwise from the positive x-axis in the range 0 to 360 degrees.

## Slide-by-slide

1. Two facts a vector carries (mode single, sliders mag and dir hidden). Define magnitude and direction as two independent dials. Animate the length growing and shrinking with the heading fixed, then the heading swinging with the length fixed. Questions: what two numbers define a vector, and what stays fixed when only the direction changes.
2. From components to magnitude (mode comp). Components vx and vy are the legs of a right triangle and |v| is the hypotenuse, so |v| = sqrt(vx^2 + vy^2). Worked 3-4-5 example, then a negative vx example to show the length stays positive. Questions: magnitude of (3,4), magnitude of (5,12), plot the tip of (-3,4).
3. The direction angle and the quadrant fix (mode comp). tan(theta) = vy/vx so theta = tan^-1(vy/vx), but the calculator only returns -90 to 90 degrees, so add 180 degrees in quadrants II and III. Worked (4,3) then (-4,3). Questions: the arctan range, the quadrant-III correction, which quadrants need +180.
4. From magnitude and direction back to components (mode single). vx = |v|cos(theta), vy = |v|sin(theta). Worked |v| = 5 at several directions. Questions: compute vx and vy from |v| and theta, and pick the correct pair of formulas.
5. Your turn (mode single, sliders visible). Steer the live vector. Manipulate: point it straight up (theta = 90), then build v = (0,4). A 5-12-13 application choice. The resting vector is parked at |v| = 3, theta = 150 so no question starts solved.

## Parameters
- single mode: mag (20 to 100, maps to |v| = mag/20) and dir (0 to 360 degrees).
- comp mode: vx and vy (each -100 to 100, maps to world = value/20).
- SCALE = 20 slider units per world unit, matched in slides.ts and Stage.tsx.
