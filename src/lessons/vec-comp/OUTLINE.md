# Component and unit-vector form (vec-comp)

Goal: a learner can read a vector's components (vx, vy), rewrite it with the standard unit vectors as v = vx i + vy j, find the unit vector in v's direction with v-hat = v/|v| (a vector of length 1), and build a vector of a chosen length in a chosen direction by scaling a unit vector.

## Sources

1. OpenStax, Precalculus 2e, Section 8.8 "Vectors". Facts used: the horizontal unit vector is i = <1, 0> and the vertical unit vector is j = <0, 1>; the position vector from (0,0) to (a, b) is written v = a i + b j, called a linear combination of i and j; the unit vector in the same direction as any nonzero vector is found by dividing the vector by its magnitude, v/|v|; and a vector is written in magnitude-direction form as v = |v|cos(theta) i + |v|sin(theta) j.
2. Sullivan, Precalculus (11th ed.), Chapter 10 "Polar Coordinates; Vectors", the Vectors section. Facts used: i and j are the unit vectors along the x- and y-axes; any vector can be expressed as a i + b j where a and b are its components (scalars); a unit vector u has |u| = 1, and for any nonzero v the vector u = v/|v| is the unit vector in the direction of v.

Convention decision: i and j are the standard basis unit vectors, printed in bold. A unit vector in the direction of v is written v-hat (also written u). All copy uses tan^-1 or arctan, never atan.

## Slide-by-slide

1. Component form (mode comp). The components vx (horizontal) and vy (vertical) place the tip at (vx, vy), also written with angle brackets. Order matters: first horizontal, then vertical. Questions: name the vertical component, read angle-bracket notation, plot a tip.
2. The unit vectors i and j (mode ij). i = (1,0) and j = (0,1), each of length 1. Every vector is v = vx i + vy j, a walk of vx steps along i then vy steps along j. Worked (4,3) = 4i + 3j. Questions: rewrite in i and j, identify i, name the components.
3. The unit vector in v's direction (mode unit). v-hat = v/|v| keeps the direction but has length 1. Worked v = (3,4), |v| = 5, v-hat = (0.6, 0.8), and |v-hat| = 1. Questions: how to find v-hat, compute one, length of a unit vector.
4. Building a vector from a magnitude and a direction (mode build). v = |v|(cos(theta) i + sin(theta) j), which is the same as scaling the unit direction vector to length |v|. Worked at several angles. Questions: build formula, scale a unit vector, build at 135 degrees.
5. Your turn (mode comp, sliders visible). Manipulate: build v = 4i + 3j by setting the sliders, then aim v along the unit vector (0.6, 0.8) at any length. A choice on the unit vector of (5,12). The resting vector is parked off every answer.

## Parameters
- comp mode: vx and vy (each -100 to 100, world = value/20).
- build mode: mag (20 to 100, |v| = mag/20) and dir (0 to 360 degrees).
- ij and unit modes use fixed worked vectors, so their sliders stay hidden.
- SCALE = 20 slider units per world unit, matched in slides.ts and Stage.tsx.
