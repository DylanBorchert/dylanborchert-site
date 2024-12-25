'use client'
import { Blog } from "#/payload/payload-types";
import Footer from "../../Footer";


export default function BlogFooter({ blog }: { blog: Blog }) {

    const formatter = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Edmonton", // Calgary timezone
        month: "short",
        year: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
    });

    return (
        <div className="">
            <p className="text-right text-muted-foreground px-5 font-mono text-sm">
                <span>Last updated: </span>{formatter.format(new Date(blog.updatedAt))}
            </p>
            <Footer />
        </div>
    )
}