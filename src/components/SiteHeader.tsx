import { MobileNav } from "@/components/MobileNav";
import { PrimaryNav } from "@/components/PrimaryNav";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="veld-site-header">
      <div className="veld-site-header-side" />
      <PrimaryNav />
      <div className="veld-site-header-side">
        <Link className="veld-site-cta" href="/enquire">
          Enquire &rarr;
        </Link>
      </div>
      <MobileNav />
    </header>
  );
}
