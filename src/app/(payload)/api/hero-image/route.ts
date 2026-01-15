import { Media } from "#/payload/payload-types";
import configPromise from "@payload-config";
import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { getPayload } from "payload";

// In-memory cache for image metadata and content
const imageCache = new Map<string, {
	buffer: ArrayBuffer;
	contentType: string;
	etag: string;
	timestamp: number;
}>();

// Cache TTL: 0 in dev, 1 hour in production
const CACHE_TTL = process.env.NODE_ENV === 'development' ? 0 : 60 * 60 * 1000;

export const GET = async (req: NextRequest) => {
	try {
		const query = req.nextUrl.searchParams.get("theme");
		const payload = await getPayload({ config: configPromise });

		const data = await payload.findGlobal({ slug: "home" });
		const imageConfig = data?.["Hero Image"];

		const imageMode = imageConfig.imageMode;
		const darkImage = imageConfig.darkImage as Media;
		const lightImage = imageConfig.lightImage as Media;
		const generalImage = imageConfig.generalImage as Media;

		let imageUrl = generalImage?.url as string;
		let selectedImage = generalImage;

		if (imageMode === "theme") {
      if (query === "dark") {
        imageUrl = darkImage?.url || "";
        selectedImage = darkImage;
      } else if (query === "light") {
        imageUrl = lightImage?.url || "";
        selectedImage = lightImage;
      } else {
        imageUrl = generalImage?.url || "";
        selectedImage = generalImage;
      }
    }

    // Build absolute URL if imageUrl is relative
    if (imageUrl.startsWith("/")) {
      imageUrl = `${req.nextUrl.origin}${imageUrl}`;
    }

		if (imageUrl === "" || !imageUrl)
      return new NextResponse(null, {
        status: 404,
        statusText: "Image not found",
      });

    // Use image ID and updatedAt for cache key and ETag generation
    const imageId = selectedImage?.id || "";
    const imageUpdatedAt = selectedImage?.updatedAt || "";
    const cacheKey = `${imageId}-${query || "general"}`;
    const etag = `"${createHash("sha1").update(`${imageId}-${imageUpdatedAt}`).digest("base64")}"`;

    // Check if the client has the latest version of the resource
    const clientETag = req.headers.get("If-None-Match");
    if (clientETag === etag) {
      return new NextResponse(null, {
        status: 304,
      });
    }

    // Check in-memory cache
    const cached = imageCache.get(cacheKey);
    if (
      cached &&
      Date.now() - cached.timestamp < CACHE_TTL &&
      cached.etag === etag
    ) {
      return new NextResponse(cached.buffer, {
        headers: {
          "Content-Type": cached.contentType,
          ETag: etag,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    // Fetch the image
    const imageResponse = await fetch(imageUrl);
    const contentType =
      imageResponse.headers.get("Content-Type") || "image/jpeg";
    const imageBuffer = await imageResponse.arrayBuffer();

    // Store in cache
    imageCache.set(cacheKey, {
      buffer: imageBuffer,
      contentType,
      etag,
      timestamp: Date.now(),
    });

    // Clean up old cache entries (simple LRU-like behavior)
    if (imageCache.size > 10) {
      const firstKey = imageCache.keys().next().value;
      if (firstKey) imageCache.delete(firstKey);
    }

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        ETag: etag,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
	} catch (error) {
		return NextResponse.json(
			{
				message: "An error occurred",
				error: (error as Error).message,
			},
			{
				status: 500,
			}
		);
	}
};
