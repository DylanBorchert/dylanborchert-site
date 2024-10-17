import type { Home } from "#/payload/payload-types";

export const fetchParallaxImage = async (): Promise<Home> => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/home`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	).then((res) => res.json());
	return response;
};
