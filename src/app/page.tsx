import Homepage from "@/components/Homepage";
import { Suspense } from "react";

export default function Home() {
    return (
        <div className="flex min-h-dvh items-center justify-center ">
            <Suspense fallback={null}>
                <Homepage />
            </Suspense>
        </div>
    );
}
