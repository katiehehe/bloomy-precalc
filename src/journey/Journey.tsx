import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import SiteHeader from "../catalog/SiteHeader";
import Rich from "../components/Rich";
import { skillEdges } from "../curriculum/data";
import { formatPrereqUnits, journeyUnits, unitLayers, type JourneyNode, type JourneyUnit } from "./data";
import "./journey.css";

/**
 * Remembers how far down the Journey path was scrolled. The app is a hash SPA
 * that keeps JS state in memory, so this module-level value survives while the
 * Journey component unmounts (during a lesson) and remounts (on the way back),
 * letting us drop the learner back where they left off instead of at the top.
 */
let savedScrollTop = 0;

/**
 * Timestamp until which scroll writes are ignored. Clicking a lesson bubble
 * focuses it, and the browser scrolls that link into view before the hash
 * navigation runs, which would otherwise overwrite the saved position with the
 * link's location. We snapshot the real position on pointer-down and mute the
 * focus-scroll that immediately follows.
 */
let muteScrollUntil = 0;

type Path = {
  id: string;
  d: string;
};

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
      <path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" />
    </svg>
  );
}

function StarGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
      <path
        d="M12 3.6l2.5 5.1 5.6.8-4 3.9.9 5.6-5-2.6-5 2.6.9-5.6-4-3.9 5.6-.8z"
        fill="currentColor"
      />
    </svg>
  );
}

function LockGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <rect x="5" y="10" width="14" height="9" rx="2" fill="currentColor" />
      <path d="M8 10V8a4 4 0 0 1 8 0v2" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

/** Cubic from the bottom of a source label to the top of the target play button. */
function connector(a: DOMRect, b: DOMRect, origin: DOMRect) {
  const ax = a.left - origin.left + a.width / 2;
  const ay = a.top - origin.top + a.height;
  const bx = b.left - origin.left + b.width / 2;
  const by = b.top - origin.top;
  const mid = (ay + by) / 2;
  return `M ${ax} ${ay} C ${ax} ${mid}, ${bx} ${mid}, ${bx} ${by}`;
}

function NodeBubble({
  node,
  bubbleRef,
}: {
  node: JourneyNode;
  bubbleRef: (el: HTMLElement | null) => void;
}) {
  const label = (
    <span className="journey-node__label">
      <Rich>{node.title}</Rich>
    </span>
  );

  if (node.kind === "planned") {
    return (
      <div ref={bubbleRef} className="journey-node journey-node--planned" role="listitem">
        <span className="journey-bubble" role="img" aria-label={`${node.title}, coming soon`}>
          <LockGlyph />
        </span>
        {label}
      </div>
    );
  }

  const cls = node.kind === "mine" ? "journey-node--mine" : "journey-node--basecamp";
  const aria = node.kind === "basecamp" ? `${node.title}, opens in Base Camp` : node.title;
  return (
    <div ref={bubbleRef} className={`journey-node ${cls}`} role="listitem">
      <a className="journey-bubble" href={node.href} aria-label={aria}>
        {node.kind === "mine" ? <PlayGlyph /> : <StarGlyph />}
      </a>
      {label}
      {node.kind === "basecamp" && <span className="journey-node__tag">Base Camp</span>}
    </div>
  );
}

function UnitGraph({ unit }: { unit: JourneyUnit }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLElement | null>>({});
  const [paths, setPaths] = useState<Path[]>([]);

  const layers = useMemo(() => unitLayers(unit.nodes, skillEdges), [unit.nodes]);
  const unitEdgeList = useMemo(() => {
    const ids = new Set(unit.nodes.map((n) => n.skillId));
    return skillEdges.filter((e) => ids.has(e.from) && ids.has(e.to));
  }, [unit.nodes]);

  const layout = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const origin = wrap.getBoundingClientRect();
    const next: Path[] = [];
    for (const edge of unitEdgeList) {
      const fromEl = nodeRefs.current[edge.from];
      const toEl = nodeRefs.current[edge.to];
      if (!fromEl || !toEl) continue;
      next.push({
        id: `${edge.from}__${edge.to}`,
        d: connector(fromEl.getBoundingClientRect(), toEl.getBoundingClientRect(), origin),
      });
    }
    setPaths(next);
  }, [unitEdgeList]);

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
  }, [layout]);

  return (
    <div className="journey-graph" ref={wrapRef}>
      <svg className="journey-graph__edges" aria-hidden="true">
        {paths.map((path) => (
          <g key={path.id}>
            <path d={path.d} className="journey-edge journey-edge--halo" />
            <path d={path.d} className="journey-edge journey-edge--line" />
          </g>
        ))}
      </svg>
      {layers.map((layer, i) => (
        <div
          key={`${unit.id}-layer-${i}`}
          className="journey-layer"
          role="list"
          aria-label={i === 0 ? `${unit.title}, starting skills` : `${unit.title}, layer ${i}`}
        >
          {layer.map((node) => (
            <NodeBubble
              key={node.skillId}
              node={node}
              bubbleRef={(el) => {
                nodeRefs.current[node.skillId] = el;
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Journey() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollTop = savedScrollTop;
  }, []);

  return (
    <div
      className="journey"
      ref={scrollerRef}
      onScroll={(e) => {
        if (performance.now() >= muteScrollUntil) savedScrollTop = e.currentTarget.scrollTop;
      }}
      onPointerDownCapture={(e) => {
        if (!(e.target as HTMLElement).closest("a.journey-bubble")) return;
        const el = scrollerRef.current;
        if (!el) return;
        savedScrollTop = el.scrollTop;
        muteScrollUntil = performance.now() + 800;
      }}
    >
      <SiteHeader current="journey" />
      <div className="journey__shell">
        <main className="journey__main">
          <div className="journey__intro">
            <h1>Journey</h1>
          </div>

          {journeyUnits.map((unit) => (
            <section key={unit.id} className={`journey-unit journey-unit--${unit.block}`} aria-labelledby={`unit-${unit.id}`}>
              <div className="journey-unit__head">
                <span className="journey-unit__n">Unit {unit.n}</span>
                <h2 id={`unit-${unit.id}`}>
                  <Rich>{unit.title}</Rich>
                </h2>
                <p>{unit.blurb}</p>
                <p className="journey-unit__prereqs">{formatPrereqUnits(unit.prereqTitles)}</p>
              </div>
              <UnitGraph unit={unit} />
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}
