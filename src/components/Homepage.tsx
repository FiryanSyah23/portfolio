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

const sectionComponents: Record<string, React.ComponentType<SectionProps>> = {
    home: HomeSection,
    about: AboutSection,
    skills: TechSection,
};

const menus = [
    { id: "home", label: "Home", icon: "ri-home-4-line" },
    { id: "about", label: "About", icon: "ri-user-3-line" },
    { id: "skills", label: "Skills", icon: "ri-code-s-slash-line" },
    { id: "projects", label: "Projects", icon: "ri-folder-open-line" },
    { id: "contact", label: "Contact", icon: "ri-contacts-book-2-line" },
];

const roles = [
    "Software Engineer",
    "Front-end Developer",
    "Back-end Developer",
    "Embedded Systems Enthusiast",
];

const proTech = ["Next.js", "Expo", "Wordpress"];

export default function Homepage() {
    const [sectionMenu, setSectionMenu] = useState<string | null>(null);
    const [closeProfile, setCloseProfile] = useState<boolean>(false);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [enableAnimation, setEnableAnimation] = useState<boolean>(false);

    useEffect(() => {
        const savedMenu = localStorage.getItem("sectionMenu");
        const savedCloseProfile = localStorage.getItem("closeProfile");

        if (savedMenu && menus.some((menu) => menu.id === savedMenu)) {
            setSectionMenu(savedMenu);
        } else {
            setSectionMenu("home");
        }

        if (savedCloseProfile !== null) {
            setCloseProfile(savedCloseProfile === "true");
        }

        setIsLoaded(true);
    }, []);

    const ActiveSection = sectionMenu ? sectionComponents[sectionMenu] : null;

    function handleSelectMenu(id: string) {
        setSectionMenu(id);
        localStorage.setItem("sectionMenu", id);
    }

    function handleCloseProfile() {
        const next = !closeProfile;
        setEnableAnimation(true);
        setCloseProfile(next);
        localStorage.setItem("closeProfile", String(next));
    }

    // Fade-in saat halaman dibuka, delay diatur per kolom
    function fadeIn(delay: string) {
        return cn(
            "transition-opacity duration-700 ease-out motion-reduce:transition-none",
            isLoaded ? "opacity-100" : "opacity-0",
            delay,
        );
    }

    return (
        <div
            className={cn(
                "bg-second w-250 h-150 rounded-2xl shadow-stone shadow-xl border-2 border-border",
                "flex overflow-hidden",
                fadeIn("delay-0"),
            )}
        >
            {/* Menu Navigation */}
            <nav
                className={cn(
                    "flex h-full w-12 flex-col items-center divide-y divide-border/50 border-r border-border/50 text-support",
                )}
            >
                <nav className="flex h-full w-12 flex-col items-center divide-y divide-border/50 border-r border-border/50 text-support">
                    {menus.map((menu, index) => (
                        <div
                            key={menu.id}
                            className={cn("w-full", fadeIn(""))}
                            style={{
                                transitionDelay: `${index * 150}ms`,
                            }}
                        >
                            <button
                                type="button"
                                onClick={() => handleSelectMenu(menu.id)}
                                aria-label={menu.label}
                                aria-current={
                                    sectionMenu === menu.id ? "page" : undefined
                                }
                                className={cn(
                                    "w-full p-3 text-center duration-300 hover:bg-accent hover:text-white",
                                    sectionMenu === menu.id &&
                                        "bg-primary text-white",
                                )}
                            >
                                <i
                                    className={cn(menu.icon, "ri-xl")}
                                    aria-hidden="true"
                                ></i>
                            </button>
                        </div>
                    ))}
                </nav>
            </nav>

            {/* Profile Card */}
            <aside
                aria-hidden={closeProfile}
                className={cn(
                    "h-full shrink-0 overflow-hidden border-r border-border/50",
                    closeProfile ? "w-0 border-r-0" : "w-80",
                    enableAnimation
                        ? "transition-[width,opacity] duration-500 ease-in-out"
                        : fadeIn("delay-850"),
                )}
            >
                <div
                    className={cn(
                        "flex h-full w-80 flex-col items-center justify-center gap-4 px-10 py-4",
                        enableAnimation && "transition-opacity duration-500",
                        closeProfile ? "opacity-0" : "opacity-100",
                    )}
                >
                    <div className="size-60 overflow-hidden rounded-full border-2 border-border bg-primary">
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
                        <Typewriter words={roles} className="z-12 text-sm" />
                    </div>

                    <div className="flex flex-wrap gap-1 justify-center w-full">
                        <a
                            href="/file/CV_Firyan_Syah.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                "inline-flex items-center justify-center gap-2 rounded-3xl border border-border px-4 py-2 text-sm font-semibold text-support",
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

                    <div className="flex w-full items-center gap-2 flex-col">
                        <h2>Profesional Tech</h2>
                        <div className="flex gap-2">
                            {proTech.map((items) => (
                                <span
                                    key={items}
                                    className="bg-primary text-sm text-white py-0.5 px-2 rounded-full"
                                >
                                    {items}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Content Area  */}
            <main className="relative flex flex-1 ">
                <button
                    type="button"
                    onClick={handleCloseProfile}
                    aria-label={closeProfile ? "Buka profil" : "Tutup profil"}
                    className={cn(
                        "absolute left-0 top-0 flex size-10 items-center justify-center text-support hover:text-accent",
                        fadeIn("delay-850"),
                    )}
                >
                    <i
                        className={cn(
                            "ri-arrow-left-line ri-xl inline-block",
                            enableAnimation &&
                                "transition-transform duration-500",
                            closeProfile && "rotate-180",
                        )}
                        aria-hidden="true"
                    ></i>
                </button>

                <div className={cn(fadeIn("delay-1000"), "flex-1")}>
                    {ActiveSection && (
                        <div key={sectionMenu} className="pt-10 px-8">
                            <ActiveSection onNavigate={handleSelectMenu} />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
