import { CollectionConfig } from "payload";
import {
	HTMLConverterFeature,
	lexicalEditor,
	lexicalHTML,
} from "@payloadcms/richtext-lexical";
import slugify from "slugify";

export const Blogs: CollectionConfig = {
	slug: "blogs",
	admin: {
		useAsTitle: "slug",
	},
	fields: [
		{
			name: "title",
			label: "Title",
			type: "text",
		},
		{
			name: "description",
			label: "Description",
			type: "text",
		},
		{
			name: "slug",
			label: "Slug",
			type: "text",
			unique: true,
			admin: {
				readOnly: true,
			},
		},
		{
			name: "minute_read",
			label: "Minute Read",
			type: "number",
			admin: {
				readOnly: true,
			},
		},
		{
			name: "tags",
			label: "Tags",
			type: "relationship",
			relationTo: "tags",
			hasMany: true,
		},
		{
			name: "content",
			type: "richText",
			label: "Content",
			editor: lexicalEditor({
				features: ({ defaultFeatures }) => [
					...defaultFeatures,
					HTMLConverterFeature({}),
				],
			}),
			required: true,
			localized: true,
			admin: {
				width: "100%",
			},
		},
		lexicalHTML("content", { name: "content_html" }),
	],
	hooks: {
		beforeChange: [
			async ({ operation, req, data }) => {
				if (operation === "create" || operation === "update") {
					// Generate a slugified UUID from the title
					const slugBase = slugify(data.title || "", {
						lower: true,
						strict: true,
					});
					data.slug = `${slugBase}`;
				}
			},
		],
		afterChange: [
			async ({ operation, doc }) => {
				if (operation === "create" || operation === "update") {
					if (doc?.content_html) {
						// Convert content_html to minute_read
						const content = doc?.content_html?.replace(
							/&[a-zA-Z]+;|<[^>]*>?/gm,
							" "
						);
						const words = content.split(" ");
						console.log("Blog words", words.length);
						const minute_read =
							Math.round(
								(words.length / 200 + Number.EPSILON) * 100
							) / 100;
						doc.minute_read = minute_read;
					}
				}
			},
		],
	},
};
