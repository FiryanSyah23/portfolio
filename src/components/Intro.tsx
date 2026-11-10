"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { menus } from "@/data/menus";
import { INTRO_ASSETS } from "@/lib/introAssets";
import { useAssetsReady } from "@/hooks/useAssetsReady";

type IntroProps = {
    onReveal: () => void;
    onDone: () => void;
};

const ORBIT_RADIUS = 120;
const ORBIT_DURATION = 1; // detik per putaran orbit
const ENTER_DELAY = 0.2;
const ENTER_DURATION = 1.6; // lama bubble terbang dari luar layar
const BUBBLE_STAGGER = 0.1;
const CONVERGE_MS = 900; // lama bubble masuk ke foto

const ENTRANCE_MS =
    (ENTER_DELAY + (menus.length - 1) * BUBBLE_STAGGER + ENTER_DURATION) * 1000;

const RIPPLE_COUNT = 2;
const RIPPLE_STAGGER = 0.25;
const RIPPLE_DURATION = 1;
const RIPPLE_SCALE = 3;
const RIPPLE_TOTAL_MS =
    ((RIPPLE_COUNT - 1) * RIPPLE_STAGGER + RIPPLE_DURATION) * 1000;

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
    const { ready, done, total } = useAssetsReady(INTRO_ASSETS);
    const [entered, setEntered] = useState(false);
    const [revealed, setRevealed] = useState(false);

    const onRevealRef = useRef(onReveal);
    const onDoneRef = useRef(onDone);

    useEffect(() => {
        onRevealRef.current = onReveal;
        onDoneRef.current = onDone;
    });

    const [farDistance] = useState(() =>
        typeof window === "undefined"
            ? 1500
            : Math.hypot(window.innerWidth, window.innerHeight),
    );

    // bubble dianggap sudah sampai di orbit setelah animasi masuk selesai
    useEffect(() => {
        const t = setTimeout(() => setEntered(true), ENTRANCE_MS);
        return () => clearTimeout(t);
    }, []);

    const allReady = ready && entered;
    const phase = !allReady ? "loading" : revealed ? "ripple" : "converge";
    const gathered = phase !== "loading";

    useEffect(() => {
        if (!allReady) return;
        const reveal = setTimeout(() => {
            setRevealed(true);
            onRevealRef.current();
        }, CONVERGE_MS);
        const finish = setTimeout(
            () => onDoneRef.current(),
            CONVERGE_MS + RIPPLE_TOTAL_MS,
        );
        return () => {
            clearTimeout(reveal);
            clearTimeout(finish);
        };
    }, [allReady]);

    const orbitTransition = entered
        ? {
              repeat: Infinity,
              duration: ORBIT_DURATION,
              ease: "linear" as const,
          }
        : { duration: 0 };

    return (
        <div
            role="status"
            aria-label="Memuat halaman"
            className={cn(
                "fixed inset-0 z-50 flex items-center justify-center overflow-hidden",
                phase === "ripple" && "pointer-events-none",
            )}
        >
            <motion.div
                animate={{ opacity: phase === "ripple" ? 0 : 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 bg-background-dark"
            />

            <div className="relative size-30">
                {/* Gelombang saat selesai */}
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
                            className="absolute inset-0 rounded-full border border-primary"
                        />
                    ))}

                {/* Wrapper orbit: baru berputar setelah semua bubble sampai */}
                <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: entered ? 360 : 0 }}
                    transition={orbitTransition}
                >
                    {menus.map((menu, index) => {
                        const angle =
                            (index / menus.length) * Math.PI * 2 - Math.PI / 2;
                        const x = Math.cos(angle) * ORBIT_RADIUS;
                        const y = Math.sin(angle) * ORBIT_RADIUS;
                        const fromX = Math.cos(angle) * farDistance;
                        const fromY = Math.sin(angle) * farDistance;

                        return (
                            <motion.span
                                key={menu.id}
                                initial={{
                                    x: fromX,
                                    y: fromY,
                                    scale: 1,
                                    opacity: 1,
                                }}
                                animate={
                                    gathered
                                        ? { x: 0, y: 0, scale: 0.3, opacity: 0 }
                                        : { x, y, scale: 1, opacity: 1 }
                                }
                                transition={
                                    gathered
                                        ? {
                                              duration: CONVERGE_MS / 1000,
                                              ease: "easeInOut",
                                          }
                                        : {
                                              duration: ENTER_DURATION,
                                              delay:
                                                  ENTER_DELAY +
                                                  index * BUBBLE_STAGGER,
                                              ease: "easeOut",
                                          }
                                }
                                className="absolute inset-0 m-auto flex size-14 items-center justify-center rounded-full border border-border bg-second text-support shadow-md"
                            >
                                {/* putar balik supaya ikon tetap tegak */}
                                <motion.i
                                    animate={{ rotate: entered ? -360 : 0 }}
                                    transition={orbitTransition}
                                    className={`${menu.icon} ri-lg inline-block`}
                                    aria-hidden="true"
                                />
                            </motion.span>
                        );
                    })}
                </motion.div>

                {/* Foto profil */}
                <motion.div
                    variants={photoVariants}
                    initial="hidden"
                    animate={phase === "ripple" ? "leaving" : "visible"}
                    className="relative z-10 flex size-30 items-center justify-center overflow-hidden rounded-full border-4 border-primary/60 bg-primary shadow-[0px_0px_20px_#e4a827]"
                >
                    <Image
                        src="/circuit-user.png"
                        alt="Foto profil Firyan Syah"
                        width={300}
                        height={300}
                        priority
                        className="size-20 object-cover"
                    />
                </motion.div>

                {/* Ring spinner, hilang saat semua siap */}
                <AnimatePresence>
                    {phase === "loading" && (
                        <motion.span
                            key="ring"
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.25 }}
                            className="absolute -inset-3 z-20"
                        >
                            <span className="block size-full animate-spin rounded-full border-4 border-border/40 border-t-primary" />
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>

            {phase === "loading" && (
                <p className="absolute bottom-10 left-0 right-0 text-center text-xs text-white/80">
                    Memuat {Math.round((done / total) * 100)}%
                </p>
            )}
        </div>
    );
}
