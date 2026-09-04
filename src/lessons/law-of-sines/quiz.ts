import type { LessonQuiz } from "../../quiz/types";

/**
 * Climb (practice) and Summit (mastery) for "Law of sines".
 * Grounded in the lesson: the law of sines is
 * $\dfrac{a}{\sin A} = \dfrac{b}{\sin B} = \dfrac{c}{\sin C}$, each side paired
 * with the sine of its opposite angle. It applies when a side is known together
 * with the angle opposite it (AAS and ASA). Distractors are the classic traps:
 * pairing a side with the wrong angle, using cosine instead of sine, multiplying
 * where you should divide, starting from SAS or SSS (no opposite pair), and
 * forgetting to find the third angle first in ASA.
 */
export const quiz: LessonQuiz = {
  climb: [
    {
      id: "c-opposite",
      prompt: "In triangle $ABC$, which side is opposite angle $C$?",
      choices: [
        { text: "side $c$", correct: true, explain: "Each side takes the lowercase letter of the angle it faces, so side $c$ is across from angle $C$." },
        { text: "side $a$", explain: "Side $a$ is opposite angle $A$, not angle $C$." },
        { text: "side $b$", explain: "Side $b$ is opposite angle $B$. The matching letter always names the opposite side." },
        { text: "the longest side", explain: "The longest side is opposite the largest angle, which need not be $C$. The side opposite $C$ is $c$." },
      ],
    },
    {
      id: "c-statement",
      prompt: "Which equation states the law of sines?",
      choices: [
        { text: "$\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}$", correct: true, explain: "Each side is over the sine of its opposite angle, and the three ratios are equal." },
        { text: "$\\dfrac{\\sin A}{\\sin B} = \\dfrac{\\sin B}{\\sin C}$", explain: "This drops the sides entirely. The law pairs each side with the sine of its opposite angle." },
        { text: "$a^2 = b^2 + c^2 - 2bc\\cos A$", explain: "That is the law of cosines, used for SAS and SSS, not the law of sines." },
        { text: "$\\dfrac{a}{\\cos A} = \\dfrac{b}{\\cos B}$", explain: "The law uses sine, not cosine, of the opposite angle." },
      ],
    },
    {
      id: "c-when",
      prompt: "The law of sines can be used directly when you know:",
      choices: [
        { text: "a side and the angle opposite it, plus one more part", correct: true, explain: "A complete side-over-sine ratio needs a side with its opposite angle. That known ratio unlocks the others." },
        { text: "three sides and no angles", explain: "SSS has no side-angle pair to start a ratio, so it needs the law of cosines first." },
        { text: "two sides and the angle between them", explain: "SAS gives an angle not opposite either known side, so the law of cosines is required." },
        { text: "only the three angles", explain: "Angles alone (AAA) fix the shape but not the size, so no side can be found." },
      ],
    },
    {
      id: "c-solve-side",
      prompt: "Solving $\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B}$ for $b$ gives:",
      choices: [
        { text: "$b = \\dfrac{a\\sin B}{\\sin A}$", correct: true, explain: "Cross multiply to get $b\\sin A = a\\sin B$, then divide by $\\sin A$." },
        { text: "$b = \\dfrac{a\\sin A}{\\sin B}$", explain: "This divides by the wrong sine. Keep $b$ paired with $\\sin B$: $b = \\dfrac{a\\sin B}{\\sin A}$." },
        { text: "$b = a\\sin A\\sin B$", explain: "Solving a proportion divides, it does not multiply all three together." },
        { text: "$b = \\dfrac{\\sin B}{a\\sin A}$", explain: "The side $a$ belongs in the numerator: $b = \\dfrac{a\\sin B}{\\sin A}$." },
      ],
    },
    {
      id: "c-third-angle",
      prompt: "You are given $A = 50^\\circ$, $B = 60^\\circ$, and side $c$. To use the law of sines for side $a$, you first find:",
      choices: [
        { text: "$C = 180^\\circ - 50^\\circ - 60^\\circ = 70^\\circ$", correct: true, explain: "This is ASA: the known side $c$ needs its opposite angle $C$, found from the angle sum." },
        { text: "the length of side $b$", explain: "You do not need $b$ first. You need angle $C$ so that side $c$ has its opposite angle." },
        { text: "$\\cos C$", explain: "The law of sines uses angles and their sines. Find $C$ from the angle sum, no cosine needed." },
        { text: "nothing, you can use $c$ with $A$", explain: "Side $c$ must be paired with its own opposite angle $C$, so find $C$ first." },
      ],
    },
    {
      id: "c-cosine-trap",
      prompt: "For an AAS triangle (two angles and a non-included side), the right tool is:",
      choices: [
        { text: "the law of sines", correct: true, explain: "AAS always contains a side with its opposite angle, so a side-over-sine ratio is available." },
        { text: "the law of cosines", explain: "The law of cosines is for SAS and SSS. AAS is a law of sines case." },
        { text: "the Pythagorean theorem", explain: "The Pythagorean theorem needs a right angle, which an oblique triangle does not have." },
        { text: "the quadratic formula", explain: "No quadratic arises here. AAS is a direct law of sines computation." },
      ],
    },
    {
      id: "c-largest",
      prompt: "In a triangle, the shortest side is always opposite:",
      choices: [
        { text: "the smallest angle", correct: true, explain: "A narrower opening at a vertex spans a shorter side across from it." },
        { text: "the largest angle", explain: "The largest angle faces the longest side, not the shortest." },
        { text: "a right angle", explain: "An oblique triangle has no right angle, and the shortest side pairs with the smallest angle regardless." },
        { text: "angle $A$ by convention", explain: "There is no such convention. The pairing depends on which angle is smallest." },
      ],
    },
    {
      id: "c-ratio-const",
      prompt: "If $\\dfrac{a}{\\sin A} = 12$ in a triangle, then $\\dfrac{c}{\\sin C}$ equals:",
      choices: [
        { text: "$12$", correct: true, explain: "All three side-over-sine ratios share one value, so every ratio equals $12$." },
        { text: "it depends on side $c$", explain: "The ratio is the same for every side, so knowing one fixes them all at $12$." },
        { text: "$\\dfrac{1}{12}$", explain: "The ratios are equal, not reciprocal. It is $12$." },
        { text: "$24$", explain: "The common ratio does not double from side to side. It stays $12$." },
      ],
    },
    {
      id: "c-solve-angle",
      prompt: "Solving $\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B}$ for $\\sin B$ gives:",
      choices: [
        { text: "$\\sin B = \\dfrac{b\\sin A}{a}$", correct: true, explain: "Cross multiply to $a\\sin B = b\\sin A$, then divide by $a$." },
        { text: "$\\sin B = \\dfrac{a\\sin A}{b}$", explain: "The side $b$ multiplies $\\sin A$, and you divide by $a$: $\\sin B = \\dfrac{b\\sin A}{a}$." },
        { text: "$\\sin B = \\dfrac{a}{b\\sin A}$", explain: "This inverts the setup. From $a\\sin B = b\\sin A$ you get $\\sin B = \\dfrac{b\\sin A}{a}$." },
        { text: "$\\sin B = ab\\sin A$", explain: "Solving a proportion divides rather than multiplying all terms." },
      ],
    },
    {
      id: "c-numeric-b",
      prompt: "With $a = 8$, $A = 30^\\circ$, and $B = 90^\\circ$, find $b$. (Use $\\sin 30^\\circ = 0.5$, $\\sin 90^\\circ = 1$.)",
      choices: [
        { text: "$16$", correct: true, explain: "$b = \\dfrac{a\\sin B}{\\sin A} = \\dfrac{8 \\times 1}{0.5} = 16$." },
        { text: "$4$", explain: "That divides by $2$ instead of by $0.5$. Dividing by $0.5$ doubles: $b = 16$." },
        { text: "$8$", explain: "Side $b$ faces the larger angle, so it is longer than $a$. Here $b = 16$." },
        { text: "$0.5$", explain: "That is $\\sin 30^\\circ$, not a length. The length is $\\dfrac{8}{0.5} = 16$." },
      ],
    },
    {
      id: "c-altitude",
      prompt: "In the derivation, the altitude $h$ from vertex $C$ to side $c$ equals:",
      choices: [
        { text: "$b\\sin A$ (and also $a\\sin B$)", correct: true, explain: "In each right triangle $h$ is the opposite leg, so $h = b\\sin A$ and $h = a\\sin B$." },
        { text: "$b\\cos A$", explain: "The horizontal leg is $b\\cos A$. The vertical altitude uses sine: $h = b\\sin A$." },
        { text: "$c\\sin A$", explain: "The hypotenuse of that right triangle is $b$, not $c$, so $h = b\\sin A$." },
        { text: "$a + b$", explain: "The altitude is a computed height, not a sum of sides." },
      ],
    },
    {
      id: "c-degrees-sum",
      prompt: "In triangle $ABC$, $A = 45^\\circ$ and $C = 65^\\circ$. Angle $B$ is:",
      choices: [
        { text: "$70^\\circ$", correct: true, explain: "The angles sum to $180^\\circ$, so $B = 180 - 45 - 65 = 70^\\circ$." },
        { text: "$110^\\circ$", explain: "That is $45 + 65$. Subtract from $180^\\circ$ to get $B = 70^\\circ$." },
        { text: "$20^\\circ$", explain: "That subtracts $45$ from $65$. Use $180 - 45 - 65 = 70^\\circ$." },
        { text: "$90^\\circ$", explain: "There is no right angle here. The third angle is $70^\\circ$." },
      ],
    },
    {
      id: "c-multiply-trap",
      prompt: "A student writes $b = a \\cdot \\sin A \\cdot \\sin B$ to find a side. The error is:",
      choices: [
        { text: "a proportion is solved by dividing, so $b = \\dfrac{a\\sin B}{\\sin A}$", correct: true, explain: "Cross multiplying gives $b\\sin A = a\\sin B$, and you divide by $\\sin A$, not multiply everything." },
        { text: "sine should be cosine", explain: "Sine is correct for the law of sines. The mistake is multiplying instead of dividing." },
        { text: "the sides are mislabeled", explain: "Labeling is fine. The setup should divide by $\\sin A$: $b = \\dfrac{a\\sin B}{\\sin A}$." },
        { text: "there is no error", explain: "There is an error: solving the proportion requires dividing by $\\sin A$." },
      ],
    },
    {
      id: "c-need-pair",
      prompt: "Why can the law of sines not start from SAS (two sides and the included angle)?",
      choices: [
        { text: "the given angle is not opposite either known side, so no complete ratio exists", correct: true, explain: "A side-over-sine ratio needs a side with its opposite angle, which SAS does not provide." },
        { text: "SAS has too many unknowns", explain: "The count is fine. The problem is that no side is paired with its opposite angle." },
        { text: "the triangle might be a right triangle", explain: "That is not the issue. SAS lacks an opposite side-angle pair to begin the law of sines." },
        { text: "the law of sines only works for acute triangles", explain: "The law of sines works for any triangle. SAS simply has no starting ratio." },
      ],
    },
  ],
  summit: [
    {
      id: "s-asa-side",
      prompt: "Given $A = 40^\\circ$, $B = 60^\\circ$, and $c = 10$, which is the correct first step to find side $a$?",
      choices: [
        { text: "find $C = 80^\\circ$, then use $\\dfrac{a}{\\sin A} = \\dfrac{c}{\\sin C}$", correct: true, explain: "Side $c$ needs its opposite angle $C = 180 - 40 - 60 = 80^\\circ$ before the ratio can be used." },
        { text: "use $\\dfrac{a}{\\sin A} = \\dfrac{c}{\\sin B}$", explain: "Side $c$ must pair with angle $C$, not $B$. Find $C$ first." },
        { text: "use the law of cosines on $a$", explain: "This is ASA, a law of sines case. The law of cosines is not needed." },
        { text: "assume $a = c$ because two angles are close", explain: "Different angles give different opposite sides. Solve with the ratio after finding $C$." },
      ],
    },
    {
      id: "s-solve-angle-num",
      prompt: "In a triangle, $a = 10$, $A = 30^\\circ$, and $b = 10$. Find angle $B$. (Use $\\sin 30^\\circ = 0.5$.)",
      choices: [
        { text: "$30^\\circ$", correct: true, explain: "$\\sin B = \\dfrac{b\\sin A}{a} = \\dfrac{10 \\times 0.5}{10} = 0.5$, so $B = 30^\\circ$. Equal sides face equal angles." },
        { text: "$60^\\circ$", explain: "$\\sin B = 0.5$ gives $B = 30^\\circ$, not $60^\\circ$. Recall $\\sin 60^\\circ \\approx 0.866$." },
        { text: "$90^\\circ$", explain: "$\\sin B = 0.5$, and $\\sin 90^\\circ = 1$. The correct angle is $30^\\circ$." },
        { text: "$45^\\circ$", explain: "$\\sin 45^\\circ \\approx 0.707$, but here $\\sin B = 0.5$, so $B = 30^\\circ$." },
      ],
    },
    {
      id: "s-which-law",
      prompt: "Which set of given parts does **not** give a side-over-sine starting ratio?",
      choices: [
        { text: "three sides and no angles (SSS)", correct: true, explain: "SSS has no angle at all, so no side is paired with its opposite angle and the law of sines cannot start." },
        { text: "two angles and an included side (ASA)", explain: "ASA becomes a law of sines case once the third angle is found from the $180^\\circ$ sum." },
        { text: "two angles and a non-included side (AAS)", explain: "AAS already has a side with its opposite angle, so a ratio is ready." },
        { text: "a side and the two angles touching it", explain: "That is ASA. Find the third angle, then start the law of sines." },
      ],
    },
    {
      id: "s-numeric-c",
      prompt: "With $b = 12$, $B = 90^\\circ$, and $C = 30^\\circ$, find side $c$. (Use $\\sin 90^\\circ = 1$, $\\sin 30^\\circ = 0.5$.)",
      choices: [
        { text: "$6$", correct: true, explain: "$c = \\dfrac{b\\sin C}{\\sin B} = \\dfrac{12 \\times 0.5}{1} = 6$." },
        { text: "$24$", explain: "That multiplies by $2$. Multiplying by $\\sin 30^\\circ = 0.5$ halves it to $6$." },
        { text: "$12$", explain: "Side $c$ faces the smaller angle, so it is shorter than $b$. Here $c = 6$." },
        { text: "$0.5$", explain: "That is $\\sin 30^\\circ$, not a length. The length is $12 \\times 0.5 = 6$." },
      ],
    },
    {
      id: "s-aas-compute",
      prompt: "Given $A = 40^\\circ$, $C = 80^\\circ$, and $a = 10$, find side $c$. (Use $\\sin 40^\\circ \\approx 0.643$, $\\sin 80^\\circ \\approx 0.985$.)",
      choices: [
        { text: "$c \\approx 15.3$", correct: true, explain: "$c = \\dfrac{a\\sin C}{\\sin A} \\approx \\dfrac{10 \\times 0.985}{0.643} \\approx 15.3$." },
        { text: "$c \\approx 6.5$", explain: "That inverts the sines: $\\dfrac{10 \\times 0.643}{0.985}$. Keep $c$ paired with $\\sin C$." },
        { text: "$c \\approx 10$", explain: "Side $c$ faces the larger angle $80^\\circ$, so it is longer than $a$." },
        { text: "$c \\approx 20$", explain: "That roughly doubles $a$. The exact ratio is $\\dfrac{\\sin 80^\\circ}{\\sin 40^\\circ} \\approx 1.53$." },
      ],
    },
    {
      id: "s-asa-why-C",
      prompt: "An ASA problem gives two angles and the included side. Why must you find the third angle before using the law of sines?",
      choices: [
        { text: "the known side needs its own opposite angle to start a complete ratio", correct: true, explain: "The included side is not opposite either given angle. The $180^\\circ$ sum produces that missing opposite angle." },
        { text: "the law of sines cannot use any given angle", explain: "It can, once a side is paired with its opposite angle. The third angle supplies that pair." },
        { text: "you need all three sides first", explain: "You do not. One complete side-over-sine ratio is enough to unlock the others." },
        { text: "ASA is not a law of sines case", explain: "ASA becomes one as soon as the third angle is known." },
      ],
    },
    {
      id: "s-real-survey",
      prompt: "Surveyors sight a tree across a river from two points $50$ m apart, measuring the angles to the tree as $70^\\circ$ and $65^\\circ$ from the baseline. What lets them find the distance to the tree?",
      choices: [
        { text: "the third angle is $45^\\circ$, then the law of sines gives the distance", correct: true, explain: "The baseline and its two adjacent angles are ASA. Find the third angle, then apply the law of sines." },
        { text: "the Pythagorean theorem", explain: "There is no right angle in this triangle, so the Pythagorean theorem does not apply." },
        { text: "the law of cosines, since two sides are known", explain: "Only one side (the baseline) is known, so this is ASA for the law of sines." },
        { text: "nothing, more data is needed", explain: "ASA fully determines the triangle, so the distances can be found." },
      ],
    },
    {
      id: "s-longest",
      prompt: "A triangle has $A = 80^\\circ$, $B = 60^\\circ$, and $C = 40^\\circ$. Which side is longest?",
      choices: [
        { text: "side $a$", correct: true, explain: "The longest side faces the largest angle. Angle $A = 80^\\circ$ is largest, so side $a$ is longest." },
        { text: "side $c$", explain: "Side $c$ faces the smallest angle $40^\\circ$, so it is the shortest, not the longest." },
        { text: "side $b$", explain: "Side $b$ faces the middle angle $60^\\circ$, so it is the middle length." },
        { text: "they are all equal", explain: "Equal sides need equal angles. These angles differ, so the sides differ." },
      ],
    },
    {
      id: "s-solve-C",
      prompt: "With $c = 9$, $C = 90^\\circ$, and $a = 9$, find angle $A$. (Use $\\sin 90^\\circ = 1$.)",
      choices: [
        { text: "$90^\\circ$ is impossible, so recheck: $\\sin A = 1$ gives $A = 90^\\circ$ only if $a = c$, but two right angles cannot occur", correct: true, explain: "$\\sin A = \\dfrac{a\\sin C}{c} = \\dfrac{9 \\times 1}{9} = 1$ would force $A = 90^\\circ$, giving two right angles, which is impossible. Such data describes no triangle." },
        { text: "$A = 90^\\circ$, a valid triangle", explain: "A triangle cannot have two $90^\\circ$ angles, so this data is inconsistent." },
        { text: "$A = 45^\\circ$", explain: "$\\sin A = 1$, and $\\sin 45^\\circ \\approx 0.707$. The value $1$ points to the impossible $90^\\circ$." },
        { text: "$A = 30^\\circ$", explain: "$\\sin 30^\\circ = 0.5$, but here $\\sin A = 1$, which cannot coexist with $C = 90^\\circ$." },
      ],
    },
    {
      id: "s-ratio-value",
      prompt: "In a triangle, $b = 14$ and $B = 30^\\circ$. The common ratio $\\dfrac{a}{\\sin A}$ equals:",
      choices: [
        { text: "$28$", correct: true, explain: "$\\dfrac{b}{\\sin B} = \\dfrac{14}{0.5} = 28$, and every side-over-sine ratio shares that value." },
        { text: "$7$", explain: "That multiplies by $0.5$ instead of dividing. Dividing by $0.5$ gives $28$." },
        { text: "$14$", explain: "$14$ is side $b$ itself. The ratio is $\\dfrac{14}{\\sin 30^\\circ} = 28$." },
        { text: "$0.5$", explain: "$0.5$ is $\\sin 30^\\circ$. The ratio divides $b$ by it: $28$." },
      ],
    },
    {
      id: "s-why-sine",
      prompt: "The altitude argument writes $h = b\\sin A$ because in that right triangle:",
      choices: [
        { text: "$h$ is the side opposite angle $A$ and $b$ is the hypotenuse, so $\\sin A = \\tfrac{h}{b}$", correct: true, explain: "Sine is opposite over hypotenuse, and rearranging $\\sin A = \\tfrac{h}{b}$ gives $h = b\\sin A$." },
        { text: "$h$ is adjacent to $A$, so cosine is used", explain: "The altitude is opposite angle $A$, not adjacent, so sine applies." },
        { text: "$b$ is the opposite side", explain: "Here $b$ is the hypotenuse of the small right triangle, and $h$ is the opposite side." },
        { text: "the triangle is equilateral", explain: "No such assumption is made. The relationship $h = b\\sin A$ holds in general." },
      ],
    },
    {
      id: "s-convert-asa",
      prompt: "An ASA problem gives $B = 55^\\circ$, $C = 65^\\circ$, and side $a = 12$. The cleanest path is to:",
      choices: [
        { text: "find $A = 60^\\circ$, then pair the known side $a$ with $\\sin A$", correct: true, explain: "Side $a$ needs its opposite angle $A = 180 - 55 - 65 = 60^\\circ$ to start a ratio." },
        { text: "use $\\dfrac{a}{\\sin B}$ directly", explain: "Side $a$ must be paired with angle $A$, so find $A$ first." },
        { text: "use the law of cosines with the two angles", explain: "The law of cosines needs sides, and this is a law of sines case." },
        { text: "assume $b = c$ since the angles are close", explain: "Close angles are not equal, so the sides differ. Solve using the ratios." },
      ],
    },
    {
      id: "s-no-triangle",
      prompt: "Solving for an angle gives $\\sin B = 1.3$. How many triangles fit the data?",
      choices: [
        { text: "none", correct: true, explain: "A sine can never exceed $1$, so no angle has sine $1.3$ and no triangle exists." },
        { text: "one", explain: "There is no angle with sine $1.3$, so not even one triangle forms." },
        { text: "two", explain: "Two triangles need a valid sine below $1$. A value above $1$ gives none." },
        { text: "infinitely many", explain: "The data is impossible, not underdetermined. No triangle exists." },
      ],
    },
    {
      id: "s-peak-side",
      prompt: "Two observers $300$ m apart on level ground measure the angle of elevation to a balloon as $40^\\circ$ and $70^\\circ$ from their respective positions, with the balloon between them. Which law finds the slant distances?",
      choices: [
        { text: "the law of sines, after finding the apex angle $70^\\circ$", correct: true, explain: "The ground segment and its two base angles form ASA, so the apex angle is $180 - 40 - 70 = 70^\\circ$ and the law of sines gives each slant distance." },
        { text: "the law of cosines, since three sides are known", explain: "Only the ground segment is a known side, so this is ASA for the law of sines." },
        { text: "the Pythagorean theorem", explain: "The triangle is oblique with no right angle, so the Pythagorean theorem does not apply." },
        { text: "the tangent ratio alone", explain: "A single right triangle is not given. The two base angles and included side call for the law of sines." },
      ],
    },
  ],
};
