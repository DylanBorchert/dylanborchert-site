import { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
	slug: "projects",
	fields: [
		{
			name: "title",
			label: "Title",
			type: "text",
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
			label: "Content",
			type: "richText",
		},
	],
};
