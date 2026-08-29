# induction: Mathematical induction

## Skill
`induction` (Unit 8 Series, planned). Prove a statement $P(n)$ holds for all
integers $n \ge 1$ using two parts: a base case and an inductive step.

## Learner goal
Understand why induction works (the falling-dominoes picture), carry out the two
required parts on the running example $S(n): 1 + 2 + \cdots + n = \dfrac{n(n+1)}{2}$,
and know that both parts are mandatory.

## Sources
- OpenStax Precalculus 2e, section 13.4 "Mathematical Induction" (the two-step
  method: base case, then inductive step assuming $P(k)$ to prove $P(k+1)$).
- Sullivan, Precalculus, "Mathematical Induction" (same two-step statement; the
  $1 + 2 + \cdots + n = n(n+1)/2$ worked example).
- Blitzer / Larson Precalculus (domino analogy; the cautionary point that a
  statement can satisfy the inductive step yet fail without a valid base case).

## Core idea (the hand procedure)
To prove $P(n)$ for every integer $n \ge 1$:
1. Base case: show $P(1)$ is true (knock over the first domino).
2. Inductive step: show that if $P(k)$ is true for some $k \ge 1$, then $P(k+1)$
   is true (each falling domino knocks the next). The assumption $P(k)$ is the
   inductive hypothesis.
Chain them: the first falls, each knocks the next, so every domino falls. Both
parts are required; neither alone proves anything for all $n$.

## Verified example: S(n) = 1 + 2 + ... + n = n(n+1)/2
- Base case n = 1: LHS = 1, RHS = 1(1+1)/2 = 2/2 = 1. Match, so P(1) holds.
- Inductive step: assume 1 + ... + k = k(k+1)/2. Then
  1 + ... + k + (k+1) = k(k+1)/2 + (k+1) = (k+1)(k/2 + 1) = (k+1)(k+2)/2,
  which is n(n+1)/2 at n = k+1. So P(k) implies P(k+1).
- Values: S(1)=1, S(2)=3, S(3)=6, S(4)=10, S(5)=15, S(6)=21, S(8)=36.

## Slides (5)
1. `principle` (dominoes SVG): the claim P(n) for all n, then the two parts on the
   domino line: base case (first falls) and inductive step (each knocks the next).
2. `base` (dominoes SVG + dock): the base case for S(n). Check n = 1: LHS = 1,
   RHS = 1(1+1)/2 = 1. They match, so P(1) holds (first domino falls).
3. `step` (small dominoes SVG in slot + AlgebraFlow): the inductive step. Assume
   P(k), substitute the hypothesis, factor out (k+1), combine to (k+1)(k+2)/2,
   which is P(k+1). Domino k knocks domino k+1.
4. `bothneeded` (dominoes SVG): why both parts matter. Base case with a broken
   step (first falls, chain stops) and a working step with no base case (nothing
   starts) both fail. Cautionary claim n = n+1 satisfies the step but is false.
5. `your-turn` (dominoes SVG + dock): integer slider n in [1, 8] topples dominoes
   1..n and shows 1 + ... + n = n(n+1)/2 for the current n. Start n = 2.

## Figure plan (bespoke dominoes SVG inside Stage.tsx)
A `Dominoes` SVG draws a row (or two rows) of dominoes as rounded `<rect>`s on a
ground line. A fallen domino tilts via a rotate transform about its base corner
and turns teal (proven); a standing domino is upright and blue (not yet reached).
Optional annotations: implication arrows between neighbors, a red break mark (step
fails), and a red no-entry mark (no starting push). The step slide stacks a small
2-domino strip above the shared `AlgebraFlow` in the same figure-slot, so every
slide keeps an `<svg>` in `.figure-slot`.

## Reveal flags (read literally in Stage.tsx)
- principle:  firstfall, cascade
- base:       lhs, rhs, match
- step:       e1, e2, e3, e4  (AlgebraFlow steps; e1 tilts domino k, e4 tilts k+1)
- bothneeded: caseA, caseB
- your-turn:  none (dominoes and dock update with the n slider)

## Your turn (interactive)
Slider n on 1 + ... + n = n(n+1)/2, integer domain [1, 8], start n = 2 (off the
answer). Manipulate target: topple the first five dominoes, n = 5. Check:
round(values.n) === 5. Dominoes 1..n topple and the dock identity updates as n moves.

## Quiz plan
Climb (15): the two required parts; base case is P(1); domino meaning; the
inductive step P(k) => P(k+1); the inductive hypothesis is P(k); the step's goal
is P(k+1); base-case LHS and RHS for S; complete k(k+1)/2 + (k+1); write P(k+1);
traps (finitely many checks is not a proof, assuming P(k+1), base-only, step-only,
scope is integers n >= 1).
Summit (15): state the hypothesis; the term added is (k+1); write the goal P(k+1);
off-by-one in P(k+1); a second example (odd numbers sum = n^2, base and step);
circular assumption; the n = n+1 cautionary claim; a base-case check for 2^n >= n+1;
one specific implication is not the general step; factoring and simplifying steps;
identify the false statement; a correct proof outline. Every total verified by hand.
