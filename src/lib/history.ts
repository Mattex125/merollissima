import { getCollection, type CollectionEntry } from "astro:content";

export type Chapter = CollectionEntry<"history">;

/** History chapters in reading order. Fails the build if two chapters share an order. */
export async function getChapters(): Promise<Chapter[]> {
  const chapters = await getCollection("history");

  const seen = new Map<number, string>();
  for (const chapter of chapters) {
    const other = seen.get(chapter.data.order);
    if (other) {
      throw new Error(
        `History chapters "${other}" and "${chapter.id}" have the same order (${chapter.data.order}).`,
      );
    }
    seen.set(chapter.data.order, chapter.id);
  }

  return [...chapters].sort((a, b) => a.data.order - b.data.order);
}
