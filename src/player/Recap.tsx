import Rich from "../components/Rich";
import { answerKey, isFirstTry, type AnswerRecord } from "../lib/answers";
import type { Slide } from "../lessons/types";

type Props = {
  kicker: string;
  slides: Slide[];
  answers: Record<string, AnswerRecord>;
  onRestart: () => void;
  onExit: () => void;
  /** When set, the recap offers a forward step (e.g. "Start Climb"). */
  continueHref?: string;
  continueLabel?: string;
};

export default function Recap({
  kicker,
  slides,
  answers,
  onRestart,
  onExit,
  continueHref,
  continueLabel,
}: Props) {
  const items = slides.flatMap((slide) =>
    slide.questions.map((question, questionIndex) => ({
      key: answerKey(slide.id, questionIndex),
      slide: slide.title,
      prompt: question.prompt,
      correct: isFirstTry(answers[answerKey(slide.id, questionIndex)]),
    })),
  );
  const earned = items.filter((item) => item.correct).length;
  const total = items.length;
  const percent = total ? Math.round((100 * earned) / total) : 0;
  const correct = items.filter((item) => item.correct);
  const missed = items.filter((item) => !item.correct);

  return (
    <main className="handoff">
      <div className="recap">
        <p className="recap__kicker">{kicker}</p>
        <p className="recap__score">
          {earned}/{total}
          <span> {percent}%</span>
        </p>
        <p className="recap__lead">
          {earned} of {total} questions correct on the first try.
        </p>

        {correct.length > 0 && (
          <section>
            <h2>Correct</h2>
            <ul>
              {correct.map((item) => (
                <li key={item.key}>
                  <span className="try-flag try-flag--yes">1/1</span>
                  <span>
                    <Rich>{item.prompt}</Rich>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {missed.length > 0 && (
          <section>
            <h2>Missed</h2>
            <ul>
              {missed.map((item) => (
                <li key={item.key}>
                  <span className="try-flag">0/1</span>
                  <span>
                    <Rich>{item.prompt}</Rich>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="recap__actions">
          {continueHref ? (
            <a className="btn btn--primary" href={continueHref}>
              {continueLabel ?? "Continue"}
            </a>
          ) : (
            <button type="button" className="btn btn--primary" onClick={onExit}>
              All lessons
            </button>
          )}
          <button type="button" className="btn btn--quiet" onClick={onRestart}>
            Try again
          </button>
          {continueHref && (
            <button type="button" className="btn btn--quiet" onClick={onExit}>
              Back to Journey
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
