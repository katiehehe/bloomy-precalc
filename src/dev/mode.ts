export type LessonStart = {
  slideIndex: number;
  stage: "watch" | "try";
  questionIndex?: number;
  beat?: number;
};

/** Live place in the app, used by Dev Jump to highlight and label "you are here". */
export type DevHere = {
  kind: "lesson" | "journey-lesson" | "quiz" | "journey" | "other";
  id?: string;
  phase?: "climb" | "summit";
  slideIndex?: number;
  stage?: "watch" | "try";
  questionIndex?: number;
  beat?: number;
};

const STORE = "bloomy-dev";

/** Query string sitting after `#/path?`. */
export function hashQuery(): URLSearchParams {
  const raw = window.location.hash.replace(/^#\/?/, "");
  const q = raw.split("?")[1] ?? "";
  return new URLSearchParams(q);
}

export function hashPath(): string[] {
  const raw = window.location.hash.replace(/^#\/?/, "").trim();
  const path = (raw.split("?")[0] ?? "").replace(/\/+$/, "");
  return path ? path.split("/") : [];
}

/**
 * Dev mode is on during `npm run dev` unless the author stored "off".
 * Production stays off unless `?dev=1` or the stored flag is on.
 */
export function isDevMode(): boolean {
  if (typeof window === "undefined") return false;
  const q = hashQuery().get("dev");
  if (q === "1") {
    window.localStorage.setItem(STORE, "1");
    return true;
  }
  if (q === "0") {
    window.localStorage.setItem(STORE, "0");
    return false;
  }
  const stored = window.localStorage.getItem(STORE);
  if (stored === "1") return true;
  if (stored === "0") return false;
  return Boolean(import.meta.env.DEV);
}

export function setDevMode(on: boolean) {
  window.localStorage.setItem(STORE, on ? "1" : "0");
  const parts = window.location.hash.replace(/^#\/?/, "").split("?");
  const path = parts[0] ?? "";
  const query = new URLSearchParams(parts[1] ?? "");
  if (on) query.set("dev", "1");
  else query.delete("dev");
  const next = query.toString();
  window.location.hash = next ? `#/${path}?${next}` : `#/${path}`;
}

export function parseLessonStart(query: URLSearchParams, slideCount: number, slideIds: string[]): LessonStart | undefined {
  const slideRaw = query.get("slide");
  const stageRaw = query.get("stage");
  const qRaw = query.get("q");
  const beatRaw = query.get("beat");
  if (slideRaw == null && stageRaw == null && qRaw == null && beatRaw == null) return undefined;

  let slideIndex = 0;
  if (slideRaw != null) {
    const asNum = Number(slideRaw);
    if (Number.isInteger(asNum)) slideIndex = asNum;
    else {
      const found = slideIds.indexOf(slideRaw);
      if (found >= 0) slideIndex = found;
    }
  }
  slideIndex = Math.min(Math.max(0, slideIndex), Math.max(0, slideCount - 1));

  const stage = stageRaw === "try" ? "try" : "watch";
  const questionIndex = qRaw != null && Number.isInteger(Number(qRaw)) ? Math.max(0, Number(qRaw)) : 0;
  const beat = beatRaw != null && Number.isInteger(Number(beatRaw)) ? Number(beatRaw) : undefined;
  return { slideIndex, stage, questionIndex, beat };
}

export function parseQuizStart(query: URLSearchParams): number {
  const qRaw = query.get("q");
  if (qRaw == null || !Number.isInteger(Number(qRaw))) return 0;
  return Math.max(0, Number(qRaw));
}

export function journeyLessonHref(
  id: string,
  start?: Partial<LessonStart> & { slideId?: string },
): string {
  const query = new URLSearchParams();
  if (isDevMode()) query.set("dev", "1");
  if (start?.slideId) query.set("slide", start.slideId);
  else if (start?.slideIndex != null) query.set("slide", String(start.slideIndex));
  if (start?.stage) query.set("stage", start.stage);
  if (start?.questionIndex != null) query.set("q", String(start.questionIndex));
  if (start?.beat != null) query.set("beat", String(start.beat));
  const q = query.toString();
  return q ? `#/journey/${id}?${q}` : `#/journey/${id}`;
}

export function baseLessonHref(
  id: string,
  start?: Partial<LessonStart> & { slideId?: string },
): string {
  const query = new URLSearchParams();
  if (isDevMode()) query.set("dev", "1");
  if (start?.slideId) query.set("slide", start.slideId);
  else if (start?.slideIndex != null) query.set("slide", String(start.slideIndex));
  if (start?.stage) query.set("stage", start.stage);
  if (start?.questionIndex != null) query.set("q", String(start.questionIndex));
  if (start?.beat != null) query.set("beat", String(start.beat));
  const q = query.toString();
  return q ? `#/${id}?${q}` : `#/${id}`;
}

export function quizHref(id: string, phase: "climb" | "summit", questionIndex?: number): string {
  const query = new URLSearchParams();
  if (isDevMode()) query.set("dev", "1");
  if (questionIndex != null) query.set("q", String(questionIndex));
  const q = query.toString();
  return q ? `#/journey/${id}/${phase}?${q}` : `#/journey/${id}/${phase}`;
}
