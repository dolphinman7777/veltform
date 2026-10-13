import { site } from "@/content/site";

export function HeroVideoSlide() {
  return (
    <section className="hero-video-slide" id="greenhouse" aria-label="Daily light target">
      <video
        className="hero-video-slide__plate"
        autoPlay
        muted
        loop
        playsInline
        poster={site.heroImage}
        aria-hidden="true"
      >
        <source src={site.heroVideo} type="video/mp4" />
      </video>
      <div className="hero-video-slide__copy">
        <h2 className="hero-video-slide__headline mono">
          achieve your{" "}
          <span className="signal-mint">{site.heroVideoHeadlineHighlight}</span>, irrespective of the weather.
        </h2>
      </div>
    </section>
  );
}
