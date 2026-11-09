import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://firyansyah.my.id",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        // kalau punya halaman detail proyek, generate dari data/projects.ts
    ];
}
