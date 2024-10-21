import path from "path";
import type { CollectionConfig } from "payload";
import Vibrant from "node-vibrant";

export const Media: CollectionConfig = {
	slug: "media",
	access: {
		read: () => true,
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
					name: "prominentColor",
					type: "text",
					required: false,
					admin: {
						readOnly: true,
					},
				},
			],
		},
	],
	upload: true,
	hooks: {
		afterOperation: [
			async ({ result, operation, req, args }) => {
				if (
					result.url &&
					(operation === "create" || operation === "findByID")
				) {
					try {
						const imagePath = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}${result.url}`;
						const palette =
							await Vibrant.from(imagePath).getPalette();
						const vibrantColor = palette.Vibrant?.hex || "#000000";
						await req.payload.update({
							collection: "media",
							id: result.id,
							data: {
								prominentColor: vibrantColor,
							},
						});
					} catch (error) {
						console.error("Error getting vibrant color", error);
					}
				}
			},
		],
	},
};
