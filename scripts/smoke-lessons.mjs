#!/usr/bin/env node
// Runtime + visual smoke test for Bloomy lessons.
//
//   npm run smoke                 all ready lessons against a running dev server
//   npm run smoke -- polar-graphs conics
//   npm run smoke -- --serve      build + preview, then test, then shut down
//   npm run smoke -- --url http://localhost:5173
//
// It loads each lesson, records console errors, steps through the beats, checks
// the figure renders and the plane stays clickable, and writes per-step
// screenshots to evals/screenshots/<lesson>/. Errors -> exit 1.
//
// Playwright is optional. If it (or a server) is missing, the run is SKIPPED,
// not failed, so it never blocks the pipeline on infra. Install with:
//   npm i -D playwright && npx playwright install chromium
import { readFileSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const require = createRequire(import.meta.url);

const args = process.argv.slice(2);
const serve = args.includes("--serve");
const urlArg = (() => {
  const i = args.indexOf("--url");
  return i >= 0 ? args[i + 1] : null;
})();
const BASE = urlArg || "http://localhost:5173";
const wanted = args.filter((a) => !a.startsWith("--") && a !== urlArg);

function readyLessonIds() {
  const text = readFileSync(join(ROOT, "src", "lessons", "index.ts"), "utf8");
  return [...text.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]);
}

/** Lessons registered in the Journey tab; these live at #/journey/<id>. */
function journeyLessonIds() {
  const p = join(ROOT, "src", "journey", "registry.ts");
  if (!existsSync(p)) return [];
  const text = readFileSync(p, "utf8");
  return [...text.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]);
}

/** Map a lesson id to its hash route (Journey lessons are namespaced). */
function routeFor(id) {
  return journeyLessonIds().includes(id) ? `journey/${id}` : id;
}

async function loadPlaywright() {
  try {
    return await import("playwright");
  } catch {}
  // fall back to an npx-cached install, if any
  try {
    const p = require.resolve("playwright", { paths: [join(process.env.HOME || "", ".npm", "_npx")] });
    return await import(p);
  } catch {}
  return null;
}

async function reachable(url) {
  try {
    const res = await fetch(url, { method: "GET" });
    return res.ok || res.status === 200;
  } catch {
    return false;
  }
}

async function waitForServer(url, ms) {
  const stop = Date.now() + ms;
  while (Date.now() < stop) {
    if (await reachable(url)) return true;
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}

async function clickAdvance(page) {
  // Find a visible button that moves the lesson forward, and click it.
  const rx = /^(watch|next|your turn|continue|check|got it|skip|start|begin|try)/i;
  const buttons = await page.$$("button");
  for (const b of buttons) {
    const txt = ((await b.innerText().catch(() => "")) || "").trim();
    const visible = await b.isVisible().catch(() => false);
    const enabled = await b.isEnabled().catch(() => false);
    if (visible && enabled && rx.test(txt)) {
      await b.click().catch(() => {});
      return txt;
    }
  }
  return null;
}

async function testLesson(browser, id, outRoot) {
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(String(e)));

  const outDir = join(outRoot, id);
  mkdirSync(outDir, { recursive: true });

  await page.goto(`${BASE}/#/${routeFor(id)}`, { waitUntil: "networkidle" }).catch((e) => errors.push(String(e)));

  const svg = await page.$(".figure-slot svg");
  if (!svg) errors.push("no <svg> rendered in .figure-slot");
  await page.screenshot({ path: join(outDir, "00-load.png") }).catch(() => {});

  // Step forward up to a bounded number of times; screenshot each step.
  let steps = 0;
  for (let i = 0; i < 24; i += 1) {
    const label = await clickAdvance(page);
    if (!label) break;
    steps += 1;
    await page.waitForTimeout(350);
    await page.screenshot({ path: join(outDir, `${String(steps).padStart(2, "0")}-step.png`) }).catch(() => {});
    // clicking the plane must never throw or wipe the figure
    const fig = await page.$(".figure-slot svg");
    if (fig) {
      const box = await fig.boundingBox().catch(() => null);
      if (box) await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2).catch(() => {});
    }
    if (!(await page.$(".figure-slot svg"))) errors.push(`figure disappeared after step ${steps}`);
  }

  await page.close();
  return { id, errors, steps };
}

async function main() {
  const pw = await loadPlaywright();
  if (!pw) {
    console.log("SMOKE SKIPPED: playwright not installed. Run: npm i -D playwright && npx playwright install chromium");
    return 0;
  }

  let child = null;
  if (serve) {
    console.log("Building and starting preview server...");
    await new Promise((res, rej) => {
      const b = spawn("npm", ["run", "build"], { cwd: ROOT, stdio: "inherit" });
      b.on("exit", (c) => (c === 0 ? res() : rej(new Error("build failed"))));
    });
    child = spawn("npx", ["vite", "preview", "--host", "--port", "5173"], { cwd: ROOT, stdio: "ignore" });
  }

  if (!(await waitForServer(BASE, serve ? 30000 : 1500))) {
    if (child) child.kill();
    console.log(`SMOKE SKIPPED: no server at ${BASE}. Start one with 'npm run dev' or pass --serve.`);
    return 0;
  }

  const outRoot = join(ROOT, "evals", "screenshots");
  if (existsSync(outRoot)) rmSync(outRoot, { recursive: true, force: true });
  mkdirSync(outRoot, { recursive: true });

  const ids = wanted.length ? wanted : [...readyLessonIds(), ...journeyLessonIds()];
  const { chromium } = pw;
  const browser = await chromium.launch();
  const results = [];
  for (const id of ids) results.push(await testLesson(browser, id, outRoot));
  await browser.close();
  if (child) child.kill();

  let failed = 0;
  for (const r of results) {
    if (r.errors.length) {
      failed += 1;
      console.log(`\n[FAIL] ${r.id} (${r.steps} steps)`);
      for (const e of r.errors.slice(0, 8)) console.log(`   - ${e}`);
    } else {
      console.log(`[ok]   ${r.id} (${r.steps} steps, screenshots in evals/screenshots/${r.id})`);
    }
  }
  console.log("");
  console.log(`Smoke: ${results.length - failed}/${results.length} lessons clean.`);
  return failed ? 1 : 0;
}

main()
  .then((c) => process.exit(c))
  .catch((e) => {
    console.error(e);
    process.exit(2);
  });
