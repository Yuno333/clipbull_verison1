"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Command, LayoutDashboard, Megaphone, Wallet, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface SearchPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const commands = [
  { group: "Navigation", items: [
    { label: "Dashboard Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Active Campaigns", href: "/dashboard/creator/campaigns", icon: Megaphone },
    { label: "Wallet & Finances", href: "/dashboard/creator/wallet", icon: Wallet },
    { label: "Account Settings", href: "/dashboard/creator/settings", icon: Settings },
  ]},
  { group: "Support", items: [
    { label: "Help Center", href: "#", icon: Command },
    { label: "Contact Support", href: "#", icon: X },
  ]}
];

export function SearchPalette({ isOpen, onClose }: SearchPaletteProps) {
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (isOpen) setSearch("");
  }, [isOpen]);

  const filteredCommands = commands.map(group => ({
    ...group,
    items: group.items.filter(item => 
      item.label.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(group => group.items.length > 0);

  const handleSelect = (href: string) => {
    onClose();
    if (href !== "#") router.push(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed left-1/2 top-[20%] -translate-x-1/2 w-full max-w-xl z-[101] p-4"
          >
            <div className="bg-[#0a0a0c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                <Search size={18} className="text-zinc-500 mr-3" />
                <input
                  autoFocus
                  placeholder="Type a command or search..."
                  className="bg-transparent border-none outline-none text-white w-full h-10 text-sm placeholder:text-zinc-600"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button 
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="max-h-[350px] overflow-y-auto p-2">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((group) => (
                    <div key={group.group} className="mb-4 last:mb-0">
                      <div className="px-3 py-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                        {group.group}
                      </div>
                      <div className="space-y-1">
                        {group.items.map((item) => (
                          <button
                            key={item.label}
                            onClick={() => handleSelect(item.href)}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-all text-left group"
                          >
                            <item.icon size={16} className="text-zinc-600 group-hover:text-primary transition-colors" />
                            {item.label}
                            <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-zinc-600">Jump to</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center text-zinc-500 text-sm">
                    No results found for "{search}"
                  </div>
                )}
              </div>

              <div className="px-4 py-3 bg-white/[0.01] border-t border-white/5 flex items-center gap-4 text-[10px] text-zinc-600">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded font-mono">ENTER</span>
                  <span>to select</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded font-mono">ESC</span>
                  <span>to close</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
