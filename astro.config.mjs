// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Production URL: used for canonical links now, sitemap and RSS later.
  site: "https://merollissima.vercel.app",
  // Pages are emitted as /gazette/index.html and always linked with a trailing slash.
  // vercel.json ("trailingSlash": true) enforces the same policy in production.
  trailingSlash: "always",
  build: { format: "directory" },
  vite: { plugins: [tailwindcss()] },
});
