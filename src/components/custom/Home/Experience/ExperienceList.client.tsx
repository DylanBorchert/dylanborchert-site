"use client";

import { AutoTextSize } from "auto-text-size";
import { useEffect, useState } from "react";
import IntersectingFadeIn from "#/components/IntersectingFadeIn";
import ExperienceItem from "./ExperienceItem.client";
import { ArrowUpRight } from "lucide-react";
import { Experience } from "#/payload/payload-types";
import useOrigin from "#/hooks/getOrigin";
import { useColorPalette } from "#/context/ColorPalette.context";

export default function ExperienceClient({ experience, resumeUrl }: { experience: any, resumeUrl: string }) {
  const [experienceItems, setExperienceItems] = useState(experience);
  const currentUrl = useOrigin();

  useEffect(() => {
    setExperienceItems(experience);
  }, [experience]);

  return (
    <div className="h-fit relative md:flex py-5" id="experience">
      <div className="max-w-1/2 md:w-1/2 w-full sticky md:top-5 h-fit">
        <AutoTextSize
          as="span"
          maxFontSizePx={1000}
          className={`font-bold antialiased bg-clip-text text-transparent bg-gradient-to-r from-palette-lightMuted via-palette-muted to-palette-darkMuted bg-cover bg-center bg-fixed`}
        >
          My Experience.
        </AutoTextSize>
      </div>
      <div className="md:w-1/2 w-full md:pl-3 md:pt-0  pt-5 flex flex-col gap-5">
        {experienceItems?.map((item: Experience) => (
          <ExperienceItem key={item.id} item={item} />
        ))}
        <IntersectingFadeIn>
          <div className="group flex cursor-pointer  items-center pl-5 -mt-3">
            <a className="font-bold" href={`${currentUrl}${resumeUrl}`} target="_blank">
              View Full Resume
            </a>
            <ArrowUpRight
              height={20}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition ease-in-out duration-150"
            />
          </div>
        </IntersectingFadeIn>
      </div>
    </div >
  );
}
