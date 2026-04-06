"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function WelcomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "user";

  const isCreator = role === "creator";

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-[#050508] p-6 overflow-hidden">
      {/* Background glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-[120px] rounded-full opacity-10 pointer-events-none ${
          isCreator ? "bg-orange-500" : "bg-emerald-500"
        }`}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-[#0a0a12] border border-white/[0.06] rounded-3xl p-10 text-center shadow-2xl backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
            className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 shadow-lg ${
              isCreator
                ? "bg-gradient-to-br from-primary to-orange-500 shadow-primary/20"
                : "bg-gradient-to-br from-emerald-400 to-teal-500 shadow-emerald-500/20"
            }`}
          >
            <Sparkles className="text-white" size={28} />
          </motion.div>

          <h1 className="text-3xl font-bold text-white mb-3">
            Welcome to ClipBull!
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed mb-8">
            {isCreator
              ? "Your account is ready. Let's start launching viral campaigns and maximizing your reach today."
              : "You're all set! Browse the offer board, claim campaigns, and start getting paid for your clips."}
          </p>

          <Button
            onClick={() => router.push(`/dashboard/${role}`)}
            className={`w-full h-12 text-white rounded-xl font-semibold text-sm shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] ${
              isCreator
                ? "bg-primary hover:bg-primary/90 shadow-primary/25"
                : "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/25"
            }`}
          >
            Go to my Dashboard
            <ArrowRight size={18} />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default function WelcomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#050508]">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      }
    >
      <WelcomeContent />
    </Suspense>
  );
}
