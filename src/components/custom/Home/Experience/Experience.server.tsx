'use server'

import ExperienceClient from "./ExperienceList.client"
import { Suspense } from "react";
import { CMS } from "#/utils/cms.server";

export default async function ExperienceServer() {

    const experience = await CMS.getExperience();
    const resumeUrl = await CMS.getResumeURL();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ExperienceClient experience={experience} resumeUrl={resumeUrl || ''} />
        </Suspense>
    )
}