import { useCallback, useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { blocks, edges, skillsFor, topicStatus, topics, type Topic } from "./data";

type Path = {
  id: string;
  d: string;
  from: string;
  to: string;
};

function connector(a: DOMRect, b: DOMRect, origin: DOMRect) {
  const ax = a.left - origin.left;
  const ay = a.top - origin.top;
  const bx = b.left - origin.left;
  const by = b.top - origin.top;
  const sameColumn = Math.abs(a.left - b.left) < 48;

  if (sameColumn) {
    const x1 = ax + a.width / 2;
    const y1 = ay + a.height;
    const x2 = bx + b.width / 2;
    const y2 = by;
    const dy = Math.max(18, Math.abs(y2 - y1) / 2);
    return `M ${x1} ${y1} C ${x1} ${y1 + dy}, ${x2} ${y2 - dy}, ${x2} ${y2}`;
  }

  const x1 = ax + a.width;
  const y1 = ay + a.height / 2;
  const x2 = bx;
  const y2 = by + b.height / 2;
  const dx = Math.max(40, Math.abs(x2 - x1) / 2.4);
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
}

function statusLabel(topic: Topic) {
  const count = skillsFor(topic.id).length;
  const ready = topicStatus(topic.id) === "ready";
  return ready ? `${count} skills · lesson ready` : `${count} skills`;
}

export default function MapGraph({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [paths, setPaths] = useState<Path[]>([]);
  const [narrow, setNarrow] = useState(false);

  const related = useMemo(() => {
    const next = new Set<string>([selectedId]);
    for (const edge of edges) {
      if (edge.from === selectedId) next.add(edge.to);
      if (edge.to === selectedId) next.add(edge.from);
    }
    return next;
  }, [selectedId]);

  const layout = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const origin = wrap.getBoundingClientRect();
    setNarrow(origin.width < 760);

    const next: Path[] = [];
    for (const edge of edges) {
      if (edge.from !== selectedId && edge.to !== selectedId) continue;
      const fromEl = nodeRefs.current[edge.from];
      const toEl = nodeRefs.current[edge.to];
      if (!fromEl || !toEl) continue;
      next.push({
        id: `${edge.from}__${edge.to}`,
        d: connector(fromEl.getBoundingClientRect(), toEl.getBoundingClientRect(), origin),
        from: edge.from,
        to: edge.to,
      });
    }
    setPaths(next);
  }, [selectedId]);

  useLayoutEffect(() => {
    layout();
    const wrap = wrapRef.current;
    if (!wrap) return;
    const observer = new ResizeObserver(layout);
    observer.observe(wrap);
    const fonts = document.fonts?.ready.then(layout);
    const frame = requestAnimationFrame(layout);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      void fonts;
    };
  }, [layout, selectedId]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = topics.findIndex((topic) => topic.id === selectedId);
    if (index < 0) return;
    let next = index;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = topics.length - 1;
    if (narrow) {
      if (event.key === "ArrowDown" || event.key === "ArrowRight") next = Math.min(topics.length - 1, index + 1);
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = Math.max(0, index - 1);
    } else {
      const current = topics[index]!;
      const colIndex = blocks.findIndex((block) => block.id === current.block);
      const here = topics.filter((topic) => topic.block === current.block);
      const i = here.findIndex((topic) => topic.id === selectedId);
      if (event.key === "ArrowDown") {
        const pick = here[i + 1] ?? here[i];
        if (pick) next = topics.findIndex((topic) => topic.id === pick.id);
      }
      if (event.key === "ArrowUp") {
        const pick = here[i - 1] ?? here[i];
        if (pick) next = topics.findIndex((topic) => topic.id === pick.id);
      }
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        const targetBlock = blocks[colIndex + (event.key === "ArrowRight" ? 1 : -1)];
        if (targetBlock) {
          const colTopics = topics.filter((topic) => topic.block === targetBlock.id);
          const pick = colTopics[Math.min(i, colTopics.length - 1)] ?? colTopics[0];
          if (pick) next = topics.findIndex((topic) => topic.id === pick.id);
        }
      }
    }
    if (next !== index && topics[next]) {
      event.preventDefault();
      onSelect(topics[next]!.id);
      nodeRefs.current[topics[next]!.id]?.focus();
    }
  };

  return (
    <div className="map-graph" ref={wrapRef}>
      <div className="map-graph__cols" role="radiogroup" aria-label="Precalculus topics" onKeyDown={onKeyDown}>
        {blocks.map((block) => (
          <section key={block.id} className="map-col" aria-labelledby={`map-col-${block.id}`}>
            <header className="map-col__head">
              <h2 id={`map-col-${block.id}`}>{block.title}</h2>
              <p>{block.role}</p>
            </header>
            {topics
              .filter((topic) => topic.block === block.id)
              .map((topic) => {
                const selected = topic.id === selectedId;
                const linked = related.has(topic.id);
                const status = topicStatus(topic.id);
                return (
                  <button
                    key={topic.id}
                    ref={(node) => {
                      nodeRefs.current[topic.id] = node;
                    }}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    tabIndex={selected ? 0 : -1}
                    className={`map-node map-node--${status}${selected ? " map-node--selected" : ""}${linked && !selected ? " map-node--linked" : ""}${!linked ? " map-node--dim" : ""}`}
                    onClick={() => onSelect(topic.id)}
                  >
                    <span className="map-node__n" aria-hidden="true">
                      {topic.n}
                    </span>
                    <span className="map-node__body">
                      <span className="map-node__title">{topic.title}</span>
                      <span className="map-node__meta">
                        <span className={`map-pip map-pip--${status}`} aria-hidden="true" />
                        {statusLabel(topic)}
                      </span>
                    </span>
                  </button>
                );
              })}
          </section>
        ))}
      </div>

      <svg className="map-graph__edges map-graph__edges--active" aria-hidden="true">
        <defs>
          <marker id="map-arrow-active" viewBox="0 0 10 10" markerWidth="8" markerHeight="8" refX="9" refY="5" orient="auto">
            <path d="M 0 1.2 L 10 5 L 0 8.8 Z" fill="oklch(0.48 0.15 245)" />
          </marker>
        </defs>
        {paths.map((path) => (
          <g key={path.id}>
            <path d={path.d} className="map-edge map-edge--halo" />
            <path d={path.d} className="map-edge map-edge--active" markerEnd="url(#map-arrow-active)" />
          </g>
        ))}
      </svg>
    </div>
  );
}
