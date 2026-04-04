"use client";

import { Bell, Search } from "lucide-react";
import { useRole } from "@/lib/role-context";

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export function Topbar({ title, subtitle }: TopbarProps) {
  const { role } = useRole();

  return (
    <header
      className="sticky top-0 z-30 border-b border-white/5 bg-black/70 backdrop-blur-xl"
      style={{ height: "var(--topbar-height)" }}
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Left: page title */}
        <div>
          <h1 className="text-sm font-semibold text-white">{title}</h1>
          {subtitle && <p className="text-xs text-zinc-500">{subtitle}</p>}
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-xs text-zinc-500 hover:text-zinc-300 hover:border-white/15 transition-all min-w-[160px]">
            <Search size={13} />
            <span>Search...</span>
            <span className="ml-auto text-[10px] bg-white/8 px-1.5 py-0.5 rounded font-mono">⌘K</span>
          </button>

          {/* Notifications */}
          <button className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/8 hover:bg-white/10 transition-all">
            <Bell size={15} className="text-zinc-400" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
          </button>

          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center text-xs font-bold text-white">
            {role === "creator" ? "AC" : "TM"}
          </div>
        </div>
      </div>
    </header>
  );
}
