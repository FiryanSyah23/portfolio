import HomeSection from "@/components/section/HomeSection";
import dataProjects from "@/data/projects";

export default function Home() {
    return (
        <>
            <section className="sr-only">
                <h1>Firyan Syah, Web Developer di Banda Aceh</h1>
                <p>
                    Jasa pembuatan website company profile, portofolio, dan
                    undangan digital dengan Next.js. Tersedia untuk proyek
                    freelance.
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
            <HomeSection />
        </>
    );
}
