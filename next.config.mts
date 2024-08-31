import { withPayload } from "@payloadcms/next/withPayload";
import { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
	devIndicators: {
		appIsrStatus: false,
	},
};

export default withPayload(nextConfig);
