import { getPayload } from "payload";
import config from "@payload-config";
import { ApiHelper } from "./ApiHelper.server";

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID!;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET!;

// In-memory token cache (avoids DB reads on every request)
let memAccessToken = "";
let memRefreshToken = "";
let memExpiresAt = 0;

async function getStoredTokens() {
  if (memAccessToken && memRefreshToken && memExpiresAt) {
    return {
      accessToken: memAccessToken,
      refreshToken: memRefreshToken,
      expiresAt: memExpiresAt,
    };
  }

  try {
    const payload = await getPayload({ config });
    const stored = await payload.findGlobal({ slug: "strava-tokens" });

    if (stored?.accessToken && stored?.refreshToken) {
      memAccessToken = stored.accessToken;
      memRefreshToken = stored.refreshToken;
      memExpiresAt = stored.expiresAt || 0;
      return {
        accessToken: stored.accessToken,
        refreshToken: stored.refreshToken,
        expiresAt: stored.expiresAt || 0,
      };
    }
  } catch {
    // DB not available yet, fall through to env
  }

  // Fall back to .env values on first run
  return {
    accessToken: process.env.STRAVA_ACCESS_TOKEN!,
    refreshToken: process.env.STRAVA_REFRESH_TOKEN!,
    expiresAt: 0,
  };
}

async function saveTokens(
  accessToken: string,
  refreshToken: string,
  expiresAt: number
) {
  memAccessToken = accessToken;
  memRefreshToken = refreshToken;
  memExpiresAt = expiresAt;

  try {
    const payload = await getPayload({ config });
    await payload.updateGlobal({
      slug: "strava-tokens",
      data: { accessToken, refreshToken, expiresAt },
    });
  } catch (e) {
    console.error("[Strava] Failed to persist tokens to DB:", e);
  }
}

async function refreshAccessToken(currentRefreshToken: string) {
  const res = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: currentRefreshToken,
    }),
  });

  if (!res.ok) {
    throw new Error(`Strava token refresh failed: ${res.status}`);
  }

  const data = await res.json();
  await saveTokens(data.access_token, data.refresh_token, data.expires_at);
  return data.access_token;
}

async function getToken() {
  const tokens = await getStoredTokens();
  const now = Math.floor(Date.now() / 1000);

  if (now >= tokens.expiresAt - 60) {
    return refreshAccessToken(tokens.refreshToken);
  }
  return tokens.accessToken;
}

async function stravaFetch(path: string) {
  const token = await getToken();
  const res = await fetch(`https://www.strava.com/api/v3${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(`Strava API error: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

export interface CyclingPeriodStats {
  distance: number;
  elevation: number;
  time: number;
  rides: number;
}

export interface CyclingStats {
  ytd: CyclingPeriodStats;
  lastYear: CyclingPeriodStats;
  activities: { date: string; cumulativeDistance: number; distance: number }[];
}

function computePeriodStats(activities: any[]): CyclingPeriodStats {
  return {
    distance: Math.round(activities.reduce((s, a) => s + a.distance / 1000, 0) * 10) / 10,
    elevation: Math.round(activities.reduce((s, a) => s + a.total_elevation_gain, 0)),
    time: Math.round(activities.reduce((s, a) => s + a.moving_time / 3600, 0) * 10) / 10,
    rides: activities.length,
  };
}

class StravaHelper extends ApiHelper<CyclingStats> {
  constructor() {
    super({ devTTL: 30_000, prodTTL: Number(process.env.STRAVA_TTL_MS ?? 1_800_000) });
  }

  protected async fetch(): Promise<CyclingStats> {
    const athlete = await stravaFetch("/athlete");
    const athleteId = athlete.id;

    const [stats, activities] = await Promise.all([
      stravaFetch(`/athletes/${athleteId}/stats`),
      fetchAllRideActivities(),
    ]);

    const rideActivities = activities.sort(
      (a: any, b: any) =>
        new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
    );

    let cumulative = 0;
    const cumulativeData = rideActivities.map((a: any) => {
      const distKm = a.distance / 1000;
      cumulative += distKm;
      return {
        date: a.start_date,
        cumulativeDistance: Math.round(cumulative * 10) / 10,
        distance: Math.round(distKm * 10) / 10,
      };
    });

    const ytdRide = stats.ytd_ride_totals;

    // Compute last 12 months stats from activities
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const oneYearAgoStr = oneYearAgo.toISOString();
    const lastYearActivities = rideActivities.filter(
      (a: any) => a.start_date >= oneYearAgoStr
    );

    return {
      ytd: {
        distance: Math.round((ytdRide.distance / 1000) * 10) / 10,
        elevation: Math.round(ytdRide.elevation_gain),
        time: Math.round((ytdRide.moving_time / 3600) * 10) / 10,
        rides: ytdRide.count,
      },
      lastYear: computePeriodStats(lastYearActivities),
      activities: cumulativeData,
    };
  }
}

async function fetchAllRideActivities() {
  const allActivities: any[] = [];
  let page = 1;
  const perPage = 200;

  while (true) {
    const activities = await stravaFetch(
      `/athlete/activities?per_page=${perPage}&page=${page}`
    );
    const rides = activities.filter(
      (a: any) =>
        a.type === "Ride" ||
        a.type === "VirtualRide" ||
        a.sport_type === "MountainBikeRide"
    );
    allActivities.push(...rides);

    if (activities.length < perPage) break;
    page++;
  }

  return allActivities;
}

const stravaHelper = new StravaHelper();

export async function getCyclingStats(): Promise<CyclingStats> {
  return stravaHelper.get();
}
