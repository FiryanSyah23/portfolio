"use client";

import { useEffect } from "react";
import { motion, useAnimationControls, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

type RingingButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    /** detik sebelum dering pertama */
    delay?: number;
    /** durasi satu dering (detik) */
    duration?: number;
    /** jeda antar dering (detik) */
    pause?: number;
};

const MARKS = [
    { size: "size-3", offset: "-right-1.5 -top-1.5", extra: 0 },
    { size: "size-5", offset: "-right-3 -top-3", extra: 0.08 },
];

export default function RingingButton({
    children,
    onClick,
    className,
    delay = 2,
    duration = 0.8,
    pause = 5,
}: RingingButtonProps) {
    const controls = useAnimationControls();

    const buttonVariants: Variants = {
        idle: { rotate: 0 },
        ring: {
            rotate: [0, -12, 12, -10, 10, -6, 6, -3, 3, 0],
            transition: { duration, ease: "easeInOut" },
        },
    };

    const markVariants: Variants = {
        idle: { opacity: 0, scale: 0.6 },
        ring: (extra: number) => ({
            opacity: [0, 1, 0.3, 1, 0.3, 1, 0.3, 1, 0],
            scale: [0.6, 1, 0.9, 1, 0.9, 1, 0.9, 1, 0.6],
            transition: { duration, delay: extra, ease: "easeInOut" },
        }),
    };

    useEffect(() => {
        const ring = () => controls.start("ring");
        let interval: ReturnType<typeof setInterval> | undefined;

        const first = setTimeout(() => {
            ring();
            interval = setInterval(ring, (duration + pause) * 1000);
        }, delay * 1000);

        return () => {
            clearTimeout(first);
            clearInterval(interval);
        };
    }, [controls, delay, duration, pause]);

    return (
        <div className="relative w-fit">
            {MARKS.map((mark) => (
                <motion.span
                    key={mark.size}
                    aria-hidden="true"
                    variants={markVariants}
                    custom={mark.extra}
                    initial="idle"
                    animate={controls}
                    className={cn(
                        "pointer-events-none absolute rounded-tr-full border-r-2 border-t-2 border-accent",
                        mark.size,
                        mark.offset,
                    )}
                />
            ))}

            <motion.button
                type="button"
                onClick={onClick}
                variants={buttonVariants}
                initial="idle"
                animate={controls}
                className={cn(
                    "rounded-lg border border-border px-5 py-2.5 font-medium transition-colors duration-300 hover:bg-accent hover:text-white",
                    className,
                )}
            >
                {children}
            </motion.button>
        </div>
    );
}
