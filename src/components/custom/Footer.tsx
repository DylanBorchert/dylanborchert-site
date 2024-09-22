"use client"

import { EyeIcon, Pen } from "lucide-react"
import Link from "next/link"



export default function Footer(props: any) {


    return (
        <div className="w-full p-5 flex justify-center relative">
            <Link href="admin" className="absolute right-0 text-xs text-muted">admin</Link>
            <div className="relative">
                <div className="h-full flex flex-col justify-center">
                    <div className="font-thin text-xs text-center">
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

