export const DEG_TO_RAD = Math.PI / 180;

export const toRadians = (degrees: number) => degrees * DEG_TO_RAD;

export const normalizeDegrees = (degrees: number) => ((degrees % 360) + 360) % 360;

export const signedDegrees = (degrees: number) => {
  const normalized = normalizeDegrees(degrees);
  return normalized > 180 ? normalized - 360 : normalized;
};

export function formatValue(value: number, digits = 3) {
  const rounded = Number(value.toFixed(digits));
  return (Object.is(rounded, -0) ? 0 : rounded).toFixed(digits);
}

export function quadrantOf(degrees: number): string {
  const normalized = normalizeDegrees(degrees);
  const offAxis = normalized % 90;
  if (offAxis < 0.6 || offAxis > 89.4) return "on an axis";
  if (normalized < 90) return "I";
  if (normalized < 180) return "II";
  if (normalized < 270) return "III";
  return "IV";
}

/** Stops the arc short of the terminal side so the arrowhead never crosses it. */
export function arcEndAngle(degrees: number, gap = 8) {
  if (Math.abs(degrees) <= gap * 1.5) return degrees;
  return degrees - Math.sign(degrees) * gap;
}

/**
 * Samples the swept angle so the arc always travels from the initial side in the
 * true direction of rotation, and widens slightly on each extra turn.
 */
export function angleArcPath(degrees: number, center: number, baseRadius: number, growth = 10) {
  if (Math.abs(degrees) < 0.6) return "";
  const steps = Math.max(2, Math.min(900, Math.ceil(Math.abs(degrees) / 2.5)));
  let path = "";
  for (let i = 0; i <= steps; i += 1) {
    const swept = (i / steps) * degrees;
    const radius = baseRadius + Math.min(Math.abs(swept) / 360, 4) * growth;
    const x = center + Math.cos(toRadians(swept)) * radius;
    const y = center - Math.sin(toRadians(swept)) * radius;
    path += `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  return path.trim();
}

export function arcArrowPath(degrees: number, center: number, baseRadius: number, growth = 10) {
  if (Math.abs(degrees) < 8) return "";
  const direction = Math.sign(degrees);
  const angle = toRadians(degrees);
  const radius = baseRadius + Math.min(Math.abs(degrees) / 360, 4) * growth;
  const x = center + Math.cos(angle) * radius;
  const y = center - Math.sin(angle) * radius;
  const tangentX = -Math.sin(angle) * direction;
  const tangentY = -Math.cos(angle) * direction;
  const normalX = -tangentY;
  const normalY = tangentX;
  const size = 8;
  const tip = [x + tangentX * size, y + tangentY * size];
  const left = [x + normalX * size * 0.5, y + normalY * size * 0.5];
  const right = [x - normalX * size * 0.5, y - normalY * size * 0.5];
  return `M${tip[0].toFixed(2)} ${tip[1].toFixed(2)} L${left[0].toFixed(2)} ${left[1].toFixed(2)} L${right[0].toFixed(2)} ${right[1].toFixed(2)} Z`;
}

export function quadrantWedgePath(degrees: number, center: number, radius: number) {
  const start = Math.floor(normalizeDegrees(degrees) / 90) * 90;
  const end = start + 90;
  const sx = center + Math.cos(toRadians(start)) * radius;
  const sy = center - Math.sin(toRadians(start)) * radius;
  const ex = center + Math.cos(toRadians(end)) * radius;
  const ey = center - Math.sin(toRadians(end)) * radius;
  return `M${center} ${center} L${sx.toFixed(2)} ${sy.toFixed(2)} A${radius} ${radius} 0 0 0 ${ex.toFixed(2)} ${ey.toFixed(2)} Z`;
}
