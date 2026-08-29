import { useMemo, useState } from "react";
import Rich from "../components/Rich";
import QuizReport from "./QuizReport";
import { correctIndex, shuffledQuestion, type QuizPhase, type QuizQuestion, type QuizOutcome } from "./types";

const letters = ["A", "B", "C", "D", "E"];
const PHASE_NAME: Record<QuizPhase, string> = { climb: "Climb", summit: "Summit" };

type Props = {
  lessonId: string;
  lessonTitle: string;
  kicker: string;
  phase: QuizPhase;
  questions: QuizQuestion[];
  onExit: () => void;
  /** Where "Start Summit" points after the Climb report. */
  nextHref?: string;
  nextLabel?: string;
};

/**
 * Runs one quiz section.
 *   Climb  = practice: pick until correct, with an inline explanation for every
 *            wrong trap and a "Reveal answer" escape; the raw score is first-try.
 *   Summit = mastery: one selection per question, revealed only in the report;
 *            the raw score is the number correct.
 */
export default function QuizRunner({
  lessonId,
  lessonTitle,
  kicker,
  phase,
  questions,
  onExit,
  nextHref,
  nextLabel,
}: Props) {
  const isClimb = phase === "climb";
  // Scatter each question's choices deterministically so the correct option is
  // not always in the same slot. Stable across renders (seeded by question id).
  const deck = useMemo(() => questions.map(shuffledQuestion), [questions]);
  const total = deck.length;

  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [choiceByQ, setChoiceByQ] = useState<Record<number, number>>({});
  const [firstPickByQ, setFirstPickByQ] = useState<Record<number, number>>({});
  const [wrongByQ, setWrongByQ] = useState<Record<number, number[]>>({});
  const [lockedByQ, setLockedByQ] = useState<Record<number, boolean>>({});
  const [firstTryByQ, setFirstTryByQ] = useState<Record<number, boolean>>({});

  const q = deck[index];
  const answerIdx = useMemo(() => (q ? correctIndex(q) : -1), [q]);
  const chosen = choiceByQ[index];
  const wrong = wrongByQ[index] ?? [];
  const locked = Boolean(lockedByQ[index]); // climb: correct or revealed
  const hasSelection = chosen !== undefined;

  // Whether a wrong pick is currently showing its trap explanation (climb only).
  const showingTrap = isClimb && !locked && chosen !== undefined && chosen !== answerIdx;

  const outcomes: QuizOutcome[] = useMemo(
    () =>
      deck.map((question, i) => {
        // For Climb, the report should show the learner's first (initial) pick so
        // the trap they fell for is explained; for Summit it is their one answer.
        const c = isClimb ? firstPickByQ[i] : choiceByQ[i];
        const picked = c === undefined ? null : c;
        const correct = picked === correctIndex(question);
        return {
          questionId: question.id,
          chosen: picked,
          correct,
          firstTry: firstTryByQ[i] ?? false,
        };
      }),
    [deck, isClimb, choiceByQ, firstPickByQ, firstTryByQ],
  );

  const pick = (i: number) => {
    if (!q) return;
    if (isClimb) {
      if (locked) return; // already solved or revealed
      const correct = i === answerIdx;
      setChoiceByQ((s) => ({ ...s, [index]: i }));
      setFirstPickByQ((s) => (index in s ? s : { ...s, [index]: i }));
      setFirstTryByQ((s) => (index in s ? s : { ...s, [index]: correct }));
      if (correct) {
        setLockedByQ((s) => ({ ...s, [index]: true }));
      } else {
        setWrongByQ((s) => ({ ...s, [index]: Array.from(new Set([...(s[index] ?? []), i])) }));
      }
      return;
    }
    // Summit: re-selectable until Next; nothing revealed.
    setChoiceByQ((s) => ({ ...s, [index]: i }));
  };

  const revealAnswer = () => {
    setFirstTryByQ((s) => (index in s ? s : { ...s, [index]: false }));
    setLockedByQ((s) => ({ ...s, [index]: true }));
  };

  const canAdvance = isClimb ? locked : hasSelection;
  const lastQuestion = index >= total - 1;

  const goNext = () => {
    if (!canAdvance) return;
    if (lastQuestion) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
  };
  const goBack = () => {
    if (index === 0) {
      onExit();
      return;
    }
    setIndex((i) => i - 1);
  };

  const restart = () => {
    setIndex(0);
    setFinished(false);
    setChoiceByQ({});
    setFirstPickByQ({});
    setWrongByQ({});
    setLockedByQ({});
    setFirstTryByQ({});
  };

  if (finished || !q) {
    return (
      <QuizReport
        kicker={lessonTitle}
        phase={phase}
        questions={deck}
        outcomes={outcomes}
        onRetry={restart}
        onExit={onExit}
        nextHref={nextHref}
        nextLabel={nextLabel}
      />
    );
  }

  const runningCorrect = isClimb
    ? Object.entries(firstTryByQ).filter(([, v]) => v).length
    : 0;

  return (
    <div className="app quiz-app">
      <header className="topbar">
        <button type="button" className="brand" onClick={onExit} aria-label="Back to Journey">
          Bloomy
        </button>
        <div
          className="topbar__track"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={index + 1}
          aria-label={`${PHASE_NAME[phase]} progress, question ${index + 1} of ${total}`}
        >
          {deck.map((item, dotIndex) => (
            <span key={item.id} className={dotIndex < index ? "seg seg--done" : "seg"}>
              {dotIndex === index && <i style={{ transform: "scaleX(1)" }} />}
            </span>
          ))}
        </div>
        <p className="topbar__meta">
          <span className={`chip ${isClimb ? "chip--climb" : "chip--summit"}`}>{PHASE_NAME[phase]}</span>
          <span>
            {index + 1} of {total}
          </span>
        </p>
      </header>

      <main className="quiz-stage">
        <section className="quiz-card">
          <div className="quiz-card__body">
            <p className="quiz-card__kicker">
              <span className="quiz-card__phase">{isClimb ? "Practice" : "Mastery check"}</span>
              <span className="quiz-card__lesson">{kicker}</span>
              {isClimb && runningCorrect > 0 && (
                <span className="try-flag try-flag--yes" aria-label={`${runningCorrect} correct so far`}>
                  {runningCorrect} right
                </span>
              )}
            </p>

            <p className="quiz-card__prompt">
              <Rich>{q.prompt}</Rich>
            </p>

            <div className="question__options quiz-options">
              {q.choices.map((choice, optionIndex) => {
                const isChosen = chosen === optionIndex;
                const isCorrect = optionIndex === answerIdx;
                const wasWrong = wrong.includes(optionIndex);
                // Climb reveals correctness inline; summit stays neutral until report.
                let cls = "";
                if (isClimb) {
                  if (locked && isCorrect) cls = "correct";
                  else if (wasWrong) cls = "wrong";
                } else if (isChosen) {
                  cls = "chosen";
                }
                const disabled = isClimb && (locked || wasWrong);
                return (
                  <button
                    key={choice.text}
                    type="button"
                    className={cls}
                    aria-pressed={isChosen}
                    disabled={disabled}
                    onClick={() => pick(optionIndex)}
                  >
                    <span className="choice-letter">{letters[optionIndex]}</span>
                    <span className="choice-text">
                      <Rich>{choice.text}</Rich>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="quiz-feedback">
              {isClimb && showingTrap && (
                <div className="quiz-feedback__trap">
                  <p className="quiz-feedback__label">Not quite.</p>
                  <p className="quiz-feedback__text">
                    <Rich>{q.choices[chosen]?.explain ?? ""}</Rich>
                  </p>
                  <div className="quiz-feedback__row">
                    <span className="quiz-feedback__hint">Pick again, or reveal the answer.</span>
                    <button type="button" className="btn btn--quiet" onClick={revealAnswer}>
                      Reveal answer
                    </button>
                  </div>
                </div>
              )}
              {isClimb && locked && (
                <div className="quiz-feedback__ok">
                  <p className="quiz-feedback__label">
                    {firstTryByQ[index] ? "Correct." : `Answer: ${letters[answerIdx]}.`}
                  </p>
                  <p className="quiz-feedback__text">
                    <Rich>{q.choices[answerIdx]?.explain ?? ""}</Rich>
                  </p>
                </div>
              )}
              {!isClimb && hasSelection && (
                <p className="quiz-feedback__locked">
                  Answer recorded. You will see the results and explanations at the summit.
                </p>
              )}
            </div>
          </div>

          <div className="controls quiz-controls">
            <button type="button" className="btn btn--quiet" onClick={goBack}>
              {index === 0 ? "Exit" : "Back"}
            </button>
            <button type="button" className="btn btn--primary" disabled={!canAdvance} onClick={goNext}>
              {lastQuestion ? "See score" : "Next question"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
