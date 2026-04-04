"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const testimonials = [
  {
    quote:
      "ClipBull completely automated my distribution. I went from 10k to 500k views in a month just by letting clippers do their thing.",
    author: "Jason Davis",
    role: "YouTuber & Streamer",
    avatar: "JD",
    avatarColor: "from-purple-500 to-indigo-600",
    verified: true,
  },
  {
    quote:
      "As a clipper, this is the easiest way to find high-quality content and get paid fairly. The platform is transparent and the payments are fast.",
    author: "Sarah Miller",
    role: "Top Rated Clipper",
    avatar: "SM",
    avatarColor: "from-blue-500 to-cyan-500",
    verified: true,
  },
  {
    quote:
      "We launched our podcast clips here and the organic reach was insane. No ads needed, just pure viral mechanics working for us 24/7.",
    author: "Marcus Price",
    role: "Founder, TechTalks",
    avatar: "MP",
    avatarColor: "from-orange-500 to-rose-500",
    verified: true,
  },
];

export function SocialProof() {
  return (
    <section id="social-proof" className="py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Trusted by the best
          </h2>
          <p className="text-zinc-500 text-base max-w-md mx-auto">
            Join thousands of creators and clippers scaling their reach and
            revenue.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0a0a12] border border-white/[0.06] p-7 rounded-2xl flex flex-col justify-between hover:border-primary/20 transition-all duration-300 cursor-default"
            >
              {/* Quote mark */}
              <div className="mb-4">
                <div className="text-primary text-3xl font-bold leading-none">
                  &#x201C;&#x201C;
                </div>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed mb-8 flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className={`h-10 w-10 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-xs font-bold text-white shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm text-white flex items-center gap-1.5">
                    {t.author}
                    {t.verified && (
                      <CheckCircle2 size={12} className="text-primary" />
                    )}
                  </div>
                  <div className="text-[11px] text-primary/70 font-medium uppercase tracking-wider">
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
