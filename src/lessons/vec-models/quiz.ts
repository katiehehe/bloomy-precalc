import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Modeling force, velocity, and
 * navigation". Grounded in the lesson: forces and velocities are vectors; the
 * resultant is the vector sum (add components, not magnitudes); magnitude is
 * $\sqrt{R_x^2 + R_y^2}$ and direction from east is $\arctan(R_y/R_x)$; ground
 * velocity = air + wind; a bearing is clockwise from north with $B = 90^\circ -
 * \theta$; equilibrium means the resultant is the zero vector. Distractors are
 * the classic traps: adding magnitudes, swapping opposite/adjacent, measuring
 * from the wrong axis, confusing a bearing with a standard angle, dropping a
 * component, and sign errors in the balancing force. Every value verified by hand.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-add",
      prompt: "Two forces act on a crate, $F_1 = (5, 2)$ and $F_2 = (1, 6)$. What is the resultant $R = F_1 + F_2$?",
      choices: [
        { text: "$(6, 8)$", correct: true, explain: "Add each part: $(5 + 1,\\ 2 + 6) = (6, 8)$." },
        { text: "$(8, 6)$", explain: "The components are swapped; east is $5 + 1 = 6$ and north is $2 + 6 = 8$." },
        { text: "$(6, 2)$", explain: "The east parts were added but the north parts were not: you kept only $F_1$'s $2$." },
        { text: "$(4, -4)$", explain: "That is $F_1 - F_2$; a resultant adds the forces, it does not subtract them." },
      ],
    },
    {
      id: "c-mag",
      prompt: "What is the magnitude of the vector $(3, 4)$?",
      choices: [
        { text: "$7$", explain: "That adds the parts, $3 + 4$; magnitude needs $\\sqrt{3^2 + 4^2}$ because the parts are perpendicular." },
        { text: "$5$", correct: true, explain: "$\\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$." },
        { text: "$25$", explain: "That is $3^2 + 4^2$; you still have to take the square root." },
        { text: "$1$", explain: "That is the difference $4 - 3$, not the magnitude." },
      ],
    },
    {
      id: "c-perp-mag",
      prompt: "One force pushes $(6, 0)$ (east) and another pushes $(0, 8)$ (north). What is the magnitude of the net force?",
      choices: [
        { text: "$14$", explain: "You cannot add the magnitudes $6 + 8$ when the forces are perpendicular; use components." },
        { text: "$2$", explain: "That is $8 - 6$; the net magnitude is the hypotenuse, not the difference." },
        { text: "$10$", correct: true, explain: "The net force is $(6, 8)$, so $|R| = \\sqrt{6^2 + 8^2} = \\sqrt{100} = 10$." },
        { text: "$48$", explain: "That is $6 \\times 8$; magnitude is $\\sqrt{6^2 + 8^2}$, not a product." },
      ],
    },
    {
      id: "c-dir",
      prompt: "The resultant $R = (3, 4)$ makes what angle with the positive $x$-axis (east)?",
      choices: [
        { text: "$36.87^\\circ$", explain: "That is $\\arctan\\frac{3}{4}$, the angle measured from the north axis, not from east." },
        { text: "$45^\\circ$", explain: "$45^\\circ$ would need equal parts; here the north part is larger than the east part." },
        { text: "$90^\\circ$", explain: "$90^\\circ$ points straight north; this vector has a nonzero east part." },
        { text: "$53.13^\\circ$", correct: true, explain: "$\\theta = \\arctan\\frac{R_y}{R_x} = \\arctan\\frac{4}{3} \\approx 53.13^\\circ$." },
      ],
    },
    {
      id: "c-balance",
      prompt: "Which single force balances (cancels) the force $F = (3, 4)$?",
      choices: [
        { text: "$(3, 4)$", explain: "That is $F$ itself; adding it doubles the force instead of cancelling it." },
        { text: "$(-4, -3)$", explain: "The components are swapped; the opposite of $(3, 4)$ is $(-3, -4)$." },
        { text: "$(-3, 4)$", explain: "Only the east part was flipped; both parts must reverse to cancel $F$." },
        { text: "$(-3, -4)$", correct: true, explain: "The balancing force is $-F = (-3, -4)$, so $F + (-F) = (0, 0)$." },
      ],
    },
    {
      id: "c-ground-vel",
      prompt: "A plane's air velocity is $(30, 0)$ (east) and the wind is $(0, 40)$ (north), in km/h. What is the ground velocity?",
      choices: [
        { text: "$(30, 40)$", correct: true, explain: "Ground velocity is air $+$ wind: $(30 + 0,\\ 0 + 40) = (30, 40)$." },
        { text: "$(30, -40)$", explain: "The wind blows toward the north, so its part is $+40$, not $-40$." },
        { text: "$(70, 0)$", explain: "You cannot pile both speeds onto the east axis; the wind is a north component." },
        { text: "$(40, 30)$", explain: "The components are swapped; east is $30$ and north is $40$." },
      ],
    },
    {
      id: "c-ground-speed",
      prompt: "A ground velocity is $(30, 40)$ km/h. What is the ground speed?",
      choices: [
        { text: "$70$ km/h", explain: "That adds the parts; ground speed is the magnitude $\\sqrt{30^2 + 40^2}$." },
        { text: "$50$ km/h", correct: true, explain: "$\\sqrt{30^2 + 40^2} = \\sqrt{900 + 1600} = \\sqrt{2500} = 50$." },
        { text: "$35$ km/h", explain: "That is the average of $30$ and $40$, not the magnitude." },
        { text: "$2500$ km/h", explain: "That is $30^2 + 40^2$ before taking the square root." },
      ],
    },
    {
      id: "c-nav-dir",
      prompt: "A ground velocity is $(30, 40)$. What angle does it make with east (the positive $x$-axis)?",
      choices: [
        { text: "$36.87^\\circ$", explain: "That is $\\arctan\\frac{30}{40}$, the angle from north; from east use $\\arctan\\frac{40}{30}$." },
        { text: "$45^\\circ$", explain: "$45^\\circ$ needs equal parts; here the north part is the larger one." },
        { text: "$53.13^\\circ$", correct: true, explain: "$\\theta = \\arctan\\frac{40}{30} = \\arctan\\frac{4}{3} \\approx 53.13^\\circ$." },
        { text: "$90^\\circ$", explain: "$90^\\circ$ is straight north; this velocity has a nonzero east part." },
      ],
    },
    {
      id: "c-mag-512",
      prompt: "What is the magnitude of $(5, 12)$?",
      choices: [
        { text: "$17$", explain: "That adds the parts $5 + 12$; magnitude is $\\sqrt{5^2 + 12^2}$." },
        { text: "$169$", explain: "That is $5^2 + 12^2$; you still need the square root." },
        { text: "$7$", explain: "That is $12 - 5$, not the magnitude." },
        { text: "$13$", correct: true, explain: "$\\sqrt{5^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13$." },
      ],
    },
    {
      id: "c-add-neg",
      prompt: "Add $(7, 2)$ and $(-3, 5)$.",
      choices: [
        { text: "$(4, 7)$", correct: true, explain: "$(7 + (-3),\\ 2 + 5) = (4, 7)$." },
        { text: "$(10, -3)$", explain: "That subtracts the second vector; the problem adds it." },
        { text: "$(4, 3)$", explain: "The east part is right, but $2 + 5 = 7$, not $3$." },
        { text: "$(-4, -7)$", explain: "That is the negative of the correct sum; keep the signs as they are while adding." },
      ],
    },
    {
      id: "c-equil-mean",
      prompt: "A set of forces on an object is in equilibrium. What is the resultant force?",
      choices: [
        { text: "The largest single force", explain: "In equilibrium the forces cancel; nothing is left over, not even the largest one." },
        { text: "The zero vector, $(0, 0)$", correct: true, explain: "Equilibrium means the vector sum is zero, so the resultant is $(0, 0)$." },
        { text: "Twice the average force", explain: "Equilibrium is about cancellation to zero, not about averaging." },
        { text: "Undefined", explain: "The resultant is perfectly well defined; it is the zero vector." },
      ],
    },
    {
      id: "c-bearing-def",
      prompt: "How is a compass **bearing** measured?",
      choices: [
        { text: "Counterclockwise from east", explain: "That is the standard-position angle, not a bearing." },
        { text: "Clockwise from east", explain: "Bearings start from north, not east." },
        { text: "Clockwise from north", correct: true, explain: "A bearing is the angle turned clockwise starting at due north." },
        { text: "Counterclockwise from north", explain: "Bearings turn clockwise, so east is $90^\\circ$, not $270^\\circ$." },
      ],
    },
    {
      id: "c-ratio",
      prompt: "For $R = (4, 3)$, which expression gives the direction measured from east?",
      choices: [
        { text: "$\\arctan\\dfrac{3}{4}$", correct: true, explain: "From east, $\\tan\\theta = \\dfrac{\\text{opposite}}{\\text{adjacent}} = \\dfrac{R_y}{R_x} = \\dfrac{3}{4}$." },
        { text: "$\\arctan\\dfrac{4}{3}$", explain: "That puts $R_x$ over $R_y$; from east the north part goes on top." },
        { text: "$\\arctan\\dfrac{3}{5}$", explain: "$5$ is the magnitude, not a leg; use the two legs $R_y$ and $R_x$." },
        { text: "$\\arctan\\dfrac{4}{5}$", explain: "$5$ is the hypotenuse; the tangent uses the two legs, $\\dfrac{R_y}{R_x}$." },
      ],
    },
    {
      id: "c-mag-912",
      prompt: "What is the magnitude of $(9, 12)$?",
      choices: [
        { text: "$21$", explain: "That adds the parts; magnitude is $\\sqrt{9^2 + 12^2}$." },
        { text: "$225$", explain: "That is $9^2 + 12^2$; take the square root to finish." },
        { text: "$15$", correct: true, explain: "$\\sqrt{9^2 + 12^2} = \\sqrt{81 + 144} = \\sqrt{225} = 15$." },
        { text: "$3$", explain: "That is $12 - 9$, not the magnitude." },
      ],
    },
    {
      id: "c-simple-res",
      prompt: "Two forces are $(2, 0)$ and $(0, 2)$. What is the resultant $R$?",
      choices: [
        { text: "$(4, 0)$", explain: "You cannot pile both parts onto the east axis; the second force is a north component." },
        { text: "$(0, 4)$", explain: "You cannot pile both parts onto the north axis; the first force is an east component." },
        { text: "$(2, -2)$", explain: "The north force is $+2$, so the north part of $R$ is $+2$, not $-2$." },
        { text: "$(2, 2)$", correct: true, explain: "$(2 + 0,\\ 0 + 2) = (2, 2)$." },
      ],
    },
  ],
  summit: [
    {
      id: "s-full-res",
      prompt: "A resultant is $R = (6, 8)$. Give its magnitude and its direction from east.",
      choices: [
        { text: "$|R| = 10$, $\\theta \\approx 53.13^\\circ$", correct: true, explain: "$|R| = \\sqrt{36 + 64} = 10$, and $\\theta = \\arctan\\frac{8}{6} = \\arctan\\frac{4}{3} \\approx 53.13^\\circ$." },
        { text: "$|R| = 10$, $\\theta \\approx 36.87^\\circ$", explain: "The magnitude is right, but $36.87^\\circ = \\arctan\\frac{6}{8}$ is the angle from north." },
        { text: "$|R| = 14$, $\\theta \\approx 53.13^\\circ$", explain: "The angle is right, but $14 = 6 + 8$ adds magnitudes; use $\\sqrt{6^2 + 8^2} = 10$." },
        { text: "$|R| = 10$, $\\theta \\approx 45^\\circ$", explain: "$45^\\circ$ needs equal parts; here $8 > 6$, so the angle from east is more than $45^\\circ$." },
      ],
    },
    {
      id: "s-bearing-from-std",
      prompt: "A course points at a standard-position angle of $53.13^\\circ$ (measured from east). What is its bearing?",
      choices: [
        { text: "$53.13^\\circ$", explain: "That is the standard angle; a bearing is measured from north, so convert with $B = 90^\\circ - \\theta$." },
        { text: "$36.87^\\circ$", correct: true, explain: "$B = 90^\\circ - \\theta = 90^\\circ - 53.13^\\circ = 36.87^\\circ$." },
        { text: "$143.13^\\circ$", explain: "That is $90^\\circ + 53.13^\\circ$; the bearing subtracts $\\theta$ from $90^\\circ$." },
        { text: "$306.87^\\circ$", explain: "That is $360^\\circ - 53.13^\\circ$, which is not the clockwise-from-north bearing." },
      ],
    },
    {
      id: "s-std-from-bearing",
      prompt: "A ship sails on a bearing of $120^\\circ$. What is its standard-position angle, reduced into $[0^\\circ, 360^\\circ)$?",
      choices: [
        { text: "$210^\\circ$", explain: "That is $90^\\circ + 120^\\circ$; the rule is $90^\\circ - B$." },
        { text: "$30^\\circ$", explain: "That is $|90^\\circ - 120^\\circ|$; keep the sign, giving $-30^\\circ$, then add $360^\\circ$." },
        { text: "$330^\\circ$", correct: true, explain: "$90^\\circ - 120^\\circ = -30^\\circ$, and $-30^\\circ + 360^\\circ = 330^\\circ$." },
        { text: "$240^\\circ$", explain: "That does not come from the conversion $90^\\circ - B$." },
      ],
    },
    {
      id: "s-three-equil",
      prompt: "Three forces act on a bolt: $(2, 3)$, $(-5, 1)$, and $F$. If the bolt is in equilibrium, what is $F$?",
      choices: [
        { text: "$(-3, 4)$", explain: "That is the sum of the first two forces; $F$ must be its opposite." },
        { text: "$(3, 4)$", explain: "Only the east part was fixed; the north part must also flip, giving $-4$." },
        { text: "$(-3, -4)$", explain: "The sum of the first two is $(-3, 4)$, so $F = -(-3, 4) = (3, -4)$." },
        { text: "$(3, -4)$", correct: true, explain: "First $(2, 3) + (-5, 1) = (-3, 4)$; equilibrium needs $F = -(-3, 4) = (3, -4)$." },
      ],
    },
    {
      id: "s-boat-speed",
      prompt: "A boat heads due east at $8$ km/h while a current pushes it due south at $6$ km/h. What is its resultant speed over the ground?",
      choices: [
        { text: "$10$ km/h", correct: true, explain: "The resultant is $(8, -6)$, so the speed is $\\sqrt{8^2 + 6^2} = \\sqrt{100} = 10$." },
        { text: "$14$ km/h", explain: "That adds the speeds; the two motions are perpendicular, so use components." },
        { text: "$2$ km/h", explain: "That is $8 - 6$; the speed is the hypotenuse, not the difference." },
        { text: "$48$ km/h", explain: "That is $8 \\times 6$; speed is $\\sqrt{8^2 + 6^2}$, not a product." },
      ],
    },
    {
      id: "s-boat-dir",
      prompt: "For that boat the resultant velocity is $(8, -6)$. What is its direction relative to east?",
      choices: [
        { text: "About $36.87^\\circ$ above the positive $x$-axis", explain: "The north part is negative, so the vector points below the east axis, not above it." },
        { text: "About $36.87^\\circ$ below the positive $x$-axis (that is, $323.13^\\circ$ in standard position)", correct: true, explain: "The reference angle is $\\arctan\\frac{6}{8} = 36.87^\\circ$, and since it points into the fourth quadrant the standard angle is $360^\\circ - 36.87^\\circ = 323.13^\\circ$." },
        { text: "About $53.13^\\circ$ below the positive $x$-axis", explain: "$53.13^\\circ = \\arctan\\frac{8}{6}$ swaps the legs; from east use $\\arctan\\frac{6}{8}$." },
        { text: "About $233.13^\\circ$ in standard position", explain: "$233.13^\\circ$ is in the third quadrant (down and left); $(8, -6)$ is down and right." },
      ],
    },
    {
      id: "s-boat-bearing",
      prompt: "The boat's velocity $(8, -6)$ has standard angle $323.13^\\circ$. What is its bearing?",
      choices: [
        { text: "$53.13^\\circ$", explain: "That would point northeast; the boat is heading south of east, so the bearing is past $90^\\circ$." },
        { text: "$143.13^\\circ$", explain: "That uses the wrong reference angle; $B = 90^\\circ - (-36.87^\\circ) = 126.87^\\circ$." },
        { text: "$126.87^\\circ$", correct: true, explain: "With $\\theta = -36.87^\\circ$, $B = 90^\\circ - \\theta = 90^\\circ + 36.87^\\circ = 126.87^\\circ$, between east ($90^\\circ$) and south ($180^\\circ$)." },
        { text: "$233.13^\\circ$", explain: "That points southwest; the boat moves east and south, so the bearing is between $90^\\circ$ and $180^\\circ$." },
      ],
    },
    {
      id: "s-perp-trap",
      prompt: "A box is pushed east with a force of magnitude $3$ and north with a force of magnitude $4$. A student says the net force is $7$. Is that right?",
      choices: [
        { text: "Yes, $3 + 4 = 7$", explain: "Magnitudes add directly only for parallel forces; these are perpendicular." },
        { text: "No, it is $12$, because $3 \\times 4 = 12$", explain: "Force magnitudes are not multiplied; use the Pythagorean combination." },
        { text: "No, it is $1$, because $4 - 3 = 1$", explain: "Subtraction would apply to opposite forces, not perpendicular ones." },
        { text: "No, it is $5$, because $\\sqrt{3^2 + 4^2} = 5$", correct: true, explain: "The forces are perpendicular, so combine by components: $\\sqrt{3^2 + 4^2} = 5$." },
      ],
    },
    {
      id: "s-three-sum",
      prompt: "Add the three forces $(1, 2)$, $(3, -1)$, and $(-2, 4)$.",
      choices: [
        { text: "$(2, 5)$", correct: true, explain: "East: $1 + 3 - 2 = 2$. North: $2 - 1 + 4 = 5$. So $R = (2, 5)$." },
        { text: "$(2, 7)$", explain: "The east part is right, but the north sum is $2 - 1 + 4 = 5$, not $7$ (watch the $-1$)." },
        { text: "$(6, 5)$", explain: "The north part is right, but the east sum is $1 + 3 - 2 = 2$, not $6$ (watch the $-2$)." },
        { text: "$(0, 5)$", explain: "The east sum is $1 + 3 - 2 = 2$, not $0$." },
      ],
    },
    {
      id: "s-wind-513",
      prompt: "A plane's air velocity is $(0, 120)$ (north) and the wind is $(50, 0)$ (east), in km/h. Give the ground velocity and the ground speed.",
      choices: [
        { text: "$(120, 50)$, speed $130$ km/h", explain: "The components are swapped: east is $50$ and north is $120$." },
        { text: "$(50, 120)$, speed $130$ km/h", correct: true, explain: "Ground velocity $(0 + 50,\\ 120 + 0) = (50, 120)$; speed $\\sqrt{50^2 + 120^2} = \\sqrt{16900} = 130$." },
        { text: "$(50, 120)$, speed $170$ km/h", explain: "The velocity is right, but $170 = 50 + 120$ adds the parts; use $\\sqrt{50^2 + 120^2} = 130$." },
        { text: "$(50, 120)$, speed $16900$ km/h", explain: "That is $50^2 + 120^2$; take the square root to get $130$." },
      ],
    },
    {
      id: "s-bearing-components",
      prompt: "A ground velocity is $(50, 120)$ (east, north). What is its bearing?",
      choices: [
        { text: "$67.38^\\circ$", explain: "That is the standard angle $\\arctan\\frac{120}{50}$; convert with $B = 90^\\circ - \\theta$." },
        { text: "$112.62^\\circ$", explain: "That is $90^\\circ + 22.62^\\circ$; the bearing here is $90^\\circ - 67.38^\\circ$." },
        { text: "$22.62^\\circ$", correct: true, explain: "$\\theta = \\arctan\\frac{120}{50} \\approx 67.38^\\circ$, so $B = 90^\\circ - 67.38^\\circ = 22.62^\\circ$ (about $\\mathrm{N}\\,23^\\circ\\mathrm{E}$)." },
        { text: "$337.38^\\circ$", explain: "That is $360^\\circ - 22.62^\\circ$; a bearing east of north is a small positive angle." },
      ],
    },
    {
      id: "s-equilibrant",
      prompt: "Several forces on a ring add to a resultant $R = (3, 4)$. What single **equilibrant** force would hold the ring still?",
      choices: [
        { text: "$(3, 4)$", explain: "That is the resultant itself; adding it doubles the net force instead of cancelling it." },
        { text: "$(4, 3)$", explain: "Swapping the parts does not reverse the force; the equilibrant is $-R$." },
        { text: "$(-4, -3)$", explain: "The signs are right but the parts are swapped; $-R = (-3, -4)$." },
        { text: "$(-3, -4)$", correct: true, explain: "The equilibrant is $-R = (-3, -4)$, so the total becomes $(0, 0)$." },
      ],
    },
    {
      id: "s-wrong-axis",
      prompt: "For $R = (3, 4)$ a student reports the direction as $36.87^\\circ$ from east. What went wrong?",
      choices: [
        { text: "They computed $\\arctan\\frac{3}{4}$ (adjacent over opposite); from east it should be $\\arctan\\frac{4}{3} \\approx 53.13^\\circ$, and $36.87^\\circ$ is the angle from north", correct: true, explain: "From east, put the opposite part $R_y = 4$ over the adjacent part $R_x = 3$." },
        { text: "Nothing; $36.87^\\circ$ is already correct", explain: "$36.87^\\circ$ is measured from the north axis; from east the angle is $53.13^\\circ$." },
        { text: "They should have used $\\arctan\\frac{4}{5}$", explain: "$5$ is the hypotenuse; the tangent uses the two legs, not the hypotenuse." },
        { text: "They measured clockwise, so the answer should be $-36.87^\\circ$", explain: "The direction from east is measured counterclockwise; the real error is swapping the legs." },
      ],
    },
    {
      id: "s-heading-to-std",
      prompt: "A hiker walks on a heading of $\\mathrm{N}\\,30^\\circ\\mathrm{E}$, which is a bearing of $30^\\circ$. What is the standard-position angle (from east)?",
      choices: [
        { text: "$30^\\circ$", explain: "That is the bearing itself; convert to a standard angle with $90^\\circ - B$." },
        { text: "$60^\\circ$", correct: true, explain: "$\\theta = 90^\\circ - B = 90^\\circ - 30^\\circ = 60^\\circ$." },
        { text: "$120^\\circ$", explain: "That is $90^\\circ + 30^\\circ$; the conversion subtracts the bearing from $90^\\circ$." },
        { text: "$330^\\circ$", explain: "That would be $90^\\circ - 120^\\circ$ reduced; here the bearing is $30^\\circ$, giving $60^\\circ$." },
      ],
    },
    {
      id: "s-tugboats",
      prompt: "Two tugboats pull a barge: $T_1 = (400, 0)$ N (east) and $T_2 = (0, 300)$ N (north). Give the magnitude of the resultant and its bearing.",
      choices: [
        { text: "$700$ N at a bearing of $53.13^\\circ$", explain: "The bearing is right, but $700 = 400 + 300$ adds magnitudes; use $\\sqrt{400^2 + 300^2} = 500$." },
        { text: "$500$ N at a bearing of $36.87^\\circ$", explain: "The magnitude is right, but $36.87^\\circ$ is the standard angle from east; the bearing is $90^\\circ - 36.87^\\circ$." },
        { text: "$500$ N at a bearing of $53.13^\\circ$", correct: true, explain: "$R = (400, 300)$, $|R| = \\sqrt{400^2 + 300^2} = 500$; $\\theta = \\arctan\\frac{300}{400} = 36.87^\\circ$, so $B = 90^\\circ - 36.87^\\circ = 53.13^\\circ$." },
        { text: "$500$ N at a bearing of $143.13^\\circ$", explain: "That is $90^\\circ + 53.13^\\circ$; the bearing is $90^\\circ - \\theta = 53.13^\\circ$." },
      ],
    },
  ],
};
