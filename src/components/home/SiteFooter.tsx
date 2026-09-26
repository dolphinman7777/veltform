import Link from "next/link";
import { SlideBridgeStrawberry } from "@/components/home/SlideBridgeStrawberry";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="velt-site-footer" id="contact">
      <SlideBridgeStrawberry />
      <div className="velt-footer-meta">
        <p>
          Enquiries: <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
        </p>
        <p>
          Customer portal (coming soon): <Link href="/portal">/portal</Link>
        </p>
      </div>
      <div className="velt-footer-mark">
        <p className="velt-footer-name brand-natural">{site.name}</p>
        <p className="velt-footer-sub mono">{site.tagline}</p>
      </div>
    </footer>
  );
}
