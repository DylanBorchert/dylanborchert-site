import configPromise from "@payload-config";
import { getPayload } from "payload";

export const GET = async () => {
	const payload = await getPayload({
		config: configPromise,
	});

	// Fetch the Payload CMS global data
	const data = await payload.findGlobal({
		slug: "home",
	});

	return Response.json(data);
};
