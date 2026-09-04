# Conics lesson outline

Goal: a learner meets each conic in its rectangular (x, y) form and its **formal locus definition** (the distance rule that defines it), plays with its parameters, and then compares the four in a summary they can step through freely.

Sources: standard precalculus conic sections in standard position, including the focus/directrix and two-focus locus definitions.

## Locus definitions with colored distance markers
Each shape slide has one beat that introduces the formal definition and draws the defining distances **in color** on the diagram (a blue segment and a red segment, with a marked point on the curve). The very next beat turns the markers off (via a reveal flag set back to false) so the figure does not stay busy while the learner explores. The colors distinguish the two distances being compared.

## Slide 1: What a circle is as a conic
- Equation: $x^2 + y^2 = r^2$. Center at the origin, radius $r$.
- Definition: every point is the **same distance** $r$ from the center. Markers: two colored radii of equal length to different points on the circle.
- Interact: radius slider or drag. Show the radius drawn.

## Slide 2: What an ellipse is
- Equation: $\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = 1$. Semi-axes $a$ and $b$.
- Definition: the **sum** of the distances to two foci is constant, $d_1 + d_2 = 2a$. Markers: two colored segments from one point on the ellipse to each focus.
- Interact: sliders for $a$ and $b$. Note the special case $a = b$ is a circle. Foci sit on the major axis.

## Slide 3: What a parabola is
- Equation: $y = a x^2$. One parameter controls how wide or narrow it opens.
- Definition: every point is **equidistant** from a fixed point (focus) and a fixed line (directrix), $d_1 = d_2$. Markers: a colored segment up to the focus and a colored segment straight down to the directrix, equal length.
- Interact: slider for $a$ or drag. Show vertex at the origin, the focus, and the directrix.

## Slide 4: What a hyperbola is
- Equation: $\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} = 1$. Two branches with asymptotes $y = \pm\dfrac{b}{a}x$.
- Definition: the **difference** of the distances to two foci is constant, $|d_1 - d_2| = 2a$ (the contrast with the ellipse's sum is called out). Markers: two colored segments from one point on a branch to each focus.
- Interact: sliders for $a$ and $b$. Draw the asymptotes.

## Slide 5: How eccentricity sorts the conics
- Side by side: equation, shape, and a one line description for circle, ellipse, parabola, hyperbola.
- Reinforce that they are one family (relate to eccentricity).
- **Stepping through the shapes**: clicking a specific curve (or a table row) highlights it; clicking anywhere else on the figure advances to the **next** shape, so a learner is never stuck on the circle. This fixes the earlier issue where only the circle could be selected.
- **Dedicated explore step**: the first "your turn" task is a hands-on prompt to click through all four and finish on the hyperbola, giving the learner time to compare before the recall questions.

## Parameters
- Circle: `r`. Ellipse: `a`, `b`. Parabola: `a`. Hyperbola: `a`, `b`. Summary: `view` (which shape is highlighted, 0 to 3).
- A shared `defDist` reveal flag turns each definition's colored distance markers on for one beat, then off.
