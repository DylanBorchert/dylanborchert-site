import { withPayload } from "@payloadcms/next/withPayload";
/** @type {import('next').NextConfig} */

const nextConfig = {
	devIndicators: {
		appIsrStatus: false,
	},
	images: {
		domains: [
			"api.microlink.io", // Microlink Image Preview
		],
	},
};

export default withPayload(nextConfig);
