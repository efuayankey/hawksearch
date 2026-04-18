"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Match {
  professorName: string;
  department: string;
  college: string;
  score: number;
  researchInterests: string[];
  whyItWorks: string;
  strengths: string[];
  gap: string;
  highlight: string;
  email?: string;
}

interface EmailData {
  subject: string;
  body: string;
}

function scoreColor(score: number) {
  if (score >= 80) return "#22C55E";
  if (score >= 60) return "#EAB308";
  if (score >= 40) return "#F97316";
  return "#9CA3AF";
}

function scoreLabel(score: number) {
  if (score >= 80) return "Strong Match";
  if (score >= 60) return "Good Match";
  if (score >= 40) return "Possible Match";
  return "Low Match";
}

function DonutChart({ score, color }: { score: number; color: string }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ;
  return (
    <svg width="90" height="90" viewBox="0 0 90 90">
      <circle cx="45" cy="45" r={r} fill="none" stroke="#F0E8DA" strokeWidth="8" />
      <circle cx="45" cy="45" r={r} fill="none" stroke={color} strokeWidth="8"
        strokeDasharray={`${filled} ${circ - filled}`}
        strokeLinecap="round" transform="rotate(-90 45 45)" />
      <text x="45" y="50" textAnchor="middle" fontSize="16" fontWeight="700" fill="#3B1F0E">{score}%</text>
    </svg>
  );
}

