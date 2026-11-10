"use client";

import { useEffect } from "react";

// Flag di level modul: patch hanya dipasang sekali,
// walaupun efek jalan dua kali (Strict Mode) atau komponen mount ulang.
let patched = false;

function patchDom() {
    if (patched || typeof Node !== "function" || !Node.prototype) return;
    patched = true;

    const originalRemoveChild = Node.prototype.removeChild;
    const originalInsertBefore = Node.prototype.insertBefore;

    Node.prototype.removeChild = function <T extends Node>(child: T): T {
        if (child.parentNode !== this) {
            if (process.env.NODE_ENV !== "production") {
                console.warn(
                    "[GoogleTranslateFix] Skipped removeChild on detached node",
                    child,
                );
            }
            return child;
        }
        return originalRemoveChild.call(this, child) as T;
    };

    Node.prototype.insertBefore = function <T extends Node>(
        newNode: T,
        referenceNode: Node | null,
    ): T {
        if (referenceNode && referenceNode.parentNode !== this) {
            if (process.env.NODE_ENV !== "production") {
                console.warn(
                    "[GoogleTranslateFix] Reference node detached, appending instead",
                    referenceNode,
                );
            }
            // Tetap masukkan elemen baru (di akhir), jangan dibuang diam-diam
            return originalInsertBefore.call(this, newNode, null) as T;
        }
        return originalInsertBefore.call(this, newNode, referenceNode) as T;
    };
}

export default function GoogleTranslateFix(): null {
    useEffect(() => {
        patchDom();
    }, []);

    return null;
}
