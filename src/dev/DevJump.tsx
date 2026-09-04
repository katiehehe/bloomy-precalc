import { useEffect, useMemo, useRef, useState } from "react";
import { lessons } from "../lessons";
import { journeyLessons } from "../journey/registry";
import { journeyQuiz } from "../journey/quizzes";
import { baseLessonHref, isDevMode, journeyLessonHref, quizHref, setDevMode, type DevHere } from "./mode";
import "./dev.css";

type Props = {
  here?: DevHere;
};

function clip(text: string, n = 48) {
  const clean = text.replace(/\$[^$]*\$/g, "…").replace(/\*\*/g, "").trim();
  return clean.length <= n ? clean : `${clean.slice(0, n - 1)}…`;
}

function hereCaption(here?: DevHere): string | undefined {
  if (!here) return undefined;
  if (here.kind === "quiz" && here.id) {
    const n = (here.questionIndex ?? 0) + 1;
    return `${here.id} · ${here.phase === "summit" ? "Summit" : "Climb"} ${n}`;
  }
  if ((here.kind === "lesson" || here.kind === "journey-lesson") && here.id) {
    const n = (here.slideIndex ?? 0) + 1;
    if (here.stage === "try") return `${here.id} · slide ${n} Q${(here.questionIndex ?? 0) + 1}`;
    if (here.beat != null && here.beat >= 0) return `${here.id} · slide ${n} beat ${here.beat + 1}`;
    return `${here.id} · slide ${n}`;
  }
  if (here.kind === "journey") return "Journey";
  return undefined;
}

function mark(active: boolean, extra?: string) {
  return [extra, active ? "is-here" : undefined].filter(Boolean).join(" ") || undefined;
}

