import { site } from "@/content/site";

export function HeroSection() {
  return (
    <section className="hero-evolve" id="top">
      <div className="hero-evolve-sticky">
        <div className="hero-cards hero-cards--clean">
          <div className="hero-cards-stage">
            <div className="hero-wordmark hero-wordmark--clean">
              <div className="hero-brand-box">
                <h1 className="hero-wordmark-eden brand-main brand-natural">{site.name}</h1>
                <p className="hero-subline mono">{site.heroMotto}</p>
              </div>
            </div>

            <div className="hero-scene">
              <video
                className="hero-plate"
                autoPlay
                muted
                loop
                playsInline
                poster={site.heroImage}
                aria-hidden="true"
              >
                <source src={site.heroVideo} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
