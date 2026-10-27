import { site } from "@/content/site";

export function ClimateSystemsSlide() {
  return (
    <section className="arch-slide climate-systems-slide" id="climate-systems" aria-label="Automatic climate management">
      <div className="arch-slide-inner">
        <div className="climate-systems-slide__intro">
          <h2 className="arch-slide-headline mono">
            <span className="arch-slide-headline-line">
              <span className="signal-mint">{site.climateSystemsHighlight}</span> {site.climateSystemsHeadline}
            </span>
          </h2>
          <p className="climate-systems-slide__subline"><em>– {site.climateSystemsSubline}</em></p>
          <p className="climate-systems-slide__body mono">{site.climateSystemsBody}</p>
        </div>
        <figure className="climate-systems-slide__figure">
          <img
            className="arch-slide-image climate-systems-slide__image"
            src={site.climateSystemsImage}
            alt="Light, heat, water, and air and climate control flowing through greenhouse systems"
            width={1755}
            height={896}
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
}
