"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { BarChart3, TrendingUp, Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTitle } from "@/lib/title-context";

// Removed mock data
const mockCampaigns: any[] = [];


export default function ReportsPage() {
  useTitle("Performance Reports", "Analyse your distribution campaign metrics");
  const [selectedCampaign, setSelectedCampaign] = useState("all");

  const totalImpressions = mockCampaigns.reduce((a: any, c: any) => a + c.impressions, 0);
  const totalSpend = mockCampaigns.reduce((a: any, c: any) => a + c.spent, 0);
  const avgCpm = totalImpressions > 0 ? (totalSpend / totalImpressions) * 1000 : 0;

  const filtered =
    selectedCampaign === "all"
      ? mockCampaigns
      : mockCampaigns.filter((c: any) => c.id === selectedCampaign);

  const topClip = { platform: "TikTok", impressions: 48200, campaign: "CryptoX Awareness Push" };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6 space-y-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="opacity-0 h-0 overflow-hidden absolute">
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Performance Reports</h1>
            <p className="text-zinc-400 text-sm">Analyse your distribution campaign metrics</p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="border-white/10 text-zinc-300 hover:bg-white/5 rounded-lg gap-1.5 text-xs"
          >
            <Download size={13} />
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-3"
        >
          <select
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/40"
            value={selectedCampaign}
            onChange={(e) => setSelectedCampaign(e.target.value)}
          >
            <option value="all">All Campaigns</option>
            {mockCampaigns.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
          <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/40">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>All time</option>
          </select>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Total Impressions", value: totalImpressions.toLocaleString(), icon: Eye, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
            { label: "Total Spend", value: `₦${totalSpend.toLocaleString()}`, icon: TrendingUp, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
            { label: "Average CPM", value: `₦${avgCpm.toFixed(0)}`, icon: BarChart3, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
          ].map((m: any, i: any) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              className={`bg-[#0a0a0a] border border-white/6 rounded-2xl p-5 flex items-center gap-4`}
            >
              <div className={`w-11 h-11 rounded-xl ${m.bg} border ${m.border} flex items-center justify-center shrink-0`}>
                <m.icon size={20} className={m.color} />
              </div>
              <div>
                <div className="text-xs text-zinc-500 mb-1">{m.label}</div>
                <div className="text-xl font-bold text-white font-mono">{m.value}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Campaign Performance Table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-sm font-semibold text-white mb-4">Campaign Breakdown</h2>
          <div className="bg-[#0a0a0a] border border-white/6 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {["Campaign", "Niche", "Impressions", "Spend", "CPM", "Clippers"].map((h) => (
                    <th key={h} className="text-xs font-medium text-zinc-500 px-5 py-3.5 uppercase tracking-wider text-left">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/4">
                {filtered.map((c: any, i: any) => (
                  <motion.tr
                    key={c.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.05 }}
                    className="hover:bg-white/2 transition-colors"
                  >
                    <td className="px-5 py-4 font-medium text-white">{c.title}</td>
                    <td className="px-5 py-4 text-zinc-400">{c.niche}</td>
                    <td className="px-5 py-4 font-mono text-white">{c.impressions.toLocaleString()}</td>
                    <td className="px-5 py-4 font-mono text-white">₦{c.spent.toLocaleString()}</td>
                    <td className="px-5 py-4 font-mono text-white">
                      {c.impressions > 0 ? `₦${((c.spent / c.impressions) * 1000).toFixed(0)}` : "—"}
                    </td>
                    <td className="px-5 py-4 text-white">{c.clippers}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Top Performing Clips */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#0a0a0a] border border-white/6 rounded-2xl p-6"
        >
          <h2 className="text-sm font-semibold text-white mb-4">Top Performing Clip</h2>
          <div className="flex items-center gap-4 p-4 bg-white/4 border border-white/8 rounded-xl">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center">
              <TrendingUp size={18} className="text-blue-400" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">{topClip.platform} — {topClip.campaign}</div>
              <div className="text-xs text-zinc-500">{topClip.impressions.toLocaleString()} impressions</div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
