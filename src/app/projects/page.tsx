import PortfolioSection from "@/components/section/PortfolioSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Proyek Pengembangan",
    description:
        "Kumpulan proyek website, aplikasi kasir (POS), dan IoT karya Firyan Syah: dari website desa sampai aplikasi mobile offline.",
    alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
    return <PortfolioSection />;
}
