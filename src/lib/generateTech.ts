import dataProjects from "@/data/projects";
import dataSkills from "@/data/techStack";
import { TechStackWithCount } from "@/types/types";

const ALIASES: Record<string, string> = {
    js: "javascript",
    ts: "typescript",
    node: "nodejs",
    next: "nextjs",
    vue: "vuejs",
    express: "expressjs",
    reactjs: "react",
    tailwind: "tailwindcss",
    mongo: "mongodb",
    "c++": "c/c++",
    cpp: "c/c++",
};

const normalize = (text: string): string => {
    const base = text
        .trim()
        .toLowerCase()
        .replace(/[\s.\-_]/g, "");
    return ALIASES[base] ?? base;
};

const projectCountByTech = new Map<string, number>();

for (const project of dataProjects) {
    const uniqueTechs = new Set(project.tech.map(normalize));
    for (const tech of uniqueTechs) {
        projectCountByTech.set(tech, (projectCountByTech.get(tech) ?? 0) + 1);
    }
}

const dataSkillsWithCount: TechStackWithCount[] = dataSkills.map(
    (category) => ({
        ...category,
        items: category.items.map((item) => ({
            ...item,
            projectCount: projectCountByTech.get(normalize(item.name)) ?? 0,
        })),
    }),
);

if (process.env.NODE_ENV === "development") {
    const knownSkills = new Set(
        dataSkills.flatMap((c) => c.items.map((i) => normalize(i.name))),
    );
    for (const tech of projectCountByTech.keys()) {
        if (!knownSkills.has(tech)) {
            console.warn(
                `[generateTech] "${tech}" dipakai di project tapi tidak ada di techStack.ts`,
            );
        }
    }
}

export default dataSkillsWithCount;
