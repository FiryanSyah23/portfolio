import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "remixicon/fonts/remixicon.css";
import GoogleTranslateFix from "@/hooks/GoogleTranslateFix";

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://firyansyah.my.id";
const SITE_NAME = "Firyan Syah Portfolio";
const TITLE = "Firyan Syah | Software Engineer";
const DESCRIPTION =
    "Firyan Syah, Web Developer di Banda Aceh. Jasa pembuatan website company profile, portofolio, dan undangan digital dengan Next.js yang cepat dan responsif.";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: TITLE,
        template: "%s | Firyan Syah",
    },
    description: DESCRIPTION,
    alternates: {
        canonical: "./", // mengikuti URL tiap halaman, bukan selalu homepage
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    verification: {
        google: "utjBbNej2Vn1MxRg-clp2_AJ2V1p790MeqixN6hcu7o",
    },
    keywords: [
        "Firyan Syah",
        "Firyansyah",
        "Fisoctasym",
        "Web Developer Banda Aceh",
        "Jasa Pembuatan Website Aceh",
        "Jasa Pembuatan Website Profesional",
        "Freelance Web Developer Indonesia",
        "Next.js Developer",
        "Full-Stack Developer",
        "Jasa Website Company Profile",
        "Jasa Undangan Digital",
    ],
    icons: {
        icon: [
            { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
            { url: "/icon.png", sizes: "96x96", type: "image/png" },
        ],
        apple: "/apple-icon.png",
    },
    authors: [{ name: "Firyan Syah", url: SITE_URL }],
    creator: "Firyan Syah",
    openGraph: {
        type: "website",
        url: SITE_URL,
        siteName: SITE_NAME,
        locale: "id_ID",
        title: TITLE,
        description: DESCRIPTION,
        images: [
            {
                url: "/page-homepage.png",
                width: 1200,
                height: 661,
                alt: "Firyan Syah - Web Developer & Software Engineer",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: TITLE,
        description: DESCRIPTION,
        images: ["/page-homepage.png"],
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#090040",
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: SITE_URL,
            name: SITE_NAME,
            inLanguage: "id-ID",
            publisher: { "@id": `${SITE_URL}/#person` },
        },
        {
            "@type": "Person",
            "@id": `${SITE_URL}/#person`,
            name: "Firyan Syah",
            alternateName: ["Firyansyah", "Fisoctasym"],
            jobTitle: "Web Developer & Software Engineer",
            description: DESCRIPTION,
            url: SITE_URL,
            image: `${SITE_URL}/profile.png`,
            knowsAbout: [
                "Next.js",
                "React",
                "TypeScript",
                "Tailwind CSS",
                "MongoDB",
                "Web Development",
            ],
            sameAs: [
                "https://github.com/FiryanSyah23",
                "https://linkedin.com/in/firyansyah",
            ],
            address: {
                "@type": "PostalAddress",
                addressLocality: "Banda Aceh",
                addressRegion: "Aceh",
                addressCountry: "ID",
            },
        },
    ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="id"
            data-scroll-behavior="smooth"
            className={`${poppins.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col max-lg:px-2">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
                    }}
                />
                <GoogleTranslateFix />
                {children}
            </body>
        </html>
    );
}
