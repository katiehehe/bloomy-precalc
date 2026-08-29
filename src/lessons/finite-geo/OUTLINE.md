# finite-geo: Finite geometric series

## Skill
`finite-geo` (Unit 8 Series). Sum the terms of a finite geometric sequence with
the closed formula, and know where it comes from.

## Learner goal
Given a finite geometric sequence, recognize the common ratio, then add its terms
with S_n = a_1 (1 - r^n) / (1 - r) instead of adding one by one.

## Sources (accuracy first)
- OpenStax Precalculus 2e, Section 9.4 "Series and Their Notations" (geometric
  series, S_n = a_1 (1 - r^n) / (1 - r), r != 1).
- Sullivan, Precalculus, "Geometric Sequences; Geometric Series" (same formula
  and the shift-and-subtract derivation).
- Stewart, Precalculus / Blitzer, Precalculus (confirm the derivation
  S_n - r S_n = a_1 - a_1 r^n and the r != 1 restriction).

## Core facts (verified)
- Geometric sequence: each term is the previous times a fixed common ratio r.
  a_n = a_1 r^(n-1). Contrast with arithmetic (constant difference).
- Finite sum: S_n = a_1 (1 - r^n) / (1 - r) for r != 1. (If r = 1 every term is
  a_1, so S_n = n a_1.)
- Derivation (shift and subtract): write S_n, multiply every term by r to get
  r S_n (each power shifts up one), subtract so the middle terms cancel:
  S_n - r S_n = a_1 - a_1 r^n; factor S_n (1 - r) = a_1 (1 - r^n); divide by
  (1 - r).

## Verified examples
- a_1 = 2, r = 3: terms 2, 6, 18, 54; a_4 = 2 * 3^3 = 54.
- S_4 for 2 + 6 + 18 + 54: 2(1 - 3^4)/(1 - 3) = 2(1 - 81)/(-2) = 2(-80)/(-2) = 80
  (direct: 2 + 6 + 18 + 54 = 80).
- S_4 for 1 + 1/2 + 1/4 + 1/8: 1(1 - (1/2)^4)/(1 - 1/2) = (15/16)/(1/2) = 15/8 =
  1.875 (direct: 1 + 0.5 + 0.25 + 0.125 = 1.875).
- Your turn: a_1 = 1, r = 2 gives S_n = 2^n - 1. n=3 -> 7, n=4 -> 15, n=5 -> 31,
  n=6 -> 63.

## Slides (5)
1. `sequence` (SeriesBars): a geometric sequence has a constant RATIO r, not a
   constant difference. Bars 2, 6, 18, 54 (each 3x the last); a_n = a_1 r^(n-1),
   a_4 = 2 * 3^3 = 54.
2. `derive` (AlgebraFlow in the dock, SeriesBars glyph in the slot): derive
   S_n = a_1 (1 - r^n)/(1 - r) by the shift-and-subtract trick, one labeled line
   at a time (multiply by r, subtract, factor, divide), ending in a result box.
3. `apply` (SeriesBars): plug into the formula for 2 + 6 + 18 + 54: a_1 = 2,
   r = 3, n = 4, S_4 = 2(1 - 81)/(1 - 3) = 80. Running total fills to 80.
4. `shrink` (SeriesBars): the ratio can be a fraction. 1 + 1/2 + 1/4 + 1/8,
   a_1 = 1, r = 1/2, n = 4, S_4 = 15/8 = 1.875. Bars shrink; same formula, no sign
   trouble because 1 - r > 0.
5. `your-turn` (SeriesBars): a_1 = 1, r = 2 so S_n = 2^n - 1. Slider n in [1, 6],
   start n = 3 (S = 7, off answer). Make the sum reach 31 (n = 5); dashed target
   line at 31.

## Figure plan
Shared `src/components/SeriesBars.tsx` for every slide (an <svg> in the slot, so
the smoke harness stays happy and the pencil-mimic bars stay visible). Slide 2
adds the shared `src/components/AlgebraFlow.tsx` in the dock for the line-by-line
derivation, gated one step per beat by reveal flags. Watch slides gate bars, then
the substitution, then the total, so one change lands at a time.

## Reveal flags (read literally in Stage.tsx)
- sequence: bars, ratio, formula
- derive:   e1, e2, e3, e4 (AlgebraFlow steps; first line always shown)
- apply:    bars, plug, simplify, total
- shrink:   bars, plug, simplify, total
- yourturn: (none; bars and total always show and update with n)

## Your turn (interactive)
Slider n on a_1 = 1, r = 2, integer domain [1, 6], start 3 (S = 7, off the
answer). Manipulate target: make the sum equal 31, i.e. n = 5. Every step adds a
bar and moves the running total; a dashed line marks 31. check: round(n) === 5.

## Quiz plan
Climb (15): identify r (a ratio, not a difference); a_n = a_1 r^(n-1); read the
right a_1, r, n; evaluate small finite geometric sums; the r != 1 restriction.
Summit (15): sums with r > 1, r < 1, and r < 0; the sign of 1 - r; use the
formula for larger n; contrast with the arithmetic-sum formula. Traps: using the
arithmetic formula n(a_1 + a_n)/2, a sign error in 1 - r for r > 1, writing r^(n-1)
instead of r^n inside the formula, calling r a difference, and off-by-one in the
term count n. Correct option varies; every sum verified by hand.
