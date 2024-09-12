'use client';

import { Textfit } from "react-textfit";

import { useRef, useState, useEffect } from 'react';
import FadeIn from 'react-fade-in';
import IntersectingFadeIn from "../IntersectingFadeIn";

export default function About() {

    return (
        <>
            <Textfit mode='single' forceSingleModeWidth={true} max={10000} min={0} className="w-full font-bold min-h-0 z-20 antialiased text-muted-foreground leading-tight bg-clip-text background-clip-paralax">
                About Me.
            </Textfit>
            <IntersectingFadeIn>
                <p>Summary</p>
            </IntersectingFadeIn>
            <div className="h-[100dvh]">
            </div>

        </>
    );
}


