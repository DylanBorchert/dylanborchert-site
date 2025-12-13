'use client';

import { AutoTextSize } from 'auto-text-size'

import Typewriter from 'typewriter-effect';
import IntersectingFadeIn from "../../../IntersectingFadeIn";
import { useColorPalette } from '#/context/ColorPalette.context';

export default function SuspenseAbout({ home }: any) {


    return (
        <div id="about" className="w-full">
            <div className="w-full">
                <AutoTextSize
                    as="span"
                    maxFontSizePx={1000}
                    className={`font-bold antialiased text-transparent bg-clip-text font-center bg-linear-to-r from-palette-lightVibrant via-palette-vibrant to-palette-darkVibrant bg-cover bg-center bg-fixed`}
                >
                    About Me.
                </AutoTextSize>
            </div>
            <IntersectingFadeIn className="w-full h-fit mb-5 relative">
                <div className="md:flex gap-5 h-fit animate-pulse">
                    <div className="flex md:flex-col justify-center">
                        <div className="w-52 h-52">
                            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center md:mt-0 mt-5 w-full'>
                        <div className='h-fit flex flex-col gap-2 w-full'>
                            <div className="flex items-center w-full">
                                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                                <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                                <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                            </div>
                            <div className="flex items-center w-full max-w-[90%]">
                                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                            </div>
                            <div className="flex items-center w-full max-w-[80%]">
                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                                <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                            </div>
                            <div className="flex items-center w-full max-w-[85%]">
                                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                            </div>
                            <div className="flex items-center w-full max-w-[95%]">
                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
                                <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                                <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                            </div>
                            <div className="flex items-center w-full max-w-[90%]">
                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                                <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                                <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                            </div>
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


