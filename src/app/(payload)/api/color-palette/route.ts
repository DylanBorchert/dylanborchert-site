import { Media } from "#/payload/payload-types";
import configPromise from "@payload-config";
import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";

export const GET = async (req: NextRequest) => {
	try {
		const query = req.nextUrl.searchParams.get("theme");
		const payload = await getPayload({ config: configPromise });

		const data = await payload.findGlobal({ slug: "home" });
		const imageConfig = data?.["Hero Image"];

		const imageMode = imageConfig.imageMode;
		const darkImage = imageConfig.darkImage as Media;
		const lightImage = imageConfig.lightImage as Media;
		const generalImage = imageConfig.generalImage as Media;

		let colorPalette = generalImage?.colorPalette as Object;

		if (imageMode === "theme") {
			if (query === "dark") {
				colorPalette = darkImage?.colorPalette || "";
			} else if (query === "light") {
				colorPalette = lightImage?.colorPalette || "";
			} else {
				colorPalette = generalImage?.colorPalette || "";
			}
		}

		// Generate an ETag based on the content
		if (
			!colorPalette ||
			(typeof colorPalette === "object" &&
				Object.keys(colorPalette).length === 0)
		) {
			return NextResponse.json(
				{
					message: "Color palette not found",
				},
				{
					status: 500,
				}
			);
		}

		const etag = `"${Buffer.from(JSON.stringify(colorPalette)).toString("base64").slice(0, 32)}"`;

		// Check if the client has the latest version of the resource
		const clientETag = req.headers.get("If-None-Match");
		if (clientETag === etag) {
			return new NextResponse(null, {
				status: 304,
			});
		}

		return NextResponse.json(colorPalette, {
			headers: {
				ETag: etag,
				"Cache-Control": "public, must-revalidate",
			},
		});
	} catch (error) {
		console.error("Error fetching color palette:", error);
		return NextResponse.json(
			{ message: "Internal Server Error", error: error },
			{
				status: 500,
			}
		);
	}
};
