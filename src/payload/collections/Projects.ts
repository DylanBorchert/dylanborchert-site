import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { CollectionConfig } from "payload";
import slugify from "slugify";

export const Projects: CollectionConfig = {
	slug: "projects",
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
			name: "tags",
			label: "Tags",
			type: "relationship",
			relationTo: "tags",
			hasMany: true,
		},
		{
			name: "minute_read",
			label: "Minute Read",
			type: "number",
			admin: {
				readOnly: true,
				width: "25%",
			},
		},
		{
			name: "content",
			type: "richText",
			editor: lexicalEditor({
				features: ({ defaultFeatures, rootFeatures }) => [
					...defaultFeatures,
					...rootFeatures,
				],
			}),
		},
	],
	hooks: {
		beforeChange: [
			async ({ data }) => {
				try {
					const slug = slugify(data.title || "", {
						lower: true,
						strict: true,
					});
					data.slug = slug;
					return data;
				} catch (error) {
					console.error("Error in slug hook", error);
				}
			},
		],
	},
};
