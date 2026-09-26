import type { CSSProperties } from "react";
import { CuratedReadouts, CuratedShoots } from "@/components/home/CuratedShoots";

export function CuratedSlide() {
  return (
    <section className="curated-slide" id="curated">
      <div className="curated-stage">
        <div className="curated-grid" aria-hidden="true">
          <span className="grid-v" />
          <span className="grid-h" />
          <span className="grid-h grid-h--vpd" />
        </div>

        <CuratedShoots />

        <div className="curated-seal" aria-hidden="true">
          <div className="seal-frame">
            <p className="seal-ring mono">the whole new way to grow paradise</p>
            <svg className="seal-globe" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="0.8" />
              <ellipse cx="24" cy="24" rx="7" ry="18" stroke="currentColor" strokeWidth="0.8" />
              <line x1="6" y1="24" x2="42" y2="24" stroke="currentColor" strokeWidth="0.8" />
              <line x1="8" y1="14" x2="40" y2="14" stroke="currentColor" strokeWidth="0.6" />
              <line x1="8" y1="34" x2="40" y2="34" stroke="currentColor" strokeWidth="0.6" />
            </svg>
          </div>
        </div>

        <svg className="curated-wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <line x1="0" y1="10" x2="20" y2="10" />
          <line x1="20" y1="10" x2="20" y2="22" />
          <line x1="20" y1="10" x2="48" y2="10" />
          <line x1="48" y1="10" x2="48" y2="42" />
          <line x1="48" y1="42" x2="24" y2="42" />
          <line x1="24" y1="42" x2="24" y2="58" />
          <line x1="24" y1="58" x2="62" y2="58" />
          <line x1="62" y1="58" x2="62" y2="100" />
        </svg>

        <span className="curated-dot" style={{ "--x": "20%", "--y": "10%" } as CSSProperties} aria-hidden="true" />
        <span className="curated-dot" data-curated-dot="light" style={{ "--x": "48%", "--y": "10%" } as CSSProperties} aria-hidden="true" />
        <span className="curated-dot" style={{ "--x": "24%", "--y": "42%" } as CSSProperties} aria-hidden="true" />
        <span className="curated-dot" style={{ "--x": "62%", "--y": "58%" } as CSSProperties} aria-hidden="true" />
        <span className="curated-dot curated-dot--mark" style={{ "--x": "20%", "--y": "22%" } as CSSProperties} aria-hidden="true" />
        <span className="curated-dot curated-dot--mark" data-curated-dot="temp" style={{ "--x": "48%", "--y": "42%" } as CSSProperties} aria-hidden="true" />

        <CuratedReadouts />

        <article className="trace-card" data-node="hollow" style={{ "--x": "6%", "--y": "4%", "--r": "-2deg" } as CSSProperties}>
          <header className="trace-card-head mono">• HOLLOW K &nbsp;•&nbsp; [LIVE/Y]</header>
          <figure className="trace-card-img trace-card-img--farm">
            <img
              src="/images/curated/hollow-k.jpg"
              alt="Glass greenhouse on a stone base in a garden"
              style={{ objectPosition: "50% 50%" }}
            />
          </figure>
        </article>

        <article className="trace-card" data-node="foxleap" style={{ "--x": "42%", "--y": "18%", "--r": "1.2deg" } as CSSProperties}>
          <header className="trace-card-head mono">• FOXLEAP K &nbsp;•&nbsp; [LIVE/Y]</header>
          <figure className="trace-card-img trace-card-img--farm">
            <img
              src="/images/curated/foxleap.jpg"
              alt="Timber lean-to greenhouse with raised beds"
              style={{ objectPosition: "50% 0%" }}
            />
          </figure>
          <span className="trace-card-pip" aria-hidden="true" />
        </article>

        <article className="spec-card" data-node="bramble" style={{ "--x": "8%", "--y": "38%", "--r": "-1deg" } as CSSProperties}>
          <header className="spec-head">
            <h3 className="serif">Bramble K</h3>
            <span className="spec-serial mono">
              <span className="spec-sq" aria-hidden="true" />
              003
            </span>
          </header>
          <div className="spec-join" aria-hidden="true" />
          <figure className="spec-photo">
            <img
              src="/images/curated/bramble.jpg"
              alt="Timber and polycarbonate greenhouse with a glazed door"
              style={{ objectPosition: "50% 38%" }}
            />
          </figure>
          <div className="spec-join" aria-hidden="true" />
          <footer className="spec-bottom">
            <div className="spec-meta-lines mono">
              <p className="spec-meta-label">BRAMBLE K</p>
              <span className="spec-pip spec-pip--mint">TEMP 21.8°C</span>
              <span className="spec-term">season · setpoints</span>
              <span className="spec-pip spec-pip--mint">VPD 0.94</span>
              <span className="spec-term">humidity · transpiration</span>
            </div>
            <span className="spec-foot mono">
              <span className="spec-sq" aria-hidden="true" />
              003
            </span>
          </footer>
        </article>

        <article className="spec-card spec-card--lead" data-node="valley" style={{ "--x": "46%", "--y": "56%", "--r": "0.6deg" } as CSSProperties}>
          <header className="spec-head">
            <h3 className="serif">K bay</h3>
            <span className="spec-serial mono">
              <span className="spec-sq" aria-hidden="true" />
              001
            </span>
          </header>
          <div className="spec-join" aria-hidden="true" />
          <figure className="spec-photo">
            <img
              src="/images/curated/hollow.jpg"
              alt="Glass greenhouse in a coastal garden"
              style={{ objectPosition: "50% 62%" }}
            />
          </figure>
          <div className="spec-join" aria-hidden="true" />
          <footer className="spec-bottom">
            <div className="spec-meta-lines mono">
              <p className="spec-meta-label">K bay</p>
              <span className="spec-pip spec-pip--mint">LIGHT DLI 16</span>
              <span className="spec-term">photosynthesis · dli</span>
              <span className="spec-pip spec-pip--mint">ROOT 42%</span>
              <span className="spec-term">irrigation · oxygen</span>
            </div>
            <span className="spec-foot mono">
              <span className="spec-sq" aria-hidden="true" />
              001
            </span>
          </footer>
        </article>

        <div className="curated-copy">
          <h2 className="curated-headline serif">
            Built for the location, the crop, and those looking for{" "}
            <span className="pool-mint">a longer season.</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
