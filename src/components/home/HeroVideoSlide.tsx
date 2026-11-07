import { HeroVideo } from "@/components/home/HeroVideo";
import { site } from "@/content/site";

export function HeroVideoSlide() {
  return (
    <section className="hero-video-slide" id="greenhouse" aria-label="Consistent abundance">
      <HeroVideo poster={site.heroImage} av1Src={site.heroVideoAv1} h264Src={site.heroVideo} />
      <div className="hero-video-slide__copy">
        <h2 className="hero-video-slide__headline mono">
          <span className="hero-video-slide__headline-text">
            {site.heroVideoHeadlineHighlight}{" "}
            <span className="signal-mint">{site.heroVideoHeadline}</span>
          </span>
        </h2>
      </div>
    </section>
  );
}
