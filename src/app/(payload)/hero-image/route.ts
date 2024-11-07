import { Media } from "#/payload/payload-types";
import configPromise from "@payload-config";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { getPayload } from "payload";

export const GET = async (req: NextRequest) => {
	const searchParams = req.nextUrl.searchParams;
	const query = searchParams.get("theme");
	const payload = await getPayload({
		config: configPromise,
	});

	const headersList = await headers();
	const isIphone = headersList.get("user-agent")?.includes("iPhone");

	const data = await payload.findGlobal({
		slug: "home",
	});

	if (isIphone) {
		const iosData = data?.["IOS Image"];

		const darkImageIOS: Media = iosData?.darkImageIOS as unknown as Media;
		const lightImageIOS: Media = iosData?.lightImageIOS as unknown as Media;
		const generalImageIOS: Media =
			iosData?.generalImageIOS as unknown as Media;

		if (iosData.imageModeIOS === "theme") {
			if (query === "dark") {
				redirect(darkImageIOS.url as string);
			} else if (query === "light") {
				redirect(lightImageIOS.url as string);
			} else {
				redirect(generalImageIOS.url as string);
			}
		} else {
			redirect(generalImageIOS.url as string);
		}
	} else {
		const heroData = data?.["Hero Image"];

		const darkImage: Media = heroData?.darkImage as unknown as Media;
		const lightImage: Media = heroData?.lightImage as unknown as Media;
		const generalImage: Media = heroData?.generalImage as unknown as Media;

		if (heroData.imageMode === "theme") {
			if (query === "dark") {
				redirect(darkImage.url as string);
			} else if (query === "light") {
				redirect(lightImage.url as string);
			} else {
				redirect(generalImage.url as string);
			}
		} else {
			redirect(generalImage.url as string);
		}
	}
};
