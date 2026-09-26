import { SiteHeader } from "@/components/SiteHeader";
import { CuratedSlide } from "@/components/home/CuratedSlide";
import { HeroSection } from "@/components/home/HeroSection";
import { MaterialsSection } from "@/components/home/MaterialsSection";
import { SensorsSection } from "@/components/home/SensorsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SlideBridgeStrawberry } from "@/components/home/SlideBridgeStrawberry";
import { ThesisSection } from "@/components/home/ThesisSection";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ThesisSection />
        <ServicesSection />
        <SlideBridgeStrawberry />
        <SensorsSection />
        <CuratedSlide />
        <MaterialsSection />
      </main>
      <SiteFooter />
    </>
  );
}
