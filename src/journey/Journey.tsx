import SiteHeader from "../catalog/SiteHeader";
import { journeyStats, journeyUnits, type JourneyNode } from "./data";

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

const OFFSETS = [0, 48, 76, 48, 0, -48, -76, -48];

function NodeBubble({ node, i }: { node: JourneyNode; i: number }) {
  const style = { transform: `translateX(${OFFSETS[i % OFFSETS.length]}px)` };
  const label = <span className="journey-node__label">{node.title}</span>;

  if (node.kind === "planned") {
    return (
      <li className="journey-node journey-node--planned" style={style}>
        <span className="journey-bubble" role="img" aria-label={`${node.title}, coming soon`}>
          <LockGlyph />
        </span>
        {label}
      </li>
    );
  }

  const cls = node.kind === "mine" ? "journey-node--mine" : "journey-node--basecamp";
  const aria = node.kind === "basecamp" ? `${node.title}, opens in Base Camp` : node.title;
  return (
    <li className={`journey-node ${cls}`} style={style}>
      <a className="journey-bubble" href={node.href} aria-label={aria}>
        {node.kind === "mine" ? <PlayGlyph /> : <StarGlyph />}
      </a>
      {label}
      {node.kind === "basecamp" && <span className="journey-node__tag">Base Camp</span>}
    </li>
  );
}

export default function Journey() {
  return (
    <div className="journey">
      <div className="journey__shell">
        <SiteHeader current="journey" />

        <main className="journey__main">
          <div className="journey__intro">
            <h1>Journey</h1>
            <p>
              A straight path through precalculus, one unit at a time. {journeyStats.mine} new lessons are playable
              now, and {journeyStats.basecamp} steps link into Base Camp. The rest are on the way.
            </p>
          </div>

          {journeyUnits.map((unit) => (
            <section key={unit.id} className={`journey-unit journey-unit--${unit.block}`} aria-labelledby={`unit-${unit.id}`}>
              <div className="journey-unit__head">
                <span className="journey-unit__n">Unit {unit.n}</span>
                <h2 id={`unit-${unit.id}`}>{unit.title}</h2>
                <p>{unit.blurb}</p>
              </div>
              <ol className="journey-path">
                {unit.nodes.map((node, i) => (
                  <NodeBubble key={node.skillId} node={node} i={i} />
                ))}
              </ol>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}
