import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const gazette = defineCollection({
  // One folder per entry, with its images next to the text:
  // src/content/gazette/<slug>/index.md. The folder name is the URL slug,
  // so never rename it once the entry is published.
  loader: glob({ base: "./src/content/gazette", pattern: "*/index.md" }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().trim().min(1),
        // Unquoted YAML dates (2026-09-14) are parsed as UTC dates. z.date() rejects
        // blank, numeric or ambiguous values instead of coercing them to 1970.
        date: z.date(),
        /** One line, shown in lists and on the home page. */
        summary: z.string().trim().min(1),
        cover: image().optional(),
        coverAlt: z.string().trim().min(1).optional(),
        pinned: z.boolean().default(false),
      })
      .refine((data) => !data.cover || data.coverAlt, {
        error: "coverAlt is required when cover is set",
        path: ["coverAlt"],
      }),
});

const history = defineCollection({
  // One file per chapter: src/content/history/<slug>.md. The file name is the
  // chapter's anchor on the History page (/history/#<slug>).
  loader: glob({ base: "./src/content/history", pattern: "*.md" }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().trim().min(1),
        /** Position of the chapter on the History page. */
        order: z.number().int().positive(),
        /** Optional photo shown at the end of the chapter. */
        photo: image().optional(),
        photoAlt: z.string().trim().min(1).optional(),
        photoCaption: z.string().trim().min(1).optional(),
      })
      .refine((data) => !data.photo || data.photoAlt, {
        error: "photoAlt is required when photo is set",
        path: ["photoAlt"],
      }),
});

export const collections = { gazette, history };
