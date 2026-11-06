// src/components/section/AboutSection.tsx
import dataProjects from "@/data/projects";
import { cn } from "@/lib/utils";
import { SectionProps } from "@/types/types";

const focusAreas = [
    {
        icon: "ri-layout-line",
        title: "Web Development",
        desc: "Next.js, React, dan Tailwind CSS untuk website yang cepat dan responsif.",
    },
    {
        icon: "ri-smartphone-line",
        title: "Mobile App",
        desc: "Aplikasi cross-platform dengan React Native (Expo).",
    },
    {
        icon: "ri-cpu-line",
        title: "Embedded & IoT",
        desc: "Arduino dan ESP32 untuk prototype elektronik dan otomasi.",
    },
];

export default function AboutSection({ onNavigate }: Partial<SectionProps>) {
    return (
        <section
            className={cn(
                "flex h-full flex-col gap-6 pb-10 group overflow-y-auto pr-2",
                "[&::-webkit-scrollbar]:w-1",
                "[&::-webkit-scrollbar-track]:bg-transparent",
                "[&::-webkit-scrollbar-thumb]:bg-primary",
                "[&::-webkit-scrollbar-thumb]:rounded-full",
                "[&:hover::-webkit-scrollbar-thumb]:bg-primary",
            )}
        >
            <div className="flex flex-col gap-3">
                <h2 className="text-4xl font-bold">Halo, saya Firyan</h2>
                <p className="max-w-xl text-foreground/80">
                    Saya seorang Software Engineer yang antusias dengan dunia
                    teknologi. Senang mempelajari hal baru, mengeksplorasi
                    teknologi, dan mengembangkan ide menjadi karya digital yang
                    bermanfaat.
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <h2 className="text-lg font-semibold">Fokus saya</h2>
                <ul className="grid gap-3 sm:grid-cols-3">
                    {focusAreas.map((area) => (
                        <li
                            key={area.title}
                            className="flex flex-col gap-2 rounded-xl border border-border/50 p-4"
                        >
                            <i
                                className={`${area.icon} ri-xl text-accent`}
                                aria-hidden="true"
                            ></i>
                            <h3 className="font-semibold">{area.title}</h3>
                            <p className="text-sm text-foreground/70">
                                {area.desc}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>

            <p className="text-sm text-foreground/70">
                Sejauh ini sudah {dataProjects.length} proyek yang saya
                selesaikan, dari website sampai aplikasi desktop berbasis
                mikrokontroler.
            </p>

            {onNavigate && (
                <div className="flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={() => onNavigate("skills")}
                        className="rounded-lg bg-primary px-5 py-2.5 font-medium text-white transition hover:opacity-90"
                    >
                        Lihat Skills
                    </button>
                    <button
                        type="button"
                        onClick={() => onNavigate("contact")}
                        className="rounded-lg border border-border px-5 py-2.5 font-medium transition hover:bg-accent hover:text-white"
                    >
                        Hubungi Saya
                    </button>
                </div>
            )}
        </section>
    );
}
