"use client";

import { ArrowDown } from "lucide-react";

export default function SubHero() {


    return (
        <div className="flex justify-between py-3 items-center">
            <div className="text-right">
                <p>FULL STACK DEVELOPER</p>
                <p>at ATVENU</p>
            </div>
            <div>

            </div>
            <div className="flex h-fit group/talk cursor-pointer items-center">
                <ArrowDown className="h-4 w-4 mr-2 text-muted-foreground group-hover/talk:text-foreground group-hover/talk:scale-125 transition duration-200 ease-in" />
                <p>
                    [MORE]
                </p>
            </div>
        </div>
    );
}