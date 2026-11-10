import TechSection from "@/components/section/TechSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Skills & Teknologi",
    description:
        "Teknologi yang dipakai Firyan Syah: Next.js, React, TypeScript, React Native, Node.js, MongoDB, dan lainnya.",
    alternates: { canonical: "/skills" },
};

export default function SkillsPage() {
    return <TechSection />;
}
