"use client";

import { useEffect, useRef } from "react";

export function useScrollingIndicator<T extends HTMLElement>(delay = 800) {
    const ref = useRef<T>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let timeout: ReturnType<typeof setTimeout>;

        const onScroll = () => {
            el.dataset.scrolling = "true";
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                el.dataset.scrolling = "false";
            }, delay);
        };

        el.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            el.removeEventListener("scroll", onScroll);
            clearTimeout(timeout);
        };
    }, [delay]);

    return ref;
}
