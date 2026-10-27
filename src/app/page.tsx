import type { Metadata } from "next";
import { pageMetadata } from "@/content/seo";
import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/home/HeroSection";
import { HeroVideoSlide } from "@/components/home/HeroVideoSlide";
import { SiteFooter } from "@/components/home/SiteFooter";
import { ArchitecturalInfluencesSection } from "@/components/home/ArchitecturalInfluencesSection";
import { ClimateSystemsSlide } from "@/components/home/ClimateSystemsSlide";
import { LifestyleHomeSection } from "@/components/home/LifestyleHomeSection";
import { ThesisSection } from "@/components/home/ThesisSection";

export const metadata: Metadata = pageMetadata("home", "/");

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ArchitecturalInfluencesSection />
        <ClimateSystemsSlide />
        <ThesisSection />
        <HeroVideoSlide />
        <LifestyleHomeSection />
      </main>
      <SiteFooter />
    </>
  );
}
