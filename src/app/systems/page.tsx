import type { Metadata } from "next";
import { pageMetadata } from "@/content/seo";
import { SiteHeader } from "@/components/SiteHeader";
import { MaterialsSection } from "@/components/home/MaterialsSection";
import { SystemsEnquireSection } from "@/components/systems/SystemsEnquireSection";
import { SystemsSensorsHeroSection } from "@/components/systems/SystemsSensorsHeroSection";
import { SensorsSection } from "@/components/home/SensorsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { SiteFooter } from "@/components/home/SiteFooter";

// Hidden for now: kept out of search results. Remove `robots` here (and restore the nav/sitemap entries) to show it again.
export const metadata: Metadata = {
  ...pageMetadata("systems", "/systems"),
  robots: { index: false, follow: true },
};

export default function SystemsPage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <h1 className="visually-hidden">Systems: greenhouse services, materials and sensors</h1>
        <ServicesSection />
        <MaterialsSection />
        <SystemsSensorsHeroSection />
        <SensorsSection />
        <SystemsEnquireSection />
      </main>
      <SiteFooter />
    </>
  );
}
