// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import dataProjects from "@/data/projects";
import { menus } from "@/data/menus";

const BASE = "https://firyansyah.my.id";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        ...menus.map((m) => ({
            url: `${BASE}${m.href === "/" ? "" : m.href}`,
            priority: m.href === "/" ? 1 : 0.8,
        })),
        ...dataProjects.map((p) => ({
            url: `${BASE}/projects/${p.slug}`,
            lastModified: new Date(p.updatedAt),
            priority: 0.6,
        })),
    ];
}
