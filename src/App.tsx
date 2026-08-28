import { useEffect, useState } from "react";
import Catalog from "./catalog/Catalog";
import CurriculumMap from "./curriculum/CurriculumMap";
import { readyLesson } from "./lessons";
import LessonPlayer from "./player/LessonPlayer";
import Recap from "./player/Recap";
import type { AnswerRecord } from "./lib/answers";

type Route = { name: "catalog" } | { name: "map" } | { name: "lesson"; id: string };

function routeFromHash(): Route {
  const raw = window.location.hash.replace(/^#\/?/, "").trim();
  if (!raw) return { name: "catalog" };
  const id = raw.split("/")[0] ?? "";
  if (id === "map") return { name: "map" };
  return { name: "lesson", id };
}

export default function App() {
  const [route, setRoute] = useState<Route>(() => routeFromHash());
  const [answers, setAnswers] = useState<Record<string, AnswerRecord> | null>(null);
  const lesson = route.name === "lesson" ? readyLesson(route.id) : undefined;

  useEffect(() => {
    const sync = () => {
      setRoute(routeFromHash());
      setAnswers(null);
    };
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const goToCatalog = () => {
    if (window.location.hash) window.location.hash = "";
    else {
      setRoute({ name: "catalog" });
      setAnswers(null);
    }
  };

  if (route.name === "map") {
    return <CurriculumMap />;
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
        onExit={goToCatalog}
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
      onExit={goToCatalog}
    />
  );
}
