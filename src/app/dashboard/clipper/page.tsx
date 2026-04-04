"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { KpiCard } from "@/components/dashboard/shared/kpi-card";
import { StatusBadge } from "@/components/dashboard/shared/status-badge";
import { mockClipperCampaigns, clipperStats } from "@/lib/mock-data";
import { Megaphone, DollarSign, TrendingUp, Wallet, ArrowRight } from "lucide-react";
import { useTitle } from "@/lib/title-context";

export default function ClipperDashboard() {
  useTitle("Dashboard", "Welcome back, TikiMaster_NG 🎬");
  const active = mockClipperCampaigns.filter((c) => c.status === "Active");

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6 space-y-8">
        <div className="opacity-0 h-0 overflow-hidden absolute">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Dashboard</h1>
          <p className="text-zinc-400 text-sm">Welcome back, TikiMaster_NG 🎬</p>
        </div>

        {/* KPI Cards */}
        <section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard label="Active Campaigns" value={clipperStats.activeOffers} icon={Megaphone} delta={1} delay={0} iconColor="text-primary" />
            <KpiCard label="Total Impressions" value={clipperStats.totalImpressions.toLocaleString()} icon={TrendingUp} delta={18} delay={0.05} iconColor="text-blue-400" />
            <KpiCard label="Total Earnings" value={clipperStats.totalEarnings.toLocaleString()} icon={DollarSign} delta={32} delay={0.1} prefix="₦" iconColor="text-emerald-400" />
            <KpiCard label="Available Balance" value={clipperStats.availableBalance.toLocaleString()} icon={Wallet} delay={0.15} prefix="₦" iconColor="text-amber-400" />
          </div>
        </section>

        {/* Quick Action */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href="/dashboard/clipper/offers"
            className="flex items-center gap-3 w-full p-4 rounded-xl border border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all duration-200 group"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <Megaphone size={18} className="text-primary" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">View Available Offers</div>
              <div className="text-xs text-zinc-500">Browse new campaigns matching your niche</div>
            </div>
            <div className="ml-auto text-zinc-600 group-hover:text-zinc-400 transition-colors">
              <ArrowRight size={16} />
            </div>
          </Link>
        </motion.div>

        {/* Active Campaigns Snapshot */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Active Campaigns</h2>
            <Link href="/dashboard/clipper/campaigns" className="text-xs text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="bg-[#0a0a0a] border border-white/6 rounded-2xl overflow-hidden overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead>
                <tr className="border-b border-white/5">
                  {["Campaign", "Niche", "CPM", "Status"].map((h) => (
                    <th key={h} className={`text-xs font-medium text-zinc-500 px-5 py-3.5 uppercase tracking-wider ${h === "Status" ? "text-center" : "text-left"}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/4">
                {active.map((c, i) => (
                  <motion.tr
                    key={c.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.06 }}
                    className="hover:bg-white/2 transition-colors"
                  >
                    <td className="px-5 py-4 font-medium text-white">{c.title}</td>
                    <td className="px-5 py-4 text-zinc-400">{c.niche}</td>
                    <td className="px-5 py-4 font-mono text-white">₦{c.cpm.toLocaleString()}</td>
                    <td className="px-5 py-4 text-center">
                      <StatusBadge status={c.status} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
