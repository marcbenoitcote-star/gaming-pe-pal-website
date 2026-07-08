import type { Metadata } from "next";
import "@/app/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const description =
  "Serveur privé Palworld francophone avec PvP léger, guildes de 3 joueurs, raids encadrés, progression équilibrée et communauté Discord.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gaming-pe-pal.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Gaming P&E Pal — Serveur privé Palworld PvP léger",
    template: "%s | Gaming P&E Pal"
  },
  description,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Gaming P&E Pal — Serveur privé Palworld PvP léger",
    description,
    url: "/",
    siteName: "Gaming P&E Pal",
    locale: "fr_CA",
    type: "website",
    images: [
      {
        url: "/images/decor-pals-overlook.jpg",
        alt: "Panorama decoratif Palworld pour Gaming P&E Pal"
      }
    ]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
