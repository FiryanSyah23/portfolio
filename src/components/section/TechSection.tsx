"use client";

import dataSkillsWithCount from "@/lib/genereteTech";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { createPortal } from "react-dom";

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

export default function TechSection() {
    const [tooltip, setTooltip] = useState<TooltipState | null>(null);

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
            onScroll={hideTooltip}
            className={cn(
                "flex h-full flex-col gap-6 overflow-y-auto pb-10 pr-2",
                "[&::-webkit-scrollbar]:w-1",
                "[&::-webkit-scrollbar-track]:bg-transparent",
                "[&::-webkit-scrollbar-thumb]:bg-primary",
                "[&::-webkit-scrollbar-thumb]:rounded-full",
            )}
        >
            <h2 className="text-2xl font-bold">
                Tools & Teknologi Pengembangan{" "}
                <span className="text-accent">Website dan Aplikasi</span>
            </h2>

            <div className="w-full divide-y divide-border/50 border-y border-border">
                {dataSkillsWithCount.map((cat) => (
                    <div
                        key={cat.category}
                        className="flex items-center gap-12 py-3"
                    >
                        <h3 className="w-35 shrink-0 text-xs font-semibold">
                            {cat.category}
                        </h3>

                        <i
                            className="ri-contract-right-line mt-2"
                            aria-hidden="true"
                        />

                        {/* icon tech */}
                        <div className="flex flex-wrap items-start gap-2">
                            {cat.items.map((item) => {
                                const isActive = tooltip?.name === item.name;

                                return (
                                    <button
                                        key={item.name}
                                        type="button"
                                        aria-label={item.name}
                                        onMouseEnter={(e) =>
                                            showTooltip(e.currentTarget, item)
                                        }
                                        onMouseLeave={hideTooltip}
                                        onFocus={(e) =>
                                            showTooltip(e.currentTarget, item)
                                        }
                                        onBlur={hideTooltip}
                                        className={cn(
                                            "flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-background",
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
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* tooltip */}
            {tooltip &&
                createPortal(
                    <div
                        role="tooltip"
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
                            <p className="text-xs text-accent">
                                {tooltip.projectCount > 0
                                    ? `Dipakai di ${tooltip.projectCount} proyek`
                                    : "Belum dipakai di proyek yang ditampilkan"}
                            </p>
                        )}
                    </div>,
                    document.body,
                )}
        </section>
    );
}
