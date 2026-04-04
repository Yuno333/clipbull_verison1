import { Bell, Search } from "lucide-react";
import { useRole } from "@/lib/role-context";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { SearchPalette } from "./search-palette";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export function Topbar({ title, subtitle }: TopbarProps) {
  const { role } = useRole();
  const [userInitials, setUserInitials] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Command K Shortcut
  useKeyboardShortcut("k", () => setIsSearchOpen(prev => !prev));

  useEffect(() => {
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

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <header
        className="sticky top-0 z-30 border-b border-white/5 bg-black/70 backdrop-blur-xl"
        style={{ height: "var(--topbar-height)" }}
      >
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-semibold text-white truncate">{title}</h1>
            {subtitle && <p className="text-[10px] text-zinc-500 truncate">{subtitle}</p>}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[11px] text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.05] hover:border-white/10 transition-all min-w-[200px] group cursor-pointer"
            >
              <Search size={13} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
              <span className="font-medium text-zinc-600 group-hover:text-zinc-400 transition-colors">Search platform...</span>
              <div className="ml-auto flex items-center gap-0.5 opacity-40 group-hover:opacity-70 transition-opacity">
                <span className="text-[9px] bg-white/10 px-1 py-0.5 rounded-md font-mono">⌘</span>
                <span className="text-[9px] bg-white/10 px-1 py-0.5 rounded-md font-mono">K</span>
              </div>
            </button>

            <div className="flex items-center gap-3">
              <button className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-all text-zinc-400 hover:text-white cursor-pointer group">
                <Bell size={16} />
                <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-primary rounded-full group-hover:scale-125 transition-transform" />
              </button>

              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/80 to-orange-500/80 p-[1px]">
                <div className="w-full h-full rounded-full bg-[#0a0a0c] flex items-center justify-center text-[11px] font-bold text-white shadow-inner">
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
