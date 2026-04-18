"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const nav = [
  { label: "Home", href: "/student/profile", icon: "⊞" },
  { label: "My Matches", href: "/student/matches", icon: "◎" },
  { label: "Messages", href: "/student/messages", icon: "✉" },
  { label: "Saved", href: "/student/saved", icon: "♡" },
  { label: "Settings", href: "/student/settings", icon: "⚙" },
];

export default function Sidebar({
  userName,
  userImage,
  signOutAction,
}: {
  userName: string;
  userImage: string;
  signOutAction: () => Promise<void>;
}) {
  const pathname = usePathname();

  return (
    <aside style={{
      width: "175px",
      minWidth: "175px",
      background: "#F0E8DA",
      display: "flex",
      flexDirection: "column",
      borderRight: "1px solid rgba(59,31,14,0.1)",
      height: "100vh",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Logo */}
      <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid rgba(59,31,14,0.08)" }}>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "1rem", fontWeight: 800, color: "#3B1F0E" }}>
          Hawk<span style={{ color: "#C8973A" }}>Search</span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: "12px 8px", flex: 1 }}>
        {nav.map(item => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                borderRadius: "8px",
                marginBottom: "2px",
                textDecoration: "none",
                fontSize: "0.88rem",
                fontWeight: active ? 600 : 400,
                color: active ? "#FAF6F0" : "#5C3317",
                background: active ? "#3B1F0E" : "transparent",
                transition: "background 0.15s, color 0.15s",
              }}
            >
              <span style={{ fontSize: "1rem", opacity: 0.8 }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Mascot */}
      <div style={{
        position: "relative",
        height: "180px",
        overflow: "hidden",
        margin: "0 0 0 -10px",
      }}>
        <Image
          src="/hero.png"
          alt="HawkSearch mascot"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "20% 30%",
            opacity: 0.9,
          }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, #F0E8DA 0%, transparent 30%, transparent 70%, #F0E8DA 100%)",
        }} />
      </div>

      {/* Sign out */}
      <div style={{ padding: "12px 8px", borderTop: "1px solid rgba(59,31,14,0.08)" }}>
        <form action={signOutAction}>
          <button
            type="submit"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 12px",
              borderRadius: "8px",
              width: "100%",
              border: "none",
              background: "transparent",
              fontSize: "0.88rem",
              color: "#9A7A5A",
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <span>↩</span> Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
