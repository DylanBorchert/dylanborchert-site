'use client';

import { AutoTextSize } from 'auto-text-size'

import Typewriter from 'typewriter-effect';
import IntersectingFadeIn from "../../../IntersectingFadeIn";
import Image from "next/image";
import useOrigin from '#/hooks/getOrigin';
import { Media } from "#/payload/payload-types";

export default function About({ home }: any) {

  const image = home?.AboutMeImage as Media;
  const placeholder = 'https://placehold.co/500x500/';

  return (
    <div id="about" className="w-full">
      <div className="w-full">
        <AutoTextSize
          as="span"
          maxFontSizePx={1000}
          className="font-bold antialiased text-transparent bg-clip-text font-center bg-hero-parallax-light dark:bg-hero-parallax-dark bg-cover bg-center bg-fixed"
        >
          About Me.
        </AutoTextSize>
      </div>
      <IntersectingFadeIn className="w-full h-fit mb-5 relative">
        <div className="md:flex gap-5 h-fit">
          <div className="flex md:flex-col justify-center">
            <div className="w-52 h-52">
              <Image
                src={image.url || ""}
                width={400}
                height={400}
                alt={image.alt}
                className="rounded-full w-full h-full shadow-md"
              />
            </div>
          </div>
          <div className='flex flex-col justify-center'>
            <div className='h-fit'>
              <AutoTextSize
                minFontSizePx={20}
                maxFontSizePx={40}
                mode="box"
              >
                {home?.AboutMeText}
              </AutoTextSize>
            </div>
          </div>
        </div>
      </IntersectingFadeIn>
      <IntersectingFadeIn>
        <p className="text-center">I am pretty good at:</p>
        <div className="flex w-fit text-center text-4xl mx-auto my-5 h-20 md:h-auto text-foreground">
          <Typewriter
            options={{
              strings: home?.prettyGoodAt,
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </IntersectingFadeIn>
    </div>
  );
}


