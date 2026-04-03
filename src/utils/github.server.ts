import { ApiHelper } from "./ApiHelper.server";

const GITHUB_USERNAME = process.env.GITHUB_USERNAME!;
const GITHUB_API = process.env.GITHUB_API!;

export interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0-4 intensity
}

export interface GitHubStats {
  totalContributions: number;
  weeks: ContributionDay[][];
}

function getLevel(count: number, max: number): number {
  if (count === 0) return 0;
  if (count <= max * 0.25) return 1;
  if (count <= max * 0.5) return 2;
  if (count <= max * 0.75) return 3;
  return 4;
}

class GitHubHelper extends ApiHelper<GitHubStats> {
  constructor() {
    super({ devTTL: 60_000, prodTTL: 1_800_000 });
  }

  protected async fetch(): Promise<GitHubStats> {
    const token = process.env.GITHUB_TOKEN;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(GITHUB_API, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query: `{
          user(login: "${GITHUB_USERNAME}") {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }`,
      }),
    });

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const json = await res.json();
    const calendar = json.data.user.contributionsCollection.contributionCalendar;

    const allCounts = calendar.weeks.flatMap((w: any) =>
      w.contributionDays.map((d: any) => d.contributionCount)
    );
    const max = Math.max(...allCounts);

    const weeks = calendar.weeks.map((w: any) =>
      w.contributionDays.map((d: any) => ({
        date: d.date,
        count: d.contributionCount,
        level: getLevel(d.contributionCount, max),
      }))
    );

    return {
      totalContributions: calendar.totalContributions,
      weeks,
    };
  }
}

const githubHelper = new GitHubHelper();

export async function getGitHubStats(): Promise<GitHubStats> {
  return githubHelper.get();
}
