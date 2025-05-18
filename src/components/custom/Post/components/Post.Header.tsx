'use client'
import { Blog, Project } from "#/payload/payload-types";
import { AutoTextSize } from "auto-text-size";
import Link from "next/link";
import { useEffect } from "react";
import FadeIn from "react-fade-in";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'


export default function BlogHeader({ post }: { post: Blog | Project }) {

  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Edmonton", // Calgary timezone
    month: "short",
    year: "numeric",
    day: "2-digit",
  });

  return (
    <div className="px-5 w-full max-w-[calc(100dvh*(5/4))] mx-auto">
      <div className="flex justify-between py-3 items-center">
        <p className="flex-nowrap pr-3 font-semibold sm:text-base">
          DYLANBORCHERT
        </p>
        <div className="*:mx-1 flex-wrap w-fit flex-col sm:block hidden md:flex-row">
          <Link href='/' className="cursor-pointer underline text-sm">HOME</Link>
        </div>
      </div>
      <div className="w-full relative dark:bg-black bg-white rounded-2xl px-5 border">
        <div className="z-10 relative">
          <FadeIn className="w-full">
            <AutoTextSize
              maxFontSizePx={1000}
              minFontSizePx={80}
              mode="multiline"
              className="font-bold antialiased text-transparent bg-clip-text text-center bg-gradient-to-r from-palette-lightVibrant via-palette-vibrant to-palette-darkVibrant bg-cover bg-center bg-fixed"
            >
              {post.title}
            </AutoTextSize>
          </FadeIn>
          <FadeIn className="w-full" delay={250}>
            <AutoTextSize
              maxFontSizePx={400}
              minFontSizePx={14}
              mode="multiline"
              className="font-bold antialiased bg-clip-text font-center text-center"
            >
              {post.description}
            </AutoTextSize>
          </FadeIn>
          <FadeIn delay={500}>
            <div className="w-full py-3 flex justify-center items-center gap-2">
              <span className="text-center dark:text-palette-lightMuted text-palette-darkMuted">{`${Math.ceil(post.minute_read ?? 0)} min read`}</span>
              <div className="w-1 h-1 dark:bg-palette-lightMuted bg-palette-darkMuted rounded-full"></div>
              <span className="text-center dark:text-palette-lightMuted text-palette-darkMuted">{formatter.format(new Date(post.createdAt))}</span>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>

  );
}