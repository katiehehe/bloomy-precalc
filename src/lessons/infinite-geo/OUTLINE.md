# infinite-geo: Infinite geometric series and convergence

## Skill

`infinite-geo` (Unit 8 Series). Decide when an infinite geometric series
converges, and find its sum when it does.

## Learner goal

Given an infinite geometric series a_1 + a_1 r + a_1 r^2 + ..., decide whether it
converges (has a finite sum) and, when it does, compute that sum with
S = a_1 / (1 - r).

## Sources

- OpenStax Precalculus 2e, Chapter 11 (Sequences, Probability, and Counting
  Theory), Section 11.4 Series and Their Notations: infinite geometric series
  converge iff |r| < 1, with S = a_1 / (1 - r).
- Blitzer, Precalculus, Sequences and Series chapter: same condition and sum
  formula, with the divergence warning when |r| >= 1.
- Stewart, Precalculus: partial sum S_n = a_1 (1 - r^n) / (1 - r), and r^n -> 0
  exactly when |r| < 1, which is why the condition is |r| < 1.

## Core idea (the hand procedure)

An infinite geometric series has a first term a_1 and a fixed common ratio r
between consecutive terms:

  a_1 + a_1 r + a_1 r^2 + a_1 r^3 + ...

- A partial sum S_n adds only the first n terms: S_n = a_1 (1 - r^n) / (1 - r).
- If |r| < 1, then r^n -> 0 as n grows, so S_n -> a_1 / (1 - r). The series
  CONVERGES and its sum is S = a_1 / (1 - r).
- If |r| >= 1, the terms do not shrink to zero, r^n does not settle, the partial
  sums run off, and the series DIVERGES (no finite sum). The formula does NOT
  apply. In particular r = 1 makes 1 - r = 0 (division by zero).

Vocabulary introduced: infinite geometric series, common ratio r, partial sum,
converge, diverge, limit (the value the partial sums approach), sum S.

## Verified examples

- 1/2 + 1/4 + 1/8 + ...: a_1 = 1/2, r = 1/2. Partial sums 1/2, 3/4, 7/8, 15/16,
  31/32, ... -> 1. S = (1/2) / (1 - 1/2) = 1.
- 3 + 1 + 1/3 + 1/9 + ...: a_1 = 3, r = 1/3. Partial sums 3, 4, 4.333, 4.444,
  4.481, ... -> 4.5. S = 3 / (1 - 1/3) = 3 / (2/3) = 9/2 = 4.5.
- 1 + 1 + 1 + ...: r = 1, |r| >= 1, diverges. Partial sums 1, 2, 3, 4, ... run
  off. The formula would need 1 / (1 - 1) = 1/0, which is undefined.
- Your turn: a_1 = 1, S = 1 / (1 - r). r = 0.8 -> S = 5. r = 0.5 -> S = 2.

## Slides (5)

1. `partials` (SeriesBars): 1/2 + 1/4 + 1/8 + ... Bars shrink by half; the
   running total steps through 1/2, 3/4, 7/8, 15/16, 31/32 and creeps up to a
   dashed target line at 1, never passing it. The limit is 1: it converges.
2. `condition` (SeriesBars): convergence needs |r| < 1. Contrast a shrinking
   case (r = 1/2, bars melt toward 0) with a growing case (r = 2, bars explode,
   no limit). State S = a_1 / (1 - r), valid only when |r| < 1.
3. `worked` (SeriesBars): 3 + 1 + 1/3 + 1/9 + ..., a_1 = 3, r = 1/3. The running
   total steps 3, 4, 4.333, 4.444, 4.481 toward the dashed line at 4.5, then the
   formula gives S = 3 / (1 - 1/3) = 9/2 = 4.5.
4. `diverge` (SeriesBars): 1 + 1 + 1 + ... (r = 1). Terms never shrink; partial
   sums 1, 2, 3, 4, 5 march off with no limit line. There is NO sum: the formula
   fails because |r| >= 1 (and 1 - r = 0).
5. `your-turn` (SeriesBars): a_1 = 1. Slider value v in [1, 9] maps to r = v/10,
   so r = 0.1 to 0.9. Bars 1, r, r^2, r^3, r^4 shrink; a dashed line marks
   S = 1 / (1 - r) on a fixed scale of about 10. Start v = 2 (r = 0.2, S = 1.25,
   off the answer). Manipulate: make the sum equal 2, so 1 / (1 - r) = 2 gives
   r = 0.5 (v = 5). check: round(values.r) === 5.

## Figure plan

Shared `src/components/SeriesBars.tsx`: a row of bars over an index axis (value
tags at the tips), plus a running-total track with an optional dashed target
line for the limit S. The Stage computes everything from `values`/`reveal` and
passes one SeriesSpec in. Watch slides gate the bars, then step the running
total one partial sum at a time, so a single change lands per beat.

## Reveal flags (read literally in Stage.tsx)

- partials: bars, t1, t2, t3, t4, t5 (t_k advances the running total to S_k)
- condition: bars, grow (swap to the exploding r = 2 case), cond (show the rule)
- worked: bars, t1, t2, t3, t4, t5
- diverge: bars, t1, t2, t3, t4, t5 (partial sums march off; no target line)
- your-turn: none (bars and the S line always show, driven by the r slider)

## Your turn (interactive)

Slider r (key "r"), integer domain [1, 9], start 2, step 1, format r = v/10 to
one decimal. Figure maps r = values.r / 10, draws bars 1, r, r^2, r^3, r^4 and a
dashed line at S = 1 / (1 - r). Manipulate target: 1 / (1 - r) = 2 needs r = 0.5,
so v = 5. The bars and the S line move on every step; the start (v = 2) is off
the answer.

## Quiz plan

Climb (15): identify a geometric series and its r; the convergence condition
|r| < 1; pick a convergent ratio; apply S = a_1 / (1 - r); an alternating case
(r = -1/2); divergence for |r| >= 1; a repeating decimal as a series. Traps:
using 1 + r instead of 1 - r, forgetting a_1 is the first term, thinking r = 1
converges, plugging into the formula when |r| >= 1.
Summit (15): mixed sums with fractional and negative r; solve for r or a_1 given
S; repeating decimals; r = -1 oscillation; the diverging-formula trap; a
capstone. Every sum verified by hand.
