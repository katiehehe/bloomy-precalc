# Hyperbolas lesson outline

Goal: read a hyperbola in standard form centered at the origin, tell from the sign of the terms whether it opens left-right or up-down, locate the vertices at distance a along the transverse axis, and see the two separate branches.

## Sources
- OpenStax Precalculus 2e, Chapter 8 (Analytic Geometry), "The Hyperbola." Facts used: the standard forms centered at the origin are x^2/a^2 - y^2/b^2 = 1 (opening left and right) and y^2/a^2 - x^2/b^2 = 1 (opening up and down); a always sits under the positive term; the vertices are at distance a from the center along the transverse axis, at (+/- a, 0) or (0, +/- a); the curve has two branches.
- Sullivan, Precalculus, 10e, Section 10.4 "The Hyperbola." Facts used: the transverse axis is the segment through the two vertices, and its direction is set by which squared term is positive (not by which denominator is larger); a is the distance from the center to a vertex regardless of whether a or b is larger.

## Convention for this lesson
- a is the number under the POSITIVE squared term (the semi-transverse axis, center to vertex). b is under the negative term. Unlike an ellipse, a need not be the larger of the two, so we stress "a is under the plus sign" rather than "a is the bigger denominator."
- Asymptotes are kept out of this lesson on purpose (they get their own lesson). The branches are drawn without asymptote guide lines here.
- Clean numbers: x^2/9 - y^2/16 = 1 gives a = 3, b = 4, vertices (+/- 3, 0). Its flip y^2/9 - x^2/16 = 1 opens up and down with vertices (0, +/- 3). A read-off example y^2/4 - x^2/9 = 1 gives a = 2, vertices (0, +/- 2).

## Slide by slide
1. Standard form (opens left-right). x^2/a^2 - y^2/b^2 = 1, two branches opening left and right, vertices (+/- a, 0). Define transverse axis, vertex, branch. Example a = 3, b = 4. Questions: read a and locate the vertices.
2. The sign decides the opening. The positive squared term names the opening direction. Flip to y^2/a^2 - x^2/b^2 = 1 and it opens up and down, vertices (0, +/- 3). Questions: which term positive gives up-down, and the vertices of the up-down form.
3. Vertices at distance a, a under the plus. a is under the positive term, so here a = 3 even though b = 4 is larger. The branches never touch the y-axis. Questions: value of a when b is larger, and that a is under the positive term.
4. Read-off (opens up-down). y^2/4 - x^2/9 = 1: positive term is y^2 so it opens up-down, a = sqrt 4 = 2, vertices (0, +/- 2). Questions: opening direction and vertices.
5. Your turn (interactive). x^2/a^2 - y^2/16 = 1 with b fixed at 4, an a slider sets the vertex distance. Watch the vertices and branches move. Manipulate: drag a until the vertices sit at (+/- 3, 0). Parked at a = 2 after the watch beats so it is not pre-answered. Plus two choice checks (sign to orientation, and a under the plus sign).

## Parameters and reveal flags
- Params: only the your-turn slide has a slider (`a`, integer 1..5, b fixed at 4 in the figure).
- Reveal flags read by Stage.tsx: dock, curve, verts (labeled vertex dots). Each is set by a beat or baseReveal.
