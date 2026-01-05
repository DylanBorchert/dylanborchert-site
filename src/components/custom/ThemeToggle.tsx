"use client"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "#/components/ui/tooltip"
import classNames from "classnames";
import { useCallback, useRef, useState } from "react"
import { flushSync } from "react-dom"
import { useTheme } from "next-themes"

interface ParamOptions extends React.ComponentPropsWithoutRef<"button"> {
    fillType?: string;
    scaleOnHover?: boolean;
    duration?: number
}

export const ThemeToggle = ({
    className,
    scaleOnHover,
    duration = 1000,
    ...props
}: ParamOptions) => {
    const { theme, setTheme, systemTheme } = useTheme()
    const [logoTheme, setLogoTheme] = useState("");
    const svgRef = useRef<SVGSVGElement>(null)

    const toggleTheme = useCallback(async () => {
        if (!svgRef.current) return

        // Set logo animation state first
        const newLogoTheme = logoTheme === "back" ? "forward" : "back";
        setLogoTheme(newLogoTheme);

        // Determine the displayed theme (either explicit theme or system theme)
        const displayedTheme = /light|dark/.test(theme || "") ? theme : systemTheme;

        // Determine new theme based on current state
        let newTheme: string;
        if (displayedTheme === systemTheme) {
            // Currently on system theme, switch to the opposite
            newTheme = systemTheme === "light" ? "dark" : "light";
        } else {
            // Currently on manual theme, switch back to system
            newTheme = "system";
        }

        // Start the transition FIRST (this captures the current state)
        const transition = document.startViewTransition(() => {
            flushSync(() => {
                setTheme(newTheme)
            })
        });

        // Wait for the transition to be ready
        await transition.ready;

        // NOW animate the clip-path
        const { top, left, width, height } =
            svgRef.current.getBoundingClientRect()
        const x = left + width / 2
        const y = top + height / 2
        const maxRadius = Math.hypot(
            Math.max(left, window.innerWidth - left),
            Math.max(top, window.innerHeight - top)
        )

        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${maxRadius}px at ${x}px ${y}px)`,
                ],
            },
            {
                duration,
                easing: "ease-in-out",
                pseudoElement: "::view-transition-new(root)",
            }
        )
    }, [logoTheme, duration, theme, systemTheme, setTheme])


    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger>
                    <svg
                        ref={svgRef}
                        onClick={toggleTheme}
                        className={classNames(`h-6 w-6 transition duration-150 ease-in-out hover:cursor-pointer`,
                            className,
                            { "hover:scale-125": scaleOnHover ?? false },
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