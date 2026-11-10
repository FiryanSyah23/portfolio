"use client";

import { useScrollingIndicator } from "@/hooks/useScrollingIndicator";
import dataSkillsWithCount from "@/lib/generateTech";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer } from "@/lib/motionVariants";
import { motion, type Variants } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { createPortal } from "react-dom";
import RingingButton from "../RingingButton";
import { SectionProps } from "@/types/types";
import { useSection } from "../SiteShell";

const TOOLTIP_WIDTH = 224;
const GAP = 8;

type TooltipState = {
    name: string;
    description: string;
    projectCount: number;
    left: number;
    top?: number;
    bottom?: number;
};

const HIDE_PROJECT_COUNT = new Set([
    "Git",
    "GitHub",
    "Figma",
    "Postman",
    "Claude Code",
]);

const rowVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut",
            staggerChildren: 0.05,
            delayChildren: 0.15,
        },
    },
};

const iconPop: Variants = {
    hidden: { opacity: 0, scale: 0.6 },
    show: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 300, damping: 20 },
    },
};

export default function TechSection() {
    const { onNavigate } = useSection();
    const [tooltip, setTooltip] = useState<TooltipState | null>(null);
    const scrollRef = useScrollingIndicator<HTMLElement>();

    function showTooltip(
        el: HTMLElement,
        item: { name: string; description: string; projectCount: number },
    ) {
        const rect = el.getBoundingClientRect();

        const left = Math.min(
            Math.max(rect.left + rect.width / 2 - TOOLTIP_WIDTH / 2, GAP),
            window.innerWidth - TOOLTIP_WIDTH - GAP,
        );

        const showAbove = rect.bottom + GAP + 200 > window.innerHeight;

        setTooltip({
            ...item,
            left,
            ...(showAbove
                ? { bottom: window.innerHeight - rect.top + GAP }
                : { top: rect.bottom + GAP }),
        });
    }

    function hideTooltip() {
        setTooltip(null);
    }

    return (
        <section
            ref={scrollRef}
            className="h-full overflow-y-auto overflow-x-hidden  pr-2 scrollbar-auto-hide"
        >
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-2"
            >
                <motion.h2 variants={fadeUp} className="text-2xl font-bold">
                    Tools & Teknologi Pengembangan{" "}
                </motion.h2>

                <motion.div
                    variants={staggerContainer}
                    className="w-full divide-y divide-border/50 border-y border-border"
                >
                    {dataSkillsWithCount.map((cat) => (
                        <motion.div
                            key={cat.category}
                            variants={rowVariants}
                            className="flex items-center gap-12 py-3"
                        >
                            <h3 className="w-15 md:w-35 shrink-0 text-xs font-semibold">
                                {cat.category}
                            </h3>

                            <i
                                className="ri-contract-right-line mt-2"
                                aria-hidden="true"
                            />

                            {/* icon tech */}
                            <div className="flex flex-wrap items-start gap-2">
                                {cat.items.map((item) => {
                                    const isActive =
                                        tooltip?.name === item.name;

                                    return (
                                        <motion.div
                                            key={item.name}
                                            variants={iconPop}
                                        >
                                            <button
                                                type="button"
                                                aria-label={item.name}
                                                onMouseEnter={(e) =>
                                                    showTooltip(
                                                        e.currentTarget,
                                                        item,
                                                    )
                                                }
                                                onMouseLeave={hideTooltip}
                                                onFocus={(e) =>
                                                    showTooltip(
                                                        e.currentTarget,
                                                        item,
                                                    )
                                                }
                                                onBlur={hideTooltip}
                                                className={cn(
                                                    "flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-amber-100/20",
                                                    "transition-transform duration-200 ease-out",
                                                    isActive &&
                                                        "scale-110 border-accent",
                                                )}
                                            >
                                                <Image
                                                    src={item.logo}
                                                    alt=""
                                                    width={50}
                                                    height={50}
                                                    className="size-6"
                                                />
                                            </button>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
                {onNavigate && (
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-wrap gap-3 *:text-sm mt-2"
                    >
                        <button
                            type="button"
                            onClick={() => onNavigate("projects")}
                            className="rounded-lg border border-border px-5 py-2.5 font-medium text-support transition duration-300 hover:bg-accent hover:text-white"
                        >
                            Lihat Proyek
                        </button>
                        <RingingButton onClick={() => onNavigate("contact")}>
                            Hubungi Saya
                        </RingingButton>
                    </motion.div>
                )}
            </motion.div>

            {/* tooltip */}
            {tooltip &&
                createPortal(
                    <motion.div
                        key={tooltip.name}
                        role="tooltip"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.15 }}
                        style={{
                            left: tooltip.left,
                            top: tooltip.top,
                            bottom: tooltip.bottom,
                            width: TOOLTIP_WIDTH,
                        }}
                        className="pointer-events-none fixed z-50 flex flex-col gap-1 rounded-xl border border-border bg-background p-3 text-center shadow-lg"
                    >
                        <h4 className="text-sm font-semibold">
                            {tooltip.name}
                        </h4>
                        <p className="text-xs text-foreground/70">
                            {tooltip.description}
                        </p>
                        {!HIDE_PROJECT_COUNT.has(tooltip.name) && (
                            <p className="text-xs text-support">
                                {tooltip.projectCount > 0
                                    ? `Dipakai di ${tooltip.projectCount} proyek`
                                    : "Belum dipakai di proyek yang ditampilkan"}
                            </p>
                        )}
                    </motion.div>,
                    document.body,
                )}
        </section>
    );
}
