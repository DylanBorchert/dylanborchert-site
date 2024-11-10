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
		imageUrl =
			query === "dark"
				? darkImage?.url || ""
				: query === "light"
					? lightImage?.url || ""
					: generalImage?.url || "";
	}

	// Build absolute URL if imageUrl is relative
	if (imageUrl.startsWith("/")) {
		imageUrl = `${req.nextUrl.origin}${imageUrl}`;
	}

	// Fetch and return the image
	const imageResponse = await fetch(imageUrl);
	const contentType =
		imageResponse.headers.get("Content-Type") || "image/jpeg";
	const imageBuffer = await imageResponse.arrayBuffer();

	return new NextResponse(imageBuffer, {
		headers: {
			"Content-Type": contentType,
		},
	});
};
