# mtx-tx - Matrices as transformations

Unit 6 (Matrices). A GRAPHICAL lesson built on the shared `VectorPlane` (not
`MatrixGrid`). It reuses the same plane, arrows, and overlay slots as the vectors
unit so the geometry is drawn literally.

## Goal
See a $2 \times 2$ matrix $M$ as a transformation of the plane: the two columns
of $M$ are the images of the basis vectors, so the unit square maps to the
parallelogram spanned by those columns, and $\det(M) = ad - bc$ is the signed
area scale factor (zero collapses the square, negative flips orientation).

## Sources
- OpenStax Precalculus 2e, Chapter 9 (Matrices and Matrix Operations): the
  matrix-vector product and the row-by-column rule.
- Standard linear-algebra treatment of matrices as linear maps (Lay, Linear
  Algebra and Its Applications; Strang, Introduction to Linear Algebra): the
  columns of $M$ are $M\hat{\imath}$ and $M\hat{\jmath}$, and $|\det|$ is the
  area scale factor with sign giving orientation.
- Convention: column vectors, $M$ acts on the left ($Mv$), the standard basis is
  $\hat{\imath} = (1,0)$ and $\hat{\jmath} = (0,1)$. Composition "M then N" is the
  product $NM$.

## Verified numbers
- $M = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$: $M\hat{\imath} = (a,c)$
  (column 1), $M\hat{\jmath} = (b,d)$ (column 2).
- Unit square corners map to $(0,0), (a,c), (a+b, c+d), (b,d)$.
- $\det(M) = ad - bc$; image area of the unit square is $|\det(M)|$.
- Slide 1 fixed example $M = \begin{bmatrix} 3 & 2 \\ 1 & 2 \end{bmatrix}$:
  $\hat{\imath} \to (3,1)$, $\hat{\jmath} \to (2,2)$, $\det = 3(2) - 2(1) = 4$.
  (First row $(3,2)$ differs from first column $(3,1)$, so rows vs columns is clear.)
- Named examples (all exact): identity $\det 1$; scaling $[[2,0],[0,2]]$ $\det 4$;
  $[[2,0],[0,3]]$ $\det 6$ and sends $(1,1) \to (2,3)$; rotation $90^\circ$ CCW
  $[[0,-1],[1,0]]$ sends $\hat{\imath} \to (0,1)$, $\hat{\jmath} \to (-1,0)$,
  $\det 1$; shear $[[1,1],[0,1]]$ sends $\hat{\imath} \to (1,0)$,
  $\hat{\jmath} \to (1,1)$, $\det 1$; reflection over x-axis $[[1,0],[0,-1]]$
  $\det -1$.
- Composition: doing $M$ then $N$ is $NM$. Scale by 2 then rotate $90^\circ$:
  $NM = [[0,-2],[2,0]]$, $\det 4$.

## Slides
1. **columns-are-images** (mode `cols`, fixed $M$). Reveal, one beat at a time,
   that $M\hat{\imath}$ is column 1 and $M\hat{\jmath}$ is column 2. Basis drawn
   dashed and muted; the two images bold in two tones. Choice questions on the
   image of each basis vector and the rows-vs-columns trap.
2. **unit-square-maps** (mode `map`, sliders a,b,c,d hidden, animated). Start at
   the identity, then automated `to:` motion morphs $M$ through scaling, rotation,
   and shear while the filled parallelogram (overlay polygon) tracks the columns.
   Choice questions on scaling area and reading a shear.
3. **determinant-area** (mode `det`, animated). $\det = ad - bc$ as the area
   factor; animate to $\det = 0$ (collapse, not invertible) and to a reflection
   ($\det < 0$, orientation flips). Choice questions on the area factor and det=0.
4. **your-turn** (mode `try`, sliders a,b,c,d shown). Every slider moves an image
   arrow and the parallelogram; the dock shows $M$, the columns, and live
   $\det$. Manipulate: starting from the scaling $[[2,0],[0,2]]$ (det 4, off the
   answer), make $\det = 0$ so the square collapses to a line. Plus choices on
   which arrow a slider moves and area factor vs trace.

## Figure (shared VectorPlane)
Half-range $5.5$. Basis $\hat{\imath}, \hat{\jmath}$ dashed/muted; images (columns)
bold in the cosine and teal tones, labelled. The original unit square is a faint
dashed outline (underlay); the transformed unit square is a filled polygon built
from `plane.sx/sy` of the four vertices (overlay), tinted for orientation and
degenerating to a line when $\det = 0$. Dock carries $M$ as a KaTeX
`\begin{bmatrix}`, the two columns, and $\det(M) = ad - bc$ with the area factor.

## Quiz
15 Climb (columns are images, image of $\hat{\imath}/\hat{\jmath}$, image $Mv$,
det as area factor, recognize identity/scaling/rotation/shear/reflection, det=0
meaning, parallelogram vertices, rows-vs-columns) and 15 Summit (compute images
and areas, composition $= NM$, orientation from the sign of det, find a matrix
for a described transformation, det=0 not invertible, rotation preserves area,
trap capstones). Traps: rows vs columns, adding instead of the matrix-vector
product, area factor = trace, forgetting the orientation sign, thinking rotation
changes area. All determinants and products hand-verified.
