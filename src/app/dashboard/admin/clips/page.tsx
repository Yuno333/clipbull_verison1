"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle, XCircle, AlertOctagon, LinkIcon, Video, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { mockClipSubmissions, ClipStatus } from "@/lib/mock-data";
import { useTitle } from "@/lib/title-context";

export default function ClipsReviewPage() {
  useTitle("Clips Review", "Review submitted clips, check performance, and manage approvals.");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | ClipStatus>("All");

  const filteredClips = mockClipSubmissions.filter((clip) => {
    const matchesSearch =
      clip.clipperName.toLowerCase().includes(search.toLowerCase()) ||
      clip.platform.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === "All" || clip.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6 max-w-6xl mx-auto w-full space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="opacity-0 h-0 overflow-hidden absolute">
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Clips Review</h1>
            <p className="text-zinc-400 text-sm">Review submitted clips, check performance, and manage approvals.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input
                type="text"
                placeholder="Search by clipper name or platform..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/[0.02] border border-white/[0.08] text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-all"
              />
            </div>
            <div className="flex p-1 bg-white/[0.02] border border-white/[0.08] rounded-xl overflow-x-auto scrollbar-hide">
              {(["All", "Pending", "Approved", "Rejected"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-6 py-2 rounded-lg text-sm font-medium capitalize transition-all whitespace-nowrap",
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

          {/* Clips Table */}
          <div className="overflow-x-auto rounded-2xl border border-white/[0.06] bg-white/[0.01]">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Clipper</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Clip Details</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Performance</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 text-center">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 text-right">Review Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filteredClips.map((clip, i) => (
                  <motion.tr
                    key={clip.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Clipper Details */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br from-emerald-500 to-teal-400">
                          {clip.clipperAvatar}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{clip.clipperName}</div>
                          <div className="text-xs text-zinc-500 font-mono">ID: {clip.clipperId}</div>
                        </div>
                      </div>
                    </td>

                    {/* Clip Link & Platform */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-sm text-zinc-300 font-medium">{clip.platform}</div>
                        <a
                          href={clip.postLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-cyan-500 hover:text-cyan-400 hover:underline transition-colors w-fit"
                        >
                          <LinkIcon size={12} />
                          View Post Entry
                        </a>
                      </div>
                    </td>

                    {/* Performance */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-sm text-white font-mono">
                          {clip.impressions.toLocaleString()} views
                        </div>
                        <div className="text-xs text-emerald-400 font-mono">
                          ₦{clip.earnings.toLocaleString()} earned
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-sm text-zinc-400">
                      {clip.submittedAt}
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                        <div
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            clip.status === "Approved"
                              ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                              : clip.status === "Pending"
                              ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                              : "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]"
                          )}
                        />
                        <span
                          className={cn(
                            "text-xs font-semibold tracking-wider uppercase",
                            clip.status === "Approved"
                              ? "text-emerald-400"
                              : clip.status === "Pending"
                              ? "text-amber-400"
                              : "text-rose-400"
                          )}
                        >
                          {clip.status}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      {clip.status === "Pending" ? (
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors"
                            title="Approve Clip"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button
                            className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 transition-colors"
                            title="Reject Clip"
                          >
                            <XCircle size={16} />
                          </button>
                          <button
                            className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 hover:text-yellow-300 transition-colors"
                            title="Flag Fraud"
                          >
                            <AlertTriangle size={16} />
                          </button>
                        </div>
                      ) : (
                         <div className="text-xs text-zinc-600 font-medium italic">Reviewed</div>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {filteredClips.length === 0 && (
              <div className="p-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
                  <Video size={24} className="text-zinc-600" />
                </div>
                <h3 className="text-white font-medium mb-1">No clips found</h3>
                <p className="text-zinc-500 text-sm">
                  {search ? "No clips match your search query." : `No ${activeTab.toLowerCase()} clips found right now.`}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
