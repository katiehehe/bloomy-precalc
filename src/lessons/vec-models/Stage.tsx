import type { ReactNode } from "react";
import type { Plane } from "../../components/Plane";
import Tex from "../../components/Tex";
import VectorPlane, { type VecArrow, type VectorSpec } from "../../components/VectorPlane";
import type { LessonFigureProps } from "../types";

type Mode = "forces" | "resultant" | "navigation" | "balance";

/** World half-range the eval harness reads for plot bounds. */
const HALF: Record<Mode, number> = { forces: 4.6, resultant: 4.6, navigation: 4.8, balance: 7.6 };
/** Tighter watch-stage window so the crate and arrows fill the panel. */
const SCENE_HALF: Record<Mode, number> = { forces: 3.2, resultant: 3.2, navigation: 3.3, balance: 5.8 };
/** Shift the view toward the first quadrant so empty quadrants do not dominate. */
const SCENE_PAN: Record<Mode, { x: number; y: number }> = {
  forces: { x: 1.4, y: 1.75 },
  resultant: { x: 1.4, y: 1.75 },
  navigation: { x: 1.35, y: 1.7 },
  balance: { x: 2.05, y: 2.15 },
};
const PLOT_PAN: Record<Mode, { x: number; y: number }> = {
  forces: { x: 1.5, y: 1.6 },
  resultant: { x: 1.5, y: 1.6 },
  navigation: { x: 1.5, y: 1.6 },
  balance: { x: 1.6, y: 1.8 },
};

/** Slider units per world unit on the interactive balance slide. */
const SCALE = 20;
/** The fixed load on the balance slide (also the tip the second force starts from). */
const F1 = { x: 3, y: 4 };
/** Direction of the (3, 4) resultant, from the positive x-axis, in degrees. */
const DIR_34 = (Math.atan2(4, 3) * 180) / Math.PI;

const clampSlider = (v: number) => Math.max(-100, Math.min(100, v));

/** At most two decimals, and never a signed zero. */
const trim = (n: number) => {
  const r = Number(n.toFixed(2));
  const v = Object.is(r, -0) ? 0 : r;
  return Number.isInteger(v) ? String(v) : v.toFixed(2);
};

/** A crate sitting on a ground line, used on the force and balance slides. */
function crateOnGround(plane: Plane) {
  const crateW = 1.05;
  const crateH = 0.72;
  const groundY = -crateH / 2;
  const x = plane.sx(-crateW / 2);
  const y = plane.sy(crateH / 2);
  return (
    <g>
      <line
        x1={16}
        y1={plane.sy(groundY)}
        x2={plane.size - 16}
        y2={plane.sy(groundY)}
        stroke="var(--muted)"
        strokeWidth={2.6}
        strokeLinecap="round"
      />
      <rect
        x={x}
        y={y}
        width={crateW * plane.unit}
        height={crateH * plane.unitY}
        rx={5}
        fill="var(--primary)"
        fillOpacity={0.16}
        stroke="var(--primary)"
        strokeOpacity={0.55}
        strokeWidth={1.8}
      />
      <text
        x={plane.sx(crateW / 2 + 0.7)}
        y={plane.sy(groundY) + 18}
        textAnchor="middle"
        fill="var(--muted)"
        style={{ fontSize: 13, fontWeight: 700 }}
      >
        east
      </text>
    </g>
  );
}

/** A small east-facing plane at the origin for the navigation slides. */
function planeCraft(plane: Plane) {
  const pts = [
    [0.72, 0],
    [-0.36, 0.28],
    [-0.18, 0],
    [-0.36, -0.28],
  ]
    .map(([x, y]) => `${plane.sx(x)},${plane.sy(y)}`)
    .join(" ");
  return (
    <polygon
      points={pts}
      fill="var(--primary)"
      fillOpacity={0.16}
      stroke="var(--primary)"
      strokeOpacity={0.55}
      strokeWidth={1.6}
      strokeLinejoin="round"
    />
  );
}

