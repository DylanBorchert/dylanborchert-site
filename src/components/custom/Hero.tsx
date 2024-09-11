"use client";
import { AuroraBackground } from "../ui/aurora-background";

export default function Hero() {
    return (
        <div className="overflow-hidden relative rounded-2xl h-full">
            <AuroraBackground className="w-full h-full absolute top-0"><></>
            </AuroraBackground>
            {/* <div className="absolute h-full w-full shadow-inner-left-right"></div> */}
        </div>
    );
}