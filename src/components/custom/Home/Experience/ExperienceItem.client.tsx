"use client";

import { Experience, Tag } from "#/payload/payload-types";
import { ArrowUpRight } from "lucide-react";
import { format } from "date-fns";
import IntersectingFadeIn from "#/components/custom/IntersectingFadeIn";
import { useColorPalette } from "#/context/ColorPalette.context";
import Link from "next/link";
import { Card } from "@payloadcms/ui";

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
          <p className="text-xl py-0.5">
            {item["Job Title"]} • {item["Comapany Name"]}
          </p>
          <p className="text-muted-foreground text-md pl-1">
            {item["description"]}
          </p>
          <div className="flex flex-wrap my-1 gap-2">
            {tags.map((tag: any) => (
              <div
                key={tag.id}
                className="w-fit rounded-md border-2 border-foreground/50"
              >
                <span className="text-sm relative font-semibold w-full px-2">
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
