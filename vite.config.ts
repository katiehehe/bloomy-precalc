import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ttsPlugin } from "./vite-tts.ts";

export default defineConfig({
  plugins: [react(), ttsPlugin()],
});
