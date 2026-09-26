import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Coming soon — ${site.displayName}`,
  description: "The customer portal is coming soon.",
};

export default function PortalPage() {
  return (
    <>
      <SiteHeader />
      <main className="velt-portal">
        <div className="velt-portal-copy">
          <div className="hero-brand-box">
            <h1 className="velt-portal-title brand-natural">coming soon</h1>
            <p className="hero-subline mono">customer portal</p>
          </div>
          <p className="velt-portal-line mono">
            <a href="/">back to site</a>
          </p>
        </div>
        <img
          className="velt-portal-fynbos"
          src="/images/hero/fynbos.png"
          alt=""
          width={343}
          height={613}
          decoding="async"
        />
      </main>
    </>
  );
}
