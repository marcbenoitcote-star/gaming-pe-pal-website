import type { Metadata } from "next";
import "@/app/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const description =
  "Serveur privé Palworld francophone avec PvP léger, guildes de 3 joueurs, raids encadrés, progression équilibrée et communauté Discord.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Gaming P&E Pal — Serveur privé Palworld PvP léger",
    template: "%s | Gaming P&E Pal"
  },
  description,
  openGraph: {
    title: "Gaming P&E Pal — Serveur privé Palworld PvP léger",
    description,
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
