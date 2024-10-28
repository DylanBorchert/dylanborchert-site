"use client";

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
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
import { useToast } from "#/hooks/use-toast"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "#/components/ui/form"
import { Input } from "#/components/ui/input"
import { Textarea } from "#/components/ui/textarea"
import { Button } from "#/components/ui/button"
import sendEmail from '#/hooks/send-email';

const formSchema = z.object({
    name: z.string().min(4, {
        message: "Name must be at least 4 characters.",
    }).max(255, {
        message: "Name must be at most 255 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    message: z.string().min(10, {
        message: "Message must be at least 10 characters.",
    }).max(255, {
        message: "Message must be at most 255 characters.",
    }),
})

export const HeroContactClient = () => {
    const { toast } = useToast()
    const [open, setOpen] = React.useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        //server function send email with payload cms
        sendEmail(values).then((res) => {
            toast({
                title: "Message Sent",
                description: "I will get back to you soon.",
            })
        }).catch((error) => {
            toast({
                title: "Error",
                description: "An error occurred. Please try again.",
            })
        });
        setOpen(false)
    }

    const handleSheetOpenChange = (isOpen: boolean) => {
        setOpen(isOpen)
        if (isOpen) {
            form.reset()
        }
    }

    return (
        <Sheet open={open} onOpenChange={handleSheetOpenChange}>
            <SheetTrigger>
                <div className="flex justify-end items-center group/talk cursor-pointer pl-3 text-right text-sm py-1">
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
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Message"
                                            className="min-h-[80px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <SheetFooter>
                            <Button type="submit">Send Message</Button>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}