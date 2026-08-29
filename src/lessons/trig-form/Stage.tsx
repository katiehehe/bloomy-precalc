import Tex from "../../components/Tex";
import ComplexPlane, { type ComplexSpec, type Phasor } from "../../components/ComplexPlane";
import type { LessonFigureProps } from "../types";

const HALF = 5.5;

const clampR = (n: number) => Math.max(1, Math.min(5, n));

/** Round to at most two decimals and never render a signed zero. */
const trim = (n: number) => {
  const r = Number(n.toFixed(2));
  const v = Object.is(r, -0) ? 0 : r;
  return Number.isInteger(v) ? String(v) : v.toFixed(2);
};

/** Format a + bi cleanly: collapse a zero part and fix the sign on b. */
const fmtRect = (re: number, im: number) => {
  const aZero = Math.abs(re) < 0.005;
  const bZero = Math.abs(im) < 0.005;
  if (aZero && bZero) return "0";
  if (bZero) return trim(re);
  if (aZero) return `${im < 0 ? "-" : ""}${trim(Math.abs(im))}i`;
  return `${trim(re)} ${im < 0 ? "-" : "+"} ${trim(Math.abs(im))}i`;
};

export default function TrigFormStage(props: LessonFigureProps) {
  const { reveal, values, setValue } = props;
  const r = clampR(values.r ?? 3);
  const theta = values.theta ?? 0;
  const rad = (theta * Math.PI) / 180;
  const re = r * Math.cos(rad);
  const im = r * Math.sin(rad);
  const rDisp = Math.round(r);
  const thetaDisp = Math.round(theta);

  const phasor: Phasor = {
    re,
    im,
    tone: "primary",
    label: reveal.z ? "z" : undefined,
    legs: Boolean(reveal.legs),
    arc: Boolean(reveal.arg),
    arcLabel: reveal.arg ? "\u03b8" : undefined,
    rLabel: reveal.modulus ? "r" : undefined,
  };

  const spec: ComplexSpec = {
    aria: `Complex plane showing z = ${rDisp}(cos ${thetaDisp} degrees + i sin ${thetaDisp} degrees), which is ${fmtRect(re, im)} in rectangular form.`,
    phasors: reveal.z ? [phasor] : [],
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
              const rr = clampR(Math.round(Math.hypot(wx, wy)));
              let deg = Math.round((Math.atan2(wy, wx) * 180) / Math.PI / 30) * 30;
              deg = ((deg % 360) + 360) % 360;
              setValue("r", () => rr);
              setValue("theta", () => deg);
            }}
          />
        </div>
        {showDock && (
          <div className="figure-dock">
            <div className="formula-list">
              <Tex>{`z = ${rDisp}(\\cos ${thetaDisp}^\\circ + i\\sin ${thetaDisp}^\\circ)`}</Tex>
              <Tex>{`z = ${fmtRect(re, im)}`}</Tex>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
