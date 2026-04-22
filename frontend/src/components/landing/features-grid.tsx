"use client";

import { motion } from "framer-motion";
import { TrendingUp, Zap, Users, Leaf } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Explosive Growth",
    description:
      "Watch content go viral on autopilot. Scale your reach exponentially.",
    gradient: "from-rose-500/20 to-transparent",
    iconColor: "text-rose-400",
  },
  {
    icon: Zap,
    title: "On Demand",
    description:
      "Distribution on demand. Tap into a network ready to share.",
    gradient: "from-purple-500/20 to-transparent",
    iconColor: "text-purple-400",
  },
  {
    icon: Users,
    title: "Everyone Wins",
    description:
      "Creators get reach, earners get paid. The perfect ecosystem.",
    gradient: "from-blue-500/20 to-transparent",
    iconColor: "text-blue-400",
  },
  {
    icon: Leaf,
    title: "Organic Only",
    description:
      "Grow fast without ad spend. No agencies, just pure viral mechanics.",
    gradient: "from-emerald-500/20 to-transparent",
    iconColor: "text-emerald-400",
  },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-[#0a0a12] border border-white/[0.06] rounded-2xl p-6 text-center overflow-hidden hover:border-primary/20 transition-all duration-300 cursor-default"
            >
              {/* Hover glow */}
              <div
                className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative">
                <div
                  className={`inline-flex p-3 rounded-2xl bg-white/[0.04] border border-white/[0.06] mb-4 ${feature.iconColor}`}
                >
                  <feature.icon size={24} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dot Indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === 0 ? "bg-primary" : "bg-zinc-700"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
