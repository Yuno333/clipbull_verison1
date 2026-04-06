"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StatusBadge } from "@/components/dashboard/shared/status-badge";

import { Button } from "@/components/ui/button";
import { Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTitle } from "@/lib/title-context";

// Removed mock data
const mockClipperCampaigns: any[] = [];
const mockClipSubmissions: any[] = [];


const PLATFORMS = ["TikTok", "Instagram", "YouTube Shorts", "Twitter/X"];

export default function SubmitClipsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    campaignId: "",
    postLink: "",
    platform: "",
    notes: "",
  });

  useTitle("Submit Clips", "Add your repost link for impressions verification");

  const set = (key: string, value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/50 transition-all";
  const labelCls = "block text-sm font-medium text-zinc-400 mb-1.5";

  const canSubmit = form.campaignId && form.postLink && form.platform;

  if (submitted) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 p-6 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-sm"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Clip Submitted!</h2>
            <p className="text-sm text-zinc-500 mb-6">Your clip is now under review. You&apos;ll be notified once it&apos;s approved and your impressions are verified.</p>
            <Button
              onClick={() => { setSubmitted(false); setForm({ campaignId: "", postLink: "", platform: "", notes: "" }); }}
              className="bg-primary hover:bg-primary/90 text-white rounded-xl"
            >
              Submit Another Clip
            </Button>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6 max-w-2xl mx-auto w-full space-y-8">
        <div className="opacity-0 h-0 overflow-hidden absolute">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Submit a Clip</h1>
          <p className="text-zinc-400 text-sm">Add your repost link for impressions verification</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0a0a0a] border border-white/6 rounded-2xl p-6 space-y-5"
        >
          {/* Campaign Select */}
          <div>
            <label className={labelCls}>Select Campaign <span className="text-primary">*</span></label>
            <select
              className={cn(inputCls, "cursor-pointer")}
              value={form.campaignId}
              onChange={(e) => set("campaignId", e.target.value)}
            >
              <option value="">Choose a campaign...</option>
              {mockClipperCampaigns.map((c) => (
                <option key={c.campaignId} value={c.campaignId}>
                  {c.title} — ₦{c.cpm}/1k
                </option>
              ))}
            </select>
          </div>

          {/* Post Link */}
          <div>
            <label className={labelCls}>Post Link <span className="text-primary">*</span></label>
            <input
              className={inputCls}
              placeholder="https://tiktok.com/@you/video/..."
              value={form.postLink}
              onChange={(e) => set("postLink", e.target.value)}
            />
          </div>

          {/* Platform */}
          <div>
            <label className={labelCls}>Platform <span className="text-primary">*</span></label>
            <div className="grid grid-cols-2 gap-2">
              {PLATFORMS.map((p) => (
                <button
                  key={p}
                  onClick={() => set("platform", p)}
                  className={cn(
                    "py-2.5 px-3 rounded-lg text-xs sm:text-sm font-medium border transition-all duration-200",
                    form.platform === p
                      ? "bg-primary/15 border-primary/40 text-primary"
                      : "bg-white/4 border-white/8 text-zinc-400 hover:bg-white/8 hover:text-white"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className={labelCls}>Notes (optional)</label>
            <textarea
              className={cn(inputCls, "min-h-[90px] resize-none")}
              placeholder="Any context for the reviewer..."
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
            />
          </div>

          <Button
            onClick={() => setSubmitted(true)}
            disabled={!canSubmit}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold shadow-[0_0_20px_rgba(255,79,0,0.3)] disabled:opacity-40 disabled:cursor-not-allowed gap-2"
          >
            <Send size={15} />
            Submit for Review
          </Button>
        </motion.div>

        {/* Past Submissions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className="text-sm font-semibold text-white mb-4">Recent Submissions</h2>
          <div className="bg-[#0a0a0a] border border-white/6 rounded-2xl overflow-hidden overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead>
                <tr className="border-b border-white/5">
                  {["Platform", "Post", "Impressions", "Earnings", "Status"].map((h) => (
                    <th key={h} className={`text-xs font-medium text-zinc-500 px-5 py-3.5 uppercase tracking-wider ${h === "Status" ? "text-center" : "text-left"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/4">
                {mockClipSubmissions.slice(0, 3).map((s, i) => (
                  <motion.tr
                    key={s.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="hover:bg-white/2 transition-colors"
                  >
                    <td className="px-5 py-4 text-zinc-300 text-xs">{s.platform}</td>
                    <td className="px-5 py-4">
                      <a href={s.postLink} target="_blank" rel="noopener noreferrer" className="text-primary text-xs hover:underline">
                        View Post
                      </a>
                    </td>
                    <td className="px-5 py-4 font-mono text-white">{s.impressions > 0 ? s.impressions.toLocaleString() : "—"}</td>
                    <td className="px-5 py-4 font-mono text-emerald-400">{s.earnings > 0 ? `₦${s.earnings.toLocaleString()}` : "—"}</td>
                    <td className="px-5 py-4 text-center">
                      <StatusBadge status={s.status} />
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
