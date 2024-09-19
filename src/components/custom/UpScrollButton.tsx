"use client";

import Image from "next/image";
import { useScrollDirection } from 'react-use-scroll-direction';
import { useState, useEffect } from "react";
import classNames from "classnames";
import UpArrow from "#/images/up-arrow.png";

export default function UpScrollButton() {
    const { isScrollingUp } = useScrollDirection();
    const [showButton, setShowButton] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    function scrollToTop() {
        const scrollOptions = {
            left: 0,
            top: 0,
            behavior: 'smooth'
        };
        window.scrollTo(scrollOptions as any);
    }

    useEffect(() => {
        const isNearTop = window.scrollY < window.outerHeight / 4;
        if (isNearTop) {
            setShowButton(false);
        } else if (isScrollingUp) {
            setShowButton(true);
            if (timeoutId) clearTimeout(timeoutId);
            const newTimeoutId = setTimeout(() => {
                setShowButton(false);
            }, 5000);
            setTimeoutId(newTimeoutId);
        }
    }, [isScrollingUp]);

    return (
        <div
            className={classNames(
                "fixed right-5 bottom-5 mix-blend-difference z-50 cursor-pointer transition-opacity duration-500",
                {
                    "opacity-0 pointer-events-none": !showButton, // Disable clicks when hidden
                    "opacity-100 pointer-events-auto": showButton // Enable clicks when visible
                }
            )}
            onClick={scrollToTop}
        >
            <Image src={UpArrow} width={25} height={25} alt="Up Arrow" />
        </div>
    );
}
