'use client'
import { Blog, Project } from "#/payload/payload-types";
import TimeAgo from "javascript-time-ago";
import Footer from "../../Footer";
import en from "javascript-time-ago/locale/en";
import { Rss } from "lucide-react";


export default function PostFooter({ post }: { post: Blog | Project }) {

    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')

    return (
      <div className=" w-full px-5 max-w-dvh mx-auto z-10">
        <div className="px-5 flex items-center justify-between pb-1">
          <p className="dark:text-palette-lightMuted text-palette-darkMuted font-mono text-sm">
            {`Last updated ${timeAgo.format(new Date(post.updatedAt))}`}
          </p>
          {/* <Rss
            className="dark:text-palette-lightMuted/50 text-palette-darkMuted/50 hover:dark:text-palette-lightMuted hover:text-palette-darkMuted h-4 w-4 transition delay-200 ease-in cursor-pointer"
            onClick={() => alert("rss feed coming soon")}
          /> */}
        </div>
        <Footer />
      </div>
    );
}