/**
 * Climb and Summit quiz data model.
 *
 * Every Journey lesson can carry a two-section assessment that lives beside its
 * `slides.ts`:
 *   - Climb: a practice set (about 15 questions). Missed questions can be retried
 *     so the learner works to understanding; the raw score records the first try.
 *   - Summit: a mastery set (about 15 questions), one locked attempt each.
 *
 * These files stay import-safe (type-only imports plus KaTeX strings) so the eval
 * harness can load them in Node, exactly like `slides.ts`.
 */

/** One answer option. Exactly one choice per question has `correct: true`. */
export type QuizChoice = {
  /** Option text, KaTeX allowed with `$...$`. */
  text: string;
  /** True for the single correct option. */
  correct?: boolean;
  /**
   * A short "why". For the correct option, why it is right; for a distractor,
   * the specific trap it represents and how to avoid it. KaTeX allowed.
   */
  explain: string;
};

/** One multiple-choice question in a Climb or Summit section. */
export type QuizQuestion = {
  /** Stable id, unique within its section. */
  id: string;
  /** The question stem, KaTeX allowed. */
  prompt: string;
  /** 3 to 5 options; exactly one has `correct: true`. */
  choices: QuizChoice[];
};

export type QuizSection = QuizQuestion[];

/** A lesson's full assessment: a practice section and a mastery section. */
export type LessonQuiz = {
  /** Practice: about 15 questions, retryable. */
  climb: QuizSection;
  /** Mastery: about 15 questions, one attempt each. */
  summit: QuizSection;
};

export type QuizPhase = "climb" | "summit";

/** Per-question outcome the runner records to build the raw score report. */
export type QuizOutcome = {
  questionId: string;
  chosen: number | null;
  correct: boolean;
  /** True when the learner got it right with no wrong attempt first. */
  firstTry: boolean;
};

/** The index of the single correct option, or -1 if malformed. */
export function correctIndex(q: QuizQuestion): number {
  return q.choices.findIndex((c) => c.correct === true);
}

/**
 * Deterministic shuffle seeded by a string, so choice order is scattered (the
 * correct option is not always first) yet stable across renders and reruns.
 */
export function seededShuffle<T>(arr: T[], seed: string): T[] {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const rand = () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return ((h >>> 0) % 100000) / 100000;
  };
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Return a question with its choices scattered deterministically by id. */
export function shuffledQuestion(q: QuizQuestion): QuizQuestion {
  return { ...q, choices: seededShuffle(q.choices, q.id) };
}
