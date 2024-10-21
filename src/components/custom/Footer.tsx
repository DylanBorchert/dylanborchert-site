"use client"

import { EyeIcon, Pen } from "lucide-react"
import Link from "next/link"



export default function Footer(props: any) {


    return (
        <div className="w-full p-5 flex justify-center relative">
            <div className="relative w-full">
                <Link href="admin" className="absolute right-0 bottom-0 text-xs text-muted">admin</Link>
                <div className="h-full flex flex-col justify-center">
                    <div className="font-thin text-xs text-center">
                        <p className="text-muted-foreground py-2 hidden md:block">
                            This site is developed in Next.js with Tailwind CSS and Payload CMS.
                        </p>
                        <span className="pr-[4px]">
                            © 2024 All rights reserved
                        </span>
                        <span className="hidden md:inline">

                            - Desinged and Developed by Dylan Borchert
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )

}

