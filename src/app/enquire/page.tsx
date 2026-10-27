import type { Metadata } from "next";
import { pageMetadata } from "@/content/seo";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/home/SiteFooter";
import { EnquiryForm } from "./EnquiryForm";

export const metadata: Metadata = pageMetadata("enquire", "/enquire");

export default function EnquirePage() {
  return (
    <>
      <SiteHeader />
      <main className="veld-enquire">
        <h1 className="mono">
          <span className="signal-mint">enquire</span>
        </h1>
        <p className="veld-enquire-intro mono">
          Tell us a little about your project and we&apos;ll be in touch.
        </p>
        <EnquiryForm />
      </main>
      <SiteFooter />
    </>
  );
}
