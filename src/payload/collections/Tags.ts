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
			validate: (value) => {
				if (!value) {
					return "Name is required.";
				}
				return true;
			},
			unique: true,
			index: true,
			maxLength: 20,
			admin: {
				width: "25%",
			},
		},
	],
};
