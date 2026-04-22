import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/dashboard/admin-sidebar";
import { AdminLoginForm } from "@/components/dashboard/admin-login-form";
import { SidebarProvider } from "@/lib/sidebar-context";
import { TitleProvider } from "@/lib/title-context";
import { Topbar } from "@/components/dashboard/shared/topbar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("tukka_admin_session");
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isAdmin = user?.app_metadata?.role === "admin" || user?.user_metadata?.role === "admin";
  const isVerified = adminSession?.value === "verified" || isAdmin;

  if (!isVerified) {
    return <AdminLoginForm />;
  }

  return (
    <SidebarProvider>
      <TitleProvider>
        <div className="flex min-h-screen bg-[#050508]">
          <AdminSidebar />
          <main className="flex-1 lg:ml-[260px] min-h-screen flex flex-col">
            <Topbar />
            <div className="flex-1 overflow-x-hidden">
              {children}
            </div>
          </main>
        </div>
      </TitleProvider>
    </SidebarProvider>
  );
}
