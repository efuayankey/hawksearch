import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();
  if (!session) redirect("/student");

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#FAF6F0",
      fontFamily: "Georgia, serif",
      color: "#3B1F0E",
    }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "8px" }}>
          Welcome, {session.user?.name?.split(" ")[0]} 👋
        </h1>
        <p style={{ color: "#9A7A5A" }}>Profile form coming next...</p>
      </div>
    </div>
  );
}
