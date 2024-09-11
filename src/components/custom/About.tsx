'use client';

import { Textfit } from "react-textfit";

import { useRef, useState, useEffect } from 'react';
import FadeIn from 'react-fade-in';
import IntersectingFadeIn from "../IntersectingFadeIn";

export default function About() {

    return (
        <>
            <IntersectingFadeIn >
                <Textfit mode='single' forceSingleModeWidth={true} max={10000} min={0} className="w-full font-bold min-h-0 z-20 antialiased text-muted-foreground leading-tight bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500 bg-clip-text text-transparent">
                    About Me.
                </Textfit>
            </IntersectingFadeIn>

        </>
    );
}


