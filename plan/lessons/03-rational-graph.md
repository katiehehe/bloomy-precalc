# 03. Complete rational graphing

- Skill id: `rational-graph`
- Unit: Rational analysis (Unit 1, block start)
- Status: planned -> **pilot built this session** (folder `rational-graphing`, Journey id `rational-graphing`)

## Goal
The learner can graph a rational function end to end by finding intercepts,
vertical asymptotes, and the horizontal asymptote, then assembling the pieces.

## Skills from the original 57-list covered here
- `rational-graph` Complete rational graphing

## Prerequisites
- Vertical asymptotes and holes (lesson 01).
- Horizontal and slant asymptotes (lesson 02).

## Sources to cite
- OpenStax Precalculus 2e: "Rational Functions" (the graphing checklist:
  intercepts, asymptotes, behavior near asymptotes).
- Blitzer, Precalculus: "Rational Functions and Their Graphs" (strategy summary).

## Worked function
`f(x) = (x^2 - 1)/(x^2 - 4) = (x - 1)(x + 1) / ((x - 2)(x + 2))`
- x-intercepts: `x = 1`, `x = -1` -> `(1, 0)`, `(-1, 0)`.
- y-intercept: `f(0) = (-1)/(-4) = 1/4` -> `(0, 0.25)`.
- Vertical asymptotes: `x = 2`, `x = -2`.
- Horizontal asymptote: equal degrees -> `y = 1`.
- No holes.

## Slides (assemble one feature per beat)
1. **The checklist.** Name the four things to find: intercepts, vertical
   asymptotes, horizontal asymptote, then connect. Text beat.
2. **Intercepts.** Reveal the factored form; plot `(1, 0)`, `(-1, 0)`, `(0, 0.25)`.
3. **Vertical asymptotes.** Denominator zeros -> dashed lines `x = 2`, `x = -2`.
4. **Horizontal asymptote.** Equal degrees -> dashed line `y = 1`.
5. **Connect and play.** Draw the three branches; drag the tracer across regions.

## Questions
- plot: "Click one of the x-intercepts." target `(1, 0)`, tol 0.4, label "x-int".
- choice: "The horizontal asymptote of (x^2 - 1)/(x^2 - 4) is" -> [y = 0, y = 1
  (correct), y = -1/4].
- manipulate: "Drag the tracer near x = 0 to read the y-intercept." satisfied for
  world `|x| < 0.3`; success names `(0, 0.25)`.

## Figure and interactions
- Shared `RationalGraph` with three branches split at `x = -2` and `x = 2`,
  dashed VAs and HA, plotted intercept dots gated on reveal flags, draggable
  tracer with readout.

## Known pitfalls to avoid
- Three separate branches; never draw across either vertical asymptote.
- y-intercept is `1/4`, not `1`; the HA is `y = 1` (ratio of leading coeffs).
- Reveal features one beat at a time to keep cognitive load low.

## Conceptual slide added: "Behavior near each wall"
A second slide teaches the sign test at a wall. Sliding toward `x = 2` from the
right, a live readout shows the top positive and the bottom `x^2-4` small and
positive, so `f -> +infinity`; just left of 2 the bottom is small negative, so
`f -> -infinity`. The learner repeats the test at `x = -2`.
