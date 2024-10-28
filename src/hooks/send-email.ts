"use server";

import { z } from "zod";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";

const formSchema = z.object({
	name: z
		.string()
		.min(4, {
			message: "Name must be at least 4 characters.",
		})
		.max(255, {
			message: "Name must be at most 255 characters.",
		}),
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	message: z
		.string()
		.min(10, {
			message: "Message must be at least 10 characters.",
		})
		.max(255, {
			message: "Message must be at most 255 characters.",
		}),
});

export default async function sendEmail(values: z.infer<typeof formSchema>) {
	const payload = await getPayloadHMR({ config });

	const { email, name, message } = values;

	await payload.sendEmail({
		to: process.env.SEND_EMAIL,
		from: process.env.FROM_EMAIL,
		subject: `Message from ${name} (${email})`,
		text: message,
	});
}
