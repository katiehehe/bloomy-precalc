# Vectors lesson outline

Goal: a learner can describe a vector by magnitude and direction, split it into components on a coordinate plane, add two vectors tip to tail with concrete numbers, and subtract one vector from another by adding its reverse.

Sources: standard precalculus treatment of vectors (components, magnitude, tip-to-tail and parallelogram addition, subtraction as adding the negative).

## Slide 1: Magnitude and direction
- A vector is an arrow: it has a length (magnitude) and a way it points (direction).
- Visual: on a coordinate plane, show one vector from the origin. Animate the magnitude growing and shrinking, then animate the direction rotating, so the two properties are seen separately.
- Interact: two sliders, magnitude and direction angle. Readout of both.

## Slide 2: Components
- Any vector splits into horizontal and vertical parts: $v_x = |v|\cos\theta$, $v_y = |v|\sin\theta$.
- Visual: dashed drop lines to each axis, labeled with concrete values. Coordinate plane with gridlines.
- Interact: drag the tip; watch components update. Show $|v| = \sqrt{v_x^2 + v_y^2}$.

## Slide 3: Adding vectors tip to tail
- To add, place $b$ starting at the tip of $a$. The sum runs from the tail of $a$ to the tip of $b$.
- Worked example with concrete numbers: $a = (3, 1)$ and $b = (1, 2)$, so $a + b = (4, 3)$.
- Visual: the vectors are **drawn on screen one beat at a time**. First $a$ grows from the origin, then $b$ grows tip to tail from the end of $a$, then the resultant $a + b$ grows from the origin to $b$'s tip. Each arrow animates its length with the beat.
- Interact: drag the tip of $b$ (or use the $b_x$, $b_y$ sliders) and watch $a + b$ swing and stretch.

## Slide 4: Subtracting vectors (adding the negative)
- Subtraction is adding the opposite: $a - b = a + (-b)$.
- Worked example: $a = (3, 1)$, $b = (2, 3)$, so $-b = (-2, -3)$ and $a - b = (1, -2)$.
- Visual: draw $a$, show $b$ faint (dashed) from the tip of $a$ for contrast, then draw its reverse $-b$ tip to tail, and finally the difference $a - b$ from the tail of $a$ to the tip of $-b$. Same progressive draw-in as addition.
- Interact: drag the tip of the difference (or use the sliders); $-b$ and $a - b$ update together.
- Questions: recognize $a - b = a + (-b)$, and make $a - b = (0, 0)$ by setting $b = a$.

## Slide 5: Resultant magnitude and direction (worked example)
- From components of the sum, compute $|a+b| = \sqrt{4^2 + 3^2} = 5$ and its direction $\theta = \tan^{-1}(v_y/v_x)$.
- Questions: drag the tip to a given resultant, or read off its magnitude.

## Parameters
- `mag` (magnitude), `dir` (direction angle) for slide 1.
- Component sliders or a draggable tip for slides 2 to 5. Addition and subtraction use $b_x$, $b_y$ with $a$ fixed; the draw-in is keyed off per-beat reveal flags (`drawA`, `drawB`/`drawNegB`, `drawSum`/`drawDiff`).
