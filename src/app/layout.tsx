import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";
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
  title: `${site.displayName} — ${site.tagline}`,
  description: site.subtagline,
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#DED7C8",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${ibmPlexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
