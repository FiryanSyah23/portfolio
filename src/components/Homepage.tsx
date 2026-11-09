/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Typewriter from "./TypeWriter";
import { cn } from "@/lib/utils";
import HomeSection from "./section/HomeSection";
import AboutSection from "./section/AboutSection";
import { SectionProps } from "../types/types";
import TechSection from "./section/TechSection";
import PortfolioSection from "./section/PortfolioSection";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ContactSection from "./section/ContactSection";
import { proTech, roles } from "@/data/profile";
import {
    AnimatePresence,
    motion,
    MotionConfig,
    type MotionProps,
} from "motion/react";
import Intro from "./Intro";
import { menus } from "@/data/menus";

const sectionComponents: Record<string, React.ComponentType<SectionProps>> = {
    home: HomeSection,
    about: AboutSection,
    skills: TechSection,
    projects: PortfolioSection,
    contact: ContactSection,
};

const fadeInProps = (delay = 0): MotionProps => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.7, ease: "easeOut", delay },
});

type IntroStatus = "checking" | "playing" | "revealing" | "done";

export default function Homepage() {
    const [closeProfile, setCloseProfile] = useState<boolean>(false);
    const [enableAnimation, setEnableAnimation] = useState<boolean>(false);
    const [introStatus, setIntroStatus] = useState<IntroStatus>("checking");
    const [showHint, setShowHint] = useState<boolean>(false);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const sectionParam = searchParams.get("section");
    const sectionMenu = menus.some((menu) => menu.id === sectionParam)
        ? (sectionParam as string)
        : "home";

    const toggleDuration = enableAnimation ? 0.5 : 0;

    useEffect(() => {
        const savedCloseProfile = localStorage.getItem("closeProfile");

        if (savedCloseProfile !== null) {
            setCloseProfile(savedCloseProfile === "true");
        }

        // hint hanya tampil kalau user belum pernah menekan tombol toggle
        // setShowHint(localStorage.getItem("hideToggleHint") !== "true");

        setIntroStatus(
            sessionStorage.getItem("introSeen") ? "done" : "playing",
        );

        setShowHint(true);
        // setIntroStatus("playing");
    }, []);

    const ActiveSection = sectionComponents[sectionMenu];

    function handleSelectMenu(id: string) {
        const params = new URLSearchParams();
        if (id !== "home") params.set("section", id);

        const query = params.toString();
        router.push(query ? `${pathname}?${query}` : pathname, {
            scroll: false,
        });
    }

    function handleCloseProfile() {
        const next = !closeProfile;
        setEnableAnimation(true);
        setCloseProfile(next);
        localStorage.setItem("closeProfile", String(next));

        setShowHint(false);
        localStorage.setItem("hideToggleHint", "true");
    }

    function handleIntroReveal() {
        sessionStorage.setItem("introSeen", "true");
        setIntroStatus("revealing");
    }

    function handleIntroDone() {
        setIntroStatus("done");
    }

    return (
        <MotionConfig reducedMotion="user">
            {(introStatus === "playing" || introStatus === "revealing") && (
                <Intro onReveal={handleIntroReveal} onDone={handleIntroDone} />
            )}
            {(introStatus === "revealing" || introStatus === "done") && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={cn(
                        "bg-second w-full max-w-260 rounded-2xl shadow-stone shadow-xl border-2 border-border",
                        "h-[calc(100dvh-1rem)] md:h-150",
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
                                <button
                                    type="button"
                                    onClick={() => handleSelectMenu(menu.id)}
                                    aria-label={menu.label}
                                    aria-current={
                                        sectionMenu === menu.id
                                            ? "page"
                                            : undefined
                                    }
                                    className={cn(
                                        "w-full p-3 text-center duration-300 hover:bg-accent hover:text-white",
                                        sectionMenu === menu.id &&
                                            "bg-primary text-white",
                                    )}
                                >
                                    <i
                                        className={cn(menu.icon, "ri-lg")}
                                        aria-hidden="true"
                                    ></i>
                                </button>
                            </motion.div>
                        ))}
                    </nav>

                    {/* Profile Card (hanya desktop) */}
                    <motion.aside
                        aria-hidden={closeProfile}
                        inert={closeProfile}
                        initial={{ opacity: 0, width: 300 }}
                        animate={{ opacity: 1, width: closeProfile ? 0 : 300 }}
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
                            <div className="size-50 overflow-hidden rounded-full border-2 border-border bg-primary">
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
                                <h1 className="text-3xl font-bold uppercase">
                                    Firyan Syah
                                </h1>
                                <Typewriter
                                    words={roles}
                                    className="z-12 text-sm text-support"
                                />
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

                            <div className="flex w-full flex-col items-center gap-2">
                                <h2 className="text-sm font-semibold">
                                    Profesional Tech{" "}
                                </h2>
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
                        </motion.div>
                    </motion.aside>

                    {/* Content Area */}
                    <main className="relative flex min-h-0 min-w-0 flex-1">
                        {/* Tombol toggle profil + hint (hanya desktop) */}
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
                                    animate={{ rotate: closeProfile ? 180 : 0 }}
                                    transition={{ duration: toggleDuration }}
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
                                                className="absolute left-[-2.6px] top-1/2 size-3 -translate-y-1/2 rotate-45 rounded-xs bg-primary "
                                                aria-hidden="true"
                                            />

                                            <span className="relative block whitespace-nowrap rounded-xl bg-primary px-3 py-1 text-xs font-semibold text-white ">
                                                {closeProfile
                                                    ? "Click To Show"
                                                    : "Click To Hide"}
                                            </span>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <motion.div
                            {...fadeInProps(1)}
                            className="min-h-0 min-w-0 flex-1"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {ActiveSection && (
                                    <motion.div
                                        key={sectionMenu}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -12 }}
                                        transition={{
                                            duration: 0.2,
                                            ease: "easeOut",
                                        }}
                                        className="h-full px-2 pb-2 pt-4 md:pb-4 md:px-8 md:pt-10"
                                    >
                                        <ActiveSection
                                            key={sectionParam}
                                            onNavigate={handleSelectMenu}
                                            close={closeProfile}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </main>
                </motion.div>
            )}
        </MotionConfig>
    );
}
