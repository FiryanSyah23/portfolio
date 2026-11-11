import { TechStack } from "@/types/types";

const dataSkills: TechStack[] = [
    // FRONTEND (fokus utama)
    {
        category: "Frontend",
        icon: "ri-layout-line",
        items: [
            {
                name: "JavaScript",
                logo: "/logo/javascript.png",
                description:
                    "Membangun interaksi dan logika website: DOM, async/await, dan array methods.",
                startDate: "2024-12-01",
            },
            {
                name: "TypeScript",
                logo: "/logo/ts.png",
                description:
                    "Menulis kode yang lebih aman dan mudah dirawat dengan static typing.",
                startDate: "2026-03-01",
            },
            {
                name: "React",
                logo: "/logo/react.png",
                description:
                    "Membangun UI berbasis komponen reusable dengan hooks.",
                startDate: "2026-03-01",
            },
            {
                name: "Next.js",
                logo: "/logo/nextjs.png",
                description:
                    "Membangun aplikasi web dengan routing, SSR/SSG, dan optimasi performa.",
                startDate: "2026-04-11",
            },
            {
                name: "Tailwind CSS",
                logo: "/logo/tailwind.png",
                description:
                    "Membuat tampilan responsif dengan pendekatan utility-first.",
                startDate: "2026-04-11",
            },
        ],
    },

    // BACKEND (pendukung frontend)
    {
        category: "Backend",
        icon: "ri-server-line",
        items: [
            {
                name: "Node.js",
                logo: "/logo/nodejs.png",
                description:
                    "Menjalankan JavaScript di sisi server untuk membangun backend.",
                startDate: "2025-12-25",
            },
            {
                name: "Express.js",
                logo: "/logo/express.png",
                description:
                    "Membangun REST API sederhana untuk dikonsumsi frontend.",
                startDate: "2026-01-11",
            },
            {
                name: "Supabase",
                logo: "/logo/supabase.png",
                description:
                    "Memakai PostgreSQL, auth, storage, dan realtime sebagai backend cepat.",
                startDate: "2026-08-21",
            },
        ],
    },

    // DEPLOYMENT & CLOUD
    {
        category: "Deployment & Cloud",
        icon: "ri-cloud-line",
        items: [
            {
                name: "Vercel",
                logo: "/logo/vercel.png",
                description: "Deploy dan hosting aplikasi web modern.",
                startDate: "2026-03-01",
            },
            {
                name: "Cloudinary",
                logo: "/logo/cloudinary.png",
                description: "Menyimpan dan mengoptimalkan gambar serta media.",
                startDate: "2026-07-01",
            },
            {
                name: "Cloudflare",
                logo: "/logo/cloudflare.png",
                description: "Mengelola DNS dan keamanan dasar website.",
                startDate: "2026-07-01",
            },
            {
                name: "AWS",
                logo: "/logo/aws.png",
                description:
                    "Mempelajari layanan cloud dasar untuk infrastruktur aplikasi.",
                startDate: "2026-07-20",
            },
            {
                name: "Google Cloud",
                logo: "/logo/gcp.png",
                description:
                    "Mempelajari layanan cloud dasar untuk hosting aplikasi.",
                startDate: "2026-06-01",
            },
        ],
    },

    // DATABASE
    {
        category: "Database Management",
        icon: "ri-database-2-line",
        items: [
            {
                name: "MySQL",
                logo: "/logo/mysql.png",
                description:
                    "Mengelola data aplikasi dengan database relasional dan query SQL.",
                startDate: "2025-08-26",
            },
            {
                name: "MongoDB",
                logo: "/logo/mongodb.png",
                description:
                    "Mengelola data dengan database NoSQL berbasis dokumen.",
                startDate: "2026-04-10",
            },
            {
                name: "SQLite",
                logo: "/logo/sqlite.png",
                description:
                    "Database ringan untuk aplikasi mobile dan embedded.",
                startDate: "2026-05-25",
            },
        ],
    },

    {
        category: "Embedded Systems & IoT",
        icon: "ri-cpu-line",
        items: [
            {
                name: "Arduino",
                logo: "/logo/arduino.png",
                description:
                    "Memprogram mikrokontroler untuk prototipe elektronik dan otomasi.",
                startDate: "2024-12-01",
            },
            {
                name: "ESP32",
                logo: "/logo/esp32.png",
                description:
                    "Mengembangkan perangkat IoT dengan Wi-Fi dan Bluetooth, dipakai di project digital twin.",
                startDate: "2025-02-01",
            },
            {
                name: "C/C++",
                logo: "/logo/cpp.png",
                description:
                    "Menulis program untuk mikrokontroler dan sistem embedded.",
                startDate: "2024-12-01",
            },
            {
                name: "Python",
                logo: "/logo/python.png",
                description:
                    "Membuat skrip otomasi dan eksperimen dasar untuk data dan AI.",
                startDate: "2026-01-01",
            },
        ],
    },

    // MOBILE (tambahan, bukan fokus utama)
    {
        category: "Mobile Development",
        icon: "ri-smartphone-line",
        items: [
            {
                name: "React Native",
                logo: "/logo/react.png",
                description:
                    "Mencoba membangun aplikasi mobile cross-platform dengan skill React.",
                startDate: "2026-04-11",
            },
            {
                name: "Expo",
                logo: "/logo/expo.png",
                description:
                    "Workflow development dan build aplikasi React Native.",
                startDate: "2026-04-11",
            },
        ],
    },

    // DEVELOPMENT TOOLS
    {
        category: "Development Tools",
        icon: "ri-tools-line",
        items: [
            {
                name: "Git",
                logo: "/logo/git.png",
                description:
                    "Mengelola versi kode dan melacak perubahan dalam proyek.",
                startDate: "2025-12-01",
            },
            {
                name: "GitHub",
                logo: "/logo/github.png",
                description:
                    "Menyimpan repositori dan berlatih alur kolaborasi (branch dan pull request).",
                startDate: "2025-12-01",
            },
            {
                name: "Vite",
                logo: "/logo/vite.png",
                description:
                    "Menjalankan development server dan build aplikasi frontend.",
                startDate: "2026-03-25",
            },
            {
                name: "Postman",
                logo: "/logo/postman.svg",
                description: "Menguji dan mendokumentasikan REST API.",
                startDate: "2026-04-01",
            },
            {
                name: "Figma",
                logo: "/logo/figma.png",
                description:
                    "Membuat wireframe dan prototipe UI sebelum coding.",
                startDate: "2026-06-19",
            },
            {
                name: "WordPress",
                logo: "/logo/wordpress.png",
                description:
                    "Membangun website berbasis CMS dengan tema dan plugin untuk kebutuhan klien.",
                startDate: "2026-01-01",
            },
            {
                name: "Claude Code",
                logo: "/logo/claude.png",
                description:
                    "Asisten AI untuk mempercepat coding dan memahami codebase. Hasilnya selalu saya review dan pahami.",
                startDate: "2026-01-01",
            },
        ],
    },
];

export default dataSkills;
