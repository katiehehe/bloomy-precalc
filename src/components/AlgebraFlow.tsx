import { motion, useReducedMotion } from "motion/react";
import { type ReactNode, useEffect, useRef } from "react";
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
  /** A fixed expression shown above the flow (e.g. the target under study). */
  heading?: string;
  /** Optional node (a gauge or mini figure) rendered above the equations. */
  header?: ReactNode;
  /** Vertical alignment of the stack inside the slot. Default "center". */
  align?: "center" | "start";
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * A stack of equation lines that appear one at a time, each introduced by a
 * labeled arrow describing the manipulation (expand, substitute, cancel,
 * factor, ...). Pure function of `reveal`, so interrupting an animation lands
 * on the intended end state and reduced motion jumps straight there.
 */
export default function AlgebraFlow({ steps, reveal, heading, header, align = "center" }: Props) {
  const reduce = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const visible = steps.filter((s) => !s.show || reveal[s.show]);
  const t = (duration: number, delay = 0) => (reduce ? { duration: 0 } : { duration, delay, ease: EASE });

  // As lines write in, keep the newest one in view when the chain outgrows the
  // slot, so it reads like a teacher working down the page.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [visible.length, reduce]);

  return (
    <div ref={scrollRef} className={`algebra-flow algebra-flow--${align}`}>
      {header && <div className="algebra-flow__header">{header}</div>}
      {heading && (
        <div className="algebra-flow__heading">
          <Tex>{heading}</Tex>
        </div>
      )}
      <motion.ol className="algebra-flow__steps" layout={!reduce}>
        {visible.map((step, i) => (
          <motion.li
            key={step.id}
            layout={!reduce}
            className={`flow-step flow-step--${step.tone ?? "primary"}${step.result ? " is-result" : ""}`}
          >
            {i > 0 && step.op && (
              <div className="flow-op">
                <motion.span
                  className="flow-op__line"
                  initial={reduce ? false : { scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={t(0.3)}
                />
                <motion.span
                  className="flow-op__chip"
                  initial={reduce ? false : { opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={t(0.3, 0.16)}
                >
                  <Tex>{step.op}</Tex>
                </motion.span>
                <motion.span
                  className="flow-op__head"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={t(0.2, 0.28)}
                  aria-hidden="true"
                />
              </div>
            )}
            <motion.div
              className="flow-step__eq"
              initial={reduce ? false : { opacity: 0, y: 8, scale: step.result ? 0.96 : 1 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={t(0.4, step.op && i > 0 ? 0.32 : 0.04)}
            >
              <Tex display>{step.tex}</Tex>
            </motion.div>
            {step.note && (
              <motion.div
                className="flow-step__note"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={t(0.35, 0.3)}
              >
                <Tex>{step.note}</Tex>
              </motion.div>
            )}
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
}