/** A screen-space arc between two standard-position angles (y grows downward). */
function arcPath(cx: number, cy: number, fromDeg: number, toDeg: number, r: number) {
  const span = toDeg - fromDeg;
  const steps = Math.max(2, Math.ceil(Math.abs(span) / 3));
  let d = "";
  for (let i = 0; i <= steps; i += 1) {
    const deg = fromDeg + (span * i) / steps;
    const a = (deg * Math.PI) / 180;
    const x = cx + Math.cos(a) * r;
    const y = cy - Math.sin(a) * r;
    d += `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  return d.trim();
}

export default function VecModelsStage(props: LessonFigureProps) {
  const { slide, values, reveal, drawProgress, setValue } = props;
  const mode = (slide.mode as Mode) ?? "forces";
  const plotting = Boolean(props.plot);
  const half = plotting ? (HALF[mode] ?? 6) : (SCENE_HALF[mode] ?? 3.4);
  const pan = plotting ? PLOT_PAN[mode] : SCENE_PAN[mode];
  const showDock = Boolean(reveal.dock);

  let spec: VectorSpec;
  let dock: ReactNode = null;
  let onDrag: ((wx: number, wy: number) => void) | undefined;

  if (mode === "forces") {
    const fracF1 = reveal.f1 ? (reveal.f2 ? 1 : drawProgress) : 0;
    const fracF2 = reveal.f2 ? (reveal.sum ? 1 : drawProgress) : 0;
    const fracR = reveal.sum ? drawProgress : 0;
    const arrows: VecArrow[] = [];
    if (reveal.f1) arrows.push({ x1: 0, y1: 0, x2: 3, y2: 0, tone: "a", label: "F\u2081", width: 4.2, fraction: fracF1 });
    // F2 and R both tip at (3, 4), so F2's label rides beside its shaft instead.
    if (reveal.f2) arrows.push({ x1: 3, y1: 0, x2: 3, y2: 4, tone: "b", label: "F\u2082", width: 4.2, labelAt: "mid", labelDx: 22, fraction: fracF2 });
    if (reveal.sum) arrows.push({ x1: 0, y1: 0, x2: 3, y2: 4, tone: "primary", label: "R", width: 5, fraction: fracR });
    spec = {
      aria: "Two forces, F1 = (3, 0) east and F2 = (0, 4) north, added tip to tail to a resultant R = (3, 4) on a crate.",
      arrows,
      underlay: (plane) => crateOnGround(plane),
    };
    dock = (
      <div className="formula-list">
        <Tex>{"F_1 = (3,\\ 0)"}</Tex>
        <Tex>{"F_2 = (0,\\ 4)"}</Tex>
        <Tex>{"R = F_1 + F_2 = (3,\\ 4)"}</Tex>
      </div>
    );
  } else if (mode === "resultant") {
    const fracR = reveal.sum ? drawProgress : 0;
    const arrows: VecArrow[] = [];
    if (reveal.sum)
      arrows.push({ x1: 0, y1: 0, x2: 3, y2: 4, tone: "primary", label: "R", width: 4.4, legs: Boolean(reveal.legs), fraction: fracR });
    spec = {
      aria: "The resultant R = (3, 4) with component legs 3 and 4 and its direction angle about 53 degrees from east.",
      arrows,
      angle: reveal.angle ? { fromDeg: 0, toDeg: DIR_34, label: "\u03b8", tone: "primary" } : undefined,
      underlay: (plane) => crateOnGround(plane),
    };
    dock = (
      <div className="formula-list">
        <Tex>{"R = (3,\\ 4)"}</Tex>
        <Tex>{"|R| = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5"}</Tex>
        <Tex>{"\\theta = \\arctan\\dfrac{4}{3} \\approx 53.13^\\circ"}</Tex>
      </div>
    );
  } else if (mode === "navigation") {
    const fracAir = reveal.air ? (reveal.wind ? 1 : drawProgress) : 0;
    const fracWind = reveal.wind ? (reveal.sum ? 1 : drawProgress) : 0;
    const fracGround = reveal.sum ? drawProgress : 0;
    const arrows: VecArrow[] = [];
    if (reveal.air) arrows.push({ x1: 0, y1: 0, x2: 3, y2: 0, tone: "a", label: "air", width: 4.2, fraction: fracAir });
    // wind and ground both tip at (3, 4); wind's label rides beside its shaft.
    if (reveal.wind) arrows.push({ x1: 3, y1: 0, x2: 3, y2: 4, tone: "b", label: "wind", width: 4.2, labelAt: "mid", labelDx: 24, fraction: fracWind });
    if (reveal.sum) arrows.push({ x1: 0, y1: 0, x2: 3, y2: 4, tone: "primary", label: "ground", width: 5, fraction: fracGround });
    spec = {
      aria: "Air velocity (30, 0) plus wind velocity (0, 40) giving a ground velocity (30, 40), with a compass rose where each unit is 10 km/h.",
      arrows,
      underlay: (plane) => planeCraft(plane),
      angle: reveal.angle ? { fromDeg: 0, toDeg: DIR_34, label: "\u03b8", tone: "primary" } : undefined,
      overlay: (plane) => {
        const cx = plane.sx(0);
        const cy = plane.sy(0);
        const els: ReactNode[] = [];
        if (reveal.compass) {
          const letter = (key: string, x: number, y: number, text: string) => (
            <text key={key} x={plane.sx(x)} y={plane.sy(y) + 4} textAnchor="middle" fill="var(--muted)" style={{ fontSize: 15, fontWeight: 700 }}>
              {text}
            </text>
          );
          els.push(letter("N", 1.15, 4.35, "N"), letter("E", 3.45, -0.15, "E"), letter("S", 1.15, -0.55, "S"), letter("W", -0.5, 1.15, "W"));
        }
        if (reveal.bearing) {
          els.push(
            <line
              key="north-ray"
              x1={cx}
              y1={cy}
              x2={plane.sx(0)}
              y2={22}
              stroke="var(--muted)"
              strokeWidth={1.6}
              strokeDasharray="5 5"
            />,
          );
          els.push(<path key="bearing-arc" d={arcPath(cx, cy, DIR_34, 90, 52)} fill="none" stroke="var(--accent)" strokeWidth={2.4} strokeLinecap="round" />);
          const mid = ((DIR_34 + 90) / 2) * (Math.PI / 180);
          els.push(
            <text key="bearing-label" x={cx + Math.cos(mid) * 66} y={cy - Math.sin(mid) * 66 + 4} textAnchor="middle" fill="var(--accent)" style={{ fontSize: 14, fontWeight: 700 }}>
              B
            </text>,
          );
        }
        return <g>{els}</g>;
      },
    };
    dock = (
      <div className="formula-list">
        <Tex>{"v_{\\text{air}} = (30,\\ 0), \\quad v_{\\text{wind}} = (0,\\ 40)"}</Tex>
        <Tex>{"v_{\\text{ground}} = (30,\\ 40)"}</Tex>
        <Tex>{"\\text{ground speed} = |v_{\\text{ground}}| = 50 \\text{ km/h}"}</Tex>
        <Tex>{"\\theta \\approx 53.13^\\circ \\text{ (from east)}"}</Tex>
        {reveal.bearing && <Tex>{"\\text{bearing} = 90^\\circ - \\theta \\approx 36.87^\\circ \\; (\\mathrm{N}\\,37^\\circ\\mathrm{E})"}</Tex>}
      </div>
    );
  } else {
    // balance (interactive)
    const px = (values.f2x ?? 40) / SCALE;
    const py = (values.f2y ?? 20) / SCALE;
    const rx = F1.x + px;
    const ry = F1.y + py;
    const mag = Math.hypot(rx, ry);
    const dir = ((Math.atan2(ry, rx) * 180) / Math.PI + 360) % 360;
    const balanced = mag < 0.2;
    const arrows: VecArrow[] = [];
    if (reveal.f1) arrows.push({ x1: 0, y1: 0, x2: F1.x, y2: F1.y, tone: "a", label: "F\u2081", width: 3.6 });
    // F2 shares its head with R (R = F1 + F2), so F2's label rides beside its shaft.
    if (reveal.f2) arrows.push({ x1: F1.x, y1: F1.y, x2: rx, y2: ry, tone: "b", label: "F\u2082", labelAt: "mid", labelDx: 18, labelDy: -8 });
    if (reveal.sum) arrows.push({ x1: 0, y1: 0, x2: rx, y2: ry, tone: "primary", label: mag > 0.35 ? "R" : undefined, width: 4.4 });
    spec = {
      aria: `A fixed load F1 = (3, 4), an adjustable force F2 = (${trim(px)}, ${trim(py)}), and the resultant R = (${trim(rx)}, ${trim(ry)}) with magnitude ${trim(mag)}.`,
      arrows,
      underlay: (plane) => crateOnGround(plane),
    };
    onDrag = (wx, wy) => {
      setValue("f2x", () => clampSlider(Math.round((wx - F1.x) * SCALE)));
      setValue("f2y", () => clampSlider(Math.round((wy - F1.y) * SCALE)));
    };
    dock = (
      <div className="formula-list">
        <Tex>{"F_1 = (3,\\ 4)"}</Tex>
        <Tex>{`F_2 = (${trim(px)},\\ ${trim(py)})`}</Tex>
        <Tex>{`R = F_1 + F_2 = (${trim(rx)},\\ ${trim(ry)})`}</Tex>
        {balanced ? (
          <Tex>{"|R| = 0 \\quad \\text{(equilibrium)}"}</Tex>
        ) : (
          <Tex>{`|R| = ${trim(mag)}, \\quad \\theta \\approx ${trim(dir)}^\\circ`}</Tex>
        )}
      </div>
    );
  }

  return (
    <section className={`figure-area has-dock`}>
      <div className="figure-frame">
        <div className="figure-slot figure-slot--scene">
          <VectorPlane {...props} spec={spec} half={half} onDrag={onDrag} hideGrid pan={pan} />
        </div>
        <div className="figure-dock figure-dock--hold figure-dock--fit">{showDock ? dock : null}</div>
      </div>
    </section>
  );
}
