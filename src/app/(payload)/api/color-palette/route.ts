import { Media } from "#/payload/payload-types";
import configPromise from "@payload-config";
import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import { createHash } from "crypto";

// In-memory cache for color palette data
const paletteCache = new Map<
  string,
  {
    data: Object;
    etag: string;
    timestamp: number;
  }
>();

// Cache TTL: 1 hour (adjust as needed)
const CACHE_TTL = process.env.NODE_ENV === "development" ? 0 : 60 * 60 * 1000;

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

		let colorPalette = generalImage?.colorPalette as Object;
		let selectedImage = generalImage;

    if (imageMode === "theme") {
      if (query === "dark") {
        colorPalette = darkImage?.colorPalette || "";
        selectedImage = darkImage;
      } else if (query === "light") {
        colorPalette = lightImage?.colorPalette || "";
        selectedImage = lightImage;
      } else {
        colorPalette = generalImage?.colorPalette || "";
        selectedImage = generalImage;
      }
    }

    if (
      !colorPalette ||
      (typeof colorPalette === "object" &&
        Object.keys(colorPalette).length === 0)
    ) {
      return NextResponse.json(
        {
          message: "Color palette not found",
        },
        {
          status: 500,
        }
      );
    }

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
    const cached = paletteCache.get(cacheKey);
    if (
      cached &&
      Date.now() - cached.timestamp < CACHE_TTL &&
      cached.etag === etag
    ) {
      return NextResponse.json(cached.data, {
        headers: {
          ETag: etag,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    // Store in cache
    paletteCache.set(cacheKey, {
      data: colorPalette,
      etag,
      timestamp: Date.now(),
    });

    // Clean up old cache entries (simple LRU-like behavior)
    if (paletteCache.size > 10) {
      const firstKey = paletteCache.keys().next().value;
      if (firstKey) paletteCache.delete(firstKey);
    }

    return NextResponse.json(colorPalette, {
      headers: {
        ETag: etag,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
	} catch (error) {
		console.error("Error fetching color palette:", error);
		return NextResponse.json(
			{ message: "Internal Server Error", error: error },
			{
				status: 500,
			}
		);
	}
};
