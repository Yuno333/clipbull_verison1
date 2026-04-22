"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, ExternalLink, Users, DollarSign, Shield, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTitle } from "@/lib/title-context";

interface Campaign {
  id: string;
  title: string;
  niche: string;
  description: string;
  cpm: number;
  budget: number;
  spent: number;
  content_link: string;
  clippers_joined: number;
  max_clippers: number | null;
  max_payout_per_clipper: number | null;
  details?: string;
  rules?: string;
}

export default function OfferDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  
  const [offer, setOffer] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);
  
  useTitle(offer?.title || "Loading...", "Offer Details & Join Campaign");

  useEffect(() => {
    const fetchOffer = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        setOffer(null);
      } else {
        setOffer(data as any);
      }
      setLoading(false);
    };

    fetchOffer();
  }, [id]);

  const handleJoin = async () => {
    if (!offer) return;
    setIsJoining(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setIsJoining(false);
        return;
      }

      await supabase
        .from('accepted_offers')
        .insert({
          clipper_id: user.id,
          campaign_id: offer.id,
          status: 'active'
        });

      // Optionally increment clippers_joined in campaigns locally, or let postgres handle it
      router.push("/dashboard/clipper/campaigns");
    } catch (e) {
      console.error(e);
      alert("Failed to join campaign. You might have already joined it.");
    } finally {
      setIsJoining(false);
    }
  };

  const handleDecline = async () => {
    if (!offer) return;
    setIsDeclining(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase
        .from('accepted_offers')
        .insert({
          clipper_id: user.id,
          campaign_id: offer.id,
          status: 'abandoned' // Marks as declined/hidden
        });

      router.push("/dashboard/clipper/offers");
    } catch (e) {
      console.error(e);
    } finally {
      setIsDeclining(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  if (!offer && !loading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center p-6 text-center text-zinc-500">
        <p>Offer not found or unavailable.</p>
        <Link href="/dashboard/clipper/offers" className="mt-4 text-primary font-semibold hover:underline">
          Return to Offers
        </Link>
      </div>
    );
  }

  if (!offer) return null;

  const budgetRemaining = offer.budget - offer.spent;
  const pctRemaining = (budgetRemaining / offer.budget) * 100;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6 max-w-3xl mx-auto w-full space-y-8">
        <div className="opacity-0 h-0 overflow-hidden absolute">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">{offer.title}</h1>
          <p className="text-zinc-400 text-sm">Offer Details & Join Campaign</p>
        </div>

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
              <h1 className="text-xl font-bold text-white lg:hidden">{offer.title}</h1>
              <span className="text-xs font-medium text-zinc-300 bg-white/5 border border-white/8 px-2.5 py-1.5 rounded-lg shrink-0">
                {offer.niche}
              </span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">{offer.description}</p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { icon: DollarSign, label: "CPM Rate", value: `₦${offer.cpm.toLocaleString()}`, color: "text-emerald-400" },
              { icon: Users, label: "Clippers Joined", value: `${offer.clippers_joined || 0}${offer.max_clippers ? `/${offer.max_clippers}` : ""}`, color: "text-blue-400" },
              { icon: Shield, label: "Max Payout / Clipper", value: offer.max_payout_per_clipper ? `₦${offer.max_payout_per_clipper.toLocaleString()}` : "Unlimited", color: "text-amber-400" },
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
              <span className="font-mono text-white text-xs sm:text-sm">₦{budgetRemaining.toLocaleString()} / ₦{offer.budget.toLocaleString()}</span>
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
              href={offer.content_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline bg-primary/8 border border-primary/20 px-3 py-2 rounded-lg transition-colors w-full sm:w-auto justify-center sm:justify-start"
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
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              onClick={handleDecline}
              disabled={isDeclining || isJoining}
              variant="outline"
              className="w-full sm:w-1/3 h-12 bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-xl font-semibold text-base"
            >
              {isDeclining ? <Loader2 className="animate-spin" size={18} /> : "Decline"}
            </Button>
            <Button
              onClick={handleJoin}
              disabled={isJoining || isDeclining}
              className="w-full sm:w-2/3 h-12 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold text-base shadow-[0_0_30px_rgba(255,79,0,0.4)]"
            >
              {isJoining ? <Loader2 className="animate-spin gap-2" size={18} /> : "Accept & Join Campaign"}
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
