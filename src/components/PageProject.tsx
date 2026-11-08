"use client";

import { Project } from "@/types/types";
import { cn, formatTanggal } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const badgeClass =
    "text-[10px] bg-foreground py-1 px-1.5 rounded-full text-white";

type PageProjectProps = {
    project: Project;
    close: boolean;
    onClose: () => void;
};

export default function PageProject({
    project,
    close,
    onClose,
}: PageProjectProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const images = project.projectImg ?? [];

    function nextSlide() {
        setCurrentSlide((prev) => (prev + 1) % images.length);
    }

    function prevSlide() {
        setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    }

    const stats: { label: string; value: React.ReactNode }[] = [
        {
            label: "Tech",
            value: (
                <ul className="flex flex-wrap justify-end  gap-1">
                    {project.tech.slice(0, 3).map((tech) => (
                        <li key={tech} className={badgeClass}>
                            {tech}
                        </li>
                    ))}
                    {project.tech.length > 3 && (
                        <li className={badgeClass}>
                            +{project.tech.length - 3}
                        </li>
                    )}
                </ul>
            ),
        },
        { label: "Kategori", value: project.category },
        { label: "Tahun Buat", value: project.year },
        { label: "Update", value: formatTanggal(project.updatedAt) },
        { label: "Status", value: project.status },
    ];

    return (
        <div className={`flex gap-4 ${close ? "flex-row" : "flex-col p-2"}`}>
            <div className="flex flex-col gap-2 justify-between">
                <div className="flex flex-col">
                    <div
                        className={`${close ? "w-90 h-50" : "w-full h-70"} relative group border border-border rounded-md overflow-hidden`}
                    >
                        {images.length > 0 && (
                            <Image
                                key={images[currentSlide]}
                                src={images[currentSlide]}
                                alt={`${project.title} screenshot ${currentSlide + 1} dari ${images.length}`}
                                fill
                                sizes={
                                    close
                                        ? "360px"
                                        : "(min-width: 1024px) 50vw, 100vw"
                                }
                                priority={currentSlide === 0}
                                className={cn(
                                    "duration-300",
                                    project.fit === "contain"
                                        ? "object-contain"
                                        : "object-cover object-top",
                                )}
                            />
                        )}

                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={prevSlide}
                                    aria-label="Gambar sebelumnya"
                                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70 text-white w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 duration-300"
                                >
                                    <i className="ri-arrow-left-s-line"></i>
                                </button>

                                <button
                                    onClick={nextSlide}
                                    aria-label="Gambar berikutnya"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70 text-white w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 duration-300"
                                >
                                    <i className="ri-arrow-right-s-line"></i>
                                </button>

                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                                    {images.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentSlide(i)}
                                            aria-label={`Ke gambar ${i + 1}`}
                                            className={`h-1.5 rounded-full duration-300 ${
                                                i === currentSlide
                                                    ? "w-4 bg-white"
                                                    : "w-1.5 bg-white/50"
                                            }`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    <dl className="flex flex-col pt-4 divide-y divide-border/50">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="flex justify-between gap-2 p-2 *:text-xs"
                            >
                                <dt className="shrink-0">{stat.label}</dt>
                                <dd className="text-primary text-right font-semibold">
                                    {stat.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <div className="flex w-full items-center justify-center gap-2">
                    <button
                        className="bg-primary hover:bg-accent text-white flex-1 p-2 rounded-md duration-300"
                        onClick={onClose}
                    >
                        <i className="ri-arrow-go-back-line"></i> Kembali
                    </button>
                    {project.demo !== "" && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary hover:bg-accent text-white flex-1 p-2 rounded-md text-center duration-300"
                        >
                            Lihat Demo
                        </a>
                    )}
                </div>
            </div>

            <div className="min-w-0 flex-1 text-sm *:indent-8 *:text-justify">
                <p>{project.longDescription}</p>
            </div>
        </div>
    );
}
