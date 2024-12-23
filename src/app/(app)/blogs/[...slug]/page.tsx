'use server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import {
  PayloadLexicalReactRenderer,
  PayloadLexicalReactRendererProps,
  PayloadLexicalReactRendererContent,
  defaultElementRenderers,
} from "@atelier-disko/payload-lexical-react-renderer";
import Footer from "#/components/custom/Footer";
import UpScrollButton from "#/components/custom/UpScrollButton";
import { ContactClient } from "#/components/custom/Contact";
import "#/components/custom/Lexical/Lexical.css";
import Blog from "#/components/custom/Blog/Blog";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug[0];
  const payload = await getPayloadHMR({ config });

  const result = await payload.find({
    collection: "blogs",
    where: {
      slug: { equals: slug },
    },
  });

  if (!result.docs[0]) {
    return (
      <div className="mx-auto w-fit debug">
        <p>Content not found</p>
        <p>404</p>
        <div className="">
          <Blog>
            <Blog.NotFound />
          </Blog>
        </div>
      </div>
    );
  }

  const blog = result.docs[0].content;

  return (
    <div className="flex flex-col justify-between max-w-[calc(100dvh*(4/3))] mx-auto min-h-[100dvh]">
      {/* Blog Header 'client' pass content??*/}
      <div className="lexical">
        <PayloadLexicalReactRenderer
          content={blog}
          elementRenderers={{
            ...defaultElementRenderers,
          }}
        />
      </div>
      <Footer />
      <UpScrollButton />
      <ContactClient />
    </div>
  );
}
