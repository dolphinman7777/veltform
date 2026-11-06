import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata, pageUrl } from "@/content/seo";
import { site } from "@/content/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/home/SiteFooter";
import "./faq.css";

export const metadata: Metadata = pageMetadata("faq", "/faq");

const structuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: pageUrl("/faq"),
  mainEntity: site.faq.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <SiteHeader />
      <main className="veld-faq" id="top">
        <script
          type="application/ld+json"
          // JSON.stringify output is safe here: all values are static site content.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <h1 className="veld-faq__title mono">
          <span className="signal-mint">{site.faqHeading}</span>
        </h1>
        <div className="veld-faq__list">
          {site.faq.map(({ question, answer }) => (
            <div className="veld-faq__item" key={question}>
              <h2 className="mono">{question}</h2>
              <p>{answer}</p>
            </div>
          ))}
        </div>
        <div className="veld-faq__next">
          <Link className="veld-site-cta" href="/enquire">
            Enquire &rarr;
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
