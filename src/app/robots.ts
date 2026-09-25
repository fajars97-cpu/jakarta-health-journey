import type { MetadataRoute } from "next";

export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  const base = "/jakarta-health-journey";
  return {
    rules: [{ userAgent: "*", allow: [`${base}/`, `${base}/explore/`, `${base}/guide/`, `${base}/support/`, `${base}/feedback/`, `${base}/privacy/`, `${base}/terms/`], disallow: [`${base}/admin/`, `${base}/committee/`, `${base}/facility-admin/`, `${base}/partner-admin/`, `${base}/patient/`, `${base}/account/`, `${base}/login/`, `${base}/register/`] }],
    sitemap: "https://fajars97-cpu.github.io/jakarta-health-journey/sitemap.xml",
  };
}
