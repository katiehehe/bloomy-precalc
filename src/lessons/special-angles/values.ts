/** Exact special-angle data shared by the figure and the slides. */

export type AngleExact = {
  deg: number;
  /** World coordinates on the unit circle. */
  x: number;
  y: number;
  cosTex: string;
  sinTex: string;
  tanTex: string;
  secTex: string;
  cscTex: string;
  cotTex: string;
  /** Compact SVG label, unicode, no KaTeX. */
  coordLabel: string;
};

const U = "\\text{undefined}";
const S2 = "\\tfrac{\\sqrt{2}}{2}";
const S3 = "\\tfrac{\\sqrt{3}}{2}";
const H = "\\tfrac{1}{2}";
const T3 = "\\tfrac{\\sqrt{3}}{3}";
const S23 = "\\tfrac{2\\sqrt{3}}{3}";

const R2 = Math.SQRT1_2;
const R3 = Math.sqrt(3) / 2;

export const UNDEF = U;

export const ANGLES: Record<number, AngleExact> = {
  0: {
    deg: 0, x: 1, y: 0,
    cosTex: "1", sinTex: "0", tanTex: "0", secTex: "1", cscTex: U, cotTex: U,
    coordLabel: "(1, 0)",
  },
  90: {
    deg: 90, x: 0, y: 1,
    cosTex: "0", sinTex: "1", tanTex: U, secTex: U, cscTex: "1", cotTex: "0",
    coordLabel: "(0, 1)",
  },
  180: {
    deg: 180, x: -1, y: 0,
    cosTex: "-1", sinTex: "0", tanTex: "0", secTex: "-1", cscTex: U, cotTex: U,
    coordLabel: "(\u22121, 0)",
  },
  270: {
    deg: 270, x: 0, y: -1,
    cosTex: "0", sinTex: "-1", tanTex: U, secTex: U, cscTex: "-1", cotTex: "0",
    coordLabel: "(0, \u22121)",
  },
  360: {
    deg: 360, x: 1, y: 0,
    cosTex: "1", sinTex: "0", tanTex: "0", secTex: "1", cscTex: U, cotTex: U,
    coordLabel: "(1, 0)",
  },
  45: {
    deg: 45, x: R2, y: R2,
    cosTex: S2, sinTex: S2, tanTex: "1", secTex: "\\sqrt{2}", cscTex: "\\sqrt{2}", cotTex: "1",
    coordLabel: "(\u221a2/2, \u221a2/2)",
  },
  135: {
    deg: 135, x: -R2, y: R2,
    cosTex: `-${S2}`, sinTex: S2, tanTex: "-1", secTex: "-\\sqrt{2}", cscTex: "\\sqrt{2}", cotTex: "-1",
    coordLabel: "(\u2212\u221a2/2, \u221a2/2)",
  },
  225: {
    deg: 225, x: -R2, y: -R2,
    cosTex: `-${S2}`, sinTex: `-${S2}`, tanTex: "1", secTex: "-\\sqrt{2}", cscTex: "-\\sqrt{2}", cotTex: "1",
    coordLabel: "(\u2212\u221a2/2, \u2212\u221a2/2)",
  },
  315: {
    deg: 315, x: R2, y: -R2,
    cosTex: S2, sinTex: `-${S2}`, tanTex: "-1", secTex: "\\sqrt{2}", cscTex: "-\\sqrt{2}", cotTex: "-1",
    coordLabel: "(\u221a2/2, \u2212\u221a2/2)",
  },
  30: {
    deg: 30, x: R3, y: 0.5,
    cosTex: S3, sinTex: H, tanTex: T3, secTex: S23, cscTex: "2", cotTex: "\\sqrt{3}",
    coordLabel: "(\u221a3/2, 1/2)",
  },
  60: {
    deg: 60, x: 0.5, y: R3,
    cosTex: H, sinTex: S3, tanTex: "\\sqrt{3}", secTex: "2", cscTex: S23, cotTex: T3,
    coordLabel: "(1/2, \u221a3/2)",
  },
  150: {
    deg: 150, x: -R3, y: 0.5,
    cosTex: `-${S3}`, sinTex: H, tanTex: `-${T3}`, secTex: `-${S23}`, cscTex: "2", cotTex: "-\\sqrt{3}",
    coordLabel: "(\u2212\u221a3/2, 1/2)",
  },
  210: {
    deg: 210, x: -R3, y: -0.5,
    cosTex: `-${S3}`, sinTex: `-${H}`, tanTex: T3, secTex: `-${S23}`, cscTex: "-2", cotTex: "\\sqrt{3}",
    coordLabel: "(\u2212\u221a3/2, \u22121/2)",
  },
  330: {
    deg: 330, x: R3, y: -0.5,
    cosTex: S3, sinTex: `-${H}`, tanTex: `-${T3}`, secTex: S23, cscTex: "-2", cotTex: "-\\sqrt{3}",
    coordLabel: "(\u221a3/2, \u22121/2)",
  },
  120: {
    deg: 120, x: -0.5, y: R3,
    cosTex: `-${H}`, sinTex: S3, tanTex: "-\\sqrt{3}", secTex: "-2", cscTex: S23, cotTex: `-${T3}`,
    coordLabel: "(\u22121/2, \u221a3/2)",
  },
  240: {
    deg: 240, x: -0.5, y: -R3,
    cosTex: `-${H}`, sinTex: `-${S3}`, tanTex: "\\sqrt{3}", secTex: "-2", cscTex: `-${S23}`, cotTex: T3,
    coordLabel: "(\u22121/2, \u2212\u221a3/2)",
  },
  300: {
    deg: 300, x: 0.5, y: -R3,
    cosTex: H, sinTex: `-${S3}`, tanTex: "-\\sqrt{3}", secTex: "2", cscTex: `-${S23}`, cotTex: `-${T3}`,
    coordLabel: "(1/2, \u2212\u221a3/2)",
  },
};

export const AXIS = [0, 90, 180, 270, 360];
export const FAM45 = [45, 135, 225, 315];
export const FAM30 = [30, 150, 210, 330];
export const FAM60 = [60, 120, 240, 300];
export const PAIR3060 = [30, 60];

export const FAMILIES: Record<string, number[]> = {
  axis: AXIS,
  recip: AXIS,
  fam45: FAM45,
  swap60: PAIR3060,
  fam30: FAM30,
  fam60: FAM60,
};

export function angleAt(deg: number): AngleExact {
  return ANGLES[deg] ?? ANGLES[0];
}

export function familyIndex(k: number, family: number[]): number {
  return Math.max(0, Math.min(family.length - 1, Math.round(k)));
}

export function nearestFamilyIndex(deg: number, family: number[]): number {
  const a = ((deg % 360) + 360) % 360;
  let best = 0;
  let bestD = 400;
  for (let i = 0; i < family.length; i += 1) {
    const f = family[i] % 360;
    const d = Math.min(Math.abs(a - f), 360 - Math.abs(a - f));
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  }
  return best;
}
