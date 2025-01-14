'use client'
import { Blog } from "#/payload/payload-types";
import { AutoTextSize } from "auto-text-size";
import FadeIn from "react-fade-in";


export default function BlogHeader({ blog }: { blog: Blog }) {

  console.log(blog)

  return (
    <div className="w-full max-h-[100dvh]">
      <FadeIn className="w-full">
        <AutoTextSize
          maxFontSizePx={1000}
          minFontSizePx={80}
          mode="multiline"
          className="font-bold antialiased text-transparent bg-clip-text font-center bg-gradient-to-r from-palette-lightVibrant via-palette-vibrant to-palette-darkVibrant bg-cover bg-center bg-fixed text-center"
        >
          {blog.title}
        </AutoTextSize>
      </FadeIn>
      <FadeIn className="w-full py-3 flex justify-between">
        <span className="text-center text-palette-lightMuted">{`${blog.minute_read && blog.minute_read < 1 ? "< 1" : Math.ceil(blog.minute_read ?? 0)} min read`}</span>
      </FadeIn>
    </div>

  );
}