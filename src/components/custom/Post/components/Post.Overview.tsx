'use client'
import { Blog, Project } from "#/payload/payload-types";
import classNames from "classnames";
import { debounce } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import slugify from "slugify";


export default function PostContent({ post }: { post: Blog | Project }) {

    const progressRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [showOverview, setShowOverview] = useState<boolean>(false)
    const [activeHeading, setActiveHeading] = useState<string>("");

    const headingList = useMemo(() => {
        const headingList: { id: string, text: string }[] = [];
        const postRoot = post?.content?.root.children;
        if (!postRoot) return headingList;
        postRoot.forEach((child: any) => {
            if (child.tag === 'h1') {
                const text = child.children[0].text;
                const id = slugify(text, { lower: true, strict: true });
                headingList.push({ id, text });
            }
        });
        return headingList;
    }, [post?.content?.root.children])

    const handleHeadingClick = (id: string) => {
        const heading = document.getElementById(id);
        if (heading) {
            heading.scrollIntoView({
                block: "start",
                inline: "start",
                behavior: "smooth"
            });
        }
    }

    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver(entries => {
            if (entries[0].contentRect.width > 200) {
                setShowOverview(true)
            } else {
                setShowOverview(false)
            }
        });
        const currentContainer = containerRef.current;
        if (currentContainer) {
            observer.observe(currentContainer);
        }
        return () => currentContainer && observer.unobserve(currentContainer);
    }, [])

    useEffect(() => {
        const headings = document.querySelectorAll(".post-heading");
        const handleScroll = debounce(() => {
            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrolled = (scrollTop / docHeight) * 100;
            if (!progressRef.current) return;
            progressRef.current.style.setProperty("--progress", `${scrolled}%`);

            let foundActive = false;
            headings.forEach((heading) => {
                const offsetTop = (heading as HTMLElement).offsetTop - 75;
                if (scrollTop >= offsetTop) {
                    setActiveHeading(heading.id);
                    foundActive = true;
                }
            });

            if (!foundActive && headings.length > 0) {
                setActiveHeading(headings[0].id);
            }

        }, 20);

        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div ref={containerRef}>
            {showOverview && (
                <div className="sticky top-0 left-0 h-fit" >
                    <p className="p-5 font-semibold">Overview</p>
                    <div className="w-full h-0.5 bg-transparent z-50 mb-3" ref={progressRef} style={{ '--progress': '0%' } as React.CSSProperties}>
                        <div className="h-full bg-gradient-to-r from-palette-lightVibrant via-palette-vibrant to-palette-darkVibrant bg-cover bg-center bg-fixed transition-[width] ease-in-out duration-500 w-[--progress]" />
                    </div>
                    {headingList.map((heading) =>
                        <div key={heading.id} onClick={() => handleHeadingClick(heading.id)} className="cursor-pointer flex items-center gap-2 mb-2 w-fit hover:text-palette-vibrant duration-200 ease-in-out">
                            <div className="w-5 h-8 flex items-center justify-start">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="32" viewBox="0 0 10 32" fill="none" className={
                                    classNames("fill-palette-vibrant opacity-0 duration-200 ease-linear transition-all",
                                        { "opacity-100": activeHeading === heading.id }
                                    )}>
                                    <path d="M-4.4509e-07 32L9.53674e-07 -4.37114e-07L1.42509 4.86267C2.24269 7.65248 5.02062 9.32247 7.37204 11.032C8.97909 12.2003 10 13.9713 10 16.0313C10 18.1074 8.96301 19.9305 7.33412 21.1333C5.00617 22.8523 2.23656 24.5184 1.40771 27.291L-4.4509e-07 32Z"></path>
                                </svg>
                            </div>
                            <span className="text-s">{heading.text}</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    )

}