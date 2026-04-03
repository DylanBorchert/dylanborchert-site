"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { CyclingStats, CyclingPeriodStats } from "#/utils/strava.server";
import { cn } from "#/lib/utils";

type Period = "ytd" | "lastYear";

function CumulativeChart({
  activities,
  period,
}: {
  activities: CyclingStats["activities"];
  period: Period;
}) {
  const data = useMemo(() => {
    // Filter activities by selected period
    let filtered = activities;
    if (period === "ytd") {
      const yearStart = `${new Date().getFullYear()}-01-01`;
      filtered = activities.filter((a) => a.date >= yearStart);
    } else if (period === "lastYear") {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      filtered = activities.filter((a) => a.date >= oneYearAgo.toISOString());
    }

    // Deduplicate by date — keep the last (highest cumulative) entry per day
    const byDate = new Map<string, number>();
    for (const a of filtered) {
      byDate.set(a.date.split("T")[0], a.cumulativeDistance);
    }
    const entries = Array.from(byDate, ([date, km]) => ({ date, km }));

    // Rebase so the chart starts at 0 for the selected period
    if (entries.length > 0) {
      const allDates = activities.map((a) => ({
        date: a.date.split("T")[0],
        km: a.cumulativeDistance,
      }));
      const priorEntries = allDates.filter((a) => a.date < entries[0].date);
      const baseKm = priorEntries.length > 0
        ? priorEntries[priorEntries.length - 1].km
        : entries[0].km - (filtered[0]?.cumulativeDistance ?? entries[0].km);

      if (baseKm > 0) {
        return entries.map(({ date, km }) => ({
          date,
          km: Math.round((km - baseKm) * 10) / 10,
        }));
      }
    }

    return entries;
  }, [activities, period]);

  const chartRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = chartRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setRevealed(true);
        observer.disconnect();
      }
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (data.length < 2) return null;

  return (
    <div
      ref={chartRef}
      className="w-full h-36 mt-4 transition-[clip-path] duration-[2s] ease-out"
      style={{ clipPath: revealed ? "inset(0 0 0 0)" : "inset(0 100% 0 0)" }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: 20, right: 20 }}>
          <defs>
            <linearGradient id="cumFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" className="[stop-color:var(--palette-lightVibrant)]" stopOpacity={0.2} />
              <stop offset="100%" className="[stop-color:var(--palette-lightVibrant)]" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            ticks={data.reduce<string[]>((acc, point, i) => {
              const month = new Date(point.date).getMonth();
              const prevMonth = i > 0 ? new Date(data[i - 1].date).getMonth() : -1;
              if (month !== prevMonth) acc.push(point.date);
              return acc;
            }, [])}
            tickFormatter={(date: string) =>
              new Date(date).toLocaleString("default", { month: "short" })
            }
            minTickGap={30}
          />
          <YAxis
            hide
            domain={([dataMin, dataMax]: readonly number[]) => {
              const range = dataMax - dataMin;
              return [Math.max(0, dataMin - range * 0.1), dataMax + range * 0.05] as const;
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            labelFormatter={() => ""}
            formatter={(value: any) => [`${value} km`]}
          />
          <Area
            type="monotone"
            dataKey="km"
            stroke="var(--palette-lightVibrant)"
            strokeWidth={2}
            fill="url(#cumFill)"
            dot={false}
            activeDot={{
              r: 3,
              stroke: "var(--palette-lightVibrant)",
              strokeWidth: 2,
              fill: "var(--card)",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function StatLine({ stats }: { stats: CyclingPeriodStats }) {
  return (
    <div className="flex flex-wrap gap-x-2 text-sm">
      <span>
        <span className="font-bold text-palette-lightVibrant">{stats.distance}</span>{" "}
        <span className="text-muted-foreground">km distance</span>
      </span>
      <span className="text-muted-foreground">&bull;</span>
      <span>
        <span className="font-bold text-palette-lightVibrant">{stats.elevation.toLocaleString()}</span>{" "}
        <span className="text-muted-foreground">m elevation</span>
      </span>
      <span className="text-muted-foreground">&bull;</span>
      <span>
        <span className="font-bold text-palette-lightVibrant">{stats.time}</span>{" "}
        <span className="text-muted-foreground">hrs</span>
      </span>
      <span className="text-muted-foreground">&bull;</span>
      <span>
        <span className="font-bold text-palette-lightVibrant">{stats.rides}</span>{" "}
        <span className="text-muted-foreground">rides</span>
      </span>
    </div>
  );
}

export function CyclingStatsCard({ stats }: { stats: CyclingStats }) {
  const [period, setPeriod] = useState<Period>("lastYear");
  const periodStats = period === "ytd" ? stats.ytd : stats.lastYear;

  return (
    <div className="pt-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="font-mono text-sm tracking-wider text-muted-foreground">
            Cycling Stats
          </h3>
          <a
            href="https://www.strava.com/athletes/dylan_borchert"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-muted-foreground/50 hover:text-muted-foreground transition-colors"
          >
            via Strava
          </a>
        </div>
        <div className="flex gap-1 text-xs font-mono">
          <button
            onClick={() => setPeriod("lastYear")}
            className={cn(
              "px-2 py-0.5 rounded-md transition-colors",
              period === "lastYear"
                ? "bg-palette-lightVibrant/20 text-palette-lightVibrant"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Past Year
          </button>
          <button
            onClick={() => setPeriod("ytd")}
            className={cn(
              "px-2 py-0.5 rounded-md transition-colors",
              period === "ytd"
                ? "bg-palette-lightVibrant/20 text-palette-lightVibrant"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            YTD
          </button>
        </div>
      </div>
      <StatLine stats={periodStats} />
      <CumulativeChart activities={stats.activities} period={period} />
    </div>
  );
}
