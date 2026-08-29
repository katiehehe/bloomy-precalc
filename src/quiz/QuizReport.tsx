import Rich from "../components/Rich";
import { correctIndex, type QuizPhase, type QuizQuestion, type QuizOutcome } from "./types";

type Props = {
  kicker: string;
  phase: QuizPhase;
  questions: QuizQuestion[];
  outcomes: QuizOutcome[];
  onRetry: () => void;
  onExit: () => void;
  /** Optional forward step (Climb offers "Start Summit"). */
  nextHref?: string;
  nextLabel?: string;
};

const PHASE_NAME: Record<QuizPhase, string> = { climb: "Climb", summit: "Summit" };

/** Encouraging one-liner keyed to the percent, never punitive. */
function lead(phase: QuizPhase, percent: number): string {
  if (phase === "summit") {
    if (percent >= 90) return "Summit reached. You have mastered this skill.";
    if (percent >= 70) return "Strong climb. Review the few you missed and you are there.";
    return "Good effort. Work back through the misses, then retry the summit.";
  }
  if (percent >= 90) return "Warmed up and ready. Head for the summit.";
  if (percent >= 70) return "Nice practice. Skim the misses, then try the summit.";
  return "That is what practice is for. Review the misses and climb again.";
}

export default function QuizReport({
  kicker,
  phase,
  questions,
  outcomes,
  onRetry,
  onExit,
  nextHref,
  nextLabel,
}: Props) {
  const total = questions.length;
  const earned = outcomes.filter((o) => (phase === "climb" ? o.firstTry : o.correct)).length;
  const percent = total ? Math.round((100 * earned) / total) : 0;

  return (
    <main className="handoff quiz-report">
      <div className="recap quiz-report__card">
        <p className="recap__kicker">
          {kicker} <span aria-hidden="true">·</span> {PHASE_NAME[phase]}
        </p>
        <p className="recap__score">
          {earned}/{total}
          <span> {percent}%</span>
        </p>
        <p className="recap__lead">{lead(phase, percent)}</p>

        <section className="quiz-review">
          <h2>Review every question</h2>
          <ol className="quiz-review__list">
            {questions.map((q, i) => {
              const outcome = outcomes[i];
              const answerIdx = correctIndex(q);
              const got = phase === "climb" ? outcome?.firstTry : outcome?.correct;
              const chosen = outcome?.chosen ?? null;
              const choseWrong = chosen != null && chosen !== answerIdx;
              return (
                <li key={q.id} className={`quiz-review__item ${got ? "is-correct" : "is-missed"}`}>
                  <div className="quiz-review__head">
                    <span className={got ? "try-flag try-flag--yes" : "try-flag"}>{got ? "1/1" : "0/1"}</span>
                    <span className="quiz-review__prompt">
                      <Rich>{q.prompt}</Rich>
                    </span>
                  </div>
                  <p className="quiz-review__answer">
                    <span className="quiz-review__tag quiz-review__tag--right">Answer</span>
                    <span>
                      <Rich>{q.choices[answerIdx]?.text ?? ""}</Rich>
                    </span>
                  </p>
                  <p className="quiz-review__why">
                    <Rich>{q.choices[answerIdx]?.explain ?? ""}</Rich>
                  </p>
                  {choseWrong && (
                    <>
                      <p className="quiz-review__answer quiz-review__answer--yours">
                        <span className="quiz-review__tag quiz-review__tag--wrong">You chose</span>
                        <span>
                          <Rich>{q.choices[chosen]?.text ?? ""}</Rich>
                        </span>
                      </p>
                      <p className="quiz-review__why quiz-review__why--trap">
                        <Rich>{q.choices[chosen]?.explain ?? ""}</Rich>
                      </p>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </section>

        <div className="recap__actions">
          {nextHref && (
            <a className="btn btn--primary" href={nextHref}>
              {nextLabel ?? "Continue"}
            </a>
          )}
          <button type="button" className={nextHref ? "btn btn--quiet" : "btn btn--primary"} onClick={onRetry}>
            Retry {PHASE_NAME[phase]}
          </button>
          <button type="button" className="btn btn--quiet" onClick={onExit}>
            Back to Journey
          </button>
        </div>
      </div>
    </main>
  );
}
