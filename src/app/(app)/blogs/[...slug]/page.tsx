'use server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import parse from 'html-react-parser';


export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const slug = (await params).slug[0]
    const payload = await getPayloadHMR({ config })

    const result = await payload.find({
        collection: 'blogs',
        where: {
            slug: { equals: slug }
        },
    });

    if (!result.docs[0]) {
        return null;
    }

    const blog = result.docs[0];

    console.log(blog);

    return (
        <>
            <p>{slug}</p>
            {parse(blog.content_html)}
        </>
    )
}
