import Link from "next/link";
import { PrimaryNav } from "@/components/PrimaryNav";
import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="veld-site-header">
      <div className="veld-site-header-side">
        <Link className="brand-lockup brand-lockup--compact" href="/">
          <div className="brand-lockup-text">
            <span className="brand-main brand-natural">{site.name}</span>
            <span className="brand-lockup-sub mono">{site.tagline}</span>
          </div>
        </Link>
      </div>
      <PrimaryNav />
      <div className="veld-site-header-side">
        <a className="veld-site-cta" href={`mailto:${site.contactEmail}`}>
          Enquire &rarr;
        </a>
      </div>
    </header>
  );
}
