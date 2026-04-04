"use client";

import { motion } from "framer-motion";
import { Topbar } from "@/components/dashboard/shared/topbar";
import { PageHeader } from "@/components/dashboard/shared/page-header";
import { StatusBadge } from "@/components/dashboard/shared/status-badge";
import { mockCreatorDisputes } from "@/lib/mock-data";
import { AlertTriangle, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CreatorDisputesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="Disputes" />
      <main className="flex-1 p-6 space-y-8">
        <PageHeader title="Disputes" subtitle="Report and track disputes with clippers" />

        {/* Disputes Table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0a0a0a] border border-white/6 rounded-2xl overflow-hidden"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["Campaign", "Clipper", "Reason", "Status", "Date"].map((h) => (
                  <th key={h} className={`text-xs font-medium text-zinc-500 px-5 py-3.5 uppercase tracking-wider ${h === "Status" ? "text-center" : "text-left"}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {mockCreatorDisputes.map((d, i) => (
                <motion.tr
                  key={d.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="hover:bg-white/2 transition-colors"
                >
                  <td className="px-5 py-4 font-medium text-white">{d.campaignTitle}</td>
                  <td className="px-5 py-4 text-zinc-400">{d.clipperName}</td>
                  <td className="px-5 py-4 text-zinc-400 max-w-xs truncate">{d.reason}</td>
                  <td className="px-5 py-4 text-center">
                    <StatusBadge status={d.status} />
                  </td>
                  <td className="px-5 py-4 text-zinc-500 font-mono text-xs">{d.createdAt}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {mockCreatorDisputes.length === 0 && (
            <div className="flex flex-col items-center py-16 text-zinc-600">
              <AlertTriangle size={32} className="mb-3 opacity-40" />
              <p className="text-sm">No disputes filed</p>
            </div>
          )}
        </motion.div>

        {/* Dispute Detail */}
        {mockCreatorDisputes.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="bg-[#0a0a0a] border border-white/6 rounded-2xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Dispute #{d.id}</h2>
              <StatusBadge status={d.status} />
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-xs text-zinc-500 mb-1">Reason</div>
                <p className="text-sm text-zinc-300">{d.reason}</p>
              </div>
              {d.evidence && (
                <div>
                  <div className="text-xs text-zinc-500 mb-1">Submitted Evidence</div>
                  <p className="text-sm text-zinc-300">{d.evidence}</p>
                </div>
              )}
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-lg gap-1.5 text-xs"
            >
              <ChevronUp size={13} />
              Escalate to Admin
            </Button>
          </motion.div>
        ))}
      </main>
    </div>
  );
}
