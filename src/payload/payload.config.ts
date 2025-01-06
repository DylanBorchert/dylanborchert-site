// storage-adapter-import-placeholder
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { resendAdapter } from "@payloadcms/email-resend";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";

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
    features: ({ defaultFeatures, rootFeatures }) => [...defaultFeatures],
  }),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL,
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      collections: {
        [Media.slug]: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
  graphQL: {
    disable: false,
    disablePlaygroundInProduction: false,
  },
});
