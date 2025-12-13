'use server'

import { notFound } from 'next/navigation'
import config from '@payload-config'
import UpScrollButton from "#/components/custom/UpScrollButton";
import { ContactClient } from "#/components/custom/Contact";
import "#/components/custom/Lexical/Lexical.css";
import { getPayload } from 'payload';
import { Metadata, ResolvingMetadata } from 'next';
import Post from '#/components/custom/Post/Post';

type urlParams = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params, searchParams }: urlParams,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const slug = (await params).slug[0];
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "blogs",
    where: {
      slug: { equals: slug },
    },
  });

  return {
    title: result.docs[0].title,
    description: result.docs[0].description,
  }
}
export default async function Page({ params, searchParams }: urlParams) {
  const slug = (await params).slug[0];
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "blogs",
    showHiddenFields: true,
    where: {
      slug: { equals: slug },
    },
  });


  if (result.totalDocs !== 1) return notFound();
  const blog = result.docs[0];

  return (
    <div className="flex flex-col justify-between">
      <Post>
        <Post.Header post={blog} />
        <Post.Content post={blog} />
        <Post.Footer post={blog} />
      </Post>
      <UpScrollButton />
      <ContactClient />
    </div>
  );
}
