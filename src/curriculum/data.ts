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
  { id: "start", title: "Rationals, then trig", role: "18 skills after Algebra 2" },
  { id: "plane", title: "Polar, parametrics, vectors, matrices", role: "22 skills, the largest hole" },
  { id: "finish", title: "Conics, series, calculus", role: "17 skills to finish the 57" },
];

export const topics: Topic[] = [
  {
    id: "rationals",
    n: 1,
    title: "Rational analysis",
    block: "start",
    why: "This unit teaches how to graph rational functions, find holes and asymptotes, and solve polynomial and rational inequalities.",
    fromBank: "Polynomials AAPR-006 to 014, reciprocal functions FIF-022",
  },
  {
    id: "trig",
    n: 2,
    title: "Trig completion",
    block: "start",
    why: "This unit finishes trigonometry: radians, the unit circle, inverse trig, identities, equations, and the laws of sines and cosines.",
    fromBank: "Core trig FTF-001 to 009, GSRT-007 to 012, GC-008",
    lessonId: "unit-circle",
  },
  {
    id: "polar",
    n: 3,
    title: "Polar and complex polar",
    block: "plane",
    why: "This unit teaches polar coordinates, polar graphs, and the polar form of complex numbers.",
    fromBank: "Core trig FTF-001 to 009, complex numbers NCN-001 to 003",
    lessonId: "polar-graphs",
  },
  {
    id: "parametrics",
    n: 4,
    title: "Parametrics",
    block: "plane",
    why: "This unit teaches parametric equations: graphing a curve from two functions of one parameter, eliminating the parameter, and describing motion.",
    fromBank: "Function analysis FIF-016 to 023, FBF-002 to 004, FBF-011 to 016",
    lessonId: "parametrics",
  },
  {
    id: "vectors",
    n: 5,
    title: "Vectors",
    block: "plane",
    why: "This unit teaches vectors in the plane: magnitude, components, addition, the dot product, and simple force models.",
    fromBank: "Core trig FTF-001 to 009",
    lessonId: "vectors",
  },
  {
    id: "matrices",
    n: 6,
    title: "Matrices",
    block: "plane",
    why: "This unit teaches matrices: addition, multiplication, determinants, inverses, and solving linear systems.",
    fromBank: "Algebra 2 systems",
  },
  {
    id: "conics",
    n: 7,
    title: "Conics",
    block: "finish",
    why: "This unit completes the conic sections: ellipses, hyperbolas, eccentricity, and choosing a model from a geometric description.",
    fromBank: "Circles and parabolas GGPE-005 to 008",
    lessonId: "conics",
  },
  {
    id: "series",
    n: 8,
    title: "Series",
    block: "finish",
    why: "This unit teaches series and proof: sigma notation, arithmetic and geometric sums, and mathematical induction.",
    fromBank: "Sequences FBF-007 to 010",
  },
  {
    id: "calc",
    n: 9,
    title: "Calculus readiness",
    block: "finish",
    why: "This unit prepares for calculus: limits from a graph and from algebra, continuity, the difference quotient, and concavity.",
    fromBank: "Function analysis FIF-016 to 023, FBF-002 to 004, FBF-011 to 016",
  },
];

