import type { MetadataRoute } from "next";

const baseUrl = "https://agentic-bdf352a7.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/api/publish/youtube", "/api/publish/instagram"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
