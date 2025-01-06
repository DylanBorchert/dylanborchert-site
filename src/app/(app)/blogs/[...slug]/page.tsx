'use server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { notFound } from 'next/navigation'
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
import { AutoTextSize } from 'auto-text-size';

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
    return notFound();
  }

  const blog = result.docs[0];

  return (
    <div className="flex flex-col justify-between max-w-[calc(100dvh*(4/3))] mx-auto">
      <Blog>
        <Blog.Header blog={blog} />
        <Blog.Content blog={blog} />
        <Blog.Footer blog={blog} />
      </Blog>
      <UpScrollButton />
      <ContactClient />
    </div>
  );
}
