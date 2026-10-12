import { site } from "@/content/site";

export function SystemsHeroSection() {
  return (
    <section className="veld-systems-hero" aria-label="Systems">
      <div className="veld-systems-hero__stage">
        <img
          className="veld-systems-hero__image"
          src={site.systemsHeroImage}
          alt=""
          width={2022}
          height={1352}
          decoding="async"
          fetchPriority="high"
        />
        <div className="veld-systems-hero__copy">
          <h1 className="veld-systems-hero__title mono">
            <span className="signal-mint">{site.systemsHeroHighlight}</span>
          </h1>
          <p className="veld-systems-hero__support mono">{site.systemsHeroSupport}</p>
        </div>
      </div>
    </section>
  );
}
