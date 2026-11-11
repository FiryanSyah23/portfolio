/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    AnimatePresence,
    motion,
    MotionConfig,
    type MotionProps,
} from "motion/react";
import { cn } from "@/lib/utils";
import { SectionProps } from "../types/types";
import { menus } from "@/data/menus";
import Intro from "./Intro";
import BootLoader from "./BootLoader";
import ThemeToggle from "./ThemeToggle";
import { proTech, roles } from "@/data/profile";
import Typewriter from "./TypeWriter";
import Image from "next/image";

// --- Context: jembatan shell -> section ---
const SiteContext = createContext<SectionProps | null>(null);

export function useSection() {
    const ctx = useContext(SiteContext);
    if (!ctx) throw new Error("useSection harus dipakai di dalam <SiteShell>");
    return ctx;
}

const fadeInProps = (delay = 0): MotionProps => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.7, ease: "easeOut", delay },
});

type IntroStatus = "checking" | "playing" | "revealing" | "done";

export default function SiteShell({ children }: { children: React.ReactNode }) {
    const [closeProfile, setCloseProfile] = useState(false);
    const [enableAnimation, setEnableAnimation] = useState(false);
    const [introStatus, setIntroStatus] = useState<IntroStatus>("checking");
    const [showHint, setShowHint] = useState(false);

    const router = useRouter();
    const pathname = usePathname();

    // "/projects/abc" -> "projects", "/" -> "home"
    const sectionKey = pathname.split("/")[1] || "home";
    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    const toggleDuration = enableAnimation ? 0.5 : 0;
    const shellVisible = introStatus === "revealing" || introStatus === "done";

    useEffect(() => {
        try {
            const savedCloseProfile = localStorage.getItem("closeProfile");
            if (savedCloseProfile !== null) {
                setCloseProfile(savedCloseProfile === "true");
            }
            setShowHint(localStorage.getItem("hideToggleHint") !== "true");
        } catch {}

        let seen = false;
        try {
            seen = Boolean(sessionStorage.getItem("introSeen"));
        } catch {}
        setIntroStatus(seen ? "done" : "playing");
    }, []);

    function handleIntroReveal() {
        try {
            sessionStorage.setItem("introSeen", "true");
        } catch {}
        setIntroStatus("revealing");
    }

    function handleCloseProfile() {
        const next = !closeProfile;
        setEnableAnimation(true);
        setCloseProfile(next);
        try {
            localStorage.setItem("closeProfile", String(next));
            localStorage.setItem("hideToggleHint", "true");
        } catch {}
        setShowHint(false);
    }

    function handleSelectMenu(id: string) {
        const menu = menus.find((m) => m.id === id);
        if (menu) router.push(menu.href, { scroll: false });
    }

    return (
        <SiteContext.Provider
            value={{ onNavigate: handleSelectMenu, close: closeProfile }}
        >
            <MotionConfig reducedMotion="user">
                <div className="flex min-h-dvh items-center justify-center">
                    <div className="pointer-events-none fixed -z-10 size-96 rounded-full bg-primary/20 blur-3xl top-10 -left-20" />
                    <div className="pointer-events-none fixed -z-10 size-96 rounded-full bg-primary/20 blur-3xl -bottom-10 -right-20" />

                    {introStatus === "checking" && <BootLoader />}
                    {(introStatus === "playing" ||
                        introStatus === "revealing") && (
                        <Intro
                            onReveal={handleIntroReveal}
                            onDone={() => setIntroStatus("done")}
                        />
                    )}

                    <motion.div
                        key={shellVisible ? "on" : "off"}
                        inert={!shellVisible}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={
                            shellVisible
                                ? { opacity: 1, scale: 1 }
                                : { opacity: 0, scale: 0.9 }
                        }
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className={cn(
                            "bg-second w-full max-w-260 rounded-2xl shadow-accent/30 shadow-[0px_0px_10px] border-2 border-border",
                            "h-[calc(100dvh-1rem)] md:max-h-150",
                            "flex flex-col-reverse overflow-hidden md:flex-row",
                        )}
                    >
                        <nav
                            aria-label="Menu utama"
                            className={cn(
                                "flex w-full shrink-0 flex-row divide-x divide-border/50 border-t border-border/50 text-support",
                                "md:h-full md:w-12 md:flex-col md:divide-x-0 md:divide-y md:border-t-0 md:border-r",
                            )}
                        >
                            {menus.map((menu, index) => (
                                <motion.div
                                    key={menu.id}
                                    {...fadeInProps(index * 0.15)}
                                    className="flex-1 md:w-full md:flex-none"
                                >
                                    <Link
                                        href={menu.href}
                                        scroll={false}
                                        aria-label={menu.label}
                                        aria-current={
                                            isActive(menu.href)
                                                ? "page"
                                                : undefined
                                        }
                                        className={cn(
                                            "block w-full p-3 text-center duration-300 hover:bg-accent hover:text-white",
                                            isActive(menu.href) &&
                                                "bg-primary text-white",
                                        )}
                                    >
                                        <i
                                            className={cn(menu.icon, "ri-lg")}
                                            aria-hidden="true"
                                        ></i>
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <motion.aside
                            aria-hidden={closeProfile}
                            inert={closeProfile}
                            initial={{ opacity: 0, width: 300 }}
                            animate={{
                                opacity: 1,
                                width: closeProfile ? 0 : 300,
                            }}
                            transition={{
                                opacity: {
                                    duration: 0.7,
                                    ease: "easeOut",
                                    delay: 0.85,
                                },
                                width: {
                                    duration: toggleDuration,
                                    ease: "easeInOut",
                                },
                            }}
                            className={cn(
                                "hidden md:block",
                                "h-full shrink-0 overflow-hidden border-r border-border/50",
                                closeProfile && "border-r-0",
                            )}
                        >
                            <motion.div
                                animate={{ opacity: closeProfile ? 0 : 1 }}
                                transition={{ duration: toggleDuration }}
                                className="flex h-full w-75 flex-col items-center justify-center gap-4 px-6 py-4"
                            >
                                <div className="size-50  overflow-hidden rounded-full border-2 border-border bg-primary">
                                    <Image
                                        src="/profile.webp"
                                        alt="Foto profil Firyan Syah"
                                        width={300}
                                        height={300}
                                        className="h-full w-full object-cover object-[-15px]"
                                        loading="eager"
                                    />
                                </div>

                                <div className="flex flex-col text-center">
                                    <p className="text-3xl font-bold uppercase">
                                        Firyan Syah
                                    </p>
                                    <Typewriter
                                        words={roles}
                                        className="z-12 text-sm text-support"
                                    />
                                </div>

                                <div className="flex w-full flex-col items-center gap-2">
                                    <p className="text-sm font-semibold">
                                        Profesional Tech{" "}
                                    </p>
                                    <div className="flex gap-2">
                                        {proTech.map((items) => (
                                            <span
                                                key={items}
                                                className="rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-white"
                                            >
                                                {items}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex w-full flex-wrap justify-center gap-1">
                                    <a
                                        href="/file/CV_Firyan_Syah.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cn(
                                            "inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold text-support",
                                            "duration-300 hover:bg-accent hover:text-white",
                                        )}
                                    >
                                        <i
                                            className="ri-file-text-line"
                                            aria-hidden="true"
                                        ></i>
                                        Lihat CV
                                    </a>
                                </div>
                            </motion.div>
                        </motion.aside>

                        <main className="relative flex min-h-0 min-w-0 flex-1">
                            <div className="pointer-events-none absolute left-0 top-0 z-20 hidden h-10 items-center md:flex">
                                <motion.button
                                    type="button"
                                    onClick={handleCloseProfile}
                                    aria-label={
                                        closeProfile
                                            ? "Buka profil"
                                            : "Tutup profil"
                                    }
                                    {...fadeInProps(0.85)}
                                    className="pointer-events-auto flex size-10 items-center justify-center text-support transition-colors duration-300 hover:text-accent"
                                >
                                    <motion.i
                                        className="ri-arrow-left-line ri-xl inline-block"
                                        animate={{
                                            rotate: closeProfile ? 180 : 0,
                                        }}
                                        transition={{
                                            duration: toggleDuration,
                                        }}
                                        aria-hidden="true"
                                    />
                                </motion.button>

                                <AnimatePresence>
                                    {showHint && (
                                        <motion.div
                                            key="toggle-hint"
                                            aria-hidden="true"
                                            initial={{ opacity: 0, x: -8 }}
                                            animate={{
                                                opacity: 1,
                                                x: 0,
                                                transition: {
                                                    delay: 1.3,
                                                    duration: 0.3,
                                                    ease: "easeOut",
                                                },
                                            }}
                                            exit={{
                                                opacity: 0,
                                                x: -8,
                                                transition: { duration: 0.2 },
                                            }}
                                            className="ml-2"
                                        >
                                            <motion.div
                                                animate={{ x: [0, -4, 0] }}
                                                transition={{
                                                    delay: 1.8,
                                                    duration: 1.4,
                                                    ease: "easeInOut",
                                                    repeat: Infinity,
                                                }}
                                                className="relative"
                                            >
                                                <span
                                                    className="absolute left-[-2.6px] top-1/2 size-3 -translate-y-1/2 rotate-45 rounded-xs bg-primary"
                                                    aria-hidden="true"
                                                />
                                                <span className="relative block whitespace-nowrap rounded-xl bg-primary px-3 py-1 text-xs font-semibold text-white">
                                                    {closeProfile
                                                        ? "Click To Show"
                                                        : "Click To Hide"}
                                                </span>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className="absolute right-0 top-0 z-20">
                                <ThemeToggle />
                            </div>

                            <motion.div
                                {...fadeInProps(1)}
                                className="min-h-0 min-w-0 flex-1"
                            >
                                <motion.div
                                    key={sectionKey}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeOut",
                                    }}
                                    className="h-full *:pb-4 px-2 pt-10 md:pb-4 md:px-8 overflow-hidden"
                                >
                                    {children}
                                </motion.div>
                            </motion.div>
                        </main>
                    </motion.div>
                </div>
            </MotionConfig>
        </SiteContext.Provider>
    );
}
