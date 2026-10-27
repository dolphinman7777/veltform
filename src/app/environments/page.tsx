import type { Metadata } from "next";
import { pageMetadata } from "@/content/seo";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/home/SiteFooter";
import { EnvironmentsInteractions } from "@/components/environments/EnvironmentsInteractions";
import "./environments.css";

export const metadata: Metadata = pageMetadata("environments", "/environments");

import { environmentsMarkup as markup } from "@/components/environments/environments-markup";

export default function EnvironmentsPage() {
  return (
    <>
      <SiteHeader />
      <div className="env-page">
        <main
          id="climate-types"
          className="env-main"
          dangerouslySetInnerHTML={{ __html: markup }}
        />
        <EnvironmentsInteractions />
      </div>
      <SiteFooter />
    </>
  );
}
