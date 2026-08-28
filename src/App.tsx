import { useEffect, useState } from "react";
import Catalog from "./catalog/Catalog";
import CurriculumMap from "./curriculum/CurriculumMap";
import Journey from "./journey/Journey";
import { journeyLesson } from "./journey/registry";
import { readyLesson } from "./lessons";
import LessonPlayer from "./player/LessonPlayer";
import Recap from "./player/Recap";
import type { AnswerRecord } from "./lib/answers";

type Route =
  | { name: "catalog" }
  | { name: "map" }
  | { name: "journey" }
  | { name: "lesson"; id: string }
  | { name: "journey-lesson"; id: string };

function routeFromHash(): Route {
  const raw = window.location.hash.replace(/^#\/?/, "").trim();
  if (!raw) return { name: "catalog" };
  const parts = raw.split("/");
  const head = parts[0] ?? "";
  if (head === "map") return { name: "map" };
  if (head === "journey") {
    const id = parts[1];
    return id ? { name: "journey-lesson", id } : { name: "journey" };
  }
  return { name: "lesson", id: head };
}

export default function App() {
  const [route, setRoute] = useState<Route>(() => routeFromHash());
  const [answers, setAnswers] = useState<Record<string, AnswerRecord> | null>(null);

  const isJourneyLesson = route.name === "journey-lesson";
  const lesson =
    route.name === "lesson"
      ? readyLesson(route.id)
      : isJourneyLesson
        ? journeyLesson(route.id)
        : undefined;

  useEffect(() => {
    const sync = () => {
      setRoute(routeFromHash());
      setAnswers(null);
    };
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const goHome = () => {
    const target = isJourneyLesson ? "#/journey" : "";
    if (window.location.hash !== target) {
      window.location.hash = target;
    } else {
      setRoute(routeFromHash());
      setAnswers(null);
    }
  };

  if (route.name === "map") {
    return <CurriculumMap />;
  }

  if (route.name === "journey") {
    return <Journey />;
  }

  if (isJourneyLesson && !lesson) {
    return <Journey />;
  }

  if (!lesson) {
    return <Catalog />;
  }

  if (answers) {
    return (
      <Recap
        kicker={lesson.kicker}
        slides={lesson.slides}
        answers={answers}
        onRestart={() => setAnswers(null)}
        onExit={goHome}
      />
    );
  }

  return (
    <LessonPlayer
      slides={lesson.slides}
      Figure={lesson.Figure}
      watchHint={lesson.watchHint}
      tryHint={lesson.tryHint}
      onFinish={setAnswers}
      onExit={goHome}
    />
  );
}
