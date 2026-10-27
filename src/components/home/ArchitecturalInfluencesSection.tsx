import { site } from "@/content/site";

export function ArchitecturalInfluencesSection() {
  return (
    <section className="arch-slide" id="architectural-influences" aria-label="Bespoke greenhouse designs">
      <div className="arch-slide-inner">
        <h2 className="arch-slide-headline mono">
          <span className="arch-slide-headline-line">
            <span className="signal-mint">{site.architecturalInfluencesHighlight}</span>{" "}
            {site.architecturalInfluencesHeadline}
          </span>
        </h2>
        <img
          className="arch-slide-image"
          loading="lazy"
          src={site.architecturalInfluencesImage}
          alt=""
          width={1920}
          height={1080}
          decoding="async"
        />
      </div>
    </section>
  );
}
