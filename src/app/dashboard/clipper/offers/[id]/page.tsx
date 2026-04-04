"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import { Topbar } from "@/components/dashboard/shared/topbar";
import { mockOffers } from "@/lib/mock-data";
import { ArrowLeft, ExternalLink, Users, DollarSign, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OfferDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const offer = mockOffers.find((o) => o.id === id);
  if (!offer) notFound();

  const router = useRouter();
  const pctRemaining = (offer.budgetRemaining / offer.totalBudget) * 100;

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title={offer.title} />
      <main className="flex-1 p-6 max-w-3xl mx-auto w-full space-y-8">
        <Link
          href="/dashboard/clipper/offers"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Offers
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0a0a0a] border border-white/6 rounded-2xl p-6 space-y-6"
        >
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <h1 className="text-xl font-bold text-white">{offer.title}</h1>
              <span className="text-xs font-medium text-zinc-300 bg-white/5 border border-white/8 px-2.5 py-1.5 rounded-lg shrink-0">
                {offer.niche}
              </span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">{offer.description}</p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { icon: DollarSign, label: "CPM Rate", value: `₦${offer.cpm.toLocaleString()}`, color: "text-emerald-400" },
              { icon: Users, label: "Clippers Joined", value: `${offer.clippersJoined}${offer.maxClippers ? `/${offer.maxClippers}` : ""}`, color: "text-blue-400" },
              { icon: Shield, label: "Max Payout / Clipper", value: offer.maxPayoutPerClipper ? `₦${offer.maxPayoutPerClipper.toLocaleString()}` : "Unlimited", color: "text-amber-400" },
            ].map((item) => (
              <div key={item.label} className="bg-white/4 border border-white/6 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <item.icon size={14} className={item.color} />
                  <span className="text-xs text-zinc-500">{item.label}</span>
                </div>
                <div className="text-base font-bold text-white">{item.value}</div>
              </div>
            ))}
          </div>

          {/* Budget Remaining */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-zinc-500">Budget Remaining</span>
              <span className="font-mono text-white">₦{offer.budgetRemaining.toLocaleString()} / ₦{offer.totalBudget.toLocaleString()}</span>
            </div>
            <div className="h-2 bg-white/6 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pctRemaining}%` }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
              />
            </div>
          </div>

          {/* Content Link */}
          <div>
            <div className="text-xs text-zinc-500 mb-2">Content Link</div>
            <a
              href={offer.contentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline bg-primary/8 border border-primary/20 px-3 py-2 rounded-lg transition-colors"
            >
              <ExternalLink size={14} />
              View Original Content
            </a>
          </div>

          {/* Rules */}
          {offer.rules && (
            <div>
              <div className="text-xs text-zinc-500 mb-2">Campaign Rules</div>
              <div className="bg-white/4 border border-white/6 rounded-xl p-4 text-sm text-zinc-300 leading-relaxed">
                {offer.rules}
              </div>
            </div>
          )}

          {/* CTA */}
          <Button
            onClick={() => router.push("/dashboard/clipper/submit")}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold text-base shadow-[0_0_30px_rgba(255,79,0,0.4)]"
          >
            Join Campaign
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
