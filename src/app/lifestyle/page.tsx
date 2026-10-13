import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { LifestyleSection } from "@/components/home/LifestyleSection";
import { SiteFooter } from "@/components/home/SiteFooter";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Lifestyle — ${site.displayName}`,
  description: site.lifestyleIntro,
};

export default function LifestylePage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <LifestyleSection />
      </main>
      <SiteFooter />
    </>
  );
}
