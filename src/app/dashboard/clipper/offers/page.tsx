"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Topbar } from "@/components/dashboard/shared/topbar";
import { PageHeader } from "@/components/dashboard/shared/page-header";
import { mockOffers } from "@/lib/mock-data";
import { ArrowRight, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const ALL_NICHES = ["All", "Meme", "Politics", "Content Creation", "Crypto", "Finance", "General"];

export default function AvailableOffersPage() {
  const [niche, setNiche] = useState("All");
  const [minCpm, setMinCpm] = useState("");
  const [maxCpm, setMaxCpm] = useState("");

  const filtered = mockOffers.filter((o) => {
    if (niche !== "All" && o.niche !== niche) return false;
    if (minCpm && o.cpm < parseInt(minCpm)) return false;
    if (maxCpm && o.cpm > parseInt(maxCpm)) return false;
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="Available Offers" />
      <main className="flex-1 p-6 space-y-6">
        <PageHeader title="Available Offers" subtitle="Browse campaigns matching your niche profile" />

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-3 items-center"
        >
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Filter size={13} />
            Filter:
          </div>
          {ALL_NICHES.map((n) => (
            <button
              key={n}
              onClick={() => setNiche(n)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200",
                niche === n
                  ? "bg-primary/15 border-primary/40 text-primary"
                  : "bg-white/5 border-white/8 text-zinc-400 hover:text-white hover:bg-white/8"
              )}
            >
              {n}
            </button>
          ))}
          <div className="flex items-center gap-2 ml-1">
            <input
              className="w-20 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/40"
              placeholder="Min ₦"
              value={minCpm}
              onChange={(e) => setMinCpm(e.target.value)}
              type="number"
            />
            <span className="text-zinc-600 text-xs">—</span>
            <input
              className="w-20 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/40"
              placeholder="Max ₦"
              value={maxCpm}
              onChange={(e) => setMaxCpm(e.target.value)}
              type="number"
            />
          </div>
        </motion.div>

        {/* Offer Table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0a0a0a] border border-white/6 rounded-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-white/5">
                  {["Campaign", "Niche", "CPM", "Budget Left", "Clippers", "Action"].map((h) => (
                    <th key={h} className={`text-xs font-medium text-zinc-500 px-5 py-3.5 uppercase tracking-wider ${h === "Action" ? "text-center" : "text-left"}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/4">
                {filtered.map((o, i) => (
                  <motion.tr
                    key={o.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                    className="hover:bg-white/2 transition-colors group"
                  >
                    <td className="px-5 py-4">
                      <div className="font-semibold text-white">{o.title}</div>
                      <div className="text-xs text-zinc-500 mt-0.5 line-clamp-1 max-w-xs">{o.description}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-medium text-zinc-300 bg-white/5 border border-white/8 px-2 py-1 rounded-md">
                        {o.niche}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-mono text-white font-semibold">₦{o.cpm.toLocaleString()}</td>
                    <td className="px-5 py-4">
                      <div className="font-mono text-white">₦{o.budgetRemaining.toLocaleString()}</div>
                      <div className="h-1 w-24 bg-white/8 rounded-full mt-1.5 overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${(o.budgetRemaining / o.totalBudget) * 100}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-5 py-4 text-zinc-400 text-sm">
                      {o.clippersJoined}{o.maxClippers ? `/${o.maxClippers}` : ""}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <Link
                        href={`/dashboard/clipper/offers/${o.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-orange-300 bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 px-3 py-1.5 rounded-lg transition-all"
                      >
                        View / Join
                        <ArrowRight size={12} />
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-16 text-center text-zinc-600 text-sm">No offers match your filters</div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
