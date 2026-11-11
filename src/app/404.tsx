import Link from "next/link";

export default function NotFound() {
    return (
        <section className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-5xl font-bold text-accent">404</h1>
            <p className="text-foreground/70">
                Halaman yang kamu cari tidak ditemukan.
            </p>
            <Link
                href="/projects"
                scroll={false}
                className="rounded-lg bg-primary px-5 py-2.5 font-medium text-white transition-colors duration-300 hover:bg-accent"
            >
                Lihat Semua Proyek
            </Link>
        </section>
    );
}
