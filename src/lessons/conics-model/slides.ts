import type { ParamSpec, Slide } from "../types";

/**
 * Conic modeling (Unit 7 Conics, applications capstone). The learner sets up a
 * conic from a described scenario, finds its key feature (usually a focus), and
 * answers a practical question, all with verified clean numbers.
 *
 * Parabola x^2 = 4py: focus at (0, p); a dish of radius r and depth d has the
 * rim point (r, d) on the curve, so r^2 = 4pd and p = r^2 / (4d).
 * Ellipse: c^2 = a^2 - b^2 (minus), sum of focal distances = 2a.
 * Hyperbola: c^2 = a^2 + b^2 (plus), difference of focal distances = 2a.
 *
 * Reveal flags are read literally in Stage.tsx and kept in sync with the beats:
 *   dish:       dock, rays, focus
 *   gallery:    dock, people, path
 *   loran:      dock, foci, radii
 *   flashlight: dock, focus, beam
 *   yourturn:   dock, focus (both in baseReveal; the curve and focus morph with d)
 */

const depthParam: ParamSpec = {
  key: "d",
  label: "dish depth d (width fixed at 4 ft)",
  min: 1,
  max: 6,
  start: 5,
  step: 1,
  format: (v) => `d = ${Math.round(v)} ft`,
};

