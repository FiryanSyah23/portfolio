import type { NextConfig } from "next";

const SECTIONS = ["about", "experience", "skills", "projects", "contact"];

const nextConfig: NextConfig = {
    cacheComponents: true,
    partialPrefetching: true,
    reactCompiler: true,
    turbopack: {
        rules: {
            "*.css": {
                loaders: ["@tailwindcss/turbopack"],
                as: "*.css",
            },
        },
    },

    async redirects() {
        return SECTIONS.map((s) => ({
            source: "/",
            has: [{ type: "query" as const, key: "section", value: s }],
            destination: `/${s}`,
            permanent: true,
        }));
    },
};

export default nextConfig;
