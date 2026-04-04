"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Topbar } from "@/components/dashboard/shared/topbar";
import { PageHeader } from "@/components/dashboard/shared/page-header";
import { StatusBadge } from "@/components/dashboard/shared/status-badge";
import { mockClipperDisputes } from "@/lib/mock-data";
import { AlertTriangle, Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ClipperDisputesPage() {
  const [appealText, setAppealText] = useState("");

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/50 transition-all";

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="Disputes" />
      <main className="flex-1 p-6 space-y-8">
        <PageHeader title="Disputes" subtitle="Raise and track issues with campaigns" />

        {/* Disputes Table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0a0a0a] border border-white/6 rounded-2xl overflow-hidden"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["Campaign", "Issue", "Status", "Date"].map((h) => (
                  <th key={h} className={`text-xs font-medium text-zinc-500 px-5 py-3.5 uppercase tracking-wider ${h === "Status" ? "text-center" : "text-left"}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {mockClipperDisputes.map((d, i) => (
                <motion.tr
                  key={d.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="hover:bg-white/2 transition-colors"
                >
                  <td className="px-5 py-4 font-medium text-white">{d.campaignTitle}</td>
                  <td className="px-5 py-4 text-zinc-400 max-w-xs truncate">{d.reason}</td>
                  <td className="px-5 py-4 text-center">
                    <StatusBadge status={d.status} />
                  </td>
                  <td className="px-5 py-4 text-zinc-500 font-mono text-xs">{d.createdAt}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {mockClipperDisputes.length === 0 && (
            <div className="flex flex-col items-center py-16 text-zinc-600">
              <AlertTriangle size={32} className="mb-3 opacity-40" />
              <p className="text-sm">No disputes filed</p>
            </div>
          )}
        </motion.div>

        {/* Dispute Detail & Appeal */}
        {mockClipperDisputes.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="bg-[#0a0a0a] border border-white/6 rounded-2xl p-6 space-y-5"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Dispute Detail — {d.campaignTitle}</h2>
              <StatusBadge status={d.status} />
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-xs text-zinc-500 mb-1">Reason for Dispute</div>
                <p className="text-sm text-zinc-300 bg-white/4 border border-white/6 rounded-xl p-4">{d.reason}</p>
              </div>
              {d.evidence && (
                <div>
                  <div className="text-xs text-zinc-500 mb-1">Evidence Submitted</div>
                  <div className="flex items-center gap-2 text-sm text-blue-400 bg-blue-500/8 border border-blue-500/20 rounded-xl p-3">
                    <Paperclip size={14} />
                    {d.evidence}
                  </div>
                </div>
              )}
              {d.adminResponse ? (
                <div>
                  <div className="text-xs text-zinc-500 mb-1">Admin Response</div>
                  <p className="text-sm text-zinc-300 bg-white/4 border border-white/6 rounded-xl p-4">{d.adminResponse}</p>
                </div>
              ) : (
                <div className="text-xs text-zinc-600 italic">Awaiting admin response...</div>
              )}
            </div>

            {/* Appeal */}
            <div className="border-t border-white/5 pt-5">
              <div className="text-xs text-zinc-500 mb-2">Submit an Appeal</div>
              <textarea
                className={cn(inputCls, "min-h-[90px] resize-none mb-3")}
                placeholder="Describe your appeal or provide additional context..."
                value={appealText}
                onChange={(e) => setAppealText(e.target.value)}
              />
              <Button
                size="sm"
                disabled={!appealText}
                className="bg-primary hover:bg-primary/90 text-white rounded-lg gap-1.5 disabled:opacity-40"
              >
                <Send size={13} />
                Submit Appeal
              </Button>
            </div>
          </motion.div>
        ))}
      </main>
    </div>
  );
}
