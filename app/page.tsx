import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>

      {/* Background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/hero.png"
          alt=""
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center", filter: "blur(4px)", transform: "scale(1.08)" }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(120deg, rgba(20,8,2,0.92) 0%, rgba(20,8,2,0.65) 55%, rgba(20,8,2,0.2) 100%)",
        }} />
      </div>

      {/* Content */}
      <div style={{
        position: "relative",
        zIndex: 10,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: "80px",
        maxWidth: "580px",
        gap: 0,
      }}>

        {/* Logo */}
        <div style={{
          fontFamily: "Georgia, serif",
          fontSize: "1.25rem",
          fontWeight: 800,
          color: "white",
          marginBottom: "48px",
          letterSpacing: "-0.5px",
        }}>
          Hawk<span style={{ color: "#C8973A" }}>Search</span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "Georgia, serif",
          fontSize: "3.5rem",
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: "-1.5px",
          color: "white",
          marginBottom: "20px",
        }}>
          Research connections,{" "}
          <span style={{ color: "#C8973A" }}>made easy.</span>
        </h1>

        {/* Subtext */}
        <p style={{
          fontSize: "1rem",
          lineHeight: 1.7,
          color: "rgba(255,255,255,0.55)",
          maxWidth: "360px",
          marginBottom: "40px",
        }}>
          AI-powered matching between Lehigh students and professors. Find the right lab, send the right email.
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "320px" }}>

          <Link href="/student" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderRadius: "12px",
            background: "#3B1F0E",
            color: "#FAF6F0",
            textDecoration: "none",
            boxShadow: "0 4px 24px rgba(59,31,14,0.5)",
            transition: "transform 0.15s",
          }}>
            <div>
              <div style={{ fontSize: "0.95rem", fontWeight: 600 }}>I&apos;m a Student</div>
              <div style={{ fontSize: "0.78rem", opacity: 0.55, marginTop: "3px" }}>Find professors that match my interests</div>
            </div>
            <span style={{ fontSize: "1.1rem", opacity: 0.45, marginLeft: "16px" }}>→</span>
          </Link>

          <Link href="/professor" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.9)",
            color: "#3B1F0E",
            textDecoration: "none",
            boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
            transition: "transform 0.15s",
          }}>
            <div>
              <div style={{ fontSize: "0.95rem", fontWeight: 600 }}>I&apos;m a Professor</div>
              <div style={{ fontSize: "0.78rem", opacity: 0.5, marginTop: "3px" }}>Discover students looking for research</div>
            </div>
            <span style={{ fontSize: "1.1rem", opacity: 0.3, marginLeft: "16px" }}>→</span>
          </Link>

        </div>

        {/* Footer note */}
        <p style={{ marginTop: "40px", fontSize: "0.75rem", color: "rgba(255,255,255,0.2)" }}>
          Lehigh University · 2026
        </p>

      </div>
    </main>
  );
}
