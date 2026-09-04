import { topics, edges, skills, skillEdges, type Topic, type SkillEdge } from "../curriculum/data";
import { journeySkillToLesson } from "./registry";

export type NodeKind = "mine" | "basecamp" | "planned";

export type JourneyNode = {
  order: number;
  skillId: string;
  title: string;
  kind: NodeKind;
  /** Hash href to open the lesson (mine or Base Camp). Absent when planned. */
  href?: string;
  /** Incoming prerequisite skill ids within the same unit. Empty for a start. */
  prereqs: string[];
};

export type JourneyUnit = {
  id: string;
  n: number;
  title: string;
  blurb: string;
  /** Titles of Bloomy units that must come first. Empty when this unit can start from Algebra 2. */
  prereqTitles: string[];
  block: string;
  nodes: JourneyNode[];
};

export function formatPrereqUnits(titles: string[]): string {
  if (titles.length === 0) return "No earlier unit is required.";
  if (titles.length === 1) return `Prerequisite unit: ${titles[0]}.`;
  if (titles.length === 2) return `Prerequisite units: ${titles[0]} and ${titles[1]}.`;
  const last = titles[titles.length - 1];
  return `Prerequisite units: ${titles.slice(0, -1).join(", ")}, and ${last}.`;
}

export function skillPrereqs(id: string): string[] {
  return skillEdges.filter((e) => e.to === id).map((e) => e.from);
}

export function skillUnlocks(id: string): string[] {
  return skillEdges.filter((e) => e.from === id).map((e) => e.to);
}

/**
 * Longest-path layers for a unit DAG. Kahn's algorithm yields a topological
 * order, then each node sits one layer below its deepest prerequisite so every
 * root lands in layer 0.
 */
export function unitLayers(nodes: JourneyNode[], given: SkillEdge[]): JourneyNode[][] {
  if (nodes.length === 0) return [];

  const ids = new Set(nodes.map((n) => n.skillId));
  const local = given.filter((e) => ids.has(e.from) && ids.has(e.to));

  const outgoing = new Map<string, string[]>();
  const incomingIds = new Map<string, string[]>();
  for (const n of nodes) {
    outgoing.set(n.skillId, []);
    incomingIds.set(n.skillId, []);
  }
  for (const e of local) {
    outgoing.get(e.from)!.push(e.to);
    incomingIds.get(e.to)!.push(e.from);
  }

  const remaining = new Map<string, number>();
  const queue: string[] = [];
  for (const n of nodes) {
    const deg = incomingIds.get(n.skillId)!.length;
    remaining.set(n.skillId, deg);
    if (deg === 0) queue.push(n.skillId);
  }

  const topo: string[] = [];
  while (queue.length) {
    const id = queue.shift()!;
    topo.push(id);
    for (const next of outgoing.get(id) ?? []) {
      const nextDeg = (remaining.get(next) ?? 1) - 1;
      remaining.set(next, nextDeg);
      if (nextDeg === 0) queue.push(next);
    }
  }

  const level = new Map<string, number>();
  for (const id of topo) {
    const prereqs = incomingIds.get(id) ?? [];
    level.set(id, prereqs.length === 0 ? 0 : 1 + Math.max(...prereqs.map((p) => level.get(p) ?? 0)));
  }
  for (const n of nodes) {
    if (!level.has(n.skillId)) level.set(n.skillId, 0);
  }

  const depth = Math.max(0, ...level.values());
  const layers: JourneyNode[][] = Array.from({ length: depth + 1 }, () => []);
  for (const n of nodes) {
    layers[level.get(n.skillId)!]!.push(n);
  }
  return layers.filter((layer) => layer.length > 0);
}

/** Topics in prerequisite order, breaking ties by unit number. */
function topicOrder(): Topic[] {
  const indeg = new Map(topics.map((t) => [t.id, 0]));
  for (const e of edges) indeg.set(e.to, (indeg.get(e.to) ?? 0) + 1);
  const queue = topics.filter((t) => (indeg.get(t.id) ?? 0) === 0);
  const order: Topic[] = [];
  const seen = new Set<string>();
  while (queue.length) {
    queue.sort((a, b) => a.n - b.n);
    const t = queue.shift() as Topic;
    if (seen.has(t.id)) continue;
    seen.add(t.id);
    order.push(t);
    for (const e of edges.filter((x) => x.from === t.id)) {
      indeg.set(e.to, (indeg.get(e.to) ?? 0) - 1);
      if ((indeg.get(e.to) ?? 0) === 0) {
        const next = topics.find((x) => x.id === e.to);
        if (next) queue.push(next);
      }
    }
  }
  for (const t of [...topics].sort((a, b) => a.n - b.n)) if (!seen.has(t.id)) order.push(t);
  return order;
}

function build(): JourneyUnit[] {
  const units: JourneyUnit[] = [];
  let order = 0;
  for (const t of topicOrder()) {
    const nodes: JourneyNode[] = [];
    for (const s of skills.filter((s) => s.topic === t.id)) {
      order += 1;
      const mine = journeySkillToLesson.get(s.id);
      let kind: NodeKind = "planned";
      let href: string | undefined;
      if (mine) {
        kind = "mine";
        href = `#/journey/${mine}`;
      } else if (s.status === "ready" && s.lessonId) {
        kind = "basecamp";
        href = `#/${s.lessonId}`;
      }
      nodes.push({ order, skillId: s.id, title: s.title, kind, href, prereqs: skillPrereqs(s.id) });
    }
    const prereqTitles = edges
      .filter((e) => e.to === t.id)
      .map((e) => topics.find((x) => x.id === e.from)?.title)
      .filter((title): title is string => Boolean(title));
    units.push({ id: t.id, n: t.n, title: t.title, blurb: t.why, prereqTitles, block: t.block, nodes });
  }
  return units;
}

export const journeyUnits: JourneyUnit[] = build();

export const journeyStats = journeyUnits
  .flatMap((u) => u.nodes)
  .reduce(
    (acc, n) => {
      acc.total += 1;
      acc[n.kind] += 1;
      return acc;
    },
    { total: 0, mine: 0, basecamp: 0, planned: 0 } as Record<string, number>,
  );
