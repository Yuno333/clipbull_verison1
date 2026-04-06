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
  Video
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
  { label: "Clips", href: "/dashboard/admin/clips", icon: Video },
  { label: "Disputes", href: "/dashboard/admin/disputes", icon: AlertTriangle },
  { label: "Finances", href: "/dashboard/admin/finances", icon: Wallet },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

function SidebarContent({ 
  pathname, 
  userInitials, 
  userName, 
  userEmail, 
  onClose, 
  onSignOut 
}: { 
  pathname: string;
  userInitials: string;
  userName: string;
  userEmail: string;
  onClose: () => void;
  onSignOut: () => void;
}) {
  return (
    <div className="flex flex-col h-full glass border-r border-white/5 w-[260px] shadow-2xl relative">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] antigravity-hover">
            <Shield size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold tracking-tighter text-white">ClipBull</span>
        </Link>
        <button 
          onClick={onClose}
          className="lg:hidden p-2 rounded-xl hover:bg-white/5 text-zinc-500 transition-colors cursor-pointer"
          aria-label="Close Sidebar"
        >
          <X size={20} />
        </button>
      </div>

      {/* Role Label */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
            Admin Dashboard
          </span>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item, i) => {
          const isActive =
            item.href === "/dashboard/admin"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group relative",
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400 shadow-[inset_0_0_12px_rgba(6,182,212,0.05)]"
                    : "text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.03]"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-cyan-400 rounded-r-full shadow-[0_0_10px_rgba(6,182,212,0.6)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <item.icon
                  size={18}
                  className={cn(
                    "shrink-0 transition-colors duration-300",
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
      <div className="p-4 bg-white/[0.02] border-t border-white/5 mt-auto">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5 mb-3 group transition-all hover:bg-white/[0.05]">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-lg">
            {userInitials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-white truncate">{userName}</div>
            <div className="text-[10px] font-medium text-zinc-500 truncate">{userEmail}</div>
          </div>
        </div>
        <button 
          onClick={onSignOut}
          className="w-full flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-zinc-300 transition-all px-4 py-3 rounded-xl hover:bg-white/[0.05] cursor-pointer"
        >
          <LogOut size={14} className="text-zinc-600" />
          Sign out
        </button>
      </div>
    </div>
  );
}

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
    const supabase = createClient();
    await supabase.auth.signOut();
    await logoutAdmin();
    router.push("/auth/login");
  };

  const sharedProps = {
    pathname,
    userInitials,
    userName,
    userEmail,
    onClose: close,
    onSignOut: handleSignOut
  };

  return (
    <>
      <aside
        className="fixed top-0 left-0 h-screen z-40 hidden lg:flex flex-col"
        style={{ width: "var(--sidebar-width)" }}
      >
        <SidebarContent {...sharedProps} />
      </aside>

      <AnimatePresence mode="wait">
        {isOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 h-screen flex flex-col"
            >
              <SidebarContent {...sharedProps} />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
