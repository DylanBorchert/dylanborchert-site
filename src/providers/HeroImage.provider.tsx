"use client";
import React, { ReactNode, useEffect, useState } from 'react';
import { HeroImageContext } from '#/context/HeroImage.context';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '@payload-config';

interface HeroImageProviderProps {
  children: ReactNode;
}

export const HeroImageProvider: React.FC<HeroImageProviderProps> = ({ children }) => {
  const [backgroundImage, setBackgroundImage] = useState<string>('');

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      const payload = await getPayloadHMR({ config });
      const home = await payload.findGlobal({ slug: 'home' });
      console.log(home);
      setBackgroundImage(home?.backgroundImage || 'http://localhost:3000/api/media/file/RanchoTwilight.webp');
    };

    fetchBackgroundImage();
  }, []);
  return (
    <HeroImageContext.Provider value={{ backgroundImage }}>
      {children}
    </HeroImageContext.Provider>
  );
};