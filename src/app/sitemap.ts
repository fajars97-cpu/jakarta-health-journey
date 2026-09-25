import type { MetadataRoute } from "next";

const baseUrl = "https://fajars97-cpu.github.io/jakarta-health-journey";
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const publicRoutes = ["", "/explore", "/guide", "/support", "/feedback", "/privacy", "/terms"];
  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route}/`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
