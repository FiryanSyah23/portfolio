export default function BootLoader() {
    return (
        <div
            role="status"
            aria-label="Memuat halaman"
            className="fixed inset-0 z-50 flex items-center justify-center bg-background-dark"
        >
            <span className="size-36 animate-spin rounded-full border-4 border-border/40 border-t-primary" />
        </div>
    );
}
