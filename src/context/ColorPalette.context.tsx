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
            const response = await fetch(`/api/color-palette?theme=${displayedTheme}`);
            const data = await response.json();
            root.style.setProperty('--palette-textForeground', `${data.TextForeground[0] * 360} ${data.TextForeground[1] * 100}% ${data.TextForeground[2] * 100}`);
            root.style.setProperty('--palette-textBackground', `${data.TextBackground[0] * 360} ${data.TextBackground[1] * 100}% ${data.TextBackground[2] * 100}`);
            root.style.setProperty('--palette-vibrant', `${data.Vibrant[0] * 360} ${data.Vibrant[1] * 100}% ${data.Vibrant[2] * 100}%`);
            root.style.setProperty('--palette-muted', `${data.Muted[0] * 360} ${data.Muted[1] * 100}% ${data.Muted[2] * 100}%`);
            root.style.setProperty('--palette-darkMuted', `${data.DarkMuted[0] * 360} ${data.DarkMuted[1] * 100}% ${data.DarkMuted[2] * 100}%`);
            root.style.setProperty('--palette-lightMuted', `${data.LightMuted[0] * 360} ${data.LightMuted[1] * 100}% ${data.LightMuted[2] * 100}%`);
            root.style.setProperty('--palette-darkVibrant', `${data.DarkVibrant[0] * 360} ${data.DarkVibrant[1] * 100}% ${data.DarkVibrant[2] * 100}%`);
            root.style.setProperty('--palette-lightVibrant', `${data.LightVibrant[0] * 360} ${data.LightVibrant[1] * 100}% ${data.LightVibrant[2] * 100}%`);
            await fetch(`/api/color-palette?theme=${displayedTheme === 'dark' ? 'light' : 'dark'}`);
            await fetch(`/api/hero-image?theme=dark`);
            await fetch(`/api/hero-image?theme=light`);
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
