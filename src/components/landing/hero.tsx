"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Heart, Share2, MessageCircle } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-4 overflow-hidden">
      {/* Background gradient - purple ambient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(124,58,237,0.15)_0%,_transparent_50%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-[20%] w-[400px] h-[400px] bg-indigo-600/8 blur-[120px] rounded-full pointer-events-none" />

      {/* CSS animation styles */}
      <style jsx>{`
        @keyframes heroFadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes heroSlideIn {
          from {
            opacity: 0;
            transform: translateX(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        .hero-animate-1 {
          animation: heroFadeUp 0.5s ease-out 0.08s both;
        }
        .hero-animate-2 {
          animation: heroFadeUp 0.5s ease-out 0.15s both;
        }
        .hero-animate-3 {
          animation: heroFadeUp 0.5s ease-out 0.18s both;
        }
        .hero-animate-4 {
          animation: heroFadeUp 0.5s ease-out 0.22s both;
        }
        .hero-animate-card {
          animation: heroSlideIn 0.7s ease-out 0.3s both;
        }
      `}</style>

      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Text Content */}
          <div>
            <h1
              className="hero-animate-1 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-6"
            >
              The Distribution
              <br />
              Engine for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-indigo-400">
                Viral Content
              </span>
            </h1>

            <p
              className="hero-animate-2 max-w-lg text-zinc-400 text-base md:text-lg leading-relaxed mb-4"
            >
              ClipBull connects creators with thousands of clippers who repost,
              amplify, and drive impressions across social platforms.
            </p>

            <p
              className="hero-animate-3 text-white font-semibold text-sm md:text-base mb-8"
            >
              Create once. Distribute everywhere. Grow faster.
            </p>

            {/* CTAs */}
            <div
              className="hero-animate-4 flex flex-col sm:flex-row items-start gap-3"
            >
              <Link href="/auth/signup?role=creator">
                <Button
                  size="lg"
                  className="h-12 px-8 text-sm font-semibold bg-primary hover:bg-primary/90 text-white rounded-xl shadow-[0_0_30px_rgba(124,58,237,0.3)] gap-2 cursor-pointer w-full sm:w-auto"
                >
                  Launch a Campaign
                  <ArrowRight size={15} />
                </Button>
              </Link>
              <Link href="/auth/signup?role=clipper">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-sm font-semibold border-white/[0.08] hover:bg-white/[0.04] text-white rounded-xl gap-2 cursor-pointer w-full sm:w-auto"
                >
                  Become a Clipper
                </Button>
              </Link>
            </div>
          </div>

          {/* Right - Video Preview Card */}
          <div
            className="hero-animate-card relative"
          >
            {/* Glow behind card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-purple-500/20 to-indigo-500/10 blur-[80px] rounded-3xl" />

            {/* Main Preview Card */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-purple-900/40 via-indigo-900/30 to-pink-900/20 shadow-2xl">
              {/* Video Thumbnail Area */}
              <div className="relative aspect-video bg-gradient-to-br from-amber-500/80 via-rose-500/60 to-purple-600/80 flex items-center justify-center">
                {/* Play button */}
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30 cursor-pointer hover:scale-110 transition-transform">
                  <Play size={24} className="text-white fill-white ml-1" />
                </div>

                {/* Creator info overlay */}
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                    AC
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold drop-shadow-lg">Alex Creator</div>
                    <div className="text-white/80 text-xs drop-shadow-lg">This is how we scale! 🚀 #growth #viral</div>
                  </div>
                </div>
              </div>

              {/* Interaction Bar */}
              <div className="px-5 py-3 flex items-center justify-between bg-[#0a0a12]/90 backdrop-blur-sm">
                <div className="flex items-center gap-5">
                  <button className="flex items-center gap-1.5 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer">
                    <Heart size={18} />
                    <span className="text-xs">8.2K</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-zinc-400 hover:text-blue-400 transition-colors cursor-pointer">
                    <MessageCircle size={18} />
                    <span className="text-xs">842</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-zinc-400 hover:text-green-400 transition-colors cursor-pointer">
                    <Share2 size={18} />
                    <span className="text-xs">12.6K</span>
                  </button>
                </div>
                <div className="text-xs text-primary font-semibold">✦ Active</div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 border-t border-white/5">
                <div className="px-4 py-3 text-center border-r border-white/5">
                  <div className="text-lg font-bold text-white">4.2K</div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Shares</div>
                </div>
                <div className="px-4 py-3 text-center border-r border-white/5">
                  <div className="text-lg font-bold text-white">128K</div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Views</div>
                </div>
                <div className="px-4 py-3 text-center">
                  <div className="text-lg font-bold text-green-400">$450</div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Earned</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
