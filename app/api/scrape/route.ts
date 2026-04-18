import { NextResponse } from "next/server";
import { FALLBACK_PROFESSORS, Professor } from "@/lib/professors";

const FACULTY_URLS = [
  "https://engineering.lehigh.edu/faculty",
  "https://cas.lehigh.edu/faculty",
  "https://business.lehigh.edu/faculty",
  "https://health.lehigh.edu/faculty",
  "https://ed.lehigh.edu/about/faculty-directory",
];

async function tryScrapePage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "HawkSearch/1.0 Lehigh University Research Tool" },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

function extractNames(html: string): string[] {
  const names: string[] = [];
  // Common patterns for faculty names on university pages
  const patterns = [
    /Dr\.\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/g,
    /Professor\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/g,
  ];
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      const name = `Dr. ${match[1]}`;
      if (!names.includes(name)) names.push(name);
    }
  }
  return names.slice(0, 20);
}

export async function GET() {
  // Try live scraping
  const scraped: string[] = [];
  for (const url of FACULTY_URLS) {
    const html = await tryScrapePage(url);
    if (html) {
      const names = extractNames(html);
      scraped.push(...names);
    }
  }

  // Always return fallback professors as the reliable source
  // Scraped names are bonus context
  return NextResponse.json({
    professors: FALLBACK_PROFESSORS,
    scrapedNames: scraped,
    source: scraped.length > 0 ? "live+fallback" : "fallback",
  });
}
