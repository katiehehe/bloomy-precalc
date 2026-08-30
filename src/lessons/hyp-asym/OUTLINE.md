# Asymptotes of hyperbolas lesson outline

Goal: find the asymptotes of a hyperbola from its standard form, draw the central box whose diagonals are those asymptotes, and use the box plus the asymptotes to sketch the two branches.

## Sources
- OpenStax Precalculus 2e, Chapter 8 (Analytic Geometry), "The Hyperbola." Facts used: for x^2/a^2 - y^2/b^2 = 1 the asymptotes are y = +/- (b/a) x, and for y^2/a^2 - x^2/b^2 = 1 they are y = +/- (a/b) x; the central rectangle has corners at (+/- a, +/- b) for the horizontal form, and its diagonals extended are the asymptotes.
- Sullivan, Precalculus, 10e, Section 10.4 "The Hyperbola." Facts used: the recommended sketch procedure is to draw the central rectangle first, extend its diagonals as the asymptotes, plot the vertices, and then draw each branch approaching the asymptotes; the asymptote slopes come directly from the box's half-widths.

## Convention for this lesson
- Horizontal hyperbola x^2/a^2 - y^2/b^2 = 1: box half-width a along x and b along y, corners (+/- a, +/- b), asymptotes y = +/- (b/a) x, vertices (+/- a, 0).
- Vertical hyperbola y^2/a^2 - x^2/b^2 = 1: box half-width b along x and a along y, corners (+/- b, +/- a), asymptotes y = +/- (a/b) x, vertices (0, +/- a).
- Clean numbers: x^2/9 - y^2/16 = 1 gives a = 3, b = 4, asymptotes y = +/- (4/3) x, box corner (3, 4). Its flip y^2/9 - x^2/16 = 1 gives asymptotes y = +/- (3/4) x, box corner (4, 3).

## Slide by slide
1. The central box. For x^2/a^2 - y^2/b^2 = 1, mark half-width a in x and b in y, corners (+/- a, +/- b). Vertices (+/- 3, 0) are the midpoints of the box's left and right sides. Questions: box corner location and box half-widths.
2. Diagonals are the asymptotes. Extend the box's diagonals to get y = +/- (b/a) x. For a = 3, b = 4 the slopes are +/- 4/3. Questions: the asymptote slope b/a and the asymptote equations.
3. The up-down case flips the slopes. For y^2/a^2 - x^2/b^2 = 1 the asymptotes are y = +/- (a/b) x. With a = 3, b = 4 the slopes are +/- 3/4, and the box is wider than tall. Contrast b/a with a/b (the common error). Questions: slope for the up-down form, and which fraction to use.
4. Sketching with the box. Procedure: draw the box, extend the diagonals as asymptotes, plot the vertices, then curve each branch out to the asymptotes. Questions: the correct first step, and what the branches approach.
5. Your turn (interactive). Horizontal hyperbola x^2/9 - y^2/b^2 = 1 with a fixed at 3, a b slider grows the box and steepens the asymptotes. Manipulate: drag b until the box corner reaches (3, 4), which makes the asymptote slope 4/3. Parked at b = 2 after the watch beats so it is not pre-answered. Plus two choice checks (slope at b = 4, and b/a vs a/b).

## Parameters and reveal flags
- Params: only the your-turn slide has a slider (`b`, integer 1..6, a fixed at 3 in the figure).
- Reveal flags read by Stage.tsx: dock, curve, box (the central rectangle), asym (the asymptote lines), verts (vertex dots). Each is set by a beat or baseReveal.
