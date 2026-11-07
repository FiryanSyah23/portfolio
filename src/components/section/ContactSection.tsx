"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SectionProps } from "@/types/types";

const WA_NUMBER = "6285135886173";
const EMAIL = "firyansyah22@gmail.com";

const contacts = [
    {
        icon: "ri-mail-line",
        label: "Email",
        value: EMAIL,
        href: `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent("Halo, saya ingin berdiskusi")}`,
    },
    {
        icon: "ri-whatsapp-line",
        label: "WhatsApp",
        value: "Firyan Syah",
        href: `https://wa.me/${WA_NUMBER}`,
    },
    {
        icon: "ri-github-line",
        label: "GitHub",
        value: "firyansyah23",
        href: "https://github.com/firyansyah23",
    },
    {
        icon: "ri-linkedin-box-line",
        label: "LinkedIn",
        value: "Firyan Syah",
        href: "https://www.linkedin.com/in/firyansyah",
    },
];

const fieldClass = cn(
    "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm",
    "placeholder:text-foreground/40 caret-accent outline-none",
    "focus:border-primary focus:ring-2 focus:ring-primary/30",
);

const NAME_MIN = 2;
const NAME_MAX = 40;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 500;

const NAME_DISALLOWED = /[^\p{L}\s.'-]/gu;
const MESSAGE_DISALLOWED = /[^\p{L}\p{N}\s.,!?@()\-:;'"%+&/]/gu;
const LINK_PATTERN = /(https?:\/\/|www\.)/i;

function sanitizeName(value: string) {
    return value
        .replace(NAME_DISALLOWED, "")
        .replace(/\s+/g, " ")
        .trimStart()
        .slice(0, NAME_MAX);
}

function sanitizeMessage(value: string) {
    return value
        .replace(/\r\n?/g, "\n") // samakan jenis baris baru
        .replace(MESSAGE_DISALLOWED, "")
        .replace(/[^\S\n]+/g, " ") // rapatkan spasi/tab berlebih
        .replace(/\n{3,}/g, "\n\n") // maksimal 1 baris kosong
        .slice(0, MESSAGE_MAX);
}

function validate(name: string, message: string): string | null {
    if (name.trim().length < NAME_MIN) {
        return `Nama minimal ${NAME_MIN} huruf.`;
    }
    if (message.trim().length < MESSAGE_MIN) {
        return `Pesan minimal ${MESSAGE_MIN} karakter.`;
    }
    if (LINK_PATTERN.test(message)) {
        return "Pesan tidak boleh berisi link.";
    }
    return null;
}

export default function ContactSection({ close }: Partial<SectionProps>) {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    const [error, setError] = useState<string | null>(null);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const validationError = validate(name, message);
        if (validationError) {
            setError(validationError);
            return;
        }

        setError(null);
        const text = `Halo, saya ${name.trim()}.\n\n${message.trim()}`;
        const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

        window.open(url, "_blank", "noopener,noreferrer");
    }

    return (
        <section
            className={cn(
                "flex h-full flex-col gap-6 overflow-y-auto pb-10 pr-2",
                "[&::-webkit-scrollbar]:w-1",
                "[&::-webkit-scrollbar-track]:bg-transparent",
                "[&::-webkit-scrollbar-thumb]:bg-primary",
                "[&::-webkit-scrollbar-thumb]:rounded-full",
            )}
        >
            <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold">
                    Punya ide atau proyek?{" "}
                    <span className="text-accent">Yuk ngobrol</span>
                </h2>
                <p className="max-w-xl text-sm text-foreground/80">
                    Saya terbuka untuk proyek freelance, kolaborasi, maupun
                    sekadar diskusi soal teknologi. Pilih kanal yang paling
                    nyaman buatmu, biasanya saya balas dalam 1x12 jam.
                </p>
            </div>

            <div
                className={cn(
                    "grid gap-6",
                    close ? "grid-cols-2" : "grid-cols-1",
                )}
            >
                {/* Daftar kontak */}
                <ul className="grid grid-cols-1 content-start gap-3">
                    {contacts.map((item) => (
                        <li key={item.label}>
                            <a
                                href={item.href}
                                target={
                                    item.href.startsWith("mailto:")
                                        ? undefined
                                        : "_blank"
                                }
                                rel="noopener noreferrer"
                                className={cn(
                                    "group flex items-center gap-3 rounded-xl border border-border/50 p-3 duration-300",
                                    "hover:border-accent hover:bg-primary/10",
                                )}
                            >
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-white duration-300 group-hover:bg-accent">
                                    <i
                                        className={cn(item.icon, "ri-lg")}
                                        aria-hidden="true"
                                    ></i>
                                </span>
                                <span className="flex min-w-0 flex-col">
                                    <span className="text-xs text-foreground/60">
                                        {item.label}
                                    </span>
                                    <span className="truncate text-sm font-semibold">
                                        {item.value}
                                    </span>
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 rounded-xl border border-border/50 p-4"
                >
                    <h3 className="font-semibold">Kirim pesan langsung</h3>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="contact-name" className="text-xs">
                            Nama
                        </label>
                        <input
                            id="contact-name"
                            type="text"
                            required
                            maxLength={60}
                            autoComplete="name"
                            value={name}
                            onChange={(e) =>
                                setName(sanitizeName(e.target.value))
                            }
                            placeholder="Nama kamu"
                            className={fieldClass}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="contact-message" className="text-xs">
                            Pesan
                        </label>
                        <textarea
                            id="contact-message"
                            required
                            rows={4}
                            maxLength={500}
                            value={message}
                            onChange={(e) =>
                                setMessage(sanitizeMessage(e.target.value))
                            }
                            placeholder="Ceritakan singkat kebutuhan atau idemu"
                            className={cn(fieldClass, "resize-none")}
                        />
                    </div>

                    <p className="text-right text-xs text-foreground/50">
                        {message.length}/{MESSAGE_MAX}
                    </p>

                    {error && (
                        <p role="alert" className="text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-medium text-white duration-300 hover:bg-accent"
                    >
                        <i className="ri-whatsapp-line" aria-hidden="true"></i>
                        Kirim lewat WhatsApp
                    </button>
                </form>
            </div>
        </section>
    );
}
