"use client";
import { useTheme } from "next-themes";
import React, { createContext, useContext, useEffect, useState } from "react";
import { LCH } from "colorizr";
import Loader from "#/components/custom/Loader";

export interface ColorPaletteType {
  Vibrant: LCH;
  Muted: LCH;
  DarkMuted: LCH;
  LightMuted: LCH;
  DarkVibrant: LCH;
  LightVibrant: LCH;
  TextForeground: LCH;
}

const ColorPaletteContext = createContext({});

interface ColorPaletteProviderProps {
  children: React.ReactNode;
}

const oklch = ({ l, c, h }: LCH) => `oklch(${l} ${c} ${h})`;

export const ColorPaletteProvider: React.FC<ColorPaletteProviderProps> = ({
  children,
}): React.ReactElement | null => {
  const { systemTheme, theme } = useTheme();
  const [ready, setReady] = useState(false);
  const displayedTheme = /light|dark/.test(theme || "") ? theme : systemTheme;

  useEffect(() => {
    const fetchColorPalette = async () => {
      const root = document.querySelector(":root") as HTMLElement;
      const response = await fetch(
        `/api/color-palette?theme=${displayedTheme}`
      );
      const data = await response.json();
      console.log("Fetched color palette:", data);
      if (data) {
        root.style.setProperty("--palette-muted", oklch(data.Muted));
        root.style.setProperty("--palette-vibrant", oklch(data.Vibrant));
        root.style.setProperty("--palette-darkMuted", oklch(data.DarkMuted));
        root.style.setProperty("--palette-lightMuted", oklch(data.LightMuted));
        root.style.setProperty(
          "--palette-darkVibrant",
          oklch(data.DarkVibrant)
        );
        root.style.setProperty(
          "--palette-lightVibrant",
          oklch(data.LightVibrant)
        );
        root.style.setProperty(
          "--palette-textForeground",
          oklch(data.TextForeground)
        );
        root.style.setProperty(
          "--palette-textBackground",
          oklch(data.TextBackground)
        );
      } else {
        console.error("Failed to fetch color palette data");
      }
      setReady(true);
    };
    if (displayedTheme !== "system") {
      fetchColorPalette();
    }
  }, [displayedTheme]);

  if (!ready) {
    return <Loader />;
  }

  return (
    <ColorPaletteContext.Provider value={{}}>
      {children}
    </ColorPaletteContext.Provider>
  );
};

export const useColorPalette = () => useContext(ColorPaletteContext);
