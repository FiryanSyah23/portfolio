import Homepage from "@/components/Homepage";
import { Suspense } from "react";

export default function Home() {
    return (
        <div className="flex min-h-dvh items-center justify-center ">
            <div className="pointer-events-none fixed -z-10 size-96 rounded-full bg-primary/20 blur-3xl top-10 -left-20" />
            <div className="pointer-events-none fixed -z-10 size-96 rounded-full bg-primary/20 blur-3xl -bottom-10 -right-20" />

            <Suspense fallback={null}>
                <Homepage />
            </Suspense>
        </div>
    );
}
