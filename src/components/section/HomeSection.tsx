import dataProjects from "@/data/projects";
import { SectionProps } from "../../types/types";

export default function HomeSection({ onNavigate }: SectionProps) {
    const stats = [
        { label: "Proyek Selesai", value: dataProjects.length },
        { label: "Pengalaman", value: "2+ Tahun" },
    ];

    return (
        <section className="flex flex-col gap-6 py-16">
            <span className="w-fit rounded-full bg-accent px-3 py-1 text-sm text-white">
                Tersedia untuk proyek freelance
            </span>

            <h1 className="text-4xl font-bold sm:text-5xl">
                Halo, saya Firyan
            </h1>

            <p className="max-w-xl text-foreground/80">
                Seorang Software Engineer yang hoby membangun website dan
                aplikasi. Saya berfokus pada pengembangan yang fungsional,
                tampilan yang menarik, dan pengalaman pengguna yang nyaman.
            </p>

            <div className="flex flex-wrap gap-3">
                <button
                    type="button"
                    onClick={() => onNavigate("projects")}
                    className="rounded-lg bg-primary px-5 py-2.5 font-medium text-white transition hover:bg-accent duration-300"
                >
                    Lihat Proyek
                </button>
                <button
                    type="button"
                    onClick={() => onNavigate("contact")}
                    className="rounded-lg border border-border px-5 py-2.5 font-medium transition hover:bg-accent hover:text-white duration-300"
                >
                    Hubungi Saya
                </button>
            </div>

            <dl className="flex gap-8 pt-4">
                {stats.map((stat) => (
                    <div key={stat.label}>
                        <dt className="text-sm text-foreground/60">
                            {stat.label}
                        </dt>
                        <dd className="text-xl font-bold">{stat.value}</dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}
