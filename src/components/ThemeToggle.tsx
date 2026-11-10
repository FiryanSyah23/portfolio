"use client";

export default function ThemeToggle() {
    function toggle() {
        const root = document.documentElement;
        const next = root.dataset.theme === "dark" ? "light" : "dark";
        root.dataset.theme = next;
        localStorage.setItem("theme", next);
    }

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label="Ganti tema"
            className="pointer-events-auto flex size-10 items-center justify-center text-support transition-colors duration-300 hover:text-accent"
        >
            <i className="ri-moon-line ri-lg dark:hidden" aria-hidden="true" />
            <i
                className="ri-sun-line ri-lg hidden dark:inline"
                aria-hidden="true"
            />
        </button>
    );
}
