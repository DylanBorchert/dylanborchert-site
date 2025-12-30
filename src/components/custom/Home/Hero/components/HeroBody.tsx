"use client";
import { AuroraBackground } from "#/components/ui/aurora-background";
import FadeIn from "react-fade-in";
import { AutoTextSize } from "auto-text-size";
import ChangeTheme from "#/components/custom/ChangeTheme";


export default function Hero() {
    return (
      <div className="overflow-hidden relative rounded-2xl h-full">
        <AuroraBackground className="w-full h-full absolute top-0">
          <></>
        </AuroraBackground>
        <div className="sm:w-1/3 md:w-1/2 w-full p-5 h-full relative max-w-96 sm:max-w-none ">
          <FadeIn delay={100}>
            <AutoTextSize
              maxFontSizePx={1000}
              className="font-bold text-palette-text"
            >
              Hello There!
            </AutoTextSize>
            <AutoTextSize
              maxFontSizePx={1000}
              className="font-bold text-palette-text"
            >
              I&#39;m Dylan
            </AutoTextSize>
          </FadeIn>
        </div>
      </div>
    );
}