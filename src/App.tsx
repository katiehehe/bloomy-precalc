import { useCallback, useEffect, useState, type ReactNode } from "react";
import Catalog from "./catalog/Catalog";
import CurriculumMap from "./curriculum/CurriculumMap";
import DevJump from "./dev/DevJump";
import { hashPath, hashQuery, isDevMode, parseLessonStart, parseQuizStart, type DevHere } from "./dev/mode";
import Journey from "./journey/Journey";
import { journeyLesson } from "./journey/registry";
import { journeyQuiz } from "./journey/quizzes";
import { readyLesson } from "./lessons";
import LessonPlayer from "./player/LessonPlayer";
import Recap from "./player/Recap";
import QuizRunner from "./quiz/QuizRunner";
import type { QuizPhase } from "./quiz/types";
import type { AnswerRecord } from "./lib/answers";

type Route =
  | { name: "catalog" }
  | { name: "map" }
  | { name: "journey" }
  | { name: "lesson"; id: string }
  | { name: "journey-lesson"; id: string }
  | { name: "quiz"; id: string; phase: QuizPhase };

/** Last hub the learner stood on, so Bloomy returns there instead of always Catalog. */
let lastHub = "";

function routeFromHash(): Route {
  const parts = hashPath();
  const head = parts[0] ?? "";
  if (!head) return { name: "catalog" };
  if (head === "map") return { name: "map" };
  if (head === "journey") {
    const id = parts[1];
    const phase = parts[2];
    if (id && (phase === "climb" || phase === "summit")) {
      return { name: "quiz", id, phase };
    }
    return id ? { name: "journey-lesson", id } : { name: "journey" };
  }
  return { name: "lesson", id: head };
}

export default function App() {
  const [route, setRoute] = useState<Route>(() => routeFromHash());
  const [answers, setAnswers] = useState<Record<string, AnswerRecord> | null>(null);
  const [live, setLive] = useState<Pick<DevHere, "slideIndex" | "stage" | "questionIndex" | "beat">>({});
  const onLessonLocation = useCallback((spot: { slideIndex: number; stage: "watch" | "try"; questionIndex: number; beat: number }) => {
    setLive(spot);
  }, []);
  const onQuizLocation = useCallback((spot: { questionIndex: number }) => {
    setLive({ questionIndex: spot.questionIndex });
  }, []);

  const isJourneyLesson = route.name === "journey-lesson";
  const lesson =
    route.name === "lesson"
      ? readyLesson(route.id)
      : isJourneyLesson
        ? journeyLesson(route.id)
        : undefined;

  useEffect(() => {
    if (route.name === "catalog") lastHub = "";
    else if (route.name === "journey") lastHub = "#/journey";
    else if (route.name === "map") lastHub = "#/map";
  }, [route.name]);

  useEffect(() => {
    const sync = () => {
      setRoute(routeFromHash());
      setAnswers(null);
      setLive({});
    };
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const goHome = () => {
    const target = lastHub;
    if (window.location.hash !== target) {
      window.location.hash = target;
    } else {
      setRoute(routeFromHash());
      setAnswers(null);
    }
  };

  const goJourney = () => {
    if (window.location.hash !== "#/journey") window.location.hash = "#/journey";
    else {
      setRoute(routeFromHash());
      setAnswers(null);
    }
  };

  const query = hashQuery();
  const start =
    lesson && (route.name === "lesson" || route.name === "journey-lesson")
      ? parseLessonStart(
          query,
          lesson.slides.length,
          lesson.slides.map((slide) => slide.id),
        )
      : undefined;
  const quizStart = route.name === "quiz" ? parseQuizStart(query) : 0;
  const dev = isDevMode();

  const jumpHere: DevHere =
    route.name === "quiz"
      ? {
          kind: "quiz",
          id: route.id,
          phase: route.phase,
          questionIndex: live.questionIndex ?? quizStart,
        }
      : route.name === "journey-lesson"
        ? {
            kind: "journey-lesson",
            id: route.id,
            slideIndex: live.slideIndex ?? start?.slideIndex ?? 0,
            stage: live.stage ?? start?.stage ?? "watch",
            questionIndex: live.questionIndex ?? start?.questionIndex ?? 0,
            beat: live.beat ?? start?.beat,
          }
        : route.name === "lesson"
          ? {
              kind: "lesson",
              id: route.id,
              slideIndex: live.slideIndex ?? start?.slideIndex ?? 0,
              stage: live.stage ?? start?.stage ?? "watch",
              questionIndex: live.questionIndex ?? start?.questionIndex ?? 0,
              beat: live.beat ?? start?.beat,
            }
          : route.name === "journey"
            ? { kind: "journey" }
            : { kind: "other" };

  const wrap = (node: ReactNode) => (
    <>
      {node}
      {dev && <DevJump here={jumpHere} />}
    </>
  );

  if (route.name === "map") {
    return wrap(<CurriculumMap />);
  }

  if (route.name === "journey") {
    return wrap(<Journey />);
  }

  if (route.name === "quiz") {
    const quizLesson = journeyLesson(route.id);
    const quiz = journeyQuiz(route.id);
    if (!quizLesson || !quiz) return wrap(<Journey />);
    const questions = route.phase === "climb" ? quiz.climb : quiz.summit;
    return wrap(
      <QuizRunner
        key={`${route.id}-${route.phase}-${quizStart}`}
        lessonId={route.id}
        lessonTitle={quizLesson.title}
        kicker={quizLesson.kicker}
        phase={route.phase}
        questions={questions}
        startQuestion={quizStart}
        allowSkip={dev}
        onLocation={onQuizLocation}
        onExit={goJourney}
        nextHref={route.phase === "climb" ? `#/journey/${route.id}/summit` : undefined}
        nextLabel={route.phase === "climb" ? "Start Summit" : undefined}
      />,
    );
  }

  if (isJourneyLesson && !lesson) {
    return wrap(<Journey />);
  }

  if (!lesson) {
    return wrap(<Catalog />);
  }

  if (answers) {
    const climbHref =
      isJourneyLesson && journeyQuiz(route.id) ? `#/journey/${route.id}/climb` : undefined;
    return wrap(
      <Recap
        kicker={lesson.kicker}
        slides={lesson.slides}
        answers={answers}
        onRestart={() => setAnswers(null)}
        onExit={goHome}
        continueHref={climbHref}
        continueLabel="Start Climb"
      />,
    );
  }

  const lessonKey = route.name === "lesson" || route.name === "journey-lesson" ? route.id : lesson.id;
  return wrap(
    <LessonPlayer
      key={`${route.name}-${lessonKey}-${start?.slideIndex ?? 0}-${start?.stage ?? "watch"}-${start?.questionIndex ?? 0}-${start?.beat ?? "open"}`}
      slides={lesson.slides}
      Figure={lesson.Figure}
      watchHint={lesson.watchHint}
      tryHint={lesson.tryHint}
      onFinish={setAnswers}
      onExit={goHome}
      start={start}
      onLocation={onLessonLocation}
      allowSkip={dev}
    />,
  );
}
