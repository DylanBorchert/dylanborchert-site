'use client';

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "#/components/ui/alert"
import { Info } from "lucide-react";


export default function Projects() {
    return (
        <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Projects & Blogs</AlertTitle>
            <AlertDescription>
                Coming soon.
            </AlertDescription>
        </Alert>
    );
}


