// src/components/ProjectDetail.tsx
"use client";

import { useRouter } from "next/navigation";
import { Project } from "@/types/types";
import { useScrollingIndicator } from "@/hooks/useScrollingIndicator";
import PageProject from "./PageProject";
import { useSection } from "./SiteShell";

export default function ProjectDetail({ project }: { project: Project }) {
    const { close } = useSection();
    const router = useRouter();
    const scrollRef = useScrollingIndicator<HTMLDivElement>();

    return (
        <section className="h-full flex flex-col gap-4 pr-2">
            <h1 className="text-2xl font-bold text-accent">{project.title}</h1>
            <div
                ref={scrollRef}
                className="min-h-0 flex-1 overflow-y-auto scrollbar-auto-hide"
            >
                <PageProject
                    project={project}
                    close={close}
                    onClose={() => router.push("/projects", { scroll: false })}
                />
            </div>
        </section>
    );
}
