"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Megaphone,
  ShoppingBag,
  Send,
  DollarSign,
  AlertTriangle,
  Settings,
  LogOut,
  Scissors,
} from "lucide-react";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { label: "Dashboard", href: "/dashboard/clipper", icon: LayoutDashboard },
  { label: "Available Offers", href: "/dashboard/clipper/offers", icon: ShoppingBag },
  { label: "My Campaigns", href: "/dashboard/clipper/campaigns", icon: Megaphone },
  { label: "Submit Clips", href: "/dashboard/clipper/submit", icon: Send },
  { label: "Earnings & Wallet", href: "/dashboard/clipper/earnings", icon: DollarSign },
  { label: "Disputes", href: "/dashboard/clipper/disputes", icon: AlertTriangle },
  { label: "Settings", href: "/dashboard/clipper/settings", icon: Settings },
];

export function ClipperSidebar() {
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState<string>("Loading...");
  const [userInitials, setUserInitials] = useState<string>("..");
  const [userName, setUserName] = useState<string>("Loading...");

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || "Unknown");
        const name = user.user_metadata?.username || user.user_metadata?.full_name || user.email?.split("@")[0] || "Clipper";
        setUserName(name);
        setUserInitials(name.substring(0, 2).toUpperCase());
      }
    };
    fetchUser();
  }, []);

  return (
    <aside
      className="fixed top-0 left-0 h-screen z-40 flex flex-col"
      style={{ width: "var(--sidebar-width)" }}
    >
      <div className="flex flex-col h-full bg-[#060606] border-r border-white/[0.06]">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/[0.06]">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(255,79,0,0.4)]">
              <Scissors size={16} className="text-white" />
            </div>
            <span className="text-base font-bold tracking-tighter text-white">ClipBull</span>
          </Link>
        </div>

        {/* Role Label */}
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
              Clipper Dashboard
            </span>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-1 space-y-0.5 overflow-y-auto">
          {navItems.map((item, i) => {
            const isActive =
              item.href === "/dashboard/clipper"
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
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04]"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="clipper-sidebar-active"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-emerald-400 rounded-r-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <item.icon
                    size={16}
                    className={cn(
                      "shrink-0 transition-colors",
                      isActive ? "text-emerald-400" : "text-zinc-600 group-hover:text-zinc-400"
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
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-xs font-bold text-white shrink-0">
              {userInitials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">{userName}</div>
              <div className="text-[11px] text-zinc-600 truncate">{userEmail}</div>
            </div>
          </div>
          <button className="w-full flex items-center gap-2 text-xs text-zinc-600 hover:text-zinc-400 transition-colors px-1 py-1 rounded-md hover:bg-white/[0.04] cursor-pointer">
            <LogOut size={13} />
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}
