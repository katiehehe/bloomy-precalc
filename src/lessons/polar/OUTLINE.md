# Polar coordinates lesson outline

Goal: a learner can move between rectangular $(x, y)$ and polar $(r, \theta)$ coordinates, both visually and algebraically, and can place points by choosing $r$ and $\theta$.

Sources: standard precalculus polar coordinates and the conversion identities.

## Slide 1: From (x, y) to (r, theta)
- Rectangular coordinates locate a point by across and up. Polar coordinates locate the same point by distance from the origin, $r$, and angle from the positive x-axis, $\theta$.
- Visual: a point on a plane; show its $x$ and $y$ drop lines, then draw $r$ as the straight distance and $\theta$ as the swept angle.

## Slide 2: The relationship, visually and algebraically
- Right triangle with legs $x$ and $y$ and hypotenuse $r$ gives:
  - $x = r\cos\theta$, $y = r\sin\theta$
  - $r = \sqrt{x^2 + y^2}$, $\theta = \arctan\!\left(\tfrac{y}{x}\right)$
- Note on notation: narration and the dock use $\arctan$ (written $\tan^{-1}$ verbally). The figure still computes the angle with a full four-quadrant routine internally so the readout stays correct in every quadrant, but the formula shown to the learner is $\arctan(y/x)$.
- Worked example: convert a concrete point both directions, for example $(x, y) = (3, 4)$ gives $r = 5$ and $\theta \approx 53.13^\circ$.
- Visual: show the triangle and the two formulas side by side with live numbers.

## Slide 3: Play with r and theta
- Two sliders: $r$ and $\theta$. Move the point around the plane.
- Show the live conversion to $(x, y)$ so both representations update together.
- Question: place the point at a target $(x, y)$ by choosing $r$ and $\theta$ (hint uses $\theta = \arctan(2/3)$).

## Slide 4: When r depends on theta (the rose), estimated point by point
- Let $r = \cos 2\theta$. Rather than guess the shape, **teach estimation by plotting a few points first**.
- Demonstrated points: work $\theta = 0^\circ$ ($r = 1$), $\theta = 30^\circ$ ($r = 0.5$), and $\theta = 45^\circ$ ($r = 0$) out loud, marking each anchor dot on the plane. Then sweep and trace the full four-petaled rose over a faint ghost.
- Click-the-point questions: the learner computes $r = \cos 2\theta$ for a **new** angle and clicks where the point lands.
  - $\theta = 180^\circ$: $r = \cos 360^\circ = 1$, so $(-1, 0)$, the tip of the left petal.
  - $\theta = 90^\circ$: $r = \cos 180^\circ = -1$; a negative radius reverses direction, so the point is $(0, -1)$.
- A closing choice question checks that a polar curve comes from letting $r$ depend on $\theta$.

## Parameters
- `r` (radius), `theta` (angle). Live readout of $(x, y)$ and $(r, \theta)$.
- Rose slide is driven by `theta` alone (with $r = \cos 2\theta$); demonstrated anchors use a `samples` reveal, and the click questions use the shared "plot" (click-a-point) question kind.
