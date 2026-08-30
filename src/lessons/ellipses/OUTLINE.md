# Ellipses lesson outline

Goal: read an ellipse in standard form centered at the origin, pull the two semi-axis lengths from the denominators, locate its vertices and co-vertices, and decide whether the major axis is horizontal or vertical from the larger denominator.

## Sources
- OpenStax Precalculus 2e, Chapter 8 (Analytic Geometry), "The Ellipse." Facts used: the standard form of an ellipse centered at the origin is x^2/a^2 + y^2/b^2 = 1; the vertices sit at the ends of the major axis and the co-vertices at the ends of the minor axis; when the larger denominator is under x^2 the major axis is horizontal, and when it is under y^2 the major axis is vertical. The semi-axis lengths are the square roots of the denominators.
- Stewart, Redlin, Watson, Precalculus: Mathematics for Calculus, 7e, Section 11.1 "Ellipses." Facts used: the major axis is the longer axis and lies along the coordinate axis corresponding to the larger denominator; the axis lengths are 2a and 2b; when the two denominators are equal the ellipse is a circle.

## Convention for this lesson
- In x^2/a^2 + y^2/b^2 = 1, a is the semi-axis measured along the x-axis and b the semi-axis along the y-axis (matching the Base Camp conics figure). Either can be larger. The major (longer) axis is whichever direction carries the larger denominator. This avoids the "a is always largest" convention so the larger-denominator rule stays front and center.
- Clean numbers: x^2/25 + y^2/9 = 1 gives a = 5, b = 3 (wide). Its flip x^2/9 + y^2/25 = 1 gives a vertical major axis with vertices (0, +/- 5). A second worked ellipse x^2/16 + y^2/4 = 1 gives a = 4, b = 2.

## Slide by slide
1. Standard form. x^2/a^2 + y^2/b^2 = 1. a and b are the semi-axis lengths, read as the square roots of the denominators (a = 5, b = 3 for x^2/25 + y^2/9 = 1). Figure: the ellipse with the two semi-axis segments drawn and labeled. Questions: read a and b, and why it is the square root not the denominator.
2. Vertices and co-vertices. Mark the four axis crossings (+/- 5, 0) and (0, +/- 3). Define vertex (end of the longer axis) and co-vertex (end of the shorter axis). Questions: identify the vertices and the co-vertices.
3. Major vs minor axis and orientation. The major axis lies along the larger denominator. Show the flipped ellipse x^2/9 + y^2/25 = 1 standing tall, vertices (0, +/- 5). Questions: orientation from the larger denominator, and the vertices of the vertical ellipse.
4. Worked read-off. A fresh ellipse x^2/16 + y^2/4 = 1: square-root the denominators (4 and 2), compare denominators for orientation (horizontal), read vertices (+/- 4, 0). Questions: the semi-axes and the vertices.
5. Your turn (interactive). a is fixed at 3, a b slider sets the y semi-axis. Watch wide -> tall -> circle. Manipulate: drag b until the major axis is vertical (b > a). The manipulate starts parked at b = 3 (a circle, off answer) so it is not pre-answered. Plus two choice checks (when it is a circle, and the vertices when b = 5).

## Parameters and reveal flags
- Params: only the your-turn slide has a slider (`b`, integer 1..5, a fixed at 3 in the figure).
- Reveal flags read by Stage.tsx: dock, curve, axes (semi-axis segments), verts (labeled vertex and co-vertex dots). Each is set by a beat or baseReveal.
