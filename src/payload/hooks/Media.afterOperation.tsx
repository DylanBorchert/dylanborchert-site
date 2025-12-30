import { Vibrant } from "node-vibrant/node";
import { RGB, rgb2oklch } from "colorizr";


export const MediaAfterOperation: any = [
    async ({ result, operation, req, args }: any) => {
        if (
            result.url &&
            (operation === "create" ||
                operation === "findByID" ||
                operation === "update")
        ) {
            const host = req.origin;
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
                    const textForeground: RGB =
                        prominentLightness < 0.5
                            ? { r: 255, g: 255, b: 255 }
                            : { r: 0, g: 0, b: 0 };
                    const textBackground: RGB =
                        prominentLightness >= 0.5
                            ? { r: 255, g: 255, b: 255 }
                            : { r: 0, g: 0, b: 0 };
                    const colorPalette = {
                        Muted: palette.Muted
                            ? rgb2oklch(palette.Muted.rgb)
                            : null,
                        Vibrant: palette.Vibrant
                            ? rgb2oklch(palette.Vibrant.rgb)
                            : null,
                        DarkMuted: palette.DarkMuted
                            ? rgb2oklch(palette.DarkMuted.rgb)
                            : null,
                        LightMuted: palette.LightMuted
                            ? rgb2oklch(palette.LightMuted.rgb)
                            : null,
                        DarkVibrant: palette.DarkVibrant
                            ? rgb2oklch(palette.DarkVibrant.rgb)
                            : null,
                        LightVibrant: palette.LightVibrant
                            ? rgb2oklch(palette.LightVibrant.rgb)
                            : null,
                        TextForeground: rgb2oklch(textForeground),
                        TextBackground: rgb2oklch(textBackground),
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
    }
]