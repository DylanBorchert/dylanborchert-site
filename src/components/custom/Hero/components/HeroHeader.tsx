"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Contact } from "lucide-react";
import { HeroContact } from "./HeroContact";

export default function HeroHeader() {
    const [time, setTime] = useState("XX:XX");
    const [shufflingTime, setShufflingTime] = useState("XX:XX");
    const [isFirstLoad, setIsFirstLoad] = useState(true); // Flag for first load

    const scrollToAbout = () => {
        const content = document.querySelector("#about");
        if (content) {
            content.scrollIntoView({ behavior: "smooth" });
        }
    }

    const scrollToExperience = () => {
        const content = document.querySelector("#experience");
        if (content) {
            content.scrollIntoView({ behavior: "smooth" });
        }
    }

    useEffect(() => {
        const updateTime = () => {
            const formatter = new Intl.DateTimeFormat("en-CA", {
                timeZone: "America/Edmonton", // Calgary timezone
                hour: "numeric",
                minute: "numeric",
                hour12: false,
            });

            const currentTime = formatter.format(new Date());
            const [currentHour, currentMinute] = currentTime.split(":");
            const [prevHour, prevMinute] = time.split(":");

            // Shuffle effect logic
            if (isFirstLoad || (currentMinute === "00" && prevMinute === "59")) {
                // Shuffle both hours and minutes on the first load
                let shuffleInterval = setInterval(() => {
                    const randomTime = `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}:${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
                    setShufflingTime(randomTime);
                }, 30);

                setTimeout(() => {
                    clearInterval(shuffleInterval);
                    setShufflingTime(currentTime);
                    setTime(currentTime);
                    setIsFirstLoad(false); // Mark first load as complete
                }, 800);
            } else if (currentMinute !== prevMinute) {
                // Shuffle only the minutes on subsequent changes
                let shuffleInterval = setInterval(() => {
                    const randomTime = `${currentHour}:${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
                    setShufflingTime(randomTime);
                }, 30);

                setTimeout(() => {
                    clearInterval(shuffleInterval);
                    setShufflingTime(currentTime);
                    setTime(currentTime);
                }, 800);
            }
        };

        // Call updateTime once on initial load
        updateTime();

        const intervalId = setInterval(updateTime, 1000);

        // Cleanup the interval on unmount
        return () => clearInterval(intervalId);
    }, [isFirstLoad, time]);

    return (
        <div className="flex justify-between py-3 items-center">
            <div>
                <p className="flex-nowrap pr-3 font-semibold sm:text-base text-sm">
                    DYLANBORCHERT
                </p>
            </div>
            <div className="flex flex-wrap w-fit flex-col md:flex-row sm:text-base text-xs">
                <span className="pr-1">ALBERTA, CANADA</span>
                <span>— <span className="font-mono w-16 animate-[pulse_5s_ease-in-out_infinite] font-medium">{shufflingTime}</span></span>
            </div>
            <div className="*:mx-1 flex-wrap w-fit flex-col sm:block hidden md:flex-row">
                <span className="cursor-pointer" onClick={scrollToAbout}>ABOUT</span>
                <span className="cursor-pointer" onClick={scrollToExperience}>RESUME</span>
            </div>
            <HeroContact />
        </div>
    );
}
