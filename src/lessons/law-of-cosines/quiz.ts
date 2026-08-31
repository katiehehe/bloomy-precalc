import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Law of cosines".
 * Grounded in the lesson: $c^2 = a^2 + b^2 - 2ab\cos C$, with $C$ the included
 * angle between $a$ and $b$. It solves SAS (find the third side) and SSS (find an
 * angle via $\cos C = \dfrac{a^2 + b^2 - c^2}{2ab}$), reduces to the Pythagorean
 * theorem at $C = 90^\circ$, and gives one unambiguous angle. Distractors are the
 * classic traps: adding instead of subtracting the correction term, using sine,
 * reaching for the law of sines on SAS or SSS, forgetting to take a square root,
 * and misreading which angle is included.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-statement",
      prompt: "Which equation is the law of cosines?",
      choices: [
        { text: "$c^2 = a^2 + b^2 - 2ab\\cos C$", correct: true, explain: "Each side squared equals the sum of the other two squares minus twice their product times the cosine of the included angle." },
        { text: "$c^2 = a^2 + b^2 + 2ab\\cos C$", explain: "The correction term is subtracted, not added. A plus sign would make $c$ shrink as the angle opens." },
        { text: "$\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B}$", explain: "That is the law of sines, for AAS and ASA, not the law of cosines." },
        { text: "$c^2 = a^2 + b^2 - 2ab\\sin C$", explain: "The law uses cosine of the included angle, not sine." },
      ],
    },
    {
      id: "c-included",
      prompt: "In $c^2 = a^2 + b^2 - 2ab\\cos C$, angle $C$ is located:",
      choices: [
        { text: "between sides $a$ and $b$", correct: true, explain: "The included angle sits where the two known sides meet, opposite the side being found." },
        { text: "opposite side $a$", explain: "The angle opposite $a$ is $A$. The formula uses $C$, between $a$ and $b$." },
        { text: "opposite side $b$", explain: "The angle opposite $b$ is $B$. Here $C$ is the included angle between $a$ and $b$." },
        { text: "at the base of the altitude", explain: "No altitude is drawn here. $C$ is simply the angle between the two known sides." },
      ],
    },
    {
      id: "c-pythag",
      prompt: "When $C = 90^\\circ$, the law of cosines becomes:",
      choices: [
        { text: "$c^2 = a^2 + b^2$", correct: true, explain: "$\\cos 90^\\circ = 0$, so the term $-2ab\\cos C$ vanishes, leaving the Pythagorean theorem." },
        { text: "$c^2 = a^2 + b^2 - 2ab$", explain: "That uses $\\cos 90^\\circ = 1$. In fact $\\cos 90^\\circ = 0$, so the term disappears." },
        { text: "$c = a + b$", explain: "Sides do not add directly. At a right angle, $c^2 = a^2 + b^2$." },
        { text: "$c^2 = a^2 + b^2 - ab$", explain: "That drops only the factor $2$. The whole term vanishes because $\\cos 90^\\circ = 0$." },
      ],
    },
    {
      id: "c-when",
      prompt: "The law of cosines is the right first tool when you know:",
      choices: [
        { text: "two sides and the included angle (SAS)", correct: true, explain: "SAS has no side paired with its opposite angle, so the law of cosines finds the third side directly." },
        { text: "two angles and a side (AAS)", explain: "AAS already has a side with its opposite angle, so use the law of sines." },
        { text: "a side and its opposite angle plus one more angle", explain: "That is a law of sines setup, with a complete side-over-sine ratio." },
        { text: "the three angles only", explain: "Three angles fix the shape but not the size, so no side can be computed." },
      ],
    },
    {
      id: "c-sas-setup",
      prompt: "For $a = 6$, $b = 10$, and included angle $C = 45^\\circ$, the correct setup is:",
      choices: [
        { text: "$c^2 = 6^2 + 10^2 - 2(6)(10)\\cos 45^\\circ$", correct: true, explain: "Substitute the two sides and the cosine of the included angle into the formula." },
        { text: "$c^2 = 6^2 + 10^2 - 2(6)(10)\\cos 90^\\circ$", explain: "Use the given angle $45^\\circ$, not $90^\\circ$." },
        { text: "$c^2 = 6^2 + 10^2 + 2(6)(10)\\cos 45^\\circ$", explain: "The correction term is subtracted, so the sign should be minus." },
        { text: "$c^2 = 6^2 - 10^2 - 2(6)(10)\\cos 45^\\circ$", explain: "Both squared sides are added. Only the cosine term is subtracted." },
      ],
    },
    {
      id: "c-sqrt",
      prompt: "A law of cosines computation gives $c^2 = 49$. What is $c$?",
      choices: [
        { text: "$7$", correct: true, explain: "Take the positive square root: $c = \\sqrt{49} = 7$." },
        { text: "$49$", explain: "That is $c^2$, not $c$. Take the square root to get $7$." },
        { text: "$2401$", explain: "That squares again. You need $\\sqrt{49} = 7$." },
        { text: "$24.5$", explain: "That halves $49$. The side is the square root, $7$." },
      ],
    },
    {
      id: "c-angle-formula",
      prompt: "Solved for the angle, the law of cosines gives:",
      choices: [
        { text: "$\\cos C = \\dfrac{a^2 + b^2 - c^2}{2ab}$", correct: true, explain: "Isolate $-2ab\\cos C$ and divide by $2ab$." },
        { text: "$\\cos C = \\dfrac{c^2 - a^2 - b^2}{2ab}$", explain: "The signs are flipped. From $c^2 = a^2 + b^2 - 2ab\\cos C$ the numerator is $a^2 + b^2 - c^2$." },
        { text: "$\\cos C = \\dfrac{a^2 + b^2 - c^2}{ab}$", explain: "The denominator is $2ab$, not $ab$." },
        { text: "$\\sin C = \\dfrac{a^2 + b^2 - c^2}{2ab}$", explain: "The rearrangement isolates cosine, not sine." },
      ],
    },
    {
      id: "c-sss-num",
      prompt: "With $a = 8$, $b = 5$, $c = 7$, the value of $\\cos C$ is:",
      choices: [
        { text: "$\\tfrac12$", correct: true, explain: "$\\dfrac{64 + 25 - 49}{2(8)(5)} = \\dfrac{40}{80} = \\tfrac12$." },
        { text: "$-\\tfrac12$", explain: "The numerator $64 + 25 - 49 = 40$ is positive, so $\\cos C = +\\tfrac12$." },
        { text: "$\\tfrac{40}{40}$", explain: "The denominator is $2ab = 80$, not $40$, so $\\cos C = \\tfrac{40}{80} = \\tfrac12$." },
        { text: "$1$", explain: "That would need the numerator to equal the denominator. Here $\\cos C = \\tfrac12$." },
      ],
    },
    {
      id: "c-sss-angle",
      prompt: "If $\\cos C = \\tfrac12$, then $C$ equals:",
      choices: [
        { text: "$60^\\circ$", correct: true, explain: "$\\cos 60^\\circ = \\tfrac12$, so $C = \\cos^{-1}\\tfrac12 = 60^\\circ$." },
        { text: "$30^\\circ$", explain: "$\\cos 30^\\circ = \\tfrac{\\sqrt3}{2} \\approx 0.87$, not $\\tfrac12$. The angle is $60^\\circ$." },
        { text: "$45^\\circ$", explain: "$\\cos 45^\\circ = \\tfrac{\\sqrt2}{2} \\approx 0.71$. For $\\tfrac12$ the angle is $60^\\circ$." },
        { text: "$120^\\circ$", explain: "$\\cos 120^\\circ = -\\tfrac12$. A positive $\\tfrac12$ gives the acute $60^\\circ$." },
      ],
    },
    {
      id: "c-obtuse-sign",
      prompt: "If solving for an angle gives $\\cos C = -0.3$, the angle $C$ is:",
      choices: [
        { text: "obtuse (between $90^\\circ$ and $180^\\circ$)", correct: true, explain: "Cosine is negative only for obtuse angles, so a negative value marks an angle past $90^\\circ$." },
        { text: "acute", explain: "Acute angles have positive cosine. A negative cosine means the angle is obtuse." },
        { text: "exactly $90^\\circ$", explain: "At $90^\\circ$ the cosine is $0$. A value of $-0.3$ is past $90^\\circ$." },
        { text: "impossible", explain: "A cosine of $-0.3$ is valid and gives one obtuse angle." },
      ],
    },
    {
      id: "c-correction",
      prompt: "The term $-2ab\\cos C$ in the law of cosines:",
      choices: [
        { text: "corrects the Pythagorean sum for an angle that is not $90^\\circ$", correct: true, explain: "It vanishes at $90^\\circ$ and otherwise adjusts $c$ up or down depending on the angle." },
        { text: "is always negative", explain: "For an obtuse $C$, $\\cos C < 0$, so $-2ab\\cos C$ is positive. Its sign depends on the angle." },
        { text: "measures the area of the triangle", explain: "Area uses $\\tfrac12 ab\\sin C$, a different formula. This term corrects the side length." },
        { text: "only applies to right triangles", explain: "It is precisely the term that handles non-right triangles, since it is zero at $90^\\circ$." },
      ],
    },
    {
      id: "c-345",
      prompt: "With $a = 6$, $b = 8$, and included angle $C = 90^\\circ$, side $c$ is:",
      choices: [
        { text: "$10$", correct: true, explain: "At $90^\\circ$, $c^2 = 6^2 + 8^2 = 36 + 64 = 100$, so $c = 10$." },
        { text: "$14$", explain: "That adds the sides. At a right angle $c^2 = 36 + 64 = 100$, so $c = 10$." },
        { text: "$2$", explain: "That subtracts the sides. The Pythagorean sum gives $c = 10$." },
        { text: "$100$", explain: "That is $c^2$. Take the square root to get $c = 10$." },
      ],
    },
    {
      id: "c-vs-sines",
      prompt: "You know all three sides and want the largest angle. Which law do you use?",
      choices: [
        { text: "the law of cosines, solved for the cosine of that angle", correct: true, explain: "SSS has no side-angle pair, so the law of cosines finds an angle from the three sides." },
        { text: "the law of sines", explain: "The law of sines needs a known angle to start, which SSS does not give." },
        { text: "the Pythagorean theorem", explain: "The Pythagorean theorem needs a right angle, which is not assumed here." },
        { text: "the angle sum, once two angles are known", explain: "No angle is known yet, so you must compute one first with the law of cosines." },
      ],
    },
    {
      id: "c-both-uses",
      prompt: "The law of cosines can find:",
      choices: [
        { text: "a missing side in an SAS triangle and a missing angle in an SSS triangle", correct: true, explain: "It gives the third side directly from SAS, and rearranged it gives an angle from three sides in SSS." },
        { text: "only missing sides, never angles", explain: "Rearranged to $\\cos C = \\dfrac{a^2 + b^2 - c^2}{2ab}$, it finds angles too." },
        { text: "only missing angles, never sides", explain: "In SAS form it finds the third side directly." },
        { text: "only parts of right triangles", explain: "It works for any triangle. The right-angle case is just where the cosine term vanishes." },
      ],
    },
    {
      id: "c-solve-for",
      prompt: "In $c^2 = a^2 + b^2 - 2ab\\cos C$, the side that the formula computes is:",
      choices: [
        { text: "$c$, the side opposite the included angle $C$", correct: true, explain: "The formula isolates $c^2$, and $c$ is the side across from the angle $C$ between $a$ and $b$." },
        { text: "$a$, one of the two known sides", explain: "Sides $a$ and $b$ are the known ones. The formula solves for $c$, opposite $C$." },
        { text: "the longest side, whichever it is", explain: "The formula finds $c$, the side opposite $C$, which need not be the longest." },
        { text: "the altitude of the triangle", explain: "No altitude appears here. The formula gives the side $c$ opposite the included angle." },
      ],
    },
  ],
  summit: [
    {
      id: "s-sas-full",
      prompt: "With $a = 5$, $b = 8$, and included angle $C = 60^\\circ$, side $c$ is:",
      choices: [
        { text: "$7$", correct: true, explain: "$c^2 = 25 + 64 - 2(5)(8)(\\tfrac12) = 89 - 40 = 49$, so $c = 7$." },
        { text: "$\\sqrt{129}$", explain: "That adds the correction term instead of subtracting. Subtracting $40$ gives $c^2 = 49$." },
        { text: "$13$", explain: "That adds the sides $5 + 8$. The law of cosines gives $c = 7$." },
        { text: "$3$", explain: "That subtracts the sides. The correct value is $c = \\sqrt{49} = 7$." },
      ],
    },
    {
      id: "s-obtuse-angle",
      prompt: "A triangle has sides $3$, $5$, and $7$. The angle opposite the side of length $7$ is:",
      choices: [
        { text: "$120^\\circ$", correct: true, explain: "$\\cos\\theta = \\dfrac{9 + 25 - 49}{2(3)(5)} = \\dfrac{-15}{30} = -\\tfrac12$, so $\\theta = 120^\\circ$." },
        { text: "$60^\\circ$", explain: "The numerator is negative, so the cosine is $-\\tfrac12$ and the angle is obtuse, $120^\\circ$." },
        { text: "$90^\\circ$", explain: "A right angle needs $7^2 = 3^2 + 5^2 = 34$, but $49 > 34$, so the angle is obtuse." },
        { text: "$150^\\circ$", explain: "$\\cos 150^\\circ = -\\tfrac{\\sqrt3}{2} \\approx -0.87$. Here the cosine is $-\\tfrac12$, giving $120^\\circ$." },
      ],
    },
    {
      id: "s-classify",
      prompt: "For a triangle with longest side $c$, if $c^2 > a^2 + b^2$, then angle $C$ is:",
      choices: [
        { text: "obtuse", correct: true, explain: "Then $\\cos C = \\dfrac{a^2 + b^2 - c^2}{2ab} < 0$, so $C$ exceeds $90^\\circ$." },
        { text: "acute", explain: "Acute needs $c^2 < a^2 + b^2$. Here $c^2$ is larger, so $C$ is obtuse." },
        { text: "right", explain: "A right angle is the boundary $c^2 = a^2 + b^2$. A strictly larger $c^2$ makes it obtuse." },
        { text: "impossible to tell", explain: "The sign of $a^2 + b^2 - c^2$ decides it: negative here, so obtuse." },
      ],
    },
    {
      id: "s-obtuse-side",
      prompt: "With $a = 2$, $b = 3$, and included angle $C = 120^\\circ$, side $c$ is:",
      choices: [
        { text: "$\\sqrt{19}$", correct: true, explain: "$c^2 = 4 + 9 - 2(2)(3)\\cos 120^\\circ = 13 - 12(-\\tfrac12) = 13 + 6 = 19$, so $c = \\sqrt{19}$." },
        { text: "$\\sqrt{7}$", explain: "That subtracts $6$ instead of adding it. Since $\\cos 120^\\circ = -\\tfrac12$, the term $-2ab\\cos C$ is $+6$, giving $19$." },
        { text: "$5$", explain: "That adds the sides. The law of cosines gives $c = \\sqrt{19} \\approx 4.36$." },
        { text: "$\\sqrt{13}$", explain: "That drops the correction term. With the $+6$ from the obtuse angle, $c^2 = 19$." },
      ],
    },
    {
      id: "s-which-first",
      prompt: "Given sides $a$, $b$, $c$ with $c$ longest, why find the largest angle with the law of cosines rather than the law of sines?",
      choices: [
        { text: "the law of cosines returns one unambiguous angle, even an obtuse one", correct: true, explain: "The inverse cosine gives a single angle in $0^\\circ$ to $180^\\circ$, and a negative cosine directly signals obtuse, avoiding the sine supplement trap." },
        { text: "the law of sines cannot find angles at all", explain: "It can, but for an angle it can leave a supplement ambiguity. Cosine avoids that." },
        { text: "the largest angle is always $90^\\circ$", explain: "It need not be. The point is that the law of cosines settles acute versus obtuse cleanly." },
        { text: "the law of sines needs a right angle", explain: "It does not. The reason to prefer cosines here is the unambiguous angle." },
      ],
    },
    {
      id: "s-pythag-reduce",
      prompt: "At what included angle does $c^2 = a^2 + b^2 - 2ab\\cos C$ predict the shortest possible $c$?",
      choices: [
        { text: "as $C \\to 0^\\circ$, where $c \\to |a - b|$", correct: true, explain: "At $C = 0^\\circ$, $\\cos C = 1$, so $c^2 = a^2 + b^2 - 2ab = (a - b)^2$ and $c = |a - b|$, the smallest $c$ gets." },
        { text: "at $C = 90^\\circ$", explain: "At $90^\\circ$ the term vanishes and $c^2 = a^2 + b^2$, which is larger than $(a-b)^2$." },
        { text: "at $C = 180^\\circ$", explain: "At $180^\\circ$, $\\cos C = -1$ and $c = a + b$, the longest $c$, not the shortest." },
        { text: "at $C = 60^\\circ$", explain: "The minimum happens as the angle closes toward $0^\\circ$, giving $c = |a - b|$." },
      ],
    },
    {
      id: "s-real-distance",
      prompt: "Two straight roads leave a town at an angle of $70^\\circ$ to each other. One car drives $30$ km along one road, another drives $40$ km along the other. Which law finds the distance between the cars?",
      choices: [
        { text: "the law of cosines, since two sides and their included angle are known (SAS)", correct: true, explain: "The two distances and the $70^\\circ$ between them are SAS, so $d^2 = 30^2 + 40^2 - 2(30)(40)\\cos 70^\\circ$." },
        { text: "the law of sines", explain: "There is no side paired with its opposite angle yet, so the law of cosines is needed first." },
        { text: "the Pythagorean theorem", explain: "The angle is $70^\\circ$, not $90^\\circ$, so the Pythagorean theorem does not apply." },
        { text: "the angle sum rule", explain: "That finds angles, not the missing distance. Use the law of cosines." },
      ],
    },
    {
      id: "s-sign-plus",
      prompt: "A student computes $c^2 = a^2 + b^2 + 2ab\\cos C$ and gets a value larger than $a^2 + b^2$ for an acute angle. The error is:",
      choices: [
        { text: "the correction term should be subtracted for the side opposite the angle", correct: true, explain: "The formula is $c^2 = a^2 + b^2 - 2ab\\cos C$. For an acute angle the term is subtracted, so $c$ is shorter than the right-angle case." },
        { text: "cosine should be sine", explain: "Cosine is correct. The mistake is the sign of the term." },
        { text: "the sides were squared incorrectly", explain: "The squares are fine. The sign on the $2ab\\cos C$ term is the error." },
        { text: "there is no error", explain: "There is an error: the term is subtracted, not added." },
      ],
    },
    {
      id: "s-two-steps",
      prompt: "After using the law of cosines to find the third side in an SAS triangle, the safest way to find a remaining angle is:",
      choices: [
        { text: "the law of cosines again, solving for that angle's cosine", correct: true, explain: "Using cosine returns one unambiguous angle and directly flags obtuse angles, avoiding the sine supplement issue." },
        { text: "assume the triangle is isosceles", explain: "There is no reason to assume that. Compute the angle from the sides." },
        { text: "the Pythagorean theorem", explain: "The triangle is oblique, so the Pythagorean theorem does not apply." },
        { text: "guess based on the side lengths", explain: "Estimation is not a solution. The law of cosines gives the exact angle." },
      ],
    },
    {
      id: "s-num-cos",
      prompt: "A triangle has sides $4$, $5$, $6$. The cosine of the angle opposite the side of length $4$ is:",
      choices: [
        { text: "$\\dfrac{3}{4}$", correct: true, explain: "$\\cos\\theta = \\dfrac{5^2 + 6^2 - 4^2}{2(5)(6)} = \\dfrac{25 + 36 - 16}{60} = \\dfrac{45}{60} = \\dfrac34$." },
        { text: "$\\dfrac{1}{8}$", explain: "That uses the side $6$ as opposite: $\\dfrac{16 + 25 - 36}{40} = \\dfrac{5}{40}$. For the side $4$, the answer is $\\tfrac34$." },
        { text: "$-\\dfrac{3}{4}$", explain: "The numerator $45$ is positive, so the cosine is $+\\tfrac34$ and the angle is acute." },
        { text: "$\\dfrac{45}{30}$", explain: "The denominator is $2(5)(6) = 60$, so $\\cos\\theta = \\tfrac{45}{60} = \\tfrac34$." },
      ],
    },
    {
      id: "s-no-supp",
      prompt: "Why does the law of cosines never produce a spurious second angle the way the law of sines can?",
      choices: [
        { text: "the inverse cosine is one-to-one on $0^\\circ$ to $180^\\circ$, so each cosine value gives exactly one triangle angle", correct: true, explain: "Cosine strictly decreases across a triangle's angle range, so its inverse returns a single angle, with sign settling acute versus obtuse." },
        { text: "because cosine is always positive", explain: "Cosine is negative for obtuse angles. The key is that it is one-to-one on $0^\\circ$ to $180^\\circ$." },
        { text: "because the law of cosines only finds sides", explain: "It finds angles too, via the rearranged form, and does so unambiguously." },
        { text: "because triangles cannot have obtuse angles", explain: "They can, and the law of cosines detects them by a negative cosine." },
      ],
    },
    {
      id: "s-largest-longest",
      prompt: "In a triangle with sides $7$, $8$, $13$, which angle should you suspect is obtuse, and why?",
      choices: [
        { text: "the angle opposite $13$, because $13^2 = 169 > 7^2 + 8^2 = 113$", correct: true, explain: "The largest angle faces the longest side, and since $c^2 > a^2 + b^2$, its cosine is negative, so it is obtuse." },
        { text: "the angle opposite $7$, the shortest side", explain: "The smallest side faces the smallest angle, which is acute, not obtuse." },
        { text: "all three, since the sides are unequal", explain: "A triangle has at most one obtuse angle. Here it is the one opposite $13$." },
        { text: "none, the triangle is acute", explain: "Since $169 > 113$, the angle opposite $13$ is obtuse, so the triangle is not acute." },
      ],
    },
    {
      id: "s-max-angle",
      prompt: "As the included angle $C$ increases toward $180^\\circ$ with $a$ and $b$ fixed, side $c$ approaches:",
      choices: [
        { text: "$a + b$", correct: true, explain: "At $C = 180^\\circ$, $\\cos C = -1$, so $c^2 = a^2 + b^2 + 2ab = (a + b)^2$ and $c \\to a + b$, the flattened triangle." },
        { text: "$|a - b|$", explain: "That is the limit as $C \\to 0^\\circ$. As $C \\to 180^\\circ$, $c \\to a + b$." },
        { text: "$\\sqrt{a^2 + b^2}$", explain: "That is the value at $90^\\circ$. As the angle opens fully, $c$ grows to $a + b$." },
        { text: "$0$", explain: "The side never collapses to zero as the angle opens. It grows toward $a + b$." },
      ],
    },
    {
      id: "s-sine-trap",
      prompt: "For an SAS triangle, a student tries $\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B}$ right away. What goes wrong?",
      choices: [
        { text: "no angle is paired with a known opposite side, so the ratio has two unknowns", correct: true, explain: "SAS gives the angle between the two sides, not opposite either, so the law of sines has nothing to solve until the third side is found by the law of cosines." },
        { text: "the law of sines only works for right triangles", explain: "It works for any triangle, but it needs a complete side-over-sine ratio, which SAS lacks." },
        { text: "sine cannot be used with two sides", explain: "Sine is fine in general. The issue is the missing side-angle pair in SAS." },
        { text: "nothing, it works directly", explain: "It does not: SAS must start with the law of cosines to find the third side." },
      ],
    },
  ],
};
