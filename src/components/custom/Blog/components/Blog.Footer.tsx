'use client'
import { Blog } from "#/payload/payload-types";
import TimeAgo from "javascript-time-ago";
import Footer from "../../Footer";
import en from "javascript-time-ago/locale/en";


export default function BlogFooter({ blog }: { blog: Blog }) {

    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')

    return (
        <div className="">
            <p className="text-right text-muted-foreground px-5 font-mono text-sm">
                {`Amended ${timeAgo.format(new Date(blog.updatedAt))}`}
            </p>
            <Footer />
        </div>
    )
}