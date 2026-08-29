# Limits from graphs and tables (limits-graph)

Skill: `limits-graph` (topic: calc, Unit 9 Calculus readiness). The first honest
look at a limit: the height a function heads toward near an input, read straight
off a graph or a table, kept separate from the value the function actually takes
there.

Learner goal: read `lim_{x -> a} f(x)` from a graph and from a table, use
one-sided limits, and decide when the two-sided limit exists, including the cases
where `f(a)` is a hole or where the graph jumps.

## Sources (hand-checked)
- OpenStax Precalculus 2e, Ch. 12.1 "Finding Limits: Numerical and Graphical
  Approaches" (definition of a limit, one-sided limits, existence, tables).
- OpenStax Calculus Volume 1, Ch. 2.2 "The Limit of a Function" (limit ignores
  f(a); removable vs jump discontinuity read from a graph).
- Stewart, Calculus, Ch. 2.2, and Sullivan, Precalculus, Ch. 14.1 (notation
  lim_{x->a^-} and lim_{x->a^+}; two-sided exists iff both one-sided agree).

Convention decisions:
- Notation `\lim_{x\to a} f(x) = L`; one-sided `\lim_{x\to a^{-}}` (left, x < a)
  and `\lim_{x\to a^{+}}` (right, x > a). This is the majority convention.
- "DNE" for does not exist, written out on first use as "does not exist".

## Takeaways
- `\lim_{x\to a} f(x) = L` means f(x) gets arbitrarily close to L as x approaches
  a from BOTH sides. It is about the trend near a, not the value f(a).
- Left-hand limit `\lim_{x\to a^{-}}` uses only x slightly less than a; right-hand
  `\lim_{x\to a^{+}}` uses only x slightly greater than a. The two-sided limit
  exists exactly when both one-sided limits exist AND are equal.
- The limit can exist even when f(a) is undefined (a hole) or when f(a) differs
  from L (a removable discontinuity). The limit ignores the single value at a.
- A jump (left limit not equal to right limit) means the two-sided limit does not
  exist, even if f(a) itself is defined.
- A table plugs in x-values closing in from each side (1.9, 1.99, 1.999 and
  2.1, 2.01, 2.001) and watches f(x) settle on L.

## Running examples (exact numbers)
- Removable hole: `g(x) = (x^2 - 4)/(x - 2) = x + 2` for x != 2, hole at (2, 4).
  `\lim_{x\to 2} g(x) = 4`. Line y = x + 2 (primary) with an OPEN point at (2, 4).
- Limit vs value: `h(x) = x + 2` for x != 2 and `h(2) = 1`. So
  `\lim_{x\to 2} h(x) = 4` (open hole at (2, 4)) but the VALUE h(2) = 1 (filled
  dot at (2, 1)). The limit ignores h(2).
- Jump (DNE): `p(x) = x - 1` for x <= 2 and `p(x) = x + 1` for x > 2. Left limit
  1 (filled dot at (2, 1)), right limit 3 (open dot at (2, 3)). 1 != 3, so
  `\lim_{x\to 2} p(x)` does not exist.

## Slides (flags read literally in Stage.tsx; zero dead flags)
1. `approach` (mode approach) - define the two-sided limit on y = x + 2 with a
   hole at (2, 4): as x nears 2 from both sides, g(x) nears 4. Dashed vertical
   guide at x = 2, dashed horizontal at y = 4, plus the open hole and a value
   table in the dock. Flags: curve, hole, approach, table, limit.
2. `onesided` (mode onesided) - left-hand vs right-hand limit notation; on this
   example both sides give 4, so the two-sided limit is 4. Flags: curve, hole
   (baseReveal), left, right, twoSided.
3. `limit-vs-value` (mode value) - h with an open hole at (2, 4) and a filled
   value at (2, 1): the limit is 4, the value is 1, and the limit ignores f(a).
   Flags: curve, hole (baseReveal), value, limit, gap.
4. `jump` (mode jump) - piecewise p: left limit 1, right limit 3, so the
   two-sided limit does not exist; both endpoint dots (one closed, one open) and
   dashed guides at the two heights. Flags: leftBranch, rightBranch, marks, dne.
5. `your-turn` (mode yourturn) - interactive plot question: click the point both
   branches head toward as x -> 2, target (2, 4), tolerance 0.6, on the y = x + 2
   graph with the hole. Plot markers draw the click and the solved target. Flags:
   curve, hole (baseReveal).

Global reveal flags (set == read): curve, hole, approach, table, limit, left,
right, twoSided, value, gap, leftBranch, rightBranch, marks, dne.

## Figure
Shared `CurvePlane` (half = 6). The line y = x + 2 is a curve; the jump uses two
`from`/`to` curve segments split at x = 2. Holes and one-sided endpoints are open
(hollow) points; attained values are closed (filled) points. Dashed vertical and
horizontal guides mark x = a and the limit heights. Slide 5 forwards
`plot.onGuess` through `onPoint` and overlays `PlotMarkers`. Left-side artifacts
are teal, right-side artifacts are accent, the main curve is primary.

## Quiz
Climb 15 + Summit 15. Traps: reading f(a) instead of the limit; ignoring that the
two one-sided limits must be EQUAL; concluding a limit exists at a jump; thinking
a hole forces the limit to not exist (it does not); mixing up left and right; and
reading the limit off the y-value of the filled dot. Every item is hand-verified.
