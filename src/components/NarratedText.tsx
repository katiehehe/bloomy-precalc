import { motion, useReducedMotion } from "motion/react";
import { Fragment, useMemo } from "react";
import { parseRich } from "./Rich";
import Tex from "./Tex";

type Props = {
  lines: string[];
  cue: number;
  /** 0–1 progress through the current line, locked to the spoken audio. */
  progress: number;
  /** Once the line has been spoken, keep every word visible during the animation. */
  hold: boolean;
};

export default function NarratedText({ lines, cue, progress, hold }: Props) {
  const reduceMotion = useReducedMotion();
  const signature = lines.join("\n");
  const parsed = useMemo(() => signature.split("\n").map(parseRich), [signature]);

  if (cue < 0) return null;

  const clamped = Math.min(1, Math.max(0, progress));

  // Render every beat and every word at all times so the block always occupies
  // its final height. Words that have not been reached yet stay in flow but sit
  // at opacity 0, so nothing reflows as the narration reveals and the completed
  // text fills (and reads as centered in) its reserved space.
  return (
    <div className="narration">
      {parsed.map((tokens, lineIndex) => {
        const revealed =
          lineIndex > cue
            ? 0
            : lineIndex < cue || reduceMotion || hold
              ? tokens.length
              : Math.ceil(clamped * tokens.length);
        return (
          <p key={`line-${lineIndex}`}>
            {tokens.map((token, tokenIndex) => {
              const shown = tokenIndex < revealed;
              return (
                <Fragment key={`${lineIndex}-${tokenIndex}`}>
                  {token.spaceBefore ? " " : ""}
                  <motion.span
                    className={token.bold ? "vocab" : undefined}
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: shown ? 1 : 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.12 }}
                    aria-hidden={shown ? undefined : true}
                  >
                    {token.math ? <Tex>{token.text}</Tex> : token.text}
                  </motion.span>
                </Fragment>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}
