"use client";

import { motion } from "framer-motion";
import { Upload, Share2, DollarSign } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Upload,
    title: "Upload & Set Budget",
    description:
      "Drop your content link, pick a niche, set your CPM rate and total budget. Our system takes care of the rest.",
    accent: "from-primary/20 to-transparent",
  },
  {
    num: "02",
    icon: Share2,
    title: "Clippers Distribute",
    description:
      "Thousands of vetted clippers grab your content, edit it for each platform, and repost it across TikTok, Shorts, Reels, and X.",
    accent: "from-indigo-500/20 to-transparent",
  },
  {
    num: "03",
    icon: DollarSign,
    title: "Pay Per Performance",
    description:
      "Clippers earn based on verified impressions. You only pay for real reach. No fake views, no wasted budget.",
    accent: "from-emerald-500/20 to-transparent",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 relative">
      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
            How it works
          </h2>
          <p className="text-zinc-500 text-base max-w-md mx-auto">
            Three steps. No agencies. No ad managers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              className="relative bg-[#0a0a12] border border-white/[0.06] p-7 rounded-2xl overflow-hidden group hover:border-primary/20 transition-all duration-300 cursor-default"
            >
              {/* Glow */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${step.accent} blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative">
                <div className="text-xs font-mono text-zinc-600 mb-5">
                  {step.num}
                </div>
                <div className="mb-5 inline-flex p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white">
                  <step.icon size={22} />
                </div>
                <h3 className="text-lg font-bold mb-3 text-white">
                  {step.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