export default function DevJump({ here }: Props) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const q = filter.trim().toLowerCase();
  const caption = hereCaption(here);

  const journey = useMemo(
    () =>
      journeyLessons.filter(
        (l) =>
          !q ||
          l.id.toLowerCase().includes(q) ||
          l.title.toLowerCase().includes(q) ||
          l.kicker.toLowerCase().includes(q),
      ),
    [q],
  );
  const camp = useMemo(
    () =>
      lessons.filter(
        (l) =>
          l.status === "ready" &&
          (!q || l.id.toLowerCase().includes(q) || l.title.toLowerCase().includes(q)),
      ),
    [q],
  );

  useEffect(() => {
    if (!open) return;
    const node = panelRef.current?.querySelector<HTMLElement>("a.is-here, summary.is-here");
    node?.scrollIntoView({ block: "center", inline: "nearest" });
  }, [open, here]);

  if (!isDevMode()) return null;

  return (
    <div className="dev-jump">
      {open && (
        <div ref={panelRef} className="dev-jump__panel" role="dialog" aria-label="Developer jump">
          <div className="dev-jump__head">
            <h2>Jump</h2>
            <button type="button" className="dev-jump__off" onClick={() => setDevMode(false)}>
              Turn off
            </button>
          </div>
          <input
            className="dev-jump__search"
            type="search"
            placeholder="Filter by lesson title or id"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Filter lessons"
          />

          {journey.map((lesson) => {
            const quiz = journeyQuiz(lesson.id);
            const current = here?.id === lesson.id;
            return (
              <details key={lesson.id} className="dev-jump__group" open={current && !q ? true : undefined}>
                <summary className={current ? "is-here" : undefined}>
                  {lesson.title}
                  <span className="dev-jump__sub">{lesson.id}</span>
                </summary>
                <ul className="dev-jump__links">
                  {lesson.slides.map((slide, slideIndex) => {
                    const onSlide = current && (here.kind === "journey-lesson" || here.kind === "lesson") && here.slideIndex === slideIndex;
                    const onWatch = onSlide && here.stage === "watch";
                    const onTry = onSlide && here.stage === "try";
                    return (
                      <li key={slide.id}>
                        <a
                          href={journeyLessonHref(lesson.id, { slideId: slide.id, stage: "watch" })}
                          className={mark(Boolean(onWatch && (here.beat == null || here.beat < 0)))}
                        >
                          Watch · {slide.title}
                        </a>
                        {slide.beats.map((beat, beatIndex) => (
                          <a
                            key={`${slide.id}-b${beatIndex}`}
                            href={journeyLessonHref(lesson.id, {
                              slideId: slide.id,
                              stage: "watch",
                              beat: beatIndex,
                            })}
                            className={mark(Boolean(onWatch && here.beat === beatIndex), "dev-jump__sub")}
                          >
                            Beat {beatIndex + 1}: {clip(beat.text)}
                          </a>
                        ))}
                        {slide.questions.map((question, questionIndex) => (
                          <a
                            key={`${slide.id}-q${questionIndex}`}
                            href={journeyLessonHref(lesson.id, {
                              slideId: slide.id,
                              stage: "try",
                              questionIndex,
                            })}
                            className={mark(Boolean(onTry && here.questionIndex === questionIndex))}
                          >
                            Your turn Q{questionIndex + 1} · {clip(question.prompt, 40)}
                          </a>
                        ))}
                      </li>
                    );
                  })}
                  {quiz ? (
                    <>
                      {quiz.climb.map((item, i) => (
                        <li key={`c${item.id}`}>
                          <a
                            href={quizHref(lesson.id, "climb", i)}
                            className={mark(
                              Boolean(current && here.kind === "quiz" && here.phase === "climb" && here.questionIndex === i),
                            )}
                          >
                            Climb {i + 1} · {clip(item.prompt, 40)}
                          </a>
                        </li>
                      ))}
                      {quiz.summit.map((item, i) => (
                        <li key={`s${item.id}`}>
                          <a
                            href={quizHref(lesson.id, "summit", i)}
                            className={mark(
                              Boolean(current && here.kind === "quiz" && here.phase === "summit" && here.questionIndex === i),
                            )}
                          >
                            Summit {i + 1} · {clip(item.prompt, 40)}
                          </a>
                        </li>
                      ))}
                    </>
                  ) : (
                    <li>
                      <span className="dev-jump__muted">No Climb or Summit for this lesson.</span>
                    </li>
                  )}
                </ul>
              </details>
            );
          })}

          <details className="dev-jump__group" open={here?.kind === "lesson" && !q ? true : undefined}>
            <summary className={here?.kind === "lesson" ? "is-here" : undefined}>Base Camp</summary>
            {camp.map((lesson) => {
              if (lesson.status !== "ready") return null;
              const current = here?.kind === "lesson" && here.id === lesson.id;
              return (
                <ul key={lesson.id} className="dev-jump__links">
                  <li>
                    <strong>{lesson.title}</strong>
                  </li>
                  {lesson.slides.map((slide, slideIndex) => {
                    const onSlide = current && here.slideIndex === slideIndex;
                    const onWatch = onSlide && here.stage === "watch";
                    const onTry = onSlide && here.stage === "try";
                    return (
                      <li key={slide.id}>
                        <a
                          href={baseLessonHref(lesson.id, { slideId: slide.id, stage: "watch" })}
                          className={mark(Boolean(onWatch && (here.beat == null || here.beat < 0)))}
                        >
                          Watch · {slide.title}
                        </a>
                        {slide.questions.map((question, questionIndex) => (
                          <a
                            key={`${slide.id}-q${questionIndex}`}
                            href={baseLessonHref(lesson.id, {
                              slideId: slide.id,
                              stage: "try",
                              questionIndex,
                            })}
                            className={mark(Boolean(onTry && here.questionIndex === questionIndex))}
                          >
                            Your turn Q{questionIndex + 1} · {clip(question.prompt, 40)}
                          </a>
                        ))}
                      </li>
                    );
                  })}
                </ul>
              );
            })}
          </details>
        </div>
      )}
      {caption && (
        <div className="dev-jump__here" aria-live="polite">
          {caption}
        </div>
      )}
      <button
        type="button"
        className="dev-jump__toggle"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Close jump" : "Dev jump"}
      </button>
    </div>
  );
}
