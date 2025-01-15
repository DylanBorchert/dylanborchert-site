import type { CollectionConfig } from "payload";
import { Vibrant } from "node-vibrant/node";

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
		afterOperation: [
			async ({ result, operation, req, args }) => {
				if (
					result.url &&
					(operation === "create" ||
						operation === "findByID" ||
						operation === "update")
				) {
					const host = req.origin?.includes("localhost")
						? "http://localhost:3000"
						: req.origin;
					if (result.mimeType.includes("image")) {
						//No webp support https://github.com/Vibrant-Colors/node-vibrant/issues/44
						if (result.mimeType.includes("webp")) {
							console.log(
								"[Media] Skipping vibrant color for webp"
							);
							return;
						}
						try {
							const imagePath = `${host}${result.url}`;
							const palette =
								await Vibrant.from(imagePath).getPalette();
							const [r, g, b] = Object.values(palette).reduce(
								(acc, curr) => {
									if (!curr) return acc;
									return curr.population > acc[1]
										? [
												curr.rgb[0],
												curr.rgb[1],
												curr.rgb[2],
											]
										: acc;
								},
								[0, 0, 0]
							) as [number, number, number];
							const textForeground =
								r * 0.299 + g * 0.587 + b * 0.114 > 186
									? "#000"
									: "#fff";
							const colorPalette = {
								Muted: palette.Muted?.hex,
								Vibrant: palette.Vibrant?.hex,
								DarkMuted: palette.DarkMuted?.hex,
								LightMuted: palette.LightMuted?.hex,
								DarkVibrant: palette.DarkVibrant?.hex,
								LightVibrant: palette.LightVibrant?.hex,
								TextForeground: textForeground,
							};
							await req.payload.update({
								collection: "media",
								showHiddenFields: true,
								id: result.id,
								data: {
									colorPalette: colorPalette,
								},
							});
							console.log(
								"[Media] Color Palette Set",
								colorPalette
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
