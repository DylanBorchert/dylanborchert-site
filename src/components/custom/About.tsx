'use client';

import { Textfit } from "react-textfit";

import { useRef, useState, useEffect } from 'react';
import FadeIn from 'react-fade-in';
import IntersectingFadeIn from "../IntersectingFadeIn";

export default function About() {

  return (
    <div id="about">
      <Textfit
        mode="single"
        forceSingleModeWidth={true}
        max={10000}
        min={0}
        className="w-full font-bold antialiased text-muted-foreground leading-tight bg-clip-text bg-image-parallax"
      >
        About Me.
      </Textfit>
      <IntersectingFadeIn>
        <div className="flex w-full">

        </div>
      </IntersectingFadeIn>
    </div>
  );
}


