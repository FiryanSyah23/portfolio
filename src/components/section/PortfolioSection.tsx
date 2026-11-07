"use client";

import dataProjects from "@/data/projects";
import { cn } from "@/lib/utils";
import { SectionProps } from "@/types/types";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PageProject from "../PageProject";

const badgeClass =
    "text-[10px] bg-foreground py-0.5 px-1.5 rounded-full text-white";

export default function PortfolioSection({ close }: SectionProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const detailProject = searchParams.get("project");

    const pageProjectDetail = dataProjects.find(
        (item) => item.slug === detailProject,
    );

    const detailOpen = Boolean(pageProjectDetail);

    function handleDetailOpen(slug: string) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("project", slug);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }

    function handleDetailClose() {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("project");
        const query = params.toString();
        router.push(query ? `${pathname}?${query}` : pathname, {
            scroll: false,
        });
    }

    return (
        <section className="flex h-full flex-col gap-6 pb-5 pr-2">
            {detailOpen ? (
                <h2 className="text-2xl font-bold text-accent">
                    {pageProjectDetail?.title}
                </h2>
            ) : (
                <h2 className="text-2xl font-bold">
                    Proyek{" "}
                    <span className="text-accent">
                        Website, Desktop, dan Mobile
                    </span>{" "}
                    yang Telah Saya Kerjakan
                </h2>
            )}

            <div
                className={cn(
                    "min-h-0 flex-1 overflow-y-auto",
                    "grid gap-4 relative",
                    !detailOpen &&
                        `border-y border-border py-5 ${close ? "grid-cols-3 px-4" : "grid-cols-2 px-2"}`,
                    "[&::-webkit-scrollbar]:w-1",
                    "[&::-webkit-scrollbar-track]:bg-transparent",
                    "[&::-webkit-scrollbar-thumb]:bg-primary",
                    "[&::-webkit-scrollbar-thumb]:rounded-full",
                )}
            >
                {pageProjectDetail ? (
                    <PageProject
                        key={pageProjectDetail.slug} // ganti proyek = state slide reset
                        project={pageProjectDetail}
                        close={close}
                        onClose={handleDetailClose}
                    />
                ) : (
                    dataProjects.map((item, index) => (
                        <div
                            key={item.slug}
                            className="flex flex-col h-full gap-2 rounded-md border border-border bg-background p-2 hover:scale-101 shadow-accent/70 hover:shadow-md duration-300"
                        >
                            {/* gambar portfolio */}
                            <div className="w-full h-45 overflow-hidden rounded-sm">
                                <Image
                                    src={item.image}
                                    alt={`${item.title} thumbnail`}
                                    width={400}
                                    height={400}
                                    priority={index < 3}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>

                            {/* konten portfolio */}
                            <div className="flex-1 flex flex-col gap-2 justify-between">
                                <div className="flex gap-2 flex-col">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-bold">
                                            {item.title}
                                        </h3>
                                        <span className="text-xs text-stone-400">
                                            {item.category}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        {item.tech.slice(0, 3).map((tech) => (
                                            <span
                                                key={tech}
                                                className={badgeClass}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {item.tech.length > 3 && (
                                            <span className={badgeClass}>
                                                +{item.tech.length - 3}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-stone-500">
                                        {item.description}
                                    </p>
                                </div>

                                <div
                                    className={`grid gap-4 ${item.demo !== "" ? "grid-cols-2" : "grid-cols-1"} *:flex *:items-center *:justify-center *:hover:bg-accent *:duration-300`}
                                >
                                    {item.demo !== "" && (
                                        <a
                                            href={item.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-primary p-1 text-white text-sm text-center"
                                        >
                                            Lihat Demo
                                        </a>
                                    )}
                                    <button
                                        className="bg-primary p-1 text-white text-sm text-center"
                                        onClick={() =>
                                            handleDetailOpen(item.slug)
                                        }
                                    >
                                        Lihat Detail
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
