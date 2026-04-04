"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Topbar } from "@/components/dashboard/shared/topbar";
import { PageHeader } from "@/components/dashboard/shared/page-header";
import { StatusBadge } from "@/components/dashboard/shared/status-badge";
import { mockClipperCampaigns } from "@/lib/mock-data";
import { Eye, Send } from "lucide-react";

export default function ClipperCampaignsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="My Campaigns" />
      <main className="flex-1 p-6">
        <PageHeader
          title="My Campaigns"
          subtitle="Campaigns you've joined and are actively clipping"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0a0a0a] border border-white/6 rounded-2xl overflow-hidden"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["Campaign", "Niche", "CPM", "Clips", "Earned", "Status", "Actions"].map((h) => (
                  <th
                    key={h}
                    className={`text-xs font-medium text-zinc-500 px-5 py-3.5 uppercase tracking-wider ${
                      h === "Status" || h === "Actions" ? "text-center" : "text-left"
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {mockClipperCampaigns.map((c, i) => (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                  className="hover:bg-white/2 transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="font-semibold text-white">{c.title}</div>
                    <div className="text-xs text-zinc-500 mt-0.5">{c.clipsApproved} approved clips</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-medium text-zinc-300 bg-white/5 border border-white/8 px-2 py-1 rounded-md">
                      {c.niche}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-mono text-white">₦{c.cpm.toLocaleString()}</td>
                  <td className="px-5 py-4 text-zinc-400">{c.clipsSubmitted} submitted</td>
                  <td className="px-5 py-4 font-mono text-emerald-400 font-semibold">₦{c.earned.toLocaleString()}</td>
                  <td className="px-5 py-4 text-center">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/dashboard/clipper/offers/${c.campaignId}`}
                        className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-white/8 border border-transparent hover:border-white/10 transition-all"
                      >
                        <Eye size={13} />
                        View
                      </Link>
                      <Link
                        href="/dashboard/clipper/submit"
                        className="flex items-center gap-1 text-xs text-primary hover:text-orange-300 px-2.5 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-all"
                      >
                        <Send size={13} />
                        Submit Clip
                      </Link>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </main>
    </div>
  );
}
