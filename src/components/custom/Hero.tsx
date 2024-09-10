"use client";
import { AuroraBackground } from "../ui/aurora-background";
import { WavyBackground } from "../ui/wavy-background";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <div className="flex-grow items-center flex justify-center overflow-hidden relative rounded-2xl">
            <AuroraBackground className="w-[100dvw] h-[100dvh]">
                <span></span>
            </AuroraBackground>
            {/* <WavyBackground>
                <span></span>
            </WavyBackground> */}
            {/* <ShaderGradientView /> */}
            {/* <div className="absolute h-full w-full shadow-inner-left-right"></div> */}
        </div>
    );
}