import type { Metadata } from "next";
import { pageMetadata } from "@/content/seo";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/home/SiteFooter";
import { ProcessSection } from "@/components/systems/ProcessSection";

export const metadata: Metadata = pageMetadata("process", "/process");

export default function ProcessPage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <h1 className="visually-hidden">Process: from enquiry to build</h1>
        <ProcessSection />
      </main>
      <SiteFooter />
    </>
  );
}
