/**
 * Lesson narration audio.
 *
 * Locally, /api/tts (macOS `say` on the Vite dev server) returns real audio and
 * we play it with an <audio> element. On static hosting (Firebase) that route
 * does not exist, so we fall back to the browser's Web Speech API and drive the
 * word-by-word reveal from its `boundary` events, which stay in sync with the
 * actual speech instead of a guessed timer.
 */

export function speakable(text: string) {
  return text
    .replaceAll("**", "")
    .replaceAll("θ", " theta ")
    .replaceAll("π", " pi ")
    .replaceAll("²", " squared ")
    .replaceAll("°", " degrees ")
    .replace(/\bcos\b/g, "cosine")
    .replace(/\bsin\b/g, "sine")
    .replaceAll("coterminal", " co-terminal ")
    .replace(/\s+/g, " ")
    .trim();
}

export function estimateSpeechMs(text: string, rate: number) {
  const words = speakable(text).split(/\s+/).filter(Boolean).length;
  return Math.round((words / Math.max(0.5, rate)) * 360 + 250);
}

export type SpeakHandlers = {
  onStart?: () => void;
  onProgress?: (progress: number) => void;
  onEnd?: () => void;
};

let generation = 0;
let player: HTMLAudioElement | null = null;
let silent: HTMLAudioElement | null = null;
let listeners: Array<(speaking: boolean) => void> = [];
const blobCache = new Map<string, string>();
const inflight = new Map<string, Promise<string>>();

/** null = untested, true = /api/tts serves audio, false = static host (use Web Speech). */
let ttsAvailable: boolean | null = null;

/** Chrome garbage-collects utterances with no live reference mid-speech; hold one. */
let currentUtterance: SpeechSynthesisUtterance | null = null;
let keepAlive: number | null = null;

function cacheKey(text: string, rate: number) {
  return `${rate}:${speakable(text)}`;
}

function notify(speaking: boolean) {
  for (const listener of listeners) listener(speaking);
}

export function onSpeakingChange(listener: (speaking: boolean) => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((item) => item !== listener);
  };
}

function canSynthesize() {
  return (
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    typeof window.SpeechSynthesisUtterance !== "undefined"
  );
}

/** Nudge the browser to load its voice list; the first getVoices() is often empty. */
function warmVoices() {
  if (!canSynthesize()) return;
  const synth = window.speechSynthesis;
  if (!synth.getVoices().length) {
    synth.onvoiceschanged = () => {
      synth.onvoiceschanged = null;
    };
  }
}

function pickVoice() {
  if (!canSynthesize()) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const english = voices.filter((v) => /^en(-|_|$)/i.test(v.lang));
  const preferred = english.find((v) =>
    /Samantha|Google US English|Microsoft (Zira|Aria|Jenny)|Karen|Serena|Daniel/i.test(v.name),
  );
  return preferred ?? english[0] ?? voices[0] ?? null;
}

function clearKeepAlive() {
  if (keepAlive !== null) {
    window.clearInterval(keepAlive);
    keepAlive = null;
  }
}

function clearPlayer() {
  if (player) {
    player.pause();
    player.removeAttribute("src");
    player.load();
    player = null;
  }
}

export function stopSpeech() {
  generation += 1;
  notify(false);
  clearPlayer();
  clearKeepAlive();
  currentUtterance = null;
  if (canSynthesize()) window.speechSynthesis.cancel();
}

/** Call from a click so later Audio.play() and speech calls are allowed. */
export function unlockAudio() {
  warmVoices();
  if (silent) return;
  silent = new Audio(
    "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA",
  );
  silent.volume = 0.001;
  void silent.play().catch(() => undefined);
}

export function prefetchSpeech(text: string, rate: number) {
  const spoken = speakable(text);
  if (!spoken) return Promise.resolve("");
  // Once we know there is no TTS server, don't keep hitting the SPA rewrite.
  if (ttsAvailable === false) return Promise.reject(new Error("tts unavailable"));
  const key = cacheKey(text, rate);
  const cached = blobCache.get(key);
  if (cached) return Promise.resolve(cached);
  const pending = inflight.get(key);
  if (pending) return pending;

  const request = fetch(`/api/tts?text=${encodeURIComponent(spoken)}&rate=${encodeURIComponent(String(rate))}`)
    .then(async (response) => {
      if (!response.ok) throw new Error(`tts ${response.status}`);
      const blob = await response.blob();
      // On static hosting the /api/tts route doesn't exist and the SPA rewrite
      // returns index.html with a 200. Only accept a real audio payload so the
      // caller can fall back to Web Speech instead of "playing" HTML.
      if (!blob.type.startsWith("audio/")) throw new Error(`tts non-audio: ${blob.type || "unknown"}`);
      ttsAvailable = true;
      const url = URL.createObjectURL(blob);
      blobCache.set(key, url);
      inflight.delete(key);
      return url;
    })
    .catch((error) => {
      inflight.delete(key);
      ttsAvailable = false;
      throw error;
    });

  inflight.set(key, request);
  return request;
}

