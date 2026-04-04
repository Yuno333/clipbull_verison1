"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Topbar } from "@/components/dashboard/shared/topbar";
import { StatusBadge } from "@/components/dashboard/shared/status-badge";
import { mockCampaigns, mockClipSubmissions } from "@/lib/mock-data";
import { ArrowLeft, ExternalLink, PauseCircle, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const campaign = mockCampaigns.find((c) => c.id === id);
  if (!campaign) notFound();

  const clips = mockClipSubmissions.filter((s) => s.campaignId === campaign.id);
  const remaining = campaign.budget - campaign.spent;
  const pctSpent = campaign.budget > 0 ? (campaign.spent / campaign.budget) * 100 : 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title={campaign.title} />
      <main className="flex-1 p-6 max-w-5xl mx-auto w-full space-y-8">
        {/* Back */}
        <Link
          href="/dashboard/creator/campaigns"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Campaigns
        </Link>

        {/* Campaign Info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0a0a0a] border border-white/6 rounded-2xl p-6 space-y-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-xl font-bold text-white">{campaign.title}</h1>
                <StatusBadge status={campaign.status} />
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">{campaign.description}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              {campaign.status === "Active" && (
                <Button variant="outline" size="sm" className="border-white/10 text-zinc-300 hover:bg-white/5 gap-1.5 text-xs">
                  <PauseCircle size={13} />
                  Pause
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Content Link", value: campaign.contentLink, isLink: true },
              { label: "Niche", value: campaign.niche },
              { label: "CPM Rate", value: `₦${campaign.cpm.toLocaleString()}` },
              { label: "Duration", value: campaign.durationDays ? `${campaign.durationDays} days` : "Unlimited" },
            ].map((item) => (
              <div key={item.label} className="bg-white/4 border border-white/6 rounded-xl p-4">
                <div className="text-xs text-zinc-500 mb-1">{item.label}</div>
                {item.isLink ? (
                  <a
                    href={item.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline flex items-center gap-1 truncate"
                  >
                    View Content <ExternalLink size={12} />
                  </a>
                ) : (
                  <div className="text-sm font-semibold text-white">{item.value}</div>
                )}
              </div>
            ))}
          </div>

          {/* Budget Progress */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-zinc-500">Budget Used</span>
              <span className="text-white font-mono">
                ₦{campaign.spent.toLocaleString()} / ₦{campaign.budget.toLocaleString()}
              </span>
            </div>
            <div className="h-2 bg-white/6 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pctSpent}%` }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="h-full bg-gradient-to-r from-primary to-orange-400 rounded-full"
              />
            </div>
            <div className="flex justify-between text-xs mt-1.5 text-zinc-500">
              <span>{pctSpent.toFixed(1)}% spent</span>
              <span>₦{remaining.toLocaleString()} remaining</span>
            </div>
          </div>
        </motion.div>

        {/* Clipper Activity */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className="text-sm font-semibold text-white mb-4">Clipper Activity</h2>
          <div className="bg-[#0a0a0a] border border-white/6 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {["Clipper", "Post Link", "Platform", "Impressions", "Earnings", "Status", "Action"].map((h) => (
                    <th
                      key={h}
                      className={`text-xs font-medium text-zinc-500 px-5 py-3.5 uppercase tracking-wider ${
                        h === "Status" || h === "Action" ? "text-center" : "text-left"
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/4">
                {clips.map((clip, i) => (
                  <motion.tr
                    key={clip.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.06 }}
                    className="hover:bg-white/2 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0">
                          {clip.clipperAvatar}
                        </div>
                        <span className="text-white font-medium text-sm">{clip.clipperName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <a
                        href={clip.postLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-xs flex items-center gap-1"
                      >
                        View Post <ExternalLink size={11} />
                      </a>
                    </td>
                    <td className="px-5 py-4 text-zinc-400 text-xs">{clip.platform}</td>
                    <td className="px-5 py-4 font-mono text-white">{clip.impressions.toLocaleString()}</td>
                    <td className="px-5 py-4 font-mono text-emerald-400">
                      {clip.earnings > 0 ? `₦${clip.earnings.toLocaleString()}` : "—"}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <StatusBadge status={clip.status} />
                    </td>
                    <td className="px-5 py-4 text-center">
                      <button className="flex items-center gap-1 text-xs text-zinc-500 hover:text-red-400 transition-colors mx-auto">
                        <Flag size={12} />
                        Report
                      </button>
                    </td>
                  </motion.tr>
                ))}
                {clips.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center text-zinc-600 text-sm">
                      No clips submitted yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
