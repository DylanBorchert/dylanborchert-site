"use client";

import { Textfit } from "react-textfit";
import IntersectingFadeIn from "../IntersectingFadeIn";

export default function Experience() {
  return (
    <div id="experience">
      <div className="h-fit relative md:flex">
        <Textfit
          mode="single"
          forceSingleModeWidth={true}
          max={10000}
          min={0}
          className="max-w-1/2 md:w-1/2 w-full font-bold antialiased text-muted-foreground leading-tight bg-clip-text bg-image-parallax sticky md:top-5 h-fit"
        >
          My Experience.
        </Textfit>
        <div className="md:w-1/2 w-full md:p-3 md:pt-0  pt-5 flex flex-col gap-5">
          <IntersectingFadeIn className="w-full bg-background rounded-lg transition ease-in duration-150 shadow-centre-bg hover:bg-muted dark:border-white/[0.2] border border-black/[0.2]">
            <a href="https://www.atvenu.com/" target="_blank" className="block p-5">
              <div className="text-muted-foreground">June 2024 — Present</div>
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
          <IntersectingFadeIn className="w-full bg-background rounded-lg transition ease-in duration-150 shadow-centre-bg hover:bg-muted dark:border-white/[0.2] border border-black/[0.2]">
            <a href="https://www.cnrl.com/" target="_blank" className="block p-5">
              <div className="text-muted-foreground">January 2023 — August 2023</div>
              <p className="text-xl">
                Systems Developer Coop • CNRL
              </p>
              <div className="flex flex-wrap">
                <span className="rounded-lg dark:bg-white/5 bg-black/5 text-foreground border dark:border-white/[0.3] border-black/[0.3] py-1 px-3 my-1 mr-2 font-semibold w-fit text-xs">Python</span>
                <span className="rounded-lg dark:bg-white/5 bg-black/5 text-foreground border dark:border-white/[0.3] border-black/[0.3] py-1 px-3 my-1 mr-2 font-semibold w-fit text-xs">Power Bi</span>
                <span className="rounded-lg dark:bg-white/5 bg-black/5 text-foreground border dark:border-white/[0.3] border-black/[0.3] py-1 px-3 my-1 mr-2 font-semibold w-fit text-xs">MS Excel</span>
                <span className="rounded-lg dark:bg-white/5 bg-black/5 text-foreground border dark:border-white/[0.3] border-black/[0.3] py-1 px-3 my-1 mr-2 font-semibold w-fit text-xs">MS Access</span>
                <span className="rounded-lg dark:bg-white/5 bg-black/5 text-foreground border dark:border-white/[0.3] border-black/[0.3] py-1 px-3 my-1 mr-2 font-semibold w-fit text-xs">SQL</span>
                <span className="rounded-lg dark:bg-white/5 bg-black/5 text-foreground border dark:border-white/[0.3] border-black/[0.3] py-1 px-3 my-1 mr-2 font-semibold w-fit text-xs">VBA</span>
                <span className="rounded-lg dark:bg-white/5 bg-black/5 text-foreground border dark:border-white/[0.3] border-black/[0.3] py-1 px-3 my-1 mr-2 font-semibold w-fit text-xs">Powershell</span>
              </div>
            </a>
          </IntersectingFadeIn>
          <IntersectingFadeIn className="w-full bg-background rounded-lg transition ease-in duration-150 shadow-centre-bg hover:bg-muted dark:border-white/[0.2] border border-black/[0.2]">
            <a href="https://www.siacharts.com/" target="_blank" className="block p-5">
              <div className="text-muted-foreground">May 2022 — August 2022</div>
              <p className="text-xl">
                Junior Developer Intern • SIACharts
              </p>
              <div className="flex flex-wrap">
                <span className="rounded-lg dark:bg-white/5 bg-black/5 text-foreground border dark:border-white/[0.3] border-black/[0.3] py-1 px-3 my-1 mr-2 font-semibold w-fit text-xs">Javascript</span>
                <span className="rounded-lg dark:bg-white/5 bg-black/5 text-foreground border dark:border-white/[0.3] border-black/[0.3] py-1 px-3 my-1 mr-2 font-semibold w-fit text-xs">jQuery</span>
                <span className="rounded-lg dark:bg-white/5 bg-black/5 text-foreground border dark:border-white/[0.3] border-black/[0.3] py-1 px-3 my-1 mr-2 font-semibold w-fit text-xs">SQL</span>
                <span className="rounded-lg dark:bg-white/5 bg-black/5 text-foreground border dark:border-white/[0.3] border-black/[0.3] py-1 px-3 my-1 mr-2 font-semibold w-fit text-xs">C#</span>
                <span className="rounded-lg dark:bg-white/5 bg-black/5 text-foreground border dark:border-white/[0.3] border-black/[0.3] py-1 px-3 my-1 mr-2 font-semibold w-fit text-xs">Git</span>
              </div>
            </a>
          </IntersectingFadeIn>
          <IntersectingFadeIn className="w-full bg-background rounded-lg transition ease-in duration-150 shadow-centre-bg hover:bg-muted dark:border-white/[0.2] border border-black/[0.2]">
            <a href="https://www.mtroyal.ca/" target="_blank" className="block p-5">
              <div className="text-muted-foreground">June 2021 — September 2021</div>
              <p className="text-xl">
                Computer Simulation Developer Coop • MRU
              </p>
              <div className="flex flex-wrap">
                <span className="rounded-lg dark:bg-white/5 bg-black/5 text-foreground border dark:border-white/[0.3] border-black/[0.3] py-1 px-3 my-1 mr-2 font-semibold w-fit text-xs">Javascript</span>
                <span className="rounded-lg dark:bg-white/5 bg-black/5 text-foreground border dark:border-white/[0.3] border-black/[0.3] py-1 px-3 my-1 mr-2 font-semibold w-fit text-xs">CSS</span>
                <span className="rounded-lg dark:bg-white/5 bg-black/5 text-foreground border dark:border-white/[0.3] border-black/[0.3] py-1 px-3 my-1 mr-2 font-semibold w-fit text-xs">HTML</span>
                <span className="rounded-lg dark:bg-white/5 bg-black/5 text-foreground border dark:border-white/[0.3] border-black/[0.3] py-1 px-3 my-1 mr-2 font-semibold w-fit text-xs">Git</span>
              </div>
            </a>
          </IntersectingFadeIn>
        </div>
      </div>
    </div>
  );
}
