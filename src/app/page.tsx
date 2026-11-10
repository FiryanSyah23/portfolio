import BootLoader from "@/components/BootLoader";
import Homepage from "@/components/Homepage";
import dataProjects from "@/data/projects";
import { Suspense } from "react";

export default function Home() {
    return (
        <div className="flex min-h-dvh items-center justify-center">
            <div className="pointer-events-none fixed -z-10 size-96 rounded-full bg-primary/20 blur-3xl top-10 -left-20" />
            <div className="pointer-events-none fixed -z-10 size-96 rounded-full bg-primary/20 blur-3xl -bottom-10 -right-20" />

            <section className="sr-only">
                <h1>Firyan Syah, Web Developer di Banda Aceh</h1>
                <p>
                    Jasa pembuatan website company profile, portofolio, dan
                    undangan digital dengan Next.js yang cepat dan responsif.
                    Tersedia untuk proyek freelance.
                </p>
                <h2>Proyek</h2>
                <ul>
                    {dataProjects.map((p) => (
                        <li key={p.slug}>
                            <strong>{p.title}</strong> ({p.category}):{" "}
                            {p.description}
                        </li>
                    ))}
                </ul>
            </section>

            <Suspense fallback={<BootLoader />}>
                <Homepage />
            </Suspense>
        </div>
    );
}
