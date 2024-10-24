"use client";
import { createContext, useContext } from "react";

interface HeroImageContextType {
	backgroundImage: string;
}

export const HeroImageContext = createContext<HeroImageContextType | undefined>(
	undefined
);

export const useHeroImage = () => {
	const context = useContext(HeroImageContext);
	if (!context) {
		throw new Error("useHeroImage must be used within a HeroImageProvider");
	}
	return context;
};
