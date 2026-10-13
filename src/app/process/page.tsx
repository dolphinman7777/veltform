import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/home/SiteFooter";
import { ProcessSection } from "@/components/systems/ProcessSection";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Process — ${site.displayName}`,
  description: site.processSteps[0]?.description ?? site.subtagline,
};

export default function ProcessPage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <ProcessSection />
      </main>
      <SiteFooter />
    </>
  );
}
