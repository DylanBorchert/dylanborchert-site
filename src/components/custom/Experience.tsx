"use client";

import IntersectingFadeIn from "../IntersectingFadeIn";
import { ArrowUpRight } from "lucide-react";
import { AutoTextSize } from "auto-text-size";

export default function Experience() {
  return (
    <div className="h-fit relative md:flex py-5" id="experience">
      <div className="max-w-1/2 md:w-1/2 w-full  sticky md:top-5">
        <AutoTextSize
          as="span"
          maxFontSizePx={1000}
          className="font-bold antialiased text-muted-foreground bg-clip-text bg-image-parallax"
        >
          My Experience.
        </AutoTextSize>
      </div>
      <div className="md:w-1/2 w-full md:pl-3 md:pt-0  pt-5 flex flex-col gap-5">
        <IntersectingFadeIn className="group w-full bg-background rounded-lg transition ease-in duration-150 shadow-centre-bg hover:bg-muted dark:border-white/[0.2] border border-black/[0.2] relative">
          <a href="https://www.atvenu.com/" target="_blank" className="block p-5">
            <div className="text-muted-foreground flex justify-between items-center">
              <p>June 2024 — Present</p>
              <ArrowUpRight height={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition ease-in-out duration-150" />
            </div>
            <p className="text-xl">
              Junior Developer • atVenu
            </p>
            <div className="flex flex-wrap">
              <span className="rounded-lg dark:bg-white/5 bg-black/5 text-foreground border dark:border-white/[0.3] border-black/[0.3] py-1 px-3 my-1 mr-2 font-semibold w-fit text-xs">React Native</span>
              <span className="rounded-lg dark:bg-white/5 bg-black/5 text-foreground border dark:border-white/[0.3] border-black/[0.3] py-1 px-3 my-1 mr-2 font-semibold w-fit text-xs">Redux</span>
              <span className="rounded-lg dark:bg-white/5 bg-black/5 text-foreground border dark:border-white/[0.3] border-black/[0.3] py-1 px-3 my-1 mr-2 font-semibold w-fit text-xs">Ruby</span>
              <span className="rounded-lg dark:bg-white/5 bg-black/5 text-foreground border dark:border-white/[0.3] border-black/[0.3] py-1 px-3 my-1 mr-2 font-semibold w-fit text-xs">Docker</span>
              <span className="rounded-lg dark:bg-white/5 bg-black/5 text-foreground border dark:border-white/[0.3] border-black/[0.3] py-1 px-3 my-1 mr-2 font-semibold w-fit text-xs">Swift</span>
              <span className="rounded-lg dark:bg-white/5 bg-black/5 text-foreground border dark:border-white/[0.3] border-black/[0.3] py-1 px-3 my-1 mr-2 font-semibold w-fit text-xs">Stripe</span>
              <span className="rounded-lg dark:bg-white/5 bg-black/5 text-foreground border dark:border-white/[0.3] border-black/[0.3] py-1 px-3 my-1 mr-2 font-semibold w-fit text-xs">Git</span>
            </div>
          </a>
        </IntersectingFadeIn>
        <IntersectingFadeIn>
          <div className="group flex cursor-pointer  items-center">
            <p className="font-bold">
              View Full Resume
            </p>
            <ArrowUpRight height={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition ease-in-out duration-150" />
          </div>
        </IntersectingFadeIn>
      </div>
    </div>
  );
}
