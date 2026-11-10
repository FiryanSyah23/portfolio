import PortfolioSection from "@/components/section/PortfolioSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Proyek Pengembangan",
    description:
        "Firyan Syah, web developer di Banda Aceh yang fokus pada Next.js, React Native, dan IoT.",
    alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
    return <PortfolioSection />;
}
