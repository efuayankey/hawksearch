"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const INTERESTS = [
  "Artificial Intelligence", "Machine Learning", "Robotics", "Computer Vision",
  "Quantum Computing", "Materials Science", "Biotechnology", "Neuroscience",
  "Renewable Energy", "Data Science", "Chemistry", "Physics",
  "Cybersecurity", "Healthcare Tech", "Climate Science", "Economics Research",
];

const SKILLS = [
  "Python", "MATLAB", "C++", "R", "SQL", "TensorFlow", "PyTorch",
  "Data Analysis", "Lab Work", "3D Printing", "CAD", "Linux",
  "Java", "JavaScript", "Statistics", "Circuit Design",
];

const GOALS = [
  { label: "Gain research experience", icon: "🔬" },
  { label: "Work on a publication", icon: "📄" },
  { label: "Get paid research opportunities", icon: "💼" },
  { label: "Prepare for graduate school", icon: "🎓" },
  { label: "Explore different research areas", icon: "🧭" },
];

const MAJORS = [
  "Computer Science", "Computer Engineering", "Electrical Engineering",
  "Mechanical Engineering", "Civil Engineering", "Chemical Engineering",
  "Bioengineering", "Industrial Engineering", "Data Science",
  "Mathematics", "Physics", "Chemistry", "Biology",
  "Finance", "Business", "Economics", "Psychology", "Other",
];

const YEARS = ["Freshman", "Sophomore", "Junior", "Senior", "Graduate (MS)", "Graduate (PhD)"];

const card = {
  background: "white",
  borderRadius: "14px",
  border: "1px solid rgba(59,31,14,0.1)",
  padding: "24px",
  marginBottom: "16px",
};

const sectionNum = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "26px",
  height: "26px",
  borderRadius: "50%",
  background: "#3B1F0E",
  color: "white",
  fontSize: "0.8rem",
  fontWeight: 700,
  marginRight: "10px",
  flexShrink: 0,
} as React.CSSProperties;

const sectionTitle = {
  fontSize: "1rem",
  fontWeight: 700,
  color: "#3B1F0E",
  display: "flex",
  alignItems: "center",
  marginBottom: "4px",
} as React.CSSProperties;

const sectionSub = {
  fontSize: "0.82rem",
  color: "#9A7A5A",
  marginBottom: "16px",
  paddingLeft: "36px",
};

