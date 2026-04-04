"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { KpiCard } from "@/components/dashboard/shared/kpi-card";
import { StatusBadge } from "@/components/dashboard/shared/status-badge";
import { Topbar } from "@/components/dashboard/shared/topbar";
import { mockCampaigns, creatorStats } from "@/lib/mock-data";
import { Megaphone, DollarSign, TrendingUp, BarChart3, PlusCircle, ExternalLink } from "lucide-react";

export default function CreatorDashboard() {
  const activeCampaigns = mockCampaigns.filter((c) => c.status === "Active");

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="Dashboard" subtitle="Welcome back, Alex 👋" />

      <main className="flex-1 p-6 space-y-8">
        {/* KPI Cards */}
        <section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
              label="Active Campaigns"
              value={creatorStats.activeCampaigns}
              icon={Megaphone}
              delta={0}
              delay={0}
              iconColor="text-primary"
            />
            <KpiCard
              label="Total Spend"
              value={creatorStats.totalSpend.toLocaleString()}
              icon={DollarSign}
              delta={-8}
              delay={0.05}
              prefix="₦"
              iconColor="text-amber-400"
            />
            <KpiCard
              label="Total Impressions"
              value={creatorStats.totalImpressions.toLocaleString()}
              icon={TrendingUp}
              delta={24}
              delay={0.1}
              iconColor="text-emerald-400"
            />
            <KpiCard
              label="Average CPM"
              value={creatorStats.averageCpm.toLocaleString()}
              icon={BarChart3}
              delta={5}
              delay={0.15}
              prefix="₦"
              iconColor="text-blue-400"
            />
          </div>
        </section>

        {/* Quick Action */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href="/dashboard/creator/campaigns/create"
            className="flex items-center gap-3 w-full p-4 rounded-xl border border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all duration-200 group"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <PlusCircle size={18} className="text-primary" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Create New Campaign</div>
              <div className="text-xs text-zinc-500">Launch a new distribution campaign in minutes</div>
            </div>
            <div className="ml-auto text-zinc-600 group-hover:text-zinc-400 transition-colors">
              <ExternalLink size={16} />
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
            <Link href="/dashboard/creator/campaigns" className="text-xs text-primary hover:underline">
              View all
            </Link>
          </div>

          <div className="bg-[#0a0a0a] border border-white/6 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-xs font-medium text-zinc-500 px-5 py-3 uppercase tracking-wider">Campaign</th>
                  <th className="text-left text-xs font-medium text-zinc-500 px-5 py-3 uppercase tracking-wider hidden md:table-cell">Niche</th>
                  <th className="text-right text-xs font-medium text-zinc-500 px-5 py-3 uppercase tracking-wider">Budget</th>
                  <th className="text-right text-xs font-medium text-zinc-500 px-5 py-3 uppercase tracking-wider hidden lg:table-cell">Spent</th>
                  <th className="text-center text-xs font-medium text-zinc-500 px-5 py-3 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/4">
                {activeCampaigns.map((c, i) => (
                  <motion.tr
                    key={c.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.06 }}
                    className="hover:bg-white/2 transition-colors group"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/dashboard/creator/campaigns/${c.id}`}
                        className="font-medium text-white group-hover:text-primary transition-colors"
                      >
                        {c.title}
                      </Link>
                    </td>
                    <td className="px-5 py-4 text-zinc-400 hidden md:table-cell">{c.niche}</td>
                    <td className="px-5 py-4 text-right font-mono text-white">
                      ₦{c.budget.toLocaleString()}
                    </td>
                    <td className="px-5 py-4 text-right font-mono text-zinc-400 hidden lg:table-cell">
                      ₦{c.spent.toLocaleString()}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <StatusBadge status={c.status} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {activeCampaigns.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-zinc-600">
                <Megaphone size={32} className="mb-3 opacity-40" />
                <p className="text-sm">No active campaigns</p>
              </div>
            )}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
