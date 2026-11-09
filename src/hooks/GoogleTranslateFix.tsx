"use client";

import { useEffect } from "react";

export default function GoogleTranslateFix(): null {
    useEffect(() => {
        if (typeof Node === "function" && Node.prototype) {
            const originalRemoveChild = Node.prototype.removeChild;

            Node.prototype.removeChild = function <T extends Node>(
                child: T,
            ): T {
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

            const originalInsertBefore = Node.prototype.insertBefore;

            Node.prototype.insertBefore = function <T extends Node>(
                newNode: T,
                referenceNode: Node | null,
            ): T {
                if (referenceNode && referenceNode.parentNode !== this) {
                    if (process.env.NODE_ENV !== "production") {
                        console.warn(
                            "[GoogleTranslateFix] Skipped insertBefore, reference node detached",
                            referenceNode,
                        );
                    }

                    return newNode;
                }

                return originalInsertBefore.call(
                    this,
                    newNode,
                    referenceNode,
                ) as T;
            };
        }
    }, []);

    return null;
}
