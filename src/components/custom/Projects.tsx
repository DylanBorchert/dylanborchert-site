'use client';

import { Textfit } from "react-textfit";
import React from "react";


export default function Projects() {

    return (
        <div id="projects">
            {/* <Textfit
                mode="single"
                forceSingleModeWidth={true}
                max={10000}
                min={0}
                className="w-2/3 font-bold antialiased text-muted-foreground leading-tight bg-clip-text bg-image-parallax"
            >
                Projects.
            </Textfit> */}
            <div className="w-full flex justify-center py-3">
                <p className="text-xs text-muted text-center">This is still under active development, stay tuned for projects and blogs</p>
            </div>
        </div>
    );
}


