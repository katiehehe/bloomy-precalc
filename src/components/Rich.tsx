import { Fragment } from "react";
import Tex from "./Tex";

export type Token = { text: string; bold?: boolean; math?: boolean; spaceBefore?: boolean };

/** Trailing punctuation that should hug the previous word (no space before it). */
const NO_SPACE_BEFORE = /^[.,;:!?)\]}%…’”"']/;
/** Opening punctuation that should hug the next word (no space after it). */
const NO_SPACE_AFTER = /[([{“‘]$/;

/** Split a line into word tokens, keeping `$math$` atomic and `**bold**` marked. */
export function parseRich(line: string): Token[] {
  const tokens: Token[] = [];
  for (const segment of line.split(/(\$[^$]+\$)/g)) {
    if (!segment) continue;
    if (segment.length >= 2 && segment.startsWith("$") && segment.endsWith("$")) {
      tokens.push({ text: segment.slice(1, -1), math: true });
      continue;
    }
    for (const part of segment.split(/(\*\*[^*]+\*\*)/g)) {
      if (!part) continue;
      const bold = part.startsWith("**") && part.endsWith("**");
      const clean = bold ? part.slice(2, -2) : part;
      for (const word of clean.split(/\s+/)) {
        if (word) tokens.push({ text: word, bold });
      }
    }
  }
  // Decide spacing between tokens so punctuation never floats after a space,
  // e.g. "$|v|$." renders as "|v|." and "$x$ ," renders as "x,".
  for (let i = 0; i < tokens.length; i++) {
    if (i === 0) {
      tokens[i].spaceBefore = false;
      continue;
    }
    const prev = tokens[i - 1];
    const cur = tokens[i];
    const noBefore = !cur.math && NO_SPACE_BEFORE.test(cur.text);
    const noAfter = !prev.math && NO_SPACE_AFTER.test(prev.text);
    tokens[i].spaceBefore = !(noBefore || noAfter);
  }
  return tokens;
}

/** Inline static text supporting `$math$` (KaTeX) and `**bold**`, with no animation. */
export default function Rich({ children }: { children: string }) {
  const tokens = parseRich(children);
  return (
    <>
      {tokens.map((token, index) => (
        <Fragment key={index}>
          {token.spaceBefore ? " " : ""}
          <span className={token.bold ? "vocab" : undefined}>
            {token.math ? <Tex>{token.text}</Tex> : token.text}
          </span>
        </Fragment>
      ))}
    </>
  );
}
