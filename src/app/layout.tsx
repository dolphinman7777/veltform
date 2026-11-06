import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";
import { ImagePrefetcher } from "@/components/ImagePrefetcher";
import { ScrollOnNavigate } from "@/components/ScrollOnNavigate";
import { prefetchImageUrls } from "@/content/prefetch-images";
import { ogLocale, sentenceCase, shareImage } from "@/content/seo";
import { site } from "@/content/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.seo.home.title,
    template: `%s | ${site.displayName}`,
  },
  description: site.seo.home.description,
  applicationName: site.displayName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.displayName,
    locale: ogLocale,
    title: site.seo.home.title,
    description: site.seo.home.description,
    url: "/",
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.home.title,
    description: site.seo.home.description,
    images: [shareImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#DED7C8",
};

/** Organisation + website details for Google's knowledge panel and sitelinks. */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.displayName,
      url: site.url,
      email: site.contactEmail,
      logo: `${site.url}${site.logo}`,
      image: `${site.url}${shareImage.url}`,
      description: site.seo.home.description,
      slogan: site.tagline,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.location.city,
        addressRegion: site.location.region,
        addressCountry: site.location.countryCode,
      },
      areaServed: { "@type": "City", name: site.location.city },
      contactPoint: {
        "@type": "ContactPoint",
        email: site.contactEmail,
        contactType: "sales",
        url: `${site.url}/enquire`,
      },
      makesOffer: site.scenarios.map(({ title, body }) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: sentenceCase(title),
          description: body,
          serviceType: "Bespoke greenhouse design and build",
        },
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.displayName,
      description: site.seo.home.description,
      publisher: { "@id": `${site.url}/#organization` },
      inLanguage: "en-ZA",
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-ZA" className={`${cormorant.variable} ${ibmPlexMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // JSON.stringify output is safe here: all values are static site content.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <ScrollOnNavigate />
        {children}
        <ImagePrefetcher urls={prefetchImageUrls()} />
      </body>
    </html>
  );
}
