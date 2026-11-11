import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dataProjects from "@/data/projects";
import ProjectDetail from "@/components/ProjectDetail";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return dataProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = dataProjects.find((p) => p.slug === slug);

    if (!project) return {};

    return {
        title: project.title,
        description: project.description,
        alternates: {
            canonical: `/projects/${slug}`,
        },
        openGraph: {
            type: "article",
            url: `/projects/${slug}`,
            title: project.title,
            description: project.description,
            images: [project.image],
        },
    };
}

async function ProjectContent({ params }: Props) {
    const { slug } = await params;
    const project = dataProjects.find((p) => p.slug === slug);
    if (!project) notFound();
    return <ProjectDetail project={project} />;
}

export default function ProjectPage({ params }: Props) {
    return (
        <Suspense fallback={<div>Memuat detail proyek...</div>}>
            <ProjectContent params={params} />
        </Suspense>
    );
}
