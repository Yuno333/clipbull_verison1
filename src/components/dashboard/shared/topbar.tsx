"use client";

import { Bell, Search, Menu, X } from "lucide-react";
import { useRole } from "@/lib/role-context";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client"
import { SearchPalette } from "./search-palette";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { useSidebar } from "@/lib/sidebar-context";
import { useTitle } from "@/lib/title-context";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Topbar() {
  const { role } = useRole();
  const { isOpen, toggle } = useSidebar();
  const { title, subtitle } = useTitle();
  const [userInitials, setUserInitials] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Command K Shortcut
  useKeyboardShortcut("k", () => setIsSearchOpen(prev => !prev));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    
    const supabase = createClient();
    const updateUserInfo = (user: any) => {
      if (user) {
        const name = user.user_metadata?.username || user.user_metadata?.full_name || user.email?.split("@")[0] || "User";
        setUserInitials(name.substring(0, 2).toUpperCase());
      } else {
        setUserInitials("??");
      }
    };

    supabase.auth.getUser().then(({ data: { user } }) => updateUserInfo(user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      updateUserInfo(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-30 transition-all duration-300 border-b",
          scrolled 
            ? "border-white/10 bg-black/60 backdrop-blur-2xl shadow-spatial h-[var(--topbar-height)]" 
            : "border-transparent bg-transparent h-[var(--topbar-height)] sm:h-[var(--topbar-height)]"
        )}
      >
        <div className="flex items-center justify-between h-full px-4 sm:px-6 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={toggle}
              className="lg:hidden p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/5 text-zinc-400 hover:text-white transition-all cursor-pointer z-50"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
            
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              key={title}
              className="min-w-0"
            >
              <h1 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">{title}</h1>
              {subtitle && <p className="text-[10px] sm:text-[11px] text-zinc-500 truncate font-medium">{subtitle}</p>}
            </motion.div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[12px] text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.05] hover:border-white/10 transition-all min-w-[240px] group cursor-pointer shadow-inner"
            >
              <Search size={14} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
              <span className="font-medium text-zinc-600 group-hover:text-zinc-400 transition-colors">Search anything...</span>
              <div className="ml-auto flex items-center gap-1 opacity-20 group-hover:opacity-60 transition-opacity">
                <span className="bg-white/10 px-1.5 py-0.5 rounded-md font-mono text-[9px]">⌘</span>
                <span className="bg-white/10 px-1.5 py-0.5 rounded-md font-mono text-[9px]">K</span>
              </div>
            </button>
            
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/5 text-zinc-400 hover:text-white transition-all cursor-pointer"
            >
              <Search size={18} />
            </button>

            <div className="flex items-center gap-2 sm:gap-3">
              <button className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-all text-zinc-400 hover:text-white cursor-pointer group">
                <Bell size={18} />
                <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-primary rounded-full group-hover:scale-150 transition-transform shadow-[0_0_8px_rgba(124,58,237,0.6)]" />
              </button>

              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/80 to-accent/80 p-[1px] shrink-0 shadow-lg cursor-pointer hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-[11px] bg-[#0a0a0c] flex items-center justify-center text-[12px] font-bold text-white uppercase tracking-tighter">
                  {userInitials}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <SearchPalette 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
}
