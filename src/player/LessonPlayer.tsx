import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ComponentType } from "react";
import NarratedText from "../components/NarratedText";
import Rich from "../components/Rich";
import { beatMoves, paramsOf, revealAt, startValues, valuesAt } from "../lessons/engine";
import type { LessonFigureProps, Slide } from "../lessons/types";
import { answerKey, isFirstTry, type AnswerRecord } from "../lib/answers";
import { estimateSpeechMs, onSpeakingChange, prefetchSpeech, speakNow, stopSpeech, unlockAudio } from "../lib/speech";

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const letters = ["A", "B", "C", "D"];

/** Format a world coordinate for a plot label: integers stay clean, else 2 dp. */
const formatCoord = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2));

type Phase = "narrating" | "animating" | "done";

export default function LessonPlayer({
  slides,
  Figure,
  watchHint,
  tryHint,
  onFinish,
  onExit,
}: {
  slides: Slide[];
  Figure: ComponentType<LessonFigureProps>;
  watchHint: string;
  tryHint: string;
  onFinish: (answers: Record<string, AnswerRecord>) => void;
  onExit: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState<"watch" | "try">("watch");
  const [cue, setCue] = useState(-1);
  const [phase, setPhase] = useState<Phase>("done");
  const [values, setValues] = useState<Record<string, number>>(() => startValues(slides[0]));
  const [answers, setAnswers] = useState<Record<string, AnswerRecord>>({});
  const [cursors, setCursors] = useState<Record<string, number>>({});
  const [guesses, setGuesses] = useState<Record<string, { x: number; y: number }>>({});
  // Keyboard cursor for plot questions, keyed by answerKey. Separate from the
  // committed guess so arrow-key navigation does not trip the retry message.
  const [plotCursor, setPlotCursor] = useState<Record<string, { x: number; y: number }>>({});
  const [showHint, setShowHint] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [rate, setRate] = useState(0.95);
  const [speaking, setSpeaking] = useState(false);
  const [speechProgress, setSpeechProgress] = useState(1);
  const [legProgress, setLegProgress] = useState(1);

  const slide = slides[Math.min(index, slides.length - 1)] ?? slides[0];
  const slideIndex = slides.indexOf(slide);
  const watching = stage === "watch";
  const currentQuestion = cursors[slide.id] ?? 0;
  const question = watching ? undefined : slide.questions[currentQuestion];
  const record = question ? answers[answerKey(slide.id, currentQuestion)] : undefined;
  const choice = record?.choice ?? null;
  const solved = Boolean(record?.completed);

  // Vertically center the panel content, but pin it at its resting position so a
  // revealed success/hint line grows the box downward without shifting the block
  // upward and without reserving blank space beforehand. We measure the content
  // excluding the feedback slot and add a top spacer equal to half the free space.
  const panelBodyRef = useRef<HTMLDivElement>(null);
  const panelCenterRef = useRef<HTMLDivElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const [restPad, setRestPad] = useState(0);

  useLayoutEffect(() => {
    const body = panelBodyRef.current;
    const center = panelCenterRef.current;
    if (!body || !center) return;
    const measure = () => {
      const avail = body.clientHeight;
      const feedbackH = feedbackRef.current?.offsetHeight ?? 0;
      const restH = center.offsetHeight - feedbackH;
      setRestPad(Math.max(0, (avail - restH) / 2));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(body);
    ro.observe(center);
    return () => ro.disconnect();
  }, [watching, cue, currentQuestion, solved, showHint, choice, slideIndex, stage]);

  const params = paramsOf(slide);
  const primaryKey = params[0].key;
  const paramsRef = useRef(params);
  paramsRef.current = params;
  const valuesRef = useRef(values);
  valuesRef.current = values;
  const cueRef = useRef(cue);
  cueRef.current = cue;
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const resumeAtEnd = useRef(false);
  const revealFrame = useRef(0);
  const animFrame = useRef(0);

  useEffect(() => () => stopSpeech(), []);

  const reveal = revealAt(slide, watching ? cue : slide.beats.length - 1, watching ? phase : "done");

  useEffect(() => {
    stopSpeech();
    if (revealFrame.current) cancelAnimationFrame(revealFrame.current);
    const resuming = resumeAtEnd.current;
    resumeAtEnd.current = false;
    setStage("watch");
    setCue(resuming ? slide.beats.length - 1 : -1);
    setPhase("done");
    setSpeechProgress(1);
    setLegProgress(1);
    setValues(resuming ? valuesAt(slide, slide.beats.length - 1) : startValues(slide));
  }, [slide]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      for (const beat of slide.beats) {
        if (cancelled) return;
        await prefetchSpeech(beat.text, rate).catch(() => undefined);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [rate, slide]);

  useEffect(() => {
    setShowHint(false);
    if (!question || solved) return;
    const timer = window.setTimeout(() => setShowHint(true), 12000);
    return () => window.clearTimeout(timer);
  }, [question, solved]);

  useEffect(() => {
    if (!watching || phase !== "animating" || cue < 0) return;
    const beat = slide.beats[cue];
    if (!beat) return;
    const from = valuesRef.current;
    const targets = valuesAt(slide, cue);
    const keys = paramsOf(slide)
      .map((p) => p.key)
      .filter((k) => Math.abs((targets[k] ?? 0) - (from[k] ?? 0)) > 0.5);
    const moves = keys.length > 0;
    const draws = Boolean(beat.draw);
    const duration = beat.ms ?? 1400;

    if (reduceMotion || (!moves && !draws)) {
      if (moves) setValues((current) => ({ ...current, ...targets }));
      if (draws) setLegProgress(1);
      setPhase("done");
      return;
    }

    if (draws) setLegProgress(0);
    const start = { ...from };
    const startedAt = performance.now();
    animFrame.current = requestAnimationFrame(function tick(now) {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = easeInOutCubic(progress);
      if (moves) {
        setValues((current) => {
          const next = { ...current };
          for (const k of keys) next[k] = start[k] + (targets[k] - start[k]) * eased;
          return next;
        });
      }
      if (draws) setLegProgress(progress);
      if (progress < 1) animFrame.current = requestAnimationFrame(tick);
      else {
        if (moves) setValues((current) => ({ ...current, ...targets }));
        if (draws) setLegProgress(1);
        animFrame.current = 0;
        setPhase("done");
      }
    });
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
      animFrame.current = 0;
    };
  }, [cue, phase, reduceMotion, slide, watching]);

  useEffect(() => {
    if (!question || question.kind !== "manipulate" || record?.completed) return;
    if (!question.check(values[primaryKey] ?? 0, values)) return;
    const key = answerKey(slide.id, currentQuestion);
    setAnswers((current) => {
      const previous = current[key];
      return {
        ...current,
        [key]: {
          choice: previous?.choice ?? null,
          firstTryCorrect: previous?.firstTryCorrect ?? true,
          completed: true,
        },
      };
    });
  }, [values, primaryKey, currentQuestion, question, record?.completed, slide.id]);

  const setValue = useCallback((key: string, updater: (current: number) => number) => {
    setValues((current) => {
      const spec = paramsRef.current.find((p) => p.key === key);
      const next = updater(current[key] ?? spec?.start ?? 0);
      const clamped = spec ? Math.min(spec.max, Math.max(spec.min, next)) : next;
      return { ...current, [key]: clamped };
    });
  }, []);

  const questionRef = useRef(question);
  questionRef.current = question;

  /** Record a click for the active plot question and score it against the target(s). */
  const registerGuess = useCallback(
    (point: { x: number; y: number }) => {
      const active = questionRef.current;
      if (!active || active.kind !== "plot") return;
      const key = answerKey(slide.id, currentQuestion);
      const accepted = active.targets ?? [active.target];
      const dist = Math.min(...accepted.map((t) => Math.hypot(point.x - t.x, point.y - t.y)));
      const correct = dist <= (active.tolerance ?? 0.6);
      setGuesses((current) => ({ ...current, [key]: point }));
      setAnswers((current) => {
        const previous = current[key];
        if (previous?.completed) return current;
        return {
          ...current,
          [key]: {
            choice: previous?.choice ?? null,
            firstTryCorrect: previous?.firstTryCorrect ?? correct,
            completed: correct,
          },
        };
      });
    },
    [currentQuestion, slide.id],
  );

  // Refs so the window keydown listener (registered once) always reads the live
  // plot question, its answer key, solved state, cursor, and scorer.
  const registerGuessRef = useRef(registerGuess);
  registerGuessRef.current = registerGuess;
  const plotKeyRef = useRef("");
  plotKeyRef.current = answerKey(slide.id, currentQuestion);
  const solvedRef = useRef(solved);
  solvedRef.current = solved;
  const plotCursorRef = useRef(plotCursor);
  plotCursorRef.current = plotCursor;

  const plotState = (() => {
    if (watching || question?.kind !== "plot") return undefined;
    const key = answerKey(slide.id, currentQuestion);
    const guess = guesses[key] ?? null;
    const accepted = question.targets ?? [question.target];
    // Snap the solved marker/label to whichever accepted point the learner clicked.
    const shownTarget =
      guess && accepted.length > 1
        ? accepted.reduce((best, t) =>
            Math.hypot(guess.x - t.x, guess.y - t.y) < Math.hypot(guess.x - best.x, guess.y - best.y)
              ? t
              : best,
          )
        : question.target;
    const shownLabel = question.targets
      ? `(${formatCoord(shownTarget.x)}, ${formatCoord(shownTarget.y)})`
      : question.label;
    return {
      target: shownTarget,
      tolerance: question.tolerance ?? 0.6,
      guess,
      cursor: plotCursor[key] ?? null,
      solved,
      label: shownLabel,
      onGuess: registerGuess,
    };
  })();

  const beginAnimation = useCallback((forCue: number) => {
    if (cueRef.current !== forCue) return;
    stopSpeech();
    if (revealFrame.current) cancelAnimationFrame(revealFrame.current);
    const beat = slide.beats[forCue];
    if (beat?.draw) setLegProgress(0);
    phaseRef.current = "animating";
    setPhase("animating");
  }, [slide.beats]);

  /** Snap an in-progress animation to the current beat's intended end state. */
  const completeAnimation = useCallback(() => {
    if (animFrame.current) cancelAnimationFrame(animFrame.current);
    animFrame.current = 0;
    setValues((current) => ({ ...current, ...valuesAt(slide, cueRef.current) }));
    setLegProgress(1);
    phaseRef.current = "done";
    setPhase("done");
  }, [slide]);

  const finishNarration = useCallback(
    (forCue: number) => {
      if (cueRef.current !== forCue) return;
      setSpeechProgress(1);
      const beat = slide.beats[forCue];
      if (beatMoves(beat, valuesAt(slide, forCue - 1), slide)) beginAnimation(forCue);
      else {
        phaseRef.current = "done";
        setPhase("done");
      }
    },
    [beginAnimation, slide],
  );

  const beginCue = useCallback(
    (nextCue: number) => {
      const beat = slide.beats[nextCue];
      if (!beat) return;
      if (revealFrame.current) cancelAnimationFrame(revealFrame.current);
      cueRef.current = nextCue;
      phaseRef.current = "narrating";
      setSpeechProgress(0);
      setCue(nextCue);
      setPhase("narrating");
      if (audioEnabled) {
        speakNow(beat.text, rate, {
          onProgress: (progress) => {
            if (cueRef.current === nextCue) setSpeechProgress(progress);
          },
          onEnd: () => finishNarration(nextCue),
        });
        return;
      }
      const startedAt = performance.now();
      const duration = estimateSpeechMs(beat.text, rate);
      const tick = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / duration);
        setSpeechProgress(progress);
        if (progress < 1) {
          revealFrame.current = requestAnimationFrame(tick);
          return;
        }
        finishNarration(nextCue);
      };
      revealFrame.current = requestAnimationFrame(tick);
    },
    [audioEnabled, finishNarration, rate, slide.beats],
  );

  const lastCue = cue >= slide.beats.length - 1;
  const hasQuestions = slide.questions.length > 0;
  const lastQuestion = currentQuestion >= slide.questions.length - 1;
  const lastSlide = slideIndex === slides.length - 1;

  const goForward = useCallback(() => {
    unlockAudio();
    if (watching) {
      if (cue >= 0 && phase === "narrating") {
        stopSpeech();
        if (revealFrame.current) cancelAnimationFrame(revealFrame.current);
        finishNarration(cue);
        return;
      }
      if (cue >= 0 && phase === "animating") {
        completeAnimation();
        return;
      }
      if (!lastCue) {
        beginCue(cue + 1);
        return;
      }
      stopSpeech();
      setStage("try");
      return;
    }
    if (question && !solved) return;
    if (hasQuestions && !lastQuestion) {
      setCursors((current) => ({ ...current, [slide.id]: currentQuestion + 1 }));
      return;
    }
    if (lastSlide) {
      onFinish(answers);
      return;
    }
    setIndex((current) => current + 1);
  }, [
    beginCue,
    completeAnimation,
    cue,
    finishNarration,
    hasQuestions,
    lastCue,
    lastQuestion,
    lastSlide,
    onFinish,
    phase,
    question,
    currentQuestion,
    slide.id,
    solved,
    watching,
    answers,
  ]);

  const goBack = useCallback(() => {
    unlockAudio();
    stopSpeech();
    if (revealFrame.current) cancelAnimationFrame(revealFrame.current);
    setSpeechProgress(1);
    setLegProgress(1);
    if (!watching) {
      if (currentQuestion > 0) {
        setCursors((current) => ({ ...current, [slide.id]: currentQuestion - 1 }));
        return;
      }
      setStage("watch");
      setCue(slide.beats.length - 1);
      setPhase("done");
      return;
    }
    if (cue > -1) {
      const previous = cue - 1;
      setCue(previous);
      setPhase("done");
      setValues(previous < 0 ? startValues(slide) : valuesAt(slide, previous));
      return;
    }
    if (slideIndex > 0) {
      resumeAtEnd.current = true;
      setIndex((current) => current - 1);
    }
  }, [cue, currentQuestion, slideIndex, slide, watching]);

  const atStart = watching && cue === -1 && slideIndex === 0;

  useEffect(() => onSpeakingChange(setSpeaking), []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, select, textarea")) return;
      const active = questionRef.current;

      // Plot questions: arrow keys nudge a keyboard cursor on the plane and
      // Enter places the point, so the click-a-point task works without a mouse.
      if (!watching && active?.kind === "plot") {
        if (solvedRef.current) return;
        const key = plotKeyRef.current;
        const accepted = active.targets ?? [active.target];
        const reach = Math.max(6, ...accepted.map((t) => Math.max(Math.abs(t.x), Math.abs(t.y)))) + 3;
        const clampReach = (v: number) => Math.min(reach, Math.max(-reach, v));
        const nudge = (dx: number, dy: number) => {
          const stepUnits = event.shiftKey ? 2 : 0.5;
          setPlotCursor((cur) => {
            const base = cur[key] ?? { x: 0, y: 0 };
            return { ...cur, [key]: { x: clampReach(base.x + dx * stepUnits), y: clampReach(base.y + dy * stepUnits) } };
          });
        };
        if (event.key === "ArrowRight") return event.preventDefault(), nudge(1, 0);
        if (event.key === "ArrowLeft") return event.preventDefault(), nudge(-1, 0);
        if (event.key === "ArrowUp") return event.preventDefault(), nudge(0, 1);
        if (event.key === "ArrowDown") return event.preventDefault(), nudge(0, -1);
        if (event.key === "Enter" || event.key === " ") {
          const pt = plotCursorRef.current[key];
          if (pt) {
            event.preventDefault();
            registerGuessRef.current(pt);
          }
        }
        return;
      }

      if (watching) {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          goForward();
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goBack();
        }
        return;
      }

      const primary = paramsRef.current[0];
      if (!primary) return;
      const step = primary.step ?? 5;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setValue(primary.key, (current) => current + (event.shiftKey ? step * 3 : step));
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setValue(primary.key, (current) => current - (event.shiftKey ? step * 3 : step));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goBack, goForward, setValue, watching]);

  const primaryLabel = watching
    ? lastCue && phase !== "narrating"
      ? "Your turn"
      : "Next"
    : hasQuestions && !lastQuestion
      ? "Next question"
      : lastSlide
        ? "See score"
        : "Continue";

  const motionNow = beatMoves(slide.beats[cue], valuesAt(slide, cue - 1), slide);
  const attention =
    watching
      ? cue < 0 || (phase === "done" && !motionNow)
        ? "both"
        : phase === "animating" || (phase === "done" && motionNow)
          ? "figure"
          : "copy"
      : question?.kind === "manipulate" || question?.kind === "plot"
        ? "figure"
        : "copy";
  const lookMessage =
    attention === "copy"
      ? "Read the lesson text."
      : attention === "figure"
        ? watching
          ? watchHint
          : tryHint
        : "";
  const cueProgress = watching ? Math.max(0, cue + 1) / slide.beats.length : 1;
  const questionTotal = slide.questions.length;
  const questionEarned = slide.questions.filter((_, questionIndex) =>
    isFirstTry(answers[answerKey(slide.id, questionIndex)]),
  ).length;
  const showScore = slide.questions.some(
    (_, questionIndex) => answers[answerKey(slide.id, questionIndex)]?.firstTryCorrect != null,
  );

  return (
    <div className="app">
      <header className="topbar">
        <a
          href="#/"
          className="brand"
          aria-label="Back to all lessons"
          onClick={(event) => {
            event.preventDefault();
            onExit();
          }}
        >
          Bloomy
        </a>
        <div
          className="topbar__track"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={slides.length}
          aria-valuenow={slideIndex + 1}
          aria-label={`Lesson progress, section ${index + 1} of ${slides.length}`}
        >
          {slides.map((item, dotIndex) => (
            <span key={item.id} className={dotIndex < slideIndex ? "seg seg--done" : "seg"}>
              {dotIndex === slideIndex && (
                <motion.i animate={{ scaleX: cueProgress }} transition={{ duration: 0.3 }} />
              )}
            </span>
          ))}
        </div>
        <p className="topbar__meta">
          <span className={watching ? "chip chip--watch" : "chip chip--try"}>
            {watching ? "Watch" : "Your turn"}
          </span>
          <span>
            {slideIndex + 1} of {slides.length}
          </span>
        </p>
      </header>

      <p className="sr-only" role="status">
        {lookMessage}
      </p>

      <main
        className={`stage is-focus-${attention}${
          !watching && (question?.kind === "manipulate" || question?.kind === "plot") ? " is-soft" : ""
        }`}
      >
        <section className="panel">
          <div className="panel__body" ref={panelBodyRef}>
            <div className="panel__spacer" style={{ height: restPad }} aria-hidden="true" />
            <div className="panel__center" ref={panelCenterRef}>
              {watching ? (
                <NarratedText
                  lines={slide.beats.map((beat) => beat.text)}
                  cue={cue}
                  progress={speechProgress}
                  hold={phase !== "narrating"}
                />
              ) : (
                <div className="narration">
                  <p>
                    <Rich>{slide.practice}</Rich>
                  </p>
                </div>
              )}

              {watching && cue < 0 && (
                <div className="slide-open">
                  <p className="slide-open__title">{slide.title}</p>
                  <p className="slide-open__hint">
                    Use <kbd>→</kbd> or press Next to continue.
                  </p>
                </div>
              )}

              {!watching && !slide.hideSliders && question?.kind !== "plot" && (
                <div className="controls-params">
                  {params.map((p) => (
                    <label className="angle-control" key={p.key}>
                      <span>{p.label}</span>
                      <input
                        type="range"
                        min={p.min}
                        max={p.max}
                        step={1}
                        value={Math.round(values[p.key] ?? p.start)}
                        onChange={(event) => setValue(p.key, () => Number(event.target.value))}
                        aria-valuetext={p.format(values[p.key] ?? p.start)}
                      />
                      <output>{p.format(values[p.key] ?? p.start)}</output>
                    </label>
                  ))}
                </div>
              )}

              {question && (
                <div className={`question ${solved ? "question--solved" : ""}`}>
                  <p className="question__kicker">
                    <span className="question__mark" aria-hidden="true">
                      ?
                    </span>
                    Question {currentQuestion + 1} of {slide.questions.length}
                    {showScore && (
                      <span
                        className={questionEarned === questionTotal ? "try-flag try-flag--yes" : "try-flag"}
                        aria-label={`${questionEarned} of ${questionTotal} correct on the first try`}
                      >
                        {questionEarned}/{questionTotal}
                      </span>
                    )}
                  </p>
                  <p className="question__prompt">
                    <Rich>{question.prompt}</Rich>
                  </p>

                  {question.kind === "plot" && !solved && (
                    <>
                      <p className="question__plot-help">
                        Click the plane, or use the arrow keys and press <kbd>Enter</kbd> to place the point.
                      </p>
                      <p className="sr-only" aria-live="polite">
                        {plotState?.cursor
                          ? `Point at x ${formatCoord(plotState.cursor.x)}, y ${formatCoord(plotState.cursor.y)}.`
                          : "Press an arrow key to move the point, then Enter to place it."}
                      </p>
                    </>
                  )}

                  {question.kind === "choice" && (
                    <div className="question__options">
                      {question.options.map((option, optionIndex) => {
                        const chosen = choice === optionIndex;
                        const correct = optionIndex === question.answer;
                        return (
                          <button
                            key={option}
                            type="button"
                            className={chosen ? (correct ? "correct" : "wrong") : ""}
                            onClick={() => {
                              if (question.kind !== "choice") return;
                              const isCorrect = optionIndex === question.answer;
                              const key = answerKey(slide.id, currentQuestion);
                              setAnswers((current) => {
                                const previous = current[key];
                                return {
                                  ...current,
                                  [key]: {
                                    choice: optionIndex,
                                    firstTryCorrect: previous?.firstTryCorrect ?? isCorrect,
                                    completed: isCorrect,
                                  },
                                };
                              });
                            }}
                          >
                            <span className="choice-letter">{letters[optionIndex]}</span>
                            <span className="choice-text">
                              <Rich>{option}</Rich>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <div className="question__feedback" ref={feedbackRef}>
                    {question.kind === "choice" && choice !== null && !solved && (
                      <p className="question__retry">Not quite. Try another option.</p>
                    )}

                    {question.kind === "plot" && plotState?.guess && !solved && (
                      <p className="question__retry">Not quite. Read off the coordinates and click again.</p>
                    )}

                    {solved && (
                      <p className="question__success">
                        <Rich>{question.success}</Rich>
                      </p>
                    )}
                    {!solved && showHint && (
                      <p className="question__hint">
                        Hint: <Rich>{question.hint}</Rich>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="controls">
            <button type="button" className="btn btn--quiet" disabled={atStart} onClick={goBack}>
              Back
            </button>
            <div className="controls__right">
              <div className="audio" role="group" aria-label="Narration audio">
                <button
                  type="button"
                  className={`btn btn--quiet ${speaking ? "is-speaking" : ""}`}
                  aria-pressed={audioEnabled}
                  onClick={() => {
                    if (audioEnabled) {
                      stopSpeech();
                      setAudioEnabled(false);
                      return;
                    }
                    setAudioEnabled(true);
                    unlockAudio();
                    speakNow("Audio is on.", rate);
                  }}
                >
                  {audioEnabled ? (speaking ? "Speaking" : "Audio on") : "Audio off"}
                </button>
                <label>
                  <span className="sr-only">Narration speed</span>
                  <select
                    value={rate}
                    onChange={(event) => setRate(Number(event.target.value))}
                  >
                    <option value={0.7}>0.7x</option>
                    <option value={0.85}>0.85x</option>
                    <option value={0.95}>1x</option>
                    <option value={1.15}>1.2x</option>
                    <option value={1.4}>1.4x</option>
                  </select>
                </label>
              </div>
              <button
                type="button"
                className="btn btn--primary"
                disabled={Boolean(question) && !solved}
                onClick={goForward}
              >
                {primaryLabel}
              </button>
            </div>
          </div>
        </section>

        <Figure
          value={values[primaryKey] ?? 0}
          values={values}
          slide={slide}
          reveal={reveal}
          drawProgress={watching ? legProgress : 1}
          interactive={!watching}
          plot={plotState}
          onValue={(updater) => setValue(primaryKey, updater)}
          setValue={setValue}
        />
      </main>
    </div>
  );
}
