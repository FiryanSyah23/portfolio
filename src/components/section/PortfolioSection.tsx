"use client";

import { useState } from "react";
import dataProjects from "@/data/projects";
import { cn } from "@/lib/utils";
import { SectionProps } from "@/types/types";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import PageProject from "../PageProject";
import { useScrollingIndicator } from "@/hooks/useScrollingIndicator";

const badgeClass =
    "text-[10px] bg-foreground py-0.5 px-1.5 rounded-full text-white";

export default function PortfolioSection({ close }: SectionProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const scrollRef = useScrollingIndicator<HTMLElement>();
    const detailProject = searchParams.get("project");

    const [skipEntrance, setSkipEntrance] = useState(false);

    const pageProjectDetail = dataProjects.find(
        (item) => item.slug === detailProject,
    );

    const detailOpen = Boolean(pageProjectDetail);

    function handleDetailOpen(slug: string) {
        setSkipEntrance(true);
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
        <section
            ref={scrollRef}
            className="flex h-full flex-col gap-6 pb-5 pr-2 "
        >
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
                    yang telah saya kerjakan
                </h2>
            )}

            <motion.div
                layoutScroll
                className={cn(
                    "min-h-0 flex-1 overflow-y-auto scrollbar-auto-hide",
                    "grid gap-4 relative max-md:grid-cols-1",
                    !detailOpen &&
                        `border-y border-border py-5 ${close ? "grid-cols-3 px-4" : "grid-cols-2 px-2 "}`,
                )}
            >
                {pageProjectDetail ? (
                    <PageProject
                        key={pageProjectDetail.slug}
                        project={pageProjectDetail}
                        close={close}
                        onClose={handleDetailClose}
                    />
                ) : (
                    dataProjects.map((item, index) => (
                        <motion.div
                            key={item.slug}
                            initial={
                                skipEntrance ? false : { opacity: 0, y: 20 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.4,
                                ease: "easeOut",
                                delay: index * 0.08,
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex flex-col h-full gap-2 rounded-md border border-border bg-background p-2 shadow-accent/70 hover:shadow-md transition-shadow duration-300"
                        >
                            <motion.div
                                layoutId={`project-img-${item.slug}`}
                                transition={{
                                    duration: 0.45,
                                    ease: "easeInOut",
                                }}
                                style={{ borderRadius: 6 }}
                                className="relative aspect-video w-full overflow-hidden bg-stone-100"
                            >
                                <Image
                                    src={item.image}
                                    alt={`${item.title} thumbnail`}
                                    fill
                                    sizes="(min-width: 1024px) 33vw, 50vw"
                                    priority={index < 3}
                                    className={cn(
                                        item.fit === "contain"
                                            ? "object-contain p-1"
                                            : "object-cover object-top",
                                    )}
                                />
                            </motion.div>

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
                                    className={`grid gap-2  ${item.demo !== "" ? "grid-cols-2" : "grid-cols-1"} *:flex *:items-center *:justify-center *:hover:bg-accent *:duration-300 *:rounded-md`}
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
                        </motion.div>
                    ))
                )}
            </motion.div>
        </section>
    );
}
