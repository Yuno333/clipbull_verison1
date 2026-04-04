"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Topbar } from "@/components/dashboard/shared/topbar";
import { PageHeader } from "@/components/dashboard/shared/page-header";
import { StatusBadge } from "@/components/dashboard/shared/status-badge";
import { mockCampaigns } from "@/lib/mock-data";
import { PlusCircle, Eye, PauseCircle, PlusSquare } from "lucide-react";

export default function MyCampaignsPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="My Campaigns" />
      <main className="flex-1 p-6">
        <PageHeader
          title="My Campaigns"
          subtitle="Manage and monitor all your distribution campaigns"
          cta={{
            label: "Create Campaign",
            icon: PlusCircle,
            onClick: () => router.push("/dashboard/creator/campaigns/create"),
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0a0a0a] border border-white/6 rounded-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="border-b border-white/5">
                  {["Campaign", "Niche", "CPM", "Budget", "Spent", "Status", "Actions"].map((h) => (
                    <th
                      key={h}
                      className={`text-xs font-medium text-zinc-500 px-5 py-3.5 uppercase tracking-wider ${
                        h === "Actions" || h === "Status" ? "text-center" : "text-left"
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/4">
                {mockCampaigns.map((c, i) => (
                  <motion.tr
                    key={c.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.055 }}
                    className="hover:bg-white/2 transition-colors group"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/dashboard/creator/campaigns/${c.id}`}
                        className="font-semibold text-white hover:text-primary transition-colors"
                      >
                        {c.title}
                      </Link>
                      <div className="text-xs text-zinc-500 mt-0.5">{c.impressions.toLocaleString()} impressions</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-medium text-zinc-300 bg-white/5 border border-white/8 px-2 py-1 rounded-md">
                        {c.niche}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-mono text-white">₦{c.cpm.toLocaleString()}</td>
                    <td className="px-5 py-4 font-mono text-white">₦{c.budget.toLocaleString()}</td>
                    <td className="px-5 py-4 font-mono text-zinc-400">₦{c.spent.toLocaleString()}</td>
                    <td className="px-5 py-4 text-center">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/dashboard/creator/campaigns/${c.id}`}
                          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors px-2.5 py-1.5 rounded-lg hover:bg-white/8 border border-transparent hover:border-white/10"
                        >
                          <Eye size={13} />
                          View
                        </Link>
                        {c.status === "Active" && (
                          <button className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-amber-500/10 border border-transparent hover:border-amber-500/20">
                            <PauseCircle size={13} />
                            Pause
                          </button>
                        )}
                        {(c.status === "Active" || c.status === "Paused") && (
                          <button className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-blue-500/10 border border-transparent hover:border-blue-500/20">
                            <PlusSquare size={13} />
                            Add Budget
                          </button>
                        )}
                      </div>
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
