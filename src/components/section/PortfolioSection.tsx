import dataProjects from "@/data/projects";
import { cn } from "@/lib/utils";
import { SectionProps } from "@/types/types";
import Image from "next/image";

export default function PortfolioSection({ close }: SectionProps) {
    return (
        <section className="flex h-full flex-col gap-6 pb-5 pr-2">
            <h2 className="text-2xl font-bold">
                Proyek{" "}
                <span className="text-accent">
                    Website, Desktop, dan Mobile
                </span>{" "}
                yang Telah Saya Kerjakan
            </h2>

            <div
                className={cn(
                    "min-h-0 flex-1 overflow-y-auto",
                    "grid gap-4 ",
                    close ? "grid-cols-3 px-4" : "grid-cols-2 px-2",
                    "border-y border-border py-5",
                    "[&::-webkit-scrollbar]:w-1",
                    "[&::-webkit-scrollbar-track]:bg-transparent",
                    "[&::-webkit-scrollbar-thumb]:bg-primary",
                    "[&::-webkit-scrollbar-thumb]:rounded-full",
                )}
            >
                {dataProjects.map((item) => (
                    <div
                        key={item.slug}
                        className="flex flex-col h-full gap-2 rounded-md border border-border bg-background p-2"
                    >
                        {/* gambar portfolio */}
                        <div className="w-full h-45 overflow-hidden rounded-sm">
                            <Image
                                src={item.image}
                                alt={`${item.title} thumbnail`}
                                width={400}
                                height={400}
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
                                <div className="flex gap-2 ">
                                    {item.tech.slice(0, 3).map((tech, i) => (
                                        <span
                                            key={i}
                                            className="text-[10px] bg-foreground py-0.5 px-1.5 rounded-full text-white"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {item.tech.length > 3 && (
                                        <span className="text-[10px] bg-foreground py-0.5 px-1.5 rounded-full text-white">
                                            +{item.tech.length - 3}
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-stone-500">
                                    {item.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 ">
                                <a
                                    href=""
                                    className="bg-primary p-1 text-white text-sm text-center"
                                >
                                    Lihat Demo
                                </a>
                                <a
                                    href=""
                                    className="bg-primary p-1 text-white text-sm text-center"
                                >
                                    Lihat Demo
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
