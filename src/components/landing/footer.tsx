"use client";

import Link from "next/link";
import { Twitter, Send, ArrowRight, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] pt-16 pb-10">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-4 gap-12 mb-14">
          <div className="md:col-span-2">
            <Link
              href="/"
              className="text-xl font-bold text-white mb-5 block cursor-pointer"
            >
              Clip<span className="text-primary">Bull</span>
            </Link>
            <p className="text-sm text-zinc-600 max-w-sm mb-5 leading-relaxed">
              The distribution engine for viral content. Connect with clippers,
              amplify your reach, and grow without friction.
            </p>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/[0.04] hover:bg-primary/20 text-zinc-500 hover:text-primary w-9 h-9 cursor-pointer"
              >
                <Twitter size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/[0.04] hover:bg-primary/20 text-zinc-500 hover:text-primary w-9 h-9 cursor-pointer"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-white mb-5">Platform</h3>
            <ul className="space-y-3">
              {[
                { label: "How it Works", href: "#how-it-works" },
                { label: "Pricing", href: "#" },
                { label: "Proof & Results", href: "#social-proof" },
                { label: "Login", href: "/auth/login" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-600 hover:text-zinc-300 transition-colors cursor-pointer"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-white mb-5">Legal</h3>
            <ul className="space-y-3">
              {[
                "Terms of Service",
                "Privacy Policy",
                "Cookie Policy",
                "Contact Support",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-zinc-600 hover:text-zinc-300 transition-colors cursor-pointer"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Chat/Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <div className="flex items-center gap-3 bg-[#0a0a12] border border-white/[0.08] rounded-2xl px-5 py-3.5 hover:border-primary/20 transition-colors">
              <Search size={18} className="text-zinc-600 shrink-0" />
              <span className="text-sm text-zinc-600 flex-1">
                What should we build today?
              </span>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles size={14} className="text-primary" />
                </div>
                <div className="w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center">
                  <ArrowRight size={14} className="text-zinc-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/[0.05]">
          <p className="text-xs text-zinc-700">
            © {new Date().getFullYear()} ClipBull. All rights reserved.
          </p>
          <div className="flex gap-3">
            <Link href="/auth/signup?role=creator">
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white rounded-lg text-xs gap-1.5 cursor-pointer"
              >
                Launch a Campaign
                <ArrowRight size={13} />
              </Button>
            </Link>
            <Link href="/auth/signup?role=clipper">
              <Button
                size="sm"
                variant="outline"
                className="border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.04] rounded-lg text-xs cursor-pointer"
              >
                Start Clipping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
