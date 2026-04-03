"use client";

import { Experience, Tag } from "#/payload/payload-types";
import { ArrowUpRight } from "lucide-react";
import { format } from "date-fns";
import IntersectingFadeIn from "#/components/custom/IntersectingFadeIn";
import Link from "next/link";

export default function ExperienceItem({ item }: { item: Experience }) {
  const tags: Tag[] =
    item["tags"]
      ?.map((tag: any) => tag.value)
      .sort((tagA, tagB) => tagA.name.localeCompare(tagB.name)) ||
    ([] as Tag[]);

  return (
    <IntersectingFadeIn>
      <div className="group w-full transition ease-in duration-150 shadow-accent relative">
        <Link href={item["Company Link"]} target="_blank" className="block p-5">
          <div className="flex justify-between items-center text-sm">
            <p className="text-xl text-md">{item["Comapany Name"]}</p>
            <ArrowUpRight
              height={20}
              className="group-hover:translate-x-2 group-hover:-translate-y-2 transition ease-in-out duration-150 text-muted-foreground"
            />
          </div>
          <div className="text-lg px-1 flex justify-between">
            <p>{item["Job Title"]}</p>
            <div className="gap-1 flex text-muted-foreground text-sm items-center">
              <span>{format(new Date(item.startDate), "MMM yyyy")}</span>
              <span>-</span>
              {item.Present === "yes" ? (
                <span>Present</span>
              ) : (
                <span>{format(new Date(item.endDate || ""), "MMM yyyy")}</span>
              )}
            </div>
          </div>
          <p className="text-muted-foreground text-md pl-2">
            {item["description"]}
          </p>
          <div className="flex flex-wrap my-1 gap-2">
            {tags.map((tag: any) => (
              <div
                key={tag.id}
                className="w-fit px-2 py-0.5 rounded-md transition-colors bg-palette-vibrant/20 text-palette-vibrant"
              >
                <span className="text-sm relative font-semibold w-full">
                  {tag.name}
                </span>
              </div>
            ))}
          </div>
        </Link>
      </div>
    </IntersectingFadeIn>
  );
}
