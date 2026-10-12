import { SiteHeader } from "@/components/SiteHeader";
import { CuratedSlide } from "@/components/home/CuratedSlide";
import { HeroSection } from "@/components/home/HeroSection";
import { SensorsSection } from "@/components/home/SensorsSection";
import { SiteFooter } from "@/components/home/SiteFooter";
import { ArchToSensorsBand } from "@/components/home/ArchToSensorsBand";
import { ArchitecturalInfluencesSection } from "@/components/home/ArchitecturalInfluencesSection";
import { ThesisSection } from "@/components/home/ThesisSection";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ThesisSection />
        <ArchitecturalInfluencesSection />
        <ArchToSensorsBand />
        <SensorsSection />
        <CuratedSlide />
      </main>
      <SiteFooter />
    </>
  );
}
