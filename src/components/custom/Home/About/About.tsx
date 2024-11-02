'use client';

import { AutoTextSize } from 'auto-text-size'

import Typewriter from 'typewriter-effect';
import IntersectingFadeIn from "../../../IntersectingFadeIn";
import profile from "#/../media/image.jpg"
import Image from "next/image";

export default function About() {


  return (
    <div id="about" className='w-full'>
      <div className='w-full'>
        <AutoTextSize
          as="span"
          maxFontSizePx={1000}
          className="font-bold antialiased text-muted-foreground bg-clip-text bg-image-parallax font-center"
        >
          About Me.
        </AutoTextSize>
      </div>
      <IntersectingFadeIn className="w-full mb-5 relative">
        <div className="md:flex gap-10 flex-col md:flex-row grid grid-cols-1 grid-rows-2">
          <div className='flex justify-center'>
            <div className="aspect-square max-w-60">
              <Image src={profile} width={400} height={400} alt="profile" className="rounded-full w-full h-full shadow-md" />
            </div>
          </div>
          <div className='w-full'>
            <AutoTextSize mode="box" className="w-full h-0" as='div' maxFontSizePx={200} minFontSizePx={10}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </AutoTextSize>
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
                "Riding my bike with no hands.",
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


