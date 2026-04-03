import type { CollectionConfig } from "payload";
import { MediaAfterOperation } from "../hooks/Media.afterOperation";

export const Media: CollectionConfig = {
	slug: "media",
	access: {
		read: () => true,
	},
	admin: {
		useAsTitle: "alt",
		defaultColumns: ["_thumbnail", "file-name", "alt", "colorPalette"],
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
						readOnly: true,
						components: {
							Field: "@/payload/components/colorPalette/ColorPaletteField",
							Cell: "@/payload/components/colorPalette/ColorPaletteCell",
						},
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
