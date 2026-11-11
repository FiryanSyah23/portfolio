// src/app/about/page.tsx
import type { Metadata } from "next";
import AboutSection from "@/components/section/AboutSection";

export const metadata: Metadata = {
    title: "Tentang Saya",
    description:
        "Mengenal Firyan Syah, web developer di Banda Aceh yang fokus pada Next.js, React Native, dan IoT.",
    alternates: { canonical: "/about" },
};

export default function AboutPage() {
    return <AboutSection />;
}
