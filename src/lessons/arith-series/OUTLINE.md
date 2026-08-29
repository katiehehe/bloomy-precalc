# arith-series: Arithmetic series sums

## Skill
`arith-series` (Unit 8 Series, planned). Add the terms of an arithmetic sequence
with the closed formula, understand why it works (Gauss pairing), and apply it to
concrete series.

## Core idea (the hand procedure)
An arithmetic sequence steps by a fixed common difference d, so its nth term is

  a_n = a_1 + (n - 1) d

A finite arithmetic series adds those terms. Pair the first with the last: each
first-plus-last pair is worth a_1 + a_n, and n terms make n/2 pairs, so

  S_n = (n/2)(a_1 + a_n) = (n/2)(2 a_1 + (n - 1) d)

The second form is handy when you know d but not the last term.

## Sources (verified against standard precalculus texts)
- OpenStax Precalculus 2e, section 11.2 (Arithmetic Sequences) and 11.3 (partial
  sums / series): a_n = a_1 + (n - 1)d and S_n = (n/2)(a_1 + a_n).
- Sullivan, Precalculus, Sequences and Series chapter: same formulas, plus the
  equivalent S_n = (n/2)(2 a_1 + (n - 1)d).
- Stewart/Blitzer/Larson agree on notation and the Gauss pairing derivation.

## Verified examples (every total checked by hand)
- Sequence a_1 = 3, d = 4: terms 3, 7, 11, 15, 19; a_5 = 3 + 4(4) = 19.
- Gauss: 1 + 2 + ... + 100 = (100/2)(1 + 100) = 50 * 101 = 5050.
- Small pairing 1..6: (1+6)+(2+5)+(3+4) = 3 * 7 = 21 (and 1+2+3+4+5+6 = 21).
- Apply: 3 + 7 + 11 + 15 + 19: S_5 = (5/2)(3 + 19) = (5/2)(22) = 55 (direct add: 55).
- Worked: 5 + 10 + ... + 50: a_10 = 50, S_10 = (10/2)(5 + 50) = 5 * 55 = 275.
- Your turn: odds 1, 3, 5, ...: a_n = 2n - 1, S_n = (n/2)(2n) = n^2; n = 5 gives 25.

## Slides (5)
1. `sequence` (SeriesBars): arithmetic sequence 3, 7, 11, 15, 19 as rising bars.
   Name the common difference d = 4 and the term formula a_n = a_1 + (n-1)d,
   check a_5 = 19.
2. `pairing` (SeriesBars): the Gauss idea. Bars for the small case 1..6, tinted
   into first-plus-last pairs each worth 7; 3 pairs give 21. Generalize to
   S_n = (n/2)(a_1 + a_n) and pay off with 1 + ... + 100 = 5050.
3. `formula` (SeriesBars): apply S_n = (n/2)(a_1 + a_n) to 3 + 7 + 11 + 15 + 19,
   getting (5/2)(22) = 55; the running total fills to 55. Show the equivalent
   S_n = (n/2)(2 a_1 + (n-1)d).
4. `worked` (SeriesBars): second worked case, the first ten multiples of 5.
   Find a_10 = 50 first, then S_10 = (10/2)(5 + 50) = 275.
5. `your-turn` (SeriesBars): odd numbers 1, 3, 5, ... with a_1 = 1, d = 2, whose
   sum is n^2. Slider n in [1, 8], start n = 3 (sum 9, off the answer). Target:
   make the sum 25, i.e. n = 5. Dashed line at 25, scaleTotal 64. Bars and total
   move with n.

## Figure plan
Shared `src/components/SeriesBars.tsx` (bars over an index axis with value tags,
an optional running-total track and dashed target line, and a caption). Watch
slides gate the bars, then the derivation lines, then the total, so one change
lands at a time. The dock carries the arithmetic in KaTeX. On the pairing slide,
bar tones mark each first-plus-last pair.

## Reveal flags (read literally in Stage.tsx, kept in sync with baseReveal/beats)
- sequence: bars, step, nth
- pairing:  bars, pairs, formula
- formula:  bars, plug, total
- worked:   bars, plug, total
- yourturn: none (bars and total always show and update with n)

## Your turn (interactive)
Slider n on the sum of the first n odd numbers, integer domain [1, 8], start 3
(sum = 9, off the answer). Manipulate target: make the sum equal 25, i.e. n = 5.
The bar count and the running total move with every step; a dashed line marks 25.
Check: round(values.n) === 5.

## Quiz plan
Climb (15): read the common difference; find a_n; count terms; sum small series
with S_n = (n/2)(a_1 + a_n); identify the correct formula. Traps: using n instead
of n/2, forgetting to find a_n first, off-by-one in n, confusing the term a_n with
the sum S_n, and using the geometric formula.
Summit (15): multi-step sums, negative d, solving for n or a_1, real-world stacks,
distinguishing arithmetic from geometric, and the odd-number n^2 pattern. Every
total verified by hand.
