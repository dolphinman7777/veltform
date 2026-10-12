import { SlideBridgeStrawberry } from "@/components/home/SlideBridgeStrawberry";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="veld-site-footer" id="contact">
      <SlideBridgeStrawberry />
      <div className="veld-footer-meta">
        <p>
          Enquiries: <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
        </p>
      </div>
      <div className="veld-footer-mark">
        <p className="veld-footer-name brand-natural">{site.name}</p>
        <p className="veld-footer-sub mono">{site.tagline}</p>
      </div>
    </footer>
  );
}
