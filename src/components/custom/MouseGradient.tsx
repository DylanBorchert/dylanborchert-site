"use client"
import { useEffect, useRef } from "react";

export default function MouseGradient() {
    const targetRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const updateMousePosition = (ev: MouseEvent) => {
            if (!targetRef.current) return;
            const { clientX, clientY } = ev;
            targetRef.current.style.setProperty("--x", `${clientX}px`);
            targetRef.current.style.setProperty("--y", `${clientY}px`);
        };

        window.addEventListener("mousemove", updateMousePosition);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        };
    }, []);

    return <div
        ref={targetRef}
        className="absolute before:pointer-events-none before:fixed before:inset-0 before:z-5 before:opacity-15 md:before:bg-[radial-gradient(circle_400px_at_var(--x,100px)_var(--y,100px),hsl(var(--palette-darkMuted))_0%,transparent_100%)] "
    ></div>
}
