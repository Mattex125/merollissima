// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Production URL: used for canonical links now, sitemap and RSS later.
  site: "https://merollissima.vercel.app",
  // Pages are emitted as /gazette/index.html and always linked with a trailing slash.
  // vercel.json ("trailingSlash": true) enforces the same policy in production.
  trailingSlash: "always",
  build: { format: "directory" },
  // Self-hosted fonts: downloaded at build time and served from our own domain.
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Bricolage Grotesque",
      cssVariable: "--font-bricolage",
      weights: ["200 800"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Geist",
      cssVariable: "--font-geist",
      weights: ["100 900"],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
    },
  ],
  vite: { plugins: [tailwindcss()] },
});
