import { motion, useReducedMotion } from "motion/react";
import { type ReactNode, useLayoutEffect, useRef } from "react";
import Tex from "./Tex";
import type { Reveal } from "../lessons/types";

/**
 * One line in a dynamic derivation. Lines reveal in order as beats progress:
 * an operation "chip" on a drawn arrow explains the move from the line above,
 * then the new equation writes in. This is the pencil-mimic version of a
 * teacher rewriting an equation step by step.
 */
export type FlowStep = {
  /** Stable key for this line (used for animation identity). */
  id: string;
  /** Reveal flag that gates this line. Omit to show from the start. */
  show?: string;
  /** The equation for this line, in KaTeX (rendered in display mode). */
  tex: string;
  /**
   * The operation that turns the previous line into this one, shown on the
   * connector arrow above the line. KaTeX; wrap words in \text{...}.
   */
  op?: string;
  /** Emphasize this line as the result (soft tinted box). */
  result?: boolean;
  /** A small muted note under the line (KaTeX allowed). */
  note?: string;
  /** Accent tone for the connector and any result box. */
  tone?: "primary" | "cancel" | "good";
};

type Props = {
  steps: FlowStep[];
  reveal: Reveal;
  /**
   * A words-only title at the very top. Use this when the flow stands alone
   * (no matrix or plane). It shares the heading underline (hugs the text) and
   * keeps a tiny <svg> so screenshot and smoke tools still find one. Ignored
   * when `header` is supplied.
   */
  title?: string;
  /** Title under the header glyph, or at the top when there is no glyph. */
  heading?: string;
  /** Optional node (a gauge or mini figure) rendered above the heading. */
  header?: ReactNode;
  /** Vertical alignment of the stack inside the slot. Default "start". */
  align?: "center" | "start";
  /**
   * Reserve space for every step up front. Off by default: only revealed
   * lines mount, and the current line stays centered in the panel.
   */
  stable?: boolean;
  /**
   * Dim older lines on long chains. The current line still stays centered.
   */
  focus?: boolean;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * House style for every derivation (reference: degrees-radians).
 * The header glyph and heading stay pinned (heading below the glyph, never
 * on the plot). The current equation stays center-ish in the step panel and
 * never drops off the bottom. Older lines scroll up and fade under the top
 * mask. Do not scale the whole chain to fit on one screen.
 */
export default function AlgebraFlow({
  steps,
  reveal,
  title,
  heading,
  header,
  align = "start",
  stable = false,
  focus = false,
}: Props) {
  const reduce = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const currentRef = useRef<HTMLLIElement>(null);
  const didInit = useRef(false);
  const shownOf = (s: FlowStep) => !s.show || Boolean(reveal[s.show]);
  const list = stable ? steps : steps.filter(shownOf);
  const currentId = [...list].reverse().find(shownOf)?.id;
  const currentIndex = list.findIndex((s) => s.id === currentId);
  const previousId = currentIndex > 0 ? list[currentIndex - 1]?.id : undefined;
  const t = (duration: number, delay = 0) => (reduce ? { duration: 0 } : { duration, delay, ease: EASE });
  const headingNode = heading ? (
    <div className="algebra-flow__heading">
      <Tex>{heading}</Tex>
    </div>
  ) : null;

  useLayoutEffect(() => {
    const vp = viewportRef.current;
    const listEl = listRef.current;
    const cur = currentRef.current;
    if (!vp || !listEl || !cur) return;

    const pad = Math.round(vp.clientHeight * 0.42);
    listEl.style.paddingTop = `${pad}px`;
    listEl.style.paddingBottom = `${pad}px`;

    const eq = cur.querySelector<HTMLElement>(".flow-step__eq") ?? cur;
    const eqMid = eq.getBoundingClientRect().top + eq.offsetHeight / 2;
    const vpMid = vp.getBoundingClientRect().top + vp.clientHeight / 2;
    const top = Math.max(0, Math.min(vp.scrollHeight - vp.clientHeight, vp.scrollTop + (eqMid - vpMid)));
    const first = !didInit.current;
    didInit.current = true;
    vp.scrollTo({ top, behavior: reduce || first ? "auto" : "smooth" });
  }, [currentId, reduce]);

  return (
    <div
      className={`algebra-flow algebra-flow--${align}${stable ? " algebra-flow--stable" : ""}${
        focus ? " algebra-flow--focus" : ""
      }${header ? " algebra-flow--has-glyph" : ""}`}
    >
      {header && (
        <div className="algebra-flow__header">
          {header}
          {headingNode}
        </div>
      )}
      {!header && title && (
        <div className="algebra-flow__header">
          <svg className="flow-title" viewBox="0 0 8 8" role="img" aria-label={title}>
            <title>{title}</title>
          </svg>
          <div className="algebra-flow__heading">{title}</div>
        </div>
      )}
      <div className="algebra-flow__body">
        {!header && headingNode}
        <div
          ref={viewportRef}
          className="algebra-flow__viewport"
          tabIndex={0}
          role="region"
          aria-label="Derivation steps"
        >
          <ol ref={listRef} className="algebra-flow__steps">
            {list.map((step, i) => {
              const shown = shownOf(step);
              const hidden = stable && !shown;
              const isCurrentLine = shown && step.id === currentId;
              const isCurrent = focus && isCurrentLine;
              const isParent = focus && shown && step.id === previousId;
              const dim = focus && shown && !isCurrentLine && !isParent;
              return (
                <li
                  key={step.id}
                  ref={isCurrentLine ? currentRef : undefined}
                  className={`flow-step flow-step--${step.tone ?? "primary"}${step.result ? " is-result" : ""}${
                    hidden ? " is-reserved" : ""
                  }${isCurrent ? " is-current" : ""}${dim ? " is-dim" : ""}`}
                  aria-hidden={hidden || undefined}
                >
                  {i > 0 && step.op && (
                    <div className="flow-op">
                      <motion.span
                        className="flow-op__line"
                        initial={reduce ? false : { scaleY: 0 }}
                        animate={{ scaleY: shown ? 1 : 0 }}
                        transition={t(0.3)}
                      />
                      <motion.span
                        className="flow-op__chip"
                        initial={reduce ? false : { opacity: 0 }}
                        animate={{ opacity: shown ? 1 : 0 }}
                        transition={t(0.3, 0.16)}
                      >
                        <Tex>{step.op}</Tex>
                      </motion.span>
                      <motion.span
                        className="flow-op__head"
                        initial={reduce ? false : { opacity: 0 }}
                        animate={{ opacity: shown ? 1 : 0 }}
                        transition={t(0.2, 0.28)}
                        aria-hidden="true"
                      />
                    </div>
                  )}
                  <motion.div
                    className="flow-step__eq"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: shown ? 1 : 0 }}
                    transition={t(0.35, step.op && i > 0 ? 0.28 : 0.04)}
                  >
                    <Tex display>{step.tex}</Tex>
                  </motion.div>
                  {step.note && (
                    <motion.div
                      className="flow-step__note"
                      initial={reduce ? false : { opacity: 0 }}
                      animate={{ opacity: shown ? 1 : 0 }}
                      transition={t(0.3, 0.24)}
                    >
                      <Tex>{step.note}</Tex>
                    </motion.div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
