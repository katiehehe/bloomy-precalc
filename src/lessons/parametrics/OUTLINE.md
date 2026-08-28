# Parametrics lesson outline

Goal: build up from the simplest parametric equations to a striking curve, always connecting the parameter form to a rectangular relationship.

Sources: standard precalculus parametric equations and elimination of the parameter.

## Slide 1: A parametric line
- $x = 2t$, $y = 3t$. As $t$ advances, the point moves along a straight line.
- The graph is a **full line, not a segment**: $t$ runs negative and positive, the point walks both ways, and the drawn line spans the whole plane with an **arrowhead on each end** to signal it continues forever.
- Estimation by points: demonstrate $t = 1 \to (2, 3)$ and $t = -1 \to (-2, -3)$ as labeled anchors.
- Eliminate the parameter: $t = x/2$, so $y = 3(x/2) = \tfrac{3}{2}x$. Same line, written in $x$ and $y$.
- Click-the-point question: "Where is the point when $t = 0$?" Substitute to get $(0, 0)$ and click the origin. Then a choice on eliminating the parameter, and a scrub-to-$(2,3)$ manipulate.
- Interact: slider for $t$, plus click-a-point; live $x, y$ values in the dock.

## Slide 2: The unit circle as parametric
- $x = \cos t$, $y = \sin t$. As $t$ runs $0$ to $2\pi$, the point traces the unit circle.
- Estimation by points: demonstrate $t = \tfrac{\pi}{2} \to (0, 1)$ (top) and $t = \pi \to (-1, 0)$ (left).
- Click-the-point questions on **new** angles: $t = 0 \to (1, 0)$ and $t = \tfrac{3\pi}{2} \to (0, -1)$.
- Eliminate the parameter: $x^2 + y^2 = 1$.
- Interact: slider for $t$ plus click-a-point; show the circle drawn and the radius.

## Slide 3: Two free parameters are just coordinates
- If $x$ and $y$ are each free (two sliders), the point can be anywhere. That is exactly rectangular coordinates.
- Tying both to a single $t$ is what carves out a curve. This motivates why one parameter gives a path.
- Interact: two sliders, $x$ and $y$, moving the point freely.

## Slide 4: A fancy curve (finale)
- Lissajous $x = \sin 2t$, $y = \sin 3t$. Two simple equations, one intricate closed curve with petals.
- Estimation by points: demonstrate $t = 0 \to (0, 0)$ and $t = \tfrac{\pi}{4} \to (1, 0.71)$, reading each equation separately.
- Click-the-point question on a new value: $t = \tfrac{\pi}{2} \to (0, -1)$. Then advance $t$ to $2\pi$ to close the loop, and a choice on why it fails the vertical line test.
- Interact: slider for $t$ plus click-a-point; the point traces the curve over a faint full ghost.

## Parameters
- Slides 1, 2, 4: single parameter `t`. The line uses a symmetric range so `t` can be negative; demonstrated anchors use a `samples` reveal and the click questions use the shared "plot" (click-a-point) question kind.
- Slide 3: two parameters `x` and `y`.
