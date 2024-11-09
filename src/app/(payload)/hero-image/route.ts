import { Media } from "#/payload/payload-types";
import configPromise from "@payload-config";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import { string } from "zod";

export const GET = async (req: NextRequest) => {
	const query = req.nextUrl.searchParams.get("theme");
	const payload = await getPayload({ config: configPromise });
	const isIphone = (await headers()).get("user-agent")?.includes("iPhone");

	const data = await payload.findGlobal({ slug: "home" });
	const imageConfig = isIphone ? data?.["IOS Image"] : data?.["Hero Image"];
	const themeKey = isIphone ? "IOS" : "";
	const darkImage = imageConfig?.[`darkImage${themeKey}`] as Media;
	const lightImage = imageConfig?.[`lightImage${themeKey}`] as Media;
	const generalImage = imageConfig?.[`generalImage${themeKey}`] as Media;

	let imageUrl = generalImage.url as string;

	if (imageConfig.imageMode === "theme") {
		imageUrl =
			query === "dark"
				? darkImage.url
				: query === "light"
					? lightImage.url
					: generalImage.url;
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
			"Cache-Control":
				"public, max-age=86400, stale-while-revalidate=43200",
		},
	});
};
