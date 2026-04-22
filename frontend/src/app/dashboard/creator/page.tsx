"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { KpiCard } from "@/components/dashboard/shared/kpi-card";
import { StatusBadge } from "@/components/dashboard/shared/status-badge";

import { Megaphone, DollarSign, TrendingUp, BarChart3, PlusCircle, ExternalLink } from "lucide-react";
import { useTitle } from "@/lib/title-context";

const mockCampaigns: Array<{
  id: string;
  title: string;
  niche: string;
  budget: number;
  spent: number;
  status: string;
}> = [];

const creatorStats = {
  activeCampaigns: 0,
  totalSpend: 0,
  totalImpressions: 0,
  averageCpm: 0,
};


export default function CreatorDashboard() {
  useTitle("Dashboard", "Welcome back, Alex 👋");
  const activeCampaigns = mockCampaigns.filter((c) => c.status === "Active");

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex-1 p-6 space-y-8 max-w-[1600px] mx-auto w-full"
      >
        {/* KPI Cards */}
        <section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
              delay={0.1}
              prefix="₦"
              iconColor="text-amber-400"
            />
            <KpiCard
              label="Total Impressions"
              value={creatorStats.totalImpressions.toLocaleString()}
              icon={TrendingUp}
              delta={24}
              delay={0.2}
              iconColor="text-emerald-400"
            />
            <KpiCard
              label="Average CPM"
              value={creatorStats.averageCpm.toLocaleString()}
              icon={BarChart3}
              delta={5}
              delay={0.3}
              prefix="₦"
              iconColor="text-blue-400"
            />
          </div>
        </section>

        {/* Quick Action */}
        <motion.div variants={itemVariants}>
          <Link
            href="/dashboard/creator/campaigns/create"
            className="flex items-center gap-4 w-full p-6 rounded-2xl border border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 group shadow-lg"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-all group-hover:scale-110 duration-300">
              <PlusCircle size={20} className="text-primary" />
            </div>
            <div>
              <div className="text-base font-bold text-white tracking-tight">Create New Campaign</div>
              <div className="text-sm text-zinc-500">Launch a new distribution campaign in minutes</div>
            </div>
            <div className="ml-auto text-zinc-600 group-hover:text-zinc-400 transition-all group-hover:translate-x-1 duration-300">
              <ExternalLink size={20} />
            </div>
          </Link>
        </motion.div>

        {/* Active Campaigns Snapshot */}
        <motion.section variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-zinc-500">Active Campaigns</h2>
            <Link href="/dashboard/creator/campaigns" className="text-xs font-bold text-primary hover:underline underline-offset-4">
              View all campaigns
            </Link>
          </div>

          <div className="surface-raised rounded-2xl overflow-hidden border-white/5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <th className="text-left text-xs font-bold text-zinc-500 px-6 py-4 uppercase tracking-widest">Campaign</th>
                    <th className="text-left text-xs font-bold text-zinc-500 px-6 py-4 uppercase tracking-widest hidden md:table-cell">Niche</th>
                    <th className="text-right text-xs font-bold text-zinc-500 px-6 py-4 uppercase tracking-widest">Budget</th>
                    <th className="text-right text-xs font-bold text-zinc-500 px-6 py-4 uppercase tracking-widest hidden lg:table-cell">Spent</th>
                    <th className="text-center text-xs font-bold text-zinc-500 px-6 py-4 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.03]">
                  {activeCampaigns.map((c, i) => (
                    <tr
                      key={c.id}
                      className="hover:bg-white/[0.04] transition-all duration-300 group cursor-pointer"
                    >
                      <td className="px-6 py-5">
                        <Link
                          href={`/dashboard/creator/campaigns/${c.id}`}
                          className="font-bold text-white group-hover:text-primary transition-colors block"
                        >
                          {c.title}
                        </Link>
                      </td>
                      <td className="px-6 py-5 text-zinc-400 font-medium hidden md:table-cell">{c.niche}</td>
                      <td className="px-6 py-5 text-right font-mono font-bold text-white">
                        ₦{c.budget.toLocaleString()}
                      </td>
                      <td className="px-6 py-5 text-right font-mono font-medium text-zinc-500 hidden lg:table-cell">
                        ₦{c.spent.toLocaleString()}
                      </td>
                      <td className="px-6 py-5 text-center">
                        <StatusBadge status={c.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {activeCampaigns.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-zinc-600 bg-white/[0.01]">
                <Megaphone size={40} className="mb-4 opacity-20 animate-pulse" />
                <p className="text-sm font-medium">No active campaigns at the moment</p>
              </div>
            )}
          </div>
        </motion.section>
      </motion.main>
    </div>
  );
}
