"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTitle } from "@/lib/title-context";

const NICHES = ["Meme", "Politics", "Content Creation", "Crypto", "Finance", "General"];

export default function CreatorSettingsPage() {
  useTitle("Settings", "Manage your account preferences");
  const [niche, setNiche] = useState("Crypto");
  const [form, setForm] = useState({
    name: "Alex Creator",
    email: "alex@clipbull.io",
    twitter: "@AlexCreates",
    youtube: "AlexCreatorChannel",
    notify_campaign: true,
    notify_payouts: true,
    notify_disputes: false,
  });

  const set = (key: string, value: string | boolean) =>
    setForm((p: any) => ({ ...p, [key]: value }));

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/50 transition-all";
  const labelCls = "block text-sm font-medium text-zinc-400 mb-1.5";

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6 max-w-2xl mx-auto w-full space-y-8">
        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0a0a0a] border border-white/6 rounded-2xl p-6 space-y-5"
        >
          <h2 className="text-sm font-semibold text-white">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Display Name</label>
              <input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Email Address</label>
              <input className={inputCls} type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
            </div>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="bg-[#0a0a0a] border border-white/6 rounded-2xl p-6 space-y-5"
        >
          <h2 className="text-sm font-semibold text-white">Social Media Links</h2>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Twitter / X</label>
              <input className={inputCls} value={form.twitter} onChange={(e) => set("twitter", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>YouTube Channel</label>
              <input className={inputCls} value={form.youtube} onChange={(e) => set("youtube", e.target.value)} />
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="bg-[#0a0a0a] border border-white/6 rounded-2xl p-6 space-y-4"
        >
          <h2 className="text-sm font-semibold text-white">Notification Preferences</h2>
          {[
            { key: "notify_campaign", label: "Campaign status updates" },
            { key: "notify_payouts", label: "Payout & wallet alerts" },
            { key: "notify_disputes", label: "Dispute notifications" },
          ].map((n) => (
            <label key={n.key} className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">{n.label}</span>
              <button
                onClick={() => set(n.key, !form[n.key as keyof typeof form])}
                className={cn(
                  "w-10 h-5.5 rounded-full border transition-all duration-300 relative",
                  form[n.key as keyof typeof form]
                    ? "bg-primary border-primary"
                    : "bg-white/8 border-white/15"
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-300",
                    form[n.key as keyof typeof form] ? "left-5" : "left-0.5"
                  )}
                />
              </button>
            </label>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 shadow-[0_0_20px_rgba(255,79,0,0.3)]">
            Save Changes
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
