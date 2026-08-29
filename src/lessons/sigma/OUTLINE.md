# sigma: Sigma (summation) notation

## Skill
`sigma` (Unit 8 Series, planned). Read and expand summation notation, evaluate a
finite sum, and use the basic sum rules (constant sum, factoring a constant,
splitting a sum).

## Core idea (the hand procedure)
The capital Greek sigma is a compact "add these up" instruction:

  sum_{k=m}^{n} a_k  =  a_m + a_{m+1} + ... + a_n

- k is the index of summation (a placeholder, like a loop counter).
- m is the lower limit (where k starts), n is the upper limit (where k stops).
- a_k is the summand (the rule): plug each k into it to get one term.
- Number of terms = n - m + 1.

Basic rules used later everywhere:
- Constant: sum_{k=1}^{n} c = n c.
- Factor a constant out: sum c a_k = c sum a_k.
- Split a sum: sum (a_k + b_k) = sum a_k + sum b_k.

## Verified examples
- sum_{k=1}^{5} k = 1 + 2 + 3 + 4 + 5 = 15.
- sum_{k=1}^{4} (2k + 1): k=1->3, k=2->5, k=3->7, k=4->9; total 3+5+7+9 = 24.
- sum_{k=1}^{4} 3 = 3+3+3+3 = 4 * 3 = 12  (constant rule, n=4, c=3).
- sum_{k=0}^{3} 2^k = 2^0+2^1+2^2+2^3 = 1+2+4+8 = 15  (start at 0; 3-0+1 = 4 terms).
- Your turn: sum_{k=1}^{n} k = n(n+1)/2. n=3 -> 6, n=4 -> 10, n=5 -> 15, n=6 -> 21.

## Slides (5)
1. `meaning` (SeriesBars): what sigma means on sum_{k=1}^{5} k. Bars 1..5, then
   expand 1+2+3+4+5, then the running total fills to 15.
2. `parts` (SeriesBars): anatomy on sum_{k=1}^{4}(2k+1). Name index, lower/upper
   limit, summand; plug in each k to get 3,5,7,9; total 24.
3. `constant` (SeriesBars): sum_{k=1}^{4} 3 = 12; the constant rule sum c = n c;
   all bars the same height.
4. `shift` (SeriesBars): sum_{k=0}^{3} 2^k = 15; the start can be 0, count terms
   as n - m + 1 = 4; bars 1,2,4,8 (geometric, doubling).
5. `your-turn` (SeriesBars): dial the upper limit n on sum_{k=1}^{n} k. Bars 1..n
   grow, the total updates by n(n+1)/2; a dashed target line marks 15.

## Figure plan
Shared `src/components/SeriesBars.tsx` (bars over an index axis with value tags,
an activeThrough fade for accumulation, a running-total track with an optional
dashed target line, and a caption). Watch slides gate the bars, then the
expansion, then the total, so one change lands at a time. The dock carries the
sigma expression and its expansion in KaTeX.

## Reveal flags (read literally in Stage.tsx)
- meaning:  bars, expand, total
- parts:    bars, expand, total
- constant: bars, expand, total
- shift:    bars, expand, total
- yourturn: (none; bars and total always show and update with n)

## Your turn (interactive)
Slider n (upper limit) on sum_{k=1}^{n} k, integer domain [1, 7], start 3
(sum = 6, off the answer). Manipulate target: make the sum equal 15, i.e. n = 5.
The bar count and the running total move with every step; a dashed line marks 15.

## Quiz plan
Climb (15): read limits and index; count the terms (n - m + 1); expand a small
sum; evaluate; constant rule; factor a constant; recognize the summand. Traps:
off-by-one term count, treating the index letter as a value, forgetting to plug
every k, applying sum c = c instead of n c.
Summit (15): rewrite a written-out sum in sigma form (index choice not unique);
shift the index and keep the same sum; split and factor with the rules; evaluate
sums that need k, k^2, or constant patterns; spot a wrong rule (sum of a product
is not the product of sums). Verify every total by hand.
