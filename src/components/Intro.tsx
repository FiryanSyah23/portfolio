"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { menus } from "@/data/menus";

type IntroProps = {
    onReveal: () => void; // dipanggil saat gelombang mulai (Homepage muncul)
    onDone: () => void; // dipanggil saat gelombang selesai (Intro dibuang)
};

const MIN_LOADING_MS = 1200; // loading minimal (milidetik)

// RADIUS = radius foto + radius bola + jarak kosong.
const RADIUS = 120;
const BUBBLE_START = 0.2; // detik: jeda setelah foto muncul sebelum bola pertama berangkat
const BUBBLE_STAGGER = 0.08; // detik: jeda antar bola
const BUBBLE_DURATION = 2.7; // detik: durasi satu bola (datang, berhenti, masuk)

const RIPPLE_COUNT = 2; // jumlah lingkaran gelombang
const RIPPLE_STAGGER = 0.25; // detik: jeda antar lingkaran
const RIPPLE_DURATION = 1; // detik: durasi satu lingkaran
const RIPPLE_SCALE = 3; // lingkaran membesar sampai 3x ukuran foto

type Phase = "bubbles" | "ripple";

// Tiga kondisi foto, dipilih lewat nama (animate="visible" dst).
const photoVariants: Variants = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            scale: { type: "spring", stiffness: 260, damping: 18 },
            opacity: { duration: 0.3 },
        },
    },
    leaving: {
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.5, ease: "easeInOut" },
    },
};

export default function Intro({ onReveal, onDone }: IntroProps) {
    const [imageReady, setImageReady] = useState(false);
    const [minTimePassed, setMinTimePassed] = useState(false);
    const [phase, setPhase] = useState<Phase>("bubbles");

    // Jarak awal bola = diagonal layar, supaya pasti di luar window.
    // Dihitung sekali saja saat komponen pertama dibuat.
    const [farDistance] = useState(() =>
        typeof window === "undefined"
            ? 1500
            : Math.hypot(window.innerWidth, window.innerHeight),
    );

    useEffect(() => {
        const timeout = setTimeout(
            () => setMinTimePassed(true),
            MIN_LOADING_MS,
        );
        return () => clearTimeout(timeout);
    }, []);

    const ready = imageReady && minTimePassed;

    const photoState = !ready
        ? "hidden"
        : phase === "ripple"
          ? "leaving"
          : "visible";

    function handleBubblesDone() {
        setPhase("ripple");
        onReveal();
    }

    return (
        <div
            role="status"
            aria-label="Memuat halaman"
            className={cn(
                "fixed inset-0 z-50 flex items-center justify-center overflow-hidden ",
                phase === "ripple" && "pointer-events-none",
            )}
        >
            <motion.div
                animate={{ opacity: phase === "ripple" ? 0 : 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 bg-background-dark"
            />

            <div className="relative size-30 ">
                {phase === "ripple" &&
                    Array.from({ length: RIPPLE_COUNT }, (_, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0.5, scale: 1 }}
                            animate={{ opacity: 0, scale: RIPPLE_SCALE }}
                            transition={{
                                duration: RIPPLE_DURATION,
                                delay: i * RIPPLE_STAGGER,
                                ease: "easeOut",
                            }}
                            // Intro dibuang saat lingkaran TERAKHIR selesai memancar
                            onAnimationComplete={
                                i === RIPPLE_COUNT - 1 ? onDone : undefined
                            }
                            className="absolute inset-0 rounded-full border border-primary"
                        />
                    ))}

                {/* Bola ikon menu: datang dari luar window, berhenti di sekitar foto, lalu masuk */}
                {ready &&
                    menus.map((menu, index) => {
                        // Sebar rata di lingkaran, mulai dari jam 12.
                        // 2π radian = satu lingkaran penuh.
                        const angle =
                            (index / menus.length) * Math.PI * 2 - Math.PI / 2;

                        // posisi berhenti: dekat foto
                        const x = Math.cos(angle) * RADIUS;
                        const y = Math.sin(angle) * RADIUS;

                        // posisi awal: arah yang sama, tapi jauh di luar layar
                        const fromX = Math.cos(angle) * farDistance;
                        const fromY = Math.sin(angle) * farDistance;

                        const isLast = index === menus.length - 1;

                        return (
                            <motion.span
                                key={menu.id}
                                initial={{
                                    x: fromX,
                                    y: fromY,
                                    scale: 1,
                                    opacity: 1,
                                }}
                                animate={{
                                    x: [fromX, x, x, 0, 0],
                                    y: [fromY, y, y, 0, 0],
                                    scale: [1, 1, 1, 0.3, 0.3],
                                    opacity: [1, 1, 1, 1, 0],
                                }}
                                transition={{
                                    duration: BUBBLE_DURATION,
                                    delay:
                                        BUBBLE_START + index * BUBBLE_STAGGER,
                                    // datang 40%, diam 28%, masuk 26%, hilang 6%
                                    times: [0, 0.4, 0.68, 0.94, 1],
                                    ease: [
                                        "easeOut",
                                        "linear",
                                        "easeIn",
                                        "linear",
                                    ],
                                }}
                                onAnimationComplete={
                                    isLast ? handleBubblesDone : undefined
                                }
                                className="absolute inset-0 m-auto flex size-14 items-center justify-center rounded-full border border-border bg-second text-support shadow-md"
                            >
                                <i
                                    className={`${menu.icon} ri-lg`}
                                    aria-hidden="true"
                                />
                            </motion.span>
                        );
                    })}

                {/* Foto profil: lapisan atas (z-10). */}
                <motion.div
                    variants={photoVariants}
                    initial="hidden"
                    animate={photoState}
                    className="relative z-10 size-30 overflow-hidden rounded-full border-4 border-primary/60 bg-primary flex items-center justify-center shadow-[0px_0px_20px_#e4a827]"
                >
                    <Image
                        src="/circuit-user.png"
                        alt="Foto profil Firyan Syah"
                        width={300}
                        height={300}
                        priority
                        onLoad={() => setImageReady(true)}
                        // Kalau foto gagal dimuat, jangan sampai intro macet selamanya
                        onError={() => setImageReady(true)}
                        className="size-20 object-cover"
                    />
                </motion.div>

                {/* Loading: spinner, hilang saat ready */}
                <AnimatePresence>
                    {!ready && (
                        <motion.div
                            key="loader"
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.25 }}
                            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3"
                        >
                            <motion.span
                                animate={{ rotate: 360 }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 0.9,
                                    ease: "linear",
                                }}
                                className="size-12 rounded-full border-4 border-border border-t-primary"
                            />
                            <span className="text-xs text-support">
                                Memuat...
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
