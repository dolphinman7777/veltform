import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SystemsHeroSection } from "@/components/systems/SystemsHeroSection";
import { LifestyleSection } from "@/components/home/LifestyleSection";
import { MaterialsSection } from "@/components/home/MaterialsSection";
import { ProcessSection } from "@/components/systems/ProcessSection";
import { SystemsEnquireSection } from "@/components/systems/SystemsEnquireSection";
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
        <SystemsHeroSection />
        <LifestyleSection />
        <ServicesSection />
        <MaterialsSection />
        <ProcessSection />
        <SystemsEnquireSection />
      </main>
      <SiteFooter />
    </>
  );
}
