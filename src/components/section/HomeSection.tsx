"use client";

import Image from "next/image";
import dataProjects from "@/data/projects";
import { roles, proTech } from "@/data/profile";
import Typewriter from "../TypeWriter";
import { useScrollingIndicator } from "@/hooks/useScrollingIndicator";
import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/motionVariants";
import RingingButton from "../RingingButton";
import { useSection } from "../SiteShell";

export default function HomeSection() {
    const { onNavigate } = useSection();
    const scrollRef = useScrollingIndicator<HTMLElement>();
    const stats = [
        { label: "Proyek Selesai", value: dataProjects.length },
        { label: "Pengalaman", value: "2+ Tahun" },
    ];

    return (
        <section
            ref={scrollRef}
            className="flex h-full flex-col justify-start overflow-y-auto md:justify-center md:overflow-visible scrollbar-auto-hide pb-10"
        >
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-6"
            >
                <motion.div
                    variants={fadeUp}
                    className="w-full flex flex-col items-center gap-3 rounded-2xl border border-border bg-background p-5 text-center shadow-md shadow-accent/20 md:hidden"
                >
                    <div className="size-28 overflow-hidden rounded-full border-4 border-primary/60 bg-primary">
                        <Image
                            src="/profile.webp"
                            alt="Foto profil Firyan Syah"
                            width={224}
                            height={224}
                            className="h-full w-full object-cover object-[-8px]"
                            priority
                        />
                    </div>

                    <div>
                        <p className="text-2xl font-bold uppercase">
                            Firyan Syah
                        </p>
                        <Typewriter
                            words={roles}
                            className="text-sm text-support"
                        />
                    </div>

                    <div className="flex flex-col items-center">
                        <p className="text-sm font-semibold">
                            Profesional Tech
                        </p>
                        <ul className="flex flex-wrap justify-center gap-2">
                            {proTech.map((tech) => (
                                <li
                                    key={tech}
                                    className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-white"
                                >
                                    {tech}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <a
                        href="/file/CV_Firyan_Syah.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-accent duration-300 hover:bg-accent hover:text-white"
                    >
                        <i
                            className="ri-download-2-line"
                            aria-hidden="true"
                        ></i>
                        Lihat CV
                    </a>
                </motion.div>

                <motion.span
                    variants={fadeUp}
                    className="w-fit rounded-full bg-accent px-3 py-1 text-sm text-white"
                >
                    Tersedia untuk proyek freelance
                </motion.span>

                <motion.h1
                    variants={fadeUp}
                    className="text-3xl font-bold lg:text-4xl"
                >
                    Wujudkan Website Impianmu,{" "}
                    <span className="bg-linear-to-r from-primary to-support bg-clip-text text-transparent">
                        Cepat dan Interaktif
                    </span>
                </motion.h1>

                <motion.p
                    variants={fadeUp}
                    className="max-w-xl text-foreground/80"
                >
                    Ubah ide dan kebutuhan digitalmu menjadi website yang
                    modern, responsif, dan interaktif. Yuk, wujudkan bersama!
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={() => onNavigate("about")}
                        className="rounded-lg border border-border px-5 py-2.5 font-medium text-support transition duration-300 hover:bg-accent hover:text-white"
                    >
                        Tentang Saya
                    </button>
                    <RingingButton onClick={() => onNavigate("contact")}>
                        Hubungi Saya
                    </RingingButton>
                </motion.div>

                <motion.dl variants={fadeUp} className="flex gap-8 pt-4">
                    {stats.map((stat) => (
                        <div key={stat.label}>
                            <dt className="text-sm text-foreground/60">
                                {stat.label}
                            </dt>
                            <dd className="text-xl font-bold">{stat.value}</dd>
                        </div>
                    ))}
                </motion.dl>
            </motion.div>
        </section>
    );
}
