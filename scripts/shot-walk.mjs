// One-off dev tool: walk a lesson slide by slide, screenshotting each slide's
// watch-end figure. It clears choice questions by trying options until the
// primary button enables, so it works regardless of which option is correct.
// Plot/manipulate questions are left unsolved (we only need to reach the next
// slide, and the last slide is just screenshotted). Usage:
//   node scripts/shot-walk.mjs http://localhost:5173 vec-dot 4
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.argv[2] || "http://localhost:5173";
const LESSON = process.argv[3] || "vec-dot";
const SLIDES = Number(process.argv[4] || 4);
const HALF = Number(process.argv[5] || 6); // world half-range for plot solving
const OUT = `evals/screenshots/_walk-${LESSON}`;
mkdirSync(OUT, { recursive: true });

// Plane mapping (mirrors src/components/Plane.tsx): SIZE 460, MARGIN 26.
const PSIZE = 460;
const PCENTER = PSIZE / 2;
const UNIT = (PCENTER - 26) / HALF;
const viewX = (wx) => PCENTER + wx * UNIT;
const viewY = (wy) => PCENTER - wy * UNIT;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(`${BASE}/#/journey/${LESSON}`, { waitUntil: "networkidle" });
await page.waitForTimeout(400);

const primaryText = async () => {
  const b = await page.$(".controls .btn--primary");
  return b ? (((await b.innerText().catch(() => "")) || "").trim()) : "";
};
// The primary keeps its label (e.g. "Next question") even while disabled, so
// solved-ness must be read from the *enabled* state, not the text.
const primaryEnabled = async () => !!(await page.$(".controls .btn--primary:not([disabled])"));
const clickPrimary = async () => {
  const b = await page.$(".controls .btn--primary:not([disabled])");
  if (!b) return false;
  await b.click().catch(() => {});
  return true;
};

// Click a world point on the figure, accounting for xMidYMid meet letterboxing.
const clickWorld = async (wx, wy) => {
  const fig = await page.$(".figure-slot svg");
  if (!fig) return;
  const box = await fig.boundingBox().catch(() => null);
  if (!box) return;
  const drawn = Math.min(box.width, box.height);
  const offX = box.x + (box.width - drawn) / 2;
  const offY = box.y + (box.height - drawn) / 2;
  const sx = offX + (viewX(wx) / PSIZE) * drawn;
  const sy = offY + (viewY(wy) / PSIZE) * drawn;
  await page.mouse.click(sx, sy).catch(() => {});
};

// Brute-force a plot question by clicking integer world points until it solves.
const solvePlot = async () => {
  const lim = Math.floor(HALF);
  for (let wx = -lim; wx <= lim; wx += 1) {
    for (let wy = -lim; wy <= lim; wy += 1) {
      await clickWorld(wx, wy);
      await page.waitForTimeout(60);
      if (await primaryEnabled()) return true;
    }
  }
  return false;
};

for (let slide = 1; slide <= SLIDES; slide += 1) {
  // Advance beats until the primary offers "Your turn".
  for (let i = 0; i < 24; i += 1) {
    if (/your turn/i.test(await primaryText())) break;
    await clickPrimary();
    await page.waitForTimeout(450);
  }
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/slide${slide}-watch-end.png` });
  if (slide === SLIDES) break;

  // Enter the try stage.
  await clickPrimary();
  await page.waitForTimeout(400);

  // Clear each question. For choice questions, try options until primary enables.
  // Re-query the option each time: React re-renders after a click, so cached
  // element handles go stale and only the first click would land.
  for (let q = 0; q < 4; q += 1) {
    const count = (await page.$$(".question__options button")).length;
    if (count) {
      for (let k = 0; k < count; k += 1) {
        const btn = (await page.$$(".question__options button"))[k];
        if (!btn) break;
        await btn.click().catch(() => {});
        await page.waitForTimeout(200);
        if (await primaryEnabled()) break; // this pick solved the question
      }
    } else if (!(await primaryEnabled())) {
      await solvePlot(); // a plot question: click integer points until it solves
    }
    if (!(await primaryEnabled())) break; // stuck (manipulate we cannot auto-solve)
    const t = await primaryText();
    await clickPrimary();
    await page.waitForTimeout(450);
    if (/continue/i.test(t)) break; // advanced to next slide
  }
  await page.waitForTimeout(300);
}

await browser.close();
console.log(`done ${LESSON}`);
