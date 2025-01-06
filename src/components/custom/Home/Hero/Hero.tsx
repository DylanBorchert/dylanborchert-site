// Hero.js
import React from 'react';
import HeroFooter from './components/HeroFooter';
import HeroHeader from './components/HeroHeader';
import HeroBody from './components/HeroBody';

const Hero = ({ children }: any) => {
    return <div className='relative h-[100dvh] w-full flex flex-col md:max-h-[calc(100dvw*3/4)]'>{children}</div>;
};

Hero.Header = HeroHeader;
Hero.Body = HeroBody;
Hero.Footer = HeroFooter;

export default Hero;
