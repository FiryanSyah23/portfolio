// src/components/Fireflies.tsx
"use client";

import { useEffect, useRef } from "react";

type Firefly = {
    x: number;
    y: number;
    angle: number;
    turnVel: number;
    baseSpeed: number;
    speedPhase: number;
    speedFreq: number;
    radius: number;
    pulsePhase: number;
    pulseFreq: number;
};

const WANDER = 1; // makin besar, makin liar belokannya
const DAMPING = 1.5; // makin besar, makin cepat belokan mereda (lebih lurus)
const MARGIN = 40; // area di luar layar sebelum "teleport" ke sisi lain
const MAX_COUNT = 40;
const AREA_PER_FLY = 45000; // 1 kunang-kunang per sekian px², layar kecil = lebih sedikit

const rand = (min: number, max: number) => min + Math.random() * (max - min);

const makeFly = (w: number, h: number): Firefly => ({
    x: rand(0, w),
    y: rand(0, h),
    angle: rand(0, Math.PI * 2),
    turnVel: 0,
    baseSpeed: rand(18, 45), // px per detik
    speedPhase: rand(0, Math.PI * 2),
    speedFreq: rand(0.2, 0.6),
    radius: rand(1.5, 3),
    pulsePhase: rand(0, Math.PI * 2),
    pulseFreq: rand(0.8, 2), // kedip tiap kunang-kunang berbeda ritme
});

export default function Fireflies() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Hormati pengguna yang mematikan animasi di sistem operasinya
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let w = 0;
        let h = 0;
        let raf = 0;
        let last = performance.now();
        const flies: Firefly[] = [];

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // tajam di layar retina

            const count = Math.min(
                MAX_COUNT,
                Math.round((w * h) / AREA_PER_FLY),
            );
            while (flies.length < count) flies.push(makeFly(w, h));
            flies.length = count;
        };

        const frame = (now: number) => {
            // dibatasi 50ms supaya tidak "loncat" setelah pindah tab
            const dt = Math.min(Math.max((now - last) / 1000, 0), 0.05);
            last = now;
            const t = now / 1000;

            const dark = document.documentElement.dataset.theme === "dark";
            const core = dark ? "255, 240, 160" : "228, 168, 39";
            const glow = dark ? "255, 196, 40" : "184, 134, 11";
            const maxAlpha = dark ? 1 : 0.75;

            ctx.clearRect(0, 0, w, h);
            // "lighter" = cahaya saling menambah, bagus di latar gelap
            ctx.globalCompositeOperation = dark ? "lighter" : "source-over";

            for (const f of flies) {
                // 1) acak kecepatan belok (sqrt(dt) agar hasilnya sama di semua FPS)
                f.turnVel += (Math.random() - 0.5) * 2 * WANDER * Math.sqrt(dt);
                // 2) peredam: belokan perlahan mereda, tidak berputar-putar terus
                f.turnVel *= Math.exp(-DAMPING * dt);
                // 3) arah berubah dari kecepatan belok, bukan diacak langsung
                f.angle += f.turnVel * dt;

                // kecepatan naik-turun pelan, kadang melayang, kadang meluncur
                const speed =
                    f.baseSpeed *
                    (0.6 + 0.4 * Math.sin(t * f.speedFreq + f.speedPhase));
                f.x += Math.cos(f.angle) * speed * dt;
                f.y += Math.sin(f.angle) * speed * dt;

                // keluar layar -> muncul di sisi seberang (di luar pandangan, jadi tak terlihat loncat)
                if (f.x < -MARGIN) f.x = w + MARGIN;
                else if (f.x > w + MARGIN) f.x = -MARGIN;
                if (f.y < -MARGIN) f.y = h + MARGIN;
                else if (f.y > h + MARGIN) f.y = -MARGIN;

                // kedip: sinus dikuadratkan agar terang sebentar, redup lebih lama
                const pulse =
                    (Math.sin(t * f.pulseFreq + f.pulsePhase) + 1) / 2;
                const alpha = (0.15 + 0.85 * pulse * pulse) * maxAlpha;

                const glowR = f.radius * 3; // buat ubah ukuran
                const g = ctx.createRadialGradient(
                    f.x,
                    f.y,
                    0,
                    f.x,
                    f.y,
                    glowR,
                );
                g.addColorStop(0, `rgba(${core}, ${alpha})`);
                g.addColorStop(0.2, `rgba(${glow}, ${alpha * 0.5})`);
                g.addColorStop(1, `rgba(${glow}, 0)`);

                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(f.x, f.y, glowR, 0, Math.PI * 2);
                ctx.fill();
            }

            raf = requestAnimationFrame(frame);
        };

        resize();
        window.addEventListener("resize", resize);
        raf = requestAnimationFrame(frame);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
        />
    );
}
