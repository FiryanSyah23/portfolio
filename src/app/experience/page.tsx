import ExperienceSection from "@/components/section/ExperienceSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pengalaman Kerja",
    description:
        "Firyan Syah, web developer di Banda Aceh yang fokus pada Next.js, React Native, dan IoT.",
    alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
    return <ExperienceSection />;
}