function EmailModal({ match, student, professorEmail, onClose }: { match: Match; student: object; professorEmail: string; onClose: () => void }) {
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [body, setBody] = useState("");
  const [subject, setSubject] = useState("");

  const generate = () => {
    setLoading(true);
    fetch("/api/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ student, professor: match }),
    })
      .then(r => r.json())
      .then(d => { setBody(d.email.body); setSubject(d.email.subject); setLoading(false); });
  };

  useEffect(() => { generate(); }, []);

  const handleSend = async () => {
    setSending(true);
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: professorEmail, subject, body }),
    });
    setSending(false);
    if (res.ok) setSent(true);
    else alert("Failed to send. Please try again.");
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ background: "white", borderRadius: "20px", width: "100%", maxWidth: "640px", maxHeight: "90vh", overflow: "auto", padding: "36px", boxShadow: "0 24px 64px rgba(0,0,0,0.25)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.3rem", fontWeight: 800, color: "#3B1F0E" }}>Email to {match.professorName}</h2>
            <p style={{ fontSize: "0.82rem", color: "#9A7A5A", marginTop: "2px" }}>{professorEmail}</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "1.4rem", color: "#9A7A5A", cursor: "pointer" }}>✕</button>
        </div>

        {sent ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>✓</div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem", fontWeight: 700, color: "#3B1F0E", marginBottom: "8px" }}>Email sent!</div>
            <p style={{ color: "#9A7A5A", fontSize: "0.88rem" }}>Your email was sent to {match.professorName}.</p>
            <button onClick={onClose} style={{ marginTop: "24px", padding: "10px 24px", borderRadius: "8px", border: "none", background: "#3B1F0E", color: "#FAF6F0", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer" }}>Done</button>
          </div>
        ) : loading ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#9A7A5A" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "12px" }}>✦</div>
            Drafting your personalized email...
          </div>
        ) : (
          <>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#3B1F0E", display: "block", marginBottom: "6px" }}>SUBJECT</label>
              <input value={subject} onChange={e => setSubject(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1.5px solid rgba(59,31,14,0.15)", fontSize: "0.9rem", color: "#3B1F0E", fontFamily: "Inter, sans-serif" }} />
            </div>
            <div style={{ marginBottom: "24px" }}>
              <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#3B1F0E", display: "block", marginBottom: "6px" }}>EMAIL BODY</label>
              <textarea value={body} onChange={e => setBody(e.target.value)} rows={12}
                style={{ width: "100%", padding: "12px 14px", borderRadius: "8px", border: "1.5px solid rgba(59,31,14,0.15)", fontSize: "0.88rem", color: "#3B1F0E", fontFamily: "Inter, sans-serif", resize: "vertical" }} />
            </div>
            <div style={{ display: "flex", gap: "12px", justifyContent: "space-between", alignItems: "center" }}>
              <button onClick={generate}
                style={{ padding: "10px 16px", borderRadius: "8px", border: "1.5px solid rgba(59,31,14,0.2)", background: "white", color: "#9A7A5A", fontSize: "0.85rem", fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
                ↻ Regenerate
              </button>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={onClose} style={{ padding: "10px 20px", borderRadius: "8px", border: "1.5px solid rgba(59,31,14,0.2)", background: "white", color: "#3B1F0E", fontSize: "0.9rem", fontWeight: 500, cursor: "pointer" }}>Cancel</button>
                <button onClick={handleSend} disabled={sending}
                  style={{ padding: "10px 24px", borderRadius: "8px", border: "none", background: "#3B1F0E", color: "#FAF6F0", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", opacity: sending ? 0.7 : 1 }}>
                  {sending ? "Sending..." : "Send Email →"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function MatchCard({ match, student }: { match: Match; student: object }) {
  const color = scoreColor(match.score);
  const [showEmail, setShowEmail] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const professorEmail = match.email ?? "";

  return (
    <>
      <div style={{ background: "white", borderRadius: "16px", border: "1px solid rgba(59,31,14,0.1)", overflow: "hidden" }}>
        <div style={{ padding: "24px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "16px" }}>
            <DonutChart score={match.score} color={color} />
            <div style={{ marginTop: "12px", textAlign: "center" }}>
              <div style={{ fontFamily: "Georgia, serif", fontSize: "1.05rem", fontWeight: 800, color: "#3B1F0E" }}>{match.professorName}</div>
              <div style={{ fontSize: "0.78rem", color: "#9A7A5A", marginTop: "2px" }}>{match.department}</div>
              <div style={{ display: "inline-block", marginTop: "6px", padding: "2px 10px", borderRadius: "100px", background: `${color}18`, fontSize: "0.72rem", fontWeight: 600, color }}>
                {scoreLabel(match.score)}
              </div>
            </div>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#9A7A5A", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Research Interests</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {match.researchInterests.map(i => (
                <span key={i} style={{ padding: "4px 10px", borderRadius: "100px", background: "#FAF6F0", border: "1px solid rgba(59,31,14,0.12)", fontSize: "0.75rem", color: "#3B1F0E" }}>{i}</span>
              ))}
            </div>
          </div>
          <button onClick={() => setExpanded(!expanded)}
            style={{ background: "none", border: "none", padding: 0, fontSize: "0.8rem", color: "#C8973A", fontWeight: 600, cursor: "pointer" }}>
            {expanded ? "▾ Hide details" : "▸ Why this match works"}
          </button>
          {expanded && (
            <div style={{ marginTop: "10px", fontSize: "0.82rem", color: "#5C3317", lineHeight: 1.65, background: "#FAF6F0", borderRadius: "8px", padding: "12px" }}>
              <p style={{ marginBottom: "8px" }}>{match.whyItWorks}</p>
              <div style={{ fontWeight: 600, color: "#3B1F0E", marginBottom: "4px" }}>Your strengths:</div>
              <ul style={{ listStyle: "none", marginBottom: "8px" }}>
                {match.strengths.map(s => <li key={s} style={{ paddingLeft: "12px", marginBottom: "2px" }}>✓ {s}</li>)}
              </ul>
              <div style={{ fontWeight: 600, color: "#3B1F0E", marginBottom: "4px" }}>Possible gap:</div>
              <p style={{ paddingLeft: "12px", color: "#9A7A5A" }}>{match.gap}</p>
            </div>
          )}
        </div>
        <div style={{ borderTop: "1px solid rgba(59,31,14,0.08)", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <button onClick={() => setExpanded(true)}
            style={{ padding: "14px", background: "none", border: "none", borderRight: "1px solid rgba(59,31,14,0.08)", fontSize: "0.85rem", fontWeight: 500, color: "#3B1F0E", cursor: "pointer" }}>
            View Profile
          </button>
          <button onClick={() => setShowEmail(true)}
            style={{ padding: "14px", background: "none", border: "none", fontSize: "0.85rem", fontWeight: 600, color: "#C8973A", cursor: "pointer" }}>
            Send Email ✉
          </button>
        </div>
      </div>
      {showEmail && <EmailModal match={match} student={student} professorEmail={professorEmail} onClose={() => setShowEmail(false)} />}
    </>
  );
}

export default function MatchesPage() {
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [student, setStudent] = useState<object>({});

  useEffect(() => {
    const raw = sessionStorage.getItem("studentProfile");
    if (!raw) { router.push("/student/profile"); return; }
    const profile = JSON.parse(raw);
    setStudent(profile);

    fetch("/api/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ student: profile }),
    })
      .then(r => r.json())
      .then(d => { if (d.error) setError(d.error); else setMatches(d.matches); setLoading(false); })
      .catch(() => { setError("Something went wrong."); setLoading(false); });
  }, [router]);

  const topScore = matches[0]?.score ?? 0;
  const topColor = scoreColor(topScore);

  return (
    <div style={{ padding: "40px 48px 100px", maxWidth: "1100px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "2rem", fontWeight: 800, color: "#3B1F0E", letterSpacing: "-0.5px", marginBottom: "6px" }}>Your Research Matches</h1>
          <p style={{ fontSize: "0.95rem", color: "#9A7A5A" }}>
            {loading ? "Finding professors whose research aligns with your interests..." : `We found ${matches.length} professors whose research aligns with your interests.`}
          </p>
        </div>
        {!loading && matches.length > 0 && (
          <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 18px", borderRadius: "8px", border: "1.5px solid rgba(59,31,14,0.2)", background: "white", fontSize: "0.85rem", fontWeight: 500, color: "#3B1F0E", cursor: "pointer" }}>
            ✉ Email All Matches
          </button>
        )}
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <div style={{ fontSize: "2rem", marginBottom: "16px" }}>✦</div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem", color: "#3B1F0E", marginBottom: "8px" }}>Analyzing your profile...</div>
          <div style={{ fontSize: "0.88rem", color: "#9A7A5A" }}>Our AI is matching you with Lehigh professors</div>
        </div>
      )}

      {error && <div style={{ textAlign: "center", padding: "60px 0", color: "#EF4444" }}>{error}</div>}

      {!loading && matches.length > 0 && (
        <div style={{ background: "white", borderRadius: "16px", border: "1px solid rgba(59,31,14,0.1)", padding: "28px 32px", marginBottom: "28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <DonutChart score={topScore} color={topColor} />
            <div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#3B1F0E", marginBottom: "4px" }}>
                {topScore >= 80 ? "Great Match!" : topScore >= 60 ? "Good Match!" : "Decent Match"}
              </div>
              <div style={{ fontSize: "0.88rem", color: "#9A7A5A" }}>
                You have a strong match with {matches.filter(m => m.score >= 80).length || 1} professor{matches.filter(m => m.score >= 80).length !== 1 ? "s" : ""}.
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {[{ label: "Strong Match", range: "80–100%", color: "#22C55E" }, { label: "Good Match", range: "60–79%", color: "#EAB308" }, { label: "Possible Match", range: "40–59%", color: "#F97316" }, { label: "Low Match", range: "0–39%", color: "#9CA3AF" }].map(l => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", color: "#9A7A5A" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: l.color }} />
                <span>{l.label}</span>
                <span>{l.range}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && matches.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px", marginBottom: "32px" }}>
          {matches.map((m, i) => <MatchCard key={i} match={m} student={student} />)}
        </div>
      )}

      {!loading && matches.length > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.82rem", color: "#9A7A5A" }}>
          💡 Not seeing the right match?{" "}
          <button onClick={() => router.push("/student/profile")} style={{ background: "none", border: "none", color: "#C8973A", fontWeight: 600, cursor: "pointer", fontSize: "0.82rem", padding: 0 }}>
            Update your research interests
          </button>{" "}to improve your results.
        </div>
      )}
    </div>
  );
}
