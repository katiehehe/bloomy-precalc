# vec-ops: Add, subtract, and scale

## Goal
One sentence: teach how to combine vectors by adding tip to tail and componentwise, subtracting as adding the opposite, and scaling by a number that stretches, shrinks, or flips, then read off combinations like 2a - b.

## Sources
1. OpenStax, Precalculus 2e, Section 8.8 "Vectors" (Rice University, 2021). Facts used:
   - Vector addition and subtraction are done by adding or subtracting corresponding components: for a = (a1, a2) and b = (b1, b2), a + b = (a1 + b1, a2 + b2) and a - b = (a1 - b1, a2 - b2).
   - Geometric addition places vectors tip to tail (the head-to-tail rule); the sum, called the resultant, runs from the tail of the first to the tip of the last.
   - Scalar multiplication multiplies a vector by a constant k, scaling its magnitude; a negative scalar reverses the direction.
2. Sullivan, Precalculus, 11th ed., Chapter 10 "Polar Coordinates; Vectors" (Pearson). Facts used:
   - Componentwise formulas for the sum, difference, and scalar multiple of vectors written as v = a i + b j.
   - The parallelogram / tip-to-tail geometry of a + b, and a - b = a + (-b).
   - Properties: a + b = b + a (commutative), and for a scalar k, k(a i + b j) = (ka) i + (kb) j.

## Slide-by-slide sketch

1. **How to add vectors tip to tail (mode `add`)**
   Watch. Draw a = (3, 1) from the origin, then b starting at the tip of a, then the resultant a + b from the origin to the final tip. Show that componentwise a + b = (3 + 1, 1 + 2) = (4, 3), and that moving b slides the resultant. Questions: componentwise sum, what the resultant connects, and a plot for a fresh a + b.

2. **Why subtracting a vector is adding the opposite (mode `sub`)**
   Watch. a - b = a + (-b). Draw a, show b faint from a's tip, reverse it to -b (same length, opposite direction), then draw a - b from origin to the tip of -b. Componentwise a - b = (3 - 2, 1 - 3) = (1, -2). Questions: definition, componentwise difference, and -b of a given b.

3. **How to scale a vector (mode `scale`)**
   Watch. k v = (k vx, k vy). With v = (2, 1): k = 2 stretches to (4, 2), k = 0.5 shrinks to (1, 0.5), k = -1 flips to (-2, -1). Summarize k > 1 stretch, 0 < k < 1 shrink, k < 0 flip. Questions: compute a scalar multiple, effect of k = -2, and k = 0.

4. **How to compute a combination like $2\mathbf{a} - \mathbf{b}$ (mode `combo`)**
   Watch. With a = (2, 1), b = (1, 3): first double a to 2a = (4, 2), then subtract b by adding -b tip to tail, landing at 2a - b = (3, -1). Show the one-line componentwise version. Questions: compute 2a, a mixed combination, and a plot for a fresh 2a - b.

5. **Your turn: scale and combine vectors (mode `scale`)**
   Try. The k slider multiplies v = (2, 1); the readout shows k v live. Starts parked off-answer at k = 0.5. Manipulate targets: double the vector (k = 2) and flip it (k = -1). Plus a choice computing a combination 2a - b.
