"use client";
import { createContext } from "react";

interface HomeContextType {
	backgroundImage: string;
}

export const HomePageContext = createContext<HomeContextType | undefined>(
	undefined
);
