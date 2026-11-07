import { AvifImage, avifSrc } from "@/components/AvifImage";
import { site } from "@/content/site";

const PORTRAIT_SCREENS = "(max-width: 860px), (orientation: portrait) and (max-width: 1366px)";

export function HeroSection() {
  return (
    <section className="hero-evolve" id="top">
      <div className="hero-evolve-sticky">
        <div className="hero-cards hero-cards--clean">
          <div className="hero-cards-stage">
            <div className="hero-wordmark hero-wordmark--clean">
              <div className="hero-brand-box hero-brand-box--logo">
                <h1 className="hero-brand-logo">
                  <img
                    src={site.logo}
                    alt={site.logoAlt}
                    width={site.logoWidth}
                    height={site.logoHeight}
                    decoding="async"
                    fetchPriority="high"
                  />
                  <span className="visually-hidden">{site.heroMotto}</span>
                </h1>
              </div>
            </div>

            <div className="hero-scene" aria-hidden="true">
              {/* Phones get a portrait render with open sky for the wordmark. */}
              <picture>
                <source
                  media={PORTRAIT_SCREENS}
                  type="image/avif"
                  srcSet={avifSrc(site.heroBackgroundMobile)}
                  width={800}
                  height={1600}
                />
                <source media={PORTRAIT_SCREENS} srcSet={site.heroBackgroundMobile} width={800} height={1600} />
                <source type="image/avif" srcSet={avifSrc(site.heroBackground)} />
                <img
                  className="hero-plate"
                  src={site.heroBackground}
                  alt=""
                  width={1672}
                  height={941}
                  decoding="async"
                  fetchPriority="high"
                />
              </picture>
              {/* Desktop: a greyscale copy of the same render (pavilion masked out, so it stays in colour) fades in and out.
                  Lazy so phones, where it is hidden, never download it. */}
              <AvifImage
                className="hero-plate hero-plate--bw-desk"
                src={site.heroBackground}
                alt=""
                width={1672}
                height={941}
                decoding="async"
                loading="lazy"
              />
              {/* Mobile only: a black-and-white twin that slowly fades in and out over the colour render. */}
              <AvifImage
                className="hero-plate hero-plate--bw"
                src={site.heroBackgroundMobileBw}
                alt=""
                width={800}
                height={1600}
                decoding="async"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
