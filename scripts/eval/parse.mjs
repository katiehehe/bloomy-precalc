// Text-level parsing helpers for the lesson evals. These read raw source so they
// can catch things the runtime data cannot: em dashes, unbalanced KaTeX, reveal
// flags that a figure reads but nobody sets, sample dots that leak an answer.

/** Every line containing an em dash (U+2014). The house style forbids them. */
export function findEmDashes(text) {
  const hits = [];
  text.split("\n").forEach((line, i) => {
    if (line.includes("\u2014")) hits.push({ line: i + 1, text: line.trim() });
  });
  return hits;
}

/** Count unescaped `$` so we can check KaTeX inline-math delimiters are balanced. */
export function dollarParityBad(s) {
  const count = (s.match(/(?<!\\)\$/g) || []).length;
  return count % 2 !== 0;
}

/** \left ... \right must pair up or KaTeX throws at runtime. */
export function leftRightUnbalanced(s) {
  const left = (s.match(/\\left/g) || []).length;
  const right = (s.match(/\\right/g) || []).length;
  return left !== right;
}

/** Flags atan/atan2 leaking into learner-facing copy (should read arctan / tan^{-1}). */
export function hasRawArctan(s) {
  return /\batan2?\b|operatorname\{\s*atan/i.test(s);
}

/** Curly-brace balance for a snippet (crude TeX sanity for \frac{..}{..} etc.). */
export function braceUnbalanced(s) {
  let depth = 0;
  for (let i = 0; i < s.length; i += 1) {
    const c = s[i];
    if (c === "{" && s[i - 1] !== "\\") depth += 1;
    if (c === "}" && s[i - 1] !== "\\") depth -= 1;
    if (depth < 0) return true;
  }
  return depth !== 0;
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * How a figure uses the reveal bag.
 *   reads:    flag names read as `reveal.foo`, `alias.foo`, or destructured.
 *   forwards: true when the bag is passed wholesale to a child (aliased with a
 *             cast, spread, or handed to a component prop) so the real reads live
 *             in code we do not scan. When true, callers should skip the
 *             set-vs-read flag consistency check to avoid false positives.
 */
export function scanRevealUsage(tsx) {
  const reads = new Set();
  for (const m of tsx.matchAll(/reveal\??\.([A-Za-z_$][\w$]*)/g)) reads.add(m[1]);
  for (const m of tsx.matchAll(/(?:const|let)\s*\{([^}]*)\}\s*=\s*(?:props\.)?reveal\b/g)) {
    for (const raw of m[1].split(",")) {
      const name = raw.split(":")[0].split("=")[0].trim();
      if (name && name !== "...") reads.add(name.replace(/^\.\.\./, ""));
    }
  }
  // Aliases: `const overlays = reveal` / `const overlays = reveal as Overlays`.
  const aliases = new Set();
  for (const m of tsx.matchAll(/(?:const|let)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:props\.)?reveal\b(?!\s*[.?])/g))
    aliases.add(m[1]);
  for (const a of aliases) {
    for (const m of tsx.matchAll(new RegExp(escapeRe(a) + "\\??\\.([A-Za-z_$][\\w$]*)", "g"))) reads.add(m[1]);
  }
  let forwards = false;
  if (/\breveal\b\s*as\s+/.test(tsx)) forwards = true;
  if (/\{\s*\.\.\.reveal\s*\}/.test(tsx)) forwards = true;
  if (/[A-Za-z_$][\w$]*=\{\s*reveal\s*\}/.test(tsx)) forwards = true;
  for (const a of aliases) if (new RegExp("=\\{\\s*" + escapeRe(a) + "\\s*\\}").test(tsx)) forwards = true;
  return { reads, forwards };
}

/** Walk from the first `{` after `start` to its matching close brace. */
function matchBraces(text, start) {
  const open = text.indexOf("{", start);
  if (open < 0) return null;
  let depth = 0;
  for (let i = open; i < text.length; i += 1) {
    if (text[i] === "{") depth += 1;
    if (text[i] === "}") {
      depth -= 1;
      if (depth === 0) return text.slice(open, i + 1);
    }
  }
  return null;
}

/** Walk from the first `[` after `start` to its matching close bracket. */
function matchBrackets(text, start) {
  const open = text.indexOf("[", start);
  if (open < 0) return null;
  let depth = 0;
  for (let i = open; i < text.length; i += 1) {
    if (text[i] === "[") depth += 1;
    if (text[i] === "]") {
      depth -= 1;
      if (depth === 0) return text.slice(open, i + 1);
    }
  }
  return null;
}

/**
 * Parse the `SAMPLES` map in a Figure, keyed by mode, to the sample labels it
 * draws. Used to catch a demonstrated dot that gives away a plot answer.
 * Returns { byMode: { mode: [labels] }, all: [labels], parsed: boolean }.
 */
export function parseSampleLabels(tsx) {
  const idx = tsx.search(/\bSAMPLES\b/);
  const all = [];
  for (const m of tsx.matchAll(/label:\s*"([^"]+)"/g)) all.push(m[1]);
  if (idx < 0) return { byMode: {}, all, parsed: false };
  const obj = matchBraces(tsx, idx);
  if (!obj) return { byMode: {}, all, parsed: false };
  const byMode = {};
  for (const m of obj.matchAll(/([A-Za-z_$][\w$]*)\s*:\s*\[/g)) {
    const mode = m[1];
    const arr = matchBrackets(obj, m.index);
    if (!arr) continue;
    byMode[mode] = [...arr.matchAll(/label:\s*"([^"]+)"/g)].map((x) => x[1]);
  }
  return { byMode, all, parsed: true };
}

/**
 * Best-effort extraction of the world half-range per mode from a Figure, so plot
 * targets can be checked against the visible plane. Handles:
 *   const HALF: Record<Mode, number> = { single: 5.5, add: 7.5 }
 *   const HALF = 5.5
 *   makePlane(SIZE, 6)
 * Returns { byMode, scalar, parsed }.
 */
export function parseHalfBounds(tsx) {
  const byMode = {};
  let scalar = null;
  let parsed = false;

  const mapDecl = tsx.match(/const\s+HALF\b[^=]*=\s*{/);
  if (mapDecl) {
    const obj = matchBraces(tsx, mapDecl.index);
    if (obj) {
      for (const m of obj.matchAll(/([A-Za-z_$][\w$]*)\s*:\s*([\d.]+)/g)) {
        byMode[m[1]] = Number(m[2]);
        parsed = true;
      }
    }
  }
  const scalarDecl = tsx.match(/const\s+HALF\b[^=]*=\s*([\d.]+)\s*;/);
  if (scalarDecl) {
    scalar = Number(scalarDecl[1]);
    parsed = true;
  }
  if (!parsed) {
    const mk = tsx.match(/makePlane\(\s*\w+\s*,\s*([\d.]+)\s*\)/);
    if (mk) {
      scalar = Number(mk[1]);
      parsed = true;
    }
  }
  return { byMode, scalar, parsed };
}

/** Normalize a math-y label for comparison: drop spaces, $, and \,. */
export function normLabel(s) {
  return String(s)
    .replace(/\$/g, "")
    .replace(/\\[,;:!]/g, "")
    .replace(/\s+/g, "")
    .toLowerCase();
}
