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

const sectionComponents: Record<string, React.ComponentType<SectionProps>> = {
    home: HomeSection,
    about: AboutSection,
    skills: TechSection,
    projects: PortfolioSection,
    contact: ContactSection,
};

const menus = [
    { id: "home", label: "Home", icon: "ri-home-4-line" },
    { id: "about", label: "About", icon: "ri-user-3-line" },
    { id: "skills", label: "Skills", icon: "ri-code-s-slash-line" },
    { id: "projects", label: "Projects", icon: "ri-folder-open-line" },
    { id: "contact", label: "Contact", icon: "ri-contacts-book-2-line" },
];

export default function Homepage() {
    const [closeProfile, setCloseProfile] = useState<boolean>(false);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [enableAnimation, setEnableAnimation] = useState<boolean>(false);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const sectionParam = searchParams.get("section");
    const sectionMenu = menus.some((menu) => menu.id === sectionParam)
        ? (sectionParam as string)
        : "home";

    useEffect(() => {
        const savedCloseProfile = localStorage.getItem("closeProfile");

        if (savedCloseProfile !== null) {
            setCloseProfile(savedCloseProfile === "true");
        }

        setIsLoaded(true);
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
    }

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
                "bg-second w-full max-w-250 rounded-2xl shadow-stone shadow-xl border-2 border-border",
                "h-[calc(100dvh-1rem)] md:h-150",
                "flex flex-col-reverse overflow-hidden md:flex-row",
                fadeIn("delay-0"),
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
                    <div
                        key={menu.id}
                        className={cn(
                            "flex-1 md:w-full md:flex-none",
                            fadeIn(""),
                        )}
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
                                className={cn(menu.icon, "ri-lg")}
                                aria-hidden="true"
                            ></i>
                        </button>
                    </div>
                ))}
            </nav>

            {/* Profile Card (hanya desktop) */}
            <aside
                aria-hidden={closeProfile}
                inert={closeProfile}
                className={cn(
                    "hidden md:block",
                    "h-full shrink-0 overflow-hidden border-r border-border/50",
                    closeProfile ? "w-0 border-r-0" : "w-75",
                    enableAnimation
                        ? "transition-[width,opacity] duration-500 ease-in-out"
                        : fadeIn("delay-850"),
                )}
            >
                <div
                    className={cn(
                        "flex h-full w-75 flex-col items-center justify-center gap-4 px-6 py-4",
                        enableAnimation && "transition-opacity duration-500",
                        closeProfile ? "opacity-0" : "opacity-100",
                    )}
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
                </div>
            </aside>

            {/* Content Area */}
            <main className="relative flex min-h-0 min-w-0 flex-1">
                {/* Tombol toggle profil (hanya desktop) */}
                <button
                    type="button"
                    onClick={handleCloseProfile}
                    aria-label={closeProfile ? "Buka profil" : "Tutup profil"}
                    className={cn(
                        "absolute left-0 top-0 hidden size-10 items-center justify-center text-support hover:text-accent md:flex",
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

                <div
                    className={cn(
                        fadeIn("delay-1000"),
                        "min-h-0 min-w-0 flex-1",
                    )}
                >
                    {ActiveSection && (
                        <div
                            key={sectionMenu}
                            className="h-full px-4 pt-4 md:px-8 md:pt-10"
                        >
                            <ActiveSection
                                key={sectionParam}
                                onNavigate={handleSelectMenu}
                                close={closeProfile}
                            />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
