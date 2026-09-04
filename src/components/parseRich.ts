export type Token = {
  text: string;
  bold?: boolean;
  math?: boolean;
  display?: boolean;
  spaceBefore?: boolean;
  /** Join to the previous token: $x$-axis, $n$th, $45^\circ$-$45^\circ$. */
  glue?: boolean;
  /** Tokens that share this id render inside one nowrap span. */
  nowrapGroup?: number;
};

/** Trailing punctuation that should hug the previous word (no space before it). */
const NO_SPACE_BEFORE = /^[.,;:!?)\]}%…’”"']/;
/** Opening punctuation that should hug the next word (no space after it). */
const NO_SPACE_AFTER = /[([{“‘]$/;

/** Hyphen plus a letter: -coordinate, -axis, -intercepts, -values. */
const HYPHEN_SUFFIX = /^-[A-Za-z]/;

function shouldGlueToMath(prev: Token | undefined, word: string, attached: boolean): boolean {
  if (!prev?.math || prev.display) return false;
  // $x$-coordinate, and the common typo $x$ -coordinate (space before the hyphen).
  if (HYPHEN_SUFFIX.test(word)) return true;
  // Attached suffixes with no space in the source: $n$th, $k$th, $1$s.
  if (attached && /^[A-Za-z]/.test(word)) return true;
  // Degree-family names: $45^\circ$-$45^\circ$-$90^\circ$.
  if (attached && word === "-") return true;
  return false;
}

function assignNowrapGroups(tokens: Token[]) {
  let group = 0;
  for (let i = 0; i < tokens.length - 1; i++) {
    const cur = tokens[i];
    const next = tokens[i + 1];
    const join = Boolean(next.glue) || Boolean(cur.glue && (next.math || next.glue));
    if (!join) continue;
    const id = cur.nowrapGroup ?? next.nowrapGroup ?? ++group;
    cur.nowrapGroup = id;
    next.nowrapGroup = id;
  }
}

/** Split a line into word tokens, keeping `$math$` atomic and `**bold**` marked. */
export function parseRich(line: string): Token[] {
  const tokens: Token[] = [];
  // Split on **bold** first so a bold span may itself contain $math$, then split
  // each span on $math$. Splitting on math first would cut a bold span whose two
  // ** markers straddle the math, leaving stray ** and mis-bolded text.
  for (const span of line.split(/(\*\*[^*]+\*\*)/g)) {
    if (!span) continue;
    const bold = span.length >= 4 && span.startsWith("**") && span.endsWith("**");
    const inner = bold ? span.slice(2, -2) : span;
    // Match $$display$$ before $inline$ so an important equation set on its own
    // line is not mistaken for two inline expressions.
    for (const segment of inner.split(/(\$\$[^$]+\$\$|\$[^$]+\$)/g)) {
      if (!segment) continue;
      if (segment.length >= 4 && segment.startsWith("$$") && segment.endsWith("$$")) {
        tokens.push({ text: segment.slice(2, -2), math: true, display: true, bold });
        continue;
      }
      if (segment.length >= 2 && segment.startsWith("$") && segment.endsWith("$")) {
        tokens.push({ text: segment.slice(1, -1), math: true, bold });
        continue;
      }
      const prev = tokens[tokens.length - 1];
      const attached = Boolean(prev?.math) && !prev.display && !/^\s/.test(segment);
      for (const word of segment.split(/\s+/)) {
        if (!word) continue;
        const glue = shouldGlueToMath(tokens[tokens.length - 1], word, attached);
        tokens.push({ text: word, bold, glue: glue || undefined });
      }
    }
  }
  // Decide spacing between tokens so punctuation never floats after a space,
  // e.g. "$|v|$." renders as "|v|." and "$x$ ," renders as "x,". A glued
  // suffix stays flush against the math, so "$x$-coordinate" does not become
  // "x -coordinate".
  for (let i = 0; i < tokens.length; i++) {
    if (i === 0) {
      tokens[i].spaceBefore = false;
      continue;
    }
    const prev = tokens[i - 1];
    const cur = tokens[i];
    if (cur.glue) {
      tokens[i].spaceBefore = false;
      continue;
    }
    const noBefore = !cur.math && NO_SPACE_BEFORE.test(cur.text);
    const noAfter = !prev.math && NO_SPACE_AFTER.test(prev.text);
    tokens[i].spaceBefore = !(noBefore || noAfter);
  }
  assignNowrapGroups(tokens);
  return tokens;
}
