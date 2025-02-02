'use client'
import { Blog } from "#/payload/payload-types";
import { AutoTextSize } from "auto-text-size";
import { useEffect } from "react";
import FadeIn from "react-fade-in";


export default function BlogHeader({ blog }: { blog: Blog }) {

  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Edmonton", // Calgary timezone
    month: "2-digit",
    year: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "numeric",
    timeZoneName: "short",
    hour12: false,
  });

  useEffect(() => {
    console.log('blog', blog);
  }, [blog]);


  return (
    <div className="w-full max-h-[100dvh] border-b-2">
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
      <FadeIn className="w-full">
        <AutoTextSize
          maxFontSizePx={100}
          minFontSizePx={14}
          mode="multiline"
          className="font-bold antialiased bg-clip-text font-center text-center"
        >
          {blog.description}
        </AutoTextSize>
      </FadeIn>
      <FadeIn className="w-full py-3 flex justify-between">
        <span className="text-center text-palette-lightMuted">{formatter.format(new Date(blog.createdAt))}</span>
        <div>
          <span className="text-center text-palette-lightMuted font-bold">{`${blog.minute_read && blog.minute_read < 1 ? "< 1" : Math.ceil(blog.minute_read ?? 0)}`}</span><span className="text-center text-palette-lightMuted font-light"> min read</span>
        </div>
      </FadeIn>
    </div>

  );
}