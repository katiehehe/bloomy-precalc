export type SkillStatus = "ready" | "planned";
export type BlockId = "start" | "plane" | "finish";
export type TopicId =
  | "rationals"
  | "trig"
  | "polar"
  | "parametrics"
  | "vectors"
  | "matrices"
  | "conics"
  | "series"
  | "calc";

export type Skill = {
  id: string;
  title: string;
  topic: TopicId;
  status: SkillStatus;
  lessonId?: string;
};

export type Topic = {
  id: TopicId;
  n: number;
  title: string;
  block: BlockId;
  why: string;
  fromBank: string;
  lessonId?: string;
};

export type Edge = {
  from: TopicId;
  to: TopicId;
  note?: string;
};

export type SkillEdge = {
  from: string;
  to: string;
  note?: string;
};

export const blocks: { id: BlockId; title: string; role: string }[] = [
  { id: "start", title: "Rationals, then trig", role: "After Algebra 2" },
  { id: "plane", title: "Polar, parametrics, vectors, matrices", role: "On the coordinate plane" },
  { id: "finish", title: "Conics, series, calculus", role: "To finish the year" },
];

export const topics: Topic[] = [
  {
    id: "rationals",
    n: 1,
    title: "Rational analysis",
    block: "start",
    why: "This unit teaches how to graph rational functions, find holes and asymptotes, and solve polynomial and rational inequalities.",
    fromBank: "Polynomials AAPR-006 to 014, reciprocal functions FIF-022",
    lessonId: "rational-holes",
  },
  {
    id: "trig",
    n: 2,
    title: "Trig completion",
    block: "start",
    why: "This unit finishes trigonometry: radians, the unit circle, inverse trig, identities, equations, and the laws of sines and cosines.",
    fromBank: "Core trig FTF-001 to 009, GSRT-007 to 012, GC-008",
    lessonId: "degrees-radians",
  },
  {
    id: "polar",
    n: 3,
    title: "Polar and complex polar",
    block: "plane",
    why: "This unit teaches polar coordinates, polar graphs, and the polar form of complex numbers.",
    fromBank: "Core trig FTF-001 to 009, complex numbers NCN-001 to 003",
    lessonId: "modulus-argument",
  },
  {
    id: "parametrics",
    n: 4,
    title: "Parametrics",
    block: "plane",
    why: "This unit teaches parametric equations: graphing a curve from two functions of one parameter, eliminating the parameter, and describing motion.",
    fromBank: "Function analysis FIF-016 to 023, FBF-002 to 004, FBF-011 to 016",
    lessonId: "param-graph",
  },
  {
    id: "vectors",
    n: 5,
    title: "Vectors",
    block: "plane",
    why: "This unit teaches vectors in the plane: magnitude, components, addition, the dot product, and simple force models.",
    fromBank: "Core trig FTF-001 to 009",
    lessonId: "vec-mag",
  },
  {
    id: "matrices",
    n: 6,
    title: "Matrices",
    block: "plane",
    why: "This unit teaches matrices: addition, multiplication, determinants, inverses, and solving linear systems.",
    fromBank: "Algebra 2 systems",
    lessonId: "mtx-add",
  },
  {
    id: "conics",
    n: 7,
    title: "Conics",
    block: "finish",
    why: "This unit introduces the conic family, then treats ellipses, hyperbolas, eccentricity, and choosing a model from a geometric description.",
    fromBank: "Circles and parabolas GGPE-005 to 008",
    lessonId: "conics-intro",
  },
  {
    id: "series",
    n: 8,
    title: "Series",
    block: "finish",
    why: "This unit teaches series and proof: sigma notation, arithmetic and geometric sums, and mathematical induction.",
    fromBank: "Sequences FBF-007 to 010",
    lessonId: "sigma",
  },
  {
    id: "calc",
    n: 9,
    title: "Calculus readiness",
    block: "finish",
    why: "This unit prepares for calculus: limits from a graph and from algebra, continuity, the difference quotient, and concavity.",
    fromBank: "Function analysis FIF-016 to 023, FBF-002 to 004, FBF-011 to 016",
    lessonId: "limits-graph",
  },
];

