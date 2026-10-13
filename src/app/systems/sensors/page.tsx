import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SensorsSection } from "@/components/home/SensorsSection";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SystemsSensorsHeroSection } from "@/components/systems/SystemsSensorsHeroSection";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Sensors — Systems — ${site.displayName}`,
  description: `${site.sensorsHighlight} ${site.sensorsHeadline}`,
};

export default function SystemsSensorsPage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <SystemsSensorsHeroSection />
        <SensorsSection />
      </main>
      <SiteFooter />
    </>
  );
}
