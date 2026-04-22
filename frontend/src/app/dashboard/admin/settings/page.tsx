"use client";

import { motion } from "framer-motion";
import { Settings, Shield, Bell, Zap, Save, AlertCircle, Lock, Monitor, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { useTitle } from "@/lib/title-context";

export default function AdminSettingsPage() {
  useTitle("Global Settings", "Configure platform-wide parameters and security protocols.");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <div className="p-8 pb-20 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="opacity-0 h-0 overflow-hidden absolute">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Global Settings</h1>
          <p className="text-zinc-400 text-sm">Configure platform-wide parameters and security protocols.</p>
        </div>

        <div className="space-y-6">
          {/* Platform Status */}
          <section className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06]">
            <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Monitor size={16} className="text-cyan-400" />
              Platform Control
            </h2>
            <div className="space-y-4">
              {[
                { label: "Waitlist Mode", desc: "Require admin approval for new signups", active: true },
                { label: "Maintenance Mode", desc: "Restrict frontend access to admin only", active: false },
                { label: "Public API", desc: "Allow external integrations with ClipBull", active: false },
              ].map((setting, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.01] border border-white/[0.04]">
                  <div>
                    <div className="text-sm font-bold text-white mb-0.5">{setting.label}</div>
                    <div className="text-xs text-zinc-500">{setting.desc}</div>
                  </div>
                  <button className={`w-12 h-6 rounded-full transition-all relative ${setting.active ? 'bg-cyan-600' : 'bg-white/10'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${setting.active ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing & Fees */}
          <section className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06]">
            <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Zap size={16} className="text-cyan-400" />
              Monetization
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Platform Fee (%)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    defaultValue="10"
                    className="w-full h-12 px-4 rounded-xl bg-white/[0.02] border border-white/[0.08] text-white focus:outline-none focus:border-cyan-500 transition-all font-bold"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600">%</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Min. Withdrawal (₦)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    defaultValue="5000"
                    className="w-full h-12 px-4 rounded-xl bg-white/[0.02] border border-white/[0.08] text-white focus:outline-none focus:border-cyan-500 transition-all font-bold"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600">₦</span>
                </div>
              </div>
            </div>
          </section>

          {/* Security */}
          <section className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06]">
            <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Lock size={16} className="text-cyan-400" />
              Security & Compliance
            </h2>
            <div className="grid grid-cols-1 gap-4">
               <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/[0.01] border border-white/[0.04] hover:bg-white/[0.03] transition-all group">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500">
                    <Database size={18} />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors">Clear Platform Cache</div>
                    <div className="text-xs text-zinc-500">Flush all Redis and Vercel cached routes</div>
                  </div>
                </div>
                <div className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest">Execute</div>
              </button>

              <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/[0.01] border border-white/[0.04] hover:bg-white/[0.03] transition-all group">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Shield size={18} />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">IP Whitelist Table</div>
                    <div className="text-xs text-zinc-500">Manage sensitive IP addresses for admin access</div>
                  </div>
                </div>
                <div className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest">Edit</div>
              </button>
            </div>
          </section>
        </div>

        {/* Save Bar */}
        <div className="mt-10 pt-6 border-t border-white/[0.06] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-zinc-600">
            <AlertCircle size={14} />
            <span className="text-[10px] uppercase font-bold tracking-widest">Changes affect live environment</span>
          </div>
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl h-11 px-10 font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)] gap-3 min-w-[160px]"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save size={18} />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
