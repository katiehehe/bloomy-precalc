/**
 * Map a client (screen) coordinate to the SVG's own user coordinate space, the
 * one its `viewBox` defines. Using the live screen CTM makes this correct even
 * when the SVG is letterboxed by `preserveAspectRatio` (a square viewBox sitting
 * in a non-square box), scaled by CSS, scrolled, or zoomed. Without this a click
 * lands off to one side because a naive `clientX / rect.width` ignores the empty
 * margins the aspect-ratio fit leaves on the longer edge.
 *
 * Returns coordinates in viewBox units, so callers can feed the result straight
 * into their existing viewBox-to-world mapping (for example `plane.wx`).
 */
export function clientToSvgPoint(
  svg: SVGSVGElement,
  clientX: number,
  clientY: number,
): { x: number; y: number } {
  const ctm = svg.getScreenCTM();
  if (ctm) {
    const point = svg.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    const local = point.matrixTransform(ctm.inverse());
    return { x: local.x, y: local.y };
  }
  // Fallback: assume the viewBox fills the element (correct when they share an
  // aspect ratio) if the CTM is somehow unavailable.
  const rect = svg.getBoundingClientRect();
  const box = svg.viewBox.baseVal;
  const width = box && box.width ? box.width : rect.width;
  const height = box && box.height ? box.height : rect.height;
  return {
    x: rect.width ? ((clientX - rect.left) / rect.width) * width : 0,
    y: rect.height ? ((clientY - rect.top) / rect.height) * height : 0,
  };
}
