import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "remixicon/fonts/remixicon.css";
import GoogleTranslateFix from "@/hooks/GoogleTranslateFix";

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://firyansyah.my.id"),
    alternates: {
        canonical: "https://firyansyah.my.id",
    },
    title: {
        default: "Firyan Syah | Software Engineer",
        template: "%s | Firyan Syah",
    },
    description:
        "Hai, saya Firyan Syah, seorang Software Engineer yang bersemangat mengubah ide menjadi produk web dunia nyata dengan desain responsif dan minimalis.",
    verification: {
        google: "utjBbNej2Vn1MxRg-clp2_AJ2V1p790MeqixN6hcu7o",
    },
    manifest: "/manifest.json",
    keywords: [
        "Firyan Syah",
        "firyansyah",
        "Software Engineer",
        "Web Developer",
        "Freelance Web Developer",
        "Next.js Developer",
        "Full-Stack Developer ",
        "Firyan Syah Developer",
        "Fisoctasym",
        "Custom Website Development ",
        "Professional Web Developer ",
    ],
    icons: {
        icon: [
            { url: "/icon.svg", sizes: "1000x1000", type: "image/svg+xml" },
            { url: "/icon.png", sizes: "96x96", type: "image/png" },
        ],
        apple: "/apple-icon.png",
    },
    authors: [{ name: "Firyan Syah" }],
    openGraph: {
        type: "website",
        url: "https://firyansyah.my.id",
        siteName: "Firyan Syah Portfolio",
        title: "Firyan Syah | Software Engineer",
        description:
            "Hai, saya Firyan Syah, seorang Software Engineer yang bersemangat mengubah ide menjadi produk web dunia nyata dengan desain responsif dan minimalis",
        images: [{ url: "/icon.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Firyan Syah | Software Engineer",
        description:
            "Hai, saya Firyan Syah, seorang Software Engineer yang bersemangat mengubah ide menjadi produk web dunia nyata dengan desain responsif dan minimalis",
        images: ["/icon.png"],
    },
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#090040",
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Firyan Syah",
    jobTitle: "Software Engineer",
    url: "https://firyansyah.my.id",
    image: "https://firyansyah.my.id/profile.png",
    sameAs: [
        "https://github.com/FiryanSyah23",
        "https://linkedin.com/in/firyansyah",
    ],
    address: {
        "@type": "PostalAddress",
        addressLocality: "Banda Aceh",
        addressCountry: "ID",
    },
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
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <GoogleTranslateFix />
                {children}
            </body>
        </html>
    );
}
