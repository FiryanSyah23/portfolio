import ExperienceSection from "@/components/section/ExperienceSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pengalaman Kerja",
    description:
        "Perjalanan pengalaman firyan syah dalam bidang software engineer",
    alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
    return <ExperienceSection />;
}
