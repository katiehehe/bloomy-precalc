# Modeling force, velocity, and navigation

**Skill:** `vec-models` (Unit 5: Vectors)

**Goal (one sentence):** Model real quantities (forces, velocities) as vectors,
find a resultant as a vector sum, read its magnitude and direction, and use the
navigation ideas of ground velocity and bearings, all in the standard plane with
east as $+x$ and north as $+y$.

This lesson APPLIES the machinery built in Base Camp Vectors (magnitude,
components, tip-to-tail addition, resultant). It does not re-teach the mechanics;
it puts them to work on forces and on air/wind navigation.

## Sources

- OpenStax Precalculus 2e, Section 8.8 "Vectors" (applications: resultant of
  forces, using vectors to model velocity, air/ground speed word problems):
  a vector has magnitude and direction; the resultant of two vectors is their
  sum; magnitude $|v| = \sqrt{v_x^2 + v_y^2}$; direction angle from the positive
  $x$-axis via $\tan\theta = v_y / v_x$ with a quadrant check.
- Stewart, Precalculus, "Vectors in Two Dimensions" and "Applications of
  Vectors": force and velocity as vectors, resultant force, and the
  navigation model ground velocity = air velocity + wind velocity.
- Larson, Precalculus, "Vectors in the Plane" (bearings): a **bearing** is
  measured clockwise from due north. Cross-checked with Sullivan, Precalculus,
  "Applications of Vectors."

## Convention decisions

- Standard plane, east $= +x$, north $= +y$. Direction angle $\theta$ is measured
  counterclockwise from the positive $x$-axis (east), matching Base Camp Vectors
  and the modulus/argument lesson.
- A **bearing** is measured clockwise from north (the $+y$ axis). Conversion:
  a bearing $B$ corresponds to the standard angle $90^\circ - B$, reduced into
  $[0^\circ, 360^\circ)$; equivalently $B = 90^\circ - \theta$. Verified on a
  clean case (northeast: $\theta = 45^\circ \Rightarrow B = 45^\circ$).
- Notation for the direction uses $\arctan$ (never `atan`), matching house style.
- SCALE trick, mirrored from Base Camp Vectors: the interactive slide uses
  integer sliders and divides by `SCALE = 20` for world coordinates. The
  navigation slide draws velocities at 1 world unit $= 10$ km/h so the clean
  $30$-$40$-$50$ triangle fits on a small plane.

## Verified numbers (checked by hand)

- Force resultant: $F_1 = (3, 0)$, $F_2 = (0, 4)$, $R = (3, 4)$,
  $|R| = \sqrt{9 + 16} = 5$, $\theta = \arctan(4/3) \approx 53.13^\circ$.
- Companion: $(4, 3)$ has $|R| = 5$, $\theta = \arctan(3/4) \approx 36.87^\circ$.
- Navigation: air $(30, 0)$, wind $(0, 40)$, ground $(30, 40)$,
  ground speed $\sqrt{900 + 1600} = 50$ km/h, $\theta = \arctan(4/3)
  \approx 53.13^\circ$, bearing $= 90^\circ - 53.13^\circ = 36.87^\circ$
  (about $\mathrm{N}\,37^\circ\mathrm{E}$).
- $5$-$12$-$13$: $(5, 12)$ and $(12, 5)$ both have magnitude $13$;
  $(50, 120)$ has magnitude $130$.
- $(6, 8)$ has magnitude $10$; $(9, 12)$ has magnitude $15$; $(400, 300)$ has
  magnitude $500$.
- Equilibrium: to cancel $F = (3, 4)$, the balancing force is $-F = (-3, -4)$;
  then $R = (0, 0)$.
- Bearing checks: $\theta = 45^\circ \Rightarrow B = 45^\circ$ (NE);
  $\theta = 0^\circ$ (east) $\Rightarrow B = 90^\circ$;
  bearing $120^\circ \Rightarrow \theta = 90^\circ - 120^\circ = -30^\circ
  \equiv 330^\circ$.

## Figure (shared `VectorPlane`, one Stage, four modes)

A physics scene, not a plotted graph: `hideGrid` turns off the tick grid, axes,
and origin dot. Force and balance slides draw a crate on a ground line (with an
east label). Navigation draws a small plane and the N/E/S/W compass. A tighter
world half-range zooms the arrows so they fill the panel.

- **forces:** $F_1 = (3, 0)$ and $F_2 = (0, 4)$ drawn tip to tail (distinct
  tones), then the resultant $R = (3, 4)$ from the crate, drawn in growing
  animation. Dock lists $F_1$, $F_2$, $R = F_1 + F_2$.
- **resultant:** $R = (3, 4)$ with its component legs and the direction arc from
  east ($\theta$). Dock: $R$, $|R| = 5$, $\theta \approx 53.13^\circ$.
- **navigation:** air, wind, and ground velocity arrows summing tip to tail; a
  light N/E/S/W compass overlay; the $\theta$ arc; a bearing arc from north when
  revealed. Dock: the three velocities, ground speed $50$, $\theta$, and the
  bearing.
- **balance (interactive):** a fixed load $F_1 = (3, 4)$, an adjustable second
  force $F_2$ (integer sliders $F_{2x}, F_{2y}$, world $= $ value $/ 20$), and the
  live resultant $R = F_1 + F_2$. Dragging the resultant tip steers $F_2$. Dock
  shows $R$, $|R|$, and its direction (or "equilibrium" when $R = 0$). The second
  force starts at $(2, 1)$, OUTSIDE every answer.

## Slides

1. **How to add force vectors** A force is a vector. Two forces add tip to tail; the
   resultant is their vector sum. Worked: $(3, 0) + (0, 4) = (3, 4)$. Choice
   (add componentwise) and plot (place the resultant of $(4, 0) + (0, 3)$).
2. **How to find the magnitude and direction of a resultant** $|R| = \sqrt{R_x^2 + R_y^2} = 5$;
   direction from east $\theta = \arctan(R_y / R_x) \approx 53.13^\circ$. Callout:
   opposite over adjacent, measured from the east axis; $\arctan(3/4)$ is the
   angle from north instead. Choice (magnitude, direction) and plot.
3. **Navigation.** Ground velocity = air velocity + wind velocity. Ground speed
   is the magnitude, $50$ km/h. Bearings are clockwise from north; convert with
   $B = 90^\circ - \theta$ and verify on the northeast case. Choice (ground
   velocity, ground speed, bearing conversion).
4. **Your turn (equilibrium).** Steer $F_2$ to hit a target resultant, and to
   reach equilibrium ($R = 0$) by opposing the load with $-F_1$. Manipulate
   (equilibrium; target $R = (4, 3)$) and a choice on what equilibrium means.

## Questions grounded in takeaways

- Resultant is the vector sum: add east parts and north parts separately.
- $|R| = \sqrt{R_x^2 + R_y^2}$ (not $|F_1| + |F_2|$ when the forces are not
  parallel); direction is $\arctan(R_y / R_x)$ from east.
- Ground velocity = air + wind; ground speed is its magnitude.
- Bearing is clockwise from north; $B = 90^\circ - \theta$.
- Equilibrium means the resultant is the zero vector; the balancing force is
  $-F$.
- Traps: adding magnitudes instead of components; swapping opposite and adjacent
  in $\arctan$; measuring the angle from the wrong axis; confusing a bearing with
  a standard-position angle; forgetting a wind or force component; sign errors in
  the equilibrium (balancing) force.
