import { site } from "@/content/site";

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
                </h1>
              </div>
            </div>

            <div className="hero-scene" aria-hidden="true">
              {/* Phones get a portrait render with open sky for the wordmark. */}
              <picture>
                <source
                  media="(max-width: 860px), (orientation: portrait) and (max-width: 1366px)"
                  srcSet={site.heroBackgroundMobile}
                  width={800}
                  height={1600}
                />
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
              {/* Desktop: a greyscale copy of the same render (pavilion masked out, so it stays in colour) fades in and out. */}
              <img
                className="hero-plate hero-plate--bw-desk"
                src={site.heroBackground}
                alt=""
                width={1672}
                height={941}
                decoding="async"
              />
              {/* Mobile only: a black-and-white twin that slowly fades in and out over the colour render. */}
              <img
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