export const skills: Skill[] = [
  { id: "va-holes", title: "Vertical asymptotes and holes", topic: "rationals", status: "planned" },
  { id: "ha-slant", title: "Horizontal and slant asymptotes", topic: "rationals", status: "planned" },
  { id: "rational-graph", title: "Complete rational graphing", topic: "rationals", status: "planned" },
  { id: "poly-ineq", title: "Polynomial inequalities", topic: "rationals", status: "planned" },
  { id: "rational-ineq", title: "Rational inequalities", topic: "rationals", status: "planned" },
  { id: "fta", title: "FTA and conjugate root pairs", topic: "rationals", status: "planned" },
  { id: "deg-rad", title: "Degree-radian conversion", topic: "trig", status: "planned" },
  { id: "angular-velocity", title: "Angular and linear velocity", topic: "trig", status: "planned" },
  { id: "unit-circle", title: "The unit circle", topic: "trig", status: "planned" },
  { id: "special-angles", title: "Special angles", topic: "trig", status: "planned" },
  { id: "inverse-eval", title: "Evaluating inverse trig", topic: "trig", status: "planned" },
  { id: "inverse-graphs", title: "Graphing inverse trig with domain restrictions", topic: "trig", status: "planned" },
  { id: "trig-eq-basic", title: "Solving basic trig equations", topic: "trig", status: "planned" },
  { id: "sum-diff", title: "Sum and difference identities", topic: "trig", status: "planned" },
  { id: "double-angle", title: "Double-angle identities", topic: "trig", status: "planned" },
  { id: "half-angle", title: "Half-angle identities", topic: "trig", status: "planned" },
  { id: "verify", title: "Verifying identities", topic: "trig", status: "planned" },
  { id: "trig-eq-multi", title: "Solving multi-angle trig equations", topic: "trig", status: "planned" },
  { id: "law-sines", title: "Law of sines", topic: "trig", status: "planned" },
  { id: "law-cosines", title: "Law of cosines", topic: "trig", status: "planned" },
  { id: "ssa", title: "The ambiguous SSA case", topic: "trig", status: "planned" },
  { id: "graph-sinusoids", title: "Graphing sinusoids", topic: "trig", status: "planned" },
  { id: "sin-regression", title: "Sinusoidal regression", topic: "trig", status: "planned" },
  { id: "modulus", title: "Modulus and argument", topic: "polar", status: "planned" },
  { id: "trig-form", title: "Trig form", topic: "polar", status: "planned" },
  { id: "polar-rect", title: "Polar-rectangular conversion", topic: "polar", status: "ready", lessonId: "polar-graphs" },
  { id: "polar-graphs", title: "Polar graphs (roses, limaçons, cardioids)", topic: "polar", status: "ready", lessonId: "polar-graphs" },
  { id: "polar-arith", title: "Multiply and divide in polar form", topic: "polar", status: "planned" },
  { id: "de-moivre", title: "Euler's form and De Moivre's theorem", topic: "polar", status: "planned" },
  { id: "roots-of-unity", title: "Roots of unity", topic: "polar", status: "planned" },
  { id: "param-graph", title: "Graphing parametrics", topic: "parametrics", status: "ready", lessonId: "parametrics" },
  { id: "param-elim", title: "Eliminating the parameter", topic: "parametrics", status: "ready", lessonId: "parametrics" },
  { id: "param-motion", title: "Parametric motion models", topic: "parametrics", status: "planned" },
  { id: "vec-mag", title: "Magnitude and direction", topic: "vectors", status: "ready", lessonId: "vectors" },
  { id: "vec-comp", title: "Component and unit-vector form", topic: "vectors", status: "ready", lessonId: "vectors" },
  { id: "vec-ops", title: "Add, subtract, and scale", topic: "vectors", status: "ready", lessonId: "vectors" },
  { id: "vec-dot", title: "Dot product and angle between", topic: "vectors", status: "planned" },
  { id: "vec-models", title: "Modeling force, velocity, and navigation", topic: "vectors", status: "planned" },
  { id: "vec-incline", title: "Decomposition on inclines", topic: "vectors", status: "planned" },
  { id: "ellipses", title: "Ellipses", topic: "conics", status: "ready", lessonId: "conics" },
  { id: "hyperbolas", title: "Hyperbolas", topic: "conics", status: "ready", lessonId: "conics" },
  { id: "eccentricity", title: "Foci and eccentricity", topic: "conics", status: "ready", lessonId: "conics" },
  { id: "hyp-asym", title: "Asymptotes of hyperbolas", topic: "conics", status: "ready", lessonId: "conics" },
  { id: "conics-class", title: "Classifying from general form", topic: "conics", status: "planned" },
  { id: "conics-model", title: "Conic modeling", topic: "conics", status: "planned" },
  { id: "mtx-add", title: "Add and scale", topic: "matrices", status: "planned" },
  { id: "mtx-mul", title: "Multiply", topic: "matrices", status: "planned" },
  { id: "mtx-det", title: "Determinants, 2×2 and 3×3", topic: "matrices", status: "planned" },
  { id: "mtx-inv", title: "Inverses", topic: "matrices", status: "planned" },
  { id: "mtx-3var", title: "3-variable systems", topic: "matrices", status: "planned" },
  { id: "mtx-cramer", title: "Matrix solutions and Cramer's rule", topic: "matrices", status: "planned" },
  { id: "mtx-tx", title: "Matrices as transformations", topic: "matrices", status: "planned" },
  { id: "sigma", title: "Sigma notation", topic: "series", status: "planned" },
  { id: "arith-series", title: "Arithmetic series sums", topic: "series", status: "planned" },
  { id: "finite-geo", title: "Finite geometric series", topic: "series", status: "planned" },
  { id: "infinite-geo", title: "Infinite geometric series and convergence", topic: "series", status: "planned" },
  { id: "binomial", title: "Binomial theorem", topic: "series", status: "planned" },
  { id: "induction", title: "Mathematical induction", topic: "series", status: "planned" },
  { id: "concavity", title: "Concavity and inflection", topic: "calc", status: "planned" },
  { id: "dq", title: "Difference quotient", topic: "calc", status: "planned" },
  { id: "limits-graph", title: "Limits from graphs and tables", topic: "calc", status: "planned" },
  { id: "limits-alg", title: "Limits algebraically", topic: "calc", status: "planned" },
  { id: "continuity", title: "Continuity and discontinuity types", topic: "calc", status: "planned" },
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
  newSkills: 57,
};

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
