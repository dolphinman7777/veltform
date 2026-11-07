import type { ImgHTMLAttributes } from "react";

export const avifSrc = (src: string) => src.replace(/\.webp$/, ".avif");

/** A WebP image with an AVIF twin beside it. Browsers that can read AVIF take the smaller file. */
export function AvifImage({
  src,
  alt,
  ...img
}: ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string }) {
  return (
    <picture className="avif-picture">
      <source type="image/avif" srcSet={avifSrc(src)} />
      <img src={src} alt={alt} {...img} />
    </picture>
  );
}
