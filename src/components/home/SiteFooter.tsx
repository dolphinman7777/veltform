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
        <p>
          {site.location.city}, {site.location.country}
        </p>
      </div>
      <div className="veld-footer-mark">
        <img
          src={site.logo}
          alt={site.logoAlt}
          width={site.logoWidth}
          height={site.logoHeight}
          decoding="async"
          loading="lazy"
        />
      </div>
    </footer>
  );
}
