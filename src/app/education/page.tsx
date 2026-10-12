import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/home/SiteFooter";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Education — ${site.displayName}`,
  description: site.subtagline,
};

export default function EducationPage() {
  return (
    <>
      <SiteHeader />
      <main />
      <SiteFooter />
    </>
  );
}
