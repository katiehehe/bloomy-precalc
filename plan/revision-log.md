# Revision log

A running record of the issues raised while going through the curriculum and the
fix applied for each. Grouped by area. Most recent themes (timing, heading,
centering) are at the bottom of their sections.

## Voice, tone, and copy

- **Issue:** The wording felt "so AI", with random commas and pauses, and vague
  causal language. Wanted academic, engaging, flowing, and explicit.
  **Fix:** Rewrote narration to an expository, textbook voice. Added house rules
  to the authoring guide, banned vague causal filler ("the geometry does the
  work", "here is the catch", etc.), and required naming the actual mechanism.
  Added `scripts/voice-scan.mjs` to catch violations.

- **Issue:** Paragraphs were too chunky and the learner had to scroll the left
  narration column.
  **Fix:** Cut beats to two or three lean sentences and split long slides into a
  new slide at a natural break, carrying the end-of-slide reveal flags into the
  next slide's `baseReveal`. Set a rough budget of five or six beats per slide.

- **Issue:** Remove semicolons from the lessons and the website.
  **Fix:** Rewrote learner-facing copy without semicolons (period plus two short
  sentences, or a comma, or a colon). The only allowed semicolon is the KaTeX
  spacing command `\;` inside math. Enforced by `npm run check`.

- **Issue:** LaTeX was breaking mid-line, and important equations should sit on
  their own lines.
  **Fix:** Inline math now uses no-wrap so an equation never splits across a line
  break, and important results are written as display math (`$$...$$`) that
  renders centered on its own line.

- **Issue:** Slide titles still sounded generated (for example "One equation,
  two solutions").
  **Fix:** Renamed that title to "Two solutions on one full turn" and rewrote the
  remaining cutesy titles across lessons to match the academic voice.

## Structure and new lessons

- **Issue:** Base Camp bundled several skills together, but each skill should have
  its own lesson, with Base Camp kept only as front-page examples.
  **Fix:** Authored 11 standalone Journey lessons, drawing on the Base Camp
  lessons for inspiration while keeping the Base Camp lessons intact.

- **Issue:** There was no lesson teaching the main unit-circle angles and their
  sine and cosine values, yet inverse trig came before any trig introduction.
  **Fix:** Built a unit-circle main-angles lesson and placed it before the
  inverse trig lessons in the sequence. The special-angles material uses a
  `SpecialAngles` quarter-circle reference with a `FigureReadout` that shows the
  exact `cos` and `sin` values, and it is split across a 45-degree slide and a
  30-and-60-degree slide so the left narration never scrolls. Added Climb and
  Summit quizzes covering standard position, quadrant signs, the special-angle
  coordinates, the Pythagorean identity, and periodicity.

- **Issue:** The dot product was never actually taught.
  **Fix:** Reworked the `vec-dot` lesson with a `DotComponents` figure that stacks
  the two vectors and animates the component-by-component products and their sum.

- **Issue:** Law of sines and law of cosines should be taught before the SSA
  ambiguous-case lesson, as two separate lessons.
  **Fix:** Created `law-of-sines` and `law-of-cosines` lessons with setup,
  derivation, worked examples, and an interactive triangle to explore. The law
  of sines derivation shades each right sub-triangle formed by the altitude
  (blue and teal) rather than plotting the two `h` equations on the figure, which
  had clipped the panel edge, and it keeps the algebra in the narration. The law
  of cosines uses `AlgebraFlow` for the SAS and SSS derivations and an
  `ExploreCosTriangle` that draws a right-angle marker when the included angle is
  90 degrees. Both lessons have Climb and Summit quizzes and are wired into the
  curriculum, registry, and sequence.

- **Issue:** When introducing `y = A sin(B(x - C)) + D`, explain each parameter
  in depth and let the learner move one knob at a time before combining them.
  **Fix:** Built the `sinusoid-graphs` lesson with a dedicated slide per parameter
  and a `SineGraph` figure marking amplitude, midline, period, and phase shift,
  then a combined challenge.

- **Issue:** The SSA lesson dropped the triangle down all at once and did not show
  the other congruence cases or label the ambiguous parts clearly.
  **Fix:** Added an intro slide with small diagrams for SSS, SAS, ASA, AAS, and
  SSA, then a `TriangleSSA` figure that builds up in stages (horizontal side, then
  the fixed angle, then the fixed side, then the pivoting side) and shows the
  zero, one, and two solution cases with clear labels.

## Trigonometry and identities (circle or algebra, not both)

- **Issue:** The unit circle was too busy while solving trig equations, pulling
  attention away from the algebra.
  **Fix:** Show the circle only when its geometry is essential. Otherwise the
  slide drives the algebra with `AlgebraFlow` in focus mode and hides the circle.

- **Issue:** In the cofunction section the circle only needs to explain the
  complement, then the rest should be equation work.
  **Fix:** Added a `ComplementCircle` glyph to explain the complement angle, then
  handed off to `AlgebraFlow` for the manipulation.

- **Issue:** The sum and difference identities are hard to remember, and the sign
  change was unexplained.
  **Fix:** Added memory aids (CC minus SS, SC plus CS) as notes, explained that
  the sign flips because you substitute a negative angle, and boxed the key
  formulas with a highlighted result style.

- **Issue:** Double-angle and half-angle also showed a circle and algebra at once.
  **Fix:** Converted both to algebra-only derivations, using a compact
  `FigureReadout` for the interactive "watch it hold" slides.

- **Issue (degrees-radians):** The two radian ideas were chunked into one
  animation, the circle was small, animations played during the text, the step
  label covered the arrowhead, and the practice forced an exact placement.
  **Fix:** Split the arc-equals-one-radius idea onto its own beat, enlarged the
  `RadianFigure` to about half the panel, timed the animation to follow the text,
  moved the label off the arrowhead, and removed the exact-target requirement.
  Also added the shortcut of replacing pi with 180 degrees for radians to degrees.

- **Issue (angular-velocity):** The circles were small, the equations were spaced
  too far apart, and the angular-speed definition omitted delta theta.
  **Fix:** Enlarged the circle figure, tightened the vertical spacing in
  `AlgebraFlow`, and wrote the definition explicitly as change in theta over
  change in time.

- **Issue (inverse-eval):** The inverse-range slide stacked generic equations
  instead of mapping each inverse function to its range on a unit circle.
  **Fix:** Built `RangeGlyph` and `InverseRangeMap` so arcsin, arccos, and arctan
  each point to a small unit circle with their output range highlighted.

## Complex numbers and polar form

- **Issue (trig-form):** The theta label was placed oddly and the diagram was too
  small and crowded, with no labels for the real and imaginary legs.
  **Fix:** Made the angle-label distance scale with the modulus in `ComplexPlane`,
  enlarged the diagram per slide, and drew and labeled the `r cos theta` and
  `r sin theta` legs.

- **Issue (polar-arith):** The angle label crowded the figure and the arrows were
  small.
  **Fix:** Removed the angle label and reduced the world half-range so the complex
  number arrows read larger.

- **Issue:** Reorder the complex-number thread and connect the ideas: teach trig
  form, then polar, then De Moivre and the exponential form.
  **Fix:** Reordered the curriculum and registry to trig form, polar conversion,
  polar graphs, polar arithmetic, then De Moivre. Enhanced the `de-moivre` lesson
  with the exponential form `r e^{i theta}` and explained how it justifies adding
  arguments and De Moivre's theorem through the exponent rules.

- **Issue:** Graphing polar was not explained: what does `r = f(theta)` mean.
  **Fix:** Added an intro slide explaining that each angle theta gives a radius r,
  and each pair is one point of the graph.

- **Issue:** Negative r was not explained.
  **Fix:** Added an explanation of negative r (plot in the opposite direction).

- **Issue:** The "1" tick labels overlapped the graph.
  **Fix:** Split `PlaneTicks` out of the grid so tick labels render on top of the
  curve with a readable halo.

## Vectors

- **Issue:** The dot-product figure had awkward, ugly spacing.
  **Fix:** Rewrote `DotComponents` with a tight, column-aligned layout and a
  compact view box.

- **Issue:** Vector labels such as wind and ground overlapped.
  **Fix:** Added `labelAt`, `labelDx`, and `labelDy` to `VecArrow` and placed the
  vertical component labels at the shaft midpoint with small nudges.

## Matrices

- **Issue (determinants):** Too much space at the top, the matrix appeared twice,
  the animation ran during the text, and the three cofactor terms needed to build
  one at a time with the row and the 2x2 minor highlighted.
  **Fix:** Built a `CofactorBuild` figure that shows one 3x3 matrix, tints row 1,
  and reveals each term in turn by crossing out its row and column, tinting the
  minor, and fading in the term below. Split the slide into a build phase and an
  evaluate phase, and timed the animation to follow the text.

- **Issue (mtx-inv):** Too much going on, a redundant matrix header, and the title
  was not at the top.
  **Fix:** Added a `title` prop to `AlgebraFlow`, removed the extra matrix glyph
  and the dock, and moved the title to the top.

- **Issue:** Teach a specific multiplication layout: first matrix at the left,
  second at the top right, product at their intersection, forming a backwards L so
  the aligned rows and columns are visible.
  **Fix:** Built the `MatMulFrame` figure that arranges the factors in that L
  shape with alignment bands and a caption showing the active cell's dot product.

- **Issue:** Remove the grey box at the bottom of all matrix lessons, make the
  central animation bigger, and animate the row operations.
  **Fix:** Removed the dock from every matrix lesson, made `MatrixGrid` size its
  view box to the content so matrices render larger, and built `ElimMatrix` to
  animate row operations directly on the augmented matrix for 3-variable
  elimination.

## Conics

- **Issue:** Label a and b on the ellipse.
  **Fix:** Added `labelDx` and `labelDy` to `ConicSegment` and drew labeled
  semi-major (a) and semi-minor (b) segments.

- **Issue:** Label b on the hyperbola while the slider moves it.
  **Fix:** Labeled the vertical side b of the hyperbola reference box on the
  interactive slide.

- **Issue:** Include real photographs of the example objects (such as a whispering
  gallery) so the idea is concrete.
  **Fix:** Built the image infrastructure (a `BeatImage` type, an `image` field on
  a beat, rendering in `NarratedText` and `LessonPlayer`). The photos themselves
  are still to be added.

## Sequences and series

- **Issue:** The sigma visual was poor: label the index and drop the filling bar
  in favor of the numbers summed together.
  **Fix:** Added a "terms" sum mode to `SeriesBars` that writes the sum as
  1 + 2 + 3 + 4 + 5 = 15, plus an axis label for the index.

- **Issue:** Too much white space and the bar looked wrong.
  **Fix:** Made `SeriesBars` size its view box to the content so the figure hugs
  the numbers with no dead space.

- **Issue:** Vary the summation index variable in the lessons and the questions.
  **Fix:** Varied the index across examples and quiz items (i, j, k, m, p, r) and
  noted that the index letter is just a placeholder.

- **Issue:** Explain the intuition behind induction.
  **Fix:** Walked through the domino and well-ordering intuition and offered a beat
  making that reasoning explicit.

## Limits and calculus

- **Issue (dq):** The secant-slope figure was too busy.
  **Fix:** Added `segment` and `arrow` options to `CurveLine` so the rise and run
  draw as measured arrows, and repositioned their labels to declutter.

- **Issue (continuity):** The hole label overlapped the line.
  **Fix:** Added `labelDx`, `labelDy`, and `labelAnchor` to `CurvePoint` and moved
  the hole label below and to the right of the open circle.

- **Issue (continuity):** The filled-dot label such as f(1) = 4 overlapped the
  line.
  **Fix:** Moved the filled-dot labels to the upper left, clear of the line.

## Climb and Summit quizzes, and the player

- **Issue:** Add a Climb section (about 15 practice questions) and a Summit section
  (about 15 mastery questions) with tricky distractors from common traps, short
  explanations for both correct and incorrect answers, and a raw score report.
  **Fix:** Built the quiz engine, `QuizRunner`, and the report, with a
  deterministic choice shuffle to avoid position bias.

- **Issue:** Remove the "Answer recorded. You will see the results at the summit."
  message.
  **Fix:** Removed that feedback line.

- **Issue:** Let the learner jump back to a previous question during Climb and
  Summit by clicking the top bar.
  **Fix:** Made the quiz progress bar segments clickable, using their own `qseg`
  classes so they do not clash with the lesson progress bar.

- **Issue:** The Base Camp top progress bar disappeared.
  **Fix:** Restored the original `.seg` styles for the lesson bar and gave the quiz
  bar the separate `qseg` classes.

- **Issue:** The quiz recap showed raw `$...$` LaTeX.
  **Fix:** Rendered the recap prompt through the `Rich` component so the math
  displays.

- **Issue:** A manipulate question was already correct on arrival.
  **Fix:** Compute solved status live from whether the current slider value passes
  the check, so a reset slider no longer counts as solved. The starting value is
  set outside the correct region.

## Interaction and rendering

- **Issue:** Clicking the plane placed the point slightly to the left of the
  cursor.
  **Fix:** Added `clientToSvgPoint` using the screen transform inverse to map
  clicks correctly through letterboxing and scaling, and applied it across the
  interactive figures.

- **Issue:** The audio read the `$$` and LaTeX aloud.
  **Fix:** The speech layer now strips math delimiters and speaks the expression in
  words (fractions, exponents, trig functions, Greek letters).

- **Issue:** An exponent was clipped (for example the 2 in 2x squared).
  **Fix:** Fixed the KaTeX clipping so exponents are not cut off.

- **Issue:** Explain open versus closed intervals (exclusive versus inclusive
  endpoints) for polynomial inequalities, in the Base Camp lesson.
  **Fix:** Added that explanation to the `poly-inequalities` lesson, with open and
  closed endpoints drawn on the number line.

- **Issue:** A step's operation label sat on top of the connector arrow.
  **Fix:** After trying the label to the left, settled on centering the chip on
  the arrow and lengthening the arrow so its head stays visible below the chip.

- **Issue:** The step dock resized as steps appeared, shifting the figure above it.
  **Fix:** Gave the dock a fixed reserved height that scrolls to the newest line
  instead of growing.

## Parametrics

- **Issue:** Add a slide relating x and y as a recognizable parabola.
  **Fix:** Added a slide that eliminates the parameter t to get x = y squared
  minus 1 and names the sideways parabola.

- **Issue:** A parametric manipulate question was already correct on arrival.
  **Fix:** Same live-solved fix as the other manipulate questions.

## Derivations: heading, timing, and centering (most recent, all lessons)

- **Issue:** Separate the heading from the rest of a derivation and make it clear.
  **Fix:** Underlined the heading (and the words-only SVG title) and gave it
  spacing so it reads as a header above the steps.

- **Issue:** The arrow and the next step should appear after the matching text,
  with no movement on the figure while the text is being shown, for every lesson.
  **Fix:** Changed the engine so the current beat holds its reveal for the whole
  narration and only reveals once the narration ends and the animation phase
  begins. A revealing beat now routes through the animation phase so focus shifts
  to the figure after the text. This is central, so it applies to all lessons.

- **Issue:** The central animation should always be centered, not sitting at the
  bottom.
  **Fix:** Bounded the figure slot so a tall derivation cannot outgrow the panel,
  reserved exactly half the panel above and below at runtime so any line can reach
  true center, and centered on the equation itself so the connector arrow above it
  does not push the equation below the midline.

- **Issue:** When a new derivation line appeared, the figure jumped down and then
  scrolled up to recenter, a discontinuous two-part motion instead of one smooth
  glide.
  **Fix:** Replaced the padding-and-scroll recentering in `AlgebraFlow` with a
  single transform on the list. The new center is measured before paint from the
  current line's layout offset (transform independent, so the measurement never
  fights the animation), and a CSS transition on the transform carries the whole
  stack in one continuous glide from the previously centered line to the new one.
  The list now sits in a clipping viewport with a short top and bottom fade so a
  long derivation dissolves at the edges instead of hard-cutting a half line. The
  first line and reduced motion snap into place without a glide, start-aligned
  flows stay anchored at the top, and stable flows are unchanged.
