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
          className="font-bold antialiased text-muted-foreground bg-clip-text bg-image-parallax font-center"
        >
          About Me.
        </AutoTextSize>
      </div>
      <IntersectingFadeIn className="w-full mb-5 relative">
        <div className="md:flex gap-10 flex-col md:flex-row grid grid-cols-1 grid-rows-2">
          <div className="flex justify-center">
            <div className="aspect-square max-w-60">
              <Image
                src={image.url || ""}
                width={400}
                height={400}
                alt={image.alt}
                className="rounded-full w-full h-full shadow-md"
              />
            </div>
          </div>
          <div className="w-full">
            <AutoTextSize
              mode="box"
              className="w-full h-0"
              as="div"
              maxFontSizePx={200}
              minFontSizePx={10}
            >
              {home?.AboutMeText}
            </AutoTextSize>
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


