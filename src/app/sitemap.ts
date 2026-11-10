// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import dataProjects from "@/data/projects";
import { menus } from "@/data/menus";

const BASE = "https://firyansyah.my.id";

export default function sitemap(): MetadataRoute.Sitemap {
    const latest = new Date(
        dataProjects
            .map((p) => p.updatedAt)
            .sort()
            .at(-1)!,
    );
    return [
        ...menus.map((m) => ({
            url: `${BASE}${m.href === "/" ? "" : m.href}`,
            lastModified: latest,
            priority: m.href === "/" ? 1 : 0.8,
        })),
        ...dataProjects.map((p) => ({
            url: `${BASE}/projects/${p.slug}`,
            lastModified: new Date(p.updatedAt),
            priority: 0.6,
        })),
    ];
}
