import { NextRequest, NextResponse } from "next/server";
import { anthropic } from "@/lib/claude";
import { FALLBACK_PROFESSORS } from "@/lib/professors";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { student } = await req.json();

    const professorList = FALLBACK_PROFESSORS.map((p, i) =>
      `${i + 1}. ${p.name} | ${p.department} (${p.college} College) | Email: ${p.email ?? "unknown"} | Research: ${p.researchInterests.join(", ")}`
    ).join("\n");

    const prompt = `You are HawkSearch, an AI research matching agent for Lehigh University.

STUDENT PROFILE:
- Name: ${student.name}
- Major: ${student.major}
- Year: ${student.year}
- Research Interests: ${Array.isArray(student.interests) ? student.interests.join(", ") : student.interests}
- Skills: ${Array.isArray(student.skills) ? student.skills.join(", ") : student.skills}
- Experience: ${student.experience || "None provided"}
- Goals: ${Array.isArray(student.goals) ? student.goals.join(", ") : student.goals}

AVAILABLE PROFESSORS:
${professorList}

Return the TOP 5 best professor matches as a JSON array. Each match must have:
- professorName: string
- department: string
- college: string
- score: number (0-100)
- researchInterests: string[] (3-5 of their key research areas as short tags)
- whyItWorks: string (2-3 sentences, specific to this student)
- strengths: string[] (2-3 bullet points)
- gap: string (1 sentence on what's missing or weaker)
- highlight: string (what the student should emphasize when reaching out)
- email: string (the professor's email from the list above)

Respond with ONLY valid JSON — an array of 5 objects. No markdown, no explanation.`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const matches = JSON.parse(text);

    return NextResponse.json({ matches });
  } catch (err) {
    console.error("Match error:", err);
    return NextResponse.json({ error: "Matching failed" }, { status: 500 });
  }
}
