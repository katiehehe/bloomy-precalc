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
   * A plain-words title drawn as a small SVG at the very top. Use this when the
   * flow stands alone as the figure (no matrix or plane): it puts the title on
   * top and gives the figure the <svg> the smoke harness expects, so no filler
   * matrix glyph is needed. Ignored when `header` is supplied.
   */
  title?: string;
  /** A fixed expression shown above the flow (e.g. the target under study). */
  heading?: string;
  /** Optional node (a gauge or mini figure) rendered above the equations. */
  header?: ReactNode;
  /** Vertical alignment of the stack inside the slot. Default "center". */
  align?: "center" | "start";
  /**
   * Reserve space for every step up front and center the whole derivation, so
   * lines fade in where they will finally sit instead of the stack growing and
   * scrolling downward. Best for short derivations that fit without scrolling.
   */
  stable?: boolean;
  /**
   * Spotlight the current (latest) line: keep it centered in view while earlier
   * lines dim back and stay reachable by scrolling. Best for long derivations
   * where showing every line at once would crowd the panel.
   */
  focus?: boolean;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * A stack of equation lines that appear one at a time, each introduced by a
 * labeled arrow describing the manipulation (expand, substitute, cancel,
 * factor, ...). Pure function of `reveal`, so interrupting an animation lands
 * on the intended end state and reduced motion jumps straight there.
 */
export default function AlgebraFlow({ steps, reveal, title, heading, header, align = "center", stable = false, focus = false }: Props) {
  const reduce = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const currentRef = useRef<HTMLLIElement>(null);
  const didInit = useRef(false);
  const shownOf = (s: FlowStep) => !s.show || Boolean(reveal[s.show]);
  // In stable mode every step is rendered up front (unrevealed ones held at
  // opacity 0) so the stack never grows or shifts; otherwise only revealed steps
  // mount and the list glides so the newest line sits at the vertical center.
  const list = stable ? steps : steps.filter(shownOf);
  const shownCount = list.filter(shownOf).length;
  // The last revealed line is the one the current beat is talking about.
  const currentId = [...list].reverse().find(shownOf)?.id;
  const t = (duration: number, delay = 0) => (reduce ? { duration: 0 } : { duration, delay, ease: EASE });

  // Keep the current equation centered by translating the whole list, not by
  // scrolling. A CSS transition on the transform then carries the stack in one
  // continuous glide from the previously centered line to the new one, instead
  // of the layout jumping and a separate scroll animation catching up.
  useLayoutEffect(() => {
    // Stable reserves space and centers as a block; start-aligned flows stay
    // anchored at the top. Only centered flows translate to follow the current
    // line.
    if (stable || align !== "center") return;
    const vp = viewportRef.current;
    const listEl = listRef.current;
    const cur = currentRef.current;
    if (!vp || !listEl || !cur) return;
    // offsetTop is layout based, so it is unaffected by the list's current
    // transform or by a line's own entrance tween: measurement never fights the
    // animation it is about to drive.
    const eq = cur.querySelector<HTMLElement>(".flow-step__eq") ?? cur;
    const eqCenter = eq.offsetTop + eq.offsetHeight / 2;
    const target = vp.clientHeight / 2 - eqCenter;
    const first = !didInit.current;
    didInit.current = true;
    if (reduce || first) {
      // On first mount (and always under reduced motion) snap without a glide so
      // the derivation does not slide in from the top on load.
      const prev = listEl.style.transition;
      listEl.style.transition = "none";
      listEl.style.transform = `translateY(${target}px)`;
      void listEl.offsetHeight;
      listEl.style.transition = prev;
    } else {
      listEl.style.transform = `translateY(${target}px)`;
    }
  }, [shownCount, reduce, stable, align]);

  return (
    <div
      className={`algebra-flow algebra-flow--${align}${stable ? " algebra-flow--stable" : ""}${
        focus ? " algebra-flow--focus" : ""
      }`}
    >
      {header && <div className="algebra-flow__header">{header}</div>}
      {!header && title && (
        <div className="algebra-flow__header">
          <svg className="flow-title" viewBox="0 0 380 30" preserveAspectRatio="xMidYMid meet" role="img" aria-label={title}>
            <text x={190} y={21} textAnchor="middle" className="flow-title__text">
              {title}
            </text>
          </svg>
        </div>
      )}
      {heading && (
        <div className="algebra-flow__heading">
          <Tex>{heading}</Tex>
        </div>
      )}
      <div ref={viewportRef} className="algebra-flow__viewport">
        <ol ref={listRef} className="algebra-flow__steps">
          {list.map((step, i) => {
          const shown = shownOf(step);
          const hidden = stable && !shown;
          const isCurrentLine = shown && step.id === currentId;
          const isCurrent = focus && isCurrentLine;
          const dim = focus && shown && !isCurrentLine;
          return (
            <motion.li
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
                initial={reduce ? false : { opacity: 0, y: 8, scale: step.result ? 0.96 : 1 }}
                animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 8, scale: shown ? 1 : step.result ? 0.96 : 1 }}
                transition={t(0.4, step.op && i > 0 ? 0.32 : 0.04)}
              >
                <Tex display>{step.tex}</Tex>
              </motion.div>
              {step.note && (
                <motion.div
                  className="flow-step__note"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: shown ? 1 : 0 }}
                  transition={t(0.35, 0.3)}
                >
                  <Tex>{step.note}</Tex>
                </motion.div>
              )}
            </motion.li>
          );
        })}
        </ol>
      </div>
    </div>
  );
}
