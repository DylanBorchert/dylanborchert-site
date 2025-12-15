'use client';

import { Experience, Tag } from "#/payload/payload-types";
import { ArrowUpRight } from "lucide-react";
import { format } from "date-fns";
import IntersectingFadeIn from "#/components/custom/IntersectingFadeIn";
import { useColorPalette } from "#/context/ColorPalette.context";
import Link from "next/link";

export default function ExperienceItem({ item }: { item: Experience }) {
  const tags: Tag[] =
    item["tags"]
      ?.map((tag: any) => tag.value)
      .sort((tagA, tagB) => tagA.name.localeCompare(tagB.name)) ||
    ([] as Tag[]);

  return (
    <div className="group w-full rounded-lg transition ease-in duration-150 shadow-accent relative">
      <Link href={item["Company Link"]} target="_blank" className="block p-5">
        <IntersectingFadeIn>
          <div className="text-muted-foreground flex justify-between items-center text-sm">
            <div className="gap-1 flex">
              <span>{format(new Date(item.startDate), "MMM yyyy")}</span>
              <span>-</span>
              {item.Present === "yes" ? (
                <span>Present</span>
              ) : (
                <span>{format(new Date(item.endDate || ""), "MMM yyyy")}</span>
              )}
            </div>
            <ArrowUpRight
              height={20}
              className="group-hover:translate-x-2 group-hover:-translate-y-2 transition ease-in-out duration-150"
            />
          </div>
          <p className="text-xl">
            {item["Job Title"]} • {item["Comapany Name"]}
          </p>
          <p className="text-muted-foreground text-md pl-1">
            {item["description"]}
          </p>
          <div className="flex flex-wrap my-1 gap-2">
            {tags.map((tag: any) => (
              <div
                key={tag.id}
                className="w-fit rounded-[8px] border-2 border-palette-vibrant/50"
              >
                <span className="text-palette-vibrant text-sm relative font-semibold w-full px-2">
                  {tag.name}
                </span>
              </div>
            ))}
          </div>
        </IntersectingFadeIn>
      </Link>
    </div>
  );
}