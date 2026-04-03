"use client";

import { useEffect, useRef, useState } from "react";
import type { GitHubStats } from "#/utils/github.server";

const levelClasses = [
  "bg-muted/50",
  "bg-palette-lightVibrant/20",
  "bg-palette-lightVibrant/40",
  "bg-palette-lightVibrant/70",
  "bg-palette-lightVibrant",
];

export function GitHubStatsCard({ stats }: { stats: GitHubStats }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = gridRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pt-5">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="font-mono text-sm tracking-wider text-muted-foreground">
          GitHub Stats
        </h3>
        <a href="https://github.com/DylanBorchert" target="_blank" rel="noopener noreferrer" className="text-[10px] text-muted-foreground/50 hover:text-muted-foreground transition-colors">
          via GitHub
        </a>
      </div>
      <div className="flex items-center justify-between mb-3 text-sm">
        <span>
          <span className="font-bold text-palette-lightVibrant">
            {stats.totalContributions}
          </span>{" "}
          <span className="text-muted-foreground">contributions this year</span>
        </span>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>Less</span>
          {levelClasses.map((cls, i) => (
            <div
              key={i}
              className={`w-[10px] h-[10px] rounded-[2px] ${cls}`}
            />
          ))}
          <span>More</span>
        </div>
      </div>
      <div className="px-5">
        <div className="grid grid-cols-[repeat(53,1fr)] gap-[1px] md:gap-[3px] w-full mb-1">
          {stats.weeks.map((week, wi) => {
            const firstDay = new Date(week[0].date);
            const prevWeek = wi > 0 ? stats.weeks[wi - 1] : null;
            const prevMonth = prevWeek
              ? new Date(prevWeek[0].date).getMonth()
              : -1;
            const showMonth = firstDay.getMonth() !== prevMonth;
            return (
              <div key={wi} className="text-[9px] text-muted-foreground leading-none">
                {showMonth
                  ? firstDay.toLocaleString("default", { month: "short" })
                  : ""}
              </div>
            );
          })}
        </div>
        <div
          ref={gridRef}
          className="grid grid-cols-[repeat(53,1fr)] gap-[1px] md:gap-[3px] w-full"
        >
          {stats.weeks.map((week, wi) => (
            <div
              key={wi}
              className="flex flex-col gap-[1px] md:gap-[3px] transition-opacity duration-500"
              style={{
                opacity: revealed ? 1 : 0,
                transitionDelay: revealed ? `${wi * 30}ms` : "0ms",
              }}
            >
              {week.map((day) => (
                <div
                  key={day.date}
                  className={`aspect-square rounded-[2px] transition-transform duration-150 hover:scale-110 ${levelClasses[day.level]}`}
                  title={`${day.date}: ${day.count} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
