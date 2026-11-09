"use client";

import dataProjects from "@/data/projects";
import { useScrollingIndicator } from "@/hooks/useScrollingIndicator";
import { SectionProps } from "@/types/types";
import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/motionVariants";

const focusAreas = [
    {
        icon: "ri-layout-line",
        title: "Web Development",
        desc: "Next.js, React, dan Tailwind CSS untuk website yang cepat dan responsif.",
    },
    {
        icon: "ri-smartphone-line",
        title: "Mobile App",
        desc: "Aplikasi cross-platform dengan React Native (Expo).",
    },
    {
        icon: "ri-cpu-line",
        title: "Embedded & IoT",
        desc: "Arduino dan ESP32 untuk prototype elektronik dan otomasi.",
    },
];

export default function AboutSection({ onNavigate }: Partial<SectionProps>) {
    const scrollRef = useScrollingIndicator<HTMLElement>();

    return (
        <section
            ref={scrollRef}
            className="h-full overflow-y-auto  pr-2 scrollbar-auto-hide"
        >
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-6"
            >
                <motion.div variants={fadeUp} className="flex flex-col gap-3">
                    <h2 className="text-4xl font-bold">Halo, saya Firyan</h2>
                    <p className="max-w-xl text-foreground/80">
                        Saya seorang Software Engineer yang antusias dengan
                        dunia teknologi. Senang mempelajari hal baru,
                        mengeksplorasi teknologi, dan mengembangkan ide menjadi
                        karya digital yang bermanfaat.
                    </p>
                </motion.div>

                <motion.div variants={fadeUp} className="flex flex-col gap-3">
                    <h2 className="text-lg font-semibold">Fokus saya</h2>
                    <motion.ul
                        variants={staggerContainer}
                        className="grid gap-3 sm:grid-cols-3"
                    >
                        {focusAreas.map((area) => (
                            <motion.li
                                key={area.title}
                                variants={fadeUp}
                                className="flex flex-col gap-2 rounded-xl border border-border/50 p-4"
                            >
                                <i
                                    className={`${area.icon} ri-xl text-accent`}
                                    aria-hidden="true"
                                ></i>
                                <h3 className="font-semibold">{area.title}</h3>
                                <p className="text-sm text-foreground/70">
                                    {area.desc}
                                </p>
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.div>

                <motion.p
                    variants={fadeUp}
                    className="text-sm text-foreground/70"
                >
                    Sejauh ini sudah {dataProjects.length} proyek yang saya
                    selesaikan, dari website sampai aplikasi desktop berbasis
                    mikrokontroler.
                </motion.p>

                {onNavigate && (
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-wrap gap-3"
                    >
                        <button
                            type="button"
                            onClick={() => onNavigate("skills")}
                            className="rounded-lg bg-primary px-5 py-2.5 font-medium text-white transition hover:opacity-90"
                        >
                            Lihat Skills
                        </button>
                        <button
                            type="button"
                            onClick={() => onNavigate("projects")}
                            className="rounded-lg bg-primary px-5 py-2.5 font-medium text-white transition hover:opacity-90"
                        >
                            Lihat Proyek
                        </button>
                        <button
                            type="button"
                            onClick={() => onNavigate("contact")}
                            className="rounded-lg border border-border px-5 py-2.5 font-medium transition hover:bg-accent hover:text-white"
                        >
                            Hubungi Saya
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
}
