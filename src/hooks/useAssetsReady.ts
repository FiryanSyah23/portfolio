"use client";

import { useEffect, useState } from "react";

// Jaring pengaman kalau ada koneksi yang benar-benar menggantung.
// Bukan durasi intro, hanya mencegah macet selamanya.
const SAFETY_TIMEOUT_MS = 15000;

function preloadImage(src: string) {
    return new Promise<void>((resolve) => {
        const img = new window.Image();
        img.onload = () => resolve();
        img.onerror = () => resolve(); // gagal tetap dihitung selesai
        img.src = src;
    });
}

function waitFonts() {
    if (!("fonts" in document)) return Promise.resolve();
    return Promise.all([
        document.fonts.ready,
        document.fonts.load("1em remixicon"), // font ikon bubble menu
    ])
        .then(() => undefined)
        .catch(() => undefined);
}

function waitWindowLoad() {
    return new Promise<void>((resolve) => {
        if (document.readyState === "complete") resolve();
        else window.addEventListener("load", () => resolve(), { once: true });
    });
}

export function useAssetsReady(imageUrls: string[]) {
    const total = imageUrls.length + 2; // gambar + font + window load
    const [done, setDone] = useState(0);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let cancelled = false;
        let finished = 0;

        const track = (p: Promise<void>) =>
            p.then(() => {
                if (cancelled) return;
                finished += 1;
                setDone(finished);
                if (finished >= total) setReady(true);
            });

        imageUrls.forEach((src) => track(preloadImage(src)));
        track(waitFonts());
        track(waitWindowLoad());

        const safety = setTimeout(() => {
            if (!cancelled) setReady(true);
        }, SAFETY_TIMEOUT_MS);

        return () => {
            cancelled = true;
            clearTimeout(safety);
        };
    }, [imageUrls, total]);

    return { ready, done, total };
}
