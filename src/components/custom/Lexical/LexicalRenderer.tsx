'use client'
import { defaultElementRenderers, PayloadLexicalReactRenderer, PayloadLexicalReactRendererContent } from "@atelier-disko/payload-lexical-react-renderer";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { HashIcon } from "lucide-react";
import slugify from "slugify";
import { useEffect, useMemo } from "react";
import { toast } from "sonner"
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Blog, Project } from "#/payload/payload-types";
import classNames from "classnames";



export default function LexicalRenderer({ content }: { content: Blog | Project }) {
    const pathname = usePathname();
    const { systemTheme, theme } = useTheme();

    const updatedTheme = useMemo(() => {
        if (theme === 'system') {
            return systemTheme;
        } else {
            return theme;
        }
    }, [systemTheme, theme])

    useEffect(() => {
        const header = window?.location?.hash;
        if (!header) return;
        const content = document.querySelector(header);
        if (content) {
            content.scrollIntoView({
                block: "start",
                inline: "start",
                behavior: "instant"
            });
        }
    }, [pathname]);

    return (
        <PayloadLexicalReactRenderer
            key={content.id}
            content={content.content as PayloadLexicalReactRendererContent}
            elementRenderers={{
                ...defaultElementRenderers,
                heading: (props) => {
                    const Component = props.tag as React.ElementType;
                    const slug = slugify(
                        Array.isArray(props.children) && props.children[0]?.props?.children?.props?.children || '',
                        { lower: true }
                    );
                    const createLink = () => {
                        window.location.hash = slug;
                        navigator.clipboard.writeText(`${window.location.origin}${pathname}#${slug}`);
                        toast("Link Copied", { description: "The link to this section has been copied to your clipboard." });
                    }
                    return (
                        <div className={classNames('flex items-center justify-start gap-2 w-fit h-fit relative group', {
                            'post-heading': props.tag === 'h1'
                        })} id={`${slug}`}>
                            <HashIcon className="dark:text-palette-lightMuted/50 text-palette-darkMuted/50  group-hover:dark:text-palette-lightMuted group-hover:text-palette-darkMuted h-10 w-10 transition delay-200 ease-in cursor-pointer absolute -left-10 p-2" onClick={() => createLink()} />
                            <Component>{props.children}</Component>
                        </div>
                    );
                }
            }}
            blockRenderers={{
                // Code: (props) => {
                //     const { code, language, blockName } = props.fields

                //     return (
                //         <div className='relative'>
                //             <div className="absolute right-0 group code-copy w-full flex justify-between py-2 border-b border-black/15 dark:border-white/15 px-4">
                //                 <span className="text-sm">{blockName}</span>
                //                 <span className="text-sm">{language}</span>
                //             </div>
                //             <SyntaxHighlighter
                //                 className={"rounded-md outline-none pt-20 code-block"}
                //                 style={updatedTheme === "dark" ? vscDarkPlus : vs}
                //                 data-start-line={1}
                //                 language={language}
                //                 PreTag="div"
                //                 codeTagProps={{ style: { fontFamily: 'inherit' } }}
                //             >
                //                 {String(code).replace(/\n$/, "")}
                //             </SyntaxHighlighter>
                //         </div>
                //     )
                // },
            }}
        />
    )
}