"use client";

import { Textfit } from "react-textfit";

import { useRef, useState, useEffect } from "react";
import FadeIn from "react-fade-in";
import IntersectingFadeIn from "../IntersectingFadeIn";

export default function Experience() {
  return (
    <div>
      <Textfit
        mode="single"
        forceSingleModeWidth={true}
        max={10000}
        min={0}
        className="w-1/2 font-bold antialiased text-muted-foreground leading-tight bg-clip-text background-clip-parallax"
      >
        My Experience.
      </Textfit>
      <IntersectingFadeIn>
        <p>Resume</p>
      </IntersectingFadeIn>
    </div>
  );
}
