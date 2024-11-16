"use client";
import { AuroraBackground } from "#/components/ui/aurora-background";
import classNames from "classnames";
import { useTheme } from "next-themes";
import { memo, useState } from "react";
import { FlipWords } from "#/components/ui/flip-words";
import FadeIn from "react-fade-in";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "#/components/ui/tooltip"
import { AutoTextSize } from "auto-text-size";


export default function Hero() {
    const { systemTheme, theme, setTheme } = useTheme();
    const [logoTheme, setLogoTheme] = useState("");

    const toggleTheme = () => {
        // Determine the displayed theme (either systemTheme or manually set theme)
        const displayedTheme = /light|dark/.test(theme || "") ? theme : systemTheme;

        if (displayedTheme === systemTheme) {
            setTheme(systemTheme === "light" ? "dark" : "light");
        } else {
            setTheme("system");
        }

        // Set the logo theme
        setLogoTheme(logoTheme === "back" ? "forward" : "back");

    };


    return (
        <div className="overflow-hidden relative rounded-2xl h-full">
            <AuroraBackground className="w-full h-full absolute top-0"><></></AuroraBackground>
            <div className="sm:w-1/2 md:w-1/3 w-full p-5 h-full relative max-w-96 sm:max-w-none ">
                <FadeIn>
                    <AutoTextSize maxFontSizePx={1000} className="font-bold text-background">
                        Hello There!
                    </AutoTextSize>
                    <AutoTextSize maxFontSizePx={1000} className="font-bold text-background">
                        I&#39;m Dylan
                    </AutoTextSize>
                </FadeIn>
            </div>
            <div className="absolute bottom-5 translate-x-[-50%] left-[50%]">
                <TooltipProvider delayDuration={150}>
                    <Tooltip>
                        <TooltipTrigger>
                            <svg
                                onClick={toggleTheme}
                                className={classNames("h-6 w-6 transition duration-150 ease-in-out hover:cursor-pointer fill-background z-20 hover:scale-125 mix-blend-multiply",
                                    { "animate-forward-spin": logoTheme === "forward" },
                                    { "animate-reverse-spin": logoTheme === "back" },
                                    { "": logoTheme === "" }
                                )}
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em" height="1em"
                                viewBox="0 0 20 20">
                                <path d="M10 3a7 7 0 1 1 0 14zm0-1a8 8 0 1 0 0 16a8 8 0 0 0 0-16"></path>
                            </svg>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Change Theme</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div >
    );
}