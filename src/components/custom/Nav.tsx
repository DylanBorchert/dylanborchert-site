"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Nav() {
    const [time, setTime] = useState("XX:XX");
    const [shufflingTime, setShufflingTime] = useState("XX:XX");
    const [isFirstLoad, setIsFirstLoad] = useState(true); // Flag for first load

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
            if (isFirstLoad) {
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
                <p className="flex-nowrap pr-3">
                    DYLANBORCHERT
                </p>
            </div>
            <div className="flex flex-wrap w-fit flex-col md:flex-row">
                <span className="pr-1">ALBERTA, CANADA</span>
                <span>— <span className="font-mono w-16 animate-[pulse_5s_ease-in-out_infinite]">{shufflingTime}</span></span>
            </div>
            <div className="*:mx-1 flex-wrap w-fit flex-col sm:block hidden md:flex-row">
                <span>ABOUT</span>
                <span>RESUME</span>
                <span>PROJECTS</span>
            </div>
            <div className="flex h-fit group/talk cursor-pointer items-center pl-3">
                <ArrowRight className="h-4 w-4 mr-2 text-muted-foreground group-hover/talk:translate-x-[6px] group-hover/talk:text-foreground group-hover/talk:scale-125 transition duration-200 ease-in" />
                <p>
                    LET&#39;S TALK
                </p>
            </div>
        </div>
    );
}
