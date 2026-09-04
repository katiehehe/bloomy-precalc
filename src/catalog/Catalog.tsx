import Rich from "../components/Rich";
import { lessons } from "../lessons";
import type { LessonEntry } from "../lessons/types";
import LessonPreview, { previewLabel } from "./LessonPreview";
import SiteHeader from "./SiteHeader";

function ArrowCue() {
  return (
    <svg className="lesson-card__arrow" viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" focusable="false">
      <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** A faint Argand-plane motif for lessons that are not yet playable. */
function UpcomingThumb() {
  return (
    <svg className="figure" viewBox="0 0 460 460" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <line x1="30" y1="230" x2="430" y2="230" className="axis" />
      <line x1="230" y1="30" x2="230" y2="430" className="axis" />
      <line x1="230" y1="230" x2="336" y2="128" className="radius-line" />
      <path d="M292 230 A62 62 0 0 0 276 188" className="angle-arc" />
      <circle cx="230" cy="230" r="5" className="origin-dot" />
      <circle cx="336" cy="128" r="9" className="point-dot" />
    </svg>
  );
}

function LessonCard({ lesson }: { lesson: LessonEntry }) {
  if (lesson.status === "ready") {
    return (
      <a className="lesson-card" href={`#/${lesson.id}`}>
        <span className="lesson-card__thumb" role="img" aria-label={previewLabel(lesson)}>
          <LessonPreview lesson={lesson} />
        </span>
        <span className="lesson-card__body">
          <span className="lesson-card__title">
            <Rich>{lesson.title}</Rich>
          </span>
          <span className="lesson-card__summary">{lesson.summary}</span>
          <span className="lesson-card__cue">
            Start lesson
            <ArrowCue />
          </span>
        </span>
      </a>
    );
  }

  return (
    <article className="lesson-card lesson-card--soon">
      <span className="lesson-card__thumb" role="img" aria-label={`Preview coming soon for ${lesson.title}.`}>
        <UpcomingThumb />
      </span>
      <span className="lesson-card__body">
        <span className="lesson-card__title">
          <Rich>{lesson.title}</Rich>
        </span>
        <span className="lesson-card__summary">{lesson.summary}</span>
        <span className="lesson-card__tag">Coming soon</span>
      </span>
    </article>
  );
}

export default function Catalog() {
  return (
    <div className="catalog">
      <SiteHeader current="examples" />
      <div className="catalog__shell">
        <main className="catalog__main">
          <div className="catalog__intro">
            <h1>Base Camp</h1>
            <p>
              This page contains five interactive lessons that are critical to mastering precalculus. They give a first look at how Bloomy teaches precalculus.
            </p>
          </div>

          <ul className="catalog__grid">
            {lessons.map((lesson) => (
              <li key={lesson.id}>
                <LessonCard lesson={lesson} />
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}
