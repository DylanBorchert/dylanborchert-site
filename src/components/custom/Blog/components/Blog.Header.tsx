'use client'
import { Blog } from "#/payload/payload-types";
import { AutoTextSize } from "auto-text-size";
import FadeIn from "react-fade-in";


export default function BlogHeader({ blog }: { blog: Blog }) {


  return (
    <div className="w-full">
      <FadeIn className="w-full">
        <AutoTextSize
          maxFontSizePx={1000}
          as="span"
          className="font-bold antialiased bg-clip-text"
        >
          {blog.title}
        </AutoTextSize>
      </FadeIn>
    </div>

  );
}