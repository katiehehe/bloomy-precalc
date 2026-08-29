import { motion, useReducedMotion } from "motion/react";
import { Fragment, useMemo } from "react";
import { parseRich, renderToken } from "./Rich";

type Props = {
  lines: string[];
  cue: number;
  /** Kept for API compatibility; narration now fades in a whole paragraph. */
  progress: number;
  hold: boolean;
};

export default function NarratedText({ lines, cue }: Props) {
  const reduceMotion = useReducedMotion();
  const signature = lines.join("\n");
  const parsed = useMemo(() => signature.split("\n").map(parseRich), [signature]);

  if (cue < 0) return null;

  // Every paragraph stays in the layout so the block always holds its final
  // height and nothing reflows. A paragraph fades in as a whole once its beat is
  // reached, rather than revealing word by word.
  return (
    <div className="narration">
      {parsed.map((tokens, lineIndex) => {
        const active = lineIndex <= cue;
        return (
          <motion.p
            key={`line-${lineIndex}`}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
            aria-hidden={active ? undefined : true}
          >
            {tokens.map((token, tokenIndex) => (
              <Fragment key={`${lineIndex}-${tokenIndex}`}>
                {token.spaceBefore && !token.display ? " " : ""}
                <span className={token.bold && !token.display ? "vocab" : undefined}>
                  {renderToken(token)}
                </span>
              </Fragment>
            ))}
          </motion.p>
        );
      })}
    </div>
  );
}
