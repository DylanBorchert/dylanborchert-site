// storage-adapter-import-placeholder
import { lexicalEditor, BlocksFeature } from "@payloadcms/richtext-lexical";
import { resendAdapter } from "@payloadcms/email-resend";
import { s3Storage } from "@payloadcms/storage-s3";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";

import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Blogs } from "./collections/Blogs";
import { Projects } from "./collections/Projects";
import { Experience } from "./collections/Experience";
import Home from "./globals/Home";
import { Tags } from "./collections/Tags";
import { languages } from "#/payload/components/code/languages";
import { CodeBlock } from "./blocks/CodeBlock";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
		livePreview: {
			globals: ["home"],
			collections: ["blogs", "projects"],
			url({ data, collectionConfig }) {
				const livePreviewUrl =
					process.env.LIVE_PREVIEW_URL || `http://localhost:3000/`;
				if (collectionConfig) {
					return `${livePreviewUrl}${collectionConfig.slug}/${data.slug}`;
				}
				return "/";
			},
		},
		disable: false,
	},
	email: resendAdapter({
		defaultFromAddress: "dev@dylanborchert.ca",
		defaultFromName: "Payload CMS",
		apiKey: process.env.RESEND_API_KEY || "",
	}),
	collections: [Users, Media, Blogs, Projects, Experience, Tags],
	globals: [Home],
	editor: lexicalEditor({
		features: ({ defaultFeatures, rootFeatures }) => [
			...defaultFeatures,
			BlocksFeature({
				blocks: [CodeBlock], //project and blogs
			}),
		],
	}),
	secret: process.env.PAYLOAD_SECRET || "",
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	db: postgresAdapter({
		pool: {
			connectionString: process.env.POSTGRES_URL,
		},
	}),
	sharp,
	plugins: [
		s3Storage({
			collections: {
				media: true,
			},
			enabled: true,
			bucket: process.env.MINIO_BUCKET || "",
			config: {
				endpoint: process.env.MINIO_ENDPOINT || "",
				credentials: {
					accessKeyId: process.env.MINIO_ACCESS_KEY_ID || "",
					secretAccessKey: process.env.MINIO_SECRET_ACCESS_KEY || "",
				},
				forcePathStyle: true,
				region: process.env.MINIO_REGION,
			},
		}),
	],
	graphQL: {
		disable: false,
		disablePlaygroundInProduction: false,
	},
});
