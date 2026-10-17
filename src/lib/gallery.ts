import type { ImageMetadata } from "astro";
import { getImage } from "astro:assets";

export interface GalleryPhoto {
  src: string;
  srcset: string;
}

// The pool: every image in src/assets/gallery/. The photos are decorative.
const modules = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/gallery/*.{png,jpg,jpeg,webp,avif}",
  { eager: true },
);

/** The gallery pool, resized and converted to WebP at build time. */
export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  return Promise.all(
    Object.values(modules).map(async ({ default: image }) => {
      const small = await getImage({ src: image, width: 480, format: "webp" });
      const large = await getImage({ src: image, width: 960, format: "webp" });
      return { src: small.src, srcset: `${small.src} 480w, ${large.src} 960w` };
    }),
  );
}
