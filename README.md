# La Merollissima

Web portal of **La Merollissima**, a fictional republic built in a Minecraft (Java Edition) world
and inspired by the Most Serene Republic of Venice. It is led by a Doge, elected democratically
_ad interim_, who then keeps the office for life.

The site publishes the republic's official Gazette, its history and an interactive map of its
builds. It is a static site with almost no JavaScript, built to be fast, accessible and easy to
extend.

> Work in progress. See the [roadmap](#roadmap).

## Tech stack

- [Astro 7](https://astro.build) with static output and no server adapter
- TypeScript in strict mode, checked with `astro check`
- [Tailwind CSS 4](https://tailwindcss.com) with CSS-first design tokens
- Self-hosted fonts (Bricolage Grotesque, Geist) through the Astro Fonts API
- Content collections with typed schemas, validated at build time
- Leaflet for the builds map and `<model-viewer>` for the 3D hero (planned)
- Hosted on [Vercel](https://vercel.com); CI on GitHub Actions

## Getting started

Requirements: Node.js 24 (see `.nvmrc`) and npm.

```sh
npm ci
npm run dev          # http://localhost:4321
```

Enable the pre-commit guard once per clone (see [Privacy](#privacy)):

```sh
git config core.hooksPath .githooks
```

## Scripts

| Command                 | What it does                                           |
| ----------------------- | ------------------------------------------------------ |
| `npm run dev`           | Start the dev server                                   |
| `npm run build`         | Type-check with `astro check`, then build to `dist/`   |
| `npm run preview`       | Serve the production build locally                     |
| `npm run check`         | Type-check only                                        |
| `npm run check:hex`     | Fail if a hex colour appears outside the design tokens |
| `npm run validate:html` | Validate the generated HTML in `dist/`                 |
| `npm run format`        | Format the code with Prettier                          |
| `npm run format:check`  | Check formatting without writing                       |

## Project structure

```text
src/
  components/   Small, focused Astro components (header, footer, cards, ...)
  config/       Site-wide values: name, navigation, sections, links
  content/      Content files: one folder per Gazette entry, images next to the text
  layouts/      BaseLayout: document head, skip link, header, main, footer
  lib/          Content helpers (Gazette numbering) and formatting
  pages/        File-based routes: /, /gazette/, /gazette/<slug>/, /history/, /builds/, 404
  styles/       global.css: Tailwind and every design token
  content.config.ts   Collection schemas
public/         Static files served as-is (favicon)
scripts/        Repository guards used by the pre-commit hook and CI
```

## Writing content

### Gazette entries

Each entry is a folder in `src/content/gazette/` with an `index.md` and its images. The folder name
becomes the URL (`/gazette/<folder>/`), so pick a short English slug and never rename it once
published.

```md
---
title: The Merollissima market opens
date: 2026-09-14
summary: One line, shown in lists and on the home page.
cover: ./cover.png # optional
coverAlt: Describe the cover image. # required when cover is set
pinned: false # optional; pinned entries come first on the home page
---

Body text in Markdown. Headings start at `##`. Up to about two inline images:

![Describe the image.](./detail.png)
```

- Entries are numbered automatically from 0 ("No. 0" is the oldest), so numbers are never
  written by hand. An entry dated before existing ones shifts their numbers.
- The build fails if the frontmatter is invalid (including a missing or malformed date), if a
  cover has no `coverAlt`, or if an inline image has no alt text.
- Images are resized and converted to WebP at build time. The text column is 672px wide, so
  sources about 1344px wide are enough, even for high-density screens.
- Commit new entries with the `content:` type.

The market entry uses placeholder images: replace them with real screenshots, keeping the file
names, and update the alt texts.

## Design system

Dark theme only, with an amethyst accent inspired by Minecraft's amethyst blocks.

- Every colour, radius, shadow and gradient is defined once in
  [`src/styles/global.css`](src/styles/global.css) as a Tailwind `@theme` token.
- Tailwind's default palette is removed, so only project tokens exist. Components use role-based
  utilities such as `bg-surface`, `text-muted` or `border-line`.
- Hex values never appear anywhere else in `src/`; CI enforces this. The only exception is the
  static `public/favicon.svg`, which cannot read CSS variables.
- Accessibility: WCAG AA contrast, underlined links, a visible focus ring, a skip link,
  `aria-current` navigation, and respect for `prefers-reduced-motion`.

## Conventions

- [Conventional Commits](https://www.conventionalcommits.org): `feat`, `fix`, `style`,
  `refactor`, `docs`, `chore`, plus `content` for new Gazette entries, History chapters or builds.
- A change is done when `npm run build` (which includes `astro check`) passes.
- Pull requests are merged with "Rebase and merge" to keep a linear history, so every commit
  must build on its own.

## Deployment

- Pushing to `main` deploys to production on Vercel.
- Every other branch and pull request gets a preview deployment.
- Vercel runs `npm run build`, so every deploy is type-checked. GitHub Actions additionally runs
  the repository guards, the formatting check and HTML validation.

## Privacy

The site is built from a private Minecraft world. World files never enter this repository:
`level.dat` contains the world seed and the region files contain the world itself.

- `.gitignore` excludes world and server files, including a local `world/` folder.
- [`scripts/guard-world-data.sh`](scripts/guard-world-data.sh) refuses them in the pre-commit
  hook and again in CI.
- Only processed outputs, such as the 3D model and the map image, are committed.
- The site never connects to the live Minecraft server.

## Roadmap

- [x] **Setup**: Astro, TypeScript, Tailwind, base layout, navigation, footer, design tokens
- [x] **Gazette**: official announcements, numbered by date
- [ ] **History**: the republic's story as a single, readable document
- [ ] **Builds map**: interactive map of the territory with one marker per build
- [ ] **3D hero**: a slowly rotating model of the whole nation on the home page
- [ ] **Polish**: Open Graph images, sitemap, RSS feed, accessibility pass

## License

Everything in this repository, code and content, is released under the [MIT License](LICENSE).

Not an official Minecraft website. Not approved by or associated with Mojang or Microsoft.
