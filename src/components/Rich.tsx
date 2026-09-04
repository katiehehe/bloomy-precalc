import { Fragment, type ReactNode } from "react";
import Tex from "./Tex";
import { parseRich, type Token } from "./parseRich";

export type { Token };
export { parseRich };

/** Render a parsed token: display math on its own line, inline math atomic, or text. */
export function renderToken(token: Token) {
  if (token.math && token.display) {
    return (
      <span className="narration-eq">
        <Tex display>{token.text}</Tex>
      </span>
    );
  }
  if (token.math) return <Tex>{token.text}</Tex>;
  return token.text;
}

function tokenClass(token: Token): string | undefined {
  return token.bold && !token.display ? "vocab" : undefined;
}

/** Render tokens, wrapping $x$-coordinate / $n$th pairs so they cannot wrap mid-word. */
export function renderTokens(tokens: Token[]): ReactNode {
  const out: ReactNode[] = [];
  for (let i = 0; i < tokens.length; ) {
    const token = tokens[i];
    const group = token.nowrapGroup;
    if (group != null) {
      const members: Token[] = [];
      while (i < tokens.length && tokens[i].nowrapGroup === group) {
        members.push(tokens[i]);
        i += 1;
      }
      out.push(
        <Fragment key={out.length}>
          {members[0].spaceBefore && !members[0].display ? " " : ""}
          <span className="math-compound">
            {members.map((member, memberIndex) => (
              <span key={memberIndex} className={tokenClass(member)}>
                {renderToken(member)}
              </span>
            ))}
          </span>
        </Fragment>,
      );
      continue;
    }
    out.push(
      <Fragment key={out.length}>
        {token.spaceBefore && !token.display ? " " : ""}
        <span className={tokenClass(token)}>{renderToken(token)}</span>
      </Fragment>,
    );
    i += 1;
  }
  return out;
}

/** Inline static text supporting `$math$`, `$$display math$$`, and `**bold**`. */
export default function Rich({ children }: { children: string }) {
  return <>{renderTokens(parseRich(children))}</>;
}
