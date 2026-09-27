import { site } from "@/content/site";

export function LifestyleSection() {
  return (
    <section className="velt-section velt-lifestyle" id="lifestyle">
      <div className="velt-section-head velt-section-head--display velt-slide-intro">
        <div className="velt-slide-intro-copy">
          <h2 className="mono">
            <span className="signal-mint">lifestyle</span>
          </h2>
          <p>{site.lifestyleIntro}</p>
        </div>
      </div>
      <div className="velt-lifestyle-row">
        {site.scenarios.map((scenario) => (
          <article className="velt-scenario" id={scenario.id} key={scenario.id}>
            <img src={scenario.image} alt="" />
            <h3 className="brand-natural">{scenario.title}</h3>
            <p className="mono">{scenario.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
