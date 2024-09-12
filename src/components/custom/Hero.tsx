"use client";
import { Textfit } from "react-textfit";
import { AuroraBackground } from "../ui/aurora-background";
import FadeIn from "../FadeIn";
import classNames from "classnames";
import { useTheme } from "next-themes";
import { useState } from "react";
import { FlipWords } from "../ui/flip-words";

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
            <div className="absolute h-full md:w-1/2 w-full p-5">
                <FadeIn>
                    <Textfit mode='single' forceSingleModeWidth={true} max={10000} min={0} className="w-full font-bold antialiased text-background leading-tight max-w-1/2">
                        Hello There.
                    </Textfit>
                    <Textfit mode='single' forceSingleModeWidth={true} max={10000} min={0} className="w-full font-bold antialiased text-background leading-tight max-w-1/2">
                        I&#39;m Dylan
                    </Textfit>
                    <Textfit mode='single' forceSingleModeWidth={true} max={10000} min={0} className="w-full font-bold antialiased text-background leading-tight max-w-1/2">
                        <FlipWords words={["Developer", "Designer", "Creator"]} duration={2000} className="!text-background !pl-0" />
                    </Textfit>

                </FadeIn>
            </div>
            <div className="absolute right-0 bottom-0 p-5">
                <svg
                    onClick={toggleTheme}
                    className={classNames("h-6 w-6 transition duration-150 ease-in-out hover:cursor-pointer fill-background z-20 hover:scale-125",
                        { "animate-forward-spin": logoTheme === "forward" },
                        { "animate-reverse-spin": logoTheme === "back" },
                        { "": logoTheme === "" }
                    )}
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em" height="1em"
                    viewBox="0 0 20 20">
                    <path d="M10 3a7 7 0 1 1 0 14zm0-1a8 8 0 1 0 0 16a8 8 0 0 0 0-16"></path>
                </svg>
            </div>
        </div >
    );
}