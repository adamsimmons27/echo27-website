/** robots.txt per RFC 9309: most specific user agent group, longest matching rule, allow wins a tie. */

type Rule = { allow: boolean; pattern: string };
type Group = { agents: string[]; rules: Rule[]; crawlDelay?: number };

export type Robots = { groups: Group[]; sitemaps: string[] };

export function parseRobots(text: string): Robots {
  const groups: Group[] = [];
  const sitemaps: string[] = [];
  let current: Group | null = null;
  let lastWasAgent = false;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, "").trim();
    const m = line.match(/^([a-z-]+)\s*:\s*(.*)$/i);
    if (!m) continue;
    const field = m[1].toLowerCase();
    const value = m[2].trim();
    if (field === "sitemap") {
      sitemaps.push(value);
      continue;
    }
    if (field === "user-agent") {
      if (!current || !lastWasAgent) {
        current = { agents: [], rules: [] };
        groups.push(current);
      }
      current.agents.push(value.toLowerCase());
      lastWasAgent = true;
      continue;
    }
    lastWasAgent = false;
    if (!current) continue;
    if (field === "allow" || field === "disallow") current.rules.push({ allow: field === "allow", pattern: value });
    else if (field === "crawl-delay" && Number(value) > 0) current.crawlDelay = Number(value);
  }
  return { groups, sitemaps };
}

function groupsFor(robots: Robots, agent: string): Group[] {
  const name = agent.toLowerCase();
  const named = robots.groups.filter((g) => g.agents.includes(name));
  return named.length ? named : robots.groups.filter((g) => g.agents.includes("*"));
}

function matches(pattern: string, path: string): boolean {
  const anchored = pattern.endsWith("$");
  const body = (anchored ? pattern.slice(0, -1) : pattern)
    .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\*/g, ".*");
  return new RegExp(`^${body}${anchored ? "$" : ""}`).test(path);
}

export function isAllowed(robots: Robots, agent: string, path: string): boolean {
  let best: Rule | null = null;
  for (const group of groupsFor(robots, agent)) {
    for (const rule of group.rules) {
      if (!rule.pattern || !matches(rule.pattern, path)) continue;
      if (
        !best ||
        rule.pattern.length > best.pattern.length ||
        (rule.pattern.length === best.pattern.length && rule.allow)
      ) {
        best = rule;
      }
    }
  }
  return best ? best.allow : true;
}

export function crawlDelay(robots: Robots, agent: string): number {
  return groupsFor(robots, agent).reduce((max, g) => Math.max(max, g.crawlDelay ?? 0), 0);
}
