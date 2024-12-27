'use client'
import { Blog } from "#/payload/payload-types";
import { AutoTextSize } from "auto-text-size";


export default function BlogHeader({ blog }: { blog: Blog }) {


    return (
      <div className=" w-full bg-hero-parallax-light dark:bg-hero-parallax-dark h-[50dvh] rounded-md my-5 bg-cover bg-center bg-fixed backdrop-blur-xl">
        <p>{blog.title}</p>
      </div>
    );
}