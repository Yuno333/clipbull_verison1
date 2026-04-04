"use client";

import { motion } from "framer-motion";
import { AlertTriangle, MessageSquare, CheckCircle, Clock, ShieldAlert, User, Scissors } from "lucide-react";
import { cn } from "@/lib/utils";

const mockDisputes = [
  { id: "101", reporter: "Nike Official", target: "John_Clipper", reason: "AI Generated Content", priority: "high", status: "open", date: "2 hours ago" },
  { id: "102", reporter: "RedBull Marketing", target: "ViralClips_NG", reason: "Duplicate Submission", priority: "medium", status: "in-progress", date: "5 hours ago" },
  { id: "103", reporter: "Alex Creator", target: "MemeLord_99", reason: "Low Video Quality", priority: "low", status: "resolved", date: "昨天" },
  { id: "104", reporter: "Tech Reviewer", target: "Clipper_X", reason: "Policy Violation", priority: "high", status: "open", date: "10 mins ago" },
];

import { useTitle } from "@/lib/title-context";

export default function DisputesPage() {
  useTitle("Resolution Center", "Review and resolve disputes between creators and clippers.");

  return (
    <div className="p-8 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="opacity-0 h-0 overflow-hidden absolute">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Resolution Center</h1>
          <p className="text-zinc-400 text-sm">Review and resolve disputes between creators and clippers.</p>
        </div>

        {/* Dispute Tickets */}
        <div className="space-y-4">
          {mockDisputes.map((ticket, i) => (
            <motion.div 
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.03] transition-all relative group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "p-3 rounded-xl",
                    ticket.priority === 'high' ? 'bg-rose-500/10 text-rose-500' : 
                    ticket.priority === 'medium' ? 'bg-amber-500/10 text-amber-500' : 
                    'bg-zinc-500/10 text-zinc-500'
                  )}>
                    <ShieldAlert size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-bold uppercase tracking-widest text-zinc-600">Ticket #{ticket.id}</span>
                      <span className={cn(
                        "text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border",
                        ticket.status === 'open' ? 'text-rose-400 border-rose-500/20 bg-rose-500/5' : 
                        ticket.status === 'in-progress' ? 'text-amber-400 border-amber-500/20 bg-amber-500/5' : 
                        'text-emerald-400 border-emerald-500/20 bg-emerald-500/5'
                      )}>
                        {ticket.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{ticket.reason}</h3>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <User size={14} className="text-zinc-700" />
                        Reporter: <span className="text-zinc-300 font-medium">{ticket.reporter}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <Scissors size={14} className="text-zinc-700" />
                        Target: <span className="text-zinc-300 font-medium">{ticket.target}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <Clock size={14} className="text-zinc-700" />
                        {ticket.date}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 lg:self-center">
                  <button className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-white/5 border border-white/5 text-sm font-semibold text-zinc-300 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                    <MessageSquare size={16} />
                    Chat
                  </button>
                  <button className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center gap-2">
                    <CheckCircle size={16} />
                    Resolve
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-8 p-5 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 flex items-start gap-4">
          <AlertTriangle className="text-cyan-400 shrink-0" size={20} />
          <p className="text-xs text-zinc-400 leading-relaxed">
            <span className="text-cyan-300 font-bold uppercase tracking-wider block mb-1">Admin Policy</span>
            Use the Resolution Center to mediate conflicts fairly. Escalated tickets (High priority) should be handled within 2 hours. Frequent violators may be flagged for manual review or suspension.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
