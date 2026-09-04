import { motion, useReducedMotion } from "motion/react";
import { Fragment, type ReactNode } from "react";
import { parseRich, renderTokens } from "./Rich";
import type { BeatImage } from "../lessons/types";

type Props = {
  lines: string[];
  /** Optional photo per beat, aligned to `lines` by index. */
  images?: (BeatImage | undefined)[];
  cue: number;
  /** Kept for API compatibility; narration now fades in a whole paragraph. */
  progress: number;
  hold: boolean;
};

const LIST_ITEM = /^\d+\.\s+/;

function RichSpan({ tokens }: { tokens: ReturnType<typeof parseRich> }) {
  return <>{renderTokens(tokens)}</>;
}

/** One beat may be a single paragraph, or a mix of prose and a numbered list. */
function BeatBody({ text }: { text: string }) {
  const chunks = text.split("\n").filter((chunk) => chunk.length > 0);
  const nodes: ReactNode[] = [];
  let list: string[] = [];
  const flushList = () => {
    if (!list.length) return;
    nodes.push(
      <ol className="narration-list" key={`ol-${nodes.length}`}>
        {list.map((item, i) => (
          <li key={i}>
            <RichSpan tokens={parseRich(item.replace(LIST_ITEM, ""))} />
          </li>
        ))}
      </ol>,
    );
    list = [];
  };
  for (const chunk of chunks) {
    if (LIST_ITEM.test(chunk)) {
      list.push(chunk);
      continue;
    }
    flushList();
    nodes.push(
      <p key={`p-${nodes.length}`}>
        <RichSpan tokens={parseRich(chunk)} />
      </p>,
    );
  }
  flushList();
  return <>{nodes}</>;
}

export default function NarratedText({ lines, images, cue }: Props) {
  const reduceMotion = useReducedMotion();

  if (cue < 0) return null;

  // Every beat stays in the layout so the block always holds its final height
  // and nothing reflows. A beat fades in as a whole once it is reached, rather
  // than revealing word by word. A beat may also carry a photo, which fades in
  // with it just below the text.
  return (
    <div className="narration">
      {lines.map((text, lineIndex) => {
        const active = lineIndex <= cue;
        const img = images?.[lineIndex];
        return (
          <Fragment key={`beat-${lineIndex}`}>
            <motion.div
              className="narration-beat"
              data-beat={lineIndex}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: active ? 1 : 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
              aria-hidden={active ? undefined : true}
            >
              <BeatBody text={text} />
            </motion.div>
            {img && (
              <motion.figure
                className="beat-figure"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: active ? 1 : 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
                aria-hidden={active ? undefined : true}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
                {img.credit && <figcaption>{img.credit}</figcaption>}
              </motion.figure>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
