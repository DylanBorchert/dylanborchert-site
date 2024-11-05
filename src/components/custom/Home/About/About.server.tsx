'use server'

import { Suspense } from "react";
import { CMS } from "#/utils/cms.server";
import AboutClient from "./About.client";

export default async function AboutServer() {

    const home = await CMS.getHome()

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AboutClient home={home} />
        </Suspense>
    )
}