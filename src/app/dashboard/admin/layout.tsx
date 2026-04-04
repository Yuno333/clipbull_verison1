import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/dashboard/admin-sidebar";
import { AdminLoginForm } from "@/components/dashboard/admin-login-form";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("clipbull_admin_session");
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isAdmin = user?.app_metadata?.role === "admin" || user?.user_metadata?.role === "admin";
  const isVerified = adminSession?.value === "verified" || isAdmin;

  if (!isVerified) {
    return <AdminLoginForm />;
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div
        className="flex-1 min-h-screen overflow-y-auto"
        style={{ marginLeft: "var(--sidebar-width)" }}
      >
        {children}
      </div>
    </div>
  );
}
