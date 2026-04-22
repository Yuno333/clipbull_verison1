"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTitle } from "@/lib/title-context";

const NICHES = ["Meme", "Politics", "Content Creation", "Crypto", "Finance", "General"];

export default function ClipperSettingsPage() {
  const [primaryNiche, setPrimaryNiche] = useState("Crypto");
  const [form, setForm] = useState({
    name: "TikiMaster_NG",
    email: "tiki@clipbull.io",
    tiktok: "@TikiMaster_NG",
    instagram: "@tikimaster",
    youtube: "TikiMasterNG",
    bank: "Zen Zenith Bank",
    accountNumber: "****4821",
    notify_offers: true,
    notify_approvals: true,
    notify_payouts: false,
  });

  useTitle("Settings", "Manage your clipper profile and preferences");

  const set = (key: string, value: string | boolean) =>
    setForm((p) => ({ ...p, [key]: value }));

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/50 transition-all";
  const labelCls = "block text-sm font-medium text-zinc-400 mb-1.5";

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6 max-w-2xl mx-auto w-full space-y-8">
        <div className="opacity-0 h-0 overflow-hidden absolute">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Settings</h1>
          <p className="text-zinc-400 text-sm">Manage your clipper profile and preferences</p>
        </div>

        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0a0a0a] border border-white/6 rounded-2xl p-6 space-y-5"
        >
          <h2 className="text-sm font-semibold text-white">Profile Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

        {/* Primary Niche */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className="bg-[#0a0a0a] border border-white/6 rounded-2xl p-6 space-y-4"
        >
          <div>
            <h2 className="text-sm font-semibold text-white">Primary Niche</h2>
            <p className="text-xs text-zinc-500 mt-1">Offers matching your primary niche will be highlighted first.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {NICHES.map((n) => (
              <button
                key={n}
                onClick={() => setPrimaryNiche(n)}
                className={cn(
                  "py-2.5 px-3 rounded-lg text-xs sm:text-sm font-medium border transition-all duration-200",
                  primaryNiche === n
                    ? "bg-primary/15 border-primary/40 text-primary"
                    : "bg-white/4 border-white/8 text-zinc-400 hover:bg-white/8 hover:text-white"
                )}
              >
                {n}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="bg-[#0a0a0a] border border-white/6 rounded-2xl p-6 space-y-4"
        >
          <h2 className="text-sm font-semibold text-white">Social Media Links</h2>
          <div className="space-y-4">
            {[
              { key: "tiktok", label: "TikTok Handle" },
              { key: "instagram", label: "Instagram Handle" },
              { key: "youtube", label: "YouTube Channel" },
            ].map((s) => (
              <div key={s.key}>
                <label className={labelCls}>{s.label}</label>
                <input
                  className={inputCls}
                  value={form[s.key as keyof typeof form] as string}
                  onChange={(e) => set(s.key, e.target.value)}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Payment Method */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="bg-[#0a0a0a] border border-white/6 rounded-2xl p-6 space-y-4"
        >
          <h2 className="text-sm font-semibold text-white">Payment Method</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Bank Name</label>
              <input className={inputCls} value={form.bank} onChange={(e) => set("bank", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Account Number</label>
              <input className={inputCls} value={form.accountNumber} onChange={(e) => set("accountNumber", e.target.value)} />
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
          className="bg-[#0a0a0a] border border-white/6 rounded-2xl p-6 space-y-4"
        >
          <h2 className="text-sm font-semibold text-white">Notification Preferences</h2>
          {[
            { key: "notify_offers", label: "New matching offers" },
            { key: "notify_approvals", label: "Clip approval / rejection" },
            { key: "notify_payouts", label: "Payout confirmations" },
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
          transition={{ delay: 0.3 }}
        >
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 shadow-[0_0_20px_rgba(255,79,0,0.3)] w-full sm:w-auto">
            Save Changes
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
