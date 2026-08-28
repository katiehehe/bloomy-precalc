import { formatValue, toRadians } from "../lib/trig";

const WIDTH = 340;
const HEIGHT = 104;
const MID = HEIGHT / 2;
const AMPLITUDE = 34;
const WINDOW = 270;
const PX_PER_DEGREE = WIDTH / (WINDOW * 2);

function curve(angle: number, kind: "sin" | "cos") {
  let path = "";
  for (let i = 0; i <= 180; i += 1) {
    const sample = angle - WINDOW + (i / 180) * WINDOW * 2;
    const value = kind === "sin" ? Math.sin(toRadians(sample)) : Math.cos(toRadians(sample));
    const x = (sample - angle) * PX_PER_DEGREE + WIDTH / 2;
    const y = MID - value * AMPLITUDE;
    path += `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  return path.trim();
}

function ticks(angle: number) {
  const marks: { x: number; label: string }[] = [];
  const first = Math.ceil((angle - WINDOW) / 180) * 180;
  for (let value = first; value <= angle + WINDOW; value += 180) {
    marks.push({
      x: (value - angle) * PX_PER_DEGREE + WIDTH / 2,
      label: `${value}°`,
    });
  }
  return marks;
}

function Wave({ angle, kind }: { angle: number; kind: "sin" | "cos" }) {
  const value = kind === "sin" ? Math.sin(toRadians(angle)) : Math.cos(toRadians(angle));
  const name = kind === "sin" ? "y = sin θ" : "y = cos θ";

  return (
    <figure className={`wave wave--${kind}`}>
      <figcaption>
        <span>{name}</span>
        <strong>{formatValue(value)}</strong>
      </figcaption>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={`${name}, current value ${formatValue(value)}`}>
        {ticks(angle).map((tick) => (
          <g key={tick.label}>
            <line x1={tick.x} y1="10" x2={tick.x} y2={HEIGHT - 16} className="wave-tick" />
            <text x={tick.x} y={HEIGHT - 3} className="wave-tick-label" textAnchor="middle">
              {tick.label}
            </text>
          </g>
        ))}
        <line x1="0" y1={MID} x2={WIDTH} y2={MID} className="wave-axis" />
        <path d={curve(angle, kind)} className="wave-curve" />
        <line x1={WIDTH / 2} y1="6" x2={WIDTH / 2} y2={HEIGHT - 16} className="wave-playhead" />
        <circle cx={WIDTH / 2} cy={MID - value * AMPLITUDE} r="5.5" className="wave-dot" />
      </svg>
    </figure>
  );
}

export default function WaveGraphs({ angle }: { angle: number }) {
  return (
    <div className="waves">
      <Wave angle={angle} kind="sin" />
      <Wave angle={angle} kind="cos" />
    </div>
  );
}
