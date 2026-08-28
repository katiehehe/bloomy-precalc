import { spawn } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";

const wavCache = new Map<string, Uint8Array>();

function runSay(text: string, rate: number, outFile: string, voice: string) {
  const wpm = Math.round(Math.min(280, Math.max(120, 185 * rate)));
  return new Promise<void>((resolve, reject) => {
    const child = spawn("say", [
      "-v",
      voice,
      "-r",
      String(wpm),
      "-o",
      outFile,
      "--data-format=LEI16@22050",
      text,
    ]);
    let stderr = "";
    child.stderr.on("data", (chunk) => {
      stderr += String(chunk);
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(stderr || `say exited ${code}`));
    });
  });
}

async function handleTts(req: IncomingMessage, res: ServerResponse) {
  const host = req.headers.host ?? "localhost";
  const url = new URL(req.url ?? "/", `http://${host}`);
  const text = (url.searchParams.get("text") ?? "").slice(0, 1800);
  const rate = Number(url.searchParams.get("rate") ?? "1") || 1;

  if (!text) {
    res.statusCode = 400;
    res.end("missing text");
    return;
  }

  const cacheKey = `${rate}:${text}`;
  const cached = wavCache.get(cacheKey);
  if (cached) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "audio/wav");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.end(cached);
    return;
  }

  const dir = await mkdtemp(join(tmpdir(), "bloomy-tts-"));
  const outFile = join(dir, "line.wav");

  try {
    try {
      await runSay(text, rate, outFile, "Samantha");
    } catch {
      await runSay(text, rate, outFile, "Albert");
    }
    const wav = await readFile(outFile);
    wavCache.set(cacheKey, wav);
    res.statusCode = 200;
    res.setHeader("Content-Type", "audio/wav");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.end(wav);
  } catch (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain");
    res.end(error instanceof Error ? error.message : "tts failed");
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

export function ttsPlugin(): Plugin {
  const mount = (server: { middlewares: { use: (fn: unknown) => void } }) => {
    server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: () => void) => {
      if (!req.url?.startsWith("/api/tts")) {
        next();
        return;
      }
      void handleTts(req, res);
    });
  };

  return {
    name: "bloomy-tts",
    configureServer: mount,
    configurePreviewServer: mount,
  };
}
