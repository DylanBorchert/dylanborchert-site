"use client";

import { useEffect, useRef, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { CoffeeStats, ShotDataPoint } from "#/utils/coffee.server";

function formatCoffeeTimeAgo(timestamp: number) {
  const diff = Math.floor(Date.now() / 1000 - timestamp);
  if (diff < 30) return "just now";
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 172800) return "yesterday";
  return "awhile ago";
}

function useRevealOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
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

  return { ref, revealed };
}

function ShotChart({ data }: { data: ShotDataPoint[] }) {
  const { ref, revealed } = useRevealOnScroll();

  if (data.length < 2) return null;

  return (
    <div ref={ref} className="w-full h-32" style={{ overflow: "visible" }}>
      <div
        className="w-full h-full transition-[clip-path] duration-[1.5s] ease-out"
        style={{
          clipPath: revealed ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
          overflow: "visible",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: 20, right: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="pressureFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" className="[stop-color:var(--palette-vibrant)]" stopOpacity={0.15} />
                <stop offset="100%" className="[stop-color:var(--palette-vibrant)]" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="flowFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" className="[stop-color:var(--palette-lightVibrant)]" stopOpacity={0.15} />
                <stop offset="100%" className="[stop-color:var(--palette-lightVibrant)]" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              tickFormatter={(t) => `${t}s`}
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
              ticks={Array.from({ length: Math.floor(data[data.length - 1].time / 5) + 1 }, (_, i) => i * 5)}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                fontSize: "11px",
                padding: "4px 8px",
              }}
              labelFormatter={(t) => `${t}s`}
              formatter={(value: any, name: any) => {
                if (name === "targetPressure" || name === "targetFlow") return [null, null];
                return [`${value}`, name === "pressure" ? "bar" : "ml/s"];
              }}
            />
            {/* Actual readings */}
            <Area type="monotone" dataKey="pressure" stroke="var(--palette-vibrant)" strokeWidth={1.5} fill="url(#pressureFill)" dot={false} activeDot={false} />
            <Area type="monotone" dataKey="flow" stroke="var(--palette-lightVibrant)" strokeWidth={1.5} fill="url(#flowFill)" dot={false} activeDot={false} />
            {/* Profile targets (dashed) */}
            <Area type="stepAfter" dataKey="targetPressure" stroke="var(--palette-vibrant)" strokeWidth={1} strokeDasharray="4 3" strokeOpacity={0.5} fill="none" dot={false} activeDot={false} />
            <Area type="stepAfter" dataKey="targetFlow" stroke="var(--palette-lightVibrant)" strokeWidth={1} strokeDasharray="4 3" strokeOpacity={0.5} fill="none" dot={false} activeDot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function CoffeeStatsCard({ stats }: { stats: CoffeeStats }) {
  const [timeAgoStr, setTimeAgoStr] = useState("");

  useEffect(() => {
    const update = () => setTimeAgoStr(formatCoffeeTimeAgo(stats.lastTimestamp));
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [stats.lastTimestamp]);

  return (
    <div className="h-full flex flex-col justify-end">
      <div className="flex items-center gap-2">
        <h3 className="font-mono text-sm tracking-wider text-muted-foreground">
          Coffee Stats
        </h3>
        <a
          href="https://gaggiuino.github.io/#/?id=home"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-muted-foreground/50 hover:text-muted-foreground transition-colors"
        >
          via Gaggiuino
        </a>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between text-sm gap-1">
        <div className="flex gap-x-2">
          <span className="text-muted-foreground">Last shot: </span>
          <span className="font-bold text-palette-lightVibrant">{stats.lastProfile}</span>
          <span className="text-muted-foreground">&bull;</span>
          <span className="font-mono font-medium text-muted-foreground">{timeAgoStr}</span>
        </div>
        <div className="flex gap-x-2">
          <span>
            <span className="font-bold text-palette-lightVibrant">{(stats.totalMl / 1000).toFixed(1)}</span>{" "}
            <span className="text-muted-foreground">L total</span>
          </span>
          <span className="text-muted-foreground">&bull;</span>
          <span>
            <span className="font-bold text-palette-lightVibrant">{stats.totalShots}</span>{" "}
            <span className="text-muted-foreground">shots</span>
          </span>
        </div>
      </div>
      <ShotChart data={stats.lastShotData} />
    </div>
  );
}
