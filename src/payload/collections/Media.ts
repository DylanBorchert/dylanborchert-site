import type { CollectionConfig } from "payload";
import { MediaAfterOperation } from "../hooks/Media.afterOperation";

export const Media: CollectionConfig = {
	slug: "media",
	access: {
		read: () => true,
	},
	admin: {
		useAsTitle: "alt",
		defaultColumns: ["file-name", "alt"],
	},
	fields: [
		{
			type: "row",
			fields: [
				{
					name: "alt",
					type: "text",
					required: true,
				},
				{
					name: "colorPalette",
					type: "json",
					required: false,
					defaultValue: {},
					admin: {
						hidden: true,
						readOnly: true,
					},
				},
			],
		},
	],
	upload: true,
	hooks: {
		afterOperation: MediaAfterOperation,
	},
};
