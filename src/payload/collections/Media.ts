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
						hidden: true,
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
					if (result.mimeType.includes("image")) {
						//No webp support https://github.com/Vibrant-Colors/node-vibrant/issues/44
						if (result.mimeType.includes("webp")) {
							console.log(
								"[Media] Skipping vibrant color for webp"
							);
							return;
						}
						try {
							const imagePath = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}${result.url}`;
							const palette =
								await Vibrant.from(imagePath).getPalette();
							const vibrantColor =
								palette.Vibrant?.hex || "#000000";
							await req.payload.update({
								collection: "media",
								showHiddenFields: true,
								id: result.id,
								data: {
									prominentColor: vibrantColor,
								},
							});
							console.log(
								"[Media] Vibrant color set to",
								vibrantColor
							);
						} catch (error) {
							console.error(
								"[Media] Error getting vibrant color",
								error
							);
						}
					} else {
						console.log(
							"[Media] Not an image, skipping vibrant color"
						);
					}
				}
			},
		],
	},
};
