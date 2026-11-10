"use client";

import { useState, useEffect } from "react";

export default function Typewriter({
    words = [],
    typingSpeed = 130,
    deletingSpeed = 40,
    pauseTime = 2000,
    className = "",
}: {
    words?: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseTime?: number;
    className?: string;
}) {
    const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (words.length === 0) return;

        const promiseDeleting = () => {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
        };

        const currentWord = words[wordIndex];
        let timeout: string | number | NodeJS.Timeout | undefined;

        if (!isDeleting && text.length < currentWord.length) {
            // masih ngetik karakter demi karakter
            timeout = setTimeout(() => {
                setText(currentWord.slice(0, text.length + 1));
            }, typingSpeed);
        } else if (!isDeleting && text.length === currentWord.length) {
            // kata udah lengkap, diem dulu sebelum hapus
            timeout = setTimeout(() => setIsDeleting(true), pauseTime);
        } else if (isDeleting && text.length > 0) {
            // proses hapus karakter
            timeout = setTimeout(() => {
                setText(currentWord.slice(0, text.length - 1));
            }, deletingSpeed);
        } else if (isDeleting && text.length === 0) {
            // udah kehapus semua, pindah ke kata selanjutnya (looping)
            promiseDeleting();
        }

        // cleanup, biar nggak ada timeout nyangkut kalau komponen unmount
        return () => clearTimeout(timeout);
    }, [
        text,
        isDeleting,
        wordIndex,
        words,
        typingSpeed,
        deletingSpeed,
        pauseTime,
    ]);

    return (
        <span className={className} translate="no">
            {text}
            <span className="inline-block w-2 h-[1em] bg-current ml-0.5 align-middle animate-[pulse_.5s_ease-in-out_infinite] " />
        </span>
    );
}
