"use client";

import { AutoTextSize } from "auto-text-size";
import type { CyclingStats } from "#/utils/strava.server";
import type { CoffeeStats } from "#/utils/coffee.server";
import type { GitHubStats } from "#/utils/github.server";
import IntersectingFadeIn from "../../IntersectingFadeIn";
import { CoffeeStatsCard } from "./CoffeeStats.client";
import { CyclingStatsCard } from "./CyclingStats.client";
import { GitHubStatsCard } from "./GitHubStats.client";

export function MyStatsClient({
  cyclingStats,
  coffeeStats,
  githubStats,
}: {
  cyclingStats: CyclingStats | null;
  coffeeStats: CoffeeStats | null;
  githubStats: GitHubStats | null;
}) {
  return (
    <div className="w-full my-5">
      <IntersectingFadeIn>
        <div className="md:flex">
          <div className="md:max-w-1/2 md:w-1/2 w-full md:top-5 h-fit">
            <AutoTextSize
              as="span"
              maxFontSizePx={1000}
              className="font-bold antialiased bg-clip-text text-transparent bg-linear-to-r from-palette-lightMuted via-palette-muted to-palette-darkMuted bg-cover bg-center bg-fixed"
            >
              My Stats.
            </AutoTextSize>
          </div>
          <div className="md:w-1/2 w-full md:pl-5 md:pt-0 pt-5">
            {coffeeStats && <CoffeeStatsCard stats={coffeeStats} />}
          </div>
        </div>
        <div className="md:max-w-1/2 md:w-1/2 w-full">
            <p className="text-xs text-muted-foreground italic whitespace-nowrap text-center mt-1">
              Yes this is super nerdy, but it looks pretty cool!
            </p>
        </div>
      </IntersectingFadeIn>
      {cyclingStats && (
        <IntersectingFadeIn>
          <CyclingStatsCard stats={cyclingStats} />
        </IntersectingFadeIn>
      )}
      {githubStats && (
        <IntersectingFadeIn>
          <GitHubStatsCard stats={githubStats} />
        </IntersectingFadeIn>
      )}
    </div>
  );
}
