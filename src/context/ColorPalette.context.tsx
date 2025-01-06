'use client';
import LoadingPage from '#/components/custom/loading';
import { useTheme } from 'next-themes';
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface ColorPaletteType {
    Vibrant: string;
    Muted: string;
    DarkMuted: string;
    LightMuted: string;
    DarkVibrant: string;
    LightVibrant: string;
    TextForeground: string;
}

const ColorPaletteContext = createContext({});

interface ColorPaletteProviderProps {
    children: React.ReactNode;
}

export const ColorPaletteProvider: React.FC<ColorPaletteProviderProps> = ({ children }): React.ReactElement | null => {
    const { systemTheme, theme } = useTheme();
    const [ready, setReady] = useState(false);
    const displayedTheme = /light|dark/.test(theme || "") ? theme : systemTheme;


    useEffect(() => {
        const fetchColorPalette = async () => {
            const root = document.querySelector(':root') as HTMLElement;
            const response = await fetch(`/color-palette?theme=${displayedTheme}`);
            await fetch(`/color-palette?theme=${displayedTheme === 'dark' ? 'light' : 'dark'}`);
            const data = await response.json();
            root.style.setProperty('--palette-textForeground', data.TextForeground);
            root.style.setProperty('--palette-vibrant', data.Vibrant);
            root.style.setProperty('--palette-muted', data.Muted);
            root.style.setProperty('--palette-darkMuted', data.DarkMuted);
            root.style.setProperty('--palette-lightMuted', data.LightMuted);
            root.style.setProperty('--palette-darkVibrant', data.DarkVibrant);
            root.style.setProperty('--palette-lightVibrant', data.LightVibrant);
            await fetch(`/hero-image?theme=dark`);
            await fetch(`/hero-image?theme=light`);
            setReady(true);
        };
        if (displayedTheme !== 'system') {
            fetchColorPalette();
        }
    }, [displayedTheme]);

    if (!ready) {
        return <LoadingPage />;
    }

    return (
        <ColorPaletteContext.Provider value={{}}>
            {children}
        </ColorPaletteContext.Provider>
    );
};

export const useColorPalette = () => useContext(ColorPaletteContext);
