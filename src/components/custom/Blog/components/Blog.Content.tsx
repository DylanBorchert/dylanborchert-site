'use client'
import { useToast } from "#/hooks/use-toast";
import { Blog } from "#/payload/payload-types";
import { defaultElementRenderers, PayloadLexicalReactRenderer, PayloadLexicalReactRendererContent } from "@atelier-disko/payload-lexical-react-renderer";
import { Link } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import slugify from "slugify";


export default function BlogContent({ blog }: { blog: Blog }) {
  const { toast } = useToast();
  const pathname = usePathname();
  const searchParams = useSearchParams()

  useEffect(() => {
    const header = searchParams.get('header')
    const content = document.querySelector(`#${header}`);
    if (content) {
      content.scrollIntoView({
        block: "start",
        inline: "start",
        behavior: "instant"
      });
    }
  }, [searchParams]);


  return (
    <div className="px-5 flex-grow">
      <div className="lexical">
        <PayloadLexicalReactRenderer
          content={blog.content as PayloadLexicalReactRendererContent}
          elementRenderers={{
            ...defaultElementRenderers,
            heading: (props) => {
              const Component = props.tag as React.ElementType;
              const slug = slugify(
                Array.isArray(props.children) && props.children[0]?.props?.children?.props?.children || '',
                { lower: true }
              );
              const createLink = () => {
                navigator.clipboard.writeText(`${window.location.origin}${pathname}?header=${slug}`);
                toast({ title: "Link Copied", description: "The link to this section has been copied to your clipboard." });
              }
              return (
                <div className="flex items-center justify-start gap-5 w-fit h-fit" id={`${slug}`}>
                  <Component>{props.children}</Component>
                  <Link className="text-palette-muted/50 h-6 w-6 hover:text-palette-muted/100 transition delay-200 ease-in-out cursor-pointer" onClick={() => createLink()} />
                </div>
              );
            }
          }}
        />
      </div>
    </div>
  );
}