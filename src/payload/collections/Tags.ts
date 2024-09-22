import type { CollectionConfig } from "payload";

export const Tags: CollectionConfig = {
	slug: "tags",
	admin: {
		useAsTitle: "name",
	},
	fields: [
		{
			name: "name",
			label: "name",
			type: "text",
			unique: true,
			index: true,
			maxLength: 20,
			admin: {
				width: "25%",
			},
		},
	],
};
