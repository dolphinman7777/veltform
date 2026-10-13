import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { MaterialsSection } from "@/components/home/MaterialsSection";
import { SystemsEnquireSection } from "@/components/systems/SystemsEnquireSection";
import { SystemsSensorsHeroSection } from "@/components/systems/SystemsSensorsHeroSection";
import { SensorsSection } from "@/components/home/SensorsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { SiteFooter } from "@/components/home/SiteFooter";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Systems — ${site.displayName}`,
  description: site.servicesIntro,
};

export default function SystemsPage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
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
