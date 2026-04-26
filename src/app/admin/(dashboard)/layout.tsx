import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "../components/AdminSidebar";
import { AdminHeader } from "../components/AdminHeader";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const role = (user.user_metadata?.role as string) || "editor";

  return (
    <div className="flex min-h-screen bg-[#F7F5F0]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader userEmail={user.email || ""} userRole={role} />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
