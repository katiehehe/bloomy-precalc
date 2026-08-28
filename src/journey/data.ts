import { topics, edges, skills, type Topic } from "../curriculum/data";
import { journeySkillToLesson } from "./registry";

export type NodeKind = "mine" | "basecamp" | "planned";

export type JourneyNode = {
  order: number;
  skillId: string;
  title: string;
  kind: NodeKind;
  /** Hash href to open the lesson (mine or Base Camp). Absent when planned. */
  href?: string;
};

export type JourneyUnit = {
  id: string;
  n: number;
  title: string;
  blurb: string;
  block: string;
  nodes: JourneyNode[];
};

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
      nodes.push({ order, skillId: s.id, title: s.title, kind, href });
    }
    units.push({ id: t.id, n: t.n, title: t.title, blurb: t.why, block: t.block, nodes });
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
