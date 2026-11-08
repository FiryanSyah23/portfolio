import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "remixicon/fonts/remixicon.css";

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "Firyan Syah - Portfolio",
    description:
        "Firyan Syah Portfolio Website for showcasing my skills and projects as a web developer. 2 years of experience in software engineering and web development.",
    icons: "/Octasym.png",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="id" className={`${poppins.variable} h-full antialiased`}>
            <body className="min-h-full flex flex-col max-lg:px-2">{children}</body>
        </html>
    );
}
