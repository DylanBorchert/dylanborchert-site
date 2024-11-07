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

	console.log("isAppleWebKit", headersList.get("user-agent"));

	if (isIphone) {
		const iosData = await payload.findGlobal({
			slug: "home",
			select: {
				"IOS Image": {
					darkImageIOS: true,
					lightImageIOS: true,
					generalImageIOS: true,
					imageModeIOS: true,
				},
			},
		});

		const darkImageIOS: Media = iosData?.["IOS Image"]
			?.darkImageIOS as unknown as Media;
		const lightImageIOS: Media = iosData?.["IOS Image"]
			?.lightImageIOS as unknown as Media;
		const generalImageIOS: Media = iosData?.["IOS Image"]
			?.generalImageIOS as unknown as Media;

		console.log(query, iosData["IOS Image"].imageModeIOS);

		if (iosData["IOS Image"].imageModeIOS === "theme") {
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
		const heroData = await payload.findGlobal({
			slug: "home",
			select: {
				"Hero Image": {
					darkImage: true,
					lightImage: true,
					generalImage: true,
					imageMode: true,
				},
			},
		});

		const darkImage: Media = heroData?.["Hero Image"]
			?.darkImage as unknown as Media;
		const lightImage: Media = heroData?.["Hero Image"]
			?.lightImage as unknown as Media;
		const generalImage: Media = heroData?.["Hero Image"]
			?.generalImage as unknown as Media;

		if (heroData["Hero Image"].imageMode === "theme") {
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
