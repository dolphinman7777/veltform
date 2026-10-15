import { SiteHeader } from "@/components/SiteHeader";
import { CuratedSlide } from "@/components/home/CuratedSlide";
import { HeroSection } from "@/components/home/HeroSection";
import { HeroVideoSlide } from "@/components/home/HeroVideoSlide";
import { SiteFooter } from "@/components/home/SiteFooter";
import { ArchitecturalInfluencesSection } from "@/components/home/ArchitecturalInfluencesSection";
import { ClimateSystemsSlide } from "@/components/home/ClimateSystemsSlide";
import { LifestyleHomeSection } from "@/components/home/LifestyleHomeSection";
import { ThesisSection } from "@/components/home/ThesisSection";

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
        <CuratedSlide />
      </main>
      <SiteFooter />
    </>
  );
}
