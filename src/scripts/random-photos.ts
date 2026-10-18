// Fills decorative photo tiles with a random selection from the gallery pool.
// Shared by the home collage and the page postcards.

import type { GalleryPhoto } from "../lib/gallery";

interface Options {
  /** Selects the tiles inside the container. */
  tileSelector: string;
  /** Classes for the generated <img> elements (complete strings, so Tailwind finds them). */
  imageClass: string;
  /** The <img> sizes attribute. */
  sizes: string;
}

/**
 * Shuffles the pool, puts one photo in every tile visible at the current screen size
 * (hidden tiles never download a photo) and removes `opacity-0` from the container
 * once they have all loaded.
 */
export function fillWithRandomPhotos(
  container: HTMLElement,
  pool: GalleryPhoto[],
  { tileSelector, imageClass, sizes }: Options,
): void {
  if (pool.length === 0) return;

  const photos = [...pool];
  for (let i = photos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [photos[i], photos[j]] = [photos[j]!, photos[i]!];
  }

  const tiles = [...container.querySelectorAll<HTMLElement>(tileSelector)].filter(
    (tile) => tile.getClientRects().length > 0,
  );

  let pending = tiles.length;
  const reveal = () => {
    pending -= 1;
    if (pending === 0) container.classList.remove("opacity-0");
  };

  tiles.forEach((tile, index) => {
    const photo = photos[index % photos.length]!;
    const image = document.createElement("img");
    image.alt = "";
    image.decoding = "async";
    image.sizes = sizes;
    image.className = imageClass;
    image.addEventListener("load", reveal, { once: true });
    image.addEventListener("error", reveal, { once: true });
    image.srcset = photo.srcset;
    image.src = photo.src;
    tile.append(image);
  });
}

/** Reads a pool serialized in a <script type="application/json"> element. */
export function readPool(selector: string): GalleryPhoto[] {
  return JSON.parse(document.querySelector(selector)?.textContent ?? "[]");
}
