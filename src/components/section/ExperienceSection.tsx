"use client";

import { motion } from "motion/react";
import { useScrollingIndicator } from "@/hooks/useScrollingIndicator";
import { fadeUp, staggerContainer } from "@/lib/motionVariants";
import { experiences, testimonials } from "@/data/experience";
import RingingButton from "../RingingButton";
import { useSection } from "../SiteShell";

export default function ExperienceSection() {
    const { onNavigate } = useSection();
    const scrollRef = useScrollingIndicator<HTMLDivElement>();

    return (
        <section className="h-full">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="flex h-full flex-col gap-6"
            >
                <motion.h1 variants={fadeUp} className="text-2xl font-bold">
                    Perjalanan <span className="text-accent">Pengalaman</span>
                </motion.h1>

                <div
                    ref={scrollRef}
                    className="h-full overflow-y-auto pr-2 scrollbar-auto-hide flex flex-col gap-4"
                >
                    {/* Timeline */}
                    <motion.ol
                        variants={staggerContainer}
                        className="relative ml-2 flex flex-col gap-6 border-l border-border"
                    >
                        {experiences.map((exp) => (
                            <motion.li
                                key={`${exp.role}-${exp.period}`}
                                variants={fadeUp}
                                className="relative pl-6"
                            >
                                <span className="absolute -left-1.5 top-1.5 size-3 rounded-full bg-primary ring-4 ring-second" />
                                <p className="text-xs text-foreground/60">
                                    {exp.period}
                                </p>
                                <h2 className="font-semibold">
                                    {exp.role}
                                </h2>
                                <p className="text-sm text-support">
                                    {exp.place}
                                </p>
                                <p className="mt-1 text-xs text-foreground/70">
                                    {exp.desc}
                                </p>
                            </motion.li>
                        ))}
                    </motion.ol>

                    {/* Testimoni */}
                    {testimonials.length > 0 && (
                        <motion.div
                            variants={fadeUp}
                            className="flex flex-col gap-3"
                        >
                            <h2 className="text-lg font-semibold">
                                Kata mereka
                            </h2>
                            <ul className="grid gap-3 sm:grid-cols-2">
                                {testimonials.map((t) => (
                                    <li
                                        key={t.name}
                                        className="flex flex-col gap-2 rounded-xl border border-border/50 p-4"
                                    >
                                        <i
                                            className="ri-double-quotes-l ri-xl text-accent"
                                            aria-hidden="true"
                                        />
                                        <p className="text-sm text-foreground/80">
                                            {t.quote}
                                        </p>
                                        <p className="text-xs font-semibold">
                                            {t.name}
                                            <span className="font-normal text-foreground/60">
                                                {" "}
                                                · {t.role}
                                            </span>
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </div>

                {onNavigate && (
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-wrap gap-3 *:text-sm"
                    >
                        <button
                            type="button"
                            onClick={() => onNavigate("skills")}
                            className="rounded-lg border border-border px-5 py-2.5 font-medium text-support transition duration-300 hover:bg-accent hover:text-white"
                        >
                            Lihat Skill
                        </button>
                        <RingingButton onClick={() => onNavigate("contact")}>
                            Hubungi Saya
                        </RingingButton>
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
}
