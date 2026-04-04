"use client";

import { motion } from "framer-motion";
import { Wallet, TrendingUp, ArrowDownCircle, ArrowUpCircle, DollarSign, PieChart, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const mockTransactions = [
  { id: "TX-902", type: "withdrawal", user: "Sarah Clipper", amount: "₦25,000", status: "completed", date: "2 mins ago" },
  { id: "TX-901", type: "deposit", user: "Nike Official", amount: "₦1,200,000", status: "completed", date: "1 hour ago" },
  { id: "TX-900", type: "withdrawal", user: "David Wilson", amount: "₦8,500", status: "pending", date: "3 hours ago" },
  { id: "TX-899", type: "fee", user: "System", amount: "₦12,450", status: "completed", date: "5 hours ago" },
  { id: "TX-898", type: "withdrawal", user: "Emma Thompson", amount: "₦45,000", status: "completed", date: "昨天" },
];

import { useTitle } from "@/lib/title-context";

export default function FinancesPage() {
  useTitle("Platform Finances", "Monitor platform revenue, escrow reserves, and withdrawal requests.");

  return (
    <div className="p-8 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="opacity-0 h-0 overflow-hidden absolute">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Platform Finances</h1>
          <p className="text-zinc-400 text-sm">Monitor platform revenue, escrow reserves, and withdrawal requests.</p>
        </div>

        {/* Financial KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Total Platform Revenue", value: "₦1,245,000", icon: TrendingUp, color: "text-cyan-400", bg: "bg-cyan-500/10" },
            { label: "Escrow Reserves", value: "₦4,850,000", icon: Wallet, color: "text-indigo-400", bg: "bg-indigo-500/10" },
            { label: "Pending Withdrawals", value: "₦82,400", icon: Activity, color: "text-rose-400", bg: "bg-rose-500/10" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] relative overflow-hidden group hover:border-cyan-500/30 transition-all"
            >
              <div className={cn("p-3 rounded-2xl w-fit mb-4", stat.bg)}>
                <stat.icon size={24} className={stat.color} />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-zinc-500 tracking-wide uppercase">{stat.label}</div>
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <stat.icon size={64} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Transactions */}
        <div className="rounded-3xl border border-white/[0.06] bg-white/[0.01] overflow-hidden">
          <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.02]">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <PieChart size={18} className="text-cyan-400" />
              Recent Transactions
            </h2>
            <button className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-widest">Export CSV</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/[0.04] text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {mockTransactions.map((tx, i) => (
                  <motion.tr 
                    key={tx.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-white/[0.01] transition-colors group"
                  >
                    <td className="px-6 py-4 text-sm font-bold text-white/50 group-hover:text-cyan-400/50 transition-colors">{tx.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">{tx.user}</td>
                    <td className="px-6 py-4 text-sm font-bold text-white">{tx.amount}</td>
                    <td className="px-6 py-4">
                      <div className={cn(
                        "flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider",
                        tx.type === 'deposit' ? 'text-emerald-400' : 
                        tx.type === 'withdrawal' ? 'text-indigo-400' : 'text-cyan-400'
                      )}>
                        {tx.type === 'deposit' ? <ArrowDownCircle size={14} /> : 
                         tx.type === 'withdrawal' ? <ArrowUpCircle size={14} /> : <DollarSign size={14} />}
                        {tx.type}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full",
                        tx.status === 'completed' ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'
                      )}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-zinc-600 text-right">{tx.date}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
