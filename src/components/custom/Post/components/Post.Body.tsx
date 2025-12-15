`use client`
import { Blog, Project } from "#/payload/payload-types";
import LexicalRenderer from "../../Lexical/LexicalRenderer";

export default function PostContent({ post }: { post: Blog | Project }) {
    return (
      <div className="px-10 lexical max-w-[calc(100dvh*(5/4))] w-full z-10">
        <LexicalRenderer content={post} />
      </div>
    );
}