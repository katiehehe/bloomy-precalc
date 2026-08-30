# Foci and eccentricity lesson outline

Goal: locate the foci of an ellipse and a hyperbola with the right c formula, compute the eccentricity e = c/a, and classify a conic by its eccentricity (circle e = 0, ellipse 0 < e < 1, parabola e = 1, hyperbola e > 1).

## Sources
- OpenStax Precalculus 2e, Chapter 8 (Analytic Geometry), "The Ellipse" and "The Hyperbola." Facts used: for an ellipse the foci lie on the major axis at distance c with c^2 = a^2 - b^2; for a hyperbola the foci lie beyond the vertices at distance c with c^2 = a^2 + b^2; in both, a is the distance from the center to a vertex.
- Stewart, Redlin, Watson, Precalculus: Mathematics for Calculus, 7e, Sections 11.1 to 11.3 (Ellipses, Hyperbolas, and eccentricity discussion). Facts used: eccentricity is e = c/a; a circle has e = 0, an ellipse 0 < e < 1, a parabola e = 1, and a hyperbola e > 1; larger e means a more stretched (or more open) curve.

## Convention for this lesson
- Ellipse: a is the longer semi-axis (semi-major) and b the shorter (semi-minor), so c^2 = a^2 - b^2 and e = c/a fall out cleanly with a > b. The worked ellipse x^2/25 + y^2/9 = 1 gives a = 5, b = 3, c = 4, e = 4/5 = 0.8.
- Hyperbola: a is the distance from center to vertex (under the positive term) and b the other semi-axis, so c^2 = a^2 + b^2 and e = c/a > 1. The worked hyperbola x^2/9 - y^2/16 = 1 gives a = 3, b = 4, c = 5, e = 5/3 approximately 1.67. The 3-4-5 triple is reused so the only visible difference from the ellipse is the plus vs the minus.

## Slide by slide
1. Ellipse foci. Define focus. c^2 = a^2 - b^2 (minus, foci inside on the major axis). Example a = 5, b = 3, c = 4, foci (+/- 4, 0). Questions: the c formula (minus) and the foci location.
2. Ellipse eccentricity. e = c/a = 4/5 = 0.8. What e measures: 0 is a round circle, near 1 is very stretched. Questions: compute e, and what small vs large e means.
3. Hyperbola foci. c^2 = a^2 + b^2 (plus, foci outside the vertices). Example a = 3, b = 4, c = 5, foci (+/- 5, 0), e = 5/3 > 1. Contrast the plus with the ellipse minus. Questions: the c formula (plus) and e > 1.
4. Classify by eccentricity. circle e = 0, ellipse 0 < e < 1, parabola e = 1, hyperbola e > 1. Bigger e means more stretched or more open. Questions: classify from an e value, and the ellipse-vs-hyperbola boundary.
5. Your turn (interactive). An ellipse with a fixed at 5 and a b slider. As b changes, c = sqrt(25 - b^2) changes, the foci slide along the x-axis, and the e readout updates. Manipulate: set e = 0.6 (which needs b = 4, c = 3). Parked at b = 3 (e = 0.8) after the watch beats so it is not pre-answered. Plus two choice checks (e when b = 5, and how e changes as the ellipse rounds out).

## Parameters and reveal flags
- Params: only the your-turn slide has a slider (`b`, integer 1..5, a fixed at 5 in the figure).
- Reveal flags read by Stage.tsx: dock, curve, foci, ecc (the eccentricity line in the dock). Each is set by a beat or baseReveal.