/** Speak with the browser's built-in voice and drive the reveal from boundary events. */
function speakViaSynthesis(
  text: string,
  spoken: string,
  rate: number,
  token: number,
  handlers: SpeakHandlers,
  settle: () => void,
) {
  const total = Math.max(1, spoken.length);
  const startedAt = performance.now();
  const duration = estimateSpeechMs(text, rate);
  let progress = 0;
  let usingBoundary = false;
  let lastBoundaryAt = startedAt;
  let done = false;

  const report = (value: number) => {
    if (token !== generation) return;
    const next = Math.min(1, Math.max(progress, value));
    progress = next;
    handlers.onProgress?.(next);
  };

  const finish = () => {
    if (done) return;
    done = true;
    clearKeepAlive();
    settle();
  };

  let spoke = false;
  if (canSynthesize()) {
    try {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(spoken);
      utterance.rate = Math.min(2, Math.max(0.6, rate));
      utterance.lang = "en-US";
      const voice = pickVoice();
      if (voice) utterance.voice = voice;
      currentUtterance = utterance;

      utterance.onstart = () => {
        if (token !== generation) return;
        notify(true);
        handlers.onStart?.();
      };
      utterance.onboundary = (event) => {
        if (token !== generation) return;
        usingBoundary = true;
        lastBoundaryAt = performance.now();
        if (typeof event.charIndex === "number") report(event.charIndex / total);
      };
      utterance.onend = () => {
        report(1);
        finish();
      };
      utterance.onerror = () => finish();

      try {
        synth.resume();
      } catch {
        // ignore: resume is only needed to recover a paused engine
      }
      synth.cancel();
      synth.speak(utterance);
      spoke = true;

      clearKeepAlive();
      keepAlive = window.setInterval(() => {
        // Chrome silently pauses speech after ~15s; keep nudging it awake.
        try {
          if (window.speechSynthesis.speaking) window.speechSynthesis.resume();
          else clearKeepAlive();
        } catch {
          clearKeepAlive();
        }
      }, 8000);

      // Safety net: some browsers never fire onend.
      window.setTimeout(() => finish(), duration + 6000);
    } catch {
      spoke = false;
    }
  }

  const tick = (now: number) => {
    if (token !== generation || done) return;
    const timeProgress = (now - startedAt) / duration;
    // Before any boundary event (or if they stall), advance on the timer so the
    // words never freeze. Once boundaries arrive, they lead and the timer only
    // fills gaps longer than a beat between words.
    if (!usingBoundary || now - lastBoundaryAt > 1200) report(timeProgress);
    if (progress < 1) {
      requestAnimationFrame(tick);
      return;
    }
    if (!spoke) finish();
  };
  requestAnimationFrame(tick);
}

export function speakNow(text: string, rate: number, handlers: SpeakHandlers = {}) {
  const spoken = speakable(text);
  const token = ++generation;
  notify(false);
  clearPlayer();

  if (!spoken) {
    handlers.onEnd?.();
    return;
  }

  unlockAudio();

  const settle = () => {
    if (token !== generation) return;
    generation += 1;
    notify(false);
    handlers.onProgress?.(1);
    handlers.onEnd?.();
  };

  // Known static host: go straight to Web Speech, synchronously inside the click
  // gesture, so the browser allows it to speak.
  if (ttsAvailable === false) {
    speakViaSynthesis(text, spoken, rate, token, handlers, settle);
    return;
  }

  void prefetchSpeech(text, rate)
    .then((url) => {
      if (token !== generation) return;
      const audio = new Audio(url);
      player = audio;

      const tick = () => {
        if (token !== generation || player !== audio) return;
        if (audio.duration > 0) {
          handlers.onProgress?.(Math.min(1, audio.currentTime / audio.duration));
        }
        if (!audio.paused && !audio.ended) requestAnimationFrame(tick);
      };

      audio.onplay = () => {
        if (token !== generation) return;
        notify(true);
        handlers.onStart?.();
        requestAnimationFrame(tick);
      };
      audio.ontimeupdate = () => {
        if (token !== generation || audio.duration <= 0) return;
        handlers.onProgress?.(Math.min(1, audio.currentTime / audio.duration));
      };
      audio.onended = settle;
      audio.onerror = settle;
      void audio.play().catch(() => settle());
    })
    .catch(() => {
      if (token !== generation) return;
      speakViaSynthesis(text, spoken, rate, token, handlers, settle);
    });
}
