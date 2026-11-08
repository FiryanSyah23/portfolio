"use client";

import { motion } from "motion/react";

type IntroProps = { onDone: () => void };

export default function Intro({ onDone }: IntroProps) {
    return (
        // Overlay: menutupi seluruh layar, lalu memudar saat dibuang (exit)
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            <motion.div
                className="size-16 rounded-full bg-primary shadow-lg shadow-accent/40"
                initial={{ y: -300 }}
                animate={{
                    // 0 = posisi tengah layar (lantai). Nilai negatif = lebih tinggi.
                    // jatuh dari -300, pantul ke -80, pantul ke -30, lalu diam di 0
                    y: [-300, 0, -80, 0, -30, 0],
                }}
                transition={{
                    duration: 1.6,
                    // kapan tiap nilai dicapai (0 = awal, 1 = akhir)
                    times: [0, 0.4, 0.56, 0.72, 0.86, 1],
                    // satu easing per segmen: jatuh, naik, jatuh, naik, jatuh
                    ease: ["easeIn", "easeOut", "easeIn", "easeOut", "easeIn"],
                }}
                // saat intro dibuang, bola membesar sambil menghilang
                exit={{
                    scale: 12,
                    opacity: 0,
                    transition: { duration: 0.5, ease: "easeIn" },
                }}
                onAnimationComplete={onDone}
            />
        </motion.div>
    );
}