'use client';

import { Textfit } from "react-textfit";

import Typewriter from 'typewriter-effect';
import IntersectingFadeIn from "../IntersectingFadeIn";
import profile from "#/../media/image.jpg"
import Image from "next/image";
import { memo } from "react";

export default function About() {

  const TextFitResize = memo(() => {
    return (
      <Textfit mode="multi" className="h-full leading-tight" onResize={() => window.dispatchEvent(new Event('resize'))}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Textfit>
    )
  });

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
      <IntersectingFadeIn className="w-full mb-5">
        <div className="grid sm:grid-cols-[1fr_4fr] grid-cols-[1fr] grid-rows[1fr] gap-5">
          <div className="flex flex-col justify-center items-center">
            <div className="aspect-square flex justify-center items-center max-w-[50dvw]">
              <Image src={profile} width={400} height={400} alt="profile" className="rounded-full w-full h-full shadow-md" />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Textfit mode="multi" className="h-full leading-tight">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Textfit>
          </div>
        </div>

      </IntersectingFadeIn>
      <IntersectingFadeIn>
        <p className="text-center">
          I am pretty good at:
        </p>
        <div className="flex w-fit text-center text-4xl mx-auto my-5 h-20 md:h-auto text-foreground">
          <Typewriter
            options={{
              strings: [
                "Riding my bike with no handlebars.",
                "Making a mean cup of coffee.",
                "Climbing rocks in awkward positions.",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </IntersectingFadeIn>
    </div>
  );
}


