import { SiteHeader } from "@/components/SiteHeader";
import { CuratedSlide } from "@/components/home/CuratedSlide";
import { HeroSection } from "@/components/home/HeroSection";
import { HeroVideoSlide } from "@/components/home/HeroVideoSlide";
import { SiteFooter } from "@/components/home/SiteFooter";
import { ArchitecturalInfluencesSection } from "@/components/home/ArchitecturalInfluencesSection";
import { ClimateSystemsSlide } from "@/components/home/ClimateSystemsSlide";
import { LifestyleSection } from "@/components/home/LifestyleSection";
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
        <LifestyleSection />
        <HeroVideoSlide />
        <CuratedSlide />
      </main>
      <SiteFooter />
    </>
  );
}
