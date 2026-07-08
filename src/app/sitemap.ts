import type { MetadataRoute } from "next";

const siteUrl = "https://gaming-pe-pal.com";
const routes = [
  "",
  "/serveur",
  "/regles",
  "/guides",
  "/evenements",
  "/communaute",
  "/faq",
  "/contact",
  "/roadmap",
  "/credits"
];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7
  }));
}
