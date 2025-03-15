import { Media } from "#/payload/payload-types";
import configPromise from "@payload-config";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";

export const GET = async (req: NextRequest) => {
	const query = req.nextUrl.searchParams.get("theme");
	const payload = await getPayload({ config: configPromise });
	const isIphone = (await headers()).get("user-agent")?.includes("iPhone");

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
};
