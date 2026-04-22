"use client";

import {
  ShieldCheck,
  Eye,
  Lock,
  UserCheck,
  AlertTriangle,
  FileWarning,
  Bot,
} from "lucide-react";

export function TrustSafety() {
  return (
    <section id="trust" className="py-12 bg-[#050508] border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
              <ShieldCheck size={12} />
              <span>Enterprise Grade Security</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Built for Brand Safety
            </h2>
            <p className="text-muted-foreground text-lg">
              We use a hybrid system of advanced AI detection and human
              moderation to ensure your brand is never associated with harmful
              content.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {[
                { icon: Eye, label: "Nudity Detection" },
                { icon: AlertTriangle, label: "Hate Speech Filter" },
                { icon: Lock, label: "Fraud Prevention" },
                { icon: UserCheck, label: "Human Review" },
                { icon: FileWarning, label: "Spam Blocking" },
                { icon: Bot, label: "Bot Mitigation" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#0a0a12] border border-white/5 hover:border-primary/20 transition-colors"
                >
                  <item.icon size={18} className="text-primary/70" />
                  <span className="text-sm font-medium text-zinc-200">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Visual Representation of Scanning */}
            <div className="relative z-10 bg-[#0a0a12] border border-white/10 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                <span className="text-xs font-mono text-muted-foreground">
                  SCANNING_CONTENT_ID_8492
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-green-500 font-bold">PASS</span>
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                </div>
              </div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-sm p-2 rounded bg-white/5"
                  >
                    <span className="text-zinc-400">Layer {i}: Analysis</span>
                    <span className="text-green-400 text-xs font-mono">
                      CLEAN
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/8 blur-[100px] rounded-full pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