export default function ProfileForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [major, setMajor] = useState("");
  const [year, setYear] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [customInterest, setCustomInterest] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState("");
  const [experience, setExperience] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const [resume, setResume] = useState<File | null>(null);

  const toggleItem = (list: string[], setList: (v: string[]) => void, item: string, max: number) => {
    if (list.includes(item)) setList(list.filter(i => i !== item));
    else if (list.length < max) setList([...list, item]);
  };

  const addCustom = (val: string, list: string[], setList: (v: string[]) => void, setVal: (v: string) => void, max: number) => {
    const trimmed = val.trim();
    if (trimmed && !list.includes(trimmed) && list.length < max) {
      setList([...list, trimmed]);
      setVal("");
    }
  };

  const chip = (label: string, selected: boolean, onClick: () => void) => (
    <button
      key={label}
      type="button"
      onClick={onClick}
      style={{
        padding: "7px 14px",
        borderRadius: "100px",
        border: selected ? "1.5px solid #3B1F0E" : "1.5px solid rgba(59,31,14,0.18)",
        background: selected ? "#3B1F0E" : "white",
        color: selected ? "#FAF6F0" : "#3B1F0E",
        fontSize: "0.82rem",
        fontWeight: selected ? 600 : 400,
        cursor: "pointer",
        transition: "all 0.12s",
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
      }}
    >
      {selected && <span style={{ fontSize: "0.7rem" }}>✓</span>}
      {label}
    </button>
  );

  const isReady = major && year && interests.length > 0 && skills.length > 0 && goals.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isReady) return;
    setLoading(true);
    const user = JSON.parse(sessionStorage.getItem("studentUser") || "{}");
    const payload = { name: user.name || "Student", email: user.email || "", major, year, interests, skills, experience, goals };
    sessionStorage.setItem("studentProfile", JSON.stringify(payload));
    router.push("/student/matches");
  };

  return (
    <form onSubmit={handleSubmit}>

      {/* Resume + Major/Year row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>

        {/* Resume */}
        <div style={{ ...card, marginBottom: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{
              width: "48px", height: "48px", borderRadius: "10px",
              background: "#FAF6F0", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.4rem", flexShrink: 0,
            }}>⬆</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "#3B1F0E", marginBottom: "2px" }}>
                Upload your resume <span style={{ color: "#9A7A5A", fontWeight: 400 }}>(optional)</span>
              </div>
              <div style={{ fontSize: "0.78rem", color: "#9A7A5A", marginBottom: "10px" }}>
                We&apos;ll extract key info to improve your matches.
              </div>
              <input type="file" accept=".pdf,.doc,.docx" id="resume" style={{ display: "none" }}
                onChange={e => setResume(e.target.files?.[0] ?? null)} />
              <label htmlFor="resume" style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "7px 14px", borderRadius: "7px",
                border: "1.5px solid rgba(59,31,14,0.2)", background: "white",
                fontSize: "0.82rem", fontWeight: 500, color: "#3B1F0E", cursor: "pointer",
              }}>
                ⬆ {resume ? resume.name.slice(0, 18) + "..." : "Upload Resume"}
              </label>
              {!resume && <span style={{ fontSize: "0.72rem", color: "#9A7A5A", marginLeft: "10px" }}>PDF, DOCX (max 5MB)</span>}
            </div>
          </div>
        </div>

        {/* Major + Year */}
        <div style={{ ...card, marginBottom: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#3B1F0E", display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
              🎓 Major
            </label>
            <select value={major} onChange={e => setMajor(e.target.value)} required
              style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1.5px solid rgba(59,31,14,0.15)", fontSize: "0.88rem", color: "#3B1F0E", background: "white", fontFamily: "Inter, sans-serif" }}>
              <option value="">Select your major</option>
              {MAJORS.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#3B1F0E", display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
              📅 Academic Standing
            </label>
            <select value={year} onChange={e => setYear(e.target.value)} required
              style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1.5px solid rgba(59,31,14,0.15)", fontSize: "0.88rem", color: "#3B1F0E", background: "white", fontFamily: "Inter, sans-serif" }}>
              <option value="">Select your year</option>
              {YEARS.map(y => <option key={y}>{y}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* 1. Research Interests */}
      <div style={card}>
        <div style={sectionTitle}>
          <span style={sectionNum}>1</span>
          Research Interests
          <span style={{ marginLeft: "10px", fontSize: "0.72rem", fontWeight: 600, background: "#C8973A", color: "white", padding: "2px 8px", borderRadius: "100px" }}>Most Important</span>
          <span style={{ marginLeft: "auto", fontSize: "0.78rem", color: "#9A7A5A", fontWeight: 400 }}>Select up to 10</span>
        </div>
        <p style={sectionSub}>Select topics that genuinely excite you.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
          {INTERESTS.map(i => chip(i, interests.includes(i), () => toggleItem(interests, setInterests, i, 10)))}
          <div style={{ display: "flex", gap: "6px" }}>
            <input
              value={customInterest}
              onChange={e => setCustomInterest(e.target.value)}
              onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addCustom(customInterest, interests, setInterests, setCustomInterest, 10))}
              placeholder="Add your own"
              style={{ padding: "7px 12px", borderRadius: "100px", border: "1.5px dashed rgba(59,31,14,0.25)", fontSize: "0.82rem", color: "#3B1F0E", background: "white", width: "130px", fontFamily: "Inter, sans-serif" }}
            />
            <button type="button" onClick={() => addCustom(customInterest, interests, setInterests, setCustomInterest, 10)}
              style={{ padding: "7px 12px", borderRadius: "100px", border: "1.5px solid rgba(59,31,14,0.2)", background: "white", fontSize: "0.82rem", color: "#3B1F0E", cursor: "pointer" }}>
              + Add
            </button>
          </div>
        </div>
      </div>

      {/* 2. Skills */}
      <div style={card}>
        <div style={sectionTitle}>
          <span style={sectionNum}>2</span>
          Skills
          <span style={{ marginLeft: "auto", fontSize: "0.78rem", color: "#9A7A5A", fontWeight: 400 }}>Select up to 15</span>
        </div>
        <p style={sectionSub}>Add technical and soft skills you have.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
          {SKILLS.map(s => chip(s, skills.includes(s), () => toggleItem(skills, setSkills, s, 15)))}
          <div style={{ display: "flex", gap: "6px" }}>
            <input
              value={customSkill}
              onChange={e => setCustomSkill(e.target.value)}
              onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addCustom(customSkill, skills, setSkills, setCustomSkill, 15))}
              placeholder="Add your own"
              style={{ padding: "7px 12px", borderRadius: "100px", border: "1.5px dashed rgba(59,31,14,0.25)", fontSize: "0.82rem", color: "#3B1F0E", background: "white", width: "130px", fontFamily: "Inter, sans-serif" }}
            />
            <button type="button" onClick={() => addCustom(customSkill, skills, setSkills, setCustomSkill, 15)}
              style={{ padding: "7px 12px", borderRadius: "100px", border: "1.5px solid rgba(59,31,14,0.2)", background: "white", fontSize: "0.82rem", color: "#3B1F0E", cursor: "pointer" }}>
              + Add
            </button>
          </div>
        </div>
      </div>

      {/* 3. Experience */}
      <div style={card}>
        <div style={sectionTitle}><span style={sectionNum}>3</span> Experience</div>
        <p style={sectionSub}>Tell us about your research, work, or projects.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "16px", paddingLeft: "36px" }}>
          <div>
            <textarea
              value={experience}
              onChange={e => setExperience(e.target.value.slice(0, 1000))}
              placeholder="e.g. Research assistant in a robotics lab, internship at a biotech startup, independent project on machine learning..."
              rows={4}
              style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1.5px solid rgba(59,31,14,0.15)", fontSize: "0.88rem", color: "#3B1F0E", resize: "vertical", fontFamily: "Inter, sans-serif", background: "white" }}
            />
            <div style={{ fontSize: "0.75rem", color: "#9A7A5A", marginTop: "4px" }}>{experience.length} / 1000 characters</div>
          </div>
          <div style={{ background: "#FAF6F0", borderRadius: "10px", padding: "14px 16px", fontSize: "0.78rem", color: "#9A7A5A", minWidth: "150px" }}>
            <div style={{ fontWeight: 600, color: "#3B1F0E", marginBottom: "8px" }}>Examples</div>
            <ul style={{ listStyle: "none", lineHeight: 1.8 }}>
              <li>• Research Assistant</li>
              <li>• Lab Volunteer</li>
              <li>• Internship</li>
              <li>• Independent Project</li>
              <li>• Hackathons</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. Goals */}
      <div style={card}>
        <div style={sectionTitle}><span style={sectionNum}>4</span> Your Goals</div>
        <p style={sectionSub}>What are you hoping to achieve through research?</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", paddingLeft: "36px" }}>
          {GOALS.map(g => {
            const selected = goals.includes(g.label);
            return (
              <button
                key={g.label}
                type="button"
                onClick={() => toggleItem(goals, setGoals, g.label, 5)}
                style={{
                  padding: "14px 12px",
                  borderRadius: "10px",
                  border: selected ? "1.5px solid #3B1F0E" : "1.5px solid rgba(59,31,14,0.12)",
                  background: selected ? "#3B1F0E" : "white",
                  color: selected ? "#FAF6F0" : "#3B1F0E",
                  fontSize: "0.82rem",
                  fontWeight: selected ? 600 : 400,
                  cursor: "pointer",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.12s",
                }}
              >
                <span>{g.icon}</span>
                {g.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA bar */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: "175px",
        right: 0,
        background: "white",
        borderTop: "1px solid rgba(59,31,14,0.1)",
        padding: "14px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 50,
      }}>
        <div style={{ fontSize: "0.82rem", color: "#9A7A5A", display: "flex", alignItems: "center", gap: "6px" }}>
          💡 The more accurate your information, the better your matches!
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ fontSize: "0.75rem", color: "#9A7A5A" }}>🔒 We&apos;ll never share your information.</div>
          <button
            type="submit"
            disabled={!isReady || loading}
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "12px 24px", borderRadius: "10px", border: "none",
              background: isReady ? "#3B1F0E" : "rgba(59,31,14,0.25)",
              color: "#FAF6F0", fontSize: "0.95rem", fontWeight: 600,
              cursor: isReady ? "pointer" : "not-allowed",
              transition: "background 0.15s",
            }}
          >
            ✦ {loading ? "Finding matches..." : "Analyze My Matches"} →
          </button>
        </div>
      </div>

    </form>
  );
}
