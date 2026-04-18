import ProfileForm from "./ProfileForm";

export default function ProfilePage() {
  return (
    <div style={{ padding: "40px 48px 80px", maxWidth: "880px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "2.2rem", fontWeight: 800, color: "#3B1F0E", letterSpacing: "-0.5px", marginBottom: "6px" }}>
            Tell us about yourself.
          </h1>
          <p style={{ fontSize: "0.95rem", color: "#9A7A5A" }}>
            The more detail you give, the better your professor matches will be.
          </p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderRadius: "8px", border: "1.5px solid rgba(59,31,14,0.15)", background: "white", fontSize: "0.85rem", fontWeight: 500, color: "#3B1F0E", cursor: "pointer", whiteSpace: "nowrap" }}>
          💡 How matching works
        </button>
      </div>
      <ProfileForm />
    </div>
  );
}
