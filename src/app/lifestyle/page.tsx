import type { Metadata } from "next";
import { pageMetadata } from "@/content/seo";
import { SiteHeader } from "@/components/SiteHeader";
import { LifestyleSection } from "@/components/home/LifestyleSection";
import { SiteFooter } from "@/components/home/SiteFooter";

export const metadata: Metadata = pageMetadata("lifestyle", "/lifestyle");

export default function LifestylePage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <h1 className="visually-hidden">Lifestyle segments: kitchen garden, botanical library and living space</h1>
        <LifestyleSection />
      </main>
      <SiteFooter />
    </>
  );
}
