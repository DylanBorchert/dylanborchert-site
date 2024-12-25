'use client'
import { Blog } from "#/payload/payload-types";
import { AutoTextSize } from "auto-text-size";


export default function BlogHeader({ blog }: { blog: Blog }) {


    return (
        <div className="w-full p-5 rounded-b-2xl h-fit border-b border-x dark:bg-black bg-white pb-10">
            <p>
                {blog.title}
            </p>
        </div >
    )
}