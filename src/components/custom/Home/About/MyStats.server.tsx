"use server";

import { getCyclingStats } from "#/utils/strava.server";
import { getCoffeeStats } from "#/utils/coffee.server";
import { getGitHubStats } from "#/utils/github.server";
import { MyStatsClient } from "./MyStats.client";

export default async function MyStatsServer() {
  const [cyclingStats, coffeeStats, githubStats] = await Promise.allSettled([
    getCyclingStats(),
    getCoffeeStats(),
    getGitHubStats(),
  ]);

  return (
    <MyStatsClient
      cyclingStats={cyclingStats.status === "fulfilled" ? cyclingStats.value : null}
      coffeeStats={coffeeStats.status === "fulfilled" ? coffeeStats.value : null}
      githubStats={githubStats.status === "fulfilled" ? githubStats.value : null}
    />
  );
}
