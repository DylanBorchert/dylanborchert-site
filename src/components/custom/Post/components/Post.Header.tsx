"use client";
import { Blog, Project } from "#/payload/payload-types";
import { LiquidGlassFilters } from "@gracefullight/liquid-glass";
import Link from "next/link";
import FadeIn from "react-fade-in";

export default function BlogHeader({ post }: { post: Blog | Project }) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Edmonton", // Calgary timezone
    month: "short",
    year: "numeric",
    day: "2-digit",
  });

  return (
    <div className="w-full max-w-dvh mx-auto z-10 md:h-[50dvh] h-dvh flex flex-col">
      <div className="flex p-3 items-center gap-3 justify-between m-3">
        <p className="flex-nowrap font-semibold sm:text-base">
          <Link href="/" className="cursor-pointer text-md">
            DYLANBORCHERT
          </Link>
        </p>
        <div className="*:mx-1 flex-wrap w-fit flex-col sm:block md:flex-row items-center">
          <Link href="/blogs" className="cursor-pointer underline text-sm mr-2">
            BLOGS
          </Link>
          <Link href="/projects" className="cursor-pointer underline text-sm">
            PROJECTS
          </Link>
        </div>
      </div>
      <div className="rounded-2xl h-full mx-3 p-5 flex flex-col justify-end bg-center bg-cover bg-hero-parallax">
        <div className="z-10 relative w-full p-3 rounded-2xl text-palette-text">
          <LiquidGlassFilters />
          <FadeIn className="font-bold font-center text-7xl mb-5">
            {post.title}
          </FadeIn>
          <FadeIn className="font-semibold" delay={250}>
            {post.description}
          </FadeIn>
          <FadeIn delay={500}>
            <div className="flex flex-wrap my-1 gap-2 py-3">
              {post["tags"]?.map((tag: any) => (
                <div
                  key={tag.id}
                  className="w-fit rounded-md border-2 border-palette-text/50"
                >
                  <span className="text-sm relative font-semibold w-full px-2">
                    {tag.name}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={750}>
            <div className="w-full flex justify-start items-center gap-2">
              <span className="text-center">{`${Math.ceil(post.minute_read ?? 0)} min read`}</span>
              <div className="w-1 h-1 bg-palette-text/80 rounded-full"></div>
              <span className="text-center">
                {formatter.format(new Date(post.createdAt))}
              </span>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
