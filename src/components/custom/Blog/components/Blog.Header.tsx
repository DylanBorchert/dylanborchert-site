'use client'
import { Blog } from "#/payload/payload-types";
import { AutoTextSize } from "auto-text-size";
import Link from "next/link";
import { useEffect } from "react";
import FadeIn from "react-fade-in";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'


export default function BlogHeader({ blog }: { blog: Blog }) {

  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Edmonton", // Calgary timezone
    month: "short",
    year: "numeric",
    day: "2-digit",
  });

  useEffect(() => {
    console.log('blog', blog);
  }, [blog]);


  return (
    <div>
      <div className="flex justify-between py-3 items-center">
        <p className="flex-nowrap pr-3 font-semibold sm:text-base">
          DYLANBORCHERT
        </p>
        <div className="*:mx-1 flex-wrap w-fit flex-col sm:block hidden md:flex-row">
          <Link href='/' className="cursor-pointer underline text-sm">HOME</Link>
        </div>
      </div>
      <div className="w-full dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative">
        <div className="z-10 relative">
          <FadeIn className="w-full">
            <AutoTextSize
              maxFontSizePx={1000}
              minFontSizePx={80}
              mode="multiline"
              className="font-bold antialiased text-transparent bg-clip-text text-center bg-gradient-to-r from-palette-lightVibrant via-palette-vibrant to-palette-darkVibrant bg-cover bg-center bg-fixed"
            >
              {blog.title}
            </AutoTextSize>
          </FadeIn>
          <FadeIn className="w-full" delay={250}>
            <AutoTextSize
              maxFontSizePx={400}
              minFontSizePx={14}
              mode="multiline"
              className="font-bold antialiased bg-clip-text font-center text-center"
            >
              {blog.description}
            </AutoTextSize>
          </FadeIn>
          <FadeIn delay={500}>
            <div className="w-full py-3 flex justify-center items-center gap-2">
              <span className="text-center dark:text-palette-lightMuted text-palette-darkMuted">{`${Math.ceil(blog.minute_read ?? 0)} min read`}</span>
              <div className="w-1 h-1 dark:bg-palette-lightMuted bg-palette-darkMuted rounded-full"></div>
              <span className="text-center dark:text-palette-lightMuted text-palette-darkMuted">{formatter.format(new Date(blog.createdAt))}</span>
            </div>
          </FadeIn>
        </div>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,hsl(var(--background)))]"></div>
      </div>
    </div>

  );
}