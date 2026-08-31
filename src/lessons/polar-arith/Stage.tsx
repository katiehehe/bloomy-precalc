import Tex from "../../components/Tex";
import ComplexPlane, { type ComplexSpec, type Phasor } from "../../components/ComplexPlane";
import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import type { LessonFigureProps } from "../types";

// The arrows only reach modulus 2, so a tight window keeps them prominent.
const HALF = 3.2;
const R1 = 2;
const R2 = 1;

const trim = (n: number) => {
  const r = Number(n.toFixed(2));
  return Number.isInteger(r) ? String(r) : r.toFixed(2);
};

/** Polar (length, degrees) to a point on the Argand plane. */
function point(r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return { re: r * Math.cos(a), im: r * Math.sin(a) };
}

/** The multiply derivation, revealed one line at a time by flags s1..s5. */
const DERIVE: FlowStep[] = [
  { id: "d0", tex: "(\\cos\\theta_1 + i\\sin\\theta_1)(\\cos\\theta_2 + i\\sin\\theta_2)" },
  {
    id: "d1",
    show: "s1",
    op: "\\text{expand (FOIL)}",
    tex: "\\begin{aligned}&\\cos\\theta_1\\cos\\theta_2 + i\\cos\\theta_1\\sin\\theta_2\\\\&\\quad + i\\sin\\theta_1\\cos\\theta_2 + i^2\\sin\\theta_1\\sin\\theta_2\\end{aligned}",
  },
  {
    id: "d2",
    show: "s2",
    tone: "cancel",
    op: "\\text{use } i^2 = -1",
    tex: "\\begin{aligned}&\\cos\\theta_1\\cos\\theta_2 + i\\cos\\theta_1\\sin\\theta_2\\\\&\\quad + i\\sin\\theta_1\\cos\\theta_2 - \\sin\\theta_1\\sin\\theta_2\\end{aligned}",
  },
  {
    id: "d3",
    show: "s3",
    op: "\\text{group real and imaginary}",
    tex: "\\begin{aligned}&(\\cos\\theta_1\\cos\\theta_2 - \\sin\\theta_1\\sin\\theta_2)\\\\&\\quad + \\, i(\\sin\\theta_1\\cos\\theta_2 + \\cos\\theta_1\\sin\\theta_2)\\end{aligned}",
  },
  {
    id: "d4",
    show: "s4",
    tone: "good",
    result: true,
    op: "\\text{apply the sum identities}",
    tex: "\\cos(\\theta_1 + \\theta_2) + i\\sin(\\theta_1 + \\theta_2)",
  },
  {
    id: "d5",
    show: "s5",
    tone: "good",
    result: true,
    op: "\\text{put the lengths back}",
    tex: "z_1 z_2 = r_1 r_2\\big[\\cos(\\theta_1 + \\theta_2) + i\\sin(\\theta_1 + \\theta_2)\\big]",
  },
];

export default function PolarArithStage(props: LessonFigureProps) {
  const { reveal, slide, values, setValue } = props;
  const mode = slide.mode ?? "geo";

  if (mode === "derive") {
    // Pure FOIL derivation of the product formula, so the algebra stands alone.
    return (
      <section className="figure-area">
        <div className="figure-frame">
          <div className="figure-slot">
            <AlgebraFlow steps={DERIVE} reveal={reveal} heading={"\\text{why the angles add}"} focus />
          </div>
        </div>
      </section>
    );
  }

  const isDiv = mode === "geo-div";
  const t1 = Math.round(values.t1 ?? 30);
  const t2 = Math.round(values.t2 ?? 0);
  const rResult = isDiv ? R1 / R2 : R1 * R2;
  const tResult = isDiv ? t1 - t2 : t1 + t2;

  const z1 = point(R1, t1);
  const z2 = point(R2, t2);
  const res = point(rResult, tResult);

  const p1: Phasor = { re: z1.re, im: z1.im, tone: "a", label: "z\u2081" };
  const p2: Phasor = { re: z2.re, im: z2.im, tone: "b", label: "z\u2082" };
  const pres: Phasor = {
    re: res.re,
    im: res.im,
    tone: "primary",
    label: isDiv ? "z\u2081/z\u2082" : "z\u2081z\u2082",
    arc: Boolean(reveal.resultArc),
  };

  const phasors: Phasor[] = [];
  if (reveal.z1) phasors.push(p1);
  if (reveal.z2) phasors.push(p2);
  if (reveal.result) phasors.push(pres);

  const spec: ComplexSpec = {
    aria: `Complex plane: z1 at angle ${t1} degrees, z2 at angle ${t2} degrees, and the ${
      isDiv ? "quotient" : "product"
    } at angle ${tResult} degrees.`,
    phasors,
  };

  const showDock = Boolean(reveal.dock);

  return (
    <section className={`figure-area${showDock ? " has-dock" : ""}`}>
      <div className="figure-frame">
        <div className="figure-slot">
          <ComplexPlane
            {...props}
            spec={spec}
            half={HALF}
            onDrag={(wx, wy) => {
              const deg = (Math.atan2(wy, wx) * 180) / Math.PI;
              const snapped = Math.max(0, Math.min(180, Math.round(deg / 15) * 15));
              setValue("t1", () => snapped);
            }}
          />
        </div>
        {showDock && (
          <div className="figure-dock">
            <div className="formula-list">
              {isDiv ? (
                <>
                  <Tex>{`|z_1 / z_2| = ${R1} \\div ${R2} = ${trim(rResult)}`}</Tex>
                  <Tex>{`\\arg(z_1 / z_2) = ${t1}^\\circ - ${t2}^\\circ = ${t1 - t2}^\\circ`}</Tex>
                </>
              ) : (
                <>
                  <Tex>{`|z_1 z_2| = ${R1} \\cdot ${R2} = ${trim(rResult)}`}</Tex>
                  <Tex>{`\\arg(z_1 z_2) = ${t1}^\\circ + ${t2}^\\circ = ${t1 + t2}^\\circ`}</Tex>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
