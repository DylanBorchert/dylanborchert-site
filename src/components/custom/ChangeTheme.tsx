import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "#/components/ui/tooltip"
import { useTheme } from "next-themes";
import { useState } from "react";
import classNames from "classnames";

type ParamOptions = {
    fillType?: string;
    scaleOnHover?: boolean;
}

function ChangeTheme(options: ParamOptions) {

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
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger>
                    <svg
                        onClick={toggleTheme}
                        className={classNames(`h-6 w-6 transition duration-150 ease-in-out hover:cursor-pointer z-20`,
                            options.fillType,
                            { "hover:scale-125": options.scaleOnHover ?? false },
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
    )
}

export default ChangeTheme