"use client";

import { motion } from "framer-motion";
import { Topbar } from "@/components/dashboard/shared/topbar";
import { PageHeader } from "@/components/dashboard/shared/page-header";
import { StatusBadge } from "@/components/dashboard/shared/status-badge";
import { mockClipperTransactions, clipperStats } from "@/lib/mock-data";
import { Wallet, TrendingUp, Clock, ArrowUpToLine } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EarningsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="Earnings & Wallet" />
      <main className="flex-1 p-6 space-y-8">
        <PageHeader title="Earnings & Wallet" subtitle="Track your earnings and manage payouts" />

        {/* Wallet Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Wallet, label: "Available Balance", value: clipperStats.availableBalance, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
            { icon: Clock, label: "Pending Earnings", value: clipperStats.pendingEarnings, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
            { icon: TrendingUp, label: "Lifetime Earnings", value: clipperStats.lifetimeEarnings, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`relative bg-[#0a0a0a] border border-white/6 rounded-2xl p-6 overflow-hidden group hover:border-white/12 transition-all`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 blur-[50px] rounded-full pointer-events-none ${card.bg} opacity-60`} />
              <div className="flex items-center gap-3 mb-4 relative">
                <div className={`w-10 h-10 rounded-xl ${card.bg} border ${card.border} flex items-center justify-center`}>
                  <card.icon size={18} className={card.color} />
                </div>
                <span className="text-sm font-medium text-zinc-400">{card.label}</span>
              </div>
              <div className={`text-2xl font-bold font-mono relative ${card.color}`}>
                ₦{card.value.toLocaleString()}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Payout CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 gap-2 shadow-[0_0_20px_rgba(255,79,0,0.3)]">
            <ArrowUpToLine size={15} />
            Request Payout
          </Button>
          <p className="text-xs text-zinc-600 mt-2">Payouts processed within 1–3 business days to your registered bank account.</p>
        </motion.div>

        {/* Transaction History */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h2 className="text-sm font-semibold text-white mb-4">Transaction History</h2>
          <div className="bg-[#0a0a0a] border border-white/6 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {["Date", "Campaign / Description", "Amount", "Status"].map((h) => (
                    <th key={h} className={`text-xs font-medium text-zinc-500 px-5 py-3.5 uppercase tracking-wider ${h === "Amount" || h === "Status" ? "text-right" : "text-left"}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/4">
                {mockClipperTransactions.map((t, i) => (
                  <motion.tr
                    key={t.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="hover:bg-white/2 transition-colors"
                  >
                    <td className="px-5 py-4 text-zinc-500 font-mono text-xs">{t.date}</td>
                    <td className="px-5 py-4 text-zinc-300">{t.description}</td>
                    <td className={`px-5 py-4 text-right font-mono font-semibold ${t.amount > 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {t.amount > 0 ? "+" : ""}₦{Math.abs(t.amount).toLocaleString()}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <StatusBadge status={t.status as "Completed" | "Pending"} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
