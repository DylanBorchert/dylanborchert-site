'use client'
import { Blog } from "#/payload/payload-types";
import { defaultElementRenderers, PayloadLexicalReactRenderer, PayloadLexicalReactRendererContent } from "@atelier-disko/payload-lexical-react-renderer";
import { AutoTextSize } from "auto-text-size";


export default function BlogContent({ blog }: { blog: Blog }) {
  return (
    <div className="px-5 flex-grow">
      <div className="lexical">
        <PayloadLexicalReactRenderer
          content={blog.content as PayloadLexicalReactRendererContent}
          elementRenderers={{
            ...defaultElementRenderers,
          }}
        />
      </div>
    </div>
  );
}