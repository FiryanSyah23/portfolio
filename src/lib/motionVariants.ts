import type { Variants } from "motion/react";

export const staggerContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};