export const skills: Skill[] = [
  { id: "va-holes", title: "Vertical asymptotes and holes", topic: "rationals", status: "ready", lessonId: "rational-holes" },
  { id: "ha-slant", title: "Horizontal and slant asymptotes", topic: "rationals", status: "ready", lessonId: "rational-asymptotes" },
  { id: "rational-graph", title: "Complete rational graphing", topic: "rationals", status: "ready", lessonId: "rational-graphing" },
  { id: "poly-ineq", title: "Polynomial inequalities", topic: "rationals", status: "ready", lessonId: "poly-inequalities" },
  { id: "rational-ineq", title: "Rational inequalities", topic: "rationals", status: "ready", lessonId: "rational-inequalities" },
  { id: "fta", title: "FTA and conjugate root pairs", topic: "rationals", status: "ready", lessonId: "fta" },
  { id: "deg-rad", title: "Degree-radian conversion", topic: "trig", status: "ready", lessonId: "degrees-radians" },
  { id: "angular-velocity", title: "Angular and linear velocity", topic: "trig", status: "ready", lessonId: "angular-velocity" },
  { id: "unit-circle", title: "The unit circle", topic: "trig", status: "ready", lessonId: "unit-circle" },
  { id: "special-angles", title: "Special angles", topic: "trig", status: "ready", lessonId: "special-angles" },
  { id: "inverse-eval", title: "Evaluating inverse trig", topic: "trig", status: "ready", lessonId: "inverse-eval" },
  { id: "inverse-graphs", title: "Graphing inverse trig with domain restrictions", topic: "trig", status: "ready", lessonId: "inverse-graphs" },
  { id: "trig-eq-basic", title: "Solving basic trig equations", topic: "trig", status: "ready", lessonId: "trig-equations-basic" },
  { id: "sum-diff", title: "Sum and difference identities", topic: "trig", status: "ready", lessonId: "sum-difference-identities" },
  { id: "double-angle", title: "Double-angle identities", topic: "trig", status: "ready", lessonId: "double-angle-identities" },
  { id: "half-angle", title: "Half-angle identities", topic: "trig", status: "ready", lessonId: "half-angle-identities" },
  { id: "verify", title: "Verifying identities", topic: "trig", status: "ready", lessonId: "verifying-identities" },
  { id: "trig-eq-multi", title: "Solving multi-angle trig equations", topic: "trig", status: "ready", lessonId: "trig-equations-multi" },
  { id: "law-sines", title: "Law of sines", topic: "trig", status: "ready", lessonId: "law-of-sines" },
  { id: "law-cosines", title: "Law of cosines", topic: "trig", status: "ready", lessonId: "law-of-cosines" },
  { id: "ssa", title: "The ambiguous SSA case", topic: "trig", status: "ready", lessonId: "ssa-ambiguous" },
  { id: "graph-sinusoids", title: "Graphing sinusoids", topic: "trig", status: "ready", lessonId: "sinusoid-graphs" },
  { id: "sin-regression", title: "Sinusoidal regression", topic: "trig", status: "ready", lessonId: "sinusoidal-regression" },
  { id: "modulus", title: "Modulus and argument", topic: "polar", status: "ready", lessonId: "modulus-argument" },
  { id: "trig-form", title: "Trig form", topic: "polar", status: "ready", lessonId: "trig-form" },
  { id: "polar-rect", title: "Polar-rectangular conversion", topic: "polar", status: "ready", lessonId: "polar-rect" },
  { id: "polar-graphs", title: "Polar graphs (roses, limaçons, cardioids)", topic: "polar", status: "ready", lessonId: "polar-roses" },
  { id: "polar-arith", title: "Multiply and divide in polar form", topic: "polar", status: "ready", lessonId: "polar-arith" },
  { id: "de-moivre", title: "Euler's form and De Moivre's theorem", topic: "polar", status: "ready", lessonId: "de-moivre" },
  { id: "roots-of-unity", title: "Roots of unity", topic: "polar", status: "ready", lessonId: "roots-of-unity" },
  { id: "param-graph", title: "Graphing parametrics", topic: "parametrics", status: "ready", lessonId: "param-graph" },
  { id: "param-elim", title: "Eliminating the parameter", topic: "parametrics", status: "ready", lessonId: "param-elim" },
  { id: "param-motion", title: "Parametric motion models", topic: "parametrics", status: "ready", lessonId: "param-motion" },
  { id: "vec-mag", title: "Magnitude and direction", topic: "vectors", status: "ready", lessonId: "vec-mag" },
  { id: "vec-comp", title: "Component and unit-vector form", topic: "vectors", status: "ready", lessonId: "vec-comp" },
  { id: "vec-ops", title: "Add, subtract, and scale", topic: "vectors", status: "ready", lessonId: "vec-ops" },
  { id: "vec-dot", title: "Dot product and angle between", topic: "vectors", status: "ready", lessonId: "vec-dot" },
  { id: "vec-models", title: "Modeling force, velocity, and navigation", topic: "vectors", status: "ready", lessonId: "vec-models" },
  { id: "vec-incline", title: "Decomposition on inclines", topic: "vectors", status: "ready", lessonId: "vec-incline" },
  { id: "conics-intro", title: "Intro to the conic sections", topic: "conics", status: "ready", lessonId: "conics-intro" },
  { id: "ellipses", title: "Ellipses", topic: "conics", status: "ready", lessonId: "ellipses" },
  { id: "hyperbolas", title: "Hyperbolas", topic: "conics", status: "ready", lessonId: "hyperbolas" },
  { id: "eccentricity", title: "Foci and eccentricity", topic: "conics", status: "ready", lessonId: "eccentricity" },
  { id: "hyp-asym", title: "Asymptotes of hyperbolas", topic: "conics", status: "ready", lessonId: "hyp-asym" },
  { id: "conics-class", title: "Classifying from general form", topic: "conics", status: "ready", lessonId: "conics-class" },
  { id: "conics-model", title: "Conic modeling", topic: "conics", status: "ready", lessonId: "conics-model" },
  { id: "mtx-add", title: "Add and scale", topic: "matrices", status: "ready", lessonId: "mtx-add" },
  { id: "mtx-mul", title: "Multiply", topic: "matrices", status: "ready", lessonId: "mtx-mul" },
  { id: "mtx-det", title: "Determinants, 2×2 and 3×3", topic: "matrices", status: "ready", lessonId: "mtx-det" },
  { id: "mtx-inv", title: "Inverses", topic: "matrices", status: "ready", lessonId: "mtx-inv" },
  { id: "mtx-3var", title: "3-variable systems", topic: "matrices", status: "ready", lessonId: "mtx-3var" },
  { id: "mtx-cramer", title: "Matrix solutions and Cramer's rule", topic: "matrices", status: "ready", lessonId: "mtx-cramer" },
  { id: "mtx-tx", title: "Matrices as transformations", topic: "matrices", status: "ready", lessonId: "mtx-tx" },
  { id: "sigma", title: "Sigma notation", topic: "series", status: "ready", lessonId: "sigma" },
  { id: "arith-series", title: "Arithmetic series sums", topic: "series", status: "ready", lessonId: "arith-series" },
  { id: "finite-geo", title: "Finite geometric series", topic: "series", status: "ready", lessonId: "finite-geo" },
  { id: "infinite-geo", title: "Infinite geometric series and convergence", topic: "series", status: "ready", lessonId: "infinite-geo" },
  { id: "binomial", title: "Binomial theorem", topic: "series", status: "ready", lessonId: "binomial" },
  { id: "induction", title: "Mathematical induction", topic: "series", status: "ready", lessonId: "induction" },
  { id: "concavity", title: "Concavity and inflection", topic: "calc", status: "ready", lessonId: "concavity" },
  { id: "dq", title: "Difference quotient", topic: "calc", status: "ready", lessonId: "dq" },
  { id: "limits-graph", title: "Limits from graphs and tables", topic: "calc", status: "ready", lessonId: "limits-graph" },
  { id: "limits-alg", title: "Limits algebraically", topic: "calc", status: "ready", lessonId: "limits-alg" },
  { id: "continuity", title: "Continuity and discontinuity types", topic: "calc", status: "ready", lessonId: "continuity" },
];

