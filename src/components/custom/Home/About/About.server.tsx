'use server'

import { Suspense } from "react";
import { CMS } from "#/utils/cms.server";
import AboutClient from "./About.client";
import SuspenseAbout from "./SuspenseAbout.client";

export default async function AboutServer() {

    const home = await CMS.getHome()

    return (
        <Suspense fallback={<SuspenseAbout />}>
            <AboutClient home={home} />
        </Suspense>
    )
}