"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Topbar } from "@/components/dashboard/shared/topbar";
import { PageHeader } from "@/components/dashboard/shared/page-header";
import { Check, ChevronRight, Link2, FileText, Settings2, Receipt, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const STEPS = [
  { id: 1, label: "Content Details", icon: Link2 },
  { id: 2, label: "Configuration", icon: Settings2 },
  { id: 3, label: "Rules", icon: FileText },
  { id: 4, label: "Review & Pay", icon: Receipt },
];

const NICHES = ["Meme", "Politics", "Content Creation", "Crypto", "Finance", "General"];

interface FormData {
  contentLink: string;
  title: string;
  description: string;
  niche: string;
  cpm: string;
  budget: string;
  maxPayoutPerClipper: string;
  maxClippers: string;
  durationDays: string;
}

const PLATFORM_FEE_RATE = 0.05;

export default function CreateCampaignPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({
    contentLink: "",
    title: "",
    description: "",
    niche: "",
    cpm: "",
    budget: "",
    maxPayoutPerClipper: "",
    maxClippers: "",
    durationDays: "",
  });

  const set = (key: keyof FormData, value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  const budget = parseFloat(form.budget) || 0;
  const platformFee = budget * PLATFORM_FEE_RATE;
  const totalPayable = budget + platformFee;

  const canNext = () => {
    if (step === 1) return form.contentLink && form.title && form.description;
    if (step === 2) return form.niche && form.cpm && form.budget;
    return true;
  };

  const inputCls =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all";

  const labelCls = "block text-sm font-medium text-zinc-300 mb-1.5";

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="Create Campaign" />
      <main className="flex-1 p-6 max-w-3xl mx-auto w-full">
        <PageHeader
          title="Create New Campaign"
          subtitle="Launch your content distribution campaign in 4 steps"
        />

        {/* Step Indicator */}
        <div className="flex items-center gap-0 mb-10">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <button
                onClick={() => step > s.id && setStep(s.id)}
                className={cn(
                  "flex items-center gap-2 shrink-0 transition-all duration-200",
                  step === s.id && "cursor-default",
                  step < s.id && "cursor-not-allowed opacity-40",
                  step > s.id && "cursor-pointer"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300",
                    step === s.id && "bg-primary border-primary text-white shadow-[0_0_16px_rgba(255,79,0,0.5)]",
                    step > s.id && "bg-emerald-500/20 border-emerald-500 text-emerald-400",
                    step < s.id && "bg-white/5 border-white/10 text-zinc-500"
                  )}
                >
                  {step > s.id ? <Check size={14} /> : s.id}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium hidden sm:block",
                    step === s.id ? "text-white" : "text-zinc-500"
                  )}
                >
                  {s.label}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div className={cn("flex-1 h-px mx-3 transition-colors duration-300", step > s.id ? "bg-emerald-500/40" : "bg-white/8")} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-[#0a0a0a] border border-white/6 rounded-2xl p-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <h2 className="text-lg font-semibold text-white mb-6">Content Details</h2>
                <div>
                  <label className={labelCls}>Content Link <span className="text-primary">*</span></label>
                  <input
                    className={inputCls}
                    placeholder="https://youtube.com/watch?v=... or TikTok URL"
                    value={form.contentLink}
                    onChange={(e) => set("contentLink", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Campaign Title <span className="text-primary">*</span></label>
                  <input
                    className={inputCls}
                    placeholder="e.g. CryptoX Awareness Push"
                    value={form.title}
                    onChange={(e) => set("title", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Campaign Description <span className="text-primary">*</span></label>
                  <textarea
                    className={cn(inputCls, "min-h-[120px] resize-none")}
                    placeholder="Describe your campaign goals, tone, and what clippers should focus on..."
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <h2 className="text-lg font-semibold text-white mb-6">Campaign Configuration</h2>
                <div>
                  <label className={labelCls}>Select Niche <span className="text-primary">*</span></label>
                  <div className="grid grid-cols-3 gap-2">
                    {NICHES.map((n) => (
                      <button
                        key={n}
                        onClick={() => set("niche", n)}
                        className={cn(
                          "py-2.5 px-3 rounded-lg text-sm font-medium border transition-all duration-200",
                          form.niche === n
                            ? "bg-primary/15 border-primary/40 text-primary"
                            : "bg-white/4 border-white/8 text-zinc-400 hover:bg-white/8 hover:text-white"
                        )}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>CPM Rate (₦ per 1,000 impressions) <span className="text-primary">*</span></label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">₦</span>
                      <input
                        className={cn(inputCls, "pl-8")}
                        type="number"
                        placeholder="500"
                        value={form.cpm}
                        onChange={(e) => set("cpm", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Total Budget <span className="text-primary">*</span></label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">₦</span>
                      <input
                        className={cn(inputCls, "pl-8")}
                        type="number"
                        placeholder="100,000"
                        value={form.budget}
                        onChange={(e) => set("budget", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                {form.cpm && form.budget && (
                  <div className="p-3 bg-white/4 border border-white/8 rounded-lg text-sm text-zinc-400">
                    Estimated reach:{" "}
                    <span className="text-white font-semibold">
                      ~{((parseFloat(form.budget) / parseFloat(form.cpm)) * 1000).toLocaleString()} impressions
                    </span>
                  </div>
                )}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <h2 className="text-lg font-semibold text-white mb-2">Campaign Rules</h2>
                <p className="text-sm text-zinc-500 mb-6">All fields are optional. Leave blank to use platform defaults.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Max Payout Per Clipper (₦)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">₦</span>
                      <input
                        className={cn(inputCls, "pl-8")}
                        type="number"
                        placeholder="5,000"
                        value={form.maxPayoutPerClipper}
                        onChange={(e) => set("maxPayoutPerClipper", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Max Number of Clippers</label>
                    <input
                      className={inputCls}
                      type="number"
                      placeholder="50"
                      value={form.maxClippers}
                      onChange={(e) => set("maxClippers", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Campaign Duration (days)</label>
                  <input
                    className={inputCls}
                    type="number"
                    placeholder="30"
                    value={form.durationDays}
                    onChange={(e) => set("durationDays", e.target.value)}
                  />
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <h2 className="text-lg font-semibold text-white mb-6">Review & Payment</h2>
                <div className="space-y-3">
                  {[
                    { label: "Campaign", value: form.title },
                    { label: "Content Link", value: form.contentLink },
                    { label: "Niche", value: form.niche },
                    { label: "CPM Rate", value: `₦${parseFloat(form.cpm || "0").toLocaleString()}` },
                    { label: "Duration", value: form.durationDays ? `${form.durationDays} days` : "Unlimited" },
                    { label: "Max Clippers", value: form.maxClippers || "Unlimited" },
                  ].map((r) => (
                    <div key={r.label} className="flex justify-between text-sm border-b border-white/5 pb-3">
                      <span className="text-zinc-500">{r.label}</span>
                      <span className="text-white font-medium text-right max-w-xs truncate">{r.value || "—"}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-white/4 border border-white/8 rounded-xl p-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Campaign Budget</span>
                    <span className="text-white font-mono">₦{budget.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Platform Fee (5%)</span>
                    <span className="text-white font-mono">₦{platformFee.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-white/10 pt-3 flex justify-between">
                    <span className="text-white font-semibold">Total Payable</span>
                    <span className="text-primary font-bold text-lg font-mono">₦{totalPayable.toLocaleString()}</span>
                  </div>
                </div>

                <Button
                  onClick={() => router.push("/dashboard/creator/campaigns")}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold text-base shadow-[0_0_30px_rgba(255,79,0,0.4)]"
                >
                  Pay & Launch Campaign
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {step < 4 && (
            <div className="flex justify-between mt-8 pt-6 border-t border-white/5">
              <Button
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                variant="ghost"
                className={cn("text-zinc-400 hover:text-white gap-2", step === 1 && "invisible")}
              >
                <ArrowLeft size={15} />
                Back
              </Button>
              <Button
                onClick={() => setStep((s) => Math.min(4, s + 1))}
                disabled={!canNext()}
                className="bg-primary hover:bg-primary/90 text-white px-6 gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue
                <ChevronRight size={15} />
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
