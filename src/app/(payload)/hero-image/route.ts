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
	const imageConfig = isIphone ? data?.["IOS Image"] : data?.["Hero Image"];

	let imageMode: string | undefined;
	let darkImage: Media | undefined;
	let lightImage: Media | undefined;
	let generalImage: Media | undefined;

	if (isIphone && "imageModeIOS" in imageConfig) {
		imageMode = imageConfig.imageModeIOS;
		darkImage = imageConfig.darkImageIOS as Media;
		lightImage = imageConfig.lightImageIOS as Media;
		generalImage = imageConfig.generalImageIOS as Media;
	} else if (!isIphone && "imageMode" in imageConfig) {
		imageMode = imageConfig.imageMode;
		darkImage = imageConfig.darkImage as Media;
		lightImage = imageConfig.lightImage as Media;
		generalImage = imageConfig.generalImage as Media;
	}

	let imageUrl = generalImage?.url as string;

	if (imageMode === "theme") {
		if (query === "dark") {
			imageUrl = darkImage?.url || "";
		} else if (query === "light") {
			imageUrl = lightImage?.url || "";
		} else {
			imageUrl = generalImage?.url || "";
		}
	}

	// Build absolute URL if imageUrl is relative
	if (imageUrl.startsWith("/")) {
		imageUrl = `${req.nextUrl.origin}${imageUrl}`;
	}

	// Fetch the image and determine ETag
	const imageResponse = await fetch(imageUrl);
	const contentType =
		imageResponse.headers.get("Content-Type") || "image/jpeg";
	const imageBuffer = await imageResponse.arrayBuffer();

	// Generate an ETag based on the content
	const etag = `"${Buffer.from(imageBuffer).toString("base64").slice(0, 8)}"`;

	// Check if the client has the latest version of the resource
	const clientETag = req.headers.get("If-None-Match");
	if (clientETag === etag) {
		return new NextResponse(null, {
			status: 304,
		});
	}

	return new NextResponse(imageBuffer, {
		headers: {
			"Content-Type": contentType,
			ETag: etag,
			"Cache-Control": "public, must-revalidate",
		},
	});
};
