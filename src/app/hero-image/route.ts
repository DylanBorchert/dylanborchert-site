import { Media } from "#/payload/payload-types";
import configPromise from "@payload-config";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { getPayload } from "payload";

export const GET = async (req: NextRequest) => {
	const searchParams = req.nextUrl.searchParams;
	const query = searchParams.get("theme");
	const payload = await getPayload({
		config: configPromise,
	});

	const data = await payload.findGlobal({
		slug: "home",
	});

	const darkImage: Media = data?.darkImage as unknown as Media;
	const lightImage: Media = data?.lightImage as unknown as Media;
	const generalImage: Media = data?.generalImage as unknown as Media;

	if (data.imageMode === "theme") {
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
};
