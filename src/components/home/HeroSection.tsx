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
                <p className="hero-subline mono">{site.subtagline}</p>
              </div>
              <div className="hero-wordmark-lines mono">
                <p className="hero-line hero-line--1">{site.heroLines[0]}</p>
                <p className="hero-line hero-line--2">{site.heroLines[1]}</p>
                <p className="hero-line hero-line--3">{site.heroLines[2]}</p>
              </div>
            </div>

            <div className="hero-scene">
              <img
                className="hero-plate"
                src="/images/hero/hero-background.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
