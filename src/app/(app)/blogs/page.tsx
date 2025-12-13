import { ContactClient } from "#/components/custom/Contact";
import UpScrollButton from "#/components/custom/UpScrollButton";
import { getPayload } from "payload";
import config from '@payload-config'

export default async function Page() {
    const payload = await getPayload({ config });

    const result = await payload.find({
        collection: "blogs",
    });

    return (
        <div className="flex flex-col justify-between max-w-[calc(100dvh*(4/3))] mx-auto">

            <UpScrollButton />
            <ContactClient />
        </div>
    );
}