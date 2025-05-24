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
							const prominentColor = Object.values(
								palette
							).reduce((acc, curr) => {
								if (!curr) return acc;
								if (!acc) return curr;
								return curr.population > acc.population
									? curr
									: acc;
							}, null);
							if (!prominentColor) {
								console.log(
									"[Media] No prominent color found, skipping vibrant color"
								);
								return;
							}
							const prominentLightness =
								prominentColor.hsl[2] + 0.05;
							const textForeground =
								prominentLightness < 0.5
									? [0, 0, 1]
									: [0, 0, 0];
							const textBackground =
								prominentLightness >= 0.5
									? [0, 0, 1]
									: [0, 0, 0];
							const colorPalette = {
								Muted: palette.Muted?.hsl,
								Vibrant: palette.Vibrant?.hsl,
								DarkMuted: palette.DarkMuted?.hsl,
								LightMuted: palette.LightMuted?.hsl,
								DarkVibrant: palette.DarkVibrant?.hsl,
								LightVibrant: palette.LightVibrant?.hsl,
								TextForeground: textForeground,
								TextBackground: textBackground,
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