export const edges: Edge[] = [
  { from: "trig", to: "polar" },
  { from: "trig", to: "parametrics" },
  { from: "trig", to: "vectors" },
  { from: "rationals", to: "calc" },
];

/** Within-unit skill prerequisites. `from` unlocks `to`. Roots have no incoming edge. */
export const skillEdges: SkillEdge[] = [
  { from: "va-holes", to: "rational-graph" },
  { from: "ha-slant", to: "rational-graph" },
  { from: "va-holes", to: "rational-ineq" },
  { from: "poly-ineq", to: "rational-ineq" },
  { from: "deg-rad", to: "angular-velocity" },
  { from: "unit-circle", to: "special-angles" },
  { from: "special-angles", to: "inverse-eval" },
  { from: "inverse-eval", to: "inverse-graphs" },
  { from: "special-angles", to: "trig-eq-basic" },
  { from: "special-angles", to: "sum-diff" },
  { from: "sum-diff", to: "double-angle" },
  { from: "double-angle", to: "half-angle" },
  { from: "sum-diff", to: "verify" },
  { from: "trig-eq-basic", to: "trig-eq-multi" },
  { from: "double-angle", to: "trig-eq-multi" },
  { from: "special-angles", to: "law-sines" },
  { from: "law-sines", to: "ssa" },
  { from: "special-angles", to: "law-cosines" },
  { from: "special-angles", to: "graph-sinusoids" },
  { from: "graph-sinusoids", to: "sin-regression" },
  { from: "modulus", to: "trig-form" },
  { from: "trig-form", to: "polar-arith" },
  { from: "trig-form", to: "de-moivre" },
  { from: "de-moivre", to: "roots-of-unity" },
  { from: "polar-rect", to: "polar-graphs" },
  { from: "param-graph", to: "param-elim" },
  { from: "param-graph", to: "param-motion" },
  { from: "vec-mag", to: "vec-comp" },
  { from: "vec-comp", to: "vec-ops" },
  { from: "vec-ops", to: "vec-dot" },
  { from: "vec-ops", to: "vec-models" },
  { from: "vec-comp", to: "vec-incline" },
  { from: "mtx-add", to: "mtx-mul" },
  { from: "mtx-mul", to: "mtx-det" },
  { from: "mtx-det", to: "mtx-inv" },
  { from: "mtx-mul", to: "mtx-3var" },
  { from: "mtx-det", to: "mtx-cramer" },
  { from: "mtx-mul", to: "mtx-tx" },
  { from: "conics-intro", to: "ellipses" },
  { from: "conics-intro", to: "hyperbolas" },
  { from: "conics-intro", to: "conics-class" },
  { from: "ellipses", to: "eccentricity" },
  { from: "hyperbolas", to: "hyp-asym" },
  { from: "ellipses", to: "conics-model" },
  { from: "hyperbolas", to: "conics-model" },
  { from: "sigma", to: "arith-series" },
  { from: "sigma", to: "finite-geo" },
  { from: "finite-geo", to: "infinite-geo" },
  { from: "limits-graph", to: "limits-alg" },
  { from: "limits-graph", to: "continuity" },
];

