import ContactSection from "@/components/section/ContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kontak",
    description:
        "Hubungi Firyan Syah untuk proyek freelance website, aplikasi mobile, atau kolaborasi.",
    alternates: { canonical: "/contact" },
};

export default function ContactPage() {
    return <ContactSection />;
}
