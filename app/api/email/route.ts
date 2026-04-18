import { NextRequest, NextResponse } from "next/server";
import { anthropic } from "@/lib/claude";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { student, professor } = await req.json();

    const prompt = `You are HawkSearch. Write a personalized, professional cold email from a student to a professor at Lehigh University requesting research opportunities.

STUDENT:
- Name: ${student.name}
- Major: ${student.major}, ${student.year}
- Interests: ${Array.isArray(student.interests) ? student.interests.join(", ") : student.interests}
- Skills: ${Array.isArray(student.skills) ? student.skills.join(", ") : student.skills}
- Experience: ${student.experience || "None provided"}
- Goals: ${Array.isArray(student.goals) ? student.goals.join(", ") : student.goals}

PROFESSOR:
- Name: ${professor.professorName}
- Department: ${professor.department}
- Research Areas: ${professor.researchInterests.join(", ")}
- Why matched: ${professor.whyItWorks}
- What to highlight: ${professor.highlight}

Write a subject line and email body. The email must:
- Be 150-220 words
- Sound human, confident, and specific (not generic)
- Reference the professor's actual research areas
- Connect the student's background naturally
- End with a polite ask to connect or learn more

Return ONLY valid JSON: { "subject": "...", "body": "..." }`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 600,
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const email = JSON.parse(text);

    return NextResponse.json({ email });
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json({ error: "Email generation failed" }, { status: 500 });
  }
}
