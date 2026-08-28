// Loads TypeScript lesson data (slides.ts, engine.ts, curriculum/data.ts) into a
// running Node process by bundling with esbuild and importing as a data: URL.
// The lesson `slides.ts` files use type-only imports plus pure helpers, so the
// bundle is self-contained and never pulls in React or the DOM.
import { build } from "esbuild";

const cache = new Map();

/** Bundle a .ts/.tsx entry to ESM and import it. Returns the module namespace. */
export async function loadTs(entry) {
  if (cache.has(entry)) return cache.get(entry);
  const result = await build({
    entryPoints: [entry],
    bundle: true,
    write: false,
    format: "esm",
    platform: "node",
    target: "node20",
    logLevel: "silent",
    // React is never needed for slide data; if a file drags it in, stub it so the
    // import does not explode. Figures are analyzed as text, never executed.
    external: ["react", "react-dom", "react/jsx-runtime", "motion", "motion/react"],
  });
  const code = result.outputFiles[0].text;
  const url = "data:text/javascript;base64," + Buffer.from(code).toString("base64");
  const mod = await import(url);
  cache.set(entry, mod);
  return mod;
}
