"use client";

import { motion } from "framer-motion";
import { Topbar } from "@/components/dashboard/shared/topbar";
import { PageHeader } from "@/components/dashboard/shared/page-header";
import { StatusBadge } from "@/components/dashboard/shared/status-badge";
import { mockCreatorTransactions, creatorStats } from "@/lib/mock-data";
import { Wallet, Lock, ArrowDownToLine, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WalletPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="Wallet & Payments" />
      <main className="flex-1 p-6 space-y-8">
        <PageHeader title="Wallet & Payments" subtitle="Manage your balance and campaign funds" />

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-[#0a0a0a] border border-white/6 rounded-2xl p-6 overflow-hidden group hover:border-white/12 transition-all"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/15 blur-[60px] rounded-full pointer-events-none group-hover:bg-primary/20 transition-colors" />
            <div className="flex items-center gap-3 mb-4 relative">
              <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center">
                <Wallet size={18} className="text-primary" />
              </div>
              <span className="text-sm font-medium text-zinc-400">Available Balance</span>
            </div>
            <div className="text-3xl font-bold text-white font-mono relative">
              ₦{creatorStats.walletBalance.toLocaleString()}
            </div>
            <div className="flex gap-2 mt-6 relative">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white rounded-lg text-xs gap-1.5">
                <ArrowDownToLine size={13} />
                Fund Wallet
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="relative bg-[#0a0a0a] border border-white/6 rounded-2xl p-6 overflow-hidden group hover:border-white/12 transition-all"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 blur-[60px] rounded-full pointer-events-none" />
            <div className="flex items-center gap-3 mb-4 relative">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <Lock size={18} className="text-amber-400" />
              </div>
              <span className="text-sm font-medium text-zinc-400">Escrow Balance</span>
            </div>
            <div className="text-3xl font-bold text-white font-mono relative">
              ₦{creatorStats.escrowBalance.toLocaleString()}
            </div>
            <p className="text-xs text-zinc-600 mt-2 relative">Funds locked in active campaign escrow</p>
            <div className="flex gap-2 mt-6 relative">
              <Button size="sm" variant="outline" className="border-white/10 text-zinc-300 hover:bg-white/5 rounded-lg text-xs gap-1.5">
                <RotateCcw size={13} />
                Request Refund
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Transaction History */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className="text-sm font-semibold text-white mb-4">Transaction History</h2>
          <div className="bg-[#0a0a0a] border border-white/6 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {["Date", "Type", "Description", "Amount", "Status"].map((h) => (
                    <th
                      key={h}
                      className={`text-xs font-medium text-zinc-500 px-5 py-3.5 uppercase tracking-wider ${
                        h === "Amount" || h === "Status" ? "text-right" : "text-left"
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/4">
                {mockCreatorTransactions.map((t, i) => (
                  <motion.tr
                    key={t.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="hover:bg-white/2 transition-colors"
                  >
                    <td className="px-5 py-4 text-zinc-500 font-mono text-xs">{t.date}</td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-medium text-zinc-300 bg-white/5 border border-white/8 px-2 py-1 rounded-md">
                        {t.type}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-zinc-400 text-sm max-w-xs truncate">{t.description}</td>
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
