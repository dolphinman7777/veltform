import { site } from "@/content/site";

export function ArchitecturalInfluencesSection() {
  return (
    <section className="arch-slide" id="architectural-influences" aria-label="Architectural influences">
      <div className="arch-slide-inner">
        <h2 className="arch-slide-headline mono">
          <span className="signal-mint">{site.architecturalInfluencesHighlight}</span>
          <br />
          <span className="arch-slide-headline-line">{site.architecturalInfluencesHeadline}</span>
        </h2>
        <img
          className="arch-slide-image"
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