export const foundation = [
  { label: "Function analysis", codes: "FIF-016 to 023, FBF-002 to 004, FBF-011 to 016" },
  { label: "Polynomials", codes: "AAPR-006 to 014" },
  { label: "Exponential and log", codes: "FLE-006 to 008, ASSE-011/012, AREI-023 to 025" },
  { label: "Core trig spine", codes: "FTF-001 to 009, GSRT-007 to 012, GC-008", lessonId: "unit-circle" },
  { label: "Reciprocal functions", codes: "FIF-022" },
  { label: "Complex numbers", codes: "NCN-001 to 003" },
  { label: "Circles and parabolas", codes: "GGPE-005 to 008" },
  { label: "Sequences", codes: "FBF-007 to 010" },
];

export const inventory = {
  analyzed: 235,
  reused: 70,
  newSkills: skills.length,
};

/** Journey lessons open at `#/journey/:id`. Foundation examples stay at `#/:id`. */
export function skillHref(skill: Skill): string | undefined {
  return skill.lessonId ? `#/journey/${skill.lessonId}` : undefined;
}

export function topicLessonHref(topic: Topic): string | undefined {
  if (topic.lessonId) return `#/journey/${topic.lessonId}`;
  const first = skillsFor(topic.id).find((skill) => skill.lessonId);
  return first ? skillHref(first) : undefined;
}

export function skillsInBlock(block: BlockId) {
  const topicIds = new Set(topics.filter((topic) => topic.block === block).map((topic) => topic.id));
  return skills.filter((skill) => topicIds.has(skill.topic)).length;
}

export function blockRole(block: { id: BlockId; role: string }) {
  const n = skillsInBlock(block.id);
  if (block.id === "start") return `${n} skills after Algebra 2`;
  if (block.id === "plane") return `${n} skills on the coordinate plane`;
  return `${n} skills to finish the year`;
}

export function topicById(id: string) {
  return topics.find((topic) => topic.id === id);
}

export function skillsFor(topicId: TopicId) {
  return skills.filter((skill) => skill.topic === topicId);
}

export function topicStatus(topicId: TopicId): SkillStatus {
  return skillsFor(topicId).some((skill) => skill.status === "ready") ? "ready" : "planned";
}

export function incoming(id: string) {
  return edges.filter((edge) => edge.to === id);
}

export function outgoing(id: string) {
  return edges.filter((edge) => edge.from === id);
}
