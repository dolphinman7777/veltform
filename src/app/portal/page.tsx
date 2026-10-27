import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: `Coming soon — ${site.displayName}` },
  description: "The customer portal is coming soon.",
  // Placeholder page: keep it out of search results until the portal launches.
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function PortalPage() {
  return (
    <>
      <SiteHeader />
      <main className="veld-portal">
        <div className="veld-portal-copy">
          <div className="hero-brand-box">
            <h1 className="veld-portal-title brand-natural">coming soon</h1>
            <p className="hero-subline mono">customer portal</p>
          </div>
          <p className="veld-portal-line mono">
            <Link href="/">back to site</Link>
          </p>
        </div>
        <img
          className="veld-portal-fynbos"
          src="/images/portal/fynbos.webp"
          alt=""
          width={343}
          height={613}
          decoding="async"
        />
      </main>
    </>
  );
}
