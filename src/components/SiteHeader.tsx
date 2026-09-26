import Link from "next/link";
import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="velt-site-header">
      <div className="velt-site-header-side">
        <a className="brand-lockup brand-lockup--compact" href="/#top">
          <div className="brand-lockup-text">
            <span className="brand-main brand-natural">{site.name}</span>
            <span className="brand-lockup-sub mono">{site.tagline}</span>
          </div>
        </a>
      </div>
      <nav className="velt-site-nav" aria-label="Primary">
        <a href="/#services">Services</a>
        <a href="/#sensors">Sensors</a>
        <a href="/#materials">Materials</a>
      </nav>
      <div className="velt-site-header-side">
        <Link className="velt-site-portal" href="/portal">
          Portal
        </Link>
        <a className="velt-site-cta" href={`mailto:${site.contactEmail}`}>
          Enquire &rarr;
        </a>
      </div>
    </header>
  );
}
