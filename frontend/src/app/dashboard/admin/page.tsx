"use client";

import { motion } from "framer-motion";
import { Users, Megaphone, AlertTriangle, TrendingUp, ShieldCheck } from "lucide-react";
import { useTitle } from "@/lib/title-context";

export default function AdminDashboard() {
  useTitle("Platform Overview", "Welcome to the TUKKA Administration Console.");

  return (
    <div className="p-8 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Users", value: "1,248", change: "+12%", icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
            { label: "Active Campaigns", value: "45", change: "+5%", icon: Megaphone, color: "text-emerald-400", bg: "bg-emerald-500/10" },
            { label: "Pending Disputes", value: "3", change: "-2", icon: AlertTriangle, color: "text-rose-400", bg: "bg-rose-500/10", changeColor: "text-emerald-400", changeBg: "bg-emerald-500/10" },
            { label: "Total Revenue", value: "₦12,450", change: "+18%", icon: TrendingUp, color: "text-cyan-400", bg: "bg-cyan-500/10" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] relative overflow-hidden group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                  <stat.icon size={20} className={stat.color} />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.changeColor || 'text-emerald-400'} ${stat.changeBg || 'bg-emerald-500/10'}`}>
                  {stat.change}
                </span>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-zinc-500">{stat.label}</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {/* System Status Mock */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-cyan-500/10">
              <ShieldCheck size={20} className="text-cyan-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">System Status</h2>
              <p className="text-sm text-zinc-400">All services are operating normally</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {['Authentication (Supabase)', 'Database Routing', 'Payment Gateway (Mock)'].map((service, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.01] border border-white/[0.03]">
                <span className="text-sm font-medium text-zinc-300">{service}</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-500 uppercase tracking-widest">Operational</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