export const slides: Slide[] = [
  {
    id: "satellite-dish",
    title: "A satellite dish gathers signal at the focus",
    mode: "dish",
    hideSliders: true,
    baseReveal: { dock: true },
    beats: [
      {
        text: "A **satellite dish** is a **parabola** spun into a bowl. It catches faint signal rays that arrive straight down its axis and concentrates them at a single point, the **focus**, where a receiver sits.",
      },
      {
        text: "Place the **vertex** (the bottom of the bowl) at the origin, opening upward, so the dish takes the form $$x^2 = 4py$$ in standard position. The number $p$ is the **focal length**, the straight-up distance from the vertex to the focus, and it is exactly what we need to find.",
      },
      {
        text: "This dish is $4$ feet wide and $1$ foot deep. The signal arrives as rays **parallel** to the axis, all pointing straight down, and each one strikes the inside of the bowl.",
        add: { rays: true },
      },
    ],
    practice:
      "A parabola sends every ray that arrives parallel to its axis through the focus, so the receiver belongs at the focus rather than the vertex.",
    questions: [
      {
        kind: "choice",
        prompt:
          "A parabolic dish catches rays that arrive parallel to its axis. After they reflect off the bowl, they all pass through the:",
        options: ["focus", "vertex", "rim", "center of the plane"],
        answer: 0,
        hint: "It is the point the whole reflective property is built around, not the bottom of the bowl.",
        success:
          "Right: a parabola sends every axis-parallel ray through its focus, so the receiver belongs there.",
      },
    ],
  },
  {
    id: "satellite-dish-solve",
    title: "Placing the receiver at the focus",
    mode: "dish",
    hideSliders: true,
    baseReveal: { dock: true, rays: true },
    beats: [
      {
        text: "A parabola reflects every axis-parallel ray through its focus, so the reflected rays must all cross at $(0, p)$. To pin down $p$, use a point already known to lie on the dish, a point on the **rim**.",
      },
      {
        text: "The dish is $4$ ft wide, so its radius (half the width) is $2$ ft, and it is $1$ ft deep, which puts a rim point at $(2, 1)$. Make sure to use the radius $2$ here, not the full width $4$. Substituting into $x^2 = 4py$ gives $2^2 = 4p(1)$, which is $4 = 4p$.",
      },
      {
        text: "Dividing both sides by $4$ gives $p = 1$, so the focus sits at $(0, 1)$, one foot above the vertex. That is exactly where the receiver must go to collect the concentrated signal, since a receiver at the vertex would let the rays pass by.",
        add: { focus: true },
      },
    ],
    practice:
      "To find a dish's receiver, put a rim point into $x^2 = 4py$: use the radius (half the width) for $x$ and the depth for $y$, solve for $p$, and place the receiver at the focus $(0, p)$.",
    questions: [
      {
        kind: "choice",
        prompt:
          "For this $4$ ft wide, $1$ ft deep dish, the rim point $(2, 1)$ in $x^2 = 4py$ gives $p = 1$. The receiver should be placed:",
        options: [
          "at the focus $(0, 1)$, one foot above the vertex",
          "at the vertex $(0, 0)$, the bottom of the bowl",
          "at the rim $(2, 1)$, on the edge of the dish",
          "at $(0, 2)$, two feet above the vertex",
        ],
        answer: 0,
        hint: "The rays converge at $(0, p)$, and we found $p = 1$.",
        success:
          "Yes: the focus is $(0, 1)$, so the receiver hangs one foot above the vertex.",
      },
    ],
  },
  {
    id: "whispering-gallery",
    title: "A whispering gallery carries sound focus to focus",
    mode: "gallery",
    hideSliders: true,
    baseReveal: { dock: true },
    beats: [
      {
        text: "In a **whispering gallery**, a person at one spot hears a whisper from far across the room as if it were spoken right beside them. The room's cross-section is an **ellipse**, an oval with two special points inside called **foci** (the plural of focus).",
      },
      {
        text: "This gallery is modeled by $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$, so $a = 5$ is the **semi-major axis** (half the long way) and $b = 3$ is the **semi-minor axis** (half the short way).",
      },
      {
        text: "For an **ellipse**, the distance $c$ from the center to each focus satisfies $$c^2 = a^2 - b^2$$ where the **minus** sign keeps the foci inside the oval. Here $c^2 = 25 - 9 = 16$ gives $c = 4$, so the foci sit on the long axis at $(\\pm 4, 0)$, and two people standing there are $2c = 8$ feet apart.",
        add: { people: true },
      },
    ],
    practice:
      "For an ellipse, find the foci with $c^2 = a^2 - b^2$, a minus sign that keeps the foci inside the oval, at a distance $c$ from the center along the major axis.",
    questions: [
      {
        kind: "choice",
        prompt:
          "For a whispering-gallery ellipse with $a = 5$ and $b = 3$, the focal distance $c$ is:",
        options: [
          "$c = 4$, from $c^2 = 25 - 9$",
          "$c = \\sqrt{34}$, from $c^2 = 25 + 9$",
          "$c = 2$, from $c = 5 - 3$",
          "$c = 5$, so the foci are the ends of the long axis",
        ],
        answer: 0,
        hint: "An ellipse uses a minus, and you must square first: $c^2 = a^2 - b^2$.",
        success:
          "Right: $c^2 = 25 - 9 = 16$, so $c = 4$ and the foci are at $(\\pm 4, 0)$.",
      },
    ],
  },
  {
    id: "whispering-gallery-why",
    title: "Why the whisper reconverges",
    mode: "gallery",
    hideSliders: true,
    baseReveal: { dock: true, people: true },
    beats: [
      {
        text: "The whisper carries because sound leaving one focus reflects off the curved wall straight to the **other** focus, never scattering away. One traced path runs from the left focus up to the top of the room at $(0, 3)$, then back down to the right focus.",
        add: { path: true },
      },
      {
        text: "Every reflected path has the **same** total length, the ellipse's defining sum $2a = 10$. Check the path over the top: each leg from $(0, 3)$ to a focus is $\\sqrt{4^2 + 3^2} = \\sqrt{25} = 5$, so the round trip is $5 + 5 = 10$. Because all the reflected paths share that one length, the whispers arrive at the far focus together and add up, instead of smearing into noise.",
      },
    ],
    practice:
      "For every point on an ellipse, the two distances to the foci add to the constant sum $2a$, the single length shared by all the reflected paths.",
    questions: [
      {
        kind: "choice",
        prompt: "In this gallery, the two people should stand:",
        options: [
          "at the two foci, $(\\pm 4, 0)$",
          "at the ends of the long axis, $(\\pm 5, 0)$",
          "at the center, $(0, 0)$",
          "at the top and bottom, $(0, \\pm 3)$",
        ],
        answer: 0,
        hint: "The focus-to-focus reflection is the reason the two spots must be the foci.",
        success:
          "Yes: standing at the foci $(\\pm 4, 0)$ puts each listener exactly where the other's sound reconverges.",
      },
    ],
  },
  {
    id: "hyperbola-nav",
    title: "Navigation pins a ship to a hyperbola",
    mode: "loran",
    hideSliders: true,
    baseReveal: { dock: true },
    beats: [
      {
        text: "Long-range navigation (LORAN) locates a ship using **two** radio stations and how much **farther** one signal travels than the other, a **difference of distances**. Every position with that difference lies on a **hyperbola**, two open branches with a **focus** at each station. This one is $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$, so $a = 3$ and $b = 4$.",
      },
      {
        text: "The foci of a **hyperbola** follow the opposite rule from the ellipse: $$c^2 = a^2 + b^2$$ where the **plus** pushes the foci **outside** the branches, farther from the center than the vertices. Here $c^2 = 9 + 16 = 25$ gives $c = 5$, so the foci (the two stations) are at $(\\pm 5, 0)$.",
        add: { foci: true },
      },
    ],
    practice:
      "For a hyperbola, find the foci with $c^2 = a^2 + b^2$, a plus sign that places the foci outside the vertices, at a distance $c$ from the center.",
    questions: [
      {
        kind: "choice",
        prompt:
          "For a navigation hyperbola with $a = 3$ and $b = 4$, the focal distance $c$ is:",
        options: [
          "$c = 5$, from $c^2 = 9 + 16$",
          "$c = 7$, from $c = 3 + 4$",
          "$c = 1$, from $c = 4 - 3$",
          "$c = \\sqrt{7}$, using $c^2 = a^2 - b^2$",
        ],
        answer: 0,
        hint: "A hyperbola uses a plus, and you must square first: $c^2 = a^2 + b^2$.",
        success:
          "Right: $c^2 = 9 + 16 = 25$, so $c = 5$ and the stations are at $(\\pm 5, 0)$.",
      },
    ],
  },
  {
    id: "hyperbola-nav-diff",
    title: "The constant difference of distances",
    mode: "loran",
    hideSliders: true,
    baseReveal: { dock: true, foci: true },
    beats: [
      {
        text: "For a hyperbola, the **difference** of the distances to the two foci stays constant and equals $2a$, which is $6$ here. Take a point $P$ on the right branch with its two **focal radii** drawn, $d_1$ to the far focus and $d_2$ to the near focus, where $d_1 - d_2 = 6$ no matter where $P$ sits.",
        add: { radii: true },
      },
      {
        text: "The easiest point to check is the right **vertex** $(3, 0)$. The near focus $(5, 0)$ lies $5 - 3 = 2$ away and the far focus $(-5, 0)$ lies $5 + 3 = 8$ away, so the difference is $8 - 2 = 6$, exactly $2a$.",
      },
      {
        text: "This navigation hyperbola reuses the numbers of the whispering-gallery ellipse: that ellipse had $(a, b, c) = (5, 3, 4)$, and this one has $(3, 4, 5)$, the same 3-4-5 triple. The only real difference is the sign, since an ellipse uses $c^2 = a^2 - b^2$ while a hyperbola uses $c^2 = a^2 + b^2$.",
      },
    ],
    practice:
      "For a hyperbola, the difference of the two focal distances is the constant $2a$ for every point on the curve, which is what the time delay between the stations measures.",
    questions: [
      {
        kind: "choice",
        prompt:
          "For a ship on this hyperbola, the difference between its distances to the two stations (the foci) is:",
        options: ["$2a = 6$", "$2c = 10$", "$a = 3$", "$2b = 8$"],
        answer: 0,
        hint: "A hyperbola is defined by a constant difference of distances, equal to $2a$.",
        success:
          "Yes: the constant difference is $2a = 6$, which is what the time delay between the stations measures.",
      },
    ],
  },
  {
    id: "flashlight-focus",
    title: "A flashlight runs the dish in reverse",
    mode: "flashlight",
    hideSliders: true,
    baseReveal: { dock: true },
    beats: [
      {
        text: "A **flashlight** or car **headlight** runs the dish in reverse. Its mirror is a parabola with a small bulb at the **focus**, and light leaving that focus reflects into a straight, **parallel** beam, so instead of catching rays we place the bulb at the focus. This reflector is $4$ ft wide and $2$ ft deep, with the same standard form $x^2 = 4py$.",
      },
      {
        text: "Find $p$ from a rim point, exactly as before: the width $4$ gives radius $2$ and the depth is $2$, so the rim point is $(2, 2)$. Substituting gives $2^2 = 4p(2)$, so $4 = 8p$ and $p = \\frac{1}{2}$, placing the bulb at the focus $(0, \\frac{1}{2})$. That focus sits half a foot up, lower than the first dish's because this one is deeper.",
        add: { focus: true },
      },
      {
        text: "With the bulb lit, rays leave the focus in every direction, strike the mirror, and each reflects to travel straight up the axis. The result is a tight parallel beam that does not spread, exactly what a headlight needs.",
        add: { beam: true },
      },
      {
        text: "The parabola and its focus are the same as in the dish, only the direction of the light is reversed: a dish gathers rays inward while a flashlight sends them outward. The method never changes: put a rim point $(\\text{radius}, \\text{depth})$ into $x^2 = 4py$, solve for $p$, and the focus $(0, p)$ is where the light is gathered or emitted.",
      },
    ],
    practice:
      "Locate the bulb just like the receiver: put a rim point (radius, depth) into $x^2 = 4py$, solve for $p$, and place the bulb at the focus $(0, p)$.",
    questions: [
      {
        kind: "choice",
        prompt:
          "This reflector is $4$ ft wide and $2$ ft deep. Using the rim point $(2, 2)$, $2^2 = 4p(2)$ gives:",
        options: [
          "$p = \\tfrac{1}{2}$, so the bulb is at $(0, \\tfrac{1}{2})$",
          "$p = 2$, so the bulb is at $(0, 2)$",
          "$p = 1$, so the bulb is at $(0, 1)$",
          "$p = \\tfrac{1}{4}$, so the bulb is at $(0, \\tfrac{1}{4})$",
        ],
        answer: 0,
        hint: "Simplify $4 = 8p$ by dividing both sides by $8$.",
        success:
          "Right: $4 = 8p$ gives $p = \\tfrac{1}{2}$, so the bulb sits at $(0, \\tfrac{1}{2})$.",
      },
      {
        kind: "choice",
        prompt:
          "In a flashlight, the bulb is placed at the ___ so its light leaves as a parallel beam.",
        options: ["focus", "vertex", "rim", "directrix"],
        answer: 0,
        hint: "It is the same special point that a dish sends rays to, used in reverse.",
        success:
          "Yes: a bulb at the focus reflects into a parallel beam, the mirror image of the dish gathering rays.",
      },
    ],
  },
  {
    id: "your-turn",
    title: "Your turn",
    mode: "yourturn",
    params: [depthParam],
    baseReveal: { dock: true, focus: true },
    beats: [
      {
        text: "Now you are the engineer. This dish stays $4$ feet wide, so its rim is always at $x = \\pm 2$, but you set how **deep** it is. A rim point is $(2, d)$, so $2^2 = 4p\\,d$ gives $4 = 4pd$, and dividing by $4d$ leaves $$p = \\frac{1}{d}$$ The receiver's height depends only on the depth.",
      },
      {
        text: "A **deep** dish (large $d$) crowds the focus down toward the vertex. As the dish deepens to $d = 6$, the receiver drops to $p = \\frac{1}{6}$ of a foot, barely above the bottom of the bowl.",
        to: { d: 6 },
        ms: 2000,
      },
      {
        text: "A **shallow** dish (small $d$) throws the focus high above the bowl. As the dish eases back to $d = 3$, the receiver climbs to $p = \\frac{1}{3}$ of a foot. The shallower the dish, the higher the receiver must hang.",
        to: { d: 3 },
        ms: 2000,
      },
    ],
    practice:
      "Drag the depth slider and watch the focus dot slide along the axis. The readout shows the receiver height $p = 1/d$.",
    questions: [
      {
        kind: "manipulate",
        prompt:
          "Slide the depth until the receiver sits exactly $1$ foot above the vertex ($p = 1$ ft).",
        hint: "Since $p = \\frac{1}{d}$, you need $\\frac{1}{d} = 1$, so make the dish $1$ ft deep.",
        success:
          "Yes: at $d = 1$ the dish is $4$ ft wide and $1$ ft deep, so $p = 1$ and the receiver is at $(0, 1)$, just like the very first dish.",
        check: (value, values) => Math.round(values.d ?? value) === 1,
      },
      {
        kind: "choice",
        prompt:
          "As you make the dish deeper (increase $d$), the receiver at the focus:",
        options: [
          "moves closer to the vertex",
          "moves farther from the vertex",
          "stays in the same place",
          "slides off the dish sideways",
        ],
        answer: 0,
        hint: "Read $p = \\frac{1}{d}$: as $d$ grows, does $\\frac{1}{d}$ grow or shrink?",
        success:
          "Right: $p = \\frac{1}{d}$ shrinks as $d$ grows, so a deeper dish pulls the focus down toward the vertex.",
      },
      {
        kind: "choice",
        prompt:
          "Keep the width at $4$ ft. If the depth is $d = 2$ ft, the receiver is at:",
        options: [
          "$(0, \\tfrac{1}{2})$, since $p = \\tfrac{1}{d} = \\tfrac{1}{2}$",
          "$(0, 2)$, at the depth of the dish",
          "$(0, 1)$, the same as the first dish",
          "$(0, 4)$, at the width of the dish",
        ],
        answer: 0,
        hint: "Use $p = \\frac{1}{d}$ with $d = 2$.",
        success:
          "Yes: $p = \\frac{1}{2}$, so the receiver is at $(0, \\tfrac{1}{2})$. The depth and width are not the focal length.",
      },
    ],
  },
];
