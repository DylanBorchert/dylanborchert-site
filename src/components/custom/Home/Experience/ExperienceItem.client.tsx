'use client';

import { Experience, Tag } from "#/payload/payload-types";
import { ArrowUpRight } from "lucide-react";
import { format } from "date-fns";
import IntersectingFadeIn from "#/components/IntersectingFadeIn";
import { useColorPalette } from "#/context/ColorPalette.context";

export default function ExperienceItem({ item }: { item: Experience }) {

    const tags: Tag[] = item["tags"]?.map((tag: any) => tag.value).sort((tagA, tagB) => tagA.name.localeCompare(tagB.name)) || [] as Tag[];

    return (
        <div className="group w-full rounded-lg transition ease-in duration-150 shadow-centre-bg dark:hover:bg-muted-foreground/10 hover:bg-muted-foreground/10  relative">
            <a href={item["Company Link"]} target="_blank" className="block p-5">
                <IntersectingFadeIn>
                    <div className="text-muted-foreground flex justify-between items-center text-sm">
                        <div className="gap-1 flex">
                            <span>{format(new Date(item.startDate), 'MMM yyyy')}</span>
                            <span>-</span>
                            {item.Present === 'yes' ? <span>Present</span> : <span>{format(new Date(item.endDate || ''), 'MMM yyyy')}</span>}
                        </div>
                        <ArrowUpRight height={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition ease-in-out duration-150" />
                    </div>
                    <p className="text-xl">
                        {item["Job Title"]} • {item["Comapany Name"]}
                    </p>
                    <p className="text-muted-foreground text-md pl-1">
                        {item["description"]}
                    </p>
                </IntersectingFadeIn>
                <div className="flex flex-wrap my-1 gap-2">
                    {tags.map((tag: any) => (
                        <div key={tag.id} className={`rounded-full w-fit p-[2px] bg-gradient-to-r from-palette-lightVibrant via-palette-vibrant to-palette-darkVibrant bg-cover bg-center bg-fixed`}>
                            <div className="w-full h-full bg-background rounded-full">
                                <span className="text-foreground text-sm relative font-extralight w-full px-2">
                                    {tag.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </a>
        </div>
    );
}