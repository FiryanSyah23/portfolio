import { TechStack } from "@/types/types";

const dataSkills: TechStack[] = [
    // FRONTEND
    {
        category: "Frontend",
        icon: "ri-layout-line",
        items: [
            {
                name: "JavaScript",
                logo: "/logo/javascript.png",
                description:
                    "Mengembangkan interaksi dan fungsionalitas website.",
                startDate: "2024-12-01",
            },
            {
                name: "TypeScript",
                logo: "/logo/ts.png",
                description:
                    "Menulis kode JavaScript yang lebih aman dan mudah dirawat dengan static typing.",
                startDate: "2026-03-01", // ganti dengan tanggal kamu mulai pakai TypeScript
            },
            {
                name: "React",
                logo: "/logo/react.png",
                description:
                    "Membangun antarmuka web menggunakan komponen yang reusable.",
                startDate: "2026-03-01",
            },
            {
                name: "Next.js",
                logo: "/logo/nextJS.png",
                description:
                    "Mengembangkan aplikasi web dengan routing, rendering, dan optimasi performa.",
                startDate: "2026-04-11",
            },
            {
                name: "Vue.js",
                logo: "/logo/vue.png",
                description:
                    "Membangun antarmuka web interaktif menggunakan Vue ecosystem.",
                startDate: "2026-01-01",
            },
            {
                name: "Tailwind CSS",
                logo: "/logo/tailwind.png",
                description:
                    "Membangun desain antarmuka responsif menggunakan utility-first CSS.",
                startDate: "2026-04-11",
            },
        ],
    },

    // BACKEND
    {
        category: "Backend",
        icon: "ri-server-line",
        items: [
            {
                name: "Node.js",
                logo: "/logo/Nodejs.png",
                description:
                    "Menjalankan JavaScript di sisi server untuk membangun aplikasi backend.",
                startDate: "2025-12-25",
            },
            {
                name: "Express.js",
                logo: "/logo/express.png",
                description:
                    "Membangun REST API dan layanan backend menggunakan Node.js.",
                startDate: "2026-01-11",
            },
            {
                name: "Laravel",
                logo: "/logo/laravel.png",
                description:
                    "Mengembangkan aplikasi web backend menggunakan framework PHP.",
                startDate: "2026-02-01",
            },
        ],
    },

    // MOBILE
    {
        category: "Mobile Development",
        icon: "ri-smartphone-line",
        items: [
            {
                name: "React Native",
                logo: "/logo/react.png",
                description:
                    "Membangun aplikasi mobile cross-platform untuk Android dan iOS.",
                startDate: "2026-04-11",
            },
            {
                name: "Expo",
                logo: "/logo/expo.png",
                description:
                    "Mengembangkan dan membangun aplikasi React Native dengan workflow Expo.",
                startDate: "2026-04-11",
            },
        ],
    },

    // EMBEDDED SYSTEMS
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
                    "Mengembangkan perangkat IoT dengan konektivitas Wi-Fi dan Bluetooth.",
                startDate: "2025-02-01",
            },
            {
                name: "C/C++",
                logo: "/logo/c++.png",
                description:
                    "Mengembangkan program untuk mikrokontroler dan sistem embedded.",
                startDate: "2024-12-01",
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
                    "Mengelola data aplikasi menggunakan database relasional SQL.",
                startDate: "2025-08-26",
            },
            {
                name: "MongoDB",
                logo: "/logo/monggoDB.png",
                description:
                    "Mengelola data menggunakan database NoSQL berbasis dokumen.",
                startDate: "2026-04-10",
            },
            {
                name: "SQLite",
                logo: "/logo/sqlite.png",
                description:
                    "Menggunakan database relasional ringan untuk aplikasi mobile dan embedded.",
                startDate: "2026-05-25",
            },
        ],
    },

    // CLOUD & DEPLOYMENT
    {
        category: "Cloud & Deployment",
        icon: "ri-cloud-line",
        items: [
            {
                name: "AWS",
                logo: "/logo/aws.png",
                description:
                    "Menggunakan layanan cloud untuk infrastruktur dan kebutuhan aplikasi.",
                startDate: "2026-07-20",
            },
            {
                name: "Google Cloud",
                logo: "/logo/gcp.png",
                description:
                    "Memanfaatkan layanan cloud untuk hosting dan pengembangan aplikasi.",
                startDate: "2026-06-01",
            },
            {
                name: "Cloudflare",
                logo: "/logo/cloudflare.png",
                description:
                    "Mengelola DNS, keamanan website, dan layanan jaringan edge.",
                startDate: "2026-07-01",
            },
            {
                name: "Vercel",
                logo: "/logo/vercel.png",
                description:
                    "Melakukan deployment dan hosting aplikasi web modern.",
                startDate: "2026-03-01",
            },
            {
                name: "Cloudinary",
                logo: "/logo/cloudinary.png",
                description:
                    "Menyimpan, mengelola, dan mengoptimalkan gambar serta media.",
                startDate: "2026-07-01",
            },
            {
                name: "Supabase",
                logo: "/logo/supabase.png",
                description:
                    "Menggunakan layanan backend seperti PostgreSQL, storage, dan realtime.",
                startDate: "2026-08-21",
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
                    "Menyimpan repositori kode dan berkolaborasi dalam pengembangan software.",
                startDate: "2025-12-01",
            },
            {
                name: "WordPress",
                logo: "/logo/wordpress.png",
                description:
                    "CMS untuk membangun, mengelola, dan mengembangkan website menggunakan tema dan plugin.",
                startDate: "2026-01-01",
            },
            {
                name: "Postman",
                logo: "/logo/postman.svg",
                description:
                    "Menguji, mengelola, dan mendokumentasikan REST API.",
                startDate: "2026-04-01",
            },
            {
                name: "Vite",
                logo: "/logo/vite.png",
                description:
                    "Menjalankan development server dan proses build aplikasi frontend.",
                startDate: "2026-03-25",
            },
            {
                name: "Figma",
                logo: "/logo/figma.png",
                description:
                    "Membuat desain UI/UX, wireframe, dan prototipe aplikasi.",
                startDate: "2026-06-19",
            },
            {
                name: "Claude Code",
                logo: "/logo/claude.png",
                description:
                    "Membantu proses coding, memahami codebase, dan menyelesaikan tugas pengembangan.",
                startDate: "2026-01-01",
            },
        ],
    },
];

export default dataSkills;
