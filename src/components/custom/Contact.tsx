'use client';
import React, { useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "#/components/ui/sheet";
import { toast } from "sonner"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "#/components/ui/form";
import { Input } from "#/components/ui/input";
import { Textarea } from "#/components/ui/textarea";
import { Button } from "#/components/ui/button";
import sendEmail from '#/hooks/send-email';
import { useContactSheet } from '#/context/ContactSheet.context';


const formSchema = z.object({
    name: z.string().min(4, { message: "Name must be at least 4 characters." }).max(255, { message: "Name must be at most 255 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(255, { message: "Message must be at most 255 characters." }),
});

export const ContactClient = () => {
    const { isSheetOpen, openSheet, closeSheet } = useContactSheet();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { name: "", email: "", message: "" },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        sendEmail(values)
            .then(() => {
                toast("Message Sent", { description: "I will get back to you soon." });
            })
            .catch(() => {
                toast("Error", { description: "An error occurred. Please try again." });
            });
        closeSheet();
    }

    useEffect(() => {
        if (isSheetOpen) {
            form.reset();
        }
    }, [form, isSheetOpen]);

    return (
        <Sheet open={isSheetOpen} onOpenChange={(open) => open ? openSheet() : closeSheet()}>
            <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle>Contact Me</SheetTitle>
                    <SheetDescription>Send me a message</SheetDescription>
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
                                        <Textarea placeholder="Message" className="min-h-[80px]" {...field} />
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
    );
};
