import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function StudentPage() {
  const session = await auth();
  if (session) redirect("/student/profile");

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
          background: "linear-gradient(135deg, rgba(20,8,2,0.92) 0%, rgba(20,8,2,0.75) 100%)",
        }} />
      </div>

      {/* Card */}
      <div style={{
        position: "relative",
        zIndex: 10,
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{
          background: "rgba(250,246,240,0.97)",
          borderRadius: "20px",
          padding: "48px 44px",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
          textAlign: "center",
        }}>
          {/* Logo */}
          <div style={{
            fontFamily: "Georgia, serif",
            fontSize: "1.3rem",
            fontWeight: 800,
            color: "#3B1F0E",
            marginBottom: "28px",
          }}>
            Hawk<span style={{ color: "#C8973A" }}>Search</span>
          </div>

          <h1 style={{
            fontFamily: "Georgia, serif",
            fontSize: "1.6rem",
            fontWeight: 800,
            color: "#3B1F0E",
            marginBottom: "10px",
            letterSpacing: "-0.5px",
          }}>
            Welcome, student.
          </h1>

          <p style={{
            fontSize: "0.9rem",
            color: "#9A7A5A",
            lineHeight: 1.65,
            marginBottom: "32px",
          }}>
            Sign in with your Lehigh Google account to find your research match.
          </p>

          {/* Google sign in */}
          <form action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/student/profile" });
          }}>
            <button
              type="submit"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                padding: "14px 20px",
                borderRadius: "10px",
                border: "1.5px solid rgba(59,31,14,0.15)",
                background: "white",
                color: "#3B1F0E",
                fontSize: "0.95rem",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                transition: "box-shadow 0.15s",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 12 24 12c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34.5 6.5 29.5 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.3 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8H6.4C9.8 35.5 16.4 44 24 44z"/>
                <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.3 4.1-4.1 5.5l6.2 5.2C37 39.4 44 34 44 24c0-1.3-.1-2.6-.4-3.9z"/>
              </svg>
              Continue with Google
            </button>
          </form>

          <p style={{ marginTop: "20px", fontSize: "0.75rem", color: "#9A7A5A" }}>
            Only Lehigh University accounts are supported.
          </p>
        </div>
      </div>
    </main>
  );
}
