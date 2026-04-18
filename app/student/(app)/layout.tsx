import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Sidebar from "./Sidebar";

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/student");

  return (
    <div style={{ display: "flex", height: "100vh", background: "#FAF6F0", overflow: "hidden" }}>
      <Sidebar
        userName={session.user?.name ?? ""}
        userImage={session.user?.image ?? ""}
        signOutAction={async () => { "use server"; await signOut({ redirectTo: "/" }); }}
      />
      <main style={{ flex: 1, overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}
