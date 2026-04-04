"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, UserPlus, MoreVertical, Shield, ShieldAlert, UserCheck, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const mockUsers = [
  { id: "1", name: "Alex Creator", email: "alex@creator.com", role: "creator", status: "active", joined: "2024-03-15" },
  { id: "2", name: "Sarah Clipper", email: "sarah@clipper.com", role: "clipper", status: "active", joined: "2024-03-16" },
  { id: "3", name: "Mike Johnson", email: "mike@example.com", role: "creator", status: "pending", joined: "2024-03-20" },
  { id: "4", name: "David Wilson", email: "david@clipper.com", role: "clipper", status: "suspended", joined: "2024-02-10" },
  { id: "5", name: "Emma Thompson", email: "emma@creator.com", role: "creator", status: "active", joined: "2024-03-22" },
];

import { useTitle } from "@/lib/title-context";

export default function UsersPage() {
  useTitle("User Management", "Manage all creators and clippers on the platform.");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "creator" | "clipper">("all");

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) || 
                         user.email.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === "all" || user.role === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="p-8 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="opacity-0 h-0 overflow-hidden absolute">
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">User Management</h1>
            <p className="text-zinc-400 text-sm">Manage all creators and clippers on the platform.</p>
          </div>
          <Button className="bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl h-11 px-6 font-semibold shadow-[0_0_20px_rgba(6,182,212,0.3)] gap-2 ml-auto">
            <UserPlus size={18} />
            Add User
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/[0.02] border border-white/[0.08] text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-all"
            />
          </div>
          <div className="flex p-1 bg-white/[0.02] border border-white/[0.08] rounded-xl">
            {(["all", "creator", "clipper"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-2 rounded-lg text-sm font-medium capitalize transition-all",
                  activeTab === tab 
                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20" 
                    : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/[0.06] bg-white/[0.01]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">User</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Role</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Status</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Joined</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredUsers.map((user, i) => (
                <motion.tr 
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white",
                        user.role === 'creator' ? 'bg-gradient-to-br from-primary to-orange-500' : 'bg-gradient-to-br from-emerald-500 to-teal-400'
                      )}>
                        {user.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{user.name}</div>
                        <div className="text-xs text-zinc-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md",
                      user.role === 'creator' ? 'text-primary bg-primary/10' : 'text-emerald-400 bg-emerald-500/10'
                    )}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        user.status === 'active' ? 'bg-emerald-500' : 
                        user.status === 'pending' ? 'bg-amber-500' : 'bg-rose-500'
                      )} />
                      <span className={cn(
                        "text-xs capitalize",
                        user.status === 'active' ? 'text-emerald-400' : 
                        user.status === 'pending' ? 'text-amber-400' : 'text-rose-400'
                      )}>
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-400">{user.joined}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors" title="Verify">
                        <UserCheck size={16} />
                      </button>
                      <button className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors" title="Suspend">
                        <Ban size={16} />
                      </button>
                      <button className="p-2 rounded-lg bg-white/5 text-zinc-400 hover:bg-white/10 transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-zinc-600" />
              </div>
              <h3 className="text-white font-medium mb-1">No users found</h3>
              <p className="text-zinc-500 text-sm">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
