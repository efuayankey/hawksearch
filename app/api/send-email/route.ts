import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

function makeRawEmail(to: string, from: string, subject: string, body: string): string {
  const email = [
    `To: ${to}`,
    `From: ${from}`,
    `Subject: ${subject}`,
    `Content-Type: text/plain; charset=utf-8`,
    ``,
    body,
  ].join("\r\n");

  return Buffer.from(email).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.accessToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { to, subject, body } = await req.json();
    const from = session.user?.email ?? "";

    const raw = makeRawEmail(to, from, subject, body);

    const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("Gmail API error:", err);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Send email error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
