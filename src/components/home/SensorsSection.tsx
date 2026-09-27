import { site } from "@/content/site";

type SensorId = (typeof site.sensorReadings)[number]["id"];

function SensorDrawing({ id }: { id: SensorId }) {
  switch (id) {
    case "temperature":
      return (
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <rect x="24" y="20" width="9" height="40" rx="4.5" fill="none" stroke="#9ec9e8" strokeWidth="1.6" />
          <circle cx="28.5" cy="64" r="8" fill="none" stroke="#9ec9e8" strokeWidth="1.6" />
          <rect x="26.6" y="40" width="3.8" height="20" rx="1.6" fill="#9ec9e8" />
          <circle cx="28.5" cy="64" r="3.6" fill="#9ec9e8" />
          <path d="M52 32 C60 28 66 36 76 31" fill="none" stroke="#9ec9e8" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M48 46 C56 41 64 51 72 46" fill="none" stroke="#9ec9e8" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M74 40 L82 46 L74 52" fill="none" stroke="#9ec9e8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M52 60 C60 56 66 64 76 59" fill="none" stroke="#9ec9e8" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "humidity":
      return (
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <line x1="22" y1="18" x2="22" y2="78" stroke="#474948" strokeWidth="0.8" opacity="0.35" />
          <line x1="22" y1="78" x2="82" y2="78" stroke="#474948" strokeWidth="0.8" opacity="0.35" />
          <path d="M26 66 C42 64 54 42 78 24" fill="none" stroke="#9ec9e8" strokeWidth="1.7" />
          <path d="M26 72 C42 70 54 58 78 48" fill="none" stroke="#9ec9e8" strokeWidth="1.5" strokeDasharray="3 2.2" />
          <path d="M60 33 V52 M56.5 33 H63.5 M56.5 52 H63.5" fill="none" stroke="#d94f4f" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "moisture":
      return (
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <path d="M30 24 C34.5 24 37 31 30 40 C23 31 25.5 24 30 24 Z" fill="#9ec9e8" fillOpacity="0.45" stroke="#9ec9e8" strokeWidth="1.3" />
          <path d="M52 18 C56.5 18 59 25 52 34 C45 25 47.5 18 52 18 Z" fill="#9ec9e8" fillOpacity="0.45" stroke="#9ec9e8" strokeWidth="1.3" />
          <path d="M74 24 C78.5 24 81 31 74 40 C67 31 69.5 24 74 24 Z" fill="#9ec9e8" fillOpacity="0.45" stroke="#9ec9e8" strokeWidth="1.3" />
          <line x1="16" y1="72" x2="84" y2="72" stroke="#474948" strokeWidth="0.8" opacity="0.35" />
          <path d="M18 64 H30 V50 H44 V60 H58 V46 H72 V56 H84" fill="none" stroke="#9ec9e8" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "light":
      return (
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="26" r="7" fill="none" stroke="#9ec9e8" strokeWidth="1.6" />
          <g stroke="#9ec9e8" strokeWidth="1.4" strokeLinecap="round">
            <line x1="50" y1="12" x2="50" y2="15.5" />
            <line x1="50" y1="36.5" x2="50" y2="40" />
            <line x1="36" y1="26" x2="39.5" y2="26" />
            <line x1="60.5" y1="26" x2="64" y2="26" />
            <line x1="39.5" y1="15.5" x2="42" y2="18" />
            <line x1="58" y1="34" x2="60.5" y2="36.5" />
            <line x1="60.5" y1="15.5" x2="58" y2="18" />
            <line x1="42" y1="34" x2="39.5" y2="36.5" />
          </g>
          <line x1="16" y1="80" x2="84" y2="80" stroke="#474948" strokeWidth="0.8" opacity="0.35" />
          <path d="M18 80 Q50 46 82 80" fill="#9ec9e8" fillOpacity="0.22" stroke="#9ec9e8" strokeWidth="1.6" />
        </svg>
      );
    case "monitoring":
      return (
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <rect x="20" y="30" width="52" height="38" rx="2" fill="none" stroke="#9ec9e8" strokeWidth="1.6" />
          <path d="M28 52 H36 L42 42 L48 58 L54 48 H64" fill="none" stroke="#9ec9e8" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
          <path d="M74 24 a7 7 0 0 1 14 0 c0 5-3 6.5-3 6.5 h-8 S74 29 74 24 Z" fill="none" stroke="#9ec9e8" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="81" cy="36" r="1.6" fill="#d94f4f" />
          <circle cx="81" cy="20" r="2.4" fill="#d94f4f" />
        </svg>
      );
    default: {
      const unreachable: never = id;
      return unreachable;
    }
  }
}

export function SensorsSection() {
  return (
    <section className="data-slide" id="sensors">
      <div className="velt-section-head velt-section-head--display velt-slide-intro">
        <div className="velt-slide-intro-copy">
          <h2 className="mono">
            <span className="signal-mint">{site.sensorsHighlight}</span>
            <br />
            <span className="data-headline-line">{site.sensorsHeadline}</span>
          </h2>
          <p>{site.sensorsCopy}</p>
        </div>
      </div>

      <div className="data-stage">
        <header className="anthro-slide-head mono">
          <span>Sensors</span>
          <div className="brand-lockup brand-lockup--micro">
            <div className="brand-lockup-text">
              <span className="brand-main brand-natural">{site.name}</span>
            </div>
          </div>
        </header>

        <div className="grid-usage-row" aria-label="Greenhouse sensors">
          {site.sensorReadings.map((reading) => (
            <figure key={reading.id} className="grid-usage-cell">
              <div className="grid-usage-frame">
                <SensorDrawing id={reading.id} />
              </div>
              <figcaption className="grid-usage-caption mono">{reading.caption}</figcaption>
            </figure>
          ))}
        </div>

        <footer className="anthro-slide-foot mono">
          <span className="velt-tag-mint">Monitoring</span>
        </footer>
      </div>
    </section>
  );
}
