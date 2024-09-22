

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,

} from "#/components/ui/sheet"
import { ArrowRight } from "lucide-react"


export const HeroContact = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <div className="flex justify-end items-center group/talk cursor-pointer pl-3 text-right text-xs">
                    <ArrowRight className="h-4 w-4 mr-2 text-muted-foreground group-hover/talk:translate-x-[6px] group-hover/talk:text-foreground group-hover/talk:scale-125 transition duration-200 ease-in" />
                    <p className="font-semibold text-nowrap">
                        LET&#39;S TALK
                    </p>
                </div>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle>Contact Me</SheetTitle>
                    <SheetDescription>
                        Send me a message
                    </SheetDescription>
                </SheetHeader>
                <>
                    test
                </>
                <SheetFooter>
                    <SheetClose>Close</SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}