import { getCollection, type CollectionEntry } from "astro:content";

export type GazetteEntry = CollectionEntry<"gazette">;

export interface NumberedEntry {
  entry: GazetteEntry;
  /** "No. N": position in date order from 0 (oldest = No. 0). Never written by hand. */
  no: number;
}

/**
 * True if the Markdown has an image with an empty alt text: ![](./a.png),
 * reference-style ![][a], or an HTML <img> without a non-blank alt.
 * Code blocks and inline code are ignored, so examples can be shown.
 */
function hasImageWithoutAlt(markdown: string): boolean {
  const text = markdown
    .replace(/^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1/gm, "")
    .replace(/`[^`\n]*`/g, "");
  return (
    /!\[\s*\][([]/.test(text) ||
    /<img\b(?![^>]*\balt\s*=\s*(["'])[^"']*\S[^"']*\1)[^>]*>/i.test(text)
  );
}

const compareIds = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

/**
 * All Gazette entries, newest first, each with its number.
 * This is the only place where numbers are computed: lists, entry pages,
 * the home page and the RSS feed all use it, so they always agree.
 * Entries on the same day are ordered by slug, so numbering is stable.
 */
export async function getGazette(): Promise<NumberedEntry[]> {
  const entries = await getCollection("gazette");

  for (const entry of entries) {
    if (entry.body && hasImageWithoutAlt(entry.body)) {
      throw new Error(`Gazette entry "${entry.id}" has an image without alt text.`);
    }
  }

  return [...entries]
    .sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf() || compareIds(a.id, b.id))
    .map((entry, index) => ({ entry, no: index }))
    .reverse();
}

/** Latest entries for the home page: pinned ones first, then newest first. */
export async function getLatestGazette(limit = 3): Promise<NumberedEntry[]> {
  const entries = await getGazette();
  // Array.prototype.sort is stable, so entries keep date order within each group.
  return entries
    .sort((a, b) => Number(b.entry.data.pinned) - Number(a.entry.data.pinned))
    .slice(0, limit);
}
