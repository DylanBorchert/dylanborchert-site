import { ApiHelper } from "./ApiHelper.server";

const COFFEE_API = process.env.COFFEE_API!;

export interface ShotDataPoint {
  time: number;
  pressure: number;
  flow: number;
  targetPressure: number;
  targetFlow: number;
}

export interface CoffeeStats {
  totalShots: number;
  totalMl: number;
  lastProfile: string;
  lastTimestamp: number;
  machineOnline: boolean;
  lastShotData: ShotDataPoint[];
}

class CoffeeHelper extends ApiHelper<CoffeeStats> {
  constructor() {
    super({ devTTL: 30_000, prodTTL: Number(process.env.COFFEE_TTL_MS ?? 60_000) });
  }

  protected async fetch(): Promise<CoffeeStats> {
    const [statsRes, latestRes] = await Promise.all([
      fetch(`${COFFEE_API}/shots/stats`, { next: { revalidate: 60 } }),
      fetch(`${COFFEE_API}/shots/latest`, { next: { revalidate: 60 } }),
    ]);

    if (!statsRes.ok || !latestRes.ok) {
      throw new Error(`Coffee API error: stats=${statsRes.status} latest=${latestRes.status}`);
    }

    const stats = await statsRes.json();
    const latest = await latestRes.json();

    const dp = latest.datapoints;
    const lastShotData: ShotDataPoint[] = dp.timeInShot.map((t: number, i: number) => ({
      time: t / 10,
      pressure: (dp.pressure[i] ?? 0) / 10,
      flow: (dp.pumpFlow[i] ?? 0) / 10,
      targetPressure: (dp.targetPressure[i] ?? 0) / 10,
      targetFlow: (dp.targetPumpFlow[i] ?? 0) / 10,
    }));

    return {
      totalShots: stats.data.totalShots,
      totalMl: Math.round(stats.data.totalWaterDispensedMl),
      lastProfile: latest.profile?.name || "Unknown",
      lastTimestamp: latest.timestamp,
      machineOnline: latest.machineOnline ?? false,
      lastShotData,
    };
  }
}

const coffeeHelper = new CoffeeHelper();

export async function getCoffeeStats(): Promise<CoffeeStats> {
  return coffeeHelper.get();
}
