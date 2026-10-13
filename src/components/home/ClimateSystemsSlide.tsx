import { site } from "@/content/site";

export function ClimateSystemsSlide() {
  return (
    <section className="arch-slide climate-systems-slide" id="climate-systems" aria-label="Climate systems">
      <div className="arch-slide-inner">
        <div className="climate-systems-slide__intro">
          <h2 className="arch-slide-headline mono">
            <span className="arch-slide-headline-line">
              <span className="signal-mint">{site.climateSystemsHighlight}</span> {site.climateSystemsHeadline}
            </span>
          </h2>
          <p className="climate-systems-slide__body mono">{site.climateSystemsBody}</p>
        </div>
        <figure className="climate-systems-slide__figure">
          <img
            className="arch-slide-image climate-systems-slide__image"
            src={site.climateSystemsImage}
            alt="Illustrations of light, heat, water, and climate control in greenhouse systems"
            width={2021}
            height={778}
            decoding="async"
          />
          <div className="climate-systems-slide__labels mono">
            {site.climateSystemsLabels.map((label) => (
              <span key={label} className="climate-systems-slide__label">{label}</span>
            ))}
          </div>
        </figure>
      </div>
    </section>
  );
}
