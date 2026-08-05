import type { Metadata, Viewport } from "next";
import { Montserrat, Poppins } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { localBusinessSchema, websiteSchema } from "@/lib/structured-data";
import "./globals.css";

/**
 * Display face, matching the sister site greatoutdoor.in.
 *
 * 900 is the hero weight (font-black on HeroPanel and the about page); 700 and
 * 600 cover section headings and buttons.
 */
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

/**
 * Body face. Poppins ships as static weights only — unlike a variable font,
 * each weight is a separate file, so this lists only the three the UI uses
 * (400 body, 500 font-medium, 600 font-semibold).
 */
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Pinch-zoom left enabled — disabling it is an accessibility regression.
  maximumScale: 5,
};

export const metadata: Metadata = {
  // Resolves relative OG/Twitter image paths to absolute URLs.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? SITE.url),
  title: {
    default: `${SITE.name} — Quality, Comfort and Class`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${poppins.variable} h-full`}
    >
      <body className="min-h-full">
        {/* Business + site identity, carried on every page so search engines
            resolve the entity from whichever URL they land on first. */}
        <JsonLd schema={localBusinessSchema()} />
        <JsonLd schema={websiteSchema()} />
        {children}
      </body>
    </html>
  );
}
