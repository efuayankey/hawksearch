"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function StudentPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    sessionStorage.setItem("studentUser", JSON.stringify({ name, email }));
    router.push("/student/profile");
  };

  return (
    <main style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image src="/hero.png" alt="" fill priority
          style={{ objectFit: "cover", objectPosition: "center", filter: "blur(4px)", transform: "scale(1.08)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(20,8,2,0.92) 0%, rgba(20,8,2,0.75) 100%)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 10, height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "rgba(250,246,240,0.97)", borderRadius: "20px", padding: "48px 44px", width: "100%", maxWidth: "420px", boxShadow: "0 24px 64px rgba(0,0,0,0.35)", textAlign: "center" }}>

          <div style={{ fontFamily: "Georgia, serif", fontSize: "1.3rem", fontWeight: 800, color: "#3B1F0E", marginBottom: "28px" }}>
            Hawk<span style={{ color: "#C8973A" }}>Search</span>
          </div>

          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "1.6rem", fontWeight: 800, color: "#3B1F0E", marginBottom: "8px", letterSpacing: "-0.5px" }}>
            Welcome, student.
          </h1>
          <p style={{ fontSize: "0.9rem", color: "#9A7A5A", lineHeight: 1.65, marginBottom: "28px" }}>
            Enter your details to find your research match at Lehigh.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <input
              type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required
              style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1.5px solid rgba(59,31,14,0.15)", fontSize: "0.92rem", color: "#3B1F0E", fontFamily: "Inter, sans-serif", background: "white" }}
            />
            <input
              type="email" placeholder="Lehigh email" value={email} onChange={e => setEmail(e.target.value)} required
              style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1.5px solid rgba(59,31,14,0.15)", fontSize: "0.92rem", color: "#3B1F0E", fontFamily: "Inter, sans-serif", background: "white" }}
            />
            <button type="submit"
              style={{ width: "100%", padding: "14px", borderRadius: "10px", border: "none", background: "#3B1F0E", color: "#FAF6F0", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer", marginTop: "4px" }}>
              Get Started →
            </button>
          </form>

          <p style={{ marginTop: "16px", fontSize: "0.75rem", color: "#9A7A5A" }}>
            Lehigh University · Your data is never shared.
          </p>
        </div>
      </div>
    </main>
  );
}
