"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Megaphone,
  AlertTriangle,
  Wallet,
  Settings,
  LogOut,
  Shield,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { logoutAdmin } from "@/lib/admin-actions";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/lib/sidebar-context";

const navItems = [
  { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Campaigns", href: "/dashboard/admin/campaigns", icon: Megaphone },
  { label: "Disputes", href: "/dashboard/admin/disputes", icon: AlertTriangle },
  { label: "Finances", href: "/dashboard/admin/finances", icon: Wallet },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, close } = useSidebar();
  const [userEmail, setUserEmail] = useState<string>("");
  const [userInitials, setUserInitials] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const supabase = createClient();
    
    const updateUserInfo = (user: any) => {
      if (user) {
        setUserEmail(user.email || "admin@clipbull.com");
        const name = user.user_metadata?.username || user.user_metadata?.full_name || user.email?.split("@")[0] || "Admin";
        setUserName(name);
        setUserInitials(name.substring(0, 2).toUpperCase());
      } else {
        // Fallback for Secret Admin login
        setUserEmail("platform.admin@clipbull.com");
        setUserInitials("SA");
        setUserName("System Admin");
      }
    };

    supabase.auth.getUser().then(({ data: { user } }) => updateUserInfo(user));
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      updateUserInfo(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  const handleSignOut = async () => {
    // 1. Try Supabase sign out
    const supabase = createClient();
    await supabase.auth.signOut();
    
    // 2. Clear Admin cookie
    await logoutAdmin();
    
    // 3. Redirect
    router.push("/auth/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#060606] border-r border-white/[0.06] w-[260px]">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/[0.06] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            <Shield size={16} className="text-white" />
          </div>
          <span className="text-base font-bold tracking-tighter text-white">ClipBull</span>
        </Link>
        <button 
          onClick={close}
          className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-zinc-500 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Role Label */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
            Admin Dashboard
          </span>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-1 space-y-0.5 overflow-y-auto">
        {navItems.map((item, i) => {
          const isActive =
            item.href === "/dashboard/admin"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.035, duration: 0.2 }}
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative cursor-pointer",
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400"
                    : "text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04]"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-cyan-400 rounded-r-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <item.icon
                  size={16}
                  className={cn(
                    "shrink-0 transition-colors",
                    isActive ? "text-cyan-400" : "text-zinc-600 group-hover:text-zinc-400"
                  )}
                />
                {item.label}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
            {userInitials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">{userName}</div>
            <div className="text-[11px] text-zinc-600 truncate">{userEmail}</div>
          </div>
        </div>
        <button 
          onClick={handleSignOut}
          className="w-full flex items-center gap-2 text-xs text-zinc-600 hover:text-zinc-400 transition-colors px-1 py-2 rounded-md hover:bg-white/[0.04] cursor-pointer"
        >
          <LogOut size={13} />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside
        className="fixed top-0 left-0 h-screen z-40 hidden lg:flex flex-col"
        style={{ width: "var(--sidebar-width)" }}
      >
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-screen z-[101] flex flex-col lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
